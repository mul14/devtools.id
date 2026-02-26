<script setup lang="ts">
import { ref } from 'vue'
import serialize from 'locutus/php/var/serialize'
import unserialize from 'locutus/php/var/unserialize'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('{"message": "Hello World!", "cities": ["Medan", "Bontang", "Bandung", "Jogjakarta"]}')
const output = ref('')
const error = ref('')

const doSerialize = () => {
  try {
    error.value = ''
    output.value = serialize(JSON.parse(input.value))
  } catch (e: any) {
    error.value = e.message
  }
}

const doUnserialize = () => {
  try {
    error.value = ''
    output.value = JSON.stringify(unserialize(input.value), null, 2)
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

// Detect input type
const getInputType = () => {
  if (!input.value.trim()) return 'Empty'
  try {
    JSON.parse(input.value)
    return 'JSON'
  } catch {
    // Check if it looks like PHP serialized
    if (input.value.match(/^[asObiCdr]:\d+/)) {
      return 'PHP Serialized'
    }
    return 'Unknown'
  }
}
</script>

<template>
  <ToolLayout
    title="Serializer (PHP)"
    description="Convert between JSON and PHP serialized format."
    category="Encoders"
    icon="code"
    icon-color="indigo"
    input-label="Input (JSON or PHP Serialized)"
    output-label="Output"
    @clear="clear"
    @copy="copy"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <button
        @click="doUnserialize"
        class="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-neutral-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 border border-slate-200 dark:border-primary/5 text-slate-700 dark:text-slate-200"
      >
        <span class="material-symbols-outlined text-lg">arrow_back</span>
        Unserialize → JSON
      </button>
      <button
        @click="doSerialize"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
      >
        <span class="material-symbols-outlined text-lg">arrow_forward</span>
        JSON → Serialize
      </button>
    </template>

    <!-- Input Panel -->
    <template #input>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Paste JSON or PHP serialized data here..."
        spellcheck="false"
      ></textarea>
    </template>

    <!-- Input Footer Left -->
    <template #input-footer-left>
      <span class="text-xs text-slate-500 dark:text-slate-500 italic">
        Auto-detect: {{ getInputType() }}
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
          placeholder="Converted output will appear here..."
          spellcheck="false"
        ></textarea>
      </div>
    </template>

    <!-- Output Header Right -->
    <template #output-header-right>
      <span class="text-xs text-slate-500">
        {{ output.length }} chars
      </span>
    </template>

    <!-- Options / Info -->
    <template #options>
      <div class="bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-primary/5 rounded-lg p-4">
        <p class="text-xs text-slate-500 dark:text-slate-400">
          <strong class="text-slate-600 dark:text-slate-300">JSON → Serialize:</strong> Converts JSON to PHP's serialized string format.<br/>
          <strong class="text-slate-600 dark:text-slate-300">Unserialize → JSON:</strong> Converts PHP serialized string back to JSON.
        </p>
      </div>
    </template>
  </ToolLayout>
</template>
