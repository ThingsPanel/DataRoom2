<!--
 * @description: 渲染组件
 * @Date: 2022-08-18 09:42:45
 * @Author: xingheng
-->

<template>
  <div class="content" :class="{'special-content': isSpecialType}">
    <!-- 旋转控制器，只在设计模式下且组件被选中时显示 -->
    <div 
      v-if="isSelected && !isPreviewMode && !isSpecialType" 
      class="rotate-handler"
      @mousedown.stop="startRotate"
      @dblclick.stop="resetRotate"
      title="拖动旋转，双击重置"
    >
      <i class="el-icon-refresh-right"></i>
    </div>

    <component
      :is="resolveComponentType(config.border.type)"
      v-if="config.border&&config.border.type && !isSpecialType"
      :id="`border${config.code}`"
      :ref="`border${config.code}`"
      :key="`border${config.key}`"
      :config="config"
    />
    <div
      class="render-item-wrap"
      :class="{'special-wrap': isSpecialType}"
      :style="wrapStyle"
    >
      <component
        :is="getComponentType(config)"
        :id="`${config.code}`"
        :ref="config.code"
        :key="config.key"
        :config="config"
        :selected="isSelected && !isPreviewMode"
        :page-width="pageWidth"
        :page-height="pageHeight"
        :active-code="activeCode"
        @styleHandler="styleHandler"
        @bounds-update="handleBoundsUpdate"
        @error="handleError"
      />
    </div>
  </div>
</template>
<script>
// import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import { mapMutations } from 'vuex'
import { resolveComponentType } from 'data-room-ui/js/utils'
import pcComponent from 'data-room-ui/js/utils/componentImport'
import { dataInit, destroyedEvent } from 'data-room-ui/js/utils/eventBus'
import chartContextMenu from 'data-room-ui/js/mixins/chartContextMenu'
import CustomComponent from '../PlotRender/index.vue'
import EchartsComponent from '../EchartsRender/index.vue'
import ThreeComponent from '../ThreeRender/index.vue'
import VchartCustomComponent from '../VchartRender/index.vue'
import Svgs from '../Svgs/index.vue'
import RemoteComponent from 'data-room-ui/RemoteComponents/index.vue'
import BasicComponentFabricLine from '../BasicComponents/FabricLine/index.vue'

const components = {}
for (const key in pcComponent) {
  if (Object.hasOwnProperty.call(pcComponent, key)) {
    components[key] = pcComponent[key]
  }
}
export default {
  name: 'RenderCard',
  // mixins: [commonMixins],
  mixins: [chartContextMenu],
  components: {
    ...components,
    CustomComponent,
    Svgs,
    RemoteComponent,
    EchartsComponent,
    ThreeComponent,
    VchartCustomComponent,
    BasicComponentFabricLine
  },
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    },
    ruleKey: {
      type: Number,
      default: 0
    },
    // 新增：接收页面宽度和高度
    pageWidth: {
      type: Number,
      default: Infinity
    },
    pageHeight: {
      type: Number,
      default: Infinity
    }
  },
  data () {
    return {
      height: 0,
      isRotating: false,
      startAngle: 0,
      currentRotateZ: 0
    }
  },
  computed: {
    // 添加计算属性判断当前组件是否被选中
    isSelected() {
      return this.$store.state.bigScreen.activeCodes.includes(this.config.code);
    },
    // 添加计算属性判断是否为预览模式
    isPreviewMode() {
      // 检查当前路由是否为预览路由
      const currentPath = this.$route.path;
      const previewPaths = [
        window?.BS_CONFIG?.routers?.previewUrl || '/big-screen/preview',
        '/big-screen/preview'
      ];
      
      // 检查是否在BigScreenRun组件中
      let inBigScreenRun = false;
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.name === 'BigScreenRun') {
          inBigScreenRun = true;
          break;
        }
        parent = parent.$parent;
      }
      
      return previewPaths.includes(currentPath) || inBigScreenRun;
    },
    // 添加计算属性判断是否为特殊类型
    isSpecialType() {
      return this.config.type === 'svgLine' || this.config.type === 'canvasLine' || this.config.type === 'fabricLine';
    },
    wrapStyle() {
      return this.getWrapStyle()
    }
  },
  mounted () {
    // 调用初始化方法
    dataInit(this)
  },
  beforeDestroy () {
    // 清理事件监听
    document.removeEventListener('mousemove', this.handleRotate)
    document.removeEventListener('mouseup', this.stopRotate)
    destroyedEvent()
  },
  methods: {
    ...mapMutations('bigScreen', [
      'changeChartConfig',
      'changeActiveItemConfig'
    ]),
    resolveComponentType,
    // 切换主题时针对远程组件触发样式修改的方法
    styleHandler (config) {
      this.$emit('styleHandler', config)
    },
    startRotate (e) {
      // 在预览模式下不允许旋转
      if (this.isPreviewMode) return;
      
      e.preventDefault()
      this.isRotating = true
      
      // 获取元素中心点
      const rect = this.$el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2
      
      // 计算初始角度
      this.startAngle = Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) * 180 / Math.PI
      
      // 获取当前旋转角度
      this.currentRotateZ = this.config.rotateZ || 0

      // 添加事件监听
      document.addEventListener('mousemove', this.handleRotate)
      document.addEventListener('mouseup', this.stopRotate)
    },
    handleRotate (e) {
      if (!this.isRotating || this.isPreviewMode) return

      const rect = this.$el.getBoundingClientRect()
      const centerX = rect.left + rect.width / 2
      const centerY = rect.top + rect.height / 2

      const angle = Math.atan2(
        e.clientY - centerY,
        e.clientX - centerX
      ) * 180 / Math.PI

      let deltaAngle = angle - this.startAngle
      let newRotateZ = (this.currentRotateZ + deltaAngle) % 360

      // 优化吸附逻辑
      if (e.shiftKey) {
        // 计算最接近的15度的倍数
        const snap = 15
        const snappedAngle = Math.round(newRotateZ / snap) * snap
        
        // 如果在吸附范围内，使用吸附值
        const threshold = 8 // 吸附阈值为8度
        if (Math.abs(newRotateZ - snappedAngle) < threshold) {
          newRotateZ = snappedAngle
        }
      }

      // 规范化角度到 -180 到 180 度
      if (newRotateZ > 180) {
        newRotateZ -= 360
      } else if (newRotateZ < -180) {
        newRotateZ += 360
      }

      this.changeChartConfig({
        ...this.config,
        rotateZ: newRotateZ
      })

      // 同步更新 RotateSetting 中的值
      this.$nextTick(() => {
        if (this.$parent.$refs.SettingPanel) {
          this.$parent.$refs.SettingPanel.updateRotateZ(newRotateZ)
        }
      })
    },
    stopRotate () {
      if (this.isPreviewMode) return;
      
      this.isRotating = false
      document.removeEventListener('mousemove', this.handleRotate)
      document.removeEventListener('mouseup', this.stopRotate)
    },
    handleError(error) {
      // 可以在这里添加错误处理逻辑，比如显示错误提示或重置图表
    },
    getWrapStyle() {
      try {
        // 检查是否为特殊类型
        const isSpecialType = this.config.type === 'svgLine' || this.config.type === 'canvasLine';
        
        if (isSpecialType) {
          // 对于特殊类型组件，应用不同的样式
          return {
            height: '100%',
            width: '100%',
            padding: '0',
            overflow: 'visible' // 允许内容溢出
          };
        }
        
        // 常规组件使用原有样式
        return {
          height: `calc(100% - ${this.getTitleHeight()}px)`,
          padding: this.getPadding()
        }
      } catch (error) {
        return {}
      }
    },
    // 添加重置方法
    resetRotate() {
      if (this.isPreviewMode) return;
      
      const updatedConfig = {
        ...this.config,
        rotateZ: 0
      }
      
      // 更新图表配置
      this.changeChartConfig(updatedConfig)
      
      // 如果当前组件是激活状态，同步更新右侧面板配置
      if (this.isSelected) {
        this.changeActiveItemConfig(updatedConfig)
      }
    },
    // 添加获取组件类型的方法
    getComponentType(config) {
      // 优先使用 config.chartType 进行判断
      if (config?.chartType === 'vchartComponent') {
        return 'VchartCustomComponent';
      }
      if (config?.chartType === 'threeJs') { // Also prioritize chartType for ThreeJs
        return 'ThreeComponent';
      }

      // 保留原有对 comType 的判断作为后备（如果其他组件类型仍使用 comType）
      const comType = config?.comType;
      if (comType === 'echartsComponent') {
        return 'EchartsComponent';
      } else if (comType === 'threeComponent') {
        return 'ThreeComponent';
      } else if (comType === 'customComponent') {
        return 'CustomComponent';
      } else if (comType === 'vchartComponent') { // Fallback for comType if chartType wasn't set
        return 'VchartCustomComponent';
      }

      // 其他基于 type 的判断逻辑 (保持不变, 但在 chartType/comType 之后)
      let resolvedComponentType = null;
      if (config?.type === 'echartsComponent') { 
        resolvedComponentType = 'EchartsComponent';
      } else if (config?.type === 'vchartComponent') { // Fallback for type
        resolvedComponentType = 'VchartCustomComponent';
      } else if (config?.category?.includes('模型')) { // This seems specific to ThreeComponent
        resolvedComponentType = 'ThreeComponent';
      } else if (config?.className?.includes('CustomComponentChart')) {
        if (config.name) {
          if (config.name.startsWith('3D') && (config.name.includes('柱状图') || config.name.includes('图表'))) {
            resolvedComponentType = 'EchartsComponent';
          } else if (config.name.includes('模型') && !config.name.includes('图')) {
            resolvedComponentType = 'ThreeComponent';
          }
        }
      }
      
      // Fallback to default resolver if no specific type matched by above logic
      if (!resolvedComponentType) {
        resolvedComponentType = this.resolveComponentType(config?.type);
      }
      return resolvedComponentType;
    },
    // 添加 changeStyle 方法
    changeStyle(config, isUpdateTheme) {
      try {
        // 获取内部组件引用
        const componentRef = this.$refs[config.code]
        if (componentRef && typeof componentRef.changeStyle === 'function') {
          // 如果内部组件有 changeStyle 方法，调用它
          return componentRef.changeStyle(config, isUpdateTheme)
        } else if (componentRef) {
          // 如果内部组件存在但没有 changeStyle 方法，尝试更新组件的 config 属性
          componentRef.config = { ...componentRef.config, ...config }
          return config
        }
        return config
      } catch (error) {
        return config
      }
    },
    // 添加处理 bounds-update 事件的方法
    handleBoundsUpdate(payload) {
      // 向上冒泡事件，并包含 code 和新的负载结构
      this.$emit('request-layout-and-points-update', {
        code: this.config.code, // 包含组件的 code
        layout: payload.layout, // 新的绝对容器布局 {x, y, w, h}
        relativePoints: payload.relativePoints // 新的相对点坐标
      });
    }
  }
}
</script>

<style lang="scss" scoped>
.content{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: flex-end;

  &.special-content {
    overflow: visible;
    border: none;
  }

  .rotate-handler {
    position: absolute;
    top: -32px; // 增加距离
    left: 50%;
    transform: translateX(-50%);
    width: 24px;  // 增大按钮尺寸
    height: 24px;
    background-color: var(--bs-el-color-primary);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    z-index: 999;
    transition: all 0.2s ease;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2); // 添加阴影
    
    i {
      color: #fff;
      font-size: 14px;
    }

    &:hover {
      background-color: var(--bs-el-color-primary-light-3);
      transform: translateX(-50%) scale(1.1);
    }

    &::after {
      content: '';
      position: absolute;
      bottom: -8px; // 增加连接线长度
      left: 50%;
      transform: translateX(-50%);
      width: 2px;
      height: 8px;
      background-color: var(--bs-el-color-primary);
    }
  }
}
.render-item-wrap {
  width: 100%;
  height: 100%;
  display: flex;
  position: relative;
  overflow: hidden;
  box-sizing: border-box;
  
  &.special-wrap {
    overflow: visible;
    border: none;
  }
}
</style>
