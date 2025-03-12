<template>
  <div
    class="bs-design-wrap"
    :style="{
      pointerEvents: isEditing ? 'auto' : 'none',
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
    }
  },
  data() {
    return {
      isEditing: false,
      svgDraw: null,
      path: null,
      points: [],
      circles: [],
      deleteButtons: [],
      isDragging: false,
      isAdjustingSize: false,
      // 添加拖拽相关状态
      draggedPointIndex: -1,
      dragStartPos: { x: 0, y: 0 },
      animationElements: [],
      justFinishedDragging: false,
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
        // 当config变化时，检查是否需要重新初始化
        if (newVal._fromSvgDrag) {
          // 如果是来自SVG拖动的更新，不需要重新初始化
          return;
        }

        // 检查容器位置是否变化
        if (newVal.x !== oldVal.x || newVal.y !== oldVal.y) {
          // 容器位置变化，但点的相对位置不变，所以不需要重新初始化
          return;
        }

        // 检查是否是由于拖动引起的宽高变化
        if (newVal.w !== oldVal.w || newVal.h !== oldVal.h) {
          // 如果宽高发生变化，但不是由拖动点引起的，则重新初始化
          if (!this.isDragging && !this.isAdjustingSize) {
            this.initFromConfig();
          }
        } else if (JSON.stringify(newVal.customize?.points) !== JSON.stringify(oldVal.customize?.points)) {
          // 如果点的配置发生变化，且不是由拖动引起的，则重新初始化
          if (!this.isDragging && !this.isAdjustingSize) {
            this.initFromConfig();
          }
        }
      },
      deep: true
    },
    lineColor() {
      this.updatePathStyle();
    },
    lineWidth() {
      this.updatePathStyle();
    },
    opacity() {
      this.updatePathStyle();
    },
    dashArray() {
      this.updatePathStyle();
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
    }
  },
  created() {
    // 获取当前URL中的ticket参数
    const urlParams = new URLSearchParams(window.location.search);
    const ticket = urlParams.get('ticket');
    
    // 如果存在ticket参数，则存储到localStorage
    if (ticket) {
      localStorage.setItem('ticket', ticket);
    }

    // 确保 customize 对象存在
    if (!this.config.customize) {
      this.$set(this.config, 'customize', {})
    }

    // 确保 points 数组存在
    if (!this.config.customize.points) {
      this.$set(this.config.customize, 'points', [
        { x: 0.2, y: 0.5 },
        { x: 0.8, y: 0.5 }
      ])
    }

    this.initSVG();
    EventBus.$on('svgline-toggle-edit', this.handleToggleEdit);

    // 添加事件监听，通知父组件禁用拖拽
    this.$refs.svgContainer.addEventListener('mousedown', this.notifyParentDisableDrag);

    this.animationElements = [];
    this.updateAnimation();
  },
  beforeDestroy() {
    EventBus.$off('svgline-toggle-edit', this.handleToggleEdit);
    if (this.svgDraw) {
      this.svgDraw.remove();
    }

    // 移除事件监听
    this.$refs.svgContainer.removeEventListener('mousedown', this.notifyParentDisableDrag);

    this.clearAnimation();
  },
  methods: {
    initSVG() {
      // 初始化SVG绘图区域
      this.svgDraw = SVG().addTo(this.$refs.svgContainer).size('100%', '100%');

      // 创建路径元素
      this.path = this.svgDraw.path('').fill('none');
      this.updatePathStyle();

      // 初始化点
      this.initFromConfig();

      // 添加点击事件
      this.svgDraw.click(this.handleSvgClick);
    },

    initFromConfig() {
      // 清除现有点
      this.points = [];
      this.clearControlPoints();

      try {
        const configPoints = this.config.customize?.points;
        if (configPoints && Array.isArray(configPoints) && configPoints.length >= 2) {
          // 使用相对位置计算绝对位置
          this.points = configPoints.map(p => ({
            x: p.x * this.config.w,
            y: p.y * this.config.h
          }));
        } else {
          // 如果没有配置点或点数不足，则初始化默认点
          this.points = [
            { x: this.config.w * 0.2, y: this.config.h * 0.5 },
            { x: this.config.w * 0.8, y: this.config.h * 0.5 }
          ];
          this.savePoints();
        }

        // 更新路径
        this.updatePath();

        // 更新控制点
        this.updateControlPoints();
      } catch (error) {
        console.error('初始化点失败:', error);
        // 使用默认点
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

      // 更新基本样式
      this.path.stroke({ 
        color: this.lineColor, 
        width: this.lineWidth, 
        opacity: this.opacity 
      });

      // 只在非虚线动画时更新虚线样式
      if (!this.animation.enable || this.animation.type !== 'dash') {
        this.path.attr('stroke-dasharray', this.dashArray);
      }
    },

    updatePath() {
      if (!this.path || this.points.length < 2) return;

      let pathData = '';

      if (this.config.customize?.curved) {
        // 贝塞尔曲线
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
        // 直线
        pathData = `M ${this.points[0].x} ${this.points[0].y}`;

        for (let i = 1; i < this.points.length; i++) {
          pathData += ` L ${this.points[i].x} ${this.points[i].y}`;
        }
      }

      this.path.plot(pathData);
    },

    clearControlPoints() {
      // 清除控制点
      this.circles.forEach(circle => circle.remove());
      this.circles = [];

      // 清除删除按钮
      this.deleteButtons.forEach(btn => btn.remove());
      this.deleteButtons = [];
    },

    updateControlPoints() {
      // 清除现有控制点
      this.clearControlPoints();

      if (!this.isEditing) return;

      // 创建新的控制点
      this.points.forEach((point, index) => {
        // 创建控制点
        const circle = this.svgDraw.circle(10)
          .center(point.x, point.y)
          .fill('#1890ff')
          .stroke({ color: '#fff', width: 2 })
          .css('cursor', 'move');

        // 添加鼠标事件
        circle.on('mousedown', (e) => {
          // 阻止事件冒泡，防止触发父组件的拖拽
          e.stopPropagation();

          // 查找父组件中的 Render 组件
          let renderComponent = this.$parent;
          while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
            renderComponent = renderComponent.$parent;
          }

          if (renderComponent && renderComponent.$refs.draggableItems) {
            // 找到当前组件的 vdr 实例
            const currentVdr = renderComponent.$refs.draggableItems.find(
              item => item.id === this.config.code
            );

            if (currentVdr) {
              // 直接设置拖拽禁用状态
              currentVdr.enabled = false;
            }
          }

          this.isDragging = true;
          this.draggedPointIndex = index;
          this.dragStartPos = {
            x: e.clientX,
            y: e.clientY
          };

          // 添加全局鼠标事件
          document.addEventListener('mousemove', this.handleMouseMove);
          document.addEventListener('mouseup', this.handleMouseUp);
        });

        this.circles.push(circle);

        // 创建删除按钮（如果点数大于2）
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
              // 阻止事件冒泡
              e.stopPropagation();
              this.deletePoint(index);
            });

          this.deleteButtons.push(deleteGroup);
        }
      });
    },

    // 添加鼠标移动处理函数
    handleMouseMove(e) {
      if (!this.isDragging || this.draggedPointIndex === -1) return;

      // 计算移动距离
      const dx = e.clientX - this.dragStartPos.x;
      const dy = e.clientY - this.dragStartPos.y;

      // 更新拖拽起点
      this.dragStartPos = {
        x: e.clientX,
        y: e.clientY
      };

      // 更新点位置
      const point = this.points[this.draggedPointIndex];

      // 计算新位置
      let newX = point.x + dx;
      let newY = point.y + dy;

      // 查找父组件中的 Render 组件
      let renderComponent = this.$parent;
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent;
      }

      if (renderComponent) {
        // 获取画布大小限制 - 使用精确值
        const pageConfig = renderComponent.pageConfig || {};
        const canvasWidth = pageConfig.w || 1920;
        const canvasHeight = pageConfig.h || 1080;

        // 检查容器位置
        const containerX = this.config.x;
        const containerY = this.config.y;

        // 计算点在画布中的绝对位置
        const absoluteX = containerX + newX;
        const absoluteY = containerY + newY;

        // 控制点的半径和删除按钮的位置
        const POINT_RADIUS = 10; // 增加控制点半径，考虑实际大小
        const DELETE_BUTTON_HEIGHT = 15; // 删除按钮在点上方15px
        const LEFT_PADDING = 20; // 左侧额外的padding，修复左侧误差

        // 检查点是否超出画布边界 - 考虑控制点的大小和删除按钮
        if (absoluteX - POINT_RADIUS - LEFT_PADDING < 0) {
          // 如果超出左边界，调整点位置到边界
          newX = -containerX + POINT_RADIUS + LEFT_PADDING;
        } else if (absoluteX + POINT_RADIUS > canvasWidth) {
          // 如果超出右边界，调整点位置到边界
          newX = canvasWidth - containerX - POINT_RADIUS;
        }

        // 考虑删除按钮的高度
        if (absoluteY - POINT_RADIUS - DELETE_BUTTON_HEIGHT < 0) {
          // 如果删除按钮超出上边界，调整点位置
          newY = -containerY + POINT_RADIUS + DELETE_BUTTON_HEIGHT;
        } else if (absoluteY + POINT_RADIUS > canvasHeight) {
          // 如果超出下边界，调整点位置到边界
          newY = canvasHeight - containerY - POINT_RADIUS;
        }
      }

      // 更新点位置
      this.points[this.draggedPointIndex] = { x: newX, y: newY };

      // 更新路径
      this.updatePath();

      // 更新控制点位置
      if (this.circles[this.draggedPointIndex]) {
        this.circles[this.draggedPointIndex].center(newX, newY);
      }

      // 更新删除按钮位置
      if (this.deleteButtons[this.draggedPointIndex]) {
        this.deleteButtons[this.draggedPointIndex].center(newX, newY - 15);
      }
    },

    // 添加鼠标抬起处理函数
    handleMouseUp() {
      if (!this.isDragging) return;

      this.isDragging = false;
      this.draggedPointIndex = -1;

      // 添加一个标记，表示刚结束拖动
      this.justFinishedDragging = true;
      setTimeout(() => {
        this.justFinishedDragging = false;
      }, 100); // 100ms 后重置标记

      // 移除全局鼠标事件
      document.removeEventListener('mousemove', this.handleMouseMove);
      document.removeEventListener('mouseup', this.handleMouseUp);

      // 查找父组件中的 Render 组件
      let renderComponent = this.$parent;
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent;
      }

      if (renderComponent && renderComponent.$refs.draggableItems) {
        // 找到当前组件的 vdr 实例
        const currentVdr = renderComponent.$refs.draggableItems.find(
          item => item.id === this.config.code
        );

        if (currentVdr) {
          // 恢复拖拽
          currentVdr.enabled = true;
        }
      }

      // 保存点位置
      this.savePoints();

      // 检查是否需要调整容器大小
      this.checkAndAdjustSize();
    },

    handleToggleEdit(value) {
      this.isEditing = value;
    },

    handleSvgClick(event) {
      // 如果刚结束拖动，不添加新点
      if (!this.isEditing || this.isDragging || this.justFinishedDragging) return;

      // 阻止事件冒泡，防止触发父组件的点击事件
      event.stopPropagation();

      // 获取点击位置
      const point = this.svgDraw.point(event.clientX, event.clientY);

      // 检查是否点击在线段上
      const clickedSegmentIndex = this.findClickedLineSegment(point.x, point.y);

      if (clickedSegmentIndex !== -1) {
        // 如果点击在线段上，在对应位置插入新点
        const p1 = this.points[clickedSegmentIndex];
        const p2 = this.points[clickedSegmentIndex + 1];

        // 计算新点的位置（在线段上的投影点）
        const newPoint = this.getProjectionPoint(point.x, point.y, p1, p2);

        // 在找到的线段后面插入新点
        this.points.splice(clickedSegmentIndex + 1, 0, newPoint);
      } else {
        // 如果没有点击在线段上，则在末尾添加新点
        this.points.push({ x: point.x, y: point.y });
      }

      // 更新路径
      this.updatePath();

      // 更新控制点
      this.updateControlPoints();

      // 保存点位置
      this.savePoints();

      // 检查是否需要调整容器大小
      this.checkAndAdjustSize();
    },

    deletePoint(index) {
      if (this.points.length <= 2) return;

      // 删除点
      this.points.splice(index, 1);

      // 更新路径
      this.updatePath();

      // 更新控制点
      this.updateControlPoints();

      // 保存点位置
      this.savePoints();
    },

    savePoints() {
      if (!this.points || this.points.length < 2) {
        console.warn('Points array is empty or has less than 2 points')
        return
      }

      try {
        // 计算相对位置
        const relativePoints = this.points.map(p => ({
          x: Math.round((p.x / this.config.w) * 1000) / 1000,
          y: Math.round((p.y / this.config.h) * 1000) / 1000
        }))

        // 直接修改 config.customize.points
        if (!this.config.customize) {
          this.$set(this.config, 'customize', {})
        }

        // 更新 points
        this.$set(this.config.customize, 'points', relativePoints)

        // 创建一个新的配置对象
        const newConfig = {
          ...this.config,
          customize: {
            ...this.config.customize
          }
        }

        // 添加标记，表示这是来自 SVG 的更新
        newConfig._fromSvgDrag = true

        // 触发更新事件
        this.$emit('update:config', newConfig)

        // 查找父组件中的 Render 组件
        let renderComponent = this.$parent
        while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
          renderComponent = renderComponent.$parent
        }

        // 如果找到了 Render 组件，调用其更新方法
        if (renderComponent) {
          renderComponent.changeChartConfig(newConfig)
        }
      } catch (error) {
        console.error('保存点位置失败:', error)
      }
    },

    checkAndAdjustSize() {
      const EDGE_PADDING = 10;

      // 如果不是自动调整大小，则不进行调整
      if (!this.config.customize?.autoResize) return;

      // 标记正在调整大小
      this.isAdjustingSize = true;

      // 获取所有点的X和Y值
      const xValues = this.points.map(p => p.x);
      const yValues = this.points.map(p => p.y);

      // 计算当前点的边界
      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      let hasChanges = false;
      const updatedConfig = JSON.parse(JSON.stringify(this.config));

      // 处理左侧边界 - 如果有点超出左边界，向左扩展容器
      if (minX < EDGE_PADDING) {
        const deltaX = EDGE_PADDING - minX;
        updatedConfig.x = Math.max(0, updatedConfig.x - deltaX);
        updatedConfig.w += deltaX;

        // 调整所有点的X坐标，保持相对位置
        this.points = this.points.map(p => ({
          x: p.x + deltaX,
          y: p.y
        }));

        hasChanges = true;
      }

      // 处理上侧边界 - 如果有点超出上边界，向上扩展容器
      if (minY < EDGE_PADDING) {
        const deltaY = EDGE_PADDING - minY;
        updatedConfig.y = Math.max(0, updatedConfig.y - deltaY);
        updatedConfig.h += deltaY;

        // 调整所有点的Y坐标，保持相对位置
        this.points = this.points.map(p => ({
          x: p.x,
          y: p.y + deltaY
        }));

        hasChanges = true;
      }

      // 处理右侧边界 - 如果有点超出右边界，向右扩展容器
      if (maxX > updatedConfig.w - EDGE_PADDING) {
        updatedConfig.w = maxX + EDGE_PADDING;
        hasChanges = true;
      }

      // 处理下侧边界 - 如果有点超出下边界，向下扩展容器
      if (maxY > updatedConfig.h - EDGE_PADDING) {
        updatedConfig.h = maxY + EDGE_PADDING;
        hasChanges = true;
      }

      // 如果有变化，更新配置
      if (hasChanges) {
        // 创建一个干净的配置对象
        const cleanConfig = JSON.parse(JSON.stringify(updatedConfig));
        delete cleanConfig._fromSvgDrag;

        // 触发更新事件
        this.$emit('update:config', cleanConfig);

        // 通知 Render 组件更新图表配置
        let renderComponent = this.$parent;
        while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
          renderComponent = renderComponent.$parent;
        }

        if (renderComponent) {
          // 调用所有必要的更新方法
          renderComponent.changeChartConfig({
            ...cleanConfig,
            _fromSvgDrag: true
          });

          // 更新活动项配置
          renderComponent.changeActiveItemConfig({
            ...cleanConfig,
            _fromSvgDrag: true
          });

          // 更新活动项的宽高
          renderComponent.changeActiveItemWH({
            code: cleanConfig.code,
            w: cleanConfig.w,
            h: cleanConfig.h,
            x: cleanConfig.x,
            y: cleanConfig.y
          });

          // 保存时间线
          renderComponent.saveTimeLine(`调整${cleanConfig.title || '组件'}大小`);
        }

        // 更新路径和控制点
        this.updatePath();
        this.updateControlPoints();
      }

      // 标记调整大小完成
      setTimeout(() => {
        this.isAdjustingSize = false;
      }, 100);
    },

    findClickedLineSegment(x, y, threshold = 8) {
      for (let i = 0; i < this.points.length - 1; i++) {
        const p1 = this.points[i];
        const p2 = this.points[i + 1];

        // 计算点到线段的距离
        const distance = this.getDistanceToLineSegment(x, y, p1, p2);

        // 如果距离小于阈值，认为点击在这条线段上
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
      let param = 0.5; // 默认在线段中点

      if (lenSq !== 0) {
        param = Math.max(0, Math.min(1, dot / lenSq));
      }

      return {
        x: p1.x + param * C,
        y: p1.y + param * D
      };
    },

    // 通知父组件禁用拖拽
    notifyParentDisableDrag(e) {
      if (this.isEditing) {
        // 阻止事件冒泡，防止触发父组件的拖拽
        e.stopPropagation();

        // 查找父组件中的 Render 组件
        let renderComponent = this.$parent;
        while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
          renderComponent = renderComponent.$parent;
        }

        if (renderComponent && renderComponent.$refs.draggableItems) {
          // 找到当前组件的 vdr 实例
          const currentVdr = renderComponent.$refs.draggableItems.find(
            item => item.id === this.config.code
          );

          if (currentVdr) {
            // 直接设置拖拽禁用状态
            currentVdr.enabled = false;

            // 在鼠标抬起时恢复拖拽
            const enableDrag = () => {
              currentVdr.enabled = true;
              document.removeEventListener('mouseup', enableDrag);
            };

            document.addEventListener('mouseup', enableDrag);
          }
        }
      }
    },

    // 当点被拖动到边界时触发容器调整
    triggerContainerResize(direction, distance) {
      // 查找父组件中的 Render 组件
      let renderComponent = this.$parent;
      while (renderComponent && renderComponent.$options.name !== 'BigScreenRender') {
        renderComponent = renderComponent.$parent;
      }

      if (!renderComponent) return;

      // 找到当前组件对应的 vdr 实例
      const vdrInstances = renderComponent.$refs.draggableItems;
      if (!vdrInstances || !vdrInstances.length) return;

      // 找到当前组件的 vdr 实例
      const currentVdr = vdrInstances.find(item => item.id === this.config.code);
      if (!currentVdr) return;

      // 根据方向模拟不同的拖动
      switch (direction) {
        case 'left':
          // 只有当向左拖动时才调整左边界
          if (distance.x < 0) {
            this.simulateVdrResize(currentVdr, 'ml', distance);
          }
          break;
        case 'right':
          // 只有当向右拖动时才调整右边界
          if (distance.x > 0) {
            this.simulateVdrResize(currentVdr, 'mr', distance);
          }
          break;
        case 'top':
          // 只有当向上拖动时才调整上边界
          if (distance.y < 0) {
            this.simulateVdrResize(currentVdr, 'tm', distance);
          }
          break;
        case 'bottom':
          // 只有当向下拖动时才调整下边界
          if (distance.y > 0) {
            this.simulateVdrResize(currentVdr, 'bm', distance);
          }
          break;
        // 对角线方向也需要类似处理
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

    // 模拟 vdr 组件的拖动调整大小
    simulateVdrResize(vdrInstance, handle, distance) {
      // 标记正在调整大小，防止触发重新初始化
      this.isAdjustingSize = true;

      // 获取 vdr 实例的方法
      const resizeHandleDown = vdrInstance.handleResizeDown;
      const resizeHandleMove = vdrInstance.handleResizeMove;
      const resizeHandleUp = vdrInstance.handleUp;

      if (!resizeHandleDown || !resizeHandleMove || !resizeHandleUp) {
        this.isAdjustingSize = false;
        return;
      }

      // 创建模拟的鼠标事件
      const mouseDownEvent = new MouseEvent('mousedown', {
        clientX: 0,
        clientY: 0,
        bubbles: true
      });

      // 模拟鼠标按下事件
      resizeHandleDown(mouseDownEvent, handle);

      // 模拟鼠标移动事件
      const mouseMoveEvent = new MouseEvent('mousemove', {
        clientX: distance.x,
        clientY: distance.y,
        bubbles: true
      });

      // 模拟鼠标移动
      resizeHandleMove(mouseMoveEvent);

      // 模拟鼠标抬起事件
      const mouseUpEvent = new MouseEvent('mouseup', {
        bubbles: true
      });

      // 模拟鼠标抬起
      resizeHandleUp(mouseUpEvent);

      // 重置标记
      setTimeout(() => {
        this.isAdjustingSize = false;
      }, 100);
    },

    // 更新动画
    updateAnimation() {
      const previousType = this.animation.type;
      
      // 如果从 dash 动画切换到其他类型，先恢复原始样式
      if (previousType === 'dash' && this.animation.type !== 'dash') {
        this.updatePathStyle();
      }

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
        case 'dash':
          this.createDashAnimation();
          break;
        case 'glow':
          this.createGlowAnimation();
          break;
        case 'particle':
          this.createParticleAnimation();
          break;
      }
    },

    clearAnimation() {
      // 先停止并移除所有动画元素
      if (this.animationElements) {
        this.animationElements.forEach(el => el.remove());
      }
      this.animationElements = [];

      // 如果当前不是虚线动画，恢复原始样式
      if (this.path && this.animation.type !== 'dash') {
        this.path.attr({
          'stroke-dasharray': this.dashArray,
          'stroke-dashoffset': 0
        });
      }
    },

    // 创建水流动画
    createFlowAnimation() {
      const flowDot = this.svgDraw.circle(this.animation.flowLength)
        .fill(this.animation.flowColor)
        .center(0, 0)
        .opacity(0.8);

      // 创建动画路径
      const pathLength = this.path.length();

      // 创建动画
      flowDot.animate({
        duration: (11 - this.animation.speed) * 1000,
        ease: '<>'
      }).during((pos) => {
        const point = this.path.pointAt(pos * pathLength);
        flowDot.center(point.x, point.y);
      }).loop(true, false);

      this.animationElements.push(flowDot);
    },

    // 创建虚线移动动画
    createDashAnimation() {
      const dashLength = this.animation.flowLength;
      const totalLength = this.path.length();
      
      // 保存原始的虚线样式
      const originalDashArray = this.dashArray;
      
      // 如果已经是虚线样式，使用现有的虚线长度
      const currentDashArray = originalDashArray !== 'none' ? originalDashArray : `${dashLength},${totalLength}`;

      this.path.attr({
        'stroke-dasharray': currentDashArray,
        'stroke-dashoffset': totalLength
      });

      const animation = this.path.animate({
        duration: (11 - this.animation.speed) * 1000,
        ease: '<>'
      }).attr({
        'stroke-dashoffset': -totalLength
      }).loop(true, false);

      // 将动画添加到动画元素数组中，以便清除
      this.animationElements.push({
        remove: () => {
          animation.stop();
          // 恢复原始虚线样式
          this.path.attr({
            'stroke-dasharray': originalDashArray,
            'stroke-dashoffset': 0
          });
        }
      });
    },

    // 创建粒子动画
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

    createGlowAnimation() {
      // Implementation of createGlowAnimation method
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