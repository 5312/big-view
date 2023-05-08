import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

import renderHelper from './renderHelper'

export class ThreeInit {
  scene: THREE.Scene
  camera: THREE.Camera
  renderer: any
  canvas: HTMLCanvasElement
  controls: any
  renderHelperInstance: any
  width: any
  height: any
  animateHandle: any

  constructor(canvas) {
    this.scene = new THREE.Scene()
    this.camera = null
    this.renderer = null
    this.canvas = canvas
    this.controls
    this.renderHelperInstance = null
    this.width
    this.height
    this.animateHandle
  }
  init() {
    // 获取宽高
    const canvas = this.canvas
    this.width = canvas.clientWidth
    this.height = canvas.clientHeight

    // this.setSkyBackground()
    /* 相机 */
    this.setCamera()
    /* 渲染 */
    this.setCanvasRender()
    /* 轨道控制 */
    this.setControls()
    // 开启动画
    this.renderHelperInstance = new renderHelper(this.controls, THREE, this.animate.bind(this))
    // this.animate()
    /* 灯光 */
    this.setLigth()
    // this.axesHelper()
  }
  setSkyBackground() {
    const path = './cube/' //设置路径
    const format = '.jpg' //设定格式
    const urls = [
      path + 'posx' + format,
      path + 'negx' + format,
      path + 'posy' + format,
      path + 'negy' + format,
      path + 'posz' + format,
      path + 'negz' + format
    ]
    const textureCube = new THREE.CubeTextureLoader().load(urls)
    this.scene.background = textureCube //作为背景贴图
  }
  setCamera() {
    const aspect = this.width / this.height
    this.camera = new THREE.PerspectiveCamera(
      40, //所谓视场就是能够看到的角度范围，人的眼睛大约能够看到180度的视场
      aspect,
      0.1, //属性表示的是从距离相机多远的位置开始渲染
      100000 //属性表示的是距离相机多远的位置截止渲染，如果设置的值偏小，会有部分场景看不到
    )
    // 默认视角
    // this.camera.position.set(0, 10000, 0)
  }
  setCanvasRender() {
    /* 视图控制器 */
    const canvas = this.canvas
    // 创建一个 WebGL 渲染器，Three.js 还提供 <canvas>, <svg>, CSS3D 渲染器。
    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      canvas: canvas,
      alpha: true,
      preserveDrawingBuffer: false,
      logarithmicDepthBuffer: true, // 黑色闪烁 ---
      powerPreference: 'high-performance'
    })
    this.renderer.autoClear = false
    // 渲染，即摄像机拍下此刻的场景
    this.renderer.render(this.scene, this.camera)
    this.renderer.setPixelRatio(window.devicePixelRatio)
    this.renderer.outputEncoding = THREE.sRGBEncoding
    this.renderer.setSize(this.width, this.height)
  }
  setControls() {
    const controls = new OrbitControls(this.camera, this.canvas)
    controls.listenToKeyEvents(window)
    //设置控制器阻尼感  让控制器更真实,必须在动画循环调用 update()
    controls.enableDamping = true // an animation loop is required when either damping or auto-rotation are enabled
    controls.dampingFactor = 0.05

    controls.screenSpacePanning = false

    // controls.minDistance = 100
    // controls.maxDistance = 500

    controls.maxPolarAngle = Math.PI / 2 // - Math.PI / 16

    this.controls = controls
  }
  animate() {
    this.animateHandle = this.renderHelperInstance.requestId
    if (!this.renderHelperInstance.renderRequested) return
    this.renderHelperInstance.renderRequested = false
    if (this.controls) {
      this.controls.update()
    }
    this.renderer.render(this.scene, this.camera)
  }
  setLigth() {
    /* 环境光 */

    //!更贴近自然的户外光照
    const skyColor = '#1981ebcc' // '#1981ebcc' //0xb1e1ff // 天空 蓝色
    const groundColor = '#121410' //'#121410' // 0x607a64db // 地面绿色
    const hemisphereLight = new THREE.HemisphereLight(skyColor, groundColor, 1)
    hemisphereLight.position.set(-250, 150, 0)
    this.scene.add(hemisphereLight)
  }
  onWindowResize() {
    const height = window.innerHeight //- 120
    this.camera.aspect = window.innerWidth / height
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, height)
  }
  axesHelper() {
    const axesHelper = new THREE.AxesHelper(100)
    axesHelper.position.set(0, 0, 0)
    this.scene.add(axesHelper)
  }
}

/**
 * @description 模型旋转方法
 * @author YF
 * @date 14/12/2022
 * @export
 * @param {*} object
 * @param {*} axis
 * @param {*} radians
 *    const xAxis = new THREE.Vector3(1, 0, 0)
      const yAxis = new THREE.Vector3(0, 1, 0)
      const zAxis = new THREE.Vector3(0, 0, 1) //模型、旋转轴和旋转角度（弧度）
      rotateAroundWorldAxis(glb, yAxis, -Math.PI / 2.5)
 */
export function rotateAroundWorldAxis(object, axis, radians) {
  const rotWorldMatrix = new THREE.Matrix4()
  rotWorldMatrix.makeRotationAxis(axis.normalize(), radians)
  rotWorldMatrix.multiply(object.matrix)
  object.matrix = rotWorldMatrix
  object.rotation.setFromRotationMatrix(object.matrix)
}
