'use strict';

const Controller = require('egg').Controller;
const fs = require('fs');
const pump = require('pump');
class MainController extends Controller {
  // 测试
  async test() {
    const { ctx } = this;
    ctx.body = { code: 201, msg: '验证成功', data: ctx.state.user };
    console.log('\n\n user +++', ctx.state.user);
  }
  // 判断用户名密码是否正确
  async checkLogin() {
    const userName = this.ctx.request.body.userName;
    const password = this.ctx.request.body.password;
    const sql = " SELECT userName FROM admin_user WHERE userName = '" + userName +
      "' AND password = '" + password + "'";

    const res = await this.app.mysql.query(sql);
    if (res.length > 0) {
      // 登录成功,进行token生成
      const token = this.app.jwt.sign({
        userName: this.ctx.request.body.userName,
        password: this.ctx.request.body.password,
      }, this.app.config.jwt.secret);
      this.ctx.body = { data: '登录成功', token };

    } else {
      this.ctx.body = { data: '登录失败' };
    }
  }
  // 获取类型列表
  async getTypeInfo() {
    const resType = await this.app.mysql.select('type');
    this.ctx.body = { data: resType };
  }

  // 添加文章
  async addArticle() {
    const tmpArticle = this.ctx.request.body;
    console.log(tmpArticle);
    const result = await this.app.mysql.insert('article', tmpArticle); // 插入表到article表里
    const insertSuccess = result.affectedRows === 1; // 判断是否插入成功
    const insertId = result.insertId;

    this.ctx.body = {
      isSuccess: insertSuccess,
      insertId,
    };
  }

  // 修改文章
  async updateArticle() {
    const tempArticle = this.ctx.request.body;
    console.log(tempArticle);
    const result = await this.app.mysql.update('article', tempArticle);
    const updateSuccess = result.affectedRows === 1;
    this.ctx.body = {
      isSuccess: updateSuccess,
    };
  }

  // 获得文章分页列表
  async getArticleList() {
    const pageNum = this.ctx.query.pageNum - 1;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d ') as addTime," +
      'article.view_count as view_count,' +
      'article.status as status,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY article.status DESC ,article.addTime desc' +
      // eslint-disable-next-line no-useless-concat
      ' limit ' + pageNum * 10 + ',' + '10';

    const resList = await this.app.mysql.query(sql);
    const count = await this.app.mysql.query('select count(*) as count from article');
    this.ctx.body = {
      list: resList,
      count: count[0].count,
    };

  }

  // 删除文章
  async delArticle() {
    const id = this.ctx.params.id;
    const res = await this.app.mysql.delete('article', { id });
    this.ctx.body = { data: res };
  }

  // 根据ID获得文章
  async getArticleById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      'article.addTime as addTime,' +
      'article.view_count as view_count,' +
      'article.status as status,' +
      'type.typeName as typeName,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id =' + id;

    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };
  }
  // 上传图片
  async uploadImg() {
    const { ctx } = this;
    const parts = ctx.multipart({ autoFields: true });
    let files = {};
    let stream;
    while ((stream = await parts()) != null) {
      if (!stream.filename) {
        break;
      }
      const fieldname = stream.fieldname; // file表单的名字
      // 上传图片的目录
      const dir = await this.service.tools.getUploadFile(stream.filename);
      const target = dir.uploadDir;
      const writeStream = fs.createWriteStream(target);

      await pump(stream, writeStream);

      files = Object.assign(files, {
        [fieldname]: dir.saveDir,
      });
    }

    if (Object.keys(files).length > 0) {
      ctx.body = {
        code: 200,
        message: '图片上传成功',
        data: files,
      };
    } else {
      ctx.body = {
        code: 500,
        message: '图片上传失败',
        data: {},
      };
    }
  }
}


module.exports = MainController;
