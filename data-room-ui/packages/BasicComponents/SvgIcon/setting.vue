<template>
  <div class="svg-icon-setting bs-setting-wrap">
    <div v-if="config && config.customize">
      <el-form
        ref="form"
        :model="config.customize"
        label-width="100px"
        label-position="left"
        class="setting-body bs-el-form"
      >
        <SettingTitle>图标属性</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="图标颜色">
            <ColorPicker
              v-model="config.customize.color"
              :predefine="predefineThemeColors"
            />
          </el-form-item>
          
          <el-form-item label="图标大小">
            <el-input
              v-model="config.customize.size"
              placeholder="例如 32px 或 100%"
            >
              <template slot="append">px</template>
            </el-input>
          </el-form-item>
          
          <el-form-item label="图标路径">
            <el-input
              v-model="config.customize.iconClass"
              placeholder="例如 智慧城市/智慧交通/办公用电"
            >
              <el-button slot="append" icon="el-icon-folder-opened" @click="showIconSelector = true"></el-button>
            </el-input>
            <div class="icon-path-tips">
              <p>路径格式: 目录1/目录2/图标名称</p>
              <p>示例: 智慧城市/智慧交通/办公用电</p>
            </div>
          </el-form-item>
        </div>
      </el-form>

      <!-- 图标选择器对话框 -->
      <el-dialog
        title="选择图标"
        :visible.sync="showIconSelector"
        width="800px"
        class="icon-selector-dialog"
      >
        <div class="icon-selector">
          <!-- 目录导航 -->
          <div class="directory-nav">
            <el-breadcrumb separator="/">
              <el-breadcrumb-item @click.native="navigateToRoot">图标库</el-breadcrumb-item>
              <el-breadcrumb-item 
                v-for="(dir, index) in currentPath" 
                :key="index"
                @click.native="navigateTo(index)"
              >
                {{ dir }}
              </el-breadcrumb-item>
            </el-breadcrumb>
          </div>
          
          <!-- 搜索框 -->
          <div class="search-box">
            <el-input
              v-model="searchQuery"
              placeholder="搜索图标"
              prefix-icon="el-icon-search"
              clearable
            ></el-input>
          </div>
          
          <!-- 目录列表 -->
          <div v-if="currentDirectories.length > 0" class="directory-list">
            <div 
              v-for="dir in currentDirectories" 
              :key="dir"
              class="directory-item"
              @click="enterDirectory(dir)"
            >
              <i class="el-icon-folder"></i>
              <span>{{ dir }}</span>
            </div>
          </div>
          
          <!-- 图标预览 -->
          <div class="icon-preview">
            <div 
              v-for="icon in filteredIcons" 
              :key="icon"
              class="icon-item"
              :class="{ 'is-selected': getFullPath() + '/' + icon === config.customize.iconClass }"
              @click="selectIcon(icon)"
            >
              <div class="icon-image">
                <!-- 这里应该显示图标预览，但由于我们没有实际的图标内容，使用占位符 -->
                <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <rect width="24" height="24" fill="none" stroke="#ccc" stroke-width="1"></rect>
                  <text x="12" y="12" font-size="6" text-anchor="middle" alignment-baseline="middle" fill="#666">{{ icon }}</text>
                </svg>
              </div>
              <div class="icon-name">{{ icon }}</div>
            </div>
            
            <div v-if="filteredIcons.length === 0" class="no-icons">
              {{ searchQuery ? '没有找到匹配的图标' : '当前目录没有图标' }}
            </div>
          </div>
        </div>
      </el-dialog>
    </div>
    <div v-else>
      <p>配置加载中或 Vuex store 中的 activeItemConfig.customize 不存在。</p>
      <p>Debug - Vuex activeItemConfig:</p>
      <pre>{{ JSON.stringify(vuexConfigForDebug, null, 2) }}</pre>
    </div>
  </div>
</template>

<script>
import SettingTitle from 'data-room-ui/SettingTitle/index.vue'
import ColorPicker from 'data-room-ui/ColorPicker/index.vue'
import { predefineColors } from "data-room-ui/js/utils/colorList"

// 模拟图标目录结构
const mockIconDirectories = {
  '': ['常用', '工程', 'IT&互联网', '智慧城市', '电力', '能源', 'actions', 'arrows'],
  '常用': ['用户', '设置', '通知', '搜索', '消息', '菜单'],
  '智慧城市': ['智慧交通', '智慧园区', '智慧安防'],
  '智慧城市/智慧交通': ['办公用电', '交通信号灯', '公交车站', '停车场'],
  '工程': ['机械工程', '水利工程', '消防工程', '热能与动力工程', '环境工程'],
  'actions': ['check', 'close', 'edit', 'delete', 'add', 'save'],
  'arrows': ['up', 'down', 'left', 'right']
};

export default {
  name: 'SvgIconSetting',
  components: {
    SettingTitle,
    ColorPicker,
  },
  data() {
    return {
      predefineThemeColors: predefineColors,
      showIconSelector: false,
      currentPath: [],
      searchQuery: '',
      
      // 模拟图标列表
      mockIcons: {
        '常用': ['用户', '设置', '通知', '搜索', '消息', '菜单'],
        '智慧城市/智慧交通': ['办公用电', '交通信号灯', '公交车站', '停车场'],
        'actions': ['check', 'close', 'edit', 'delete', 'add', 'save'],
        'arrows': ['up', 'down', 'left', 'right']
      }
    }
  },
  computed: {
    config: {
      get() {
        return this.$store.state.bigScreen.activeItemConfig
      },
      set(val) {
        this.$store.state.bigScreen.activeItemConfig = val
      }
    },
    vuexConfigForDebug() {
      return this.$store.state.bigScreen.activeItemConfig
    },
    
    // 获取当前目录下的子目录
    currentDirectories() {
      const path = this.getFullPath();
      return mockIconDirectories[path] || [];
    },
    
    // 获取当前目录下的图标
    currentIcons() {
      const path = this.getFullPath();
      return this.mockIcons[path] || [];
    },
    
    // 过滤后的图标列表
    filteredIcons() {
      if (!this.searchQuery) {
        return this.currentIcons;
      }
      
      const query = this.searchQuery.toLowerCase();
      return this.currentIcons.filter(icon => 
        icon.toLowerCase().includes(query)
      );
    }
  },
  methods: {
    // 获取当前完整路径
    getFullPath() {
      return this.currentPath.join('/');
    },
    
    // 导航到根目录
    navigateToRoot() {
      this.currentPath = [];
    },
    
    // 导航到指定层级
    navigateTo(index) {
      this.currentPath = this.currentPath.slice(0, index + 1);
    },
    
    // 进入子目录
    enterDirectory(dir) {
      this.currentPath.push(dir);
    },
    
    // 选择图标
    selectIcon(icon) {
      const fullPath = this.getFullPath() + '/' + icon;
      this.config.customize.iconClass = fullPath;
      this.showIconSelector = false;
    }
  }
}
</script>

<style lang="less" scoped>
.bs-setting-wrap {
  padding-top: 16px;
}
.lc-field-body {
  padding: 12px 16px;
}

.icon-path-tips {
  font-size: 12px;
  color: #909399;
  margin-top: 5px;
  
  p {
    margin: 2px 0;
  }
}

.icon-selector {
  .directory-nav {
    margin-bottom: 15px;
    padding: 8px 0;
    border-bottom: 1px solid #ebeef5;
  }
  
  .search-box {
    margin-bottom: 15px;
  }
  
  .directory-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    
    .directory-item {
      display: flex;
      align-items: center;
      padding: 8px 15px;
      margin: 0 10px 10px 0;
      background-color: #f5f7fa;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background-color: #ecf5ff;
        color: #409eff;
      }
      
      i {
        margin-right: 5px;
        font-size: 16px;
      }
    }
  }
  
  .icon-preview {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 15px;
    
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        border-color: #c0c4cc;
        background-color: #f5f7fa;
      }
      
      &.is-selected {
        border-color: #409eff;
        background-color: #ecf5ff;
      }
      
      .icon-image {
        width: 32px;
        height: 32px;
        margin-bottom: 8px;
        
        svg {
          width: 100%;
          height: 100%;
        }
      }
      
      .icon-name {
        font-size: 12px;
        text-align: center;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
    
    .no-icons {
      grid-column: 1 / -1;
      text-align: center;
      padding: 20px;
      color: #909399;
    }
  }
}
</style>
