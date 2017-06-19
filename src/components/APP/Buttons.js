/**
 * Created by yp on 2017/6/17.
 */
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