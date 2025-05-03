const spec = {
  type: 'wordCloud',
  width: 500,
  nameField: 'challenge_name',
  valueField: 'sum_count',
  seriesField: 'challenge_name',
  wordCloudConfig: {
    drawOutOfBound: 'clip'
  },
  data: {
    name: 'baseData',
    values: [
      ...dataWordCloud,
      {
        challenge_name: '这个单词特别特别特别特别特别特别特别长',
        sum_count: 150
      }
    ]
  }
};