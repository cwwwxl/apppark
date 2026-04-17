<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      通行证
    </div>

    <div class="pass-header" :class="'pass-' + visitor.status">
      <div class="pass-status-icon">
        <svg v-if="visitor.status==='pending'" width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12,6 12,12 16,14"/></svg>
        <svg v-else width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
      </div>
      <div class="pass-status-text">{{ statusText[visitor.status] }}</div>
    </div>

    <!-- QR Code -->
    <div class="card" style="text-align: center;">
      <div v-html="qrSvg" style="display: inline-block; padding: 16px; border: 2px solid #eee; border-radius: 16px;"></div>
      <div style="margin-top: 12px; font-size: 13px; color: #999;">
        核销码：<strong style="color: #333; letter-spacing: 2px;">{{ visitor.qrId }}</strong>
      </div>
    </div>

    <!-- Info -->
    <div class="card">
      <div class="pass-row"><span class="pass-label">访客姓名</span><span>{{ visitor.name }}</span></div>
      <div class="pass-row"><span class="pass-label">身份证号</span><span>{{ visitor.idCard }}</span></div>
      <div class="pass-row"><span class="pass-label">手机号码</span><span>{{ visitor.phone }}</span></div>
      <div class="pass-row"><span class="pass-label">所属公司</span><span>{{ visitor.company }}</span></div>
      <div class="pass-row"><span class="pass-label">来访事由</span><span>{{ visitor.reason }}</span></div>
      <div class="pass-row"><span class="pass-label">来访人数</span><span>{{ visitor.count }}人</span></div>
    </div>

    <div class="card">
      <div class="pass-row"><span class="pass-label">受访企业</span><span>华创科技有限公司</span></div>
      <div class="pass-row"><span class="pass-label">可通行门岗</span><span>东门岗、西门岗</span></div>
      <div class="pass-row"><span class="pass-label">有效期至</span><span style="color: #E53935;">2026-04-18 08:00</span></div>
    </div>

    <div class="tips-card">
      <div class="tips-title">温馨提示</div>
      <div class="tips-text">1. 请在有效期内到达园区门岗出示此通行码</div>
      <div class="tips-text">2. 门卫将核对您的身份信息，请配合查验</div>
      <div class="tips-text">3. 核销后二维码自动失效，不可重复使用</div>
    </div>
  </div>
</template>

<script setup>
import { visitorRecords, generateQRSvg } from '../../utils/mock.js'

const visitor = visitorRecords[2] // pending visitor
const statusText = { pending: '待核验', verified: '已核验通过', rejected: '已拒绝' }
const qrSvg = generateQRSvg(visitor.qrId, 180)
</script>

<style scoped>
.pass-header {
  padding: 24px 16px;
  text-align: center;
  color: #fff;
}
.pass-pending { background: linear-gradient(135deg, #F9A825, #FFD54F); }
.pass-verified { background: linear-gradient(135deg, #43A047, #66BB6A); }
.pass-rejected { background: linear-gradient(135deg, #E53935, #EF5350); }
.pass-status-text { font-size: 18px; font-weight: 700; margin-top: 8px; }

.pass-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #F5F5F5;
  font-size: 14px;
}
.pass-row:last-child { border-bottom: none; }
.pass-label { color: #999; }

.tips-card {
  margin: 12px 16px;
  padding: 16px;
  background: #FFF8E1;
  border-radius: 12px;
  border: 1px solid #FFE082;
}
.tips-title { font-size: 14px; font-weight: 600; color: #F57F17; margin-bottom: 8px; }
.tips-text { font-size: 12px; color: #999; line-height: 1.8; }
</style>
