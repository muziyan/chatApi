/* eslint valid-jsdoc: "off" */

'use strict';

require("dotenv").config()

/**
 * @param {Egg.EggAppInfo} appInfo app info
 */
module.exports = appInfo => {
  /**
   * built-in config
   * @type {{security: {domainWhiteList: [string | undefined], csrf: {enable: boolean}}, sequelize: {database, password, dialect, port, host, username}}}
   **/
  const config = exports = {
    sequelize : {
      dialect: process.env.DEFAUULT_DATABASE,
      host: process.env.HOST,
      port: process.env.PORT,
      database: process.env.DATABASE,
      username:process.env.USERNAME,
      password:process.env.PASSWORD,
      timezone:"+08:00"
    },
    security:{
      csrf:{
        enable:false
      },
      domainWhiteList:[
        process.env.WEB_URL
      ],
    },
    cors:{
      origin:"*",
      allowMethod:"*"
    },
    multipart:{
      mode:'file'
    },
    oss:{
      client:{
        accessKeyId: process.env.ACCESS_KEY_ID,
        accessKeySecret: process.env.ACCESS_KEY_SECRET,
        bucket: process.env.BUCKET,
        endpoint:process.env.REGION,
        timeout: '60s',
      }
    }
  };

  // use for cookie sign key, should change to your own and keep security
  config.keys = appInfo.name + '_1587970581222_3867';

  // add your middleware config here
  config.middleware = [];

  // add your user config here
  const userConfig = {
    // myAppName: 'egg',
  };

  return {
    ...config,
    ...userConfig,
  };
};
