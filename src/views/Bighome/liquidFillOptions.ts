const value1 = 0.3421

const center1 = ['20%', '40%']
export const liquidFill1 = [
  {
    name: '最外层-虚线',
    type: 'gauge',
    center: center1,
    radius: '45%',
    startAngle: 0,
    endAngle: 360,
    axisLine: {
      show: false
    },
    axisTick: {
      distance: -6,
      length: 12,
      lineStyle: {
        color: '#d37305',
        width: 2,
        type: [23],
        dashOffset: 19,
        opacity: 0.8
      },
      splitNumber: 6
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    pointer: {
      show: false
    }
  },
  {
    type: 'liquidFill',
    radius: '33%',
    z: 5,
    center: center1,
    amplitude: 14,
    backgroundStyle: {
      color: '#0d2d42'
    },
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      }
    ],
    data: [
      value1 + 0.02,
      {
        value: value1 - 0.01,
        direction: 'left'
      },
      value1 - 0.01
    ],
    label: {
      normal: {
        formatter: ''
      }
    },
    outline: {
      show: true,
      borderDistance: 0,
      itemStyle: {
        borderWidth: 2,
        borderColor: '#082f5a'
      }
    }
  }
]

const value2 = 0.4
const center2 = ['50%', '40%']
export const liquidFill2 = [
  {
    name: '最外层-虚线',
    type: 'gauge',
    center: center2,
    radius: '45%',
    startAngle: 0,
    endAngle: 360,
    axisLine: {
      show: false
    },
    axisTick: {
      distance: -6,
      length: 12,
      lineStyle: {
        color: '#54de01',
        width: 2,
        type: [23],
        dashOffset: 19,
        opacity: 0.8
      },
      splitNumber: 6
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    pointer: {
      show: false
    }
  },
  {
    type: 'liquidFill',
    radius: '33%',
    z: 5,
    center: center2,
    amplitude: 14,
    backgroundStyle: {
      color: '#0d2d42'
    },
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      }
    ],
    data: [
      value2 + 0.02,
      {
        value: value2 - 0.01,
        direction: 'left'
      },
      value2 - 0.01
    ],
    label: {
      normal: {
        formatter: ''
      }
    },
    outline: {
      show: true,
      borderDistance: 0,
      itemStyle: {
        borderWidth: 2,
        borderColor: '#082f5a'
      }
    }
  }
]

const value3 = 0.8
const center3 = ['80%', '40%']
export const liquidFill3 = [
  {
    name: '最外层-虚线',
    type: 'gauge',
    center: center3,
    radius: '45%',
    startAngle: 0,
    endAngle: 360,
    axisLine: {
      show: false
    },
    axisTick: {
      distance: -6,
      length: 12,
      lineStyle: {
        color: '#2AECFF',
        width: 2,
        type: [23],
        dashOffset: 19,
        opacity: 0.8
      },
      splitNumber: 6
    },
    splitLine: {
      show: false
    },
    axisLabel: {
      show: false
    },
    pointer: {
      show: false
    }
  },
  {
    type: 'liquidFill',
    radius: '33%',
    z: 5,
    center: center3,
    amplitude: 14,
    backgroundStyle: {
      color: '#0d2d42'
    },
    color: [
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      },
      {
        type: 'linear',
        x: 0,
        y: 0,
        x2: 0,
        y2: 1,
        colorStops: [
          {
            offset: 1,
            color: '#0061A2'
          },
          {
            offset: 0,
            color: '#00FFE5'
          }
        ],
        globalCoord: false
      }
    ],
    data: [
      value3 + 0.02,
      {
        value: value3 - 0.01,
        direction: 'left'
      },
      value3 - 0.01
    ],
    label: {
      normal: {
        formatter: ''
      }
    },
    outline: {
      show: true,
      borderDistance: 0,
      itemStyle: {
        borderWidth: 2,
        borderColor: '#082f5a'
      }
    }
  }
]
