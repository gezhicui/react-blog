let ipUrl = 'http://159.75.29.199:7001/default/'
// let ipUrl = 'http://127.0.0.1:7001/default/'
let servicePath = {
  getArticleList: ipUrl + 'getArticleList',  //  首页文章列表接口
  getArticleListByValue: ipUrl + 'getArticleListByValue', // 获取关键字搜索文章列表
  getArticleTimeList: ipUrl + 'getArticleTimeList',  //  首页时间线列表接口
  getPagingArticleList: ipUrl + 'getPagingArticleList',  //  首页分页列表接口
  getArticleById: ipUrl + 'getArticleById/',  // 文章详细页内容接口 ,需要接收参数
  getTypeInfo: ipUrl + 'getTypeInfo',  //文章类别接口
  getListById: ipUrl + 'getListById/',  //根据id获取文章列表
  getPagingTypeIdArticle: ipUrl + 'getPagingTypeIdArticle/',// 获取分类下的文章分页列表
  addArticleViewCount: ipUrl + 'addArticleViewCount/', // 增加文章访问量
}
export default servicePath;