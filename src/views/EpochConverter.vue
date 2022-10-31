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
    <h1 class="font-normal text-2xl text-darkBlue uppercase">Epoch Converter</h1>
    <div class="border-b-2 border-gray mb-8 mt-2"></div>
    <div class="flex flex-col gap-4">
      <div class='font-mono text-base text-darkBlue'>
        Current epoch:
        <span class="font-mono">{{ currentEpoch }}</span>
      </div>
      <div class="flex">
        <input
          v-model="input"
          class="rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500"
          rows="3"
        />
        <button
          @click="submit"
          class="rounded-r-lg px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Convert</button>
      </div>
      <div class="w-1/2 space-y-4">
        <input
          readonly
          v-model="outputHuman"
          class="w-full rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500"
        />
        <input
          readonly
          v-model="outputIso"
          class="w-full rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500"
        />
      </div>
    </div>
  </div>
</template>
