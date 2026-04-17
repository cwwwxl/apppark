<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      访客登记
    </div>

    <div class="fill-header">
      <div class="fill-company">{{ company.name }}</div>
      <div class="fill-sub">请填写以下信息完成访客登记</div>
    </div>

    <div class="card">
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>姓名</label>
        <input class="form-input" v-model="form.name" placeholder="请输入真实姓名" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>身份证号</label>
        <input class="form-input" v-model="form.idCard" placeholder="请输入身份证号码" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>手机号</label>
        <input class="form-input" v-model="form.phone" type="tel" placeholder="请输入手机号码" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>所属公司</label>
        <input class="form-input" v-model="form.company" placeholder="请输入所属公司名称" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>来访事由</label>
        <div class="reason-options">
          <div v-for="r in reasons" :key="r" class="reason-opt" :class="{ active: form.reason === r }" @click="form.reason = r">{{ r }}</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>来访人数</label>
        <input class="form-input" v-model="form.count" type="number" placeholder="请输入来访人数" />
      </div>
      <div class="form-group">
        <label class="form-label">车牌号</label>
        <input class="form-input" v-model="form.plate" placeholder="如有车辆请输入车牌号" />
      </div>
    </div>

    <div class="agree-row">
      <div class="checkbox" :class="{ checked: agreed }" @click="agreed = !agreed">
        <svg v-if="agreed" width="14" height="14" viewBox="0 0 24 24" fill="#fff"><path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/></svg>
      </div>
      <span>我已阅读并同意《访客须知》和《隐私协议》</span>
    </div>

    <div style="padding: 0 16px; margin-top: 12px;">
      <button class="btn btn-primary" @click="submit" :style="{ opacity: canSubmit ? 1 : 0.5 }">提交登记</button>
    </div>

    <!-- Success modal -->
    <div class="modal-overlay" v-if="submitted" @click="goPass">
      <div class="modal-box" @click.stop>
        <div class="modal-icon success">
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#43A047" stroke-width="2.5"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2h11"/></svg>
        </div>
        <div class="modal-title">登记成功</div>
        <div class="modal-text">您的访客信息已提交，请凭通行核销码入园</div>
        <button class="btn btn-primary" style="margin-top: 16px;" @click="goPass">查看通行证</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, computed } from 'vue'
import { useRouter } from 'vue-router'
import { currentCompany } from '../../utils/mock.js'

const router = useRouter()
const company = currentCompany

const reasons = ['商务洽谈', '项目对接', '技术交流', '设备维护', '面试', '送货', '其他']

const form = reactive({
  name: '', idCard: '', phone: '', company: '', reason: '', count: '1', plate: ''
})

const agreed = ref(false)
const submitted = ref(false)

const canSubmit = computed(() =>
  form.name && form.idCard && form.phone && form.company && form.reason && form.count && agreed.value
)

function submit() {
  if (!canSubmit.value) {
    alert('请填写所有必填项并同意协议')
    return
  }
  submitted.value = true
}

function goPass() {
  router.push('/visitor/pass')
}
</script>

<style scoped>
.fill-header {
  background: linear-gradient(135deg, #4A90D9, #5BA3EC);
  padding: 20px 16px;
  text-align: center;
}
.fill-company { color: #fff; font-size: 18px; font-weight: 700; }
.fill-sub { color: rgba(255,255,255,0.8); font-size: 13px; margin-top: 4px; }

.reason-options { display: flex; flex-wrap: wrap; gap: 8px; }
.reason-opt {
  padding: 6px 14px;
  border: 1px solid #E0E0E0;
  border-radius: 8px;
  font-size: 13px;
  cursor: pointer;
  background: #FAFAFA;
  transition: all 0.2s;
}
.reason-opt.active { background: #4A90D9; color: #fff; border-color: #4A90D9; }

.agree-row {
  display: flex; align-items: center; gap: 8px;
  padding: 12px 16px;
  font-size: 12px; color: #999;
}
.checkbox {
  width: 20px; height: 20px;
  border: 2px solid #ccc; border-radius: 4px;
  display: flex; align-items: center; justify-content: center;
  cursor: pointer; transition: all 0.2s;
}
.checkbox.checked { background: #4A90D9; border-color: #4A90D9; }

.modal-overlay {
  position: fixed; inset: 0; background: rgba(0,0,0,0.5);
  display: flex; align-items: center; justify-content: center;
  z-index: 1000;
}
.modal-box {
  background: #fff; border-radius: 20px; padding: 32px 24px;
  width: 300px; text-align: center;
}
.modal-icon { margin-bottom: 12px; }
.modal-title { font-size: 20px; font-weight: 700; color: #333; }
.modal-text { font-size: 14px; color: #999; margin-top: 8px; }
</style>
