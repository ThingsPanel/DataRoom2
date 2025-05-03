const spec = {
  type: 'wordCloud',
  nameField: 'challenge_name',
  valueField: 'sum_count',
  seriesField: 'challenge_name',
  wordCloudConfig: {
    zoomToFit: {
      shrink: true,
      fontSizeLimitMin: 5
    }
  },
  data: {
    name: 'baseData',
    values: dataWordCloud
  }
};