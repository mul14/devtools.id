<script setup lang="ts">
import { useStore } from '../store';

const { menus } = useStore()
</script>

<template>
  <div class="space-y-10">
    <div class='flex'>
      <div class="text-4xl font-bold text-darkBlue mr-4">&lt; | &gt;</div>
      <div>
        <div class="text-4xl font-bold text-darkBlue">Welcome</div>
        <div class="text-lg mt-2 text-darkBlue">Online Trivial Tools for Developers, choose whatever you need...</div>
      </div>
    </div>

    <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      <router-link
        v-for="(menu, index) in menus"
        :to="menu.slug"
        class="flex bg-white shadow-custom border-darkBlue rounded-md px-4 py-10 justify-center items-center text-base uppercase font-medium text-darkBlue"
      >{{ menu.name }}</router-link>
    </div>
  </div>
</template>
