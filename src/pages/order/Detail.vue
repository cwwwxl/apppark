<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      订单详情
    </div>

    <!-- Status header -->
    <div class="status-header" :class="'sh-' + order.status">
      <div class="sh-status">{{ statusMap[order.status] }}</div>
      <div class="sh-type">{{ typeMap[order.type] }}订单</div>
    </div>

    <!-- Property info -->
    <div class="card">
      <div class="card-title">房源信息</div>
      <div class="info-row"><span class="info-label">房源编号</span><span>{{ order.propertyCode }}</span></div>
      <div class="info-row"><span class="info-label">房源名称</span><span>{{ order.propertyName }}</span></div>
      <div class="info-row">
        <span class="info-label">金额</span>
        <span class="amount" v-if="order.type === 'rent'">¥{{ order.rentPrice.toLocaleString() }}/月</span>
        <span class="amount" v-else>¥{{ order.sellPrice.toLocaleString() }}</span>
      </div>
    </div>

    <!-- Customer info -->
    <div class="card">
      <div class="card-title">客户信息</div>
      <div class="info-row"><span class="info-label">公司名称</span><span>{{ order.customer }}</span></div>
      <div class="info-row"><span class="info-label">联系人</span><span>{{ order.contact }}</span></div>
      <div class="info-row"><span class="info-label">电话</span><span>{{ order.phone }}</span></div>
    </div>

    <!-- Contract info -->
    <div class="card">
      <div class="card-title">合同/财务</div>
      <div class="info-row"><span class="info-label">定金</span><span :style="{ color: order.depositPaid ? '#43A047' : '#E53935' }">{{ order.depositPaid ? '已收取 ¥' + (order.deposit||0).toLocaleString() : '未收取' }}</span></div>
      <div class="info-row" v-if="order.signDate"><span class="info-label">签约日期</span><span>{{ order.signDate }}</span></div>
      <div class="info-row" v-if="order.contractStart"><span class="info-label">合同期限</span><span>{{ order.contractStart }} ~ {{ order.contractEnd }}</span></div>
      <div class="info-row" v-if="order.terminateDate"><span class="info-label">解约日期</span><span style="color:#E53935">{{ order.terminateDate }}</span></div>
      <div class="info-row" v-if="order.terminateReason"><span class="info-label">解约原因</span><span style="color:#E53935">{{ order.terminateReason }}</span></div>
    </div>

    <!-- Negotiation timeline -->
    <div class="section-header">洽谈记录</div>
    <div class="timeline">
      <div v-for="(n, i) in order.negotiations" :key="i" class="timeline-item">
        <div class="timeline-dot" :class="i === 0 ? 'dot-latest' : ''"></div>
        <div class="timeline-content">
          <div class="tl-top">
            <span class="tl-result">{{ n.result }}</span>
            <span class="tl-time">{{ n.time }}</span>
          </div>
          <div class="tl-text">{{ n.content }}</div>
          <div class="tl-operator">操作人：{{ n.operator }}</div>
        </div>
      </div>
    </div>

    <!-- Actions -->
    <div style="padding: 16px; display: flex; gap: 12px;" v-if="order.status === 'negotiating'">
      <button class="btn btn-outline" style="flex:1" @click="addNego">添加洽谈记录</button>
      <button class="btn btn-primary" style="flex:1" @click="signContract">生成合同</button>
    </div>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { orders, orderStatusMap, orderTypeMap } from '../../utils/mock.js'

const route = useRoute()
const statusMap = orderStatusMap
const typeMap = orderTypeMap
const orderId = route.query.id || 'OD20260401'
const order = orders.find(o => o.id === orderId) || orders[0]

function addNego() { alert('添加洽谈记录（模拟操作）') }
function signContract() { alert('合同已生成（模拟操作）') }
</script>

<style scoped>
.status-header { padding: 24px 16px; text-align: center; color: #fff; }
.sh-negotiating { background: linear-gradient(135deg, #F9A825, #FFD54F); }
.sh-pending { background: linear-gradient(135deg, #4A90D9, #6BA8E8); }
.sh-signed { background: linear-gradient(135deg, #43A047, #66BB6A); }
.sh-fulfilled { background: linear-gradient(135deg, #1976D2, #42A5F5); }
.sh-terminated { background: linear-gradient(135deg, #E53935, #EF5350); }
.sh-status { font-size: 22px; font-weight: 700; }
.sh-type { font-size: 14px; opacity: 0.85; margin-top: 4px; }
.card-title { font-size: 15px; font-weight: 600; color: #333; padding-bottom: 10px; border-bottom: 1px solid #F5F5F5; margin-bottom: 4px; }
.info-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #F5F5F5; font-size: 14px; }
.info-row:last-child { border-bottom: none; }
.info-label { color: #999; }
.amount { font-weight: 700; color: #E53935; }

.timeline { padding: 0 16px 16px; }
.timeline-item { display: flex; gap: 12px; padding-bottom: 16px; position: relative; }
.timeline-item::before { content: ''; position: absolute; left: 7px; top: 16px; bottom: 0; width: 2px; background: #E8E8E8; }
.timeline-item:last-child::before { display: none; }
.timeline-dot { width: 16px; height: 16px; border-radius: 50%; background: #4A90D9; flex-shrink: 0; margin-top: 2px; z-index: 1; }
.dot-latest { background: #43A047; box-shadow: 0 0 0 4px rgba(67,160,71,0.2); }
.timeline-content { background: #fff; border-radius: 12px; padding: 12px 14px; flex: 1; box-shadow: 0 1px 4px rgba(0,0,0,0.04); }
.tl-top { display: flex; justify-content: space-between; align-items: center; margin-bottom: 6px; }
.tl-result { font-size: 14px; font-weight: 600; color: #333; }
.tl-time { font-size: 11px; color: #bbb; }
.tl-text { font-size: 13px; color: #666; line-height: 1.6; margin-bottom: 4px; }
.tl-operator { font-size: 12px; color: #999; }
</style>
