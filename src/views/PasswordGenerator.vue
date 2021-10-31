<script setup lang="ts">
import { reactive, ref } from 'vue'

const output = ref('');

const options = reactive({
  lowercase: true,
  uppercase: true,
  numbers: true,
  length: 64,
});

const submit = () => {
  output.value = '';

  let possible = ''

  if (options.uppercase) {
    possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }
  if (options.lowercase) {
    possible += 'abcdefghijklmnopqrstuvwxyz'
  }

  if (options.numbers) {
    possible += '0123456789'
  }

  for (let i = 0; i < options.length; i++) {
    output.value += possible.charAt(Math.floor(Math.random() * possible.length))
  }
}
</script>

<template>
  <div class>
    <h1 class="text-3xl">Password Generator</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div class="space-y-4">
        <div>
          <label>
            <input type="checkbox" v-model="options.lowercase" />
            Lowercase (a-z)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" v-model="options.uppercase" />
            Uppercase (A-Z)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" v-model="options.numbers" />
            Numbers (0-9)
          </label>
        </div>
        <div>
          <label>
            Length
            <input
              type="number"
              v-model="options.length"
              min="1"
              class="rounded-lg border border-gray-300 focus:outline-none p-2"
            />
          </label>
        </div>
      </div>
      <div class="space-y-4">
        <div>
          <label>Output</label>
          <input
            type="text"
            v-model="output"
            readonly
            class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100"
          />
        </div>
        <button
          @click="submit"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Refresh</button>
      </div>
    </div>
  </div>
</template>
