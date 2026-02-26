<script setup lang="ts">
import { computed } from 'vue';
import { useStore } from '../store';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

const router = useRouter();
const store = useStore();

// Use storeToRefs to maintain reactivity for state properties
const { menus, selectedCategory } = storeToRefs(store);

const filteredMenus = computed(() => {
  if (selectedCategory.value === 'all') {
    return menus.value;
  }
  return menus.value.filter(m => m.category === selectedCategory.value);
});

const getColorClasses = (color: string) => {
  const colors: Record<string, { bg: string; border: string; text: string }> = {
    blue: { bg: 'bg-blue-500/10', border: 'border-blue-500/20', text: 'text-blue-400' },
    purple: { bg: 'bg-purple-500/10', border: 'border-purple-500/20', text: 'text-purple-400' },
    green: { bg: 'bg-green-500/10', border: 'border-green-500/20', text: 'text-green-400' },
    emerald: { bg: 'bg-emerald-500/10', border: 'border-emerald-500/20', text: 'text-emerald-400' },
    amber: { bg: 'bg-amber-500/10', border: 'border-amber-500/20', text: 'text-amber-400' },
    pink: { bg: 'bg-pink-500/10', border: 'border-pink-500/20', text: 'text-pink-400' },
    sky: { bg: 'bg-sky-500/10', border: 'border-sky-500/20', text: 'text-sky-400' },
    indigo: { bg: 'bg-indigo-500/10', border: 'border-indigo-500/20', text: 'text-indigo-400' },
  };
  return colors[color] || colors.blue;
};

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

const getCategoryTitle = computed(() => {
  return selectedCategory.value === 'all' ? 'All Tools' : selectedCategory.value;
});
</script>

<template>
  <div class="flex-1">
    <!-- Utility Grid Section -->
    <section>
      <div class="flex items-center justify-between mb-8">
        <div>
          <h2 class="text-slate-800 dark:text-slate-100 text-2xl font-bold tracking-tight">{{ getCategoryTitle }}</h2>
          <p class="text-slate-500 text-sm mt-1">{{ filteredMenus.length }} tools available</p>
        </div>
      </div>

      <div class="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        <router-link
          v-for="(menu, index) in filteredMenus"
          :key="index"
          :to="'/' + menu.slug"
          class="group relative bg-white dark:bg-surface border border-slate-200 dark:border-white/5 rounded-xl p-6 transition-all duration-300 hover:border-primary/60 hover:shadow-[0_0_20px_rgba(66,184,131,0.15)] cursor-pointer overflow-hidden"
        >
          <div class="flex justify-between items-start mb-4">
            <div 
              :class="[getColorClasses(menu.color).bg, getColorClasses(menu.color).border, getColorClasses(menu.color).text]"
              class="size-12 rounded-xl border flex items-center justify-center group-hover:scale-110 transition-transform"
            >
              <span class="material-symbols-outlined text-3xl">{{ menu.icon }}</span>
            </div>
            <span class="px-2 py-1 rounded text-[10px] font-bold uppercase tracking-wider bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-white/10">
              {{ menu.category }}
            </span>
          </div>
          <h3 class="text-slate-800 dark:text-slate-100 text-lg font-bold mb-2">{{ menu.name }}</h3>
          <p class="text-slate-500 dark:text-slate-400 text-sm leading-relaxed mb-6">{{ getToolDescription(menu.slug) }}</p>
          <div class="flex items-center justify-end text-xs font-semibold text-slate-500">
            <span class="group-hover:text-primary transition-colors flex items-center gap-1">
              Open Tool 
              <span class="material-symbols-outlined text-sm">arrow_forward</span>
            </span>
          </div>
        </router-link>
      </div>
    </section>
  </div>
</template>
