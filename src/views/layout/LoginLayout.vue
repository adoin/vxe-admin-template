<script lang="ts" setup>
import DayNight from 'day-or-night'
import fog from 'vanta/dist/vanta.fog.min'
import { onMounted, onUnmounted, ref, watch } from 'vue'
import { VxeLayoutContainer } from 'vxe-pc-ui'
import { useDayNight } from '@/hooks/useDayNight'

const { isNight } = useDayNight()
const elBgLogin = ref<InstanceType<typeof VxeLayoutContainer>>()
let vantaEntity: any
const vantaSet = () => {
  vantaEntity?.destroy()
  vantaEntity = fog({
    el: elBgLogin.value?.$el,
    mouseControls: true,
    touchControls: true,
    gyroControls: false,
    minHeight: 200.0,
    minWidth: 200.0,
    blurFactor: 0.48,
    highlightColor: `#1ebcff`,
    midtoneColor: `#e36c4a`,
    lowlightColor: `#30d486`,
    baseColor: isNight.value ? `#212b4b` : `#ffebeb`
  })
}
onMounted(() => {
  vantaSet()
})
watch(
  () => isNight.value,
  () => {
    vantaSet()
  }
)
onUnmounted(() => {
  vantaEntity?.destroy()
})
</script>

<template>
  <vxe-layout-container ref="elBgLogin" :style="{ '--vxe-ui-layout-background-color': 'transparent' }" vertical>
    <vxe-layout-body padding>
      <div class="w-90 mx-auto mt-10vh">
        <RouterView class="bg-glass rounded-lg p-4" />
      </div>
    </vxe-layout-body>
    <day-night v-model="isNight" class-name="absolute right-0 top-0 scale-1/3" />
  </vxe-layout-container>
</template>

<style lang="scss">
/* 保留全局样式用于子组件 */
.login-title {
  text-align: center;
  font-size: 28px;
  font-weight: 700;
  line-height: 80px;
  img {
    width: 24px;
    height: 24px;
    margin-right: 8px;
  }
  img,
  span {
    display: inline-block;
    vertical-align: middle;
  }
}
.login-desc {
  text-align: center;
  margin-bottom: 32px;
  font-size: 14px;
  color: #888;
}
</style>
