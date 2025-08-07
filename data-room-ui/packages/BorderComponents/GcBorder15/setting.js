const type = 'GcBorder15'

const name = '边框15'

const isTitle = true

const padding =[0,0,0,0]
// 右侧配置项
const setting = [
  {
    label: '边框宽度',
    type: 'inputNumber',
    field: 'borderWidth',
    optionField: 'borderWidth',
    value: 4,
    attrs:
      {
        min:0
      }
  },
  {
    label: '边框颜色',
    type: 'colorPicker',
    field: 'borderColor',
    optionField: 'borderColor',
    value: '#001C89'
  },
  {
    label: '背景颜色',
    type: 'colorPicker',
    field: 'bgColor',
    optionField: 'bgColor',
    value: 'transparent'
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
  {
    label: '装饰条颜色',
    type: 'colorPicker',
    field: 'decorColor1',
    optionField: 'decorColor1',
    value: '#FFAD2C'
  },
]




export default {
  setting,
  type,
  name,
  isTitle,
  padding
}
