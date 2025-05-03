const spec = {
  type: 'common',
  padding: {
    left: 30,
    right: 30
  },
  region,
  color: ['#6690F2', '#70D6A3', '#B4E6E2', '#63B5FC', '#FF8F62', '#FFDC83', '#BCC5FD', '#A29BFE'],
  layout: {
    type: 'grid',
    col: col * 2,
    row: row * 2,
    elements: layoutElements,
    rowHeight
  },
  axes,
  tooltip: false,
  series
};