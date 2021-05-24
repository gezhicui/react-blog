/* eslint valid-jsdoc: "off" */

'use strict';

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {Egg.EggAppConfig}
   **/
  const config = exports = {};

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1606747612910_1088';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };
  // 数据库

  config.mysql = {
    client: {
      // host
      host: '159.75.29.199',
      // port
      port: '3306',
      // username
      user: 'root',
      // password
      password: 'root',
      // database
      database: 'react_blog',
    },
    // 是否加载到 app 上，默认开启
    app: true,
    // 是否加载到 agent 上，默认关闭
    agent: false,
  };

  config.security = {
    csrf: { enable: false },
    domainWhiteList: ['*'],
  };
  config.cors = {
    origin: '*',
    credentials: true, // 允许Cookie可以跨域
    allowMethods: 'GET,HEAD,PUT,POST,DELETE,PATCH,OPTIONS',
  };
  // 图片上传路径
  config.uploadDir = 'app/public/upload';

  // token加密条件
  config.jwt = {
    secret: '165165',
  };

  return {
    ...config,
    ...userConfig,
  };
};
