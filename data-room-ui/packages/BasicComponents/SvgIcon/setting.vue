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
          <SettingTitle>位置</SettingTitle>
          <div class="lc-field-body">
            <PosWhSetting :config="config" />
          </div>
        <SettingTitle>图标属性</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="图标颜色">
            <ColorPicker
              v-model="config.customize.color"
              :predefine="predefineThemeColors"
            />
          </el-form-item>
             
          <el-form-item label="虚线样式">
            <el-select 
              v-model="dashStyle" 
              placeholder="选择虚线样式" 
              size="small"
              @change="updateDasharray"
            >
              <el-option label="实线" value=""></el-option>
              <el-option label="虚线 (短)" value="5,5"></el-option>
              <el-option label="虚线 (中)" value="10,5"></el-option>
              <el-option label="虚线 (长)" value="15,5"></el-option>
              <el-option label="点线" value="2,5"></el-option>
              <el-option label="点划线" value="10,5,2,5"></el-option>
            </el-select>
          </el-form-item>
        </div>
        
   <!-- 平铺的图标选择器 -->
   <div class="icon-selector-panel">
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
          
          <!-- 分类选择下拉框 -->
          <div class="category-selects">
            <!-- 主分类下拉框 -->
            <div class="category-item">
              <div class="category-label">主分类</div>
              <el-select 
                v-model="selectedMainCategory" 
                placeholder="选择主分类"
                @change="handleMainCategoryChange"
                style="width: 100%"
              >
                <el-option
                  v-for="mainCategory in mainCategories"
                  :key="mainCategory"
                  :label="mainCategory"
                  :value="mainCategory"
                ></el-option>
              </el-select>
            </div>
            
            <!-- 子分类下拉框 -->
            <div class="category-item" v-if="subCategories.length > 0">
              <div class="category-label">子分类</div>
              <el-select 
                v-model="selectedSubCategory" 
                placeholder="选择子分类"
                clearable
                style="width: 100%"
              >
                <el-option
                  v-for="subCategory in subCategories"
                  :key="subCategory"
                  :label="subCategory"
                  :value="subCategory"
                ></el-option>
              </el-select>
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


        <!-- 文字设置 -->
        <SettingTitle>文字设置</SettingTitle>
        <div class="lc-field-body">
          <el-form-item label="显示文字">
            <el-switch v-model="config.customize.showText"></el-switch>
          </el-form-item>
          
          <template v-if="config.customize.showText">
            <el-form-item label="文字内容">
              <el-input 
                v-model="config.customize.text" 
                placeholder="请输入文字内容" 
                size="small"
              ></el-input>
            </el-form-item>
            
            <el-form-item label="文字颜色">
              <ColorPicker
                v-model="config.customize.textStyle.color"
                :predefine="predefineThemeColors"
              />
            </el-form-item>
            
            <el-form-item label="字体大小">
              <el-input-number 
                v-model="textFontSize" 
                :min="10" 
                :max="32" 
                :step="1" 
                size="small"
                @change="updateFontSize"
              ></el-input-number>
            </el-form-item>
            
            <el-form-item label="字体粗细">
              <el-select 
                v-model="config.customize.textStyle.fontWeight" 
                placeholder="选择字体粗细" 
                size="small"
              >
                <el-option label="正常" value="normal"></el-option>
                <el-option label="粗体" value="bold"></el-option>
                <el-option label="细体" value="300"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="文字位置">
              <el-select 
                v-model="config.customize.textStyle.position" 
                placeholder="选择文字位置" 
                size="small"
              >
                <el-option label="顶部" value="top"></el-option>
                <el-option label="底部" value="bottom"></el-option>
                <el-option label="左侧" value="left"></el-option>
                <el-option label="右侧" value="right"></el-option>
              </el-select>
            </el-form-item>
            
            <el-form-item label="文字间距">
              <el-slider 
                v-model="config.customize.textStyle.offset" 
                :min="0" 
                :max="20" 
                :step="1"
              ></el-slider>
            </el-form-item>
          </template>
        </div>
      </el-form>

   
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
import PosWhSetting from 'data-room-ui/BigScreenDesign/RightSetting/PosWhSetting.vue'


export default {
  name: 'SvgIconSetting',
  components: {
    SettingTitle,
    ColorPicker,
    PosWhSetting,
  },
  data() {
    return {
      predefineThemeColors: predefineColors,
      showIconSelector: false,
      searchQuery: '',
      selectedMainCategory: '',
      selectedSubCategory: '',
      allIcons: iconsManifest || [],
      categoryStructure: {}, // 存储分类结构
      
      // 虚线和文字设置相关数据
      dashStyle: '', // 用户选择的虚线样式
      textFontSize: 12, // 文字大小（数字形式）
    }
  },
  created() {
    // 处理分类结构
    this.processCategoryStructure();
    
    // 默认选中第一个主分类
    if (this.mainCategories.length > 0) {
      this.selectedMainCategory = this.mainCategories[0];
    }
    
    // 初始化设置
    this.initSettings();
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
    // 初始化设置
    initSettings() {
      // 初始化虚线样式选择器
      this.dashStyle = this.config.customize.strokeDasharray || '';
      
      // 初始化文字大小（从'12px'格式提取数字）
      if (this.config.customize.textStyle && this.config.customize.textStyle.fontSize) {
        const fontSizeStr = this.config.customize.textStyle.fontSize;
        this.textFontSize = parseInt(fontSizeStr, 10) || 12;
      }
      
      // 确保customize中有必要的对象
      if (!this.config.customize.textStyle) {
        this.$set(this.config.customize, 'textStyle', {
          color: '#333333',
          fontSize: '12px',
          fontWeight: 'normal',
          position: 'bottom',
          offset: 5
        });
      }
    },
    
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
    
    // 选择主分类时清空子分类
    handleMainCategoryChange() {
      this.selectedSubCategory = '';
    },
    
    // 选择图标
    selectIcon(icon) {
      this.config.customize.iconClass = icon.name;
    },
    
    // 更新虚线样式
    updateDasharray() {
      this.config.customize.strokeDasharray = this.dashStyle;
    },
    
    // 更新字体大小
    updateFontSize() {
      this.config.customize.textStyle.fontSize = `${this.textFontSize}px`;
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
  margin: 10px 0;
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
  margin-top: 2px;
  padding-top:2px;
}

.icon-selector {
  padding: 0 16px;
  
  .search-box {
    margin-bottom: 15px;
  }
  
  .category-selects {
    margin-bottom: 15px;
    
    .category-item {
      margin-bottom: 12px;
      
      .category-label {
        margin-bottom: 5px;
        color: #606266;
        font-size: 14px;
        line-height: 1;
      }
    }
  }
  
  .icons-container {
    margin-bottom: 15px;
    max-height: 400px;
    
    .no-icons-message {
      display: flex;
      height: 100px;
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
        color: #409eff;
      }
      
      &.is-selected {
        border-color: #409eff;
        background-color: #ecf5ff;
        color: #409eff;
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

