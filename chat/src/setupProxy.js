const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  
 app.use(
    '/api/loginAPI',
    createProxyMiddleware({
      target: 'http://64.226.79.131:9000/',
      changeOrigin: true,
    })
  );
 app.use(
    '/api/signupAPI',
    createProxyMiddleware({
      target: 'http://64.226.79.131:9000/',
      changeOrigin: true,
    })
  );

};