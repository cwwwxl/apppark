<template>
  <div class="page-with-tab">
    <!-- Header -->
    <div class="gate-header">
      <div class="gate-title">门岗核验</div>
      <div class="gate-sub">扫描访客二维码进行身份核验</div>
    </div>

    <!-- Gate selector -->
    <div class="card">
      <div class="gate-select-label">当前门岗</div>
      <div class="gate-options">
        <div v-for="g in gates" :key="g.id" class="gate-opt" :class="{ active: currentGate === g.id }" @click="currentGate = g.id">
          {{ g.name }}
        </div>
      </div>
    </div>

    <!-- Scan area -->
    <div class="card scan-card" @click="simulateScan">
      <div class="scan-frame">
        <div class="scan-corner tl"></div>
        <div class="scan-corner tr"></div>
        <div class="scan-corner bl"></div>
        <div class="scan-corner br"></div>
        <div class="scan-line" :class="{ animating: scanning }"></div>
        <div class="scan-icon">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#4A90D9" stroke-width="1.5">
            <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/>
            <rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/>
          </svg>
        </div>
      </div>
      <div class="scan-text">{{ scanning ? '扫描中...' : '点击此处模拟扫码' }}</div>
    </div>

    <!-- Manual input -->
    <div class="card">
      <div class="gate-select-label">手动输入核销码</div>
      <div style="display: flex; gap: 10px; margin-top: 8px;">
        <input class="form-input" v-model="manualCode" placeholder="输入核销码编号" style="flex: 1;" />
        <button class="btn btn-primary" style="width: 80px; padding: 0;" @click="verifyManual">核验</button>
      </div>
    </div>

    <!-- Recent records -->
    <div class="section-header">今日核验记录</div>
    <div v-for="r in verifyHistory" :key="r.id" class="card history-item">
      <div class="history-top">
        <div class="history-result" :class="'result-' + r.result">
          {{ r.result === 'pass' ? '通过' : '拒绝' }}
        </div>
        <div class="history-info">
          <div class="history-name">{{ r.visitorName }} · {{ r.company }}</div>
          <div class="history-meta">{{ r.gate }} · {{ r.time }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { gates, verifyHistory } from '../../utils/mock.js'

const router = useRouter()
const currentGate = ref(1)
const scanning = ref(false)
const manualCode = ref('')

function simulateScan() {
  scanning.value = true
  setTimeout(() => {
    scanning.value = false
    router.push('/gate/result')
  }, 1500)
}

function verifyManual() {
  if (!manualCode.value) { alert('请输入核销码'); return }
  router.push('/gate/result')
}
</script>

<style scoped>
.gate-header {
  background: linear-gradient(135deg, #5BC5C8, #7DD9DB);
  padding: 24px 16px;
  text-align: center;
  border-radius: 0 0 24px 24px;
}
.gate-title { font-size: 22px; font-weight: 700; color: #fff; }
.gate-sub { font-size: 13px; color: rgba(255,255,255,0.85); margin-top: 4px; }

.gate-select-label { font-size: 14px; font-weight: 600; color: #666; }
.gate-options { display: flex; gap: 8px; margin-top: 8px; flex-wrap: wrap; }
.gate-opt {
  padding: 6px 16px; border-radius: 8px; border: 1px solid #E0E0E0;
  font-size: 13px; cursor: pointer; background: #FAFAFA; transition: all 0.2s;
}
.gate-opt.active { background: #5BC5C8; color: #fff; border-color: #5BC5C8; }

.scan-card { text-align: center; padding: 24px; cursor: pointer; }
.scan-frame {
  width: 200px; height: 200px; margin: 0 auto;
  position: relative; display: flex; align-items: center; justify-content: center;
}
.scan-corner {
  position: absolute; width: 24px; height: 24px;
  border-color: #4A90D9; border-style: solid; border-width: 0;
}
.scan-corner.tl { top: 0; left: 0; border-top-width: 3px; border-left-width: 3px; border-radius: 4px 0 0 0; }
.scan-corner.tr { top: 0; right: 0; border-top-width: 3px; border-right-width: 3px; border-radius: 0 4px 0 0; }
.scan-corner.bl { bottom: 0; left: 0; border-bottom-width: 3px; border-left-width: 3px; border-radius: 0 0 0 4px; }
.scan-corner.br { bottom: 0; right: 0; border-bottom-width: 3px; border-right-width: 3px; border-radius: 0 0 4px 0; }
.scan-line {
  position: absolute; left: 8px; right: 8px; height: 2px;
  background: linear-gradient(90deg, transparent, #4A90D9, transparent);
  top: 8px; opacity: 0;
}
.scan-line.animating {
  opacity: 1;
  animation: scanMove 1.5s linear infinite;
}
@keyframes scanMove { 0% { top: 8px; } 100% { top: 184px; } }
.scan-icon { opacity: 0.3; }
.scan-text { margin-top: 12px; color: #999; font-size: 14px; }

.history-item { padding: 12px 16px; }
.history-top { display: flex; align-items: center; gap: 12px; }
.history-result {
  width: 44px; height: 44px; border-radius: 50%;
  display: flex; align-items: center; justify-content: center;
  font-size: 12px; font-weight: 600; color: #fff; flex-shrink: 0;
}
.result-pass { background: linear-gradient(135deg, #43A047, #66BB6A); }
.result-reject { background: linear-gradient(135deg, #E53935, #EF5350); }
.history-name { font-size: 15px; font-weight: 600; }
.history-meta { font-size: 12px; color: #999; margin-top: 2px; }
</style>
