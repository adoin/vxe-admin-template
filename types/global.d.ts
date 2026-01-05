// <editor-fold desc="👇全局类型补丁，不需要引用👇">
declare type Nullable<T> = T | null
declare type ElRef<T extends HTMLElement = HTMLDivElement> = Nullable<T>
declare type EmitType = (event: string, ...args: any[]) => void
declare type Recordable<T = any> = Record<string, T>
declare interface ReadonlyRecordable<T = any> {
  readonly [key: string]: T
}

declare type DeepPartial<T> = {
  [P in keyof T]?: DeepPartial<T[P]>
}
declare type Mutable<
  T extends {
    readonly [key: string]: any
  }
> = {
  -readonly [P in keyof T]: T[P]
}

declare type RequiredByKeys<T, K extends keyof T = keyof T> = Omit<T & Required<Pick<T, K & keyof T>>, never>
declare type PartialByKeys<T, K extends keyof T = keyof T> = Omit<T, K & keyof T> &
  Partial<Pick<T, K & keyof T>> extends infer U
  ? { [K in keyof U]: U[K] }
  : never
declare type DeepPick<T extends Record<string, any>, U extends string> = (
  U extends string
    ? U extends `${infer F}.${infer R}`
      ? (arg: {
          [K in F]: DeepPick<T[F], R>
        }) => void
      : U extends keyof T
        ? (arg: Pick<T, U>) => void
        : (arg: unknown) => void
    : never
) extends (arg: infer Z) => void
  ? Z
  : never

// 选项类型
declare interface IOption<T = any> {
  value: T
  label: string
  color?: string
}

declare interface OptionGroup<T> {
  label?: string
  options: IOption<T>[]
}
declare interface IGG2FA {
  init: (options: {
    baseURL?: string
    challenge: string
    locale?: 'zh-cn' | 'zh-tw' | 'en'
    success: (identityToken: string, challengeId: string) => void
    close: () => void
  }) => void
}

// 树形结构类型
declare type ITreeAble<T, U = void> = U extends void
  ? T & { children?: ITreeAble<T>[] }
  : U extends string
    ? T & { [key in U]?: ITreeAble<T, U>[] }
    : T
declare type WrapID<T extends Recordable> = {
  readonly id: string | number
} & { [K in keyof T]: T[K] }
declare type TimeoutHandle = ReturnType<typeof window.setTimeout>
declare type IntervalHandle = ReturnType<typeof window.setInterval>
declare type GrowToSize<T, N extends number, A extends T[]> = A['length'] extends N ? A : GrowToSize<T, N, [...A, T]>

declare type FixedArray<T, N extends number> = GrowToSize<T, N, []>

declare type SizeValue =
  | 0
  | `${number}px`
  | `${number}rem`
  | `${number}em`
  | `${number}vh`
  | `${number}vw`
  | `${number}%`
// CSS 宽度,高度类型定义
declare type CSSSize = SizeValue | 'auto' | 'inherit' | 'initial' | 'unset'
// </editor-fold>
