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
          
          <SettingTitle>线条属性</SettingTitle>
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
            
            <el-form-item label="线条样式">
              <el-select
                v-model="config.customize.lineStyle"
                popper-class="bs-el-select"
                class="bs-el-select"
                clearable
              >
                <el-option
                  v-for="style in lineStyleOptions"
                  :key="style.value"
                  :label="style.label"
                  :value="style.value"
                />
              </el-select>
            </el-form-item>
            
            <el-form-item label="箭头类型">
              <el-select
                v-model="config.customize.arrowType"
                popper-class="bs-el-select"
                class="bs-el-select"
                clearable
              >
                <el-option
                  v-for="arrow in arrowTypeOptions"
                  :key="arrow.value"
                  :label="arrow.label"
                  :value="arrow.value"
                />
              </el-select>
            </el-form-item>
            
            <el-form-item label="自动调整尺寸">
              <el-switch
                v-model="config.customize.autoSize"
                @change="handleAutoSizeChange"
              />
            </el-form-item>
          </div>
          
          <SettingTitle>坐标设置</SettingTitle>
          <div class="lc-field-body">
            <el-form-item label="起点 X">
              <el-input-number
                v-model="config.customize.startX"
                class="bs-el-input-number"
                controls-position="right"
                :min="0"
                @change="updateSize"
              />
            </el-form-item>
            
            <el-form-item label="起点 Y">
              <el-input-number
                v-model="config.customize.startY"
                class="bs-el-input-number"
                controls-position="right"
                :min="0"
                @change="updateSize"
              />
            </el-form-item>
            
            <el-form-item label="终点 X">
              <el-input-number
                v-model="config.customize.endX"
                class="bs-el-input-number"
                controls-position="right"
                :min="0"
                @change="updateSize"
              />
            </el-form-item>
            
            <el-form-item label="终点 Y">
              <el-input-number
                v-model="config.customize.endY"
                class="bs-el-input-number"
                controls-position="right"
                :min="0"
                @change="updateSize"
              />
            </el-form-item>
            
            <el-form-item>
              <el-button type="primary" @click="updateAllLines">更新所有连接线</el-button>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-form>
  </div>
</template>
<script>
import { mapMutations, mapState } from 'vuex'
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import RotateSetting from 'data-room-ui/BigScreenDesign/RightSetting/RotateSetting.vue'
import {predefineColors} from "data-room-ui/js/utils/colorList";

export default {
  name: 'CanvasLineSetting',
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
  computed: {
    ...mapState({
      chartList: state => state.bigScreen.pageInfo.chartList
    }),
    canvasWidth() {
      if (!this.config || !this.config.customize) {
        return 100; // 默认值
      }
      return Math.max(
        isNaN(this.config.customize.endX) ? 0 : this.config.customize.endX, 
        isNaN(this.config.customize.startX) ? 0 : this.config.customize.startX
      ) + 20;
    },
    canvasHeight() {
      if (!this.config || !this.config.customize) {
        return 100; // 默认值
      }
      return Math.max(
        isNaN(this.config.customize.endY) ? 0 : this.config.customize.endY, 
        isNaN(this.config.customize.startY) ? 0 : this.config.customize.startY
      ) + 20;
    }
  },
  data() {
    return {
      lineStyleOptions: [
        {
          label: '实线',
          value: 'solid'
        },
        {
          label: '虚线',
          value: 'dashed'
        },
        {
          label: '点线',
          value: 'dotted'
        }
      ],
      arrowTypeOptions: [
        {
          label: '无箭头',
          value: 'none'
        },
        {
          label: '起点箭头',
          value: 'start'
        },
        {
          label: '终点箭头',
          value: 'end'
        },
        {
          label: '双向箭头',
          value: 'both'
        }
      ]
    }
  },
  mounted() {
    // 确保config和customize对象都存在
    if (!this.config || !this.config.customize) {
      return;
    }
    
    // 如果配置中没有autoSize属性，添加默认值
    if (this.config.customize.autoSize === undefined) {
      this.$set(this.config.customize, 'autoSize', true);
      this.changeChartConfig({
        ...this.config
      });
    }
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig',
      'changeActiveItemWH'
    ]),
    
    // 处理自动调整尺寸开关变化
    handleAutoSizeChange(value) {
      if (!this.config || !this.config.customize) return;
      
      // 将更改保存到配置中
      this.changeChartConfig({
        ...this.config,
        customize: {
          ...this.config.customize,
          autoSize: value
        }
      });
      
      // 如果开启了自动调整，立即更新尺寸
      if (value) {
        this.updateSize();
      }
    },
    
    // 更新组件的尺寸
    updateSize() {
      // 确保config和customize对象存在
      if (!this.config || !this.config.customize) return;
      
      // 如果未开启自动调整尺寸，则不执行
      if (!this.config.customize.autoSize) return;
      
      // 计算所需的宽高
      const width = this.canvasWidth;
      const height = this.canvasHeight;
      
      // 更新组件的配置
      this.changeChartConfig({
        ...this.config,
        w: width,
        h: height
      });
      
      // 更新活动项的配置
      this.changeActiveItemConfig({
        ...this.config,
        w: width,
        h: height
      });
      
      // 更新活动项的宽高
      this.changeActiveItemWH({
        code: this.config.code,
        w: width,
        h: height
      });
    },
    
    // 更新所有连接线尺寸
    updateAllLines() {
      if (!this.chartList) return;
      
      // 遍历所有图表组件
      this.chartList.forEach(chart => {
        // 确保chart和chart.customize对象存在
        if (!chart || !chart.customize) return;
        
        // 如果是canvasLine类型并且启用了自动调整尺寸
        if (chart.type === 'canvasLine' && chart.customize.autoSize) {
          // 计算该线条所需尺寸
          const startX = isNaN(chart.customize.startX) ? 0 : chart.customize.startX;
          const startY = isNaN(chart.customize.startY) ? 0 : chart.customize.startY;
          const endX = isNaN(chart.customize.endX) ? 100 : chart.customize.endX;
          const endY = isNaN(chart.customize.endY) ? 100 : chart.customize.endY;
          
          const width = Math.max(startX, endX) + 20;
          const height = Math.max(startY, endY) + 20;
          
          // 更新组件配置
          this.changeChartConfig({
            ...chart,
            w: width,
            h: height
          });
        }
      });
      
      // 提示用户操作已完成
      this.$message.success('所有连接线已更新');
    }
  }
}
</script>

<style lang="scss" scoped>
.lc-field-body {
  width: 97%;
  padding: 16px;
}
</style>
