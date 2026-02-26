<script setup lang="ts">
import { ref } from 'vue'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('Lorem Ipsum, Dolor sit amet...')
const output = ref('')

const submit = () => {
  const slug = input.value.toLowerCase()
    .replace(/ /g, '-')
    .replace(/[^\w-]+/g, '')

  output.value = slug
}

const copy = () => navigator.clipboard.writeText(output.value)
const clear = () => {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <ToolLayout
    title="Slug Generator"
    description="Convert text strings into URL-friendly slugs for web applications."
    category="Generators"
    icon="link"
    icon-color="green"
    input-label="Input Text"
    output-label="Generated Slug"
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
        Generate Slug
      </button>
    </template>

    <!-- Input Panel -->
    <template #input>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Enter text to convert to slug..."
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
        placeholder="Slug will appear here..."
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
