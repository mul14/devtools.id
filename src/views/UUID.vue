<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { v1, v4 } from 'uuid';

const output = reactive({
  v1: '',
  v4: '',
})

const copiedV1 = ref(false)
const copiedV4 = ref(false)

const submit = () => {
  output.v1 = v1();
  output.v4 = v4();
}

const copy = (value: string, type: 'v1' | 'v4') => {
  navigator.clipboard.writeText(value)
  if (type === 'v1') {
    copiedV1.value = true
    setTimeout(() => copiedV1.value = false, 2000)
  } else {
    copiedV4.value = true
    setTimeout(() => copiedV4.value = false, 2000)
  }
}

onMounted(() => submit())
</script>

<template>
  <div class="flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs font-medium text-primary mb-2 uppercase tracking-widest">
          <span>Generators</span>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-slate-500">UUID Generator</span>
        </nav>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">UUID Generator</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Generate universally unique identifiers (UUID v1 & v4) for your applications.</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="submit"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
        >
          <span class="material-symbols-outlined text-lg font-bold">refresh</span>
          Generate New
        </button>
      </div>
    </div>

    <!-- Output Panels -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- UUID v1 -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">UUID v1</span>
            <span class="font-mono text-[10px] bg-green-500/10 text-green-600 dark:text-green-400 px-1.5 py-0.5 rounded">timestamp</span>
          </div>
          <button
            @click="copy(output.v1, 'v1')"
            class="text-xs flex items-center gap-1 transition-colors"
            :class="copiedV1 ? 'text-green-500' : 'text-primary hover:underline'"
            v-if="output.v1"
          >
            <span class="material-symbols-outlined text-sm">{{ copiedV1 ? 'check' : 'content_copy' }}</span>
            {{ copiedV1 ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <div class="p-6">
          <input
            type="text"
            :value="output.v1"
            readonly
            class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-100 font-mono text-sm text-center"
            placeholder="UUID v1 will appear here..."
          />
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
            Generated using timestamp and MAC address
          </p>
        </div>
      </div>

      <!-- UUID v4 -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-blue-500/20 border border-blue-500/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">UUID v4</span>
            <span class="font-mono text-[10px] bg-blue-500/10 text-blue-600 dark:text-blue-400 px-1.5 py-0.5 rounded">random</span>
          </div>
          <button
            @click="copy(output.v4, 'v4')"
            class="text-xs flex items-center gap-1 transition-colors"
            :class="copiedV4 ? 'text-green-500' : 'text-primary hover:underline'"
            v-if="output.v4"
          >
            <span class="material-symbols-outlined text-sm">{{ copiedV4 ? 'check' : 'content_copy' }}</span>
            {{ copiedV4 ? 'Copied!' : 'Copy' }}
          </button>
        </div>
        <div class="p-6">
          <input
            type="text"
            :value="output.v4"
            readonly
            class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-100 font-mono text-sm text-center"
            placeholder="UUID v4 will appear here..."
          />
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
            Randomly generated (most commonly used)
          </p>
        </div>
      </div>
    </div>

    <!-- Info Card -->
    <div class="bg-slate-50 dark:bg-neutral-900/50 border border-slate-200 dark:border-primary/10 rounded-xl p-4">
      <div class="flex items-start gap-3">
        <span class="material-symbols-outlined text-primary">info</span>
        <div class="text-xs text-slate-500 dark:text-slate-400">
          <strong class="text-slate-700 dark:text-slate-300">UUID (Universally Unique Identifier)</strong> is a 128-bit label used for information in computer systems. 
          UUIDs are standardized by the Open Software Foundation (OSF) as part of the Distributed Computing Environment (DCE).
        </div>
      </div>
    </div>
  </div>
</template>
