<template>
  <div
    class="svg-icon-viewer"
    :style="containerStyle"
  >
    <div 
      class="icon-svg"
      :style="iconSvgStyle"
      v-html="svgContent"
    ></div>
  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
import { mapState } from 'vuex'

// 直接引入SVG内容
const officeSvg = '<svg data-v-9833e8b2="" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="25" height="20"><g data-v-9833e8b2=""><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m28.1,1l83.5,0l0,47.4l-83.5,0l0,-47.4l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m34.9,7.8l70,0l0,33.9l-70,0l0,-33.9l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m95.9,56.3l0,4.5l-49.7,0l0,-4.5l20.3,0l0,-5.6l9,0l0,5.6l20.4,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m130.9,150l0,-72.3l-110.7,0l0,72.3l-19.2,0l0,-89.2l188.5,0l0,89.2l-58.6,0l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m137.6,77.7l45.2,0l0,13.5l-45.2,0l0,-13.5l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m160.2,82.3c1.2,0 2.3,1 2.3,2.3c0,1.2 -1,2.3 -2.3,2.3c-1.2,0 -2.3,-1 -2.3,-2.3c0.1,-1.3 1.1,-2.3 2.3,-2.3l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m137.6,93.6l45.2,0l0,13.5l-45.2,0l0,-13.5l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m160.2,98.1c1.2,0 2.3,1 2.3,2.3c0,1.2 -1,2.3 -2.3,2.3c-1.2,0 -2.3,-1 -2.3,-2.3c0.1,-1.3 1.1,-2.3 2.3,-2.3l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m137.6,109.4l45.2,0l0,13.5l-45.2,0l0,-13.5l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m160.2,113.9c1.2,0 2.3,1 2.3,2.3c0,1.2 -1,2.3 -2.3,2.3c-1.2,0 -2.3,-1 -2.3,-2.3c0.1,-1.3 1.1,-2.3 2.3,-2.3l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m137.6,125.2l45.2,0l0,13.5l-45.2,0l0,-13.5l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path><path data-v-9833e8b2="" transform="scale(0.13157894736842105)" fill="none" stroke="rgba(68, 83, 109, 1)" paint-order="fill stroke markers" d="m160.2,129.7c1.2,0 2.3,1 2.3,2.3c0,1.2 -1,2.3 -2.3,2.3c-1.2,0 -2.3,-1 -2.3,-2.3c0.1,-1.3 1.1,-2.3 2.3,-2.3l0,0z" stroke-width="5" stroke-miterlimit="10" stroke-dasharray=""></path></g></svg>';

// 基本SVG图标库
const svgIcons = {
  'check': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M406.656 706.944L195.84 496.256a32 32 0 1 0-45.248 45.248l237.44 237.44a32 32 0 0 0 45.248 0l454.656-454.656a32 32 0 1 0-45.248-45.248L406.592 706.944h.064z"></path></svg>',
  'arrow-left': '<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg"><path d="M609.408 149.376 277.76 489.6a32 32 0 0 0 0 44.672l331.648 340.352a32 32 0 0 0 45.696-44.544L346.24 512l308.864-318.08a32 32 0 0 0-45.696-44.544z"></path></svg>',
  '智慧城市/智慧交通/办公用电': officeSvg
};

// 缓存已加载的SVG
const svgCache = {};

export default {
  name: 'SvgIcon',
  mixins: [commonMixins, linkageMixins],
  props: {
    config: {
      type: Object,
      default: () => ({
        customize: {
          iconClass: '智慧城市/智慧交通/办公用电', // 默认图标路径
          color: '#333333',
          size: '32px'
        },
        w: 50,
        h: 50
      })
    }
  },
  computed: {
    ...mapState({
      // chartList: state => state.bigScreen.pageInfo.chartList
    }),
    containerStyle() {
      return {
        width: `${this.config.w || 50}px`,
        height: `${this.config.h || 50}px`,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
      };
    },
    iconSvgStyle() {
      let size = '32px';
      if (this.config && this.config.customize && this.config.customize.size) {
        size = /^\d+$/.test(this.config.customize.size) ? `${this.config.customize.size}px` : this.config.customize.size;
      }
      
      const isPercentageSize = size.includes('%');
      const color = (this.config && this.config.customize && this.config.customize.color) ? this.config.customize.color : '#333333';

      return {
        color: color,
        stroke: color,
        fill: color,
        width: isPercentageSize ? size : (this.config.w && this.config.h ? '100%' : size),
        height: isPercentageSize ? size : (this.config.w && this.config.h ? '100%' : size),
        maxWidth: `${this.config.w || 50}px`,
        maxHeight: `${this.config.h || 50}px`
      };
    },
    svgContent() {
      const iconPath = this.config?.customize?.iconClass || '智慧城市/智慧交通/办公用电';
      
      // 检查是否已有预定义图标
      if (svgIcons[iconPath]) {
        return svgIcons[iconPath];
      }
      
      // 尝试从缓存获取
      if (svgCache[iconPath]) {
        return svgCache[iconPath];
      }
      
      // 如果是有效路径，返回占位符
      return `<svg viewBox="0 0 1024 1024" xmlns="http://www.w3.org/2000/svg">
        <rect width="1024" height="1024" fill="none" stroke="currentColor" stroke-width="2" />
        <text x="512" y="512" font-size="32" text-anchor="middle" alignment-baseline="middle" fill="currentColor">${iconPath}</text>
      </svg>`;
    }
  },
  watch: {
    'config.customize.iconClass': {
      handler(newVal) {
        // 当图标路径改变时，可以在这里添加加载逻辑
        console.log('Icon path changed:', newVal);
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.svg-icon-viewer {
  overflow: hidden;
}

.icon-svg {
  display: inline-block;
  vertical-align: middle;
  width: 100%;
  height: 100%;
  
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
