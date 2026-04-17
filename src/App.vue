<template>
  <div class="app-container">
    <router-view v-slot="{ Component }">
      <keep-alive>
        <component :is="Component" v-if="$route.meta.tab" />
      </keep-alive>
      <component :is="Component" v-if="!$route.meta.tab" />
    </router-view>
    <div class="tab-bar" v-if="showTabBar">
      <div class="tab-item" v-for="tab in tabs" :key="tab.path"
           :class="{ active: currentTab === tab.index }"
           @click="switchTab(tab.path)">
        <div class="tab-icon" v-html="tab.icon"></div>
        <span>{{ tab.label }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()

const tabs = [
  { path: '/index', label: '企业首页', index: 0, icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>' },
  { path: '/gate/verify', label: '门岗核验', index: 1, icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/></svg>' },
  { path: '/my', label: '我的', index: 2, icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>' },
]

const showTabBar = computed(() => route.meta.tab === true)
const currentTab = computed(() => route.meta.tabIndex ?? -1)

function switchTab(path) {
  router.push(path)
}
</script>

<style>
* { margin: 0; padding: 0; box-sizing: border-box; }
html, body, #app { width: 100%; height: 100%; background: #F5F6FA; }
body { font-family: -apple-system, BlinkMacSystemFont, 'PingFang SC', 'Microsoft YaHei', sans-serif; color: #333; font-size: 14px; -webkit-font-smoothing: antialiased; }

.app-container {
  max-width: 450px;
  margin: 0 auto;
  min-height: 100vh;
  background: #F5F6FA;
  position: relative;
}

/* TabBar */
.tab-bar {
  position: fixed;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 100%;
  max-width: 450px;
  height: 56px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: space-around;
  box-shadow: 0 -1px 8px rgba(0,0,0,0.06);
  z-index: 999;
}
.tab-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  cursor: pointer;
  color: #999;
  font-size: 11px;
  transition: color 0.2s;
}
.tab-item.active { color: #4A90D9; }
.tab-item .tab-icon { width: 24px; height: 24px; }
.tab-item .tab-icon svg { display: block; }

/* Common card */
.card {
  background: #fff;
  border-radius: 12px;
  padding: 16px;
  margin: 12px 16px;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}

/* Section header */
.section-header {
  display: flex;
  align-items: center;
  padding: 16px 16px 8px;
  font-size: 16px;
  font-weight: 600;
  color: #333;
}
.section-header::before {
  content: '';
  display: inline-block;
  width: 4px;
  height: 18px;
  background: #4A90D9;
  border-radius: 2px;
  margin-right: 8px;
}

/* Status tags */
.tag {
  display: inline-block;
  padding: 2px 10px;
  border-radius: 10px;
  font-size: 12px;
  font-weight: 500;
}
.tag-active { background: #E8F5E9; color: #43A047; }
.tag-expired { background: #FFF3E0; color: #EF6C00; }
.tag-used { background: #E3F2FD; color: #1976D2; }
.tag-pending { background: #FFF8E1; color: #F9A825; }
.tag-verified { background: #E8F5E9; color: #43A047; }
.tag-rejected { background: #FFEBEE; color: #E53935; }

/* Nav bar */
.nav-bar {
  height: 48px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 17px;
  font-weight: 600;
  position: sticky;
  top: 0;
  z-index: 100;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.nav-bar .back {
  position: absolute;
  left: 12px;
  cursor: pointer;
  font-size: 20px;
  color: #666;
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
}

/* Button */
.btn {
  display: block;
  width: 100%;
  padding: 14px;
  border: none;
  border-radius: 12px;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  text-align: center;
  transition: opacity 0.2s;
}
.btn:active { opacity: 0.7; }
.btn-primary { background: linear-gradient(135deg, #4A90D9, #5BA3EC); color: #fff; }
.btn-success { background: linear-gradient(135deg, #43A047, #66BB6A); color: #fff; }
.btn-danger { background: linear-gradient(135deg, #E53935, #EF5350); color: #fff; }
.btn-outline { background: #fff; color: #4A90D9; border: 1px solid #4A90D9; }

/* Form */
.form-group {
  margin-bottom: 16px;
}
.form-label {
  display: block;
  font-size: 14px;
  color: #666;
  margin-bottom: 6px;
  font-weight: 500;
}
.form-label .required { color: #E53935; margin-right: 2px; }
.form-input {
  width: 100%;
  height: 44px;
  padding: 0 12px;
  border: 1px solid #E8E8E8;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  transition: border-color 0.2s;
  background: #FAFAFA;
}
.form-input:focus { border-color: #4A90D9; background: #fff; }
.form-textarea {
  width: 100%;
  padding: 12px;
  border: 1px solid #E8E8E8;
  border-radius: 10px;
  font-size: 15px;
  outline: none;
  resize: none;
  min-height: 80px;
  background: #FAFAFA;
}
.form-textarea:focus { border-color: #4A90D9; background: #fff; }

/* Page padding for tabbar */
.page-with-tab { padding-bottom: 70px; }
.page-with-nav { padding-bottom: 20px; }
</style>
