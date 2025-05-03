const spec = {
  type: 'wordCloud',
  nameField: 'challenge_name',
  valueField: 'sum_count',
  seriesField: 'challenge_name',
  word: {
    formatMethod: datum => {
      return datum.challenge_name + '...';
    }
  },
  data: {
    name: 'baseData',
    values: dataWordCloud
  }
};