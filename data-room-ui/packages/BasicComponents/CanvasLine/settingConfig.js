export default {
  name: '画布线条',
  type: 'canvasLine',
  icon: 'iconxiantiao',
  component: () => import('./index.vue'),
  setting: () => import('./setting.vue'),
  w: 300,
  h: 100,
  customize: {
    lineColor: '#1890ff',
    lineWidth: 2,
    opacity: 1,
    dashed: false,
    dashLength: 5,
    lineType: 'straight',
    points: [
      { x: 0.2, y: 0.5 },
      { x: 0.8, y: 0.5 }
    ],
    animation: {
      enable: false,
      type: 'flow',
      speed: 5,
      flowColor: 'rgba(24, 144, 255, 0.6)',
      flowLength: 30,
      particleSize: 3,
      particleColor: '#ffffff',
      glowColor: 'rgba(24, 144, 255, 0.3)',
      glowWidth: 10,
      direction: 'forward'
    }
  }
}