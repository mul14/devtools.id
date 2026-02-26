<script setup lang="ts">
import { ref } from 'vue'
import { decode } from 'js-base64'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('SGVsbG8gV29ybGQh')
const output = ref('')
const error = ref('')

const submit = () => {
  try {
    error.value = ''
    output.value = decode(input.value)
  } catch (e: any) {
    error.value = 'Invalid Base64 string'
  }
}

const copy = () => navigator.clipboard.writeText(output.value)
const clear = () => {
  input.value = ''
  output.value = ''
  error.value = ''
}
</script>

<template>
  <ToolLayout
    title="Base64 Decode"
    description="Decode Base64 encoded strings back to their original text format."
    category="Encoders"
    icon="lock_open"
    icon-color="blue"
    input-label="Base64 Input"
    output-label="Decoded Text"
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
        Decode
      </button>
    </template>

    <!-- Input Panel -->
    <template #input>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Paste Base64 encoded text here..."
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
      <div class="flex-1 flex flex-col">
        <!-- Error Message -->
        <div v-if="error" class="bg-red-500/10 border-b border-red-500/20 p-3">
          <p class="text-xs text-red-600 dark:text-red-400 flex items-center gap-2">
            <span class="material-symbols-outlined text-sm">error</span>
            {{ error }}
          </p>
        </div>
        <textarea
          v-model="output"
          class="tool-editor"
          readonly
          placeholder="Decoded text will appear here..."
          spellcheck="false"
        ></textarea>
      </div>
    </template>

    <!-- Output Header Right -->
    <template #output-header-right>
      <span class="text-xs text-slate-500">
        Length: <span class="text-primary">{{ output.length }}</span>
      </span>
    </template>
  </ToolLayout>
</template>
