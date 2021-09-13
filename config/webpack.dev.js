const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const webpack = require("webpack");
const { merge } = require('webpack-merge');
// const portfinder = require('portfinder')
const path = require("path");
const common = require("./webpack.common.js")
const port = process.env.PORT || 8080


const Params = merge(common, {
    mode: 'development',
    devServer: {
        static: {
            directory: path.join(__dirname, 'dist')
        },
        hot: true,  // 热更新
        open: true, // 自动打开浏览器
        https: false,
        compress: true, // 开启压缩
        host: "localhost",
        port: port,
    },
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                exclude: /node_modules/,
                loader: "awesome-typescript-loader",
                options: {
                    useBabel: true,
                    babelCore: "@babel/core", // needed for Babel v7
                },
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"],
            },
            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: "file-loader",
                options: {
                    name: "assets/img/[name].[ext]?[hash]",
                    esModule: false,
                },
            },
        ],
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
    ],
})

module.exports = Params

// module.exports = new Promise((resolve, reject) => {
//     portfinder.basePort = port
//     portfinder.getPortPromise()
//         .then(newPort => {
//             if (port !== newPort) {
//                 console.log(`${port}端口被占用，开启新端口${newPort}`)
//                 Params.devServer.port = newPort
//             }
//             resolve(Params)
//         }).catch(error => {
//             console.log('没有找到空闲端口，请打开任务管理器杀死进程端口再试', error)
//         })
// })
