<script setup lang="ts">
import { shallowRef } from 'vue';

const currentComponent = shallowRef();

const changeComponent = (name) => {
  currentComponent.value = name
}
</script>

<template>
  <div class="flex">
    <div class="w-1/6 p-4 border-r relative">
      <h1 class="font-bold">DevTools.id</h1>
      <hr class="my-4"/>
      <div class="space-y-4 sticky overflow-auto h-screen">
      </div>
    </div>
    <div class="w-5/6 px-6 lg:px-10 py-10 bg-gray-50">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>
