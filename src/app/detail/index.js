import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';
import { PayStore } from './store'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import {Modal, Menu, Button, Steps, InputItem, Picker,List,Card, WingBlank, WhiteSpace} from 'antd-mobile';
import './index.less'
import Myself from '../myself'
import Records from '../records'
import Transfer from '../transfer'

const Step = Steps.Step;
const steps = [{
    title: '选择国家或地区'
  }, {
    title: '填写收款人信息'
  }, {
    title: '确认'
  }].map((s, i) => <Step key={i} title={s.title} description={s.description} />);
const country = [
    {
        value: '1',
        label: 'IDR 印度尼西亚',
    }, {
        value: '2',
        label: 'CNY 中国',
    }, {
        value: '3',
        label: 'USD 美国'
    }, {
        value: '4',
        label: 'CBP 英国'
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

const { Footer, Content } = Layout;
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
    @observable bankchoice = this.props.location.state && this.props.location.state.bankIndex?[this.props.location.state.bankIndex]:[-1]
    @observable activeMenu = 'owner'
    @observable modalstatus = false
    @observable shoukuanren = false
    @observable address = false
    @observable last = false
    @observable showpeople = false
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
        console.log(e.target.id)
        if(e.target.id != this.activeMenu ){
            this.activeMenu = e.target.id
        }
    }

    BankChange = v=>{
        this.bankchoice = v
        this.context.router.push({ pathname: '/money',state: { bankIndex:v[0]}})
        
    }

    Conven_storeChange = v=>{
        this.Conven_storechoice = v
        this.context.router.push({ pathname: '/money',state: { Conven_store:v[0]}})
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

    onRelationshipPickerChange = (val)=>{
        this.relationship = val
    }
    onHuikuanPickerChange = (val)=>{
        this.huikuan = val
    }

    render(){
        return(
            <Layout style={{height:'100%'}}>
            {
                this.activeMenu === "owner" && !this.showpeople?<Content className="add-people">
                   
                    <div  className="active-menu "> 
                        <img  style={{height:'128px'}} src="receivePeople.png"/>
                        <div style={{marginTop:40}}><Button style={{fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{this.modalstatus=true}}>添加收款人</Button></div>
                    </div>
                   
                </Content>
                :
                this.activeMenu === "owner" && this.showpeople?<Content className="add-people">
                    <WingBlank>
                        <Card>
                            <Card.Header
                                title="张三"
                                thumb="card.png"
                                extra={<span style={{fontSize:12}}>商业银行</span>}
                            />
                            <Card.Body>
                                <div>02138********5678</div>
                            </Card.Body>
                            <Card.Footer content="查看信息" extra={<div style={{fontSize:16}} onClick={()=>{this.showOwner=true}}> > </div>} />
                        </Card>
                        <WhiteSpace size="lg" />
                        <Card>
                            <Card.Body style={{ display: 'flex',justifyContent: 'center'}}>
                                <Button style={{fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{this.modalstatus=true}}>添加收款人</Button>
                            </Card.Body>
                        </Card>
                    </WingBlank>
                </Content>
                :
                this.activeMenu === "myself"?
                    <Content className="add-people" style={{justifyContent: 'end',overflow: 'auto'}}>
                        <Myself />
                    </Content>
                :
                this.activeMenu === "money1"?
                    <Content className="add-people" style={{justifyContent: 'end',overflow: 'auto'}}>
                        <Records />
                    </Content>
                :    
                this.activeMenu === "money3"?
                    <Content className="add-people" style={{justifyContent: 'end',overflow: 'auto'}}>
                        <Transfer />
                    </Content>
                :
                null
            }
                <Footer style={{display:'flex',justifyContent:'space-between'}}>
                    <div id='owner' className="active-menu" onClick={e=>this.onChange(e)}> {this.activeMenu!=="owner"?<img id='owner' style={{height:'22px'}} src="owner.png"/>:<img id='owner' style={{height:'22px'}} src="owner2.png"/>}<div id='owner' style={this.activeMenu === "owner"?{color:'black'}:{color:'grey'}}>收款人</div></div>
                    <div id='money1' className="active-menu" onClick={e=>this.onChange(e)}> {this.activeMenu!=="money1"?<img id='money1' style={{height:'22px'}}  src="money1.png"/>:<img id='money1' style={{height:'22px'}} src="money4.png"/>}<div id='money1' style={this.activeMenu ==="money1"?{color:'black'}:{color:'grey'}}>汇款记录</div></div>
                    <div id='money3' className="active-menu" onClick={e=>this.onChange(e)}> {this.activeMenu!=="money3"?<img id='money3' style={{height:'22px'}} src="money3.png"/>:<img id='money3' style={{height:'22px'}} src="money2.png"/>}<div id='money3' style={this.activeMenu ==="money3"?{color:'black'}:{color:'grey'}}>汇款</div></div>
                    <div id='myself' className="active-menu" onClick={e=>this.onChange(e)}>  {this.activeMenu!=="myself"?<img id='myself' style={{height:'22px'}} src="myself.png"/>:<img id='myself' style={{height:'22px'}} src="myself2.png"/>} <div id='myself' style={this.activeMenu ==="myself"?{color:'black'}:{color:'grey'}}>我的</div></div>
                </Footer>
                <Modal
                visible={this.modalstatus}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.modalstatus=false}}
                footer={[{ text: '下一步', onPress: () => {this.modalstatus=false;this.shoukuanren=true} }]}
                title="请选择到帐国家/地区"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                <Menu
                    className="single-foo-menu"
                    data={country}
                    value={['1']}
                    level={1}
                    onChange={()=>{}}
                    height={document.documentElement.clientHeight * 0.6}
                />
                </div>
                </Modal>
                <Modal
                visible={this.shoukuanren}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.shoukuanren=false}}
                footer={[{ text: '上一步', onPress: () => {this.modalstatus=true;this.shoukuanren=false} },{ text: '下一步', onPress: () => {this.shoukuanren=false;this.address=true} }]}
                title="添加收款人信息"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                     <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="收款人姓"
                    >
                    </InputItem>
                    <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="收款人名"
                    >
                    </InputItem>
                    <InputItem
                        type="nubmer"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="银行卡号"
                    >
                    </InputItem>
                    <InputItem
                        type="phone"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="请输入您的手机号"
                    ></InputItem>
                    <Picker data={district2} cols={1}  className="forss" 
                    value={this.relationship}
                    onPickerChange={this.onRelationshipPickerChange}>
                        <List.Item  arrow="horizontal">对方关系</List.Item>
                    </Picker>
                    <Picker data={district} cols={1} className="forss"
                    value={this.huikuan} 
                    onPickerChange={this.onHuikuanPickerChange} >
                        <List.Item arrow="horizontal">汇款用途</List.Item>
                    </Picker>
                </div>
                </Modal>
                <Modal
                visible={this.address}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.address=false}}
                footer={[{ text: '上一步', onPress: () => {this.shoukuanren=true;this.address=false} },{ text: '完成', onPress: () => {this.address=false;this.last=true} }]}
                title="收款人地址"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                     <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="街道地址：例如 Welihawei 12"
                    >
                    </InputItem>
                    <InputItem
                        type="text"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="公寓：例如 Apt12"
                    >
                    </InputItem>
                    <InputItem
                        type="nubmer"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="城市：例如 Jakata"
                    >
                    </InputItem>
                    <InputItem
                        type="phone"
                        style={{'height':"80px","fontSize":16}}
                        placeholder="城市：例如 3100"
                    ></InputItem>
                </div>
                </Modal>
                <Modal
                visible={this.last}
                transparent
                maskClosable={false}
                closable
                onClose={()=>{this.last=false}}
                footer={[{ text: '上一步', onPress: () => {this.address=true;this.last=false} },{ text: '确认', onPress: () => {this.last=false;this.showpeople=true} }]}
                title="请确认收款人信息"
                wrapProps={{ onTouchStart: this.onWrapTouchStart }}
                afterClose={() => { //alert('afterClose'); 
                }}
                >
                <div style={{ height: '100%', overflow: 'scroll' }}>
                <WingBlank size="lg">
                    <WhiteSpace size="lg" />
                    <Card>
                    <Card.Header
                        title="持卡人"
                        thumb="card.png"
                        extra={<span>张三</span>}
                    />
                    <Card.Body>
                        <div>02138********5678</div>
                    </Card.Body>
                    <Card.Footer content="预留手机" extra={<div>15908745601</div>} />
                    </Card>
                    <WhiteSpace size="lg" />
                </WingBlank>
                <WhiteSpace size="lg" />
                <h3>收款人地址</h3>
                <h6>Weilihuawei 12</h6>
                <h6>Apt 12</h6>
                <h6>Jarkarta</h6>
                <h6>3100</h6>
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
                            <Card>
                            <Card.Header
                                title="持卡人"
                                thumb="card.png"
                                extra={<span>张三</span>}
                            />
                            <Card.Body>
                                <div>02138********5678</div>
                            </Card.Body>
                            <Card.Footer content="预留手机" extra={<div>15908745601</div>} />
                            </Card>
                            <WhiteSpace size="lg" />
                        </WingBlank>
                        <WhiteSpace size="lg" />
                        <h3>对方是您：朋友</h3>
                        <h3>汇款用途：礼物</h3>
                        <Button style={{fontSize:16,padding:"0px 10px",color:'white'}} type="primary"  onClick={()=>{this.showOwner=false}}>删除收款人</Button>
                    </div>
                </Modal>
            </Layout>
        )
    }
};

export default Pay;
