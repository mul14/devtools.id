<script setup lang="ts">
import { ref } from 'vue'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('Hello everybody! Welcome to the new world!')
const output = ref('')

const toLowercase = () => output.value = input.value.toLocaleLowerCase()
const toUppercase = () => output.value = input.value.toLocaleUpperCase()
const toCapitalize = () => output.value = input.value.replace(/\b\w/g, (l) => l.toUpperCase())
const toSlug = () => output.value = input.value.toLocaleLowerCase().replace(/\W/g, '-').replace(/\-{2,}/g, '-').replace(/\-$/, '')

const copy = () => navigator.clipboard.writeText(output.value)
const clear = () => {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <ToolLayout
    title="Text Converter"
    description="Convert text between different cases: uppercase, lowercase, title case, and more."
    category="Formatters"
    icon="text_fields"
    icon-color="sky"
    input-label="Input Text"
    output-label="Converted Text"
    @clear="clear"
    @copy="copy"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <button
        @click="toLowercase"
        class="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 border border-slate-200 dark:border-primary/5 text-slate-700 dark:text-slate-200"
      >
        <span class="material-symbols-outlined text-base">text_decrease</span>
        lowercase
      </button>
      <button
        @click="toUppercase"
        class="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 border border-slate-200 dark:border-primary/5 text-slate-700 dark:text-slate-200"
      >
        <span class="material-symbols-outlined text-base">text_increase</span>
        UPPERCASE
      </button>
      <button
        @click="toCapitalize"
        class="flex items-center gap-2 px-3 py-2 bg-slate-100 dark:bg-neutral-800 rounded-lg text-xs font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 border border-slate-200 dark:border-primary/5 text-slate-700 dark:text-slate-200"
      >
        <span class="material-symbols-outlined text-base">format_size</span>
        Capitalize
      </button>
      <button
        @click="toSlug"
        class="flex items-center gap-2 px-3 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-xs font-bold hover:brightness-110"
      >
        <span class="material-symbols-outlined text-base">link</span>
        slug-case
      </button>
    </template>

    <!-- Input Panel -->
    <template #input>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Enter your text here..."
        spellcheck="false"
      ></textarea>
    </template>

    <!-- Input Footer Left -->
    <template #input-footer-left>
      <span class="text-xs text-slate-500 dark:text-slate-500 italic">
        Characters: {{ input.length }} | Words: {{ input.trim() ? input.trim().split(/\s+/).length : 0 }}
      </span>
    </template>

    <!-- Output Panel -->
    <template #output>
      <textarea
        v-model="output"
        class="tool-editor"
        readonly
        placeholder="Converted text will appear here..."
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
