<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      访客记录
    </div>

    <div class="filter-tabs">
      <div v-for="tab in tabs" :key="tab.value"
           class="filter-tab" :class="{ active: currentTab === tab.value }"
           @click="currentTab = tab.value">
        {{ tab.label }}
      </div>
    </div>

    <div v-for="v in filtered" :key="v.id" class="card visitor-card">
      <div class="visitor-top">
        <div class="visitor-avatar" :style="{ background: avatarColor(v.name) }">
          {{ v.name.charAt(0) }}
        </div>
        <div class="visitor-info">
          <div class="visitor-name">{{ v.name }} <span class="tag" :class="'tag-' + v.status">{{ statusMap[v.status] }}</span></div>
          <div class="visitor-company">{{ v.company }}</div>
        </div>
      </div>
      <div class="visitor-detail">
        <div class="detail-row"><span>来访事由：</span>{{ v.reason }}</div>
        <div class="detail-row"><span>来访人数：</span>{{ v.count }}人</div>
        <div class="detail-row" v-if="v.gate"><span>通行门岗：</span>{{ v.gate }}</div>
        <div class="detail-row" v-if="v.verifyTime"><span>核验时间：</span>{{ v.verifyTime }}</div>
        <div class="detail-row" v-if="v.rejectReason"><span>拒绝原因：</span><span style="color:#E53935">{{ v.rejectReason }}</span></div>
      </div>
    </div>

    <div v-if="filtered.length === 0" class="empty">暂无记录</div>
  </div>
</template>

<script setup>
import { ref, computed } from 'vue'
import { visitorRecords } from '../../utils/mock.js'

const tabs = [
  { label: '全部', value: 'all' },
  { label: '待核验', value: 'pending' },
  { label: '已通过', value: 'verified' },
  { label: '已拒绝', value: 'rejected' },
]
const statusMap = { pending: '待核验', verified: '已通过', rejected: '已拒绝' }
const currentTab = ref('all')

const filtered = computed(() => {
  if (currentTab.value === 'all') return visitorRecords
  return visitorRecords.filter(v => v.status === currentTab.value)
})

const colors = ['#FF6B8A', '#4A90D9', '#FF8C5A', '#9B6BFF', '#5BC5C8']
function avatarColor(name) {
  let h = 0
  for (let i = 0; i < name.length; i++) h += name.charCodeAt(i)
  return colors[h % colors.length]
}
</script>

<style scoped>
.filter-tabs { display: flex; padding: 12px 16px; background: #fff; }
.filter-tab {
  flex: 1; text-align: center; padding: 8px; font-size: 14px;
  color: #999; cursor: pointer; border-bottom: 2px solid transparent; transition: all 0.2s;
}
.filter-tab.active { color: #4A90D9; border-bottom-color: #4A90D9; font-weight: 600; }
.visitor-card { cursor: pointer; }
.visitor-top { display: flex; align-items: center; gap: 12px; margin-bottom: 12px; }
.visitor-avatar {
  width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  color: #fff; font-size: 18px; font-weight: 600; flex-shrink: 0;
}
.visitor-name { font-size: 16px; font-weight: 600; display: flex; align-items: center; gap: 8px; }
.visitor-company { font-size: 13px; color: #999; margin-top: 2px; }
.visitor-detail { padding-top: 10px; border-top: 1px solid #F5F5F5; }
.detail-row { font-size: 13px; color: #666; line-height: 2; }
.detail-row span:first-child { color: #999; }
.empty { text-align: center; padding: 60px 0; color: #ccc; font-size: 15px; }
</style>
