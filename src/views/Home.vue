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
  <h1>Welcome</h1>
</template>
