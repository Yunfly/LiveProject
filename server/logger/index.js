/**
 * 配置日志
 * @param {*} app
 */
// eslint-disable-next-line
const debug = require('debug')('web-ft-server-express:server');
const logger = require('morgan');

module.exports = (app) => {
  app.use(logger('dev'));
  // eslint-disable-next-line
  app.logger = {
    debug(message) {
      logger(message);
    },
  };
};
