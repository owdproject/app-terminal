import { defineNuxtPlugin } from 'nuxt/app'

export default defineNuxtPlugin({
  name: 'app-terminal-playground-launch',
  dependsOn: ['desktop-app-terminal-register'],
  setup(nuxtApp) {
    autoStartPlaygroundApps(nuxtApp, [
      { id: 'org.owdproject.terminal', entry: 'terminal', windowModel: 'main' },
    ])
  },
})
