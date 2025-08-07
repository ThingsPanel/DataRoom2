<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      :model="config"
      label-width="90px"
      label-position="left"
      class="setting-body bs-el-form"
    >
      <div>
        <slot name="top" />
        <el-form
          :model="config.customize"
          label-position="left"
          class="setting-body bs-el-form"
          label-width="90px"
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
            <el-form-item label="颜色类型">
              <el-radio-group v-model="config.customize.colorType">
                <el-radio-button label="single">单色</el-radio-button>
                <el-radio-button label="gradient">渐变</el-radio-button>
              </el-radio-group>
            </el-form-item>
            <el-form-item v-if="config.customize.colorType === 'single'" label="背景色">
              <ColorPicker
                v-model="config.customize.backgroundColor"
                placeholder="请选择背景色"
                :predefine-colors="predefineThemeColors"
              />
            </el-form-item>
            <template v-if="config.customize.colorType === 'gradient'">
              <el-form-item label="背景色一">
                <ColorPicker
                  v-model="config.customize.gradientColor0"
                  placeholder="请选择背景色"
                  :predefine-colors="predefineThemeColors"
                />
              </el-form-item>
              <el-form-item label="背景色二">
                <ColorPicker
                  v-model="config.customize.gradientColor1"
                  placeholder="请选择背景色"
                  :predefine-colors="predefineThemeColors"
                />
              </el-form-item>
              <el-form-item label="渐变方向">
                <el-select v-model="config.customize.gradientDirection">
                  <el-option label="从左到右" value="to right" />
                  <el-option label="从右到左" value="to left" />
                  <el-option label="从上到下" value="to bottom" />
                  <el-option label="从下到上" value="to top" />
                </el-select>
              </el-form-item>
            </template>
            <el-form-item
              label="不透明度"
              label-width="100px"
            >
              <el-input-number
                v-model="config.customize.opacity"
                class="bs-el-input-number"
                placeholder="请输入不透明度"
                :min="0.01"
                :max="1"
                :precision="2"
                :step="0.01"
              />
            </el-form-item>
          </div>
          <SettingTitle>圆角</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="左上圆角">
              <el-input-number v-model="config.customize.borderRadiusTopLeft" :min="0" /> px
            </el-form-item>
            <el-form-item label="右上圆角">
              <el-input-number v-model="config.customize.borderRadiusTopRight" :min="0" /> px
            </el-form-item>
            <el-form-item label="左下圆角">
              <el-input-number v-model="config.customize.borderRadiusBottomLeft" :min="0" /> px
            </el-form-item>
            <el-form-item label="右下圆角">
              <el-input-number v-model="config.customize.borderRadiusBottomRight" :min="0" /> px
            </el-form-item>
          </div>
          <SettingTitle>阴影</SettingTitle>
           <div class="lc-field-body">
            <el-form-item label="阴影样式">
              <el-input
                v-model="config.customize.boxShadow"
                clearable
                placeholder="例: 2px 2px 5px rgba(0,0,0,0.5)"
              />
            </el-form-item>
          </div>
          <SettingTitle>内边距</SettingTitle>
          <div class="lc-field-body">
             <el-form-item label="上边距">
              <el-input-number v-model="config.customize.paddingTop" :min="0" /> px
            </el-form-item>
            <el-form-item label="右边距">
              <el-input-number v-model="config.customize.paddingRight" :min="0" /> px
            </el-form-item>
            <el-form-item label="下边距">
              <el-input-number v-model="config.customize.paddingBottom" :min="0" /> px
            </el-form-item>
            <el-form-item label="左边距">
              <el-input-number v-model="config.customize.paddingLeft" :min="0" /> px
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
import BorderSetting from 'data-room-ui/BigScreenDesign/RightSetting/BorderSetting.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import {predefineColors} from "data-room-ui/js/utils/colorList";

export default {
  name: 'RectangleSetting',
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
  }
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  padding: 12px 16px;
}

// 给 input-number 后面的单位腾出空间
.el-form-item__content .el-input-number {
  width: calc(100% - 20px) !important;
  margin-right: 5px;
}
</style> 