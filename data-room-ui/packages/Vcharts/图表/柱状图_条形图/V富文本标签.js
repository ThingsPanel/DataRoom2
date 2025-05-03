// 配置版本号
const version = '2024072502'; // Increment version
// 标题
const title = 'V富文本标签';
// 用于标识，唯一
const name = 'V富文本标签';
// 组件类型标识
const type = 'customComponent';
// VChart 图表类型标识
const chartType = 'bar';

// 模拟 iconMap，实际使用时可能需要真实的图片 URL 或 Base64
const iconMap = {
  Monday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-fill-star.png', // 示例图标 URL
  Tuesday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-fill-triangle-down.png',
  Wednesday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-stroke-rect.png',
  Thursday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-stroke-cross.png',
  Friday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-fill-diamond.png'
};

// 右侧配置项
const setting = [
  { label: 'X轴字段', type: 'select', field: 'xField', optionField: 'xField', multiple: false, value: 'day', tabName: 'data' },
  { label: 'Y轴字段', type: 'select', field: 'yField', optionField: 'yField', multiple: false, value: 'sales', tabName: 'data' },
  { label: '分组/颜色字段', type: 'select', field: 'seriesField', optionField: 'seriesField', multiple: false, value: 'day', tabName: 'data' },
  // 标签配置
  {
    label: '显示标签',
    type: 'switch',
    field: 'labelVisible',
    optionField: 'label.visible',
    value: true,
    tabName: 'custom',
    groupName: 'label'
  },
  {
    label: '标签位置',
    type: 'select',
    field: 'labelPosition',
    optionField: 'label.position',
    options: [
      { label: '顶部', value: 'top' },
      { label: '底部', value: 'bottom' },
      { label: '内部', value: 'inside' },
      { label: '左侧', value: 'left' },
      { label: '右侧', value: 'right' },
    ],
    value: 'top',
    tabName: 'custom',
    groupName: 'label'
  },
  // 通用配置
  { label: '主题选择', type: 'select', field: 'chartTheme', optionField: 'theme', options: [], value: 'light', tabName: 'custom', groupName: 'basic' },
  {
    label: 'Option 覆盖 (JSON)',
    type: 'textarea',
    field: 'optionOverride',
    optionField: '',
    value: '',
    tabName: 'custom',
    groupName: 'basic'
  }
];

// 示例数据
const data = {
  id: 'barData',
  values: [
    { day: 'Monday', sales: 22 },
    { day: 'Tuesday', sales: 13 },
    { day: 'Wednesday', sales: 25 },
    { day: 'Thursday', sales: 29 },
    { day: 'Friday', sales: 38 }
  ]
};

// 默认 VChart Option
const option = {
  type: 'bar',
  data: [data],
  xField: 'day',
  yField: 'sales',
  seriesField: 'day', // 用于区分颜色
  label: {
    visible: true,
    position: 'top',
    interactive: true,
    formatMethod: (value, datum) => {
      // 注意：此处的 iconMap 引用的是模块顶层定义的 const iconMap
      // 确保 iconMap 在此作用域可用
      if (typeof iconMap === 'undefined') {
          console.error("iconMap is not defined in the scope of formatMethod");
          // Provide a fallback or handle the error appropriately
          return `${value}`; // Simple fallback
      }
      return {
        type: 'rich', // 指定类型为 rich
        text: [ // 定义富文本片段数组
          {
            image: iconMap[datum.day] || '', // Fallback for missing icon
            width: 18,
            height: 18
          },
          {
            text: ` ${datum.day}`, // 显示天
            fontSize: 12,
            fill: '#666',
          },
          {
            text: `: `,
            fontSize: 12,
            fill: '#666'
          },
          {
            text: `${value} `,
            fontSize: 14,
            fill: '#333',
            fontWeight: 'bold'
          }
        ]
      };
    }
  }
};

const dataHandler = `return data;`;

// optionHandler 需要能访问到 iconMap。将其定义在 handleOption 函数内部字符串中。
const optionHandler = `
// Define iconMap within the scope accessible by handleOption
const funcIconMap = {
  Monday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-fill-star.png',
  Tuesday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-fill-triangle-down.png',
  Wednesday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-stroke-rect.png',
  Thursday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-stroke-cross.png',
  Friday: 'https://lf9-dp-fe-cms-tos.byteorg.com/obj/bit-cloud/shape-point-fill-diamond.png'
};

function handleOption(option, config) {
  const settings = config.setting;

  // 处理标签配置
  const labelVisible = settings.find(s => s.field === 'labelVisible')?.value;
  const labelPosition = settings.find(s => s.field === 'labelPosition')?.value;
  
  if (option.label) {
    if (labelVisible !== undefined) {
      option.label.visible = labelVisible;
    }
    if (labelPosition !== undefined) {
      option.label.position = labelPosition;
    }
    
    // IMPORTANT: Ensure formatMethod uses the icon map defined within this scope
    option.label.formatMethod = (value, datum) => {
      // Check if funcIconMap is available
      if (typeof funcIconMap === 'undefined') {
          console.error("funcIconMap is not defined inside handleOption's execution scope");
          return \`\${value}\`; // Fallback
      }
      return {
        type: 'rich',
        text: [
          {
            image: funcIconMap[datum.day] || '', // Use funcIconMap, provide fallback
            width: 18,
            height: 18
          },
          {
            text: \` \${datum.day}\`,
            fontSize: 12,
            fill: '#666',
          },
          {
            text: \`: \`,
            fontSize: 12,
            fill: '#666'
          },
          {
            text: \`\${value} \`,
            fontSize: 14,
            fill: '#333',
            fontWeight: 'bold'
          }
        ]
      };
    }
  }

  return option;
}
`;

export default {
  version, title, name, type, chartType, option, setting, dataHandler, optionHandler
}; 