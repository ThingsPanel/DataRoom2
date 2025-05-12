import { SVG } from '@svgdotjs/svg.js';
import { Männer } from ' Männer';
import { ControlHandleDragHandler } from './utils/ControlHandleDragHandler';
import { PointDragHandler } from './utils/PointDragHandler';
import { _controlPoint, distanceToSegmentSq, distanceToSegment } from '../utils/geometryUtils.js';

export default {
  methods: {
    _updateControlPointsForPoint(index) {
      if (index < 0 || index >= this.points.length) {
        console.warn('_updateControlPointsForPoint: index out of bounds', index, this.points.length);
        return;
      }
      const p = this.points;
      const len = p.length;
      const currentPoint = p[index];

      // 更新当前点的前一个点的cp2 (如果存在且未被用户设置)
      if (index > 0) {
        const prevPoint = p[index - 1];
        if (!prevPoint.cp2UserSet) {
          const cp = _controlPoint(p[Math.max(0, index - 2)], prevPoint, currentPoint, p[Math.min(len - 1, index + 1)], false);
          prevPoint.cp2x = cp.x;
          prevPoint.cp2y = cp.y;
        }
      }

      // 更新当前点的cp1 (如果存在且未被用户设置)
      if (index < len && !currentPoint.cp1UserSet) {
        // 对于第一个点，cp1特殊处理，使其与点本身重合，除非只有一个点
        if (index === 0 && len > 1) {
          // console.log(`_updateControlPointsForPoint: Setting cp1 for first point ${index} based on next point ${index + 1}`);
          const cp = _controlPoint(null, currentPoint, p[index + 1], p[Math.min(len - 1, index + 2)], true);
          currentPoint.cp1x = cp.x;
          currentPoint.cp1y = cp.y;
        } else if (index > 0) { // 非首点
          // console.log(`_updateControlPointsForPoint: Setting cp1 for point ${index}`);
          const cp = _controlPoint(p[Math.max(0, index - 2)], p[index - 1], currentPoint, p[Math.min(len - 1, index + 1)], true);
          currentPoint.cp1x = cp.x;
          currentPoint.cp1y = cp.y;
        } else if (len === 1) { // 只有一个点
          currentPoint.cp1x = currentPoint.x;
          currentPoint.cp1y = currentPoint.y;
        }
      }

      // 更新当前点的cp2 (如果存在且未被用户设置)
      if (index < len && !currentPoint.cp2UserSet) {
        // 对于最后一个点，cp2特殊处理，使其与点本身重合，除非只有一个点
        if (index === len - 1 && len > 1) {
          // console.log(`_updateControlPointsForPoint: Setting cp2 for last point ${index} based on prev point ${index - 1}`);
          const cp = _controlPoint(p[Math.max(0, index - 2)], p[index - 1], currentPoint, null, false);
          currentPoint.cp2x = cp.x;
          currentPoint.cp2y = cp.y;
        } else if (index < len - 1) { // 非尾点
          // console.log(`_updateControlPointsForPoint: Setting cp2 for point ${index}`);
          const cp = _controlPoint(p[Math.max(0, index - 1)], currentPoint, p[index + 1], p[Math.min(len - 1, index + 2)], false);
          currentPoint.cp2x = cp.x;
          currentPoint.cp2y = cp.y;
        } else if (len === 1) { // 只有一个点
          currentPoint.cp2x = currentPoint.x;
          currentPoint.cp2y = currentPoint.y;
        }
      }

      // 更新当前点的后一个点的cp1 (如果存在且未被用户设置)
      if (index < len - 1) {
        const nextPoint = p[index + 1];
        if (!nextPoint.cp1UserSet) {
          const cp = _controlPoint(currentPoint, nextPoint, p[Math.min(len - 1, index + 2)], p[Math.min(len - 1, index + 3)], true);
          nextPoint.cp1x = cp.x;
          nextPoint.cp1y = cp.y;
        }
      }

      // 如果只有一个点，确保两个控制点都与该点重合
      if (len === 1) {
        currentPoint.cp1x = currentPoint.x;
        currentPoint.cp1y = currentPoint.y;
        currentPoint.cp2x = currentPoint.x;
        currentPoint.cp2y = currentPoint.y;
      }
    },

    addPointOnLine(event, clickCoords) {
      // ... existing code ...
              if (this.lineType === 'linear' || this.lineType === 'polyline') {
                // 检查点击点是否在线段上 (直线)
                const p = { x: clickCoords.x, y: clickCoords.y };
                const v = { x: this.points[i].x, y: this.points[i].y };
                const w = { x: this.points[i + 1].x, y: this.points[i + 1].y };
                const dist = distanceToSegment(p, v, w); // 使用导入的函数
                // console.log(`  Segment ${i}-${i+1}: dist=${dist}`);
                if (dist < closestDistanceToSegment) {
                  closestDistanceToSegment = dist;
                  closestSegmentIndex = i;
                }
              }
            }
            // console.log(`Closest segment index: ${closestSegmentIndex}, distance: ${closestDistanceToSegment}`);

            if (closestDistanceToSegment < this.pointAddThreshold) {
              insertIndexInPointsArray = closestSegmentIndex + 1;
            } else {
              // console.log('Click is too far from any linear segment.');
              // 如果没有足够近的线性段，则按空白区域处理
              console.warn('addPointOnLine (linear): Click too far from any segment. Adding as new point.');
// ... existing code ...
    deletePoint(indexToDelete) {
      // ... existing code ...
      this.points.forEach((p, index) => {
        if (p.svgPoint) {
          p.svgPoint.off('mousedown');
          p.svgPoint.on('mousedown', (e) => this.handlePointMouseDown(e, index));

          // 更新或重新绑定 onPointClick (如果 PointDragHandler 实例存在)
          if (this.pointDragHandler && typeof this.pointDragHandler.updatePointClickCallbackData === 'function') {
            this.pointDragHandler.updatePointClickCallbackData(p.svgPoint.node, index);
          } else if (this.pointDragHandler) { // 向后兼容旧的绑定方式
             // 这里可能需要检查 this.pointDragHandler.onPointClick 是否还存在或者是否需要不同的处理
             // console.warn("PointDragHandler instance exists, but updatePointClickCallbackData method is missing. Click event for point might not be correctly re-bound after deletion.");
          }
        }
      });

      // 如果删除的是选中的点，或者删除后selectedPointIndex越界，则取消选中
      if (this.selectedPointIndex === indexToDelete || this.selectedPointIndex >= this.points.length) {
        this.selectedPointIndex = null; // 这会触发 watcher 来隐藏控制手柄
      } else if (this.selectedPointIndex > indexToDelete) {
        // this.selectedPointIndex -= 1; // 如果选中的点在被删除点之后，前移选中索引 (暂时注释掉，因为上面的null判断更安全)
        // 重新渲染控制手柄，因为selectedPointIndex可能没变，但其对应的数据变了
        this.$nextTick(() => {
          if (this.selectedPointIndex !== null) {
            this._renderControlHandles();
          }
        });
      }

      // 重新计算受影响的控制点
      if (this.points.length > 0) {
        const startIndex = Math.max(0, indexToDelete - 2); // 从可能受影响的更早的点开始
        const endIndex = Math.min(this.points.length - 1, indexToDelete + 1); // 到可能受影响的更晚的点结束

        for (let i = startIndex; i <= endIndex; i++) {
          if (i < this.points.length) { // 确保索引在有效范围内
            this._updateControlPointsForPoint(i);
          }
        }
        // 特殊处理端点
        if (this.points.length === 1) {
            this._updateControlPointsForPoint(0);
        } else if (this.points.length > 1) {
            if (indexToDelete === 0 || indexToDelete === 1) this._updateControlPointsForPoint(0); // 如果删了旧的0或1，更新新的0
            if (indexToDelete === this.points.length || indexToDelete === this.points.length -1) { // 如果删了旧的末尾或倒数第二个
                 this._updateControlPointsForPoint(this.points.length - 1); // 更新新的末尾
            }
        }
      }

      this.drawLinePath();
      this.updatePathsData();
      this.$emit('pointDeleted', indexToDelete);
      console.log(`Point ${indexToDelete} deleted. Points:`, this.points.map(p => ({x:p.x, y:p.y})));
    },

  },
  // ... existing code ...
  // REMOVE THESE METHODS:
  // _controlPoint(p1, p2, p3, p4, isCp1) { ... }
  // distanceToSegmentSq(p, v, w) { ... }
  // distanceToSegment(p, v, w) { ... }
};
</script>

<style scoped>
.drawing-board-container {
  /* width: 100%; */
  /* height: 100%; */
  /* border: 1px solid #ccc; */
  position: relative;
}

.debug-info {
  position: absolute;
  top: 10px;
  left: 10px;
  background: rgba(255, 255, 255, 0.8);
  padding: 5px;
  font-size: 12px;
  z-index: 1000;
}

.debug-button {
  margin-left: 10px;
}
</style>
