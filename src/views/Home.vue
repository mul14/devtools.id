<script setup lang="ts">
import { useStore } from '../store';

const { menus } = useStore()
</script>

<template>
  <div class="space-y-10">
    <h1 class="text-xl">Welcome</h1>

    <div>Choose whatever you need...</div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <router-link
        v-for="(menu, index) in menus"
        :to="menu.slug"
        class="flex border border-gray rounded-md px-4 py-10 justify-center items-center bg-gradient-to-t from-gray-100 to-gray-50 hover:from-gray-200 hover:to-gray-100 active:from-gray-300 active:to-gray-200"
      >{{ menu.name }}</router-link>
    </div>
  </div>
</template>
