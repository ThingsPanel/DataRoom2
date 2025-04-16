<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      :model="config"
      :rules="customRules"
      label-width="120px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <SettingTitle>基础</SettingTitle>
      <div class="lc-field-body">
        <el-form-item
          label="标题"
          label-width="120px"
        >
          <el-input
            v-model="config.title"
            placeholder="请输入标题"
            clearable
          />
        </el-form-item>
      </div>
      
      <SettingTitle>边框</SettingTitle>
      <div class="lc-field-body">
        <BorderSetting
          v-if="config.border"
          label-width="120px"
          :config="config.border"
          :big-title="config.title"
        />
      </div>
      
      <SettingTitle>位置</SettingTitle>
      <div class="lc-field-body">
        <PosWhSetting
          label-width="120px"
          :config="config"
        />
      </div>
      
      <SettingTitle>旋转</SettingTitle>
      <div class="lc-field-body">
        <RotateSetting
          :config="config"
        />
      </div>
      
      <!-- 3D个性化配置 -->
      <template v-for="group in groupList">
        <div :key="group.groupName">
          <SettingTitle>{{ group.groupName | filterGroupName }}</SettingTitle>
          <div class="lc-field-body">
            <div
              v-for="(setting, settingIndex) in group.list"
              :key="settingIndex+1"
            >
              <el-form-item
                :label="setting.label"
                :label-width="'120px'"
              >
                <el-input
                  v-if="setting.type === 'input'"
                  :value="getProperty(setting.optionField)" 
                  @input="setProperty(setting.optionField, $event)"
                  :placeholder="`请输入${setting.label}`"
                  clearable
                />
                <el-input-number
                  v-else-if="setting.type === 'inputNumber'"
                  :value="getProperty(setting.optionField)"
                  @input="value => setProperty(setting.optionField, value)"
                  :min="setting.min"
                  :max="setting.max"
                  :step="setting.step || 1"
                  :placeholder="`请输入${setting.label}`"
                />
                <el-select
                  v-else-if="setting.type === 'select'"
                  :value="getProperty(setting.optionField)"
                  @input="setProperty(setting.optionField, $event)"
                  popper-class="bs-el-select"
                  class="bs-el-select"
                  :placeholder="`请选择${setting.label}`"
                  :multiple="setting.multiple"
                  clearable
                >
                  <el-option
                    v-for="(opt, optIndex) in setting.options"
                    :key="optIndex"
                    :label="opt.label"
                    :value="opt.value"
                  />
                </el-select>
                <el-color-picker
                  v-else-if="setting.type === 'colorPicker'"
                  :value="getProperty(setting.optionField)"
                  @change="setProperty(setting.optionField, $event)"
                  show-alpha
                />
                <el-switch
                  v-else-if="setting.type === 'switch'"
                  :value="getProperty(setting.optionField)"
                  @input="setProperty(setting.optionField, $event)"
                  :active-value="setting.active"
                  :inactive-value="setting.inactive"
                />
                <el-slider
                  v-else-if="setting.type === 'slider'"
                  :value="getProperty(setting.optionField)"
                  @input="setProperty(setting.optionField, $event)"
                  :min="setting.min"
                  :max="setting.max"
                  :step="setting.step"
                />
                <div
                  v-else
                  style="color: #aaa; font-size: 12px;"
                >
                  未知的配置类型: {{ setting.type }}
                </div>
              </el-form-item>
            </div>
          </div>
        </div>
      </template>
      
      <!-- 应用按钮 -->
      <div class="apply-button-container">
        <el-button type="primary" @click="applyChanges">应用</el-button>
      </div>
    </el-form>
  </div>
</template>

<script>
import { mapState } from 'vuex'
import SettingTitle from 'data-room-ui/BigScreenDesign/RightSetting/SettingTitle'
import PaddingSetting from './PaddingSetting'
import GradualSetting from './GradualSetting'
import TextGradient from './TextGradient'
import BorderColorSetting from './BorderColorSetting'
import BorderSetting from './BorderSetting'
import PosWhSetting from './PosWhSetting'
import RotateSetting from './RotateSetting'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import _ from 'lodash'

export default {
  name: 'ThreeComponent',
  components: {
    SettingTitle,
    PaddingSetting,
    GradualSetting,
    TextGradient,
    BorderColorSetting,
    BorderSetting,
    PosWhSetting,
    RotateSetting
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      customRules: {},
      groupList: []
    }
  },
  computed: {
    ...mapState('bigScreen', {
      pageInfo: state => state.pageInfo,
      customTheme: state => state.pageInfo.pageConfig.customTheme
    })
  },
  filters: {
    filterGroupName(val) {
      if (val === 'other') {
        return '其他'
      } else if (val === '基础') {
        return '基础设置'
      } else if (val === '相机') {
        return '相机设置'
      } else if (val === '模型') {
        return '模型设置'
      } else if (val === '数据') {
        return '数据设置'
      } else {
        return val
      }
    }
  },
  watch: {
    config: {
      handler: 'init',
      deep: true
    }
  },
  created() {
    this.init()
  },
  methods: {
    init() {
      if (!this.config || !this.config.option) {
        console.warn('[ThreeComponent] Init called with invalid config:', this.config)
        this.config = { option: { customize: {} }, setting: [] }
      } 
      if (!this.config.setting) {
        this.$set(this.config, 'setting', [])
      }
      if (!this.config.option) {
        this.$set(this.config, 'option', { customize: {} })
      }
       if (!this.config.option.customize) {
        this.$set(this.config.option, 'customize', {})
      }
      
      this.initGroupList()
    },
    
    initGroupList() {
      this.groupList = []
      const groupNameList = []
      
      if (!this.config.setting || !Array.isArray(this.config.setting)) {
        return
      }
      
      this.config.setting.filter(
        (item) => item.tabName === 'custom'
      ).forEach(item => {
        if (item.groupName) {
          if (!groupNameList.includes(item.groupName)) {
            groupNameList.push(item.groupName)
            this.groupList.push({
              groupName: item.groupName,
              list: [item]
            })
          } else {
            this.groupList.find(group => group.groupName === item.groupName).list.push(item)
          }
        } else {
          let otherGroup = this.groupList.find(group => group.groupName === 'other')
          if (!otherGroup) {
            otherGroup = { groupName: 'other', list: [] }
            this.groupList.push(otherGroup)
          }
          otherGroup.list.push(item)
        }
      })
      
      const otherIndex = this.groupList.findIndex(g => g.groupName === 'other')
      if (otherIndex > -1) {
        const otherObject = this.groupList.splice(otherIndex, 1)[0]
        this.groupList.push(otherObject)
      }
    },
    
    getProperty(path) {
      return _.get(this.config.option, path, null)
    },
    
    setProperty(path, value) {
      _.set(this.config.option, path, value)
    },
    
    applyChanges() {
      if (this.config.option) {
        this.config.theme = settingToTheme(this.config, this.customTheme)
      }
      
      console.log('ThreeComponent Apply: Emitting update with config:', _.cloneDeep(this.config))
      
      this.$emit('update', this.config)
      
      this.$message.success('3D配置已应用')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/settingWrap.scss';
@import '../../assets/style/bsTheme.scss';

.lc-field-body {
  padding: 12px 16px;
}

.el-form-item {
  margin-bottom: 10px !important;
}

.apply-button-container {
  margin-top: 15px;
  padding: 0 16px 12px;
  text-align: right;
}
</style>
