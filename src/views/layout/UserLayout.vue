<script lang="ts" setup>
import { useAppStore } from '@/store/app'
import AsideView from './AsideView.vue'
import FooterView from './FooterView.vue'
import HeaderView from './HeaderView.vue'
import TopView from './TopView.vue'

const appStore = useAppStore()
</script>

<template>
  <vxe-layout-container :size="appStore.componentsSize">
    <vxe-layout-aside class="py-2 border-r-1 border-[var(--page-layout-border-color)]" :collapsed="appStore.collapseAside" :width="240">
      <aside-view />
    </vxe-layout-aside>
    <vxe-layout-container vertical>
      <vxe-layout-header>
        <header-view />
        <top-view />
      </vxe-layout-header>
      <vxe-layout-body :key="appStore.pageKey" class="px-4 pt-4 pb-0 bg-[var(--page-layout-background-color)]" show-backtop>
        <RouterView />
      </vxe-layout-body>
      <vxe-layout-footer>
        <footer-view />
      </vxe-layout-footer>
    </vxe-layout-container>
  </vxe-layout-container>
</template>
