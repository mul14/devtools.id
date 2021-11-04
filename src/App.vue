<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'

  const search = ref('');

  const menus = reactive([
    { name: 'Base64 Decode', slug: 'base64-decode' },
    { name: 'Base64 Encode', slug: 'base64-encode' },
    { name: 'URL Decode', slug: 'url-decode' },
    { name: 'URL Encode', slug: 'url-encode' },
    { name: 'URL Parser', slug: 'url-parser' },
    { name: 'Hash Generator', slug: 'hash-generator' },
    { name: 'Password Generator', slug: 'password-generator' },
    { name: 'UUID Generator', slug: 'uuid' },
    { name: 'Lorem Ipsum', slug: 'lorem' },
    { name: 'Text Converter', slug: 'text' },
    { name: 'Epoch', slug: 'epoch' },
    { name: 'JSON Formatter', slug: 'json-formatter' },
  ]);

  const filteredMenus = computed(() => menus.filter((menu) => menu.name.toLowerCase().includes(search.value)))
</script>

<template>
  <div class="flex">
    <div class="w-3/12 p-4 border-r relative">
      <h1 class="font-bold">
        <router-link to="/" title="Trivial Tools and Utilities for Developers">
          DevTools.id
        </router-link>
      </h1>
      <hr class="my-4" />
      <input type="search" v-model="search" placeholder="Type to search" class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 bg-gray-100" />
      <nav class="space-y-4 sticky overflow-auto h-screen py-2">
        <dl class="space-y-0.5">
          <dd v-for="(menu, index) in filteredMenus" :key="index">
            <router-link :to="menu.slug" class="block rounded-lg hover:bg-gray-300 px-4 py-2">{{ menu.name }}</router-link>
          </dd>
        </dl>
      </nav>
    </div>
    <div class="px-6 pt-6 pb-56 w-full">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
  nav .router-link-exact-active {
    background: #e5e7eb;
  }
</style>
