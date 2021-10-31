import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', component: () => import('./views/Home.vue') },
  { path: '/base64-decode', component: () => import('./views/Base64Decode.vue') },
  { path: '/base64-encode', component: () => import('./views/Base64Encode.vue') },
  { path: '/url-decode', component: () => import('./views/UrlDecode.vue') },
  { path: '/url-encode', component: () => import('./views/UrlEncode.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

export default router;
