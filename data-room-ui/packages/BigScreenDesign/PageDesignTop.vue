<template>
  <div class="page-top-setting-wrap">
    <div class="logo-wrap item-wrap">
      <img
        class="menu-img"
        src="../BigScreenDesign/images/app.png"
        alt="返回"
        @click="goBackManage"
      >
      <span class="logo-text name-span">{{ pageInfo.name }}</span>
    </div>
    <div class="head-btn-group">
      <CusBtn
        style="margin-right:10px"
        @click.native="exportJson"
      >
        导出JSON
      </CusBtn>
      <span v-if="lastAutoSaveTime" class="auto-save-indicator">
        {{ lastAutoSaveTime }} 已自动保存
      </span>
      <CusBtn
        style="margin-right:10px"
        @click.native="importJson"
      >
        导入JSON
      </CusBtn>
      <span style="margin-right:8px;font-size:12px">缩放</span>
      <el-input-number
        ref="zoomInput"
        class="bs-el-input-number"
        style="margin-right:10px"
        :value="zoom"
        :min="1"
        label="描述文字"
        :controls="true"
        @change="changeZoom"
      />
      <CusBtn
        :loading="saveAndPreviewLoading"
        @click.native="changeZoom('auto')"
      >
        自适应
      </CusBtn>
      <el-dropdown
        trigger="click"
        class="align-list-dropdown"
      >
        <CusBtn type="primary">
          对齐方式<i class="el-icon-arrow-down el-icon--right" />
        </CusBtn>
        <el-dropdown-menu
          slot="dropdown"
          class="align-dropdown-menu"
        >
          <el-dropdown-item
            v-for="(mode, index) in alignList"
            :key="mode.value"
            @click.native="setAlign(mode.value)"
          >
            <icon-svg
              style="padding:3px 8px"
              :name="iconList[index]"
            />
            <span style="color: #bcc9d4">{{ mode.label }}</span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>

      <CusBtn
        :loading="saveAndPreviewLoading"
        @click.native="designAssign()"
      >
        设计分工
      </CusBtn>
      <CusBtn @click.native="showHostory">
        历史操作
      </CusBtn>
      <CusBtn
        :disabled="undoDisabled"
        @click.native="undo(true)"
      >
        <i class="iconfont-bigscreen icon-jiantouqianjin icon-reverse" />
      </CusBtn>
      <CusBtn
        :disabled="redoDisabled"
        @click.native="undo(false)"
      >
        <i class="iconfont-bigscreen icon-jiantouqianjin" />
      </CusBtn>
      <CusBtn
        :loading="saveAndPreviewLoading"
        @click.native="createdImg()"
      >
        生成图片
      </CusBtn>
      <CusBtn
        :loading="saveAndPreviewLoading"
        @click.native="execRun()"
      >
        预览
      </CusBtn>
      <CusBtn
        :loading="saveLoading"
        @click="save('saveLoading')"
      >
        保存
      </CusBtn>
      <CusBtn @click="empty">
        清空
      </CusBtn>
      <CusBtn @click="showPageInfo">
        设置
      </CusBtn>
      <CusBtn @click="updateRightVisiable">
        <i
          class="iconfont-bigscreen"
          :class="rightFold ? 'icon-zhankaicaidan' : 'icon-shouqicaidan'"
        />
      </CusBtn>
    </div>
    <ChooseTemplateDialog
      ref="ChooseTemplateDialog"
      :has-create="false"
      :page-info="pageInfo"
      @replaceItByTemplate="replaceItByTemplate"
    />
    <AssignDialog ref="AssignDialog" />
    <HistoryList ref="HistoryList" />
  </div>
</template>
<script>
import { EventBus } from 'data-room-ui/js/utils/eventBus'
import { toJpeg, toPng } from 'html-to-image'
import { mapMutations, mapActions, mapState } from 'vuex'
import { saveScreen } from 'data-room-ui/js/api/bigScreenApi'
import ChooseTemplateDialog from 'data-room-ui/BigScreenManagement/ChooseTemplateDialog.vue'
// import _ from 'lodash'
import cloneDeep from 'lodash/cloneDeep'
import uniqBy from 'lodash/uniqBy'
import { stringifyObjectFunctions } from 'data-room-ui/js/utils/evalFunctions'
import AssignDialog from 'data-room-ui/BigScreenDesign/AssignDialog/index.vue'
import HistoryList from 'data-room-ui/BigScreenDesign/HistoryList/index.vue'
import CusBtn from './BtnLoading'
import icons from 'data-room-ui/assets/images/alignIcon/export'
import IconSvg from 'data-room-ui/SvgIcon'
import {
  showSize,
  compressImage
} from 'data-room-ui/js/utils/compressImg'
import { log } from '@antv/g2plot/lib/utils'
// import * as imageConversion from 'image-conversion'
export default {
  name: 'PageTopSetting',
  components: {
    IconSvg,
    ChooseTemplateDialog,
    AssignDialog,
    CusBtn,
    HistoryList
  },
  props: {
    code: {
      type: String,
      default: ''
    },
    rightFold: {
      type: Boolean,
      default: false
    }
  },
  data () {
    return {
      iconList: icons.getNameList(),
      alignList: [
        {
          label: '左侧对齐',
          value: 'left'
        },
        {
          label: '居中对齐',
          value: 'center'
        },
        {
          label: '右侧对齐',
          value: 'right'
        },
        {
          label: '顶部对齐',
          value: 'top'
        },
        {
          label: '中部对齐',
          value: 'middle'
        },
        {
          label: '底部对齐',
          value: 'bottom'
        },
        {
          label: '水平均分',
          value: 'levelAround'
        },
        {
          label: '垂直均分',
          value: 'verticalAround'
        }
      ],
      initialCoverPicture: '',
      appInfo: '',
      saveLoading: false,
      createdImgLoading: false,
      saveAndPreviewLoading: false,
      // 自动保存相关
      autoSaveIntervalId: null,
      autoSaveInterval: 3 * 60 * 1000, // 3分钟
      lastAutoSaveTime: ''
    }
  },
  computed: {
    ...mapState({
      pageInfo: (state) => state.bigScreen.pageInfo,
      timelineStore: (state) => state.bigScreen.timelineStore,
      currentTimeLine: (state) => state.bigScreen.currentTimeLine,
      activeCodes: state => state.bigScreen.activeCodes,
      zoom: (state) => state.bigScreen.zoom
    }),
    pageCode () {
      return this.$route.query.code || this.code
    },
    undoDisabled () {
      return Boolean(this.currentTimeLine <= 1)
    },
    redoDisabled () {
      return Boolean(
        !this.timelineStore?.length ||
        (
          this.currentTimeLine &&
          this.currentTimeLine === this.timelineStore?.length
        )
      )
    }
  },
  mounted () {
    this.initialCoverPicture = this.pageInfo.coverPicture || ''
    this.$refs.zoomInput.$el.addEventListener('mousewheel', this.handleMouseWheel)
    // 启动自动保存
    this.startAutoSave()
  },
  beforeDestroy () {
    this.$refs.zoomInput.$el.removeEventListener('mousewheel', this.handleMouseWheel)
    // 停止自动保存
    this.stopAutoSave()
  },
  methods: {
    ...mapActions({
      initLayout: 'bigScreen/initLayout'
    }),
    ...mapMutations({
      changeActiveCode: 'bigScreen/changeActiveCode',
      changeActiveItem: 'bigScreen/changeActiveItem',
      changePageInfo: 'bigScreen/changePageInfo',
      undoTimeLine: 'bigScreen/undoTimeLine',
      saveTimeLine: 'bigScreen/saveTimeLine'
    }),
    handleMouseWheel () {
      const delta = Math.sign(event.deltaY)
      // 限制最小缩放比例为10
      if (this.zoom <= 10 && delta > 0) return
      event.preventDefault()
      const zoom1 = this.zoom - delta
      this.$emit('changeZoom', zoom1)
    },
    changeZoom (val) {
      this.$emit('changeZoom', val)
    },
    setAlign (command) {
      const pageInfo = cloneDeep(this.pageInfo)
      // 获取所有选中的组件
      let activeChartList = pageInfo.chartList.filter((chart) => {
        return this.activeCodes.some(code => (code === chart.code))
      })
      // 找到选中组件内的xy最大最小值
      const maxXW = Math.max.apply(Math, activeChartList.map(item => { return item.x + item.w }))
      const maxYH = Math.max.apply(Math, activeChartList.map(item => { return item.y + item.h }))
      let maxX = Math.max.apply(Math, activeChartList.map(item => { return item.x }))
      let maxY = Math.max.apply(Math, activeChartList.map(item => { return item.y }))
      const minX = Math.min.apply(Math, activeChartList.map(item => { return item.x }))
      const minY = Math.min.apply(Math, activeChartList.map(item => { return item.y }))
      const centerW = maxXW - minX
      const centerH = maxYH - minY
      switch (command) {
        case 'left':
          activeChartList.forEach((chart) => {
            chart.x = minX
          })
          break
        case 'center':
          // eslint-disable-next-line no-case-declarations
          activeChartList.forEach((chart) => {
            chart.x = (centerW - chart.w) / 2 + minX
          })
          break
        case 'right':
          activeChartList.forEach((chart) => {
            chart.x = maxXW - chart.w
          })
          break
        case 'top':
          activeChartList.forEach((chart) => {
            chart.y = minY
          })
          break
        case 'middle':
          activeChartList.forEach((chart) => {
            chart.y = (centerH - chart.h) / 2 + minY
          })
          break
        case 'bottom':
          activeChartList.forEach((chart) => {
            chart.y = maxYH - chart.h
          })
          break
        case 'levelAround':
          // 先让数组根据x的属性进行排序
          activeChartList = activeChartList.sort(this.compare('x'))
          // eslint-disable-next-line no-case-declarations
          const minXW = activeChartList[0].x + activeChartList[0].w
          maxX = Math.max.apply(Math, activeChartList.map(item => { return item.x }))
          // 中间总的宽度
          // eslint-disable-next-line no-case-declarations
          let totalW = 0
          for (let i = 1; i < activeChartList.length - 1; i++) {
            totalW = totalW + activeChartList[i].w
          }
          // 中间剩余的空格
          // eslint-disable-next-line no-case-declarations
          const padding = (maxX - minXW - totalW) / (activeChartList.length - 1)
          // eslint-disable-next-line no-case-declarations
          let useW = 0
          for (let i = 1; i < activeChartList.length - 1; i++) {
            activeChartList[i].x = minXW + padding * i + useW
            useW = useW + activeChartList[i].w
          }
          break
        case 'verticalAround':
          // 先让数组根据y的属性进行排序
          activeChartList = activeChartList.sort(this.compare('y'))
          // eslint-disable-next-line no-case-declarations
          const minYH = activeChartList[0].y + activeChartList[0].h
          maxY = Math.max.apply(Math, activeChartList.map(item => { return item.y }))
          // eslint-disable-next-line no-case-declarations
          let totalH = 0
          for (let i = 1; i < activeChartList.length - 1; i++) {
            totalH = totalH + activeChartList[i].h
          }
          // eslint-disable-next-line no-case-declarations
          const paddingBottom = (maxY - minYH - totalH) / (activeChartList.length - 1)
          // eslint-disable-next-line no-case-declarations
          let useH = 0
          for (let i = 1; i < activeChartList.length - 1; i++) {
            activeChartList[i].y = minYH + paddingBottom * i + useH
            useH = useH + activeChartList[i].h
          }
          break
      }
      pageInfo.chartList = [...pageInfo.chartList, ...activeChartList]
      pageInfo.chartList = uniqBy(pageInfo.chartList, 'code')
      this.changePageInfo(pageInfo)
    },
    compare (property) {
      return function (obj1, obj2) {
        const value1 = obj1[property]
        const value2 = obj2[property]
        return value1 - value2 // 升序
      }
    },
    goBackManage () {
      this.$confirm('确定返回主页面吗？未保存的配置将会丢失。', '提示', {
        distinguishCancelAndClose: true,
        confirmButtonText: '保存后离开页面',
        cancelButtonText: '离开页面',
        cancelButtonClass: 'cancel-btn',
        type: 'warning',
        customClass: 'bs-el-message-box'
      }).then(async () => {
        const flag = await this.save()
        if (flag) {
          await this.backManagement()
        }
      }).catch((action) => {
        if (action === 'cancel') {
          this.backManagement()
        }
      })
    },
    backManagement () {
      const data = { componentsManagementType: 'component' }
      this.$router.app.$options.globalData = data // 将数据存储在全局变量中
      this.$router.push({ path: this.pageInfo.type === 'component' ? (window.BS_CONFIG?.routers?.componentUrl || '/big-screen-components') : (window.BS_CONFIG?.routers?.pageListUrl || '/big-screen-list') })
    },
    undo (isUndo) {
      this.undoTimeLine(isUndo)
    },
    // 清空
    empty () {
      this.changeActiveCode('')
      this.$emit('empty')
    },
    // 预览
    async execRun () {
      this.save('preview').then((res) => {
        if (res) {
          this.preview(res)
        }
      })
    },
    // 预览
    preview (previewCode) {
      const { href } = this.$router.resolve({
        path: window.BS_CONFIG?.routers?.previewUrl || '/big-screen/preview',
        query: {
          code: previewCode || this.pageCode
        }
      })
      window.open(href, '_blank')
    },
    // 保存时判断tabs组件里面的元素是否符合要求
    validateTabs (chartList) {
      let isValid = true
      if (chartList.length) {
        for (const chart of chartList) {
          if (chart.type === 'chartTab' && chart.customize.tabList.length !== 0) {
            for (const tab of chart.customize.tabList) {
              if ((!tab.name) || (!tab.chartCode)) {
                isValid = false
                return isValid
              }
            }
          }
        }
      }
      return isValid
    },
    // 保存
    async save (type, hasPageTemplateId = false, isAutoSave = false) {
      const pageInfo = cloneDeep(this.handleSaveData())
      console.log(pageInfo, type, isAutoSave, "pageInfo1")

      // 保存时判断tabs组件里面的元素是否符合要求
      const flag = this.validateTabs(pageInfo?.chartList)
      if (!flag) {
        // 自动保存时，如果校验失败，不提示用户
        if (!isAutoSave) {
          this.$message.warning('请完成tab项配置')
        }
        return false
      }
      // 保存页面
      try {
        if (!hasPageTemplateId) {
          delete pageInfo.pageTemplateId
        }
        if (type === 'preview') {
          pageInfo.isPreview = true
          const res = await saveScreen(pageInfo)
          return res
        } else {
          pageInfo.isPreview = false
          if (!isAutoSave) {
            this.saveLoading = true
          }
          pageInfo.coverPicture = this.initialCoverPicture // 默认使用初始封面
          let dataUrl = ''
          let res = null

          // 仅在手动保存时生成新的封面图
          if (!isAutoSave) {
            const node = document.querySelector('.render-theme-wrap')
            try {
              dataUrl = await toJpeg(node, { quality: 0.2 })
            } catch (error) {
              this.$confirm('保存封面失败，我们将使用上次保存的封面，不会影响大屏数据的保存。可能是因为图片、视频资源跨域了导致使用toDataURL API生成图片失败，我们可以将资源上传到资源库。然后在组件中使用资源库中的图片资源，以确保没有跨域问题。', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning',
                customClass: 'bs-el-message-box'
              }).then(async () => {
                // 即使封面失败，也继续保存数据
              }).catch(async () => {
                // 点击遮罩层关闭也继续保存
              })
              // 无论用户是否确认提示，都继续尝试保存
            }

            if (dataUrl) {
              if (showSize(dataUrl) > 200) {
                this.$message.info('由于封面图片过大，进行压缩中')
                try {
                  const compressCoverPicture = await compressImage(dataUrl, { width: 1280, height: 720, size: 400, quality: 1 })
                  pageInfo.coverPicture = compressCoverPicture
                  this.initialCoverPicture = compressCoverPicture // 更新封面缓存
                } catch (compressError) {
                  console.error('封面压缩失败:', compressError)
                  this.$message.warning('封面压缩失败，将使用上次保存的封面')
                  // 压缩失败，继续使用 initialCoverPicture
                }
              } else {
                pageInfo.coverPicture = dataUrl
                this.initialCoverPicture = dataUrl // 更新封面缓存
              }
            }
          } // end if (!isAutoSave)

          // 执行保存
          res = await saveScreen(pageInfo)
          if (!isAutoSave) {
            this.$message.success('保存成功')
          }
          return res
        }
      } catch (error) {
        console.error(isAutoSave ? '自动保存失败:' : '保存失败:', error)
        if (!isAutoSave) {
          this.saveLoading = false
          this.$message.error('保存失败')
        }
        // 对于自动保存，我们不向上抛出错误，避免中断其他操作
        if (!isAutoSave) {
           throw error
        }
        return false // 表示保存失败
      } finally {
        if (!isAutoSave) {
          this.saveLoading = false
        }
      }
    },
    // 自动保存方法
    async autoSave () {
      console.log('执行自动保存...')
      try {
        const success = await this.save(null, false, true) // 调用静默保存
        if (success) {
          const now = new Date()
          this.lastAutoSaveTime = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`
          console.log(`自动保存成功于 ${this.lastAutoSaveTime}`)
        }
      } catch (error) {
        // 错误已在 save 方法内部处理（仅记录日志）
      }
    },
    // 启动自动保存定时器
    startAutoSave () {
      // 清除可能已存在的定时器
      this.stopAutoSave()
      this.autoSaveIntervalId = setInterval(this.autoSave, this.autoSaveInterval)
      console.log(`自动保存已启动，间隔 ${this.autoSaveInterval / 1000} 秒`)
    },
    // 停止自动保存定时器
    stopAutoSave () {
      if (this.autoSaveIntervalId) {
        clearInterval(this.autoSaveIntervalId)
        this.autoSaveIntervalId = null
        console.log('自动保存已停止')
      }
    },
    goBack (path) {
      this.$router.push({
        path: `/${path}`
      })
    },
    // 得到模板列表
    getTemplateList (type) {
      this.$nextTick(() => {
        this.$refs.ChooseTemplateDialog.init(undefined, type)
      })
    },
    // 选择模版后覆盖配置
    selectTemplate (template) {
      this.pageInfo.pageTemplateId = template.id
      this.save('saveLoading', true).then(() => {
        this.initLayout(this.pageCode)
      })
    },
    replaceItByTemplate (config) {
      this.changePageInfo(config)
    },
    // 处理保存数据
    handleSaveData () {
      const pageInfo = cloneDeep(this.pageInfo)
      const chartList = cloneDeep(this.pageInfo.chartList)

      pageInfo.pageConfig.cacheDataSets =
        pageInfo.pageConfig.cacheDataSets?.map((cache) => ({
          name: cache.name,
          dataSetId: cache.dataSetId
        })) || []

      const newChartList = chartList?.map((chart) => {
        // 如果是自定义组件，需要将option转换为json字符串，因为其中可能有函数
        if (['customComponent', 'remoteComponent', 'echartsComponent'].includes(chart.type)) {
          chart.option = stringifyObjectFunctions(chart.option)
        }
        // 确保轮询配置被正确保存
        if (chart.dataSource) {
          const dataSource = { ...chart.dataSource }
          // 保留轮询相关配置
          dataSource.polling = dataSource.polling || false
          dataSource.pollingInterval = dataSource.pollingInterval || 5000
          // 如果开启轮询，确保数据集类型为http
          if (dataSource.polling) {
            dataSource.datasetType = 'http'
          }
          chart.dataSource = dataSource
        }
        return chart
      })
      console.log(cloneDeep({
        ...this.pageInfo,
        chartList: newChartList
      }),"pageInfo3")
      return cloneDeep({
        ...this.pageInfo,
        chartList: newChartList
      })
    },
    updateRightVisiable () {
      this.$emit('updateRightVisiable', !this.rightFold)
    },
    showPageInfo () {
      this.$emit('showPageInfo')
    },
    designAssign () {
      this.$refs.AssignDialog.init()
    },
    showHostory () {
      this.$refs.HistoryList.init()
    },
    createdImg () {
      this.saveAndPreviewLoading = true
      // 暂停跑马灯动画
      EventBus.$emit('stopMarquee')
      const node = document.querySelector('.render-theme-wrap')
      toPng(node)
        .then((dataUrl) => {
          const link = document.createElement('a')
          link.download = `${this.pageInfo.name}.png`
          link.href = dataUrl
          link.click()
          link.addEventListener('click', () => {
            link.remove()
          })
          this.saveAndPreviewLoading = false
          // 恢复跑马灯动画
          EventBus.$emit('startMarquee')
        }).catch((error) => {
          this.saveAndPreviewLoading = false
          if (error.type === 'error') {
            // 判断的error.currentTarget是img标签，如果是的，就弹出消息说是图片跨域
            if (error.currentTarget.tagName.toLowerCase() === 'img') {
              // 确认框
              this.$confirm('图片资源跨域导致使用toDataURL API生成图片失败，请将图片上传到资源库，然后在组件中使用资源库中的图片资源，确保没有跨域问题。', '提示', {
                confirmButtonText: '确定',
                showCancelButton: false,
                type: 'warning',
                customClass: 'bs-el-message-box'
              }).then(() => { }).catch(() => { })
            }
          } else {
            this.$message.warning('出现未知错误，请重试')
          }
        })
    },
    // 导出页面配置为 JSON 文件
    exportJson () {
      try {
        const pageConfig = cloneDeep(this.pageInfo)
        // 可以在这里添加对 pageConfig 的额外处理，比如移除不需要导出的字段
        const jsonStr = JSON.stringify(pageConfig, null, 2) // 格式化输出
        const blob = new Blob([jsonStr], { type: 'application/json' })
        const url = URL.createObjectURL(blob)
        const link = document.createElement('a')
        link.href = url
        link.download = `${this.pageInfo.name || 'page_config'}.json`
        document.body.appendChild(link)
        link.click()
        document.body.removeChild(link)
        URL.revokeObjectURL(url)
      } catch (error) {
        console.error('导出 JSON 失败:', error)
        this.$message.error('导出 JSON 失败')
      }
    },
    // 导入 JSON 文件更新页面配置
    importJson () {
      const input = document.createElement('input')
      input.type = 'file'
      input.accept = '.json'
      input.onchange = (event) => {
        const file = event.target.files[0]
        if (!file) {
          return
        }
        const reader = new FileReader()
        reader.onload = (e) => {
          try {
            const importedConfig = JSON.parse(e.target.result)
            // TODO: 在这里可以添加对导入数据的校验逻辑
            if (typeof importedConfig === 'object' && importedConfig !== null && importedConfig.pageConfig && importedConfig.chartList) {
              // 使用导入的配置更新页面信息
              // 保留原有的 code 和 id，防止覆盖导致的问题
              const currentCode = this.pageInfo.code
              const currentId = this.pageInfo.id
              const currentName = this.pageInfo.name // 暂存当前名称，导入后恢复
              const currentType = this.pageInfo.type // 暂存当前类型
              this.changePageInfo({
                ...importedConfig,
                code: currentCode,
                id: currentId,
                name: currentName, // 恢复名称
                type: currentType // 恢复类型
              })
              this.$message.success('JSON 文件导入成功')
              // 可以在这里触发一次保存历史记录
              this.saveTimeLine('导入JSON配置')
              // 可能需要重新初始化或刷新某些状态
              this.$nextTick(() => {
                this.$emit('changeZoom', 'auto') // 触发自适应缩放
              })
            } else {
              this.$message.error('导入的 JSON 文件格式不正确')
            }
          } catch (error) {
            console.error('导入 JSON 失败:', error)
            this.$message.error('导入 JSON 文件失败，请检查文件格式')
          }
        }
        reader.onerror = (error) => {
          console.error('读取文件失败:', error)
          this.$message.error('读取文件失败')
        }
        reader.readAsText(file)
      }
      input.click()
    }
  }
}
</script>
<style lang="scss" scoped>
@import '../BigScreenDesign/fonts/iconfont.css';

.auto-save-indicator {
  font-size: 12px;
  color: #a1a5aa; // 浅灰色文字
  margin-right: 10px;
  user-select: none; // 防止文本被选中
}

.default-layout-box {
  display: flex;
  flex-wrap: wrap;

  .default-layout-item {
    cursor: pointer;
    width: 42%;
    margin: 9px;
    display: flex;
    flex-direction: column;
    align-items: center;

    .component-name {
      font-size: 12px;
    }

    .sampleImg {
      margin: 0 auto;
      width: 102px;
      height: 73px;
      display: block;
    }

    .img_dispaly {
      margin: 0 auto;
      text-align: center;
      width: 100px;
      height: 70px;
      line-height: 70px;
      background-color: #d7d7d7;
      color: #999;
    }

    .demonstration {
      text-align: center;
    }
  }

  .default-layout-item:hover {
    cursor: pointer;
  }

  ::v-deep .el-radio__label {
    display: none;
  }
}

.page-top-setting-wrap {
  height: 40px;
  background-color: var(--bs-background-2);
  display: flex;
  align-items: center;
  justify-content: space-between;
  position: relative;
  color: #ffffff;
  padding: 0 5px;

  .app-name {
    cursor: pointer;
  }

  .head-btn-group {
    display: flex;
    margin-left: 50px;
    align-items: center;

    i {
      font-size: 14px;
    }

    .icon-reverse {
      transform: rotate(180deg);
    }
  }

  .item-wrap {
    display: flex;
    align-items: center;

    .menu-img {
      width: 18px;
      height: 18px;
      margin-left: 9px;
      margin-right: 15px;
      cursor: pointer;
    }

    .logo-text {
      user-select: none;
      margin-left: 9px;
      font-size: 14px;
      color: #ffffff;
    }

    .name-span {
      max-width: 300px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
  }

  .theme-switch {
    margin-right: 10px;

    ::v-deep .el-switch__label {
      color: #bcc9d4 !important;
    }

    ::v-deep .el-switch__label.is-active {
      color: var(--bs-el-color-primary) !important;
    }
  }

  .align-list-dropdown {
    width: 100px !important;
    color: #ffffff !important;
  }

}

// 自定义dropdown的样式
.align-dropdown-menu {
  background-color: var(--bs-background-2) !important;
  border: 1px solid var(--bs-border-1);

  ::v-deep  .el-dropdown-menu__item {
    background-color: var(--bs-background-2) !important;

    &:hover {
      color: var(--bs-el-color-primary) !important;
      background-color: var(--bs-el-background-3) !important;
    }
  }

}

::v-deep .el-input__inner,
::v-deep .el-color-picker__color-inner,
::v-deep .el-input-number--mini,
::v-deep .el-textarea__inner,
::v-deep .el-input-group__append {
  background: var(--bs-el-background-1);
  color: var(--bs-el-text);
  border: 0 !important;
  width: 100px;
}

// .bs-el-input-number{

// }
</style>
