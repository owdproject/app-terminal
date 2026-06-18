<script setup lang="ts">
import Terminal from 'primevue/terminal'
import TerminalService from 'primevue/terminalservice'
import { useTerminalManager } from '@owdproject/core/runtime/composables/useTerminalManager'
import { useRuntimeConfig } from '#imports'
import { onMounted, onBeforeUnmount, computed } from 'vue'

const runtimeConfig = useRuntimeConfig()
const terminal = computed(() => runtimeConfig.public.desktop.terminal)
const terminalManager = useTerminalManager()

const commandHandler = async (text) => {
  const response = await terminalManager.execCommand(text).catch((e) => {
    console.error(e)
    return
  })

  if (response && response.message) {
    TerminalService.emit('response', response.message)
  }
}

onMounted(() => {
  TerminalService.on('command', commandHandler)
})

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler)
})
</script>

<template>
  <DesktopWindow>
    <Terminal
      :welcomeMessage="terminal?.welcomeMessage"
      :prompt="terminal?.prompt"
      aria-label="Terminal"
    />
  </DesktopWindow>
</template>

<style scoped lang="scss">
@import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;500&display=swap');

.p-terminal {
  white-space: pre-wrap;
  font-family: 'JetBrains Mono', 'Cascadia Code', 'Fira Code', 'Consolas', 'Menlo', monospace;
  font-size: 13px;
  line-height: 1.6;
  padding: 6px 8px;
  height: 100%;
  box-sizing: border-box;

  :deep(.p-terminal-input),
  :deep(.p-terminal-prompt-value) {
    font-family: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    background: transparent !important;
    border: none !important;
    outline: none !important;
    padding: 0 !important;
    margin: 0 !important;
    caret-color: currentColor !important;
  }

  :deep(.p-terminal-prompt) {
    font-family: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
  }

  :deep(.p-terminal-response) {
    font-family: inherit !important;
    font-size: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    white-space: pre-wrap;
  }

  :deep(.p-terminal-prompt-container) {
    display: flex;
    align-items: center;
  }
}
</style>
