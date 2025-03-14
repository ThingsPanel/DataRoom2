        // 考虑线条宽度
        padding += Math.ceil(this.lineWidth);
        
        // 如果启用了动画，增加额外空间
        if (this.animation.enable) {
          if (this.animation.type === 'flow') {
            padding += Math.ceil(this.animation.flowLength / 2) + 5;
          } else if (this.animation.type === 'particle') {
            padding += Math.ceil(this.animation.particleSize / 2) + 5;
          }
        }
        
        // 检查是否需要调整容器大小
        let hasChanges = false;
        const updatedConfig = JSON.parse(JSON.stringify(this.config));
        
        // 检查左边界 - 扩大调整
        if (bbox.x < padding) {
          const deltaX = padding - bbox.x;
          updatedConfig.x = Math.max(0, updatedConfig.x - deltaX);
          updatedConfig.w += deltaX;
          
          // 更新点的位置
          this.points = this.points.map(p => ({
            x: p.x + deltaX,
            y: p.y
          }));
          
          hasChanges = true;
        }
        
        // 检查上边界 - 扩大调整
        if (bbox.y < padding) {
          const deltaY = padding - bbox.y;
          updatedConfig.y = Math.max(0, updatedConfig.y - deltaY);
          updatedConfig.h += deltaY;
          
          // 更新点的位置
          this.points = this.points.map(p => ({
            x: p.x,
            y: p.y + deltaY
          }));
          
          hasChanges = true;
        }
        
        // 检查右边界 - 扩大调整
        if (bbox.x + bbox.width > updatedConfig.w - padding) {
          updatedConfig.w = bbox.x + bbox.width + padding;
          hasChanges = true;
        }
        
        // 检查下边界 - 扩大调整
        if (bbox.y + bbox.height > updatedConfig.h - padding) {
          updatedConfig.h = bbox.y + bbox.height + padding;
          hasChanges = true;
        }
        
        // 以下是缩小调整的逻辑
        // 为缩小操作使用更保守的边距，避免过度缩小
        const shrinkPadding = padding + 10; // 增加缩小时的边距
        
        // 检查左侧是否有多余空间 - 缩小调整
        const leftSpace = bbox.x - shrinkPadding;
        if (leftSpace > 0) {
          // 移动容器位置并减小宽度
          updatedConfig.x += leftSpace;
          updatedConfig.w -= leftSpace;
          
          // 更新点的位置
          this.points = this.points.map(p => ({
            x: p.x - leftSpace,
            y: p.y
          }));
          
          hasChanges = true;
        }
        
        // 检查顶部是否有多余空间 - 缩小调整
        const topSpace = bbox.y - shrinkPadding;
        if (topSpace > 0) {
          // 移动容器位置并减小高度
          updatedConfig.y += topSpace;
          updatedConfig.h -= topSpace;
          
          // 更新点的位置
          this.points = this.points.map(p => ({
            x: p.x,
            y: p.y - topSpace
          }));
          
          hasChanges = true;
        }
        
        // 检查右侧是否有多余空间 - 缩小调整
        const rightSpace = updatedConfig.w - (bbox.x + bbox.width + shrinkPadding);
        if (rightSpace > 0) {
          updatedConfig.w -= rightSpace;
          hasChanges = true;
        }
        
        // 检查底部是否有多余空间 - 缩小调整
        const bottomSpace = updatedConfig.h - (bbox.y + bbox.height + shrinkPadding);
        if (bottomSpace > 0) {
          updatedConfig.h -= bottomSpace;
          hasChanges = true;
        }
        
        // 确保容器至少有最小尺寸
        const minSize = 50;
        if (updatedConfig.w < minSize) {
          updatedConfig.w = minSize;
          hasChanges = true;
        }
        
        if (updatedConfig.h < minSize) {
          updatedConfig.h = minSize;
          hasChanges = true;
        }
        
        // 如果有变化，更新配置
        if (hasChanges) {
          // 标记正在调整大小，避免触发watch
          this.isAdjustingSize = true;
          
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
          
          // 重置调整大小标记
          setTimeout(() => {
            this.isAdjustingSize = false;
          }, 50);
        }
      } catch (error) {
        console.error('调整容器大小失败:', error);
      }
    },

    // 修改handleMouseMove方法
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
      
      this.points[this.draggedPointIndex] = { x: newX, y: newY };
      this.updatePath();
      
      // 更新控制点位置
      if (this.circles[this.draggedPointIndex]) {
        this.circles[this.draggedPointIndex].center(newX, newY);
      }
    },

    // 修改handleMouseUp方法
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

      // 保存点的位置
      this.savePoints();

      // 在拖拽结束后，根据实际SVG路径调整容器大小
      // 添加延时确保DOM已更新
      setTimeout(() => {
        this.adjustContainerBasedOnSVGPath();
        
        // 拖拽结束时保存时间线
        if (renderComponent) {
          renderComponent.saveTimeLine(`调整${this.config.title || '组件'}大小`);
        }
      }, 50);
    },

    // 修改updatePath方法
    updatePath() {
      if (!this.path || this.points.length < 2) return;
      
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

      // 在路径更新后，检查是否需要调整容器大小
      this.$nextTick(() => {
        if (!this.isDragging && !this.isAdjustingSize) {
          this.adjustContainerBasedOnSVGPath();
        }
      });
    },

    // 修改initSVG方法，确保初始化时设置正确的viewBox
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

    // 修改handleSvgClick方法
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

      // 添加点后，根据实际SVG路径调整容器大小
      this.adjustContainerBasedOnSVGPath();
    },

    // 在data中添加标记
    data() {
      return {
        // ... existing data ...
        isSvgTransformed: false,
        // 记录上一次的容器尺寸，用于判断是扩大还是缩小
        lastContainerSize: {
          x: 0,
          y: 0,
          w: 0,
          h: 0
        }
      }
    },

    // 监听容器尺寸变化
    watch: {
      'config.x': function(newVal, oldVal) {
        this.handleContainerSizeChange();
      },
      'config.y': function(newVal, oldVal) {
        this.handleContainerSizeChange();
      },
      'config.w': function(newVal, oldVal) {
        this.handleContainerSizeChange();
      },
      'config.h': function(newVal, oldVal) {
        this.handleContainerSizeChange();
      },
      // ... existing watches ...
    },

    // 在mounted中初始化lastContainerSize
    mounted() {
      // ... existing code ...
      
      // 初始化lastContainerSize
      this.lastContainerSize = {
        x: this.config.x,
        y: this.config.y,
        w: this.config.w,
        h: this.config.h
      };
    },

    // 处理容器尺寸变化
    handleContainerSizeChange() {
      // 如果是从SVG拖拽触发的变化，不处理
      if (this.config._fromSvgDrag) return;
      
      // 检查容器是否缩小了
      const isContainerShrinking = 
        this.config.w < this.lastContainerSize.w || 
        this.config.h < this.lastContainerSize.h;
      
      // 更新lastContainerSize
      this.lastContainerSize = {
        x: this.config.x,
        y: this.config.y,
        w: this.config.w,
        h: this.config.h
      };
      
      // 如果容器缩小了，检查是否需要变形SVG
      if (isContainerShrinking) {
        this.$nextTick(() => {
          this.adjustSvgToContainer();
        });
      } else {
        // 如果容器扩大了，可以考虑恢复SVG的原始比例
        this.$nextTick(() => {
          this.checkAndRestoreSvg();
        });
      }
    },

    // 调整SVG以适应容器
    adjustSvgToContainer() {
      if (!this.path || !this.svgDraw) return;
      
      try {
        // 获取路径的实际边界框
        const bbox = this.path.bbox();
        
        // 获取当前容器的尺寸
        const containerWidth = this.config.w;
        const containerHeight = this.config.h;
        
        // 计算边距
        const padding = 5; // 使用较小的边距，因为我们要在容器内显示
        
        // 计算路径的实际尺寸（包括边距）
        const pathWidth = bbox.width + padding * 2;
        const pathHeight = bbox.height + padding * 2;
        
        // 检查路径是否超出容器
        const isPathTooWide = pathWidth > containerWidth;
        const isPathTooTall = pathHeight > containerHeight;
        
        // 如果路径超出容器，应用变形
        if (isPathTooWide || isPathTooTall) {
          console.log('SVG需要变形以适应容器');
          
          // 计算需要的viewBox
          const viewBoxX = bbox.x - padding;
          const viewBoxY = bbox.y - padding;
          const viewBoxWidth = pathWidth;
          const viewBoxHeight = pathHeight;
          
          // 设置SVG的viewBox属性
          this.svgDraw.viewbox(viewBoxX, viewBoxY, viewBoxWidth, viewBoxHeight);
          
          // 确保SVG使用整个容器空间并允许变形
          this.svgDraw.attr({
            'preserveAspectRatio': 'none',
            'width': '100%',
            'height': '100%'
          });
          
          // 标记SVG已变形
          this.isSvgTransformed = true;
          
          // 更新控制点位置
          this.updateControlPoints();
        }
      } catch (error) {
        console.error('调整SVG以适应容器失败:', error);
      }
    },

    // 检查并恢复SVG原始比例
    checkAndRestoreSvg() {
      if (!this.path || !this.svgDraw || !this.isSvgTransformed) return;
      
      try {
        // 获取路径的实际边界框
        const bbox = this.path.bbox();
        
        // 获取当前容器的尺寸
        const containerWidth = this.config.w;
        const containerHeight = this.config.h;
        
        // 计算边距
        const padding = 5;
        
        // 计算路径的实际尺寸（包括边距）
        const pathWidth = bbox.width + padding * 2;
        const pathHeight = bbox.height + padding * 2;
        
        // 检查路径是否可以在不变形的情况下适应容器
        if (pathWidth <= containerWidth && pathHeight <= containerHeight) {
          console.log('SVG可以恢复原始比例');
          
          // 重置viewBox
          this.svgDraw.viewbox(0, 0, containerWidth, containerHeight);
          
          // 恢复preserveAspectRatio
          this.svgDraw.attr({
            'preserveAspectRatio': 'xMidYMid meet',
            'width': '100%',
            'height': '100%'
          });
          
          // 取消SVG变形标记
          this.isSvgTransformed = false;
          
          // 更新控制点位置
          this.updateControlPoints();
        }
      } catch (error) {
        console.error('恢复SVG原始比例失败:', error);
      }
    }
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