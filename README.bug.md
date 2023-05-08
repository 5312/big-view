# 生产版报错
`caught TypeError: Cannot read properties of null (reading 'aborted')
 `
 应为 mock问题，取消引入mock即可

# threejs报错
`caught TypeError: 'get' on proxy: property 'modelViewMatrix' is a read-only and non-configurable data property on the proxy target but the proxy did not return its actual value (expected '#<Matrix4>' but got '#<Matrix4>')
  `

threejs 不应用ref 