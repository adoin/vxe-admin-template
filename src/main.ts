import { createApp } from 'vue'
import VxeUIBase from 'vxe-pc-ui'
import VxeUITable from 'vxe-table'
import App from './App.vue'
import i18n from './i18n'
import router from './router'

import pinia from './store'
import PageView from './views/layout/PageView.vue'

import 'virtual:uno.css'
import 'vxe-pc-ui/lib/style.css'

import 'vxe-table/lib/style.css'
import './style/style.scss'

import './plugins'

const app = createApp(App)

app.component('PageView', PageView)

app.use(router).use(i18n).use(pinia).use(VxeUIBase).use(VxeUITable).mount('#app')
