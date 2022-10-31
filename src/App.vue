<script setup lang="ts">
  import { computed, ref, reactive, watch } from 'vue'
  import { useStore } from './store';
  import { useRouter, useRoute } from 'vue-router';
  import Arrow from "./icons/Arrow.vue";

  const router = useRouter();
  const route = useRoute();
  const historyState = reactive({
    allowBack: false,
    allowForward: false,
  })

  const search = ref('');

  const isMenuOpen = ref(false)
  const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value

  const { menus } = useStore();

  const filteredMenus = computed(() => menus.filter((menu) => menu.name.toLowerCase().includes(search.value)))

  watch(
    () => route.fullPath,
    (val, oldVal) => {
      historyState.allowBack = window.history.state.back
      historyState.allowForward = window.history.state.forward
    }
  )
</script>

<template>
  <div class="p-4 bg-white border-b-2 border-gray flex justify-between items-center">
    <button @click="toggleMenu" class="">
      <span class="text-3xl -mt-2 lg:hidden" :class="isMenuOpen ? 'hidden' : ''">☰</span>
      <span class="text-3xl ml-2 lg:hidden" :class="isMenuOpen ? '' : 'hidden'">&times;</span>
    </button>
    <h1 class="font-extrabold text-xl text-darkBlue uppercase">
      <router-link to="/" title="Trivial Tools and Utilities for Developers">
        DevTools.id
      </router-link>
    </h1>
    <nav>
      <button @click="router.back()" :disabled="!historyState.allowBack" class="px-2 py-2 rounded-xl border border-transparent text-gray-600 hover:border-gray active:shadow-custom disabled:opacity-25 disabled:hover:border-transparent disabled:active:bg-transparent" title="Previous">
        <Arrow class="rotate-180 w-5" />
      </button>
      <button @click="router.forward()" :disabled="!historyState.allowForward" class="px-2 py-2 rounded-xl border border-transparent text-gray-600 hover:border-gray active:shadow-custom disabled:opacity-25 disabled:hover:border-transparent disabled:active:bg-transparent" title="Next">
        <Arrow class="w-5"/>
      </button>
    </nav>
  </div>
  <div class="flex bg-ghostWhite">
    <div class="w-full sm:w-1/3 lg:w-3/12 p-4 border-r border-gray relative lg:block " :class="isMenuOpen ? '': 'hidden'">
      <input type="search" v-model="search" placeholder="Type to search" class="block w-full rounded-md border-gray-300 py-3 px-4 shadow-sm focus:border-indigo-500 focus:ring-indigo-500" />
      <nav class="space-y-4 sticky overflow-auto h-screen py-2">
        <dl class="space-y-0.5">
          <dd v-for="(menu, index) in filteredMenus" :key="index">
            <router-link
              :to="menu.slug"
              @click="toggleMenu"
              class="block px-4 py-2 border-t border-gray text-darkBlue text-sm font-normal">
              {{ menu.name }}
            </router-link>
          </dd>
        </dl>
      </nav>
    </div>
    <div
      class="px-6 pt-6 pb-56 w-full sm:block"
      :class="isMenuOpen ? 'hidden': ''"
    >
      <router-view />
    </div>
  </div>
</template>

<style scoped>
  nav .router-link-exact-active {
    background: #604fcd;
    font-size: medium;
    color: white;
    font-weight: 600;
    font-family: monospace;
  }
</style>
