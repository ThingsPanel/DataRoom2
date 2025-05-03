const spec = {
        type: 'radar',
        data,
        categoryField: 'origin',
        valueField: 'age',
        seriesField: 'type',
        outerRadius: 0.9,
        color: ['#d0a668', 'rgb(85,170,161)', 'rgb(138,112,208)'],
        axes: [
            {
                orient: 'angle',
                domainLine: { visible: true },

                // grid: { visible: true, alignWithLabel: false },
                label: {
                    visible: true,
                    inside: true,
                    autoRotate: true
                },
                tick: {
                    inside: true
                },
                grid: {
                    visible: true,
                    style: {
                        lineDash: [0]
                    },
                    alternateColor: ['#F2F2F2', '#FFFFFF'],
                    alignWithLabel: false // grid does not align with label
                }
            },
            {
                orient: 'radius',
                grid: { visible: true, smooth: true },
                zero: false,
                max: 100,
                label: {
                    visible: true,
                    // inside: true,
                    // autoRotate: true
                }
            }
        ],
        line: {
            visible: false
        },
        markLine: [
            {
                radius: 60,
                radius1: 78,
                angle: 'France',
                ...markLineAttr
            },
            {
                radius: 58,
                radius1: 77,
                angle: 'Luxembourg',
                ...markLineAttr
            },
            {
                radius: 60,
                radius1: 77,
                angle: 'Belgium',
                ...markLineAttr
            },
            {
                radius: 62,
                radius1: 78,
                angle: 'Spain',
                ...markLineAttr
            },
            {
                radius: 61,
                radius1: 77,
                angle: 'Greece',
                ...markLineAttr
            },
            {
                radius: 62,
                radius1: 78,
                angle: 'Italy',
                ...markLineAttr
            },
            {
                radius: 62,
                radius1: 78,
                angle: 'Austria',
                ...markLineAttr
            },
            {
                radius: 59,
                radius1: 75,
                angle: 'Slovakia',
                ...markLineAttr
            },
            {
                radius: 61,
                radius1: 76,
                angle: 'Turkey',
                ...markLineAttr
            },
            {
                radius: 62,
                radius1: 77,
                angle: 'UK',
                ...markLineAttr
            },
            {
                radius: 63,
                radius1: 77,
                angle: 'Australia',
                ...markLineAttr
            },
            {
                radius: 63,
                radius1: 77,
                angle: 'Ireland',
                ...markLineAttr
            },
            {
                radius: 63,
                radius1: 77,
                angle: 'Finland',
                ...markLineAttr
            },
            {
                radius: 64,
                radius1: 77,
                angle: 'Netherlands',
                ...markLineAttr
            },
            {
                radius: 63,
                radius1: 76,
                angle: 'Germany',
                ...markLineAttr
            },
            {
                radius: 65,
                radius1: 77,
                angle: 'Canada',
                ...markLineAttr
            },
            {
                radius: 62,
                radius1: 76,
                angle: 'Slovenia',
                ...markLineAttr
            },
            {
                radius: 65,
                radius1: 77,
                angle: 'Switzerland',
                ...markLineAttr
            },
            {
                radius: 64,
                radius1: 76,
                angle: 'Denmark',
                ...markLineAttr
            },
            {
                radius: 61,
                radius1: 75,
                angle: 'Poland',
                ...markLineAttr
            },
            {
                radius: 65,
                radius1: 77,
                angle: 'Norway',
                ...markLineAttr
            },
            {
                radius: 66,
                radius1: 78,
                angle: 'Israel',
                ...markLineAttr
            },
            {
                radius: 100,
                label: {
                    text: 'Order by length of healthy retirement ->',
                    position: 'arcOuterEnd'
                },
                line: {
                    style: {
                        stroke: 'rgb(85,170,161)',
                        lineWidth: 2,
                        lineDash: [0]
                    }
                },
                endSymbol: {
                    visible: false,
                    style: {
                        fill: 'rgb(85,170,161)'
                    }
                }
            }


        ],
        title: {
            text: 'Countries with the longest healthy retirements',
            textStyle: {
                height: 50,
                lineWidth: 2,
                fill: '#333',
                fontSize: 20,
                fontFamily: 'Times New Roman'
            },
            subtextStyle: {
                character: [
                    {
                        text: 'In the above, the yellow dots represent retirement age, the green dots represent healthy life expectancy, and the purple dots represent regular life expectancy. Starting at the top and going clockwise, countries are ordered by the difference between healthy life expectancy and retirement age.',
                        fontFamily: 'Times New Roman',
                        fontSize: 14,
                        fill: '#333'
                    }
                ]
            }
        },
        legends: {
            visible: true
        }
    };