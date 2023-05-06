import { Ref, ref, onMounted, onUnmounted } from 'vue'
import { Vector3, Raycaster, Scene, Camera, WebGLRenderer } from 'three'

import { ThreeInit } from '@/three/index'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader'
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader'

export function use3D(element: Ref<HTMLCanvasElement>) {
  const object3d = ref<ThreeInit | null>(null) // 整体对象
  // Dom 元素
  const canvas = ref<HTMLCanvasElement | null>(null)
  const scene = ref<Scene>(null)
  const camera = ref<Camera>(null)
  const renderer = ref<WebGLRenderer>(null)
  const controls = ref(null)
  const spriteObj = ref(null) // 精灵文字

  onMounted(() => {
    const picture = new ThreeInit(element.value)
    picture.init()

    scene.value = picture.scene
    camera.value = picture.camera
    renderer.value = picture.renderer
    controls.value = picture.controls
    canvas.value = picture.canvas
    object3d.value = picture
    // 窗口变化
    window.addEventListener('resize', picture.onWindowResize.bind(picture), false)
    // 点击拾取
    window.addEventListener('click', onMouseDbclick, false)
  })

  /**
   * @description 双击选中
   * @author YF
   * @date 12/12/2022
   * @param {*} event
   */
  function onMouseDbclick(event) {
    if (canvas.value) {
      // 获取元素的大小及其相对于视口的位置
      const getBoundingClientRect = canvas.value.getBoundingClientRect()

      // 屏幕坐标转标准设备坐标
      const x = ((event.clientX - getBoundingClientRect.left) / canvas.value.offsetWidth) * 2 - 1 // 标准设备横坐标
      const y = -((event.clientY - getBoundingClientRect.top) / canvas.value.offsetHeight) * 2 + 1 // 标准设备纵坐标
      const vector = new Vector3(x, y, 1) // 标准设备坐标

      // 标准设备坐标转世界坐标
      const worldVector = vector.unproject(camera.value)
      // 射线投射方向单位向量(worldVector坐标减相机位置坐标)
      const ray = worldVector.sub(camera.value.position).normalize()
      const raycaster = new Raycaster(camera.value.position, ray)

      raycaster.camera = camera.value
      const intersects = raycaster.intersectObjects(scene.value.children)
      /* 排除地图 */
      if (intersects.length != 0) {
        if (intersects[0].object.ID === 702158171) return
        if (intersects[0].object.ID === 192210097) return
        spriteObj.value = intersects[0].object
      }
    }
  }

  /* 解码 */
  const dracoLoader = new DRACOLoader()
  dracoLoader.setDecoderPath('draco/gltf/') // 设置解压库文件路径
  dracoLoader.setDecoderConfig({ type: 'js' }) //使用兼容性强的draco_decoder.js解码器
  dracoLoader.preload()

  const glbload = new GLTFLoader().setPath('./model/')
  glbload.setDRACOLoader(dracoLoader)

  /* 销毁操作 */
  onUnmounted(() => {
    if (!object3d.value) return
    window.removeEventListener('resize', object3d.value.onWindowResize.bind(object3d.value))
    window.removeEventListener('click', onMouseDbclick)

    try {
      removeObj(scene.value)
      scene.value.clear()
      renderer.value.renderLists.dispose()
      renderer.value.dispose()
      renderer.value.forceContextLoss()
      renderer.value.domElement = null
      // webgl 清空报错问题
      renderer.value.content = null

      object3d.value.animateHandle.requestId &&
        cancelAnimationFrame(object3d.value.animateHandle.requestId)

      const gl = renderer.value.domElement.getContext('webgl')
      gl && gl.getExtension('WEBGL_lose_context').loseContext()
      console.log(renderer.value.info) //查看memery字段即可
    } catch (e) {
      console.log(e)
    }
  })

  const removeObj = (obj) => {
    let arr = obj.children.filter((x) => x)
    arr.forEach((item) => {
      if (item.children.length) {
        removeObj(item)
      } else {
        item.geometry.dispose()
        item.material.dispose()
        item.clear()
      }
    })
    obj.clear()
    arr = null
  }

  return {
    scene,
    camera,
    renderer,
    controls,
    spriteObj,
    glbload
  }
}
