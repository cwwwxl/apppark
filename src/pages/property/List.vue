<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      房源管理
      <div class="nav-right" @click="$router.push('/property/edit')">+发布</div>
    </div>

    <!-- Search & Filter -->
    <div class="search-bar">
      <input class="search-input" v-model="keyword" placeholder="搜索编号/名称/楼栋" />
    </div>
    <div class="filter-tabs">
      <div v-for="tab in tabs" :key="tab.value" class="filter-tab" :class="{ active: currentTab === tab.value }" @click="currentTab = tab.value">
        {{ tab.label }}
      </div>
    </div>

    <!-- Property List -->
    <div v-for="p in filtered" :key="p.id" class="card prop-card" @click="$router.push('/property/detail?id=' + p.id)">
      <div class="prop-top">
        <div class="prop-name">{{ p.name }}</div>
        <span class="tag" :class="'tag-prop-' + p.status">{{ statusMap[p.status] }}</span>
      </div>
      <div class="prop-tags">
        <span class="prop-tag">{{ p.type }}</span>
        <span class="prop-tag">{{ p.area }}m²</span>
        <span class="prop-tag">{{ p.orientation }}</span>
        <span class="prop-tag">{{ p.building }}</span>
      </div>
      <div class="prop-bottom">
        <div class="prop-price">
          <span class="price-num">¥{{ p.rentPrice.toLocaleString() }}</span>
          <span class="price-unit">/月</span>
          <span v-if="p.sellPrice" class="price-sell">售价 ¥{{ (p.sellPrice/10000).toFixed(0) }}万</span>
        </div>
        <div class="prop-meta">
          <span>{{ p.images }}张图</span>
          <span>{{ p.views }}次浏览</span>
        </div>
      </div>
      <div class="prop-facilities">{{ p.facilities }}</div>
      <div class="prop-tenant" v-if="p.tenant">当前租户：{{ p.tenant }}</div>
    </div>

    <div v-if="filtered.length === 0" class="empty">暂无符合条件的房源</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { properties, propertyStatusMap } from '../../utils/mock.js'

const statusMap = propertyStatusMap
const keyword = ref('')
const tabs = [
  { label: '全部', value: 'all' },
  { label: '待租售', value: 'available' },
  { label: '洽谈中', value: 'negotiating' },
  { label: '已租赁', value: 'rented' },
  { label: '已售出', value: 'sold' },
]
const currentTab = ref('all')

const filtered = computed(() => {
  let list = properties
  if (currentTab.value !== 'all') list = list.filter(p => p.status === currentTab.value)
  if (keyword.value) {
    const kw = keyword.value.toLowerCase()
    list = list.filter(p => p.name.toLowerCase().includes(kw) || p.code.toLowerCase().includes(kw) || p.building.includes(kw))
  }
  return list
})
</script>

<style scoped>
.nav-right { position: absolute; right: 12px; font-size: 14px; color: #4A90D9; cursor: pointer; font-weight: 500; }
.search-bar { padding: 12px 16px 0; }
.search-input { width: 100%; height: 40px; padding: 0 12px; border: 1px solid #E8E8E8; border-radius: 10px; font-size: 14px; outline: none; background: #fff; }
.search-input:focus { border-color: #4A90D9; }
.filter-tabs { display: flex; padding: 12px 16px; gap: 0; overflow-x: auto; }
.filter-tab { flex-shrink: 0; padding: 6px 14px; font-size: 13px; color: #999; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s; }
.filter-tab.active { color: #4A90D9; border-bottom-color: #4A90D9; font-weight: 600; }
.prop-card { cursor: pointer; }
.prop-card:active { opacity: 0.8; }
.prop-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px; }
.prop-name { font-size: 16px; font-weight: 600; color: #333; }
.tag-prop-available { background: #E8F5E9; color: #43A047; }
.tag-prop-negotiating { background: #FFF8E1; color: #F9A825; }
.tag-prop-rented { background: #E3F2FD; color: #1976D2; }
.tag-prop-sold { background: #F3E5F5; color: #8E24AA; }
.prop-tags { display: flex; gap: 6px; flex-wrap: wrap; margin-bottom: 10px; }
.prop-tag { padding: 2px 8px; background: #F5F5F5; border-radius: 4px; font-size: 12px; color: #888; }
.prop-bottom { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.price-num { font-size: 20px; font-weight: 700; color: #E53935; }
.price-unit { font-size: 12px; color: #999; }
.price-sell { font-size: 12px; color: #9B6BFF; margin-left: 8px; }
.prop-meta { font-size: 12px; color: #bbb; display: flex; gap: 8px; }
.prop-facilities { font-size: 12px; color: #999; padding-top: 8px; border-top: 1px solid #F5F5F5; }
.prop-tenant { font-size: 13px; color: #4A90D9; margin-top: 6px; font-weight: 500; }
.empty { text-align: center; padding: 60px 0; color: #ccc; font-size: 15px; }
</style>
