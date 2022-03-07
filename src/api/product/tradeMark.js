import request from '@/utils/request'

// 获取品牌列表接口  GET /admin/product/baseTrademark/{page}/{limit}
export const reqTradeMarkList = (page, limit) => request({ url: `/admin/product/baseTrademark/${page}/${limit}`, method: 'get' })

// 新增品牌接口  POST /admin/product/baseTrademark/save  带参:品牌名称、品牌LOGO
// 修改品牌信息接口  PUT /admin/product/baseTrademark/update  带参:品牌名称、品牌LOGO、id
export const reqAddOrUpdateTradeMark = (tradeMark) => {
  if (tradeMark.id) {
    return request({ url: '/admin/product/baseTrademark/update', method: 'put', data: tradeMark })
  } else {
    return request({ url: '/admin/product/baseTrademark/save', method: 'post', data: tradeMark })
  }
}

// 删除品牌接口  DELETE /admin/product/baseTrademark/remove/{id}
export const reqDeleteTradeMark = (id) => request({url:`/admin/product/baseTrademark/remove/${id}`,method:'delete'})
