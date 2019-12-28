# 手写webpack系列

[手写webpack系列 博文地址](https://juejin.im/post/5de87444518825124c50cd36#heading-34)

## 3.1 手写webpack loader

> loader从本质上来说其实就是一个node模块。相当于一台榨汁机(loader)将相关类型的文件代码(code)给它。根据我们设置的规则，经过它的一系列加工后还给我们加工好的果汁(code)。

> loader编写原则
> - 单一原则: 每个 Loader 只做一件事;
> - 链式调用: Webpack 会按顺序链式调用每个 Loader；
>- 统一原则: 遵循 Webpack 制定的设计规则和结构，输入与输出均为字符串，各个 Loader 完全独立，即插即用；

在日常开发环境中，为了方便调试我们往往会加入许多console打印。但是我们不希望在生产环境中存在打印的值。那么这里我们自己实现一个loader去除代码中的console

知识点普及之AST。AST通俗的来说，假设我们有一个文件a.js,我们对a.js里面的1000行进行一些操作处理,比如为所有的await 增加try catch,以及其他操作，但是a.js里面的代码本质上来说就是一堆字符串。那我们怎么办呢，那就是转换为带标记信息的对象(抽象语法树)我们方便进行增删改查。这个带标记的对象(抽象语法树)就是AST。这里推荐一篇不错的AST文章 [AST快速入门](https://segmentfault.com/a/1190000016231512)

```bash

npm i -D @babel/parser @babel/traverse @babel/generator @babel/types

@babel/parser 将源代码解析成 AST
@babel/traverse 对AST节点进行递归遍历，生成一个便于操作、转换的path对象
@babel/generator 将AST解码生成js代码
@babel/types通过该模块对具体的AST节点进行进行增、删、改、查
```

## 3.2 手写webpack plugin

> 在 Webpack 运行的生命周期中会广播出许多事件，Plugin 可以监听这些事件，在合适的时机通过Webpack提供的API改变输出结果。

### 一个基本的plugin插件结构如下：

```javascript

class firstPlugin {
  constructor (options) {
    console.log('firstPlugin options', options)
  }
  apply (compiler) {
    compiler.plugin('done', compilation => {
      console.log('firstPlugin')
    ))
  }
}

module.exports = firstPlugin

```

### compiler 、compilation是什么

> - compiler 对象包含了Webpack 环境所有的的配置信息。这个对象在启动 webpack 时被一次性建立，并配置好所有可操作的设置，包括 options，loader 和 plugin。当在 webpack 环境中应用一个插件时，插件将收到此 compiler 对象的引用。可以使用它来访问 webpack 的主环境。
> - compilation对象包含了当前的模块资源、编译生成资源、变化的文件等。当运行webpack 开发环境中间件时，每当检测到一个文件变化，就会创建一个新的 compilation，从而生成一组新的编译资源。compilation 对象也提供了很多关键时机的回调，以供插件做自定义处理时选择使用

### compiler和 compilation的区别在于

`compiler`代表了整个webpack从启动到关闭的生命周期，而 `compilation` 只是代表了一次新的编译过程
`compiler` 和 `compilation` 暴露出许多钩子，我们可以根据实际需求的场景进行自定义处理
[compiler 钩子文档](https://www.webpackjs.com/api/compiler-hooks/)
[compilation 钩子文档](https://www.webpackjs.com/api/compilation-hooks/)

[编写一个插件](https://www.webpackjs.com/contribute/writing-a-plugin/)
