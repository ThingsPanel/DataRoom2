const spec = {
  type: 'bar',
  width: 1000,
  direction: 'horizontal',
  data: [
    {
      id: 'data',
      values: [
        { industry: 'Agriculture, Forestry, Animal Husbandry and Fishery', gdp: 92582 },
        { industry: 'Industry', gdp: 401644 },
        { industry: 'manufacturing', gdp: 335215 },
        { industry: 'construction industry', gdp: 83383 },
        { industry: 'Wholesale and retail trade', gdp: 114518 },
        { industry: 'Transportation, storage and postal industry', gdp: 49674 },
        { industry: 'accommodation and catering industry', gdp: 17855 },
        { industry: 'financial industry', gdp: 96811 },
        { industry: 'real estate', gdp: 73821 },
        { industry: 'information transmission, software and information technology services', gdp: 1247934 },
        { industry: 'leasing and business services', gdp: 39153 },
        { industry: 'Other industries', gdp: 192831 }
      ],
      fields: {
        gdp: {
          sortIndex: 1,
          sortReverse: true
        }
      }
    }
  ],
  xField: 'gdp',
  yField: 'industry',
  axes: [
    { orient: 'left', type: 'band' },
    { orient: 'bottom', type: 'linear' }
  ],
  title: {
    visible: true,
    text: 'GDP by industry in 2022'
  }
};