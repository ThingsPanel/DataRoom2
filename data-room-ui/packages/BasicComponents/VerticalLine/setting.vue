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
          <SettingTitle>标题</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="标题">
              <el-input
                v-model="config.title"
                clearable
              />
            </el-form-item>
          </div>
          <SettingTitle>位置</SettingTitle>
          <div class="lc-field-body">
            <PosWhSetting :config="config" />
          </div>
          <SettingTitle>旋转</SettingTitle>
          <div class="lc-field-body">
            <RotateSetting
              :config="config"
            />
          </div>
          <SettingTitle v-if="config.border">边框</SettingTitle>
          <div class="lc-field-body">
            <BorderSetting
              v-if="config.border"
              label-width="100px"
              :bigTitle='config.title'
              :config="config.border"
            />
          </div>
          <SettingTitle>基础</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="线条颜色">
              <ColorPicker
                v-model="config.customize.lineColor"
                placeholder="请选择线条颜色"
                :predefine-colors="predefineThemeColors"
              />
            </el-form-item>
            <el-form-item label="线条粗细">
              <el-input-number
                v-model="config.customize.lineWidth"
                class="bs-el-input-number"
                :min="1"
                :max="50"
                :step="1"
              />
            </el-form-item>
            <el-form-item
              label="不透明度"
            >
              <el-input-number
                v-model="config.customize.opacity"
                class="bs-el-input-number"
                placeholder="请输入不透明度"
                :min="0"
                :max="1"
                :precision="2"
                :step="0.01"
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
          <SettingTitle>动画</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="启用动画">
              <el-switch v-model="config.customize.animationActive" />
            </el-form-item>
            <template v-if="config.customize.animationActive">
              <el-form-item label="动画类型">
                <el-select
                  v-model="config.customize.animationType"
                  placeholder="选择动画类型"
                  class="bs-el-select"
                >
                  <el-option
                    v-for="item in animationTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="动画方向">
                <el-select
                  v-model="config.customize.animationDirection"
                  placeholder="选择动画方向"
                  class="bs-el-select"
                >
                  <el-option
                    v-for="item in animationDirectionOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  />
                </el-select>
              </el-form-item>
              <el-form-item label="动画速度">
                <el-input-number
                  v-model="config.customize.animationSpeed"
                  class="bs-el-input-number"
                  controls-position="right"
                  :min="0.1"
                  :step="0.1"
                />
              </el-form-item>
              <el-form-item label="循环播放">
                <el-switch v-model="config.customize.animationLoop" />
              </el-form-item>

              <template v-if="config.customize.animationType === 'droplet'">
                <el-form-item label="水珠颜色">
                  <ColorPicker
                    v-model="config.customize.dropletColor"
                    :predefine-colors="predefineThemeColors"
                  />
                </el-form-item>
                <el-form-item label="水珠大小">
                  <el-input-number
                    v-model="config.customize.dropletSize"
                    class="bs-el-input-number"
                    controls-position="right"
                    :min="1"
                  />
                </el-form-item>
              </template>

              <template v-if="config.customize.animationType === 'flow'">
                <el-form-item label="流水颜色">
                  <ColorPicker
                    v-model="config.customize.flowColor"
                    :predefine-colors="predefineThemeColors"
                  />
                </el-form-item>
                <el-form-item label="流水粗细">
                  <el-input-number
                    v-model="config.customize.flowThickness"
                    class="bs-el-input-number"
                    controls-position="right"
                    :min="1"
                  />
                </el-form-item>
                <el-form-item label="流水密度">
                  <el-input-number
                    v-model="config.customize.flowDensity"
                    class="bs-el-input-number"
                    controls-position="right"
                    :min="1"
                  />
                </el-form-item>
              </template>
            </template>
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
import BorderSetting from 'data-room-ui/BigScreenDesign/RightSetting/BorderSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import {predefineColors} from "data-room-ui/js/utils/colorList";
// 导入动画选项
import { AnimationTypeOptions, AnimationDirectionOptions } from '../FabricLine/settingConfig.js'

export default {
  name: 'VerticalLineSetting',
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
      // 提供动画选项下拉菜单
      animationTypeOptions: AnimationTypeOptions,
      animationDirectionOptions: AnimationDirectionOptions
    }
  },
  watch: {},
  mounted () {},
  methods: {}
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  padding: 12px 16px;
}
</style>
