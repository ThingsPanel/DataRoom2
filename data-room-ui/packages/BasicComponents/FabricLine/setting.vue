<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      :model="config"
      label-width="100px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <div>
        <slot name="top" />
        <el-form
          :model="config.customize"
          label-position="left"
          class="setting-body bs-el-form"
          label-width="100px"
        >
          <SettingTitle>位置</SettingTitle>
          <div class="lc-field-body">
            <PosWhSetting :config="config" />
          </div>
          <SettingTitle v-if="config.border">边框</SettingTitle>
          <div class="lc-field-body">
            <BorderSetting
              v-if="config.border"
              label-width="100px"
              :config="config.border"
              :bigTitle='config.title'
            />
          </div>
          <SettingTitle>旋转</SettingTitle>
          <div class="lc-field-body">
            <RotateSetting
              :config="config"
            />
          </div>
          <SettingTitle>基础</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="标题">
              <el-input
                v-model="config.title"
                class="bs-el-input"
                clearable
              />
            </el-form-item>
            <el-form-item label="线条形状">
              <el-select
                v-model="config.customize.lineShapeType"
                placeholder="选择线条形状"
                class="bs-el-select"
              >
                <el-option
                  v-for="item in lineShapeTypeOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="线条颜色">
              <ColorPicker
                v-model="config.customize.lineColor"
                :predefine="predefineThemeColors"
              />
            </el-form-item>
            <el-form-item label="线条宽度">
              <el-input-number
                v-model="config.customize.lineWidth"
                class="bs-el-input-number"
                controls-position="right"
                :min="1"
                :max="10"
              />
            </el-form-item>
            <el-form-item label="点颜色">
              <ColorPicker
                v-model="config.customize.pointColor"
                :predefine="predefineThemeColors"
              />
            </el-form-item>
            <el-form-item label="点大小">
              <el-input-number
                v-model="config.customize.pointRadius"
                class="bs-el-input-number"
                controls-position="right"
                :min="2"
                :max="10"
              />
            </el-form-item>
            <el-form-item label="启用虚线">
              <el-switch v-model="config.customize.enableLineDash" />
            </el-form-item>

            <template v-if="config.customize.enableLineDash">
              <el-form-item label="虚线长度">
                <el-input-number
                  v-model="config.customize.lineDashValue"
                  class="bs-el-input-number"
                  controls-position="right"
                  :min="1"
                />
              </el-form-item>
              <el-form-item label="虚线间隔">
                <el-input-number
                  v-model="config.customize.lineGapValue"
                  class="bs-el-input-number"
                  controls-position="right"
                  :min="1"
                />
              </el-form-item>
            </template>

          </div>
        </el-form>
      </div>
    </el-form>
  </div>
</template>

<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import BorderSetting from 'data-room-ui/BigScreenDesign/RightSetting/BorderSetting.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import {predefineColors} from "data-room-ui/js/utils/colorList"
import { LineShapeTypeOptions } from './settingConfig'

export default {
  name: 'FabricLineSetting',
  components: {
    ColorPicker,
    PosWhSetting,
    SettingTitle,
    BorderSetting,
    RotateSetting
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
      lineShapeTypeOptions: LineShapeTypeOptions
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  width: 97%;
  padding: 16px;
}

.draw-mode-hint {
  font-size: 12px;
  color: #909399;
  margin-top: 4px;
  line-height: 1.4;
}
</style>