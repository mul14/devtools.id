<script setup lang="ts">
import { computed, ref } from 'vue';

const copied = ref(false);

const handleCopy = () => {
  emit('copy');
  copied.value = true;
  setTimeout(() => {
    copied.value = false;
  }, 2000);
};

interface Props {
  title: string;
  description: string;
  category: string;
  icon: string;
  iconColor?: string;
  inputLabel?: string;
  outputLabel?: string;
  inputPlaceholder?: string;
  outputPlaceholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  iconColor: 'primary',
  inputLabel: 'Input',
  outputLabel: 'Output',
  inputPlaceholder: 'Paste your content here...',
  outputPlaceholder: 'Output will appear here...'
});

const emit = defineEmits(['clear', 'copy']);

const iconColorClass = computed(() => {
  const colors: Record<string, string> = {
    blue: 'text-blue-400',
    purple: 'text-purple-400',
    green: 'text-green-400',
    emerald: 'text-emerald-400',
    amber: 'text-amber-400',
    pink: 'text-pink-400',
    sky: 'text-sky-400',
    indigo: 'text-indigo-400',
    primary: 'text-primary',
  };
  return colors[props.iconColor] || colors.primary;
});

const dotColorClass = computed(() => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/20 border-blue-500/50',
    purple: 'bg-purple-500/20 border-purple-500/50',
    green: 'bg-green-500/20 border-green-500/50',
    emerald: 'bg-emerald-500/20 border-emerald-500/50',
    amber: 'bg-amber-500/20 border-amber-500/50',
    pink: 'bg-pink-500/20 border-pink-500/50',
    sky: 'bg-sky-500/20 border-sky-500/50',
    indigo: 'bg-indigo-500/20 border-indigo-500/50',
    primary: 'bg-primary/20 border-primary/50',
  };
  return colors[props.iconColor] || colors.primary;
});
</script>

<template>
  <div class="flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs font-medium text-primary mb-2 uppercase tracking-widest">
          <span>{{ category }}</span>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-slate-500">{{ title }}</span>
        </nav>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">{{ title }}</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">{{ description }}</p>
      </div>
      <div class="flex gap-2">
        <slot name="header-actions">
          <!-- Default header actions slot -->
        </slot>
      </div>
    </div>

    <!-- Dual Panel Editor -->
    <div class="flex-1 grid grid-cols-1 lg:grid-cols-2 gap-4 relative">
      <!-- Input Panel -->
      <div class="flex flex-col bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden min-h-[400px]">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">{{ inputLabel }}</span>
          </div>
          <slot name="input-header-right">
            <!-- Optional slot for input header right side -->
          </slot>
        </div>
        <div class="flex-1 flex flex-col">
          <slot name="input">
            <!-- Input content slot -->
          </slot>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-neutral-800/30 flex justify-between items-center border-t border-slate-200 dark:border-primary/5">
          <slot name="input-footer-left">
            <span class="text-xs text-slate-400 dark:text-slate-500 italic">Ready for input</span>
          </slot>
          <button 
            @click="emit('clear')"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 dark:text-red-400 rounded hover:bg-red-500/20 transition-colors text-xs font-bold"
          >
            <span class="material-symbols-outlined text-base">delete</span> Clear
          </button>
        </div>
      </div>

      <!-- Center Controls (Desktop only) -->
      <slot name="center-controls">
        <!-- Optional center floating controls -->
      </slot>

      <!-- Output Panel -->
      <div class="flex flex-col bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden min-h-[400px]">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full border" :class="dotColorClass"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">{{ outputLabel }}</span>
          </div>
          <slot name="output-header-right">
            <!-- Optional slot for output header right side -->
          </slot>
        </div>
        <div class="flex-1 flex flex-col">
          <slot name="output">
            <!-- Output content slot -->
          </slot>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-neutral-800/30 flex justify-end items-center gap-3 border-t border-slate-200 dark:border-primary/5">
          <slot name="output-footer">
            <button 
              @click="handleCopy"
              class="flex items-center gap-1.5 px-4 py-1.5 rounded transition-all text-xs font-bold"
              :class="copied 
                ? 'bg-green-500 text-white' 
                : 'bg-primary text-white dark:text-background-dark hover:brightness-110'"
            >
              <span class="material-symbols-outlined text-base font-bold">{{ copied ? 'check' : 'content_copy' }}</span> 
              {{ copied ? 'Copied!' : 'Copy' }}
            </button>
          </slot>
        </div>
      </div>
    </div>

    <!-- Options Section (Below panels) -->
    <slot name="options">
      <!-- Optional options section -->
    </slot>
  </div>
</template>
