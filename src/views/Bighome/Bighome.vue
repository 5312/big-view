<script setup lang="ts">
import { Ref, ref, nextTick, onMounted } from 'vue'
import { useDesign } from '@/hooks/web/useDesign'
import { Echart } from '@/components/Echart'
import { EChartsOption } from 'echarts'
import * as THREE from 'three'
import { use3D } from '@/three/use3D'
import { liquidFill1, liquidFill2, liquidFill3 } from './liquidFillOptions'
import moment from 'moment'
import videojs from 'video.js/dist/video.min'
import 'video.js/dist/video-js.min.css'

const { getPrefixCls } = useDesign()

const prefixCls = getPrefixCls('big')

const canvas = ref<HTMLCanvasElement | null>(null)
/*  */
nextTick(() => {
  // ts-ignore
  window.WIDGET = {
    CONFIG: {
      modules: '2034',
      background: '5',
      tmpColor: '4A9EF2',
      tmpSize: '16',
      cityColor: '4A9EF2',
      citySize: '16',
      aqiColor: '4A9EF2',
      aqiSize: '16',
      weatherIconSize: '24',
      alertIconSize: '18',
      padding: '10px 10px 10px 10px',
      shadow: '0',
      language: 'auto',
      fixed: 'false',
      vertical: 'top',
      horizontal: 'left',
      key: '434affc50efe415fb2e634782a925f76'
    }
  }
  var script = document.createElement('script')
  script.type = 'text/javascript'
  script.src = 'https://widget.qweather.net/simple/static/js/he-simple-common.js?v=2.0'
  document.getElementsByTagName('head')[0].appendChild(script)
})
/* 查询时间 */
const realTime = ref<Date>()
const update = () => {
  realTime.value = new Date()
  requestAnimationFrame(update)
}
requestAnimationFrame(update)
/* end */
const key = ref(Math.random())
nextTick(() => {
  key.value = Math.random()
})
const { scene, camera, glbload } = use3D(canvas as Ref<HTMLCanvasElement>)

glbload.load(
  'longmenzhen01.glb',
  function (loadedModel) {
    scene.value.add(loadedModel.scene)
    // 默认视角
    camera.value.position.set(0, 10000, 0) // 相机位置

    addPoint({ x: -2000, y: 32, z: 16 }, 1000, 0xf09393, './cube/alarm1.png')
    addPoint({ x: 2000, y: 132, z: 116 }, 500, 0xf09393, './cube/alarm1.png')
    addPoint({ x: 2000, y: 132, z: 2000 }, 500, 0xffff00, './cube/alarm2.png')

    const map = new THREE.TextureLoader().load('./cube/Camera.png')
    const material = new THREE.SpriteMaterial({ map: map })
    const sprite = new THREE.Sprite(material)
    sprite.scale.set(80, 80, 80)
    sprite.position.set(-1500, 32, 1200)
    scene.value.add(sprite)

    const s1 = sprite.clone()
    s1.position.set(-4000, 32, 1000)
    scene.value.add(s1)
    const s2 = sprite.clone()
    s2.position.set(1000, 32, 1000)
    scene.value.add(s2)
  },
  function (xhr) {
    console.log(parseInt(((xhr.loaded / xhr.total) * 100).toFixed(0)))
  },
  function (err) {
    console.log(err)
  }
)

/* 发光点 */
function addPoint({ x, y, z }, radius, color, url) {
  let geometry = new THREE.SphereGeometry(5, 32, 16)
  let material = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    opacity: 1
  })
  let mesh = new THREE.Mesh(geometry, material)
  mesh.position.set(x, y, z)
  scene.value.add(mesh)
  let textureLoader1 = new THREE.TextureLoader()
  // 加载贴图
  let texture = textureLoader1.load(url)
  let spriteMaterial = new THREE.SpriteMaterial({
    map: texture,
    color: color //0xf09393
  })
  let sprite = new THREE.Sprite(spriteMaterial)
  sprite.scale.set(radius, radius, radius)
  mesh.add(sprite)
} // 在onMounted阶段进行初始化

onMounted(() => {
  initVideoSourc()
})

function initVideoSourc() {
  videojs(
    'my-video',
    {
      bigPlayButton: false,
      textTrackDisplay: false,
      posterImage: false,
      errorDisplay: false,
      controlBar: true // ...其他配置参数
    },
    function (this: any) {
      this.play()
    }
  )
}
const pieOptions: EChartsOption = {
  tooltip: {
    trigger: 'item'
  },
  legend: {
    orient: 'vertical',
    top: '5%',
    right: '0%',
    textStyle: {
      color: '#fff'
    }
  },
  series: [
    {
      name: 'Access From',
      type: 'pie',
      radius: ['40%', '70%'],
      avoidLabelOverlap: false,
      label: {
        show: false,
        position: 'center'
      },
      emphasis: {
        label: {
          show: true,
          fontSize: 40,
          fontWeight: 'bold'
        }
      },
      labelLine: {
        show: false
      },
      data: [
        { value: 1048, name: '森草原防火' },
        { value: 580, name: '非法采矿' },
        { value: 484, name: '防汛监测' },
        { value: 300, name: '违规搭建' }
      ]
    }
  ]
}
const lineOptions: EChartsOption = {
  title: {
    subtext: '次数',
    left: '10%'
  },
  grid: {
    top: '18%',
    left: '14%',
    bottom: '10%'
  },
  xAxis: [
    {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
      axisLine: {
        show: true
      },
      interval: 0,
      splitLine: {
        show: true,
        lineStyle: {
          color: '#78777799'
        }
      }
    }
  ],
  yAxis: {
    type: 'value',
    max: 500,
    axisLine: {
      show: true
    },
    splitLine: {
      show: false
    }
  },
  series: [
    {
      data: [208, 247, 283, 272, 317, 269, 209, 241, 309, 295, 188, 212],
      type: 'line',
      areaStyle: { color: '#49dce46e' },
      smooth: true,
      symbolSize: 8,
      label: {
        show: true,
        color: '#fff',
        position: 'top'
      },
      lineStyle: {
        color: '#49dce4'
      },
      emphasis: {
        focus: 'series'
      }
    }
  ]
}
const water: any = {
  // backgroundColor: '#0d2d42',
  title: [
    //
    {
      text: '34.21%',
      top: '33%',
      left: '12%',
      textStyle: {
        fontSize: '16',
        fontWeight: '500',
        color: '#fff',
        fontFamily: 'Courier New'
      }
    },
    {
      text: '2220',
      bottom: '19%',
      left: '11.8%',
      textStyle: {
        fontSize: '25',
        fontWeight: '400',
        color: '#fa8801',
        fontFamily: 'Courier New'
      }
    },
    {
      text: '待处理',
      bottom: '5%',
      left: '12%',
      textStyle: {
        fontSize: '18',
        fontWeight: '400',
        color: '#6991fa',
        fontFamily: 'Courier New'
      }
    },
    //
    {
      text: '40%',
      top: '33%',
      left: '45%',
      textStyle: {
        fontSize: '16',
        fontWeight: '500',
        color: '#fff',
        fontFamily: 'Courier New'
      }
    },
    {
      text: '1234',
      bottom: '19%',
      left: '41%',
      textStyle: {
        fontSize: '25',
        fontWeight: '400',
        color: '#54de01',
        fontFamily: 'Courier New'
      }
    },
    {
      text: '处理中',
      bottom: '5%',
      left: '42%',
      textStyle: {
        fontSize: '18',
        fontWeight: '400',
        color: '#6991fa',
        fontFamily: 'Courier New'
      }
    },
    //
    {
      text: '80%',
      top: '33%',
      left: '75%',
      textStyle: {
        fontSize: '16',
        fontWeight: '500',
        color: '#fff',
        fontFamily: 'Courier New'
      }
    },
    {
      text: '3456',
      bottom: '19%',
      left: '72%',
      textStyle: {
        fontSize: '25',
        fontWeight: '400',
        color: '#2AECFF',
        fontFamily: 'Courier New'
      }
    },
    {
      text: '处理完成',
      bottom: '5%',
      left: '70.5%',
      textStyle: {
        fontSize: '18',
        fontWeight: '400',
        color: '#6991fa',
        fontFamily: 'Courier New'
      }
    }
  ],
  series: [...liquidFill1, ...liquidFill2, ...liquidFill3]
}
</script>
<template>
  <div :class="`${prefixCls}`">
    <!-- 顶部 -->
    <div
      :class="`${prefixCls}__header  w-full z-10  absolute top-0 h-17 px-4 items-center flex flex-row justify-between`"
    >
      <div class="fonts text-2xl">
        <div style="width: 200px">{{
          moment(realTime).format('YYYY MM DD  &nbsp;  HH:mm:ss')
        }}</div>
      </div>
      <div class="text-2xl">
        <div id="he-plugin-simple"></div>
      </div>
    </div>
    <canvas ref="canvas" id="canvas"></canvas>
    <!--  -->
    <div class="position-card h-34 left-10 top-30">
      <div class="title-left h-8 mb-2 leading-8 pl-2 font-bold">报警累计</div>
      <div class="bodys h-28 px-4">
        <div class="center center-1 h-full flex felx-row justify-between text-center">
          <div class="flex-block w-1/3">
            <div>报警烟火</div>
            <div class="text-my-1">249</div>
          </div>
          <div class="flex-block w-1/4 ml-2 mr-1">
            <div>环保排放</div>
            <div class="text-my-2">18</div>
          </div>
          <div class="flex-block w-1/4 ml-1 mr-2">
            <div>非法开采</div>
            <div class="text-my-3">65</div>
          </div>
          <div class="flex-block w-1/4">
            <div>防汛</div>
            <div class="text-my-4"> 124</div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="position-card h-34 left-10 top-80">
      <div class="title-left h-8 mb-2 leading-8 pl-2 font-bold">最新报警信息</div>
      <div class="bodys h-52">
        <div class="center center-2 center-bg h-full px-4 py-2 overflow-hidden overflow-y-auto">
          <div class="h-8 p-1">
            <div class="text-white linebg-1 h-full flex felx-row justify-around font-xs">
              <div>监测点位</div>
              <div>报警时间</div>
            </div>
          </div>
          <div class="h-8 p-1" v-for="(x, y) in [1, 2, 3, 4, 5]" :key="y">
            <div
              class="text-white linebg-2 h-full text-xs flex felx-row justify-between pr-1 items-center"
            >
              <div class="flex flex-row items-center h-full">
                <div class="linenumbg w-6 h-full mr-1">
                  <div class="w-full h-full serial-number font-black" :text="x"></div>
                </div>
                <div class="text-xs">某某企业排污口</div>
              </div>
              <div class="text-green-400">05-03 20:49:59</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!--  -->
    <!--  -->
    <div class="position-card left-10 top-150">
      <div class="title-left h-8 mb-2 leading-8 pl-2 font-bold">当日处理进度</div>
      <div class="bodys">
        <div class="center center-bg h-full">
          <Echart :options="water" :height="200" />
        </div>
      </div>
    </div>
    <!--  -->
    <!--  -->
    <div class="position-card right-10 top-30">
      <div class="title-right text-right h-8 mb-2 leading-8 pr-2 font-bold">视频监控</div>
      <div class="bodys h-52 center-bg">
        <div class="center videocenter h-full w-full flex flex-row">
          <!-- <img class="h-full w-full" src="@/assets/imgs/jiankong.png" alt="" /> -->
          <video
            v-for="(x, y) in [
              'https://hls01open.ys7.com/openlive/4d4a5ff6f97f4e9cb299bb830140757e.m3u8',
              '2',
              '3',
              '4',
              '5',
              '6',
              '7',
              '8',
              '9'
            ]"
            :key="y"
            id="my-video"
            class="video-js vjs-default-skin w-1/3 h-1/3"
            autoplay
            muted
            preload="auto"
            width="100%"
            poster="@/assets/imgs/AlarmCountBg.png"
          >
            <!-- // src视频流地址 // type视频类型 -->
            <source :src="x" style="width: 100%" :key="x" />
          </video>
        </div>
      </div>
    </div>
    <!--  -->
    <div class="position-card right-10 top-95">
      <div class="title-right text-right h-8 mb-2 leading-8 pr-2 font-bold">监测点位</div>
      <div class="bodys h-46">
        <div class="center center-bg h-full">
          <Echart :options="pieOptions" :height="200" />
        </div>
      </div>
    </div>
    <!--  -->
    <div class="position-card right-10 top-155">
      <div class="title-right text-right h-8 mb-2 leading-8 pr-2 font-bold">报警趋势分析</div>
      <div class="bodys">
        <div class="center center-bg h-full">
          <Echart :options="lineOptions" :height="200" />
        </div>
      </div>
    </div>
    <!--  -->
  </div>
</template>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-big';

@font-face {
  font-family: UnidreamLED;
  // /***兼容ie9***/
  src: url('@/assets/fonts/UnidreamLED.eot');
  src: url('@/assets/fonts/UnidreamLED.eot?#iefix') format('embedded-opentype'),
    /***兼容ie6-ie8***/ url('@/assets/fonts/UnidreamLED.woff') format('woff'), local('UnidreamLED'),
    url('@/assets/fonts/UnidreamLED.woff');
  // /***默认使用本地的***/
}

.fonts {
  font-family: UnidreamLED;
  color: #4a9ef2;
}

.@{prefix-cls} {
  position: relative;
  width: 100%;
  height: 100%;

  &__header {
    color: #fff;
    background: url('@/assets/imgs/top1920.png') top left / 100% 100% no-repeat;
  }

  #canvas {
    width: 100%;
    height: 100%;
  }

  .position-card {
    position: absolute;
    width: 400px;

    @fontSize: 18px;

    .title-left {
      font-size: @fontSize;
      color: #b2e2fc;
      background: url('@/assets/imgs/TitleBgLeft.png') top left / 60% 100% no-repeat;
    }

    .title-right {
      font-size: @fontSize;
      color: #b2e2fc;
      background: url('@/assets/imgs/TitleBgRight.png') top right / 60% 100% no-repeat;
    }

    .bodys {
      .videocenter {
        flex-wrap: wrap;
        align-content: center;
        justify-content: space-between;
        align-items: center;

        video {
          object-fit: cover;
          border: 1px solid #000;
        }
      }

      .center-1 {
        .flex-block {
          font-size: 14px;
          background: url('@/assets/imgs/AlarmCountBg.png') top left / 100% 100% no-repeat;

          & > div:nth-child(1) {
            padding: 5px 10px;
            color: #b2e2fc;
            background-color: #3b4a8bb5;
          }

          & > div:nth-child(2) {
            font-size: 35px;
            line-height: 5rem;
          }
        }
      }

      .center-bg {
        background-color: #0000005e;
      }

      .center-2 {
        .linebg-1 {
          background: url('@/assets/imgs/linebg-1.png') top left / 100% 100% no-repeat;
        }

        .linebg-2 {
          background: url('@/assets/imgs/linebg-2.png') top left / 100% 100% no-repeat;

          .linenumbg {
            background: #0096ff36;
          }

          .serial-number {
            position: relative;
            font-size: 18px;
            line-height: 1rem;
            // color: rgba(0, 240, 255, 1%);
            // text-align: center;

            &::before {
              position: absolute;
              z-index: 10;
              margin-top: 5px;
              margin-left: 5px;
              line-height: 1rem;
              color: #00d0ff;
              content: attr(text);
              // -webkit-mask: linear-gradient(4deg, transparent, #00d0ff);
              mask: linear-gradient(4deg, transparent, #00d0ff);
            }
          }
        }

        & > div:first-child {
          background: url('@/assets/imgs/Rectangle_8.png') top left / 100% 5% no-repeat,
            url('@/assets/imgs/Rectangle_8.png') bottom left / 100% 5% no-repeat;
        }
      }
    }
  }
}

.text-my-1 {
  color: #97b1fc;
}

.text-my-2 {
  color: #e8512e;
}

.text-my-3 {
  color: #ffc659;
}

.text-my-4 {
  color: #00c0ff;
}
</style>
