const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function (app) {
  app.use(
    createProxyMiddleware('/oauth2.0', {
      target: 'https://nid.naver.com',
      changeOrigin: true,
    })
  );
};
