<template>
  <div
    class="bs-design-wrap"
    :style="{
      pointerEvents: 'auto',
      width: '100%',
      height: '100%',
      position: 'relative',
      overflow: 'visible'
    }"
  >
    <div
      ref="svgContainer"
      style="width: 100%; height: 100%; overflow: visible;"
    ></div>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import { EventBus } from 'data-room-ui/js/utils/eventBus'
import { SVG } from '@svgdotjs/svg.js'
// 移除拖拽插件导入
// import '@svgdotjs/svg.draggable.js'

export default {
  name: 'SvgLine',
  mixins: [paramsMixins, commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    },
    selected: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      svgDraw: null,
      path: null,
      points: [],
      circles: [],
      isDragging: false,
      isAdjustingSize: false,
      draggedPointIndex: -1,
      dragStartPos: { x: 0, y: 0 },
      animationElements: [],
      justFinishedDragging: false,
    }
  },
  computed: {
    isEditing() {
      return this.selected;
    },
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
    animation() {
      return this.config.customize?.animation || {
        enable: false,
        type: 'flow',
        speed: 5,
        flowColor: 'rgba(24, 144, 255, 0.6)',
        flowLength: 30,
        particleSize: 3,
        particleColor: '#fff',
        glowColor: 'rgba(24, 144, 255, 0.3)',
        glowWidth: 10
      }
    },
    lineType() {
      // 如果有lineType属性，直接使用
      if (this.config.customize?.lineType) {
        return this.config.customize.lineType;
      }
      // 兼容旧版本，根据curved属性返回lineType
      return this.config.customize?.curved ? 'curved' : 'straight';
    }
  },
  watch: {
    config: {
      handler(newVal, oldVal) {
        if (newVal._fromSvgDrag) {
          return;
        }

        if (newVal.x !== oldVal.x || newVal.y !== oldVal.y) {
          return;
        }

        if (newVal.w !== oldVal.w || newVal.h !== oldVal.h) {
          if (!this.isDragging && !this.isAdjustingSize) {
            this.initFromConfig();
          }
        } else if (JSON.stringify(newVal.customize?.points) !== JSON.stringify(oldVal.customize?.points)) {
          if (!this.isDragging && !this.isAdjustingSize) {
            this.initFromConfig();
          }
        }
      },
      deep: true
    },
    lineColor() {
      this.updatePathStyle();
      this.refreshAnimation();
    },
    lineWidth() {
      this.updatePathStyle();
      this.refreshAnimation();
    },
    opacity() {
      this.updatePathStyle();
    },
    dashArray() {
      this.updatePathStyle();
      this.refreshAnimation();
    },
    isEditing(val) {
      this.updateControlPoints();
    },
    'animation.enable'() {
      this.updateAnimation();
    },
    'animation.type'() {
      this.updateAnimation();
    },
    'animation.speed'() {
      this.updateAnimation();
    },
    'animation.flowColor'() {
      this.refreshAnimation();
    },
    'animation.particleColor'() {
      this.refreshAnimation();
    },
    'config.customize.lineType'() {
      this.updatePath();
      this.refreshAnimation();
    },
    'config.customize.curved'() {
      this.updatePath();
      this.refreshAnimation();
    }
  },
  created() {
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');

    if (ticket) {
      localStorage.setItem('ticket', ticket);
    }

    if (!this.config.customize) {
      this.$set(this.config, 'customize', {})
    }

    if (!this.config.customize.points) {
      this.$set(this.config.customize, 'points', [
        { x: 0.2, y: 0.5 },
        { x: 0.8, y: 0.5 }
      ])
    }

    // 创建节流版本的调整大小函数
    this.throttledCheckAndAdjustSize = this.throttle(this.realTimeAdjustSize, 100);

    // 监听刷新动画事件
    EventBus.$on('svgline-refresh-animation', this.refreshAnimation);

    // 添加更新路径的事件监听
    EventBus.$on('svgline-update-path', this.handleUpdatePath);
  },
  mounted() {
    if (this.$refs.svgContainer) {
      this.$refs.svgContainer.addEventListener('mousedown', this.notifyParentDisableDrag);
    }

    this.initSVG();
    this.animationElements = [];
    this.updateAnimation();
  },
  beforeDestroy() {
    if (this.svgDraw) {
      this.svgDraw.remove();
    }

    if (this.$refs.svgContainer) {
      this.$refs.svgContainer.removeEventListener('mousedown', this.notifyParentDisableDrag);
    }

    // 移除事件监听
    EventBus.$off('svgline-refresh-animation', this.refreshAnimation);
    EventBus.$off('svgline-update-path', this.handleUpdatePath);

    this.clearAnimation();
  },
  methods: {
    initSVG() {
      this.svgDraw = SVG().addTo(this.$refs.svgContainer).size('100%', '100%');

      this.path = this.svgDraw.path('').fill('none');
      this.updatePathStyle();

      this.initFromConfig();

      let mouseDownTime = 0;
      let mouseDownPos = { x: 0, y: 0 };

      this.svgDraw.mousedown((event) => {
        if (!this.selected) return;

        // 如果是右键点击，不记录时间和位置
        if (event.button === 2) return;

        mouseDownTime = Date.now();
        mouseDownPos = { x: event.clientX, y: event.clientY };
      });

      this.svgDraw.mouseup((event) => {
        if (!this.selected) return;

        // 如果是右键点击，不处理
        if (event.button === 2) return;

        if (this.justFinishedDragging) return;

        const timeDiff = Date.now() - mouseDownTime;
        const distanceX = Math.abs(event.clientX - mouseDownPos.x);
        const distanceY = Math.abs(event.clientY - mouseDownPos.y);

        if (timeDiff < 300 && distanceX < 5 && distanceY < 5) {
          this.handleSvgClick(event);
        }
      });

      this.path.on('mousedown', (e) => {
        if (!this.selected) {
          return;
        }

        return;
      });
    },

    initFromConfig() {
      this.points = [];
      this.clearControlPoints();

      try {
        const configPoints = this.config.customize?.points;
        if (configPoints && Array.isArray(configPoints) && configPoints.length >= 2) {
          this.points = configPoints.map(p => ({
            x: p.x * this.config.w,
            y: p.y * this.config.h
          }));
        } else {
          this.points = [
            { x: this.config.w * 0.2, y: this.config.h * 0.5 },
            { x: this.config.w * 0.8, y: this.config.h * 0.5 }
          ];
          this.savePoints();
        }

        this.updatePath();

        this.updateControlPoints();
      } catch (error) {
        console.error('初始化点失败:', error);
        this.points = [
          { x: this.config.w * 0.2, y: this.config.h * 0.5 },
          { x: this.config.w * 0.8, y: this.config.h * 0.5 }
        ];
        this.savePoints();
        this.updatePath();
        this.updateControlPoints();
      }
    },

    updatePathStyle() {
      if (!this.path) return;

      this.path.stroke({
        color: this.lineColor,
        width: this.lineWidth,
        opacity: this.opacity
      });

      if (!this.animation.enable || this.animation.type !== 'dash') {
        this.path.attr('stroke-dasharray', this.dashArray);
      }
    },

    updatePath() {
      if (!this.path || this.points.length < 2) return;

      // 移除额外的安全检查，以允许容器随点拖动自动调整大小

      let pathData = '';

      // 根据线型生成不同的路径
      switch (this.lineType) {
        case 'curved':
          // 原来的曲线实现
          pathData = `M ${this.points[0].x} ${this.points[0].y}`;
          for (let i = 1; i < this.points.length; i++) {
            const prev = this.points[i - 1];
            const curr = this.points[i];
            const cp1x = prev.x + (curr.x - prev.x) / 3;
            const cp1y = prev.y;
            const cp2x = prev.x + (curr.x - prev.x) * 2 / 3;
            const cp2y = curr.y;
            pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
          }
          break;

        case 'step':
          // 阶梯线实现
          pathData = `M ${this.points[0].x} ${this.points[0].y}`;
          for (let i = 1; i < this.points.length; i++) {
            const prev = this.points[i - 1];
            const curr = this.points[i];
            // 水平线 + 垂直线
            pathData += ` H ${curr.x} V ${curr.y}`;
          }
          break;

        case 'smooth':
          // 平滑曲线实现 (使用基数样条)
          pathData = `M ${this.points[0].x} ${this.points[0].y}`;
          if (this.points.length === 2) {
            // 只有两个点时，使用直线
            pathData += ` L ${this.points[1].x} ${this.points[1].y}`;
          } else {
            // 使用基数样条曲线
            pathData += ' T';
            for (let i = 1; i < this.points.length; i++) {
              pathData += ` ${this.points[i].x} ${this.points[i].y}`;
            }
          }
          break;

        case 'bezier':
          // 贝塞尔曲线实现
          pathData = `M ${this.points[0].x} ${this.points[0].y}`;
          if (this.points.length === 2) {
            // 只有两个点时，使用直线
            pathData += ` L ${this.points[1].x} ${this.points[1].y}`;
          } else {
            // 对于多个点，使用三次贝塞尔曲线
            for (let i = 1; i < this.points.length; i++) {
              const prev = this.points[i - 1];
              const curr = this.points[i];

              // 计算控制点
              let cp1x, cp1y, cp2x, cp2y;

              if (i === 1) {
                // 第一段曲线的第一个控制点
                cp1x = prev.x + (curr.x - prev.x) / 4;
                cp1y = prev.y + (curr.y - prev.y) / 4;
              } else {
                // 使用前一个点的方向
                const prevPrev = this.points[i - 2];
                cp1x = prev.x + (curr.x - prevPrev.x) / 4;
                cp1y = prev.y + (curr.y - prevPrev.y) / 4;
              }

              if (i === this.points.length - 1) {
                // 最后一段曲线的第二个控制点
                cp2x = curr.x - (curr.x - prev.x) / 4;
                cp2y = curr.y - (curr.y - prev.y) / 4;
              } else {
                // 使用下一个点的方向
                const next = this.points[i + 1];
                cp2x = curr.x - (next.x - prev.x) / 4;
                cp2y = curr.y - (next.y - prev.y) / 4;
              }

              pathData += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${curr.x} ${curr.y}`;
            }
          }
          break;

        case 'straight':
        default:
          // 直线实现
          pathData = `M ${this.points[0].x} ${this.points[0].y}`;
          for (let i = 1; i < this.points.length; i++) {
            pathData += ` L ${this.points[i].x} ${this.points[i].y}`;
          }
          break;
      }

      this.path.plot(pathData);
    },

    clearControlPoints() {
      this.circles.forEach(circle => circle.remove());
      this.circles = [];
    },

    updateControlPoints() {
      this.clearControlPoints();

      // 在预览模式下不显示控制点
      // 通过检查是否在BigScreenRun组件中来判断是否为预览模式
      let isPreviewMode = false;
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.name === 'BigScreenRun') {
          isPreviewMode = true;
          break;
        }
        parent = parent.$parent;
      }

      // 如果是预览模式或未选中，则不显示控制点
      if (isPreviewMode || !this.selected) return;

      this.points.forEach((point, index) => {
        // 不再强制限制点的位置，以允许容器随点拖动自动调整大小
        const circle = this.svgDraw.circle(14) // 增大点的尺寸
          .center(point.x, point.y)
          .fill('#1890ff')
          .stroke({ color: '#fff', width: 2 })
          .css('cursor', 'move')
          // 添加触摸区域
          .attr('touch-action', 'none');

        circle.on('mousedown', (e) => {
          e.stopPropagation();

          // 检查是否按下了Ctrl键并且有超过2个点
          if (e.ctrlKey && this.points.length > 2) {
            this.deletePoint(index);
            return;
          }

          let renderComponent = this.$parent;
          while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
            renderComponent = renderComponent.$parent;
          }

          if (renderComponent && renderComponent.$refs.draggableItems) {
            const currentVdr = renderComponent.$refs.draggableItems.find(
              item => item.id === this.config.code
            );

            if (currentVdr) {
              currentVdr.enabled = false;
            }
          }

          this.isDragging = true;
          this.draggedPointIndex = index;
          this.dragStartPos = {
            x: e.clientX,
            y: e.clientY
          };

          document.addEventListener('mousemove', this.handleMouseMove);
          document.addEventListener('mouseup', this.handleMouseUp);
        });

        this.circles.push(circle);
      });
    },

    handleMouseMove(e) {
      if (!this.isDragging || this.draggedPointIndex === -1) return;

      const dx = e.clientX - this.dragStartPos.x;
      const dy = e.clientY - this.dragStartPos.y;

      this.dragStartPos = {
        x: e.clientX,
        y: e.clientY
      };

      const point = this.points[this.draggedPointIndex];

      let newX = point.x + dx;
      let newY = point.y + dy;

      // 获取渲染组件和画布尺寸
      let renderComponent = this.$parent;
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent;
      }

      if (renderComponent) {
        const pageConfig = renderComponent.pageConfig || {};
        const canvasWidth = pageConfig.w || 1920;
        const canvasHeight = pageConfig.h || 1080;

        const containerX = this.config.x;
        const containerY = this.config.y;

        // 计算绝对坐标（相对于画布）
        const absoluteX = containerX + newX;
        const absoluteY = containerY + newY;

        // 常量定义
        const POINT_RADIUS = 7; // 控制点半径（圆形直径为14，所以半径为7）
        const MIN_PADDING = 20; // 增加安全边距到20，确保点不会超出画布边界

        // 限制点不超出画布边界，但允许点超出容器边界以触发容器自动扩大
        if (absoluteX < POINT_RADIUS + MIN_PADDING) {
          // 确保点不会超出画布左边缘
          newX = Math.max(-containerX + MIN_PADDING, 0);
        } 
        // 当点靠近画布右边缘时
        else if (absoluteX > canvasWidth - POINT_RADIUS - MIN_PADDING) {
          // 确保点不会超出画布右边缘
          newX = Math.min(canvasWidth - containerX - POINT_RADIUS - MIN_PADDING, this.config.w * 2); // 允许超出容器
        }

        // 当点靠近画布上边缘时
        if (absoluteY < POINT_RADIUS + MIN_PADDING) {
          // 确保点不会超出画布上边缘
          newY = Math.max(-containerY + MIN_PADDING, 0);
        } 
        // 当点靠近画布下边缘时
        else if (absoluteY > canvasHeight - POINT_RADIUS - MIN_PADDING) {
          // 确保点不会超出画布下边缘
          newY = Math.min(canvasHeight - containerY - POINT_RADIUS - MIN_PADDING, this.config.h * 2); // 允许超出容器
        }
        
        // 移除所有额外的限制，允许点超出容器边界以触发容器自动扩大
      }

      this.points[this.draggedPointIndex] = { x: newX, y: newY };

      this.updatePath();

      // 更新控制点位置
      if (this.circles[this.draggedPointIndex]) {
        this.circles[this.draggedPointIndex].center(newX, newY);
      }
      
      // 实时调整容器大小
      this.throttledCheckAndAdjustSize();
    },

    handleMouseUp() {
      if (!this.isDragging) return;

      this.isDragging = false;
      this.draggedPointIndex = -1;

      this.justFinishedDragging = true;
      setTimeout(() => {
        this.justFinishedDragging = false;
      }, 300);

      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);

      let renderComponent = this.$parent;
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent;
      }

      if (renderComponent && renderComponent.$refs.draggableItems) {
        const currentVdr = renderComponent.$refs.draggableItems.find(
          item => item.id === this.config.code
        );

        if (currentVdr) {
          currentVdr.enabled = true;
        }
      }

      // 修正所有点的位置，特别是最下面的点
      if (renderComponent) {
        const pageConfig = renderComponent.pageConfig || {};
        const canvasHeight = pageConfig.h || 1080;
        const containerY = this.config.y;
        const POINT_RADIUS = 7; // 控制点半径（圆形直径为14，所以半径为7）
        const MIN_PADDING = 20; // 增加安全边距到20，确保点不会超出容器边界
        
        // 找出最下面的点
        let maxYIndex = 0;
        let maxY = this.points[0].y;
        
        for (let i = 1; i < this.points.length; i++) {
          if (this.points[i].y > maxY) {
            maxY = this.points[i].y;
            maxYIndex = i;
          }
        }
        
        // 检查最下面的点是否超出画布边界（不是容器边界）
        const absoluteY = containerY + maxY;
        if (absoluteY > canvasHeight - POINT_RADIUS - MIN_PADDING) {
          // 修正点的位置，只防止超出画布边界
          this.points[maxYIndex].y = Math.min(
            canvasHeight - containerY - POINT_RADIUS - MIN_PADDING,
            this.config.h * 2 // 允许超出容器边界以触发容器自动扩大
          );
          
          // 更新路径和控制点
          this.updatePath();
          this.updateControlPoints();
        }
      }

      // 在拖动结束时立即调整容器大小，不使用节流版本
      this.realTimeAdjustSize();

      // 保存点的位置
      this.savePoints();

      // 在拖拽结束后，调整容器大小（包括缩小）
      this.adjustContainerSize();

      // 拖拽结束时保存时间线
      if (renderComponent) {
        renderComponent.saveTimeLine(`调整${this.config.title || '组件'}大小`);
      }
    },

    handleSvgClick(event) {
      // 如果是右键点击，不添加新点
      if (event.button === 2) return;

      // 检查是否在预览模式
      let isPreviewMode = false;
      let parent = this.$parent;
      while (parent) {
        if (parent.$options.name === 'BigScreenRun') {
          isPreviewMode = true;
          break;
        }
        parent = parent.$parent;
      }

      // 如果是预览模式，不允许添加点
      if (isPreviewMode) return;

      // 如果刚结束拖动，不添加新点
      if (!this.isEditing || this.isDragging || this.justFinishedDragging) return;

      event.stopPropagation();

      const point = this.svgDraw.point(event.clientX, event.clientY);

      const clickedSegmentIndex = this.findClickedLineSegment(point.x, point.y);

      if (clickedSegmentIndex !== -1) {
        const p1 = this.points[clickedSegmentIndex];
        const p2 = this.points[clickedSegmentIndex + 1];

        const newPoint = this.getProjectionPoint(point.x, point.y, p1, p2);

        this.points.splice(clickedSegmentIndex + 1, 0, newPoint);
      } else {
        this.points.push({ x: point.x, y: point.y });
      }

      this.updatePath();
      this.updateControlPoints();
      this.savePoints();
      this.checkAndAdjustSize();

      // 添加点后刷新动画
      this.refreshAnimation();
    },

    deletePoint(index) {
      if (this.points.length <= 2) return;

      this.points.splice(index, 1);
      this.updatePath();
      this.updateControlPoints();
      this.savePoints();

      // 删除点后刷新动画
      this.refreshAnimation();
    },

    savePoints() {
      if (!this.points || this.points.length < 2) {
        console.warn('Points array is empty or has less than 2 points')
        return
      }

      try {
        const relativePoints = this.points.map(p => ({
          x: Math.round((p.x / this.config.w) * 1000) / 1000,
          y: Math.round((p.y / this.config.h) * 1000) / 1000
        }))

        if (!this.config.customize) {
          this.$set(this.config, 'customize', {})
        }

        this.$set(this.config.customize, 'points', relativePoints)

        const newConfig = {
          ...this.config,
          customize: {
            ...this.config.customize
          }
        }

        newConfig._fromSvgDrag = true

        this.$emit('update:config', newConfig)

        let renderComponent = this.$parent
        while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
          renderComponent = renderComponent.$parent
        }

        if (renderComponent) {
          renderComponent.changeChartConfig(newConfig)
        }
      } catch (error) {
        console.error('保存点位置失败:', error)
      }
    },

    checkAndAdjustSize() {
      // 如果已经在实时调整，则不需要再次调整
      if (this.isAdjustingSize) return;

      this.realTimeAdjustSize();
    },

    findClickedLineSegment(x, y, threshold = 8) {
      for (let i = 0; i < this.points.length - 1; i++) {
        const p1 = this.points[i];
        const p2 = this.points[i + 1];

        const distance = this.getDistanceToLineSegment(x, y, p1, p2);

        if (distance < threshold) {
          return i;
        }
      }

      return -1;
    },

    getDistanceToLineSegment(x, y, p1, p2) {
      const A = x - p1.x;
      const B = y - p1.y;
      const C = p2.x - p1.x;
      const D = p2.y - p1.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = -1;

      if (lenSq !== 0) {
        param = dot / lenSq;
      }

      let xx, yy;

      if (param < 0) {
        xx = p1.x;
        yy = p1.y;
      } else if (param > 1) {
        xx = p2.x;
        yy = p2.y;
      } else {
        xx = p1.x + param * C;
        yy = p1.y + param * D;
      }

      const dx = x - xx;
      const dy = y - yy;

      return Math.sqrt(dx * dx + dy * dy);
    },

    getProjectionPoint(x, y, p1, p2) {
      const A = x - p1.x;
      const B = y - p1.y;
      const C = p2.x - p1.x;
      const D = p2.y - p1.y;

      const dot = A * C + B * D;
      const lenSq = C * C + D * D;
      let param = 0.5;

      if (lenSq !== 0) {
        param = Math.max(0, Math.min(1, dot / lenSq));
      }

      return {
        x: p1.x + param * C,
        y: p1.y + param * D
      };
    },

    notifyParentDisableDrag(e) {
      return;
    },

    triggerContainerResize(direction, distance) {
      let renderComponent = this.$parent;
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent;
      }

      if (!renderComponent) return;

      const vdrInstances = renderComponent.$refs.draggableItems;
      if (!vdrInstances || !vdrInstances.length) return;

      const currentVdr = vdrInstances.find(item => item.id === this.config.code);
      if (!currentVdr) return;

      switch (direction) {
        case 'left':
          if (distance.x < 0) {
            this.simulateVdrResize(currentVdr, 'ml', distance);
          }
          break;
        case 'right':
          if (distance.x > 0) {
            this.simulateVdrResize(currentVdr, 'mr', distance);
          }
          break;
        case 'top':
          if (distance.y < 0) {
            this.simulateVdrResize(currentVdr, 'tm', distance);
          }
          break;
        case 'bottom':
          if (distance.y > 0) {
            this.simulateVdrResize(currentVdr, 'bm', distance);
          }
          break;
        case 'topLeft':
          if (distance.x < 0 || distance.y < 0) {
            this.simulateVdrResize(currentVdr, 'tl', {
              x: distance.x < 0 ? distance.x : 0,
              y: distance.y < 0 ? distance.y : 0
            });
          }
          break;
        case 'topRight':
          if (distance.x > 0 || distance.y < 0) {
            this.simulateVdrResize(currentVdr, 'tr', {
              x: distance.x > 0 ? distance.x : 0,
              y: distance.y < 0 ? distance.y : 0
            });
          }
          break;
        case 'bottomLeft':
          if (distance.x < 0 || distance.y > 0) {
            this.simulateVdrResize(currentVdr, 'bl', {
              x: distance.x < 0 ? distance.x : 0,
              y: distance.y > 0 ? distance.y : 0
            });
          }
          break;
        case 'bottomRight':
          if (distance.x > 0 || distance.y > 0) {
            this.simulateVdrResize(currentVdr, 'br', {
              x: distance.x > 0 ? distance.x : 0,
              y: distance.y > 0 ? distance.y : 0
            });
          }
          break;
      }
    },

    simulateVdrResize(vdrInstance, handle, distance) {
      this.isAdjustingSize = true;

      const resizeHandleDown = vdrInstance.handleResizeDown;
      const resizeHandleMove = vdrInstance.handleResizeMove;
      const resizeHandleUp = vdrInstance.handleUp;

      if (!resizeHandleDown || !resizeHandleMove || !resizeHandleUp) {
        this.isAdjustingSize = false;
        return;
      }

      const mouseDownEvent = new MouseEvent('mousedown', {
        clientX: 0,
        clientY: 0,
        bubbles: true
      });

      resizeHandleDown(mouseDownEvent, handle);

      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: distance.x,
        clientY: distance.y,
        bubbles: true
      });

      resizeHandleMove(mouseMoveEvent);

      const mouseUpEvent = new MouseEvent('mouseup', {
        bubbles: true
      });

      resizeHandleUp(mouseUpEvent);

      setTimeout(() => {
        this.isAdjustingSize = false;
      }, 100);
    },

    updateAnimation() {
      const previousType = this.animation.type;

      // 清除现有动画
      this.clearAnimation();

      if (!this.animation.enable) {
        // 如果禁用动画，确保恢复原始样式
        this.updatePathStyle();
        return;
      }

      // 根据动画类型创建新动画
      switch (this.animation.type) {
        case 'flow':
          this.createFlowAnimation();
          break;
        case 'particle':
          this.createParticleAnimation();
          break;
      }
    },

    clearAnimation() {
      // 先停止并移除所有动画元素
      if (this.animationElements) {
        this.animationElements.forEach(el => {
          // 安全地调用 remove 方法
          if (typeof el.remove === 'function') {
            el.remove();
          } else if (el && el.animation && typeof el.animation.stop === 'function') {
            el.animation.stop();
          }
        });
      }
      this.animationElements = [];

      // 恢复原始样式
      if (this.path) {
        this.path.attr({
          'stroke-dasharray': this.dashArray,
          'stroke-dashoffset': 0
        });
      }
    },

    createFlowAnimation() {
      // 使用更小的点来减少渲染负担
      const flowDot = this.svgDraw.circle(this.animation.flowLength)
        .fill(this.animation.flowColor)
        .center(0, 0)
        .opacity(0.8);

      const pathLength = this.path.length();

      // 优化动画速度计算
      const speedFactor = this.animation.speed * 0.5; // 增加速度因子
      const baseDuration = Math.max(2000, 10000 / speedFactor); // 降低基础持续时间
      const duration = Math.min(baseDuration, pathLength * 20 / speedFactor); // 限制最大持续时间

      // 使用 requestAnimationFrame 优化动画性能
      let start = null;
      let animationFrameId = null;

      const animate = (timestamp) => {
        if (!start) start = timestamp;
        // 增加速度因子，使动画更快
        const elapsed = (timestamp - start) * speedFactor;
        const progress = (elapsed % duration) / duration;

        // 计算当前位置
        const point = this.path.pointAt(progress * pathLength);
        if (point) {
          flowDot.center(point.x, point.y);
        }

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      // 添加到动画元素数组，并提供清理方法
      this.animationElements.push({
        remove: () => {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
          flowDot.remove();
        }
      });
    },

    createParticleAnimation() {
      const pathLength = this.path.length();
      if (pathLength === 0) return;

      // 根据路径长度计算粒子数量，避免过多粒子
      const particleCount = Math.min(Math.ceil(pathLength / 50), 10);
      const particles = [];

      // 创建粒子
      for (let i = 0; i < particleCount; i++) {
        const particle = this.svgDraw.circle(this.animation.particleSize)
          .fill(this.animation.particleColor)
          .opacity(0.8);

        particles.push(particle);
        this.animationElements.push(particle);
      }

      // 使用 requestAnimationFrame 优化动画
      let animationFrameId = null;
      // 减小速度因子，使粒子动画更慢
      const speedFactor = this.animation.speed * 0.05; // 从0.2降低到0.05

      const animate = () => {
        particles.forEach((particle, index) => {
          // 计算每个粒子的位置，均匀分布在路径上
          // 降低速度因子，使动画更慢
          const offset = (index / particleCount + Date.now() * speedFactor / 1000) % 1;
          const point = this.path.pointAt(offset * pathLength);

          if (point) {
            particle.center(point.x, point.y);
          }
        });

        animationFrameId = requestAnimationFrame(animate);
      };

      animationFrameId = requestAnimationFrame(animate);

      // 添加清理方法
      this.animationElements.push({
        remove: () => {
          if (animationFrameId) {
            cancelAnimationFrame(animationFrameId);
          }
        }
      });
    },

    // 实时调整大小的函数（只处理放大）
    realTimeAdjustSize() {
      // 标记正在调整大小，避免触发watch
      this.isAdjustingSize = true;
      
      // 获取点的最大最小坐标
      const xValues = this.points.map(p => p.x);
      const yValues = this.points.map(p => p.y);
      
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);
      
      let hasChanges = false;
      const updatedConfig = JSON.parse(JSON.stringify(this.config));
      
      // 检查是否需要向左或向上扩展
      if (minX < 20) {
        const deltaX = 20 - minX;
        // 确保不会将容器推出画布左边缘
        const safeXMove = Math.min(deltaX, updatedConfig.x);
        
        // 更新容器位置和大小
        updatedConfig.x = Math.max(0, updatedConfig.x - safeXMove);
        updatedConfig.w += safeXMove;
        
        // 更新点的位置
        this.points = this.points.map(p => ({
          x: p.x + safeXMove,
          y: p.y
        }));
        
        hasChanges = true;
      }
      
      if (minY < 20) {
        const deltaY = 20 - minY;
        // 确保不会将容器推出画布上边缘
        const safeYMove = Math.min(deltaY, updatedConfig.y);
        
        // 更新容器位置和大小
        updatedConfig.y = Math.max(0, updatedConfig.y - safeYMove);
        updatedConfig.h += safeYMove;
        
        // 更新点的位置
        this.points = this.points.map(p => ({
          x: p.x,
          y: p.y + safeYMove
        }));
        
        hasChanges = true;
      }
      
      // 检查是否需要向右或向下扩展
      // 获取渲染组件和画布尺寸
      let renderComponent = this.$parent;
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent;
      }
      
      const canvasWidth = renderComponent?.pageConfig?.w || 1920; // 默认画布宽度
      const canvasHeight = renderComponent?.pageConfig?.h || 1080; // 默认画布高度
      
      if (maxX > updatedConfig.w - 20) {
        // 确保不会将容器推出画布右边缘
        const newWidth = maxX + 20;
        
        // 确保容器不会超出画布
        if (updatedConfig.x + newWidth > canvasWidth) {
          // 如果会超出，调整宽度
          updatedConfig.w = Math.min(newWidth, canvasWidth - updatedConfig.x);
        } else {
          updatedConfig.w = newWidth;
        }
        
        hasChanges = true;
      }
      
      if (maxY > updatedConfig.h - 20) {
        // 确保不会将容器推出画布下边缘
        const newHeight = maxY + 20;
        
        // 确保容器不会超出画布
        if (updatedConfig.y + newHeight > canvasHeight) {
          // 如果会超出，调整高度
          updatedConfig.h = Math.min(newHeight, canvasHeight - updatedConfig.y);
        } else {
          updatedConfig.h = newHeight;
        }
        
        hasChanges = true;
      }
      
      // 如果有变化，更新配置
      if (hasChanges) {
        // 添加标记，避免触发watch
        updatedConfig._fromSvgDrag = true;
        
        // 更新组件配置
        this.$emit('update:config', updatedConfig);
        
        // 更新渲染组件中的配置
        let renderComponent = this.$parent;
        while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
          renderComponent = renderComponent.$parent;
        }
        
        if (renderComponent) {
          renderComponent.changeChartConfig(updatedConfig);
          renderComponent.changeActiveItemConfig(updatedConfig);
          renderComponent.changeActiveItemWH({
            code: updatedConfig.code,
            w: updatedConfig.w,
            h: updatedConfig.h,
            x: updatedConfig.x,
            y: updatedConfig.y
          });
        }
        
        // 更新路径和控制点
        this.updatePath();
        this.updateControlPoints();
      }
      
      // 重置调整大小标记
      setTimeout(() => {
        this.isAdjustingSize = false;
      }, 50);
    },

    // 新增函数：调整容器大小（包括缩小）
    adjustContainerSize() {
      // 标记正在调整大小，避免触发watch
      this.isAdjustingSize = true;

      const EDGE_PADDING = 25; // 增加边缘填充，确保点不会太靠近边缘

      // 获取点的最大最小坐标
      const xValues = this.points.map(p => p.x);
      const yValues = this.points.map(p => p.y);

      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      // 计算理想的容器尺寸
      const idealWidth = maxX - minX + 2 * EDGE_PADDING;
      const idealHeight = maxY - minY + 2 * EDGE_PADDING;

      // 创建配置副本
      const updatedConfig = JSON.parse(JSON.stringify(this.config));
      let hasChanges = false;

      // 处理左侧和顶部（可能需要移动容器位置）
      // 只有当容器不在画布边缘时才调整左侧位置
      // 如果容器已经在画布左边缘，或者点已经靠近容器左边缘，则不调整
      if (minX > EDGE_PADDING && updatedConfig.x > 0 && minX > 5) {
        const deltaX = minX - EDGE_PADDING;
        // 确保不会将容器推出画布左边缘
        const safeXMove = Math.min(deltaX, updatedConfig.x);
        
        if (safeXMove > 0) {
          // 更新点的位置
          this.points = this.points.map(p => ({
            x: p.x - safeXMove,
            y: p.y
          }));

          // 更新容器位置和大小
          updatedConfig.x += safeXMove;
          updatedConfig.w -= safeXMove;
          hasChanges = true;
        }
      }

      // 只有当容器不在画布边缘时才调整顶部位置
      // 如果容器已经在画布上边缘，或者点已经靠近容器上边缘，则不调整
      if (minY > EDGE_PADDING && updatedConfig.y > 0 && minY > 5) {
        const deltaY = minY - EDGE_PADDING;
        // 确保不会将容器推出画布上边缘
        const safeYMove = Math.min(deltaY, updatedConfig.y);
        
        if (safeYMove > 0) {
          // 更新点的位置
          this.points = this.points.map(p => ({
            x: p.x,
            y: p.y - safeYMove
          }));

          // 更新容器位置和大小
          updatedConfig.y += safeYMove;
          updatedConfig.h -= safeYMove;
          hasChanges = true;
        }
      }

      // 处理右侧和底部（只需要调整大小）
      // 如果点已经靠近容器右边缘，则不调整
      const rightSpace = updatedConfig.w - maxX - EDGE_PADDING;
      if (rightSpace > 0 && updatedConfig.w - maxX > 5) {
        updatedConfig.w -= rightSpace;
        hasChanges = true;
      }

      // 如果点已经靠近容器下边缘，则不调整
      const bottomSpace = updatedConfig.h - maxY - EDGE_PADDING;
      if (bottomSpace > 0 && updatedConfig.h - maxY > 5) {
        updatedConfig.h -= bottomSpace;
        hasChanges = true;
      }

      // 如果有变化，更新配置
      if (hasChanges) {
        // 添加标记，避免触发watch
        updatedConfig._fromSvgDrag = true;

        // 更新组件配置
        this.$emit('update:config', updatedConfig);

        // 更新渲染组件中的配置
        let renderComponent = this.$parent;
        while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
          renderComponent = renderComponent.$parent;
        }

        if (renderComponent) {
          renderComponent.changeChartConfig(updatedConfig);
          renderComponent.changeActiveItemConfig(updatedConfig);
          renderComponent.changeActiveItemWH({
            code: updatedConfig.code,
            w: updatedConfig.w,
            h: updatedConfig.h,
            x: updatedConfig.x,
            y: updatedConfig.y
          });
        }

        // 更新路径和控制点
        this.updatePath();
        this.updateControlPoints();
      }

      // 重置调整大小标记
      setTimeout(() => {
        this.isAdjustingSize = false;
      }, 50);
    },

    // 节流函数
    throttle(fn, delay) {
      let lastCall = 0;
      return function(...args) {
        const now = Date.now();
        if (now - lastCall >= delay) {
          lastCall = now;
          fn.apply(this, args);
        }
      };
    },

    // 添加刷新动画的方法
    refreshAnimation() {
      if (this.animation.enable) {
        this.updateAnimation();
      }
    },

    // 添加处理更新路径的方法
    handleUpdatePath() {
      this.updatePath();
      this.refreshAnimation();
    },
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
