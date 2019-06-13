const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");
const cleanWebpackPlugin = require("clean-webpack-plugin");
const webpack = require('webpack');
module.exports={
    mode: "development",
    // devtool: "cheap-module-eval-source-map",
    devtool: "cheap-module-source-map",
    entry: ["./src/index.tsx"],
    resolve:{
        extensions: ['.js','.jsx','.ts','.tsx']
    },
    output: {
        filename: "main.js",
        path: path.resolve(__dirname,'dist')
    },
    module: {
        rules: [
            {
                test:/\.(js|jsx)$/,
                use: [
                    {
                        loader: "babel-loader",
                        options: {
                            presets: [['@babel/preset-env'], '@babel/preset-react'],
                            plugins: ['react-hot-loader/babel'],    //打包时注释掉此处   否则会报错!
                        }
                    }
                    ]
            },
            {
                test: /\.(ts|tsx)$/,
                use: [{loader: "ts-loader"}]
            },
            {
                test: /\.jpg$|\.png/,
                use:{
                    loader: "url-loader",
                    options:{
                        name:"[name]_[hash].[ext]",
                        outputPath:"./images",
                        limit:2048
                    }
                }
            },
            {
                test:/\.(css|less)$/,
                exclude: /(node_modules)/,
                use: [
                    {loader: "style-loader"},
                    {loader: "css-loader"},
                    {loader: "less-loader"},
                    {loader: "postcss-loader", options: {}}
                ],
            },
        ]
    },
    plugins: [new htmlWebpackPlugin({template: "./src/index.html", title: "Webpack App"}), new cleanWebpackPlugin(),new webpack.HotModuleReplacementPlugin()],
    devServer: {
        contentBase:"./dist",
        open:false,
        host:"127.0.0.1",
        port:"9910",
        hot:true,
    }
};
