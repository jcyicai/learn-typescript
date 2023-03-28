#### 安装包

```js
@babel/core  babel 核心包
@babel/preset-env 兼容不同环境 浏览器
babel-loader  loader配置
core-js 模拟js运行环境 老浏览器也能兼容  比如 ie11 没有 promise  但是配置了corejs 打包后就会自动生成

less less-loader css-loader style-loader  less文件编译
postcss postcss-loader postcss-preset-env  css版本兼容 自动带上前缀等
```

#### tsconfig.json

```js
{
	// 指定哪些ts文件需要被编译
	// ** 任意目录  * 任意文件  表示src 下任意目录 下任意文件
	"include": ["./src/**/*"],
	// 编译器选项 重要
	"compilerOptions": {
		// 用来指定 ts 被编译 ES 版本
		"target": "es2015",
		// 指定使用的模块化规范 输入任意值 在 tsc 可以查看所有版本 上同↑
		// import vue from 'vue'   or  require
		"module": "es2015",
		// 用来指定项中要使用的库 默认不修改，除非在node环境或其他
		"lib": []
		// 指定编译后文件所在目录
		"outDir": "./dist",
		// 将全局作用于代码合并为一个文件  模块化 必须是amd  module需设置为 system
		"outFile": "./dist/app.js"
		// 是否对js文件进行编译，默认为false
		"allowJs": false,
		// 是否检查js代码是否符合语法规范
		"checkJs": false,
		// 是否移除注释
		"removeComments": false,
		// 不生成编译后的文件
		"noEmit": false,
		// 当有错误时不生成编译后的文件
		"noEmitOnError": false,
		// 所有严格的总开关
		"strict": true,
		// 用来设置编译后文件是否使用严格模式
		"alwaysStrict": false,
		// 不允许隐式 any 类型   let a;  a默认就是any
		"noImplicitAny": false,
		// 不允许不明确类型的 this
		"noImplicitThis": false,
		// 严格检查空值
		"strictNullChecks": false
	}
	// 排除不编译的文件
	"exclude": [
	    "./src/hello/**/*"
	],
	// 集成配置文件
	"extends": ""
	// 被编译的文件列表 不重要
	"files": []
}
```
