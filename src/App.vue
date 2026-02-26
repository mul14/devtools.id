<script setup lang="ts">
  import { computed, ref, onMounted, onUnmounted, watch } from 'vue'
  import { useStore } from './store';
  import { storeToRefs } from 'pinia';
  import { useRouter, useRoute } from 'vue-router';

  const router = useRouter();
  const route = useRoute();
  const store = useStore();

  // Use storeToRefs to maintain reactivity for state and getters
  const { menus, selectedCategory, categoryIcons, categories } = storeToRefs(store);

  const search = ref('');
  const isMenuOpen = ref(false)
  const isDark = ref(true)
  const searchInputRef = ref<HTMLInputElement | null>(null);

  const toggleMenu = () => isMenuOpen.value = !isMenuOpen.value

  const toggleTheme = () => {
    isDark.value = !isDark.value
    if (isDark.value) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = 'light'
    }
  }

  // Keyboard shortcut handler
  const handleKeydown = (e: KeyboardEvent) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
      e.preventDefault();
      searchInputRef.value?.focus();
    }
  };

  onMounted(() => {
    isDark.value = document.documentElement.classList.contains('dark')
    document.addEventListener('keydown', handleKeydown);
  })

  onUnmounted(() => {
    document.removeEventListener('keydown', handleKeydown);
  })

  // Check if current route is home page
  const isHomePage = computed(() => route.path === '/')
  
  // Check if current route is tools page (with or without category)
  const isToolsPage = computed(() => route.path.startsWith('/tools'))
  
  // Check if sidebar should be shown (tools page or individual tool page, but not home)
  const showSidebar = computed(() => !isHomePage.value)

  // Watch route changes to update category from URL
  watch(() => route.params.category, (category) => {
    if (route.path.startsWith('/tools')) {
      if (category && typeof category === 'string') {
        store.setCategory(category);
      } else {
        store.setCategory('all');
      }
    }
  }, { immediate: true });

  const selectCategory = (category: string) => {
    store.setCategory(category);
    if (category === 'all') {
      router.push('/tools');
    } else {
      router.push(`/tools/${category}`);
    }
    if (isMenuOpen.value) {
      isMenuOpen.value = false;
    }
  }

  const getCategoryLabel = (category: string) => {
    return category === 'all' ? 'All Tools' : category;
  }
</script>

<template>
  <div class="min-h-screen bg-background-light dark:bg-background-dark transition-colors duration-300" :class="isDark ? 'grid-pattern' : ''">
    <!-- Header -->
    <header class="flex items-center justify-between px-6 py-3 border-b border-border-light dark:border-white/5 bg-white/80 dark:bg-background-dark/80 backdrop-blur-md sticky top-0 z-50">
      <div class="flex items-center gap-8">
        <router-link to="/" class="flex items-center gap-3">
          <div class="size-8 flex items-center justify-center text-primary">
            <span class="material-symbols-outlined text-3xl">terminal</span>
          </div>
          <h2 class="text-xl font-bold tracking-tight text-slate-800 dark:text-white">devtools<span class="text-primary">.id</span></h2>
        </router-link>
        <nav class="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500 dark:text-slate-400">
          <router-link to="/tools" class="hover:text-primary transition-colors">Explore</router-link>
        </nav>
      </div>
      <div class="flex items-center gap-4">
        <!-- Search in header - only show when sidebar is visible -->
        <label v-if="showSidebar" class="hidden md:flex flex-col min-w-[240px] h-10 max-w-md group">
          <div class="flex w-full flex-1 items-stretch rounded-lg h-full bg-slate-50 dark:bg-surface border border-slate-200 dark:border-white/5 group-focus-within:border-primary/50 transition-all">
            <div class="text-slate-400 flex items-center justify-center pl-4">
              <span class="material-symbols-outlined text-xl">search</span>
            </div>
            <input 
              ref="searchInputRef"
              v-model="search"
              class="search-input w-full min-w-0 flex-1 bg-transparent border-none focus:ring-0 text-slate-800 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 px-3 text-sm" 
              placeholder="Search tools (Ctrl + K)" 
            />
          </div>
        </label>
        <!-- Theme toggle -->
        <button 
          @click="toggleTheme" 
          class="p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors"
          :title="isDark ? 'Switch to light mode' : 'Switch to dark mode'"
        >
          <span class="material-symbols-outlined text-slate-500 dark:text-slate-400" v-if="isDark">light_mode</span>
          <span class="material-symbols-outlined text-slate-500 dark:text-slate-400" v-else>dark_mode</span>
        </button>
        <!-- Mobile menu toggle - only show when sidebar should be visible -->
        <button v-if="showSidebar" @click="toggleMenu" class="lg:hidden p-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/5 transition-colors">
          <span class="material-symbols-outlined text-slate-500 dark:text-slate-400" :class="isMenuOpen ? 'hidden' : ''">menu</span>
          <span class="material-symbols-outlined text-slate-500 dark:text-slate-400" :class="isMenuOpen ? '' : 'hidden'">close</span>
        </button>
      </div>
    </header>

    <!-- Main Layout -->
    <div class="flex flex-1 overflow-hidden">
      <!-- Sidebar - Show on tools page and individual tool pages -->
      <aside 
        v-if="showSidebar"
        class="w-64 border-r border-border-light dark:border-white/5 bg-white dark:bg-background-dark/50 lg:flex flex-col p-6 gap-8 overflow-y-auto h-[calc(100vh-57px)]"
        :class="isMenuOpen ? 'fixed inset-0 top-[57px] z-40 flex' : 'hidden'"
      >
        <!-- Categories Section -->
        <div class="flex flex-col gap-4">
          <div class="px-2">
            <h1 class="text-slate-800 dark:text-slate-100 text-sm font-semibold uppercase tracking-wider">Categories</h1>
            <p class="text-slate-500 text-xs mt-1">Filter your workbench</p>
          </div>
          <nav class="flex flex-col gap-1 category-nav">
            <button
              v-for="category in categories"
              :key="category"
              @click="selectCategory(category)"
              :class="selectedCategory === category 
                ? 'bg-primary/10 text-primary border border-primary/20' 
                : 'text-slate-500 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-surface hover:text-slate-800 dark:hover:text-slate-100 border border-transparent'"
              class="flex items-center gap-3 px-3 py-2.5 rounded-lg transition-all text-left"
            >
              <span class="material-symbols-outlined text-[20px]">{{ categoryIcons[category] || 'category' }}</span>
              <span class="text-sm font-medium">{{ getCategoryLabel(category) }}</span>
            </button>
          </nav>
        </div>

        <!-- Open Source Card -->
        <div class="flex flex-col gap-4 mt-auto">
          <div class="p-4 rounded-xl bg-gradient-to-br from-primary/20 to-transparent border border-primary/10">
            <p class="text-xs text-primary font-bold mb-1">OPEN SOURCE</p>
            <p class="text-xs text-slate-500 dark:text-slate-400 mb-3 leading-relaxed">Built with Vue.js. Contribute on GitHub.</p>
            <a 
              href="https://github.com" 
              target="_blank"
              class="block w-full py-2 text-xs font-bold bg-primary text-white rounded-lg text-center hover:bg-primary/90 transition-colors"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </aside>

      <!-- Main Content -->
      <main 
        class="flex-1 min-h-[calc(100vh-57px)] overflow-y-auto"
        :class="[
          isMenuOpen && showSidebar ? 'hidden lg:block' : '',
          showSidebar ? 'bg-slate-50 dark:bg-background-dark p-6 md:p-10' : ''
        ]"
      >
        <router-view />
      </main>
    </div>
  </div>
</template>

<style scoped>
.category-nav button.text-primary .material-symbols-outlined {
  color: #42b883;
}
</style>
