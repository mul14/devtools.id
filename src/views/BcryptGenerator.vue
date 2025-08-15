<script setup lang="ts">
import { ref } from 'vue'
import bcrypt from 'bcryptjs'

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
      verifyResult.value = 'Hash verification successful! ✓'
      verifyStatus.value = 'success'
    } else {
      verifyResult.value = 'Hash verification failed! ✗'
      verifyStatus.value = 'error'
    }
  } catch (error) {
    verifyResult.value = 'Invalid hash format! ✗'
    verifyStatus.value = 'error'
  }
}
</script>

<template>
  <div class>
    <h1 class="font-normal text-2xl text-darkBlue uppercase">Bcrypt Hash</h1>
    <div class="border-b-2 border-gray mb-8 mt-2"></div>
    <div class="flex flex-col gap-4">
      <div>
        <label class="block text-sm font-medium text-gray-700 mb-2">Salt Rounds</label>
        <input
          v-model.number="saltRounds"
          type="number"
          min="4"
          max="15"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-2 px-4 focus:border-indigo-500 focus:ring-indigo-500 mb-4"
        />
        <textarea
          v-model="input"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="8"
          placeholder="Enter text to hash..."
        ></textarea>
        <button
          @click="submit"
          class="rounded-md my-4 px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
        >Generate Bcrypt Hash</button>
      </div>
      <div>
        <textarea
          v-model="output"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 bg-gray-100 font-mono"
          rows="8"
          readonly
        ></textarea>
      </div>
    </div>

    <!-- Hash Verification Section -->
    <div class="mt-12">
      <h2 class="font-normal text-xl text-darkBlue uppercase mb-4">Verify Bcrypt Hash</h2>
      <div class="border-b-2 border-gray mb-8"></div>
      <div class="flex flex-col gap-4">
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Bcrypt Hash</label>
          <textarea
            v-model="verifyHash"
            class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500 font-mono"
            rows="4"
            placeholder="Enter bcrypt hash to verify against..."
          ></textarea>
        </div>
        <div>
          <label class="block text-sm font-medium text-gray-700 mb-2">Plain Text</label>
          <input
            v-model="verifyInput"
            class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
            placeholder="Enter plain text to verify..."
          />
        </div>
        <div>
          <button
            @click="submitVerify"
            class="rounded-md my-4 px-4 py-2 text-white bg-primary font-bold text-sm uppercase hover:bg-primary"
          >Verify Hash</button>
        </div>
        <div
          v-if="verifyResult"
          :class="{
            'text-green-600 bg-green-50 border-green-200': verifyStatus === 'success',
            'text-red-600 bg-red-50 border-red-200': verifyStatus === 'error'
          }"
          class="p-4 rounded-md border font-medium"
        >
          {{ verifyResult }}
        </div>
      </div>
    </div>
  </div>
</template>