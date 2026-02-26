<script setup lang="ts">
import { ref } from 'vue'
import { LoremIpsum } from "lorem-ipsum";

const output = ref('')
const copied = ref(false)

const lorem = new LoremIpsum();
const loremHtml = new LoremIpsum();
loremHtml.format = 'html'

const generateWords = () => output.value = lorem.generateWords()
const generateSentences = () => output.value = lorem.generateSentences(3)
const generateParagraphs = () => output.value = lorem.generateParagraphs(3)

const generateWordsHtml = () => output.value = loremHtml.generateWords();
const generateSentencesHtml = () => output.value = loremHtml.generateSentences(3)
const generateParagraphsHtml = () => output.value = loremHtml.generateParagraphs(3)

const copy = () => {
  navigator.clipboard.writeText(output.value)
  copied.value = true
  setTimeout(() => copied.value = false, 2000)
}
const clear = () => output.value = ''
</script>

<template>
  <div class="flex-1 flex flex-col gap-6 max-w-[1600px] mx-auto w-full">
    <!-- Header Section -->
    <div class="flex flex-col md:flex-row md:items-end justify-between gap-4">
      <div>
        <nav class="flex items-center gap-2 text-xs font-medium text-primary mb-2 uppercase tracking-widest">
          <span>Generators</span>
          <span class="material-symbols-outlined text-xs">chevron_right</span>
          <span class="text-slate-500">Lorem Ipsum</span>
        </nav>
        <h2 class="text-2xl md:text-3xl font-bold text-slate-800 dark:text-white">Lorem Ipsum Generator</h2>
        <p class="text-slate-500 dark:text-slate-400 mt-1">Generate placeholder Lorem Ipsum text for design and development.</p>
      </div>
    </div>

    <!-- Main Content -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
      <!-- Options Panel -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-pink-500/20 border border-pink-500/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Generate Options</span>
          </div>
        </div>
        <div class="p-6 space-y-6">
          <!-- Plain Text -->
          <div>
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 block uppercase tracking-wide">Plain Text</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                @click="generateWords"
                class="px-3 py-2.5 bg-primary text-white dark:text-background-dark rounded-lg font-medium text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-base">text_fields</span>
                Words
              </button>
              <button
                @click="generateSentences"
                class="px-3 py-2.5 bg-primary text-white dark:text-background-dark rounded-lg font-medium text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-base">short_text</span>
                Sentences
              </button>
              <button
                @click="generateParagraphs"
                class="px-3 py-2.5 bg-primary text-white dark:text-background-dark rounded-lg font-medium text-xs hover:brightness-110 transition-all flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-base">subject</span>
                Paragraphs
              </button>
            </div>
          </div>

          <!-- HTML Format -->
          <div>
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-3 block uppercase tracking-wide">HTML Format</label>
            <div class="grid grid-cols-3 gap-2">
              <button
                @click="generateWordsHtml"
                class="px-3 py-2.5 bg-pink-600 text-white rounded-lg font-medium text-xs hover:bg-pink-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-base">code</span>
                Words
              </button>
              <button
                @click="generateSentencesHtml"
                class="px-3 py-2.5 bg-pink-600 text-white rounded-lg font-medium text-xs hover:bg-pink-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-base">code</span>
                Sentences
              </button>
              <button
                @click="generateParagraphsHtml"
                class="px-3 py-2.5 bg-pink-600 text-white rounded-lg font-medium text-xs hover:bg-pink-700 transition-all flex items-center justify-center gap-1.5"
              >
                <span class="material-symbols-outlined text-base">code</span>
                Paragraphs
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Output Panel -->
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 overflow-hidden flex flex-col">
        <div class="flex items-center justify-between px-4 py-2 bg-slate-50 dark:bg-neutral-800/50 border-b border-slate-200 dark:border-primary/5">
          <div class="flex items-center gap-2">
            <span class="w-3 h-3 rounded-full bg-primary/20 border border-primary/50"></span>
            <span class="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-tight">Generated Text</span>
          </div>
          <span class="text-xs text-slate-500">{{ output.length }} characters</span>
        </div>
        <div class="flex-1 p-4">
          <textarea
            v-model="output"
            readonly
            class="w-full h-full min-h-[250px] bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg p-4 text-slate-800 dark:text-slate-100 font-mono text-sm resize-none"
            placeholder="Click a button to generate placeholder text..."
          ></textarea>
        </div>
        <div class="p-3 bg-slate-50 dark:bg-neutral-800/30 flex justify-end items-center gap-3 border-t border-slate-200 dark:border-primary/5">
          <button 
            @click="clear"
            v-if="output"
            class="flex items-center gap-1.5 px-3 py-1.5 bg-red-500/10 text-red-500 dark:text-red-400 rounded hover:bg-red-500/20 transition-colors text-xs font-bold"
          >
            <span class="material-symbols-outlined text-base">delete</span> Clear
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
