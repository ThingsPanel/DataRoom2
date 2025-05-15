<template>
  <div class="svg-icon-loader-container">
    <h2>SVG图标加载管理</h2>

    <!-- 统计信息 -->
    <div class="stats-section">
      <div class="stat-card">
        <div class="stat-value">{{ availableIcons.length }}</div>
        <div class="stat-label">已加载图标数</div>
      </div>
      <div class="stat-card">
        <div class="stat-value">{{ Object.keys(categoriesCount).length }}</div>
        <div class="stat-label">图标分类数</div>
      </div>
    </div>

    <!-- 操作区域 -->
    <div class="actions-section">
      <el-button type="primary" @click="openIconManifestPreview" :disabled="!hasIconManifest">
        查看图标库清单
      </el-button>
      <el-button @click="openImportDialog">导入SVG图标</el-button>
    </div>

    <!-- 分类浏览 -->
    <div class="categories-section">
      <h3>按分类浏览</h3>
      
      <!-- 分类筛选 -->
      <div class="categories-filter">
        <el-input 
          v-model="searchQuery" 
          placeholder="搜索图标" 
          prefix-icon="el-icon-search"
          clearable
        ></el-input>
      </div>
      
      <!-- 分类统计列表 -->
      <div class="category-list">
        <div 
          class="category-item" 
          v-for="(count, category) in filteredCategories" 
          :key="category"
          @click="selectCategory(category)"
          :class="{ active: selectedCategory === category }"
        >
          <span class="category-name">{{ category }}</span>
          <span class="category-count">{{ count }}</span>
        </div>
      </div>
    </div>

    <!-- 图标列表 -->
    <div class="icons-section">
      <h3>
        {{ selectedCategory ? `${selectedCategory}分类` : '所有图标' }} 
        <small v-if="filteredIcons.length > 0">({{ filteredIcons.length }} 个)</small>
        <el-button 
          size="mini" 
          type="text" 
          icon="el-icon-close" 
          @click="clearSelection" 
          v-if="selectedCategory"
        >清除筛选</el-button>
      </h3>
      
      <div class="icons-grid">
        <div 
          v-for="icon in filteredIcons" 
          :key="icon" 
          class="icon-item"
        >
          <div class="icon-preview" v-html="getSvgIcon(icon)"></div>
          <div class="icon-name">{{ icon }}</div>
        </div>
        
        <div class="no-icon-message" v-if="filteredIcons.length === 0">
          {{ searchQuery ? '没有匹配的图标' : '暂无图标' }}
        </div>
      </div>
    </div>

    <!-- 图标导入对话框 -->
    <el-dialog
      title="导入SVG图标"
      :visible.sync="importDialogVisible"
      width="600px"
    >
      <div class="import-form">
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

        <!-- 提取预览 -->
        <div class="extracted-preview" v-if="extractedSvgs.length > 0">
          <h4>提取预览</h4>
          <div class="preview-grid">
            <div 
              v-for="(svg, index) in extractedSvgs.slice(0, 12)" 
              :key="index"
              class="preview-item"
            >
              <div class="preview-icon" v-html="svg.svg"></div>
              <div class="preview-name">{{ svg.title || `图标${index+1}` }}</div>
            </div>
            <div v-if="extractedSvgs.length > 12" class="preview-more">
              ...还有 {{ extractedSvgs.length - 12 }} 个图标
            </div>
          </div>
        </div>
      </div>
      
      <span slot="footer" class="dialog-footer">
        <el-button @click="importDialogVisible = false">取消</el-button>
        <el-button 
          type="primary" 
          @click="importExtractedSvgs" 
          :disabled="extractedSvgs.length === 0"
        >导入图标</el-button>
      </span>
    </el-dialog>

    <!-- 图标清单预览对话框 -->
    <el-dialog
      title="图标库清单"
      :visible.sync="manifestDialogVisible"
      width="800px"
      class="manifest-dialog"
    >
      <div v-if="iconManifest && iconManifest.length > 0">
        <div class="manifest-stats">
          清单包含 {{ iconManifest.length }} 个图标定义
        </div>
        
        <el-table :data="iconManifest.slice(0, 100)" style="width: 100%" height="500">
          <el-table-column prop="id" label="图标ID" width="150"></el-table-column>
          <el-table-column prop="name" label="图标名称" width="100"></el-table-column>
          <el-table-column prop="category" label="分类"></el-table-column>
          <el-table-column prop="path" label="文件路径" width="250"></el-table-column>
        </el-table>
        
        <div v-if="iconManifest.length > 100" class="manifest-note">
          仅显示前100个图标。完整清单请查看 iconsManifest.json 文件。
        </div>
      </div>
      <div v-else>
        未找到图标清单。请先运行 scanIcons.js 脚本生成清单文件。
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { 
  getSvgIcon, 
  getAvailableIcons, 
  getIconCategory,
  batchImportSvgs,
  getIconManifest
} from './svgLoader';
import { generateCategoryTree } from './iconList';

export default {
  name: 'SvgIconLoader',
  data() {
    return {
      // 图标数据
      availableIcons: [],
      
      // 分类相关
      categoriesCount: {},
      selectedCategory: '',
      
      // 搜索相关
      searchQuery: '',
      
      // 导入相关
      importDialogVisible: false,
      extractedSvgs: [],
      
      // 清单预览相关
      manifestDialogVisible: false,
      iconManifest: []
    };
  },
  computed: {
    // 根据搜索过滤分类
    filteredCategories() {
      const query = this.searchQuery.toLowerCase();
      
      if (!query) {
        return this.categoriesCount;
      }
      
      const result = {};
      for (const [category, count] of Object.entries(this.categoriesCount)) {
        if (category.toLowerCase().includes(query)) {
          result[category] = count;
        } else {
          // 检查该分类下是否有匹配的图标
          const iconsInCategory = this.availableIcons.filter(
            icon => getIconCategory(icon) === category && icon.toLowerCase().includes(query)
          );
          if (iconsInCategory.length > 0) {
            result[category] = iconsInCategory.length;
          }
        }
      }
      
      return result;
    },
    
    // 根据分类和搜索过滤图标
    filteredIcons() {
      let result = this.availableIcons;
      
      // 分类过滤
      if (this.selectedCategory) {
        result = result.filter(icon => getIconCategory(icon) === this.selectedCategory);
      }
      
      // 搜索过滤
      if (this.searchQuery) {
        const query = this.searchQuery.toLowerCase();
        result = result.filter(icon => icon.toLowerCase().includes(query));
      }
      
      return result;
    },
    
    // 是否有图标清单
    hasIconManifest() {
      return this.iconManifest && this.iconManifest.length > 0;
    }
  },
  created() {
    this.loadIcons();
    this.loadIconManifest();
  },
  methods: {
    getSvgIcon,
    
    // 加载图标
    loadIcons() {
      this.availableIcons = getAvailableIcons();
      
      // 统计分类
      const categoriesCount = {};
      this.availableIcons.forEach(icon => {
        const category = getIconCategory(icon);
        categoriesCount[category] = (categoriesCount[category] || 0) + 1;
      });
      
      this.categoriesCount = categoriesCount;
      
      console.log(`加载了 ${this.availableIcons.length} 个图标，${Object.keys(categoriesCount).length} 个分类`);
    },
    
    // 加载图标清单
    loadIconManifest() {
      this.iconManifest = getIconManifest() || [];
    },
    
    // 选择分类
    selectCategory(category) {
      this.selectedCategory = category;
    },
    
    // 清除筛选
    clearSelection() {
      this.selectedCategory = '';
    },
    
    // 打开导入对话框
    openImportDialog() {
      this.importDialogVisible = true;
      this.extractedSvgs = [];
    },
    
    // 打开清单预览对话框
    openIconManifestPreview() {
      this.manifestDialogVisible = true;
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
      
      // 重新生成分类树并更新图标列表
      generateCategoryTree();
      this.loadIcons();
      
      // 提示导入成功
      this.$message({
        message: `成功导入 ${importedIcons.length} 个图标!`,
        type: 'success'
      });
      
      // 关闭对话框
      this.importDialogVisible = false;
      this.extractedSvgs = [];
    }
  }
};
</script>

<style lang="less" scoped>
.svg-icon-loader-container {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
  
  h2 {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #ebeef5;
    color: #303133;
  }
  
  h3 {
    margin: 15px 0;
    font-size: 16px;
    font-weight: bold;
    display: flex;
    align-items: center;
    
    small {
      margin-left: 5px;
      font-weight: normal;
      color: #909399;
    }
  }
}

// 统计部分
.stats-section {
  display: flex;
  margin-bottom: 20px;
  
  .stat-card {
    background: #f5f7fa;
    border-radius: 4px;
    padding: 16px;
    margin-right: 20px;
    width: 160px;
    text-align: center;
    
    .stat-value {
      font-size: 24px;
      font-weight: bold;
      color: #409eff;
    }
    
    .stat-label {
      margin-top: 8px;
      font-size: 14px;
      color: #606266;
    }
  }
}

// 操作区域
.actions-section {
  margin-bottom: 20px;
}

// 分类部分
.categories-section {
  margin-bottom: 20px;
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px;
  background: #fff;
  
  .categories-filter {
    margin-bottom: 15px;
  }
  
  .category-list {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    
    .category-item {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 12px;
      background: #f5f7fa;
      border-radius: 4px;
      cursor: pointer;
      transition: all 0.2s;
      
      &:hover {
        background: #ebeef5;
      }
      
      &.active {
        background: #ecf5ff;
        color: #409eff;
      }
      
      .category-name {
        margin-right: 10px;
      }
      
      .category-count {
        background: #e6e6e6;
        border-radius: 10px;
        padding: 2px 8px;
        font-size: 12px;
        color: #606266;
      }
    }
  }
}

// 图标部分
.icons-section {
  border: 1px solid #ebeef5;
  border-radius: 4px;
  padding: 15px;
  background: #fff;
  
  .icons-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 15px;
    
    .icon-item {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 10px;
      border: 1px solid #ebeef5;
      border-radius: 4px;
      
      &:hover {
        border-color: #c0c4cc;
        background: #f5f7fa;
      }
      
      .icon-preview {
        width: 32px;
        height: 32px;
        margin-bottom: 8px;
        display: flex;
        align-items: center;
        justify-content: center;
        
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
    
    .no-icon-message {
      grid-column: 1 / -1;
      text-align: center;
      padding: 30px;
      color: #909399;
      font-style: italic;
    }
  }
}

// 导入对话框
.import-form {
  .upload-tip {
    margin-left: 10px;
    font-size: 13px;
    color: #606266;
  }
  
  .extracted-preview {
    margin-top: 20px;
    
    h4 {
      margin-bottom: 10px;
      font-size: 14px;
      font-weight: bold;
    }
    
    .preview-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 10px;
      
      .preview-item {
        display: flex;
        flex-direction: column;
        align-items: center;
        padding: 8px;
        border: 1px solid #ebeef5;
        border-radius: 4px;
        
        .preview-icon {
          width: 32px;
          height: 32px;
          margin-bottom: 5px;
          
          svg {
            width: 100%;
            height: 100%;
          }
        }
        
        .preview-name {
          font-size: 12px;
          width: 100%;
          text-align: center;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
      
      .preview-more {
        display: flex;
        align-items: center;
        justify-content: center;
        grid-column: span 2;
        color: #909399;
        font-style: italic;
      }
    }
  }
}

// 清单对话框
.manifest-dialog {
  .manifest-stats {
    margin-bottom: 15px;
    font-size: 14px;
    color: #606266;
  }
  
  .manifest-note {
    margin-top: 10px;
    font-size: 12px;
    color: #909399;
    font-style: italic;
  }
}
</style> 