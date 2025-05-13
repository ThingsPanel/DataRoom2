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
// 新增：导入几何工具函数
import { controlPoint, distanceToSegment, distanceToSegmentSq } from './utils/geometryUtils'
// 新增：导入动画工具函数
import { startDropletAnimation, startFlowAnimation } from './utils/animationUtils'
// 新增：导入布局工具函数 (更新导入的函数名)
import { calculateLayoutUpdate } from './utils/layoutUtils'

const PADDING = 10; // <--- 重新添加 PADDING 常量

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
  data() {
    return {
      // 编辑器相关数据
      draw: null,
      points: [],
      currentLine: null,
      lines: [],
      isCtrlDown: false,
      isAltDown: false,
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
      // --- 动画相关状态 ---
      animationElements: [],
      animationRunners: [], // 用于存储SVG.js动画的runner对象
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
    },
    // --- 动画计算属性 ---
    animationActive() {
      return this.config?.customize?.animationActive || false;
    },
    animationType() {
      return this.config?.customize?.animationType || 'none';
    },
    animationDirection() {
      return this.config?.customize?.animationDirection || 'forward';
    },
    animationSpeed() {
      // 确保速度有一个合理的默认值且大于0
      const speed = this.config?.customize?.animationSpeed;
      return typeof speed === 'number' && speed > 0 ? speed : 1;
    },
    animationLoop() {
      return this.config?.customize?.animationLoop === undefined ? true : !!this.config.customize.animationLoop;
    },
    dropletColor() {
      return this.config?.customize?.dropletColor || '#40a9ff';
    },
    dropletSize() {
      return this.config?.customize?.dropletSize || 3;
    },
    flowColor() {
      return this.config?.customize?.flowColor || '#40a9ff';
    },
    flowThickness() {
      return this.config?.customize?.flowThickness || this.lineWidth; // 默认同线条宽度
    },
    flowDensity() {
      // 密度转换为虚线长度，确保是正数
      const density = this.config?.customize?.flowDensity;
      return typeof density === 'number' && density > 0 ? density : 10;
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
      this._renderControlHandles();
      // --- 切换形状后重新计算布局并更新 (传入 PADDING) ---
      const layoutUpdateResult = calculateLayoutUpdate(this.points, this.config, this.lineShapeType, this.lineWidth, this.pageWidth, this.pageHeight, PADDING);
      if (layoutUpdateResult) {
        // 更新内部 points 数组为新的相对坐标
        this.points = layoutUpdateResult.relativePoints.map((rp, idx) => {
          const existingPoint = this.points[idx]; 
          return { 
            ...existingPoint,
            ...rp
          }; 
        });

        // 手动更新 SVG 点元素的位置
        this.points.forEach(p => {
          if (p.element && typeof p.element.center === 'function') {
            p.element.center(p.x, p.y); 
          }
        });

        // 重新绘制线条 (使用更新后的点)
        this.drawLinePath(); 
        
        // 更新控制柄 (确保在正确的位置)
        this._renderControlHandles(); 

        // 发出带有新布局和相对点信息的事件
        this.$emit('bounds-update', layoutUpdateResult); 
      } else if (this.points.length > 0) {
         // 如果没有布局结果（例如点数组为空），至少重绘一下以防万一
         this.drawLinePath();
      }
      // --- 结束新增逻辑 ---
      
      this._updateAnimation(); // 线条形状变化，更新动画
    },
    selectedPointIndex(newIndex, oldIndex) {
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
        const currentLocalPoints = this.points.map(p => ({
          x: p.x, y: p.y, 
          cp1x: p.cp1x, cp1y: p.cp1y, cp1UserSet: p.cp1UserSet || false,
          cp2x: p.cp2x, cp2y: p.cp2y, cp2UserSet: p.cp2UserSet || false
        }));
        const localPointsStr = JSON.stringify(currentLocalPoints);
        const newPointsStr = JSON.stringify(newData || []);

        if (localPointsStr === newPointsStr) {
          return;
        }
        
        if (newData && Array.isArray(newData) && this.initialized) {
          this.loadData(newData);
        } else if (!newData || newData.length === 0) {
          if (this.points.length > 0) { 
            this.clearDrawing();
          }
        }
      },
      deep: true
    },
    // --- 动画相关侦听 ---
    animationActive(isActive) {
      this._updateAnimation();
    },
    animationType() {
      this._updateAnimation();
    },
    animationDirection() {
      this._updateAnimation();
    },
    animationSpeed() {
      this._updateAnimation();
    },
    animationLoop() {
      this._updateAnimation();
    },
    dropletColor() {
      if (this.animationActive && this.animationType === 'droplet') {
        this._updateAnimation();
      }
    },
    dropletSize() {
      if (this.animationActive && this.animationType === 'droplet') {
        this._updateAnimation();
      }
    },
    flowColor() {
      if (this.animationActive && this.animationType === 'flow') {
        this._updateAnimation();
      }
    },
    flowThickness() {
      if (this.animationActive && this.animationType === 'flow') {
        this._updateAnimation();
      }
    },
    flowDensity() {
      if (this.animationActive && this.animationType === 'flow') {
        this._updateAnimation();
      }
    },
    currentLine(newLine, oldLine) {
      // 当线条本身发生变化时（例如重绘），也需要更新动画
      this._updateAnimation();
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initDrawingEditor()
      this.setupKeyboardListeners();

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
    this._clearAnimation(); // 清理动画元素和控制器
    if (this.pointDragHandler) {
      this.pointDragHandler.destroy();
      this.pointDragHandler = null;
    }
    if (this.controlHandleDragHandler) { // 新增：销毁控制手柄拖动处理器
      this.controlHandleDragHandler.destroy();
      this.controlHandleDragHandler = null;
    }
    this.removeKeyboardListeners();
  },
  created() {
    this.pointDragHandler = createPointDragHandler({
      onDragStart: (index, point) => {
        this.isPointDragging = true;
        if (this.selectedPointIndex !== index) {
          this.selectedPointIndex = index;
        }
      },
      onDrag: (draggedIndex, draggedPointData, deltaX, deltaY) => {
        if (this.points && this.points[draggedIndex]) {
          this.points[draggedIndex].x = draggedPointData.x;
          this.points[draggedIndex].y = draggedPointData.y;

          const pointToUpdateControls = this.points[draggedIndex];
          
          this._updateControlPointsForPoint(draggedIndex);
          if (draggedIndex > 0) {
            this._updateControlPointsForPoint(draggedIndex - 1);
          }
          if (draggedIndex < this.points.length - 1) {
            this._updateControlPointsForPoint(draggedIndex + 1);
          }

          this.drawLinePath();
          if (this.selectedPointIndex === draggedIndex) {
            this._renderControlHandles();
          }
        }
      },
      onDragEnd: (index) => {
        this.isPointDragging = false;
        if (this.selectedPointIndex !== index && this.points[index]) {
           this.selectedPointIndex = index;
        } else if (!this.points[index]) {
           this.selectedPointIndex = null;
        }

        // --- 使用新的布局计算函数 ---
        this._handleDragEndLayoutUpdate();
        
        this.$emit('pointDragEnd', { pointIndex: index }); // 保留原始事件
      },
      onPointClick: (index) => {
        if (this.isEditMode && this.isAltDown) {
          this.deletePoint(index);
        } else if (this.isEditMode) {
          this.selectedPointIndex = index;
          this.$emit('pointClick', { pointIndex: index });
        }
      },
      isOverallEditModeActive: () => this.isEditMode,
      getCtrlKeyState: () => this.isCtrlDown,
      onContainerResize: this.handleContainerResize,
      dragThreshold: 5,
      getDragBoundaries: this.getDragBoundaries
    });

    // 初始化控制手柄拖动处理器
    this.controlHandleDragHandler = createControlHandleDragHandler({
      getPointsArray: () => this.points,
      getSvgContainer: () => this.draw,
      isEditModeActive: () => this.isEditMode,
      getDragBoundaries: this.getDragBoundaries,
      onDragStart: (mainPointIndex, handleType) => {
      },
      onDrag: (mainPointIndex, handleType, newX, newY) => {
        const point = this.points[mainPointIndex];
        if (!point) return;
        if (handleType === 'cp1') {
          point.cp1x = newX; point.cp1y = newY; point.cp1UserSet = true;
        } else if (handleType === 'cp2') {
          point.cp2x = newX; point.cp2y = newY; point.cp2UserSet = true;
        }
        this.drawLinePath();
        this._renderControlHandles();
      },
      onDragEnd: (mainPointIndex, handleType) => {
        // updatePathsData 会在 _handleDragEndLayoutUpdate 内部被调用
        // this.updatePathsData(); 
        
        // --- 调用提取的布局更新方法 ---
        this._handleDragEndLayoutUpdate(); 

        if (this.selectedPointIndex !== null && 
            this.points && 
            this.selectedPointIndex < this.points.length && 
            this.points[this.selectedPointIndex]) {
          this._renderControlHandles(); 
        } else {
         
        }
      }
    });
  },
  methods: {
    setupKeyboardListeners() {
      this._handleKeyDown = (event) => {
        if (event.key === 'Control') {
          if (!this.isCtrlDown) {
            this.isCtrlDown = true;
            if (this.isEditMode) this.$emit('drawing-started');
          }
        } else if (event.key === 'Alt') {
          if (!this.isAltDown) {
            this.isAltDown = true;
            event.preventDefault();
          }
        }
      };
      this._handleKeyUp = (event) => {
        if (event.key === 'Control') {
          if (this.isCtrlDown) {
            this.isCtrlDown = false;
            if (this.isEditMode) this.$emit('drawing-completed', this.pathsData);
          }
        } else if (event.key === 'Alt') {
          if (this.isAltDown) {
            this.isAltDown = false;
            event.preventDefault();
          }
        }
      };
      window.addEventListener('keydown', this._handleKeyDown);
      window.addEventListener('keyup', this._handleKeyUp);
    },
    removeKeyboardListeners() {
      if (this._handleKeyDown) window.removeEventListener('keydown', this._handleKeyDown);
      if (this._handleKeyUp) window.removeEventListener('keyup', this._handleKeyUp);
    },
    handleClick(event) {
      if (this.isAltDown) {
        return;
      }

      if (this.controlHandleDragHandler && this.controlHandleDragHandler.isDragging()) {
        return;
      }

      if (this.pointDragHandler && this.pointDragHandler.isDragging()) {
        return;
      }

      if (this.isEditMode && event.target === this.svgRootNode && !this.isCtrlDown) {
        this.selectedPointIndex = null;
        return;
      }

      if (!this.isEditMode) {
        return;
      }

      if (!this.isCtrlDown) {
        return;
      }
      
      const point = this.draw.point(event.clientX, event.clientY);
      const addedOnLine = this.addPointOnLine(point.x, point.y, event.target);
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
        
        if (!this.draw) {
          this.draw = SVG().addTo(`#${this.containerId}`).size('100%', '100%')
          this.svgRootNode = this.draw.node;
          this.draw.on('click', this.handleClick)
        } else {
         
        }
        
        this.initialized = true
        
        
        // 确保在初始化后立即绘制
        this.$nextTick(() => {
          this.handleResize();
          this._updateAnimation();
        });
      } catch (err) {
   
      }
    },
    handleResize () {
      if (this.$refs.drawingArea) {
        const newWidth = this.$refs.drawingArea.clientWidth;
        const newHeight = this.$refs.drawingArea.clientHeight;

        // console.log(`FabricLine: handleResize - newWidth: ${newWidth}, newHeight: ${newHeight}, old svgWidth: ${this.svgWidth}, old svgHeight: ${this.svgHeight}`);
        // console.log('FabricLine: handleResize - config:', this.config);
        // console.log('FabricLine: handleResize - draw exists:', !!this.draw, 'currentLine exists:', !!this.currentLine);

        if (newWidth === 0 && newHeight === 0 && (this.svgWidth !== 0 || this.svgHeight !== 0)) {
          // console.warn("FabricLine: handleResize detected 0x0 dimensions, possibly during unmount or rapid changes. Skipping update to prevent errors.");
          return;
        }

        this.svgWidth = newWidth;
        this.svgHeight = newHeight;
        
        if (this.draw) {
          try {
            this.draw.size(this.svgWidth, this.svgHeight);
            // console.log('FabricLine: SVG size updated:', this.draw.attr(['width', 'height']));
            
            // 确保在调整大小后重新绘制
            if (this.points.length >= 2) {
              this.updateLine();
            }
            
            // 确保动画元素在调整大小后重新创建
            this._updateAnimation();
          } catch (err) {
            // console.error('FabricLine: Failed to update SVG size:', err);
            // 如果更新失败，尝试重新初始化
            this.initDrawingEditor();
          }
        } else {
          // console.warn("FabricLine: handleResize - this.draw is null, reinitializing SVG");
          this.initDrawingEditor();
        }
      }
    },
    addPoint(x, y) {
      if (!this.draw) return;
      const pointElement = this.draw.circle(this.pointRadius * 2)
        .center(x, y)
        .fill(this.pointColor);
      
      const newPointData = { 
        x, 
        y, 
        element: pointElement,
      };

      this.points.push(newPointData);
      const pointIndex = this.points.length - 1;

      this._recalculateAllControlPoints();

      pointElement.on('mousedown', (e) => {
        e.stopPropagation(); 
        this.pointDragHandler.handlePointMouseDown(e, pointIndex, this.points);
      });
      pointElement.on('click', (e) => e.stopPropagation());
      
      if (this.points.length >= 2) this.updateLine();
      this.updatePathsData();
    },
    addPointOnLine(x, y, originalEventTarget) {
      if (!this.currentLine || this.points.length < 2) {
        return false;
      }

      if (this.lineShapeType === 'cubicBezier') {
        if (originalEventTarget && this.currentLine.node && originalEventTarget === this.currentLine.node) {
          let closestSegmentIndex = -1;
          let minDistToAnchorLineSq = Infinity;

          if (this.points.length >= 2) {
            for (let i = 0; i < this.points.length -1; i++) {
              const p1 = this.points[i];
              const p2 = this.points[i+1];
              const distSq = distanceToSegmentSq({x,y}, p1, p2); 
              if (distSq < minDistToAnchorLineSq) {
                minDistToAnchorLineSq = distSq;
                closestSegmentIndex = i;
              }
            }
          }
          
          if (closestSegmentIndex !== -1) {
            const insertIndex = closestSegmentIndex + 1;

            const pointElement = this.draw.circle(this.pointRadius * 2).center(x, y).fill(this.pointColor);
            const newPointData = { x, y, element: pointElement, cp1UserSet: false, cp2UserSet: false };
            
            this.points.splice(insertIndex, 0, newPointData);
            
            this.points.forEach((p, idx) => {
              if (p.element) {
                p.element.off('mousedown'); 
                p.element.on('mousedown', (e) => {
                  e.stopPropagation();
                  if (this.pointDragHandler) {
                    this.pointDragHandler.handlePointMouseDown(e, idx, this.points);
                  }
                });
                p.element.off('click'); 
                p.element.on('click', (e) => e.stopPropagation());
              }
            });

            this._recalculateAllControlPoints();
            this.updateLine();
            this.selectedPointIndex = insertIndex;
            return true;
          } else {
            return false;
          }
        }
        return false; 
      }

      const segments = [];
      for (let i = 0; i < this.points.length - 1; i++) {
        segments.push({ start: this.points[i], end: this.points[i + 1], index: i });
      }
      const threshold = 10;
      let minDistance = Infinity;
      let targetSegment = null;
      segments.forEach(segment => {
        const distance = distanceToSegment({ x, y }, segment.start, segment.end);
        if (distance < minDistance && distance < threshold) {
          minDistance = distance;
          targetSegment = segment;
        }
      });
      if (targetSegment) {
        const pointElement = this.draw.circle(this.pointRadius * 2).move(x - this.pointRadius, y - this.pointRadius).fill(this.pointColor);
        const newPointData = { x, y, element: pointElement };
        const insertIndex = targetSegment.index + 1;
        
        this.points.splice(insertIndex, 0, newPointData);
        
        this._recalculateAllControlPoints();

        this.points.forEach((p, idx) => {
          if (p.element) {
            p.element.off('mousedown'); 
            p.element.on('mousedown', (e) => {
              e.stopPropagation();
              this.selectedPointIndex = idx;
              if (this.pointDragHandler) {
                this.pointDragHandler.handlePointMouseDown(e, idx, this.points);
              }
            });
          }
        });
        
        this.updateLine();
        this.updatePathsData();
        return true;
      }
      return false;
    },
    drawLinePath() {
      if (!this.draw || this.points.length < 1) {
        if (this.currentLine) this.currentLine.remove();
        this.currentLine = null;
        return;
      }
      if (this.currentLine) this.currentLine.remove();
      
      let path = '';
      const pts = this.points; 

      if (pts.length < 2) {
        if (this.currentLine) this.currentLine.remove();
        this.currentLine = null;
        return;
      }

      switch (this.lineShapeType) {
        case 'cubicBezier':
          path = `M${pts[0].x},${pts[0].y}`;
          if (pts.length === 2) {
             if (pts[0].cp2x != null && pts[1].cp1x != null) {
                path += ` C${pts[0].cp2x},${pts[0].cp2y} ${pts[1].cp1x},${pts[1].cp1y} ${pts[1].x},${pts[1].y}`;
             } else {
                path += ` L${pts[1].x},${pts[1].y}`;
             }
          } else {
            for (let i = 0; i < pts.length - 1; i++) {
              const p1 = pts[i];
              const p2 = pts[i+1];
              if (p1.cp2x != null && p1.cp2y != null && p2.cp1x != null && p2.cp1y != null) {
                 if (i === 0) {
                    path = `M${p1.x},${p1.y} C${p1.cp2x},${p1.cp2y} ${p2.cp1x},${p2.cp1y} ${p2.x},${p2.y}`;
                 } else {
                    path += ` C${p1.cp2x},${p1.cp2y} ${p2.cp1x},${p2.cp1y} ${p2.x},${p2.y}`;
                 }
              } else {
                // console.warn(`Missing control points for cubic Bezier segment from point ${i} to ${i+1}. Drawing line.`);
                if (i===0) path = `M${p1.x},${p1.y}`;
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
        if (this.currentLine) {
          this.currentLine.remove();
        }
        this.currentLine = this.draw.path(path).fill('none').stroke(strokeAttrs);
        this.currentLine.back();
      } catch (err) { 
        // console.error('线段绘制失败 (Error drawing segment):', err);
        // console.error('FabricLine DEBUG: drawLinePath - Failed Path String:', path);
        // console.error('FabricLine DEBUG: drawLinePath - Error Object:', err);
        if (this.currentLine) {
          try {
            this.currentLine.remove();
          } catch (removeError) {
            // console.warn('FabricLine DEBUG: drawLinePath - Error removing currentLine in catch block:', removeError);
          }
        } 
        this.currentLine = null;
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

      if (this.currentLine) {
        this.currentLine.stroke(strokeAttrsToApply);
      }
      this.lines.forEach(line => { 
        if (line.path) { 
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
      this._clearAnimation(); // 清理动画
      if (this.controlHandlesGroup) {
        this.controlHandlesGroup.remove();
        this.controlHandlesGroup = null;
      }
      this.points = []; this.lines = []; this.currentLine = null; this.pathsData = [];
      this.selectedPointIndex = null;
      if (this.config) {
        const currentCustomize = this.config.customize || {};
        this.$emit('update:config', { ...this.config, customize: { ...currentCustomize, points: [] } });
      }
      this.$emit('drawing-cleared');
    },
    updatePathsData() {
      if (this.isDataLoading) return;
      
      this.points.forEach((pointData) => {
        if (pointData.element && typeof pointData.element.cx === 'function') {
          pointData.x = pointData.element.cx();
          pointData.y = pointData.element.cy();
        }
      });

      const pointsToSave = this.points.map(p => {
        const savedPoint = { x: p.x, y: p.y };
        if (p.cp1x != null) savedPoint.cp1x = p.cp1x;
        if (p.cp1y != null) savedPoint.cp1y = p.cp1y;
        savedPoint.cp1UserSet = p.cp1UserSet || false;

        if (p.cp2x != null) savedPoint.cp2x = p.cp2x;
        if (p.cp2y != null) savedPoint.cp2y = p.cp2y;
        savedPoint.cp2UserSet = p.cp2UserSet || false;
        return savedPoint;
      });

      this.pathsData = pointsToSave;

      if (this.config) {
        if (!this.config.customize) this.config.customize = {};
        
        const oldConfigPointsStr = JSON.stringify(this.config.customize.points || []);
        if (oldConfigPointsStr === JSON.stringify(pointsToSave)) {
          return; 
        }
        this.config.customize.points = pointsToSave; 
        this.$emit('update:config', {...this.config});
      }
    },
    deletePoint(indexToDelete) {
      if (!this.isEditMode) {
        // console.warn('deletePoint: Not in edit mode. Aborting.');
        return;
      }
      if (indexToDelete < 0 || indexToDelete >= this.points.length) {
        // console.warn(`deletePoint: Invalid index ${indexToDelete}. Aborting.`);
        return;
      }

      const pointToRemove = this.points[indexToDelete];
      if (pointToRemove && pointToRemove.element) {
        pointToRemove.element.remove();
      }

      this.points.splice(indexToDelete, 1);

      this.points.forEach((p, newIndex) => {
        if (p.element) {
          p.element.off('mousedown');
          p.element.on('mousedown', (e) => {
            e.stopPropagation();
            if (this.pointDragHandler) {
              this.pointDragHandler.handlePointMouseDown(e, newIndex, this.points);
            }
          });
          p.element.off('click'); 
          p.element.on('click', (e) => e.stopPropagation()); 
        }
      });

      if (this.selectedPointIndex === indexToDelete) {
        this.selectedPointIndex = null;
      } else if (this.selectedPointIndex > indexToDelete) {
        this.selectedPointIndex -= 1;
      }

      if (this.points.length < 2) {
         if (this.currentLine) {
            this.currentLine.remove();
            this.currentLine = null;
         }
         if (this.controlHandlesGroup) {
            this.controlHandlesGroup.remove();
            this.controlHandlesGroup = null;
         }
         if (this.points.length === 0) this.selectedPointIndex = null;
      }
      
      this._recalculateAllControlPoints();
      this.drawLinePath(); 
      this._renderControlHandles();
      this.updatePathsData();

      this.$emit('pointDeleted', { deletedIndex: indexToDelete, points: this.pathsData });
    },
    getData() {
      const lineData = this.lines.map(line => ({ points: line.points.map(p => ({ x: p.x, y: p.y })) }));
      if (this.currentLine && this.points.length >= 2) lineData.push({ points: this.points.map(p => ({ x: p.x, y: p.y })) });
      return { lines: lineData };
    },
    loadData(data) {
      this.isDataLoading = true;
      this.clearDrawing();
      if (!data || !Array.isArray(data)) {
        this.$nextTick(() => { this.isDataLoading = false; });
        return;
      }
      
      try {
        const richPointsData = data.map(p_in => ({
          x: p_in.x,
          y: p_in.y,
          cp1x: p_in.cp1x,
          cp1y: p_in.cp1y,
          cp1UserSet: p_in.cp1UserSet || false,
          cp2x: p_in.cp2x,
          cp2y: p_in.cp2y,
          cp2UserSet: p_in.cp2UserSet || false,
          element: null
        }));

        this.points = richPointsData;

        this.points.forEach((pData, i) => {
          const pointElement = this.draw.circle(this.pointRadius * 2)
            .center(pData.x, pData.y)
            .fill(this.pointColor);
          pData.element = pointElement;

          pointElement.on('mousedown', (e) => {
            e.stopPropagation();
            if (this.pointDragHandler) this.pointDragHandler.handlePointMouseDown(e, i, this.points);
          });
          pointElement.on('click', (e) => e.stopPropagation());
        });

        this._recalculateAllControlPoints(); 

        if (this.points.length >= 1) {
          this.updateLine();
        }
      } catch (err) { // console.error('加载数据失败:', err); 
      }
      finally {
        this.$nextTick(() => {
          this.isDataLoading = false;
        });
      }
    },
    setupGlobalMouseEvents() {
      const handleGlobalMouseMove = (event) => {
        if (this.pointDragHandler && this.pointDragHandler.isDragging()) {
        }
      };
      const handleGlobalMouseUp = (event) => {
        if (this.pointDragHandler && this.pointDragHandler.isDragging()) {
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
        }
        if (newHeight > currentHeight) {
          finalHeight = newHeight;
          this.$refs.drawingArea.style.height = `${finalHeight}px`;
          updateNeeded = true;
        }

        if (updateNeeded) {
          this.$nextTick(() => {
            if (this.draw) {
            }
            const newConfig = {
              ...this.config,
              w: finalWidth,
              h: finalHeight,
            };
            this.$emit('update:config', newConfig);
          });
        }
      } else {
        // console.warn('FabricLine.vue: handleContainerResize - this.$refs.drawingArea is not available.');
      }
    },
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
    _renderControlHandles() {
      if (this.controlHandlesGroup) {
        this.controlHandlesGroup.remove();
        this.controlHandlesGroup = null;
      }

      if (this.lineShapeType !== 'cubicBezier' || this.selectedPointIndex === null || !this.draw) {
        return;
      }

      const point = this.points[this.selectedPointIndex];
      if (!point) return;

      this.controlHandlesGroup = this.draw.group();
      const handleRadius = Math.max(2, this.pointRadius / 2);
      const handleColor = '#00a8ff';
      const lineColor = 'rgba(0, 168, 255, 0.5)';

      if (point.cp1x != null && point.cp1y != null) {
        this.controlHandlesGroup.line(point.x, point.y, point.cp1x, point.cp1y)
          .stroke({ width: 1, color: lineColor, dasharray: '2,2' });
        const cp1Handle = this.controlHandlesGroup.circle(handleRadius * 2)
          .center(point.cp1x, point.cp1y)
          .fill(handleColor)
          .stroke({ width: 1, color: '#fff' });
        
        cp1Handle.on('mousedown', (event) => {
          if (this.controlHandleDragHandler) {
            this.controlHandleDragHandler.handleMouseDown(event, this.selectedPointIndex, 'cp1');
          }
        });
      }

      if (point.cp2x != null && point.cp2y != null) {
        this.controlHandlesGroup.line(point.x, point.y, point.cp2x, point.cp2y)
          .stroke({ width: 1, color: lineColor, dasharray: '2,2' });
        const cp2Handle = this.controlHandlesGroup.circle(handleRadius * 2)
          .center(point.cp2x, point.cp2y)
          .fill(handleColor)
          .stroke({ width: 1, color: '#fff' });

        cp2Handle.on('mousedown', (event) => {
          if (this.controlHandleDragHandler) {
            this.controlHandleDragHandler.handleMouseDown(event, this.selectedPointIndex, 'cp2');
          }
        });
      }
      if(point.element) {
        this.controlHandlesGroup.front(); 
      }
    },
    _updateControlPointsForPoint(index) {
      if (index < 0 || index >= this.points.length) return;

      const targetPoint = this.points[index];
      const prevPoint = this.points[index - 1];
      const nextPoint = this.points[index + 1];

      if (prevPoint) { 
        if (!targetPoint.cp1UserSet) {
          const [cp1x, cp1y] = controlPoint(targetPoint, prevPoint, nextPoint, true, 0.2);
          targetPoint.cp1x = cp1x;
          targetPoint.cp1y = cp1y;
        }
      } else {
        if (!targetPoint.cp1UserSet) {
          delete targetPoint.cp1x;
          delete targetPoint.cp1y;
        }
      }

      if (nextPoint) { 
        if (!targetPoint.cp2UserSet) {
          const [cp2x, cp2y] = controlPoint(targetPoint, prevPoint, nextPoint, false, 0.2);
          targetPoint.cp2x = cp2x;
          targetPoint.cp2y = cp2y;
        }
      } else {
        if (!targetPoint.cp2UserSet) {
          delete targetPoint.cp2x;
          delete targetPoint.cp2y;
        }
      }

      if (this.points.length >= 2) {
        if (index === 0 && this.points[1]) { 
          if (!targetPoint.cp2UserSet) { 
            const [cp2x_start, cp2y_start] = controlPoint(targetPoint, targetPoint, this.points[1], false, 0.1);
            targetPoint.cp2x = cp2x_start;
            targetPoint.cp2y = cp2y_start;
          }
        } else if (index === this.points.length - 1 && this.points[index - 1]) { 
          if (!targetPoint.cp1UserSet) { 
            const pSecondLast = this.points[index - 1];
            const [cp1x_end, cp1y_end] = controlPoint(targetPoint, pSecondLast, targetPoint, true, 0.1);
            targetPoint.cp1x = cp1x_end;
            targetPoint.cp1y = cp1y_end;
          }
        }
      }
    },
    _updateLine(line, points, lineShapeType) {
      // Implementation of _updateLine method
    },
    updatePathsDataToConfig() {
      // Implementation of updatePathsDataToConfig method
    },
    _distanceToSegmentSq(p, v, w) {
      const l2 = Math.pow(w.x - v.x, 2) + Math.pow(w.y - v.y, 2);
      if (l2 === 0) return Math.pow(p.x - v.x, 2) + Math.pow(p.y - v.y, 2);
      let t = ((p.x - v.x) * (w.x - v.x) + (p.y - v.y) * (w.y - v.y)) / l2;
      t = Math.max(0, Math.min(1, t));
      const projX = v.x + t * (w.x - v.x);
      const projY = v.y + t * (w.y - v.y);
      return Math.pow(p.x - projX, 2) + Math.pow(p.y - projY, 2);
    },
    // --- 动画方法 ---
    _clearAnimation() {
      this.animationRunners.forEach(runner => {
        if (runner && typeof runner.cancel === 'function') {
          runner.cancel();
        }
      });
      this.animationRunners = [];

      this.animationElements.forEach(el => {
        if (el && typeof el.remove === 'function') {
          el.remove();
        }
      });
      this.animationElements = [];
    },

    _updateAnimation() {
      // console.log('FabricLine: _updateAnimation called - draw exists:', !!this.draw, 'currentLine exists:', !!this.currentLine);
      
      // 如果 draw 不存在，尝试重新初始化
      if (!this.draw) {
        // console.warn('FabricLine: _updateAnimation - draw is null, attempting to reinitialize');
        this.initDrawingEditor();
        return;
      }
      
      if (!this.currentLine) {
        // console.warn('FabricLine: _updateAnimation - currentLine is null, clearing animation');
        return this._clearAnimation();
      }
      
      this._clearAnimation();

      if (!this.animationActive || this.animationType === 'none') {
        // console.log('FabricLine: _updateAnimation - animation not active or type is none');
        return;
      }

      // 确保线条有有效的路径/长度用于动画
      if (this.lineWidth <= 0 || this.svgWidth <= 0) {
        // console.warn('FabricLine: _updateAnimation - invalid dimensions:', { lineWidth: this.lineWidth, svgWidth: this.svgWidth });
        return;
      }

      if (typeof this.currentLine.length !== 'function' || this.currentLine.length() === 0) {
        // console.warn("FabricLine: Cannot start animation, line has no length or invalid.");
        return;
      }

      // console.log('FabricLine: Starting animation with config:', {
      //   animationActive: this.animationActive,
      //   animationType: this.animationType,
      //   animationDirection: this.animationDirection,
      //   animationSpeed: this.animationSpeed,
      //   animationLoop: this.animationLoop
      // });

      const animationConfig = {
        animationActive: this.animationActive,
        animationType: this.animationType,
        animationDirection: this.animationDirection,
        animationSpeed: this.animationSpeed,
        animationLoop: this.animationLoop,
        dropletColor: this.dropletColor,
        dropletSize: this.dropletSize,
        flowColor: this.flowColor,
        flowThickness: this.flowThickness,
        flowDensity: this.flowDensity
      };

      let animationResult = { elements: [], runners: [] };

      try {
        switch (this.animationType) {
          case 'droplet':
            animationResult = startDropletAnimation(this.draw, this.currentLine, animationConfig);
            break;
          case 'flow':
            animationResult = startFlowAnimation(this.draw, this.currentLine, animationConfig);
            break;
        }
        // console.log('FabricLine: Animation result:', {
        //   elementsCount: animationResult.elements?.length,
        //   runnersCount: animationResult.runners?.length
        // });

        this.animationElements = animationResult.elements || [];
        this.animationRunners = animationResult.runners || [];

        if (this.animationElements.length > 0) {
          this.animationElements.forEach(el => {
            if (el && typeof el.front === 'function') {
              try {
                el.front();
              } catch (e) {
                // console.error('FabricLine: Error calling front() on animation element:', e);
              }
            }
          });
          if (this.currentLine) {
            try {
              this.currentLine.back();
            } catch (e) {
              // console.error('FabricLine: Error calling back() on currentLine:', e);
            }
          }
        }
      } catch (e) {
        // console.error('FabricLine: Error in _updateAnimation:', e);
        this._clearAnimation();
      }
    },

    // _startDropletAnimation() { // 已移除, 迁移到 animationUtils.js
    // },

    // _startFlowAnimation() { // 已移除, 迁移到 animationUtils.js
    // },

    // 新增：计算拖拽边界的方法
    getDragBoundaries() {
      const currentX = this.config?.x || 0;
      const currentY = this.config?.y || 0;
      const parentW = this.pageWidth === Infinity ? window.innerWidth : this.pageWidth; // Fallback if prop not set
      const parentH = this.pageHeight === Infinity ? window.innerHeight : this.pageHeight; // Fallback if prop not set

      return {
        minX: -currentX+10,
        minY: -currentY+10,
        maxX: parentW - currentX-10,
        maxY: parentH - currentY-10
      };
    },

    // 新增：统一处理拖动结束后的布局更新
    _handleDragEndLayoutUpdate() {
      // --- 使用新的布局计算函数 (传入 PADDING) ---
      const layoutUpdateResult = calculateLayoutUpdate(this.points, this.config, this.lineShapeType, this.lineWidth, this.pageWidth, this.pageHeight, PADDING);
      
      if (layoutUpdateResult) {
        // 更新内部 points 数组为新的相对坐标
        this.points = layoutUpdateResult.relativePoints.map((rp, idx) => {
          const existingPoint = this.points[idx]; 
          // 确保保留 element 和 userSet 状态等非坐标属性
          return { 
            ...existingPoint, // 保留旧属性
            ...rp            // 用新坐标覆盖 x, y, cp1x, cp1y, cp2x, cp2y
          }; 
        });

        // 手动更新 SVG 点元素的位置 (锚点)
        this.points.forEach(p => {
          if (p.element && typeof p.element.center === 'function') {
            p.element.center(p.x, p.y); 
          }
        });

        // 重新绘制线条和控制柄
        this.drawLinePath(); 
        this._renderControlHandles(); // 控制柄需要基于新的相对坐标重新渲染

        // 发出带有新布局和相对点信息的事件
        this.$emit('bounds-update', layoutUpdateResult); 
      } else {
        // 如果没有布局更新，可能只是需要重绘
        this.drawLinePath();
        this._renderControlHandles();
      }
      // 确保在拖动结束后，最新的（相对化的）点数据反映到 config 中
      this.updatePathsData(); 
    },
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
