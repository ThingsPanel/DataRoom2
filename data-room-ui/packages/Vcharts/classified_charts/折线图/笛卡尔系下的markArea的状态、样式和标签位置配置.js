const spec = {
        type: 'line',
        data,
        xField: 'x',
        yField: 'y',
        axes: [{
            orient: 'left',
            max: 35,
            min: -12
        }],
        markArea: [
            {
                y: 35,
                y1: 32,
                x: 'A',
                x1: 'B',
                ...markAreaAttr,
                label: {
                    text: 'left',
                    position: 'left without confine',
                    autoRotate: true,
                    ...markAreaAttr.label
                },
            },
            {
                y: 29,
                y1: 25,
                x: 'B',
                x1: 'C',
                ...markAreaAttr,
                label: {
                    text: 'right',
                    position: 'right without confine',
                    ...markAreaAttr.label
                },
            },
            {
                y: 23,
                y1: 19,
                x: 'C',
                x1: 'D',
                ...markAreaAttr,
                label: {
                    text: 'top',
                    position: 'top without confine',
                    ...markAreaAttr.label
                },

            },
            {
                y: 17,
                y1: 13,
                x: 'D',
                x1: 'E',
                ...markAreaAttr,
                label: {
                    text: 'bottom',
                    position: 'bottom without confine',
                    ...markAreaAttr.label
                },
            },
            {
                y: 11,
                y1: 7,
                x: 'E',
                x1: 'F',
                ...markAreaAttr,
                label: {
                    text: 'insideLeft',
                    position: 'insideLeft',
                    ...markAreaAttr.label
                },
            },
            {
                y: 5,
                y1: 1,
                x: 'F',
                x1: 'G',
                ...markAreaAttr,
                label: {
                    text: 'insideRight',
                    position: 'insideRight',
                    ...markAreaAttr.label
                },
            },
            {
                y: -1,
                y1: -6,
                x: 'G',
                x1: 'H',
                ...markAreaAttr,
                label: {
                    text: 'insideTop',
                    position: 'insideTop',
                    ...markAreaAttr.label
                },
            },
            {
                y: -8,
                y1: -12,
                x: 'H',
                x1: 'I',
                ...markAreaAttr,
                label: {
                    text: 'insideBottom',
                    position: 'insideBottom',
                    ...markAreaAttr.label
                },
            }

        ],
        padding: 20,
        title: {
            text: 'cartesian markArea labelPosition、state、interactive and style callback config'
        },
        crosshair: {
            xField: {
                visible: false
            }
        },
        line: {
            visible: false
        },
        point: {
            visible: false
        },
        tooltip: {
            mark: {
                visible: false
            },
            dimension: {
                visible: false
            }
        }
    };