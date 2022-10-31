<script setup lang="ts">
import { ref } from 'vue'
import serialize from 'locutus/php/var/serialize'
import unserialize from 'locutus/php/var/unserialize'

const input = ref('{"message": "Hello World!", "cities": ["Medan", "Bontang", "Bandung", "Jogjakarta"]}')
const output = ref('')

const doSerialize = () => output.value = serialize(JSON.parse(input.value))
const doUnserialize = () => output.value = JSON.stringify(unserialize(input.value))
</script>

<template>
  <div class>
    <h1 class="text-3xl">Serializer (PHP)</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div>
        <textarea
          v-model="input"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="8"
        ></textarea>
      </div>
      <div class="space-x-2">
        <button
          @click="doSerialize"
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >
          Serialize
        </button>
        <button
          @click="doUnserialize"
          class="rounded-md px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >
          Unserialize
        </button>
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
