import { defineNuxtPlugin } from 'nuxt/app'
import { defineDesktopApp } from '@owdproject/core/kit/defineDesktopApp'
import configAppTerminal from './app.config'

export default defineNuxtPlugin({
  name: 'desktop-app-terminal-register',
  dependsOn: ['pinia'],
  parallel: true,
  async setup(nuxtApp) {
    if (import.meta.server) return
    nuxtApp.hook('app:created', async () => {
      await defineDesktopApp(configAppTerminal)
    })
  },
})
