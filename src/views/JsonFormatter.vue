<script setup lang="ts">
import { ref, onMounted, TextareaHTMLAttributes } from 'vue'
import Copy from '../icons/Copy.vue'

const input = ref('{"message": "Hello World!", "cities": ["Medan", "Bontang", "Bandung", "Jogjakarta"]}')
const output = ref('')
const error = ref('')

const indentation = ref('spaces') // or tabs
const spaces = ref(2)

const submit = () => {
  try {
    error.value = ''
    output.value = ''

    if (!input.value.length) return

    const whitespace = indentation.value === 'spaces' ? ' ' : '\t'
    output.value = JSON.stringify(JSON.parse(input.value), null, whitespace.repeat(spaces.value))
  } catch (e) {
    error.value = e.message
  }
}

const copy = () => navigator.clipboard.writeText(output.value)
</script>

<template>
  <div class>
    <h1 class="font-normal text-2xl text-darkBlue uppercase">JSON Formatter</h1>
    <div class="border-b-2 border-gray mb-8 mt-2"></div>
    <div class="flex flex-col gap-4">
      <div>
        <textarea
          v-model="input"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="8"
        ></textarea>
      </div>
      <div class="flex space-x-6 items-center">
        <button
          @click="submit"
          class="rounded-md my-4 px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Format</button>
        <div class="space-x-2">
          <span>Indentation: </span>
          <input type="number" v-model="spaces" min="0" max="10" class="pl-4 rounded-lg border border-gray-300 focus:outline-none p-2 h-10" />
          <select v-model="indentation" class="rounded-lg border border-gray-300 focus:outline-none p-2 h-10">
            <option value="spaces">Spaces</option>
            <option value="tabs">Tabs</option>
          </select>
        </div>
        <div>{{ error }}</div>
      </div>
      <div class="relative">
        <textarea
          v-model="output"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="8"
          readonly
        ></textarea>
        <button
          @click="copy"
          class="absolute top-2 right-2 rounded-lg w-10 p-2 text-black border shadow-lg hover:bg-gray-50 active:bg-white"
          title="Copy to Clipboard"
        >
          <Copy />
        </button>
      </div>
    </div>
  </div>
</template>
