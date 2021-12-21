const proxy = require('http-proxy-middleware')

module.exports = function(app) {
    app.use(
        proxy('/api1',{ //遇见 /api1 前缀的请求就会触发代理配置
            target:'http://localhost:5000', // 请求转发给谁
            changeOrigin:true, // 控制服务器收到请求头的host值
            pathRewrite:{'^/api1':''} // 重写请求路径(必须)
        })
    )
}