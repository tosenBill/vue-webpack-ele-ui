// module.exports = {
//     "env": {
//         "browser": true,
//         "commonjs": true,
//         "es6": true,
//         "node": true
// 		},
// 		"parser": "vue-eslint-parser",
// 		// "extends": "eslint:recommended",
// 		extends: ['plugin:vue/essential', 'eslint:recommended'],
//     "parserOptions": {
//         "ecmaFeatures": {
//             "jsx": true
//         },
//         "ecmaVersion": 2018,
// 				"sourceType": "module",
// 				"experimentalObjectRestSpread": true
//     },
//     "rules": {
//         "indent": [
//             "error",
//             "tab"
//         ],
//         "linebreak-style": [
//             "error",
//             "unix"
//         ],
//         "quotes": [
//             "error",
//             "single"
//         ],
//         "semi": [
//             "error",
//             "never"
// 				],
// 				'no-console': 'off'
//     },
//     "plugins": [
// 				"html",
// 				"vue"
//     ]
// };
// module.exports = {
//     "env": {
//         "browser": true,
//         "commonjs": true,
//         "es6": true,
//         "node": true
// 		},
// 		"parser": "vue-eslint-parser",
// 		// "extends": "eslint:recommended",
// 		extends: ['plugin:vue/essential', 'eslint:recommended'],
//     "parserOptions": {
//         "ecmaFeatures": {
//             "jsx": true
//         },
//         "ecmaVersion": 2018,
// 				"sourceType": "module",
// 				"experimentalObjectRestSpread": true
//     },
//     "rules": {
//         "indent": [
//             "error",
//             "tab"
//         ],
//         "linebreak-style": [
//             "error",
//             "unix"
//         ],
//         "quotes": [
//             "error",
//             "single"
//         ],
//         "semi": [
//             "error",
//             "never"
// 				],
// 				'no-console': 'off'
//     },
//     "plugins": [
// 				"html",
// 				"vue"
//     ]
// };
module.exports = {
  root: true, //此项是用来告诉eslint找当前配置文件不能往父级查找
  env: {
    browser: true,
    node: true
  },
  //此项是用来指定javaScript语言类型和风格
  parserOptions: {
    parser: 'babel-eslint'
  },
  extends: ['plugin:vue/essential', 'eslint:recommended'],
  // required to lint *.vue files
  plugins: ['vue'],
  /*
   下面这些rules是用来设置从插件来的规范代码的规则，使用必须去掉前缀eslint-plugin-
    主要有如下的设置规则，可以设置字符串也可以设置数字，两者效果一致
    "off" -> 0 关闭规则
    "warn" -> 1 开启警告规则
    "error" -> 2 开启错误规则
  */
  rules: {
    'no-console': 'off',
    'no-debugger': 'off',

    'accessor-pairs': 2, // 在对象中使用getter/setter
    'comma-dangle': [2, 'never'], // 对象字面量项尾不能有逗号
    curly: [2, 'multi-line'], // 必须使用 if(){} 中的{}
    'dot-location': [2, 'property'], // 对象访问符的位置，换行的时候在行首还是行尾
    'eol-last': 0, // 文件以单一的换行符结束
    eqeqeq: [2, 'allow-null'], // 必须使用全等
    'handle-callback-err': [2, '^(err|error)$'], //error参数的名称必须进行处理
    'arrow-spacing': [2, { before: true, after: true }], //箭头函数箭头前后必须有空格 () => {};
    'block-spacing': [2, 'always'], //强制执行块内的空格 function foo() { return true; }
    'brace-style': [2, '1tbs', { allowSingleLine: true }], //大括号相对于其控制语句和主体的位置。
    camelcase: [2, { properties: 'never' }], //查找_位于源代码中的任何下划线 不检查属性名称
    'comma-spacing': [2, { before: false, after: true }], //逗号周围的间距
    'comma-style': [2, 'last'], //声明变量等 逗号等位置
    'constructor-super': 2, //es6 类继承  必须使用super()
    'no-template-curly-in-string': 2, //双引号中不能使用"${}"
    'eol-last': 2, // 此规则在非空文件的末尾强制执行至少一个换行符
    // 'indent': [2, "tab", { 'SwitchCase': 1 }],//强制执行一致的缩进
    'jsx-quotes': [2, 'prefer-double'], //模版属性值是双引号
    'key-spacing': [2, { beforeColon: false, afterColon: true }], //对象文字属性（键间距）中强制键和值之间的一致间距
    'keyword-spacing': [2, { before: true, after: true }], //关键字之前和之后强制使用一致的间距 比如if else import in 等
    'new-cap': [2, { newIsCap: true, capIsNew: false }], //要求构造函数名称以大写字母开头（new-cap）
    'new-parens': 2, //在调用不带参数的构造函数时需要括号
    'no-array-constructor': 2, //禁止Array构造函数 禁止new Array()
    'no-caller': 2, // 禁止使用caller/callee 它们在未来的JavaScript版本中已被弃用
    'no-class-assign': 2, //禁止修改类声明的变量
    'no-cond-assign': 2, //在条件语句中禁止赋值运算符
    'no-const-assign': 2, //禁止修改使用const
    'no-control-regex': 2, //禁止正则表达式中的控制字符(是ASCII范围0-31中的特殊)
    'no-delete-var': 2, //禁止删除变量
    'no-dupe-args': 2, //禁止function中定义重复等参数
    'no-dupe-class-members': 2, //在类成员中禁止重复的名称
    'no-dupe-keys': 2, //禁止对象文字中的重复键
    'no-duplicate-case': 2, //禁止switch中重复case
    'no-empty-character-class': 2, //禁止正则表达式中的空字符类 /^abc[]/
    'no-empty-pattern': 2, //禁止空解构模式 var {} = foo;
    'no-ex-assign': 2, //禁止在catch中赋值error行参
    'no-extra-bind': 2, //禁止不必要的函数绑定bind var boundGetName = (function getName() {return "ESLint";}).bind({ name: "ESLint" });
    'no-extra-boolean-cast': 2, //禁止不必要的布尔强制转换
    'no-extra-parens': [2, 'functions'], //不允许不必要的括号
    'no-floating-decimal': 2, //禁止浮动小数 error:var num = .5;
    'no-func-assign': 2, //禁止重新赋值function
    'no-implied-eval': 2, //禁止隐含的转换 error:setTimeout("alert('Hi!');", 100);
    'no-inner-declarations': [2, 'both'], //禁止嵌套块中的声明变量或函数
    'no-invalid-regexp': 2, //禁止无效的正则表达式
    'no-irregular-whitespace': 2, //禁止不规则的空白
    'no-iterator': 2, //禁止迭代器 error：Foo.prototype.__iterator__
    'no-label-var': 2, //禁止变量名称的标签
    'no-lone-blocks': 2, //禁止不必要的嵌套块就是大括号
    'no-mixed-spaces-and-tabs': 2, //禁止使用混合空格和制表符进行缩进
    // 'no-multi-spaces': [2, { "ignoreEOLComments": true }],//禁止多个空格 忽略在行尾出现的注释之前的多个空格
    'no-multi-str': 2, //禁止多行字符串 不用加号拼接
    'no-multiple-empty-lines': [2, { max: 1 }], //禁止多个空行
    'no-native-reassign': 2, //禁止重新赋值内置对象
    'no-negated-in-lhs': 2, //禁止在in表达式中否定左操作数
    'no-new-object': 2, //禁止new Object()构造函数
    'no-new-require': 2, //禁止new Require()
    'no-new-symbol': 2, //禁止new symbol()
    'no-new-wrappers': 2, //禁止new 原始基本类型
    'no-obj-calls': 2, //禁止将全局对象属性调用为函数
    'no-octal': 2, //禁止八进制文字 error：var num = 071;
    'no-octal-escape': 2, //禁止字符串文字中的八进制转义序列
    'no-path-concat': 2, //使用时禁止字符串连接__dirname和__filename error：var fullPath = __dirname + "/foo.js";
    'no-proto': 2, //禁止使用__proto__
    'no-redeclare': 2, //禁止变量重新声明
    'no-regex-spaces': 2, //在正则表达式文字中禁止多个空格
    'no-return-assign': [2, 'except-parens'], //拒绝返回赋值语句
    'no-self-assign': 2, //禁止自我赋值
    'no-self-compare': 2, //禁止自我比较
    'no-sequences': 2, //禁止使用逗号运算符
    'no-shadow-restricted-names': 2, //禁止隐藏受限制的名称
    'no-spaced-func': 2, //禁止函数标识符与其应用程序之间的间距
    'no-sparse-arrays': 2, //禁止稀疏数组
    'no-this-before-super': 2, //super前不能使用this
    'no-throw-literal': 2, //限制可以作为异常抛出的内容 正确：throw new Error();
    'no-trailing-spaces': 2, //禁止在行尾添加尾随空格
    'no-undef': 2, //禁止使用未声明的变量
    'no-undef-init': 2, //禁止初始化为未定义
    'no-unexpected-multiline': 2,
    'no-unmodified-loop-condition': 2, //禁止未修改的循环条件
    'no-unneeded-ternary': [2, { defaultAssignment: false }], //当存在更简单的替代方案时，不允许三元运算符
    'no-unreachable': 2, //return，throw，continue，和break后面不允许有代码
    'no-unsafe-finally': 2, //禁止finally块中的控制流语句
    'no-unused-vars': [2, { vars: 'all', args: 'none' }], //禁止未使用的变量
    'no-useless-call': 2, //禁止不必要.call()和.apply()。
    'no-useless-computed-key': 2, //禁止在对象上使用不必要的计算属性键
    'no-useless-constructor': 2, //禁止不必要的构造函数
    'no-useless-escape': 2, //禁止不必要的转义用法
    'no-whitespace-before-property': 2, //不允许在属性之前使用空格
    'no-with': 2, //禁止使用with
    'one-var': [2, { initialized: 'never' }], //强制变量在函数中一起或单独声明
    'operator-linebreak': [
      2,
      'after',
      { overrides: { '?': 'before', ':': 'before' } }
    ], //强制换行风格
    'padded-blocks': [2, 'never'], //块级作用域减少空行
    quotes: [2, 'single', { avoidEscape: true, allowTemplateLiterals: true }], //在JSX属性中强制一致使用双引号或单引号
    semi: [2, 'never'], //强制使用分号
    'semi-spacing': [2, { before: false, after: true }], //在分号前后强制间距
    'space-before-blocks': [2, 'always'], //在块之前需要或不允许空间
    // 'space-before-function-paren': [2, 'always'],//在函数括号之前需要或不允许空格
    'space-in-parens': [2, 'never'], //禁止或强制括号内的空格
    'space-infix-ops': 2, //需要在中运算符周围的间距
    'space-unary-ops': [2, { words: true, nonwords: false }], //在一元运算符之前/之后需要或禁止空格
    'spaced-comment': [
      2,
      'always',
      {
        markers: [
          'global',
          'globals',
          'eslint',
          'eslint-disable',
          '*package',
          '!',
          ','
        ]
      }
    ], //需要或不允许开始注释的空格
    'template-curly-spacing': [2, 'never'], //模板字符串中强制使用间距
    'use-isnan': 2, //isNaN()检查时需要调用NaN
    'valid-typeof': 2, //强制将typeof表达式与有效字符串进行比较
    'wrap-iife': [2, 'any'], //要求IIFE被包裹
    'yield-star-spacing': [2, 'both'], //在*in yield*表达式周围强制使用间距
    yoda: [2, 'never'], //要求或不允许尤达条件
    'prefer-const': 2, //建议使用const
    'object-curly-spacing': [2, 'always'], //在大括号内强制一致的间距
    'array-bracket-spacing': [2, 'never'], //禁止或强制括号内的空格
    'vue/require-v-for-key': 2,
    'vue/require-prop-types': 0,
    'vue/html-indent': 0,
    'vue/max-attributes-per-line': 0,
    'vue/this-in-template': 0,
    'no-unreachable': 2 // 不能有无法执行的代码
  }
}
