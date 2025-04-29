<template>
  <div class="bs-design-wrap bs-picture">
    <div class="content-box">
      <el-image
        :src="getCoverPicture(config.customize.url) || noImageUrl"
        fit="fill"
        :style="{
          width: '100%',
          height: '100%',
          opacity: config.customize.opacity,
          borderRadius: config.customize.radius + 'px'
        }"
        draggable="false"
      >
        <div
          slot="placeholder"
          class="image-slot"
        >
          加载中···
        </div>
      </el-image>
    </div>
  </div>
</template>
<script>
import { getFileUrl } from 'data-room-ui/js/utils/file'
import { refreshComponentMixin } from 'data-room-ui/js/mixins/refreshComponent'

export default {
  name: 'PictureChart',
  components: {},
  mixins: [refreshComponentMixin],
  props: {
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      noImageUrl: require('data-room-ui/BasicComponents/Picture/images/noImage.png')
    }
  },
  computed: {},
  watch: {},
  mounted () {},
  methods: {
    /**
     * 获取图片访问地址,如果是相对路径则拼接上文件访问前缀地址
     * @param url
     * @returns {*}
     */
    getCoverPicture (url) {
      
      // 判断是否为 require 引入的本地图片
      if (typeof url === 'object' && url.default) {
        return url.default
      }

      // 判断是否为完整的 http(s) 链接
      if (url && (url.startsWith('http://') || url.startsWith('https://'))) {
        return url
      }

      // 判断是否为本地静态资源路径
      if (url && url.startsWith('/static/')) {
        return url
      }

      // 其他情况使用 getFileUrl 处理
      const result = getFileUrl(url);
      return result
    },
  }
}
</script>

<style lang="scss" scoped>
.bs-design-wrap {
  width: 100%;
  background-color: rgba(0, 0, 0, 0);
  .content-box {
    width: 100%;
    height: 100%;
  }
}
</style>
