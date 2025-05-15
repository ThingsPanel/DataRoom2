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
import { mapState } from 'vuex'
import svgLoader from './svgLoader'

export default {
  name: 'SvgIcon',
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
      // 如果需要从vuex获取数据，可以在这里添加
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
      
      // 将路径格式转换为ID格式 (例如 "智慧城市/智慧交通/办公用电" -> "智慧城市-智慧交通-办公用电")
      const iconId = iconPath.replace(/\//g, '-');
      
      // 尝试从svgLoader获取图标
      const svgContent = svgLoader.getSvgIcon(iconId);
      
      if (svgContent) {
        return svgContent;
      }
      
      // 如果没有找到图标，返回占位符
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
</style>
