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
          class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 font-mono"
          rows="8"
        ></textarea>
      </div>
      <div class="space-x-2">
        <button
          @click="doSerialize"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >
          Serialize
        </button>
        <button
          @click="doUnserialize"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >
          Unserialize
        </button>
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
