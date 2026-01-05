import type { AxiosRequestConfig } from 'axios'
import { requestAjax } from './http'

export interface RoleVO {
  name: string
  createTime: string
}

export function postPubAdminUploadSingle(data: any, options: AxiosRequestConfig) {
  return requestAjax({
    url: '/api/pub/admin/upload/single',
    method: 'post',
    data,
    ...options
  })
}
