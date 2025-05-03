const spec = {
        type: 'radar',
        data,
        angleField: 'x',
        radiusField: 'y',
        radius: 1,
        axes: [{
            orient: 'radius',
            max: 14
        }],
        markLine: [
            {
                radius: 13,
                angle: 'B',
                angle1: 'E',
                ...markLineAttr,
                label: {
                    text: 'arcInnerStart',
                    position: 'arcInnerStart',
                    autoRotate: true,
                    ...markLineAttr.label
                },
            },
            {
                radius: 11,
                angle: 'B',
                angle1: 'E',
                ...markLineAttr,
                label: {
                    text: 'arcInnerEnd',
                    position: 'arcInnerEnd',
                    ...markLineAttr.label
                },
            },
            {
                radius: 9,
                angle: 'B',
                angle1: 'E',
                ...markLineAttr,
                label: {
                    text: 'arcInnerMiddle',
                    position: 'arcInnerMiddle',
                    ...markLineAttr.label
                },

            },
            {
                radius: 7,
                angle: 'B',
                angle1: 'E',
                ...markLineAttr,
                label: {
                    text: 'arcOuterStart',
                    position: 'arcOuterStart',
                    ...markLineAttr.label
                },
            },
            {
                radius: 5,
                angle: 'B',
                angle1: 'E',
                ...markLineAttr,
                label: {
                    text: 'arcOuterEnd',
                    position: 'arcOuterEnd',
                    ...markLineAttr.label
                },
            },
            {
                radius: 3,
                angle: 'B',
                angle1: 'E',
                ...markLineAttr,
                label: {
                    text: 'arcOuterMiddle',
                    position: 'arcOuterMiddle',
                    ...markLineAttr.label
                },
            },
            {
                radius: 1,
                angle: 'B',
                angle1: 'E',
                ...markLineAttr,
                label: {
                    text: 'center',
                    position: 'center',
                    ...markLineAttr.label
                },
            },

        ],
        point: {
            visible: false
        },
        line: {
            visible: false
        },
        crosshair: {
            visible: false
        },
        padding: 20,
        title: {
            text: 'polar markLine labelPosition、state、interactive and style callback config'
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