<script setup lang="ts">
import Terminal from 'primevue/terminal';
import TerminalService from 'primevue/terminalservice'
import {useTerminalManager} from "@owdproject/core/runtime/composables/useTerminalManager";
import {useAppConfig} from "nuxt/app";
import {onMounted, onBeforeUnmount} from "vue"

const appConfig = useAppConfig()
const terminalManager = useTerminalManager()

const commandHandler = (text) => {
  let response;
  let argsIndex = text.indexOf(' ');
  let command = argsIndex !== -1 ? text.substring(0, argsIndex) : text;

  terminalManager.execCommand(command)

  TerminalService.emit('response', response);
}

onMounted(() => {
  TerminalService.on('command', commandHandler);
})

onBeforeUnmount(() => {
  TerminalService.off('command', commandHandler);
})
</script>

<template>
  <Window>
    <Terminal
        :welcomeMessage="appConfig.terminal.welcomeMessage"
        :prompt="appConfig.terminal.prompt"
        aria-label="Terminal"
    />
  </Window>
</template>

<style scoped lang="scss">
.p-terminal {
  white-space: pre-wrap;
}
</style>