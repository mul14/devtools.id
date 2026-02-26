<script setup lang="ts">
import { reactive, ref } from 'vue'

const input = ref('http://root:pswd@localhost:8000/search?q=devtools.id&sourceid=chrome&ie=UTF-8#top')
const output = reactive({
  hash: '',
  host: '',
  hostname: '',
  href: '',
  origin: '',
  password: '',
  pathname: '',
  port: '',
  protocol: '',
  search: '',
  username: '',
})

const queryString = reactive<Record<string, string>>({})
const error = ref('')
const copiedStates = reactive<Record<string, boolean>>({})

const submit = () => {
  try {
    error.value = ''
    // Clear previous query string
    Object.keys(queryString).forEach(key => delete queryString[key])
    
    const result = new URL(input.value);

    output.hash = result.hash
    output.host = result.host;
    output.hostname = result.hostname;
    output.href = result.href;
    output.origin = result.origin;
    output.password = result.password;
    output.pathname = result.pathname;
    output.port = result.port;
    output.protocol = result.protocol;
    output.search = result.search;
    output.username = result.username;

    result.searchParams.forEach((value: string, key: string) => {
      queryString[key] = value;
    })

  } catch (e: any) {
    error.value = e.message
  }
}

const clear = () => {
  input.value = ''
  error.value = ''
  Object.keys(output).forEach(key => output[key as keyof typeof output] = '')
  Object.keys(queryString).forEach(key => delete queryString[key])
}

const copyValue = (value: string, key: string) => {
  navigator.clipboard.writeText(value)
  copiedStates[key] = true
  setTimeout(() => copiedStates[key] = false, 2000)
}
</script>

<template>
  <div class="flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs font-medium text-primary mb-2 uppercase tracking-widest">
          <span>URL</span>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-slate-500">URL Parser</span>
        </nav>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">URL Parser</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Parse and analyze URL components including protocol, host, and query params.</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="clear"
          class="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-neutral-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 border border-slate-200 dark:border-primary/5 text-slate-700 dark:text-slate-200"
        >
          <span class="material-symbols-outlined text-lg">delete</span>
          Clear
        </button>
        <button
          @click="submit"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
        >
          <span class="material-symbols-outlined text-lg font-bold">play_arrow</span>
          Parse URL
        </button>
      </div>
    </div>

    <!-- Input Panel -->
    <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
      <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
        <div class="flex items-center gap-2">
          <span class="w-3 h-3 rounded-full bg-emerald-500/20 border border-emerald-500/50"></span>
          <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Input URL</span>
        </div>
        <span class="text-xs text-slate-500">Characters: {{ input.length }}</span>
      </div>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Enter URL to parse..."
        spellcheck="false"
        rows="3"
      ></textarea>
    </div>

    <!-- Error -->
    <div v-if="error" class="bg-red-500/10 border border-red-500/20 rounded-lg p-4">
      <p class="text-sm text-red-600 dark:text-red-400 flex items-center gap-2">
        <span class="material-symbols-outlined text-lg">error</span>
        {{ error }}
      </p>
    </div>

    <!-- Output Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- URL Object -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-primary/20 border border-primary/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">URL Object</span>
          </div>
        </div>
        <div class="p-4 space-y-3 max-h-[400px] overflow-y-auto">
          <div v-for="([key, value], index) in Object.entries(output)" :key="index">
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">{{ key }}</label>
            <div class="relative">
              <input
                type="text"
                :value="value"
                readonly
                class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-3 py-2 pr-10 text-slate-800 dark:text-slate-100 font-mono text-xs"
              />
              <button
                v-if="value"
                @click="copyValue(value, key)"
                class="absolute right-2 top-1/2 -translate-y-1/2 transition-colors"
                :class="copiedStates[key] ? 'text-green-500' : 'text-slate-400 hover:text-primary'"
              >
                <span class="material-symbols-outlined text-sm">{{ copiedStates[key] ? 'check' : 'content_copy' }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Query String -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Query Parameters</span>
          </div>
          <span class="text-xs text-slate-500">{{ Object.keys(queryString).length }} params</span>
        </div>
        <div class="p-4 space-y-3 max-h-[400px] overflow-y-auto" v-if="Object.keys(queryString).length">
          <div v-for="(value, key) in queryString" :key="key" class="flex gap-2">
            <div class="flex-1">
              <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Key</label>
              <input
                :value="key"
                readonly
                class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-100 font-mono text-xs"
              />
            </div>
            <div class="flex-1">
              <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-1 block">Value</label>
              <div class="relative">
                <input
                  :value="value"
                  readonly
                  class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-3 py-2 pr-10 text-slate-800 dark:text-slate-100 font-mono text-xs"
                />
                <button
                  @click="copyValue(value, 'query_' + key)"
                  class="absolute right-2 top-1/2 -translate-y-1/2 transition-colors"
                  :class="copiedStates['query_' + key] ? 'text-green-500' : 'text-slate-400 hover:text-primary'"
                >
                  <span class="material-symbols-outlined text-sm">{{ copiedStates['query_' + key] ? 'check' : 'content_copy' }}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="p-4 text-sm text-slate-400 dark:text-slate-500 italic text-center">
          No query parameters found
        </div>
      </div>
    </div>
  </div>
</template>
