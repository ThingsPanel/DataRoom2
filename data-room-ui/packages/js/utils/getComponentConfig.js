import Icon from 'data-room-ui/assets/images/bigScreenIcon/export'

export default function getComponentConfig (type) {
  switch (type) {
    // 1. 基础文本类
    case 'texts':        // 文本
      return {
        name: '文本',
        title: '文本',
        icon: Icon.getNameList()[0],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenTextChart',
        w: 200,
        h: 60,
        x: 0,
        y: 0,
        type
      }
      case 'texts10':        // 文本
      return {
        name: '文本10',
        title: '文本10',
        icon: Icon.getNameList()[0],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 200,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'numbers': // 数字
      return {
        name: '数字',
        title: '数字',
        icon: Icon.getNameList()[28],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenNumbersChart',
        w: 200,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'timestamp': // 时间戳
      return {
        name: '时间戳（专用）',
        title: '时间戳（专用）',
        icon: Icon.getNameList()[28],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenNumbersChart',
        w: 200,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'marquee': // 跑马灯
      return {
        name: '跑马灯',
        title: '跑马灯',
        icon: Icon.getNameList()[16],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenMarqueeChart',
        w: 250,
        h: 150,
        x: 0,
        y: 0,
        type
      }
    case 'currentTime':  // 当前时间
      return {
        name: '当前时间',
        title: '当前时间',
        icon: Icon.getNameList()[6],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenCurrentTimeChart',
        w: 300,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'timeCountDown': // 倒计时
      return {
        name: '倒计时',
        title: '倒计时',
        icon: Icon.getNameList()[7],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenTimeCountDownChart',
        w: 300,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'linkChart':    // 超链接
      return {
        name: '超链接',
        title: '超链接',
        icon: Icon.getNameList()[15],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenLinkChart',
        w: 200,
        h: 60,
        x: 0,
        y: 0,
        type
      }

    // 2. 输入控件类
    case 'input':        // 输入框
      return {
        name: '输入框',
        title: '输入框',
        icon: Icon.getNameList()[13],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenInputChart',
        w: 450,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'button': // 输入框
      return {
        name: '按钮',
        title: '按钮 ',
        icon: Icon.getNameList()[14],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenButtonChart',
        w: 450,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'select':       // 选择器
      return {
        name: '选择器',
        title: '选择器',
        icon: Icon.getNameList()[21],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenSelectChart',
        w: 450,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'switchBtn': // 开关
      return {
        name: '开关',
        title: '开关',
        icon: Icon.getNameList()[42], // 使用switch.svg
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 200,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'timePicker':   // 时间选择器
      return {
        name: '时间',
        title: '时间',
        icon: Icon.getNameList()[22],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenTimePickerChart',
        w: 200,
        h: 60,
        x: 0,
        y: 0,
        type
      }
    case 'dateTimePicker': // 日期时间选择器
      return {
        name: '日期时间',
        title: '日期时间',
        icon: Icon.getNameList()[23],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenDateTimePickerChart',
        w: 500,
        h: 60,
        x: 0,
        y: 0,
        type
      }

    // 3. 装饰边框类
    case 'horizontalLine': // 水平线
      return {
        name: '横线',
        title: '横线',
        icon: Icon.getNameList()[24],
        component: null,
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 300,
        h: 40,
        x: 0,
        y: 0,
        type
      }
    case 'verticalLine':  // 垂直线
      return {
        name: '竖线',
        title: '竖线',
        icon: Icon.getNameList()[25],
        component: null,
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 40,
        h: 300,
        x: 0,
        y: 0,
        type
      }
    case 'rectangle': // 矩形
      return {
        name: '矩形',
        title: '矩形',
        icon: Icon.getNameList()[37],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 200,
        h: 100,
        x: 0,
        y: 0,
        type
      }
    case 'svgLine':      // SVG线条
      return {
        name: 'SVG线条',
        title: 'SVG线条',
        icon: Icon.getNameList()[39],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 200,
        h: 100,
        x: 0,
        y: 0,
        type
      }
      case 'fabricLine':      // SVG线条
      return {
        name: 'fabri线条',
        title: 'fabri线条',
        icon: Icon.getNameList()[39],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 200,
        h: 100,
        x: 0,
        y: 0,
        type
      }
    case 'canvasLine': // Canvas线条
      return {
        name: 'Canvas线条',
        title: 'Canvas线条',
        icon: Icon.getNameList()[40], // 使用40canvasLine.svg
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 200,
        h: 100,
        x: 0,
        y: 0,
        type
      }
    case 'svgIcon': // SVG 图标
      return {
        name: 'SVG图标',
        title: 'SVG图标',
        icon: Icon.getNameList()[5], // Placeholder icon, adjust as needed
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenBorderChart',
        w: 100, // Default width on canvas
        h: 100, // Default height on canvas
        x: 0,
        y: 0,
        type
      }

    // 4. 媒体展示类
    case 'picture': // 图片
      return {
        name: '图片',
        title: '图片',
        icon: Icon.getNameList()[1],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenPictureChart',
        w: 280,
        h: 200,
        x: 0,
        y: 0,
        type
      }
    case 'video':        // 视频播放器
      return {
        name: '播放器',
        title: '播放器',
        icon: Icon.getNameList()[12],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenVideoChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }
    case 'iframeChart':  // 外链
      return {
        name: '外链',
        title: '外链',
        icon: Icon.getNameList()[8],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenIframeChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }
    case 'customHtml':   // 自定义HTML
      return {
        name: 'HTML',
        title: 'HTML',
        icon: Icon.getNameList()[29],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenCustomHtmlChart',
        w: 600,
        h: 150,
        x: 0,
        y: 0,
        type
      }

    // 5. 数据展示类
    case 'tables':       // 表格
      return {
        name: '表格',
        title: '表格',
        icon: Icon.getNameList()[4],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenTablesChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }
    case 'screenScrollBoard':    // 轮播表
      return {
        name: '轮播表',
        title: '轮播表',
        icon: Icon.getNameList()[2],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenScrollBoardChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }
    case 'screenScrollRanking': // 排名表
      return {
        name: '排名表',
        title: '排名表',
        icon: Icon.getNameList()[3],
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenScrollRankingChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }
    case 'digitalFlop':  // 翻牌器
      return {
        name: '翻牌器',
        title: '翻牌器',
        icon: null,
        img: require('data-room-ui/BasicComponents/DigitalFlop/images/fanpaiqi.png'),
        className:
          'com.gccloud.dataroom.core.module.chart.components.ScreenDigitalFlopChart',
        w: 800,
        h: 150,
        x: 0,
        y: 0,
        type
      }

    // 6. 指标卡片类
    case 'indicatorCard':  // 指标卡一
      return {
        name: '指标卡1',
        title: '指标卡1',
        icon: Icon.getNameList()[30],
        // img: require('data-room-ui/assets/images/cardImg/card.png'),
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenIndicatorCardChart',
        w: 300,
        h: 114,
        x: 0,
        y: 0,
        type
      }
    case 'indicatorCard2': // 指标卡二
      return {
        name: '指标卡2',
        title: '指标卡2',
        icon: Icon.getNameList()[31],
        // img: require('data-room-ui/assets/images/cardImg/card2.png'),
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenIndicatorCardChart',
        w: 300,
        h: 114,
        x: 0,
        y: 0,
        type
      }
    case 'indicatorCard5': // 指标卡二
      return {
        name: '对象数据卡',
        title: '对象数据卡',
        icon: Icon.getNameList()[31],
        // img: require('data-room-ui/assets/images/cardImg/card2.png'),
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenIndicatorCardChart',
        w: 300,
        h: 114,
        x: 0,
        y: 0,
        type
      }
    case 'indexCard':     // 指标卡三
      return {
        name: '指标卡3',
        title: '指标卡3',
        icon: Icon.getNameList()[32],
        // img: require('data-room-ui/assets/images/cardImg/indicard.png'),
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenIndexCardChart',
        w: 300,
        h: 114,
        x: 0,
        y: 0,
        type
      }
    case 'indexCard2':    // 指标卡四
      return {
        name: '指标卡4',
        title: '指标卡4',
        icon: Icon.getNameList()[33],
        // img: require('data-room-ui/assets/images/cardImg/indcard2.png'),
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenIndexCardChart',
        w: 300,
        h: 114,
        x: 0,
        y: 0,
        type
      }

    // New MultiMetricCard case
    case 'multiMetricCard':  // 多指标卡片
      return {
        name: '多指标卡片',
        title: '多指标卡片',
        icon: Icon.getNameList()[30], // Reuse an existing card icon for now
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenIndexCardChart', // Assuming a corresponding Java class name
        w: 350, // Default width based on example
        h: 250, // Default height based on example
        x: 0,
        y: 0,
        type
      }

    // New WeatherIcon case
    case 'weatherIcon':  // 天气图标
      return {
        name: '天气图标',
        title: '天气图标',
        icon: Icon.getNameList()[30], // Reuse an existing icon for now
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenTextChart', // Assuming a Java class name
        w: 80, // Default size suitable for an icon
        h: 80,
        x: 0,
        y: 0,
        type
      }

    // 7. 图表类
    case 'candlestick':   // K线图
      return {
        name: 'K线图',
        title: 'K线图',
        icon: Icon.getNameList()[34],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenCandlestickChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }
    case 'sankey':       // 桑基图
      return {
        name: '桑基图',
        title: '桑基图',
        icon: Icon.getNameList()[38],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenSankeyChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }

    // 8. 地图类
    case 'map':          // 地图
      return {
        name: '地图',
        title: '地图',
        icon: Icon.getNameList()[36],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenMapChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }
    case 'flyMap':       // 飞线地图
      return {
        name: '飞线地图',
        title: '飞线地图',
        icon: Icon.getNameList()[35],
        className: 'com.gccloud.dataroom.core.module.chart.components.ScreenFlyMapChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }

    // 9. 容器类
    case 'chartTab':     // 图表Tab页
      return {
        name: '图表Tab',
        title: '图表Tab',
        icon: Icon.getNameList()[19],
        className: 'com.gccloud.dataroom.core.module.chart.components.ChartTabChart',
        w: 600,
        h: 400,
        x: 0,
        y: 0,
        type
      }

    // 10. 主题类
    case 'themeSelect':  // 主题切换
      return {
        name: '主题切换',
        title: '主题切换',
        icon: Icon.getNameList()[20],
        className: 'com.gccloud.dataroom.core.module.chart.components.ThemeSelectChart',
        w: 200,
        h: 100,
        x: 0,
        y: 0,
        type
      }
    case 'themeSwitcher': // 主题切换器
      return {
        name: '主题切换器',
        title: '主题切换器',
        icon: Icon.getNameList()[41], // 使用41themeSwitcher.svg
        className: 'com.gccloud.dataroom.core.module.chart.components.ThemeSwitcherChart',
        w: 200,
        h: 100,
        x: 0,
        y: 0,
        type
      }
    default:
      return {}
  }
}
