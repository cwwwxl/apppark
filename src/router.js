import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  { path: '/', redirect: '/index' },
  { path: '/index', component: () => import('./pages/index/Index.vue'), meta: { tab: true, tabIndex: 0 } },
  { path: '/gate/verify', component: () => import('./pages/gate/Verify.vue'), meta: { tab: true, tabIndex: 1 } },
  { path: '/my', component: () => import('./pages/my/Index.vue'), meta: { tab: true, tabIndex: 2 } },
  { path: '/qrcode/generate', component: () => import('./pages/qrcode/Generate.vue') },
  { path: '/qrcode/share', component: () => import('./pages/qrcode/Share.vue') },
  { path: '/qrcode/records', component: () => import('./pages/qrcode/Records.vue') },
  { path: '/visitor/fill', component: () => import('./pages/visitor/Fill.vue') },
  { path: '/visitor/pass', component: () => import('./pages/visitor/Pass.vue') },
  { path: '/visitor/records', component: () => import('./pages/visitor/Records.vue') },
  { path: '/gate/result', component: () => import('./pages/gate/Result.vue') },
  { path: '/my/logs', component: () => import('./pages/my/Logs.vue') },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
