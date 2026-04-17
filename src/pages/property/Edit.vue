<template>
  <div class="page-with-nav">
    <div class="nav-bar">
      <div class="back" @click="$router.back()">&#8249;</div>
      {{ isEdit ? '编辑房源' : '发布房源' }}
    </div>

    <div class="card">
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>房源名称</label>
        <input class="form-input" v-model="form.name" placeholder="如：A栋12层01室" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>编号</label>
        <input class="form-input" v-model="form.code" placeholder="如：A-1201" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>楼栋</label>
        <div class="option-row">
          <div v-for="b in buildings" :key="b" class="opt-item" :class="{ active: form.building === b }" @click="form.building = b">{{ b }}</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>楼层</label>
        <input class="form-input" v-model="form.floor" placeholder="如：12层" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>面积（m²）</label>
        <input class="form-input" v-model="form.area" type="number" placeholder="请输入面积" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>户型/类型</label>
        <div class="option-row">
          <div v-for="t in types" :key="t" class="opt-item" :class="{ active: form.type === t }" @click="form.type = t">{{ t }}</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label">朝向</label>
        <div class="option-row">
          <div v-for="o in orientations" :key="o" class="opt-item" :class="{ active: form.orientation === o }" @click="form.orientation = o">{{ o }}</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>租金（元/月）</label>
        <input class="form-input" v-model="form.rentPrice" type="number" placeholder="请输入月租金" />
      </div>
      <div class="form-group">
        <label class="form-label">售价（元，不售可留空）</label>
        <input class="form-input" v-model="form.sellPrice" type="number" placeholder="请输入售价" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>押付方式</label>
        <div class="option-row">
          <div v-for="d in deposits" :key="d" class="opt-item" :class="{ active: form.deposit === d }" @click="form.deposit = d">{{ d }}</div>
        </div>
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>联系人</label>
        <input class="form-input" v-model="form.contact" placeholder="请输入联系人姓名" />
      </div>
      <div class="form-group">
        <label class="form-label"><span class="required">*</span>联系电话</label>
        <input class="form-input" v-model="form.phone" type="tel" placeholder="请输入联系电话" />
      </div>
      <div class="form-group">
        <label class="form-label">配套设施</label>
        <input class="form-input" v-model="form.facilities" placeholder="如：空调/网络/停车位" />
      </div>
      <div class="form-group">
        <label class="form-label">实景图/视频</label>
        <div class="upload-area">
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#bbb" stroke-width="1.5"><rect x="3" y="3" width="18" height="18" rx="2"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="8" y1="12" x2="16" y2="12"/></svg>
          <span>点击上传图片/视频</span>
        </div>
      </div>
    </div>

    <div style="padding: 0 16px 24px;">
      <button class="btn btn-primary" @click="submit">{{ isEdit ? '保存修改' : '发布房源' }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { properties, propertyTypeOptions, buildingOptions } from '../../utils/mock.js'

const route = useRoute()
const router = useRouter()
const isEdit = !!route.query.id
const existing = isEdit ? properties.find(p => p.id === route.query.id) : null

const buildings = buildingOptions
const types = propertyTypeOptions
const orientations = ['东', '南', '西', '北', '东南', '东北', '西南', '西北']
const deposits = ['押一付一', '押二付一', '押三付一']

const form = reactive({
  name: existing?.name || '',
  code: existing?.code || '',
  building: existing?.building || '',
  floor: existing?.floor || '',
  area: existing?.area || '',
  type: existing?.type || '',
  orientation: existing?.orientation || '',
  rentPrice: existing?.rentPrice || '',
  sellPrice: existing?.sellPrice || '',
  deposit: existing?.deposit || '',
  contact: existing?.contact || '',
  phone: existing?.phone || '',
  facilities: existing?.facilities || '',
})

function submit() {
  if (!form.name || !form.code || !form.building || !form.area || !form.type || !form.rentPrice || !form.contact || !form.phone) {
    alert('请填写所有必填项')
    return
  }
  alert(isEdit ? '房源信息已更新（模拟操作）' : '房源发布成功（模拟操作）')
  router.back()
}
</script>

<style scoped>
.option-row { display: flex; flex-wrap: wrap; gap: 8px; }
.opt-item { padding: 6px 14px; border: 1px solid #E0E0E0; border-radius: 8px; font-size: 13px; cursor: pointer; background: #FAFAFA; transition: all 0.2s; }
.opt-item.active { background: #4A90D9; color: #fff; border-color: #4A90D9; }
.upload-area { width: 100%; height: 100px; border: 2px dashed #E0E0E0; border-radius: 12px; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 6px; color: #bbb; font-size: 13px; cursor: pointer; }
.upload-area:active { border-color: #4A90D9; }
</style>
