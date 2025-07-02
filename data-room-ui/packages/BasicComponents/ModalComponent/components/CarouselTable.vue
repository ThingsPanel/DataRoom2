<template>
  <div class="carousel-table-wrapper" :style="wrapperStyle">
    <!-- 表格容器 -->
    <div class="table-container" :class="{ 'modal-mode': config.customize.enableModal }">
      <!-- 表格头部 -->
      <div class="table-header" :style="headerStyle">
        <div 
          v-for="(column, colIndex) in tableColumns" 
          :key="column.prop"
          class="header-cell"
          :style="getHeaderCellStyle(column, colIndex)"
        >
          {{ column.label }}
        </div>
      </div>
      
      <!-- 表格主体 -->
      <div class="table-body" :style="bodyStyle" ref="tableBody">
        <div 
          class="table-content"
          :style="contentStyle"
          ref="tableContent"
        >
          <div 
            v-for="(row, rowIndex) in displayData" 
            :key="rowIndex"
            class="table-row"
            :style="getRowStyle(rowIndex)"
            @click="handleRowClick(row, rowIndex)"
            v-if="row"
          >
            <div 
              v-for="(column, colIndex) in tableColumns" 
              :key="column.prop"
              class="table-cell"
              :style="getCellStyle(column, row, rowIndex, colIndex)"
            >
              <span :style="getColumnStyle(column, row && row[column.prop])">
                {{ formatCellValue(row && row[column.prop], column) }}
              </span>
            </div>
          </div>
        </div>
      </div>
      
      <!-- 轮播指示器 -->
      <div v-if="config.customize.isCarousel && showIndicators" class="carousel-indicators">
        <span 
          v-for="(row, index) in Math.min(totalRows, 10)" 
          :key="index"
          class="indicator"
          :class="{ active: index === (currentRow % Math.min(totalRows, 10)) }"
          @click="goToRow(index)"
        ></span>
      </div>
    </div>
  </div>
</template>

<script>
/**
 * 轮播表格组件
 * 负责表格的展示、轮播动画、行点击事件等核心功能
 */
export default {
  name: 'CarouselTable',
  props: {
    // 组件配置
    config: {
      type: Object,
      required: true
    },
    // 表格数据
    tableData: {
      type: Array,
      default: () => []
    },
    // 表格列配置
    tableColumns: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      carouselTimer: null, // 轮播定时器
      currentRow: 0, // 当前轮播行索引
      updateKey: 0, // 用于强制更新组件
      isTransitioning: false // 是否正在过渡中
    }
  },
  computed: {
    // 容器样式
    wrapperStyle() {
      const borderWidth = this.config.customize.borderWidth || 1
      const borderStyle = this.config.customize.borderStyle || 'solid'
      const borderColor = this.config.customize.borderColor || '#434343'
      const borderMode = this.config.customize.borderMode || 'inner'
      
      const style = {
        width: `${this.config.w || 400}px`,
        height: `${this.config.h || 300}px`,
        backgroundColor: this.config.customize.backgroundColor || '#1A1A1A',
        borderRadius: (this.config.customize.borderRadius || 4) + 'px',
        boxShadow: this.config.customize.showShadow ? 
          `0 4px 16px 0 ${this.config.customize.shadowColor || 'rgba(0, 0, 0, 0.3)'}` : 'none'
      }
      
      // 只有外边框模式才在容器上设置边框
      if (this.config.customize.showBorder && borderMode === 'outer') {
        style.border = `${borderWidth}px ${borderStyle} ${borderColor}`
      }
      
      return style
    },
    
    // 表头样式
    headerStyle() {
      return {
        height: (this.config.customize.headerHeight || 45) + 'px',
        display: 'flex'
      }
    },
    
    // 表体样式
    bodyStyle() {
      const headerHeight = this.config.customize.headerHeight || 40
      const indicatorHeight = (this.config.customize.isCarousel && this.showIndicators) ? 30 : 0
      return {
        height: `calc(100% - ${headerHeight + indicatorHeight}px)`,
        backgroundColor: this.config.customize.bodyBgColor || 'transparent'
      }
    },
    
    // 内容样式（用于轮播动画）
    contentStyle() {
      if (!this.config.customize.isCarousel) {
        return {}
      }
      
      const rowHeight = this.config.customize.rowHeight || 40
      const animationType = this.config.customize.animationType || 'slide'
      const duration = this.config.customize.animationDuration || 300
      
      const baseStyle = {
        height: `${(this.config.customize.carouselPageSize || 5) * rowHeight}px`,
        overflow: 'hidden'
      }
      
      if (!this.isTransitioning) {
        return {
          ...baseStyle,
          transition: 'none'
        }
      }
      
      // 根据动画类型设置不同的过渡效果
      switch (animationType) {
        case 'slide':
          return {
            ...baseStyle,
            transform: `translateY(-${rowHeight}px)`,
            transition: `transform ${duration}ms ease-in-out`
          }
        case 'fade':
          return {
            ...baseStyle,
            opacity: 0.3,
            transition: `opacity ${duration}ms ease-in-out`
          }
        default:
          return baseStyle
      }
    },
    
    // 显示的数据（根据轮播状态）
    displayData() {
      if (!this.tableData || this.tableData.length === 0) {
        return []
      }
      
      if (!this.config.customize.isCarousel) {
        return this.tableData
      }
      
      const pageSize = this.config.customize.carouselPageSize || 5
      const startIndex = this.currentRow
      const result = []
      
      for (let i = 0; i < pageSize; i++) {
        const index = (startIndex + i) % this.tableData.length
        result.push(this.tableData[index])
      }
      
      return result
    },
    
    // 总行数
    totalRows() {
      return this.tableData ? this.tableData.length : 0
    },
    
    // 是否显示指示器
    showIndicators() {
      return this.config.customize.showIndicators !== false && this.totalRows > 1
    }
  },
  methods: {
    // 处理行点击事件
    handleRowClick(row, rowIndex) {
      this.$emit('row-click', row, rowIndex)
    },
    
    // 获取表头单元格样式
    getHeaderCellStyle(column, colIndex) {
      const borderWidth = this.config.customize.borderWidth || 1
      const borderStyle = this.config.customize.borderStyle || 'solid'
      const borderColor = this.config.customize.borderColor || '#434343'
      const borderMode = this.config.customize.borderMode || 'inner'
      
      const style = {
        flex: column.width ? `0 0 ${column.width}px` : '1',
        minWidth: '0',
        padding: '8px 12px',
        fontSize: (this.config.customize.headerFontSize || 14) + 'px',
        fontWeight: this.config.customize.headerFontWeight || 'bold',
        color: this.config.customize.headerTextColor || '#FFFFFF',
        backgroundColor: this.config.customize.headerBgColor || '#2A2A2A',
        textAlign: column.align || this.config.customize.headerAlign || 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center',
        justifyContent: column.align === 'left' ? 'flex-start' : 
                       column.align === 'right' ? 'flex-end' : 'center'
      }
      
      // 内边框模式下添加边框
      if (this.config.customize.showBorder && borderMode === 'inner') {
        if (colIndex < this.tableColumns.length - 1) {
          style.borderRight = `${borderWidth}px ${borderStyle} ${borderColor}`
        }
        style.borderBottom = `${borderWidth}px ${borderStyle} ${borderColor}`
      }
      
      return style
    },
    
    // 获取行样式
    getRowStyle(rowIndex) {
      const rowHeight = this.config.customize.rowHeight || 40
      const style = {
        height: rowHeight + 'px',
        display: 'flex',
        cursor: this.config.customize.enableModal ? 'pointer' : 'default'
      }
      
      // 斑马纹效果
      if (this.config.customize.showStripe) {
        const isEven = rowIndex % 2 === 0
        style.backgroundColor = isEven ? 
          (this.config.customize.evenRowBgColor || 'transparent') : 
          (this.config.customize.oddRowBgColor || 'rgba(255, 255, 255, 0.05)')
      }
      
      return style
    },
    
    // 获取单元格样式
    getCellStyle(column, row, rowIndex, colIndex) {
      const borderWidth = this.config.customize.borderWidth || 1
      const borderStyle = this.config.customize.borderStyle || 'solid'
      const borderColor = this.config.customize.borderColor || '#434343'
      const borderMode = this.config.customize.borderMode || 'inner'
      
      const style = {
        flex: column.width ? `0 0 ${column.width}px` : '1',
        minWidth: '0',
        padding: '8px 12px',
        fontSize: (this.config.customize.bodyFontSize || 12) + 'px',
        color: this.config.customize.bodyTextColor || '#CCCCCC',
        textAlign: column.align || this.config.customize.bodyAlign || 'center',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        display: 'flex',
        alignItems: 'center',
        justifyContent: column.align === 'left' ? 'flex-start' : 
                       column.align === 'right' ? 'flex-end' : 'center'
      }
      
      // 内边框模式下添加边框
      if (this.config.customize.showBorder && borderMode === 'inner') {
        if (colIndex < this.tableColumns.length - 1) {
          style.borderRight = `${borderWidth}px ${borderStyle} ${borderColor}`
        }
        if (rowIndex < this.displayData.length - 1) {
          style.borderBottom = `${borderWidth}px ${borderStyle} ${borderColor}`
        }
      }
      
      return style
    },
    
    // 获取列样式
    getColumnStyle(column, value) {
      return {
        width: '100%'
      }
    },
    
    // 格式化单元格值
    formatCellValue(value, column) {
      if (value === null || value === undefined) {
        return ''
      }
      return String(value)
    },
    
    // 跳转到指定行
    goToRow(index) {
      if (this.config.customize.isCarousel) {
        this.currentRow = index
        this.updateKey++
      }
    },
    
    // 初始化轮播
    initCarousel() {
      if (!this.config.customize.isCarousel || !this.config.customize.autoPlay) {
        return
      }
      
      this.clearCarousel()
      
      const interval = this.config.customize.carouselInterval || 3000
      this.carouselTimer = setInterval(() => {
        this.nextRow()
      }, interval)
    },
    
    // 清除轮播
    clearCarousel() {
      if (this.carouselTimer) {
        clearInterval(this.carouselTimer)
        this.carouselTimer = null
      }
    },
    
    // 下一行
    nextRow() {
      if (!this.tableData || this.tableData.length === 0) {
        return
      }
      
      const animationType = this.config.customize.animationType || 'slide'
      const duration = this.config.customize.animationDuration || 300
      
      this.isTransitioning = true
      
      setTimeout(() => {
        this.currentRow = (this.currentRow + 1) % this.tableData.length
        this.updateKey++
        
        setTimeout(() => {
          this.isTransitioning = false
        }, 50)
      }, duration / 2)
    }
  },
  mounted() {
    // 初始化轮播
    if (this.config.customize.isCarousel && this.config.customize.autoPlay) {
      this.$nextTick(() => {
        this.initCarousel()
      })
    }
  },
  beforeDestroy() {
    // 清理定时器
    this.clearCarousel()
  },
  watch: {
    // 监听轮播配置变化
    'config.customize.isCarousel'(newVal) {
      if (newVal && this.config.customize.autoPlay) {
        this.$nextTick(() => {
          this.initCarousel()
        })
      } else {
        this.clearCarousel()
      }
    },
    
    // 监听自动播放配置变化
    'config.customize.autoPlay'(newVal) {
      if (newVal && this.config.customize.isCarousel) {
        this.$nextTick(() => {
          this.initCarousel()
        })
      } else {
        this.clearCarousel()
      }
    }
  }
}
</script>

<style scoped>
/* 表格容器样式 */
.carousel-table-wrapper {
  position: relative;
  overflow: hidden;
}

.table-container {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.table-header {
  flex-shrink: 0;
}

.header-cell {
  position: relative;
}

.table-body {
  flex: 1;
  overflow: hidden;
}

.table-content {
  width: 100%;
}

.table-row {
  transition: background-color 0.2s ease;
}

.table-row:hover {
  background-color: rgba(255, 255, 255, 0.1) !important;
}

.table-cell {
  position: relative;
}

/* 轮播指示器样式 */
.carousel-indicators {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 30px;
  gap: 8px;
  padding: 5px 0;
}

.indicator {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: rgba(255, 255, 255, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
}

.indicator.active {
  background-color: #409EFF;
  transform: scale(1.2);
}

.indicator:hover {
  background-color: rgba(255, 255, 255, 0.6);
}
</style>