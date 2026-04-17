<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      租售订单
      <div class="nav-right" @click="$router.push('/order/create')">+新建</div>
    </div>

    <div class="filter-tabs">
      <div v-for="tab in tabs" :key="tab.value" class="filter-tab" :class="{ active: currentTab === tab.value }" @click="currentTab = tab.value">
        {{ tab.label }}
      </div>
    </div>

    <div v-for="o in filtered" :key="o.id" class="card order-card" @click="$router.push('/order/detail?id=' + o.id)">
      <div class="order-top">
        <span class="order-id">{{ o.id }}</span>
        <span class="tag" :class="'tag-order-' + o.status">{{ statusMap[o.status] }}</span>
      </div>
      <div class="order-prop">{{ o.propertyName }}</div>
      <div class="order-info">
        <div class="order-row"><span>客户</span><span>{{ o.customer }}（{{ o.contact }}）</span></div>
        <div class="order-row"><span>类型</span><span class="type-tag" :class="'type-' + o.type">{{ typeMap[o.type] }}</span></div>
        <div class="order-row">
          <span>金额</span>
          <span class="order-amount" v-if="o.type === 'rent'">¥{{ o.rentPrice.toLocaleString() }}/月</span>
          <span class="order-amount" v-else>¥{{ o.sellPrice.toLocaleString() }}</span>
        </div>
        <div class="order-row"><span>定金</span><span :style="{ color: o.depositPaid ? '#43A047' : '#E53935' }">{{ o.depositPaid ? '已收取 ¥' + (o.deposit||0).toLocaleString() : '未收取' }}</span></div>
        <div class="order-row" v-if="o.signDate"><span>签约日期</span><span>{{ o.signDate }}</span></div>
        <div class="order-row" v-if="o.terminateDate"><span>解约日期</span><span style="color:#E53935">{{ o.terminateDate }}</span></div>
        <div class="order-row"><span>洽谈次数</span><span>{{ o.negotiations.length }}次</span></div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty">暂无订单记录</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { orders, orderStatusMap, orderTypeMap } from '../../utils/mock.js'

const statusMap = orderStatusMap
const typeMap = orderTypeMap
const tabs = [
  { label: '全部', value: 'all' },
  { label: '洽谈中', value: 'negotiating' },
  { label: '已签约', value: 'signed' },
  { label: '已履约', value: 'fulfilled' },
  { label: '已解约', value: 'terminated' },
]
const currentTab = ref('all')
const filtered = computed(() => {
  if (currentTab.value === 'all') return orders
  return orders.filter(o => o.status === currentTab.value)
})
</script>

<style scoped>
.nav-right { position: absolute; right: 12px; font-size: 14px; color: #4A90D9; cursor: pointer; font-weight: 500; }
.filter-tabs { display: flex; padding: 12px 16px; overflow-x: auto; }
.filter-tab { flex-shrink: 0; padding: 6px 12px; font-size: 13px; color: #999; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
.filter-tab.active { color: #4A90D9; border-bottom-color: #4A90D9; font-weight: 600; }
.order-card { cursor: pointer; }
.order-card:active { opacity: 0.8; }
.order-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.order-id { font-weight: 600; font-size: 14px; color: #333; }
.order-prop { font-size: 16px; font-weight: 700; color: #333; margin-bottom: 10px; }
.tag-order-negotiating { background: #FFF8E1; color: #F9A825; }
.tag-order-pending { background: #E3F2FD; color: #1976D2; }
.tag-order-signed { background: #E8F5E9; color: #43A047; }
.tag-order-fulfilled { background: #E3F2FD; color: #1976D2; }
.tag-order-terminated { background: #FFEBEE; color: #E53935; }
.order-row { display: flex; justify-content: space-between; padding: 5px 0; font-size: 13px; }
.order-row span:first-child { color: #999; }
.order-amount { font-weight: 600; color: #E53935; }
.type-tag { padding: 1px 8px; border-radius: 4px; font-size: 12px; }
.type-rent { background: #E3F2FD; color: #1976D2; }
.type-sell { background: #F3E5F5; color: #8E24AA; }
.empty { text-align: center; padding: 60px 0; color: #ccc; font-size: 15px; }
</style>
