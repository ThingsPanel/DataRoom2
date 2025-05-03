const spec = {
  type: 'sankey',
  data: [
    {
      id: 'sankeyData',
      values: [
        {
          links: [
            {
              source: '机会人群',
              target: '高潜用户',
              value: 199999
            },
            {
              source: '高潜用户0',
              target: '高潜用户',
              value: 299999
            },
            {
              source: '首课新单',
              target: '高潜用户',
              value: 399999
            },
            {
              source: '首课新单',
              target: '复购忠诚',
              value: 499999
            },
            {
              source: '副购忠诚',
              target: '高潜用户',
              value: 599999
            },
            {
              source: '其他',
              value: 199999
            },
            {
              target: '首单新客',
              value: 999
            }
          ]
        }
      ]
    }
  ],
  dataId: 'sankeyData',
  categoryField: 'name',
  valueField: 'value',
  sourceField: 'source',
  targetField: 'target',
  // nodeAlign: 'justify',

  dropIsolatedNode: false,
  nodeGap: 2,
  nodeWidth: 200,

  // nodeHeight: 100,
  equalNodeHeight: true,
  linkOverlap: 'center',

  title: {
    text: 'How energy is converted or transmitted before being consumed or lost',
    subtext: 'Data: Department of Energy & Climate Change via Tom Counsell',
    subtextStyle: {
      fontSize: 12
    }
  },
  label: {
    visible: false,
    style: {
      fontSize: 10
    }
  },
  node: {
    state: {
      hover: {
        stroke: '#333333'
      },
      selected: {
        lineWidth: 1,
        brighter: 1,
        fillOpacity: 0.1
      }
    },
    style: {
      fill: '#1664FF',
      fillOpacity: 0,
      lineWidth: 1,
      stroke: '#1664FF',
      html: (datum, a, c) => {
        const color = '#1664FF';
        const hasSource = datum.targetLinks && datum.targetLinks.length;

        return {
          style: ({ width, height }) => {
            return {
              'border-right': `8px solid ${color}`,
              width: `${width}px`,
              height: `${height}px`,
              background: hasSource ? color : 'transparent'
            };
          },
          dom: `<div style="margin: 4px 0 0 10px;">
              <button style="
              margin:0;
              font-weight:500;
              line-height: 18px;
              font-size:12px;
              color:#646475;
              ">${datum.key}</button>
              <p style="margin:0;font-weight: 700;
              font-size: 20px;
              line-height: 28px;
              color: ${hasSource ? '#fff' : '#1d1d2e'};">${datum.value}</p>
            </div>`
        };
      }
    }
  },
  link: {
    style: {
      fill: '#1664FF'
    },
    state: {
      hover: {
        fillOpacity: 1
      },
      selected: {
        fill: '#1664FF',
        stroke: '',
        lineWidth: 1,
        brighter: 1,
        fillOpacity: 0.2
      }
    }
  }
};