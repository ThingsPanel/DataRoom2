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
                @change="updateConfig"
              />
            </el-form-item>
          </div>
          <SettingTitle>位置</SettingTitle>
          <div class="lc-field-body">
            <PosWhSetting :config="config" @update:config="updateConfig" />
          </div>
          <SettingTitle>旋转</SettingTitle>
          <div class="lc-field-body">
            <RotateSetting
              :config="config"
              @update:config="updateConfig"
            />
          </div>
          <SettingTitle>线条样式</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="线条颜色">
              <ColorPicker
                v-model="config.customize.lineColor"
                :predefine-colors="predefineThemeColors"
                @change="updateConfig"
              />
            </el-form-item>
            <el-form-item label="线条宽度">
              <el-input-number
                v-model="config.customize.lineWidth"
                :min="1"
                :max="20"
                @change="updateConfig"
              />
            </el-form-item>
            <el-form-item label="不透明度">
              <el-slider
                v-model="config.customize.opacity"
                :min="0"
                :max="1"
                :step="0.1"
                @change="updateConfig"
              />
            </el-form-item>
            <el-form-item label="虚线">
              <el-switch 
                v-model="config.customize.dashed" 
                @change="updateConfig"
              />
            </el-form-item>
            <el-form-item 
              v-if="config.customize.dashed"
              label="虚线长度"
            >
              <el-input-number
                v-model="config.customize.dashLength"
                :min="1"
                :max="20"
                @change="updateConfig"
              />
            </el-form-item>
            <el-form-item label="曲线">
              <el-switch 
                v-model="config.customize.curved" 
                @change="updateConfig"
              />
            </el-form-item>
          </div>
          <SettingTitle>编辑模式</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="启用编辑">
              <el-switch 
                v-model="isEditing"
                @change="toggleEdit"
              />
            </el-form-item>
            <el-form-item label="自动调整大小">
              <el-switch 
                v-model="config.customize.autoResize"
                @change="updateConfig"
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
import {predefineColors} from "data-room-ui/js/utils/colorList";
import { EventBus } from 'data-room-ui/js/utils/eventBus'

export default {
  name: 'SvgLineSetting',
  components: {
    ColorPicker,
    PosWhSetting,
    SettingTitle,
    RotateSetting
  },
  props: {
    config: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isEditing: false,
      predefineThemeColors: predefineColors
    }
  },
  created() {
    // 确保自动调整大小选项存在
    if (!this.config.customize) {
      this.$set(this.config, 'customize', {})
    }
    
    if (this.config.customize.autoResize === undefined) {
      this.$set(this.config.customize, 'autoResize', true)
      this.updateConfig()
    }
    
    // 确保其他必要的属性存在
    if (!this.config.customize.lineColor) {
      this.$set(this.config.customize, 'lineColor', '#1890ff')
    }
    
    if (!this.config.customize.lineWidth) {
      this.$set(this.config.customize, 'lineWidth', 2)
    }
    
    if (this.config.customize.opacity === undefined) {
      this.$set(this.config.customize, 'opacity', 1)
    }
  },
  methods: {
    toggleEdit() {
      console.log('Setting toggled edit mode to:', this.isEditing)
      
      // 使用事件总线通知组件
      EventBus.$emit('svgline-toggle-edit', this.isEditing)
    },
    
    // 更新配置
    updateConfig() {
      console.log('Updating config from setting')
      this.$emit('update:config', JSON.parse(JSON.stringify(this.config)))
    }
  }
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  padding: 12px 16px;
}
</style> 