<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      操作日志
    </div>

    <!-- Filter -->
    <div class="filter-tabs">
      <div v-for="tab in tabs" :key="tab.value"
           class="filter-tab" :class="{ active: currentTab === tab.value }"
           @click="currentTab = tab.value">
        {{ tab.label }}
      </div>
    </div>

    <!-- Timeline -->
    <div class="timeline">
      <div v-for="log in filtered" :key="log.id" class="timeline-item">
        <div class="timeline-dot" :class="'dot-' + log.type"></div>
        <div class="timeline-content">
          <div class="timeline-top">
            <span class="timeline-action">{{ log.action }}</span>
            <span class="timeline-time">{{ log.time }}</span>
          </div>
          <div class="timeline-operator">操作人：{{ log.operator }}</div>
          <div class="timeline-detail">{{ log.detail }}</div>
        </div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty">暂无日志记录</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { operationLogs } from '../../utils/mock.js'

const tabs = [
  { label: '全部', value: 'all' },
  { label: '生成', value: 'generate' },
  { label: '核验', value: 'verify' },
  { label: '拒绝', value: 'reject' },
]

const currentTab = ref('all')

const filtered = computed(() => {
  if (currentTab.value === 'all') return operationLogs
  return operationLogs.filter(l => l.type === currentTab.value)
})
</script>

<style scoped>
.filter-tabs { display: flex; padding: 12px 16px; background: #fff; }
.filter-tab {
  flex: 1; text-align: center; padding: 8px; font-size: 14px;
  color: #999; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s;
}
.filter-tab.active { color: #4A90D9; border-bottom-color: #4A90D9; font-weight: 600; }

.timeline { padding: 16px; }
.timeline-item {
  display: flex; gap: 12px;
  padding-bottom: 20px;
  position: relative;
}
.timeline-item::before {
  content: '';
  position: absolute;
  left: 7px;
  top: 16px;
  bottom: 0;
  width: 2px;
  background: #E8E8E8;
}
.timeline-item:last-child::before { display: none; }
.timeline-dot {
  width: 16px; height: 16px;
  border-radius: 50%;
  flex-shrink: 0;
  margin-top: 2px;
  z-index: 1;
}
.dot-generate { background: #4A90D9; }
.dot-verify { background: #43A047; }
.dot-reject { background: #E53935; }
.dot-share { background: #FF8C5A; }

.timeline-content {
  background: #fff;
  border-radius: 12px;
  padding: 12px 14px;
  flex: 1;
  box-shadow: 0 1px 4px rgba(0,0,0,0.04);
}
.timeline-top {
  display: flex; justify-content: space-between; align-items: center;
  margin-bottom: 6px;
}
.timeline-action { font-size: 15px; font-weight: 600; color: #333; }
.timeline-time { font-size: 11px; color: #bbb; }
.timeline-operator { font-size: 12px; color: #999; margin-bottom: 4px; }
.timeline-detail { font-size: 13px; color: #666; line-height: 1.6; }

.empty { text-align: center; padding: 60px 0; color: #ccc; font-size: 15px; }
</style>
