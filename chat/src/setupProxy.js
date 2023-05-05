const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api/peopleAPI',
    createProxyMiddleware({
      target: 'http://127.0.0.1:5000/',
      changeOrigin: true,
    })
  );
 app.use(
    '/api/loginAPI',
    createProxyMiddleware({
      target: 'http://127.0.0.1:9000/',
      changeOrigin: true,
    })
  );
 app.use(
    '/api/signupAPI',
    createProxyMiddleware({
      target: 'http://127.0.0.1:9000/',
      changeOrigin: true,
    })
  );

};
