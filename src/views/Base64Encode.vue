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
    <h1 class="font-normal text-2xl text-darkBlue uppercase">Base64 Encode</h1>
    <div class="border-b-2 border-gray mb-8 mt-2"></div>
    <div class="flex flex-col gap-4">
      <div>
        <textarea
          v-model="input"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="8"
        ></textarea>
        <button
          @click="submit"
          class="rounded-md my-4 px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
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
