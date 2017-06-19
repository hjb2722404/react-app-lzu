---
title:'React综合应用实例002'
---

# React综合应用实例002——搭架子

好，本节咱们来搭架子，撸起袖子，就是干！

## 建立目录结构

虽然大厦未成，地基未起，但我们可以憧憬，这叫规划，也叫远见。

既然我们选择了`webpack` 作为构建工具，那么必定会有一个源文件目录（`src`）和一个构建文件目录（`build`）,然后，一个webpack.config.js比不可少，因为webpack要以它为基准进行构建。

当然，我们得有一个`doc`目录，来放置项目相关文档。本系列教程的文章就将存放在这里。



然后，作为一个现代化前端应用，根目录没有个'package.json'，你都不好意思说自己是前端，所以我们也通过命令行工具来初始化一个package.json文件：

```shell
$ npm init
```

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170613/210110463.png)



如上图所示。

好的，至此，我们有了最外层的目录：



![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170613/210232346.png)

 

好，我们接着想想，既然我们要构建一个react-app，那组件化是react的精髓啊，所以我们还要继续在`src`目录中构建我们的组件式目录结构：

![目录结构](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170613/210941303.png)

至此，最基本的目录结构我们就建好了。

## 入口搭建

搭好了架子，我们来先把门窗装起。

### 入口html页面

首先，来写html页面，如下：

./src/index.html

```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset=utf-8/>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
    <meta name="apple-mobile-web-app-capable" content="yes" />
    <meta name="apple-mobile-web-app-status-bar-style" content="black" />
    <!-- 启用360浏览器的极速模式(webkit) -->
    <meta name="renderer" content="webkit">
    <!-- 避免IE使用兼容模式 -->
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <!-- 针对手持设备优化，主要是针对一些老的不识别viewport的浏览器，比如黑莓 -->
    <meta name="HandheldFriendly" content="true">
    <!-- 微软的老式浏览器 -->
    <meta name="MobileOptimized" content="320">
    <!-- uc强制竖屏 -->
    <meta name="screen-orientation" content="portrait">
    <!-- QQ强制竖屏 -->
    <meta name="x5-orientation" content="portrait">
    <!-- UC强制全屏 -->
    <meta name="full-screen" content="yes">
    <!-- QQ强制全屏 -->
    <meta name="x5-fullscreen" content="true">
    <!-- UC应用模式 -->
    <meta name="browsermode" content="application">
    <!-- QQ应用模式 -->
    <meta name="x5-page-mode" content="app">
    <!-- windows phone 点击无高光 -->
    <meta name="msapplication-tap-highlight" content="no">
    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    <title>兰大四川校友会</title>
</head>

<body>
<div id=app></div>
</body>
```



这就是我们基本的html页面，大家只需要关注下面两行代码就好：

```html
……
<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0">
……
<div id=app></div>
……
```



其中，第一行定义了“viewport”视图设置，以保证在移动设备下视窗宽度按照移动设备的屏幕宽度来显示，并避免缩放，第二行定义了我们的react-app最终要渲染到的根节点。



### 入口main.js编写

react工作时，先要找到react的主入口，然后才能从主入口逐层找到各个组件进行渲染，所以主入口是非常重要的，但同时它又是及其简单的，简单到什么程度，如下：

./src/main.js

```react
/**
 * Created by yp on 2017/6/13.
 */
//引入react基础库
import React from 'react'

//引入react-dom库
import { render } from 'react-dom'

//引入react-router相关组件
import { Router, Route, hashHistory } from 'react-router'

//引入着陆页组件
import App from './components/App/App'

//将着陆页组件渲染到html的根节点中，并同时规定路由
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
), document.getElementById('app'))
```



在这里我们主要关注以下几点：

* 我们使用了ES2015的`import`来引入各种库和组件，那么这里暗含的意思是各个组件和库都应该是使用`export`导出的，对这一点如果不明白，可以仔细阅读ES2015的相关教程。
* `render()`作为react最为常用和重要的方法，其实是来自于`react-dom`库，而不是`react`库，尽管他们在实际应用中经常一起出现。对于这一点，以后有机会可以研究下`react`源码。
* `react-router`其实有多种路由方式，我们这里选用了hashHistory的方式，具体其他种类的路由，和他们之间的区别，可以阅读react-router文档的相关章节。
* 注意`Router`与`Route`的组合用法，`Route`标签一定是在`Router`标签对内，`Router`作为路由的根节点，规定了全局的属性，而`Route`作为子节点，规定了其`component`所指向的组件的路由参数。

我们注意到入口main.js里引入了着陆页组件APP，那么我们现在来编写APP组件代码。

### 入口着陆页组件APP

入口着陆页，其实就是我们所说的首页，从最终效果来看我们的首页其实包含以下部分：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170615/074802541.png)

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170615/074930234.png)



* banner组件：用来展示banner图片，即门面
* 关于我们组件：用来展示关于我们的信息
* 最新活动组件：用来展示最新发布的活动
* 热门活动组件：用来展示参与人数最多的活动
* 按钮组组件： 包含两个按钮，点击按钮可跳转到对应页面
* 版权信息组件：包含版权等信息

你可能注意到了我上文中的措辞中反复提到了“组件”一词，没错，这就是react组件化的核心思想，将页面分解为若干个独立的组件，并且某些组件单元是可以高度复用的，比如版权信息组件，整个应用中的所有页面都将用到它，并且我们也可以直接将它复制到其他项目里使用（文字内容使用属性传入），而我们只需要为它编写一次代码即可。这有点像是搭积木，组件就是一个一个的积木块，我们可以使用这些积木块搭建出不同样式的城堡或其他有趣的玩意儿。



然而，我们为了尽快先让应用真正跑起来，先不编写和引入这些组件到着陆页组件，而是如下：

./src/components/APP/APP.js

```react
//引入react库和其中的Component类
import React ,{ Component } from 'react'

//定义APP组件
class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>hello,react-app</h1>
            </div>
        )
    }
}

//导出APP组件
export default App;
```



这里，我们又使用了ES2015的语法，定义了一个APP类，它继承自React的Componet类。

在这里，我们同样看到一个render()方法，但却没有看到引入react-dom库，为什么呢？

原来，这个render()方法其实是Component的方法，此处只是对它做了重写。

还有注意的一点是，render()方法的return()方法里只能返回一个容器，像下面这样的写法**是错误的** ：

```react
class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>hello,react-app</h1>
            </div>
            <div className="otherContain">
            	<p>this is a other container</p>
             </div> 	
        )
    }
}
```



**正确的写法** 应该是这样：

```react
class App extends Component {
    render() {
        return (
            <div className="App">
                <h1>hello,react-app</h1>
                <div className="otherContain">
            	<p>this is a other container</p>
             </div>
            </div>
             	
        )
    }
}
```



最后，还记得上面我们说过，main.js里使用了import意味着什么吗？对，意味着被它引入的组件一定是export出来的，所以，你看到了：

```react
//导出APP组件
export default App;
```



## 安装各种库

上面，我们引入了很多库，还有一些我们在上面没有引入，但将要用到的库。

现在我们来安装他们

### 安装react

打开命令行工具，执行：

```shell
$ npm install --save react react-dom	
```

如图：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170615/092820883.png)



### 安装react-router

执行以下命令：

```shell
$ npm install --save react-router	 
```

如图：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170615/093003484.png)



### 安装weui

执行以下命令：

```shell
npm install --save-dev weui	
```

如图：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170615/093333435.png)



现在，打开`package.json`文件，发现该文件内容发生了变化：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170615/093555588.png)

我们发现多了红框里的内容，这是因为我们在安装库的时候，加了--save或--save-dev参数。

其中：

* 加了--save参数的库及其版本将被写入package.json的dependencies对象里
* 加了--save-dev参数的库及其版本将被写入package.json的devDependencies里

他们的区别是：

* dependenceis里的库将会被部署到生产环境中。
* devDependencies将只会在生产环境中用到。

当然，这是理论上的，就像我们的项目，weui按道理应该是生产环境下需要依赖的，但是我们把它加入到了devDependencies里，在打包时它也依旧会被打包到最终的脚本文件里。在这里，我们只是为了特别指出这一点而把它写在了devDependencies里，真实开发时推荐还是放在dependencies中。

### 安装webpack

明白了以上内容，我们现在来安装webpack，由于webpack只是在开发环境中使用的，所以我们把它安装到开发依赖中：

```shell
$ npm install --sava-dev webpack
```

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170616/134847720.png)

### 配置webpack

安装好了webpack，我们来对webpack的打包选项进行配置，编辑webpack.config.js，写入如下内容：

```react
/**
 * Created by yp on 2017/6/13.
 */
// 引入node基础组件path
var path = require('path');


module.exports = {

    //定义入口路径文件：
    entry: {
        app:path.resolve(__dirname, './src/main.js'),
        vendor: ['react','react-dom','react-router'],
    },
    
    //定义打包输入路径和文件
    output: {
        path: path.resolve(__dirname, './build'),
        filename: "bundle.js",
        publicPath: ''
    },

    module: {
        loaders: [
            // 用来编译JSX和ES2015语法
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'babel-loader?presets[]=es2015&presets[]=react',

            }
        ]
    }
}
```



我们看到上面配置了用来编译JSX和ES2015的babel模块，所以我们还需要安装相应的库：

```shell
$ npm install --save-dev babel-core babel-loader babel-preset-es2015 babel-preset-react
```



我们可以看到此时的 package.json文件内容如下：

```javascript
{
  "name": "react-app",
  "version": "1.0.0",
  "description": "this is a tutor to react-app building",
  "main": "webpack.config.js",
  "directories": {
    "doc": "doc"
  },
  "scripts": {
    "test": "test"
  },
  "keywords": [
    "react，app，weui"
  ],
  "author": "hjb2722404",
  "license": "ISC",
  "dependencies": {
    "react": "^15.6.1",
    "react-dom": "^15.6.1",
    "react-router": "^4.1.1"
  },
  "devDependencies": {
    "babel-core": "^6.25.0",
    "babel-loader": "^7.0.0",
    "babel-preset-es2015": "^6.24.1",
    "babel-preset-react": "^6.24.1",
    "webpack": "^2.6.1",
    "weui": "^1.1.2"
  }
}

```

### 把程序先把跑起来

现在，一切基础的架子都搭好了，我们先让程序跑起来看看效果，我们执行webpack:

```shell
$ webpack
```

 执行此程序后，我们就会发现./build目录下多了一个bundle.js文件，这正是我们再webpack.config.js里配置的输出文件，现在，我们将./src/index.html文件复制一份到build目录中，并增加下面内容：

./build/index.html

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/110851486.png)



然后我们看下页面效果，发现页面中什么都没有，并且控制台报错了：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/111750400.png)



大意是说history属性值为undefined，我们看看代码，发现react-router的库里并没有hashHistory组件，如下：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/111944158.png)



然后我们看到我们的react-router的版本为4.0+：

​	![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/112034111.png)

我们找到react-router的文档，发现react-router升级了，语法也有了改动，而我们代码中依旧用的是react-router2.0版本的语法，所以会报错。

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/112233477.png)



现在我们来根据文档，按照新的规则改造我们的程序，首先安装新增的库react-router-dom：

```shell
$ npm install --save react-router-dom
```

然后，改造./src/main.js文件，改造前如下：

```react
//引入react基础库
import React from 'react'

//引入react-dom库
import { render } from 'react-dom'

//引入react-router相关组件
import { Router, Route, hashHistory} from 'react-router'

//引入着陆页组件
import App from './components/App/App'

//将着陆页组件渲染到html的根节点中，并同时规定路由
render((
    <Router history={hashHistory}>
        <Route path="/" component={App}/>
    </Router>
), document.getElementById('app'))
```



改造后如下：

```react
/**
 * Created by yp on 2017/6/13.
 */
//引入react基础库
import React from 'react'

//引入react-dom库
import { render } from 'react-dom'

//引入react-router相关组件
import { Router, Route,} from 'react-router'

//新引入的react-router-dom库中的HashRouter组件
import { HashRouter } from 'react-router-dom'

//引入着陆页组件
import App from './components/App/App'

//将着陆页组件渲染到html的根节点中，并同时规定路由
render((
    <HashRouter>
        <App />
    </HashRouter>
), document.getElementById('app'))
```



然后我们再次执行webpack:



![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/112740697.png)



现在，我们在浏览器中刷新./build/index.html，就会看到以下界面：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/112855561.png)

至此，我们的应用就算是正式跑起来了。



### 环境配置

然后我们在本地环境中配置一个虚拟机，将本地lzu.com域名指向127.0.0.1，并指向我们的build目录，如下：

系统hosts文件配置：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/111142337.png)

apache的httpd-vhosts.conf文件：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/112949063.png)



然后我们就可以在浏览器输入：lzu.com来访问我们的应用了：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/113049317.png)

我们注意两点：

* 页面标题是乱码，这个是apache环境配置的问题，可以先不用管
* 我们访问lzu.com但是浏览器地址栏却显示lzu.com/#/，这个就说明是react-router的HashRouter起作用了，它自动为地址加上了hash参数。



### 是不是很爽

这次，我们搭好了架子，撑起了门面，下一节我们就可以正式开始唱大戏了，哈哈！





