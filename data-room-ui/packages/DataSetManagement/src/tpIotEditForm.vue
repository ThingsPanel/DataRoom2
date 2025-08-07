<template>
  <div class="tp-iot-edit-form" :class="{ 'simple-mode': isSimpleMode }">
    <h2 v-if="!isSimpleMode">IoT数据集编辑</h2>
    <div class="form-container">
      <el-form ref="form" :model="formData" label-width="120px">
        <el-form-item label="请求URL">
          <el-input v-model="formData.url" placeholder="请输入请求URL" />
        </el-form-item>
        
        <el-form-item label="请求方法">
          <el-select v-model="formData.method" placeholder="请选择请求方法">
            <el-option label="GET" value="GET" />
            <el-option label="POST" value="POST" />
          </el-select>
        </el-form-item>

        <el-form-item label="组件ID" required>
          <el-input
            v-model="formData.componentId"
            placeholder="请输入组件唯一标识ID"
          />
          <div class="form-tip">用于关联轮询请求与组件，确保正确的资源管理</div>
        </el-form-item>

        <el-form-item label="请求参数">
          <el-input
            type="textarea"
            v-model="formData.paramsStr"
            placeholder="请输入JSON格式的请求参数"
            :rows="4"
          />
        </el-form-item>

        <el-form-item label="请求头">
          <el-input
            type="textarea"
            v-model="formData.headersStr"
            placeholder="请输入JSON格式的请求头"
            :rows="4"
          />
        </el-form-item>

        <el-form-item label="是否轮询">
          <el-switch v-model="formData.polling" />
        </el-form-item>

        <el-form-item label="轮询间隔(ms)" v-if="formData.polling">
          <el-input-number
            v-model="formData.pollingInterval"
            :min="1000"
            :step="1000"
          />
        </el-form-item>

        <el-form-item label="主指标字段" v-if="isSimpleMode">
          <el-input v-model="formData.metricField" placeholder="请输入主指标字段名" />
          <div class="form-tip">指定返回JSON中用作主指标的字段名</div>
        </el-form-item>
        
        <el-form-item label="副指标字段" v-if="isSimpleMode">
          <el-input v-model="formData.secondMetricField" placeholder="请输入副指标字段名" />
          <div class="form-tip">指定返回JSON中用作副指标的字段名</div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="handleTest" :disabled="!formData.componentId">测试请求</el-button>
          <el-button v-if="formData.polling" type="warning" @click="handleStopPolling" :disabled="!formData.componentId">停止轮询</el-button>
        </el-form-item>
      </el-form>

      <div class="result-container" v-if="result">
        <h3>请求结果:</h3>
        <pre>{{ JSON.stringify(result, null, 2) }}</pre>
      </div>
    </div>
  </div>
</template>

<script>
import { sendRequest, startPolling, stopPolling } from 'data-room-ui/js/utils/httpRequest'

export default {
  name: 'TpIotEditForm',
  props: {
    // 表单的初始值
    initialData: {
      type: Object,
      default: () => ({})
    },
    // 是否为简化模式（用于嵌入到其他组件中）
    isSimpleMode: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      formData: {
        url: this.initialData.url || '',
        method: this.initialData.method || 'GET',
        componentId: this.initialData.componentId || `iot_${Math.random().toString(36).substr(2, 8)}`,
        paramsStr: this.initialData.params ? JSON.stringify(this.initialData.params, null, 2) : '{}',
        headersStr: this.initialData.headers ? JSON.stringify(this.initialData.headers, null, 2) : '{}',
        polling: this.initialData.polling || false,
        pollingInterval: this.initialData.pollingInterval || 5000,
        metricField: this.initialData.metricField || '',
        secondMetricField: this.initialData.secondMetricField || ''
      },
      result: null,
      isPolling: false,
      loading: false,
      pollingId: null
    }
  },
  watch: {
    // 监听表单数据变化，向父组件发送事件
    formData: {
      handler (newVal) {
        const config = this.getFullConfig()
        this.$emit('config-change', config)
      },
      deep: true
    },
    // 监听props变化，更新表单数据
    initialData: {
      handler (newVal) {
        if (newVal && Object.keys(newVal).length) {
          this.formData = {
            url: newVal.url || this.formData.url,
            method: newVal.method || this.formData.method,
            componentId: newVal.componentId || this.formData.componentId,
            paramsStr: newVal.params ? JSON.stringify(newVal.params, null, 2) : this.formData.paramsStr,
            headersStr: newVal.headers ? JSON.stringify(newVal.headers, null, 2) : this.formData.headersStr,
            polling: newVal.polling !== undefined ? newVal.polling : this.formData.polling,
            pollingInterval: newVal.pollingInterval || this.formData.pollingInterval,
            metricField: newVal.metricField || this.formData.metricField,
            secondMetricField: newVal.secondMetricField || this.formData.secondMetricField
          }
        }
      },
      deep: true,
      immediate: true
    }
  },
  methods: {
    // 生成随机ID
    generateRandomId () {
      return Math.random().toString(36).substring(2, 10)
    },
    
    // 解析JSON字符串
    parseJsonSafely (str) {
      try {
        return JSON.parse(str)
      } catch (error) {
        this.$message.error('JSON格式错误')
        return null
      }
    },

    // 获取请求配置
    getRequestConfig () {
      // 验证组件ID
      if (!this.formData.componentId) {
        this.$message.error('请输入组件ID')
        return null
      }
      
      // 简化JSON解析，避免卡死
      let params, headers
      try {
        params = JSON.parse(this.formData.paramsStr)
      } catch (error) {
        this.$message.error('请求参数JSON格式错误')
        return null
      }

      try {
        headers = JSON.parse(this.formData.headersStr)
      } catch (error) {
        this.$message.error('请求头JSON格式错误')
        return null
      }
      
      return {
        url: this.formData.url,
        method: this.formData.method,
        componentId: this.formData.componentId,
        params,
        headers,
        polling: this.formData.polling,
        pollingInterval: this.formData.pollingInterval,
        metricField: this.formData.metricField,
        secondMetricField: this.formData.secondMetricField
      }
    },

    // 获取完整配置（包括解析后的参数）
    getFullConfig () {
      const params = this.parseJsonSafely(this.formData.paramsStr) || {}
      const headers = this.parseJsonSafely(this.formData.headersStr) || {}
      
      return {
        url: this.formData.url,
        method: this.formData.method,
        componentId: this.formData.componentId,
        params,
        headers,
        polling: this.formData.polling,
        pollingInterval: this.formData.pollingInterval,
        metricField: this.formData.metricField,
        secondMetricField: this.formData.secondMetricField
      }
    },

    // 处理请求成功
    handleSuccess (data) {
      this.result = data
      if (!this.formData.polling) {
        this.$message.success('请求成功')
      }
    },

    // 处理请求错误
    handleError (error) {
      this.$message.error(error.message || '请求失败')
    },

    // 测试请求
    handleTest () {
      try {
        const config = this.getRequestConfig()
        if (!config) return
        
        this.loading = true
        this.result = ''
        
        // 单次请求
        if (!config.polling) {
          sendRequest(config).then(res => {
            this.result = JSON.stringify(res, null, 2)
            this.$message.success('请求成功')
          }).catch(error => {
            this.result = JSON.stringify(error, null, 2)
            this.$message.error('请求失败')
          }).finally(() => {
            this.loading = false
          })
          return
        }
        
        // 轮询请求
        this.pollingId = config.componentId
        
        // 先停止可能存在的轮询
        try {
          stopPolling(this.pollingId)
        } catch (err) {
        }
        
        // 开始新的轮询
        startPolling(config, res => {
          this.result = JSON.stringify(res, null, 2)
        }).catch(error => {
          this.result = JSON.stringify(error, null, 2)
          this.$message.error('轮询请求失败')
          this.loading = false
        })
        
        this.$message.success('轮询已开始')
      } catch (error) {
        this.$message.error('处理请求时发生错误')
        this.loading = false
      }
    },

    // 停止轮询
    handleStopPolling () {
      if (!this.pollingId) {
        this.$message.warning('没有正在进行的轮询')
        return
      }
      
      try {
        stopPolling(this.pollingId)
        this.$message.success('轮询已停止')
        this.loading = false
      } catch (error) {
        this.$message.error('停止轮询失败')
      }
    },
    
    // 组件销毁前清理
    beforeDestroy () {
      if (this.pollingId) {
        stopPolling(this.pollingId)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.tp-iot-edit-form {
  padding: 20px;

  &.simple-mode {
    padding: 0;
    
    .form-container {
      max-width: 100%;
    }
  }

  .form-container {
    max-width: 800px;
    margin: 0 auto;
  }

  .form-tip {
    font-size: 12px;
    color: #909399;
    line-height: 1.2;
    padding-top: 4px;
  }

  .result-container {
    margin-top: 20px;
    padding: 15px;
    background: #f5f7fa;
    border-radius: 4px;

    pre {
      margin: 0;
      white-space: pre-wrap;
      word-wrap: break-word;
    }
  }
}
</style>