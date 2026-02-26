import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      selectedCategory: 'all',
      menus: [
        { name: 'Base64 Decode', slug: 'base64-decode', icon: 'lock_open', color: 'blue', category: 'Encoders' },
        { name: 'Base64 Encode', slug: 'base64-encode', icon: 'lock', color: 'blue', category: 'Encoders' },
        { name: 'MD5 Hash', slug: 'md5', icon: 'fingerprint', color: 'purple', category: 'Security' },
        { name: 'SHA1 Hash', slug: 'sha1', icon: 'shield', color: 'purple', category: 'Security' },
        { name: 'Bcrypt Hash', slug: 'bcrypt', icon: 'enhanced_encryption', color: 'purple', category: 'Security' },
        { name: 'Slug Generator', slug: 'slug', icon: 'link', color: 'green', category: 'Generators' },
        { name: 'URL Decode', slug: 'url-decode', icon: 'http', color: 'emerald', category: 'URL' },
        { name: 'URL Encode', slug: 'url-encode', icon: 'public', color: 'emerald', category: 'URL' },
        { name: 'URL Parser', slug: 'url-parser', icon: 'travel_explore', color: 'emerald', category: 'URL' },
        { name: 'Hash Generator', slug: 'hash-generator', icon: 'password', color: 'purple', category: 'Security' },
        { name: 'Password Generator', slug: 'password-generator', icon: 'key', color: 'amber', category: 'Generators' },
        { name: 'UUID Generator', slug: 'uuid', icon: 'tag', color: 'green', category: 'Generators' },
        { name: 'Lorem Ipsum', slug: 'lorem', icon: 'notes', color: 'pink', category: 'Generators' },
        { name: 'Text Converter', slug: 'text', icon: 'text_fields', color: 'sky', category: 'Formatters' },
        { name: 'Epoch Converter', slug: 'epoch', icon: 'schedule', color: 'amber', category: 'Converters' },
        { name: 'JSON Formatter', slug: 'json-formatter', icon: 'data_object', color: 'green', category: 'Formatters' },
        { name: 'Serialize (PHP)', slug: 'serialize', icon: 'code', color: 'indigo', category: 'Converters' },
      ],
      categoryIcons: {
        'all': 'grid_view',
        'Encoders': 'lock',
        'Security': 'shield',
        'Generators': 'auto_fix_high',
        'URL': 'link',
        'Formatters': 'format_align_left',
        'Converters': 'sync_alt',
      }
    }
  },
  getters: {
    categories: (state) => {
      return ['all', ...new Set(state.menus.map(m => m.category))];
    },
    filteredMenus: (state) => {
      if (state.selectedCategory === 'all') {
        return state.menus;
      }
      return state.menus.filter(m => m.category === state.selectedCategory);
    }
  },
  actions: {
    setCategory(category) {
      this.selectedCategory = category;
    }
  }
})
