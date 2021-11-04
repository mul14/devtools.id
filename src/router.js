import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/base64-decode', component: () => import('./views/Base64Decode.vue') },
  { path: '/base64-encode', component: () => import('./views/Base64Encode.vue') },
  { path: '/url-decode', component: () => import('./views/UrlDecode.vue') },
  { path: '/url-encode', component: () => import('./views/UrlEncode.vue') },
  { path: '/url-parser', component: () => import('./views/UrlParser.vue') },
  { path: '/hash-generator', component: () => import('./views/HashGenerator.vue') },
  { path: '/password-generator', component: () => import('./views/PasswordGenerator.vue') },
  { path: '/uuid', component: () => import('./views/UUID.vue') },
  { path: '/lorem', component: () => import('./views/Lorem.vue') },
  { path: '/text', component: () => import('./views/TextConverter.vue') },
  { path: '/epoch', component: () => import('./views/EpochConverter.vue') },
  { path: '/json-formatter', component: () => import('./views/JsonFormatter.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
