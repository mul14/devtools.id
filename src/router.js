import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    component: () => import('./views/Home.vue'),
  },
  {
    path: '/base64-decode',
    component: () => import('./views/Base64Decode.vue'),
    meta: {
      title: 'Base64 Decode',
    },
  },
  {
    path: '/base64-encode',
    component: () => import('./views/Base64Encode.vue'),
    meta: {
      title: 'Base64 Encode',
    },
  },
  {
    path: '/url-decode',
    component: () => import('./views/UrlDecode.vue'),
    meta: {
      title: 'URL Decode',
    },
  },
  {
    path: '/url-encode',
    component: () => import('./views/UrlEncode.vue'),
    meta: {
      title: 'URL Encode',
    },
  },
  {
    path: '/url-parser',
    component: () => import('./views/UrlParser.vue'),
    meta: {
      title: 'URL Parser',
    },
  },
  {
    path: '/hash-generator',
    component: () => import('./views/HashGenerator.vue'),
    meta: {
      title: 'Hash Generator',
    },
  },
  {
    path: '/password-generator',
    component: () => import('./views/PasswordGenerator.vue'),
    meta: {
      title: 'Password Generator',
    },
  },
  {
    path: '/uuid',
    component: () => import('./views/UUID.vue'),
    meta: {
      title: 'UUID Generator',
    },
  },
  {
    path: '/lorem',
    component: () => import('./views/Lorem.vue'),
    meta: {
      title: 'Lorem Ipsum Generator',
    },
  },
  {
    path: '/text',
    component: () => import('./views/TextConverter.vue'),
    meta: {
      title: 'Text Converter',
    },
  },
  {
    path: '/epoch',
    component: () => import('./views/EpochConverter.vue'),
    meta: {
      title: 'Epoch Converter',
    },
  },
  {
    path: '/json-formatter',
    component: () => import('./views/JsonFormatter.vue'),
    meta: {
      title: 'JSON Formatter',
    },
  },
  {
    path: '/serialize',
    component: () => import('./views/Serializer.vue'),
    meta: {
      title: 'Serialize (PHP)',
    },
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.afterEach((to, from) => {
  const title = to.meta.title || 'Trivial Tools and Utilities for Developers';
  document.title = `DevTools.id - ${title}`
})

export default router;
