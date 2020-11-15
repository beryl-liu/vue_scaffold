module.exports = {
  root: true,
  env: {
    "node": true,
    "browser": true, // 浏览器模式
    "commonjs": true, // 支持commonjs
    "es6": true // 支持es6
  },
  extends: ["plugin:vue/essential", "eslint:recommended", "@vue/prettier"],
  parserOptions: {
    parser: "babel-eslint"
  },
  rules: {
    "no-console": process.env.NODE_ENV === "production" ? "warn" : "off",
    "no-debugger": process.env.NODE_ENV === "production" ? "warn" : "off",
    // setter 必须有对应的 getter，getter 可以没有对应的 setter
    "accessor-pairs": [
      "error",
      {
        setWithoutGet: true,
        getWithoutSet: false
      }
    ],
    // 关闭语句强制分号结尾
    "semi": [ // 是否使用分号
      "error",
      "never"
    ],
    "indent": [ // 定义代码缩进
      "error",
      2
    ],
    "quotes": [ // 引号是用单引号还是双引号
      "error",
      "single"
    ]
  }
};
