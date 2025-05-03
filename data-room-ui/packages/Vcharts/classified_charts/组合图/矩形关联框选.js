const spec = {
  type: 'common',
  padding: 30,
  region,
  layout: {
    type: 'grid',
    col: col * 2,
    row: row * 2,
    elements: layoutElements,
    rowHeight
  },
  axes,
  tooltip: false,
  series,
  brush: {
    seriesIndex: Array.from({ length: 16 }, (v, k) => k),
    brushType: 'rect',
    brushLinkSeriesIndex: Array.from({ length: 16 }, (v, k) => k),
    inBrush: {
      colorAlpha: 1
    },
    outOfBrush: {
      colorAlpha: 0.2
    }
  }
};