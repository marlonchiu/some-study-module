# Stylus 指南

## 参考指南

> [张鑫旭博客：stylus 中文版参考文档](https://www.zhangxinxu.com/jq/stylus/)
>
> [『前端干货篇』：你不知道的 Stylus](https://juejin.im/post/5bbd7a7c6fb9a05cfd27f4c6)

## 构建编译指令

- 下载依赖

```bash
# 下载依赖
npm install stylus -g
# or
npm install stylus

# stylus基本编译命令
stylus -w xxx.styl -o xxx.css   //xxx是你创建的文件名  -o 的意思是-out 输出css文件 -w监听改变
```

- `package.json` 配置指令

```json
// npm init -y

"scripts": {
    "compile": "stylus ./style/index.styl -o ./style/index.css"
},
```

## 语法精讲

> 编写 stylus 文件的时候，一定要注意缩进，因为 stylus 就是根据缩进来识别选择器层级和对应 css 样式规则的
