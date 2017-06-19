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