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