<template>
  <div
    class="bs-design-wrap"
    :style="{
      pointerEvents: isEditing ? 'auto' : 'none',
      width: '100%',
      height: '100%',
      position: 'relative'
    }"
  >
    <svg
      ref="svgElement"
      width="100%"
      height="100%"
      @click.stop="handleSvgClick"
      @mousedown.stop
      style="position: absolute; top: 50%; left: 50%; transform: translate(-50%, -50%)"
    >
      <!-- 主线条 -->
      <path
        :d="pathD"
        :stroke="lineColor"
        :stroke-width="lineWidth"
        :stroke-dasharray="dashArray"
        fill="none"
        :style="{ opacity: opacity }"
      />

      <!-- 控制点 -->
      <template v-if="isEditing">
        <circle
          v-for="(point, index) in points"
          :key="index"
          :cx="point.x"
          :cy="point.y"
          :r="6"
          fill="#1890ff"
          stroke="#fff"
          stroke-width="2"
          style="cursor: move"
          @mousedown.stop="startDragPoint($event, index)"
          @click.stop
        />
        <!-- 删除按钮 -->
        <g
          v-for="(point, index) in points"
          :key="`delete-${index}`"
          @click.stop="deletePoint(index)"
          style="cursor: pointer"
          v-show="points.length > 2"
        >
          <circle
            :cx="point.x"
            :cy="point.y - 15"
            r="8"
            fill="#ff4d4f"
          />
          <text
            :x="point.x"
            :y="point.y - 15"
            fill="#fff"
            text-anchor="middle"
            alignment-baseline="middle"
            style="font-size: 12px; font-weight: bold"
          >×</text>
        </g>
      </template>
    </svg>
  </div>
</template>

<script>
import { EventBus } from 'data-room-ui/js/utils/eventBus'

export default {
  name: 'SvgLine',
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      points: [],
      isEditing: false,
      isDragging: false,
      currentPointIndex: -1,
      adjustTimer: null,
      updateTimer: null
    }
  },
  computed: {
    lineColor() {
      return this.config.customize?.lineColor || '#1890ff'
    },
    lineWidth() {
      return this.config.customize?.lineWidth || 2
    },
    opacity() {
      return this.config.customize?.opacity || 1
    },
    dashArray() {
      if (!this.config.customize?.dashed) return 'none'
      const dashLength = this.config.customize?.dashLength || 5
      return `${dashLength},${dashLength}`
    },
    pathD() {
      if (!this.points || this.points.length < 2) return ''

      let d = `M ${this.points[0].x} ${this.points[0].y}`

      if (this.config.customize?.curved) {
        // 贝塞尔曲线
        for (let i = 1; i < this.points.length; i++) {
          const prev = this.points[i - 1]
          const curr = this.points[i]
          const cp1x = prev.x + (curr.x - prev.x) / 3
          const cp1y = prev.y
          const cp2x = prev.x + (curr.x - prev.x) * 2 / 3
          const cp2y = curr.y
          d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`
        }
      } else {
        // 直线
        for (let i = 1; i < this.points.length; i++) {
          d += ` L ${this.points[i].x} ${this.points[i].y}`
        }
      }

      return d
    },
    // 获取画布最大值
    canvasLimits() {
      let renderComponent = this.$parent
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent
      }

      if (renderComponent) {
        const pageConfig = renderComponent.pageInfo.pageConfig
        return {
          maxWidth: pageConfig.w,
          maxHeight: pageConfig.h
        }
      }

      return {
        maxWidth: Infinity,
        maxHeight: Infinity
      }
    },
    // 获取实际可用的最大宽高（考虑当前位置）
    actualLimits() {
      return {
        maxWidth: this.canvasLimits.maxWidth - this.config.x,
        maxHeight: this.canvasLimits.maxHeight - this.config.y
      }
    }
  },
  watch: {
    points: {
      handler() {
        if (this.isEditing) {
          this.debounceAdjustSize()
        }
      },
      deep: true
    },
    config: {
      handler(newVal, oldVal) {
        // 当config变化时，检查是否需要重新初始化点
        if (newVal._fromSvgDrag) {
          // 如果是来自SVG拖动的更新，不需要重新初始化点
          return;
        }
        
        if (newVal.w !== oldVal.w || newVal.h !== oldVal.h) {
          // 如果宽高发生变化，但不是由拖动点引起的，则重新初始化点
          if (!this.isDragging && !this.adjustTimer) {
            this.initPointsFromConfig()
          }
        }
      },
      deep: true
    }
  },
  mounted() {
    this.initPointsFromConfig()
    EventBus.$on('svgline-toggle-edit', this.handleToggleEdit)
  },
  beforeDestroy() {
    EventBus.$off('svgline-toggle-edit', this.handleToggleEdit)
    if (this.adjustTimer) {
      clearTimeout(this.adjustTimer)
    }
  },
  methods: {
    initPointsFromConfig() {
      try {
        const configPoints = this.config.customize?.points
        if (configPoints && Array.isArray(configPoints) && configPoints.length >= 2) {
          this.points = configPoints.map(p => ({
            x: p.x * this.config.w,
            y: p.y * this.config.h
          }))
          this.checkPointsInBounds()
        } else {
          this.initDefaultPoints()
        }
      } catch (error) {
        console.error('初始化点失败:', error)
        this.initDefaultPoints()
      }
    },
    initDefaultPoints() {
      this.points = [
        { x: this.config.w * 0.2, y: this.config.h * 0.5 },
        { x: this.config.w * 0.8, y: this.config.h * 0.5 }
      ]
      this.checkPointsInBounds()
      this.savePoints()
    },
    handleToggleEdit(value) {
      this.isEditing = value
    },
    handleSvgClick(e) {
      if (!this.isEditing || this.isDragging) return
      const { x, y } = this.getRelativeCoordinates(e)
      
      // 检查是否点击在线段上
      const clickedSegmentIndex = this.findClickedLineSegment(x, y)
      
      if (clickedSegmentIndex !== -1) {
        // 如果点击在线段上，在对应位置插入新点
        const p1 = this.points[clickedSegmentIndex]
        const p2 = this.points[clickedSegmentIndex + 1]
        
        // 计算新点的位置（在线段上的投影点）
        const newPoint = this.getProjectionPoint(x, y, p1, p2)
        
        // 在找到的线段后面插入新点
        this.points.splice(clickedSegmentIndex + 1, 0, newPoint)
      } else {
        // 如果不是点击在线段上，则添加到末尾
        this.points.push({ x, y })
      }
      
      this.checkPointsInBounds()
      this.savePoints()
    },
    startDragPoint(e, index) {
      e.preventDefault()
      e.stopPropagation()
      this.isDragging = true
      this.currentPointIndex = index
      document.addEventListener('mousemove', this.handleGlobalMouseMove)
      document.addEventListener('mouseup', this.handleGlobalMouseUp)
    },
    handleGlobalMouseMove(e) {
      if (!this.isDragging || this.currentPointIndex === -1) return
      e.preventDefault()
      e.stopPropagation()
      const { x, y } = this.getRelativeCoordinates(e)
      this.$set(this.points, this.currentPointIndex, { x, y })
      this.checkPointsInBounds()
    },
    handleGlobalMouseUp() {
      this.isDragging = false
      this.currentPointIndex = -1
      document.removeEventListener('mousemove', this.handleGlobalMouseMove)
      document.removeEventListener('mouseup', this.handleGlobalMouseUp)
      this.checkPointsInBounds()
      this.savePoints()
    },
    checkPointsInBounds() {
      const EDGE_PADDING = 10; // 边缘留出10px的操作空间
      
      if (!this.config.customize?.autoResize) {
        // 如果不是自动调整大小，则强制限制点在容器内，但保留边距
        this.points = this.points.map(point => ({
          x: Math.max(EDGE_PADDING, Math.min(this.config.w - EDGE_PADDING, point.x)),
          y: Math.max(EDGE_PADDING, Math.min(this.config.h - EDGE_PADDING, point.y))
        }))
        return;
      }

      const xValues = this.points.map(p => p.x)
      const yValues = this.points.map(p => p.y)
      const minX = Math.min(...xValues)
      const maxX = Math.max(...xValues)
      const minY = Math.min(...yValues)
      const maxY = Math.max(...yValues)

      let hasChanges = false;
      const updatedConfig = JSON.parse(JSON.stringify(this.config))

      // 1. 处理容器位置和大小的调整
      if (minX < EDGE_PADDING && updatedConfig.x > 0) {
        updatedConfig.x = updatedConfig.x + (minX - EDGE_PADDING)
        updatedConfig.w = updatedConfig.w + Math.abs(minX - EDGE_PADDING)
        hasChanges = true
      }

      if (minY < EDGE_PADDING && updatedConfig.y > 0) {
        updatedConfig.y = updatedConfig.y + (minY - EDGE_PADDING)
        updatedConfig.h = updatedConfig.h + Math.abs(minY - EDGE_PADDING)
        hasChanges = true
      }

      // 检查是否超出画布最大值（考虑边距和当前位置）
      if (maxX > updatedConfig.w - EDGE_PADDING && updatedConfig.w < this.actualLimits.maxWidth) {
        updatedConfig.w = Math.min(maxX + EDGE_PADDING, this.actualLimits.maxWidth)
        hasChanges = true
      }

      if (maxY > updatedConfig.h - EDGE_PADDING && updatedConfig.h < this.actualLimits.maxHeight) {
        updatedConfig.h = Math.min(maxY + EDGE_PADDING, this.actualLimits.maxHeight)
        hasChanges = true
      }

      // 2. 限制点的位置
      // 检查是否需要限制点的位置
      const needsXConstraint = 
        updatedConfig.x === 0 || // 左边界
        updatedConfig.w >= this.actualLimits.maxWidth || // 达到最大宽度
        maxX >= updatedConfig.w; // 点超出容器右边界

      const needsYConstraint = 
        updatedConfig.y === 0 || // 上边界
        updatedConfig.h >= this.actualLimits.maxHeight || // 达到最大高度
        maxY >= updatedConfig.h; // 点超出容器下边界

      if (needsXConstraint) {
        this.points = this.points.map(p => ({
          x: Math.max(EDGE_PADDING, Math.min(updatedConfig.w - EDGE_PADDING, p.x)),
          y: p.y
        }))
      }

      if (needsYConstraint) {
        this.points = this.points.map(p => ({
          x: p.x,
          y: Math.max(EDGE_PADDING, Math.min(updatedConfig.h - EDGE_PADDING, p.y))
        }))
      }

      if (hasChanges) {
        // 使用防抖来延迟更新
        if (this.updateTimer) {
          clearTimeout(this.updateTimer)
        }
        
        this.updateTimer = setTimeout(() => {
          // 1. 更新本地状态
          Object.assign(this.config, updatedConfig)
          
          // 2. 保存点的相对位置
          this.savePointsWithoutEmit()
          
          // 3. 触发更新事件
          this.$emit('update:config', updatedConfig)

          // 4. 通知 Render 组件更新图表配置
          let renderComponent = this.$parent
          while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
            renderComponent = renderComponent.$parent
          }

          if (renderComponent) {
            // 调用所有必要的更新方法
            renderComponent.changeChartConfig({
              ...updatedConfig,
              _fromSvgDrag: true
            })
            
            // 更新活动项配置
            renderComponent.changeActiveItemConfig({
              ...updatedConfig,
              _fromSvgDrag: true
            })
            
            // 更新活动项的宽高
            renderComponent.changeActiveItemWH({
              code: updatedConfig.code,
              w: updatedConfig.w,
              h: updatedConfig.h,
              x: updatedConfig.x,
              y: updatedConfig.y
            })
            
            // 保存时间线
            renderComponent.saveTimeLine(`调整${updatedConfig.title || '组件'}大小`)
          }
        }, 32) // 增加到两帧的时间，以获得更好的性能
      }
    },
    deletePoint(index) {
      if (this.points.length <= 2) return
      this.points.splice(index, 1)
      this.savePoints()
    },
    getRelativeCoordinates(event) {
      const svgElement = this.$refs.svgElement
      if (!svgElement) return { x: 0, y: 0 }

      const svgRect = svgElement.getBoundingClientRect()
      let x = event.clientX - svgRect.left
      let y = event.clientY - svgRect.top

      const scaleX = this.config.w / svgRect.width
      const scaleY = this.config.h / svgRect.height

      x = x * scaleX
      y = y * scaleY

      return { x, y }
    },
    savePoints() {
      if (!this.points || this.points.length < 2) return
      const relativePoints = this.points.map(p => ({
        x: p.x / this.config.w,
        y: p.y / this.config.h
      }))
      this.$emit('update:config', {
        ...this.config,
        customize: {
          ...this.config.customize,
          points: relativePoints
        }
      })
    },
    savePointsWithoutEmit() {
      if (!this.points || this.points.length < 2) return
      const relativePoints = this.points.map(p => ({
        x: p.x / this.config.w,
        y: p.y / this.config.h
      }))
      // 只更新config对象，不触发事件
      if (!this.config.customize) {
        this.$set(this.config, 'customize', {})
      }
      this.$set(this.config.customize, 'points', relativePoints)
    },
    debounceAdjustSize() {
      if (this.adjustTimer) {
        clearTimeout(this.adjustTimer)
      }
      // 移除对 adjustContainerSize 的调用，直接保存点位置
      this.adjustTimer = setTimeout(() => {
        this.savePoints()
      }, 100)
    },
    // 移除 adjustContainerSize 方法
    
    // 添加 changeStyle 方法以解决错误
    changeStyle(style) {
      if (!style || !this.config) return
    
      // 确保customize对象存在
      if (!this.config.customize) {
        this.$set(this.config, 'customize', {})
      }
    
      // 更新组件的customize属性
      Object.keys(style).forEach(key => {
        this.$set(this.config.customize, key, style[key])
      })
    
      // 如果有points数据，重新初始化点
      if (style.customize && style.customize.points) {
        this.initPointsFromConfig()
      }
    },
    handleConfigChange() {
      this.$emit('update:config', JSON.parse(JSON.stringify(this.config)))
    },
    // 查找点击位置最近的线段
    findClickedLineSegment(x, y, threshold = 8) {
      // 如果是曲线模式，增加检测阈值
      const effectiveThreshold = this.config.customize?.curved ? threshold * 1.5 : threshold

      for (let i = 0; i < this.points.length - 1; i++) {
        const p1 = this.points[i]
        const p2 = this.points[i + 1]
        
        // 计算点到线段的距离
        const distance = this.getDistanceToLineSegment(x, y, p1, p2)
        
        // 如果距离小于阈值，认为点击在这条线段上
        if (distance < effectiveThreshold) {
          return i
        }

        // 如果是曲线模式，增加对贝塞尔曲线控制点的检测
        if (this.config.customize?.curved) {
          const cp1x = p1.x + (p2.x - p1.x) / 3
          const cp1y = p1.y
          const cp2x = p1.x + (p2.x - p1.x) * 2 / 3
          const cp2y = p2.y

          // 检查点到贝塞尔曲线的近似距离
          const bezierPoints = this.getBezierPoints(p1, { x: cp1x, y: cp1y }, { x: cp2x, y: cp2y }, p2)
          for (let j = 0; j < bezierPoints.length - 1; j++) {
            const bp1 = bezierPoints[j]
            const bp2 = bezierPoints[j + 1]
            const bezierDistance = this.getDistanceToLineSegment(x, y, bp1, bp2)
            if (bezierDistance < effectiveThreshold) {
              return i
            }
          }
        }
      }
      return -1
    },
    // 计算点到线段的距离
    getDistanceToLineSegment(x, y, p1, p2) {
      const A = x - p1.x
      const B = y - p1.y
      const C = p2.x - p1.x
      const D = p2.y - p1.y

      const dot = A * C + B * D
      const lenSq = C * C + D * D
      let param = -1

      if (lenSq !== 0) {
        param = dot / lenSq
      }

      let xx, yy

      if (param < 0) {
        xx = p1.x
        yy = p1.y
      } else if (param > 1) {
        xx = p2.x
        yy = p2.y
      } else {
        xx = p1.x + param * C
        yy = p1.y + param * D
      }

      const dx = x - xx
      const dy = y - yy
      return Math.sqrt(dx * dx + dy * dy)
    },
    // 获取点在线段上的投影点
    getProjectionPoint(x, y, p1, p2) {
      const A = x - p1.x
      const B = y - p1.y
      const C = p2.x - p1.x
      const D = p2.y - p1.y
      
      const dot = A * C + B * D
      const lenSq = C * C + D * D
      let param = 0.5 // 默认在线段中点

      if (lenSq !== 0) {
        param = Math.max(0, Math.min(1, dot / lenSq))
      }

      return {
        x: p1.x + param * C,
        y: p1.y + param * D
      }
    },
    // 获取贝塞尔曲线上的采样点
    getBezierPoints(p1, cp1, cp2, p2, steps = 10) {
      const points = []
      for (let i = 0; i <= steps; i++) {
        const t = i / steps
        const x = Math.pow(1 - t, 3) * p1.x +
                  3 * Math.pow(1 - t, 2) * t * cp1.x +
                  3 * (1 - t) * Math.pow(t, 2) * cp2.x +
                  Math.pow(t, 3) * p2.x
        const y = Math.pow(1 - t, 3) * p1.y +
                  3 * Math.pow(1 - t, 2) * t * cp1.y +
                  3 * (1 - t) * Math.pow(t, 2) * cp2.y +
                  Math.pow(t, 3) * p2.y
        points.push({ x, y })
      }
      return points
    }
  }
}
</script>

<style lang="scss" scoped>
.bs-design-wrap {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: visible;
}
</style>