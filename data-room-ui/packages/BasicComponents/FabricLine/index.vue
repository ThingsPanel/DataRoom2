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
      isDataLoading: false
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
        if (newData && Array.isArray(newData) && newData.length >= 2 && this.initialized) {
          const lineData = [{ points: newData.map(p => ({ x: p.x, y: p.y })) }];
          this.isDataLoading = true;
          this.loadData(lineData);
          this.isDataLoading = false;
        }
      },
      deep: true
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initDrawingEditor()
      this.setupCtrlKeyListener();

      if (this.config?.customize?.points?.length >= 2) {
        const pointsData = this.config.customize.points;
        const lineData = [{ points: pointsData.map(p => ({ x: p.x, y: p.y })) }];
        setTimeout(() => {
          this.isDataLoading = true;
          this.loadData(lineData);
          this.isDataLoading = false;
        }, 200);
      }
      this.setupGlobalMouseEvents();
    })
  },
  beforeDestroy() {
    this.updatePathsData();
    if (this.pointDragHandler) {
      this.pointDragHandler.destroy();
      this.pointDragHandler = null;
    }
    this.removeCtrlKeyListener();
  },
  created() {
    this.pointDragHandler = createPointDragHandler({
      isOverallEditModeActive: () => this.isEditMode,
      getCtrlKeyState: () => this.isCtrlDown,
      updateLine: this.drawLinePath,
      updatePathsData: this.updatePathsData,
      onContainerResize: this.handleContainerResize,
      onDragStart: (index, point) => {
        console.log(`拖动点开始 ${index}:`, point.x, point.y);
        this.$emit('dragging-point', true);
      },
      onDrag: (index, point, dx, dy) => {
        // console.log(`拖动点 ${index} 偏移:`, dx, dy); // 可以取消注释以调试
      },
      onDragEnd: (index) => {
        console.log(`拖动点结束 ${index}`);
        this.updatePathsData();
        this.$emit('dragging-point', false);
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
        'isCtrlDown (data):', this.isCtrlDown
      );

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
        this.draw.on('click', this.handleClick)
        this.initialized = true
      } catch (err) {
        console.error('初始化绘图编辑器失败:', err)
      }
    },
    addPoint(x, y) {
      if (!this.draw) return;
      console.log('addPoint: 添加点:', x, y);
      const point = this.draw.circle(this.pointRadius * 2)
        .center(x, y)
        .fill(this.pointColor);
      const pointData = { x, y, element: point };
      this.points.push(pointData);
      const pointIndex = this.points.length - 1;
      point.on('mousedown', (e) => {
        e.stopPropagation();
        if (this.pointDragHandler) {
          this.pointDragHandler.handlePointMouseDown(e, pointIndex, this.points);
        }
      });
      point.on('click', (e) => e.stopPropagation());
      if (this.points.length >= 2) this.updateLine();
      this.updatePathsData();
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
        const point = this.draw.circle(this.pointRadius * 2).move(x - this.pointRadius, y - this.pointRadius).fill(this.pointColor);
        const newPoint = { x, y, element: point };
        const insertIndex = targetSegment.index + 1;
        this.points.splice(insertIndex, 0, newPoint);
        point.on('mousedown', (e) => {
          e.stopPropagation();
          if (this.pointDragHandler) {
            this.pointDragHandler.handlePointMouseDown(e, insertIndex, this.points);
          }
        });
        point.on('click', (e) => e.stopPropagation());
        this.updateLine();
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
      if (!this.draw || this.points.length < 1) return; // 允许单点，但不会画线
      if (this.currentLine) this.currentLine.remove();
      
      let path = '';
      const pts = this.points.map(p => ({ x: p.x, y: p.y })); // 使用纯数据点进行计算

      if (pts.length < 2) {
        // 如果点少于2个，不画线 (或者只画一个点，但目前逻辑是画线)
        if (this.currentLine) this.currentLine.remove();
        this.currentLine = null;
        return;
      }

      switch (this.lineShapeType) {
        case 'cubicBezier':
          if (pts.length < 2) break; // 至少需要2个点来尝试画曲线
          path = `M${pts[0].x},${pts[0].y}`;
          if (pts.length === 2) { // 如果只有两个点，画直线
             path += ` L${pts[1].x},${pts[1].y}`;
          } else {
            for (let i = 0; i < pts.length - 1; i++) {
              const p0 = pts[i > 0 ? i -1 : 0];
              const p1 = pts[i];
              const p2 = pts[i+1];
              const p3 = pts[i+2 < pts.length ? i+2 : pts.length -1];

              const [cp1x, cp1y] = this._controlPoint(p0, pts[i > 1 ? i - 2 : 0] , p1, false, 0.2); // 根据前一个点和当前点计算第一个控制点
              const [cp2x, cp2y] = this._controlPoint(p1, p0, p2, true, 0.2);    // 根据当前点和下一个点计算第二个控制点
              
              // 更正：应该是基于当前段 p1 -> p2 来计算控制点
              // p1是当前点，p2是下一个点
              // 控制点1：从p1出发，朝向p2，受p0影响
              // 控制点2：到达p2之前，从p1过来，受p3影响
              const [cpsX, cpsY] = this._controlPoint(pts[i], pts[i - 1], pts[i + 1], false, 0.2);
              const [cpeX, cpeY] = this._controlPoint(pts[i + 1], pts[i], pts[i + 2], true, 0.2);

              if (i === 0) { // 对于第一段特殊处理，使其更自然地开始
                 const [cp1ForP0X, cp1ForP0Y] = this._controlPoint(pts[i], pts[i] , pts[i+1], false, 0.1);
                 const [cp2ForP1X, cp2ForP1Y] = this._controlPoint(pts[i+1], pts[i], pts[i+2], true, 0.2);
                 path = `M${pts[i].x},${pts[i].y} C${cp1ForP0X},${cp1ForP0Y} ${cp2ForP1X},${cp2ForP1Y} ${pts[i+1].x},${pts[i+1].y}`;
              } else {
                 path += ` S${cpsX},${cpsY} ${pts[i+1].x},${pts[i+1].y}`; // 使用S命令平滑连接
                 // 或者标准Cubic: path += ` C${cpsX},${cpsY} ${cpeX},${cpeY} ${pts[i+1].x},${pts[i+1].y}`;
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
      this.points = []; this.lines = []; this.currentLine = null; this.pathsData = [];
      if (this.config) {
        const currentCustomize = this.config.customize || {};
        this.$emit('update:config', { ...this.config, customize: { ...currentCustomize, points: [] } });
      }
      this.$emit('drawing-cleared');
    },
    updatePathsData() {
      if (this.isDataLoading) return;
      this.points.forEach((point) => {
        if (point.element) {
          if (typeof point.element.cx === 'function') {
            const actualX = point.element.cx();
            const actualY = point.element.cy();
            point.x = actualX;
            point.y = actualY;
          } else {
            const bbox = point.element.bbox();
            const centerX = bbox.x + bbox.width / 2;
            const centerY = bbox.y + bbox.height / 2;
            point.x = centerX;
            point.y = centerY;
          }
        }
      });
      const allPoints = this.points.map(p => ({x: p.x, y: p.y}));
      this.pathsData = allPoints;
      if (this.config) {
        if (!this.config.customize) this.config.customize = {};
        this.config.customize.points = [...allPoints];
        this.$emit('update:config', {...this.config});
      }
    },
    getData() {
      const lineData = this.lines.map(line => ({ points: line.points.map(p => ({ x: p.x, y: p.y })) }));
      if (this.currentLine && this.points.length >= 2) lineData.push({ points: this.points.map(p => ({ x: p.x, y: p.y })) });
      return { lines: lineData };
    },
    loadData(data) {
      this.clearDrawing();
      if (!data || !Array.isArray(data)) return;
      try {
        const allPoints = [];
        data.forEach(lineData => lineData.points?.forEach(p => allPoints.push(p)));
        if (allPoints.length >= 2) {
          allPoints.forEach((p, i) => {
            const point = this.draw.circle(this.pointRadius * 2).center(p.x, p.y).fill(this.pointColor);
            const pointData = { x: p.x, y: p.y, element: point };
            this.points.push(pointData);
            point.on('mousedown', (e) => {
              e.stopPropagation();
              if (this.pointDragHandler) this.pointDragHandler.handlePointMouseDown(e, i, this.points);
            });
            point.on('click', (e) => e.stopPropagation());
          });
          this.updateLine();
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
