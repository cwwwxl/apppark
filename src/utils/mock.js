// Mock data for the entire app - no backend needed

export const currentCompany = {
  id: 'C20260001',
  name: '华创科技有限公司',
  address: '科技园A栋12层',
  contact: '张经理',
  phone: '138****8888'
}

export const currentUser = {
  name: '张经理',
  role: '企业管理员',
  avatar: '',
  company: currentCompany.name,
  phone: '138****8888'
}

export const gates = [
  { id: 1, name: '东门岗' },
  { id: 2, name: '西门岗' },
  { id: 3, name: '南门岗（货运）' },
]

export const qrcodeRecords = [
  { id: 'QR20260401001', company: '华创科技有限公司', createdAt: '2026-04-15 09:30', duration: '一天', expireAt: '2026-04-16 09:30', status: 'expired', visitorName: '李明', shareMethod: '微信' },
  { id: 'QR20260402001', company: '华创科技有限公司', createdAt: '2026-04-16 14:00', duration: '半天', expireAt: '2026-04-16 18:00', status: 'used', visitorName: '王芳', shareMethod: '微信' },
  { id: 'QR20260403001', company: '华创科技有限公司', createdAt: '2026-04-17 08:00', duration: '一天', expireAt: '2026-04-18 08:00', status: 'active', visitorName: '赵磊', shareMethod: '链接' },
  { id: 'QR20260403002', company: '华创科技有限公司', createdAt: '2026-04-17 10:00', duration: '半天', expireAt: '2026-04-17 16:00', status: 'active', visitorName: '刘洋', shareMethod: '微信' },
]

export const visitorRecords = [
  { id: 'V001', name: '李明', idCard: '310***********1234', phone: '139****6666', company: '蓝海投资', reason: '商务洽谈', count: 1, status: 'verified', gate: '东门岗', verifyTime: '2026-04-15 10:05', qrId: 'QR20260401001' },
  { id: 'V002', name: '王芳', idCard: '320***********5678', phone: '136****7777', company: '星辰传媒', reason: '项目对接', count: 2, status: 'verified', gate: '西门岗', verifyTime: '2026-04-16 14:32', qrId: 'QR20260402001' },
  { id: 'V003', name: '赵磊', idCard: '110***********9012', phone: '158****3333', company: '鼎盛建材', reason: '设备维护', count: 1, status: 'pending', gate: '', verifyTime: '', qrId: 'QR20260403001' },
  { id: 'V004', name: '刘洋', idCard: '440***********3456', phone: '177****5555', company: '远景能源', reason: '技术交流', count: 3, status: 'pending', gate: '', verifyTime: '', qrId: 'QR20260403002' },
  { id: 'V005', name: '陈静', idCard: '330***********7890', phone: '135****2222', company: '云帆物流', reason: '送货', count: 1, status: 'rejected', gate: '南门岗（货运）', verifyTime: '2026-04-14 16:20', qrId: 'QR20260331001', rejectReason: '身份信息不符' },
]

export const verifyHistory = [
  { id: 1, visitorName: '王芳', company: '星辰传媒', time: '14:32', result: 'pass', gate: '西门岗' },
  { id: 2, visitorName: '陈静', company: '云帆物流', time: '16:20', result: 'reject', gate: '南门岗（货运）' },
  { id: 3, visitorName: '李明', company: '蓝海投资', time: '10:05', result: 'pass', gate: '东门岗' },
]

export const operationLogs = [
  { id: 1, time: '2026-04-17 10:00', action: '生成邀访码', operator: '张经理', detail: '为刘洋(远景能源)生成邀访二维码，有效时长半天', type: 'generate' },
  { id: 2, time: '2026-04-17 08:00', action: '生成邀访码', operator: '张经理', detail: '为赵磊(鼎盛建材)生成邀访二维码，有效时长一天', type: 'generate' },
  { id: 3, time: '2026-04-16 14:32', action: '核验通行', operator: '门卫-李强', detail: '访客王芳(星辰传媒)于西门岗核验通过，已放行', type: 'verify' },
  { id: 4, time: '2026-04-16 14:00', action: '生成邀访码', operator: '张经理', detail: '为王芳(星辰传媒)生成邀访二维码，有效时长半天', type: 'generate' },
  { id: 5, time: '2026-04-15 10:05', action: '核验通行', operator: '门卫-王刚', detail: '访客李明(蓝海投资)于东门岗核验通过，已放行', type: 'verify' },
  { id: 6, time: '2026-04-14 16:20', action: '拒绝通行', operator: '门卫-李强', detail: '访客陈静(云帆物流)于南门岗核验失败，原因：身份信息不符', type: 'reject' },
  { id: 7, time: '2026-04-15 09:30', action: '生成邀访码', operator: '张经理', detail: '为李明(蓝海投资)生成邀访二维码，有效时长一天', type: 'generate' },
  { id: 8, time: '2026-04-14 08:30', action: '分享邀访码', operator: '张经理', detail: '通过微信分享邀访码给陈静(云帆物流)', type: 'share' },
]

// ============ 房源/场地管理 ============
export const properties = [
  { id: 'P001', code: 'A-1201', name: 'A栋12层01室', building: 'A栋', floor: '12层', area: 120, type: '办公室', orientation: '南', facilities: '空调/网络/停车位', rentPrice: 8500, sellPrice: 0, deposit: '押二付一', status: 'available', images: 3, views: 45, publishTime: '2026-04-01' },
  { id: 'P002', code: 'A-1202', name: 'A栋12层02室', building: 'A栋', floor: '12层', area: 85, type: '办公室', orientation: '北', facilities: '空调/网络', rentPrice: 6200, sellPrice: 0, deposit: '押二付一', status: 'negotiating', images: 5, views: 32, publishTime: '2026-03-20' },
  { id: 'P003', code: 'B-0301', name: 'B栋3层大厅', building: 'B栋', floor: '3层', area: 350, type: '展厅', orientation: '东南', facilities: '空调/网络/货梯/停车位', rentPrice: 25000, sellPrice: 1800000, deposit: '押三付一', status: 'rented', images: 8, views: 128, publishTime: '2026-02-15', tenant: '星辰传媒' },
  { id: 'P004', code: 'C-0101', name: 'C栋1层仓储区', building: 'C栋', floor: '1层', area: 500, type: '仓库', orientation: '西', facilities: '货梯/停车位/监控', rentPrice: 15000, sellPrice: 0, deposit: '押二付一', status: 'available', images: 4, views: 67, publishTime: '2026-04-10' },
  { id: 'P005', code: 'A-0801', name: 'A栋8层整层', building: 'A栋', floor: '8层', area: 680, type: '办公室', orientation: '南', facilities: '空调/网络/会议室/停车位', rentPrice: 45000, sellPrice: 3200000, deposit: '押三付一', status: 'sold', images: 12, views: 256, publishTime: '2026-01-10', tenant: '远景能源' },
  { id: 'P006', code: 'D-0201', name: 'D栋2层场地', building: 'D栋', floor: '2层', area: 200, type: '活动场地', orientation: '东', facilities: '空调/投影/音响/停车位', rentPrice: 12000, sellPrice: 0, deposit: '押一付一', status: 'available', images: 6, views: 89, publishTime: '2026-04-05' },
]

export const propertyStatusMap = { available: '待租售', negotiating: '洽谈中', rented: '已租赁', sold: '已售出' }
export const propertyTypeOptions = ['办公室', '展厅', '仓库', '活动场地', '商铺', '厂房']
export const buildingOptions = ['A栋', 'B栋', 'C栋', 'D栋']

// ============ 租售订单管理 ============
export const orders = [
  { id: 'OD20260401', propertyCode: 'B-0301', propertyName: 'B栋3层大厅', customer: '星辰传媒', contact: '王芳', phone: '136****7777', type: 'rent', status: 'fulfilled', rentPrice: 25000, deposit: 75000, depositPaid: true, contractStart: '2026-03-01', contractEnd: '2027-02-28', signDate: '2026-02-20', createTime: '2026-02-15 10:00', negotiations: [
    { time: '2026-02-15 10:00', content: '客户来访参观B栋3层大厅，对面积和采光满意', result: '有意向', operator: '张经理' },
    { time: '2026-02-18 14:00', content: '电话沟通租金，客户希望月租降至22000', result: '价格协商中', operator: '张经理' },
    { time: '2026-02-20 09:30', content: '最终协商租金25000/月，押三付一，签订合同', result: '签约成功', operator: '张经理' },
  ]},
  { id: 'OD20260402', propertyCode: 'A-0801', propertyName: 'A栋8层整层', customer: '远景能源', contact: '刘洋', phone: '177****5555', type: 'sell', status: 'fulfilled', sellPrice: 3200000, deposit: 320000, depositPaid: true, signDate: '2026-01-25', createTime: '2026-01-12 09:00', negotiations: [
    { time: '2026-01-12 09:00', content: '客户参观A栋8层，对整层格局非常满意', result: '有意向', operator: '张经理' },
    { time: '2026-01-18 15:00', content: '客户提出购买意向，希望价格300万', result: '价格协商中', operator: '张经理' },
    { time: '2026-01-25 10:00', content: '最终成交价320万，支付定金32万，签订购买合同', result: '签约成功', operator: '张经理' },
  ]},
  { id: 'OD20260403', propertyCode: 'A-1202', propertyName: 'A栋12层02室', customer: '鼎盛建材', contact: '赵磊', phone: '158****3333', type: 'rent', status: 'signed', rentPrice: 6200, deposit: 12400, depositPaid: true, contractStart: '2026-05-01', contractEnd: '2027-04-30', signDate: '2026-04-15', createTime: '2026-04-10 11:00', negotiations: [
    { time: '2026-04-10 11:00', content: '客户参观A栋12层02室，面积合适', result: '有意向', operator: '张经理' },
    { time: '2026-04-15 09:00', content: '签订租赁合同，押二付一，5月1日起租', result: '签约成功', operator: '张经理' },
  ]},
  { id: 'OD20260404', propertyCode: 'A-1201', propertyName: 'A栋12层01室', customer: '蓝海投资', contact: '李明', phone: '139****6666', type: 'rent', status: 'negotiating', rentPrice: 8500, deposit: 0, depositPaid: false, createTime: '2026-04-16 14:00', negotiations: [
    { time: '2026-04-16 14:00', content: '客户电话咨询A栋12层01室，了解基本信息', result: '初步接触', operator: '张经理' },
    { time: '2026-04-17 10:00', content: '客户到场参观，对朝向和面积满意，希望租金降低', result: '价格协商中', operator: '张经理' },
  ]},
  { id: 'OD20260405', propertyCode: 'D-0201', propertyName: 'D栋2层场地', customer: '云帆物流', contact: '陈静', phone: '135****2222', type: 'rent', status: 'terminated', rentPrice: 12000, deposit: 12000, depositPaid: true, contractStart: '2026-01-01', contractEnd: '2026-12-31', signDate: '2025-12-20', terminateDate: '2026-03-15', terminateReason: '业务调整，提前退租', createTime: '2025-12-15 09:00', negotiations: [
    { time: '2025-12-15 09:00', content: '客户参观D栋2层场地', result: '有意向', operator: '张经理' },
    { time: '2025-12-20 10:00', content: '签订合同，押一付一', result: '签约成功', operator: '张经理' },
    { time: '2026-03-15 14:00', content: '客户申请提前解约，原因：业务调整', result: '已解约', operator: '张经理' },
  ]},
]

export const orderStatusMap = { negotiating: '洽谈中', pending: '待签约', signed: '已签约', fulfilled: '已履约', terminated: '已解约' }
export const orderTypeMap = { rent: '租赁', sell: '售出' }

// ============ 租售数据统计 ============
export const statsOverview = {
  totalProperties: 6,
  availableCount: 3,
  rentedCount: 2,
  soldCount: 1,
  occupancyRate: 50,
  totalRentRevenue: 186400,
  totalSellRevenue: 3200000,
  totalDeposit: 419400,
  avgRentPerSqm: 68.5,
  conversionRate: 62.5,
}

export const monthlyRentData = [
  { month: '2026-01', revenue: 37000, count: 2 },
  { month: '2026-02', revenue: 62000, count: 3 },
  { month: '2026-03', revenue: 49000, count: 2 },
  { month: '2026-04', revenue: 38400, count: 3 },
]

export const propertyTypeStats = [
  { type: '办公室', count: 3, area: 885, revenue: 59700 },
  { type: '展厅', count: 1, area: 350, revenue: 25000 },
  { type: '仓库', count: 1, area: 500, revenue: 0 },
  { type: '活动场地', count: 1, area: 200, revenue: 0 },
]

// Generate a simple QR-like pattern as SVG
export function generateQRSvg(text, size = 200) {
  // Create a deterministic pattern based on text hash
  let hash = 0
  for (let i = 0; i < text.length; i++) {
    hash = ((hash << 5) - hash) + text.charCodeAt(i)
    hash |= 0
  }
  const grid = 21
  const cellSize = size / grid
  let rects = ''
  for (let r = 0; r < grid; r++) {
    for (let c = 0; c < grid; c++) {
      // Position patterns (corners)
      const isCorner = (r < 7 && c < 7) || (r < 7 && c >= grid - 7) || (r >= grid - 7 && c < 7)
      const isBorder = isCorner && (r === 0 || r === 6 || c === 0 || c === 6 || (r >= grid - 7 && (r === grid - 7 || r === grid - 1)) || (c >= grid - 7 && (c === grid - 7 || c === grid - 1)))
      const isInner = isCorner && r >= 2 && r <= 4 && c >= 2 && c <= 4 ||
                      isCorner && r >= 2 && r <= 4 && c >= grid - 5 && c <= grid - 3 ||
                      isCorner && r >= grid - 5 && r <= grid - 3 && c >= 2 && c <= 4
      const fill = isBorder || isInner || (!isCorner && ((hash >> ((r * grid + c) % 31)) & 1))
      if (fill) {
        rects += `<rect x="${c * cellSize}" y="${r * cellSize}" width="${cellSize}" height="${cellSize}" fill="#333"/>`
      }
    }
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 ${size} ${size}"><rect width="${size}" height="${size}" fill="white"/>${rects}</svg>`
}
