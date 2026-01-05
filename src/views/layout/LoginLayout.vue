<script lang="ts" setup></script>

<template>
  <vxe-layout-container vertical>
    <vxe-layout-body padding>
      <div class="w-90 mx-auto mt-10vh">
        <RouterView />
      </div>
    </vxe-layout-body>
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
