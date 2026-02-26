<script setup lang="ts">
import { ref } from 'vue'
import bcrypt from 'bcryptjs'
import ToolLayout from '../components/ToolLayout.vue'

const input = ref('admin')
const output = ref('')
const saltRounds = ref(10)

// Verification form
const verifyInput = ref('')
const verifyHash = ref('')
const verifyResult = ref('')
const verifyStatus = ref('')

const submit = () => {
  const salt = bcrypt.genSaltSync(saltRounds.value)
  output.value = bcrypt.hashSync(input.value, salt)
}

const submitVerify = () => {
  try {
    const isValid = bcrypt.compareSync(verifyInput.value, verifyHash.value)
    if (isValid) {
      verifyResult.value = 'Hash verification successful!'
      verifyStatus.value = 'success'
    } else {
      verifyResult.value = 'Hash verification failed!'
      verifyStatus.value = 'error'
    }
  } catch (error) {
    verifyResult.value = 'Invalid hash format!'
    verifyStatus.value = 'error'
  }
}

const copy = () => navigator.clipboard.writeText(output.value)
const clear = () => {
  input.value = ''
  output.value = ''
}
</script>

<template>
  <ToolLayout
    title="Bcrypt Hash"
    description="Generate and verify bcrypt password hashes with configurable salt rounds."
    category="Security"
    icon="enhanced_encryption"
    icon-color="purple"
    input-label="Plain Text"
    output-label="Bcrypt Hash"
    @clear="clear"
    @copy="copy"
  >
    <!-- Header Actions -->
    <template #header-actions>
      <div class="flex items-center gap-3 mr-2">
        <label class="text-xs font-medium text-slate-500 dark:text-slate-400">Salt Rounds:</label>
        <input
          type="number"
          v-model.number="saltRounds"
          min="4"
          max="15"
          class="w-16 bg-slate-100 dark:bg-neutral-800 border border-slate-200 dark:border-primary/5 rounded-lg px-2 py-1.5 text-slate-800 dark:text-slate-100 text-xs text-center"
        />
      </div>
      <button
        @click="submit"
        class="flex items-center gap-2 px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110"
      >
        <span class="material-symbols-outlined text-lg font-bold">play_arrow</span>
        Generate Hash
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
      <textarea
        v-model="output"
        class="tool-editor"
        readonly
        placeholder="Bcrypt hash will appear here..."
        spellcheck="false"
      ></textarea>
    </template>

    <!-- Output Header Right -->
    <template #output-header-right>
      <span class="text-xs text-slate-500">
        60 characters
      </span>
    </template>

    <!-- Options Section (Verify Card) -->
    <template #options>
      <div class="bg-white dark:bg-neutral-900 rounded-xl border border-slate-200 dark:border-primary/10 p-6 space-y-4">
        <h3 class="text-lg font-bold text-slate-800 dark:text-white flex items-center gap-2">
          <span class="material-symbols-outlined text-primary">verified</span>
          Verify Hash
        </h3>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <!-- Hash Input -->
          <div>
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Bcrypt Hash</label>
            <textarea
              v-model="verifyHash"
              class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-100 font-mono text-sm resize-none h-24"
              placeholder="Enter bcrypt hash to verify against..."
            ></textarea>
          </div>

          <!-- Plain Text -->
          <div>
            <label class="text-xs font-medium text-slate-500 dark:text-slate-400 mb-2 block">Plain Text</label>
            <textarea
              v-model="verifyInput"
              class="w-full bg-slate-50 dark:bg-neutral-800 border border-slate-200 dark:border-primary/10 rounded-lg px-4 py-3 text-slate-800 dark:text-slate-100 font-mono text-sm resize-none h-24"
              placeholder="Enter plain text to verify..."
            ></textarea>
          </div>
        </div>

        <div class="flex items-center gap-4">
          <button
            @click="submitVerify"
            class="px-4 py-2 bg-primary text-white dark:text-background-dark rounded-lg text-sm font-bold hover:brightness-110 flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-lg">check_circle</span>
            Verify Hash
          </button>

          <!-- Result -->
          <div
            v-if="verifyResult"
            :class="{
              'bg-green-500/10 border-green-500/20 text-green-600 dark:text-green-400': verifyStatus === 'success',
              'bg-red-500/10 border-red-500/20 text-red-600 dark:text-red-400': verifyStatus === 'error'
            }"
            class="px-4 py-2 rounded-lg border text-sm font-medium flex items-center gap-2"
          >
            <span class="material-symbols-outlined text-lg" v-if="verifyStatus === 'success'">check_circle</span>
            <span class="material-symbols-outlined text-lg" v-else>cancel</span>
            {{ verifyResult }}
          </div>
        </div>
      </div>
    </template>
  </ToolLayout>
</template>
