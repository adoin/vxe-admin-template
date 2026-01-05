import VxeUIPluginExportXLSX from '@vxe-ui/plugin-export-xlsx'

import VxeUIPluginMenu from '@vxe-ui/plugin-menu'
import VxeUIPluginRenderWangEditor from '@vxe-ui/plugin-render-wangeditor'
import VxeUI from 'vxe-pc-ui'
import '@vxe-ui/plugin-render-wangeditor/dist/style.css'

import './config'
// 格式化
import './format'
// 渲染器
import './render'

VxeUI.use(VxeUIPluginMenu)
VxeUI.use(VxeUIPluginExportXLSX)
VxeUI.use(VxeUIPluginRenderWangEditor)
