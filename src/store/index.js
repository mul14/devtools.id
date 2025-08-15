import { defineStore } from 'pinia'

export const useStore = defineStore('main', {
  state: () => {
    return {
      menus: [
        { name: 'Base64 Decode', slug: 'base64-decode' },
        { name: 'Base64 Encode', slug: 'base64-encode' },
        { name: 'MD5 Hash', slug: 'md5' },
        { name: 'SHA1 Hash', slug: 'sha1' },
        { name: 'Bcrypt Hash', slug: 'bcrypt' },
        { name: 'Slug Generator', slug: 'slug' },
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
        { name: 'Serialize (PHP)', slug: 'serialize' },
      ]
    }
  },
})
