import React from 'react';
import PropTypes from 'prop-types';
import { PayStore } from './store'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button,Modal } from 'antd-mobile'
import { Divider } from 'antd';
import './index.less'


function closest(el, selector) {
    const matchesSelector = el.matches || el.webkitMatchesSelector || el.mozMatchesSelector || el.msMatchesSelector;
    while (el) {
      if (matchesSelector.call(el, selector)) {
        return el;
      }
      el = el.parentElement;
    }
    return null;
  }

@observer
class Pay extends React.Component {
    @observable activeMenu = 'owner'
    @observable modalstatus = false
    @observable shoukuanren = false
    @observable address = false
    @observable last = false
    @observable showpepple = false
    @observable showOwner = false
    @observable relationship = ''
    @observable huikuan = ''
    constructor(props) {
        super(props);
        this.state = {
          locale: 'English',
          money:20000
        };
    }

    static defaultProps = {
        store: new PayStore()
    }

    static contextTypes = {
        router: PropTypes.object
    }

    onChange = (e) => {
        if(e.target.id !== this.activeMe ){
            this.activeMenu = e.target.id
        }
    }

    complex = ()=>{
        this.modalstatus = true
    }

    onWrapTouchStart = (e) => {
        // fix touch to scroll background page on iOS
        if (!/iPhone|iPod|iPad/i.test(navigator.userAgent)) {
          return;
        }
        const pNode = closest(e.target, '.am-modal-content');
        if (!pNode) {
          e.preventDefault();
        }
    }


    render(){
        return(
            <div style={{margin:"20px 20px"}}>
                <div style={{marginTop:"40px",color:"grey",borderRadius:"20px",boxShadow: 'rgb(171 189 189) 0px 0px 5px'}}>
                    <div style={{padding:"10px",display:'flex'}}>
                        <img src="touxiang.png" height="64px" width="64px" />
                        <div style={{display:'flex',marginLeft:'20px',justifyContent: 'space-between',flexDirection: 'column'}}>
                            <div style={{fontSize:'18px',color:"black"}}>Hi~ X先生</div>
                            <div>15767876675</div>
                        </div>
                        
                    </div>
                    <div style={{display: 'flex',justifyContent: 'space-between',margin: '0px 25px',padding:'10px'}}>
                        <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                            <span>3 笔</span>
                            <span>累计汇款</span>
                        </div>
                        <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                            <span>100 元</span>
                            <span>累计手续费</span>
                        </div>
                        <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                            <span>35 天</span>
                            <span>加入此平台</span>
                        </div>
                    </div>
                </div>
                <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between",alignItems: 'center'}}>
                    <div style={{marginTop:"40px"}}>个人资料信息</div>
                    <Button style={{marginTop:"40px",fontSize:16,width: '100px',height: '32px',lineHeight: '32px',color:'white'}} onClick={this.complex} type="primary" >完 善</Button>
                </div>
                <Divider />
                <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between",alignItems: 'center'}}>
                    <div style={{}}>推荐好友</div>
                    <Button style={{fontSize:16,width: '100px',height: '32px',lineHeight: '32px',color:'white'}} type="primary" >邀 请</Button>
                </div>
                <Modal
                    visible={this.modalstatus}
                    transparent
                    maskClosable={false}
                    closable
                    onClose={()=>{this.modalstatus=false}}
                    footer={[{ text: '下一步', onPress: () => {this.modalstatus=false;} }]}
                    title="完善信息"
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { }}
                >
                    <div style={{ height: '100%', overflow: 'scroll' }}>
                        aaa
                    </div>
                </Modal>
                {/* <Modal
                visible={this.shoukuanren}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.shoukuanren=false}}
                footer={[{ text: '上一步', onPress: () => {this.shoukuanren=false;this.modalstatus=true} },{ text: '下一步', onPress: () => {this.shoukuanren=false;this.address=true} }]}
                title="完善信息"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>

                </div>
                </Modal>
                <Modal
                visible={this.address}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.address=false}}
                footer={[{ text: '上一步', onPress: () => {this.address=false;this.shoukuanren=true} },{ text: '下一步', onPress: () => {this.address=false;} }]}
                title="完善信息"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>

                </div>
                </Modal> */}
            </div>
        )
    }
};

export default Pay;
