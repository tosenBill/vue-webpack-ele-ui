const path = require('path')
const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web',
	entry: {
		index: path.join(__dirname, '../src/index.js')
	},
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'js/[name].[hash:4].js'
	},
	module: {
		rules: [
			{
				test: /\.vue$/,
				use: ['vue-loader']
			},
			{
				test: /\.js$/,
				use: 'babel-loader',
				exclude: /node_modules/
			},
			{
				test: /\.(vue | js | jsx)$/,
				loader: 'eslint-loader',
				enforce: 'pre',
				exclude: /node_modules/,
				include: [path.resolve(__dirname, 'src')], // 指定检查的目录
				options: { // 这里的配置项参数将会被传递到 eslint 的 CLIEngine
					formatter: require('eslint-friendly-formatter') // 指定错误报告的格式规范
				}
			},
			{
				test: /\.css$/,
				use: [
					'style-loader',
					'css-loader',
					'postcss-loader'
				]
			},
			{
				test: [
					/\.(gif|jpg|jpeg|png|svg)$/,
					/\.(woff|svg|eot|ttf)\??.*$/
				],
				use: [
					{
						loader: 'url-loader',
						options: {
							limit: 1024,
							name: 'images/[path][name]-[hash:8].[ext]'
						}
					}
				]
			}
		]
	},
	resolve: {
		alias: {
			Api: path.resolve(__dirname, '../src/api/index.js'),
			vue: 'vue/dist/vue.js',
			'@': path.resolve('src'),
			'@view': path.resolve(__dirname, '../src/views')
		}
	},
	optimization: {
		minimize: !isDev, // 是否进行代码压缩
		splitChunks: {
			chunks: 'all',
			minSize: 30000, // 模块大于30k会被抽离到公共模块
			minChunks: 1, // 模块出现1次就会被抽离到公共模块
			maxAsyncRequests: 5, // 异步模块，一次最多只能被加载5个
			maxInitialRequests: 3, // 入口模块最多只能加载3个
			name: true,
			cacheGroups: {
				default: {
					minChunks: 2,
					priority: -20,
					reuseExistingChunk: true
				},
				vendors: {
					test: /[\\/]node_modules[\\/]/,
					priority: -10
				}
			}
		},
		runtimeChunk: {
			name: 'runtime'
		}
	}
}

module.exports = config
