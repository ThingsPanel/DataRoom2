<template>
  <el-dialog
    title="本地图库"
    :visible.sync="dialogVisible"
    width="80%"
    :modal="true"
    :modal-append-to-body="false"
    :appen-to-body="true"
    class="bs-dialog-wrap bs-el-dialog"
    @closed="close"
  >
    <div class="content">
      <div class="big-screen-list-wrap">
        <!-- 左侧分组列表 -->
        <div class="left-group-wrap">
          <div class="group-search">
            <el-input
              v-model="groupSearchKey"
              class="bs-el-input"
              placeholder="搜索分组"
              prefix-icon="el-icon-search"
              clearable
            />
          </div>
          <div class="group-list bs-scrollbar">
            <div
              v-for="item in filteredGroups"
              :key="item.id"
              :class="['group-item', code === item.code ? 'active' : '']"
              @click="changeGroup(item)"
            >
              {{ item.name }}
            </div>
          </div>
        </div>

        <!-- 右侧内容区 -->
        <div class="right-content-wrap">
          <div class="top-search-wrap">
            <el-input
              v-model="searchKey"
              class="bs-el-input"
              placeholder="请输入图片名称"
              prefix-icon="el-icon-search"
              clearable
              @clear="reSearch"
              @keyup.enter.native="reSearch"
            />
          </div>
          <div
            v-if="currentList.length !== 0"
            v-loading="loading"
            class="list-wrap bs-scrollbar"
            element-loading-text="加载中"
          >
            <div
              v-for="item in pageList"
              :key="item.id"
              class="big-screen-card-wrap"
              @click="chooseImg(item)"
            >
              <div
                :class="focus.id === item.id ? 'focus' : ''"
                class="big-screen-card-inner"
              >
                <div class="big-screen-card-img">
                  <el-image
                    :src="item.url"
                    fit="contain"
                    style="width: 100%; height: 100%"
                    lazy
                  >
                    <div slot="placeholder" class="image-slot">加载中···</div>
                  </el-image>
                </div>
                <div class="big-screen-bottom">
                  <div class="left-bigscreen-title" :title="item.name">
                    {{ item.name }}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div v-else class="empty">暂无数据</div>
          
          <!-- 分页器 -->
          <div class="pagination-wrap">
            <el-pagination
              :current-page.sync="currentPage"
              :page-size="pageSize"
              :total="currentList.length"
              layout="prev, pager, next"
              background
              @current-change="handlePageChange"
            />
          </div>
        </div>
      </div>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button class="bs-el-button-default" @click="dialogVisible = false">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
import { getFileUrl } from 'data-room-ui/js/utils/file'
import { imageOptions, imageList } from './imageConfig.js'

export default {
  name: 'LocalSourceDialog',
  props: {
    imgUrl: {
      type: String,
      default: ''
    }
  },
  model: {
    prop: 'imgUrl',
    event: 'change'
  },
  data () {
    return {
      dialogVisible: false,
      loading: false,
      focus: -1,
      code: '',
      searchKey: '',
      groupSearchKey: '',
      options: imageOptions,
      list: [],  // 初始为空
      currentPage: 1,
      pageSize: 8
    }
  },
  computed: {
    // 过滤后的分组列表
    filteredGroups () {
      if (!this.groupSearchKey) return this.options
      const key = this.groupSearchKey.toLowerCase()
      return this.options.filter(item => 
        item.name.toLowerCase().includes(key)
      )
    },
    // 当前分组和搜索条件过滤后的列表
    currentList () {
      let result = this.list
      
      if (this.searchKey) {
        const key = this.searchKey.toLowerCase()
        result = result.filter(item => 
          item.name.toLowerCase().includes(key)
        )
      }
      
      return result
    },
    // 当前页的数据
    pageList () {
      const start = (this.currentPage - 1) * this.pageSize
      const end = start + this.pageSize
      return this.currentList.slice(start, end)
    }
  },
  methods: {
    init () {
      this.dialogVisible = true
      this.searchKey = ''
      this.groupSearchKey = ''
      this.currentPage = 1
      this.focus = -1
      // 默认选中第一个分组
      if (this.options.length > 0) {
        this.changeGroup(this.options[0])
      }
    },
    // 切换分组
    changeGroup (group) {
      this.code = group.code
      this.currentPage = 1
      this.loading = true
      // 获取当前分组的图片列表
      this.list = imageList.filter(item => item.type === group.code)
      this.loading = false
    },
    handlePageChange (page) {
      this.currentPage = page
    },
    getCoverPicture (url) {
      return getFileUrl(url)
    },
    chooseImg (img) {
      this.focus = img
    },
    close () {
      // 关闭时不需要特殊处理
    },
    confirm () {
      this.dialogVisible = false
      if (this.focus !== -1) {
        this.$emit('change', this.focus)
        this.$emit('getImg', this.focus)
      }
    },
    reSearch () {
      // 静态数据不需要重新请求，只需要通过计算属性过滤
    }
  }
}
</script>

<style lang="scss" scoped>
@import '../../assets/style/bsTheme.scss';

::v-deep .el-dialog__body{
  position: relative;
  min-height: 500px;
  padding: 0 16px 16px 16px !important;
}

.big-screen-list-wrap {
  display: flex;
  gap: 16px;
  
  .left-group-wrap {
    width: 200px;
    border-right: 1px solid var(--bs-border-color);
    
    .group-search {
      padding: 16px 0;
    }
    
    .group-list {
      height: calc(100vh - 450px);
      overflow-y: auto;
      
      .group-item {
        padding: 12px 16px;
        cursor: pointer;
        transition: all 0.3s;
        
        &:hover {
          background-color: var(--bs-background-1);
        }
        
        &.active {
          color: var(--bs-el-color-primary);
          background-color: var(--bs-background-1);
        }
      }
    }
  }
  
  .right-content-wrap {
    flex: 1;
    display: flex;
    flex-direction: column;
    
    .list-wrap {
      flex: 1;
      overflow-y: auto;
      display: grid;
      grid-template-columns: repeat(4, 240px);
      justify-content: center;
      gap: 24px;
      padding: 24px;
      height: calc(100vh - 520px);
      min-height: 460px;

      .big-screen-card-wrap {
        width: 240px;
        height: 200px;
        
        .big-screen-card-inner {
          width: 100%;
          height: 100%;
          border: 1px solid var(--bs-border-color);
          border-radius: 4px;
          overflow: hidden;
          transition: all 0.3s;
          
          &:hover {
            border-color: var(--bs-el-color-primary);
            box-shadow: 0 0 8px rgba(var(--bs-el-color-primary-rgb), 0.2);
          }
          
          &.focus {
            border: 2px solid var(--bs-el-color-primary);
            box-shadow: 0 0 12px rgba(var(--bs-el-color-primary-rgb), 0.3);
          }
          
          .big-screen-card-img {
            height: 150px;
            padding: 8px;
            background-color: var(--bs-background-1);
            
            ::v-deep .el-image {
              border-radius: 2px;
            }
          }
          
          .big-screen-bottom {
            height: 50px;
            padding: 0 12px;
            display: flex;
            align-items: center;
            border-top: 1px solid var(--bs-border-color);
            
            .left-bigscreen-title {
              font-size: 14px;
              color: var(--bs-el-text);
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
        }
      }
    }
    
    .pagination-wrap {
      padding: 16px;
      display: flex;
      justify-content: center;
      background-color: var(--bs-background-2);
      border-top: 1px solid var(--bs-border-color);
      position: sticky;
      bottom: 0;
    }
  }
}

.empty {
  width: 100%;
  height: 70%;
  min-height: 300px;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style> 