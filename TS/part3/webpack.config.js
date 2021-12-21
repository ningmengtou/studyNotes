const path = require('path')
// 引入自定义html文件
const HtmlWebpackPlugin = require("html-webpack-plugin");


module.exports = {
    // 指定开发模式
    mode : 'development',
    // 指定入口文件
    entry: './src/index.ts',
    // 指定打包的文件目录
    output: {
        // 指定打包后的文件目录
        path: path.resolve(__dirname, 'dist'),
        // 指定打包后的文件名
        filename: 'bundle.js'
    },
    // 指定webpakc打包需要的模块
    module: {
        // 指定加载规则
        rules: [
            {
                // 指定规则生效的文件 这里用正则选出ts文件
                test: /\.ts$/,
                // 指定使用的加载器
                use: [
                    // 配置babel信息
                    {
                        // 指定加载器
                        loader:"babel-loader",
                        // 设置babel
                        options:{
                            // 设置预定义的环境
                            presets:[
                                [
                                    "@babel/preset-env",
                                    {
                                        // 指明目标浏览器和版本
                                        "targets":{
                                            "chrome":"88"
                                        },
                                        // 指明corejs的版本
                                        "corejs":"3",
                                        // 指明corejs的使用方法
                                        "useBuiltIns":"usage"
                                    }
                                ]
                            ]
                        }
                    },
                    'ts-loader'
                ],
                // 指定排除的文件
                exclude: /node_modules/
            }
        ]
    },
    plugins:[
        new HtmlWebpackPlugin({
            // 指定html文件title是 ts测试
            // title:"ts测试"
            // 指定自己的html文件作为模板
            template:"./src/index.html"
        })
    ]
}