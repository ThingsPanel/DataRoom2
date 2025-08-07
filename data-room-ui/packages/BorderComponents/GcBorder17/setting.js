const type = 'GcBorder17'

const name = '边框17'

const isTitle = true // Enable title

const padding = [0,0,0,0]

// Basic setting structure, can be expanded later
const setting = [
  {
    label: '边框宽度',
    type: 'inputNumber',
    field: 'borderWidth',
    optionField: 'borderWidth',
    value: 1,
    attrs: {
        min:0
    }
  },
  {
    label: '边框颜色',
    type: 'colorPicker',
    field: 'borderColor',
    optionField: 'borderColor',
    value: '#001C89' // Match GcBorder15 default
  },
  {
    label: '背景颜色',
    type: 'colorPicker',
    field: 'bgColor',
    optionField: 'bgColor',
    value: 'transparent'
  },
  {
    label: '缺口水平宽度',
    type: 'inputNumber',
    field: 'cutWidth',
    optionField: 'cutWidth',
    value: 120,
    attrs: {
        min:0
    }
  },
  {
    label: '缺口高度',
    type: 'inputNumber',
    field: 'cutHeight',
    optionField: 'cutHeight',
    value: 25,
    attrs: {
        min:0
    }
  },
  {
    label: '斜切宽度',
    type: 'inputNumber',
    field: 'slopeWidth',
    optionField: 'slopeWidth',
    value: 20, // Default width of the slanted part
    attrs: {
        min:0
    }
  },
  {
    label: '装饰条颜色',
    type: 'colorPicker',
    field: 'decorColor1',
    optionField: 'decorColor1',
    value: '#FFAD2C'
  },
  {
    label: '标题字体颜色',
    type: 'colorPicker',
    field: 'fontColor',
    optionField: 'fontColor',
    value: '#FFFFFF'
  },
  {
    label: '标题字体大小',
    type: 'inputNumber',
    field: 'fontSize',
    optionField: 'fontSize',
    value: 14,
    attrs:
      {
        min:12
      }
  },
]

export default {
  setting,
  type,
  name,
  isTitle,
  padding
} 