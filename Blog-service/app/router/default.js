'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  // 获取文章列表
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  // 获取分页文章列表
  router.get('/default/getPagingArticleList', controller.default.home.getPagingArticleList);
  // 根据id获取文章详情
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
  // 获取分类列表
  router.get('/default/getTypeInfo', controller.default.home.getTypeInfo);
  // 获取分类下的文章列表
  router.get('/default/getListById/:id', controller.default.home.getListById);
  // 获取分类下的文章分页列表
  router.get('/default/getPagingTypeIdArticle/:id', controller.default.home.getPagingTypeIdArticle);
  // 增加文章浏览量
  router.post('/default/addArticleViewCount', controller.default.home.addArticleViewCount);

};
