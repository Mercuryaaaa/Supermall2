import request from '@/utils/request';

// GET /admin/product/findSpuInfoByKeyword/{keyword}
// findSpuInfoByKeyword

// POST /admin/product/inner/findSpuInfoBySpuIdList
// findSpuInfoBySpuIdList

// 获取SPU列表数据接口  GET /admin/product/{page}/{limit}
export const reqSpuList = (page, limit, category3Id) => request({ url: `/admin/product/${page}/${limit}`, method: 'get', params: { category3Id } })

// 获取spu基本信息  GET /admin/product/getSpuById/{spuId}
export const reqSpu = (spuId) => request({ url: `/admin/product/getSpuById/${spuId}`, method: 'get' })

// 获取品牌信息  GET /admin/product/baseTrademark/getTrademarkList
export const reqTradeMarkList = () => request({ url: '/admin/product/baseTrademark/getTrademarkList', method: 'get' })

// 获取Spu图片接口  GET /admin/product/spuImageList/{spuId}
export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取平台全部销售属性  最多三个  GET /admin/product/baseSaleAttrList
export const reqBaseSaleAttrList = () => request({ url: '/admin/product/baseSaleAttrList', method: 'get' })

// 添加、修改spu 
// 更改spu信息  POST /admin/product/updateSpuInfo
// 添加spu信息  POST /admin/product/saveSpuInfo
export const reqAddOrUpdateSpu = (spuInfo) => {
  // 有id为修改spu
  if (spuInfo.id) {
    return request({ url: '/admin/product/updateSpuInfo', method: 'post', data: spuInfo });
  } else {
    return request({ url: '/admin/product/saveSpuInfo', method: 'post', data: spuInfo });
  }
}

// 删除spu  DELETE /admin/product/deleteSpu/{spuId}
export const reqDeleteSpu = (spuId) => request({ url: `/admin/product/deleteSpu/${spuId}`, method: 'delete' })

// GET /admin/product/cancelSale/{skuId}
// cancelSale

// DELETE /admin/product/deleteSku/{skuId}
// deleteSku

// GET /admin/product/getSkuById/{skuId}
// getById

// GET /admin/product/inner/findSkuInfoByKeyword/{keyword}
// findSkuInfoByKeyword

// POST /admin/product/inner/findSkuInfoBySkuIdList
// findSkuInfoBySkuIdList

// GET /admin/product/list/{page}/{limit}
// index

// GET /admin/product/onSale/{skuId}
// onSale

// POST /admin/product/updateSkuInfo
// updateSkuInfo

// 获取图片数据   GET /admin/product/spuImageList/{spuId}
// export const reqSpuImageList = (spuId) => request({ url: `/admin/product/spuImageList/${spuId}`, method: 'get' })

// 获取销售属性列表   GET /admin/product/spuSaleAttrList/{spuId}
export const reqSpuSaleAttrList = (spuId) => request({ url: `/admin/product/spuSaleAttrList/${spuId}`, method: 'get' })

// 获取平台属性的数据  GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrInfoList = ({ category1Id, category2Id, category3Id }) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// 添加sku   POST /admin/product/saveSkuInfo
export const reqAddSku = (skuInfo) => request({url:'/admin/product/saveSkuInfo',method:'post',data:skuInfo})

// 获取sku列表数据接口  GET /admin/product/findBySpuId/{spuId}
export const reqSkuList = (spuId) => request({url:`/admin/product/findBySpuId/${spuId}`,method:'get'})