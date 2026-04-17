<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      租售数据统计
    </div>

    <!-- Overview cards -->
    <div class="stats-grid">
      <div class="stats-card sc-blue">
        <div class="sc-num">{{ stats.totalProperties }}</div>
        <div class="sc-label">总房源数</div>
      </div>
      <div class="stats-card sc-green">
        <div class="sc-num">{{ stats.occupancyRate }}%</div>
        <div class="sc-label">出租率</div>
      </div>
      <div class="stats-card sc-orange">
        <div class="sc-num">{{ stats.conversionRate }}%</div>
        <div class="sc-label">转化率</div>
      </div>
      <div class="stats-card sc-purple">
        <div class="sc-num">¥{{ stats.avgRentPerSqm }}</div>
        <div class="sc-label">均价/m²</div>
      </div>
    </div>

    <!-- Revenue summary -->
    <div class="card">
      <div class="card-title">收入汇总</div>
      <div class="revenue-row">
        <div class="rev-item">
          <div class="rev-num" style="color:#E53935">¥{{ stats.totalRentRevenue.toLocaleString() }}</div>
          <div class="rev-label">租金总额</div>
        </div>
        <div class="rev-divider"></div>
        <div class="rev-item">
          <div class="rev-num" style="color:#9B6BFF">¥{{ (stats.totalSellRevenue/10000).toFixed(0) }}万</div>
          <div class="rev-label">售出总额</div>
        </div>
        <div class="rev-divider"></div>
        <div class="rev-item">
          <div class="rev-num" style="color:#43A047">¥{{ stats.totalDeposit.toLocaleString() }}</div>
          <div class="rev-label">定金收取</div>
        </div>
      </div>
    </div>

    <!-- Property status distribution -->
    <div class="card">
      <div class="card-title">房源状态分布</div>
      <div class="status-bars">
        <div class="bar-item">
          <div class="bar-label">待租售</div>
          <div class="bar-track"><div class="bar-fill" :style="{ width: (stats.availableCount/stats.totalProperties*100) + '%', background: '#43A047' }"></div></div>
          <div class="bar-num">{{ stats.availableCount }}</div>
        </div>
        <div class="bar-item">
          <div class="bar-label">已租赁</div>
          <div class="bar-track"><div class="bar-fill" :style="{ width: (stats.rentedCount/stats.totalProperties*100) + '%', background: '#1976D2' }"></div></div>
          <div class="bar-num">{{ stats.rentedCount }}</div>
        </div>
        <div class="bar-item">
          <div class="bar-label">已售出</div>
          <div class="bar-track"><div class="bar-fill" :style="{ width: (stats.soldCount/stats.totalProperties*100) + '%', background: '#9B6BFF' }"></div></div>
          <div class="bar-num">{{ stats.soldCount }}</div>
        </div>
      </div>
    </div>

    <!-- Monthly trend -->
    <div class="card">
      <div class="card-title">月度租金趋势</div>
      <div class="chart-area">
        <div class="chart-bars">
          <div v-for="m in monthlyData" :key="m.month" class="chart-col">
            <div class="chart-bar" :style="{ height: (m.revenue / maxRevenue * 120) + 'px' }">
              <span class="chart-val">{{ (m.revenue/10000).toFixed(1) }}万</span>
            </div>
            <div class="chart-label">{{ m.month.slice(5) }}月</div>
          </div>
        </div>
      </div>
    </div>

    <!-- Type breakdown -->
    <div class="card">
      <div class="card-title">房源类型分析</div>
      <div v-for="t in typeStats" :key="t.type" class="type-row">
        <div class="type-info">
          <div class="type-name">{{ t.type }}</div>
          <div class="type-detail">{{ t.count }}套 · {{ t.area }}m²</div>
        </div>
        <div class="type-revenue">
          <span v-if="t.revenue">¥{{ t.revenue.toLocaleString() }}/月</span>
          <span v-else style="color:#ccc">暂无收入</span>
        </div>
      </div>
    </div>

    <!-- Export button -->
    <div style="padding: 0 16px 24px;">
      <button class="btn btn-outline" @click="exportData">导出统计报表</button>
    </div>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { statsOverview, monthlyRentData, propertyTypeStats } from '../../utils/mock.js'

const stats = statsOverview
const monthlyData = monthlyRentData
const typeStats = propertyTypeStats
const maxRevenue = computed(() => Math.max(...monthlyData.map(m => m.revenue)))

function exportData() { alert('报表已导出（模拟操作）') }
</script>

<style scoped>
.stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; padding: 12px 16px; }
.stats-card { background: #fff; border-radius: 12px; padding: 16px; text-align: center; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.sc-blue { border-left: 4px solid #4A90D9; }
.sc-green { border-left: 4px solid #43A047; }
.sc-orange { border-left: 4px solid #FF8C5A; }
.sc-purple { border-left: 4px solid #9B6BFF; }
.sc-num { font-size: 24px; font-weight: 700; color: #333; }
.sc-label { font-size: 12px; color: #999; margin-top: 4px; }

.card-title { font-size: 15px; font-weight: 600; color: #333; padding-bottom: 10px; border-bottom: 1px solid #F5F5F5; margin-bottom: 12px; }

.revenue-row { display: flex; align-items: center; }
.rev-item { flex: 1; text-align: center; }
.rev-num { font-size: 18px; font-weight: 700; }
.rev-label { font-size: 12px; color: #999; margin-top: 4px; }
.rev-divider { width: 1px; height: 36px; background: #F0F0F0; }

.status-bars { display: flex; flex-direction: column; gap: 12px; }
.bar-item { display: flex; align-items: center; gap: 10px; }
.bar-label { width: 50px; font-size: 13px; color: #666; text-align: right; }
.bar-track { flex: 1; height: 20px; background: #F5F5F5; border-radius: 10px; overflow: hidden; }
.bar-fill { height: 100%; border-radius: 10px; transition: width 0.6s ease; }
.bar-num { width: 24px; font-size: 14px; font-weight: 600; color: #333; }

.chart-area { padding: 8px 0; }
.chart-bars { display: flex; justify-content: space-around; align-items: flex-end; height: 160px; padding-top: 20px; }
.chart-col { display: flex; flex-direction: column; align-items: center; gap: 6px; }
.chart-bar { width: 40px; background: linear-gradient(180deg, #4A90D9, #6BA8E8); border-radius: 6px 6px 0 0; position: relative; min-height: 20px; display: flex; align-items: flex-start; justify-content: center; }
.chart-val { font-size: 11px; color: #4A90D9; font-weight: 600; position: absolute; top: -18px; white-space: nowrap; }
.chart-label { font-size: 12px; color: #999; }

.type-row { display: flex; justify-content: space-between; align-items: center; padding: 10px 0; border-bottom: 1px solid #F5F5F5; }
.type-row:last-child { border-bottom: none; }
.type-name { font-size: 15px; font-weight: 600; color: #333; }
.type-detail { font-size: 12px; color: #999; margin-top: 2px; }
.type-revenue { font-size: 14px; font-weight: 600; color: #E53935; }
</style>
