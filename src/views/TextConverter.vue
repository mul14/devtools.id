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
    <h1 class="font-normal text-2xl text-darkBlue uppercase">Text Converter</h1>
    <div class="border-b-2 border-gray mb-8 mt-2"></div>
    <div class="flex flex-col gap-4">
      <textarea
        v-model="input"
        class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
        rows="8"
      ></textarea>
      <div class="space-x-4">
        <button
          @click="toLowercase"
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Lower Case</button>
        <button
          @click="toUppercase"
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Upper Case</button>
        <button
          @click="toCapitalize"
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Capitalize</button>
        <button
          @click="toSlug"
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Slug</button>
      </div>
    
      <textarea
        v-model="output"
        class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
        rows="8"
        readonly
      ></textarea>
    </div>
  </div>
</template>
