<script setup lang="ts">
import { reactive, ref } from 'vue'
import { v1, v4 } from 'uuid';

const input = ref('Hello World!')
const output = reactive({
  v1: '',
  v4: '',
})

const submit = () => {
  output.v1 = v1();
  output.v4 = v4();
}
</script>

<template>
  <div class>
    <h1 class="text-3xl">UUID Generator</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div>
        <button
          @click="submit"
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Generate</button>
      </div>
      <div class="space-y-4">
        <div>
          <label>UUID v1</label>
          <input type="text" v-model="output.v1" readonly class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100" />
        </div>
        <div>
          <label>UUID v4</label>
          <input type="text" v-model="output.v4" readonly class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono bg-gray-100" />
        </div>
      </div>
    </div>
  </div>
</template>
