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
          <SettingTitle>旋转</SettingTitle>
          <div class="lc-field-body">
            <RotateSetting
              :config="config"
            />
          </div>
          
          <SettingTitle>线条基础</SettingTitle>
          <div class="lc-field-body">
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
                :max="20"
              />
            </el-form-item>
            
            <el-form-item label="透明度">
              <el-slider
                v-model="config.customize.lineOpacity"
                :min="0"
                :max="1"
                :step="0.1"
                show-stops
              />
            </el-form-item>
          </div>
          
          <SettingTitle>线条类型</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="线条样式">
              <el-select v-model="config.customize.lineType" placeholder="请选择线条样式">
                <el-option label="实线" value="solid"></el-option>
                <el-option label="虚线" value="dashed"></el-option>
                <el-option label="点线" value="dotted"></el-option>
                <el-option label="点划线" value="dash-dot"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="虚线设置" v-if="config.customize.lineType !== 'solid'">
              <div class="dash-array-setting">
                <el-input-number
                  v-model="config.customize.dashArray[0]"
                  :min="1"
                  :max="20"
                  size="small"
                  class="dash-input"
                  controls-position="right"
                  placeholder="线段长度"
                />
                <span class="dash-separator">:</span>
                <el-input-number
                  v-model="config.customize.dashArray[1]"
                  :min="1"
                  :max="20"
                  size="small"
                  class="dash-input"
                  controls-position="right"
                  placeholder="间隙长度"
                />
              </div>
            </el-form-item>
            
            <el-form-item label="端点样式">
              <el-select v-model="config.customize.lineCap" placeholder="请选择端点样式">
                <el-option label="圆形" value="round"></el-option>
                <el-option label="方形" value="square"></el-option>
                <el-option label="平直" value="butt"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="连接样式">
              <el-select v-model="config.customize.lineJoin" placeholder="请选择连接样式">
                <el-option label="圆角" value="round"></el-option>
                <el-option label="尖角" value="miter"></el-option>
                <el-option label="斜角" value="bevel"></el-option>
              </el-select>
            </el-form-item>
          </div>
          
          <SettingTitle>阴影效果</SettingTitle>
          <div class="lc-field-body">
            <el-form-item>
              <el-switch
                v-model="config.customize.shadowEnabled"
                active-text="启用阴影"
                inactive-text="禁用阴影"
              />
            </el-form-item>
            
            <template v-if="config.customize.shadowEnabled">
              <el-form-item label="阴影颜色">
                <ColorPicker
                  v-model="config.customize.shadowColor"
                  :predefine="predefineThemeColors"
                />
              </el-form-item>
              
              <el-form-item label="模糊程度">
                <el-slider
                  v-model="config.customize.shadowBlur"
                  :min="0"
                  :max="20"
                  :step="1"
                />
              </el-form-item>
              
              <el-form-item label="X偏移">
                <el-slider
                  v-model="config.customize.shadowOffsetX"
                  :min="-10"
                  :max="10"
                  :step="1"
                />
              </el-form-item>
              
              <el-form-item label="Y偏移">
                <el-slider
                  v-model="config.customize.shadowOffsetY"
                  :min="-10"
                  :max="10"
                  :step="1"
                />
              </el-form-item>
            </template>
          </div>
          
          <SettingTitle>动画效果</SettingTitle>
          <div class="lc-field-body">
            <el-form-item>
              <el-switch
                v-model="config.customize.animationEnabled"
                active-text="启用动画"
                inactive-text="禁用动画"
              />
            </el-form-item>
            
            <template v-if="config.customize.animationEnabled">
              <el-form-item label="动画类型">
                <el-select v-model="config.customize.animationType" placeholder="请选择动画类型">
                  <el-option label="流动" value="flow"></el-option>
                  <el-option label="闪烁" value="flash"></el-option>
                  <el-option label="脉冲" value="pulse"></el-option>
                  <el-option label="渐变" value="gradient"></el-option>
                  <el-option label="霓虹" value="neon"></el-option>
                  <el-option label="扫描" value="scan"></el-option>
                  <el-option label="箭头流动" value="arrow"></el-option>
                  <el-option label="无" value="none"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="动画方向">
                <el-select v-model="config.customize.animationDirection" placeholder="请选择动画方向">
                  <el-option label="正向" value="forward"></el-option>
                  <el-option label="反向" value="backward"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="动画速度">
                <el-slider
                  v-model="config.customize.animationSpeed"
                  :min="5"
                  :max="100"
                  :step="5"
                  :format-tooltip="formatSpeedTooltip"
                />
              </el-form-item>
              
              <el-form-item label="动画颜色" v-if="['gradient', 'neon', 'arrow'].includes(config.customize.animationType)">
                <ColorPicker
                  v-model="config.customize.animationColor"
                  :predefine="predefineThemeColors"
                />
              </el-form-item>
              
              <el-form-item label="动画强度" v-if="['pulse', 'neon', 'scan'].includes(config.customize.animationType)">
                <el-slider
                  v-model="config.customize.animationIntensity"
                  :min="1"
                  :max="10"
                  :step="1"
                />
              </el-form-item>
            </template>
          </div>
          
          <SettingTitle>箭头设置</SettingTitle>
          <div class="lc-field-body">
            <el-form-item>
              <el-switch
                v-model="config.customize.arrowEnabled"
                active-text="显示箭头"
                inactive-text="隐藏箭头"
              />
            </el-form-item>
            
            <template v-if="config.customize.arrowEnabled">
              <el-form-item label="箭头位置">
                <el-select v-model="config.customize.arrowDirection" placeholder="请选择箭头位置">
                  <el-option label="起点" value="start"></el-option>
                  <el-option label="终点" value="end"></el-option>
                  <el-option label="两端" value="both"></el-option>
                </el-select>
              </el-form-item>
              
              <el-form-item label="箭头大小">
                <el-slider
                  v-model="config.customize.arrowSize"
                  :min="5"
                  :max="20"
                  :step="1"
                />
              </el-form-item>
            </template>
          </div>
          
          <SettingTitle>点样式</SettingTitle>
          <div class="lc-field-body">
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
                :min="1"
                :max="20"
              />
            </el-form-item>
          </div>

          <SettingTitle>画布操作</SettingTitle>
          <div class="lc-field-body">
            <el-form-item>
              <el-button type="danger" @click="clearCanvas">清空画布</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapMutations } from 'vuex'
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import {predefineColors} from "data-room-ui/js/utils/colorList";

export default {
  name: 'FabricLineSetting',
  components: {
    ColorPicker,
    SettingTitle,
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
  mounted() {
    // 确保config和customize对象都存在
    if (!this.config || !this.config.customize) {
      console.warn('FabricLine setting: config or customize is undefined');
      return;
    }
    
    // 初始化基础配置
    this.initDefaultValue('lineWidth', 2);
    this.initDefaultValue('lineColor', '#409EFF');
    this.initDefaultValue('lineOpacity', 1);
    
    // 初始化线条类型配置
    this.initDefaultValue('lineType', 'solid');
    this.initDefaultValue('dashArray', [3, 3]);
    this.initDefaultValue('lineCap', 'round');
    this.initDefaultValue('lineJoin', 'round');
    
    // 初始化阴影配置
    this.initDefaultValue('shadowEnabled', false);
    this.initDefaultValue('shadowColor', 'rgba(0,0,0,0.3)');
    this.initDefaultValue('shadowBlur', 5);
    this.initDefaultValue('shadowOffsetX', 0);
    this.initDefaultValue('shadowOffsetY', 2);
    
    // 初始化动画配置
    this.initDefaultValue('animationEnabled', false);
    this.initDefaultValue('animationSpeed', 20);
    this.initDefaultValue('animationDirection', 'forward');
    this.initDefaultValue('animationType', 'flow');
    this.initDefaultValue('animationColor', '#ff6700');
    this.initDefaultValue('animationIntensity', 5);
    
    // 初始化箭头配置
    this.initDefaultValue('arrowEnabled', false);
    this.initDefaultValue('arrowDirection', 'end');
    this.initDefaultValue('arrowSize', 10);
    
    // 初始化点样式配置
    this.initDefaultValue('pointRadius', 5);
    this.initDefaultValue('pointColor', '#FF4500');
    
    // 始终设置为添加点模式
    this.initDefaultValue('addingMode', true);
    this.initDefaultValue('points', []);
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig'
    ]),
    
    // 初始化默认值
    initDefaultValue(key, defaultValue) {
      if (this.config.customize[key] === undefined) {
        this.$set(this.config.customize, key, defaultValue);
      }
    },
    
    // 格式化速度提示
    formatSpeedTooltip(val) {
      const speeds = {
        5: '极快',
        20: '快速',
        40: '正常',
        60: '缓慢',
        80: '较慢',
        100: '极慢'
      };
      // 找到最接近的预设速度值
      const presets = Object.keys(speeds).map(Number);
      const closest = presets.reduce((prev, curr) => {
        return (Math.abs(curr - val) < Math.abs(prev - val) ? curr : prev);
      });
      return `${speeds[closest]} (${val})`;
    },
    
    // 清空画布
    clearCanvas() {
      if (!this.config || !this.config.customize) return;
      
      // 将points置为空数组
      this.changeChartConfig({
        ...this.config,
        customize: {
          ...this.config.customize,
          points: []
        }
      });
      
      // 更新活动项配置
      this.changeActiveItemConfig({
        ...this.config,
        customize: {
          ...this.config.customize,
          points: []
        }
      });
      
      this.$message.success('已清空画布');
    }
  }
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  width: 97%;
  padding: 16px;
}

.dash-array-setting {
  display: flex;
  align-items: center;
  
  .dash-input {
    width: 80px;
  }
  
  .dash-separator {
    margin: 0 8px;
    font-weight: bold;
  }
}
</style> 