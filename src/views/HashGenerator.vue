<script setup lang="ts">
import { reactive, ref } from 'vue'
import md5 from 'crypto-js/md5'
import sha1 from 'crypto-js/sha1'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('Hello World!')
const output = reactive({
  md5: '',
  sha1: '',
})

const copiedMd5 = ref(false)
const copiedSha1 = ref(false)

const submit = () => {
  output.md5 = md5(input.value).toString()
  output.sha1 = sha1(input.value).toString()
}

const clear = () => {
  input.value = ''
  output.md5 = ''
  output.sha1 = ''
}

const copy = (value: string, type: 'md5' | 'sha1') => {
  navigator.clipboard.writeText(value)
  if (type === 'md5') {
    copiedMd5.value = true
    setTimeout(() => copiedMd5.value = false, 2000)
  } else {
    copiedSha1.value = true
    setTimeout(() => copiedSha1.value = false, 2000)
  }
}
</script>

<template>
  <ToolLayout
    title="Hash Generator"
    description="Generate multiple hash formats (MD5, SHA-1) at once."
    category="Security"
    icon="password"
    icon-color="purple"
    input-label="Plain Text"
    output-label="Generated Hashes"
    @clear="clear"
    @copy="() => copy(output.md5 + '\n' + output.sha1, 'md5')"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <button
        @click="submit"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
      >
        <span class="material-symbols-outlined text-lg font-bold">play_arrow</span>
        Generate
      </button>
    </template>

    <!-- Input Panel -->
    <template #input>
      <textarea
        v-model="input"
        class="tool-editor"
        placeholder="Enter text to hash..."
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
      <div class="flex-1 p-4 space-y-4">
        <!-- MD5 -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">MD5 (128-bit)</label>
            <button
              @click="copy(output.md5, 'md5')"
              class="text-xs flex items-center gap-1 transition-colors"
              :class="copiedMd5 ? 'text-green-500' : 'text-primary hover:underline'"
              v-if="output.md5"
            >
              <span class="material-symbols-outlined text-sm">{{ copiedMd5 ? 'check' : 'content_copy' }}</span>
              {{ copiedMd5 ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <input
            type="text"
            :value="output.md5"
            readonly
            class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-3 py-2.5 text-slate-800 dark:text-slate-100 font-mono text-sm"
            placeholder="MD5 hash..."
          />
        </div>

        <!-- SHA1 -->
        <div>
          <div class="flex items-center justify-between mb-2">
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wide">SHA1 (160-bit)</label>
            <button
              @click="copy(output.sha1, 'sha1')"
              class="text-xs flex items-center gap-1 transition-colors"
              :class="copiedSha1 ? 'text-green-500' : 'text-primary hover:underline'"
              v-if="output.sha1"
            >
              <span class="material-symbols-outlined text-sm">{{ copiedSha1 ? 'check' : 'content_copy' }}</span>
              {{ copiedSha1 ? 'Copied!' : 'Copy' }}
            </button>
          </div>
          <input
            type="text"
            :value="output.sha1"
            readonly
            class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-3 py-2.5 text-slate-800 dark:text-slate-100 font-mono text-sm"
            placeholder="SHA1 hash..."
          />
        </div>
      </div>
    </template>

    <!-- Output Footer -->
    <template #output-footer>
      <!-- Empty - we have individual copy buttons -->
    </template>
  </ToolLayout>
</template>
