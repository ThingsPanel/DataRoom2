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
      ref="konvaContainer"
      style="width: 100%; height: 100%; overflow: visible;"
    ></div>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import { EventBus } from 'data-room-ui/js/utils/eventBus'
import Konva from 'konva'
import {
  initPointsFromConfig,
  savePoints
} from './utils/controls'

export default {
  name: 'CanvasLine',
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
      stage: null,
      layer: null,
      lineLayer: null,
      animationLayer: null,
      controlLayer: null,
      line: null,
      points: [],
      animations: [],
      isDragging: false,
      isAdjustingSize: false,
      justFinishedDragging: false,
      dragTimeoutId: null
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
      if (!this.config.customize?.dashed) return []
      const dashLength = this.config.customize?.dashLength || 5
      return [dashLength, dashLength]
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
        glowWidth: 10,
        direction: 'forward'
      }
    },
    lineType() {
      if (this.config.customize?.lineType) {
        return this.config.customize.lineType;
      }
      return this.config.customize?.curved ? 'curved' : 'straight';
    },
    konvaPoints() {
      // 将点数组转换为Konva需要的格式
      const flatPoints = [];
      this.points.forEach(point => {
        flatPoints.push(point.x, point.y);
      });
      return flatPoints;
    }
  },
  watch: {
    config: {
      handler(newVal, oldVal) {
        if (newVal._fromCanvasDrag) {
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
    selected(val) {
      this.updateControlPoints();
    },
    lineColor() {
      this.updateLineStyle();
    },
    lineWidth() {
      this.updateLineStyle();
    },
    opacity() {
      this.updateLineStyle();
    },
    dashArray() {
      this.updateLineStyle();
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
    lineType() {
      this.updateLine();
    }
  },
  mounted() {
    this.initKonva();
    this.initFromConfig();

    // 监听窗口大小变化
    window.addEventListener('resize', this.handleResize);

    // 监听动画刷新事件
    EventBus.$on('canvasline-refresh-animation', this.refreshAnimation);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize);
    EventBus.$off('canvasline-refresh-animation', this.refreshAnimation);

    // 清理Konva资源
    if (this.stage) {
      this.stage.destroy();
    }

    // 清理动画
    this.clearAnimations();
  },
  methods: {
    initKonva() {
      // 创建Konva舞台
      this.stage = new Konva.Stage({
        container: this.$refs.konvaContainer,
        width: this.config.w,
        height: this.config.h
      });

      // 创建图层
      this.lineLayer = new Konva.Layer();
      this.animationLayer = new Konva.Layer();
      this.controlLayer = new Konva.Layer();

      this.stage.add(this.lineLayer);
      this.stage.add(this.animationLayer);
      this.stage.add(this.controlLayer);
    },

    initFromConfig() {
      this.points = initPointsFromConfig(this.config);

      // 如果点不够，使用默认点
      if (this.points.length < 2) {
        this.points = [
          { x: this.config.w * 0.2, y: this.config.h * 0.5 },
          { x: this.config.w * 0.8, y: this.config.h * 0.5 }
        ];
      }

      this.updateLine();
      this.updateControlPoints();
      this.updateAnimation();
    },

    updateLine() {
      // 清除现有线条
      if (this.line) {
        this.line.destroy();
      }

      // 根据线型创建不同的线条
      switch (this.lineType) {
        case 'curved':
          this.line = new Konva.Line({
            points: this.konvaPoints,
            stroke: this.lineColor,
            strokeWidth: this.lineWidth,
            opacity: this.opacity,
            dash: this.dashArray,
            tension: 0.5,
            lineCap: 'round',
            lineJoin: 'round'
          });
          break;

        case 'step':
          // 创建阶梯线
          const stepPoints = [];

          for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            // 添加水平线段点
            stepPoints.push(p1.x, p1.y);
            stepPoints.push(p2.x, p1.y);

            // 添加垂直线段点（除了最后一段）
            if (i < this.points.length - 2) {
              stepPoints.push(p2.x, p1.y);
              stepPoints.push(p2.x, p2.y);
            } else {
              // 最后一段直接连到终点
              stepPoints.push(p2.x, p2.y);
            }
          }

          this.line = new Konva.Line({
            points: stepPoints,
            stroke: this.lineColor,
            strokeWidth: this.lineWidth,
            opacity: this.opacity,
            dash: this.dashArray,
            lineCap: 'round',
            lineJoin: 'round'
          });
          break;

        case 'bezier':
          // 贝塞尔曲线实现
          const bezierPoints = [];

          for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            // 计算控制点
            let cp1x, cp1y, cp2x, cp2y;

            if (i === 0) {
              cp1x = p1.x + (p2.x - p1.x) / 4;
              cp1y = p1.y;
            } else {
              const prev = this.points[i - 1];
              cp1x = p1.x + (p2.x - prev.x) / 4;
              cp1y = p1.y + (p2.y - prev.y) / 4;
            }

            if (i === this.points.length - 2) {
              cp2x = p2.x - (p2.x - p1.x) / 4;
              cp2y = p2.y;
            } else {
              const next = this.points[i + 2];
              cp2x = p2.x - (next.x - p1.x) / 4;
              cp2y = p2.y - (next.y - p1.y) / 4;
            }

            if (i === 0) {
              bezierPoints.push('M', p1.x, p1.y);
            }

            bezierPoints.push('C', cp1x, cp1y, cp2x, cp2y, p2.x, p2.y);
          }

          this.line = new Konva.Path({
            data: bezierPoints.join(' '),
            stroke: this.lineColor,
            strokeWidth: this.lineWidth,
            opacity: this.opacity,
            dash: this.dashArray,
            lineCap: 'round',
            lineJoin: 'round'
          });
          break;

        case 'smooth':
          // 平滑曲线实现 (使用Konva的tension属性)
          this.line = new Konva.Line({
            points: this.konvaPoints,
            stroke: this.lineColor,
            strokeWidth: this.lineWidth,
            opacity: this.opacity,
            dash: this.dashArray,
            tension: 0.8, // 更高的tension值使曲线更平滑
            lineCap: 'round',
            lineJoin: 'round'
          });
          break;

        case 'straight':
        default:
          this.line = new Konva.Line({
            points: this.konvaPoints,
            stroke: this.lineColor,
            strokeWidth: this.lineWidth,
            opacity: this.opacity,
            dash: this.dashArray,
            lineCap: 'round',
            lineJoin: 'round'
          });
          break;
      }

      // 添加线条到图层
      this.lineLayer.add(this.line);
      this.lineLayer.draw();

      // 更新动画
      this.refreshAnimation();
    },

    // 更新线条样式
    updateLineStyle() {
      if (!this.line) return;

      this.line.stroke(this.lineColor);
      this.line.strokeWidth(this.lineWidth);
      this.line.opacity(this.opacity);
      this.line.dash(this.dashArray);

      this.lineLayer.draw();
    },

    // 更新控制点
    updateControlPoints() {
      // 清除现有控制点
      this.controlLayer.destroyChildren();

      if (!this.selected) {
        this.controlLayer.draw();
        return;
      }

      // 为每个点创建控制点
      this.points.forEach((point, index) => {
        const circle = new Konva.Circle({
          x: point.x,
          y: point.y,
          radius: 7,
          fill: '#1890ff',
          stroke: '#fff',
          strokeWidth: 2,
          draggable: true
        });

        // 拖拽开始
        circle.on('dragstart', () => {
          this.isDragging = true;
        });

        // 拖拽中
        circle.on('dragmove', () => {
          // 更新点位置
          this.points[index].x = circle.x();
          this.points[index].y = circle.y();

          // 更新线条
          this.updateLine();

          // 检查是否需要调整容器大小
          this.checkAndAdjustSize();
        });

        // 拖拽结束
        circle.on('dragend', () => {
          this.isDragging = false;
          this.savePoints();

          // 设置标志，防止拖拽后立即触发其他操作
          this.justFinishedDragging = true;
          this.dragTimeoutId = setTimeout(() => {
            this.justFinishedDragging = false;
          }, 300);
        });

        // 双击删除点
        circle.on('dblclick', () => {
          if (this.points.length <= 2) return; // 至少保留两个点

          // 删除点
          this.points.splice(index, 1);

          // 更新线条和控制点
          this.updateLine();
          this.updateControlPoints();
          this.savePoints();
        });

        this.controlLayer.add(circle);
      });

      // 添加线段点击事件，用于在线段上添加新点
      if (this.line) {
        this.line.on('click', (e) => {
          if (!this.selected) return;

          // 获取点击位置
          const pos = this.stage.getPointerPosition();

          // 找到最近的线段
          let minDistance = Infinity;
          let insertIndex = -1;

          for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            // 计算点到线段的距离
            const distance = this.getDistanceToLineSegment(pos.x, pos.y, p1, p2);

            if (distance < minDistance) {
              minDistance = distance;
              insertIndex = i + 1;
            }
          }

          // 如果距离小于阈值，在线段上添加新点
          if (minDistance < 10 && insertIndex !== -1) {
            // 计算新点在线段上的投影点
            const p1 = this.points[insertIndex - 1];
            const p2 = this.points[insertIndex];
            const newPoint = this.getProjectionPoint(pos.x, pos.y, p1, p2);

            // 在指定位置插入新点
            this.points.splice(insertIndex, 0, newPoint);

            // 更新线条和控制点
            this.updateLine();
            this.updateControlPoints();
            this.savePoints();
          }
        });
      }

      this.controlLayer.draw();
    },

    // 计算点到线段的距离
    getDistanceToLineSegment(x, y, p1, p2) {
      const A = x - p1.x;
      const B = y - p1.y;
      const C = p2.x - p1.x;
      const D = p2.y - p1.y;

      const dot = A * C + B * D;
      const len_sq = C * C + D * D;
      let param = -1;

      if (len_sq !== 0) {
        param = dot / len_sq;
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

    // 计算点在线段上的投影点
    getProjectionPoint(x, y, p1, p2) {
      const A = x - p1.x;
      const B = y - p1.y;
      const C = p2.x - p1.x;
      const D = p2.y - p1.y;

      const dot = A * C + B * D;
      const len_sq = C * C + D * D;
      let param = -1;

      if (len_sq !== 0) {
        param = dot / len_sq;
      }

      // 限制投影点在线段上
      param = Math.max(0, Math.min(1, param));

      return {
        x: p1.x + param * C,
        y: p1.y + param * D
      };
    },

    // 检查并调整容器大小
    checkAndAdjustSize() {
      // 获取点的最大最小坐标
      const xValues = this.points.map(p => p.x);
      const yValues = this.points.map(p => p.y);

      const minX = Math.min(...xValues);
      const maxX = Math.max(...xValues);
      const minY = Math.min(...yValues);
      const maxY = Math.max(...yValues);

      // 检查是否有点超出容器边界
      if (minX < 0 || minY < 0 || maxX > this.config.w || maxY > this.config.h) {
        this.isAdjustingSize = true;

        // 调整容器大小
        const padding = 10;
        const newWidth = Math.max(this.config.w, maxX + padding);
        const newHeight = Math.max(this.config.h, maxY + padding);

        // 更新配置
        const newConfig = {
          ...this.config,
          w: newWidth,
          h: newHeight,
          _fromCanvasDrag: true
        };

        // 更新舞台大小
        this.stage.width(newWidth);
        this.stage.height(newHeight);

        // 发出更新事件
        this.$emit('change', newConfig);

        this.isAdjustingSize = false;
      }
    },

    // 保存点到配置
    savePoints() {
      if (!this.points || this.points.length < 2) return;

      // 创建新的配置对象
      const newConfig = { ...this.config };

      // 确保customize对象存在
      if (!newConfig.customize) {
        newConfig.customize = {};
      }

      // 保存点数组
      newConfig.customize.points = [...this.points];

      // 发出更新事件
      this.$emit('change', newConfig);
    },

    // 计算贝塞尔曲线上的点
    bezierPoint(p0, p1, p2, p3, t) {
      const mt = 1 - t;
      return mt * mt * mt * p0 + 3 * mt * mt * t * p1 + 3 * mt * t * t * p2 + t * t * t * p3;
    },

    // 刷新动画
    refreshAnimation() {
      // 如果没有定义updateAnimation方法，先返回
      if (typeof this.updateAnimation !== 'function') return;

      this.updateAnimation();
    },

    // 清除动画
    clearAnimations() {
      // 停止所有动画
      this.animations.forEach(anim => {
        if (anim) {
          anim.stop();
        }
      });

      // 清空动画数组
      this.animations = [];

      // 清除动画层
      if (this.animationLayer) {
        this.animationLayer.destroyChildren();
        this.animationLayer.draw();
      }
    },

    // 更新动画
    updateAnimation() {
      // 清除现有动画
      this.clearAnimations();

      // 如果没有启用动画或没有线条，则返回
      if (!this.animation.enable || !this.line) {
        return;
      }

      // 根据动画类型创建不同的动画效果
      switch (this.animation.type) {
        case 'flow':
          this.createFlowAnimation();
          break;
        case 'particle':
          this.createParticleAnimation();
          break;
        case 'glow':
          this.createGlowAnimation();
          break;
        default:
          this.createFlowAnimation();
          break;
      }
    },

    // 创建流动动画
    createFlowAnimation() {
      // 获取线条点
      let pathPoints = [];

      // 根据线型获取路径点
      if (this.lineType === 'curved' || this.lineType === 'smooth') {
        // 对于曲线，需要生成更多的点来平滑动画
        pathPoints = this.getPathPoints(100);
      } else if (this.lineType === 'step') {
        // 对于阶梯线，使用阶梯点
        const stepPoints = [];
        for (let i = 0; i < this.points.length - 1; i++) {
          const p1 = this.points[i];
          const p2 = this.points[i + 1];

          stepPoints.push({ x: p1.x, y: p1.y });
          stepPoints.push({ x: p2.x, y: p1.y });

          if (i < this.points.length - 2) {
            stepPoints.push({ x: p2.x, y: p1.y });
            stepPoints.push({ x: p2.x, y: p2.y });
          } else {
            stepPoints.push({ x: p2.x, y: p2.y });
          }
        }
        pathPoints = stepPoints;
      } else if (this.lineType === 'bezier') {
        // 对于贝塞尔曲线，生成更多的点
        pathPoints = this.getPathPoints(100);
      } else {
        // 对于直线，使用原始点
        pathPoints = [...this.points];
      }

      // 如果点不足，返回
      if (pathPoints.length < 2) {
        return;
      }

      // 创建流动线
      const flowLine = new Konva.Line({
        points: [],
        stroke: this.animation.flowColor || 'rgba(24, 144, 255, 0.6)',
        strokeWidth: this.lineWidth,
        lineCap: 'round',
        lineJoin: 'round'
      });

      this.animationLayer.add(flowLine);

      // 计算路径总长度
      let totalLength = 0;
      for (let i = 0; i < pathPoints.length - 1; i++) {
        const p1 = pathPoints[i];
        const p2 = pathPoints[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        totalLength += Math.sqrt(dx * dx + dy * dy);
      }

      // 流动线长度
      const flowLength = this.animation.flowLength || 30;

      // 动画速度
      const speed = this.animation.speed || 5;

      // 动画方向
      const isForward = this.animation.direction !== 'backward';

      // 创建动画
      let offset = 0;
      const anim = new Konva.Animation((frame) => {
        if (!frame) return;

        // 计算偏移量
        offset += (frame.timeDiff * speed) / 1000;
        if (offset > 1) {
          offset = 0;
        }

        // 计算流动线的起点和终点
        let startPercent = offset;
        let endPercent = startPercent + (flowLength / totalLength);

        if (!isForward) {
          startPercent = 1 - startPercent;
          endPercent = startPercent - (flowLength / totalLength);
        }

        // 获取流动线的点
        const flowPoints = this.getPointsAtPercentage(pathPoints, startPercent, endPercent, isForward);

        // 更新流动线
        if (flowPoints && flowPoints.length >= 2) {
          const flatPoints = [];
          flowPoints.forEach(p => {
            flatPoints.push(p.x, p.y);
          });
          flowLine.points(flatPoints);
        }
      }, this.animationLayer);

      // 启动动画
      anim.start();

      // 保存动画引用
      this.animations.push(anim);
    },

    // 创建粒子动画
    createParticleAnimation() {
      // 获取路径点
      const pathPoints = this.getPathPoints(100);

      // 如果点不足，返回
      if (pathPoints.length < 2) {
        return;
      }

      // 粒子大小
      const particleSize = this.animation.particleSize || 3;

      // 粒子颜色
      const particleColor = this.animation.particleColor || '#fff';

      // 动画速度
      const speed = this.animation.speed || 5;

      // 动画方向
      const isForward = this.animation.direction !== 'backward';

      // 创建粒子
      const particle = new Konva.Circle({
        x: isForward ? pathPoints[0].x : pathPoints[pathPoints.length - 1].x,
        y: isForward ? pathPoints[0].y : pathPoints[pathPoints.length - 1].y,
        radius: particleSize,
        fill: particleColor
      });

      this.animationLayer.add(particle);

      // 创建动画
      let offset = 0;
      const anim = new Konva.Animation((frame) => {
        if (!frame) return;

        // 计算偏移量
        offset += (frame.timeDiff * speed) / 1000;
        if (offset > 1) {
          offset = 0;
        }

        // 计算粒子位置
        const percent = isForward ? offset : 1 - offset;
        const pos = this.getPointAtPercentage(pathPoints, percent);

        // 更新粒子位置
        if (pos) {
          particle.x(pos.x);
          particle.y(pos.y);
        }
      }, this.animationLayer);

      // 启动动画
      anim.start();

      // 保存动画引用
      this.animations.push(anim);
    },

    // 创建发光动画
    createGlowAnimation() {
      // 创建发光线
      const glowLine = new Konva.Line({
        points: this.konvaPoints,
        stroke: this.animation.glowColor || 'rgba(24, 144, 255, 0.3)',
        strokeWidth: (this.animation.glowWidth || 10) + this.lineWidth,
        opacity: 0.5,
        lineCap: 'round',
        lineJoin: 'round'
      });

      if (this.lineType === 'curved') {
        glowLine.tension(0.5);
      } else if (this.lineType === 'smooth') {
        glowLine.tension(0.8);
      }

      this.animationLayer.add(glowLine);

      // 创建动画
      const anim = new Konva.Animation((frame) => {
        if (!frame) return;

        // 计算不透明度
        const frequency = this.animation.speed || 5;
        const opacity = 0.3 + 0.2 * Math.sin((frame.time * frequency) / 1000);

        // 更新不透明度
        glowLine.opacity(opacity);
      }, this.animationLayer);

      // 启动动画
      anim.start();

      // 保存动画引用
      this.animations.push(anim);
    },

    // 获取路径上的点
    getPathPoints(segments = 50) {
      const pathPoints = [];

      if (this.points.length < 2) {
        return pathPoints;
      }

      // 根据线型生成路径点
      switch (this.lineType) {
        case 'curved':
          // 使用张力参数生成曲线点
          for (let i = 0; i < segments; i++) {
            const t = i / (segments - 1);
            const point = this.getPointOnCurve(this.points, t, 0.5);
            pathPoints.push(point);
          }
          break;

        case 'bezier':
          // 生成贝塞尔曲线点
          for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            // 计算控制点
            let cp1x, cp1y, cp2x, cp2y;

            if (i === 0) {
              cp1x = p1.x + (p2.x - p1.x) / 4;
              cp1y = p1.y;
            } else {
              const prev = this.points[i - 1];
              cp1x = p1.x + (p2.x - prev.x) / 4;
              cp1y = p1.y + (p2.y - prev.y) / 4;
            }

            if (i === this.points.length - 2) {
              cp2x = p2.x - (p2.x - p1.x) / 4;
              cp2y = p2.y;
            } else {
              const next = this.points[i + 2];
              cp2x = p2.x - (next.x - p1.x) / 4;
              cp2y = p2.y - (next.y - p1.y) / 4;
            }

            // 生成贝塞尔曲线点
            for (let t = 0; t <= 1; t += 1 / (segments / this.points.length)) {
              const x = this.bezierPoint(p1.x, cp1x, cp2x, p2.x, t);
              const y = this.bezierPoint(p1.y, cp1y, cp2y, p2.y, t);
              pathPoints.push({ x, y });
            }
          }
          break;

        case 'smooth':
          // 使用更高的张力参数生成平滑曲线点
          for (let i = 0; i < segments; i++) {
            const t = i / (segments - 1);
            const point = this.getPointOnCurve(this.points, t, 0.8);
            pathPoints.push(point);
          }
          break;

        case 'step':
          // 生成阶梯线点
          for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            pathPoints.push({ x: p1.x, y: p1.y });
            pathPoints.push({ x: p2.x, y: p1.y });

            if (i < this.points.length - 2) {
              pathPoints.push({ x: p2.x, y: p1.y });
              pathPoints.push({ x: p2.x, y: p2.y });
            } else {
              pathPoints.push({ x: p2.x, y: p2.y });
            }
          }
          break;

        case 'straight':
        default:
          // 直线就是原始点
          for (let i = 0; i < this.points.length - 1; i++) {
            const p1 = this.points[i];
            const p2 = this.points[i + 1];

            // 在两点之间插值生成更多的点
            for (let t = 0; t <= 1; t += 1 / (segments / this.points.length)) {
              const x = p1.x + (p2.x - p1.x) * t;
              const y = p1.y + (p2.y - p1.y) * t;
              pathPoints.push({ x, y });
            }
          }
          break;
      }

      return pathPoints;
    },

    // 获取曲线上的点
    getPointOnCurve(points, t, tension) {
      if (points.length < 2) return { x: 0, y: 0 };

      // 如果t在起点或终点，直接返回
      if (t === 0) return { ...points[0] };
      if (t === 1) return { ...points[points.length - 1] };

      // 计算t对应的点索引
      const i = Math.floor(t * (points.length - 1));
      const mt = (t * (points.length - 1)) - i;

      // 获取周围的点
      const p0 = points[Math.max(0, i - 1)];
      const p1 = points[i];
      const p2 = points[Math.min(points.length - 1, i + 1)];
      const p3 = points[Math.min(points.length - 1, i + 2)];

      // 使用Cardinal样条插值
      const t1 = tension;
      const t2 = tension;

      const c1x = p2.x - p0.x;
      const c1y = p2.y - p0.y;
      const c2x = p3.x - p1.x;
      const c2y = p3.y - p1.y;

      const a1x = p1.x + (c1x * t1 * (1 - mt)) / 6;
      const a1y = p1.y + (c1y * t1 * (1 - mt)) / 6;
      const a2x = p2.x - (c2x * t2 * mt) / 6;
      const a2y = p2.y - (c2y * t2 * mt) / 6;

           // 计算插值点
           const x = this.bezierPoint(p1.x, a1x, a2x, p2.x, mt);
      const y = this.bezierPoint(p1.y, a1y, a2y, p2.y, mt);

      return { x, y };
    },

    // 获取指定百分比位置的点
    getPointAtPercentage(points, percent) {
      if (!points || points.length < 2) return null;

      // 确保百分比在0-1之间
      percent = Math.max(0, Math.min(1, percent));

      if (percent === 0) return points[0];
      if (percent === 1) return points[points.length - 1];

      // 计算路径总长度和各段长度
      const lengths = [];
      let totalLength = 0;

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        lengths.push(length);
        totalLength += length;
      }

      // 计算目标距离
      const targetDistance = percent * totalLength;

      // 找到目标点所在的线段
      let currentDistance = 0;
      let segmentIndex = 0;

      for (let i = 0; i < lengths.length; i++) {
        if (currentDistance + lengths[i] >= targetDistance) {
          segmentIndex = i;
          break;
        }
        currentDistance += lengths[i];
      }

      // 计算线段内的百分比
      const segmentPercent = (targetDistance - currentDistance) / lengths[segmentIndex];

      // 计算目标点坐标
      const p1 = points[segmentIndex];
      const p2 = points[segmentIndex + 1];

      return {
        x: p1.x + (p2.x - p1.x) * segmentPercent,
        y: p1.y + (p2.y - p1.y) * segmentPercent
      };
    },

    // 获取指定百分比范围内的点
    getPointsAtPercentage(points, startPercent, endPercent, isForward = true) {
      if (!points || points.length < 2) return [];

      // 确保百分比在0-1之间
      startPercent = Math.max(0, Math.min(1, startPercent));
      endPercent = Math.max(0, Math.min(1, endPercent));

      // 如果起点和终点相同，返回空数组
      if (startPercent === endPercent) return [];

      // 确保起点小于终点
      if (startPercent > endPercent) {
        if (isForward) {
          // 如果是向前方向，跨越了终点，分成两段
          const firstSegment = this.getPointsAtPercentage(points, startPercent, 1, isForward);
          const secondSegment = this.getPointsAtPercentage(points, 0, endPercent, isForward);
          return [...firstSegment, ...secondSegment];
        } else {
          // 如果是向后方向，交换起点和终点
          [startPercent, endPercent] = [endPercent, startPercent];
        }
      }

      // 计算路径总长度和各段长度
      const lengths = [];
      let totalLength = 0;

      for (let i = 0; i < points.length - 1; i++) {
        const p1 = points[i];
        const p2 = points[i + 1];
        const dx = p2.x - p1.x;
        const dy = p2.y - p1.y;
        const length = Math.sqrt(dx * dx + dy * dy);

        lengths.push(length);
        totalLength += length;
      }

      // 计算起点和终点的目标距离
      const startDistance = startPercent * totalLength;
      const endDistance = endPercent * totalLength;

      // 找到起点所在的线段
      let currentDistance = 0;
      let startSegmentIndex = 0;
      let startSegmentPercent = 0;

      for (let i = 0; i < lengths.length; i++) {
        if (currentDistance + lengths[i] >= startDistance) {
          startSegmentIndex = i;
          startSegmentPercent = (startDistance - currentDistance) / lengths[i];
          break;
        }
        currentDistance += lengths[i];
      }

      // 找到终点所在的线段
      currentDistance = 0;
      let endSegmentIndex = 0;
      let endSegmentPercent = 0;

      for (let i = 0; i < lengths.length; i++) {
        if (currentDistance + lengths[i] >= endDistance) {
          endSegmentIndex = i;
          endSegmentPercent = (endDistance - currentDistance) / lengths[i];
          break;
        }
        currentDistance += lengths[i];
      }

      // 收集范围内的点
      const result = [];

      // 添加起点
      const startP1 = points[startSegmentIndex];
      const startP2 = points[startSegmentIndex + 1];

      result.push({
        x: startP1.x + (startP2.x - startP1.x) * startSegmentPercent,
        y: startP1.y + (startP2.y - startP1.y) * startSegmentPercent
      });

      // 添加中间的完整线段的点
      for (let i = startSegmentIndex + 1; i <= endSegmentIndex; i++) {
        if (i < points.length) {
          result.push(points[i]);
        }
      }

      // 添加终点
      if (endSegmentIndex < points.length - 1) {
        const endP1 = points[endSegmentIndex];
        const endP2 = points[endSegmentIndex + 1];

        result.push({
          x: endP1.x + (endP2.x - endP1.x) * endSegmentPercent,
          y: endP1.y + (endP2.y - endP1.y) * endSegmentPercent
        });
      }

      return result;
    },

    // 处理窗口大小变化
    handleResize() {
      if (this.stage) {
        this.stage.width(this.config.w);
        this.stage.height(this.config.h);
        this.stage.draw();
      }
    }
  }
}
</script>

<style scoped>
.bs-design-wrap {
  position: relative;
  width: 100%;
  height: 100%;
}
</style>