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
