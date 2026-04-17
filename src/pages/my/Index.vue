<template>
  <div class="page-with-tab">
    <!-- Header -->
    <div class="my-header">
      <div class="my-avatar">{{ user.name.charAt(0) }}</div>
      <div class="my-name">{{ user.name }}</div>
      <div class="my-role">{{ user.role }} · {{ user.company }}</div>
    </div>

    <!-- Menu -->
    <div class="card" style="padding: 0;">
      <div v-for="(item, idx) in menuItems" :key="idx" class="menu-item" @click="item.action">
        <div class="menu-left">
          <div class="menu-icon" :style="{ background: item.color }">
            <span v-html="item.icon"></span>
          </div>
          <span class="menu-text">{{ item.label }}</span>
        </div>
        <span class="menu-arrow">&#8250;</span>
      </div>
    </div>

    <!-- Logout -->
    <div style="padding: 16px;">
      <button class="btn" style="background: #fff; color: #E53935; border: 1px solid #FFCDD2;" @click="logout">退出登录</button>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { currentUser } from '../../utils/mock.js'

const router = useRouter()
const user = currentUser

const menuItems = [
  { label: '个人信息', color: '#4A90D9', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>', action: () => alert('个人信息页面') },
  { label: '企业信息', color: '#FF8C5A', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/></svg>', action: () => alert('企业信息页面') },
  { label: '操作日志', color: '#9B6BFF', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>', action: () => router.push('/my/logs') },
  { label: '系统设置', color: '#5BC5C8', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 01-2.83 2.83l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-4 0v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83-2.83l.06-.06A1.65 1.65 0 004.68 15a1.65 1.65 0 00-1.51-1H3a2 2 0 010-4h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 012.83-2.83l.06.06A1.65 1.65 0 009 4.68a1.65 1.65 0 001-1.51V3a2 2 0 014 0v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 2.83l-.06.06A1.65 1.65 0 0019.4 9a1.65 1.65 0 001.51 1H21a2 2 0 010 4h-.09a1.65 1.65 0 00-1.51 1z"/></svg>', action: () => alert('系统设置页面') },
  { label: '关于我们', color: '#FF6B8A', icon: '<svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/></svg>', action: () => alert('园区访客管理系统 v1.0.0') },
]

function logout() { alert('已退出登录') }
</script>

<style scoped>
.my-header {
  background: linear-gradient(135deg, #4A90D9, #5BA3EC);
  padding: 40px 16px 32px;
  text-align: center;
  border-radius: 0 0 24px 24px;
}
.my-avatar {
  width: 64px; height: 64px; border-radius: 50%;
  background: rgba(255,255,255,0.25); color: #fff;
  font-size: 28px; font-weight: 700;
  display: flex; align-items: center; justify-content: center;
  margin: 0 auto 12px;
}
.my-name { color: #fff; font-size: 20px; font-weight: 700; }
.my-role { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 4px; }

.menu-item {
  display: flex; align-items: center; justify-content: space-between;
  padding: 14px 16px;
  border-bottom: 1px solid #F5F5F5;
  cursor: pointer;
  transition: background 0.15s;
}
.menu-item:last-child { border-bottom: none; }
.menu-item:active { background: #F9F9F9; }
.menu-left { display: flex; align-items: center; gap: 12px; }
.menu-icon {
  width: 32px; height: 32px; border-radius: 8px;
  display: flex; align-items: center; justify-content: center;
}
.menu-text { font-size: 15px; color: #333; }
.menu-arrow { font-size: 20px; color: #ccc; }
</style>
