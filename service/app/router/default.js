'use strict';
module.exports = app => {
  const { router, controller } = app;
  router.get('/default/index', controller.default.home.index);
  // 获取文章列表
  router.get('/default/getArticleList', controller.default.home.getArticleList);
  // 获取文章详情
  router.get('/default/getArticleById/:id', controller.default.home.getArticleById);
};
