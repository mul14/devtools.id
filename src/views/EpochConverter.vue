<script setup lang="ts">
import { onMounted, reactive, ref } from 'vue'
import dayjs from 'dayjs'

const currentEpoch = ref()

const input = ref(dayjs().unix())
const outputHuman = ref('')
const outputIso = ref('')

const submit = () => {
  outputHuman.value = dayjs.unix(input.value).toString()
  outputIso.value = dayjs.unix(input.value).toISOString()
}

onMounted(() => {
  setInterval(() => currentEpoch.value = dayjs().unix(), 1000)
  submit()
})
</script>

<template>
  <div class>
    <h1 class="text-3xl">Epoch Converter</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div>
        Current epoch:
        <span class="font-mono">{{ currentEpoch }}</span>
      </div>
      <div class="flex">
        <input
          v-model="input"
          class="rounded-l-lg border-l border-t border-b border-gray-300 focus:outline-none p-2 font-mono"
          rows="3"
        />
        <button
          @click="submit"
          class="rounded-r-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Convert</button>
      </div>
      <div class="w-1/2 space-y-4">
        <input
          readonly
          v-model="outputHuman"
          class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100"
        />
        <input
          readonly
          v-model="outputIso"
          class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100"
        />
      </div>
    </div>
  </div>
</template>
