<template>
  <el-select
    :key="innerConfig.code"
    v-model="value"
    :popper-class="'basic-component-select select-popper-' + innerConfig.code"
    :class="['basic-component-select', `select-${innerConfig.code}`]"
    :placeholder="innerConfig.customize && innerConfig.customize.placeholder || ''"
    clearable
    :filterable="filterable"
    :style="{
      '--input-placeholder-color': innerConfig.customize && innerConfig.customize.placeholderColor || '#999',
      '--input-placeholder-font-size': (innerConfig.customize && innerConfig.customize.placeholderFontSize || 14) + 'px'
    }"
    @visible-change="visibleChange"
    @change="selectChange"
    @mouseenter.native="mouseenter"
  >
    <el-option
      v-for="(option, key) in optionData"
      :key="key"
      :label="option[innerConfig.dataSource && innerConfig.dataSource.dimensionField]"
      :value="option[innerConfig.dataSource && innerConfig.dataSource.metricField]"
    />
  </el-select>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import { settingToTheme } from 'data-room-ui/js/utils/themeFormatting'
import cloneDeep from 'lodash/cloneDeep'
window.dataSetFields = []
export default {
  name: 'BasicComponentSelect',
  components: {},
  mixins: [commonMixins, linkageMixins],
  props: {
    // 组件配置
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      value: '',
      innerConfig: {},
      optionData: [],
      filterable: false
    }
  },
  computed: {
    isPreview () {
      return (this.$route.path === window?.BS_CONFIG?.routers?.previewUrl) || (this.$route.path === '/big-screen/preview')
    }
  },
  watch: {
    config: {
      handler (newConfig) {
        // 当外部config更新时，更新内部配置
        this.innerConfig = cloneDeep(newConfig)
      },
      deep: true,
      immediate: true
    }
  },
  created () {
    // 初始化内部配置
    this.innerConfig = cloneDeep(this.config)
  },
  mounted () {
    this.changeStyle(this.config)
    if (this.isPreview) {
      this.filterable = true
    } else {
      document.querySelector(`.select-${this.innerConfig.code}`).style.pointerEvents = 'none'
    }
  },
  beforeDestroy () { },
  methods: {
    dataFormatting (config, data) {
      // 数据返回成功则赋值
      if (data.success) {
        data = data.data
        // 获取到后端返回的数据，有则赋值
        if (config.dataHandler) {
          try {
            // 此处函数处理data
            eval(config.dataHandler)
          } catch (e) {
            console.info(e)
          }
        }
        this.optionData = data
        // 语音播报
      } else {
        // 数据返回失败则赋前端的模拟数据
        config.option.data = []
        this.optionData = []
      }
      return config
    },
    changeStyle (config) {
      // 不直接修改props，而是克隆后操作
      const localConfig = cloneDeep({ ...this.innerConfig, ...config })
      // 样式改变时更新主题配置
      localConfig.theme = settingToTheme(cloneDeep(localConfig), this.customTheme)
      this.changeChartConfig(localConfig)
      this.innerConfig = localConfig
      // 选择器元素
      const selectInputEl = document.querySelector(`.select-${localConfig.code} .el-input__inner`)
      if (selectInputEl && localConfig.customize) {
        // 背景颜色
        selectInputEl.style.backgroundColor = localConfig.customize.backgroundColor || 'transparent'
        // 字体大小
        selectInputEl.style.fontSize = (localConfig.customize.fontSize || 14) + 'px'
        // 字体颜色
        selectInputEl.style.color = localConfig.customize.fontColor || '#333'
        // 边框颜色
        selectInputEl.style.borderColor = localConfig.customize.borderColor || '#DCDFE6'
      }
      // 下拉图标
      const selectDropdownIcon = document.querySelector(`.select-${localConfig.code} .el-icon-arrow-up`)
      if (selectDropdownIcon && localConfig.customize) {
        selectDropdownIcon.style.fontSize = (localConfig.customize.fontSize || 14) + 'px'
      }
      // 选择器下拉框元素
      const selectDropdownEl = document.querySelector(`.select-${localConfig.code} .el-select-dropdown`)
      // 箭头背景颜色和下拉框背景颜色一致
      if (selectDropdownEl && localConfig.customize) {
        // 下拉框无边框
        selectDropdownEl.style.border = 'none'
        // 背景颜色
        selectDropdownEl.style.backgroundColor = localConfig.customize.dropDownBackgroundColor || '#FFFFFF'
      }
    },
    // 组件联动
    selectChange (val) {
      if (val) {
        this.linkage(this.optionData.find(item => item[this.innerConfig.dataSource?.metricField] === val))
      }
    },
    visibleChange (val) {
      if (!this.innerConfig.customize) return

      if (val) {
        // 修改下拉框背景颜色，让下拉框背景颜色和箭头背景颜色一致
        const selectDropdownEl = document.querySelector(`.select-popper-${this.innerConfig.code}`)
        if (selectDropdownEl) {
          selectDropdownEl.style.color = this.innerConfig.customize.dropDownBackgroundColor || '#FFFFFF'
          // 空状态
          const selectDropdownEmptyEl = document.querySelector(`.select-popper-${this.innerConfig.code} .el-select-dropdown__empty`)
          if (selectDropdownEmptyEl) {
            selectDropdownEmptyEl.style.backgroundColor = this.innerConfig.customize.dropDownBackgroundColor || '#FFFFFF'
          }
          // 下拉项hover颜色
          const selectDropdownWrap = document.querySelector(`.select-popper-${this.innerConfig.code} .el-select-dropdown__wrap`)
          if (selectDropdownWrap) {
            selectDropdownWrap.style.setProperty('--drop-down-hover-font-color', this.innerConfig.customize.dropDownHoverFontColor || '#409EFF')
            selectDropdownWrap.style.setProperty('--drop-down-hover-background-color', this.innerConfig.customize.dropDownHoverBackgroundColor || '#F5F7FA')
          }
        }
      }
      // 不是激活项的还是使用背景颜色
      const selectDropdownItemEl = document.querySelectorAll(`.select-popper-${this.innerConfig.code} .el-select-dropdown__item`)
      if (selectDropdownItemEl && selectDropdownItemEl.length > 0) {
        selectDropdownItemEl.forEach(item => {
          // 检查是否是激活项，不是则使用背景颜色
          if (!item.classList.contains('selected')) {
            item.style.color = this.innerConfig.customize.dropDownFontColor || '#606266'
            item.style.backgroundColor = this.innerConfig.customize.dropDownBackgroundColor || '#FFFFFF'
          }
        })
      }
    },
    // 鼠标进入
    mouseenter () {
      if (!this.value || !this.innerConfig.customize) return

      setTimeout(() => {
        // 清空图标
        const selectDropdownCloseIcon = document.querySelector(`.select-${this.innerConfig.code} .el-icon-circle-close`)
        if (selectDropdownCloseIcon) {
          selectDropdownCloseIcon.style.fontSize = (this.innerConfig.customize.fontSize || 14) + 'px'
        }
      }, 30)
    }
  }

}
</script>

<style lang="scss">
.basic-component-select {
  .el-select-dropdown__wrap {
    margin-bottom: 0px !important;
  }

  .el-select-group__wrap:not(:last-of-type)::after {
    background-color: transparent !important;
  }

  .popper__arrow {
    bottom: -6px !important;
    border-top-color: var(--color) !important;
    border-bottom-color: var(--color) !important;

    &::after {
      bottom: 0px !important;
      border-top-color: var(--color) !important;
      border-bottom-color: var(--color) !important;
    }
  }
}
</style>

<style lang="scss" scoped>
.basic-component-select {
  width: 100%;
  height: 100%;

  ::v-deep .el-input {
    height: 100% !important;

    .el-select__caret {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
    }

    //  选择器输入框样式
    .el-input__inner {
      height: 100% !important;
    }
  }
  ::v-deep .el-input__inner::placeholder {
      color: var(--input-placeholder-color);
      font-size: var(--input-placeholder-font-size);
    }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    color: var(--drop-down-hover-font-color) !important;
    background-color: var(--drop-down-hover-background-color) !important;
  }

  .el-tag.el-tag--info {
    color: var(--bs-el-text) !important;
  }
}
</style>
