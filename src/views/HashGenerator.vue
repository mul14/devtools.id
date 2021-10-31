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
    <h1 class="text-3xl">Hash Generator</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div>
        <textarea
          v-model="input"
          class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono"
          rows="3"
        ></textarea>
        <button
          @click="submit"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Hash</button>
      </div>
      <div class="space-y-4">
        <div>
          <label>MD5</label>
          <input type="text" v-model="output.md5" readonly class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100" />
        </div>
        <div>
          <label>SHA1</label>
          <input type="text" v-model="output.sha1" readonly class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100" />
        </div>
      </div>
    </div>
  </div>
</template>
