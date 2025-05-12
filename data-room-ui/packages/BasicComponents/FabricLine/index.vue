<template>
  <div class="fabric-line-container">
    <div
      ref="drawingArea"
      class="drawing-area"
      :id="containerId"
    ></div>
  </div>
</template>

<script>
// 仅导入SVG.js
import { SVG } from '@svgdotjs/svg.js'
// 导入绘制模式管理器
import DrawModeManager, { DrawModeTypes } from './utils/DrawModeManager'
// 导入拖动状态管理器
import DragStateManager from './utils/DragStateManager'
// 导入点拖动处理工具
import { createPointDragHandler } from './utils/PointDragHandler'
// 新增：导入控制手柄拖动处理工具
import { createControlHandleDragHandler } from './utils/ControlHandleDragHandler'

export default {
  name: 'FabricLine',
  props: {
    config: {
      type: Object,
      required: true
    },
    isEditMode: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      // 编辑器相关数据
      draw: null,
      points: [],
      currentLine: null,
      lines: [],
      isCtrlDown: false,
      initialized: false,
      pathsData: [],
      isDataLoading: false,
      selectedPointIndex: null, // 新增：当前选中点的索引
      controlHandlesGroup: null, // 新增：存放控制柄的SVG分组
      isPointDragging: false,
      activePathIndex: -1,
      svgWidth: 0,
      svgHeight: 0,
      svgRootNode: null, // 新增：存储SVG根DOM节点
      controlHandleDragHandler: null, // 新增：控制手柄拖动处理器
    }
  },
  computed: {
    // 从配置中读取属性
    containerId() {
      return this.config?.customize?.containerId || `drawing-editor-${this._uid}`
    },
    lineColor() {
      return this.config?.customize?.lineColor || '#1890ff'
    },
    lineWidth() {
      return this.config?.customize?.lineWidth || 2
    },
    pointColor() {
      return this.config?.customize?.pointColor || '#f5222d'
    },
    pointRadius() {
      return this.config?.customize?.pointRadius || 5
    },
    // 新增：线条样式相关计算属性
    enableLineDash() {
      return this.config?.customize?.enableLineDash || false;
    },
    lineDashValue() {
      return this.config?.customize?.lineDashValue || 5;
    },
    lineGapValue() {
      return this.config?.customize?.lineGapValue || 5;
    },
    // 新增：线条形状类型
    lineShapeType() {
      return this.config?.customize?.lineShapeType || 'straight';
    }
  },
  watch: {
    'config.customize.lineColor'() {
      this.updateLinesStyle()
    },
    'config.customize.lineWidth'() {
      this.updateLinesStyle()
    },
    // 新增：侦听线条样式变化
    enableLineDash() {
      this.updateLinesStyle();
    },
    lineDashValue() {
      this.updateLinesStyle();
    },
    lineGapValue() {
      this.updateLinesStyle();
    },
    // 新增：侦听线条形状变化
    lineShapeType() {
      this.updateLine(); // 重绘线条以应用新的形状
      this._renderControlHandles(); // 更新控制柄的显示
    },
    selectedPointIndex(newIndex, oldIndex) {
      console.log(`FabricLine.vue: selectedPointIndex changed from ${oldIndex} to ${newIndex}`);
      this._renderControlHandles(); // 更新控制柄的显示
    },
    'config.customize.pointColor'() {
      this.updatePointsStyle()
    },
    'config.customize.pointRadius'() {
      this.updatePointsStyle()
    },
    'config.customize.points': {
      handler(newData, oldData) {
        if (this.isDataLoading) return;
        const oldStr = JSON.stringify(oldData || []);
        const newStr = JSON.stringify(newData || []);
        if (oldStr === newStr) return;
        
        // 当外部点数据变化时，重新加载并计算控制点
        // 我们假设 newData 仍然是 {x, y} 对象的数组，或者包含控制点
        if (newData && Array.isArray(newData) && this.initialized) {
          this.isDataLoading = true;
          this.loadData(newData); // 直接传递 newData
          this.isDataLoading = false;
        } else if (!newData || newData.length === 0) {
          this.clearDrawing();
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initDrawingEditor()
      this.setupCtrlKeyListener();

      // 加载初始点数据
      const initialPoints = this.config?.customize?.points;
      if (initialPoints && initialPoints.length > 0) {
         setTimeout(() => { // 确保SVG容器已准备好
          this.isDataLoading = true;
          this.loadData(initialPoints);
          this.isDataLoading = false;
        }, 200);
      }
      this.setupGlobalMouseEvents();
    })
  },
  beforeDestroy() {
    // updatePathsData 会在销毁前被调用，确保保存了最新的点（包括控制点）
    this.updatePathsData();
    if (this.pointDragHandler) {
      this.pointDragHandler.destroy();
      this.pointDragHandler = null;
    }
    if (this.controlHandleDragHandler) { // 新增：销毁控制手柄拖动处理器
      this.controlHandleDragHandler.destroy();
      this.controlHandleDragHandler = null;
    }
    this.removeCtrlKeyListener();
  },
  created() {
    this.pointDragHandler = createPointDragHandler({
      onDragStart: (index, point) => {
        console.log('拖动点开始', index, point.x, point.y);
        this.isPointDragging = true;
        // 考虑拖拽开始时是否也选中点，以便显示控制柄
        // 如果 onPointClick 没触发，而直接开始拖拽，可能需要在这里选中
        if (this.selectedPointIndex !== index) {
          this.selectedPointIndex = index;
          // this._renderControlHandles(); // selectedPointIndex 的 watch 会处理
        }
      },
      onDrag: (draggedIndex, draggedPointData, deltaX, deltaY) => {
        // console.log('拖动点中 - draggedIndex:', draggedIndex, 'draggedPointData:', draggedPointData);
        if (this.points && this.points[draggedIndex]) {
          // 1. 同步点数据到 index.vue 的 this.points
          this.points[draggedIndex].x = draggedPointData.x;
          this.points[draggedIndex].y = draggedPointData.y;

          // 2. 更新受影响的控制点
          // （注意：_updateControlPointsForPoint 使用的是 this.points，所以必须先同步）
          this._updateControlPointsForPoint(draggedIndex);
          if (draggedIndex > 0) {
             // 如果拖动的是 P1，它的 cp2 可能会影响 P0-P1 段，P1 的 cp1 会影响 P0-P1 段。
             // P1 的 cp2 也会影响 P1-P2 段。
             // P0 的 cp2 已经由 P0 更新。
             // P1 的 cp1 是基于 P0, P1, P2 计算的。
             // P1 的 cp2 是基于 P0, P1, P2 计算的。
             // 所以更新 P1 时，其 cp1 和 cp2 都会重新计算。
             // 对于 P0，其 cp2 会受 P1 移动影响。
             // 对于 P2，其 cp1 会受 P1 移动影响。
            this._updateControlPointsForPoint(draggedIndex - 1);
          }
          if (draggedIndex < this.points.length - 1) {
            this._updateControlPointsForPoint(draggedIndex + 1);
          }
          
          // 3. 重绘线条 (drawLinePath 会使用更新后的 this.points 包括控制点)
          this.drawLinePath();

          // 4. 如果被拖动的点是当前选中的点，实时更新其控制柄的视觉位置
          //    _renderControlHandles 会读取 this.points[this.selectedPointIndex] 的 cp1/cp2
          if (this.selectedPointIndex === draggedIndex) {
            this._renderControlHandles();
          }
        }
      },
      onDragEnd: (index) => {
        console.log('拖动点结束，索引:', index);
        this.isPointDragging = false;
        // 确保拖拽结束后点仍然是选中的，以保持控制柄显示
        if (this.selectedPointIndex !== index && this.points[index]) { // 检查点是否存在
           this.selectedPointIndex = index;
        } else if (!this.points[index]) { // 如果点被意外删除了
           this.selectedPointIndex = null;
        }
        // this._renderControlHandles(); // selectedPointIndex 的 watch 会处理

        // 更新完整数据结构并保存
        this.updatePathsData(); // 使用 index.vue 自己的 updatePathsData
        this.$emit('pointDragEnd', { pointIndex: index }); // 简化事件数据
      },
      onPointClick: (index) => {
        console.log('FabricLine.vue: Point clicked, index:', index);
        this.selectedPointIndex = index;
        // _renderControlHandles() 会被 selectedPointIndex 的 watcher 调用
        this.$emit('pointClick', { pointIndex: index }); // 简化事件数据
      },
      isOverallEditModeActive: () => this.isEditMode,
      getCtrlKeyState: () => this.isCtrlDown,
      // updateLine 现在由 onDrag 内部调用 this.drawLinePath() 处理
      // updateLine: this.drawLinePath, // 可以移除或留空
      updatePathsData: this.updatePathsData, // 这个主要用在 onDragEnd
      onContainerResize: this.handleContainerResize,
      dragThreshold: 5,
    });

    // 初始化控制手柄拖动处理器
    this.controlHandleDragHandler = createControlHandleDragHandler({
      getPointsArray: () => this.points,
      getSvgContainer: () => this.draw, // 传递SVG.js的draw实例
      isEditModeActive: () => this.isEditMode,
      onDragStart: (mainPointIndex, handleType) => {
        console.log(`ControlHandleDrag: Start dragging ${handleType} of point ${mainPointIndex}`);
        // 可以在此设置一个表示"正在拖动手柄"的状态，如果需要的话
      },
      onDrag: (mainPointIndex, handleType, newX, newY) => {
        if (!this.points[mainPointIndex]) return;

        // 1. 更新Vue组件数据中的控制点坐标
        if (handleType === 'cp1') {
          this.points[mainPointIndex].cp1x = newX;
          this.points[mainPointIndex].cp1y = newY;
        } else if (handleType === 'cp2') {
          this.points[mainPointIndex].cp2x = newX;
          this.points[mainPointIndex].cp2y = newY;
        }
        // console.log(`ControlHandleDrag: Dragging ${handleType} of point ${mainPointIndex} to`, newX, newY);
        // console.log('Updated points data:', JSON.parse(JSON.stringify(this.points[mainPointIndex])));

        // 2. 重绘线条，使用更新后的控制点
        this.drawLinePath();

        // 3. 重绘控制手柄（因为主锚点没动，但手柄本身及其连接线需要更新）
        //    确保 _renderControlHandles 使用的是最新的 this.points 数据
        this._renderControlHandles();
      },
      onDragEnd: (mainPointIndex, handleType) => {
        console.log(`ControlHandleDrag: End dragging ${handleType} of point ${mainPointIndex}`);
        // 4. 保存更新后的路径数据（包含新的控制点坐标）
        this.updatePathsData();
      }
    });
  },
  methods: {
    setupCtrlKeyListener() {
      this._handleKeyDown = (event) => {
        if (event.key === 'Control') {
          if (!this.isCtrlDown) {
            this.isCtrlDown = true;
            console.log('FabricLine DEBUG: Ctrl key DOWN, isCtrlDown = true');
            if (this.isEditMode) this.$emit('drawing-started');
          }
        }
      };
      this._handleKeyUp = (event) => {
        if (event.key === 'Control') {
          if (this.isCtrlDown) {
            this.isCtrlDown = false;
            console.log('FabricLine DEBUG: Ctrl key UP, isCtrlDown = false');
            if (this.isEditMode) this.$emit('drawing-completed', this.pathsData);
          }
        }
      };
      window.addEventListener('keydown', this._handleKeyDown);
      window.addEventListener('keyup', this._handleKeyUp);
      console.log('FabricLine DEBUG: Ctrl key listeners ADDED');
    },
    removeCtrlKeyListener() {
      if (this._handleKeyDown) window.removeEventListener('keydown', this._handleKeyDown);
      if (this._handleKeyUp) window.removeEventListener('keyup', this._handleKeyUp);
      console.log('FabricLine DEBUG: Ctrl key listeners REMOVED');
    },
    handleClick(event) {
      console.log(
        'FabricLine handleClick ---- isEditMode (prop):', this.isEditMode, 
        'isCtrlDown (data):', this.isCtrlDown,
        'event.target:', event.target,
        'svgRootNode:', this.svgRootNode
      );

      // 如果点击的是SVG画布背景（不是点或控制柄），并且处于编辑模式，且没有按住Ctrl键，则取消选中点
      if (this.isEditMode && event.target === this.svgRootNode && !this.isCtrlDown) {
        console.log('FabricLine DEBUG: Click on SVG background. Deselecting point.');
        this.selectedPointIndex = null; // 这将触发侦听器并移除控制手柄
        return; // 操作完成，直接返回
      }

      if (!this.isEditMode) {
        console.log('FabricLine DEBUG: handleClick - Not in edit mode (prop is false). Aborting.');
        return;
      }

      if (!this.isCtrlDown) {
        console.log('FabricLine DEBUG: handleClick - In edit mode, but Ctrl key is UP. Aborting add point.');
        return;
      }
      
      console.log('FabricLine DEBUG: handleClick - In edit mode AND Ctrl key is DOWN. Proceeding to add point.');
      const point = this.draw.point(event.clientX, event.clientY);
      const addedOnLine = this.addPointOnLine(point.x, point.y);
      if (!addedOnLine) {
        this.addPoint(point.x, point.y);
      }
      this.updatePathsData();
    },
    initDrawingEditor() {
      try {
        const container = document.getElementById(this.containerId)
        if (!container && this.$refs.drawingArea) {
          this.$refs.drawingArea.id = this.containerId
        }
        this.draw = SVG().addTo(`#${this.containerId}`).size('100%', '100%')
        this.svgRootNode = this.draw.node; // 存储SVG根节点
        this.draw.on('click', this.handleClick)
        this.initialized = true
      } catch (err) {
        console.error('初始化绘图编辑器失败:', err)
      }
    },
    addPoint(x, y) {
      if (!this.draw) return;
      console.log('addPoint: 添加锚点:', x, y);
      const pointElement = this.draw.circle(this.pointRadius * 2)
        .center(x, y)
        .fill(this.pointColor);
      
      const newPointData = { 
        x, 
        y, 
        element: pointElement,
        // 控制点初始为空，将在 _addPointAndUpdateControls 中计算
      };

      this.points.push(newPointData);
      const pointIndex = this.points.length - 1;

      // 计算并设置新点及其相邻点的控制点
      this._recalculateAllControlPoints();

      pointElement.on('mousedown', (e) => {
        // 阻止事件传播，避免触发全局 mousedown 导致意外创建新线条
        e.stopPropagation(); 
        // e.preventDefault(); // mousedown 上 preventDefault 可能阻止后续的 click 或 dblclick

        // 点的拖动逻辑现在完全由 PointDragHandler 处理
        this.pointDragHandler.handlePointMouseDown(e, pointIndex, this.points);
        
        // 不在这里直接设置 selectedPointIndex，移到 onPointClick 回调中
        // this.selectedPointIndex = pointIndex; 
        // this._renderControlHandles(); 
      });
      pointElement.on('click', (e) => e.stopPropagation());
      
      if (this.points.length >= 2) this.updateLine();
      this.updatePathsData(); // 保存包括新计算的控制点的数据
    },
    addPointOnLine(x, y) {
      if (!this.currentLine || this.points.length < 2) return false;
      console.log('addPointOnLine: 尝试在线段上添加点:', x, y);
      const segments = [];
      for (let i = 0; i < this.points.length - 1; i++) {
        segments.push({ start: this.points[i], end: this.points[i + 1], index: i });
      }
      const threshold = 10;
      let minDistance = Infinity;
      let targetSegment = null;
      segments.forEach(segment => {
        const distance = this.distanceToSegment({ x, y }, segment.start, segment.end);
        if (distance < minDistance && distance < threshold) {
          minDistance = distance;
          targetSegment = segment;
        }
      });
      if (targetSegment) {
        const pointElement = this.draw.circle(this.pointRadius * 2).move(x - this.pointRadius, y - this.pointRadius).fill(this.pointColor);
        const newPointData = { x, y, element: pointElement }; // 控制点稍后计算
        const insertIndex = targetSegment.index + 1;
        
        this.points.splice(insertIndex, 0, newPointData);
        
        // 重新计算所有控制点
        this._recalculateAllControlPoints();

        // 更新所有点的 mousedown 监听器，因为索引变了，并且要加入选中逻辑
        this.points.forEach((p, idx) => {
          if (p.element) {
            p.element.off('mousedown'); 
            p.element.on('mousedown', (e) => {
              e.stopPropagation();
              this.selectedPointIndex = idx; // 选中这个点
              if (this.pointDragHandler) {
                this.pointDragHandler.handlePointMouseDown(e, idx, this.points);
              }
            });
          }
        });
        
        this.updateLine();
        this.updatePathsData(); // 保存更新后的点（包括控制点）
        return true;
      }
      return false;
    },
    distanceToSegment(p, v, w) {
      const l2 = Math.pow(w.x - v.x, 2) + Math.pow(w.y - v.y, 2);
      if (l2 === 0) return Math.sqrt(Math.pow(p.x - v.x, 2) + Math.pow(p.y - v.y, 2));
      let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      const projX = v.x + t * (w.x - v.x);
      const projY = v.y + t * (w.y - v.y);
      return Math.sqrt(Math.pow(p.x - projX, 2) + Math.pow(p.y - projY, 2));
    },
    drawLinePath() {
      if (!this.draw || this.points.length < 1) {
        if (this.currentLine) this.currentLine.remove();
        this.currentLine = null;
        return;
      }
      if (this.currentLine) this.currentLine.remove();
      
      let path = '';
      // 注意：现在我们直接使用 this.points 数组，它应该包含计算好的控制点
      const pts = this.points; 

      if (pts.length < 2) {
        if (this.currentLine) this.currentLine.remove();
        this.currentLine = null;
        return;
      }

      switch (this.lineShapeType) {
        case 'cubicBezier':
          path = `M${pts[0].x},${pts[0].y}`;
          if (pts.length === 2) { // 如果只有两个点，画直线 (或者使用简单的曲线)
             // 对于两点曲线，需要确保 pts[0].cp2x/y 和 pts[1].cp1x/y 已被正确计算
             if (pts[0].cp2x != null && pts[1].cp1x != null) {
                path += ` C${pts[0].cp2x},${pts[0].cp2y} ${pts[1].cp1x},${pts[1].cp1y} ${pts[1].x},${pts[1].y}`;
             } else { // 回退到直线
                path += ` L${pts[1].x},${pts[1].y}`;
             }
          } else {
            for (let i = 0; i < pts.length - 1; i++) {
              const p1 = pts[i];
              const p2 = pts[i+1];
              // 确保控制点存在
              if (p1.cp2x != null && p1.cp2y != null && p2.cp1x != null && p2.cp1y != null) {
                 if (i === 0) {
                    path = `M${p1.x},${p1.y} C${p1.cp2x},${p1.cp2y} ${p2.cp1x},${p2.cp1y} ${p2.x},${p2.y}`;
                 } else {
                    // 对于S命令，它需要前一个C命令的第二个控制点来计算反射。
                    // 如果我们总是用C命令，并确保每个点（除了首尾）都有cp1和cp2，逻辑会更直接。
                    // 或者，确保 p1.cp2x, p1.cp2y 和 p2.cp1x, p2.cp1y 是针对 p1到p2段的正确控制点
                    // 第一个锚点的 cp2 和 第二个锚点的 cp1 构成第一段曲线
                    // 第二个锚点的 cp2 和 第三个锚点的 cp1 构成第二段曲线 ...
                    path += ` C${p1.cp2x},${p1.cp2y} ${p2.cp1x},${p2.cp1y} ${p2.x},${p2.y}`;
                 }
              } else {
                // 如果控制点缺失，回退到画直线段 (或者抛出错误/警告)
                console.warn(`Missing control points for cubic Bezier segment from point ${i} to ${i+1}. Drawing line.`);
                if (i===0) path = `M${p1.x},${p1.y}`; // 确保路径以M开头
                path += ` L${p2.x},${p2.y}`;
              }
            }
          }
          break;
        case 'stepBefore':
          path = `M${pts[0].x},${pts[0].y}`;
          for (let i = 0; i < pts.length - 1; i++) {
            path += ` L${pts[i+1].x},${pts[i].y} L${pts[i+1].x},${pts[i+1].y}`;
          }
          break;
        case 'stepAfter':
          path = `M${pts[0].x},${pts[0].y}`;
          for (let i = 0; i < pts.length - 1; i++) {
            path += ` L${pts[i].x},${pts[i+1].y} L${pts[i+1].x},${pts[i+1].y}`;
          }
          break;
        case 'stepMiddle':
          path = `M${pts[0].x},${pts[0].y}`;
          for (let i = 0; i < pts.length - 1; i++) {
            const midX = (pts[i].x + pts[i+1].x) / 2;
            path += ` L${midX},${pts[i].y} L${midX},${pts[i+1].y} L${pts[i+1].x},${pts[i+1].y}`;
          }
          break;
        case 'straight':
        default:
          path = `M${pts[0].x},${pts[0].y}`;
          for (let i = 1; i < pts.length; i++) {
            path += ` L${pts[i].x},${pts[i].y}`;
          }
          break;
      }

      try {
        const strokeAttrs = {
          color: this.lineColor,
          width: this.lineWidth
        };
        if (this.enableLineDash && this.lineDashValue > 0 && this.lineGapValue > 0) {
          strokeAttrs.dasharray = `${this.lineDashValue},${this.lineGapValue}`;
        } else {
          strokeAttrs.dasharray = 'none';
        }
        // console.log('FabricLine.vue: Updating line style with attributes:', JSON.parse(JSON.stringify(strokeAttrsToApply)));
        // 在应用新路径之前移除旧线（如果存在），确保 currentLine 在此作用域内被正确处理
        if (this.currentLine) {
          this.currentLine.remove();
        }
        this.currentLine = this.draw.path(path).fill('none').stroke(strokeAttrs);
        this.currentLine.back();
      } catch (err) { 
        console.error('线段绘制失败:', err, 'Path:', path, 'Type:', this.lineShapeType);
        if (this.currentLine) {
          this.currentLine.remove();
          this.currentLine = null;
        } 
      }
    },
    updateLine() {
      this.drawLinePath();
      this.updatePathsData();
    },
    updateLinesStyle() {
      const strokeAttrsToApply = {
        color: this.lineColor,
        width: this.lineWidth
      };
      if (this.enableLineDash && this.lineDashValue > 0 && this.lineGapValue > 0) {
        strokeAttrsToApply.dasharray = `${this.lineDashValue},${this.lineGapValue}`;
      } else {
        strokeAttrsToApply.dasharray = 'none';
      }

      console.log('FabricLine.vue: Updating line style with attributes:', JSON.parse(JSON.stringify(strokeAttrsToApply)));

      if (this.currentLine) {
        this.currentLine.stroke(strokeAttrsToApply);
      }
      // 注意: this.lines 数组似乎用于存储已完成的多段线条，如果存在，也需要更新
      // 目前的实现主要集中在 this.currentLine 上
      // 如果 this.lines 也需要实时更新样式，这里的逻辑需要扩展
      this.lines.forEach(line => { 
        if (line.path) { 
          // 使用相同的 strokeAttrsToApply 对象，因为属性是一致的
          line.path.stroke(strokeAttrsToApply);
        }
      });
    },
    updatePointsStyle() {
      this.points.forEach(point => { if (point.element) point.element.radius(this.pointRadius).fill(this.pointColor).move(point.x - this.pointRadius, point.y - this.pointRadius) });
      this.lines.forEach(line => line.points.forEach(p => { if (p.element) p.element.radius(this.pointRadius).fill(this.pointColor).move(p.x - this.pointRadius, p.y - this.pointRadius) }));
    },
    clearDrawing() {
      this.points.forEach(point => { if (point.element) point.element.remove() });
      this.lines.forEach(line => { if (line.path) line.path.remove() });
      if (this.currentLine) this.currentLine.remove();
      if (this.controlHandlesGroup) { // 清除控制柄
        this.controlHandlesGroup.remove();
        this.controlHandlesGroup = null;
      }
      this.points = []; this.lines = []; this.currentLine = null; this.pathsData = [];
      this.selectedPointIndex = null; // 重置选中点
      if (this.config) {
        const currentCustomize = this.config.customize || {};
        this.$emit('update:config', { ...this.config, customize: { ...currentCustomize, points: [] } });
      }
      this.$emit('drawing-cleared');
    },
    updatePathsData() {
      if (this.isDataLoading) return;
      
      // 确保 this.points 中的 x,y 与 element 的实际位置同步
      this.points.forEach((pointData) => {
        if (pointData.element && typeof pointData.element.cx === 'function') {
          pointData.x = pointData.element.cx();
          pointData.y = pointData.element.cy();
        }
      });

      // 现在 this.points 数组中的每个对象应该包含 x, y 以及 cp1x, cp1y, cp2x, cp2y (如果适用)
      // 我们将整个这个丰富的对象数组（或其一个副本）保存到 config.customize.points
      // 但要注意只选择需要的字段，避免循环引用SVG element
      const pointsToSave = this.points.map(p => {
        const savedPoint = { x: p.x, y: p.y };
        if (p.cp1x != null) savedPoint.cp1x = p.cp1x;
        if (p.cp1y != null) savedPoint.cp1y = p.cp1y;
        if (p.cp2x != null) savedPoint.cp2x = p.cp2x;
        if (p.cp2y != null) savedPoint.cp2y = p.cp2y;
        // if (p.type != null) savedPoint.type = p.type; // 如果添加了type
        return savedPoint;
      });

      this.pathsData = pointsToSave; // pathsData 现在也存储丰富对象

      if (this.config) {
        if (!this.config.customize) this.config.customize = {};
        // 保存包含控制点的完整点数据
        this.config.customize.points = pointsToSave; 
        this.$emit('update:config', {...this.config});
      }
    },
    getData() {
      const lineData = this.lines.map(line => ({ points: line.points.map(p => ({ x: p.x, y: p.y })) }));
      if (this.currentLine && this.points.length >= 2) lineData.push({ points: this.points.map(p => ({ x: p.x, y: p.y })) });
      return { lines: lineData };
    },
    loadData(data) { // data is an array of points, potentially with or without control points
      this.clearDrawing();
      if (!data || !Array.isArray(data)) return;
      
      try {
        // 将传入的点数据转换为内部使用的丰富点对象结构
        const richPointsData = data.map(p_in => ({
          x: p_in.x,
          y: p_in.y,
          // 如果输入数据包含控制点，则使用它们，否则留空待计算
          cp1x: p_in.cp1x,
          cp1y: p_in.cp1y,
          cp2x: p_in.cp2x,
          cp2y: p_in.cp2y,
          // type: p_in.type // 如果有type
          element: null // element 将在下面创建
        }));

        this.points = richPointsData; // 先用丰富结构（但无element）填充

        // 现在创建SVG元素并将它们附加到点对象上
        // 并且，如果控制点缺失，此时是计算它们的好时机
        this.points.forEach((pData, i) => {
          const pointElement = this.draw.circle(this.pointRadius * 2)
            .center(pData.x, pData.y)
            .fill(this.pointColor);
          pData.element = pointElement; // 关联SVG元素

          pointElement.on('mousedown', (e) => {
            e.stopPropagation();
            if (this.pointDragHandler) this.pointDragHandler.handlePointMouseDown(e, i, this.points);
          });
          pointElement.on('click', (e) => e.stopPropagation());
        });

        // 在所有点都已加入 this.points 并拥有 element 后，计算/重新计算所有控制点
        this._recalculateAllControlPoints(); 

        if (this.points.length >= 1) { // 至少一个点就可以尝试更新（虽然线可能不画）
          this.updateLine(); // 这会调用 drawLinePath，它现在使用存储的控制点
          this.updatePathsData(); // 确保初始加载的数据（现在带有控制点）被正确地更新回 config
        }
      } catch (err) { console.error('加载数据失败:', err); }
    },
    setupGlobalMouseEvents() {
      const handleGlobalMouseMove = (event) => {
        if (this.pointDragHandler && this.pointDragHandler.isDragging()) {
          console.log('全局鼠标移动事件捕获');
        }
      };
      const handleGlobalMouseUp = (event) => {
        if (this.pointDragHandler && this.pointDragHandler.isDragging()) {
          console.log('全局鼠标松开事件捕获，确保拖动结束');
        }
      };
      document.addEventListener('mousemove', handleGlobalMouseMove, { capture: true });
      document.addEventListener('mouseup', handleGlobalMouseUp, { capture: true });
      this.$once('hook:beforeDestroy', () => {
        document.removeEventListener('mousemove', handleGlobalMouseMove, { capture: true });
        document.removeEventListener('mouseup', handleGlobalMouseUp, { capture: true });
      });
    },
    handleContainerResize(newWidth, newHeight) {
      console.log(`FabricLine.vue: handleContainerResize called with newWidth=${newWidth}, newHeight=${newHeight}`);
      if (this.$refs.drawingArea) {
        const currentWidth = parseFloat(this.$refs.drawingArea.style.width) || this.$refs.drawingArea.clientWidth;
        const currentHeight = parseFloat(this.$refs.drawingArea.style.height) || this.$refs.drawingArea.clientHeight;

        let updateNeeded = false;
        let finalWidth = currentWidth;
        let finalHeight = currentHeight;

        if (newWidth > currentWidth) {
          finalWidth = newWidth;
          this.$refs.drawingArea.style.width = `${finalWidth}px`;
          updateNeeded = true;
          console.log(`FabricLine.vue: Updated drawingArea width to ${finalWidth}px`);
        }
        if (newHeight > currentHeight) {
          finalHeight = newHeight;
          this.$refs.drawingArea.style.height = `${finalHeight}px`;
          updateNeeded = true;
          console.log(`FabricLine.vue: Updated drawingArea height to ${finalHeight}px`);
        }

        if (updateNeeded) {
          this.$nextTick(() => {
            if (this.draw) {
              // SVG.js 的 size('100%', '100%') 会自动适应父元素的新尺寸，
              // 但有时显式调用 viewbox() 或 size() 可能有助于强制重绘或解决某些边界情况。
              // 不过通常不需要，因为SVG已经设置为100%x100%。
              // this.draw.size(finalWidth, finalHeight); // 通常不需要
            }
            const newConfig = {
              ...this.config,
              w: finalWidth,
              h: finalHeight,
            };
            this.$emit('update:config', newConfig);
            console.log('FabricLine.vue: Emitted update:config with new dimensions:', newConfig.w, newConfig.h);
          });
        }
      } else {
        console.warn('FabricLine.vue: handleContainerResize - this.$refs.drawingArea is not available.');
      }
    },
    // --- 辅助函数：计算贝塞尔曲线控制点 (参考 Francois Romain 的文章) ---
    _controlPoint(current, previous, next, reverse, smoothing = 0.2) {
      const p = previous || current;
      const n = next || current;
      const o = {
        x: p.x + (n.x - p.x) * 0.5,
        y: p.y + (n.y - p.y) * 0.5
      };
      const angle = Math.atan2(p.y - o.y, p.x - o.x) + (reverse ? Math.PI : 0);
      const length = Math.sqrt(Math.pow(p.x - o.x, 2) + Math.pow(p.y - o.y, 2)) * smoothing;
      const x = o.x + Math.cos(angle) * length;
      const y = o.y + Math.sin(angle) * length;
      return [x, y];
    },
    // 新的辅助方法，用于更新指定索引点的控制点
    // 以及可能影响到的其邻近点的控制点
    _updateControlPointsForPoint(index) {
      if (index < 0 || index >= this.points.length) return;

      const targetPoint = this.points[index];
      const prevPoint = this.points[index - 1];
      const nextPoint = this.points[index + 1];
      const prevPrevPoint = this.points[index - 2];
      const nextNextPoint = this.points[index + 2];

      // 更新目标点的 cp1 (如果不是第一个点)
      if (prevPoint) {
        const [cp1x, cp1y] = this._controlPoint(targetPoint, prevPoint, nextPoint, true, 0.2); // cp1 is for curve segment ending at targetPoint
        targetPoint.cp1x = cp1x;
        targetPoint.cp1y = cp1y;
      } else {
        delete targetPoint.cp1x;
        delete targetPoint.cp1y;
      }

      // 更新目标点的 cp2 (如果不是最后一个点)
      if (nextPoint) {
        const [cp2x, cp2y] = this._controlPoint(targetPoint, prevPoint, nextPoint, false, 0.2); // cp2 is for curve segment starting at targetPoint
        targetPoint.cp2x = cp2x;
        targetPoint.cp2y = cp2y;
      } else {
        delete targetPoint.cp2x;
        delete targetPoint.cp2y;
      }

      // 特殊处理：对于路径的起点和终点，其控制点计算方式可能需要简化
      // 例如，起点的cp2可以基于起点和第二个点来计算，终点的cp1可以基于终点和倒数第二个点
      if (this.points.length > 1) {
        if (index === 0) { // 起点
          const [cp2x, cp2y] = this._controlPoint(this.points[0], this.points[0], this.points[1], false, 0.1);
          this.points[0].cp2x = cp2x;
          this.points[0].cp2y = cp2y;
          delete this.points[0].cp1x;
          delete this.points[0].cp1y;
        }
        if (index === this.points.length - 1 && this.points.length > 1) { // 终点
          const pLast = this.points[this.points.length-1];
          const pSecondLast = this.points[this.points.length -2];
          const [cp1x, cp1y] = this._controlPoint(pLast, pSecondLast, pLast, true, 0.1);
          pLast.cp1x = cp1x;
          pLast.cp1y = cp1y;
          delete pLast.cp2x;
          delete pLast.cp2y;
        }
      } else if (this.points.length === 1) { // 只有一个点
        delete targetPoint.cp1x;
        delete targetPoint.cp1y;
        delete targetPoint.cp2x;
        delete targetPoint.cp2y;
      }
    },

    // 批量更新所有点的控制点
    _recalculateAllControlPoints() {
      if (this.points.length < 2) {
        if(this.points.length === 1) {
          delete this.points[0].cp1x; delete this.points[0].cp1y;
          delete this.points[0].cp2x; delete this.points[0].cp2y;
        }
        return;
      }
      for (let i = 0; i < this.points.length; i++) {
        this._updateControlPointsForPoint(i);
      }
    },

    // --- 新增：渲染控制柄 ---
    _renderControlHandles() {
      console.log(`FabricLine.vue: _renderControlHandles called. lineShapeType: ${this.lineShapeType}, selectedPointIndex: ${this.selectedPointIndex}`);
      if (this.controlHandlesGroup) {
        this.controlHandlesGroup.remove();
        this.controlHandlesGroup = null;
      }

      if (this.lineShapeType !== 'cubicBezier' || this.selectedPointIndex === null || !this.draw) {
        console.log('FabricLine.vue: _renderControlHandles - conditions not met, returning.');
        return;
      }
      console.log('FabricLine.vue: _renderControlHandles - conditions met, proceeding to render.');

      const point = this.points[this.selectedPointIndex];
      if (!point) return;

      this.controlHandlesGroup = this.draw.group();
      const handleRadius = Math.max(2, this.pointRadius / 2);
      const handleColor = '#00a8ff'; // 可以配置
      const lineColor = 'rgba(0, 168, 255, 0.5)'; // 可以配置

      // 绘制控制点1 (cp1) 和连接线
      if (point.cp1x != null && point.cp1y != null) {
        this.controlHandlesGroup.line(point.x, point.y, point.cp1x, point.cp1y)
          .stroke({ width: 1, color: lineColor, dasharray: '2,2' });
        const cp1Handle = this.controlHandlesGroup.circle(handleRadius * 2)
          .center(point.cp1x, point.cp1y)
          .fill(handleColor)
          .stroke({ width: 1, color: '#fff' });
        
        // 为cp1Handle添加mousedown监听器
        cp1Handle.on('mousedown', (event) => {
          if (this.controlHandleDragHandler) {
            // event.stopPropagation(); // ControlHandleDragHandler内部会做
            this.controlHandleDragHandler.handleMouseDown(event, this.selectedPointIndex, 'cp1');
          }
        });
      }

      // 绘制控制点2 (cp2) 和连接线
      if (point.cp2x != null && point.cp2y != null) {
        this.controlHandlesGroup.line(point.x, point.y, point.cp2x, point.cp2y)
          .stroke({ width: 1, color: lineColor, dasharray: '2,2' });
        const cp2Handle = this.controlHandlesGroup.circle(handleRadius * 2)
          .center(point.cp2x, point.cp2y)
          .fill(handleColor)
          .stroke({ width: 1, color: '#fff' });

        // 为cp2Handle添加mousedown监听器
        cp2Handle.on('mousedown', (event) => {
          if (this.controlHandleDragHandler) {
            // event.stopPropagation(); // ControlHandleDragHandler内部会做
            this.controlHandleDragHandler.handleMouseDown(event, this.selectedPointIndex, 'cp2');
          }
        });
      }
      // 确保控制柄在最前面，或者至少在锚点之上
      if(point.element) {
        this.controlHandlesGroup.front(); 
        // point.element.front(); // 确保锚点也在前面，如果需要
      }
    },
    _updateLine(line, points, lineShapeType) {
      // Implementation of _updateLine method
    },
    updatePathsDataToConfig() {
      // Implementation of updatePathsDataToConfig method
    }
  }
}
</script>

<style scoped>
.fabric-line-container {
  width: 100%;
  height: 100%;
  position: relative;
}

.drawing-area {
  width: 100%;
  height: 100%;
  background-color: transparent;
  position: relative;
}

.debug-panel {
  position: absolute;
  bottom: 5px;
  right: 5px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 10000;
}

.debug-panel button {
  margin: 5px;
  padding: 3px 6px;
  background: #1890ff;
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
}

.debug-panel button:hover {
  background: #40a9ff;
}
</style>
