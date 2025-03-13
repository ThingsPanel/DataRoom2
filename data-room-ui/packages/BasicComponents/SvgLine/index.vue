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
      deleteButtons: [],
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

      let pathData = '';

      if (this.config.customize?.curved) {
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
      } else {
        pathData = `M ${this.points[0].x} ${this.points[0].y}`;

        for (let i = 1; i < this.points.length; i++) {
          pathData += ` L ${this.points[i].x} ${this.points[i].y}`;
        }
      }

      this.path.plot(pathData);
    },

    clearControlPoints() {
      this.circles.forEach(circle => circle.remove());
      this.circles = [];

      this.deleteButtons.forEach(btn => btn.remove());
      this.deleteButtons = [];
    },

    updateControlPoints() {
      this.clearControlPoints();

      if (!this.selected) return;

      this.points.forEach((point, index) => {
        const circle = this.svgDraw.circle(14) // 增大点的尺寸
          .center(point.x, point.y)
          .fill('#1890ff')
          .stroke({ color: '#fff', width: 2 })
          .css('cursor', 'move')
          // 添加触摸区域
          .attr('touch-action', 'none');

        circle.on('mousedown', (e) => {
          e.stopPropagation();

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

        if (this.points.length > 2) {
          const deleteGroup = this.svgDraw.group();

          deleteGroup.circle(16)
            .center(point.x, point.y - 15)
            .fill('#ff4d4f');

          deleteGroup.text('×')
            .center(point.x, point.y - 15)
            .font({ size: 12, weight: 'bold' })
            .fill('#fff')
            .css('pointer-events', 'none');

          deleteGroup.css('cursor', 'pointer')
            .click((e) => {
              e.stopPropagation();
              this.deletePoint(index);
            });

          this.deleteButtons.push(deleteGroup);
        }
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

        const absoluteX = containerX + newX;
        const absoluteY = containerY + newY;

        // 常量定义 - 增加边缘安全距离
        const POINT_RADIUS = 14; // 增大点的半径
        const DELETE_BUTTON_HEIGHT = 20; // 增大删除按钮高度
        const LEFT_PADDING = 25; // 增加左侧安全距离

        // 限制点不超出画布边界
        if (absoluteX - POINT_RADIUS - LEFT_PADDING < 0) {
          newX = -containerX + POINT_RADIUS + LEFT_PADDING;
        } else if (absoluteX + POINT_RADIUS > canvasWidth) {
          newX = canvasWidth - containerX - POINT_RADIUS;
        }

        if (absoluteY - POINT_RADIUS - DELETE_BUTTON_HEIGHT < 0) {
          newY = -containerY + POINT_RADIUS + DELETE_BUTTON_HEIGHT;
        } else if (absoluteY + POINT_RADIUS > canvasHeight) {
          newY = canvasHeight - containerY - POINT_RADIUS;
        }
      }

      this.points[this.draggedPointIndex] = { x: newX, y: newY };

      this.updatePath();

      // 更新控制点位置
      if (this.circles[this.draggedPointIndex]) {
        this.circles[this.draggedPointIndex].center(newX, newY);
      }

      if (this.deleteButtons[this.draggedPointIndex]) {
        this.deleteButtons[this.draggedPointIndex].center(newX, newY - 15);
      }
      
      // 实时调整容器大小
      // 使用节流函数控制调整频率，避免性能问题
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
    },

    deletePoint(index) {
      if (this.points.length <= 2) return;

      this.points.splice(index, 1);

      this.updatePath();

      this.updateControlPoints();

      this.savePoints();
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

      // 如果当前不是虚线动画，恢复原始样式
      if (this.path) {
        this.path.attr({
          'stroke-dasharray': this.dashArray,
          'stroke-dashoffset': 0
        });
      }
    },

    createFlowAnimation() {
      const flowDot = this.svgDraw.circle(this.animation.flowLength)
        .fill(this.animation.flowColor)
        .center(0, 0)
        .opacity(0.8);

      const pathLength = this.path.length();

      flowDot.animate({
        duration: (11 - this.animation.speed) * 1000,
        ease: '<>'
      }).during((pos) => {
        const point = this.path.pointAt(pos * pathLength);
        flowDot.center(point.x, point.y);
      }).loop(true, false);

      this.animationElements.push(flowDot);
    },

    createParticleAnimation() {
      const particleCount = Math.ceil(this.path.length() / 50);
      const duration = (11 - this.animation.speed) * 1000;

      for (let i = 0; i < particleCount; i++) {
        const particle = this.svgDraw.circle(this.animation.particleSize * 2)
          .fill(this.animation.particleColor)
          .center(0, 0)
          .opacity(0);

        const delay = (duration / particleCount) * i;
        const pathLength = this.path.length();

        particle.animate({
          duration: duration,
          delay: delay,
          ease: '<>',
          loop: true
        }).during((pos) => {
          const point = this.path.pointAt(pos * pathLength);
          particle.center(point.x, point.y).opacity(1);
        }).loop(true, false);

        this.animationElements.push(particle);
      }
    },

    // 实时调整大小的函数（只处理放大）
    realTimeAdjustSize() {
      const EDGE_PADDING = 20; // 增加边缘填充
      
      if (!this.config.customize?.autoResize) return;
      
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
      if (minX < EDGE_PADDING) {
        const deltaX = EDGE_PADDING - minX;
        updatedConfig.x = Math.max(0, updatedConfig.x - deltaX);
        updatedConfig.w += deltaX;
        
        // 更新点的位置
        this.points = this.points.map(p => ({
          x: p.x + deltaX,
          y: p.y
        }));
        
        hasChanges = true;
      }
      
      if (minY < EDGE_PADDING) {
        const deltaY = EDGE_PADDING - minY;
        updatedConfig.y = Math.max(0, updatedConfig.y - deltaY);
        updatedConfig.h += deltaY;
        
        // 更新点的位置
        this.points = this.points.map(p => ({
          x: p.x,
          y: p.y + deltaY
        }));
        
        hasChanges = true;
      }
      
      // 检查是否需要向右或向下扩展
      if (maxX > updatedConfig.w - EDGE_PADDING) {
        updatedConfig.w = maxX + EDGE_PADDING;
        hasChanges = true;
      }
      
      if (maxY > updatedConfig.h - EDGE_PADDING) {
        updatedConfig.h = maxY + EDGE_PADDING;
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
      if (!this.config.customize?.autoResize) return;
      
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
      if (minX > EDGE_PADDING) {
        const deltaX = minX - EDGE_PADDING;
        // 更新点的位置
        this.points = this.points.map(p => ({
          x: p.x - deltaX,
          y: p.y
        }));
        
        // 更新容器位置和大小
        updatedConfig.x += deltaX;
        updatedConfig.w -= deltaX;
        hasChanges = true;
      }
      
      if (minY > EDGE_PADDING) {
        const deltaY = minY - EDGE_PADDING;
        // 更新点的位置
        this.points = this.points.map(p => ({
          x: p.x,
          y: p.y - deltaY
        }));
        
        // 更新容器位置和大小
        updatedConfig.y += deltaY;
        updatedConfig.h -= deltaY;
        hasChanges = true;
      }
      
      // 处理右侧和底部（只需要调整大小）
      const rightSpace = updatedConfig.w - maxX - EDGE_PADDING;
      if (rightSpace > 0) {
        updatedConfig.w -= rightSpace;
        hasChanges = true;
      }
      
      const bottomSpace = updatedConfig.h - maxY - EDGE_PADDING;
      if (bottomSpace > 0) {
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