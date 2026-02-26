<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted } from 'vue';
import { useStore } from '../store';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();
const { menus } = store;
const search = ref('');
const searchInputRef = ref<HTMLInputElement | null>(null);

const categories = computed(() => {
  const cats = [...new Set(menus.map(m => m.category))];
  return cats;
});

const filteredMenus = computed(() => {
  if (search.value) {
    return menus.filter(m => 
      m.name.toLowerCase().includes(search.value.toLowerCase())
    );
  }
  // Show first 6 tools as featured
  return menus.slice(0, 6);
});

const getColorClasses = (color: string) => {
  const colors: Record<string, string> = {
    blue: 'bg-blue-500/10 text-blue-500',
    purple: 'bg-purple-500/10 text-purple-500',
    green: 'bg-green-500/10 text-green-500',
    emerald: 'bg-emerald-500/10 text-emerald-500',
    amber: 'bg-amber-500/10 text-amber-500',
    pink: 'bg-pink-500/10 text-pink-500',
    sky: 'bg-sky-500/10 text-sky-500',
    indigo: 'bg-indigo-500/10 text-indigo-500',
  };
  return colors[color] || colors.blue;
};

const handleSearch = () => {
  if (search.value) {
    const filtered = menus.filter(m => 
      m.name.toLowerCase().includes(search.value.toLowerCase())
    );
    if (filtered.length === 1) {
      router.push(filtered[0].slug);
    } else if (filtered.length > 0) {
      // Go to tools page with search
      router.push('/tools');
    }
  }
};

// Navigate to tools page with category
const goToCategory = (category: string) => {
  store.setCategory(category);
  if (category === 'all') {
    router.push('/tools');
  } else {
    router.push(`/tools/${category}`);
  }
};

// Keyboard shortcut handler
const handleKeydown = (e: KeyboardEvent) => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
    e.preventDefault();
    searchInputRef.value?.focus();
  }
};

onMounted(() => {
  document.addEventListener('keydown', handleKeydown);
});

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown);
});

const categoryIcons: Record<string, string> = {
  'Encoders': 'lock',
  'Security': 'shield',
  'Generators': 'auto_fix_high',
  'URL': 'link',
  'Formatters': 'format_align_left',
  'Converters': 'sync_alt',
};

// Tool descriptions for the cards
const toolDescriptions: Record<string, string> = {
  'base64-decode': 'Decode Base64 encoded strings back to their original text format.',
  'base64-encode': 'Encode text strings into Base64 format for safe data transmission.',
  'md5': 'Generate MD5 hash checksums for text strings and verify data integrity.',
  'sha1': 'Create SHA-1 cryptographic hashes for secure string verification.',
  'bcrypt': 'Generate and verify bcrypt password hashes with configurable salt rounds.',
  'slug': 'Convert text strings into URL-friendly slugs for web applications.',
  'url-decode': 'Decode URL-encoded strings back to readable text format.',
  'url-encode': 'Encode special characters in URLs for safe web transmission.',
  'url-parser': 'Parse and analyze URL components including protocol, host, and query params.',
  'hash-generator': 'Generate multiple hash formats (MD5, SHA-1, SHA-256, SHA-512) at once.',
  'password-generator': 'Create strong, secure passwords with customizable length and complexity.',
  'uuid': 'Generate universally unique identifiers (UUID v4) for your applications.',
  'lorem': 'Generate placeholder Lorem Ipsum text for design and development.',
  'text': 'Convert text between different cases: uppercase, lowercase, title case, and more.',
  'epoch': 'Convert between Unix timestamps and human-readable date formats.',
  'json-formatter': 'Prettify, validate and minify JSON data with syntax highlighting.',
  'serialize': 'Serialize and unserialize PHP data structures for debugging.',
};

const getToolDescription = (slug: string): string => {
  return toolDescriptions[slug] || 'A powerful developer utility tool.';
};
</script>

<template>
  <div class="relative min-h-[calc(100vh-57px)] w-full flex flex-col">
    <!-- Hero Section -->
    <main class="flex-1 flex flex-col items-center justify-center px-4 py-12 relative">
      <!-- Floating Cards - Left Side -->
      <div class="absolute left-10 top-1/4 hidden xl:block animate-pulse">
        <div class="glass-card p-6 rounded-xl w-64 neon-glow-green border-green-500/20">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-symbols-outlined text-green-400">data_object</span>
            <h3 class="font-bold text-sm dark:text-white">JSON Formatter</h3>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-mono">Prettify, validate and minify complex JSON structures instantly.</p>
        </div>
      </div>

      <!-- Floating Cards - Right Side -->
      <div class="absolute right-10 bottom-1/4 hidden xl:block">
        <div class="glass-card p-6 rounded-xl w-64 neon-glow-purple border-purple-500/20">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-symbols-outlined text-purple-400">fingerprint</span>
            <h3 class="font-bold text-sm dark:text-white">Hash Generator</h3>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-mono">Generate MD5, SHA-1, SHA-256 hashes securely.</p>
        </div>
      </div>

      <!-- Floating Cards - Bottom Left -->
      <div class="absolute left-20 bottom-1/4 hidden xl:block">
        <div class="glass-card p-6 rounded-xl w-64 neon-glow-blue border-blue-500/20">
          <div class="flex items-center gap-3 mb-2">
            <span class="material-symbols-outlined text-blue-400">lock_open</span>
            <h3 class="font-bold text-sm dark:text-white">Base64 Decoder</h3>
          </div>
          <p class="text-xs text-slate-500 dark:text-slate-400 font-mono">Handle binary-to-text encoding with full character support.</p>
        </div>
      </div>

      <!-- Main Hero Content -->
      <div class="max-w-4xl w-full text-center space-y-8 z-10">
        <div class="space-y-4">
          <span class="inline-block px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold tracking-widest uppercase">
            Developer Toolkit
          </span>
          <h1 class="text-5xl md:text-7xl font-bold tracking-tight text-slate-800 dark:text-transparent dark:bg-gradient-to-b dark:from-white dark:to-slate-500 dark:bg-clip-text">
            Developer Utilities
          </h1>
          <p class="text-slate-500 dark:text-slate-400 text-lg md:text-xl max-w-2xl mx-auto font-light">
            The ultimate high-performance command center for modern engineers. Precision-engineered tools for the elite dev workflow.
          </p>
        </div>

        <!-- Search Bar -->
        <div class="relative max-w-2xl mx-auto group">
          <div class="absolute -inset-1 bg-gradient-to-r from-primary to-emerald-400 rounded-xl blur opacity-25 group-hover:opacity-40 transition duration-1000 group-hover:duration-200"></div>
          <div class="relative flex items-center bg-white dark:bg-obsidian border border-slate-200 dark:border-white/10 rounded-xl px-6 py-4 shadow-xl dark:shadow-2xl">
            <span class="material-symbols-outlined text-slate-400 dark:text-slate-500 mr-4">search</span>
            <input 
              ref="searchInputRef"
              v-model="search"
              @keyup.enter="handleSearch"
              class="search-input w-full bg-transparent border-none outline-none focus:ring-0 focus:outline-none text-lg font-mono placeholder:text-slate-400 dark:placeholder:text-slate-600 text-slate-800 dark:text-white" 
              placeholder="Search tools or type a command..." 
              type="text"
            />
            <div class="hidden sm:flex items-center gap-1.5 ml-4">
              <kbd class="px-2 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-xs text-slate-500 font-mono">Ctrl</kbd>
              <kbd class="px-2 py-1 bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded text-xs text-slate-500 font-mono">K</kbd>
            </div>
          </div>
        </div>

        <!-- Category Buttons - Navigate to /tools -->
        <nav class="flex flex-wrap items-center justify-center gap-3 pt-4">
          <button 
            @click="goToCategory('all')"
            class="flex items-center gap-2 px-5 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:border-primary/50 hover:bg-primary/5 hover:text-slate-700 dark:hover:text-slate-200 transition-all group"
          >
            <span class="material-symbols-outlined text-sm">grid_view</span>
            <span class="text-sm font-medium">All Tools</span>
          </button>
          <button 
            v-for="category in categories" 
            :key="category"
            @click="goToCategory(category)"
            class="flex items-center gap-2 px-5 py-2 rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/5 text-slate-500 dark:text-slate-400 hover:border-primary/50 hover:bg-primary/5 hover:text-slate-700 dark:hover:text-slate-200 transition-all group"
          >
            <span class="material-symbols-outlined text-sm">{{ categoryIcons[category] || 'category' }}</span>
            <span class="text-sm font-medium">{{ category }}</span>
          </button>
        </nav>
      </div>
    </main>

    <!-- Featured Utilities Section -->
    <section class="max-w-6xl mx-auto w-full px-8 pb-20">
      <div class="flex items-center justify-between mb-8 border-b border-slate-200 dark:border-white/5 pb-4">
        <h2 class="text-xl font-bold flex items-center gap-2 text-slate-800 dark:text-white">
          <span class="material-symbols-outlined text-primary">auto_awesome</span>
          Featured Utilities
        </h2>
        <router-link to="/tools" class="text-sm text-primary font-bold hover:underline">
          View All {{ menus.length }} Tools
        </router-link>
      </div>

      <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        <router-link
          v-for="(menu, index) in filteredMenus"
          :key="index"
          :to="menu.slug"
          class="group relative p-[1px] rounded-xl bg-gradient-to-br from-slate-200 dark:from-white/10 to-transparent hover:from-primary/50 transition-all duration-500"
        >
          <div class="bg-white dark:bg-obsidian/90 p-6 rounded-xl h-full border border-slate-200 dark:border-transparent">
            <div :class="getColorClasses(menu.color)" class="size-12 rounded-lg flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
              <span class="material-symbols-outlined">{{ menu.icon }}</span>
            </div>
            <h3 class="text-lg font-bold mb-2 text-slate-800 dark:text-white">{{ menu.name }}</h3>
            <p class="text-slate-500 dark:text-slate-400 text-sm mb-4">{{ getToolDescription(menu.slug) }}</p>
            <div class="flex items-center justify-between">
              <span class="text-xs font-mono text-slate-400 dark:text-slate-500 uppercase tracking-widest">{{ menu.category }}</span>
              <span class="material-symbols-outlined text-slate-400 dark:text-slate-600 group-hover:text-primary group-hover:translate-x-1 transition-all">arrow_forward</span>
            </div>
          </div>
        </router-link>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-slate-50 dark:bg-obsidian/50 border-t border-slate-200 dark:border-white/5 py-12 px-8">
      <div class="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div class="flex items-center gap-3">
          <span class="material-symbols-outlined text-primary text-2xl">terminal</span>
          <h2 class="text-lg font-bold tracking-tight text-slate-800 dark:text-white">devtools<span class="text-primary">.id</span></h2>
        </div>
        <p class="text-slate-400 dark:text-slate-500 text-sm font-mono">{{ menus.length }} developer tools available</p>
        <div class="flex gap-6 text-slate-500 dark:text-slate-400 text-sm">
          <a class="hover:text-primary transition-colors" href="#">Privacy</a>
          <a class="hover:text-primary transition-colors" href="#">Terms</a>
          <a class="hover:text-primary transition-colors" href="https://github.com" target="_blank">Github</a>
        </div>
      </div>
    </footer>
  </div>
</template>
