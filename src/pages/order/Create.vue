<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      新建订单
    </div>

    <div class="card">
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>关联房源</label>
        <select class="form-input" v-model="form.propertyId" style="appearance:auto;">
          <option value="">请选择房源</option>
          <option v-for="p in availableProps" :key="p.id" :value="p.id">{{ p.name }}（{{ p.code }}）</option>
        </select>
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>租售类型</label>
        <div class="option-row">
          <div class="opt-item" :class="{ active: form.type === 'rent' }" @click="form.type = 'rent'">租赁</div>
          <div class="opt-item" :class="{ active: form.type === 'sell' }" @click="form.type = 'sell'">售出</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>客户公司名称</label>
        <input class="form-input" v-model="form.customer" placeholder="请输入客户公司名称" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>联系人</label>
        <input class="form-input" v-model="form.contact" placeholder="请输入联系人姓名" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>联系电话</label>
        <input class="form-input" v-model="form.phone" type="tel" placeholder="请输入联系电话" />
      </div>
      <div class="form-group" v-if="form.type === 'rent'">
        <label class="form-label">月租金（元）</label>
        <input class="form-input" v-model="form.rentPrice" type="number" placeholder="请输入协商后月租金" />
      </div>
      <div class="form-group" v-if="form.type === 'sell'">
        <label class="form-label">售价（元）</label>
        <input class="form-input" v-model="form.sellPrice" type="number" placeholder="请输入协商后售价" />
      </div>
      <div class="form-group">
        <label class="form-label">定金金额（元）</label>
        <input class="form-input" v-model="form.deposit" type="number" placeholder="请输入定金金额" />
      </div>
      <div class="form-group">
        <label class="form-label">客户需求/备注</label>
        <textarea class="form-textarea" v-model="form.note" placeholder="记录客户需求、价格协商等信息"></textarea>
      </div>
    </div>

    <div style="padding: 0 16px 24px;">
      <button class="btn btn-primary" @click="submit">创建订单</button>
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { properties } from '../../utils/mock.js'

const route = useRoute()
const router = useRouter()
const availableProps = properties.filter(p => p.status === 'available' || p.status === 'negotiating')

const form = reactive({
  propertyId: route.query.propertyId || '',
  type: 'rent',
  customer: '', contact: '', phone: '',
  rentPrice: '', sellPrice: '', deposit: '', note: ''
})

function submit() {
  if (!form.propertyId || !form.customer || !form.contact || !form.phone) {
    alert('请填写所有必填项')
    return
  }
  alert('订单创建成功（模拟操作）')
  router.back()
}
</script>

<style scoped>
.option-row { display: flex; gap: 10px; }
.opt-item { padding: 8px 24px; border: 1px solid #E0E0E0; border-radius: 10px; font-size: 14px; cursor: pointer; background: #FAFAFA; transition: all 0.2s; }
.opt-item.active { background: #4A90D9; color: #fff; border-color: #4A90D9; }
</style>
