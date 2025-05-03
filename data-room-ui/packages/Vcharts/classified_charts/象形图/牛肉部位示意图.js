const spec = {
  type: 'pictogram',
  data: {
    id: 'data',
    values: [
      { name: 'Queue', value: 15 },
      { name: 'Langue', value: 35 },
      { name: 'Plat de joue', value: 15 },
      { name: 'Gros bout de poitrine', value: 25 },
      { name: 'Jumeau à pot-au-feu', value: 45 },
      { name: 'Onglet', value: 85 },
      { name: 'Plat de tranche', value: 25 },
      { name: 'Araignée', value: 15 },
      { name: 'Gîte à la noix', value: 55 },
      { name: "Bavette d'aloyau", value: 25 },
      { name: 'Tende de tranche', value: 65 },
      { name: 'Rond de gîte', value: 45 },
      { name: 'Bavettede de flanchet', value: 85 },
      { name: 'Flanchet', value: 35 },
      { name: 'Hampe', value: 75 },
      { name: 'Plat de côtes', value: 65 },
      { name: 'Tendron Milieu de poitrine', value: 65 },
      { name: 'Macreuse à pot-au-feu', value: 85 },
      { name: 'Rumsteck', value: 75 },
      { name: 'Faux-filet', value: 65 },
      { name: 'Côtes Entrecôtes', value: 55 },
      { name: 'Basses côtes', value: 45 },
      { name: 'Collier', value: 85 },
      { name: 'Jumeau à biftek', value: 15 },
      { name: 'Paleron', value: 65 },
      { name: 'Macreuse à bifteck', value: 45 },
      { name: 'Gîte', value: 85 },
      { name: 'Aiguillette baronne', value: 65 },
      { name: 'Filet', value: 95 }
    ]
  },
  nameField: 'name',
  valueField: 'value',
  color: {
    type: 'linear',
    domain: [
      {
        dataId: 'data',
        fields: ['value']
      }
    ],
    range: ['#f51633', '#921319']
  },
  legends: [
    {
      visible: true,
      type: 'color',
      field: 'value',
      orient: 'top'
    }
  ],
  region: [
    {
      roam: true
    }
  ],
  svg: 'cow',
  pictogram: {
    style: {
      fill: {
        field: 'value',
        scale: 'color'
      }
    }
  },
  'Tendron Milieu de poitrine': {
    style: {
      fill: 'orange'
    },
    state: {
      hover: {
        fill: '#FFBF7F'
      }
    }
  }
};