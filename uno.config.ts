import {
  defineConfig,
  presetAttributify,
  presetIcons,
  presetUno,
  transformerDirectives,
  transformerVariantGroup,
} from 'unocss'

export default defineConfig({
  presets: [
    presetUno(),
    presetAttributify(),
    presetIcons({
      scale: 1.2,
      warn: true,
    }),
  ],
  transformers: [
    transformerDirectives(),
    transformerVariantGroup(),
  ],
  shortcuts: {
    // 常用布局
    'flex-center': 'flex items-center justify-center',
    'flex-between': 'flex items-center justify-between',
    'flex-col-center': 'flex flex-col items-center justify-center',

    // 按钮样式
    'btn-base': 'px-4 py-2 rounded cursor-pointer transition-all',
    'btn-primary': 'btn-base bg-blue-500 text-white hover:bg-blue-600',
    'btn-secondary': 'btn-base bg-gray-200 text-gray-700 hover:bg-gray-300',

    // 卡片样式
    'card-base': 'bg-white rounded-lg shadow-sm p-4',
  },
  theme: {
    colors: {
      primary: '#409eff',
      success: '#67c23a',
      warning: '#e6a23c',
      danger: '#f56c6c',
      info: '#909399',
    },
  },
  safelist: [],
})
