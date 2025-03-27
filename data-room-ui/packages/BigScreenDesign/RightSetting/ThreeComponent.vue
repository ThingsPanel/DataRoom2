<template>
  <div class="three-setting">
    <el-form
      ref="form"
      label-position="top"
      size="small"
    >
      <div v-if="config.setting">
        <el-collapse v-model="activeNames" accordion>
          <!-- 模型设置 -->
          <el-collapse-item title="模型设置" name="model">
            <div v-for="(item, index) in modelSettings" :key="index" class="setting-item">
              <el-form-item :label="item.label">
                <component
                  :is="getComponentType(item)"
                  :value="getConfigValue(item)"
                  @input="updateConfigValue(item, $event)"
                  v-bind="getComponentProps(item)"
                />
              </el-form-item>
            </div>
          </el-collapse-item>
          <!-- 相机设置 -->
          <el-collapse-item title="相机设置" name="camera">
            <div v-for="(item, index) in cameraSettings" :key="index" class="setting-item">
              <el-form-item :label="item.label">
                <component
                  :is="getComponentType(item)"
                  :value="getConfigValue(item)"
                  @input="updateConfigValue(item, $event)"
                  :min="item.min"
                  :max="item.max"
                  :step="item.step"
                />
              </el-form-item>
            </div>
          </el-collapse-item>
          <!-- 背景设置 -->
          <el-collapse-item title="背景设置" name="background">
            <div v-for="(item, index) in backgroundSettings" :key="index" class="setting-item">
              <el-form-item :label="item.label">
                <component
                  :is="getComponentType(item)"
                  :value="getConfigValue(item)"
                  @input="updateConfigValue(item, $event)"
                  :min="item.min"
                  :max="item.max"
                  :step="item.step"
                />
              </el-form-item>
            </div>
          </el-collapse-item>
          <!-- 光照设置 -->
          <el-collapse-item title="光照设置" name="light">
            <div v-for="(item, index) in lightSettings" :key="index" class="setting-item">
              <el-form-item :label="item.label">
                <component
                  :is="getComponentType(item)"
                  :value="getConfigValue(item)"
                  @input="updateConfigValue(item, $event)"
                  :min="item.min"
                  :max="item.max"
                  :step="item.step"
                />
              </el-form-item>
            </div>
          </el-collapse-item>
        </el-collapse>
        
        <!-- 应用按钮 -->
        <div class="apply-button-container">
          <el-button type="primary" @click="applyChanges">应用样式</el-button>
        </div>
      </div>
    </el-form>
  </div>
</template>

<script>
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'
import { getLocalEngineList } from 'data-room-ui/js/utils/threeEngineLoader'

export default {
  name: 'ThreeComponent',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      activeNames: ['model', 'camera', 'background', 'light']
    }
  },
  created () {
    // 确保customize对象存在
    if (!this.config.option) {
      this.$set(this.config, 'option', {})
    }
    if (!this.config.option.customize) {
      this.$set(this.config.option, 'customize', {})
    }
  },
  computed: {
    // 模型设置相关的配置项
    modelSettings () {
      return this.config.setting ? this.config.setting.filter(item =>
        item.tabName === 'custom' && item.groupName === 'model'
      ) : []
    },
    // 相机设置相关的配置项
    cameraSettings () {
      return this.config.setting ? this.config.setting.filter(item =>
        item.tabName === 'custom' && item.groupName === 'camera'
      ) : []
    },
    // 背景设置相关的配置项
    backgroundSettings () {
      return this.config.setting ? this.config.setting.filter(item =>
        item.tabName === 'custom' && item.groupName === 'background'
      ) : []
    },
    // 光照设置相关的配置项
    lightSettings () {
      return this.config.setting ? this.config.setting.filter(item =>
        item.tabName === 'custom' && item.groupName === 'light'
      ) : []
    }
  },
  methods: {
    // 获取表单控件类型
    getComponentType (item) {
      const typeMap = {
        inputNumber: 'el-input-number',
        colorPicker: 'el-color-picker',
        input: 'el-input',
        select: 'el-select'
      }
      return typeMap[item.type] || 'el-input'
    },
    // 获取组件额外属性
    getComponentProps (item) {
      const props = {
        min: item.min,
        max: item.max,
        step: item.step
      }
      
      // 处理下拉选择器
      if (item.type === 'select') {
        props.options = item.options || []
        props.multiple = item.multiple || false
      }
      
      return props
    },
    // 获取配置值，并确保对象存在
    getConfigValue (item) {
      const fieldKey = this.getFieldKey(item)
      // 确保customize对象存在
      if (!this.config.option) {
        this.$set(this.config, 'option', {})
      }
      if (!this.config.option.customize) {
        this.$set(this.config.option, 'customize', {})
      }
      // 如果属性不存在，使用默认值初始化
      if (this.config.option.customize[fieldKey] === undefined) {
        this.$set(this.config.option.customize, fieldKey, item.value)
      }
      return this.config.option.customize[fieldKey]
    },
    // 更新配置值
    updateConfigValue (item, value) {
      const fieldKey = this.getFieldKey(item)
      // 确保customize对象存在
      if (!this.config.option) {
        this.$set(this.config, 'option', {})
      }
      if (!this.config.option.customize) {
        this.$set(this.config.option, 'customize', {})
      }
      
      // 记录原值和新值，用于调试
      console.log(`更新样式: ${fieldKey}, 原值: ${this.config.option.customize[fieldKey]}, 新值: ${value}`)
      
      // 更新值
      this.$set(this.config.option.customize, fieldKey, value)
      
      // 如果更改了引擎类型，需要更新本地引擎列表
      if (fieldKey === 'engineType' && value === 'local') {
        this.loadLocalEngines()
      }
      
      // 强制更新主题，确保触发ThreeRender的watch
      if (this.config.option.theme) {
        const currentTheme = this.config.option.theme
        this.$set(this.config.option, 'theme', currentTheme === 'light' ? 'dark' : 'light')
        setTimeout(() => {
          this.$set(this.config.option, 'theme', currentTheme)
        }, 0)
      }
      
      // 触发配置更新
      this.updateConfig()
    },
    // 获取字段对应的配置键名
    getFieldKey (item) {
      const fieldName = item.optionField || ''
      return fieldName.replace('customize.', '')
    },
    // 更新配置
    updateConfig () {
      // 处理主题跟随
      if (this.config.option) {
        this.config.theme = settingToTheme(this.config.option)
      }
      
      console.log('ThreeComponent触发更新事件，当前配置:', {
        theme: this.config.theme,
        customize: this.config.option.customize
      })
      
      // 确保配置更新被传递给父组件
      this.$emit('update', this.config)
    },
    // 应用更改
    applyChanges () {
      console.log('手动应用样式变更')
      
      // 使用父组件的特殊处理方法
      this.$parent.handleThreeComponentUpdate(this.config)
      
      // 显示成功提示
      this.$message.success('3D样式已更新')
    },
    /**
     * 加载本地引擎列表并更新设置选项
     */
    async loadLocalEngines () {
      try {
        // 获取本地引擎列表
        const engines = await getLocalEngineList()
        console.log('获取到本地引擎列表:', engines)
        
        // 更新设置选项中的本地引擎选项
        const setting = _.cloneDeep(this.config.setting)
        const engineField = setting.findIndex(item => item.field === 'customize_localEngine')
        
        if (engineField !== -1) {
          setting[engineField].options = engines
          
          // 如果有引擎文件且当前值为空，则设置默认值为第一个引擎
          if (engines.length > 0 && !setting[engineField].value) {
            setting[engineField].value = engines[0].value
            
            // 同时更新options中的值
            this.updateConfigValue(setting[engineField], engines[0].value)
          }
          
          this.config.setting = setting
        }
      } catch (error) {
        console.error('加载本地引擎列表失败:', error)
      }
    },
    
    /**
     * 保存设置时也更新引擎选项
     */
    saveConfig () {
      // ... existing code ...
      
      // 如果是3D模型组件，重新加载本地引擎列表
      if (this.config.setting && this.config.setting.find(item => item.field === 'customize_localEngine')) {
        this.loadLocalEngines()
      }
    }
  },
  mounted () {
    // ... existing code ...
    
    // 如果是3D模型组件，加载本地引擎列表
    if (this.config.setting && this.config.setting.find(item => item.field === 'customize_localEngine')) {
      this.loadLocalEngines()
    }
  }
}
</script>

<style lang="scss" scoped>
.three-setting {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
  overflow-y: auto;
}

.setting-item {
  margin-bottom: 15px;
}

.el-collapse {
  border: none;
}

/deep/ .el-form-item__label {
  padding-bottom: 2px;
}

.apply-button-container {
  margin-top: 15px;
  text-align: right;
}

/deep/ .el-select {
  width: 100%;
}
</style>
