<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      分享邀访码
    </div>

    <div class="card" style="text-align: center;">
      <div class="share-company">{{ company.name }}</div>
      <div class="share-address">{{ company.address }}</div>

      <div class="qr-wrapper">
        <div v-html="qrSvg"></div>
      </div>

      <div class="info-row">
        <span class="info-label">邀访码编号</span>
        <span>QR20260403001</span>
      </div>
      <div class="info-row">
        <span class="info-label">有效时长</span>
        <span>一天</span>
      </div>
      <div class="info-row">
        <span class="info-label">创建时间</span>
        <span>2026-04-17 08:00</span>
      </div>
      <div class="info-row">
        <span class="info-label">过期时间</span>
        <span>2026-04-18 08:00</span>
      </div>
      <div class="info-row">
        <span class="info-label">状态</span>
        <span class="tag tag-active">有效</span>
      </div>
    </div>

    <div style="padding: 0 16px; display: flex; flex-direction: column; gap: 12px;">
      <button class="btn btn-success" @click="shareWechat">
        <span style="display: flex; align-items: center; justify-content: center; gap: 8px;">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="#fff"><path d="M8.5 13.5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5S10 11.17 10 12s-.67 1.5-1.5 1.5zm7 0c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5S17 11.17 17 12s-.67 1.5-1.5 1.5zM12 2C6.48 2 2 6.03 2 11c0 2.76 1.36 5.22 3.47 6.84L5 22l4.3-2.15c.87.2 1.77.15 2.7.15 5.52 0 10-4.03 10-9S17.52 2 12 2z"/></svg>
          分享到微信
        </span>
      </button>
      <button class="btn btn-outline" @click="copyLink">复制链接</button>
    </div>
  </div>
</template>

<script setup>
import { currentCompany, generateQRSvg } from '../../utils/mock.js'
const company = currentCompany
const qrSvg = generateQRSvg('QR20260403001', 200)

function shareWechat() { alert('已模拟分享到微信') }
function copyLink() { alert('链接已复制到剪贴板') }
</script>

<style scoped>
.share-company { font-size: 18px; font-weight: 700; color: #333; }
.share-address { font-size: 13px; color: #999; margin-top: 4px; }
.qr-wrapper {
  margin: 20px auto;
  padding: 20px;
  display: inline-block;
  border: 2px dashed #E0E0E0;
  border-radius: 16px;
}
.info-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F5F5F5;
  font-size: 14px;
}
.info-row:last-child { border-bottom: none; }
.info-label { color: #999; }
</style>
