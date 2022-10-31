<script setup lang="ts">
import { reactive, ref } from 'vue'

const output = ref('');

const options = reactive({
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: false,
  spaces: false,
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

  if (options.symbols) {
    possible += `~\`!@#$%^&*()-_+=[]\{}|:;"\\',./?>`
  }

  if (options.spaces) {
    possible += ' '.repeat(6)
  }

  for (let i = 0; i < options.length; i++) {
    output.value += possible.charAt(Math.floor(Math.random() * possible.length))
  }
}
</script>

<template>
  <div class>
    <h1 class="font-normal text-2xl text-darkBlue uppercase">Password Generator</h1>
    <div class="border-b-2 border-gray mb-8 mt-2"></div>
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
            <input type="checkbox" v-model="options.symbols" />
            Symbols (~`!@#$%^&*()-_+=[]\{}|:;"\',./?>)
          </label>
        </div>
        <div>
          <label>
            <input type="checkbox" v-model="options.spaces" />
            Space
          </label>
        </div>
        <div>
          <label>
            Length
            <input
              type="number"
              v-model="options.length"
              min="1"
              class="w-1/3 rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500"
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
            class="w-full font-mono rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500"
          />
        </div>
        <button
          @click="submit"
          class="rounded-md my-4 px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Refresh</button>
      </div>
    </div>
  </div>
</template>
