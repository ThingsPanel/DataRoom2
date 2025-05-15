<template>
  <div class="svg-icon-demo">
    <h2>SVG图标演示</h2>
    
    <div class="section">
      <h3>导入SVG示例</h3>
      
      <div class="import-form">
        <div class="form-group">
          <label>选择TXT文件</label>
          <input type="file" accept=".txt" @change="handleFileSelect" />
        </div>
        
        <div class="form-group" v-if="extractedSvgs.length > 0">
          <button @click="importExtractedSvgs">导入提取的图标</button>
          <span>已提取 {{ extractedSvgs.length }} 个图标</span>
        </div>
      </div>
      
      <div class="result-preview" v-if="extractedSvgs.length > 0">
        <h4>提取预览</h4>
        <div class="svg-preview-grid">
          <div v-for="(svg, index) in extractedSvgs.slice(0, 10)" :key="index" class="svg-preview-item">
            <div class="svg-container" v-html="svg.svg"></div>
            <div class="svg-title">{{ svg.title || `图标${index+1}` }}</div>
          </div>
          <div v-if="extractedSvgs.length > 10" class="svg-preview-more">
            ...还有 {{ extractedSvgs.length - 10 }} 个图标
          </div>
        </div>
      </div>
    </div>
    
    <div class="section">
      <h3>已注册图标</h3>
      <div class="icon-grid">
        <div 
          v-for="iconId in availableIcons" 
          :key="iconId" 
          class="icon-item"
        >
          <div class="icon-container" v-html="getSvgIcon(iconId)"></div>
          <div class="icon-name">{{ iconId }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getSvgIcon, getAvailableIcons, batchImportSvgs } from './svgLoader';

export default {
  name: 'SvgIconDemo',
  data() {
    return {
      extractedSvgs: [],
      importedIcons: [],
      availableIcons: getAvailableIcons()
    };
  },
  methods: {
    getSvgIcon,
    
    /**
     * 处理文件选择
     */
    handleFileSelect(event) {
      const file = event.target.files[0];
      if (!file) return;
      
      const reader = new FileReader();
      reader.onload = (e) => {
        const content = e.target.result;
        this.extractSvgsFromText(content);
      };
      reader.readAsText(file);
    },
    
    /**
     * 从文本提取SVG
     */
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
    
    /**
     * 根据标题确定分类
     */
    determineCategoryFromTitle(title) {
      // 根据标题关键词确定可能的分类
      const titleLower = title.toLowerCase();
      
      if (/电|电力|电网|电压|变压器|发电/.test(title)) {
        return '电力';
      } else if (/建筑|建设|施工|工程|工地/.test(title)) {
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
    
    /**
     * 导入提取的SVG图标
     */
    importExtractedSvgs() {
      if (this.extractedSvgs.length === 0) return;
      
      // 使用批量导入函数
      const importedIcons = batchImportSvgs(this.extractedSvgs);
      this.importedIcons = importedIcons;
      
      // 更新可用图标列表
      this.availableIcons = getAvailableIcons();
      
      // 提示导入成功
      alert(`成功导入 ${importedIcons.length} 个图标!`);
    }
  }
};
</script>

<style lang="less" scoped>
.svg-icon-demo {
  padding: 20px;
  
  h2 {
    margin-bottom: 20px;
    border-bottom: 1px solid #eaeaea;
    padding-bottom: 10px;
  }
  
  .section {
    margin-bottom: 30px;
    
    h3 {
      margin-bottom: 15px;
      font-size: 18px;
    }
  }
  
  .import-form {
    background: #f5f7fa;
    padding: 15px;
    border-radius: 5px;
    margin-bottom: 20px;
    
    .form-group {
      margin-bottom: 15px;
      display: flex;
      align-items: center;
      
      label {
        margin-right: 10px;
      }
      
      button {
        padding: 8px 16px;
        background: #409eff;
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        margin-right: 10px;
        
        &:hover {
          background: #66b1ff;
        }
      }
    }
  }
  
  .result-preview {
    margin-top: 20px;
    
    h4 {
      margin-bottom: 10px;
    }
    
    .svg-preview-grid {
      display: flex;
      flex-wrap: wrap;
      gap: 15px;
      
      .svg-preview-item {
        width: 80px;
        height: 100px;
        border: 1px solid #dcdfe6;
        border-radius: 4px;
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        
        .svg-container {
          width: 40px;
          height: 40px;
          margin-bottom: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          
          svg {
            width: 100%;
            height: 100%;
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
      
      .svg-preview-more {
        display: flex;
        align-items: center;
        padding: 0 15px;
        color: #909399;
      }
    }
  }
  
  .icon-grid {
    display: flex;
    flex-wrap: wrap;
    gap: 15px;
    
    .icon-item {
      width: 100px;
      height: 100px;
      border: 1px solid #dcdfe6;
      border-radius: 4px;
      padding: 10px;
      display: flex;
      flex-direction: column;
      align-items: center;
      
      .icon-container {
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
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        width: 100%;
      }
    }
  }
}
</style> 