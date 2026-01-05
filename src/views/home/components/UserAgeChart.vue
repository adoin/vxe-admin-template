<script lang="ts" setup>
import { ref } from 'vue'
import ECharts from '@/components/ECharts.vue'

const chartOptions = ref()
const loading = ref(false)

const loadData = () => {
  loading.value = true
  setTimeout(() => {
    loading.value = false
    chartOptions.value = {
      tooltip: {
        trigger: 'item'
      },
      legend: {
        orient: 'vertical',
        right: '16',
        top: '16'
      },
      series: [
        {
          name: 'Access From',
          type: 'pie',
          radius: '50%',
          center: ['40%', '50%'],
          data: [
            { value: 148, name: '18岁以下' },
            { value: 735, name: '19~25岁' },
            { value: 1048, name: '26~35岁' },
            { value: 484, name: '35岁以上' }
          ],
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }
      ]
    }
  }, 300)
}

loadData()
</script>

<template>
  <vxe-card :border="false" :loading="loading" :padding="false" title="用户年龄统计" width="100%">
    <template #extra>
      <vxe-button icon="vxe-icon-refresh" mode="text" @click="loadData()"></vxe-button>
    </template>

    <template #default>
      <e-charts :options="chartOptions"></e-charts>
    </template>
  </vxe-card>
</template>
