/**
 * 反向代理
 */
const express = require('express');

const router = express.Router();
const proxy = require('http-proxy-middleware');

module.exports = (app) => {
  router.use('/', proxy({
    target: "http://zb-admin.runger.net",
    changeOrigin: true,
    onProxyReq(proxyReq, req) {
    },
  }));

  return router;
}
