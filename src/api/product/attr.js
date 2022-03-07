import request from '@/utils/request';

// 获取一级分类数据接口 GET /admin/product/getCategory1
export const reqCategory1List = () => request({ url: '/admin/product/getCategory1', method: 'get' })

// 获取二级分类数据接口  GET /admin/product/getCategory2/{category1Id}
export const reqCategory2List = (category1Id) => request({ url: `/admin/product/getCategory2/${category1Id}`, method: 'get' })

// 获取三级分类数据接口  GET /admin/product/getCategory3/{category2Id}
export const reqCategory3List = (category2Id) => request({ url: `/admin/product/getCategory3/${category2Id}`, method: 'get' })

// POST /admin/product/inner/findBaseCategory3ByCategory3IdList
// findBaseCategory3ByCategory3IdList

// DELETE /admin/product/removeCategory1/{id}
// 删除一级分类

// DELETE /admin/product/removeCategory2/{id}
// 删除二级分类

// DELETE /admin/product/removeCategory3/{id}
// 删除三级分类

// POST /admin/product/saveCategory1
// 新增一级分类

// POST /admin/product/saveCategory2
// 新增二级分类

// POST /admin/product/saveCategory3
// 新增三级分类

// PUT /admin/product/updateeCategory1
// 修改一级分类

// PUT /admin/product/updateeCategory2
// 修改二级分类

// PUT /admin/product/updateeCategory3
// 修改三级分类

// 商品基础属性接口

// 获取平台商品基础属性接口  GET /admin/product/attrInfoList/{category1Id}/{category2Id}/{category3Id}
export const reqAttrList = (category1Id, category2Id, category3Id) => request({ url: `/admin/product/attrInfoList/${category1Id}/${category2Id}/${category3Id}`, method: 'get' })

// DELETE /admin/product/deleteAttr/{attrId}
// deleteAttr

// GET /admin/product/getAttrValueList/{attrId}
// getAttrValueList

// 添加属性与属性值接口  POST /admin/product/saveAttrInfo
export const reqAddOrUpdateAttr = (data) => request({ url: '/admin/product/saveAttrInfo', method: 'post', data })