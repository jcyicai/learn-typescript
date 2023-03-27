const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
	// 指定入口文件
	entry: './src/index.ts',
	// 指定打包文件所在目录
	output: {
		// 指定打包文件的目录
		path: path.resolve(__dirname, 'dist'),
		// 打包后文件的文件
		filename: 'bundle.js',
		// 告诉webpack不使用箭头函数
		environment: {
			arrowFunction: false,
			const: false, // 兼容ie
		},
	},
	// 设置引用模块
	resolve: {
		// 告诉它 以 ts 或 js 结尾的文件都能作为模块使用
		// 例：import XX from 'a.js'
		extensions: ['.ts', '.js'],
	},
	// 指定webpack打包时使用模块
	module: {
		// 指定要加载的规则
		rules: [
			{
				// test指定规则生效的文件
				test: /\.ts$/,
				// 要使用的loader
				use: [
					// 配置 babel
					{
						// 指定加载器
						loader: 'babel-loader',
						// 设置 babel
						options: {
							// 设置预定义的环境
							presets: [
								[
									// 指定环境的插件
									'@babel/preset-env',
									// 配置信息
									{
										// 要兼容的目标浏览器版本
										targets: {
											chrome: '58',
											ie: '11',
										},
										// 指定corejs版本
										corejs: '3',
										// 使用coresjs的方式 usage 按需加载
										useBuiltIns: 'usage',
									},
								],
							],
						},
					},
					'ts-loader',
				],
				// 要排除的文件
				exclude: /node_modules/,
			},
			{
				test: /\.less$/,
				use: [
					'style-loader',
					'css-loader',
					{
						loader: 'postcss-loader',
						options: {
							// 配置postcss
							postcssOptions: {
								plugins: [
									[
										'postcss-preset-env', // 插件
										{
											browsers: 'last 2 versions', // 浏览器的最新两个版本
										},
									],
								],
							},
						},
					},
					'less-loader',
				],
			},
		],
	},
	// 配置webpack插件
	plugins: [
		// 自动生成html文件
		new HTMLWebpackPlugin({
			template: './src/index.html', // 指定模板
		}),
		// 每次打包 重新清除后再生成
		new CleanWebpackPlugin(),
	],
}
