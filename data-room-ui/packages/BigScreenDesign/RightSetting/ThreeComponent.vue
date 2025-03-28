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
                  v-model="setting.value"
                  :placeholder="`请输入${setting.label}`"
                  clearable
                />
                <el-input-number
                  v-else-if="setting.type === 'inputNumber'"
                  v-model="setting.value"
                  :min="setting.min"
                  :max="setting.max"
                  :step="setting.step || 1"
                  :placeholder="`请输入${setting.label}`"
                />
                <el-select
                  v-else-if="setting.type === 'select'"
                  v-model="setting.value"
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
                  v-model="setting.value"
                  show-alpha
                />
                <template v-else-if="setting.type === 'colorSelect'">
                  <el-color-picker
                    v-model="setting.value"
                    show-alpha
                    @change="updateColorScheme"
                  />
                </template>
                <el-switch
                  v-else-if="setting.type === 'switch'"
                  v-model="setting.value"
                  :active-value="setting.active"
                  :inactive-value="setting.inactive"
                />
                <el-slider
                  v-else-if="setting.type === 'slider'"
                  v-model="setting.value"
                  :min="setting.min"
                  :max="setting.max"
                  :step="setting.step"
                />
                <div
                  v-else-if="setting.type === 'padding'"
                >
                  <PaddingSetting v-model="setting.value" />
                </div>
                <div
                  v-else-if="setting.type === 'appendPadding'"
                >
                  <PaddingSetting v-model="setting.value" />
                </div>
                <div
                  v-else-if="setting.type === 'gradual'"
                >
                  <GradualSetting v-model="setting.value" />
                </div>
                <div
                  v-else-if="setting.type === 'textGradient'"
                >
                  <TextGradient v-model="setting.value" />
                </div>
                <div
                  v-else-if="setting.type === 'borderColor'"
                >
                  <BorderColorSetting v-model="setting.value" />
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
  created() {
    this.init()
  },
  methods: {
    init() {
      this.config = this.$store.state.bigScreen.activeItemConfig || {}
      if (!this.config.setting) {
        this.config.setting = []
      }
      
      this.initGroupList()
    },
    
    // 初始化分组列表
    initGroupList() {
      this.groupList = []
      const groupNameList = []
      
      if (!this.config.setting || !Array.isArray(this.config.setting)) {
        return
      }
      
      this.config.setting.filter(
        (item) => item.tabName === 'custom'
      ).forEach(item => {
        if (item.tabName === 'custom' && item.groupName) {
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
          if (this.groupList.find(group => group.groupName === 'other')) {
            this.groupList.find(group => group.groupName === 'other').list.push(item)
          } else {
            this.groupList.push({
              groupName: 'other',
              list: [item]
            })
          }
        }
      })
      
      // 将"其他"分组移到最后
      for (let i = 0; i < this.groupList.length; i++) {
        if (this.groupList[i].groupName === 'other') {
          const otherObject = this.groupList.splice(i, 1)[0]
          this.groupList.push(otherObject)
          break
        }
      }
    },
    
    // 更新颜色方案
    updateColorScheme() {
      // 处理颜色方案更新
      this.$emit('update', this.config)
    },
    
    // 应用配置变更
    applyChanges() {
      // 处理主题跟随
      if (this.config.option) {
        this.config.theme = settingToTheme(this.config, this.customTheme)
      }
      
      console.log('ThreeComponent触发更新事件，当前配置:', {
        theme: this.config.theme,
        customize: this.config.option.customize
      })
      
      // 确保配置更新被传递给父组件
      this.$emit('update', this.config)
      
      // 显示成功提示
      this.$message.success('3D配置已更新')
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/settingWrap.scss';
@import '../../assets/style/bsTheme.scss';

// 筛选条件的按钮样式
.add-filter-box {
  position: relative;

  .add-filter {
    margin-left: 90px;
    margin-bottom: 10px;
  }

  .add-filter-btn {
    position: absolute;
    top: 0;
  }
}

.lc-field-body {
  padding: 12px 16px;
}

.el-form-item {
  margin-bottom: 6px !important;
}

.lc-field-title {
  position: relative;
  padding-left: 12px;
  line-height: 30px;
  height: 30px;
  margin-bottom: 12px;
  &:after {
    position: absolute;
    left: 0;
    top: 50%;
    transform: translateY(-50%);
    content: '';
    width: 4px;
    height: 14px;
    background-color: var(--bs-el-color-primary);
  }
}

::v-deep .el-color-picker__trigger {
  border-color: var(--bs-el-border);
}

.color-picker-box {
  ::v-deep .el-color-picker__trigger {
    width: 27px !important;
  }
}

.apply-button-container {
  margin-top: 15px;
  text-align: right;
}
</style>
