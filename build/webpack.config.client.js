const path = require('path')
const webpack = require('webpack')
// 用于插入html模板
const HtmlWebpackPlugin = require('html-webpack-plugin')
// 清除输出目录，免得每次手动删除
const CleanWebpackPlugin = require('clean-webpack-plugin')
// Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 它会将所有 required 的 *.css 模块抽取到分离的 CSS 文件。
// 你的样式将不会内联到 JS bundle，而是在一个单独的 CSS 文件。
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'
// webpack打包文件体积和依赖关系的可视化
const { BundleAnalyzerPlugin } = require('webpack-bundle-analyzer')

// 使用DefinePlugin设定环境变量
const defaultPlugins = [
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
	new VueLoaderPlugin()
]

const devServer = {
	host: '0.0.0.0',
	port: 8091,
	// 在浏览器上全屏显示编译的errors或warnings。默认是关闭的
	overlay: {
		error: true,
		warnings: false
	},
	hot: true
}
let config

if (isDev) {
	config = merge(baseConfig, {
		mode: 'development',
		// 追踪错误和警告，source map 功能，将编译后的代码映射回原始源代码
		devtool: '#cheap-module-eval-source-map', // 原始源码（仅限行）
		module: {
			rules: [
				{
					test: /\.styl/, // 注意这个地方没有 ‘$’
					use: [
						'style-loader',
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								sourceMap: true
							}
						},
						'stylus-loader'
					]
				},
				{
					test: /\.(sass|scss)$/,
					use: [
						'style-loader',
						'css-loader',
						'sass-loader'
					]
					// loader: ExtractTextPlugin.extract("style", 'css!sass') //这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
				}
			]
		},
		plugins: defaultPlugins.concat([
			// 实现热加载，就是只更新局部的修改，
			new webpack.HotModuleReplacementPlugin(),
			// 跳过编译时出错的代码并记录，使编译后运行时的包不会发生错误。
			new webpack.NoEmitOnErrorsPlugin()
		]),
		devServer
	})
} else {
	config = merge(baseConfig, {
		mode: 'production',
		output: {
			filename: '[name].[chunkhash:8].js'
		},
		module: {
			rules: [
				{
					test: /\.styl/, // 注意这个地方没有 ‘$’
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							'css-loader',
							'stylus-loader'
						],
						publicPath: '../' // css打包后images下url 路径问题
					})
				},
				{
					test: /\.(sass|scss)$/,
					use: ExtractTextPlugin.extract({
						fallback: 'style-loader',
						use: [
							'css-loader',
							'sass-loader'
						]
					})
					// loader: ExtractTextPlugin.extract('style', 'css!sass') // 这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
				}
			]
		},
		plugins: defaultPlugins.concat([
			new CleanWebpackPlugin(['dist'], {
				root: path.resolve(__dirname, '../')   // 根目录
			}),
			new BundleAnalyzerPlugin({ analyzerPort: 8919 }),
			new ExtractTextPlugin({
				filename: 'css/[name].css',
				allChunks: true
			})
		])
	})
}

module.exports = config
