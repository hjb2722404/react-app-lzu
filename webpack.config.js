/**
 * Created by yp on 2017/6/13.
 */

// 引入node基础组件path
var path = require('path');

//配置extract-text-webpack-plugin插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    //定义入口路径文件：
    entry: {
        app:path.resolve(__dirname, './src/main.js')
    },

    //定义打包输入路径和文件
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "bundle.js",
        publicPath: ''
    },

    module: {
        loaders: [
            // 用来编译JSX和ES2015语法
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react',

            },
            //用来编译样式表文件
            {
                test: /\.css$/,
                // loader:"style!css"
                use: ExtractTextPlugin.extract({ fallback:'style-loader', use: 'css-loader' })
               
            },
            //用来编译图像文件
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url-loader?limit=25000'
            }
        ]
    },
    plugins: [
        new ExtractTextPlugin("styles.css")
    ]
}