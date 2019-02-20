const path = require('path')
// const isDev = process.env.NODE_ENV === 'development'

const config = {
	target: 'web',
	entry: path.join(__dirname, '../client/index.js'),
	// entry: {
	// 	index: path.join(__dirname, '../client/index.js')
	// },
	output: {
		path: path.join(__dirname, '../dist'),
		filename: 'js/[name].[hash:4].js',
		publicPath: 'http://127.0.0.1:8090/dist/'
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
				include: [path.resolve(__dirname, 'client')], // 指定检查的目录
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
			Api: path.resolve(__dirname, '../client/api/index.js'),
			vue: 'vue/dist/vue.js',
			'@': path.resolve('client'),
			'@view': path.resolve(__dirname, '../client/views')
		}
	}
}

module.exports = config
