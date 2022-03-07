import request from '@/utils/request';

// 获取sku列表接口  GET /admin/product/list/{page}/{limit}
export const reqSkuList = (page, limit) => request({ url: `/admin/product/list/${page}/${limit}`, method: 'get' })

// 上架sku  GET /admin/product/onSale/{skuId}
export const reqOnSale = (skuId) => request({ url: `/admin/product/onSale/${skuId}`, method: 'get' })

// 下架sku  GET /admin/product/cancelSale/{skuId}
export const reqCancelSale = (skuId) => request({ url: `/admin/product/cancelSale/${skuId}`, method: 'get' })

// 获取sku详情信息  GET /admin/product/getSkuById/{skuId}
export const reqSkuById = (skuId) => request({ url: `/admin/product/getSkuById/${skuId}`, method: 'get' })