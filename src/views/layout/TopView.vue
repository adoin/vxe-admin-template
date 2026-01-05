<script lang="ts" setup>
import type { VxeTabsEvents } from 'vxe-pc-ui'
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import XEUtils from 'xe-utils'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { routeToMenuName } from '@/utils'

const route = useRoute()
const router = useRouter()
const appStore = useAppStore()
const userStore = useUserStore()

const navList = computed(() => {
  const routeName = routeToMenuName(route)
  const rest = XEUtils.findTree(userStore.menuAllTreeList, (item) => item.name === routeName, { children: 'children' })
  if (rest) {
    const { nodes } = rest
    return nodes.map((item) => {
      return {
        ...item,
        routerLink: null
      }
    })
  }
  return []
})

const tabList = computed(() => {
  return userStore.userTabs.map((item) => {
    const menuItem = userStore.menuNameMaps[item.name]
    return {
      title: menuItem ? menuItem.title : item.name,
      name: item.name,
      path: item.path,
      routeLink: {
        name: item.routeName,
        query: item.query,
        params: item.params
      },
      permissionCode: item.routeName
    }
  })
})

const selectTab = computed({
  get() {
    return userStore.activeUserTab
  },
  set(value) {
    userStore.activeUserTab = value
  }
})

const tabOptions = ref([
  { label: '关闭其他页签', value: 'closeOther' },
  { label: '关闭左侧页签', value: 'closeLeft' },
  { label: '关闭右侧页签', value: 'closeRight' },
  { label: '重新加载', value: 'refresh' }
])

const backEvent = () => {
  router.back()
}

const refreshEvent = () => {
  appStore.reloadPage()
}

const tabClickEvent: VxeTabsEvents.TabClick = ({ name }) => {
  const item = tabList.value.find((item) => item.name === name)
  if (item) {
    if (item.path !== route.fullPath) {
      router.push(item.path)
    }
  }
}

const tabCloseEvent: VxeTabsEvents.TabClose = ({ name }) => {
  const nextItem = userStore.removeUserTab({ name })
  if (nextItem) {
    if (nextItem.path !== route.fullPath) {
      router.push(nextItem.path)
    }
  }
}

const tabOptionClickEvent = ({ option }) => {
  switch (option.value) {
    case 'closeOther':
    case 'closeLeft':
    case 'closeRight':
      userStore.clearUserTab(option.value)
      break
    case 'refresh':
      refreshEvent()
      break
  }
}
</script>

<template>
  <div class="page-top">
    <div class="page-nav">
      <vxe-tabs
        v-model="selectTab"
        :options="tabList"
        :show-body="false"
        :show-close="tabList.length > 1"
        type="round-card"
        @tab-click="tabClickEvent"
        @tab-close="tabCloseEvent"
      >
        <template #tab-suffix>
          <vxe-pulldown
            :options="tabOptions"
            show-popup-shadow
            transfer
            trigger="click"
            @option-click="tabOptionClickEvent"
          >
            <template #default>
              <vxe-button icon="vxe-icon-ellipsis-v" mode="text"></vxe-button>
            </template>
          </vxe-pulldown>
        </template>
      </vxe-tabs>
    </div>
    <div class="page-breadcrumb">
      <div class="page-breadcrumb-left">
        <vxe-button class="back-btn" icon="vxe-icon-arrows-left" mode="text" @click="backEvent"></vxe-button>
        <vxe-button class="refresh-btn" icon="vxe-icon-refresh" mode="text" @click="refreshEvent"></vxe-button>
        <vxe-breadcrumb :options="navList"></vxe-breadcrumb>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.page-top {
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  line-height: 40px;
  border-bottom: 1px solid var(--page-layout-border-color);
  .back-btn,
  .refresh-btn {
    font-size: 16px;
    vertical-align: middle;
  }
  .back-btn {
    margin-left: 8px;
  }
  .refresh-btn {
    margin-right: 12px;
  }
}
.page-nav {
  padding-top: 6px;
  padding-right: 16px;
  ::v-deep(.vxe-tabs--round-card) {
    .vxe-tabs-header--item-wrapper {
      padding: 0 8px;
    }
  }
}
.page-breadcrumb {
  display: flex;
  flex-direction: row;
  .page-breadcrumb-left {
    flex-grow: 1;
  }
  .page-breadcrumb-right {
    flex-shrink: 0;
    padding-right: 16px;
  }
}
</style>
