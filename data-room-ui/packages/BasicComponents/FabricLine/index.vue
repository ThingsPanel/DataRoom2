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
    // 绘制模式
    drawMode() {
      return this.config?.customize?.drawMode || 'key_ctrl'
    }
  },
  watch: {
    'config.customize.lineColor'() {
      this.updateLinesStyle()
    },
    'config.customize.lineWidth'() {
      this.updateLinesStyle()
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
      if (!this.draw || this.points.length < 2) return;
      if (this.currentLine) this.currentLine.remove();
      try {
        let path = '';
        this.points.forEach((point, index) => {
          let x, y;
          if (point.element && typeof point.element.cx === 'function') {
            x = point.element.cx(); y = point.element.cy();
            point.x = x; point.y = y;
          } else {
            x = point.x; y = point.y;
          }
          path += index === 0 ? `M${x},${y} ` : `L${x},${y} `;
        });
        this.currentLine = this.draw.path(path).fill('none').stroke({ color: this.lineColor, width: this.lineWidth });
        this.currentLine.back();
      } catch (err) { console.error('线段绘制失败:', err); }
    },
    updateLine() {
      this.drawLinePath();
      this.updatePathsData();
    },
    updateLinesStyle() {
      if (this.currentLine) this.currentLine.stroke({ color: this.lineColor, width: this.lineWidth });
      this.lines.forEach(line => { if (line.path) line.path.stroke({ color: this.lineColor, width: this.lineWidth }) });
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
