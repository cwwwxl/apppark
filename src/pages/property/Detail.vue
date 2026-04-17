<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      房源详情
    </div>

    <!-- Image placeholder -->
    <div class="detail-images">
      <div class="img-placeholder">
        <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><circle cx="8.5" cy="8.5" r="1.5"/><polyline points="21,15 16,10 5,21"/></svg>
        <span>{{ prop.images }}张实景图/视频</span>
      </div>
      <span class="tag" :class="'tag-prop-' + prop.status" style="position:absolute;top:12px;right:12px;">{{ statusMap[prop.status] }}</span>
    </div>

    <!-- Basic info -->
    <div class="card">
      <div class="detail-title">{{ prop.name }}</div>
      <div class="detail-code">编号：{{ prop.code }}</div>
      <div class="detail-price">
        <span class="price-big">¥{{ prop.rentPrice.toLocaleString() }}</span><span class="price-unit">/月</span>
        <span v-if="prop.sellPrice" class="price-sell-big">售价 ¥{{ (prop.sellPrice/10000).toFixed(0) }}万</span>
      </div>
    </div>

    <!-- Detail info -->
    <div class="card">
      <div class="card-title">基本信息</div>
      <div class="info-row"><span class="info-label">楼栋</span><span>{{ prop.building }}</span></div>
      <div class="info-row"><span class="info-label">楼层</span><span>{{ prop.floor }}</span></div>
      <div class="info-row"><span class="info-label">面积</span><span>{{ prop.area }}m²</span></div>
      <div class="info-row"><span class="info-label">户型</span><span>{{ prop.type }}</span></div>
      <div class="info-row"><span class="info-label">朝向</span><span>{{ prop.orientation }}</span></div>
      <div class="info-row"><span class="info-label">押付方式</span><span>{{ prop.deposit }}</span></div>
      <div class="info-row"><span class="info-label">联系人</span><span>{{ prop.contact }}</span></div>
      <div class="info-row"><span class="info-label">电话</span><span style="color:#4A90D9">{{ prop.phone }}</span></div>
      <div class="info-row"><span class="info-label">配套设施</span><span>{{ prop.facilities }}</span></div>
      <div class="info-row"><span class="info-label">发布时间</span><span>{{ prop.publishTime }}</span></div>
      <div class="info-row"><span class="info-label">浏览次数</span><span>{{ prop.views }}次</span></div>
      <div class="info-row" v-if="prop.tenant"><span class="info-label">当前租户</span><span style="color:#4A90D9">{{ prop.tenant }}</span></div>
    </div>

    <!-- Actions -->
    <div style="padding: 16px; display: flex; gap: 12px;">
      <button class="btn btn-outline" style="flex:1" @click="$router.push('/property/edit?id=' + prop.id)">编辑信息</button>
      <button class="btn btn-primary" style="flex:1" @click="$router.push('/order/create?propertyId=' + prop.id)">创建订单</button>
    </div>

    <div style="padding: 0 16px 16px;">
      <button v-if="prop.status === 'available'" class="btn" style="background:#FFF3E0;color:#EF6C00;border:1px solid #FFE0B2;" @click="offShelf">下架房源</button>
    </div>
  </div>
</template>

<script setup>
import { properties, propertyStatusMap } from '../../utils/mock.js'
import { useRoute } from 'vue-router'

const route = useRoute()
const statusMap = propertyStatusMap
const propId = route.query.id || 'P001'
const prop = properties.find(p => p.id === propId) || properties[0]

function offShelf() { alert('已下架该房源（模拟操作）') }
</script>

<style scoped>
.detail-images { position: relative; background: #F0F0F0; height: 200px; display: flex; align-items: center; justify-content: center; }
.img-placeholder { display: flex; flex-direction: column; align-items: center; gap: 8px; color: #bbb; font-size: 13px; }
.tag-prop-available { background: #E8F5E9; color: #43A047; }
.tag-prop-negotiating { background: #FFF8E1; color: #F9A825; }
.tag-prop-rented { background: #E3F2FD; color: #1976D2; }
.tag-prop-sold { background: #F3E5F5; color: #8E24AA; }
.detail-title { font-size: 20px; font-weight: 700; color: #333; }
.detail-code { font-size: 13px; color: #999; margin-top: 4px; }
.detail-price { margin-top: 12px; }
.price-big { font-size: 26px; font-weight: 700; color: #E53935; }
.price-unit { font-size: 14px; color: #999; }
.price-sell-big { font-size: 14px; color: #9B6BFF; margin-left: 12px; font-weight: 600; }
.card-title { font-size: 15px; font-weight: 600; color: #333; padding-bottom: 10px; border-bottom: 1px solid #F5F5F5; margin-bottom: 4px; }
.info-row { display: flex; justify-content: space-between; align-items: center; padding: 9px 0; border-bottom: 1px solid #F5F5F5; font-size: 14px; }
.info-row:last-child { border-bottom: none; }
.info-label { color: #999; }
</style>
