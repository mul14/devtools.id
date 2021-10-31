<script setup lang="ts">
  import { computed, reactive, ref } from 'vue'

  const search = ref('');

  const menus = reactive([
    { name: 'Base64 Decode', slug: 'base64-decode' },
    { name: 'Base64 Encode', slug: 'base64-encode' },
    { name: 'URL Decode', slug: 'url-decode' },
    { name: 'URL Encode', slug: 'url-encode' },
    { name: 'Hash Generator', slug: 'hash-generator' },
    { name: 'Password Generator', slug: 'password-generator' },
    { name: 'UUID Generator', slug: 'uuid' },
  ]);

  const filteredMenus = computed(() => menus.filter((menu) => menu.name.toLowerCase().includes(search.value)))
</script>

<template>
  <div class="flex">
    <div class="w-1/6 p-4 border-r relative">
      <h1 class="font-bold">DevTools.id</h1>
      <hr class="my-4" />
      <div class="space-y-4 sticky overflow-auto h-screen">
        <input type="search" v-model="search" placeholder="Type to search" class="w-full rounded-lg border border-gray-300 focus:outline-none p-2 bg-gray-100" />
        <dl>
          <dd v-for="(menu, index) in filteredMenus" :key="index">
            <router-link :to="menu.slug">{{ menu.name }}</router-link>
          </dd>
        </dl>
      </div>
    </div>
    <div class="p-6 w-full">
      <router-view />
    </div>
  </div>
</template>
