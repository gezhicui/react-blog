'use strict';
module.exports = app => {
  const { router, controller, middleware } = app;
  const jwt = middleware.jwt(app.config.jwt);
  // 声明并引入中间件。
  // router.get('/', controller.admin.main.index);
  router.post('/admin/test', jwt, controller.admin.main.test);
  // 登录
  router.post('/admin/checkLogin', controller.admin.main.checkLogin);
  // 获取文章分类
  router.get('/admin/getTypeInfo', controller.admin.main.getTypeInfo);
  // 添加文章
  router.post('/admin/addArticle', controller.admin.main.addArticle);
  // 修改文章
  router.post('/admin/updateArticle', controller.admin.main.updateArticle);
  // 获取文章列表
  router.get('/admin/getArticleList', controller.admin.main.getArticleList);
  // 删除文章
  router.get('/admin/delArticle/:id', controller.admin.main.delArticle);
  // 根据id查询文章
  router.get('/admin/getArticleById/:id', controller.admin.main.getArticleById);
  // 上传图片
  router.post('/admin/uploadImg', controller.admin.main.uploadImg);
};
