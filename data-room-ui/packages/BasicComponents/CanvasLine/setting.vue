<template>
  <div class="bs-setting-wrap">
    <el-form
      ref="form"
      :model="config"
      label-width="90px"
      size="mini"
    >
      <SettingTitle>基础样式</SettingTitle>
      <div class="lc-field-body">
        <el-form-item label="线条颜色">
          <ColorPicker
            v-model="config.customize.lineColor"
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
            :step="0.01"
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
        <el-form-item label="线条类型">
          <el-select
            v-model="config.customize.lineType"
            placeholder="请选择线条类型"
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
          <el-form-item label="动画类型">
            <el-select
              v-model="config.customize.animation.type"
              placeholder="请选择动画类型"
              @change="updateConfig"
            >
              <el-option label="流动效果" value="flow" />
              <el-option label="粒子效果" value="particle" />
            </el-select>
          </el-form-item>
          <el-form-item label="动画速度">
            <el-slider
              v-model="config.customize.animation.speed"
              :min="1"
              :max="10"
              :step="0.5"
              @change="updateConfig"
            />
          </el-form-item>
          <el-form-item label="动画方向">
            <el-select
              v-model="config.customize.animation.direction"
              placeholder="请选择动画方向"
              @change="updateConfig"
            >
              <el-option label="正向" value="forward" />
              <el-option label="反向" value="reverse" />
              <el-option label="交替" value="alternate" />
            </el-select>
          </el-form-item>
          
          <template v-if="config.customize.animation.type === 'flow'">
            <el-form-item label="流动颜色">
              <ColorPicker
                v-model="config.customize.animation.flowColor"
                @change="updateColorAndRefresh"
              />
            </el-form-item>
            <el-form-item label="流动长度">
              <el-slider
                v-model="config.customize.animation.flowLength"
                :min="5"
                :max="50"
                @change="updateConfig"
              />
            </el-form-item>
            <el-form-item label="发光宽度">
              <el-slider
                v-model="config.customize.animation.glowWidth"
                :min="0"
                :max="20"
                @change="updateConfig"
              />
            </el-form-item>
            <el-form-item label="发光颜色">
              <ColorPicker
                v-model="config.customize.animation.glowColor"
                @change="updateColorAndRefresh"
              />
            </el-form-item>
          </template>
          
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
</template>

<script>
import { EventBus } from 'data-room-ui/js/utils/eventBus'
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'

export default {
  name: 'CanvasLineSetting',
  components: {
    SettingTitle,
    ColorPicker
  },
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {}
  },
  created() {
    this.initConfig()
  },
  methods: {
    initConfig() {
      if (!this.config.customize) {
        this.$set(this.config, 'customize', {})
      }
      
      // 初始化线条样式
      if (!this.config.customize.lineColor) {
        this.$set(this.config.customize, 'lineColor', '#1890ff')
      }
      
      if (!this.config.customize.lineWidth) {
        this.$set(this.config.customize, 'lineWidth', 2)
      }
      
      if (typeof this.config.customize.opacity !== 'number') {
        this.$set(this.config.customize, 'opacity', 1)
      }
      
      if (typeof this.config.customize.dashed !== 'boolean') {
        this.$set(this.config.customize, 'dashed', false)
      }
      
      if (!this.config.customize.dashLength) {
        this.$set(this.config.customize, 'dashLength', 5)
      }
      
      // 初始化线条类型
      if (!this.config.customize.lineType) {
        // 兼容旧版本
        const lineType = this.config.customize.curved ? 'curved' : 'straight'
        this.$set(this.config.customize, 'lineType', lineType)
      }
      
      // 初始化动画配置
      if (!this.config.customize.animation) {
        this.$set(this.config.customize, 'animation', {
          enable: false,
          type: 'flow',
          speed: 5,
          flowColor: 'rgba(24, 144, 255, 0.6)',
          flowLength: 30,
          particleSize: 3,
          particleColor: '#ffffff',
          glowColor: 'rgba(24, 144, 255, 0.3)',
          glowWidth: 10,
          direction: 'forward'
        })
      }
    },
    
    updateConfig() {
      this.$emit('change', this.config)
    },
    
    updateColorAndRefresh() {
      this.updateConfig()
      // 通知组件刷新动画
      EventBus.$emit('canvasline-refresh-animation')
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-setting-wrap {
  padding: 0 16px;
}

.lc-field-body {
  padding: 10px 0;
}
</style>