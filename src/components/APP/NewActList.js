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