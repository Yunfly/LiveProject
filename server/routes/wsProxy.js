/**
 * 反向代理
 */
const proxy = require('http-proxy-middleware');


module.exports = (app) => {
  const { proxyURL } = app.getConfig();
  // ws代理服务
  return proxy('/ws', {
    target: proxyURL,
    changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    ws: true, // enable websocket proxy
    logLevel: 'debug',
  });
}
