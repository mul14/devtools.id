<script setup lang="ts">
import { ref } from 'vue'

const input = ref('http://localhost:8000/post/212%20hello%20world')
const output = ref('')

const submit = () => {
  output.value = decodeURI(input.value)
}
</script>

<template>
  <div class>
    <h1 class="text-3xl">URL Decode</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div>
        <textarea
          v-model="input"
          class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono"
          rows="8"
        ></textarea>
        <button
          @click="submit"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Decode</button>
      </div>
      <div>
        <textarea
          v-model="output"
          class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100"
          rows="8"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>
