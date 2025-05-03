const spec = {
        type: 'line',
        data,
        xField: 'x',
        yField: 'y',
        axes: [{
            orient: 'left',
            max: 10
        }],
        markLine: [
            {
                y: 1,
                ...markLineAttr,
                label: {
                    text: 'start',
                    position: 'start without confine',
                    autoRotate: true,
                    ...markLineAttr.label
                },
            },
            {
                y: 2,
                ...markLineAttr,
                label: {
                    text: 'middle',
                    position: 'middle',
                    ...markLineAttr.label
                },
            },
            {
                y: 3,
                ...markLineAttr,
                label: {
                    text: 'end',
                    position: 'end without confine',
                    ...markLineAttr.label
                },

            },
            {
                y: 4,
                ...markLineAttr,
                label: {
                    text: 'insideStartTop',
                    position: 'insideStartTop',
                    ...markLineAttr.label
                },
            },
            {
                y: 5,
                ...markLineAttr,
                label: {
                    text: 'insideStartBottom',
                    position: 'insideStartBottom',
                    ...markLineAttr.label
                },
            },
            {
                y: 6,
                ...markLineAttr,
                label: {
                    text: 'insideMiddleTop',
                    position: 'insideMiddleTop',
                    ...markLineAttr.label
                },
            },
            {
                y: 7,
                ...markLineAttr,
                label: {
                    text: 'insideMiddleBottom',
                    position: 'insideMiddleBottom',
                    ...markLineAttr.label
                },
            },
            {
                y: 8,
                ...markLineAttr,
                label: {
                    text: 'insideEndTop',
                    position: 'insideEndTop',
                    ...markLineAttr.label
                },
            },
            {
                y: 9,
                ...markLineAttr,
                label: {
                    text: 'insideEndBottom',
                    position: 'insideEndBottom',
                    ...markLineAttr.label
                },
            },

        ],
        padding: 20,
        title: {
            text: 'cartesian markLine labelPosition、state、interactive and style callback config'
        }

    };