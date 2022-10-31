<script setup lang="ts">
import { ref } from 'vue'
import { encode } from 'js-base64'

const input = ref('Hello World!')
const output = ref('')

const submit = () => {
  output.value = encode(input.value)
}
</script>

<template>
  <div class>
    <h1 class="text-3xl">Base64 Encode</h1>
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
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Encode</button>
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
