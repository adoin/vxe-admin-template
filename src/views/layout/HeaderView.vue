<script lang="ts" setup>
import type { VxeGlobalI18nLocale, VxePulldownEvents } from 'vxe-pc-ui'
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'

const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const userInfo = computed(() => userStore.userInfo)

const langPullList = ref([
  { label: '中文', value: 'zh-CN' },
  { label: '英文', value: 'en-US' }
])

const langLabel = computed(() => {
  const item = langPullList.value.find((item) => item.value === appStore.language)
  return item ? item.label : appStore.language
})

const userPullList = ref([{ label: '退出登录', value: 'logout' }])

const currTheme = computed({
  get() {
    return appStore.theme
  },
  set(name) {
    appStore.setTheme(name)
  }
})

const currPrimaryColor = computed({
  get() {
    return appStore.primaryColor
  },
  set(color) {
    appStore.setPrimaryColor(color || '')
  }
})

const currCompSize = computed({
  get() {
    return appStore.componentsSize
  },
  set(size) {
    appStore.setComponentsSize(size)
  }
})

const colorList = ref([
  '#409eff',
  '#29D2F8',
  '#31FC49',
  '#3FF2B3',
  '#B52DFE',
  '#FC3243',
  '#FA3077',
  '#D1FC44',
  '#FEE529',
  '#FA9A2C'
])

const sizeOptions = ref([
  { label: '默认', value: '' },
  { label: '中', value: 'medium' },
  { label: '小', value: 'small' },
  { label: '迷你', value: 'mini' }
])

const logoutEvent = () => {
  userStore.logoutServer().then(() => {
    router.push({
      name: 'LoginView'
    })
  })
}

const langOptionClickEvent: VxePulldownEvents.OptionClick = ({ option }) => {
  appStore.setLanguage(option.value as VxeGlobalI18nLocale)
}

const roleOptionClickEvent: VxePulldownEvents.OptionClick = ({ option }) => {
  userStore.changeUserRole(option.value).then(() => {
    // 切换角色默认跳转到第一个有权限的路由
    const defaultHomeMenu = userStore.defaultHomeMenu
    if (defaultHomeMenu) {
      router.push(defaultHomeMenu.routerLink)
    } else {
      router.push({
        name: 'PageError403'
      })
    }
  })
}

const userOptionClickEvent: VxePulldownEvents.OptionClick = ({ option }) => {
  switch (option.value) {
    case 'logout': {
      logoutEvent()
      break
    }
  }
}
</script>

<template>
  <div class="flex flex-row items-center h-50px px-4 border-b-1 border-[var(--page-layout-border-color)]">
    <div class="grow">
      <vxe-button
        class="text-18px"
        :icon="appStore.collapseAside ? 'vxe-icon-menu-unfold' : 'vxe-icon-menu-fold'"
        mode="text"
        @click="appStore.toggleCollapseAside()"
      ></vxe-button>
    </div>
    <div v-if="userInfo" class="flex flex-row shrink-0 items-center">
      <span class="cursor-pointer ml-6">
        <vxe-link href="/admin-template-v3/" status="primary" target="_blank">切换 v3.x 版本</vxe-link>
      </span>

      <span class="cursor-pointer ml-6">
        <vxe-link href="https://github.com/x-extends/vxe-admin-template" icon="vxe-icon-github-fill" target="_blank"
          >Github</vxe-link
        >
        <vxe-link href="https://gitee.com/x-extends/vxe-admin-template" target="_blank">
          <vxe-icon name="gitee-fill" status="error"></vxe-icon>
          <span>Gitee</span>
        </vxe-link>
      </span>

      <span class="cursor-pointer ml-6">
        <vxe-switch
          v-model="currTheme"
          class="align-middle"
          close-label="夜间"
          close-value="dark"
          open-label="白天"
          open-value="light"
          size="mini"
        >
        </vxe-switch>
      </span>

      <span class="cursor-pointer ml-6">
        <vxe-color-picker
          v-model="currPrimaryColor"
          class="switch-primary-color"
          :colors="colorList"
          size="mini"
        ></vxe-color-picker>
      </span>

      <span class="cursor-pointer ml-6">
        <vxe-radio-group
          v-model="currCompSize"
          class="switch-size"
          :options="sizeOptions"
          size="mini"
          type="button"
        ></vxe-radio-group>
      </span>

      <span class="cursor-pointer ml-6">
        <vxe-pulldown
          class="align-middle"
          :options="langPullList"
          show-popup-shadow
          transfer
          trigger="click"
          @option-click="langOptionClickEvent"
        >
          <vxe-button :content="langLabel" icon="vxe-icon-language-switch" mode="text"></vxe-button>
        </vxe-pulldown>
      </span>

      <span v-if="userInfo.roleList && userInfo.roleList.length > 1" class="cursor-pointer ml-6">
        <span class="align-middle">角色：</span>
        <vxe-pulldown
          class="align-middle"
          :options="userInfo.roleList"
          show-popup-shadow
          transfer
          trigger="click"
          @option-click="roleOptionClickEvent"
        >
          <template #default>
            <vxe-text>{{ userInfo.roleName }}</vxe-text>
            <vxe-icon name="caret-down"></vxe-icon>
          </template>
        </vxe-pulldown>
      </span>

      <vxe-pulldown
        class="cursor-pointer ml-6"
        :options="userPullList"
        show-popup-shadow
        transfer
        trigger="click"
        @option-click="userOptionClickEvent"
      >
        <template #default>
          <div class="inline-flex flex-row items-center cursor-pointer">
            <vxe-text>{{ userInfo.nickname || userInfo.name }}</vxe-text>
            <img v-if="userInfo.pictureUrl" class="w-24px h-24px mx-2px" :src="userInfo.pictureUrl" />
            <img v-else class="w-24px h-24px mx-2px" src="@/assets/default-picture.png" />
          </div>
        </template>
      </vxe-pulldown>
    </div>
  </div>
</template>
