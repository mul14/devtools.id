<script setup lang="ts">
import { ref } from 'vue'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('{"message": "Hello World!", "cities": ["Medan", "Bontang", "Bandung", "Jogjakarta"]}')
const output = ref('')
const error = ref('')

const indentation = ref('spaces')
const spaces = ref(2)

const submit = () => {
  try {
    error.value = ''
    output.value = ''

    if (!input.value.length) return

    const whitespace = indentation.value === 'spaces' ? ' ' : '\t'
    output.value = JSON.stringify(JSON.parse(input.value), null, whitespace.repeat(spaces.value))
  } catch (e: any) {
    error.value = e.message
  }
}

const minify = () => {
  try {
    error.value = ''
    output.value = ''

    if (!input.value.length) return

    output.value = JSON.stringify(JSON.parse(input.value))
  } catch (e: any) {
    error.value = e.message
  }
}

const copy = () => navigator.clipboard.writeText(output.value)
const clear = () => {
  input.value = ''
  output.value = ''
  error.value = ''
}

// Detect JSON type
const getJsonType = () => {
  if (!input.value.trim()) return 'Empty'
  try {
    const parsed = JSON.parse(input.value)
    if (Array.isArray(parsed)) return 'JSON Array'
    if (typeof parsed === 'object') return 'JSON Object'
    return typeof parsed
  } catch {
    return 'Invalid JSON'
  }
}
</script>

<template>
  <ToolLayout
    title="JSON Formatter"
    description="Prettify, validate and minify JSON data with syntax highlighting."
    category="Formatters"
    icon="data_object"
    icon-color="green"
    input-label="Input JSON"
    output-label="Formatted Output"
    @clear="clear"
    @copy="copy"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <div class="flex items-center gap-3 mr-2">
        <label class="text-xs font-medium text-slate-500 dark:text-slate-400">Indent:</label>
        <input
          type="number"
          v-model="spaces"
          min="0"
          max="10"
          class="w-14 bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-primary/5 rounded-lg px-2 py-1.5 text-slate-800 dark:text-slate-100 text-xs text-center"
        />
        <select
          v-model="indentation"
          class="bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-primary/5 rounded-lg px-2 py-1.5 text-slate-800 dark:text-slate-100 text-xs"
        >
          <option value="spaces">Spaces</option>
          <option value="tabs">Tabs</option>
        </select>
      </div>
      <button
        @click="minify"
        class="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-neutral-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 border border-slate-200 dark:border-primary/5 text-slate-700 dark:text-slate-200"
      >
        <span class="material-symbols-outlined text-lg">compress</span>
        Minify
      </button>
      <button
        @click="submit"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
      >
        <span class="material-symbols-outlined text-lg font-bold">format_align_left</span>
        Format
      </button>
    </template>

    <!-- Input Panel -->
    <template #input>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Paste your JSON here..."
        spellcheck="false"
      ></textarea>
    </template>

    <!-- Input Footer Left -->
    <template #input-footer-left>
      <span class="text-xs text-slate-500 dark:text-slate-500 italic">
        Auto-detect: {{ getJsonType() }}
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
          placeholder="Formatted JSON will appear here..."
          spellcheck="false"
        ></textarea>
      </div>
    </template>

    <!-- Output Header Right -->
    <template #output-header-right>
      <span class="text-xs text-slate-500">
        Lines: <span class="text-primary">{{ output ? output.split('\n').length : 0 }}</span>
      </span>
    </template>
  </ToolLayout>
</template>
