<template>
  <div class="production-chart-section">
    <div class="section-header">
      <h4>产量曲线图</h4>
      <div class="chart-controls">
        <select v-model="selectedPeriod" @change="handlePeriodChange" class="period-select">
          <option value="7">近7天</option>
          <option value="30">近30天</option>
          <option value="90">近90天</option>
        </select>
      </div>
    </div>
    <div class="chart-content">
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
      <div v-else>
        <canvas ref="chartContainer" class="chart-container"></canvas>
        <div v-if="!hasData" class="no-data">
          <div class="no-data-icon">📊</div>
          <div class="no-data-text">暂无产量数据</div>
        </div>
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
    // 产量数据
    productionData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chart: null, // 图表实例
      selectedPeriod: '7', // 选中的时间周期
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
    // 是否有数据
    hasData() {
      return this.productionData && this.productionData.length > 0
    },
    
    // 图表数据
    chartData() {
      if (!this.hasData) {
        return null
      }
      
      const labels = this.productionData.map(item => {
        return this.formatDate(item.date)
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
    
    // 使用Canvas绘制简单图表（fallback）
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
      
      // 绘制区域
      const padding = 40
      const chartWidth = width - padding * 2
      const chartHeight = height - padding * 2
      
      // 绘制网格线
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)'
      ctx.lineWidth = 1
      
      // 垂直网格线
      for (let i = 0; i <= 6; i++) {
        const x = padding + (chartWidth / 6) * i
        ctx.beginPath()
        ctx.moveTo(x, padding)
        ctx.lineTo(x, height - padding)
        ctx.stroke()
      }
      
      // 水平网格线
      for (let i = 0; i <= 4; i++) {
        const y = padding + (chartHeight / 4) * i
        ctx.beginPath()
        ctx.moveTo(padding, y)
        ctx.lineTo(width - padding, y)
        ctx.stroke()
      }
      
      // 绘制数据线
      ctx.strokeStyle = '#00d4ff'
      ctx.lineWidth = 3
      ctx.beginPath()
      
      data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - ((value - minValue) / range) * chartHeight
        
        if (index === 0) {
          ctx.moveTo(x, y)
        } else {
          ctx.lineTo(x, y)
        }
      })
      
      ctx.stroke()
      
      // 绘制数据点
      ctx.fillStyle = '#00d4ff'
      data.forEach((value, index) => {
        const x = padding + (chartWidth / (data.length - 1)) * index
        const y = height - padding - ((value - minValue) / range) * chartHeight
        
        ctx.beginPath()
        ctx.arc(x, y, 4, 0, Math.PI * 2)
        ctx.fill()
      })
      
      // 绘制标签
      ctx.fillStyle = 'rgba(255, 255, 255, 0.7)'
      ctx.font = '11px Arial'
      ctx.textAlign = 'center'
      
      labels.forEach((label, index) => {
        if (index % Math.ceil(labels.length / 6) === 0) {
          const x = padding + (chartWidth / (data.length - 1)) * index
          ctx.fillText(label, x, height - padding + 20)
        }
      })
    },
    
    // 处理图表数据
    processChartData(data) {
      const labels = data.map(item => this.formatDate(item.date))
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
    
    // 格式化日期
    formatDate(dateStr) {
      try {
        const date = new Date(dateStr)
        return `${date.getMonth() + 1}/${date.getDate()}`
      } catch (error) {
        return dateStr
      }
    },
    
    // 处理时间周期变化
    handlePeriodChange() {
      this.$emit('period-change', this.selectedPeriod)
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
.production-chart-section {
  background: rgba(255, 255, 255, 0.05);
  border-radius: 8px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  overflow: hidden;
  height: 300px;
  display: flex;
  flex-direction: column;
}

.section-header {
  padding: 16px 20px;
  background: rgba(255, 255, 255, 0.08);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-shrink: 0;
}

.section-header h4 {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
  color: #ffffff;
  display: flex;
  align-items: center;
  gap: 8px;
}

.section-header h4::before {
  content: '';
  width: 4px;
  height: 16px;
  background: linear-gradient(135deg, #f59e0b, #d97706);
  border-radius: 2px;
}

.chart-controls {
  display: flex;
  align-items: center;
  gap: 12px;
}

.period-select {
  background: rgba(255, 255, 255, 0.1);
  border: 1px solid rgba(255, 255, 255, 0.2);
  border-radius: 4px;
  color: #ffffff;
  padding: 6px 12px;
  font-size: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
}

.period-select:hover {
  background: rgba(255, 255, 255, 0.15);
  border-color: rgba(255, 255, 255, 0.3);
}

.period-select:focus {
  outline: none;
  border-color: #00d4ff;
  box-shadow: 0 0 0 2px rgba(0, 212, 255, 0.2);
}

.period-select option {
  background: #1a1a2e;
  color: #ffffff;
}

.chart-content {
  flex: 1;
  padding: 20px;
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
}

.chart-container {
  width: 100%;
  height: 100%;
  min-height: 300px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
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
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100%;
  min-height: 200px;
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