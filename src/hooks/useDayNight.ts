import { computed } from 'vue'
import { useAppStore } from '@/store/app'

export const useDayNight = () => {
  const appStore = useAppStore()
  return {
    isNight: computed({
      get: () => appStore.theme === 'dark',
      set: (val) => {
        appStore.setTheme(val ? 'dark' : 'light')
      }
    })
  }
}
