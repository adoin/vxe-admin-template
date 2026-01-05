/// <reference path="./global.d.ts" />

declare interface AError {
  code: number
  message?: string
  retryable?: boolean
  tag?: string
  extra: Recordable<any>
}

declare interface IResponse<T = any> {
  data: T
  error: AError
  trace_id: string
}

declare interface IPage {
  /**
   * 第几页
   */
  page: number
  /**
   * 一页显示的数量
   */
  size: number
}

declare interface WrapList<T> {
  /**
   * 列表
   */
  list: T[]
}

declare interface WrapPage<T> {
  /**
   * 列表
   */
  list: T[]
  /**
   * 当前页码
   */
  page: number
  /**
   * 总页数
   */
  pages?: number
  /**
   * 每页数量
   */
  size: number
  /**
   * 总数量
   */
  total: number
}

declare interface ISchema {
  id: number
  /**
   * 操作人
   */
  operator?: string
  /**
   * 创建人
   */
  create_by?: string
  /**
   * 更新人
   */
  update_by?: string
  /**
   * 更新时间
   */
  update_time?: number
  /**
   * 创建时间
   */
  create_time?: number
  /**
   * 创建人
   */
  creator?: string
  /**
   * 创建人姓名
   */
  creator_name?: string
}
