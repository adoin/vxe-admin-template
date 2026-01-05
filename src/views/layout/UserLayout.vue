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
    <vxe-layout-aside class="page-aside" :collapsed="appStore.collapseAside" :width="240">
      <aside-view />
    </vxe-layout-aside>
    <vxe-layout-container vertical>
      <vxe-layout-header>
        <header-view />
        <top-view />
      </vxe-layout-header>
      <vxe-layout-body :key="appStore.pageKey" class="page-body" show-backtop>
        <RouterView />
      </vxe-layout-body>
      <vxe-layout-footer>
        <footer-view />
      </vxe-layout-footer>
    </vxe-layout-container>
  </vxe-layout-container>
</template>

<style lang="scss" scoped>
.page-aside {
  padding: 8px 0;
  border-right: 1px solid var(--page-layout-border-color);
}

.page-body {
  padding: 16px 16px 0 16px;
  background-color: var(--page-layout-background-color);
}
</style>
