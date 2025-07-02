<template>
  <div class="production-chart-section">
    <!-- 图表标题覆盖层 -->
    <div class="chart-overlay">
      <div class="chart-title">产量曲线图</div>
    </div>
    
    <!-- 空状态 -->
    <div v-if="productionData.isEmpty" class="empty-state">
      <div class="empty-icon">📈</div>
      <div class="empty-text">无法加载产量数据</div>
      <div class="empty-hint">请检查设备ID是否正确</div>
    </div>
    
    <!-- 错误状态 -->
    <div v-else-if="productionData.isError" class="error-state">
      <div class="error-icon">⚠️</div>
      <div class="error-text">加载产量数据失败</div>
      <div class="error-message">{{ productionData.errorMessage }}</div>
    </div>
    
    <!-- 正常状态 -->
    <div v-else class="chart-wrapper">
      <canvas ref="chartContainer" class="chart-container"></canvas>
      <div v-if="!hasData" class="no-data">
        <div class="no-data-icon">📊</div>
        <div class="no-data-text">暂无产量数据</div>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 产量图表组件
 * 负责显示设备的产量曲线图，支持不同时间周期的数据展示
 */
export default {
  name: 'ProductionChartSection',
  props: {
    // 产量数据 - 可以是数组（正常数据）或对象（错误/空状态）
    productionData: {
      type: [Array, Object],
      default: () => [
        // 示例数据 - 匹配API格式 (timestamp, production)
        { timestamp: 1704067200, production: 120 }, // 2024-01-01
        { timestamp: 1704153600, production: 135 }, // 2024-01-02
        { timestamp: 1704240000, production: 98 },  // 2024-01-03
        { timestamp: 1704326400, production: 156 }, // 2024-01-04
        { timestamp: 1704412800, production: 142 }, // 2024-01-05
        { timestamp: 1704499200, production: 178 }, // 2024-01-06
        { timestamp: 1704585600, production: 165 }, // 2024-01-07
        { timestamp: 1704672000, production: 189 }, // 2024-01-08
        { timestamp: 1704758400, production: 203 }, // 2024-01-09
        { timestamp: 1704844800, production: 176 }, // 2024-01-10
        { timestamp: 1704931200, production: 145 }, // 2024-01-11
        { timestamp: 1705017600, production: 167 }, // 2024-01-12
        { timestamp: 1705104000, production: 192 }, // 2024-01-13
        { timestamp: 1705190400, production: 158 }, // 2024-01-14
        { timestamp: 1705276800, production: 134 }  // 2024-01-15
      ]
    }
  },
  data() {
    return {
      chart: null, // 图表实例
      chartOptions: {
        // 图表配置选项
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: 'rgba(0, 0, 0, 0.8)',
            titleColor: '#ffffff',
            bodyColor: '#ffffff',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            borderWidth: 1,
            cornerRadius: 8,
            displayColors: false,
            callbacks: {
              title: (context) => {
                return `日期: ${context[0].label}`
              },
              label: (context) => {
                return `产量: ${context.parsed.y} 件`
              }
            }
          }
        },
        scales: {
          x: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: {
                size: 11
              }
            }
          },
          y: {
            grid: {
              color: 'rgba(255, 255, 255, 0.1)',
              drawBorder: false
            },
            ticks: {
              color: 'rgba(255, 255, 255, 0.7)',
              font: {
                size: 11
              },
              callback: function(value) {
                return value + ' 件'
              }
            },
            beginAtZero: true
          }
        },
        elements: {
          point: {
            radius: 4,
            hoverRadius: 6,
            backgroundColor: '#00d4ff',
            borderColor: '#ffffff',
            borderWidth: 2
          },
          line: {
            borderWidth: 3,
            tension: 0.4
          }
        },
        interaction: {
          intersect: false,
          mode: 'index'
        }
      }
    }
  },
  computed: {
    // 是否有数据 - 只有当productionData是数组且有数据时才返回true
    hasData() {
      return Array.isArray(this.productionData) && this.productionData.length > 0
    },
    
    // 图表数据 - 只有当productionData是数组时才处理
    chartData() {
      if (!this.hasData || !Array.isArray(this.productionData)) {
        return null
      }
      
      const labels = this.productionData.map(item => {
        return this.formatDate(item.timestamp)
      })
      
      const data = this.productionData.map(item => item.production || 0)
      
      return {
        labels,
        datasets: [{
          label: '产量',
          data,
          borderColor: '#00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          fill: true,
          pointBackgroundColor: '#00d4ff',
          pointBorderColor: '#ffffff',
          pointBorderWidth: 2,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointHoverBackgroundColor: '#00d4ff',
          pointHoverBorderColor: '#ffffff',
          pointHoverBorderWidth: 3
        }]
      }
    }
  },
  methods: {
    // 渲染图表
    renderChart(data = null) {
      const chartData = data ? this.processChartData(data) : this.chartData
      
      if (!chartData || !this.$refs.chartContainer) {
        return
      }
      
      // 销毁现有图表
      this.destroyChart()
      
      // 检查是否有Chart.js库
      if (typeof Chart === 'undefined') {
        console.warn('Chart.js library not found, using canvas fallback')
        this.renderCanvasChart(chartData)
        return
      }
      
      try {
        // 检查canvas元素
        const canvas = this.$refs.chartContainer
        if (!canvas || typeof canvas.getContext !== 'function') {
          throw new Error('Canvas element not available')
        }
        
        // 创建新图表
        const ctx = canvas.getContext('2d')
        if (!ctx) {
          throw new Error('Failed to get 2D context')
        }
        
        this.chart = new Chart(ctx, {
          type: 'line',
          data: chartData,
          options: this.chartOptions
        })
      } catch (error) {
        console.error('Failed to create chart:', error)
        // 使用nextTick确保DOM已更新
        this.$nextTick(() => {
          this.renderCanvasChart(chartData)
        })
      }
    },
    
    // 使用Canvas绘制精美图表（fallback）
    renderCanvasChart(chartData) {
      const canvas = this.$refs.chartContainer
      
      // 检查canvas元素是否存在
      if (!canvas || typeof canvas.getContext !== 'function') {
        console.warn('Canvas element not found or not ready')
        return
      }
      
      const ctx = canvas.getContext('2d')
      if (!ctx) {
        console.warn('Failed to get 2D context from canvas')
        return
      }
      
      const { width, height } = canvas.getBoundingClientRect()
      
      // 确保尺寸有效
      if (width === 0 || height === 0) {
        console.warn('Canvas has zero dimensions')
        return
      }
      
      // 设置canvas尺寸
      canvas.width = width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      
      // 清空画布
      ctx.clearRect(0, 0, width, height)
      
      if (!chartData || !chartData.datasets[0].data.length) {
        return
      }
      
      const data = chartData.datasets[0].data
      const labels = chartData.labels
      const maxValue = Math.max(...data)
      const minValue = Math.min(...data)
      const range = maxValue - minValue || 1
      
      // 绘制区域设置 - 增加边距以容纳坐标轴
      const padding = { top: 30, right: 30, bottom: 50, left: 60 }
      const chartWidth = width - padding.left - padding.right
      const chartHeight = height - padding.top - padding.bottom
      
      // 计算刻度值
      const ySteps = 5
      const xSteps = Math.min(data.length - 1, 6)
      
      // 绘制精细网格线
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)'
      ctx.lineWidth = 0.5
      
      // 水平网格线
      for (let i = 0; i <= ySteps; i++) {
        const y = padding.top + (chartHeight / ySteps) * i
        ctx.beginPath()
        ctx.moveTo(padding.left, y)
        ctx.lineTo(padding.left + chartWidth, y)
        ctx.stroke()
      }
      
      // 垂直网格线
      for (let i = 0; i <= xSteps; i++) {
        const x = padding.left + (chartWidth / xSteps) * i
        ctx.beginPath()
        ctx.moveTo(x, padding.top)
        ctx.lineTo(x, padding.top + chartHeight)
        ctx.stroke()
      }
      
      // 绘制坐标轴
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)'
      ctx.lineWidth = 1
      
      // X轴
      ctx.beginPath()
      ctx.moveTo(padding.left, padding.top + chartHeight)
      ctx.lineTo(padding.left + chartWidth, padding.top + chartHeight)
      ctx.stroke()
      
      // Y轴
      ctx.beginPath()
      ctx.moveTo(padding.left, padding.top)
      ctx.lineTo(padding.left, padding.top + chartHeight)
      ctx.stroke()
      
      // 绘制Y轴刻度和标签
      ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
      ctx.font = '11px -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
      ctx.textAlign = 'right'
      ctx.textBaseline = 'middle'
      
      for (let i = 0; i <= ySteps; i++) {
        const value = minValue + (range / ySteps) * (ySteps - i)
        const y = padding.top + (chartHeight / ySteps) * i
        
        // 刻度线
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(padding.left - 5, y)
        ctx.lineTo(padding.left, y)
        ctx.stroke()
        
        // 标签
        ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
        ctx.fillText(Math.round(value).toString(), padding.left - 8, y)
      }
      
      // 绘制X轴刻度和标签
      ctx.textAlign = 'center'
      ctx.textBaseline = 'top'
      
      labels.forEach((label, index) => {
        const x = padding.left + (chartWidth / (data.length - 1)) * index
        const y = padding.top + chartHeight
        
        // 刻度线
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.3)'
        ctx.lineWidth = 1
        ctx.beginPath()
        ctx.moveTo(x, y)
        ctx.lineTo(x, y + 5)
        ctx.stroke()
        
        // 标签（只显示部分以避免重叠）
        if (index % Math.ceil(data.length / 6) === 0 || index === data.length - 1) {
          ctx.fillStyle = 'rgba(255, 255, 255, 0.6)'
          ctx.fillText(label, x, y + 8)
        }
      })
      
      // 创建渐变填充
      const gradient = ctx.createLinearGradient(0, padding.top, 0, padding.top + chartHeight)
      gradient.addColorStop(0, 'rgba(0, 212, 255, 0.3)')
      gradient.addColorStop(0.5, 'rgba(0, 212, 255, 0.15)')
      gradient.addColorStop(1, 'rgba(0, 212, 255, 0.02)')
      
      // 绘制面积填充
      ctx.fillStyle = gradient
      ctx.beginPath()
      
      // 起始点
      const firstX = padding.left
      const firstY = padding.top + chartHeight - ((data[0] - minValue) / range) * chartHeight
      ctx.moveTo(firstX, padding.top + chartHeight)
      ctx.lineTo(firstX, firstY)
      
      // 数据点连线
      data.forEach((value, index) => {
        const x = padding.left + (chartWidth / (data.length - 1)) * index
        const y = padding.top + chartHeight - ((value - minValue) / range) * chartHeight
        ctx.lineTo(x, y)
      })
      
      // 闭合路径
      const lastX = padding.left + chartWidth
      ctx.lineTo(lastX, padding.top + chartHeight)
      ctx.closePath()
      ctx.fill()
      
      // 绘制平滑曲线
      ctx.strokeStyle = '#00d4ff'
      ctx.lineWidth = 2
      ctx.lineCap = 'round'
      ctx.lineJoin = 'round'
      ctx.beginPath()
      
      // 使用贝塞尔曲线绘制平滑线条
      const points = data.map((value, index) => ({
        x: padding.left + (chartWidth / (data.length - 1)) * index,
        y: padding.top + chartHeight - ((value - minValue) / range) * chartHeight
      }))
      
      if (points.length > 0) {
        ctx.moveTo(points[0].x, points[0].y)
        
        for (let i = 1; i < points.length; i++) {
          if (i === 1) {
            ctx.lineTo(points[i].x, points[i].y)
          } else {
            const prevPoint = points[i - 1]
            const currentPoint = points[i]
            const nextPoint = points[i + 1] || currentPoint
            
            const cp1x = prevPoint.x + (currentPoint.x - prevPoint.x) * 0.3
            const cp1y = prevPoint.y
            const cp2x = currentPoint.x - (nextPoint.x - prevPoint.x) * 0.3
            const cp2y = currentPoint.y
            
            ctx.bezierCurveTo(cp1x, cp1y, cp2x, cp2y, currentPoint.x, currentPoint.y)
          }
        }
      }
      
      ctx.stroke()
      
      // 绘制数据点
      points.forEach((point, index) => {
        // 外圈
        ctx.fillStyle = '#ffffff'
        ctx.beginPath()
        ctx.arc(point.x, point.y, 4, 0, Math.PI * 2)
        ctx.fill()
        
        // 内圈
        ctx.fillStyle = '#00d4ff'
        ctx.beginPath()
        ctx.arc(point.x, point.y, 2.5, 0, Math.PI * 2)
        ctx.fill()
      })
    },
    
    // 处理图表数据
    processChartData(data) {
      const labels = data.map(item => this.formatDate(item.timestamp))
      const values = data.map(item => item.production || 0)
      
      return {
        labels,
        datasets: [{
          label: '产量',
          data: values,
          borderColor: '#00d4ff',
          backgroundColor: 'rgba(0, 212, 255, 0.1)',
          fill: true
        }]
      }
    },
    
    // 销毁图表
    destroyChart() {
      if (this.chart) {
        this.chart.destroy()
        this.chart = null
      }
    },
    
    // 格式化日期 - 处理timestamp
    formatDate(timestamp) {
      try {
        const date = new Date(timestamp * 1000) // timestamp是秒，需要转换为毫秒
        return `${date.getMonth() + 1}/${date.getDate()}`
      } catch (error) {
        return timestamp
      }
    },
    
    // 更新图表数据
    updateChart(newData) {
      if (this.chart && newData) {
        const chartData = this.processChartData(newData)
        this.chart.data = chartData
        this.chart.update('active')
      } else {
        this.renderChart(newData)
      }
    }
  },
  mounted() {
    // 组件挂载后渲染图表
    this.$nextTick(() => {
      if (this.hasData) {
        this.renderChart()
      }
    })
    
    // 监听窗口大小变化
    this.resizeHandler = () => {
      if (this.chart) {
        this.chart.resize()
      }
    }
    window.addEventListener('resize', this.resizeHandler)
  },
  beforeDestroy() {
    // 组件销毁前清理资源
    this.destroyChart()
    if (this.resizeHandler) {
      window.removeEventListener('resize', this.resizeHandler)
    }
  },
  watch: {
    // 监听产量数据变化
    productionData: {
      handler(newData) {
        this.$nextTick(() => {
          if (newData && newData.length > 0) {
            this.renderChart(newData)
          }
        })
      },
      deep: true
    }
  }
}
</script>

<style scoped>
/* 主容器 - 简化背景，撑满空间 */
.production-chart-section {
  background: transparent;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 4px;
  overflow: hidden;
  height: 100%;
  width: 100%;
  position: relative;
  display: flex;
  flex-direction: column;
}

/* 图表标题和控制器覆盖层 */
.chart-overlay {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  z-index: 10;
  pointer-events: none;
}

.chart-overlay > * {
  pointer-events: auto;
}

/* 图表标题 */
.chart-title {
  font-size: 14px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  background: rgba(0, 0, 0, 0.3);
  padding: 6px 12px;
  border-radius: 4px;
  backdrop-filter: blur(4px);
}



/* 图表包装器 - 撑满整个容器 */
.chart-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
}

/* 图表容器 - 完全撑满 */
.chart-container {
  width: 100%;
  height: 100%;
  background: transparent;
  display: block;
}

.no-data {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: rgba(255, 255, 255, 0.5);
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}

.no-data-icon {
  font-size: 48px;
  opacity: 0.3;
}

.no-data-text {
  font-size: 14px;
  font-weight: 500;
}

/* 空状态样式 */
.empty-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(255, 255, 255, 0.6);
}

.empty-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.8;
}

.empty-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: rgba(255, 255, 255, 0.8);
}

.empty-hint {
  font-size: 14px;
  color: rgba(255, 255, 255, 0.5);
}

/* 错误状态样式 */
.error-state {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  color: rgba(239, 68, 68, 0.8);
}

.error-icon {
  font-size: 48px;
  margin-bottom: 16px;
  opacity: 0.9;
}

.error-text {
  font-size: 18px;
  font-weight: 500;
  margin-bottom: 8px;
  color: #ef4444;
}

.error-message {
  font-size: 14px;
  color: rgba(239, 68, 68, 0.7);
  max-width: 300px;
  word-wrap: break-word;
}

/* 响应式设计 */
@media (max-width: 768px) {
  .production-chart-section {
    height: 250px;
  }
  
  .section-header {
    padding: 12px 16px;
    flex-direction: column;
    gap: 8px;
    align-items: flex-start;
  }
  
  .chart-controls {
    align-self: flex-end;
  }
  
  .chart-content {
    padding: 16px;
  }
  
  .period-select {
    font-size: 11px;
    padding: 4px 8px;
  }
}

@media (max-width: 480px) {
  .production-chart-section {
    height: 200px;
  }
  
  .section-header {
    padding: 10px 12px;
  }
  
  .chart-content {
    padding: 12px;
  }
  
  .no-data-icon {
    font-size: 36px;
  }
  
  .no-data-text {
    font-size: 12px;
  }
}
</style>