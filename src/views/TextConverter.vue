<script setup lang="ts">
import { ref } from 'vue'

const input = ref('Hello everybody! Welcome to the new world!')
const output = ref('')

const toLowercase = () => output.value = input.value.toLocaleLowerCase()
const toUppercase = () => output.value = input.value.toLocaleUpperCase()
const toCapitalize = () => output.value = input.value.replace(/\b\w/g, (l) => l.toUpperCase())
const toSlug = () => output.value = input.value.toLocaleLowerCase().replace(/\W/g, '-').replace(/\-{2,}/g, '-').replace(/\-$/, '')
</script>

<template>
  <div class>
    <h1 class="text-3xl">Text Converter</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <textarea
        v-model="input"
        class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono"
        rows="8"
      ></textarea>
      <div class="space-x-4">
        <button
          @click="toLowercase"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Lower Case</button>
        <button
          @click="toUppercase"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Upper Case</button>
        <button
          @click="toCapitalize"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Capitalize</button>
        <button
          @click="toSlug"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Slug</button>
      </div>
    
      <textarea
        v-model="output"
        class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100"
        rows="8"
        readonly
      ></textarea>
    </div>
  </div>
</template>
