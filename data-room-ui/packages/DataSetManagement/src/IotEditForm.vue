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
                      prop="config.data_type"
                    >
                      <el-select
                        v-model="dataForm.config.data_type"
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
                      prop="config.data_mode"
                    >
                      <el-select
                        v-model="dataForm.config.data_mode"
                        class="bs-el-select"
                        popper-class="bs-el-select"
                        @change="handleDataModeChange"
                      >
                        <el-option label="最新数据" value="latest" />
                        <el-option
                          label="历史数据"
                          value="history"
                          :disabled="dataForm.config.data_type !== 'telemetry'"
                        />
                      </el-select>
                    </el-form-item>
                  </el-col>
                </el-row>
                <div v-if="dataForm.config.data_mode === 'history' && dataForm.config.data_type === 'telemetry'">
                  <el-divider content-position="left">历史数据参数</el-divider>
                  <el-row :gutter="16">
                    <el-col :span="12">
                      <el-form-item
                        label="时间范围"
                        prop="config.time_range"
                        label-width="80px"
                      >
                        <el-select
                          v-model="dataForm.config.time_range"
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
                    <el-col :span="12" v-if="dataForm.config.time_range === 'custom'">
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
                        prop="config.aggregate_window"
                        label-width="80px"
                        class="aggregate-item"
                      >
                        <el-select
                          v-model="dataForm.config.aggregate_window"
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
                    <el-col :span="12" v-if="dataForm.config.aggregate_window !== 'no_aggregate'">
                      <el-form-item
                        label="聚合方式"
                        prop="config.aggregate_function"
                        label-width="80px"
                      >
                        <el-select
                          v-model="dataForm.config.aggregate_function"
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
                      prop="config.device_id"
                      label-width="80px"
                    >
                      <el-input
                        v-model="selectedDeviceName"
                        class="bs-el-input"
                        placeholder="请选择设备"
                        readonly
                        @click.native="openDeviceDialog"
                      >
                        <el-button slot="append" icon="el-icon-search" @click.native.stop="openDeviceDialog" />
                      </el-input>
                    </el-form-item>
                  </el-col>
                  <el-col :span="12">
                    <el-form-item
                      label="数据标识"
                      prop="config.key"
                      label-width="80px"
                    >
                      <el-select
                        v-model="dataForm.config.key"
                        class="bs-el-select"
                        popper-class="bs-el-select"
                        placeholder="请选择数据标识"
                        filterable
                        :disabled="!dataForm.config.device_id"
                        @change="handleKeyChange"
                      >
                        <el-option
                          v-for="item in keyList"
                          :key="item.key"
                          :label="item.name"
                          :value="item.key"
                        />
                      </el-select>
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
                  @click="executeQuery"
                >
                  执行
                </el-button>
              </div>
              
              <el-form size="small" label-width="80px">
                <el-form-item label="数据路径">
                  <el-input
                    v-model="dataPath"
                    class="bs-el-input"
                    placeholder="如：data.value 或 data.points"
                  />
                </el-form-item>
              </el-form>

              <!-- 响应数据展示 -->
              <div class="result-container">
                <el-card v-if="responseData" class="response-card">
                  <pre class="response-code">{{ JSON.stringify(responseData, null, 2) }}</pre>
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

    <!-- 设备选择弹窗 -->
    <el-dialog
      title="选择设备"
      :visible.sync="deviceDialogVisible"
      width="60%"
      append-to-body
      class="bs-el-dialog"
    >
      <div class="device-dialog-content">
        <div class="search-bar">
          <el-input
            v-model="deviceSearchKeyword"
            placeholder="请输入设备名称或ID搜索"
            prefix-icon="el-icon-search"
            clearable
            @input="handleDeviceSearch"
          />
        </div>
        <div class="device-list">
          <el-table
            :data="filteredDeviceList"
            height="400"
            border
            @row-click="handleSelectDevice"
          >
            <el-table-column prop="id" label="设备ID" width="180" />
            <el-table-column prop="name" label="设备名称" />
            <el-table-column prop="type" label="设备类型" width="120" />
          </el-table>
        </div>
      </div>
      <div slot="footer">
        <el-button @click="deviceDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="confirmSelectDevice">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { datasetAdd, datasetUpdate, datasetExecuteTest } from 'data-room-ui/js/utils/datasetConfigService'
import { Message } from 'element-ui'
import LabelSelect from 'data-room-ui/DataSetLabelManagement/src/LabelSelect.vue'

export default {
  name: 'IotEditForm',
  components: {
    LabelSelect
  },
  props: {
    isEdit: {
      type: Boolean,
      default: true
    },
    datasetId: {
      type: [String, Number],
      default: ''
    }
  },
  data() {
    return {
      saveText: '',
      dataForm: {
        id: '',
        name: '',
        typeId: '',
        datasetType: 'iot',
        remark: '',
        cache: 0,
        moduleCode: '',
        editable: true,
        labelIds: [],
        config: {
          device_id: '',
          key: '',
          data_type: 'telemetry',
          data_mode: 'latest',
          time_range: 'last_5m',
          aggregate_window: 'no_aggregate',
          aggregate_function: 'avg'
        }
      },
      rules: {
        name: [{ required: true, message: '请输入数据集名称', trigger: 'blur' }],
        typeId: [{ required: true, message: '请选择分组', trigger: 'change' }],
        'config.device_id': [{ required: true, message: '请选择设备', trigger: 'change' }],
        'config.key': [{ required: true, message: '请选择数据标识', trigger: 'change' }],
        'config.data_type': [{ required: true, message: '请选择数据类型', trigger: 'change' }],
        'config.data_mode': [{ required: true, message: '请选择数据模式', trigger: 'change' }],
        'config.time_range': [{ required: true, message: '请选择时间范围', trigger: 'change' }],
        'config.aggregate_window': [{ required: true, message: '请选择聚合窗口', trigger: 'change' }],
        'config.aggregate_function': [{ required: true, message: '请选择聚合方式', trigger: 'change' }]
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
      dataPath: 'res.data.value',
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
      lastAutoName: ''
    }
  },
  computed: {
    availableAggregateWindows() {
      const timeRange = this.dataForm.config.time_range;
      let minWindowIndex = 0; // 默认所有选项都可用

      // 根据时间范围设置最小可用聚合间隔
      if (timeRange === 'last_3h') {
        minWindowIndex = 1; // 从30s开始
      } else if (timeRange === 'last_6h') {
        minWindowIndex = 2; // 从1m开始
      } else if (timeRange === 'last_12h') {
        minWindowIndex = 3; // 从2m开始
      } else if (timeRange === 'last_24h') {
        minWindowIndex = 4; // 从5m开始
      } else if (timeRange === 'last_3d') {
        minWindowIndex = 5; // 从10m开始
      } else if (timeRange === 'last_7d') {
        minWindowIndex = 6; // 从30m开始
      } else if (timeRange === 'last_15d') {
        minWindowIndex = 7; // 从1h开始
      } else if (timeRange === 'last_30d') {
        minWindowIndex = 8; // 从3h开始
      } else if (timeRange === 'last_60d') {
        minWindowIndex = 9; // 从6h开始
      } else if (timeRange === 'last_90d') {
        minWindowIndex = 10; // 从1d开始
      } else if (timeRange === 'last_6m') {
        minWindowIndex = 11; // 从7d开始
      } else if (timeRange === 'last_1y') {
        minWindowIndex = 12; // 只能选1mo
      } else if (timeRange === 'custom' && this.customTimeRange) {
        // 自定义时间范围的处理
        const [start, end] = this.customTimeRange;
        const diffHours = (end - start) / (1000 * 60 * 60);
        
        if (diffHours >= 3 && diffHours < 6) {
          minWindowIndex = 1; // 从30s开始
        } else if (diffHours >= 6 && diffHours < 12) {
          minWindowIndex = 2; // 从1m开始
        } else if (diffHours >= 12 && diffHours < 24) {
          minWindowIndex = 3; // 从2m开始
        }
        // ... 其他区间按照类似的逻辑处理
      }

      // 返回处理后的选项列表
      return this.aggregateWindowOptions.map((option, index) => ({
        ...option,
        disabled: index < minWindowIndex
      }));
    }
  },
  watch: {
    // 监听参数变化以更新自动名称
    'selectedDeviceName': function(newVal) {
      if (this.autoNaming) this.updateAutoName();
    },
    'dataForm.config.key': function(newVal) {
      if (this.autoNaming) this.updateAutoName();
    },
    'dataForm.config.data_type': function(newVal) {
      if (this.autoNaming) this.updateAutoName();
    },
    'dataForm.config.data_mode': function(newVal) {
      if (this.autoNaming) this.updateAutoName();
    }
  },
  methods: {
    // 打开设备选择弹窗
    openDeviceDialog() {
      this.deviceDialogVisible = true
      this.deviceSearchKeyword = ''
      this.filteredDeviceList = this.deviceList
    },

    // 处理设备搜索
    handleDeviceSearch(keyword) {
      if (!keyword) {
        this.filteredDeviceList = this.deviceList
        return
      }
      
      this.filteredDeviceList = this.deviceList.filter(device => 
        device.name.toLowerCase().includes(keyword.toLowerCase()) ||
        device.id.toLowerCase().includes(keyword.toLowerCase())
      )
    },

    // 选择设备
    handleSelectDevice(row) {
      this.selectedDevice = row
      this.selectedDeviceName = row.name
    },

    // 确认选择设备
    confirmSelectDevice() {
      if (this.selectedDevice) {
        this.dataForm.config.device_id = this.selectedDevice.id
        this.selectedDeviceName = this.selectedDevice.name
        this.handleDeviceChange(this.selectedDevice.id)
      }
      this.deviceDialogVisible = false
    },

    // 设备变更
    async handleDeviceChange(deviceId) {
      if (!deviceId) {
        this.keyList = []
        this.dataForm.config.key = ''
        return
      }
      
      // 获取设备数据标识列表
      this.keyList = [
        { key: 'temperature', name: '温度' },
        { key: 'humidity', name: '湿度' },
        { key: 'pressure', name: '压力' }
      ]
      
      // 如果启用了自动命名，则更新名称
      if (this.autoNaming) {
        this.updateAutoName();
      }
    },

    // 数据类型变更
    handleDataTypeChange(type) {
      // 如果不是遥测数据，则只能使用最新值模式
      if (type !== 'telemetry') {
        this.dataForm.config.data_mode = 'latest'
      }
    },

    // 数据模式变更
    handleDataModeChange(mode) {
      if (mode === 'latest') {
        this.dataForm.config.time_range = '';
        this.dataForm.config.aggregate_window = '';
        this.dataForm.config.aggregate_function = '';
        this.customTimeRange = null;
      } else {
        // 历史数据模式下的默认值
        this.dataForm.config.time_range = 'last_1h';
        this.dataForm.config.aggregate_window = 'no_aggregate';
        this.dataForm.config.aggregate_function = '';
        this.customTimeRange = null;
      }
    },

    // 执行查询
    async executeQuery() {
      if (!this.dataForm.config.device_id || !this.dataForm.config.key) {
        Message.warning('请选择设备和数据标识')
        return
      }

      // 检查历史数据模式的限制条件
      if (this.dataForm.config.data_mode === 'history' && this.dataForm.config.data_type !== 'telemetry') {
        Message.warning('历史数据模式仅支持遥测数据类型')
        return
      }

      this.executeLoading = true
      try {
        const params = {
          device_id: this.dataForm.config.device_id,
          key: this.dataForm.config.key,
          data_type: this.dataForm.config.data_type,
          data_mode: this.dataForm.config.data_mode
        }

        // 添加历史数据查询参数
        if (this.dataForm.config.data_mode === 'history') {
          params.time_range = this.dataForm.config.time_range
          params.aggregate_window = this.dataForm.config.aggregate_window
          params.aggregate_function = this.dataForm.config.aggregate_function
        }

        // 添加API密钥到请求头
        const headers = {
          'x-api-key': sessionStorage.getItem('ticket') || ''
        }

        const res = await datasetExecuteTest({
          url: '/api/v1/iot/data',
          method: 'get',
          params,
          headers
        })

        if (res.code === 0) {
          // 自动识别数据结构
          if (this.dataForm.config.data_mode === 'latest') {
            this.dataPath = 'res.data.value'
            this.dataPreviewList = [{ 
              timestamp: res.data.timestamp,
              value: res.data.value
            }]
          } else {
            this.dataPath = 'res.data.points'
            this.dataPreviewList = (res.data.points || []).map(point => ({
              timestamp: point.timestamp,
              value: point.value
            }))
          }
          this.updateOutputFieldList()
          Message.success('执行成功')
        } else {
          this.responseData = {
            code: res.code,
            message: res.message,
            data: null
          }
          this.dataPreviewList = []
          Message.error(res.message || '执行失败')
        }
      } catch (error) {
        console.error('执行查询失败:', error)
        this.responseData = {
          error: error.message || '执行失败'
        }
        this.dataPreviewList = []
        Message.error('执行查询失败')
      } finally {
        this.executeLoading = false
      }
    },

    // 更新输出字段列表
    updateOutputFieldList () {
      if (!this.dataPreviewList.length) {
        this.outputFieldList = []
        return
      }

      const newFields = []
      const sample = this.dataPreviewList[0]

      // 保存旧的字段描述
      const oldFieldMap = {}
      this.outputFieldList.forEach(field => {
        oldFieldMap[field.field] = field.name
      })

      Object.keys(sample).forEach(key => {
        newFields.push({
          field: key,
          name: oldFieldMap[key] || key // 保留旧的字段名称，如果没有则使用字段本身
        })
      })

      this.outputFieldList = newFields
    },

    // 保存
    async save (formName) {
      this.$refs[formName].validate(async (valid) => {
        if (!valid) return

        const params = {
          ...this.dataForm
        }

        try {
          if (this.dataForm.id) {
            await datasetUpdate(params)
          } else {
            await datasetAdd(params)
          }
          
          this.$emit('success')
          Message.success('保存成功')
        } catch (error) {
          console.error('保存失败:', error)
          Message.error('保存失败')
        }
      })
    },

    // 返回
    goBack () {
      this.$emit('back')
    },

    // 渲染表头
    renderHeader (label) {
      if (label.length <= 10) return label
      return label.slice(0, 10) + '...'
    },

    // 分类相关方法
    clearType () {
      this.dataForm.typeId = ''
      this.typeName = ''
    },

    setCurrentNode () {
      if (this.dataForm.typeId) {
        this.$nextTick(() => {
          const node = this.$refs.categorySelectTree.getNode(this.dataForm.typeId)
          if (node) {
            this.$refs.categorySelectTree.setCurrentKey(this.dataForm.typeId)
          }
        })
      }
    },

    selectParentCategory (data) {
      this.dataForm.typeId = data.id
      this.typeName = data.name
      this.$refs.selectParentName.blur()
    },

    handleTimeRangeChange(value) {
      // 保存当前选择的聚合窗口
      const currentWindow = this.dataForm.config.aggregate_window;
      
      // 处理自定义时间范围的特殊情况
      if (value === 'custom') {
        // 对于自定义时间范围，我们在handleCustomTimeChange中处理聚合间隔的调整
        return;
      }
      
      // 获取当前时间范围下的最小可用聚合窗口索引
      let minWindowIndex = 0;
      
      // 根据新选择的时间范围确定最小可用聚合间隔
      if (value === 'last_3h') {
        minWindowIndex = 1; // 从30s开始
      } else if (value === 'last_6h') {
        minWindowIndex = 2; // 从1m开始
      } else if (value === 'last_12h') {
        minWindowIndex = 3; // 从2m开始
      } else if (value === 'last_24h') {
        minWindowIndex = 4; // 从5m开始
      } else if (value === 'last_3d') {
        minWindowIndex = 5; // 从10m开始
      } else if (value === 'last_7d') {
        minWindowIndex = 6; // 从30m开始
      } else if (value === 'last_15d') {
        minWindowIndex = 7; // 从1h开始
      } else if (value === 'last_30d') {
        minWindowIndex = 8; // 从3h开始
      } else if (value === 'last_60d') {
        minWindowIndex = 9; // 从6h开始
      } else if (value === 'last_90d') {
        minWindowIndex = 10; // 从1d开始
      } else if (value === 'last_6m') {
        minWindowIndex = 11; // 从7d开始
      } else if (value === 'last_1y') {
        minWindowIndex = 12; // 只能选1mo
      }
      
      // 获取当前选择的聚合窗口在选项中的索引
      const currentWindowIndex = this.aggregateWindowOptions.findIndex(option => option.value === currentWindow);
      
      // 如果当前选择的聚合窗口不可用（索引小于最小可用索引），则自动选择第一个可用选项
      if (currentWindowIndex < minWindowIndex) {
        // 选择第一个可用的聚合窗口选项
        this.dataForm.config.aggregate_window = this.aggregateWindowOptions[minWindowIndex].value;
        
        // 更新聚合方式
        this.handleAggregateWindowChange(this.dataForm.config.aggregate_window);
      }
    },

    handleCustomTimeChange(timeRange) {
      if (!timeRange) {
        this.dataForm.config.start_time = null;
        this.dataForm.config.end_time = null;
        return;
      }
      
      this.dataForm.config.start_time = timeRange[0].toISOString();
      this.dataForm.config.end_time = timeRange[1].toISOString();
      
      // 计算时间区间小时差
      const diffHours = (timeRange[1] - timeRange[0]) / (1000 * 60 * 60);
      
      // 当前选择的聚合窗口
      const currentWindow = this.dataForm.config.aggregate_window;
      
      // 获取当前选择的聚合窗口在选项中的索引
      const currentWindowIndex = this.aggregateWindowOptions.findIndex(option => option.value === currentWindow);
      
      // 根据时间区间长度确定最小可用聚合间隔索引
      let minWindowIndex = 0;
      
      if (diffHours >= 3 && diffHours < 6) {
        minWindowIndex = 1; // 从30s开始
      } else if (diffHours >= 6 && diffHours < 12) {
        minWindowIndex = 2; // 从1m开始
      } else if (diffHours >= 12 && diffHours < 24) {
        minWindowIndex = 3; // 从2m开始
      } else if (diffHours >= 24 && diffHours < 72) {
        minWindowIndex = 4; // 从5m开始
      } else if (diffHours >= 72 && diffHours < 168) {
        minWindowIndex = 5; // 从10m开始
      } else if (diffHours >= 168 && diffHours < 360) {
        minWindowIndex = 6; // 从30m开始
      } else if (diffHours >= 360 && diffHours < 720) {
        minWindowIndex = 7; // 从1h开始
      } else if (diffHours >= 720 && diffHours < 1440) {
        minWindowIndex = 8; // 从3h开始
      } else if (diffHours >= 1440 && diffHours < 2160) {
        minWindowIndex = 9; // 从6h开始
      } else if (diffHours >= 2160 && diffHours < 4320) {
        minWindowIndex = 10; // 从1d开始
      } else if (diffHours >= 4320) {
        minWindowIndex = 11; // 从7d开始
      }
      
      // 如果当前选择的聚合窗口不可用，则自动选择第一个可用选项
      if (currentWindowIndex < minWindowIndex) {
        this.dataForm.config.aggregate_window = this.aggregateWindowOptions[minWindowIndex].value;
        this.handleAggregateWindowChange(this.dataForm.config.aggregate_window);
      }
    },

    handleAggregateWindowChange(value) {
      if (value === 'no_aggregate') {
        this.dataForm.config.aggregate_function = '';
      } else if (!this.dataForm.config.aggregate_function) {
        this.dataForm.config.aggregate_function = 'avg';
      }
    },

    handleAutoNamingChange(val) {
      if (val) {
        this.updateAutoName();
      }
    },

    updateAutoName() {
      if (!this.selectedDeviceName && !this.getKeyName()) {
        return; // 如果没有设备名和数据标识，则不生成
      }
      
      const parts = [];
      
      // 添加设备名称
      if (this.selectedDeviceName) {
        parts.push(this.selectedDeviceName);
      }
      
      // 添加数据标识名称
      const keyName = this.getKeyName();
      if (keyName) {
        parts.push(keyName);
      }
      
      // 添加数据类型简称
      const dataTypeName = this.dataTypeNameMap[this.dataForm.config.data_type] || '';
      if (dataTypeName) {
        parts.push(dataTypeName);
      }
      
      // 添加数据模式简称
      const dataModeName = this.dataModeNameMap[this.dataForm.config.data_mode] || '';
      if (dataModeName) {
        parts.push(dataModeName);
      }
      
      // 生成最终名称并保存
      this.dataForm.name = parts.join('-');
      this.lastAutoName = this.dataForm.name; // 保存自动生成的名称用于比较
    },

    getKeyName() {
      const key = this.dataForm.config.key;
      if (!key) return '';
      
      const keyObj = this.keyList.find(item => item.key === key);
      return keyObj ? keyObj.name : key;
    },

    handleKeyChange() {
      if (this.autoNaming) {
        this.updateAutoName();
      }
    },

    handleNameInput(val) {
      // 如果启用自动命名且用户手动修改了名称
      if (this.autoNaming && val !== this.lastAutoName) {
        this.$confirm('手动编辑名称将禁用自动命名功能，是否继续？', '提示', {
          confirmButtonText: '继续编辑',
          cancelButtonText: '保持自动命名',
          type: 'warning'
        }).then(() => {
          // 用户选择继续编辑，禁用自动命名
          this.autoNaming = false;
        }).catch(() => {
          // 用户选择保持自动命名，恢复自动生成的名称
          this.updateAutoName();
        });
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
  background-color: var(--bs-background-2);
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
    .search-bar {
      margin-bottom: 10px;
    }

    .device-list {
      border-radius: 4px;
      overflow: hidden;
    }

    .el-table {
      th, td {
        padding: 8px 10px !important;
      }
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
}

// 引入主题变量
@import 'data-room-ui/assets/style/bsTheme.scss';

// 覆盖 element-ui 组件样式
:deep(.el-input__inner),
:deep(.el-textarea__inner) {
  background-color: var(--bs-background-2);
  border-color: var(--bs-border-color);
  color: var(--bs-el-text);

  &:focus {
    border-color: var(--bs-el-color-primary);
  }
}

:deep(.el-table) {
  background-color: var(--bs-background-3);
  border-radius: 4px;
  overflow: hidden;
  
  th.el-table__cell {
    background-color: var(--bs-background-4);
    border-bottom: 1px solid var(--bs-border-color);
    color: var(--bs-el-text);
    padding: 6px 0;
  }
  
  td.el-table__cell {
    background-color: var(--bs-background-3);
    border-bottom: 1px solid var(--bs-border-color);
    color: var(--bs-el-text);
    padding: 4px;
  }

  .el-table__empty-text {
    color: var(--bs-el-text);
  }
}

:deep(.el-form-item__label) {
  color: #f2f2f2;
}

// 滚动条样式
::-webkit-scrollbar {
  width: 4px;
  height: 4px;
}

::-webkit-scrollbar-thumb {
  background: var(--bs-scrollbar);
  border-radius: 2px;
}

::-webkit-scrollbar-track {
  background: transparent;
}

// 响应式调整
@media (max-width: 1366px) {
  .el-col {
    &.el-col-16 {
      width: 60%;
    }
    &.el-col-8 {
      width: 40%;
    }
  }
}
</style>
