import React from 'react';
import PropTypes from 'prop-types';
import { PayStore } from './store'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button,Modal, InputItem,DatePicker,List} from 'antd-mobile'
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
    @observable url = ''
    @observable url_1 = ''
    @observable modalstatus = false
    @observable identify_1 = false
    @observable identify_2 = false
    @observable complexed = false
    @observable huikuan_birthDay = ''
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

    upload = (files)=>{
        let url = null
        let file =  files.currentTarget.files[0]
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        console.log(url)
        this.url =  url ;
    }

    upload_1 = (files)=>{
        let url = null
        let file =  files.currentTarget.files[0]
        if (window.createObjectURL!=undefined) { // basic
            url = window.createObjectURL(file) ;
        } else if (window.URL!=undefined) { // mozilla(firefox)
            url = window.URL.createObjectURL(file) ;
        } else if (window.webkitURL!=undefined) { // webkit or chrome
            url = window.webkitURL.createObjectURL(file) ;
        }
        console.log(url)
        this.url_1 =  url ;
    }

    complex = ()=>{
        if(this.complexed){
            this.identify_2 = true
        }else{
            this.modalstatus = true
        }
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
                    <Button style={{marginTop:"40px",fontSize:16,width: '100px',height: '32px',lineHeight: '32px',color:'white'}} onClick={this.complex} type="primary" >{this.complexed?"查 看":"完 善"}</Button>
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
                    title="完善信息"
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { }}
                >
                    <div style={{ height: '100%', overflow: 'scroll' }}>
                    <img
                        src={this.url?this.url:'identify_demo.png'}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' ,height:'230px'}}
                    />
                    <div style={{display:'flex',flexDirection:'column',marginTop:'20px' }}>
                        <div style={{color:'black'}}>印度尼西亚身份证人像面照片</div>
                        <div style={{fontSize: '12px','marginTop': '20px'}}>拍摄时请务必确保光线充足，请将证件与拍摄框中的高亮区域对齐，并轻按下方快门完成拍照</div>
                        <div style={{display: 'flex',justifyContent: 'space-between',padding:'10px',color:'cadetblue'}}>
                            <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <span>本人证件</span>
                            </div>
                            <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <span>证件原件</span>
                            </div>
                            <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <span>清晰可见</span>
                            </div>
                            <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <span>无遮挡</span>
                            </div>
                        </div>
                        {
                            this.url?
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Button style={{marginTop:'20px',fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{}}>重新拍摄
                                    <input
                                        onChange={this.upload}
                                        style={{opacity: 0,position: 'absolute',right: 0,top: 10}}
                                        type='file'
                                        accept="image/*"
                                        // onImageClick={(index, fs) => console.log(index, fs)}
                                        length={1}
                                        multiple={false}
                                        capture='camera'
                                    />
                                </Button>
                                <Button style={{marginTop:'20px',fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{this.modalstatus=false;this.identify_1=true}}>下一步</Button>
                            </div>
                            :
                            <div>
                                <Button style={{marginTop:'20px',fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{}}>开始拍摄
                                    <input
                                        onChange={this.upload}
                                        style={{opacity: 0,position: 'absolute',right: 0,top: 10}}
                                        type='file'
                                        accept="image/*"
                                        // onImageClick={(index, fs) => console.log(index, fs)}
                                        length={1}
                                        multiple={false}
                                        capture='camera'
                                    />
                                </Button>
                            </div>
                        }
                    </div>
                    
                    </div>
                </Modal>
                <Modal
                    visible={this.identify_1}
                    transparent
                    maskClosable={false}
                    closable
                    onClose={()=>{this.identify_1=false}}
                    title="完善信息"
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { }}
                >
                    <div style={{ height: '100%', overflow: 'scroll' }}>
                    <img
                        src={this.url_1?this.url_1:'identify_demo_1.png'}
                        alt=""
                        style={{ width: '100%', verticalAlign: 'top' ,height:'230px'}}
                    />
                    <div style={{display:'flex',flexDirection:'column',marginTop:'20px' }}>
                        <div style={{color:'black'}}>印度尼西亚手持身份证人像面照片</div>
                        <div style={{fontSize: '12px','marginTop': '20px'}}>拍摄时请务必确保光线充足，请将证件与拍摄框中的高亮区域对齐，并轻按下方快门完成拍照</div>
                        <div style={{display: 'flex',justifyContent: 'space-between',padding:'10px',color:'cadetblue'}}>
                            <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <span>本人证件</span>
                            </div>
                            <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <span>证件原件</span>
                            </div>
                            <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <span>清晰可见</span>
                            </div>
                            <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                                <span>手持无遮挡</span>
                            </div>
                        </div>
                        {
                            this.url_1?
                            <div style={{display:'flex',justifyContent:'space-between'}}>
                                <Button style={{marginTop:'20px',fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{}}>重新拍摄
                                    <input
                                        onChange={this.upload_1}
                                        style={{opacity: 0,position: 'absolute',right: 0,top: 10}}
                                        type='file'
                                        accept="image/*"
                                        // onImageClick={(index, fs) => console.log(index, fs)}
                                        length={1}
                                        multiple={false}
                                        capture='camera'
                                    />
                                </Button>
                                <Button style={{marginTop:'20px',fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{this.identify_1 = false;this.identify_2=true}}>下一步</Button>
                            </div>
                            :
                            <div>
                                <Button style={{marginTop:'20px',fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{}}>开始拍摄
                                    <input
                                        onChange={this.upload_1}
                                        style={{opacity: 0,position: 'absolute',right: 0,top: 10}}
                                        type='file'
                                        accept="image/*"
                                        // onImageClick={(index, fs) => console.log(index, fs)}
                                        length={1}
                                        multiple={false}
                                        capture='camera'
                                    />
                                </Button>
                            </div>
                        }
                    </div>
                    
                    </div>
                </Modal>
                <Modal
                    visible={this.identify_2}
                    transparent
                    maskClosable={false}
                    closable
                    onClose={()=>{this.identify_2=false}}
                    title="完善信息"
                    footer={[{text: '完成', onPress: () => {this.identify_2=false;this.complexed=true}}]}
                    wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                    afterClose={() => { }}
                >
                    <div style={{ height: '100%', overflow: 'scroll' }}>
                        <div style={{textAlign:'initial'}}>姓</div>
                        <InputItem
                            type="text"
                            value={'张'}
                            style={{'height':"80px","fontSize":16}}
                            placeholder=""
                        >
                        </InputItem>
                        <div style={{textAlign:'initial'}}>名</div>
                        <InputItem
                            type="text"
                            value={'三'}
                            style={{'height':"80px","fontSize":16}}
                            placeholder=""
                        >
                        </InputItem>
                        <div style={{textAlign:'initial'}}>证件号码</div>
                        <InputItem
                            type="text"
                            value={"98982228766"}
                            style={{'height':"80px","fontSize":16}}
                            placeholder=""
                        >
                        </InputItem>
                        <div style={{textAlign:'initial'}}>证件有效期</div>
                        <DatePicker
                        mode="date"
                        title="选择日期"
                        extra="选择日期"
                        value={this.huikuan_birthDay}
                        onChange={date => {this.huikuan_birthDay = date}}
                        >
                        <List.Item style={{color:'grey'}} arrow="horizontal"></List.Item>
                        </DatePicker>
                        <div style={{textAlign:'initial'}}>手机号码</div>
                        <InputItem
                            type="phone"
                            value={'151 7788 9988'}
                            style={{'height':"80px","fontSize":16}}
                            placeholder="例如：151 7788 9988"
                        ></InputItem>
                        <div style={{textAlign:'initial'}}>居住地址</div>
                        <InputItem
                            type="text"
                            value={'Weilihuawei 12 Apt 12 Jarkarta 3100'}
                            style={{'height':"80px","fontSize":16}}
                            placeholder="例如 3100"
                        ></InputItem>
                        
                    </div>
                </Modal>
            </div>
        )
    }
};

export default Pay;
