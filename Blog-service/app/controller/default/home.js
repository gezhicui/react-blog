'use strict';

const Controller = require('egg').Controller;

class HomeController extends Controller {


  async index() {
    this.ctx.body = '<h1>hi egg</h1>';
  }

  async getArticleList() {
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
      'article.view_count as view_count ,' +
      'article.status as status ,' +
      'article.article_content as content ,' +
      'type.typeName as typeName ' +
      // eslint-disable-next-line no-useless-concat
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY status desc,article.addTime desc';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = { data: results };
  }
  async getArticleListByValue() {
    const value = this.ctx.query.value;
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.article_content as content ' +
      'FROM article ' +
      'WHERE CONCAT(article_content,title,introduce) ' +
      `LIKE '%${value}%' ` +
      'ORDER BY status desc,article.addTime desc';
    const results = await this.app.mysql.query(sql);
    this.ctx.body = { data: results };
  }

  // 获取时间线列表
  async getArticleTimeList() {
    const pageNum = this.ctx.query.pageNum - 1;
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
      'article.status as status ' +
      // eslint-disable-next-line no-useless-concat
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY status desc,article.addTime desc ' +
      // eslint-disable-next-line no-useless-concat
      'limit ' + pageNum * 10 + ',' + '10';

    const results = await this.app.mysql.query(sql);

    this.ctx.body = { data: results };
  }

  async getPagingArticleList() {
    const pageNum = this.ctx.query.pageNum - 1;
    const sql =
      'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
      'article.view_count as view_count ,' +
      'article.status as status ,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'ORDER BY status desc,article.addTime desc ' +
      // eslint-disable-next-line no-useless-concat
      'limit ' + pageNum * 5 + ',' + '5';

    const results = await this.app.mysql.query(sql);
    const count = await this.app.mysql.query('select count(*) as count from article');
    this.ctx.body = {
      data: results,
      count: count[0].count,
    };
  }

  async getArticleById() {
    // 先配置路由的动态传值，然后再接收值
    const id = this.ctx.params.id;

    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      'article.article_content as article_content,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d' ) as addTime," +
      'article.view_count as view_count ,' +
      'type.typeName as typeName ,' +
      'type.id as typeId ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE article.id=' + id;

    const result = await this.app.mysql.query(sql);

    this.ctx.body = { data: result };

  }
  // 得到类别名称和编号
  async getTypeInfo() {

    const result = await this.app.mysql.select('type');
    this.ctx.body = { data: result };

  }
  // 根据类别ID获得文章列表
  async getListById() {
    const id = this.ctx.params.id;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
      'article.view_count as view_count,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id;
    const result = await this.app.mysql.query(sql);
    this.ctx.body = { data: result };

  }
  // 根据类别ID获得文章分页列表
  async getPagingTypeIdArticle() {
    const id = this.ctx.params.id;
    const pageNum = this.ctx.query.pageNum - 1;
    const sql = 'SELECT article.id as id,' +
      'article.title as title,' +
      'article.introduce as introduce,' +
      "FROM_UNIXTIME(article.addTime,'%Y-%m-%d') as addTime," +
      'article.status as status ,' +
      'article.view_count as view_count,' +
      'type.typeName as typeName ' +
      'FROM article LEFT JOIN type ON article.type_id = type.Id ' +
      'WHERE type_id=' + id +
      ' ORDER BY status desc,article.addTime desc ' +
      // eslint-disable-next-line no-useless-concat
      'limit ' + pageNum * 5 + ',' + '5';
    const result = await this.app.mysql.query(sql);
    const count = await this.app.mysql.query('select count(*) as count from article where type_id = ' + id);
    this.ctx.body = {
      data: result,
      count: count[0].count,
    };
  }
  // 指定文章添加文章浏览量
  async addArticleViewCount() {
    const id = this.ctx.request.body.id;
    const sql = 'update article set view_count = view_count+1 where id =' + id;
    const result = await this.app.mysql.query(sql);
    const insertSuccess = result.affectedRows === 1; // 判断是否修改成功
    this.ctx.body = {
      isSuccess: insertSuccess,
    };
  }

}

module.exports = HomeController;
