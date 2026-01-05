import type { RouteLocationNormalizedLoadedGeneric } from 'vue-router'
import type { UserRouteConfigVO } from '@/api/user'

/**
 * 转换指定路由名称
 * @param route - 路由对象
 * @returns 路由名称字符串
 */
export function routeToMenuName(route: RouteLocationNormalizedLoadedGeneric) {
  return String(route.name)
}

/**
 * 转换路由配置名称
 * @param item - 路由配置对象
 * @returns 路由配置名称
 */
export function routeConfigToMenuName(item: UserRouteConfigVO) {
  return item.routeName
}
