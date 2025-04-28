<template>
  <div class="inner-container" v-loading="saveloading" :element-loading-text="saveText">
    <el-scrollbar class="data-set-scrollbar">
      <div class="header">
        <el-page-header class="bs-el-page-header">
          <template slot="content">
            <div class="page-header">
              <div class="page-header-left">
                {{ !isEdit ? 'IoT数据集详情' : dataForm.id ? '编辑IoT数据集' : '新增IoT数据集' }}
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
              :model="{ ...dataForm, queryParams }"
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
                      prop="queryParams.data_type"
                      :rules="queryParamsRules.data_type"
                    >
                      <el-select
                        v-model="queryParams.data_type"
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
                      prop="queryParams.data_mode"
                      :rules="queryParamsRules.data_mode"
                    >
                       <span slot="label">
                        数据模式
                        <el-tooltip placement="top" effect="dark" content="选择获取设备数据的模式：最新（最后上报的值）或历史（一段时间内的值，仅遥测数据支持）。">
                          <i class="el-icon-question" style="margin-left: 4px; cursor: pointer;"></i>
                        </el-tooltip>
                      </span>
                      <el-select
                        v-model="queryParams.data_mode"
                        class="bs-el-select"
                        popper-class="bs-el-select"
                        @change="handleDataModeChange"
                      >
                        <el-option label="最新数据" value="latest" />
                        <el-option
                          label="历史数据"
                          value="history"
                          :disabled="queryParams.data_type !== 'telemetry'"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div v-if="queryParams.data_mode === 'history' && queryParams.data_type === 'telemetry'">
                  <el-divider content-position="left">历史数据参数</el-divider>
                  <el-row :gutter="16">
                    <el-col :span="12">
                      <el-form-item
                        label="时间范围"
                        prop="queryParams.time_range"
                        :rules="queryParamsRules.time_range"
                        label-width="80px"
                      >
                        <el-select
                          v-model="queryParams.time_range"
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
                    <el-col :span="12" v-if="queryParams.time_range === 'custom'">
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
                        prop="queryParams.aggregate_window"
                        :rules="queryParamsRules.aggregate_window"
                        label-width="80px"
                        class="aggregate-item"
                      >
                        <span slot="label">
                          聚合间隔
                          <el-tooltip placement="top" effect="dark" content="查询历史数据时，将数据按指定时间窗口聚合计算（如每分钟平均值）。'不聚合'表示获取原始数据点。">
                            <i class="el-icon-question" style="margin-left: 4px; cursor: pointer;"></i>
                          </el-tooltip>
                        </span>
                        <el-select
                          v-model="queryParams.aggregate_window"
                          placeholder="请选择聚合窗口"
                          class="bs-el-select"
                          popper-class="bs-el-select"
                          @change="handleAggregateWindowChange"
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
                    <el-col :span="12" v-if="queryParams.aggregate_window !== 'no_aggregate'">
                      <el-form-item
                        label="聚合方式"
                        prop="queryParams.aggregate_function"
                        :rules="queryParamsRules.aggregate_function"
                        label-width="80px"
                      >
                        <el-select
                          v-model="queryParams.aggregate_function"
                          class="bs-el-select"
                          popper-class="bs-el-select"
                          @change="handleAggregateFunctionChange"
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
                      prop="queryParams.device_id"
                      :rules="queryParamsRules.device_id"
                    >
                      <div class="device-select-input"  @click="openDeviceDialog">
                        <el-input
                          v-model="selectedDeviceName"
                          readonly
                          width="250px"
                          placeholder="请选择设备"
                          class="bs-el-input"
                        />
                        <el-button

                          type="primary"

                          size="small"
                          style="padding:0 8px;height: 28px;"
                        >
                          选择设备
                        </el-button>
                      </div>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="数据标识"
                      prop="queryParams.key"
                      :rules="queryParamsRules.key"
                    >
                      <MetricsSelect
                        v-model="queryParams.key"
                        :device-id="queryParams.device_id"
                        placeholder="选择数据标识"
                        :data-type="queryParams.data_type"
                        @select="handleMetricsSelect"
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
                <el-form-item prop="dataPath">
                  <span slot="label">
                      数据路径
                      <el-tooltip placement="top" effect="dark" content="用于从执行结果中提取实际数据列表的路径，使用点表示法，例如：data 或 data.points。请参考右侧执行后的原始响应结构。">
                        <i class="el-icon-question" style="margin-left: 4px; cursor: pointer;"></i>
                      </el-tooltip>
                    </span>
                  <el-input
                    v-model="pathForm.dataPath"
                    class="bs-el-input"
                    placeholder="例如: data 或 data.points"
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

    <!-- Buttons container moved outside el-scrollbar -->
    <div v-if="isEdit" class="form-actions">
        <el-button
          type="primary"
          size="small"
          :loading="saveloading"
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
      <div v-else class="form-actions">
        <el-button
          class="bs-el-button-default"
          size="small"
          @click="goBack"
        >
          返回
        </el-button>
    </div>

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
import { getDataset, getCategoryTree, datasetExecuteTest, datasetAdd, datasetUpdate } from '../../js/utils/datasetConfigService'
import { getDeviceList, getDeviceMetrics } from '../../js/utils/iotApiService'
import { Message } from 'element-ui'
import LabelSelect from 'data-room-ui/DataSetLabelManagement/src/LabelSelect.vue'
import OutputFieldDialog from './JsComponents/OutputFieldDialog.vue'
import DeviceSelectDialog from './JsComponents/DeviceSelectDialog.vue'
import MetricsSelect from './JsComponents/MetricsSelect.vue'
import axiosFormatting from '../../js/utils/httpParamsFormatting'

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
      saveloading: false,
      dataForm: {
        id: '',
        name: '',
        typeId: '',
        datasetType: '',
        remark: '',
        cache: 0,
        labelIds: [],
        config: {
          className: 'com.gccloud.dataset.entity.config.IotDataSetConfig', // 修正为IotDataSetConfig
          requestType: 'frontend',  // 默认使用前端代理
          method: 'get',
          url: 'http://47.115.210.16:9999/api/v1/device/metrics/chart',
          headers: [],
          params: [], // 添加params数组用于存储参数
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
      selectedMetric: null, // 选中的完整数据标识对象
      rules: {
        name: [{ required: true, message: '请输入数据集名称', trigger: 'blur' }],
        typeId: [{ required: true, message: '请选择分组', trigger: 'change' }]
      },
      // 为queryParams添加专门的校验规则
      queryParamsRules: {
        device_id: [{ required: true, message: '请选择设备', trigger: 'change' }],
        key: [{ required: true, message: '请选择数据标识', trigger: 'change' }],
        data_type: [{ required: true, message: '请选择数据类型', trigger: 'change' }],
        data_mode: [{ required: true, message: '请选择数据模式', trigger: 'change' }],
        time_range: [{ required: true, message: '请选择时间范围', trigger: 'change' }],
        aggregate_window: [{ required: true, message: '请选择聚合窗口', trigger: 'change' }],
        aggregate_function: [{ required: true, message: '请选择聚合方式', trigger: 'change' }]
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
      pathForm: {
        dataPath: 'data'
      },
      responseData: null,
      parsedResponseData: null,
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
      metricsGroups: {},
      allMetrics: [],
      loading: false
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
      if (this.autoNaming) this.updateAutoName();
      this.updateParams();
      
      
    },
    'queryParams.data_type': function(newVal) {
      if (this.autoNaming) this.updateAutoName();
      this.updateParams();
    },
    'queryParams.data_mode': function(newVal) {
      if (this.autoNaming) this.updateAutoName();
      this.updateParams();
    },
    'queryParams.device_id': function(newVal) {
      this.updateParams();
    },
    'queryParams.device_name': function(newVal) {
      this.updateParams();
    },
    'queryParams.time_range': function(newVal) {
      this.updateParams();
    },
    'queryParams.aggregate_window': function(newVal) {
      this.updateParams();
    },
    'queryParams.aggregate_function': function(newVal) {
      this.updateParams();
    },
    'queryParams.start_ts': function(newVal) {
      this.updateParams();
    },
    'queryParams.end_ts': function(newVal) {
      this.updateParams();
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

          // 查找分类名称
          const findCategoryName = (nodes) => {
            for (const node of nodes) {
              if (node.id === this.typeId) {
                return node.name
              }
              if (node.children && node.children.length) {
                const name = findCategoryName(node.children)
                if (name) return name
              }
            }
            return null
          }

          this.typeName = findCategoryName(this.categoryData) || ''
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
                datasetType,
                remark,
                cache,
                labelIds = [],
                createTime,
                updateTime,
                createBy,
                updateBy,
                config = {}
              } = response

              // 设置表单数据
              this.dataForm = {
                id, // 保存ID，用于判断是新增还是更新
                name,
                typeId,
                datasetType,
                remark,
                cache,
                labelIds,
                createTime,
                updateTime,
                createBy,
                updateBy,
                config: { ...config } // 复制config以避免引用问题
              }

              // 设置分组名称
              if (this.dataForm.typeId) {
                this.$nextTick(() => {
                  const findCategoryName = (nodes) => {
                    for (const node of nodes) {
                      if (node.id === this.dataForm.typeId) {
                        return node.name
                      }
                      if (node.children && node.children.length) {
                        const name = findCategoryName(node.children)
                        if (name) return name
                      }
                    }
                    return null
                  }
                  this.typeName = findCategoryName(this.categoryData) || ''
                })
              }

              // 设置自动命名状态
              if (this.isEdit) {
                this.autoNaming = false // 编辑模式下默认关闭自动命名
              }

              // 处理配置数据
              if (config) {
                // === Corrected Logic: Prioritize userDefinedJson.queryParams ===
                if (config.userDefinedJson && config.userDefinedJson.queryParams) {
                  // Directly assign queryParams from the stored object
                  this.queryParams = { 
                    ...this.queryParams, // Keep defaults initially
                    ...config.userDefinedJson.queryParams // Overwrite with stored values
                  };
                   // Ensure selectedDeviceName is set from queryParams if available
                  if(this.queryParams.device_name){
                    this.selectedDeviceName = this.queryParams.device_name;
                  }
                  console.log('Loaded queryParams from userDefinedJson:', this.queryParams);
                } else {
                   // Fallback/Old logic (might be removable if userDefinedJson is always present)
                   console.warn('userDefinedJson.queryParams not found in config, attempting fallback.');
                   // ... (keep old logic here if needed as a fallback) ...
                    if (config.data_type) this.queryParams.data_type = config.data_type;
                    if (config.data_mode) this.queryParams.data_mode = config.data_mode;
                    if (config.device_id) this.queryParams.device_id = config.device_id;
                    if (config.key) this.queryParams.key = config.key;
                    // ... (rest of the old param parsing logic) ...
                }
                // === End Corrected Logic ===

                // 设置字段描述和输出字段列表
                this.dataForm.config.fieldDesc = config.fieldDesc || {}
                this.outputFieldList = config.fieldList || []
              }

              // 确保在设备列表加载后查找设备名称
              await this.fetchDeviceList() // Ensure device list is loaded
              if (!this.selectedDeviceName && this.queryParams.device_id && this.deviceList.length > 0) {
                  const foundDevice = this.deviceList.find(d => d.id === this.queryParams.device_id)
                  if(foundDevice) {
                      this.selectedDeviceName = foundDevice.name
                      this.queryParams.device_name = foundDevice.name // Also update queryParams if needed
                  }
              }

              // 根据responseScript设置dataPath
              if (this.dataForm.config.responseScript) {
                const scriptText = this.dataForm.config.responseScript;
                if (scriptText.includes('resp.data.points')) {
                  this.pathForm.dataPath = 'data.points';
                  this.queryParams.data_mode = 'history';
                } else {
                  this.pathForm.dataPath = 'data';
                  this.queryParams.data_mode = 'latest';
                }
                console.log(`根据responseScript回显数据路径: ${this.pathForm.dataPath}, data_mode: ${this.queryParams.data_mode}`);
              } else {
                // 设置默认responseScript
                this.dataForm.config.responseScript = 'return resp.data';
                this.pathForm.dataPath = 'data';
              }

              // 确保数据路径设置正确
              this.setDataPath()
            } else {
              console.error('获取数据集详情失败:', response)
              Message.error('获取数据集详情失败')
            }
          } catch (error) {
            console.error('获取数据集详情出错:', error)
            Message.error('获取数据集详情出错')
          }
        } else {
          // 新增模式，初始化表单
          this.dataForm = {
            id: '',
            name: '',
            typeId: this.typeId || '',
            datasetType: 'iot',
            remark: '',
            cache: 0,
            labelIds: [],
            config: {
              className: 'com.gccloud.dataset.entity.config.IotDataSetConfig', // 使用正确的类名
              requestType: 'frontend',  // 默认使用前端代理
              method: 'get',
              url: 'http://47.115.210.16:9999/api/v1/device/metrics/chart',
              headers: [{
            key: 'x-api-key',
            type: 'string',
            value: sessionStorage.getItem('ticket'),
            remark: ''
}],
              params: [],
              body: '',
              paramsList: [],
              fieldList: [],
              fieldDesc: null,
              responseScript: 'return resp.data'
            }
          }

          // 初始化数据路径表单
          this.pathForm = {
            dataPath: 'data'
          }

          // 默认查询参数
          this.queryParams = {
            device_id: null,
            device_name: null,
            key: null,
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

        // 初始化完成后获取设备列表
        await this.fetchDeviceList()

        // 如果有设备ID，尝试获取设备数据标识
        if (this.queryParams.device_id) {
          await this.handleDeviceChange(this.queryParams.device_id)
        }

        // 初始化完成后更新params
        this.updateParams()

      } catch (error) {
        console.error('初始化表单数据失败:', error)
      }
    },

    // 更新params数组方法
    updateParams() {
      // 清空现有params
      this.dataForm.config.params = []

      console.log('开始更新params数组，selectedMetric:', this.selectedMetric)
      console.log('当前queryParams:', this.queryParams)

      // 将queryParams中的所有字段添加到params数组
      Object.keys(this.queryParams).forEach(key => {
        // 只添加有值的参数
        if (this.queryParams[key] !== null && this.queryParams[key] !== undefined && this.queryParams[key] !== '') {
          // 当data_mode为latest时，跳过历史数据相关参数
          if (this.queryParams.data_mode === 'latest' &&
              ['time_range', 'start_ts', 'end_ts', 'aggregate_window', 'aggregate_function'].includes(key)) {
            console.log(`跳过历史数据参数 ${key}，因为当前模式是最新数据`)
            return
          }

          // 对于数据标识key，优先使用selectedMetric中的完整信息
          if (key === 'key') {
            if (this.selectedMetric) {
              console.log('使用selectedMetric生成params:', this.selectedMetric)
              // 添加数据标识的基本信息
              this.dataForm.config.params.push({
                key: 'key',
                value: this.selectedMetric.key || this.queryParams.key
              })

              // 添加数据标识的额外信息
              if (this.selectedMetric.name && this.selectedMetric.name !== this.selectedMetric.key) {
                this.dataForm.config.params.push({
                  key: 'key_name',
                  value: this.selectedMetric.name
                })
              }

              if (this.selectedMetric.type || this.selectedMetric.data_type) {
                this.dataForm.config.params.push({
                  key: 'key_type',
                  value: this.selectedMetric.type || this.selectedMetric.data_type
                })
              }
            }
            // 如果没有selectedMetric，尝试从allMetrics中查找
            else if (this.allMetrics && this.allMetrics.length > 0) {
              const metricInfo = this.allMetrics.find(metric =>
                metric.key === this.queryParams.key ||
                metric.name === this.queryParams.key ||
                metric.id === this.queryParams.key
              )

              if (metricInfo) {
                console.log('从allMetrics找到匹配的数据标识:', metricInfo)
                // 添加数据标识的基本信息
                this.dataForm.config.params.push({
                  key: 'key',
                  value: metricInfo.key || metricInfo.name || this.queryParams.key
                })

                // 添加数据标识的额外信息
                if (metricInfo.name && metricInfo.name !== metricInfo.key) {
                  this.dataForm.config.params.push({
                    key: 'key_name',
                    value: metricInfo.name
                  })
                }

                if (metricInfo.type || metricInfo.data_type) {
                  this.dataForm.config.params.push({
                    key: 'key_type',
                    value: metricInfo.type || metricInfo.data_type
                  })
                }
              } else {
                // 没找到详细信息，使用原始值
                this.dataForm.config.params.push({
                  key: key,
                  value: this.queryParams[key]
                })
              }
            } else {
              // 如果没有更多信息，直接使用原始值
              this.dataForm.config.params.push({
                key: key,
                value: this.queryParams[key]
              })
            }
          } else {
            // 其他参数直接添加
            this.dataForm.config.params.push({
              key: key,
              value: this.queryParams[key]
            })
          }
        }
      })
    },

    // 保存 - 简化逻辑，移除自动执行
    save(formName, ignoreFill = false) {
      console.log('表单验证开始')
      if (!this.validateForm()) {
        return false
      }
      console.log('表单验证通过，可以保存了')

      // 确保字段列表保存到config中
      if (this.dataForm && this.dataForm.config) {
        // 构建字段描述信息
        this.buildFieldDesc()

        // 确保config中含有字段列表
        this.dataForm.config.fieldList = this.outputFieldList
        console.log('保存前的字段列表:', this.outputFieldList)

        // 确保当data_mode为latest时，移除所有历史数据相关参数
        if (this.queryParams.data_mode === 'latest' && this.dataForm.config.params) {
          this.dataForm.config.params = this.dataForm.config.params.filter(param =>
            !['time_range', 'start_ts', 'end_ts', 'aggregate_window', 'aggregate_function'].includes(param.key)
          )
          console.log('过滤后的参数列表:', this.dataForm.config.params)
        }

        // 将数据查询参数配置转换为对象并存储到userDefinedJson
        this.dataForm.config.userDefinedJson = {
          url: this.dataForm.config.url,
          headers: this.dataForm.config.headers,
          queryParams: this.queryParams,
          method: this.dataForm.config.method,
          responseScript: this.dataForm.config.responseScript
        }
        console.log('已保存数据查询参数配置到userDefinedJson:', this.dataForm.config.userDefinedJson)
      }

      // 开始保存流程
      this.saveloading = true
      this.saveText = '正在保存...'
      const { datasetId, dataForm, appCode, outputFieldList } = this
      const form = {
        id: datasetId,
        name: dataForm.name,
        typeId: dataForm.typeId,
        remark: dataForm.remark,
        cache: dataForm.cache,
        datasetType: 'iot',
        moduleCode: appCode,
        editable: appCode ? 1 : 0,
        labelIds: dataForm.labelIds,
        config: dataForm.config
      }

      // 确保数据传递正确
      console.log('最终的保存数据:', form)

      // 判断是新增还是更新
      const datasetSave = this.dataForm.id === '' ? datasetAdd : datasetUpdate
      datasetSave(form).then(() => {
        Message.success('保存成功')
        this.$parent.init(false)
        this.$parent.setType = null
        this.saveloading = false
        this.saveText = ''
        this.goBack()
      }).catch((error) => {
        console.error('保存失败:', error)
        this.saveloading = false
        this.saveText = ''
        Message.error('保存失败')
      })
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
        this.queryParams.start_time = null
        this.queryParams.end_time = null
        return
      }

      this.queryParams.start_time = timeRange[0].toISOString()
      this.queryParams.end_time = timeRange[1].toISOString()

      // 计算时间区间小时差
      const diffHours = (timeRange[1] - timeRange[0]) / (1000 * 60 * 60)

      // 当前选择的聚合窗口
      const currentWindow = this.queryParams.aggregate_window

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
      } else if (diffHours >= 1440 && diffHours < 4320) {
        minWindowIndex = 9 // 从6h开始
      } else if (diffHours >= 4320) {
        minWindowIndex = 10 // 从1d开始
      }

      // 如果当前选择的聚合窗口不可用，则自动选择第一个可用选项
      if (currentWindowIndex < minWindowIndex) {
        this.queryParams.aggregate_window = this.aggregateWindowOptions[minWindowIndex].value
        // 更新表单中的聚合窗口
        this.updateParams()
      }
    },

    // 更新输出字段列表
    updateOutputFieldList(dataList) {
      if (!dataList) return

      // 确保dataList是数组
      const dataArray = Array.isArray(dataList) ? dataList : [dataList]

      if (dataArray.length > 0) {
        // 提取第一个对象的所有键作为字段列表
        const newList = Object.keys(dataArray[0]).map(key => {
          return {
            fieldName: key,
            fieldDesc: ''
          }
        })

        // 使用compareArr方法确保保留已有的字段描述
        this.outputFieldList = this.compareArr(newList, this.outputFieldList)

        // 将输出字段列表保存到config中，确保保存时能正确包含字段信息
        if (this.dataForm && this.dataForm.config) {
          this.dataForm.config.fieldList = this.outputFieldList
          // 更新字段描述到config.fieldDesc
          this.buildFieldDesc()
          console.log('已将字段列表和描述更新到config中:', this.outputFieldList)
        }
      } else {
        this.outputFieldList = []

        // 当没有数据时，清空config中的字段列表
        if (this.dataForm && this.dataForm.config) {
          this.dataForm.config.fieldList = []
          // 清空字段描述
          this.dataForm.config.fieldDesc = {}
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
        if (this.dataForm.config.fieldDesc && this.dataForm.config.fieldDesc.hasOwnProperty(field.fieldName)) {
          fieldDesc[field.fieldName] = this.dataForm.config.fieldDesc[field.fieldName]
        } else {
          fieldDesc[field.fieldName] = field.fieldDesc || ''
        }
      })
      this.dataForm.config.fieldDesc = fieldDesc
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
      this.dataForm.config.fieldDesc = {}
      this.outputFieldList.forEach(field => {
        if (field.fieldDesc === '' || !field.hasOwnProperty('fieldDesc')) {
          this.dataForm.config.fieldDesc[field.fieldName] = field.fieldName
        } else {
          this.dataForm.config.fieldDesc[field.fieldName] = field.fieldDesc
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

      this.queryParams.device_id = device.id
      this.queryParams.device_name = device.name
      this.selectedDeviceName = device.name
      this.selectedDevice = device

      // 清空数据标识，因为设备变更后需要重新选择
      this.queryParams.key = ''

      // 获取设备的数据标识
      this.handleDeviceChange(device.id)

      if (this.autoNaming) {
        this.updateAutoName()
      }

      // 更新params
      this.updateParams()
    },

    // 处理MetricsSelect组件的选择事件
    handleMetricsSelect(key) {
      console.log('收到数据标识选择:', key)

      // 设置selectedMetric
      if (typeof key === 'object' && key !== null) {
        // 如果接收到的是对象，直接设置
        this.selectedMetric = key
        console.log('使用数据标识对象:', key)

        // 设置queryParams.key为对象中的key属性，只是为了字符串显示
        this.queryParams.key = key.key || key.name || key.id || ''
      } else if (key) {
        // 处理字符串类型的数据标识
        this.queryParams.key = key

        // 尝试在allMetrics中查找完整对象
        if (this.allMetrics && this.allMetrics.length > 0) {
          const foundMetric = this.allMetrics.find(metric =>
            metric.key === key ||
            metric.name === key ||
            metric.id === key
          )

          if (foundMetric) {
            this.selectedMetric = foundMetric
            console.log('根据key找到数据标识对象:', foundMetric)
          } else {
            this.selectedMetric = { key: key, name: key }
            console.log('未找到完整对象，创建简单对象:', this.selectedMetric)
          }
        } else {
          this.selectedMetric = { key: key, name: key }
          console.log('无数据标识列表，创建简单对象:', this.selectedMetric)
        }
      } else {
        // 处理空值
        this.queryParams.key = ''
        this.selectedMetric = null
      }

      if (this.autoNaming) {
        this.updateAutoName()
      }

      // 更新params
      this.updateParams()

      console.log('更新后的数据标识:', this.queryParams.key)
      console.log('选中的数据标识对象:', this.selectedMetric)
      console.log('更新后的params:', this.dataForm.config.params)
    },

    handleDataTypeChange(value) {
      this.queryParams.data_type = value
      if (this.autoNaming) {
        this.updateAutoName()
      }
      this.updateParams()
    },

    handleDataModeChange(value) {
      this.queryParams.data_mode = value
      // 更新数据路径
      this.setDataPath()
      
      // 如果是历史数据模式，确保已选择时间范围
      if (value === 'history') {
        if (!this.queryParams.time_range) {
          this.queryParams.time_range = 'last_1_hour'
        }
      }
      
      this.updateParams()
      if (this.autoNaming) {
        this.updateAutoName()
      }
    },

    handleTimeRangeChange(value) {
      this.queryParams.time_range = value
      // 移除: this.dataForm.time_range = value
      if (this.autoNaming) {
        this.updateAutoName()
      }
      this.updateParams()
    },

    // 处理聚合窗口变化
    handleAggregateWindowChange(value) {
      this.queryParams.aggregate_window = value
      // 移除: this.dataForm.aggregate_window = value
      this.updateParams()
    },

    // 处理聚合函数变化
    handleAggregateFunctionChange(value) {
      this.queryParams.aggregate_function = value
      // 移除: this.dataForm.aggregate_function = value
      this.updateParams()
    },

    // 返回上一页
    goBack() {
      this.$emit('back')
    },

    // 执行按钮点击处理
    handleExecuteClick() {
      // 先验证必要的参数是否已填写
      if (!this.validateExecuteParams()) {
        return
      }

      this.executeLoading = true

      // 执行前构建字段描述信息，确保它保存在config中
      this.buildFieldDesc()
      
      // 确保responseScript与当前数据模式一致
      this.setDataPath()

      // 执行前对参数进行处理，最新数据模式不需要传递历史数据参数
      if (this.queryParams.data_mode === 'latest') {
        // 清理历史相关参数
        const configCopy = { ...this.dataForm.config }
        configCopy.params = this.dataForm.config.params.filter(param =>
          !['time_range', 'start_ts', 'end_ts', 'aggregate_window', 'aggregate_function'].includes(param.key)
        )

        // 如果是前端代理，使用axios自行调用
        if (this.dataForm.config.requestType === 'frontend') {
          axiosFormatting({ ...configCopy }).then((res) => {
            this.responseData = res
            this.parseResponseData()

            // 获取数据后更新输出字段
            this.updateOutputFieldList(this.responseData)
            Message.success('执行成功')
            this.executeLoading = false
          }).catch((error) => {
            console.error('执行失败:', error)
            Message.error('执行失败: ' + (error.message || '未知错误'))
            this.responseData = null
            this.executeLoading = false
          })
        } else {
          // 如果是后端代理，调用后端接口
          const script = JSON.stringify(configCopy)
          const executeParams = {
            script,
            params: [],
            dataSetType: 'iot'
          }

          datasetExecuteTest(executeParams).then(res => {
            this.responseData = res.data || res
            this.parseResponseData()

            // 获取数据后更新输出字段
            this.updateOutputFieldList(this.responseData)
            Message.success('执行成功')
            this.executeLoading = false
          }).catch((error) => {
            console.error('执行失败:', error)
            Message.error('执行失败: ' + (error.message || '未知错误'))
            this.responseData = null
            this.executeLoading = false
          })
        }
      } else {
        // 如果是历史数据模式，使用完整参数

        // 如果是前端代理，使用axios自行调用
        if (this.dataForm.config.requestType === 'frontend') {
          axiosFormatting({ ...this.dataForm.config }).then((res) => {
            this.responseData = res
            this.parseResponseData()

            // 获取数据后更新输出字段
            this.updateOutputFieldList(this.responseData)
            Message.success('执行成功')
            this.executeLoading = false
          }).catch((error) => {
            console.error('执行失败:', error)
            Message.error('执行失败: ' + (error.message || '未知错误'))
            this.responseData = null
            this.executeLoading = false
          })
        } else {
          // 如果是后端代理，调用后端接口
          const script = JSON.stringify(this.dataForm.config)
          const executeParams = {
            script,
            params: [],
            dataSetType: 'iot'
          }

          datasetExecuteTest(executeParams).then(res => {
            this.responseData = res.data || res
            this.parseResponseData()

            // 获取数据后更新输出字段
            this.updateOutputFieldList(this.responseData)
            Message.success('执行成功')
            this.executeLoading = false
          }).catch((error) => {
            console.error('执行失败:', error)
            Message.error('执行失败: ' + (error.message || '未知错误'))
            this.responseData = null
            this.executeLoading = false
          })
        }
      }
    },

    // 验证执行所需的参数
    validateExecuteParams() {
      return this.validateQueryParams()
    },

    // 解析响应数据，处理数据路径
    parseResponseData() {
      try {
        if (!this.responseData || !this.pathForm.dataPath) {
          return
        }

        // 根据数据路径获取数据
        const pathParts = this.pathForm.dataPath.split('.')
        let result = this.responseData

        for (const part of pathParts) {
          if (result && typeof result === 'object' && part in result) {
            result = result[part]
          } else {
            // 路径无效
            result = null
            break
          }
        }

        this.parsedResponseData = result
      } catch (error) {
        console.error('解析响应数据失败:', error)
        this.parsedResponseData = null
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
          if (this.queryParams.device_id) {
            this.selectedDevice = this.deviceList.find(d => d.id === this.queryParams.device_id) || null
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
      const groupKey = this.queryParams.typeId || this.queryParams.data_type || 'telemetry'

      return {
        key: key,
        name: key,
        type: 'string',
        description: ''
      }
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

          // 处理所有指标数据
          this.processMetricsData(this.metricsGroups)

          // 如果有queryParams.key，找到对应的标识进行回显
          if (this.queryParams.key) {
            // 检查是否有匹配的数据标识
            let found = false

            // 在各个分组中查找
            Object.keys(this.metricsGroups).forEach(groupKey => {
              const group = this.metricsGroups[groupKey]
              if (Array.isArray(group)) {
                const foundMetric = group.find(metric =>
                  metric.key === this.queryParams.key ||
                  metric.name === this.queryParams.key ||
                  metric.id === this.queryParams.key
                )

                if (foundMetric && !found) {
                  found = true

                  // 更新typeId以匹配分组
                  this.queryParams.typeId = groupKey

                  // 同时更新表单中的typeId，确保表单提交时包含正确的分组信息
                  if (this.queryParams.typeId && !this.dataForm.typeId) {
                    this.dataForm.typeId = this.queryParams.typeId

                    // 设置分组名称
                    if (this.groupNameMap[groupKey]) {
                      this.typeName = this.groupNameMap[groupKey]
                    }
                  }

                  // 设置selectedMetric
                  this.selectedMetric = foundMetric

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
    },

    // 检查表单是否有效
    validateForm() {
      // 检查表单验证状态
      let valid = true

      console.log('==== 表单验证信息 ====')
      console.log('设备ID:', this.queryParams.device_id)
      console.log('设备名称:', this.queryParams.device_name)
      console.log('数据标识:', this.queryParams.key)
      console.log('数据标识类型:', typeof this.queryParams.key)
      console.log('选中的完整数据标识对象:', this.selectedMetric)
      console.log('选中的数据标识对象类型:', this.selectedMetric ? typeof this.selectedMetric : 'null')
      console.log('数据类型:', this.queryParams.data_type)
      console.log('数据来源:', this.queryParams.data_mode)

      // 检查基础信息字段 (dataForm)
      if (!this.dataForm.name) {
        Message.warning('数据集名称不能为空')
        valid = false
      }

      // 校验查询参数
      if (!this.validateQueryParams()) {
        valid = false
      }

      return valid
    },

    // 获取指标数据并存储为内部标识数组
    processMetricsData(metricsData) {
      // 重置全部指标数组
      this.allMetrics = []

      if (!metricsData) return

      // 处理分组格式的指标数据
      Object.keys(metricsData).forEach(groupKey => {
        const group = metricsData[groupKey]
        if (Array.isArray(group)) {
          // 为每个指标添加分组信息
          const metricsWithGroup = group.map(metric => ({
            ...metric,
            data_source_type: groupKey,
            uniqueId: metric.uniqueId || `${groupKey}_${metric.key || metric.name || metric.id}`
          }))

          // 添加到全部指标数组
          this.allMetrics = [...this.allMetrics, ...metricsWithGroup]
        }
      })

      console.log('处理后的所有指标数据:', this.allMetrics)

      // 如果已经有选中的key但没有完整对象信息，尝试找到匹配的对象
      if (this.queryParams.key && !this.selectedMetric) {
        this.findAndSetSelectedMetric(this.queryParams.key)
      }
    },

    // 根据key查找并设置selectedMetric
    findAndSetSelectedMetric(key) {
      if (!key) return

      // 在allMetrics中查找匹配的指标
      const foundMetric = this.allMetrics.find(metric =>
        metric.key === key ||
        metric.name === key ||
        metric.id === key
      )

      if (foundMetric) {
        console.log('找到匹配的数据标识:', foundMetric)
        this.selectedMetric = foundMetric
      } else {
        console.log('未找到匹配的数据标识，创建基本对象')
        this.selectedMetric = { key: key, name: key }
      }
    },

    // 更新数据路径
    setDataPath() {
      if (this.queryParams.data_mode === 'latest') {
        this.pathForm.dataPath = 'data'
        // 更新responseScript，与HTTP保持一致
        this.dataForm.config.responseScript = 'return resp.data'
      } else {
        this.pathForm.dataPath = 'data.points'
        // 历史查询返回数据中嵌套了points数组
        this.dataForm.config.responseScript = 'return resp.data.points'
      }
      
      console.log(`数据路径已更新: ${this.pathForm.dataPath}, responseScript: ${this.dataForm.config.responseScript}`)
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

    // 获取聚合窗口值的label
    getAggregateWindowLabel(value) {
      const option = this.aggregateWindowOptions.find(opt => opt.value === value)
      return option ? option.label : value
    },

    // 获取聚合函数值的label
    getAggregateFunctionLabel(value) {
      switch(value) {
        case 'avg': return '平均值'
        case 'max': return '最大值'
        case 'min': return '最小值'
        case 'sum': return '求和'
        case 'diff': return '最大最小差值'
        default: return value
      }
    },

    // 校验查询参数
    validateQueryParams() {
      let valid = true

      // 检查设备ID
      if (!this.queryParams.device_id) {
        Message.warning('请选择设备')
        valid = false
      }

      // 检查数据标识
      if (!this.queryParams.key) {
        Message.warning('请选择数据标识')
        valid = false
      }

      // 检查数据类型
      if (!this.queryParams.data_type) {
        Message.warning('请选择数据类型')
        valid = false
      }

      // 检查数据模式
      if (!this.queryParams.data_mode) {
        Message.warning('请选择数据来源')
        valid = false
      }

      // 如果是历史数据模式，需要检查时间范围
      if (this.queryParams.data_mode === 'history' && this.queryParams.data_type === 'telemetry') {
        if (!this.queryParams.time_range) {
          Message.warning('请选择时间范围')
          valid = false
        }

        if (this.queryParams.time_range === 'custom' &&
            (!this.customTimeRange || this.customTimeRange.length !== 2)) {
          Message.warning('请选择自定义时间范围')
          valid = false
        }

        // 检查聚合选项
        if (this.queryParams.aggregate_window !== 'no_aggregate' && !this.queryParams.aggregate_function) {
          Message.warning('请选择聚合方式')
          valid = false
        }
      }

      return valid
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
    height: calc(100vh - 60px); // Adjust height calculation if header height changes
    padding-bottom: 60px; // Add padding to prevent content overlap with fixed actions
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

// 添加按钮容器样式
.form-actions {
  position: sticky; // Change from fixed to sticky
  bottom: 0;
  // left/right might not be needed or need adjustment with sticky depending on container
  // left: 0; 
  // right: 0;
  width: 100%; // Ensure it spans the container width
  text-align: center; // Change alignment from right to center
  padding: 10px 30px; // Adjust padding
  background-color: var(--bs-background-2); // Add background color
  border-top: 1px solid var(--bs-border-color);
  z-index: 10; // Ensure it's above other content
  box-shadow: 0 -2px 5px rgba(0,0,0,0.1); // Optional shadow
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
.device-select-input{
  display: flex;
  align-items: center;
  justify-content: center;

}
</style>
