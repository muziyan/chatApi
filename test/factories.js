// test/factories.js
'use strict';

const { factory } = require('factory-girl');

module.exports = app => {
  // 可以通过 app.factory 访问 factory 实例
  app.factory = factory;

  // 定义 user 和默认数据
  factory.define('user', app.model.User, {
    chat_id: 12312312,
    username: factory.sequence('User.name', n => `name_${n}`),
    email: "234234234@qq.com",
    password: "asfsafklsafjd",
  });
};
