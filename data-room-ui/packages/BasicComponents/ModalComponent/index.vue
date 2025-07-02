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
    
    <!-- 自定义弹窗 -->
    <div v-if="config.customize.enableModal && dialogVisible" class="modal-overlay" @click="closeModal">
      <div class="modal-dialog" :style="modalStyle" @click.stop>
        <div class="modal-header">
          <h3>{{ config.customize.dialogTitle || '数据详情' }}</h3>
          <button class="close-btn" @click="closeModal">&times;</button>
        </div>
        <div class="modal-body">
          <div 
            v-for="column in tableColumns" 
            :key="column.prop"
            class="detail-item"
          >
            <label>{{ column.label }}：</label>
            <span>{{ formatCellValue(selectedRowData[column.prop], column) }}</span>
          </div>
        </div>
        <div class="modal-footer">
          <button class="btn btn-secondary" @click="closeModal">关闭</button>
          <button class="btn btn-primary" @click="handleConfirm">确定</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'

export default {
  name: 'ModalComponent',
  mixins: [commonMixins, paramsMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      dialogVisible: false, // 弹窗显示状态
      selectedRowData: {}, // 选中的行数据
      tableData: [], // 表格数据
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
            opacity: 0,
            transition: `opacity ${duration}ms ease-in-out`
          }
        case 'zoom':
          return {
            ...baseStyle,
            transform: 'scale(0.95)',
            opacity: 0.8,
            transition: `transform ${duration}ms ease-in-out, opacity ${duration}ms ease-in-out`
          }
        case 'flip':
          return {
            ...baseStyle,
            transform: 'rotateX(90deg)',
            transition: `transform ${duration}ms ease-in-out`
          }
        default:
          return {
            ...baseStyle,
            transform: `translateY(-${rowHeight}px)`,
            transition: `transform ${duration}ms ease-in-out`
          }
      }
    },
    
    // 弹窗样式
    modalStyle() {
      return {
        width: (this.config.customize.dialogWidth || 50) + '%',
        maxWidth: '800px',
        minWidth: '400px'
      }
    },
    
    // 表格列配置
    tableColumns() {
      let columns = []
      
      // 优先使用自定义列配置
      if (this.config.customize?.columns && this.config.customize.columns.length) {
        columns = this.config.customize.columns
      } else if (this.config.displayOption?.dimensionField?.value?.length) {
        // 如果没有自定义列配置，从数据源配置中获取
        columns = this.config.displayOption.dimensionField.value.map(field => ({
          prop: field.field || field.id, // 优先使用field，兼容id
          label: field.name || field.field || field.id,
          width: field.width || 'auto',
          align: field.align || 'center'
        }))
      } else if (this.tableData && this.tableData.length > 0) {
        // 如果没有任何列配置，根据数据自动生成
        const firstRow = this.tableData[0]
        columns = Object.keys(firstRow).map(key => ({
          prop: key,
          label: this.getColumnLabel(key),
          width: this.getColumnWidth(key),
          align: this.getColumnAlign(key)
        }))
      }
      
      // 应用列宽配置
      if (this.config.customize?.columnSettings?.length) {
        columns = columns.map(column => {
          const setting = this.config.customize.columnSettings.find(s => s.key === column.prop)
          if (setting) {
            return {
              ...column,
              width: setting.width || column.width,
              align: setting.align || column.align
            }
          }
          return column
        })
      }
      
      console.log('tableColumns计算结果:', {
        columnsLength: columns.length,
        hasCustomColumns: !!(this.config.customize?.columns && this.config.customize.columns.length),
        hasTableData: !!(this.tableData && this.tableData.length),
        columns: columns
      })
      
      return columns
    },
    
    // 显示数据（根据是否轮播决定显示方式）
    displayData() {
      if (!this.tableData || !this.tableData.length) {
        return []
      }
      
      if (!this.config.customize.isCarousel) {
        return this.tableData
      }
      
      const pageSize = this.config.customize.carouselPageSize || 5
      // 轮播时需要显示pageSize+1行数据用于滚动动画
      const startIndex = this.currentRow % this.tableData.length
      const result = []
      
      // 获取连续的pageSize+1行数据，用于滚动效果
      for (let i = 0; i < pageSize + 1; i++) {
        const index = (startIndex + i) % this.tableData.length
        result.push(this.tableData[index])
      }
      
      return result
    },
    
    // 总行数（用于轮播指示器）
    totalRows() {
      return this.tableData ? this.tableData.length : 0
    },
    
    // 是否显示指示器
    showIndicators() {
      return this.config.customize.showIndicators !== false && this.totalRows > (this.config.customize.carouselPageSize || 5)
    }
  },
  
  mounted() {
    console.log('ModalComponent mounted')
    // 调用chartInit来触发数据获取和处理流程
    this.chartInit()
    this.initCarousel()
  },
  
  beforeDestroy() {
    this.clearCarousel()
  },
  
  methods: {
    // 获取当前页数据
    getCurrentPageData(pageSize) {
      const startIndex = this.currentPage * pageSize
      const endIndex = startIndex + pageSize
      return this.tableData.slice(startIndex, endIndex)
    },
    
    // 获取表头单元格样式
    getHeaderCellStyle(column, colIndex) {
      const borderWidth = this.config.customize.borderWidth || 1
      const borderStyle = this.config.customize.borderStyle || 'solid'
      const borderColor = this.config.customize.borderColor || '#434343'
      const borderMode = this.config.customize.borderMode || 'inner'
      
      const style = {
        width: column.width === 'auto' ? 'auto' : column.width + 'px',
        // 由于使用了flex布局，需要用justifyContent而不是textAlign来控制对齐
        justifyContent: this.getFlexAlignment(column.align || 'center'),
        minWidth: column.minWidth ? column.minWidth + 'px' : '80px',
        backgroundColor: this.config.customize.headerBgColor || '#2C2C2C',
        color: this.config.customize.headerTextColor || '#E4E7ED',
        fontSize: (this.config.customize.headerFontSize || 14) + 'px',
        fontWeight: this.config.customize.headerFontWeight || 'bold'
      }
      
      // 根据边框模式设置表头边框
      if (this.config.customize.showBorder) {
        const borderValue = `${borderWidth}px ${borderStyle} ${borderColor}`
        
        switch (borderMode) {
          case 'outer':
            // 外边框模式
            style.borderTop = borderValue
            if (colIndex === 0) style.borderLeft = borderValue
            if (colIndex === this.tableColumns.length - 1) style.borderRight = borderValue
            style.borderBottom = borderValue
            break
            
          case 'full':
            // 完整边框模式
            style.border = borderValue
            style.boxSizing = 'border-box'
            if (colIndex > 0) style.borderLeft = 'none'
            break
            
          case 'inner':
          default:
            // 内边框模式
            if (colIndex < this.tableColumns.length - 1) {
              style.borderRight = borderValue
            }
            style.borderBottom = borderValue
            break
        }
      }
      
      return style
    },
    
    // 获取行样式
    getRowStyle(rowIndex) {
      const style = {
        height: (this.config.customize.rowHeight || 40) + 'px'
      }
      
      // 斑马纹效果
      if (this.config.customize.stripe) {
        if (rowIndex % 2 === 0) {
          // 偶数行（从0开始计数，所以0,2,4...是偶数行）
          style.backgroundColor = this.config.customize.evenRowBgColor || '#1A1A1A'
        } else {
          // 奇数行（1,3,5...是奇数行）
          style.backgroundColor = this.config.customize.oddRowBgColor || '#1F1F1F'
        }
      } else {
        // 不使用斑马纹时，使用统一背景色
        style.backgroundColor = this.config.customize.cellBgColor || '#1A1A1A'
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
        width: column.width === 'auto' ? 'auto' : column.width + 'px',
        // 由于使用了flex布局，需要用justifyContent而不是textAlign来控制对齐
        justifyContent: this.getFlexAlignment(column.align || 'center'),
        color: this.config.customize.cellTextColor || '#C0C4CC',
        fontSize: (this.config.customize.cellFontSize || 13) + 'px'
        // 注意：不在这里设置backgroundColor，让行级别的斑马纹背景色生效
        // backgroundColor会在getRowStyle中根据斑马纹设置来决定
      }
      
      // 只有在不使用斑马纹时才设置单元格背景色
      if (!this.config.customize.stripe) {
        style.backgroundColor = this.config.customize.cellBgColor || '#1E1E1E'
      }
      
      // 根据边框模式设置边框
      if (this.config.customize.showBorder) {
        const borderValue = `${borderWidth}px ${borderStyle} ${borderColor}`
        
        switch (borderMode) {
          case 'outer':
            // 只显示外边框，避免重叠
            if (rowIndex === 0) style.borderTop = borderValue
            if (colIndex === 0) style.borderLeft = borderValue
            if (rowIndex === this.displayData.length - 1) style.borderBottom = borderValue
            if (colIndex === this.tableColumns.length - 1) style.borderRight = borderValue
            break
            
          case 'full':
            // 完整边框，使用box-sizing避免重叠
            style.border = borderValue
            style.boxSizing = 'border-box'
            // 调整相邻单元格的边框，避免双重边框
            if (colIndex > 0) style.borderLeft = 'none'
            if (rowIndex > 0) style.borderTop = 'none'
            break
            
          case 'inner':
          default:
            // 内边框模式，只显示右边框和底边框，避免重叠
            if (colIndex < this.tableColumns.length - 1) {
              style.borderRight = borderValue
            }
            if (rowIndex < this.displayData.length - 1) {
              style.borderBottom = borderValue
            }
            break
        }
      }
      
      return style
    },
    
    // 获取列样式（用于条件格式化）
    getColumnStyle(column, value) {
      const style = {}
      
      // 根据列配置设置样式
      if (column.color) {
        style.color = column.color
      }
      
      // 根据值设置条件样式
      if (column.conditionalStyle && Array.isArray(column.conditionalStyle)) {
        for (const condition of column.conditionalStyle) {
          if (this.checkCondition(value, condition.condition, condition.value)) {
            Object.assign(style, condition.style)
            break
          }
        }
      }
      
      return style
    },
    
    // 将文本对齐方式转换为flex的justifyContent值
    getFlexAlignment(align) {
      switch (align) {
        case 'left':
          return 'flex-start'
        case 'right':
          return 'flex-end'
        case 'center':
        default:
          return 'center'
      }
    },
    
    // 检查条件
    checkCondition(value, condition, targetValue) {
      switch (condition) {
        case '>':
          return Number(value) > Number(targetValue)
        case '<':
          return Number(value) < Number(targetValue)
        case '=':
          return value == targetValue
        case '>=':
          return Number(value) >= Number(targetValue)
        case '<=':
          return Number(value) <= Number(targetValue)
        case '!=':
          return value != targetValue
        default:
          return false
      }
    },
    
    // 格式化单元格值
    formatCellValue(value, column) {
      if (value === null || value === undefined) {
        return '-'
      }
      
      // 根据列配置进行格式化
      if (column.formatter && typeof column.formatter === 'function') {
        return column.formatter(value)
      }
      
      // 数字格式化
      if (column.type === 'number' && typeof value === 'number') {
        const decimals = column.decimals || 0
        return value.toFixed(decimals)
      }
      
      // 日期格式化
      if (column.type === 'date' && value) {
        const date = new Date(value)
        return date.toLocaleDateString()
      }
      
      return value.toString()
    },
    
    // 初始化数据
    initializeData() {
      // 如果没有数据，使用默认数据
      if (!this.tableData || this.tableData.length === 0) {
        if (this.config.data && this.config.data.length > 0) {
          this.tableData = this.config.data
        } else {
          this.tableData = [
            { name: '张三', age: 28, city: '北京', department: '技术部', salary: 15000 },
            { name: '李四', age: 32, city: '上海', department: '产品部', salary: 18000 },
            { name: '王五', age: 25, city: '深圳', department: '设计部', salary: 12000 },
            { name: '赵六', age: 30, city: '广州', department: '运营部', salary: 14000 },
            { name: '钱七', age: 27, city: '杭州', department: '市场部', salary: 13000 }
          ]
        }
      }
      
      // 如果没有列配置，自动生成
      if (!this.config.customize.columns || this.config.customize.columns.length === 0) {
        if (this.tableData && this.tableData.length > 0) {
          const firstRow = this.tableData[0]
          this.config.customize.columns = Object.keys(firstRow).map(key => ({
            prop: key,
            label: this.getColumnLabel(key),
            width: this.getColumnWidth(key),
            align: this.getColumnAlign(key)
          }))
        }
      }
      
      console.log('组件初始化完成:', {
        tableDataLength: this.tableData.length,
        columnsLength: this.config.customize.columns?.length || 0
      })
    },
    
    // 初始化轮播
    initCarousel() {
      if (this.config.customize.isCarousel && this.config.customize.autoPlay) {
        this.startCarousel()
      }
    },
    
    // 开始轮播
    startCarousel() {
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
      if (this.tableData.length <= (this.config.customize.carouselPageSize || 5)) return
      
      const duration = this.config.customize.animationDuration || 300
      this.isTransitioning = true
      
      // 延迟更新currentRow，让动画先执行
      setTimeout(() => {
        if (this.tableData && this.tableData.length > 0) {
          this.currentRow = (this.currentRow + 1) % this.tableData.length
        }
        this.isTransitioning = false
      }, duration)
    },
    
    // 跳转到指定行
    goToRow(rowIndex) {
      if (!this.tableData || rowIndex === this.currentRow || rowIndex >= this.tableData.length) return
      
      const duration = this.config.customize.animationDuration || 300
      this.isTransitioning = true
      this.currentRow = rowIndex
      
      setTimeout(() => {
        this.isTransitioning = false
      }, duration)
      
      // 如果是手动切换，暂停自动轮播一段时间
      if (this.config.customize.autoPlay) {
        this.clearCarousel()
        setTimeout(() => {
          this.startCarousel()
        }, 2000)
      }
    },
    
    // 处理行点击事件
    handleRowClick(row, rowIndex) {
      this.selectedRowData = row
      
      // 如果启用了弹窗，则显示弹窗
      if (this.config.customize.enableModal) {
        this.dialogVisible = true
      }
      
      // 触发联动
      this.linkage({
        [this.config.code]: row
      })
      
      console.log('表格行被点击:', row)
    },
    
    // 关闭弹窗
    closeModal() {
      this.dialogVisible = false
    },
    
    // 弹窗确定按钮处理
    handleConfirm() {
      console.log('弹窗确定按钮被点击，选中数据:', this.selectedRowData)
      
      this.linkage({
        [this.config.code]: this.selectedRowData
      })
      
      this.dialogVisible = false
    },
    
    // 数据格式化处理（关键方法：处理从数据集获取的数据）
    dataFormatting(config, data) {
      console.log('ModalComponent dataFormatting called:', { config, data })
      
      // 处理表格数据
      if (data?.data && data.data.length > 0) {
        this.tableData = data.data
        console.log('使用外部数据:', this.tableData)
      } else if (config.data && config.data.length > 0) {
        // 如果没有外部数据，使用配置中的初始数据
        this.tableData = config.data
        console.log('使用配置数据:', this.tableData)
      } else {
        // 使用默认示例数据
        this.tableData = [
          { name: '张三', age: 28, city: '北京', department: '技术部', salary: 15000 },
          { name: '李四', age: 32, city: '上海', department: '产品部', salary: 18000 },
          { name: '王五', age: 25, city: '深圳', department: '设计部', salary: 12000 },
          { name: '赵六', age: 30, city: '广州', department: '运营部', salary: 14000 },
          { name: '钱七', age: 27, city: '杭州', department: '市场部', salary: 13000 }
        ]
        console.log('使用默认数据:', this.tableData)
      }
      
      // 处理列数据
      const columnData = data?.columnData || {}
      const dimensionFieldList = config.dataSource?.dimensionFieldList || []
      
      console.log('列数据处理:', { columnData, dimensionFieldList, currentColumns: this.config.customize.columns })
      
      if (dimensionFieldList.length > 0) {
        // 根据dimensionFieldList的顺序调整列顺序
        const sortedColumnData = []
        const dimensionFields = []
        dimensionFieldList.forEach((fieldAlias) => {
          const column = Object.values(columnData).find(col => col.alias === fieldAlias)
          if (column) {
            sortedColumnData.push({
              prop: column.alias,
              label: column.remark || column.originalColumn,
              width: this.getColumnWidth(column.alias),
              align: this.getColumnAlign(column.alias)
            })
            dimensionFields.push({
              field: column.alias,
              name: column.remark || column.originalColumn
            })
          }
        })
        this.config.customize.columns = sortedColumnData
        // 同时设置displayOption.dimensionField.value以便setting.vue正确显示
        if (!this.config.displayOption) this.$set(this.config, 'displayOption', {})
        if (!this.config.displayOption.dimensionField) this.$set(this.config.displayOption, 'dimensionField', {})
        this.$set(this.config.displayOption.dimensionField, 'value', dimensionFields)
        console.log('使用dimensionFieldList生成列配置:', sortedColumnData)
        console.log('设置dimensionField.value:', dimensionFields)
      } else if (Object.keys(columnData).length > 0) {
        // 如果没有配置维度字段但有列数据，使用所有列
        this.config.customize.columns = Object.values(columnData).map(column => ({
          prop: column.alias,
          label: column.remark || column.originalColumn,
          width: this.getColumnWidth(column.alias),
          align: this.getColumnAlign(column.alias)
        }))
        // 同时设置displayOption.dimensionField.value
        const dimensionFields = Object.values(columnData).map(column => ({
          field: column.alias,
          name: column.remark || column.originalColumn
        }))
        if (!this.config.displayOption) this.$set(this.config, 'displayOption', {})
        if (!this.config.displayOption.dimensionField) this.$set(this.config.displayOption, 'dimensionField', {})
        this.$set(this.config.displayOption.dimensionField, 'value', dimensionFields)
        console.log('使用columnData生成列配置:', this.config.customize.columns)
        console.log('设置dimensionField.value:', dimensionFields)
      } else if (!this.config.customize.columns || this.config.customize.columns.length === 0) {
        // 如果没有任何列配置，根据数据自动生成列配置
        if (this.tableData && this.tableData.length > 0) {
          const firstRow = this.tableData[0]
          this.config.customize.columns = Object.keys(firstRow).map(key => ({
            prop: key,
            label: this.getColumnLabel(key),
            width: this.getColumnWidth(key),
            align: this.getColumnAlign(key)
          }))
          // 同时设置displayOption.dimensionField.value
          const dimensionFields = Object.keys(firstRow).map(key => ({
            field: key,
            name: this.getColumnLabel(key)
          }))
          if (!this.config.displayOption) this.$set(this.config, 'displayOption', {})
          if (!this.config.displayOption.dimensionField) this.$set(this.config.displayOption, 'dimensionField', {})
          this.$set(this.config.displayOption.dimensionField, 'value', dimensionFields)
          console.log('根据表格数据自动生成列配置:', this.config.customize.columns)
          console.log('设置dimensionField.value:', dimensionFields)
        } else {
          console.log('无法生成列配置：没有表格数据')
        }
      } else {
        console.log('使用现有列配置:', this.config.customize.columns)
      }
      
      // 如果是轮播模式，重新初始化轮播
      if (this.config.customize.isCarousel && this.config.customize.autoPlay) {
        this.$nextTick(() => {
          this.currentRow = 0
          this.startCarousel()
        })
      }
      
      // 更新组件
      this.updateKey++
      
      console.log('表格组件数据处理完成:', {
        tableDataLength: this.tableData ? this.tableData.length : 0,
        columnsLength: this.config.customize.columns?.length || 0,
        isCarousel: this.config.customize.isCarousel,
        hasData: this.tableData ? this.tableData.length > 0 : false
      })
      
      return config
    },
    
    // 获取列设置
    getColumnSettings(key) {
      if (this.config.customize.columnSettings && this.config.customize.columnSettings.length > 0) {
        const setting = this.config.customize.columnSettings.find(s => s.key === key)
        return setting || {}
      }
      return {}
    },
    
    // 获取列对齐方式
    getColumnAlign(key) {
      return this.getColumnSettings(key).align || 'center'
    },
    
    // 获取列宽度
    getColumnWidth(key) {
      const width = this.getColumnSettings(key).width
      return width || 'auto'
    },
    
    // 获取列标签（中文映射）
    getColumnLabel(key) {
      const labelMap = {
        name: '姓名',
        age: '年龄',
        city: '城市',
        department: '部门',
        salary: '薪资',
        id: 'ID',
        email: '邮箱',
        phone: '电话',
        address: '地址',
        status: '状态',
        createTime: '创建时间',
        updateTime: '更新时间'
      }
      return labelMap[key] || key
    },
    
    // 实现chartInit方法，这是commonMixins要求的
    chartInit() {
      console.log('ModalComponent chartInit called')
      console.log('config:', this.config)
      console.log('dataSource:', this.config?.dataSource)
      
      // 确保config对象存在
      if (!this.config) {
        console.error('config对象不存在，无法初始化')
        return
      }
      
      // 如果有数据源配置，调用changeData来获取数据
      if (this.config.dataSource) {
        console.log('调用changeData获取数据')
        this.changeData(this.config)
      } else {
        console.log('没有数据源配置，使用默认数据')
        // 没有数据源时，直接调用dataFormatting处理默认数据
        this.dataFormatting(this.config, {})
      }
    }
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
        this.initCarousel()
      } else {
        this.clearCarousel()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel-table-wrapper {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
  
  .table-container {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    background-color: #1A1A1A;
    border-radius: 6px;
    overflow: hidden;
    
    // 表头样式
    .table-header {
      display: flex;
      flex-shrink: 0;
      background-color: #2D2D2D;
      
      .header-cell {
        // 移除固定的flex: 1，让动态width生效
        // flex: 1;
        padding: 12px 16px;
        display: flex;
        align-items: center;
        // 移除固定的justify-content，让动态textAlign生效
        // justify-content: center;
        font-weight: 600;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        color: #E0E0E0;
        font-size: 14px;
        
        &:last-child {
          border-right: none;
        }
      }
    }
    
    // 表体样式
    .table-body {
      flex: 1;
      overflow: hidden;
      position: relative;
      perspective: 1000px; // 为3D动画提供透视
      background-color: #1A1A1A;
      
      .table-content {
        width: 100%;
        height: 100%;
        transform-style: preserve-3d; // 保持3D变换
        
        .table-row {
          display: flex;
          cursor: pointer;
          transition: all 0.2s ease;
          color: #E0E0E0;
          
          &:hover {
            background-color: rgba(64, 158, 255, 0.15) !important;
          }
          
          .table-cell {
            // 移除固定的flex: 1，让动态width生效
            // flex: 1;
            padding: 10px 16px;
            display: flex;
            align-items: center;
            // 移除固定的justify-content，让动态textAlign生效
            // justify-content: center;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            font-size: 13px;
            
            &:last-child {
              border-right: none;
            }
          }
        }
      }
    }
    
    // 轮播指示器
    .carousel-indicators {
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 12px;
      gap: 10px;
      background-color: #1A1A1A;
      
      .indicator {
        width: 10px;
        height: 10px;
        border-radius: 50%;
        background-color: #555555;
        cursor: pointer;
        transition: all 0.3s ease;
        
        &.active {
          background-color: #409eff;
          transform: scale(1.3);
          box-shadow: 0 0 8px rgba(64, 158, 255, 0.5);
        }
        
        &:hover {
          background-color: #409eff;
          transform: scale(1.1);
        }
      }
    }
  }
  
  // 弹窗样式
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;
    
    .modal-dialog {
      background: #2D2D2D;
      border-radius: 12px;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      max-height: 80vh;
      overflow: hidden;
      display: flex;
      flex-direction: column;
      border: 1px solid #434343;
      
      .modal-header {
        padding: 20px 24px;
        border-bottom: 1px solid #434343;
        display: flex;
        justify-content: space-between;
        align-items: center;
        background-color: #333333;
        
        h3 {
          margin: 0;
          color: #E0E0E0;
          font-size: 18px;
          font-weight: 600;
        }
        
        .close-btn {
          background: none;
          border: none;
          font-size: 24px;
          color: #999999;
          cursor: pointer;
          padding: 0;
          width: 28px;
          height: 28px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 4px;
          transition: all 0.2s ease;
          
          &:hover {
            color: #f56c6c;
            background-color: rgba(245, 108, 108, 0.1);
          }
        }
      }
      
      .modal-body {
        padding: 24px;
        max-height: 400px;
        overflow-y: auto;
        background-color: #2D2D2D;
        
        .detail-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 16px 0;
          border-bottom: 1px solid #434343;
          
          &:last-child {
            border-bottom: none;
          }
          
          label {
            font-weight: 600;
            color: #B0B0B0;
            min-width: 120px;
            margin-right: 20px;
            font-size: 14px;
          }
          
          span {
            color: #E0E0E0;
            text-align: right;
            flex: 1;
            word-break: break-all;
            font-size: 14px;
          }
        }
      }
      
      .modal-footer {
        padding: 20px 24px;
        border-top: 1px solid #434343;
        background-color: #333333;
        display: flex;
        justify-content: flex-end;
        gap: 16px;
        
        .btn {
          padding: 10px 20px;
          border: 1px solid #555555;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.2s ease;
          
          &.btn-secondary {
            background-color: #444444;
            color: #E0E0E0;
            
            &:hover {
              color: #409eff;
              border-color: #409eff;
              background-color: rgba(64, 158, 255, 0.1);
            }
          }
          
          &.btn-primary {
            background-color: #409eff;
            color: white;
            border-color: #409eff;
            
            &:hover {
              background-color: #66b1ff;
              border-color: #66b1ff;
              transform: translateY(-1px);
              box-shadow: 0 4px 12px rgba(64, 158, 255, 0.3);
            }
          }
        }
      }
    }
  }
}

// 响应式设计
@media (max-width: 768px) {
  .carousel-table-wrapper {
    .table-header .header-cell,
    .table-body .table-cell {
      padding: 6px 8px;
      font-size: 12px;
    }
    
    .table-row {
      min-height: 35px;
    }
    
    .modal-dialog {
      margin: 20px;
      width: calc(100% - 40px) !important;
      max-width: none !important;
    }
  }
}

// 浅色主题支持（可选）
.carousel-table-wrapper.light-theme {
  .table-container {
    background-color: #ffffff;
    
    .table-header {
      background-color: #f5f7fa;
      
      .header-cell {
        color: #303133;
      }
    }
    
    .table-body {
      background-color: #ffffff;
      
      .table-row {
        color: #303133;
        
        &:hover {
          background-color: rgba(64, 158, 255, 0.1) !important;
        }
        
        .table-cell {
          color: #303133;
        }
      }
    }
    
    .carousel-indicators {
      background-color: #ffffff;
      
      .indicator {
        background-color: #c0c4cc;
      }
    }
  }
  
  .modal-overlay {
    .modal-dialog {
      background: #ffffff;
      border: 1px solid #e4e7ed;
      
      .modal-header {
        background-color: #f8f9fa;
        border-bottom: 1px solid #e4e7ed;
        
        h3 {
          color: #303133;
        }
        
        .close-btn {
          color: #909399;
          
          &:hover {
            background-color: rgba(245, 108, 108, 0.1);
          }
        }
      }
      
      .modal-body {
        background-color: #ffffff;
        
        .detail-item {
          border-bottom: 1px solid #f0f0f0;
          
          label {
            color: #606266;
          }
          
          span {
            color: #303133;
          }
        }
      }
      
      .modal-footer {
        background-color: #f8f9fa;
        border-top: 1px solid #e4e7ed;
        
        .btn {
          border: 1px solid #dcdfe6;
          
          &.btn-secondary {
            background-color: white;
            color: #606266;
            
            &:hover {
              background-color: #ecf5ff;
              border-color: #c6e2ff;
            }
          }
        }
      }
    }
  }
}

// 动画效果
@keyframes fadeIn {
  from {
    opacity: 0;
    transform: scale(0.9);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

.modal-overlay {
  animation: fadeIn 0.3s ease;
}

.modal-dialog {
  animation: fadeIn 0.3s ease;
}
</style>