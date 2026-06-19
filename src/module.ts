import {
  createResolver,
  addComponentsDir,
  addPlugin,
} from '@nuxt/kit'
import { defineDesktopModule } from '@owdproject/core/kit/authoring'
import { registerTailwindPath } from '@owdproject/kit-tailwind/kit/registerTailwindPath'

export default defineDesktopModule({
  meta: {
    name: 'desktop-app-terminal',
    configKey: 'terminal',
  },
  defaults: {
    welcomeMessage: 'Welcome to Open Web Desktop!\nVersion: {desktopVersion} - owdproject.org\n\nTo get started, try using the \'help\' command\n\n',
    prompt: '$ ',
  },
  async setup(options: any, nuxt) {
    const { resolve } = createResolver(import.meta.url)

    const coreVersion = nuxt.options.runtimeConfig.public.desktop?.coreVersion ?? '?.?'
    options.welcomeMessage = options.welcomeMessage.replace('{desktopVersion}', coreVersion)

    addComponentsDir({
      path: resolve('./runtime/components'),
    })

    addPlugin(resolve('./runtime/plugin'))

    registerTailwindPath(
      nuxt,
      resolve('./runtime/components/**/*.{vue,mjs,ts}'),
    )
  },
})
