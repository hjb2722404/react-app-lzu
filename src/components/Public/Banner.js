/**
 * Created by yp on 2017/6/17.
 */
//引入react的Component组件
import React,{ Component } from 'react'

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