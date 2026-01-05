<script lang="ts" setup>
import { ref } from 'vue'
import XEUtils from 'xe-utils'

const dateStr = ref(XEUtils.toDateString(new Date(), 'yyyy'))
</script>

<template>
  <div class="text-center p-2 bg-[var(--page-layout-background-color)]">
    <span>版权所有 ©<vxe-link href="https://vxeui.com/" target="_blank">vxe</vxe-link> 2018-{{ dateStr }}</span>
  </div>
</template>

