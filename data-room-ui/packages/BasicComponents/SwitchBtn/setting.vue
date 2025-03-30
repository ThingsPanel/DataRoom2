<template>
  <div class="bs-setting-wrap">
    <el-form ref="form" :model="config" label-width="100px" label-position="left" class="setting-body bs-el-form">
      <div>
        <slot name="top" />
        <el-form :model="config.customize" label-position="left" class="setting-body bs-el-form" label-width="100px">
          <SettingTitle>位置</SettingTitle>
          <div class="lc-field-body">
            <PosWhSetting :config="config" />
          </div>
          <SettingTitle>旋转</SettingTitle>
          <div class="lc-field-body">
            <RotateSetting :config="config" />
          </div>
          <SettingTitle>基础</SettingTitle>
          <div class="lc-field-body">
            <!-- 开关宽度 -->
            <el-form-item label="开关宽度">
              <div class="slider-with-number">
                <el-slider 
                  v-model="config.customize.switchWidth" 
                  :min="20" 
                  :max="100" 
                  :show-tooltip="true"
                  :format-tooltip="val => `${val}px`" 
                  style="width: 73%;"
                ></el-slider>
                <el-input-number 
                  v-model="config.customize.switchWidth" 
                  class="bs-el-input-number width-input"
                  controls-position="right" 
                  :min="20" 
                  :max="100" 
                  size="mini"
                ></el-input-number>
              </div>
            </el-form-item>
            <!-- 开关高度 -->
            <el-form-item label="开关高度">
              <div class="slider-with-number">
                <el-slider 
                  v-model="config.customize.switchHeight" 
                  :min="10" 
                  :max="50" 
                  :show-tooltip="true"
                  :format-tooltip="val => `${val}px`" 
                  style="width: 73%;"
                ></el-slider>
                <el-input-number 
                  v-model="config.customize.switchHeight" 
                  class="bs-el-input-number width-input"
                  controls-position="right" 
                  :min="10" 
                  :max="50" 
                  size="mini"
                ></el-input-number>
              </div>
            </el-form-item>
            <!-- 字体大小 -->
            <el-form-item label="字体大小">
              <el-input-number v-model="config.customize.fontSize" class="bs-el-input-number" :min="12" :max="100" />
            </el-form-item>
            <!-- 字体颜色 -->
            <el-form-item label="字体颜色">
              <ColorPicker v-model="config.customize.fontColor" :predefine="predefineThemeColors" />
            </el-form-item>
            <!-- 是否显示文字 -->
            <el-form-item label="显示文字">
              <el-switch v-model="config.customize.showText" />
            </el-form-item>
            <!-- 开启时文字 -->
            <el-form-item label="开启时文字" v-if="config.customize.showText">
              <el-input v-model="config.customize.activeText" />
            </el-form-item>
            <!-- 关闭时文字 -->
            <el-form-item label="关闭时文字" v-if="config.customize.showText">
              <el-input v-model="config.customize.inactiveText" />
            </el-form-item>
          </div>
          <SettingTitle>开关状态</SettingTitle>
          <div class="lc-field-body">
            <!-- 开启颜色 -->
            <el-form-item label="开启颜色">
              <ColorPicker v-model="config.customize.activeColor" :predefine="predefineThemeColors" />
            </el-form-item>
            <!-- 关闭颜色 -->
            <el-form-item label="关闭颜色">
              <ColorPicker v-model="config.customize.inactiveColor" :predefine="predefineThemeColors" />
            </el-form-item>
            <!-- 开启值 -->
            <el-form-item label="开启值">
              <el-input-number v-model="config.customize.activeValue" class="bs-el-input-number" />
            </el-form-item>
            <!-- 关闭值 -->
            <el-form-item label="关闭值">
              <el-input-number v-model="config.customize.inactiveValue" class="bs-el-input-number" />
            </el-form-item>
            <!-- 切换阈值 -->
            <el-form-item label="切换阈值">
              <el-input-number v-model="config.customize.thresholdValue" class="bs-el-input-number" :min="0" />
              <div class="threshold-tip">当数据值大于等于此值时，开关为开启状态</div>
            </el-form-item>
          </div>
          <SettingTitle>执行脚本</SettingTitle>
          <div class="lc-field-body">
            <!-- 执行脚本 -->
            <el-form-item label="执行代码">
              <el-input 
                type="textarea" 
                :rows="5" 
                placeholder="请输入执行脚本，可使用activeValue和inactiveValue变量"
                v-model="config.customize.scriptString" 
              />
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-form>
  </div>
</template>

<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import { predefineColors } from 'data-room-ui/js/utils/colorList'

export default {
  name: 'SwitchBtnSetting',
  components: {
    ColorPicker,
    PosWhSetting,
    RotateSetting,
    SettingTitle
  },
  props: {
    config: {
      type: Object,
      required: true
    },
    predefineThemeColors: {
      type: Array,
      default: () => predefineColors
    }
  },
  data () {
    return {
    }
  },
  watch: {},
  mounted () { },
  methods: {}
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  width: 97%;
  padding: 16px;
}

.threshold-tip {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
}

.slider-with-number {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.width-input {
  width: 85px !important;
  margin-left: 10px;
}
</style>
