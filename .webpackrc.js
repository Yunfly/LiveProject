const path = require('path');
export default {
  "entry": "src/index.js",
  "proxy": {
    '/api': {
      target: 'http://zb-admin.runger.net',
      changeOrigin: true,
      onProxyReq(proxyReq, req) {
        proxyReq.setHeader('authorization', `Bearer ERnHhtzyq2Yvz5OdPyRk5RnmF0SugbeHo9slLnc75vDK4MKF9cmFigSOjwPhOc1Mz9qLg7vDjmJI4f8A7O8wnQZspStkdkExsiLAhbUVaP2T9neg5ZIJcildcW9UJTbS0r6zXw6WGu0DuVY2pbCUf6oK2d7ZvHcoSe8UmMHtHiFjztcvfKZWXMx1ksBzIw5Li0e9pUiseYQu6FhwMdOTN7tKPNSmgiHZMMCNt2wYvsUdMfC1hmbUA3sDIvG4JGw|13699429782|10000001463017`);
      },
    },
  },
}
