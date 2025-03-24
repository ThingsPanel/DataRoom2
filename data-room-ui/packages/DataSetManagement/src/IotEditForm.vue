<template>
  <div class="inner-container" :element-loading-text="saveText">
    <el-scrollbar class="data-set-scrollbar">
      <div class="header">
        <el-page-header class="bs-el-page-header">
          <template slot="content">
            <div class="page-header">
              <div class="page-header-left">
                {{ !isEdit ? 'IoT数据集详情' : dataForm.id ? '编辑IoT数据集' : '新增IoT数据集' }}
              </div>
              <div class="page-header-right">
                <el-button
                  v-if="isEdit"
                  type="primary"
                  size="small"
                  @click="save('form')"
                >
                  保存
                </el-button>
                <el-button
                  class="bs-el-button-default"
                  size="small"
                  @click="goBack"
                >
                  返回
                </el-button>
              </div>
            </div>
          </template>
        </el-page-header>
      </div>
      <div class="content-container">
        <el-row>
          <el-col :span="isEdit ? 16 : 24">
            <el-form
              ref="form"
              :model="dataForm"
              :rules="rules"
              label-width="90px"
              size="small"
              class="bs-el-form"
            >
              <!-- 基础信息 -->
              <div class="form-card">
                <div class="card-title">基础信息</div>
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-form-item
                      label="名称"
                      prop="name"
                    >
                      <div class="name-with-checkbox">
                      <el-input
                        v-model="dataForm.name"
                        class="bs-el-input"
                        clearable
                        :disabled="!isEdit"
                          @input="handleNameInput"
                        />
                        <div class="name-operations">
                          <el-checkbox 
                            v-if="isEdit" 
                            v-model="autoNaming" 
                            class="auto-naming-checkbox"
                            @change="handleAutoNamingChange"
                          >
                            自动命名
                          </el-checkbox>
                          <el-tooltip placement="top" effect="dark">
                            <div slot="content" class="naming-rule-tooltip">
                              <p>自动命名规则说明：</p>
                              <p>命名格式：设备名称-数据标识-类型-模式</p>
                              <p>数据类型简写：</p>
                              <ul>
                                <li>遥测数据：遥</li>
                                <li>属性数据：属</li>
                                <li>命令数据：命</li>
                                <li>事件数据：事</li>
                              </ul>
                              <p>数据模式简写：</p>
                              <ul>
                                <li>最新数据：新</li>
                                <li>历史数据：历</li>
                              </ul>
                            </div>
                            <i class="el-icon-question name-help-icon"></i>
                          </el-tooltip>
                        </div>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="分组"
                      prop="typeId"
                    >
                      <el-select
                        ref="selectParentName"
                        v-model="dataForm.typeId"
                        class="bs-el-select"
                        popper-class="bs-el-select"
                        placeholder="请选择分组"
                        filterable
                        clearable
                        :disabled="!isEdit"
                        @clear="clearType"
                        @visible-change="setCurrentNode"
                      >
                        <el-option
                          style="height: auto;padding: 0;"
                          :label="typeName"
                          :value="dataForm.typeId"
                        >
                          <div class="tree-box">
                            <el-tree
                              ref="categorySelectTree"
                              :data="categoryData"
                              node-key="id"
                              :indent="0"
                              :props="{ label: 'name', children: 'children' }"
                              :default-expand-all="true"
                              :highlight-current="true"
                              :expand-on-click-node="false"
                              class="bs-el-tree"
                              @node-click="selectParentCategory"
                            >
                              <span
                                slot-scope="{ data }"
                                class="custom-tree-node"
                              >
                                <span>
                                  <i :class="data.children && data.children.length ? 'el-icon el-icon-folder' : 'el-icon el-icon-document'" />
                                  {{ data.name }}
                                </span>
                              </span>
                            </el-tree>
                          </div>
                        </el-option>
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-form-item
                      label="备注"
                      prop="remark"
                    >
                      <el-input
                        v-model="dataForm.remark"
                        class="bs-el-input"
                        :disabled="!isEdit"
                      />
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="标签"
                      prop="labelIds"
                    >
                      <LabelSelect
                        :dataset-id="datasetId"
                        :id-list="dataForm.labelIds"
                        @commit="(ids) => { dataForm.labelIds = ids }"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>

              <!-- 数据查询配置 -->
              <div class="form-card">
                <div class="card-title">数据查询参数配置</div>
                <el-row :gutter="12">
                  <el-col :span="12">
                    <el-form-item
                      label="数据类型"
                      prop="data_type"
                    >
                      <el-select
                        v-model="dataForm.data_type"
                        class="bs-el-select"
                        popper-class="bs-el-select"
                        @change="handleDataTypeChange"
                      >
                        <el-option label="遥测数据" value="telemetry" />
                        <el-option label="属性数据" value="attribute" />
                        <el-option label="命令数据" value="command" />
                        <el-option label="事件数据" value="event" />
                      </el-select>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="数据模式"
                      prop="data_mode"
                    >
                      <el-select
                        v-model="dataForm.data_mode"
                        class="bs-el-select"
                        popper-class="bs-el-select"
                        @change="handleDataModeChange"
                      >
                        <el-option label="最新数据" value="latest" />
                        <el-option
                          label="历史数据"
                          value="history"
                          :disabled="dataForm.data_type !== 'telemetry'"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div v-if="dataForm.data_mode === 'history' && dataForm.data_type === 'telemetry'">
                  <el-divider content-position="left">历史数据参数</el-divider>
                  <el-row :gutter="16">
                    <el-col :span="12">
                      <el-form-item
                        label="时间范围"
                        prop="time_range"
                        label-width="80px"
                      >
                        <el-select
                          v-model="dataForm.time_range"
                          class="bs-el-select"
                          popper-class="bs-el-select"
                          @change="handleTimeRangeChange"
                        >
                          <el-option label="最近5分钟" value="last_5m" />
                          <el-option label="最近15分钟" value="last_15m" />
                          <el-option label="最近30分钟" value="last_30m" />
                          <el-option label="最近1小时" value="last_1h" />
                          <el-option label="最近3小时" value="last_3h" />
                          <el-option label="最近6小时" value="last_6h" />
                          <el-option label="最近12小时" value="last_12h" />
                          <el-option label="最近24小时" value="last_24h" />
                          <el-option label="最近3天" value="last_3d" />
                          <el-option label="最近7天" value="last_7d" />
                          <el-option label="最近15天" value="last_15d" />
                          <el-option label="最近30天" value="last_30d" />
                          <el-option label="最近60天" value="last_60d" />
                          <el-option label="最近90天" value="last_90d" />
                          <el-option label="最近6个月" value="last_6m" />
                          <el-option label="最近1年" value="last_1y" />
                          <el-option label="自定义" value="custom" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="dataForm.time_range === 'custom'">
                      <el-form-item
                        label="时间区间"
                        prop="customTimeRange"
                        label-width="80px"
                      >
                        <el-date-picker
                          v-model="customTimeRange"
                          type="datetimerange"
                          range-separator="至"
                          start-placeholder="开始日期"
                          end-placeholder="结束日期"
                          :picker-options="pickerOptions"
                          @change="handleCustomTimeChange"
                        />
                      </el-form-item>
                    </el-col>
                  </el-row>
                  <el-row :gutter="16">
                    <el-col :span="12">
                      <el-form-item
                        label="聚合间隔"
                        prop="aggregate_window"
                        label-width="80px"
                        class="aggregate-item"
                      >
                        <el-select
                          v-model="dataForm.aggregate_window"
                          placeholder="请选择聚合窗口"
                          class="bs-el-select"
                          popper-class="bs-el-select"
                        >
                          <el-option
                            v-for="option in availableAggregateWindows"
                            :key="option.value"
                            :label="option.label"
                            :value="option.value"
                            :disabled="option.disabled"
                          />
                        </el-select>
                      </el-form-item>
                    </el-col>
                    <el-col :span="12" v-if="dataForm.aggregate_window !== 'no_aggregate'">
                      <el-form-item
                        label="聚合方式"
                        prop="aggregate_function"
                        label-width="80px"
                      >
                        <el-select
                          v-model="dataForm.aggregate_function"
                          class="bs-el-select"
                          popper-class="bs-el-select"
                        >
                          <el-option label="平均值" value="avg" />
                          <el-option label="最大值" value="max" />
                          <el-option label="最小值" value="min" />
                          <el-option label="求和" value="sum" />
                          <el-option label="最大最小差值" value="diff" />
                        </el-select>
                      </el-form-item>
                    </el-col>
                  </el-row>
                </div>
                <el-divider content-position="left">设备参数</el-divider>
                <el-row :gutter="16">
                  <el-col :span="12">
                    <el-form-item
                      label="设备"
                      prop="device_id"
                    >
                      <div class="device-select-input">
                        <el-input
                          v-model="selectedDeviceName"
                          readonly
                          placeholder="请选择设备"
                          class="bs-el-input"
                        />
                        <el-button
                          type="primary"
                          icon="el-icon-plus"
                          size="mini"
                          @click="openDeviceDialog"
                        >
                          选择设备
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="数据标识"
                      prop="key"
                    >
                      <MetricsSelect
                        ref="metricsSelect"
                        :device-id="dataForm.device_id"
                        :selected-key="dataForm.key"
                        :data-type="dataForm.data_type"
                        :loading="keyLoading"
                        @change="handleMetricsSelect"
                      />
                    </el-form-item>
                  </el-col>
                </el-row>
              </div>
            </el-form>
          </el-col>

          <!-- 预览部分 -->
          <el-col
            v-if="isEdit"
            :span="8"
            class="preview-column"
          >
            <div class="form-card">
              <div class="card-title">数据预览</div>
              <div class="preview-execute">
                <el-button
                  type="primary"
                  size="small"
                  :loading="executeLoading"
                  @click="handleExecuteClick"
                >
                  执行
                </el-button>
              </div>
              
              <el-form size="small" label-width="80px" :model="pathForm">
                <el-form-item label="数据路径" prop="dataPath">
                  <el-input
                    v-model="pathForm.dataPath"
                    class="bs-el-input"
                    placeholder="如：data.value 或 data.points"
                  />
                </el-form-item>
              </el-form>

              <!-- 响应数据展示 -->
              <div class="result-container">
                <el-card v-if="responseData" class="response-card">
                  <div v-if="parsedResponseData">
                    <pre class="response-code">{{ JSON.stringify(parsedResponseData, null, 2) }}</pre>
                  </div>
                  <div v-else>
                    <pre class="response-code">{{ JSON.stringify(responseData, null, 2) }}</pre>
                  </div>
                </el-card>
                <div v-else class="empty-placeholder">
                  <i class="el-icon-data-analysis"></i>
                  <span>点击执行获取数据</span>
                </div>
              </div>
            </div>
          </el-col>
        </el-row>
      </div>
    </el-scrollbar>

    <el-dialog
      title="字段描述"
      :visible.sync="fieldFillDialogVisible"
      width="30%"
      center
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="false"
      custom-class="bs-el-dialog"
    >
      <div class="field-fill-form">
        <p class="field-fill-desc">您还有字段描述为空，请选择：</p>
        <div class="field-fill-btns">
          <el-button @click="fieldDescFill" type="primary">自动填充</el-button>
          <el-button @click="fieldDescEdit">进入编辑</el-button>
          <el-button @click="toSave">继续保存</el-button>
        </div>
      </div>
    </el-dialog>

    <DeviceSelectDialog 
      ref="deviceSelectDialog"
      @select="handleDeviceSelect"
    />

    <output-field-dialog
      ref="outputFieldDialog"
      :output-field-list="outputFieldList"
      @confirm="handleOutputConfirm"
    />
  </div>
</template>

<script>
import { getDataset, getCategoryTree } from 'data-room-ui/js/utils/datasetConfigService'
import { getDeviceList, getDeviceMetrics } from '../../js/utils/iotApiService'
import { Message } from 'element-ui'
import LabelSelect from 'data-room-ui/DataSetLabelManagement/src/LabelSelect.vue'
import OutputFieldDialog from './JsComponents/OutputFieldDialog.vue'
import DeviceSelectDialog from './JsComponents/DeviceSelectDialog.vue'
import MetricsSelect from './JsComponents/MetricsSelect.vue'

export default {
  name: 'IotEditForm',
  components: {
    LabelSelect,
    OutputFieldDialog,
    DeviceSelectDialog,
    MetricsSelect
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    datasetId: {
      type: [String, Number],
      default: ''
    },
    appCode: {
      type: String,
      default: ''
    }
  },
  data () {
    return {
      saveText: '',
      dataForm: {
        id: '',
        name: '',
        typeId: '',
        datasetType: '',
        remark: '',
        cache: 0,
        labelIds: [],
        device_id: '',
        key: '',
        data_type: 'telemetry',
        data_mode: 'latest',
        time_range: 'last_1_hour',
        aggregate_window: '1m',
        aggregate_function: 'avg',
        config: {
          className: 'com.gccloud.dataset.entity.config.IotDataSetConfig', // 修正为IotDataSetConfig
          requestType: 'frontend',  // 默认使用前端代理
          method: 'get',
          url: 'http://47.115.210.16:9999/api/v1/device/metrics/chart',
          headers: [],
          params: [],
          body: '',
          paramsList: [],
          fieldList: [],
          fieldDesc: null,
          responseScript: 'return resp.data' // 添加默认响应脚本
        }
      },
      // 单独创建查询参数对象，这些参数不会直接存储到dataForm中
      queryParams: {
        device_id: '',
        device_name: '',
        key: '',
        data_type: 'telemetry',
        data_mode: 'latest',
        time_range: 'last_1_hour',
        aggregate_window: '1m',
        aggregate_function: 'avg',
        start_ts: null,
        end_ts: null
      },
      rules: {
        name: [{ required: true, message: '请输入数据集名称', trigger: 'blur' }],
        typeId: [{ required: true, message: '请选择分组', trigger: 'change' }],
        device_id: [{ required: true, message: '请选择设备', trigger: 'change' }],
        key: [{ required: true, message: '请选择数据标识', trigger: 'change' }],
        data_type: [{ required: true, message: '请选择数据类型', trigger: 'change' }],
        data_mode: [{ required: true, message: '请选择数据模式', trigger: 'change' }],
        time_range: [{ required: true, message: '请选择时间范围', trigger: 'change' }],
        aggregate_window: [{ required: true, message: '请选择聚合窗口', trigger: 'change' }],
        aggregate_function: [{ required: true, message: '请选择聚合方式', trigger: 'change' }],
        customTimeRange: [{ required: true, message: '请选择时间区间', trigger: 'change' }]
      },
      categoryData: [],
      typeName: '',
      deviceList: [], // 设备列表
      keyList: [], // 数据标识列表
      executeLoading: false,
      dataPreviewList: [],
      outputFieldList: [],
      deviceDialogVisible: false,
      deviceSearchKeyword: '',
      selectedDeviceName: '',
      selectedDevice: null,
      filteredDeviceList: [],
      dataPath: 'data',
      responseData: null,
      customTimeRange: null,
      pickerOptions: {
        shortcuts: [
          {
            text: '最近一天',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一周',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
              picker.$emit('pick', [start, end]);
            }
          },
          {
            text: '最近一个月',
            onClick(picker) {
              const end = new Date();
              const start = new Date();
              start.setMonth(start.getMonth() - 1);
              picker.$emit('pick', [start, end]);
            }
          }
        ]
      },
      aggregateWindowOptions: [
        { label: '不聚合', value: 'no_aggregate' },
        { label: '30秒', value: '30s' },
        { label: '1分钟', value: '1m' },
        { label: '2分钟', value: '2m' },
        { label: '5分钟', value: '5m' },
        { label: '10分钟', value: '10m' },
        { label: '30分钟', value: '30m' },
        { label: '1小时', value: '1h' },
        { label: '3小时', value: '3h' },
        { label: '6小时', value: '6h' },
        { label: '1天', value: '1d' },
        { label: '7天', value: '7d' },
        { label: '1个月', value: '1mo' }
      ],
      autoNaming: false,
      dataTypeNameMap: {
        telemetry: '遥',
        attribute: '属',
        command: '命',
        event: '事'
      },
      dataModeNameMap: {
        latest: '新',
        history: '历'
      },
      lastAutoName: '',
      deviceLoading: false,
      devicePagination: {
        page: 1,
        page_size: 10,
        total: 0
      },
      metricsDataByType: {},
      keyLoading: false,
      metricsSearchKeyword: '',
      filteredKeyList: [],
      filteredMetricsDataByType: {},
      deviceOnlineFilter: '',
      deviceStatusLoading: false,
      onlineStatusOptions: [
        { label: '全部', value: '' },
        { label: '在线', value: '1' },
        { label: '离线', value: '0' }
      ],
      fieldFillDialogVisible: false,
      shouldAutoExecute: false,
      groupNameMap: {},
      pathForm: {
        dataPath: 'data'
      }
    }
  },
  computed: {
    availableAggregateWindows () {
      const timeRange = this.dataForm.time_range
      let minWindowIndex = 0 // 默认所有选项都可用

      // 根据时间范围设置最小可用聚合间隔
      if (timeRange === 'last_3h') {
        minWindowIndex = 1 // 从30s开始
      } else if (timeRange === 'last_6h') {
        minWindowIndex = 2 // 从1m开始
      } else if (timeRange === 'last_12h') {
        minWindowIndex = 3 // 从2m开始
      } else if (timeRange === 'last_24h') {
        minWindowIndex = 4 // 从5m开始
      } else if (timeRange === 'last_3d') {
        minWindowIndex = 5 // 从10m开始
      } else if (timeRange === 'last_7d') {
        minWindowIndex = 6 // 从30m开始
      } else if (timeRange === 'last_15d') {
        minWindowIndex = 7 // 从1h开始
      } else if (timeRange === 'last_30d') {
        minWindowIndex = 8 // 从3h开始
      } else if (timeRange === 'last_60d') {
        minWindowIndex = 9 // 从6h开始
      } else if (timeRange === 'last_90d') {
        minWindowIndex = 10 // 从1d开始
      } else if (timeRange === 'last_6m') {
        minWindowIndex = 11 // 从7d开始
      } else if (timeRange === 'last_1y') {
        minWindowIndex = 12 // 只能选1mo
      } else if (timeRange === 'custom' && this.customTimeRange) {
        // 自定义时间范围的处理
        const [start, end] = this.customTimeRange
        const diffHours = (end - start) / (1000 * 60 * 60)
        
        if (diffHours >= 3 && diffHours < 6) {
          minWindowIndex = 1 // 从30s开始
        } else if (diffHours >= 6 && diffHours < 12) {
          minWindowIndex = 2 // 从1m开始
        } else if (diffHours >= 12 && diffHours < 24) {
          minWindowIndex = 3 // 从2m开始
        }
        // ... 其他区间按照类似的逻辑处理
      }

      // 返回处理后的选项列表
      return this.aggregateWindowOptions.map((option, index) => ({
        ...option,
        disabled: index < minWindowIndex
      }))
    },
    parsedResponseData() {
      if (!this.responseData || !this.pathForm.dataPath) return null

      try {
        // 解析数据路径 data 或 data.points
        const paths = this.pathForm.dataPath.split('.')
        let result = this.responseData

        // 顺着路径取值
        for (const path of paths) {
          if (result && result[path] !== undefined) {
            result = result[path]
          } else {
            console.warn(`数据路径 ${this.pathForm.dataPath} 不存在`)
            return null
          }
        }

        return result
      } catch (error) {
        console.error('解析数据失败:', error)
        return null
      }
    },
    groupDisplayName() {
      return this.dataForm.config.typeId && this.groupNameMap[this.dataForm.config.typeId] 
        ? this.groupNameMap[this.dataForm.config.typeId]
        : this.dataForm.config.typeId || ''
    }
  },
  watch: {
    // 监听参数变化以更新自动名称
    'selectedDeviceName': function(newVal) {
      if (this.autoNaming) this.updateAutoName();
    },
    'queryParams.key': function(newVal) {
      // 同步到dataForm
      this.dataForm.key = newVal;
      if (this.autoNaming) this.updateAutoName();
    },
    'queryParams.data_type': function(newVal) {
      // 同步到dataForm
      this.dataForm.data_type = newVal;
      if (this.autoNaming) this.updateAutoName();
    },
    'queryParams.data_mode': function(newVal) {
      // 同步到dataForm
      this.dataForm.data_mode = newVal;
      if (this.autoNaming) this.updateAutoName();
    },
    'queryParams.device_id': function(newVal) {
      // 同步到dataForm
      this.dataForm.device_id = newVal;
    },
    'queryParams.time_range': function(newVal) {
      // 同步到dataForm
      this.dataForm.time_range = newVal;
    },
    'queryParams.aggregate_window': function(newVal) {
      // 同步到dataForm
      this.dataForm.aggregate_window = newVal;
    },
    'queryParams.aggregate_function': function(newVal) {
      // 同步到dataForm
      this.dataForm.aggregate_function = newVal;
    }
  },
  created() {
    // 初始化表单数据
    this.initFormData()
  },
  mounted() {
    // 组件挂载完成后的处理
  },
  methods: {
    // 初始化表单数据
    async initFormData() {
      // 获取分类树数据
      try {
        this.categoryData = await getCategoryTree({ tableName: 'dataset', moduleCode: this.appCode })
        
        // 如果只有分类ID，不是编辑模式，设置默认分类
        if (this.typeId && !this.datasetId) {
          this.dataForm.typeId = this.typeId
          this.$nextTick(() => {
            try {
              this.typeName = this.$refs.categorySelectTree.getNode(this.dataForm.typeId).data.name
            } catch (error) {
              console.error(error)
            }
          })
        }
        
        // 如果在编辑模式，获取数据集详情
        if (this.datasetId) {
          try {
            const response = await getDataset(this.datasetId)
            console.log('获取到数据集详情:', response)
            
            // 检查返回的数据结构
            if (response && response.id) {
              // 直接使用response作为结果，不需要result字段
              const {
                id,
                name,
                typeId,
                remark,
                datasetType,
                moduleCode,
                editable,
                sourceId,
                cache,
                config = {}
              } = response
              
              // 设置表单数据
              this.dataForm = {
                id, // 保存ID，用于判断是新增还是更新
                name,
                typeId,
                remark,
                datasetType,
                moduleCode,
                editable,
                sourceId,
                cache,
                config: { ...config } // 复制config以避免引用问题
              }
              
              // 设置分组名称
              if (this.dataForm.typeId) {
                this.$nextTick(() => {
                  try {
                    this.typeName = this.$refs.categorySelectTree.getNode(this.dataForm.typeId).data.name
                  } catch (error) {
                    console.error(error)
                  }
                })
              }
              
              // 设置自动命名状态
              if (this.isEdit) {
                this.autoNaming = false // 编辑模式下默认关闭自动命名
              }
              
              // 处理配置数据
              if (config) {
                // 直接设置设备ID和数据标识
                if (config.device_id) {
                  this.dataForm.queryParams.device_id = config.device_id
                }
                
                if (config.key) {
                  this.dataForm.queryParams.key = config.key
                }
                
                // 处理params，查找device_id和设备名称
                if (config.params && Array.isArray(config.params)) {
                  // 移除重复的参数，保留最后一个
                  const uniqueParams = {}
                  config.params.forEach(param => {
                    uniqueParams[param.key] = param.value
                  })
                  
                  // 优先从params中获取device_name
                  if (uniqueParams.device_name) {
                    this.selectedDeviceName = uniqueParams.device_name
                  }
                  
                  // 如果没有设置device_id，从params中获取
                  if (!this.dataForm.queryParams.device_id && uniqueParams.device_id) {
                    this.dataForm.queryParams.device_id = uniqueParams.device_id
                  }
                  
                  // 如果没有设置key，从params中获取
                  if (!this.dataForm.queryParams.key && uniqueParams.key) {
                    this.dataForm.queryParams.key = uniqueParams.key
                  }
                  
                  // 从params获取分类名称
                  if (uniqueParams.type_name && !this.typeName) {
                    this.typeName = uniqueParams.type_name
                  }
                  
                  // 回显time_range
                  if (uniqueParams.time_range && !this.dataForm.queryParams.time_range) {
                    this.dataForm.queryParams.time_range = uniqueParams.time_range
                  }
                  
                  // 回显aggregate_window
                  if (uniqueParams.aggregate_window && !this.dataForm.queryParams.aggregate_window) {
                    this.dataForm.queryParams.aggregate_window = uniqueParams.aggregate_window
                  }
                  
                  // 回显aggregate_function
                  if (uniqueParams.aggregate_function && !this.dataForm.queryParams.aggregate_function) {
                    this.dataForm.queryParams.aggregate_function = uniqueParams.aggregate_function
                  }
                  
                  // 回显data_type
                  if (uniqueParams.data_type && !this.dataForm.queryParams.data_type) {
                    this.dataForm.queryParams.data_type = uniqueParams.data_type
                  }
                  
                  // 回显data_mode
                  if (uniqueParams.data_mode && !this.dataForm.queryParams.data_mode) {
                    this.dataForm.queryParams.data_mode = uniqueParams.data_mode
                  }
                }
                
                // 设置字段描述和输出字段列表
                this.dataForm.fieldDesc = config.fieldDesc || {}
                this.outputFieldList = config.fieldList || []
              }
              
              // 如果是历史数据模式，设置时间选择器的值
              if (this.dataForm.data_mode === 'history') {
                if (this.dataForm.time_range === 'custom') {
                  if (config.start_ts && config.end_ts) {
                    this.customTimeRange = [
                      new Date(Number(config.start_ts)),
                      new Date(Number(config.end_ts))
                    ]
                  } 
                  // 尝试从config.params中获取时间戳
                  else if (config.params && Array.isArray(config.params)) {
                    const uniqueParams = {}
                    config.params.forEach(param => {
                      uniqueParams[param.key] = param.value
                    })
                  
                    if (uniqueParams.start_ts && uniqueParams.end_ts) {
                      this.dataForm.queryParams.start_ts = uniqueParams.start_ts
                      this.dataForm.queryParams.end_ts = uniqueParams.end_ts
                      this.customTimeRange = [
                        new Date(Number(uniqueParams.start_ts)),
                        new Date(Number(uniqueParams.end_ts))
                      ]
                    }
                  }
                }
              }
              
              // 确保数据路径设置正确
              this.setDataPath()
            } else {
              // 处理格式不正确的响应
              console.error('数据集详情格式不正确:', response)
              Message.error('获取数据集详情失败')
            }
          } catch (error) {
            console.error('获取数据集详情失败:', error)
            Message.error('获取数据集详情失败')
          }
        } else {
          // 新增模式，初始化表单
          this.dataForm = {
            name: '',
            typeId: '',
            categoryId: '',
            source: 'http',
            datasetType: 'iot', // 添加datasetType字段
            queryParams: {
              device_id: null,
              key: '',
              data_type: 'telemetry',
              data_mode: 'latest',
              time_range: 'last_1_hour',
              aggregate_window: '1m',
              aggregate_function: 'avg',
              start_ts: null,
              end_ts: null
            },
            config: {
              className: 'com.gccloud.dataset.entity.config.IotDataSetConfig', // 使用正确的类名
              requestType: 'frontend',  // 默认使用前端代理
              method: 'get',
              url: 'http://47.115.210.16:9999/api/v1/device/metrics/chart',
              headers: [],
              params: [],
              body: '',
              responseScript: ''
            }
          }
          
          // 初始化数据路径表单
          this.pathForm = {
            dataPath: 'data'
          }
          
          // 默认查询参数
          this.dataForm.queryParams = {
            device_id: null,
            key: '',
            data_type: 'telemetry',
            data_mode: 'latest',
            time_range: 'last_1_hour',
            aggregate_window: '1m',
            aggregate_function: 'avg',
            start_ts: null,
            end_ts: null
          }
          
          // 初始化数据路径
          this.setDataPath()
        }
      } catch (error) {
        console.error('初始化表单数据失败:', error)
        Message.error('初始化数据失败')
      }
    },

    // 保存 - 简化逻辑，移除自动执行
    async save(formName, ignoreFill = false) {
      // 方法已移除，保存逻辑已删除
      console.log('保存方法已被禁用')
    },

    // 分类相关方法
    clearType() {
      this.typeName = ''
      this.dataForm.typeId = ''
    },

    setCurrentNode(event) {
      if (event) {
        const key = this.dataForm.typeId || null
        this.$refs.categorySelectTree.setCurrentKey(key)
      }
    },

    selectParentCategory(value) {
      this.dataForm.typeId = value.id
      this.typeName = value.name
      this.$refs.selectParentName.blur()
    },

    handleCustomTimeChange(timeRange) {
      if (!timeRange) {
        this.dataForm.queryParams.start_time = null
        this.dataForm.queryParams.end_time = null
        return
      }
      
      this.dataForm.queryParams.start_time = timeRange[0].toISOString()
      this.dataForm.queryParams.end_time = timeRange[1].toISOString()
      
      // 计算时间区间小时差
      const diffHours = (timeRange[1] - timeRange[0]) / (1000 * 60 * 60)
      
      // 当前选择的聚合窗口
      const currentWindow = this.dataForm.queryParams.aggregate_window
      
      // 获取当前选择的聚合窗口在选项中的索引
      const currentWindowIndex = this.aggregateWindowOptions.findIndex(option => option.value === currentWindow)
      
      // 根据时间区间长度确定最小可用聚合间隔索引
      let minWindowIndex = 0
      
      if (diffHours >= 3 && diffHours < 6) {
        minWindowIndex = 1 // 从30s开始
      } else if (diffHours >= 6 && diffHours < 12) {
        minWindowIndex = 2 // 从1m开始
      } else if (diffHours >= 12 && diffHours < 24) {
        minWindowIndex = 3 // 从2m开始
      } else if (diffHours >= 24 && diffHours < 72) {
        minWindowIndex = 4 // 从5m开始
      } else if (diffHours >= 72 && diffHours < 168) {
        minWindowIndex = 5 // 从10m开始
      } else if (diffHours >= 168 && diffHours < 360) {
        minWindowIndex = 6 // 从30m开始
      } else if (diffHours >= 360 && diffHours < 720) {
        minWindowIndex = 7 // 从1h开始
      } else if (diffHours >= 720 && diffHours < 1440) {
        minWindowIndex = 8 // 从3h开始
      } else if (diffHours >= 1440 && diffHours < 2160) {
        minWindowIndex = 9 // 从6h开始
      } else if (diffHours >= 2160 && diffHours < 4320) {
        minWindowIndex = 10 // 从1d开始
      } else if (diffHours >= 4320) {
        minWindowIndex = 11 // 从7d开始
      }
      
      // 如果当前选择的聚合窗口不可用，则自动选择第一个可用选项
      if (currentWindowIndex < minWindowIndex) {
        this.dataForm.queryParams.aggregate_window = this.aggregateWindowOptions[minWindowIndex].value
        this.handleAggregateWindowChange(this.dataForm.queryParams.aggregate_window)
      }
    },

    // 更新输出字段列表（与HttpEditForm保持一致）
    updateOutputFieldList(dataList) {
      if (dataList && dataList.length) {
        const newList = Object.keys(dataList?.[0])?.map(key => {
          return {
            fieldName: key,
            fieldDesc: ''
          }
        })
        // 如果之前已经有字段列表，则需要进行对比
        if (this.outputFieldList && this.outputFieldList.length) {
          this.outputFieldList = this.compareArr(newList, this.outputFieldList)
        } else {
          this.outputFieldList = newList
        }
      }
    },

    // 用来对两个数组进行对比（与HttpEditForm保持一致）
    compareArr(newList, oldList) {
      // 创建一个空数组，用于存储最终的结果
      const result = []
      // 遍历新列表中的每个字段
      newList.forEach(newField => {
        // 在旧列表中查找相同名称的字段
        const oldField = oldList.find(item => item.fieldName === newField.fieldName)
        if (oldField) {
          // 如果在旧列表中找到了相同名称的字段，则保留旧字段的描述
          result.push({
            fieldName: newField.fieldName,
            fieldDesc: oldField.fieldDesc || '',
            required: oldField.required || false
          })
        } else {
          // 如果在旧列表中没有找到相同名称的字段，则添加新字段
          result.push({
            fieldName: newField.fieldName,
            fieldDesc: '',
            required: false
          })
        }
      })
      return result
    },

    // 字段描述构建及同步（与HttpEditForm完全一致）
    buildFieldDesc() {
      const fieldDesc = {}
      this.outputFieldList.forEach(field => {
        if (this.dataForm.fieldDesc && this.dataForm.fieldDesc.hasOwnProperty(field.fieldName)) {
          fieldDesc[field.fieldName] = this.dataForm.fieldDesc[field.fieldName]
        } else {
          fieldDesc[field.fieldName] = field.fieldDesc || ''
        }
      })
      this.dataForm.fieldDesc = fieldDesc
    },

    // 格式化时间
    formatTime(timestamp) {
      if (!timestamp) return '暂无数据'
      try {
        const date = new Date(timestamp)
        return date.toLocaleString()
      } catch (error) {
        return '时间格式错误'
      }
    },

    // 获取数据类型显示名称
    getDataTypeLabel(type) {
      // 直接返回原始值，不翻译
      return type
    },
    
    // 刷新设备列表
    resetDeviceSearch() {
      this.deviceSearchKeyword = ''
      this.deviceOnlineFilter = ''
      this.devicePagination.page = 1
    },

    // 更新所有设备的在线状态 - 不再调用API
    async updateAllDevicesStatus() {
      // 设备列表中已包含在线状态，不需要额外请求
      // 可以移除此方法或保留为空实现
    },

    // 字段值填充
    fieldDescFill() {
      this.dataForm.fieldDesc = {}
      this.outputFieldList.forEach(field => {
        if (field.fieldDesc === '' || !field.hasOwnProperty('fieldDesc')) {
          this.dataForm.fieldDesc[field.fieldName] = field.fieldName
        } else {
          this.dataForm.fieldDesc[field.fieldName] = field.fieldDesc
        }
      })
      this.$refs.fieldFillDialog.close()
    },
    
    // 继续保存
    toSave() {
      // 方法已移除，保存逻辑已删除
      console.log('保存方法已被禁用')
      this.$refs.fieldFillDialog.close()
    },
    
    // 进入编辑
    fieldDescEdit() {
      this.$refs.fieldFillDialog.close()
      this.$refs.outputFieldDialog.open()
    },

    handleOutputConfirm(outputFieldList) {
      // 方法已移除，保存逻辑已删除
      console.log('输出字段确认逻辑已被禁用')
      this.outputFieldList = outputFieldList
      this.$refs.outputFieldDialog.close()
    },

    handleDeviceSelect(device) {
      if (!device) return
      
      this.dataForm.device_id = device.id
      this.selectedDeviceName = device.name
      this.dataForm.queryParams.device_id = device.id
      this.dataForm.queryParams.device_name = device.name
      this.dataForm.key = ''
      
      if (this.autoNaming) {
        this.updateAutoName()
      }
    },
    
    handleMetricsChange(item) {
      if (!item) return
      
      if (this.autoNaming) {
        this.updateAutoName()
      }
    },

    // 处理MetricsSelect组件的选择事件
    handleMetricsSelect(key) {
      this.dataForm.key = key
      this.queryParams.key = key
      
      if (this.autoNaming) {
        this.updateAutoName()
      }
    },

    // 更新数据路径
    setDataPath() {
      if (this.queryParams.data_mode === 'latest') {
        this.pathForm.dataPath = 'data'
        // 更新responseScript，与HTTP保持一致
        this.dataForm.config.responseScript = 'return resp.data'
      } else if (this.queryParams.data_mode === 'history') {
        this.pathForm.dataPath = 'data'
        // 更新responseScript，与HTTP保持一致
        this.dataForm.config.responseScript = 'return resp.data'
      }
    },

    // 打开设备选择弹窗
    openDeviceDialog() {
      // 设置选中的设备 (用于回显)
      this.$refs.deviceSelectDialog.show(this.selectedDevice)
    },

    // 更新自动名称方法
    updateAutoName() {
      if (!this.autoNaming) return
      
      let newName = ''
      
      // 设备名称部分
      if (this.selectedDeviceName) {
        newName += this.selectedDeviceName
      }
      
      // 数据标识部分
      if (this.queryParams.key) {
        if (newName) newName += ' - '
        newName += this.queryParams.key
      }
      
      // 数据类型部分
      if (this.queryParams.data_type) {
        if (newName) newName += ' - '
        newName += this.getDataTypeLabel(this.queryParams.data_type)
      }
      
      // 数据模式部分
      if (this.queryParams.data_mode === 'history') {
        if (newName) newName += ' - '
        newName += '历史数据'
      } else {
        if (newName) newName += ' - '
        newName += '最新数据'
      }
      
      // 设置新名称
      if (newName) {
        this.dataForm.name = newName.trim()
      }
    },

    // 处理自动命名复选框变更
    handleAutoNamingChange(checked) {
      if (checked) {
        this.updateAutoName()
      }
    },

    handleNameInput(value) {
      this.dataForm.name = value
      // 当用户手动输入名称时，关闭自动命名
      this.autoNaming = false
    },

    handleDataTypeChange(value) {
      this.queryParams.data_type = value
      if (this.autoNaming) {
        this.updateAutoName()
      }
    },

    handleDataModeChange(value) {
      this.queryParams.data_mode = value
      // 更新数据路径
      this.setDataPath()
      
      if (this.autoNaming) {
        this.updateAutoName()
      }
    },

    handleTimeRangeChange(value) {
      this.dataForm.queryParams.time_range = value
      if (this.autoNaming) {
        this.updateAutoName()
      }
    },

    // 添加fetchDeviceList方法
    async fetchDeviceList() {
      try {
        // 如果已经有设备列表，不需要重新获取
        if (this.deviceList && this.deviceList.length > 0) {
          return
        }
        
        // 获取设备列表
        const response = await getDeviceList({})
        console.log('设备列表API响应:', response)
        
        // 处理不同格式的API响应
        let deviceListData = []
        if (response) {
          // 如果response包含data字段(标准响应)
          if (response.data) {
            if (response.data.code === 0 || response.data.code === 200) {
              deviceListData = response.data.result || response.data.data || []
            } else {
              deviceListData = response.data.list || response.data || []
            }
          } 
          // 如果response直接包含code字段(直接响应)
          else if (response.code === 0 || response.code === 200) {
            deviceListData = response.result || response.list || response.data || []
          } 
          // 如果response本身就是数组
          else if (Array.isArray(response)) {
            deviceListData = response
          }
          // 其他情况，尝试各种可能的字段
          else {
            deviceListData = response.list || response.result || response || []
          }
          
          // 转换设备列表格式
          this.deviceList = Array.isArray(deviceListData) ? deviceListData.map(device => {
            return {
              id: device.id || device.deviceId,
              name: device.name,
              type: device.type || device.deviceType,
              status: device.status || device.connected ? 'online' : 'offline',
              lastActiveTime: device.lastActiveTime || device.lastActivityTime,
              description: device.description || device.desc || ''
            }
          }) : []
          
          this.filteredDeviceList = [...this.deviceList]
          
          // 如果有设备ID，查找对应的设备设置为selectedDevice
          if (this.dataForm.queryParams.device_id) {
            this.selectedDevice = this.deviceList.find(d => d.id === this.dataForm.queryParams.device_id) || null
          }
          
          console.log('处理后的设备列表:', this.deviceList)
        } else {
          console.error('获取设备列表响应为空')
        }
      } catch (error) {
        console.error('获取设备列表失败:', error)
        this.deviceList = []
        this.filteredDeviceList = []
      } finally {
        this.deviceLoading = false
      }
    },

    // 将key转换为对象格式，与后端要求保持一致
    transformKeyToObject(key) {
      // 如果已经是对象，直接返回
      if (typeof key === 'object' && key !== null) {
        return key
      }
      
      // 找到对应的metrics对象
      let selectedMetric = null
      
      if (this.allMetrics && this.allMetrics.length > 0) {
        selectedMetric = this.allMetrics.find(metric => 
          metric.key === key || 
          metric.name === key || 
          metric.id === key
        )
      }
      
      // 如果找到metrics对象，使用它的属性
      if (selectedMetric) {
        return {
          key: selectedMetric.key || selectedMetric.name || key,
          name: selectedMetric.name || selectedMetric.key || key,
          type: selectedMetric.type || selectedMetric.dataType || 'string',
          description: selectedMetric.description || ''
        }
      }
      
      // 如果没找到，构造一个基础对象
      const groupKey = this.dataForm.queryParams.typeId || this.dataForm.queryParams.data_type || 'telemetry'
      
      return {
        key: key,
        name: key,
        type: 'string',
        description: ''
      }
    },

    // 处理聚合窗口变化
    handleAggregateWindowChange(value) {
      this.dataForm.queryParams.aggregate_window = value
    },

    // 处理聚合函数变化
    handleAggregateFunctionChange(value) {
      this.dataForm.queryParams.aggregate_function = value
    },
    
    // 返回上一页
    goBack() {
      this.$emit('back')
    },

    // 执行按钮点击处理
    handleExecuteClick() {
      // 方法已被禁用，数据处理逻辑已删除
      console.log('执行查询功能已被禁用')
    },

    // 修改handleDeviceChange方法，优化分组数据回显
    async handleDeviceChange(deviceId) {
      if (!deviceId) return
      
      try {
        this.loading = true
        
        // 获取设备的数据标识
        const response = await getDeviceMetrics(deviceId)
        console.log('设备数据标识API响应:', response)
        
        // 处理不同格式的API响应
        if (response) {
          let metricsData = null
          
          // 如果response包含data字段(标准响应)
          if (response.data) {
            if (response.data.code === 0 || response.data.code === 200) {
              metricsData = response.data.result || response.data.data || response.data
            }
          } 
          // 如果response直接包含code字段(直接响应)
          else if (response.code === 0 || response.code === 200) {
            metricsData = response.result || response.data || response
          } 
          // 其他情况，尝试各种可能的字段
          else {
            metricsData = response
          }
          
          // 设置数据标识分组
          this.metricsGroups = metricsData || {}
          console.log('处理后的数据标识分组:', this.metricsGroups)
          
          // 构建分组名称映射
          this.groupNameMap = {}
          Object.keys(this.metricsGroups).forEach(groupKey => {
            // 根据分组键设置更友好的名称
            switch(groupKey) {
              case 'telemetry':
                this.groupNameMap[groupKey] = '遥测数据'
                break
              case 'attributes':
                this.groupNameMap[groupKey] = '属性数据'
                break
              case 'clientAttributes':
                this.groupNameMap[groupKey] = '客户端属性'
                break
              case 'serverAttributes':
                this.groupNameMap[groupKey] = '服务端属性'
                break
              case 'sharedAttributes':
                this.groupNameMap[groupKey] = '共享属性'
                break
              default:
                this.groupNameMap[groupKey] = groupKey
                break
            }
          })
          
          // 提取所有指标到一个扁平数组，便于搜索
          this.allMetrics = []
          Object.keys(this.metricsGroups).forEach(groupKey => {
            const group = this.metricsGroups[groupKey]
            if (Array.isArray(group)) {
              this.allMetrics = this.allMetrics.concat(group)
            }
          })
          
          // 如果有config.key，找到对应的标识进行回显
          if (this.dataForm.queryParams.key) {
            // 检查是否有匹配的数据标识
            let found = false
            
            // 在各个分组中查找
            Object.keys(this.metricsGroups).forEach(groupKey => {
              const group = this.metricsGroups[groupKey]
              if (Array.isArray(group)) {
                const foundMetric = group.find(metric => 
                  metric.key === this.dataForm.queryParams.key || 
                  metric.name === this.dataForm.queryParams.key ||
                  metric.id === this.dataForm.queryParams.key
                )
                
                if (foundMetric && !found) {
                  found = true
                  
                  // 更新typeId以匹配分组
                  this.dataForm.queryParams.typeId = groupKey
                  
                  // 同时更新表单中的typeId，确保表单提交时包含正确的分组信息
                  if (this.dataForm.queryParams.typeId && !this.dataForm.typeId) {
                    this.dataForm.typeId = this.dataForm.queryParams.typeId
                    
                    // 设置分组名称
                    if (this.groupNameMap[groupKey]) {
                      this.typeName = this.groupNameMap[groupKey]
                    }
                  }
                  
                  console.log(`找到匹配的数据标识，分组: ${groupKey}`, foundMetric)
                }
              }
            })
          }
        }
      } catch (error) {
        console.error('获取设备数据标识失败:', error)
        Message.warning('获取设备数据标识失败: ' + (error.message || error))
      } finally {
        this.loading = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.inner-container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--bs-background-1);
  border-radius: 4px;
  overflow: hidden;

  .data-set-scrollbar {
    flex: 1;
    height: calc(100vh - 60px);
  }

  .header {
    padding: 8px 12px;
    margin-bottom: 10px;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
  }

  .content-container {
    padding: 0 15px 20px;
  }

  .page-header {
    display: flex;
    justify-content: space-between;
    align-items: center;

    &-left {
      font-size: 15px;
      font-weight: 500;
      color: var(--bs-el-text);
    }

    &-right {
      display: flex;
      gap: 8px;
    }
  }

  .form-card {
    margin-bottom: 16px;
    padding: 16px;
    background: var(--bs-background-3);
    border-radius: 4px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.08);
    
    .card-title {
      font-size: 14px;
      margin-bottom: 16px;
      padding-left: 8px;
      border-left: 3px solid var(--bs-el-color-primary);
      color: #f2f2f2;
    }
  }

  .preview-column {
    height: calc(100vh - 160px);
    display: flex;
    flex-direction: column;
    padding-left: 15px;
  }

  .preview-execute {
    margin-bottom: 16px;
    text-align: right;
  }
  
  .result-container {
    flex: 1;
    min-height: 300px;
    display: flex;
    flex-direction: column;

    .response-card {
      flex: 1;
      max-height: none;
      overflow: auto;
      line-height: 1.5;
      font-size: 12px;
    }

    .empty-placeholder {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: var(--bs-el-text);

      i {
        font-size: 24px;
        margin-bottom: 8px;
      }

      span {
        font-size: 14px;
      }
    }
  }

  .tree-box {
    max-height: 300px;
    overflow-y: auto;
    background-color: var(--bs-background-2);

    .el-tree {
      background-color: transparent;
      color: var(--bs-el-text);

      .el-tree-node__content {
        &:hover {
          background-color: var(--bs-background-1);
        }
      }

      .el-tree-node.is-current > .el-tree-node__content {
        background-color: var(--bs-background-3);
      }
    }
  }

  .device-dialog-content {
    .filter-container {
      padding: 16px;
      background-color: var(--bs-background-3);
      border-radius: 4px;
      margin-bottom: 16px;

      .filter-row {
        display: flex;
        align-items: center;
        gap: 12px;

        .filter-item {
          display: flex;
          align-items: center;
          margin: 0;

          &.search-item {
            flex: 1;
            max-width: 300px;
          }

          .online-filter-select {
            width: 120px;
          }

          .reset-btn {
            white-space: nowrap;
          }
        }
      }
    }
    
    .bs-table-box {
      background-color: var(--bs-background-2);
      border-radius: 4px;
    }
  }

  :deep(.el-form-item) {
    margin-bottom: 14px;
  }

  :deep(.el-divider) {
    margin: 12px 0;
  }

  :deep(.el-divider__text) {
    font-size: 13px;
    color: var(--bs-el-text);
  }

  // 调整表单项间距
  .aggregate-item {
    :deep(.el-form-item__content) {
      margin-left: 80px !important;
    }
  }

  // 响应式调整
  @media (max-width: 1366px) {
    .el-form-item {
      :deep(.el-form-item__label) {
        line-height: 1.2;
        padding-right: 8px;
      }
      
      :deep(.el-select) {
        width: 100%;
      }
    }
  }

  .name-with-checkbox {
    display: flex;
    align-items: center;
    
    .bs-el-input {
      flex: 1;
    }
    
    .auto-naming-checkbox {
      margin-left: 10px;
  color: var(--bs-el-text);

      :deep(.el-checkbox__label) {
        color: var(--bs-el-text);
        font-size: 12px;
      }
    }
  }

  .name-operations {
    display: flex;
    align-items: center;
    margin-left: 10px;
  }

  .naming-rule-tooltip {
    max-width: 200px;
    padding: 10px;
  background-color: var(--bs-background-3);
  border-radius: 4px;
    color: var(--bs-el-text);
    font-size: 12px;
    line-height: 1.5;

    p {
      margin: 0 0 10px;
    }

    ul {
      padding-left: 20px;
    }
  }

  .name-help-icon {
    margin-left: 5px;
    cursor: pointer;
  }

  .search-filter-row {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 16px;
    align-items: center;
    
    .filter-item {
      display: flex;
      align-items: center;
      margin-right: 20px;
      margin-bottom: 8px;
      
      .filter-label {
    color: var(--bs-el-text);
        margin-right: 8px;
        font-size: 13px;
        white-space: nowrap;
      }
    }
    
    .online-option {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 100%;
      
      .device-status-dot {
        margin-left: 8px;
      }
    }
  }
}

// 引入主题变量
@import 'data-room-ui/assets/style/bsTheme.scss';

// 覆盖 element-ui 组件样式
:deep(.bs-el-input) {
  .el-input__inner {
    background-color: var(--bs-background-2) !important;
    border-color: var(--bs-border-color) !important;
    color: var(--bs-el-text) !important;
    
    &:focus {
      border-color: var(--bs-el-color-primary) !important;
    }
  }
  
  .el-input-group__append {
    background-color: var(--bs-background-3) !important;
    border-color: var(--bs-border-color) !important;
    color: var(--bs-el-text) !important;
    
    &:hover {
      background-color: var(--bs-background-4) !important;
    }
  }
}

:deep(.bs-el-select) {
  width: 100% !important;
  
  .el-input__inner {
    background-color: var(--bs-background-2) !important;
    border-color: var(--bs-border-color) !important;
    color: var(--bs-el-text) !important;
    
    &:focus {
      border-color: var(--bs-el-color-primary) !important;
    }
  }
}

:deep(.el-select-dropdown.bs-el-select) {
  background-color: var(--bs-background-1) !important;
  border: 1px solid var(--bs-border-color) !important;
  margin: 12px 0 !important;

  .el-select-dropdown__item {
    color: #fff !important;
    background-color: var(--bs-background-1) !important;
    padding: 12px !important;
    margin: 4px 0 !important;
    display: flex !important;
    align-items: center !important;

    &:hover {
      background-color: var(--bs-background-2) !important;
    }

    &.selected {
      background-color: var(--bs-background-2) !important;
    }
  }

  .el-select-dropdown__list {
    padding: 6px 0;
    max-height: 300px;
    overflow-y: auto;
  }

  .el-select-group__title {
    padding: 12px !important;
    font-size: 13px !important;
    color: #fff !important;
  }

  .el-select-group__wrap:not(:last-of-type)::after {
    background-color: var(--bs-background-3) !important;
  }

  .el-select-dropdown__empty {
    padding: 12px !important;
    color: #fff !important;
    text-align: center !important;
    height: 40px !important;
    line-height: 40px !important;
  }

  .popper__arrow {
    border-bottom-color: var(--bs-border-color) !important;
    
    &::after {
      border-bottom-color: var(--bs-background-1) !important;
    }
  }
}

.el-select-dropdown.el-popper {
  margin: 8px 0 !important;
  background-color: var(--bs-background-1) !important;
}

.el-select-dropdown.el-popper[x-placement^="bottom"] {
  margin-top: 12px !important;
  
  .popper__arrow {
    border-bottom-color: var(--bs-border-color) !important;
    
    &::after {
      border-bottom-color: var(--bs-background-1) !important;
    }
  }
}

.el-select-dropdown.el-popper[x-placement^="top"] {
  margin-bottom: 12px !important;
  
  .popper__arrow {
    border-top-color: var(--bs-border-color) !important;
    
    &::after {
      border-top-color: var(--bs-background-1) !important;
    }
  }
}

.metrics-option-content {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  
  .metrics-info {
    display: flex;
    align-items: center;
    gap: 8px;
    
    .metrics-name {
  color: var(--bs-el-text);
}

    .metrics-key {
      color: var(--bs-el-text-secondary);
      font-size: 12px;
    }
  }
  
  .metrics-data-type {
    color: var(--bs-el-text-secondary);
    font-size: 12px;
  }
}
</style>

<style lang="scss">
.form-item-container {
  .el-select-dropdown {
    background-color: var(--bs-background-1) !important;
    border: 1px solid var(--bs-border-color) !important;
    margin: 12px 0 !important;

    .el-select-dropdown__item {
      color: #fff !important;
      background-color: var(--bs-background-1) !important;
      padding: 12px !important;
      margin: 4px 0 !important;
      display: flex !important;
      align-items: center !important;

      &:hover {
        background-color: var(--bs-background-2) !important;
      }

      &.selected {
        background-color: var(--bs-background-2) !important;
      }
    }

    .el-select-dropdown__list {
      padding: 6px 0;
      max-height: 300px;
      overflow-y: auto;
    }

    .el-select-group__title {
      padding: 12px !important;
      font-size: 13px !important;
      color: #fff !important;
    }

    .el-select-group__wrap:not(:last-of-type)::after {
      background-color: var(--bs-border-color);
    }

    .el-select-dropdown__empty {
      padding: 12px !important;
      color: #fff !important;
      text-align: center !important;
      height: 40px !important;
      line-height: 40px !important;
    }

    .popper__arrow {
      border-bottom-color: var(--bs-border-color) !important;
      
      &::after {
        border-bottom-color: var(--bs-background-1) !important;
      }
    }
  }
}

.bs-pagination .el-select .el-input .el-input__inner {
  background-color: var(--bs-background-3) !important;
  border-color: var(--bs-border-color) !important;
  color: var(--bs-el-text) !important;
}

.empty-metrics {
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--bs-el-text-secondary);
  
  i {
    margin-right: 8px;
    font-size: 16px;
  }
  
  span {
    font-size: 13px;
  }
}
</style>
