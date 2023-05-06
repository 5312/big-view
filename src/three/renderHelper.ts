// 1. renderHelper.js
export default class renderHelper {
  controls: any
  render: any
  requestId: number | null
  renderRequested: boolean
  constructor(controls, THREE, render) {
    this.controls = controls
    this.render = render
    this.requestId = null

    // 增加某种惯性, 让整个画面显得不那么僵硬
    // controls.enableDamping = true
    // 每次材质和纹理更新，触发重新渲
    const callbackFun = this.requestRenderIfNotRequested.bind(this)
    THREE.DefaultLoadingManager.onLoad = callbackFun
    // 各种事件监听
    controls.addEventListener('change', callbackFun)
    window.addEventListener('click', callbackFun)
    window.addEventListener('resize', callbackFun)

    this.renderRequested = false
  }

  requestRenderIfNotRequested() {
    if (!this.renderRequested) {
      this.renderRequested = true
      this.requestId = window.requestAnimationFrame(this.render)
    }
  }

  cancelAnimation() {
    this.requestId && window.cancelAnimationFrame(this.requestId)
  }

  throttle(fn: Function, wait = 16.7) {
    let previous = 0
    return function (this: any, ...args) {
      const now = +new Date()
      if (now - previous > wait || !previous) {
        previous = now
        fn.apply(this, args)
      }
    }
  }
}
