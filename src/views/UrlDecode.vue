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
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="8"
        ></textarea>
        <button
          @click="submit"
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Decode</button>
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
