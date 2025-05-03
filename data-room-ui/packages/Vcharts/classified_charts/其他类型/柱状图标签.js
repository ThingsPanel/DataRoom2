const spec = {
  stack: true,
  data: [
    {
      name: 'allData',
      values: [
        {
          name: 'A',
          value: 0.12,
          group: '7+'
        },
        {
          name: 'B',
          value: 0.34,
          group: '7+'
        },
        {
          name: 'C',
          value: 0.25,
          group: '7+'
        },
        {
          name: 'D',
          value: 0.48,
          group: '7+'
        },
        {
          name: 'E',
          value: 0.55,
          group: '7+'
        },
        {
          name: 'F',
          value: 0.42,
          group: '7+'
        },
        {
          name: 'A',
          value: 0.23,
          group: '6-7'
        },
        {
          name: 'B',
          value: 0.25,
          group: '6-7'
        },
        {
          name: 'C',
          value: 0.18,
          group: '6-7'
        },
        {
          name: 'D',
          value: 0.19,
          group: '6-7'
        },
        {
          name: 'E',
          value: 0.15,
          group: '6-7'
        },
        {
          name: 'F',
          value: 0.12,
          group: '6-7'
        },
        {
          name: 'A',
          value: 0.31,
          group: '4-5'
        },
        {
          name: 'B',
          value: 0.33,
          group: '4-5'
        },
        {
          name: 'C',
          value: 0.4,
          group: '4-5'
        },
        {
          name: 'D',
          value: 0.24,
          group: '4-5'
        },
        {
          name: 'E',
          value: 0.18,
          group: '4-5'
        },
        {
          name: 'F',
          value: 0.2,
          group: '4-5'
        },
        {
          name: 'A',
          value: 0.56,
          group: '2-3'
        },
        {
          name: 'B',
          value: 0.29,
          group: '2-3'
        },
        {
          name: 'C',
          value: 0.15,
          group: '2-3'
        },
        {
          name: 'D',
          value: 0.01,
          group: '2-3'
        },
        {
          name: 'E',
          value: 0.14,
          group: '2-3'
        },
        {
          name: 'F',
          value: 0.16,
          group: '2-3'
        },
        {
          name: 'A',
          value: 0.15,
          group: '1'
        },
        {
          name: 'B',
          value: 0.11,
          group: '1'
        },
        {
          name: 'C',
          value: 0.015,
          group: '1'
        },
        {
          name: 'D',
          value: 0.02,
          group: '1'
        },
        {
          name: 'E',
          value: 0,
          group: '1'
        },
        {
          name: 'F',
          value: 0.05,
          group: '1'
        }
      ]
    }
  ],
  color: ['#009DB5', '#F0B71F', '#EB6F02', '#1E5273', '#3BA140'],
  label: {
    visible: true,
    position: 'inside',
    style: {
      stroke: 'white',
      lineWidth: 2
    },
    overlap: {
      strategy: [
        {
          type: 'bound',
          position: ['top']
        },
        {
          type: 'moveY',
          offset: [-2, -4, -8, -10, -12]
        }
      ]
    }
  },
  type: 'bar',
  xField: 'name',
  yField: 'value',
  seriesField: 'group'
};