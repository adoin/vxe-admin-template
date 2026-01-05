<script lang="ts" setup>
import StatisticsModule from './components/StatisticsModule.vue'
import TodoModule from './components/TodoModule.vue'
import UserAgeChart from './components/UserAgeChart.vue'
import UserPvChart from './components/UserPvChart.vue'
</script>

<template>
  <PageView :background="false" class="overflow-x-hidden" :padding="false">
    <vxe-row :gutter="[16, 16]" wrap>
      <vxe-col span="24">
        <statistics-module />
      </vxe-col>
      <vxe-col span="24">
        <todo-module />
      </vxe-col>
      <vxe-col span="12">
        <user-pv-chart />
      </vxe-col>
      <vxe-col span="12">
        <user-age-chart />
      </vxe-col>
    </vxe-row>
  </PageView>
</template>
