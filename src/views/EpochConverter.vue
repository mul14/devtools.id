<script setup lang="ts">
import { onMounted, ref } from 'vue'
import dayjs from 'dayjs'

const currentEpoch = ref<number>()

const input = ref(dayjs().unix())
const outputHuman = ref('')
const outputIso = ref('')

const copiedCurrent = ref(false)
const copiedHuman = ref(false)
const copiedIso = ref(false)

const submit = () => {
  outputHuman.value = dayjs.unix(input.value).toString()
  outputIso.value = dayjs.unix(input.value).toISOString()
}

const setNow = () => {
  input.value = dayjs().unix()
  submit()
}

const copy = (value: string, type: 'current' | 'human' | 'iso') => {
  navigator.clipboard.writeText(value)
  if (type === 'current') {
    copiedCurrent.value = true
    setTimeout(() => copiedCurrent.value = false, 2000)
  } else if (type === 'human') {
    copiedHuman.value = true
    setTimeout(() => copiedHuman.value = false, 2000)
  } else {
    copiedIso.value = true
    setTimeout(() => copiedIso.value = false, 2000)
  }
}

const clear = () => {
  input.value = 0
  outputHuman.value = ''
  outputIso.value = ''
}

onMounted(() => {
  setInterval(() => currentEpoch.value = dayjs().unix(), 1000)
  submit()
})
</script>

<template>
  <div class="flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs font-medium text-primary mb-2 uppercase tracking-widest">
          <span>Converters</span>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-slate-500">Epoch Converter</span>
        </nav>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Epoch Converter</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Convert between Unix timestamps and human-readable date formats.</p>
      </div>
      <div class="flex gap-2">
        <button
          @click="setNow"
          class="flex items-center gap-2 px-4 py-2 bg-slate-100 dark:bg-neutral-800 rounded-lg text-sm font-medium hover:bg-slate-200 dark:hover:bg-neutral-700 border border-slate-200 dark:border-primary/5 text-slate-700 dark:text-slate-200"
        >
          <span class="material-symbols-outlined text-lg">update</span>
          Now
        </button>
        <button
          @click="submit"
          class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
        >
          <span class="material-symbols-outlined text-lg font-bold">play_arrow</span>
          Convert
        </button>
      </div>
    </div>

    <!-- Current Epoch Display -->
    <div class="bg-amber-500/10 border border-amber-500/20 rounded-xl p-4 flex items-center justify-between">
      <div class="flex items-center gap-3">
        <span class="material-symbols-outlined text-amber-500 text-2xl">timer</span>
        <div>
          <p class="text-xs text-amber-600 dark:text-amber-400 font-medium uppercase tracking-wide">Current Unix Timestamp</p>
          <p class="text-2xl font-mono font-bold text-amber-700 dark:text-amber-300">{{ currentEpoch }}</p>
        </div>
      </div>
      <button
        @click="copy(String(currentEpoch), 'current')"
        class="flex items-center gap-1.5 px-3 py-1.5 rounded transition-colors text-xs font-bold"
        :class="copiedCurrent 
          ? 'bg-green-500/20 text-green-600 dark:text-green-400' 
          : 'bg-amber-500/20 text-amber-700 dark:text-amber-300 hover:bg-amber-500/30'"
      >
        <span class="material-symbols-outlined text-base">{{ copiedCurrent ? 'check' : 'content_copy' }}</span>
        {{ copiedCurrent ? 'Copied!' : 'Copy' }}
      </button>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Input Panel -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-amber-500/20 border border-amber-500/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Unix Timestamp</span>
          </div>
        </div>
        <div class="p-6">
          <input
            v-model="input"
            type="number"
            class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-4 py-4 text-slate-800 dark:text-slate-100 font-mono text-lg text-center focus:border-primary focus:ring-1 focus:ring-primary"
            placeholder="Enter Unix timestamp..."
          />
          <p class="text-xs text-slate-400 dark:text-slate-500 mt-3 text-center">
            Enter a Unix timestamp (seconds since Jan 1, 1970)
          </p>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-neutral-800/30 flex justify-between items-center border-t border-slate-200 dark:border-primary/5">
          <span class="text-xs text-slate-500 dark:text-slate-500 italic">Seconds since epoch</span>
          <button 
            @click="clear"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 dark:text-red-400 rounded hover:bg-red-500/20 transition-colors text-xs font-bold"
          >
            <span class="material-symbols-outlined text-base">delete</span> Clear
          </button>
        </div>
      </div>

      <!-- Output Panel -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-primary/20 border border-primary/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Converted Dates</span>
          </div>
        </div>
        <div class="p-6 space-y-4">
          <!-- Human Readable -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">Human Readable</label>
              <button
                @click="copy(outputHuman, 'human')"
                class="text-xs flex items-center gap-1 transition-colors"
                :class="copiedHuman ? 'text-green-500' : 'text-primary hover:underline'"
                v-if="outputHuman"
              >
                <span class="material-symbols-outlined text-sm">{{ copiedHuman ? 'check' : 'content_copy' }}</span>
                {{ copiedHuman ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <input
              type="text"
              :value="outputHuman"
              readonly
              class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-100 font-mono text-sm"
              placeholder="Human readable date..."
            />
          </div>

          <!-- ISO 8601 -->
          <div>
            <div class="flex items-center justify-between mb-2">
              <label class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">ISO 8601</label>
              <button
                @click="copy(outputIso, 'iso')"
                class="text-xs flex items-center gap-1 transition-colors"
                :class="copiedIso ? 'text-green-500' : 'text-primary hover:underline'"
                v-if="outputIso"
              >
                <span class="material-symbols-outlined text-sm">{{ copiedIso ? 'check' : 'content_copy' }}</span>
                {{ copiedIso ? 'Copied!' : 'Copy' }}
              </button>
            </div>
            <input
              type="text"
              :value="outputIso"
              readonly
              class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-100 font-mono text-sm"
              placeholder="ISO 8601 date..."
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
