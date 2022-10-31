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
    <h1 class="font-normal text-2xl text-darkBlue uppercase">UUID Generator</h1>
    <div class="border-b-2 border-gray mb-8 mt-2"></div>
    <div class="flex flex-col gap-4">
      <div>
        <button
          @click="submit"
          class="rounded-md my-4 px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Generate</button>
      </div>
      <div class="space-y-4">
        <div>
          <label class='font-mono'>UUID v1</label>
          <input type="text" v-model="output.v1" readonly class="w-full rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
        <div>
          <label class='font-mono'>UUID v4</label>
          <input type="text" v-model="output.v4" readonly class="w-full rounded-md border-gray-300 py-2 px-4 shadow-custom focus:border-indigo-500 focus:ring-indigo-500" />
        </div>
      </div>
    </div>
  </div>
</template>
