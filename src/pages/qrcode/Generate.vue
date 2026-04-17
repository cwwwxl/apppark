<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      生成邀访码
    </div>

    <div class="card">
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>企业名称</label>
        <input class="form-input" :value="company.name" disabled />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>联系人</label>
        <input class="form-input" :value="company.contact" disabled />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>有效时长</label>
        <div class="duration-options">
          <div v-for="opt in durations" :key="opt.value"
               class="dur-opt" :class="{ active: form.duration === opt.value }"
               @click="form.duration = opt.value">
            {{ opt.label }}
          </div>
        </div>
      </div>
      <div class="form-group" v-if="form.duration === 'custom'">
        <label class="form-label">自定义时长（小时）</label>
        <input class="form-input" type="number" v-model="form.customHours" placeholder="请输入小时数" />
      </div>
      <div class="form-group">
        <label class="form-label">可通行门岗</label>
        <div class="duration-options">
          <div v-for="g in gates" :key="g.id"
               class="dur-opt" :class="{ active: form.gateId === g.id }"
               @click="form.gateId = g.id">
            {{ g.name }}
          </div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">备注</label>
        <textarea class="form-textarea" v-model="form.note" placeholder="请输入备注信息"></textarea>
      </div>
    </div>

    <div style="padding: 0 16px; margin-top: 12px;">
      <button class="btn btn-primary" @click="generate" v-if="!generated">生成邀访二维码</button>
    </div>

    <!-- Generated result -->
    <div class="card" v-if="generated" style="text-align: center;">
      <div style="font-size: 16px; font-weight: 600; margin-bottom: 12px; color: #43A047;">邀访码已生成</div>
      <div class="qr-display" v-html="qrSvg"></div>
      <div style="margin-top: 12px; color: #999; font-size: 13px;">
        有效期至：{{ expireTime }}
      </div>
      <div style="display: flex; gap: 12px; margin-top: 16px;">
        <button class="btn btn-success" style="flex:1" @click="shareWechat">分享到微信</button>
        <button class="btn btn-outline" style="flex:1" @click="copyLink">复制链接</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { currentCompany, gates, generateQRSvg } from '../../utils/mock.js'

const company = currentCompany
const durations = [
  { label: '半天', value: 'half' },
  { label: '一天', value: 'day' },
  { label: '自定义', value: 'custom' },
]

const form = reactive({
  duration: 'half',
  customHours: '',
  gateId: 1,
  note: ''
})

const generated = ref(false)
const qrSvg = ref('')
const expireTime = ref('')

function generate() {
  const now = new Date()
  let hours = form.duration === 'half' ? 5 : form.duration === 'day' ? 24 : parseInt(form.customHours) || 8
  const expire = new Date(now.getTime() + hours * 3600000)
  expireTime.value = expire.toLocaleString('zh-CN')
  qrSvg.value = generateQRSvg('QR' + Date.now(), 180)
  generated.value = true
}

function shareWechat() { alert('已模拟分享到微信') }
function copyLink() { alert('链接已复制到剪贴板') }
</script>

<style scoped>
.duration-options { display: flex; gap: 10px; flex-wrap: wrap; }
.dur-opt {
  padding: 8px 18px;
  border-radius: 10px;
  border: 1px solid #E0E0E0;
  font-size: 14px;
  cursor: pointer;
  transition: all 0.2s;
  background: #FAFAFA;
}
.dur-opt.active {
  background: linear-gradient(135deg, #4A90D9, #5BA3EC);
  color: #fff;
  border-color: #4A90D9;
}
.qr-display {
  display: inline-block;
  padding: 16px;
  background: #fff;
  border-radius: 12px;
  border: 1px solid #eee;
}
</style>
