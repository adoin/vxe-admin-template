<script lang="ts" setup>
import type { VxeFormProps } from 'vxe-pc-ui'
import type { DemoVO} from '@/api/demo';
import { reactive, ref } from 'vue'
import { getPubAdminDemoDetail } from '@/api/demo'

const showPopup = ref(false)
const loading = ref(false)
const detailId = ref('')

const formOptions = reactive<VxeFormProps<DemoVO | null>>({
  titleWidth: 100,
  titleColon: true,
  titleAlign: 'right',
  border: true,
  titleBackground: true,
  data: null,
  items: [
    { field: 'name', title: '名称', span: 12 },
    { field: 'code', title: '编码', span: 12 },
    { field: 'nickname', title: '昵称', span: 12 },
    { field: 'amount', title: '金额', span: 12 },
    { field: 'commenceDate', title: '开工时间', span: 12 },
    { field: 'describe', title: '描述', span: 24 }
  ]
})

const loadDetailInfo = async () => {
  loading.value = true
  formOptions.data = null
  try {
    const res = await getPubAdminDemoDetail({
      id: detailId.value
    })
    const info: DemoVO = res.data
    formOptions.data = info
  } catch {
    // 忽略错误
  } finally {
    loading.value = false
  }
}

defineExpose({
  open(id: string) {
    detailId.value = id
    showPopup.value = true
    loadDetailInfo()
  }
})
</script>

<template>
  <vxe-drawer
    v-model="showPopup"
    confirm-button-text="关闭"
    destroy-on-close
    :loading="loading"
    show-confirm-button
    show-footer
    title="详情"
    width="60vw"
  >
    <vxe-form v-bind="formOptions"></vxe-form>
  </vxe-drawer>
</template>
