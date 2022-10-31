<script setup lang="ts">
import { ref } from 'vue'
import sha1 from 'sha1'

const input = ref('admin')
const output = ref('d033e22ae348aeb5660fc2140aec35850c4da997')

const submit = () => {
  output.value = sha1(input.value).toString()
}
</script>

<template>
  <div class>
    <h1 class="font-normal text-2xl text-darkBlue uppercase">SHA1 Hash</h1>
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
        >SHA1 Hash</button>
      </div>
      <div>
        <textarea
          v-model="output"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100"
          rows="8"
          readonly
        ></textarea>
      </div>
    </div>
  </div>
</template>
