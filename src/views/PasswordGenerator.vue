<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'

const output = ref('');
const copied = ref(false);

const options = reactive({
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: false,
  spaces: false,
  length: 64,
});

const submit = () => {
  output.value = '';

  let possible = ''

  if (options.uppercase) {
    possible += 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  }
  if (options.lowercase) {
    possible += 'abcdefghijklmnopqrstuvwxyz'
  }

  if (options.numbers) {
    possible += '0123456789'
  }

  if (options.symbols) {
    possible += `~\`!@#$%^&*()-_+=[]\{}|:;"\\',./?>`
  }

  if (options.spaces) {
    possible += ' '.repeat(6)
  }

  for (let i = 0; i < options.length; i++) {
    output.value += possible.charAt(Math.floor(Math.random() * possible.length))
  }
}

const copy = () => {
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
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
          <span class="text-slate-500">Password Generator</span>
        </nav>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Password Generator</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Create strong, secure passwords with customizable length and complexity.</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="submit"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
        >
          <span class="material-symbols-outlined text-lg font-bold">refresh</span>
          Generate
        </button>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Options Panel -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Options</span>
          </div>
        </div>
        <div class="p-6 space-y-6">
          <!-- Character Options -->
          <div>
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-4 block uppercase tracking-wide">Character Sets</label>
            <div class="grid grid-cols-2 gap-3">
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="options.lowercase"
                  class="w-5 h-5 rounded border-slate-300 dark:border-primary/20 bg-slate-50 dark:bg-neutral-800 text-primary focus:ring-primary"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Lowercase (a-z)
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="options.uppercase"
                  class="w-5 h-5 rounded border-slate-300 dark:border-primary/20 bg-slate-50 dark:bg-neutral-800 text-primary focus:ring-primary"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Uppercase (A-Z)
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="options.numbers"
                  class="w-5 h-5 rounded border-slate-300 dark:border-primary/20 bg-slate-50 dark:bg-neutral-800 text-primary focus:ring-primary"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Numbers (0-9)
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="options.symbols"
                  class="w-5 h-5 rounded border-slate-300 dark:border-primary/20 bg-slate-50 dark:bg-neutral-800 text-primary focus:ring-primary"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Symbols (!@#...)
                </span>
              </label>
              <label class="flex items-center gap-3 cursor-pointer group">
                <input
                  type="checkbox"
                  v-model="options.spaces"
                  class="w-5 h-5 rounded border-slate-300 dark:border-primary/20 bg-slate-50 dark:bg-neutral-800 text-primary focus:ring-primary"
                />
                <span class="text-sm text-slate-700 dark:text-slate-300 group-hover:text-primary transition-colors">
                  Spaces
                </span>
              </label>
            </div>
          </div>

          <!-- Length -->
          <div>
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 block uppercase tracking-wide">
              Length: <span class="text-primary">{{ options.length }}</span>
            </label>
            <div class="flex items-center gap-4">
              <input
                type="range"
                v-model="options.length"
                min="4"
                max="128"
                class="flex-1 h-2 bg-slate-200 dark:bg-neutral-700 rounded-lg appearance-none cursor-pointer accent-primary"
              />
              <input
                type="number"
                v-model="options.length"
                min="4"
                max="128"
                class="w-20 bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-3 py-2 text-slate-800 dark:text-slate-100 text-sm text-center"
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Output Panel -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden flex flex-col">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-primary/20 border border-primary/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Generated Password</span>
          </div>
          <span class="text-xs text-slate-500">{{ output.length }} characters</span>
        </div>
        <div class="flex-1 p-4">
          <textarea
            v-model="output"
            readonly
            class="w-full h-full min-h-[200px] bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg p-4 text-slate-800 dark:text-slate-100 font-mono text-sm resize-none break-all"
            placeholder="Generated password will appear here..."
          ></textarea>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-neutral-800/30 flex justify-end items-center gap-3 border-t border-slate-200 dark:border-primary/5">
          <button
            @click="submit"
            class="flex items-center gap-1.5 px-4 py-1.5 bg-slate-200 dark:bg-neutral-700 text-slate-700 dark:text-slate-200 rounded hover:bg-slate-300 dark:hover:bg-neutral-600 transition-colors text-xs font-bold"
          >
            <span class="material-symbols-outlined text-base">refresh</span> Regenerate
          </button>
          <button 
            @click="copy"
            class="flex items-center gap-1.5 px-4 py-1.5 rounded transition-all text-xs font-bold"
            :class="copied 
              ? 'bg-green-500 text-white' 
              : 'bg-primary text-white dark:text-background-dark hover:brightness-110'"
          >
            <span class="material-symbols-outlined text-base font-bold">{{ copied ? 'check' : 'content_copy' }}</span> 
            {{ copied ? 'Copied!' : 'Copy' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
