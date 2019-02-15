const path = require('path');
const webpack = require('webpack');
//用于插入html模板
const HtmlWebpackPlugin = require('html-webpack-plugin');
//清除输出目录，免得每次手动删除
const CleanWebpackPlugin = require('clean-webpack-plugin');
// Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 它会将所有 required 的 *.css 模块抽取到分离的 CSS 文件。
//你的样式将不会内联到 JS bundle，而是在一个单独的 CSS 文件。
const ExtractTextPlugin = require("extract-text-webpack-plugin")

const isDev = process.env.NODE_ENV === 'development'
let config 
config = {
  target: 'web',
  entry: {
    index: path.join(__dirname, './src/index.js'),
  },
  output: {
    path: path.join(__dirname, '/dist'),
    filename: 'js/[name].[hash:4].js'
  },
  module: {
    rules: [
        {
            test: /\.vue$/,
            use: ['vue-loader']
        },
        {
            test: /\.css$/,
            use: ExtractTextPlugin.extract({
                // 当 css 文件未被抽出使用的 loader （比如 ） (比如在有额外产生的 chunks 而 allChunks: false 时)
                fallback: 'style-loader',
                use: [
                    'css-loader',
                    'postcss-loader'
                ],
                publicPath: '../' // css打包后images下url 路径问题
            })
        },
        {
            test: /\.(gif|jpg|jpeg|png|svg)$/,
            use: [
              {
                loader: 'url-loader',
                options: {
                  limit: 1024,
                  name: 'images/[name]-aaa.[ext]'
                }
              }
            ]
        },
        {
            test: /\.(woff|svg|eot|ttf)\??.*$/,
            use: [
                'url-loader'
            ]
        }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(['dist']),
    new ExtractTextPlugin({
        filename: 'css/[name].css',
        allChunks: true
    }),
    new VueLoaderPlugin(),
    // 使用DefinePlugin设定环境变量
    new webpack.DefinePlugin({
        'process.env': {
            NODE_ENV: isDev ? '"development"' : '"production"'
        }
    }),
    // 打包生成html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html',
      title: 'adolf'
    }),
    //持久化moduleId，主要是为了之后研究加载代码好看一点。
    new webpack.HashedModuleIdsPlugin(),
    /**
     * 当有多个入口节点的时候，只有所有入口节点都引入了同一个模块的时候，
     * webpack.optimize.CommonsChunkPlugin才会将那个模块提取出来，
     * 如果其中一个入口节点没有引入该模块，那么其他引入了该模块的入口节点都会将该模块打包到各自的文件中，
     * 这样重复打包造成入口节点文件体积过大。
     */
    // new webpack.optimize.CommonsChunkPlugin({
    //   name: 'manifest',
    // })
  ],
  optimization: {
    runtimeChunk: {
        name: "manifest"
    },
    splitChunks: {
        cacheGroups: {
            commons: {
                test: /[\\/]node_modules[\\/]/,
                name: "vendor",
                chunks: "all"
            }
        }
    }
  }
};
if (isDev) {
    config.mode = "development"
    // 追踪错误和警告，source map 功能，将编译后的代码映射回原始源代码
    config.devtool = '#cheap-module-eval-source-map' // 原始源码（仅限行）
    config.devServer = {
        host: '0.0.0.0',
        port: 8091,
        //在浏览器上全屏显示编译的errors或warnings。默认是关闭的
        overlay: {
            error: true,
            warnings: false
        },
        hot: true
    }
    config.module.rules.push(
        {
            test: /\.styl/, // 注意这个地方没有 ‘$’
            use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
        },
    )
    config.plugins.push(
        // 实现热加载，就是只更新局部的修改，
        new webpack.HotModuleReplacementPlugin(),
        // 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
        new webpack.NoEmitOnErrorsPlugin()
    )
}else{
    config.mode = "production"
    console.log(process.env.NODE_ENV, isDev)
    config.output.filename = '[name].[chunkhash:8].js'
    config.module.rules.push(
        {
            test: /\.styl/, // 注意这个地方没有 ‘$’
            use: ExtractTextPlugin.extract({
                fallback: 'style-loader',
                use: [
                    // 'style-loader',
                    'css-loader',
                    'stylus-loader'
                ],
                publicPath: '../' // css打包后images下url 路径问题
            })
        }
    )
}

module.exports = config