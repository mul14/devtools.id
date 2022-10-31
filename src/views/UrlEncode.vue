<script setup lang="ts">
import { ref } from 'vue'

const input = ref('http://localhost:8000/post/212 hello world')
const output = ref('')

const submit = () => {
  output.value = encodeURI(input.value)
}
</script>

<template>
  <div class>
    <h1 class="text-3xl">URL Encode</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div>
        <textarea
          v-model="input"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="8"
        ></textarea>
        <button
          @click="submit"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Encode</button>
      </div>
      <div>
        <textarea
          v-model="output"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="8"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>
