<script setup lang="ts">
import { shallowRef, nextTick } from 'vue';

import Base64Encode from './Base64Encode.vue';
import Base64Decode from './Base64Decode.vue';
import UrlEncode from './UrlEncode.vue';
import UrlDecode from './UrlDecode.vue';

const currentComponent = shallowRef(Base64Encode);

const changeComponent = (name) => {
  nextTick(() => {
    currentComponent.value = name
  })
}
</script>

<template>
  <div class="flex">
    <div class="w-1/6 p-4 border-r relative">
      <h1 class="font-bold">DevTools.id</h1>
      <hr class="my-4"/>
      <div class="space-y-4 sticky overflow-auto h-screen">
        <dl>
          <dt>Base64</dt>
          <dl class="ml-4"><a href="javascript:;" @click="changeComponent(Base64Encode)" class="underline">Encode</a></dl>
          <dl class="ml-4"><a href="javascript:;" @click="changeComponent(Base64Decode)" class="underline">Decode</a></dl>
        </dl>
        <dl>
          <dt>URL</dt>
          <dl class="ml-4"><a href="javascript:;" @click="changeComponent(UrlEncode)" class="underline">Encode</a></dl>
          <dl class="ml-4"><a href="javascript:;" @click="changeComponent(UrlDecode)" class="underline">Decode</a></dl>
        </dl>
      </div>
    </div>
    <div class="w-5/6 px-6 lg:px-10 py-10 bg-gray-50">
      <component :is="currentComponent"></component>
    </div>
  </div>
</template>
