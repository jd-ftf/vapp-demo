## 京东小程序微信小程序互转

### 文档介绍

* 京东小程序IDE目前功能暂不完善，此脚手架可将example下的代码转换成微信小程序，通过微信小程序IDE进行调试。也可将example下的代码转换成京东小程序（此处主要是转scss类预编译语言），通过京东小程序IDE进行调试。
* 最低兼容到小程序基础库 v1.9.91

### 目录结构
```
.__
├── build
│   ├── gulpfile.js                  // 使用gulp构建组件
│   ├── plugins
│   │   ├── gulp-js-replace.js       // 将js中的字符串jd替换为wx
│   │   └── gulp-replace.js          // 将html中的字符串jd替换为wx
├── .eslintrc                        // eslint配置文件
├── mock                             // mock配置
├── example                          // 编码源码
├── dist-wx                          // 转换成的微信小程序
├── dist-jd                          // 转换成的京东小程序
├── package-lock.json
├── package.json
```

## 支持

* gulp ☑️
* scss预处理语言 ☑️️
* eslint ☑️️
* commitlint ☑️️
* Mock ☑️
* babel ES6转ES5 ☑️
* 热更新 ☑️

### Mock

使用 Mock 功能，在`/build/gulpfile.js` 中的 `devServer`函数进行配置。

`devServer` 中引入 `/mock/mock.js` 中会拦截mock的请求将对应的请求打到对应目录或地址下，对返回数组的每个成员
的 route 进行拦截，将请求打到 `/mock` 同请求路径的 js 文件或者 json 文件上。请求的地址后缀名依旧可以是`.action` 等。

其中mock对应的 `data` 支持 mockjs的语法。

``` JavaScript
'list|1-10': [{
  'id|+1': 1
}]
```

### wx.request 拦截

模板 `example/utils/request.js` 对 `wx.request` 进行简单的拦截操作，实现host抽取，用户可根据自己的需要进行修改。

**注意：使用 http 本地服务器时，编译器报错：不合法域名，可关闭开发者工具不合法域名菜单检测进行开发。**

### 开发流程

``` bash
npm install
```

开发模式，生成京东小程序开发代码，生成/dist-jd/

``` bash
npm run dev
```

开发模式，生成微信小程序开发代码，生成/dist-wx/

``` bash
npm run dev:wx
```

生产模式，生成京东小程序代码，生成/dist-jd/

``` bash
npm run build
```

生产模式，生成微信小程序代码，生成/dist-wx/

``` bash
npm run build:wx
```

### mock数据

mock 数据可直接

``` bash
npm run mock(:wx)
```

### Q&A

* 打包状态下不支持自闭合的自定义元素

打包状态下项目使用 `gulp-htmlmin` 进行html压缩，`gulp-htmlmin` 属性 `collapseWhitespace` 开启的状态下会把空元素 `<slot />` 中的斜杠当做空格删除掉，转成 `<slot>`。

因此，推荐使用`<slot></slot>`这种闭合方式。
