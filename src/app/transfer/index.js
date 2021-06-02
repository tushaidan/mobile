import React from 'react';
import PropTypes from 'prop-types';
import { PayStore } from './store'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Divider,List } from 'antd';
import {Modal, DatePicker, Button, Steps, InputItem, Picker,Card, WingBlank, WhiteSpace} from 'antd-mobile';
import './index.less'
import Money from "../commitMoney";
import Result from '../result'

const country = [
    {
        value: 1,
        label: 'IDR',
    }, {
        value: 2,
        label: 'CNY',
    }, {
        value: 3,
        label: 'USD'
    }, {
        value: 4,
        label: 'CBP'
    }
  ];

  const bank = [
    {
        value: 1,
        label: 'BCA',
    }, {
        value: 2,
        label: 'BNI',
    }, {
        value: 3,
        label: 'BRI'
    }, {
        value: 4,
        label: 'Mandiri'
    }
  ];  

  const district = [{
    label: '学费',
    value: '1',
  },{
    label: '工资',
    value: '2',
  },{
    label: '奖金',
    value: '3',
  },{
    label: '生活费',
    value: '4',
  },{
    label: '医疗',
    value: '5',
  },{
    label: '报销',
    value: '6',
  }]
  const district2 = [{
    label: '老师',
    value: '1',
  },{
    label: '学生',
    value: '2',
  },{
    label: '学校',
    value: '3',
  },{
    label: '父母',
    value: '4',
  },{
    label: '女儿',
    value: '5',
  },{
    label: '亲戚',
    value: '6',
  }]

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
    @observable country = [1]
    @observable bank = ''
    @observable receive = [2]
    @observable money = 0
    @observable modalstatus = false
    @observable shoukuanren = false
    @observable address = false
    @observable address_2 = false
    @observable last = false
    @observable showpeople = false
    @observable showOwner = false
    @observable showResult = false
    @observable huikuan_birthDay = ''


    constructor(props) {
        super(props);
        this.state = {

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

    onCountryPickerChange = (val)=>{
        this.country = val
    }

    onBankPickerChange = (val)=>{
        this.bank = val
    }

    onReceivePickerChange = (val)=>{
        this.receive = val
    }

    BankChange = v=>{
        this.bankchoice = v
        this.context.router.push({ pathname: '/money',state: { bankIndex:v[0]}})
        
    }

    Conven_storeChange = v=>{
        this.Conven_storechoice = v
        this.context.router.push({ pathname: '/money',state: { Conven_store:v[0]}})
    }

    render(){
        return(
            <div style={{margin:"20px 20px"}}>
                <WhiteSpace />
                <div style={{marginTop:"40px",color:"grey",borderRadius:"5px",boxShadow: 'rgb(171 189 189) 0px 0px 5px'}}>
                    <div style={{display: 'flex',justifyContent: 'space-between',margin: '0px 25px',padding:'10px'}}>
                        <div style={{display:'flex',flexDirection: 'column',alignItems: 'baseline'}}>
                            <span>您的汇款</span>
                            <InputItem
                                type="nubmer"
                                style={{'height':"80px","fontSize":16,background:'transparnt'}}
                                placeholder="请输入金额"
                                onChange={value=>{this.money = value}}
                            />
                        </div>
                        <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                        <Picker data={country} cols={1}  className="forss" 
                            value={this.country}
                            onPickerChange={this.onCountryPickerChange}>
                                <List.Item  style={{fontSize:32,color:'blue',border:"1px solid #ccbaba",padding:'0 10px'}} arrow="horizontal"></List.Item>
                        </Picker>
                        </div>
                    </div>
                </div>
                <Divider type="vertical" style={{height:'50px',left:"-3px",borderColor: '#1c64ca'}} orientation={'right'}/>
                <div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between',width: '250px'}}>
                    <div style={{height:'10px',width:'10px',borderRadius:"50%",background:'blue'}}></div>
                    <div>1 IDR = 0.0004482 CNY 实时汇率</div>
                </div>
                <Divider type="vertical" style={{height:'50px',left:"-3px",borderColor: '#1c64ca'}} orientation={'right'}/>
                <div style={{ display: 'flex',alignItems: 'center',justifyContent: 'space-between',width: '175px'}}>
                    <div style={{height:'10px',width:'10px',borderRadius:"50%",background:'blue'}}></div>
                    <div>
                        <span style={{textDecoration: 'line-through'}}>10000 IDR </span>
                        <span>汇率手续费</span>
                    </div>
                </div>
                <Divider type="vertical" style={{height:'50px',left:"-3px",borderColor: '#1c64ca'}} orientation={'right'}/>
                <div style={{   color:"grey",borderRadius:"5px",boxShadow: 'rgb(171 189 189) 0px 0px 5px'}}>
                    <div style={{display: 'flex',justifyContent: 'space-between',margin: '0px 25px',padding:'10px'}}>
                        <div style={{display:'flex',flexDirection: 'column',alignItems: 'baseline',justifyContent:"space-between"}}>
                            <span>他/她 将收到</span>
                            <div style={{    height: '25px'}}>{this.money*0.0004482}</div>
                        </div>
                        <div style={{display:'flex',flexDirection: 'column',alignItems: 'center'}}>
                        <Picker data={country} cols={1}  className="forss" 
                            value={this.receive}
                            onPickerChange={this.onReceivePickerChange}>
                                <List.Item  style={{fontSize:32,color:'blue',border:"1px solid #ccbaba",padding:'0 10px'}} arrow="horizontal"></List.Item>
                            </Picker>
                        </div>
                    </div>
                </div>
                <Button style={{fontSize:16,padding:"0px 10px",color:'white',marginTop:'40px'}} type="primary"  onClick={()=>{this.modalstatus=true}}>开始汇款</Button>
                <Modal
                visible={this.modalstatus}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.modalstatus=false}}
                footer={[{ text: '下一步', onPress: () => {this.modalstatus=false;this.shoukuanren=true} }]}
                title="汇款--当前国家 Indonesia"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%' }}>
                <h6 style={{color:'grey',textAlign:'initial'}}>此平台严格按照法律保证您的信息安全</h6>
                <div style={{textAlign:'initial',marginTop:'20px'}}>汇款人信息(新用户需开户)</div>
                <Card style={{marginTop:'20px'}}>
                    <Card.Body style={{ display: 'flex',justifyContent: 'center'}}>
                        <Button style={{fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{this.modalstatus=false;this.shoukuanren=true}}>汇款人开户</Button>
                    </Card.Body>
                </Card>
                <WhiteSpace size="lg" />
                <div style={{textAlign:'initial'}}>收款人信息</div>
                <Card style={{marginTop:'20px'}}>
                    <Card.Header
                        title="张三"
                        thumb="card.png"
                        extra={<span style={{fontSize:12}}>商业银行</span>}
                    />
                    <Card.Body>
                        <div>02138********5678</div>
                    </Card.Body>
                    <Card.Footer content="选择收款人" extra={<div style={{fontSize:16}} onClick={()=>{this.showOwner=true}}> > </div>} />
                </Card>
                </div>
                </Modal>
                <Modal
                visible={this.shoukuanren}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.shoukuanren=false}}
                footer={[{ text: '上一步', onPress: () => {this.modalstatus=true;this.shoukuanren=false} },{ text: '下一步', onPress: () => {this.shoukuanren=false;this.address=true} }]}
                title="汇款人有效信息填写"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                    <div style={{textAlign:'initial'}}>输入有效身份证上显示的真实姓名</div>
                    <div style={{marginTop:'20px',textAlign:'initial'}}>姓氏</div>
                     <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="例如：Award"
                    >
                    </InputItem>
                    <div style={{textAlign:'initial'}}>名字</div>
                    <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="例如：John"
                    >
                    </InputItem>
                    <div style={{'position':'absolute','bottom':'100px',width:'100%',textAlign:'center',color:'grey'}}>
                        <div style={{fontSize:12}}>
                            为了让我们的平台对所有人都是安全的
                        </div>
                        <div style={{fontSize:12}}>
                            <div>我们需要确认您的身份，您的信息始终保密。</div>
                        </div>
                    </div>
                </div>
                </Modal>
                <Modal
                visible={this.address}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.address=false}}
                footer={[{ text: '上一步', onPress: () => {this.shoukuanren=true;this.address=false} },{ text: '下一步', onPress: () => {this.address=false;this.address_2=true} }]}
                title="汇款人信息"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                <div style={{textAlign:'initial'}}>街道地址</div>
                    <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="例如 Welihawei 12"
                    >
                    </InputItem>
                <div style={{textAlign:'initial'}}>公寓</div>
                    <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="例如 Apt12"
                    >
                    </InputItem>
                <div style={{textAlign:'initial'}}>城市</div>
                    <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="例如 Jakata"
                    >
                    </InputItem>
                <div style={{textAlign:'initial'}}>邮编</div>
                    <InputItem
                        type="number"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="例如 3100"
                    ></InputItem>
                <div style={{textAlign:'initial'}}>手机</div>
                    <InputItem
                        type="phone"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="例如：151 7788 9988"
                    ></InputItem>
                <div style={{textAlign:'initial'}}>出生日期</div>
                <DatePicker
                mode="date"
                title="选择出生日期"
                extra="选择出生日期"
                value={this.huikuan_birthDay}
                onChange={date => {this.huikuan_birthDay = date}}
                >
                <List.Item style={{color:'grey',marginLeft:'20px'}} arrow="horizontal"></List.Item>
                </DatePicker>
                </div>
                </Modal>
                <Modal
                visible={this.address_2}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.address_2=false}}
                footer={[{ text: '上一步', onPress: () => {this.address=true;this.address_2=false} },{ text: '完成', onPress: () => {this.address_2=false;this.last=true} }]}
                title="付款明细"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                    <div style={{textAlign:'initial'}}>银行选择</div>
                    <Picker data={bank} cols={1}
                        title="请选择"
                        value={this.bank}
                        onVisibleChange = {()=>{if(this.bank === ""){this.bank = [1]}}}
                        onPickerChange={this.onBankPickerChange}>
                        <List.Item  style={{fontSize:16,color:'grey'}} arrow="horizontal"> </List.Item>
                    </Picker>
                    <div style={{textAlign:'initial'}}>银行卡上您的姓名</div>
                     <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="例如 John Award"
                    >
                    </InputItem>
                    <div style={{textAlign:'initial'}}>账单地址</div>
                    <div style={{marginTop:'20px',display:'flex',flexDirection:'column',alignItems:'flex-start'}}>
                        <h6>Weilihuawei 12</h6>
                        <h6>Apt 12</h6>
                        <h6>Jarkarta</h6>
                        <h6>3100</h6>
                    </div>
                </div>
                </Modal>
                <Modal
                visible={this.last}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.last=false}}
                footer={[{ text: '上一步', onPress: () => {this.address_2=true;this.last=false} },{ text: '支付完成', onPress: () => {this.last=false;this.showResult=true} }]}
                title="请确认收款人信息"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                 <Money location={{state:{bankIndex:1}}} showTopBar={false}/>
                </div>
                </Modal>
                <Modal
                visible={this.showResult}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.showResult=false}}
                title=""
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                 <Result showTopBar={false} />
                </div>
                </Modal>
                <Modal
                visible={this.showOwner}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.showOwner=false}}
                title="收款人信息"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                    <div style={{ height: '100%', overflow: 'scroll' }}>
                        <WingBlank size="lg">
                            <WhiteSpace size="lg" />
                            <Card style={{marginTop:'20px'}}>
                                <Card.Header
                                    title="张三"
                                    thumb="card.png"
                                    extra={<span style={{fontSize:12}}>商业银行</span>}
                                />
                                <Card.Body>
                                    <div>02138********5678</div>
                                </Card.Body>
                            </Card>
                            <WhiteSpace size="lg" />
                        </WingBlank>
                        <WhiteSpace size="lg" />
                        <Card style={{marginLeft: '15px',marginRight: '15px'}}>
                            <Card.Body style={{ display: 'flex',justifyContent: 'center'}}>
                                <Button style={{fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{this.modalstatus=true}}>添加收款人</Button>
                            </Card.Body>
                        </Card>
                    </div>
                </Modal>
            </div>
        )
    }
};

export default Pay;
