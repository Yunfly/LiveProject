/**
 * 配置信息加载
 * @param {*} app
 */
const path = require('path');
const fs = require('fs');

const CONFIGKEY = 'yun9config';

module.exports = (app) => {
  // eslint-disable-next-line
  app.getConfig = () => {
    return app.get(CONFIGKEY) || {};
  };

  // 加载默认配置信息
  const configDefaultPath = path.join(process.cwd(), 'config/default.js');
  const configDir = path.join(process.cwd(), '/config');
  const env = process.env.NODE_ENV || 'development';
  const configExtendPath = path.join(configDir, `${env}.js`);

  // eslint-disable-next-line
  const configDefault = fs.existsSync(configDefaultPath) ? require(configDefaultPath) || {} : {};
  // eslint-disable-next-line
  const configExtend = fs.existsSync(configExtendPath) ? require(configExtendPath) || {} : {};
  // 根据环境加载配置信息
  app.set(CONFIGKEY, { ...configDefault, ...configExtend });
};
