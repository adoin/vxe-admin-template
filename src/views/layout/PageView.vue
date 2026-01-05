<script lang="ts" setup>
defineProps({
  loading: Boolean,
  loadingText: String,
  padding: {
    type: Boolean,
    default: true
  },
  background: {
    type: Boolean,
    default: true
  }
})
</script>

<template>
  <div class="relative h-full min-w-800px overflow-auto rounded-6px" :class="[{ 'p-4': padding, 'bg-[var(--page-layout-body-background-color)]': background }]">
    <slot></slot>
    <vxe-loading :model-value="loading" :text="loadingText"></vxe-loading>
  </div>
</template>
