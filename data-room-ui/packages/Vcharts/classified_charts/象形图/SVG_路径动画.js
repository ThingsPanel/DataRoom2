const spec = {
  type: 'pictogram',
  height: 500,
  data: {
    id: 'data',
    values: []
  },
  region: [
    {
      roam: { blank: true }
    }
  ],
  customMark: [
    {
      type: 'symbol',
      parent: 'pictogram',
      name: 'people',
      animation: true,
      style: {
        x: 110.6189462165178,
        y: 456.64349563895087,
        size: 40,
        fill: '#a10000',
        symbolType:
          'M-.345.005c0-.2216.1784-.4.4-.4s.4.1784.4.4c0 .0169-.001.0336-.0031.05H-.3419c-.002-.0164-.0031-.0331-.0031-.05zm.9096-.0267c-.0062-.0149-.0096-.0312-.0096-.0483 0-.0693.0558-.125.125-.125s.125.0558.125.125a.1268.1268 90 01-.0015.0197l.0095.0055-.1565.271-.0016-.0009V.255h-.2873c-.0732.0915-.1859.15-.3127.15s-.2395-.0585-.3127-.15H-.545v-.0281l-.0009.0004-.0887-.1903C-.6709.0153-.695-.0245-.695-.07c0-.0693.0558-.125.125-.125S-.445-.1393-.445-.07c0 .009-.0009.0178-.0028.0263L-.4017.055h.9221z'
      }
    },
    {
      type: 'line',
      name: 'route',
      parent: 'pictogram',
      style: {
        stroke: '#a10000',
        lineWidth: 2,
        lineDash: [4, 4],
        points
      }
    }
  ],
  svg: 'route',
  nameField: 'name',
  valueField: 'value'
};