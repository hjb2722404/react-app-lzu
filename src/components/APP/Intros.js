/**
 * Created by yp on 2017/6/17.
 */
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