<script lang="ts" setup>
import type { VxeFormInstance, VxeFormProps } from 'vxe-pc-ui';
import type { DemoVO} from '@/api/demo';
import { reactive, ref } from 'vue'
import { VxeUI } from 'vxe-pc-ui'
import XEUtils from 'xe-utils'
import { getPubAdminDemoDetail, postPubAdminDemoSaveInfo } from '@/api/demo'

const emit = defineEmits(['save', 'add'])

const formRef = ref<VxeFormInstance<DemoVO>>()

const showPopup = ref(false)
const loading = ref(false)
const detailId = ref('')

const defaultData = {
  _id: '',
  name: '',
  nickname: '',
  code: '',
  amount: null,
  commenceDate: '',
  describe: ''
}

const formOptions = reactive<VxeFormProps<DemoVO | null>>({
  titleWidth: 80,
  titleColon: true,
  titleAlign: 'right',
  data: XEUtils.clone(defaultData, true),
  rules: {
    name: [{ required: true, message: '请输入名称' }]
  },
  items: [
    { field: 'name', title: '名称', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'code', title: '编码', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'nickname', title: '昵称', span: 12, itemRender: { name: 'VxeInput' } },
    { field: 'amount', title: '金额', span: 12, itemRender: { name: 'VxeNumberInput' } },
    { field: 'commenceDate', title: '开工时间', span: 12, itemRender: { name: 'VxeDatePicker' } },
    { field: 'describe', title: '描述', span: 24, itemRender: { name: 'VxeTextarea' } }
  ]
})

const loadDetailInfo = async () => {
  loading.value = true
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

const cancelEvent = () => {
  showPopup.value = false
}

const saveEvent = async () => {
  loading.value = true
  try {
    await postPubAdminDemoSaveInfo({
      ...formOptions.data,
      _id: detailId.value
    })
    VxeUI.modal.message({
      content: '保存成功',
      status: 'success'
    })
    showPopup.value = false
    emit(detailId.value ? 'save' : 'add')
  } catch {
    // 忽略错误
  } finally {
    loading.value = false
  }
}

defineExpose({
  add() {
    detailId.value = ''
    showPopup.value = true
    formOptions.data = XEUtils.clone(defaultData, true)
  },
  edit(id: string) {
    detailId.value = id
    showPopup.value = true
    formOptions.data = XEUtils.clone(defaultData, true)
    loadDetailInfo()
  }
})
</script>

<template>
  <vxe-drawer
    v-model="showPopup"
    destroy-on-close
    :loading="loading"
    show-footer
    :title="detailId ? '编辑' : '新增'"
    width="60vw"
  >
    <vxe-form ref="formRef" v-bind="formOptions"></vxe-form>

    <template #footer>
      <vxe-button @click="cancelEvent">取消</vxe-button>
      <vxe-button :disabled="loading" icon="vxe-icon-repeat" type="reset">重置</vxe-button>
      <vxe-button :disabled="loading" icon="vxe-icon-search" status="primary" type="submit" @click="saveEvent"
        >保存</vxe-button
      >
    </template>
  </vxe-drawer>
</template>
