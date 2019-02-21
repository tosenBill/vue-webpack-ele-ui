const path = require('path')
const webpack = require('webpack')
// Vue-loader在15.*之后的版本都是 vue-loader的使用都是需要伴生 VueLoaderPlugin
const VueLoaderPlugin = require('vue-loader/lib/plugin')
// 它会将所有 required 的 *.css 模块抽取到分离的 CSS 文件。
// 你的样式将不会内联到 JS bundle，而是在一个单独的 CSS 文件。
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const baseConfig = require('./webpack.config.base')
const merge = require('webpack-merge')
const isDev = process.env.NODE_ENV === 'development'
const VueServerPlugin = require('vue-server-renderer/server-plugin')
// 使用DefinePlugin设定环境变量
const defaultPlugins = [
	new VueLoaderPlugin()
]

let config

if (isDev) {
	config = merge(baseConfig, {
		target: 'node',
		entry: path.join(__dirname, '../client/server-entry.js'),
		mode: 'development',
		devtool: 'source-map',
		output: {
			libraryTarget: 'commonjs2',
			filename: 'server-entry.js',
			path: path.join(__dirname, '../server-build')
		},
		externals: Object.keys(require('../package.json').dependencies),
		module: {
			rules: [
				{
					test: /\.styl/, // 注意这个地方没有 ‘$’
					use: ExtractTextPlugin.extract({
						fallback: 'vue-style-loader',
						use: [
							'css-loader',
							'stylus-loader'
						],
						publicPath: '/' // css打包后images下url 路径问题
					})
				},
				{
					test: /\.(sass|scss)$/,
					use: ExtractTextPlugin.extract({
						fallback: 'vue-style-loader',
						use: [
							'css-loader',
							'sass-loader'
						],
						publicPath: '/' // css打包后images下url 路径问题
					})
					// loader: ExtractTextPlugin.extract('style', 'css!sass') // 这里用了样式分离出来的插件，如果不想分离出来，可以直接这样写 loader:'style!css!sass'
				}
			]
		},
		plugins: defaultPlugins.concat([
			new ExtractTextPlugin({
				filename: 'css/[name].css',
				allChunks: true
			}),
			new webpack.DefinePlugin({
				'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
				'process.env.VUE_ENV': '"server"'
			}),
			new VueServerPlugin()
		])
	})
} else {
	console.log('production')
}

module.exports = config
