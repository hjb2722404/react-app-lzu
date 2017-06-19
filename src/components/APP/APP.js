/**
 * Created by yp on 2017/6/15.
 */

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