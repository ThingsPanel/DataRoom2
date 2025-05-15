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
          
        
        </div>
      </el-form>

      <!-- 平铺的图标选择器 -->
      <div  class="icon-selector-panel">
        <SettingTitle>图标选择</SettingTitle>
        <div class="icon-selector">
          <!-- 搜索框 -->
          <div class="search-box">
            <el-input
              v-model="searchQuery"
              placeholder="搜索图标"
              prefix-icon="el-icon-search"
              clearable
            ></el-input>
          </div>
          
          <!-- 主分类选择 -->
          <div class="main-categories">
            <div 
              v-for="mainCategory in mainCategories" 
              :key="mainCategory"
              class="main-category-tab"
              :class="{ 'active': selectedMainCategory === mainCategory }"
              @click="selectMainCategory(mainCategory)"
            >
              {{ mainCategory }}
            </div>
          </div>
          
          <!-- 子分类选择 -->
          <div v-if="!searchQuery && subCategories.length > 0" class="sub-categories">
            <div 
              v-for="subCategory in subCategories" 
              :key="subCategory"
              class="sub-category-tab"
              :class="{ 'active': selectedSubCategory === subCategory }"
              @click="selectSubCategory(subCategory)"
            >
              {{ subCategory }}
            </div>
          </div>
          
          <!-- 图标列表 -->
          <div class="icons-container">
            <el-scrollbar style="height: 300px;">
              <div v-if="filteredIcons.length > 0" class="icon-grid">
                <div 
                  v-for="icon in filteredIcons" 
                  :key="`${icon.category}-${icon.name}`"
                  class="icon-item"
                  :class="{ 'is-selected': icon.name === config.customize.iconClass }"
                  @click="selectIcon(icon)"
                >
                  <div class="icon-image">
                    <svg class="icon-svg" aria-hidden="true">
                      <use :xlink:href="`#icon-${icon.name}`"></use>
                    </svg>
                  </div>
                  <div class="icon-name">{{ icon.name }}</div>
                </div>
              </div>
              <div v-else class="no-icons-message">
                没有找到匹配的图标
              </div>
            </el-scrollbar>
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
import { predefineColors } from "data-room-ui/js/utils/colorList"
import iconsManifest from './iconsManifest.json'

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
      searchQuery: '',
      selectedMainCategory: '',
      selectedSubCategory: '',
      allIcons: iconsManifest || [],
      categoryStructure: {} // 存储分类结构
    }
  },
  created() {
    // 处理分类结构
    this.processCategoryStructure();
    
    // 默认选中第一个主分类
    if (this.mainCategories.length > 0) {
      this.selectMainCategory(this.mainCategories[0]);
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
    
    // 获取主分类列表
    mainCategories() {
      return Object.keys(this.categoryStructure).sort();
    },
    
    // 获取当前主分类下的子分类列表
    subCategories() {
      if (!this.selectedMainCategory) return [];
      return this.categoryStructure[this.selectedMainCategory] || [];
    },
    
    // 根据搜索、主分类和子分类过滤图标
    filteredIcons() {
      let result = this.allIcons;
      
      // 按搜索词过滤
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(icon => 
          icon.name.toLowerCase().includes(query) ||
          icon.category.toLowerCase().includes(query)
        );
        return result;
      }
      
      // 按主分类和子分类过滤
      if (this.selectedMainCategory) {
        // 如果选择了子分类，则精确匹配
        if (this.selectedSubCategory) {
          result = result.filter(icon => {
            const parts = icon.category.split('/');
            return parts[0] === this.selectedMainCategory && 
                  (parts.length > 1 ? parts[1] === this.selectedSubCategory : true);
          });
        } else {
          // 只按主分类过滤
          result = result.filter(icon => {
            const parts = icon.category.split('/');
            return parts[0] === this.selectedMainCategory;
          });
        }
      }
      
      return result;
    }
  },
  methods: {
    // 处理分类结构，将分类解析为主分类和子分类
    processCategoryStructure() {
      const structure = {};
      
      this.allIcons.forEach(icon => {
        const parts = icon.category.split('/');
        const mainCategory = parts[0];
        const subCategory = parts.length > 1 ? parts[1] : '';
        
        if (!structure[mainCategory]) {
          structure[mainCategory] = [];
        }
        
        if (subCategory && !structure[mainCategory].includes(subCategory)) {
          structure[mainCategory].push(subCategory);
        }
      });
      
      // 对子分类进行排序
      Object.keys(structure).forEach(main => {
        structure[main].sort();
      });
      
      this.categoryStructure = structure;
    },
    
    // 选择主分类
    selectMainCategory(mainCategory) {
      this.selectedMainCategory = mainCategory;
      this.selectedSubCategory = ''; // 清空子分类选择
    },
    
    // 选择子分类
    selectSubCategory(subCategory) {
      this.selectedSubCategory = subCategory;
    },
    
    // 切换图标选择器显示状态
    toggleIconSelector() {
      this.showIconSelector = !this.showIconSelector;
    },
    
    // 选择图标
    selectIcon(icon) {
      this.config.customize.iconClass = icon.name;
      // 选择后不关闭图标选择器，方便用户继续选择
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

.icon-preview-box {
  display: flex;
  align-items: center;
  margin-top: 10px;
  padding: 8px;
  border: 1px dashed #ddd;
  border-radius: 4px;
  
  .icon-preview {
    width: 24px;
    height: 24px;
    margin-right: 10px;
    fill: currentColor;
  }
  
  span {
    font-size: 14px;
    color: #666;
  }
}

.icon-selector-panel {
  margin-top: 16px;
  border-top: 1px solid #ebeef5;
  padding-top: 16px;
}

.icon-selector {
  padding: 0 16px;
  
  .search-box {
    margin-bottom: 15px;
  }
  
  .main-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    margin-bottom: 15px;
    
    .main-category-tab {
      padding: 6px 12px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s;
      
      &:hover {
        border-color: #c6e2ff;
        color: #409eff;
      }
      
      &.active {
        background-color: #409eff;
        color: #ffffff;
        border-color: #409eff;
      }
    }
  }
  
  .sub-categories {
    display: flex;
    flex-wrap: wrap;
    gap: 6px;
    margin-bottom: 15px;
    padding: 10px;
    background-color: #f5f7fa00;
    border-radius: 4px;
    border: 1px solid #e4e7ed;
    .sub-category-tab {
      padding: 4px 10px;
      border: 1px solid #e4e7ed;
      border-radius: 3px;
      font-size: 12px;
      cursor: pointer;
      transition: all 0.3s;
      background-color: #7c7c7c;
      
      &:hover {
        border-color: #c6e2ff;
        color: #409eff;
      }
      
      &.active {
        background-color: #ecf5ff;
        color: #409eff;
        border-color: #409eff;
      }
    }
  }
  
  .icons-container {
    margin-bottom: 15px;
    
    .no-icons-message {
      display: flex;
      height: 100%;
      align-items: center;
      justify-content: center;
      color: #909399;
      font-size: 14px;
    }
  }
  
  .icon-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
    gap: 12px;
    padding: 10px;
    
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 8px;
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
        width: 28px;
        height: 28px;
        margin-bottom: 6px;
        display: flex;
        align-items: center;
        justify-content: center;
        
        .icon-svg {
          width: 100%;
          height: 100%;
          fill: currentColor;
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
  }
}
</style>
