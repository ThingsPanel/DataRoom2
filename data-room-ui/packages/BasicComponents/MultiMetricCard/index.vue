<template>
  <div
    :class="`bs-indexCard`"
    class="multi-metric-card-list"
  >
    <!-- Loading Placeholder State -->
    <template v-if="config.loading">
      <div 
        v-for="n in 7" 
        :key="'placeholder-' + n" 
        class="weather-card-item placeholder-card"
      >
        <span class="placeholder-text placeholder-date"></span>
        <div class="placeholder-icon"></div>
        <div class="placeholder-text placeholder-temp"></div>
      </div>
    </template>

    <!-- Data Display State -->
    <template v-else-if="optionData && optionData.length > 0">
      <div 
        v-for="(item, itemIndex) in optionData" 
        :key="itemIndex" 
        class="weather-card-item"
      >
        <span class="date-text">{{ getWeekday(item.fxDate) }}</span>
        <div class="icons">
            <div class="icon">
              <i :class="'qi-'+item.iconDay"></i>
            </div>
          </div>
          <div class="temperature-range">
             <span>{{ item.tempMin }}</span><span class="separator">-</span><span>{{ item.tempMax }}</span>℃
           </div>
      </div>
    </template>

  </div>
</template>

<script>
import commonMixins from 'data-room-ui/js/mixins/commonMixins'
import paramsMixins from 'data-room-ui/js/mixins/paramsMixins'
import linkageMixins from 'data-room-ui/js/mixins/linkageMixins'
export default {
  name: 'Card',
  components: {},
  mixins: [paramsMixins, commonMixins, linkageMixins],
  props: {
    // 卡片的属性
    config: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      customClass: {}
    }
  },
  watch: {},
  mounted () {
  },
  computed: {
    option () {
      return this.config?.option
    },
    optionData () {
      // 确保返回的是数组
      return this.option?.data instanceof Array ? this.option.data : [{
        fxDate: '2025-04-29',
        iconDay: '100',
        tempMin: 0,  
        tempMax: 0

      },{
        fxDate: '2025-04-30',
        iconDay: '100',
        tempMin: 0,
        tempMax: 0
      },{
        fxDate: '2025-04-30',
        iconDay: '100',
        tempMin: 0,
        tempMax: 0
      },{
        fxDate: '2025-04-30',
        iconDay: '100',
        tempMin: 0,
        tempMax: 0
      },{
        fxDate: '2025-04-30',
        iconDay: '100',
        tempMin: 0,
        tempMax: 0
      },{
        fxDate: '2025-04-30',
        iconDay: '100',
        tempMin: 0,
        tempMax: 0
      },{
        fxDate: '2025-04-30',
        iconDay: '100',
        tempMin: 0,
        tempMax: 0
      },]
    },
    customize () {
      return this.config?.customize
    }
  },
  methods: {
    getWeekday(dateStr) {
       if (!dateStr) return '日期未知';
      try {
        const date = new Date(dateStr);
        const dayIndex = date.getDay();
        const weekdays = ['周日', '周一', '周二', '周三', '周四', '周五', '周六'];
        return weekdays[dayIndex];
      } catch (e) {
        return '日期格式错误';
      }
    },
    dataFormatting (config, data) {
      let dataList = [] // 默认空数组
      if (data.success) {
        if (data.data instanceof Array) {
          dataList = data.data
        } else{
          dataList=[]
        }
        // 可选：如果非数组但有数据，是否处理?
        // else if (data.data) { dataList = [data.data]; } 
      }
    
      
      config.option = {
        ...config.option,
        data: dataList
      }
      return config
    }
  }
}
</script>

<style lang="scss" scoped>
/* 容器样式 - 用于水平分布卡片 */
.multi-metric-card-list {
  display: flex;
  flex-wrap: wrap; /* 允许换行 */
  gap: 24px; /* 卡片之间的间距 */
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  overflow-y: auto; /* 如果内容过多允许垂直滚动 */
}

/* 单个卡片样式 */
.weather-card-item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 15px 10px;
  border-radius: 18px;
  background-color: #fff; /* 白色背景 */
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
  transition: background-color 0.3s ease, transform 0.3s ease, box-shadow 0.3s ease;
  /* 设置固定大小 */
  flex: 1;
  height: 100%;
  flex-shrink: 0; /* 防止卡片在 flex 布局中被压缩 */
  /* 移除 flex: 1 1 ... */
  min-width: auto; /* 移除之前的 min-width */
  text-align: center;
  border: none;
  margin: 0; /* Reset margin, gap is handled by parent */

  &:hover {
    // background-color: #d1c4e9; /* Replace solid color */
    background-image: linear-gradient(135deg, #667eea 0%, #764ba2 100%); /* 骚气渐变 */
    color: #fff; /* 文字变白色 */
    transform: translateY(-3px);
    box-shadow: 0 6px 16px rgba(103, 58, 183, 0.3); /* 阴影可以微调以匹配渐变 */

    /* 需要单独设置特定元素的颜色，因为 color 不会继承到所有子元素 */
    .date-text,
    .temperature-range {
      color: #fff; /* 确保日期和温度文字变白 */
    }
    .temperature-range .separator {
       color: rgba(255, 255, 255, 0.7); /* 分隔符可以淡一点 */
    }
    .icon i {
      color: #fff; /* 图标也变白色，或保持原色/其他对比色 */
    }

  }
}

/* Placeholder Card Styles */
.placeholder-card {
  background-color: #f0f0f0; /* Use a light grey background */
  box-shadow: none; /* Remove shadow */
  cursor: default;
  pointer-events: none; /* Disable hover effects */

  &:hover {
    background-color: #f0f0f0; /* Keep background same on hover */
    transform: none;
    box-shadow: none;
  }

  .placeholder-text,
  .placeholder-icon {
    background-color: #e0e0e0; /* Darker grey for content blocks */
    border-radius: 4px;
    animation: pulse 1.5s infinite ease-in-out;
  }

  .placeholder-date {
    width: 60%; 
    height: 36px; /* Match date-text approx height */
    margin-bottom: 8px;
  }

  .placeholder-icon {
    width: 44px; /* Match icon approx size */
    height: 44px;
    border-radius: 50%; /* Make icon placeholder round */
    margin: 5px 0; 
  }

  .placeholder-temp {
    width: 80%;
    height: 24px; /* Match temperature-range approx height */
    margin-top: 8px;
  }
}

/* No Data Message Style */
.no-data-message {
  color: #999; 
  font-size: 12px; 
  text-align: center; 
  padding: 20px; 
  width: 100%;
}

/* Animation for placeholder */
@keyframes pulse {
  0% {
    background-color: #e0e0e0;
  }
  50% {
    background-color: #d0d0d0;
  }
  100% {
    background-color: #e0e0e0;
  }
}

/* 日期样式 */
.date-text {
  font-size: 28px;
  color: #666;
  margin-bottom: 8px;
}

/* 图标容器 */
.icons {
  margin: 5px 0; 
}

.icon {
  i {
    font-size: 44px; /* 图标大小 */
    color: #673ab7; /* 好看的紫色系图标颜色 */
    display: block; /* 确保大小和颜色生效 */
  }
}

/* 温度范围样式 */
.temperature-range {
  font-size: 24px;
  color: #333;
  margin-top: 8px;
  font-weight: bold;

  .separator {
    margin: 0 2px;
    font-weight: normal;
    color: #888;
  }
}
</style>
