<script setup lang="ts">
import { ref } from 'vue'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('http://localhost:8000/post/212 hello world')
const output = ref('')

const submit = () => {
  output.value = encodeURI(input.value)
}

const copy = () => navigator.clipboard.writeText(output.value)
const clear = () => {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <ToolLayout
    title="URL Encode"
    description="Encode special characters in URLs for safe web transmission."
    category="URL"
    icon="public"
    icon-color="emerald"
    input-label="Input URL"
    output-label="Encoded URL"
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
        Encode
      </button>
    </template>

    <!-- Input Panel -->
    <template #input>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Enter URL to encode..."
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
        placeholder="Encoded output will appear here..."
        spellcheck="false"
      ></textarea>
    </template>

    <!-- Output Header Right -->
    <template #output-header-right>
      <span class="text-xs text-slate-500">
        Length: <span class="text-primary">{{ output.length }}</span>
      </span>
    </template>
  </ToolLayout>
</template>
