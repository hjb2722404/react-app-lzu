/**
 * Created by yp on 2017/6/17.
 */
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