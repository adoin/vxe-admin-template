<script lang="ts" setup>
import { ref, watch } from 'vue'
import { onBeforeRouteUpdate, useRoute } from 'vue-router'
import XEUtils from 'xe-utils'
import { useAppStore } from '@/store/app'
import { useUserStore } from '@/store/user'
import { routeToMenuName } from '@/utils'

const route = useRoute()
const appStore = useAppStore()
const userStore = useUserStore()

const currRouteName = ref('')

const updateSelectMenu = () => {
  XEUtils.eachTree(userStore.menuTreeList, (item) => {
    if (item.routerLink && item.routerLink.name === route.name) {
      currRouteName.value = routeToMenuName(route)
    }
  })
}

onBeforeRouteUpdate(() => {
  setTimeout(() => updateSelectMenu())
})

watch(route, () => {
  updateSelectMenu()
})

watch(
  () => userStore.menuTreeList,
  () => {
    updateSelectMenu()
  }
)

updateSelectMenu()
</script>

<template>
  <div class="aside-view flex flex-col h-full overflow-hidden">
    <div class="flex flex-row items-center shrink-0 px-4 py-2">
      <img class="block w-30px h-30px" src="@/assets/logo.png" />
      <vxe-link v-if="!appStore.collapseAside" class="pl-2 font-bold text-18px overflow-hidden text-ellipsis whitespace-nowrap" href="/">Vxe 后台管理系统模板v4</vxe-link>
    </div>
    <div class="grow overflow-y-auto overflow-x-hidden">
      <VxeMenu v-model="currRouteName" collapse-fixed :options="userStore.menuTreeList" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.aside-view {
  ::-webkit-scrollbar {
    width: 8px;
    height: 8px;
  }
  ::-webkit-scrollbar-thumb {
    border-radius: 5px;
  }
}

[data-vxe-ui-theme='light'] {
  .aside-view {
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background-color: #ffffff;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #bfbfbf;
    }
    ::-webkit-scrollbar-thumb:hover,
    ::-webkit-scrollbar-thumb:action {
      background-color: #787878;
    }
  }
}

[data-vxe-ui-theme='dark'] {
  .aside-view {
    ::-webkit-scrollbar-track,
    ::-webkit-scrollbar-corner {
      background-color: #151518;
    }
    ::-webkit-scrollbar-thumb {
      background-color: #bfbfbf;
    }
    ::-webkit-scrollbar-thumb:hover,
    ::-webkit-scrollbar-thumb:action {
      background-color: #a3a6ad;
    }
  }
}
</style>
