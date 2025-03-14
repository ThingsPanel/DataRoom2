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
                @change="updateColorAndRefresh"
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
            <el-form-item v-if="config.customize.dashed" label="虚线长度">
              <el-input-number
                v-model="config.customize.dashLength"
                :min="1"
                :max="20"
                @change="updateConfig"
              />
            </el-form-item>
            <el-form-item label="线型">
              <el-select 
                v-model="config.customize.lineType" 
                class="full-width-select"
                @change="updateConfig"
              >
                <el-option label="直线" value="straight" />
                <el-option label="曲线" value="curved" />
                <el-option label="阶梯线" value="step" />
                <el-option label="平滑曲线" value="smooth" />
                <el-option label="贝塞尔曲线" value="bezier" />
              </el-select>
            </el-form-item>
          </div>
          <SettingTitle>动画效果</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="启用动画">
              <el-switch
                v-model="config.customize.animation.enable"
                @change="updateConfig"
              />
            </el-form-item>
            
            <template v-if="config.customize.animation.enable">
              <el-form-item label="动画类型" class="animation-type-item">
                <el-select 
                  v-model="config.customize.animation.type"
                  @change="updateConfig"
                  class="full-width-select"
                >
                  <el-option label="水流动画" value="flow" />
                  <el-option label="粒子流动" value="particle" />
                  <div style="height: 12px;"/>
                </el-select>
              </el-form-item>

              <el-form-item label="动画速度">
                <el-slider
                  v-model="config.customize.animation.speed"
                  :min="1"
                  :max="10"
                  @change="updateConfig"
                />
              </el-form-item>
            
              <!-- 水流动画配置 -->
              <template v-if="config.customize.animation.type === 'flow'">
                <el-form-item label="水流颜色">
                  <ColorPicker
                    v-model="config.customize.animation.flowColor"
                    show-alpha
                    @change="updateColorAndRefresh"
                  />
                </el-form-item>
                <el-form-item label="水流长度">
                  <el-slider
                    v-model="config.customize.animation.flowLength"
                    :min="5"
                    :max="50"
                    @change="updateConfig"
                  />
                </el-form-item>
              </template>
              
              <!-- 粒子动画配置 -->
              <template v-if="config.customize.animation.type === 'particle'">
                <el-form-item label="粒子颜色">
                  <ColorPicker
                    v-model="config.customize.animation.particleColor"
                    @change="updateColorAndRefresh"
                  />
                </el-form-item>
                <el-form-item label="粒子大小">
                  <el-slider
                    v-model="config.customize.animation.particleSize"
                    :min="1"
                    :max="10"
                    @change="updateConfig"
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
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import {predefineColors} from 'data-room-ui/js/utils/colorList'
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
      predefineThemeColors: predefineColors
    }
  },
  created() {
    // 确保自动调整大小选项存在，并且始终为 true
    if (!this.config.customize) {
      this.$set(this.config, 'customize', {})
    }
    
    // 始终将自动调整大小设置为 true
    this.$set(this.config.customize, 'autoResize', true)
    
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
    
    // 确保虚线相关属性存在
    if (this.config.customize.dashed === undefined) {
      this.$set(this.config.customize, 'dashed', false)
    }
    
    if (!this.config.customize.dashLength) {
      this.$set(this.config.customize, 'dashLength', 5)
    }
    
    // 确保线型属性存在
    if (!this.config.customize.lineType) {
      // 兼容旧版本，如果有curved属性，则根据curved设置lineType
      if (this.config.customize.curved !== undefined) {
        this.$set(this.config.customize, 'lineType', this.config.customize.curved ? 'curved' : 'straight')
      } else {
        this.$set(this.config.customize, 'lineType', 'straight')
      }
    }
  },
  methods: {
    // 更新配置
    updateConfig() {
      console.log('Updating config from setting')
      this.$emit('update:config', JSON.parse(JSON.stringify(this.config)))
    },
    
    // 更新颜色并刷新动画
    updateColorAndRefresh() {
      this.updateConfig()
      // 通知组件刷新动画
      EventBus.$emit('svgline-refresh-animation')
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-setting-wrap {
  font-size: 14px;
  
  .setting-body {
    padding-bottom: 20px;
  }
}

.lc-field-body {
  padding: 12px 16px;
  
  .el-form-item {
    margin-bottom: 18px;
    
    &:last-child {
      margin-bottom: 0;
    }
    
    &.animation-type-item {
      margin-bottom: 22px;
    }
  }
  
  // 确保下拉选择框有足够的底部边距
  .full-width-select {
    width: 100%;
    margin-bottom: 6px;
  }
  
  // 改进滑块样式
  .el-slider {
    margin-top: 8px;
  }
  
  // 改进颜色选择器样式
  .el-color-picker {
    vertical-align: middle;
  }
  
  // 改进开关样式
  .el-switch {
    vertical-align: middle;
  }
  
  // 改进输入数字样式
  .el-input-number {
    width: 100%;
  }
}

// 在嵌套模板内部强制应用间距
.animation-type-item + .el-form-item {
  margin-top: 0;
}

template + .el-form-item {
  margin-top: 0;
}
</style> 