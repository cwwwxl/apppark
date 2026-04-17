<template>
  <div class="page-with-tab">
    <!-- Header -->
    <div class="home-header">
      <div class="header-top">
        <div class="header-info">
          <div class="header-title">园区智慧管理</div>
          <div class="header-sub">{{ company.name }}</div>
        </div>
        <div class="header-avatar">{{ company.contact.charAt(0) }}</div>
      </div>
      <div class="stats-row">
        <div class="stat-item">
          <div class="stat-num">{{ activeQr }}</div>
          <div class="stat-label">有效邀访码</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">{{ todayVisitors }}</div>
          <div class="stat-label">今日访客</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">{{ totalVisitors }}</div>
          <div class="stat-label">累计访客</div>
        </div>
        <div class="stat-item">
          <div class="stat-num">{{ availableProps }}</div>
          <div class="stat-label">待租房源</div>
        </div>
      </div>
    </div>

    <!-- 邀访管理 -->
    <div class="section-header">邀访管理</div>
    <div class="card">
      <div class="icon-grid">
        <div class="icon-item" @click="go('/qrcode/generate')">
          <div class="icon-box" style="background: linear-gradient(135deg, #FF6B8A, #FF8FA3)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><path d="M14 14h3v3m4 0v-3h-3m0 6h3"/></svg>
          </div>
          <span>生成邀访码</span>
        </div>
        <div class="icon-item" @click="go('/qrcode/records')">
          <div class="icon-box" style="background: linear-gradient(135deg, #4A90D9, #6BA8E8)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <span>邀访记录</span>
        </div>
        <div class="icon-item" @click="go('/visitor/records')">
          <div class="icon-box" style="background: linear-gradient(135deg, #FF8C5A, #FFA875)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 00-3-3.87"/><path d="M16 3.13a4 4 0 010 7.75"/></svg>
          </div>
          <span>访客记录</span>
        </div>
        <div class="icon-item" @click="go('/visitor/fill')">
          <div class="icon-box" style="background: linear-gradient(135deg, #9B6BFF, #B48FFF)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M16 4h2a2 2 0 012 2v14a2 2 0 01-2 2H6a2 2 0 01-2-2V6a2 2 0 012-2h2"/><rect x="8" y="2" width="8" height="4" rx="1"/><line x1="12" y1="11" x2="12" y2="17"/><line x1="9" y1="14" x2="15" y2="14"/></svg>
          </div>
          <span>访客登记</span>
        </div>
      </div>
    </div>

    <!-- 通行管理 -->
    <div class="section-header">通行管理</div>
    <div class="card">
      <div class="icon-grid">
        <div class="icon-item" @click="go('/gate/verify')">
          <div class="icon-box" style="background: linear-gradient(135deg, #5BC5C8, #7DD9DB)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
          </div>
          <span>门岗核验</span>
        </div>
        <div class="icon-item" @click="go('/visitor/pass')">
          <div class="icon-box" style="background: linear-gradient(135deg, #FF6B8A, #FF8FA3)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="2" y="5" width="20" height="14" rx="2"/><line x1="2" y1="10" x2="22" y2="10"/></svg>
          </div>
          <span>通行证</span>
        </div>
        <div class="icon-item" @click="go('/qrcode/share')">
          <div class="icon-box" style="background: linear-gradient(135deg, #4A90D9, #6BA8E8)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" y1="13.51" x2="15.42" y2="17.49"/><line x1="15.41" y1="6.51" x2="8.59" y2="10.49"/></svg>
          </div>
          <span>分享邀访码</span>
        </div>
        <div class="icon-item" @click="go('/my/logs')">
          <div class="icon-box" style="background: linear-gradient(135deg, #FF8C5A, #FFA875)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
          </div>
          <span>通行记录</span>
        </div>
      </div>
    </div>

    <!-- 租售管理 -->
    <div class="section-header">租售管理</div>
    <div class="card">
      <div class="icon-grid">
        <div class="icon-item" @click="go('/property/list')">
          <div class="icon-box" style="background: linear-gradient(135deg, #FF6B8A, #FF8FA3)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z"/><polyline points="9,22 9,12 15,12 15,22"/></svg>
          </div>
          <span>房源管理</span>
        </div>
        <div class="icon-item" @click="go('/property/edit')">
          <div class="icon-box" style="background: linear-gradient(135deg, #4A90D9, #6BA8E8)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          </div>
          <span>发布房源</span>
        </div>
        <div class="icon-item" @click="go('/order/list')">
          <div class="icon-box" style="background: linear-gradient(135deg, #FF8C5A, #FFA875)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/></svg>
          </div>
          <span>租售订单</span>
        </div>
        <div class="icon-item" @click="go('/stats/index')">
          <div class="icon-box" style="background: linear-gradient(135deg, #9B6BFF, #B48FFF)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><line x1="18" y1="20" x2="18" y2="10"/><line x1="12" y1="20" x2="12" y2="4"/><line x1="6" y1="20" x2="6" y2="14"/></svg>
          </div>
          <span>数据统计</span>
        </div>
      </div>
    </div>

    <!-- 其它 -->
    <div class="section-header">其它</div>
    <div class="card">
      <div class="icon-grid">
        <div class="icon-item" @click="go('/my/logs')">
          <div class="icon-box" style="background: linear-gradient(135deg, #5BC5C8, #7DD9DB)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M18 8A6 6 0 006 8c0 7-3 9-3 9h18s-3-2-3-9"/><path d="M13.73 21a2 2 0 01-3.46 0"/></svg>
          </div>
          <span>通知</span>
        </div>
        <div class="icon-item" @click="go('/my/logs')">
          <div class="icon-box" style="background: linear-gradient(135deg, #9B6BFF, #B48FFF)">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"/><polyline points="14,2 14,8 20,8"/><line x1="16" y1="13" x2="8" y2="13"/><line x1="16" y1="17" x2="8" y2="17"/><polyline points="10,9 9,9 8,9"/></svg>
          </div>
          <span>操作日志</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentCompany, qrcodeRecords, visitorRecords, properties } from '../../utils/mock.js'

const router = useRouter()
const company = currentCompany

const activeQr = computed(() => qrcodeRecords.filter(q => q.status === 'active').length)
const todayVisitors = computed(() => visitorRecords.filter(v => v.verifyTime.includes('2026-04-17')).length || 2)
const totalVisitors = computed(() => visitorRecords.length)
const availableProps = computed(() => properties.filter(p => p.status === 'available').length)

function go(path) {
  router.push(path)
}
</script>

<style scoped>
.home-header {
  background: linear-gradient(135deg, #4A90D9 0%, #5BA3EC 100%);
  padding: 20px 16px 24px;
  border-radius: 0 0 24px 24px;
}
.header-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}
.header-title { font-size: 22px; font-weight: 700; color: #fff; }
.header-sub { font-size: 13px; color: rgba(255,255,255,0.8); margin-top: 4px; }
.header-avatar {
  width: 44px; height: 44px;
  background: rgba(255,255,255,0.25);
  border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 18px; font-weight: 600;
}
.stats-row {
  display: flex;
  justify-content: space-around;
  background: rgba(255,255,255,0.15);
  border-radius: 14px;
  padding: 14px 0;
}
.stat-item { text-align: center; }
.stat-num { font-size: 24px; font-weight: 700; color: #fff; }
.stat-label { font-size: 12px; color: rgba(255,255,255,0.85); margin-top: 2px; }

/* Icon grid */
.icon-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px 8px;
}
.icon-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  cursor: pointer;
}
.icon-item span {
  font-size: 12px;
  color: #666;
  text-align: center;
}
.icon-box {
  width: 52px; height: 52px;
  border-radius: 14px;
  display: flex; align-items: center; justify-content: center;
  box-shadow: 0 2px 8px rgba(0,0,0,0.1);
  transition: transform 0.15s;
}
.icon-item:active .icon-box { transform: scale(0.92); }
</style>
