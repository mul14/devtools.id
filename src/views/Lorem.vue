<script setup lang="ts">
import { ref } from 'vue'
import { LoremIpsum } from "lorem-ipsum";

const output = ref('')

const lorem = new LoremIpsum();
const loremHtml = new LoremIpsum();
loremHtml.format = 'html'

const generateWords = () => output.value = lorem.generateWords()
const generateSentences = () => output.value = lorem.generateSentences(3)
const generateParagraphs = () => output.value = lorem.generateParagraphs(3)

const generateWordsHtml = () => output.value = loremHtml.generateWords();
const generateSentencesHtml = () => output.value = loremHtml.generateSentences(3)
const generateParagraphsHtml = () => output.value = loremHtml.generateParagraphs(3)
</script>

<template>
  <div class>
    <h1 class="text-3xl">Lorem Ipsum Generator</h1>
    <hr class="my-6" />
    <div class="flex flex-col gap-4">
      <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 justify-start gap-4">
        <button
          @click="generateWords"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Words</button>
        <button
          @click="generateSentences"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Sentence</button>
        <button
          @click="generateParagraphs"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Paragraph</button>

        <button
          @click="generateWordsHtml"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Words HTML</button>
        <button
          @click="generateSentencesHtml"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Sentence HTML</button>
        <button
          @click="generateParagraphsHtml"
          class="rounded-lg px-4 py-2 text-white bg-gray-400 hover:bg-gray-500"
        >Paragraph HTML</button>

      </div>
      <div>
        <textarea
          v-model="output"
          class="block w-full shadow-custom rounded-md border-indigo-500 py-3 px-4 focus:border-indigo-500 focus:ring-indigo-500"
          rows="20"
        ></textarea>
      </div>
    </div>
  </div>
</template>
