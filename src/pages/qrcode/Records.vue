<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      邀访记录
    </div>

    <!-- Filter tabs -->
    <div class="filter-tabs">
      <div v-for="tab in tabs" :key="tab.value"
           class="filter-tab" :class="{ active: currentTab === tab.value }"
           @click="currentTab = tab.value">
        {{ tab.label }}
      </div>
    </div>

    <!-- Records list -->
    <div v-for="record in filtered" :key="record.id" class="card record-card" @click="viewDetail(record)">
      <div class="record-top">
        <span class="record-id">{{ record.id }}</span>
        <span class="tag" :class="'tag-' + record.status">{{ statusMap[record.status] }}</span>
      </div>
      <div class="record-info">
        <div class="record-row">
          <span class="record-label">访客</span>
          <span>{{ record.visitorName }}</span>
        </div>
        <div class="record-row">
          <span class="record-label">有效时长</span>
          <span>{{ record.duration }}</span>
        </div>
        <div class="record-row">
          <span class="record-label">创建时间</span>
          <span>{{ record.createdAt }}</span>
        </div>
        <div class="record-row">
          <span class="record-label">分享方式</span>
          <span>{{ record.shareMethod }}</span>
        </div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty">暂无记录</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { qrcodeRecords } from '../../utils/mock.js'

const tabs = [
  { label: '全部', value: 'all' },
  { label: '有效', value: 'active' },
  { label: '已过期', value: 'expired' },
  { label: '已使用', value: 'used' },
]

const statusMap = { active: '有效', expired: '已过期', used: '已使用' }
const currentTab = ref('all')

const filtered = computed(() => {
  if (currentTab.value === 'all') return qrcodeRecords
  return qrcodeRecords.filter(r => r.status === currentTab.value)
})

function viewDetail(record) {
  alert(`邀访码详情：${record.id}\n访客：${record.visitorName}\n状态：${statusMap[record.status]}`)
}
</script>

<style scoped>
.filter-tabs {
  display: flex;
  gap: 0;
  padding: 12px 16px;
  background: #fff;
}
.filter-tab {
  flex: 1;
  text-align: center;
  padding: 8px;
  font-size: 14px;
  color: #999;
  cursor: pointer;
  border-bottom: 2px solid transparent;
  transition: all 0.2s;
}
.filter-tab.active {
  color: #4A90D9;
  border-bottom-color: #4A90D9;
  font-weight: 600;
}
.record-card { cursor: pointer; }
.record-card:active { opacity: 0.8; }
.record-top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
}
.record-id { font-weight: 600; font-size: 15px; color: #333; }
.record-row {
  display: flex;
  justify-content: space-between;
  padding: 5px 0;
  font-size: 13px;
}
.record-label { color: #999; }
.empty {
  text-align: center;
  padding: 60px 0;
  color: #ccc;
  font-size: 15px;
}
</style>
