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
        </div>
      </el-form>

      <!-- 图标导入功能 -->
      <div class="icon-import-section">
        <el-collapse>
          <el-collapse-item title="导入SVG图标" name="1">
            <div class="import-form">
              <div class="form-group">
                <el-upload
                  action=""
                  :auto-upload="false"
                  :on-change="handleFileChange"
                  :show-file-list="false"
                  accept=".txt"
                >
                  <el-button size="small" type="primary">选择TXT文件</el-button>
                  <span class="upload-tip" v-if="extractedSvgs.length > 0">
                    已提取 {{ extractedSvgs.length }} 个图标
                  </span>
                </el-upload>
              </div>
              <div class="form-group" v-if="extractedSvgs.length > 0">
                <el-button size="small" type="success" @click="importExtractedSvgs">导入提取的图标</el-button>
              </div>
            </div>
            
            <div class="extracted-preview" v-if="extractedSvgs.length > 0">
              <p>提取预览 (显示前6个):</p>
              <div class="preview-list">
                <div 
                  v-for="(svg, index) in extractedSvgs.slice(0, 6)" 
                  :key="index"
                  class="preview-item" 
                >
                  <div class="svg-container" v-html="svg.svg"></div>
                  <div class="svg-title">{{ svg.title }}</div>
                </div>
                <div v-if="extractedSvgs.length > 6" class="preview-more">
                  ...还有 {{ extractedSvgs.length - 6 }} 个
                </div>
              </div>
            </div>
          </el-collapse-item>
        </el-collapse>
      </div>

      <div class="icon-selector-wrapper">
        <h4>选择图标</h4>
        
        <!-- 分类导航路径 -->
        <div class="category-path">
          <el-breadcrumb separator="/">
            <el-breadcrumb-item @click.native="navigateToLevel(0)">全部</el-breadcrumb-item>
            <el-breadcrumb-item 
              v-for="(category, index) in currentPath" 
              :key="index"
              @click.native="navigateToLevel(index + 1)"
            >
              {{ category.name }}
            </el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        
        <!-- 当前层级下的子分类 -->
        <div v-if="currentLevelCategories.length > 0" class="subcategories">
          <div 
            v-for="category in currentLevelCategories" 
            :key="category.value"
            class="category-item"
            @click="selectCategory(category)"
          >
            <div class="category-icon">
              <i class="el-icon-folder"></i>
            </div>
            <div class="category-name">{{ category.name }}</div>
          </div>
        </div>
        
        <!-- 搜索框 -->
        <div class="icon-search">
          <el-input
            v-model="searchQuery"
            placeholder="搜索图标"
            prefix-icon="el-icon-search"
            clearable
            @clear="clearSearch"
          ></el-input>
        </div>
        
        <!-- 当前分类下的图标列表 -->
        <div class="icon-list">
          <div
            v-for="icon in filteredIcons"
            :key="icon.id"
            class="icon-item"
            :class="{ 'is-active': selectedIcon === icon.id }"
            @click="selectIcon(icon.id)"
          >
            <div class="preview-icon" v-html="getIconPreview(icon.id)" :style="previewIconStyle"></div>
            <span class="icon-name">{{ icon.name }}</span>
          </div>
          <div v-if="filteredIcons.length === 0" class="no-icons-message">
            {{ searchQuery ? '没有匹配的图标' : '当前分类下没有图标' }}
          </div>
        </div>
      </div>
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
import { iconList, categoryHierarchy, categoriesMap, generateCategoryTree } from './iconList'
import { getSvgIcon, getAvailableIcons, batchImportSvgs } from './svgLoader'
import { predefineColors } from "data-room-ui/js/utils/colorList"

export default {
  name: 'SvgIconSetting',
  components: {
    SettingTitle,
    ColorPicker,
  },
  data() {
    const storeConfig = this.$store.state.bigScreen.activeItemConfig
    let initialIconClass = 'actions-check'
    if (storeConfig && storeConfig.customize && typeof storeConfig.customize.iconClass === 'string') {
      initialIconClass = storeConfig.customize.iconClass
    }
    return {
      // 图标相关数据
      iconListData: iconList,
      categoryTree: categoryHierarchy,
      categoriesMap: categoriesMap,
      selectedIcon: initialIconClass,
      predefineThemeColors: predefineColors,
      currentPath: [], // 当前分类路径 [category1, category2, ...]
      currentLevel: categoryHierarchy, // 当前层级的分类列表
      
      // 搜索相关
      searchQuery: '',
      
      // 图标导入相关
      extractedSvgs: [],
      importedIcons: []
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
    // 当前层级的子分类
    currentLevelCategories() {
      if (!this.currentLevel) return [];
      return this.currentLevel.filter(item => item.children && item.children.length > 0);
    },
    // 当前层级下的图标
    currentIcons() {
      if (!this.currentLevel) return [];
      
      // 如果当前层级有图标，直接返回
      const iconsInCurrentLevel = this.currentLevel
        .filter(item => item.icons && item.icons.length > 0)
        .reduce((acc, curr) => [...acc, ...curr.icons], []);
      
      if (iconsInCurrentLevel.length > 0) {
        return iconsInCurrentLevel;
      }
      
      // 如果当前层级没有图标，但有子分类，获取所有子分类下的图标
      let allIcons = [];
      this.currentLevel.forEach(category => {
        if (category.icons && category.icons.length > 0) {
          allIcons = [...allIcons, ...category.icons];
        }
      });
      
      return allIcons;
    },
    // 搜索筛选后的图标
    filteredIcons() {
      if (this.searchQuery) {
        // 如果有搜索，则在所有图标中搜索
        return this.iconListData.filter(icon => {
          const name = icon.name.toLowerCase();
          const id = icon.id.toLowerCase();
          const query = this.searchQuery.toLowerCase();
          return name.includes(query) || id.includes(query);
        });
      } else {
        // 否则显示当前分类下的图标
        return this.currentIcons;
      }
    },
    previewIconStyle() {
      return {
        fill: this.config.customize.color || '#333333'
      };
    }
  },
  mounted() {
    // 初始化：查找当前选中图标所在的分类路径
    this.initPath();
  },
  watch: {
    'config.customize.iconClass': {
      handler(newVal) {
        if (newVal !== undefined) {
          this.selectedIcon = newVal;
          this.initPath();
        }
      },
      immediate: true
    },
  },
  methods: {
    // 初始化当前路径
    initPath() {
      // 找到当前选中的图标
      const selectedIcon = this.iconListData.find(icon => icon.id === this.selectedIcon);
      
      if (selectedIcon && selectedIcon.path) {
        // 重置路径
        this.currentPath = [];
        this.currentLevel = this.categoryTree;
        
        // 逐级构建路径
        let tempPath = [];
        for (let i = 0; i < selectedIcon.path.length; i++) {
          const categoryName = selectedIcon.path[i];
          const fullPath = selectedIcon.path.slice(0, i + 1).join('-');
          const category = this.categoriesMap[fullPath];
          
          if (category) {
            tempPath.push(category);
            if (i < selectedIcon.path.length - 1) {
              this.currentLevel = category.children;
            }
          }
        }
        
        this.currentPath = tempPath;
      }
    },
    // 选择分类
    selectCategory(category) {
      // 清空搜索
      this.searchQuery = '';
      
      // 将所选分类添加到当前路径
      this.currentPath.push(category);
      // 更新当前分类层级
      this.currentLevel = category.children;
    },
    // 导航到指定层级
    navigateToLevel(level) {
      // 清空搜索
      this.searchQuery = '';
      
      if (level === 0) {
        // 返回根级别
        this.currentPath = [];
        this.currentLevel = this.categoryTree;
        return;
      }
      
      // 截取到指定层级
      const newPath = this.currentPath.slice(0, level);
      this.currentPath = newPath;
      
      // 更新当前层级
      if (newPath.length === 0) {
        this.currentLevel = this.categoryTree;
      } else {
        const lastCategory = newPath[newPath.length - 1];
        this.currentLevel = lastCategory.children;
      }
    },
    // 获取图标预览
    getIconPreview(iconId) {
      return getSvgIcon(iconId);
    },
    // 选择图标
    selectIcon(iconId) {
      if (this.config && this.config.customize) {
        this.config.customize.iconClass = iconId;
        this.selectedIcon = iconId;
      }
    },
    // 清除搜索
    clearSearch() {
      this.searchQuery = '';
    },
    
    // 文件选择处理
    handleFileChange(file) {
      if (!file || !file.raw) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        this.extractSvgsFromText(content);
      };
      reader.readAsText(file.raw);
    },
    
    // 从文本提取SVG
    extractSvgsFromText(text) {
      // 清空之前提取的结果
      this.extractedSvgs = [];
      
      // 正则表达式匹配SVG内容及其外层div，包括title属性
      const regex = /<div[^>]*class="drag_item svg-item-div"[^>]*>[\s\S]*?<div[^>]*title="([^"]*)"[^>]*>[\s\S]*?(<svg[\s\S]*?<\/svg>)[\s\S]*?<\/div>[\s\S]*?<\/div>/g;
      
      let match;
      
      // 逐个匹配并提取
      while ((match = regex.exec(text)) !== null) {
        // 提取title和SVG内容
        const title = match[1] || `icon_${this.extractedSvgs.length + 1}`;
        const svg = match[2];
        
        this.extractedSvgs.push({
          title,
          svg,
          category: this.determineCategoryFromTitle(title)
        });
      }
      
      // 如果没有匹配，也尝试直接提取SVG
      if (this.extractedSvgs.length === 0) {
        const svgRegex = /<svg[\s\S]*?<\/svg>/g;
        let svgMatch;
        
        while ((svgMatch = svgRegex.exec(text)) !== null) {
          const svg = svgMatch[0];
          this.extractedSvgs.push({
            title: `icon_${this.extractedSvgs.length + 1}`,
            svg,
            category: '常用'
          });
        }
      }
    },
    
    // 根据标题确定分类
    determineCategoryFromTitle(title) {
      // 根据标题关键词确定可能的分类
      if (/电|电力|电网|电压|变压器|发电/.test(title)) {
        return '电力';
      } else if (/建筑|建设|施工|工程|工地|安全帽/.test(title)) {
        return '工程';
      } else if (/箭头|方向|向上|向下|向左|向右/.test(title)) {
        return 'arrows';
      } else if (/城市|道路|交通|建筑|地图/.test(title)) {
        return '智慧城市';
      } else if (/网络|服务器|计算机|软件|程序|互联网/.test(title)) {
        return 'IT&互联网';
      } else if (/石油|天然气|煤炭|可再生|风能|太阳能/.test(title)) {
        return '能源';
      } else if (/编辑|删除|添加|修改|保存|取消|确认/.test(title)) {
        return 'actions';
      }
      
      // 默认分类
      return '常用';
    },
    
    // 导入提取的图标
    importExtractedSvgs() {
      if (this.extractedSvgs.length === 0) return;
      
      // 使用批量导入函数
      const importedIcons = batchImportSvgs(this.extractedSvgs);
      this.importedIcons = importedIcons;
      
      // 重新生成分类树
      const { tree, categoryMap } = generateCategoryTree();
      this.categoryTree = tree;
      this.categoriesMap = categoryMap;
      
      // 更新图标列表
      this.iconListData = iconList;
      
      // 重置导航路径
      this.currentPath = [];
      this.currentLevel = this.categoryTree;
      
      // 提示导入成功
      this.$message({
        message: `成功导入 ${importedIcons.length} 个图标!`,
        type: 'success'
      });
      
      // 清空提取结果
      this.extractedSvgs = [];
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
.svg-icon-setting {
}

// 图标导入部分
.icon-import-section {
  margin: 10px 0;
  border-bottom: 1px solid #ebeef5;
  padding-bottom: 15px;
  
  .import-form {
    padding: 10px 0;
    
    .form-group {
      margin-bottom: 10px;
      display: flex;
      align-items: center;
    }
    
    .upload-tip {
      margin-left: 10px;
      color: #606266;
      font-size: 12px;
    }
  }
  
  .extracted-preview {
    margin-top: 10px;
    
    p {
      margin-bottom: 8px;
      font-size: 12px;
      color: #606266;
    }
    
    .preview-list {
      display: flex;
      flex-wrap: wrap;
      gap: 8px;
      
      .preview-item {
        width: 60px;
        height: 80px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
        
        .svg-container {
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 5px;
          
          svg {
            max-width: 100%;
            max-height: 100%;
          }
        }
        
        .svg-title {
          font-size: 12px;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          width: 100%;
        }
      }
      
      .preview-more {
        display: flex;
        align-items: center;
        color: #909399;
        font-size: 12px;
        padding: 0 10px;
      }
    }
  }
}

.icon-selector-wrapper {
  margin-top: 20px;
  padding-top: 15px;
  h4 {
    margin-bottom: 10px;
    font-size: 14px;
    font-weight: bold;
  }
}

// 图标搜索
.icon-search {
  margin: 15px 0;
}

// 分类路径导航
.category-path {
  margin-bottom: 15px;
  padding: 8px 0;
  border-bottom: 1px solid #f0f0f0;
  
  :deep(.el-breadcrumb__item) {
    cursor: pointer;
    &:hover {
      color: #409eff;
    }
  }
}

// 子分类列表
.subcategories {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 20px;
  
  .category-item {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100px;
    height: 100px;
    border: 1px solid #e0e0e0;
    border-radius: 4px;
    cursor: pointer;
    transition: all 0.2s ease;
    
    &:hover {
      background-color: #f5f7fa;
      border-color: #c0c4cc;
    }
    
    .category-icon {
      font-size: 32px;
      color: #909399;
      margin-bottom: 8px;
    }
    
    .category-name {
      font-size: 12px;
      color: #606266;
      text-align: center;
      padding: 0 8px;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      width: 100%;
    }
  }
}

// 图标列表
.icon-list {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 10px;
  border: 1px solid #dcdfe6;
  border-radius: 4px;
  cursor: pointer;
  width: 80px;
  height: 80px;
  transition: all 0.2s ease-in-out;
  &:hover {
    border-color: #409eff;
    color: #409eff;
  }
  &.is-active {
    border-color: #409eff;
    background-color: #ecf5ff;
    color: #409eff;
  }
  .preview-icon {
    width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 8px;
  }
  .icon-name {
    font-size: 12px;
    text-align: center;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    width: 100%;
  }
}

.no-icons-message {
  width: 100%;
  text-align: center;
  padding: 20px;
  color: #909399;
}
</style>
