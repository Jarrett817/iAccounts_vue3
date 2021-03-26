# iAccounts爱记账 
## 技术栈
- vue3 
- vite
- vuex
- vue-router 
- vant ui
- axios
- TypeScript

## 代码格式规范
使用prettier作为格式刷，esLint代码检查，使用airbnb的配置，也可以自行配置
- 文件命名推荐使用kebab-case的形式
- 代码提交的时候中不应该出现console.log、debugger等调试代码
- 函数、类、变量取名时需要赋予一定的语义，避免使用temp、拼音等等容易令人困惑的取名
- 代码缩进为两个空格,"editor.tabSize": 2
- 设置换行符格式为LF,"files.eol": "\n"
- 文件首行不空行，可以写对应文件注释或者直接写代码
- 文件尾行空一行
- 未使用的变量要记得删除
#### 推荐prettier配置
```json
{
  "prettier.semi": true,
  "prettier.singleQuote": true,
  "prettier.tabWidth": 2,
  "prettier.arrowParens": "avoid",
  "vetur.format.defaultFormatter.css": "prettier",
  "vetur.format.defaultFormatter.less": "prettier",
  "vetur.format.defaultFormatter.pug": "prettier",
  "vetur.format.defaultFormatter.html": "prettier",
  "vetur.format.defaultFormatter.scss": "prettier",
  "vetur.format.defaultFormatter.js": "prettier",
  "vetur.format.defaultFormatter.ts": "prettier",
  "[vue]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[json]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[javascript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[html]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescript]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  },
  "[typescriptreact]": {
    "editor.defaultFormatter": "esbenp.prettier-vscode"
  }
}
```
### 代码风格约定
1. 避免使用默认导出，使用命名导出`export {}`，或是单个特性导出`export class xxx``export function xxx` ，明确来源，保持一致，提高开发效率
[为什么我不再使用 export default 来导出模块](https://juejin.cn/post/6844903767528177671)
2. 不需要重新赋值的变量，使用const声明
3. 在事件中主动绑定事件建议使用 on 开头，例如 onClick。事件的被动处理建议使用 handle 开头，常见的如组件中的 emit 出来的事件，可以命名为 handleEmitEvent。
其余参考[vue风格指南](https://v3.cn.vuejs.org/style-guide/)

## 推荐编辑器配置
### vue核心插件
- 不使用`<script setup>`
VsCode+VueDx+Vetur
- 使用`<script setup>`
VsCode+Volar
### 开发效率提升插件
- Auto Close Tag
- Auto Complete Tag
- Auto Import
- Auto Rename Tag
- Auto-Open Markdown Preview
- Bracket Pair Colorizer2（彩色括号）
- Color HighLight（css颜色代码高亮）
- Vscode-Icons（更友好的文件目录图标）
- Javascript（ES6）snippets
- ESLint（代码检查必备）
- Prettier（代码格式化必备）
- Git Graph（轻量好用的git插件，提交记录清晰形象，个人喜欢命令行操作git，git插件大多只用来看看代码变更，喜欢完全图形化界面操作git可以选用其他工具如Source Tree）
- UI库相关插件，如Element UI Snippets，Vant Sneppets

## git提交规范
遵从angular规范
- feat: 新功能
- fix: 修复问题
- docs: 修改文档
- style: 修改代码格式(不影响逻辑功能，比如格式化、补充分号等等)
- refactor: 重构代码(fix bug 或增加新功能不属于此范围)
- perf: 提升页面性能
- test: 增加/修改测试用例
- chore: 修改工具相关（包括但不限于文档、代码生成等， 比如修改了 README，webpack 配置文件等等）
- deps: 升级依赖
- subject: 用一句话清楚的描述这次提交做了什么
- body: 补充 subject，适当增加原因、目的等相关因素，可选。

## 问题记录
1. 引入vant样式文件vant/lib/index.less报错 
- 场景：vite直接引入vant ui的样式less文件，会出现找不到依赖文件的问题
- 解决办法：原因在于vite默认不支持'~'，需要配置别名
```javascript
resolve: {
    alias: [
      {
        find: '@',
        replacement: '/src',
      },
      {
        find: /^~/,
        replacement: 'node_modules/',
      },
    ],
  },
```
2. 全局注册vant ui的组件，vueDx会报错，提示“The component 'van-nav-bar' is inferred as global component. It may not be available at runtime.”
- [vueDx作者在issue中针对此问题的回复](https://github.com/znck/vue-developer-experience/issues/197)
- 尝试配置了vueconfig.json后并不起效，发现只要有一个空的vueconfig.json文件放在项目根目录就不再有这个报错，可能是个bug？

2. 全局注册vant ui的组件，vueDx会报错，提示“The component 'van-nav-bar' is inferred as global component. It may not be available at runtime.”vue
2. 全局注册vant ui的组件，vueDx会报错，提示“The component 'van-nav-bar' is inferred as global component. It may not be available at runtime.”
