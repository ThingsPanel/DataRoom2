export const iconList = [
  {
    name: 'arrow-left',
    category: 'arrows',
    id: 'arrow-left' // REMOVED 'arrows-' prefix
  },
  {
    name: 'check',
    category: 'actions',
    id: 'check' // REMOVED 'actions-' prefix
  }
  // Add more icons here as they are added to the ./icons folder
  // For example:
  // {
  //   name: 'close',
  //   category: 'actions',
  //   id: 'close'
  // },
  // {
  //   name: 'arrow-right',
  //   category: 'arrows',
  //   id: 'arrow-right'
  // }
];

export const iconCategories = [
  {
    name: '箭头类',
    value: 'arrows',
    icons: iconList.filter(icon => icon.category === 'arrows')
  },
  {
    name: '操作类',
    value: 'actions',
    icons: iconList.filter(icon => icon.category === 'actions')
  }
  // Add more categories here
]; 