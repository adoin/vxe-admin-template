<script lang="ts" setup>
import type { EChartsType } from 'echarts'
import * as echarts from 'echarts'
import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

const props = defineProps({
  height: Number,
  options: Object
})

const chartElem = ref<HTMLDivElement>()
let chartInstance: EChartsType | null = null

const loadChart = () => {
  if (!chartInstance) {
    const elem = chartElem.value
    if (elem) {
      chartInstance = echarts.init(elem)
    }
  }
  if (chartInstance) {
    chartInstance.setOption(Object.assign({}, props.options))
  }
}

const winResizeEvent = () => {
  if (chartInstance) {
    chartInstance.resize()
  }
}

watch(
  () => props.options,
  () => {
    loadChart()
  }
)

onMounted(() => {
  loadChart()
  window.addEventListener('resize', winResizeEvent)
})

onBeforeUnmount(() => {
  window.removeEventListener('resize', winResizeEvent)
})
</script>

<template>
  <div ref="chartElem" class="e-charts" :style="{ height: `${height}px` }"></div>
</template>

<style lang="scss" scoped>
.e-charts {
  width: 100%;
  height: 400px;
  background-color: var(--page-layout-body-background-color);
}
</style>
