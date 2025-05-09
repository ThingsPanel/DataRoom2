/**
 * FabricLine组件的状态管理模块
 * 处理组件状态的保存和更新
 */

export const StateManager = {
  /**
   * 保存组件状态
   * @param {Object} config - 组件配置对象
   * @param {Array} lines - 线条数据数组
   * @param {boolean} selected - 组件是否被选中
   * @param {Function} changeChartConfig - 更新图表配置的Vuex方法
   * @param {Function} changeActiveItemConfig - 更新当前活动项配置的Vuex方法
   */
  saveState(config, lines, selected, changeChartConfig, changeActiveItemConfig) {
    console.log('保存状态', config.customize.points.length, '个点', lines.length, '条线');
    
    const newCustomize = {
      ...config.customize,
      lines: lines
    };
    
    changeChartConfig({
      ...config,
      customize: newCustomize
    });
    
    if (selected) {
      changeActiveItemConfig({
        ...config,
        customize: newCustomize
      });
    }
  },
  
  /**
   * 初始化默认配置
   * @param {Object} config - 组件配置对象
   * @param {Function} $set - Vue的$set方法，用于设置响应式属性
   */
  initDefaults(config, $set) {
    console.log('初始化默认配置');
    if (!config.customize) {
      $set(config, 'customize', {
        lineWidth: 2,
        lineColor: '#409EFF',
        pointRadius: 5,
        pointColor: '#FF4500',
        addingMode: true,
        points: []
      });
    }
    
    // 确保points字段存在
    if (!config.customize.points) {
      $set(config.customize, 'points', []);
    }
    
    // 默认始终为添加点模式
    $set(config.customize, 'addingMode', true);
  }
}; 