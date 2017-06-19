---
title:'React综合应用实例003——造客厅'
---

# React综合应用实例003——造客厅

上次我们搭好了架子，并且运行起了程序，下面我们来开始建造客厅——着陆页。

就像客人来家里参观，肯定先是要进客厅喝口茶，然后你才能带着他四处逛逛看看，我们的应用也一样，而充当客厅角色的就是我们的着陆页。

上次我们为了尽快让程序运行起来，在着陆页里直接输出了‘hello,react-app’文本，这一次，我们根据效果图来把真实的着陆页给实现了。

现在的版本：

![](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/113049317.png)

目标效果：

![](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170615/074802541.png)

![](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170615/074930234.png)



## 写结构

根据我们队效果图的分拆，我们发现着陆页共有六个组件组成，我们就按照这个把整个结构写出来：

./scr/components/APP/APP.js

```react
//引入react库和其中的Component类
import React ,{ Component } from 'react'

//banner组件
import Banner from '../Public/Banner'
//关于我们组件
import Intros from './Intros'
//最新活动和最热活动组件
import NewActList from './NewActList'
//按钮组组件
import Buttons from './Buttons'
//版权组件
import CopyRight from '../CopyRight/CopyRight'




class App extends Component {
    render() {
        return (
            <div className="App">
                <Banner />
                <Intros/>
                <NewActList/>
                <Buttons/>
                <CopyRight/>
            </div>
        )
    }
}


export default App;
```

由于最新活动和热门活动两个组件都是有活动列表组成，所以我们在这里把它们合并为一个组件了



写好了结构，接下来我们就编写每一个子组件。

### banner组件

由于banner不仅是着陆页使用，根据效果图，整个应用的每一个页面都会使用它，故而，我们把它放入Public目录里。

./src/components/Public/Banner.js

```react
//引入react的Component组件
import React,{Component} from 'react'

//引入logo,注意为svg格式
import logo from '../static/logo.svg'

//引入全局样式表
import '../static/style.css'

//引入着陆页样式表
import '../static/index.css'


class Banner extends Component{
    render(){
        return(
            <div className="App-header">
                <img src={logo} className="App-logo" alt="logo" />
                <h2>欢迎来到兰大四川校友会</h2>
            </div>
        )
    }
}

export default Banner;
```



在这里，我们引入了svg格式的logo图像，还引入了两张样式表，这两张样式表分别如下：

./src/components/static/index.css

```css
body {
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}
```

这张样式表里，我们设置了整个页面的通用参数。



./src/components/static/style.css

```css
.App {
  width:100%;
  max-width: 720px;
  margin: 0 auto;
}

.App-logo {
  animation: App-logo-spin infinite 20s linear;
  height: 80px;
  color: #ffffff;
}

.App-header {
  /*background-color: #222;*/
  background-image: url("bg.png");
  background-size: cover;
  height: 150px;
  padding: 20px;
  color: white;
  text-align: center;
}

@keyframes App-logo-spin {
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
}
```



这张表里我们设置了整个应用最大宽度不超过720像素，并且在页面居中，还用CSS3为logo图像设置了旋转动画，并且为banner设置了图片等。



背景图片是一张事先做过处理的兰大校门图片：



![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/150415018.png)



至此，Banner组件就已经写好，现在，让我们先把其他组件注释掉，然后执行webpack，看看页面效果：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/151530153.png)



![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/151612547.png)



我们发现在运行webpack时报了错，这是因为webpack在打包样式文件和图像文件时没有找到相应的处理插件造成的，我们先安装这些插件：

```shell
$ npm install --save-dev css-loader extract-text-webpack-plugin file-loader url-loader style-loader
```



然后在webpack.config.js里配置它们：

./webpack.config.js

```javascript
// 引入node基础组件path
var path = require('path');

//配置extract-text-webpack-plugin插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {

    //定义入口路径文件：
    entry: {
        app:path.resolve(__dirname, './src/main.js')
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

            },
            //用来编译样式表文件
            {
                test: /\.css$/,
                // loader:"style!css"
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            //用来编译图像文件
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=25000'
            }
        ]
    }
}
```



注意，新增了以下内容：

```javascript
……
//配置extract-text-webpack-plugin插件
var ExtractTextPlugin = require('extract-text-webpack-plugin');

……

    module: {
        loaders: [
           ……
            //用来编译样式表文件
            {
                test: /\.css$/,
                // loader:"style!css"
                loader: ExtractTextPlugin.extract("style-loader","css-loader")
            },
            //用来编译图像文件
            {
                test: /\.(png|jpg|svg)$/,
                loader: 'url?limit=25000'
            }
        ]
    }
}
```



至于以上各个插件的用途和用法，属于基础性内容，可以参考其在github上的官方文档，这里不再赘述。

现在再执行webpack，这时我们又看到以下错误：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/152939885.png)



原来是因为extract-text-plugin升级后，旧的语法不再受支持导致的。

大家从前面react-router和这里extract-text-plugin可以看到，现在这个前端体系有多混乱，各种版本升级后的不兼容，导致了很多问题，但是，兵来将挡水来土掩，再多问题我们也要解决它，况且这里还提示了我们，我们按照红框中的提示和官方文档中的示例，改用新语法：

```javascript
module: {
        loaders: [
……
{
                test: /\.css$/,
                // loader:"style!css"
                use: ExtractTextPlugin.extract({ fallback:'style-loader', use: 'css-loader' })
               
            },
               ]
    },  
            plugins: [
        new ExtractTextPlugin("styles.css")
    ]
```

然后再使用webpack打包，这次没有报错了，我们来看看效果：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/155144717.png)



我们发现页面样式表并没有被编译到js里，再看build文件夹里，多了几个文件：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/155303098.png)



原来它单独将样式编译到了我们再webpack里配置的styles.css文件里，并且将背景图名称做了hash处理，我们在index.html里引入样式表：

./build/index.html

```html
……
    <meta name="msapplication-tap-highlight" content="no">
    <link rel="apple-touch-icon" href="touch-icon-iphone.png">
    <link rel="apple-touch-icon" sizes="76x76" href="touch-icon-ipad.png">
    <link rel="apple-touch-icon" sizes="120x120" href="touch-icon-iphone-retina.png">
    <link rel="apple-touch-icon" sizes="152x152" href="touch-icon-ipad-retina.png">
    <title>兰大四川校友会</title>
    <link rel="stylesheet" href="./styles.css">
</head>

<body>
<div id=app></div>
<script src="./bundle.js"></script>
</body>
```



然后在浏览器中刷新页面再看效果：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/155641520.png)



至此，banner组件总算是写好了。

###  

### 关于我们组件

这个组件，我们直接上代码：

```react
//引入React及其Component组件
import React, { Component } from 'react'
//引入react-router-dom的Link组件
import { Link } from 'react-router-dom'

//分别引入页面中要用到的各个weui组件，这样可以避免打包时将没有用到的组件也打包了，减少最终打包体积
import { Panel,
    PanelHeader,
    PanelBody,
    PanelFooter } from 'react-weui/lib/components/panel'

import { Cell,
    CellBody,
    CellFooter } from 'react-weui/lib/components/cell'

import {

    MediaBox,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta

} from 'react-weui/lib/components/mediabox'

//引入weui组件的样式
import 'weui'
import 'react-weui/lib/react-weui.min.css'

//定义‘更多’组件
const CellMore = () => (
    <Link to="/intro">
        <Cell access link>
            <CellBody>更多</CellBody>
            <CellFooter />
        </Cell>
    </Link>
);

class Intros extends Component {
    render(){
        return (
            <div>
                <Panel>
                    <PanelHeader>关于我们</PanelHeader>
                    <PanelBody>
                        <MediaBox type="text">
                            <MediaBoxTitle>兰大四川校友会简介</MediaBoxTitle>
                            <MediaBoxDescription>
                                情系金城兰州，凝聚青春回忆；扎根巴蜀大地，服务在川校友。
                            </MediaBoxDescription>
                            <MediaBoxInfo>
                                <MediaBoxInfoMeta>WeUI</MediaBoxInfoMeta>
                                <MediaBoxInfoMeta>2016-8-8</MediaBoxInfoMeta>
                            </MediaBoxInfo>
                        </MediaBox>
                    </PanelBody>
                    <PanelFooter>
                        <CellMore />
                    </PanelFooter>
                </Panel>
            </div>
        );
    }
}

export default Intros;
```



各主要代码块的作用，已经写入了注释，就不再赘述。执行webpack命令打包，然后看看效果：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/163345755.png)



### 活动列表组件

```react
/**
 * Created by yp on 2017/6/17.
 */
import React,{Component} from 'react'

import { Cell,Cells, CellHeader,CellBody,CellFooter } from 'react-weui/lib/components/cell/'
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter } from 'react-weui/lib/components/panel'

import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
} from 'react-weui/lib/components/mediabox'


import 'weui'
import 'react-weui/lib/react-weui.min.css'

import logo from '../static/logo.svg'
import Badge from 'react-weui/lib/components/badge'

//定义‘更多’组件，并传入属性对象
const CellMore = (props) => (
    <Cell access href={`/#/${props.linkurl}`}>
        <CellBody>
            More
        </CellBody>
        <CellFooter />
    </Cell>
);

const appMsgIcon = <img src={logo} />

class NewActList extends Component{

    render(){
        return(
            <div>
                <Panel>
                    <PanelHeader>最新活动</PanelHeader>
                    <PanelBody>
                        <MediaBox type="appmsg" href={`/#/actdetail/0`}>
                            <MediaBoxHeader>{appMsgIcon} </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>活动名称</MediaBoxTitle>
                                <MediaBoxDescription>
                                    活动口号
                                </MediaBoxDescription>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>
                                       未开始
                                    </MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                        <MediaBox type="appmsg" href={`/#/actdetail/0`}>
                            <MediaBoxHeader>{appMsgIcon} </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>活动名称</MediaBoxTitle>
                                <MediaBoxDescription>
                                    活动口号
                                </MediaBoxDescription>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>
                                        未开始
                                    </MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                    <PanelFooter>
                        <CellMore linkurl="newactlist"/>
                    </PanelFooter>
                </Panel>
                <Panel>
                    <PanelHeader>热门活动</PanelHeader>
                    <PanelBody>
                        <MediaBox type="appmsg" href={`/#/actdetail/0`}>
                            <MediaBoxHeader>{appMsgIcon} </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>活动名称<Badge preset="body">4</Badge></MediaBoxTitle>
                                <MediaBoxDescription>
                                    活动口号
                                </MediaBoxDescription>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>
                                        未开始
                                    </MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                        <MediaBox type="appmsg" href={`/#/actdetail/0`}>
                            <MediaBoxHeader>{appMsgIcon} </MediaBoxHeader>
                            <MediaBoxBody>
                                <MediaBoxTitle>活动名称<Badge preset="body">4</Badge></MediaBoxTitle>
                                <MediaBoxDescription>
                                    活动口号
                                </MediaBoxDescription>
                                <MediaBoxInfo>
                                    <MediaBoxInfoMeta>
                                        未开始
                                    </MediaBoxInfoMeta>
                                </MediaBoxInfo>
                            </MediaBoxBody>
                        </MediaBox>
                    </PanelBody>
                    <PanelFooter>
                        <CellMore linkurl="hotactlist"/>
                    </PanelFooter>
                </Panel>

            </div>
        );
    }
}

export default NewActList;
```



这个组件大部分与前一个组件没什么区别，各个代码块作用也同上一个组件，这里唯一需要注意的是，在定义CellMore组建时，我们这次传入了属性对象，而这个属性对象就是我们在调用它时给他赋值的所有属性。在这个例子中，我们给它赋值了linkurl属性，这个属性会被包含到整个props属性对象，传入组件。

我们再运行webpack，然后看看效果：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/165454053.png)



#### 改造活动列表组件

在活动列表组件里，我们发现，最新活动和热门活动两部分，除了title不一样，还有热门活动名称后多一个数字徽标以外，存在着很大部分的重复代码，尤其是每一个活动项，其样式和行为都是一样的。我们可以考虑将它提取出来。分析一下，最新活动和热门活动有两个不一样：

* 数据来源：两个列表请求的数据源是不同的，最新活动是按时间排序获得活动列表数据，而热门活动是按照参与人数排序来获得活动列表数据。
* 徽标：热门活动的标题后面以数字徽标的形式给出了本活动当前的参与人数。

综合以上两点，我们可以将不一样的部分以组件属性的方式传给组件，其他一样的部分可以共用代码，这样，以后所有页面的活动列表中的活动项都可以共用这一个组件。提取后的组件代码如下：

./src/components/Public/ActItem.js

```react
/**
 * Created by yp on 2017/4/7.
 */
import React,{Component} from 'react'

import {
    MediaBox,
    MediaBoxHeader,
    MediaBoxBody,
    MediaBoxTitle,
    MediaBoxDescription,
    MediaBoxInfo,
    MediaBoxInfoMeta,
} from 'react-weui/lib/components/mediabox'

import 'weui'
import 'react-weui/lib/react-weui.min.css'
import logo from '../static/logo.svg'
import Badge from 'react-weui/lib/components/badge'

const appMsgIcon = <img src={logo} />


class ActItem extends Component {

    constructor(props) {

        super(props);
    }

    render() {
        return (
            <MediaBox type="appmsg" href={`/#/actdetail/${this.props.data.id}`}>
                <MediaBoxHeader>{appMsgIcon} </MediaBoxHeader>
                <MediaBoxBody>
                    <MediaBoxTitle>{this.props.data.act_name}
                        {
                            this.props.isHot
                                ? <Badge preset="body">{this.props.data.book_user_count}</Badge>
                                : null
                        }

                    </MediaBoxTitle>
                    <MediaBoxDescription>
                        {this.props.data.slogon}
                    </MediaBoxDescription>
                    <MediaBoxInfo>
                        <MediaBoxInfoMeta>
                            {
                                (() => {
                                    switch (this.props.data.status) {
                                        case 1:   return "未开始";
                                        case 2:   return "报名中";
                                        case 3:   return "人数已满";
                                        default:  return "已结束";
                                    }
                                })()
                            }
                        </MediaBoxInfoMeta>
                    </MediaBoxInfo>
                </MediaBoxBody>
            </MediaBox>
        )

    }
}

export  default ActItem;
```



这里面需要注意的是我们在判断是否是最热活动时，利用了一个三元操作符，而在判断活动的状态时，使用了switch语句，请注意它们的语法。

然后我们改造我们刚刚写的活动列表组件：

./src/components/APP/NewActList.js

```react
/**
 * Created by yp on 2017/6/17.
 */
import React,{Component} from 'react'

import { Cell,Cells, CellHeader,CellBody,CellFooter } from 'react-weui/lib/components/cell/'
import {
    Panel,
    PanelHeader,
    PanelBody,
    PanelFooter } from 'react-weui/lib/components/panel'

import 'weui'
import 'react-weui/lib/react-weui.min.css'


import ActItem from '../Public/ActItem'

//定义‘更多’组件，并传入属性对象
const CellMore = (props) => (
    <Cell access href={`/#/${props.linkurl}`}>
        <CellBody>
            More
        </CellBody>
        <CellFooter />
    </Cell>
);


class NewActList extends Component{
    constructor(props){
        super(props);
        this.state = {
            newActList:[
                {
                    id:1,
                    act_name : '最新活动一',
                    slogon:'最新口号一',
                    status: 1
                },
                {
                    id:2,
                    act_name : '最新活动二',
                    slogon:'最新口号二',
                    status: 2
                }
            ],
            hotActList:[
                {
                    id:3,
                    act_name : '最热活动一',
                    slogon:'最热口号一',
                    status: 2,
                    book_user_count:6
                },
                {
                    id:4,
                    act_name : '最热活动二',
                    slogon:'最热口号二',
                    status: 2,
                    book_user_count:5
                }
            ],
        }
    }
    render(){
        return(
            <div>
                <Panel>
                    <PanelHeader>最新活动</PanelHeader>
                    <PanelBody>
                        {
                            this.state.newActList.map(function (item) {
                                return(
                                    <ActItem data={item} />
                                )
                            })
                        }
                    </PanelBody>
                    <PanelFooter>
                        <CellMore linkurl="newactlist"/>
                    </PanelFooter>
                </Panel>
                <Panel>
                    <PanelHeader>热门活动</PanelHeader>
                    <PanelBody>
                        {
                            this.state.hotActList.map(function (item) {
                                return(
                                    <ActItem data={item} isHot="true"/>
                                )
                            })
                        }
                    </PanelBody>
                    <PanelFooter>
                        <CellMore linkurl="hotactlist"/>
                    </PanelFooter>
                </Panel>
            </div>
        );
    }
}

export default NewActList;
```



可以看到，我们定义了模拟的数据源，并使用了map()函数将它们遍历渲染到页面中去，并且给最热活动的每个项都加了isHot属性，以便可以让ActItem渲染数字徽标。

运行webpack打包，然后看看效果：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/174026753.png)

我们主要关注样式是否与预期表现一致，结果证明这是可行的。



### 按钮组组件

./src/components/APP/Button.js

```react
import React, {Component} from 'react';
import { Link } from 'react-router-dom'

import { Cell,Cells } from 'react-weui/lib/components/cell/'
import { Flex, FlexItem } from 'react-weui/lib/components/flex/'
import { Button } from 'react-weui/lib/components/button/'

import 'weui';
import 'react-weui/lib/react-weui.min.css';
class Buttons extends Component{

    render(){
        return(
            <Flex>
                <FlexItem>
                    <Link to={`/actdetail/2`}>
                        <Cells>
                            <Cell>
                                <Button type="primary" disabled="disabled">申请入会</Button>
                            </Cell>
                        </Cells>
                    </Link>
                </FlexItem>
                <FlexItem>
                    <Link to="/createact">
                        <Cells>
                            <Cell>
                                <Button type="primary">
                                    创建活动
                                </Button>
                            </Cell>
                        </Cells>

                    </Link>

                </FlexItem>
            </Flex>
        );
    }
}

export default Buttons;
```



这个比较简单，主要就是布局，我们直接看webpack打包后的效果：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/174503989.png)



### 版权组件

考虑到版权组件也是很多页面的共用组件，我们也将它放入Public目录

./src/components/Public/CopyRight.js

```react
import React,{Component} from 'react';

import {
    Footer,
    FooterText,
    FooterLinks,
    FooterLink
} from 'react-weui/lib/components/footer/';

import 'weui';
import 'react-weui/lib/react-weui.min.css';

class CopyRight extends Component {
    render(){
        return(
            <div>
                    <Footer>
                        <FooterLinks>
                            <FooterLink href="javascript:void(0);">兰州大学</FooterLink>
                            <FooterLink href="javascript:void(0);">国王说技术支持</FooterLink>
                        </FooterLinks>
                        <FooterText>Copyright &copy; 2016-2026 lzu</FooterText>
                    </Footer>
            </div>
        );
    }
}

export default CopyRight;
```



看看现在的APP.js

./src/components/APP/APP.js

```react
//引入react库和其中的Component类
import React ,{ Component } from 'react'

//banner组件
import Banner from '../Public/Banner'
//关于我们组件
import Intros from './Intros'
//最新活动和最热活动组件
import NewActList from './NewActList'
//按钮组组件
import Buttons from './Buttons'
// //版权组件
import CopyRight from '../Public/CopyRight'




class App extends Component {
    render() {
        return (
            <div className="App">
                <Banner />
                <Intros />
                <NewActList />
                <Buttons />
                <CopyRight />
            </div>
        )
    }
}


export default App;
```

运行webpack打包，然后浏览器刷新，看看效果：

![mark](http://7xlnr9.com1.z0.glb.clouddn.com/blog/20170617/175005411.png)



至此，我们的客厅算是造好了，本节完，下一节我们将会接触到react的表单，拭目以待吧。