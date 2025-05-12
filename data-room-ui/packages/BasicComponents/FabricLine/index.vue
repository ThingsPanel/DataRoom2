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
        console.log('FabricLine Watch customize.points: Triggered.');
        const currentLocalPoints = this.points.map(p => ({
          x: p.x, y: p.y, 
          cp1x: p.cp1x, cp1y: p.cp1y, cp1UserSet: p.cp1UserSet || false,
          cp2x: p.cp2x, cp2y: p.cp2y, cp2UserSet: p.cp2UserSet || false
        }));
        const localPointsStr = JSON.stringify(currentLocalPoints);
        const newPointsStr = JSON.stringify(newData || []);

        // console.log('FabricLine Watch - Current Local Points String:', localPointsStr);
        // console.log('FabricLine Watch - New Data from Prop String:', newPointsStr);

        if (localPointsStr === newPointsStr) {
          console.log('FabricLine Watch customize.points: newData is identical to internal this.points state. Skipping loadData.');
          return;
        }
        
        console.log('FabricLine Watch customize.points: newData differs from internal state. Proceeding to loadData. NewData:', JSON.stringify(newData));

        if (newData && Array.isArray(newData) && this.initialized) {
          // this.isDataLoading = true; // loadData 内部会处理
          this.loadData(newData); // 直接传递 newData
          // this.isDataLoading = false;
        } else if (!newData || newData.length === 0) {
          // this.clearDrawing();
          if (this.points.length > 0) { 
            console.log('FabricLine Watch customize.points: newData is empty, clearing drawing.');
            this.clearDrawing();
          }
        }
      },
      deep: true
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
        console.log('拖动点开始', index, point.x, point.y);
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
          console.log(`PointDragHandler ON DRAG (BEFORE _updateControlPointsForPoint) - Point ${draggedIndex}: cp1UserSet=${pointToUpdateControls.cp1UserSet}, cp1x=${pointToUpdateControls.cp1x}, cp1y=${pointToUpdateControls.cp1y}, cp2UserSet=${pointToUpdateControls.cp2UserSet}, cp2x=${pointToUpdateControls.cp2x}, cp2y=${pointToUpdateControls.cp2y}`);
          
          this._updateControlPointsForPoint(draggedIndex);
          if (draggedIndex > 0) {
            this._updateControlPointsForPoint(draggedIndex - 1);
          }
          if (draggedIndex < this.points.length - 1) {
            this._updateControlPointsForPoint(draggedIndex + 1);
          }

          const pointAfterUpdateControls = this.points[draggedIndex];
          console.log(`PointDragHandler ON DRAG (AFTER _updateControlPointsForPoint) - Point ${draggedIndex}: cp1UserSet=${pointAfterUpdateControls.cp1UserSet}, cp1x=${pointAfterUpdateControls.cp1x}, cp1y=${pointAfterUpdateControls.cp1y}, cp2UserSet=${pointAfterUpdateControls.cp2UserSet}, cp2x=${pointAfterUpdateControls.cp2x}, cp2y=${pointAfterUpdateControls.cp2y}`);
          
          this.drawLinePath();
          if (this.selectedPointIndex === draggedIndex) {
            this._renderControlHandles();
          }
        }
      },
      onDragEnd: (index) => {
        console.log('拖动点结束，索引:', index);
        this.isPointDragging = false;
        if (this.selectedPointIndex !== index && this.points[index]) {
           this.selectedPointIndex = index;
        } else if (!this.points[index]) {
           this.selectedPointIndex = null;
        }
        this.updatePathsData();
        this.$emit('pointDragEnd', { pointIndex: index });
      },
      onPointClick: (index) => {
        if (this.isEditMode && this.isAltDown) {
          console.log(`FabricLine.vue: Alt+Click on point ${index}. Attempting to delete.`);
          this.deletePoint(index);
        } else if (this.isEditMode) {
          console.log('FabricLine.vue: Point clicked, index:', index);
          this.selectedPointIndex = index;
          this.$emit('pointClick', { pointIndex: index });
        } else {
          console.log('FabricLine.vue: Point clicked, but not in edit mode or Alt not pressed.');
        }
      },
      isOverallEditModeActive: () => this.isEditMode,
      getCtrlKeyState: () => this.isCtrlDown,
      updatePathsData: this.updatePathsData,
      onContainerResize: this.handleContainerResize,
      dragThreshold: 5,
    });

    // 初始化控制手柄拖动处理器
    this.controlHandleDragHandler = createControlHandleDragHandler({
      getPointsArray: () => this.points,
      getSvgContainer: () => this.draw, // 传递SVG.js的draw实例
      isEditModeActive: () => this.isEditMode,
      onDragStart: (mainPointIndex, handleType) => {
        // console.log(`ControlHandleDrag: Start dragging ${handleType} of point ${mainPointIndex}`);
      },
      onDrag: (mainPointIndex, handleType, newX, newY) => {
        const point = this.points[mainPointIndex];
        if (!point) return;
        if (handleType === 'cp1') {
          point.cp1x = newX; point.cp1y = newY; point.cp1UserSet = true;
        } else if (handleType === 'cp2') {
          point.cp2x = newX; point.cp2y = newY; point.cp2UserSet = true;
        }
        console.log(`ControlHandle ON DRAG - Point ${mainPointIndex} (${handleType}): cp1UserSet=${point.cp1UserSet}, cp1x=${point.cp1x}, cp1y=${point.cp1y}, cp2UserSet=${point.cp2UserSet}, cp2x=${point.cp2x}, cp2y=${point.cp2y}`);
        this.drawLinePath();
        this._renderControlHandles();
      },
      onDragEnd: (mainPointIndex, handleType) => {
        const pointBeforeUpdate = this.points[mainPointIndex];
        if (pointBeforeUpdate) {
          console.log(`ControlHandle ON DRAG END (BEFORE updatePathsData) - Point ${mainPointIndex} (${handleType}): cp1UserSet=${pointBeforeUpdate.cp1UserSet}, cp1x=${pointBeforeUpdate.cp1x}, cp1y=${pointBeforeUpdate.cp1y}, cp2UserSet=${pointBeforeUpdate.cp2UserSet}, cp2x=${pointBeforeUpdate.cp2x}, cp2y=${pointBeforeUpdate.cp2y}`);
        }
        
        this.updatePathsData(); 
        
        const pointAfterUpdate = this.points[mainPointIndex];
        if (pointAfterUpdate) {
          console.log(`ControlHandle ON DRAG END (AFTER updatePathsData) - Point ${mainPointIndex} (${handleType}): cp1UserSet=${pointAfterUpdate.cp1UserSet}, cp1x=${pointAfterUpdate.cp1x}, cp1y=${pointAfterUpdate.cp1y}, cp2UserSet=${pointAfterUpdate.cp2UserSet}, cp2x=${pointAfterUpdate.cp2x}, cp2y=${pointAfterUpdate.cp2y}`);
        }

        if (this.selectedPointIndex !== null && 
            this.points && 
            this.selectedPointIndex < this.points.length && 
            this.points[this.selectedPointIndex]) {
          this._renderControlHandles(); 
          console.log('ControlHandleDrag: Explicitly called _renderControlHandles after drag end.');
        } else {
          console.warn(
            `ControlHandleDrag: selectedPointIndex (${this.selectedPointIndex}) is invalid or point data missing after handle drag end. Not rerendering handles explicitly.`
          );
        }
      }
    });
  },
  methods: {
    setupKeyboardListeners() {
      this._handleKeyDown = (event) => {
        console.log('FabricLine DEBUG: Global keydown event detected. Key:', event.key, 'Current isCtrlDown:', this.isCtrlDown, 'Current isAltDown:', this.isAltDown);
        if (event.key === 'Control') {
          console.log('FabricLine DEBUG: Control key event detected in _handleKeyDown.');
          if (!this.isCtrlDown) {
            console.log('FabricLine DEBUG: _handleKeyDown - Setting isCtrlDown to true.');
            this.isCtrlDown = true;
            console.log('FabricLine DEBUG: Ctrl key DOWN, isCtrlDown = true (set in _handleKeyDown)');
            if (this.isEditMode) this.$emit('drawing-started');
          }
        } else if (event.key === 'Alt') {
          console.log('FabricLine DEBUG: Alt key event detected in _handleKeyDown.');
          if (!this.isAltDown) {
            console.log('FabricLine DEBUG: _handleKeyDown - Setting isAltDown to true.');
            this.isAltDown = true;
            console.log('FabricLine DEBUG: Alt key DOWN, isAltDown = true (set in _handleKeyDown)');
            event.preventDefault();
          }
        }
      };
      this._handleKeyUp = (event) => {
        console.log('FabricLine DEBUG: Global keyup event detected. Key:', event.key, 'Current isCtrlDown:', this.isCtrlDown, 'Current isAltDown:', this.isAltDown);
        if (event.key === 'Control') {
          console.log('FabricLine DEBUG: Control key event detected in _handleKeyUp.');
          if (this.isCtrlDown) {
            console.log('FabricLine DEBUG: _handleKeyUp - Setting isCtrlDown to false.');
            this.isCtrlDown = false;
            console.log('FabricLine DEBUG: Ctrl key UP, isCtrlDown = false (set in _handleKeyUp)');
            if (this.isEditMode) this.$emit('drawing-completed', this.pathsData);
          }
        } else if (event.key === 'Alt') {
          console.log('FabricLine DEBUG: Alt key event detected in _handleKeyUp.');
          if (this.isAltDown) {
            console.log('FabricLine DEBUG: _handleKeyUp - Setting isAltDown to false.');
            this.isAltDown = false;
            console.log('FabricLine DEBUG: Alt key UP, isAltDown = false (set in _handleKeyUp)');
            event.preventDefault();
          }
        }
      };
      window.addEventListener('keydown', this._handleKeyDown);
      window.addEventListener('keyup', this._handleKeyUp);
      console.log('FabricLine DEBUG: Keyboard listeners ADDED (Ctrl & Alt)');
    },
    removeKeyboardListeners() {
      if (this._handleKeyDown) window.removeEventListener('keydown', this._handleKeyDown);
      if (this._handleKeyUp) window.removeEventListener('keyup', this._handleKeyUp);
      console.log('FabricLine DEBUG: Keyboard listeners REMOVED (Ctrl & Alt)');
    },
    handleClick(event) {
      console.log(
        'FabricLine handleClick ---- isEditMode (prop):', this.isEditMode, 
        'isCtrlDown (data):', this.isCtrlDown,
        'isAltDown (data):', this.isAltDown,
        'event.target:', event.target,
        'svgRootNode:', this.svgRootNode
      );

      if (this.isAltDown) {
        console.log('FabricLine DEBUG: handleClick ignored because isAltDown is true.');
        return;
      }

      if (this.controlHandleDragHandler && this.controlHandleDragHandler.isDragging()) {
        console.log('FabricLine DEBUG: handleClick ignored because controlHandleDragHandler.isDragging() is true.');
        return;
      }

      if (this.pointDragHandler && this.pointDragHandler.isDragging()) {
        console.log('FabricLine DEBUG: handleClick ignored because pointDragHandler.isDragging() is true.');
        return;
      }

      if (this.isEditMode && event.target === this.svgRootNode && !this.isCtrlDown) {
        console.log('FabricLine DEBUG: Click on SVG background. Deselecting point.');
        this.selectedPointIndex = null;
        return;
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
      console.log('FabricLine DEBUG: handleClick - currentLine state before addPointOnLine:', this.currentLine ? 'Exists' : 'NULL');
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
        this.svgRootNode = this.draw.node;
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
    addPointOnLine(x, y) {
      console.log('FabricLine DEBUG: addPointOnLine - currentLine state at entry:', this.currentLine ? 'Exists' : 'NULL', 'Points count:', this.points.length);
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
                console.warn(`Missing control points for cubic Bezier segment from point ${i} to ${i+1}. Drawing line.`);
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
        console.log('FabricLine DEBUG: drawLinePath - Attempting to draw path:', path);
        this.currentLine = this.draw.path(path).fill('none').stroke(strokeAttrs);
        this.currentLine.back();
      } catch (err) { 
        console.error('线段绘制失败 (Error drawing segment):', err);
        console.error('FabricLine DEBUG: drawLinePath - Failed Path String:', path);
        console.error('FabricLine DEBUG: drawLinePath - Error Object:', err);
        if (this.currentLine) {
          try {
            this.currentLine.remove();
          } catch (removeError) {
            console.warn('FabricLine DEBUG: drawLinePath - Error removing currentLine in catch block:', removeError);
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

      console.log('FabricLine.vue: Updating line style with attributes:', JSON.parse(JSON.stringify(strokeAttrsToApply)));

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
        
        console.log('FabricLine updatePathsData: Trying to save points:', JSON.stringify(pointsToSave));

        const oldConfigPointsStr = JSON.stringify(this.config.customize.points || []);
        if (oldConfigPointsStr === JSON.stringify(pointsToSave)) {
          console.log('FabricLine updatePathsData: pointsToSave is identical to current config.customize.points. Skipping emit.');
          return; 
        }
        this.config.customize.points = pointsToSave; 
        console.log('FabricLine updatePathsData: Emitting update:config with new points:', JSON.stringify(this.config.customize.points));
        this.$emit('update:config', {...this.config});
      }
    },
    deletePoint(indexToDelete) {
      if (!this.isEditMode) {
        console.warn('deletePoint: Not in edit mode. Aborting.');
        return;
      }
      if (indexToDelete < 0 || indexToDelete >= this.points.length) {
        console.warn(`deletePoint: Invalid index ${indexToDelete}. Aborting.`);
        return;
      }

      console.log(`FabricLine.vue: Deleting point at index ${indexToDelete}`);

      const pointToRemove = this.points[indexToDelete];
      if (pointToRemove && pointToRemove.element) {
        pointToRemove.element.remove();
      }

      this.points.splice(indexToDelete, 1);

      // 更新剩余点的事件处理器，因为索引已改变
      this.points.forEach((p, newIndex) => {
        if (p.element) {
          p.element.off('mousedown'); // 移除旧监听器
          p.element.on('mousedown', (e) => {
            e.stopPropagation();
            if (this.pointDragHandler) {
              this.pointDragHandler.handlePointMouseDown(e, newIndex, this.points);
            }
          });
          // 确保click事件也停止冒泡，以防万一
          p.element.off('click'); 
          p.element.on('click', (e) => e.stopPropagation()); 
        }
      });

      // 调整selectedPointIndex
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
      this._renderControlHandles(); // 会根据 selectedPointIndex 更新或隐藏控制柄
      this.updatePathsData(); // 保存更改

      this.$emit('pointDeleted', { deletedIndex: indexToDelete, points: this.pathsData });
      console.log(`FabricLine.vue: Point at index ${indexToDelete} deleted. Current points count: ${this.points.length}`);
    },
    getData() {
      const lineData = this.lines.map(line => ({ points: line.points.map(p => ({ x: p.x, y: p.y })) }));
      if (this.currentLine && this.points.length >= 2) lineData.push({ points: this.points.map(p => ({ x: p.x, y: p.y })) });
      return { lines: lineData };
    },
    loadData(data) {
      this.isDataLoading = true;
      console.log('FabricLine loadData: Started. Received data:', JSON.stringify(data));

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
        console.log('FabricLine loadData: this.points populated from richPointsData (before creating elements):', JSON.stringify(this.points.map(p => ({x:p.x, y:p.y, cp1x:p.cp1x, cp1y:p.cp1y, cp1UserSet:p.cp1UserSet, cp2x:p.cp2x, cp2y:p.cp2y, cp2UserSet:p.cp2UserSet}))));

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

        console.log('FabricLine loadData: About to call _recalculateAllControlPoints. Current this.points:', JSON.stringify(this.points.map(p => ({x:p.x, y:p.y, cp1x:p.cp1x, cp1y:p.cp1y, cp1UserSet:p.cp1UserSet, cp2x:p.cp2x, cp2y:p.cp2y, cp2UserSet:p.cp2UserSet}))));
        this._recalculateAllControlPoints(); 
        console.log('FabricLine loadData: After _recalculateAllControlPoints. Current this.points:', JSON.stringify(this.points.map(p => ({x:p.x, y:p.y, cp1x:p.cp1x, cp1y:p.cp1y, cp1UserSet:p.cp1UserSet, cp2x:p.cp2x, cp2y:p.cp2y, cp2UserSet:p.cp2UserSet}))));

        if (this.points.length >= 1) {
          this.updateLine();
        }
      } catch (err) { console.error('加载数据失败:', err); }
      finally {
        this.$nextTick(() => {
          this.isDataLoading = false;
          console.log('FabricLine loadData: Finished, isDataLoading set to false.');
        });
      }
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
    _updateControlPointsForPoint(index) {
      if (index < 0 || index >= this.points.length) return;

      const targetPoint = this.points[index];
      const prevPoint = this.points[index - 1]; // May be undefined
      const nextPoint = this.points[index + 1]; // May be undefined

      console.log(`_updateControlPointsForPoint for index ${index}: Initial targetPoint state: cp1UserSet=${targetPoint.cp1UserSet}, cp1x=${targetPoint.cp1x}, cp1y=${targetPoint.cp1y}, cp2UserSet=${targetPoint.cp2UserSet}, cp2x=${targetPoint.cp2x}, cp2y=${targetPoint.cp2y}`);

      // --- CP1 LOGIC (Incoming curve to targetPoint) ---
      if (prevPoint) { // If there's a previous point, targetPoint can have a cp1
        if (!targetPoint.cp1UserSet) {
          console.log(`  _updateControlPointsForPoint: Recalculating cp1 for point ${index}.`);
          const [cp1x, cp1y] = this._controlPoint(targetPoint, prevPoint, nextPoint, true, 0.2);
          targetPoint.cp1x = cp1x;
          targetPoint.cp1y = cp1y;
        } else {
          console.log(`  _updateControlPointsForPoint: Skipping cp1 recalculation for point ${index} due to cp1UserSet=true.`);
        }
      } else { // No previous point, so targetPoint is the START point (P0)
        if (!targetPoint.cp1UserSet) { // P0 should not have a cp1 unless user explicitly set (e.g. for a closed path, though not our case here)
          // console.log(`  _updateControlPointsForPoint: Deleting cp1 for START point ${index} as it's not user-set.`);
          delete targetPoint.cp1x;
          delete targetPoint.cp1y;
        } else {
          // console.log(`  _updateControlPointsForPoint: Retaining user-set cp1 for START point ${index}.`);
        }
      }

      // --- CP2 LOGIC (Outgoing curve from targetPoint) ---
      if (nextPoint) { // If there's a next point, targetPoint can have a cp2
        if (!targetPoint.cp2UserSet) {
          console.log(`  _updateControlPointsForPoint: Recalculating cp2 for point ${index}.`);
          const [cp2x, cp2y] = this._controlPoint(targetPoint, prevPoint, nextPoint, false, 0.2);
          targetPoint.cp2x = cp2x;
          targetPoint.cp2y = cp2y;
        } else {
          console.log(`  _updateControlPointsForPoint: Skipping cp2 recalculation for point ${index} due to cp2UserSet=true.`);
        }
      } else { // No next point, so targetPoint is the END point (P_last)
        if (!targetPoint.cp2UserSet) { // P_last should not have a cp2 unless user explicitly set
          // console.log(`  _updateControlPointsForPoint: Deleting cp2 for END point ${index} as it's not user-set.`);
          delete targetPoint.cp2x;
          delete targetPoint.cp2y;
        } else {
          // console.log(`  _updateControlPointsForPoint: Retaining user-set cp2 for END point ${index}.`);
        }
      }

      // --- Refined Endpoint Specific Calculations (if not UserSet and applicable) ---
      // This part adjusts the smoothing/calculation for the *single* control point an endpoint naturally has.
      if (this.points.length >= 2) {
        if (index === 0 && this.points[1]) { // Current point is START (P0), and there's a P1
          if (!targetPoint.cp2UserSet) { // targetPoint is this.points[0]. We are recalculating P0's cp2.
            console.log(`  _updateControlPointsForPoint: Applying specific cp2 calculation for START point ${index}.`);
            const [cp2x_start, cp2y_start] = this._controlPoint(targetPoint, targetPoint, this.points[1], false, 0.1);
            targetPoint.cp2x = cp2x_start;
            targetPoint.cp2y = cp2y_start;
          }
        } else if (index === this.points.length - 1 && this.points[index - 1]) { // Current point is END (P_last), and there's a P_second_last
          if (!targetPoint.cp1UserSet) { // targetPoint is P_last. We are recalculating P_last's cp1.
            console.log(`  _updateControlPointsForPoint: Applying specific cp1 calculation for END point ${index}.`);
            const pSecondLast = this.points[index - 1];
            const [cp1x_end, cp1y_end] = this._controlPoint(targetPoint, pSecondLast, targetPoint, true, 0.1);
            targetPoint.cp1x = cp1x_end;
            targetPoint.cp1y = cp1y_end;
          }
        }
      }
      console.log(`_updateControlPointsForPoint for index ${index}: Final targetPoint state: cp1UserSet=${targetPoint.cp1UserSet}, cp1x=${targetPoint.cp1x}, cp1y=${targetPoint.cp1y}, cp2UserSet=${targetPoint.cp2UserSet}, cp2x=${targetPoint.cp2x}, cp2y=${targetPoint.cp2y}`);
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
