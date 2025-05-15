<template>
  <div
    class="svg-icon-viewer"
    :style="containerStyle"
  >
    <div 
      v-if="config && config.customize && config.customize.iconClass"
      class="icon-svg"
      :style="iconSvgStyle"
      v-html="getSvgContent()"
    ></div>
    <div v-else class="icon-placeholder">
      未选择图标或配置错误
    </div>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import { mapState } from 'vuex'
import { iconList } from './iconList'
import { getSvgIcon } from './svgLoader'
// predefineColors 似乎没有在这个组件中直接使用，如果后续配置面板也不需要，可以考虑移除
// import {predefineColors} from "data-room-ui/js/utils/colorList";

// SVG图标内容 - 直接硬编码
const svgIcons = {
  'check': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l237.44 237.44a32 32 0 0 0 45.248 0l454.656-454.656a32 32 0 1 0-45.248-45.248L406.592 706.944h.064z"></path></svg>',
  'arrow-left': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a32 32 0 0 0 45.696-44.544L346.24 512l308.864-318.08a32 32 0 0 0-45.696-44.544z"></path></svg>'
  // 可以根据需要添加更多图标
};

export default {
  name: 'SvgIcon',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({
        // 确保有一个默认的 customize 结构，防止初始渲染时出错
        customize: {
          iconClass: 'check', // 默认图标
          color: '#333333',
          size: '32px'
        },
        w: 50, // 默认宽度
        h: 50  // 默认高度
      })
    }
    // predefineThemeColors 移除了，因为它在 index.vue 中未使用
  },
  computed: {
    ...mapState({
      // chartList: state => state.bigScreen.pageInfo.chartList // 如果不直接使用 chartList，可以移除
    }),
    containerStyle() {
      // 使用组件自身的宽高配置来控制容器大小
      return {
        width: `${this.config.w || 50}px`,
        height: `${this.config.h || 50}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      };
    },
    iconSvgStyle() {
      let size = '32px'; // 默认大小
      if (this.config && this.config.customize && this.config.customize.size) {
        // 简单处理，如果用户输入不带单位，则默认为 px
        size = /^\d+$/.test(this.config.customize.size) ? `${this.config.customize.size}px` : this.config.customize.size;
      }
      
      // 允许使用百分比，相对于容器大小
      const isPercentageSize = size.includes('%');

      return {
        fill: (this.config && this.config.customize && this.config.customize.color) ? this.config.customize.color : '#333333',
        width: isPercentageSize ? size : (this.config.w && this.config.h ? '100%' : size) , // 如果是百分比，则使用它，否则如果容器有大小，则100%填充，否则使用具体size
        height: isPercentageSize ? size : (this.config.w && this.config.h ? '100%' : size),
        maxWidth: `${this.config.w || 50}px`, // 防止SVG超出容器
        maxHeight: `${this.config.h || 50}px` // 防止SVG超出容器
      };
    }
  },
  mounted () {
    // console.log("SvgIcon config on mount:", JSON.parse(JSON.stringify(this.config)));
  },
  methods: {
    getSvgContent() {
      if (this.config && this.config.customize && this.config.customize.iconClass) {
        const iconName = this.config.customize.iconClass;
        return getSvgIcon(iconName);
      }
      return getSvgIcon('check'); // 默认使用check图标
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon-viewer {
  // 移除之前调试用的 padding 和 font-family
  // width: 100%; // 改为由 config.w 控制
  // height: 100%; // 改为由 config.h 控制
  // padding: 10px;
  // box-sizing: border-box;
  // font-family: 'Courier New', Courier, monospace; 
  overflow: hidden; // 确保SVG不会溢出容器
}

.icon-svg {
  display: inline-block; // 或者 block，取决于布局需求
  vertical-align: middle; // 如果是inline-block，有助于对齐
  :deep(svg) {
    width: 100%;
    height: 100%;
  }
}

.icon-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #909399;
  font-size: 12px;
  border: 1px dashed #dcdfe6;
  box-sizing: border-box;
}
</style>
