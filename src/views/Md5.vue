<script setup lang="ts">
import { ref } from 'vue'
import md5 from 'md5'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('admin')
const output = ref('21232f297a57a5a743894a0e4a801fc3')

const submit = () => {
  output.value = md5(input.value).toString()
}

const copy = () => navigator.clipboard.writeText(output.value)
const clear = () => {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <ToolLayout
    title="MD5 Hash"
    description="Generate MD5 hash checksums for text strings and verify data integrity."
    category="Security"
    icon="fingerprint"
    icon-color="purple"
    input-label="Plain Text"
    output-label="MD5 Hash"
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
        32 characters (128-bit)
      </span>
    </template>
  </ToolLayout>
</template>
