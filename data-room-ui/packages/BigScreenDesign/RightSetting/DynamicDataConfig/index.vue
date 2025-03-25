<template>
  <div class="dynamic-data-config">
    <el-form
      ref="form"
      :model="formData"
      label-width="100px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <div class="data-setting-box">
        <div class="data-setting-data-box">
          <div class="lc-field-head">
            <div class="lc-field-title">接口配置</div>
          </div>
          <div class="lc-field-body">
            <el-form-item label="数据接口">
              <el-input
                v-model="formData.api"
                placeholder="请输入接口地址"
                @change="handleConfigChange"
              />
            </el-form-item>

            <el-form-item label="请求方式">
              <el-select
                v-model="formData.method"
                class="bs-el-select"
                @change="handleConfigChange"
              >
                <el-option label="GET" value="GET" />
                <el-option label="POST" value="POST" />
              </el-select>
            </el-form-item>

            <el-form-item label="数据路径">
              <el-input
                v-model="formData.dataPath"
                placeholder="例如: data.list"
                @change="handleConfigChange"
              >
                <template #append>
                  <el-button @click="testApi">测试</el-button>
                </template>
              </el-input>
            </el-form-item>
          </div>
        </div>

        <div class="data-setting-data-box">
          <div class="lc-field-head">
            <div class="lc-field-title">轮询设置</div>
          </div>
          <div class="lc-field-body">
            <el-form-item label="启用轮询">
              <el-switch
                v-model="formData.polling.enable"
                @change="handleConfigChange"
              />
            </el-form-item>

            <el-form-item
              v-if="formData.polling.enable"
              label="轮询间隔(秒)"
            >
              <el-input-number
                v-model="formData.polling.interval"
                :min="1"
                :max="3600"
                @change="handleConfigChange"
              />
            </el-form-item>
          </div>
        </div>

        <div class="data-setting-data-box">
          <div class="lc-field-head">
            <div class="lc-field-title">数据映射</div>
          </div>
          <div class="lc-field-body">
            <div
              v-for="slot in slots"
              :key="slot.field"
              class="data-slot-item"
            >
              <el-form-item
                :label="slot.label"
                :required="slot.required"
              >
                <el-select
                  v-model="formData.mapping[slot.field]"
                  class="bs-el-select"
                  placeholder="请选择数据字段"
                  @change="handleConfigChange"
                >
                  <el-option
                    v-for="field in availableFields"
                    :key="field.path"
                    :label="field.label"
                    :value="field.path"
                  />
                </el-select>
              </el-form-item>
            </div>
          </div>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import axios from 'axios'
import { get } from 'lodash'

export default {
  name: 'DynamicDataConfig',
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data () {
    return {
      formData: {
        api: '',
        method: 'GET',
        dataPath: 'data',
        polling: {
          enable: false,
          interval: 30
        },
        mapping: {}
      },
      availableFields: [],
      testData: null
    }
  },
  computed: {
    slots () {
      return [
        {
          field: 'value',
          label: '指标值',
          required: true
        }
      ]
    }
  },
  created () {
    // 初始化表单数据
    if (this.config.dynamicData) {
      this.formData = { ...this.config.dynamicData }
    }
  },
  methods: {
    handleConfigChange () {
      // 通知父组件配置已更新
      this.$emit('update', { ...this.formData })
    },
    async testApi () {
      try {
        const response = await axios({
          method: this.formData.method,
          url: this.formData.api
        })
        const data = get(response, this.formData.dataPath)
        this.testData = data
        this.parseFields(data)
        this.$message.success('接口测试成功')
      } catch (error) {
        this.$message.error('接口测试失败: ' + error.message)
      }
    },
    parseFields (data) {
      const fields = []
      const traverse = (obj, path = '', label = '') => {
        if (Array.isArray(obj)) {
          if (obj.length > 0) {
            traverse(obj[0], path, label)
          }
        } else if (obj && typeof obj === 'object') {
          Object.keys(obj).forEach(key => {
            const newPath = path ? `${path}.${key}` : key
            const newLabel = label ? `${label}.${key}` : key
            if (typeof obj[key] !== 'object') {
              fields.push({
                path: newPath,
                label: newLabel,
                type: typeof obj[key]
              })
            } else {
              traverse(obj[key], newPath, newLabel)
            }
          })
        }
      }
      traverse(data)
      this.availableFields = fields
    }
  }
}
</script>

<style lang="scss" scoped>
.dynamic-data-config {
  .data-setting-box {
    .data-setting-data-box {
      margin-bottom: 16px;
      .lc-field-head {
        height: 30px;
        .lc-field-title {
          position: relative;
          padding-left: 12px;
          line-height: 30px;
          height: 30px;
          &:after {
            position: absolute;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            content: '';
            width: 3px;
            height: 14px;
            background: var(--el-color-primary);
          }
        }
      }
      .lc-field-body {
        padding: 16px;
        background: var(--el-fill-color-light);
        border-radius: 4px;
      }
    }
  }
}
</style> 