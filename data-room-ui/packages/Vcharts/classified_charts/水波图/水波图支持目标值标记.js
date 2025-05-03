const spec = {
  type: 'liquid',
  valueField: 'value',
  data: {
    id: 'data',
    values: [
      {
        value: 0.3
      }
    ]
  },
  indicator: {
    visible: true,
    title: {
      visible: true,
      style: {
        text: '进度'
      }
    },
    content: [
      {
        visible: true,
        style: {
          fill: 'black',
          text: '30%'
        }
      }
    ]
  },
  extensionMark: [
    {
      type: 'rule',
      style: {
        stroke: 'red',
        x: (datum, context) => {
          // console.log('context', context)
          const {x: liquidBackCenterX,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          const ruleLen = Math.sqrt(1 - (targetRatio - 0.5) * (targetRatio - 0.5) * 4) * liquidBackSize / 2;
          return liquidBackCenterX - ruleLen
        },
        x1: (datum, context) => {
          const {x: liquidBackCenterX,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          const ruleLen = Math.sqrt(1 - (targetRatio - 0.5) * (targetRatio - 0.5) * 4) * liquidBackSize / 2;
          return liquidBackCenterX + ruleLen
        },
        y: (datum, context) => {
          const offsetReverse = spec.reverse ? 1 : -1;
          const { y: liquidBackCenterY,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          return liquidBackCenterY + offsetReverse * (targetRatio - 0.5) * liquidBackSize
        },
        y1: (datum, context) => {
           const offsetReverse = spec.reverse ? 1 : -1;
          const { y: liquidBackCenterY,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          return liquidBackCenterY + offsetReverse * (targetRatio - 0.5) * liquidBackSize
        }
      }
    }, {
      type: 'symbol',
      style: {
        fill: 'red',
        size: 5,
        x: (datum, context) => {
          const {x: liquidBackCenterX,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          const ruleLen = Math.sqrt(1 - (targetRatio - 0.5) * (targetRatio - 0.5) * 4) * liquidBackSize / 2;
          return liquidBackCenterX - ruleLen
        },
        y: (datum, context) => {
          const offsetReverse = spec.reverse ? 1 : -1;
          const { y: liquidBackCenterY,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          return liquidBackCenterY + offsetReverse * (targetRatio - 0.5) * liquidBackSize
        },
        symbolType: 'triangle',
        angle: 90
      } 
    },{
      type: 'symbol',
      style: {
        fill: 'red',
        size: 5,
        x: (datum, context) => {
          const {x: liquidBackCenterX,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          const ruleLen = Math.sqrt(1 - (targetRatio - 0.5) * (targetRatio - 0.5) * 4) * liquidBackSize / 2;
          return liquidBackCenterX + ruleLen
        },
        y: (datum, context) => {
          const offsetReverse = spec.reverse ? 1 : -1;
          const { y: liquidBackCenterY,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          return liquidBackCenterY + offsetReverse * (targetRatio - 0.5) * liquidBackSize
        },
        symbolType: 'triangle',
        angle: -90
      } 
    },{
      type: 'text',
      style: {
        text: '目标值' + targetRatio * 100 + '%',
        fill: 'red',
        fontSize: 8,
        x: (datum, context) => {
          const {x: liquidBackCenterX,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          const ruleLen = Math.sqrt(1 - (targetRatio - 0.5) * (targetRatio - 0.5) * 4) * liquidBackSize / 2;
          return liquidBackCenterX + ruleLen + 10
        },
        y: (datum, context) => {
          const offsetReverse = spec.reverse ? 1 : -1;
          const { y: liquidBackCenterY,size: liquidBackSize } = context.getLiquidBackPosAndSize()
          return liquidBackCenterY + offsetReverse * (targetRatio - 0.5) * liquidBackSize
        },
        textBaseline: 'middle',
        textAlign: 'left'
      } 
    }]
};