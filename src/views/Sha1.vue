<script setup lang="ts">
import { ref } from 'vue'
import sha1 from 'sha1'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('admin')
const output = ref('d033e22ae348aeb5660fc2140aec35850c4da997')

const submit = () => {
  output.value = sha1(input.value).toString()
}

const copy = () => navigator.clipboard.writeText(output.value)
const clear = () => {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <ToolLayout
    title="SHA1 Hash"
    description="Create SHA-1 cryptographic hashes for secure string verification."
    category="Security"
    icon="shield"
    icon-color="purple"
    input-label="Plain Text"
    output-label="SHA1 Hash"
    @clear="clear"
    @copy="copy"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <button
        @click="submit"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
      >
        <span class="material-symbols-outlined text-lg font-bold">play_arrow</span>
        Generate Hash
      </button>
    </template>

    <!-- Input Panel -->
    <template #input>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Enter text to hash..."
        spellcheck="false"
      ></textarea>
    </template>

    <!-- Input Footer Left -->
    <template #input-footer-left>
      <span class="text-xs text-slate-500 dark:text-slate-500 italic">
        Characters: {{ input.length }}
      </span>
    </template>

    <!-- Output Panel -->
    <template #output>
      <textarea
        v-model="output"
        class="tool-editor"
        readonly
        placeholder="Hash will appear here..."
        spellcheck="false"
      ></textarea>
    </template>

    <!-- Output Header Right -->
    <template #output-header-right>
      <span class="text-xs text-slate-500">
        40 characters (160-bit)
      </span>
    </template>
  </ToolLayout>
</template>
