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
使用prettier作为格式刷，esLint代码检查，使用airbnb的配置
## 推荐编辑器配置
- 不使用`<script setup>`
vscode+vueDx+vetur
- 使用`<script setup>`
vscode+volar
## 代码风格约定
所有文件名采用kebab-case形式
参考[vue风格指南](https://v3.cn.vuejs.org/style-guide/)

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
