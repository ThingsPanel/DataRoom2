<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      label-width="100px"
      label-position="left"
      :model="config"
      class="bs-el-form"
    >
      <SettingTitle>标题</SettingTitle>
      <div class="lc-field-body">
        <el-form-item label="组件名称" prop="title">
          <el-input v-model="config.title" placeholder="请输入组件名称" clearable />
        </el-form-item>
      </div>

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
        <el-form-item label="图标代码" prop="customize.iconCode">
           <el-tooltip placement="top" effect="dark">
             <div slot="content">
               对应 <a href="https://github.com/qwd/QWeather-Icons" target="_blank" style="color: #409EFF;">QWeather-Icons</a> 图标库的代码
             </div>
             <el-input v-model="config.customize.iconCode" placeholder="例如: 100" clearable />
           </el-tooltip>
        </el-form-item>
        <el-form-item label="图标大小">
           <el-input-number v-model="config.customize.iconSize" :min="10" controls-position="right" style="width: 100%" />
           <span>px</span>
        </el-form-item>
        <el-form-item label="图标颜色">
          <ColorPicker v-model="config.customize.iconColor" :predefine="predefineThemeColors" />
        </el-form-item>
        <el-form-item label="背景颜色">
           <ColorPicker v-model="config.customize.backgroundColor" :predefine="predefineThemeColors" />
        </el-form-item>
      </div>
    </el-form>
  </div>
</template>

<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue';
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue';
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue';
import ColorPicker from 'data-room-ui/ColorPicker/index.vue';
import { predefineColors } from "data-room-ui/js/utils/colorList";

export default {
  name: 'WeatherIconSetting',
  components: {
    SettingTitle,
    PosWhSetting,
    RotateSetting,
    ColorPicker
  },
  props: {
    config: { type: Object, required: true },
    predefineThemeColors: { type: Array, default: () => predefineColors }
  }
};
</script>

<style lang="scss" scoped>
@import "../../assets/style/settingWrap.scss";
.lc-field-body {
  padding: 12px 16px;
}
.el-form-item__content .el-input-number {
  width: calc(100% - 30px) !important;
  margin-right: 5px;
}
.el-form-item__content > span {
 display: inline-block;
 width: 20px;
 text-align: right;
}
/* Ensure tooltip works with input */
.el-form-item__content .el-tooltip {
  width: 100%;
}
</style> 