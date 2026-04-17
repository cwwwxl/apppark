<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      核验结果
    </div>

    <!-- Result banner -->
    <div class="result-banner" :class="'banner-' + result">
      <div class="result-icon">
        <svg v-if="result==='pass'" width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><path d="M8 12l3 3 5-6"/></svg>
        <svg v-else width="56" height="56" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
      </div>
      <div class="result-text">{{ result === 'pass' ? '核验通过' : '核验失败' }}</div>
      <div class="result-sub">{{ result === 'pass' ? '访客身份信息核实无误' : '身份信息不符或二维码已失效' }}</div>
    </div>

    <!-- Visitor info -->
    <div class="card">
      <div class="card-title">访客信息</div>
      <div class="info-row"><span class="info-label">姓名</span><span>{{ visitor.name }}</span></div>
      <div class="info-row"><span class="info-label">身份证号</span><span>{{ visitor.idCard }}</span></div>
      <div class="info-row"><span class="info-label">手机号码</span><span>{{ visitor.phone }}</span></div>
      <div class="info-row"><span class="info-label">所属公司</span><span>{{ visitor.company }}</span></div>
      <div class="info-row"><span class="info-label">来访事由</span><span>{{ visitor.reason }}</span></div>
      <div class="info-row"><span class="info-label">来访人数</span><span>{{ visitor.count }}人</span></div>
    </div>

    <!-- Enterprise info -->
    <div class="card">
      <div class="card-title">受访企业</div>
      <div class="info-row"><span class="info-label">企业名称</span><span>{{ enterprise.name }}</span></div>
      <div class="info-row"><span class="info-label">地址</span><span>{{ enterprise.address }}</span></div>
      <div class="info-row"><span class="info-label">联系人</span><span>{{ enterprise.contact }}</span></div>
    </div>

    <!-- QR validity -->
    <div class="card">
      <div class="card-title">二维码状态</div>
      <div class="info-row"><span class="info-label">邀访码编号</span><span>{{ visitor.qrId }}</span></div>
      <div class="info-row"><span class="info-label">有效状态</span><span class="tag tag-active">有效</span></div>
      <div class="info-row"><span class="info-label">有效期至</span><span>2026-04-18 08:00</span></div>
    </div>

    <!-- Action buttons -->
    <div style="padding: 16px; display: flex; gap: 12px;">
      <button class="btn btn-success" style="flex: 1;" @click="confirmPass">
        允许通行
      </button>
      <button class="btn btn-danger" style="flex: 1;" @click="showReject = true">
        拒绝通行
      </button>
    </div>

    <!-- Reject modal -->
    <div class="modal-overlay" v-if="showReject" @click="showReject = false">
      <div class="modal-box" @click.stop>
        <div class="modal-title">拒绝原因</div>
        <textarea class="form-textarea" v-model="rejectReason" placeholder="请输入拒绝通行原因"></textarea>
        <div style="display: flex; gap: 12px; margin-top: 16px;">
          <button class="btn btn-outline" style="flex:1" @click="showReject = false">取消</button>
          <button class="btn btn-danger" style="flex:1" @click="confirmReject">确认拒绝</button>
        </div>
      </div>
    </div>

    <!-- Success toast -->
    <div class="toast" v-if="toastMsg">{{ toastMsg }}</div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { visitorRecords, currentCompany } from '../../utils/mock.js'

const router = useRouter()
const visitor = visitorRecords[2]
const enterprise = currentCompany
const result = ref('pass')
const showReject = ref(false)
const rejectReason = ref('')
const toastMsg = ref('')

function showToast(msg) {
  toastMsg.value = msg
  setTimeout(() => { toastMsg.value = '' }, 2000)
}

function confirmPass() {
  showToast('已放行，门禁已开启')
  setTimeout(() => router.back(), 1500)
}

function confirmReject() {
  if (!rejectReason.value) { alert('请输入拒绝原因'); return }
  showReject.value = false
  showToast('已标记拒绝通行')
  setTimeout(() => router.back(), 1500)
}
</script>

<style scoped>
.result-banner { padding: 32px 16px; text-align: center; color: #fff; }
.banner-pass { background: linear-gradient(135deg, #43A047, #66BB6A); }
.banner-fail { background: linear-gradient(135deg, #E53935, #EF5350); }
.result-text { font-size: 22px; font-weight: 700; margin-top: 12px; }
.result-sub { font-size: 14px; opacity: 0.85; margin-top: 4px; }

.card-title {
  font-size: 15px; font-weight: 600; color: #333;
  padding-bottom: 10px; border-bottom: 1px solid #F5F5F5; margin-bottom: 4px;
}

.info-row {
  display: flex; justify-content: space-between; align-items: center;
  padding: 9px 0; border-bottom: 1px solid #F5F5F5; font-size: 14px;
}
.info-row:last-child { border-bottom: none; }
.info-label { color: #999; }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center; z-index: 1000;
}
.modal-box {
  background: #fff; border-radius: 20px; padding: 24px;
  width: 300px;
}
.modal-title { font-size: 18px; font-weight: 700; text-align: center; margin-bottom: 16px; }

.toast {
  position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%);
  background: rgba(0,0,0,0.75); color: #fff; padding: 12px 24px;
  border-radius: 10px; font-size: 15px; z-index: 2000;
}
</style>
