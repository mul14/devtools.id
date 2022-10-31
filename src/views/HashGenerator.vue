<script setup lang="ts">
import { reactive, ref } from 'vue'
import md5 from 'crypto-js/md5'
import sha1 from 'crypto-js/sha1'

const input = ref('Hello World!')
const output = reactive({
  md5: '',
  sha1: '',
})

const submit = () => {
  output.md5 = md5(input.value)
  output.sha1 = sha1(input.value)
}
</script>

<template>
  <div class>
    <h1 class="font-normal text-2xl text-darkBlue uppercase">Hash Generator</h1>
    <div class="border-b-2 border-gray mb-8 mt-2"></div>
    <div class="flex flex-col gap-4">
      <div>
        <textarea
          v-model="input"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="3"
        ></textarea>
        <button
          @click="submit"
          class="rounded-md my-4 px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Hash</button>
      </div>
      <div class="space-y-4">
        <div>
          <label>MD5</label>
          <input type="text" v-model="output.md5" readonly class="w-full font-mono rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label>SHA1</label>
          <input type="text" v-model="output.sha1" readonly class="w-full font-mono rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>
    </div>
  </div>
</template>
