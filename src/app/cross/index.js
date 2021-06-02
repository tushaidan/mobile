import React from 'react';
import PropTypes from 'prop-types';
import { AuthingGuard } from '@authing/react-ui-components'
import '@authing/react-ui-components/lib/index.min.css'
import {
    Flex, WhiteSpace,Card, NavBar, Icon,List,Pagination, LocaleProvider, DatePicker, WingBlank, InputItem,
    Picker, SearchBar,Accordion,Button
  } from 'antd-mobile';
import { createForm } from 'rc-form';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import ruRU from 'antd-mobile/lib/locale-provider/ru_RU';
import { PayStore } from './store'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import './index.less'
// import { View, Button, Linking } from 'react-native';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);
const Item = List.Item;

@observer
class Pay extends React.Component {
    appId = 'AUTHING_APP_ID'
    @observable bankchoice = this.props.location.state && this.props.location.state.bankIndex?[this.props.location.state.bankIndex]:[-1]
    @observable signIn = false
    @observable phoneSignIn = false
    @observable showLoading = false
    @observable showTimes = false
    @observable showTimes_times = 60
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

    onLogin = () => {
      this.showLoading = true
      setTimeout(()=>{
        this.signIn = true
        this.showLoading = false
      },1000)
    }

    onLoginPhone = ()=>{
      this.phoneSignIn = !this.phoneSignIn
    }

    onChange = (value) => {
    this.setState({
        locale: value[0],
    });
    }

    BankChange = v=>{
        this.bankchoice = v
        this.context.router.push({ pathname: '/money',state: { bankIndex:v[0]}})
        
    }

    Conven_storeChange = v=>{
        this.Conven_storechoice = v
        this.context.router.push({ pathname: '/money',state: { Conven_store:v[0]}})
    }

    linktoDetail = ()=>{
        this.context.router.push({ pathname: '/detail',state: { bankIndex:1}})
    }
    
    LinkApp = ()=>{
        // 在调起其他app或者本机应用前先检查是否已经安装：
        // Linking.canOpenURL('weixin://').then(supported => {
        //     if (!supported) {
        //     console.log('无法处理该URL：' + "weixin://");
        //     } else {
        //     return Linking.openURL('weixin://');
        //     }
        // }).catch(err => console.error('错误：', err));
        // window.open('weixin://')
        // window.location.href = "weixin://"        
            // QQ: mqq:// 
            // 微信: weixin:// 
            // 新浪微博: weibo:// (sinaweibo://) 
            // 腾讯微博: tencentweibo:// 
            // 淘宝: taobao:// 
            // 支付宝: alipay:// 
            // 美团: imeituan:// 
            // 知乎: zhihu:// 
            // 优酷: youku://
        window.location.href = "taobao://"
    }

    viliden = (e)=>{
      if(this.showTimes === true){
        return
      }
      document.getElementById('viliden').style.color = 'grey';
      this.showTimes = true
      var ruenThread = setInterval(()=>{
        this.showTimes_times --
        if(this.showTimes_times === 0 ){
          clearInterval(ruenThread)
          this.showTimes = false
          this.showTimes_times = 60
          document.getElementById('viliden').style.color = 'blue';
        }
      },1000)
    }

    render(){
        const colorStyle = {
            display: 'inline-block',
            verticalAlign: 'middle',
            width: '16px',
            height: '16px',
            marginRight: '10px',
          };
        const { locale,money } = this.state;
        const languages = [
            {
                value: '中国',
                label: '中国',
                language: undefined,
            },
            {
                value: 'English',
                label: 'English',
                language: enUS,
            },
            {
                value: 'Русский',
            label: 'Русский',
            language: ruRU,
        },
        ];
        const Conven_store = [
            {
                value: 1,
                label: (<div>
                   <img style={{width:'120px',height:'40px'}} src="Alfamart.png" />
                  </div>)
            }
        ]
        const Bank = [
            {
                value: 1,
                label: (<div>
                    <span
                      style={{ ...colorStyle, backgroundColor: '#0000FF' }}
                    />
                    <span>Permata</span>
                  </div>)
            },
            {
                value: 2,
                label: (<div>
                    <span
                      style={{ ...colorStyle, backgroundColor: '#0000FF' }}
                    />
                    <span>Maybank</span>
                  </div>),
            },
            {
                value: 3,
                label: (<div>
                    <span
                      style={{ ...colorStyle, backgroundColor: '#0000FF' }}
                    />
                    <span>Mandiri</span>
                  </div>),
            },
            {
                value: 4,
                label: (<div>
                    <span
                      style={{ ...colorStyle, backgroundColor: '#0000FF' }}
                    />
                    <span>BNI</span>
                  </div>),
            },
            {
                value: 5,
                label: (<div>
                    <span
                      style={{ ...colorStyle, backgroundColor: '#0000FF' }}
                    />
                    <span>CIMB</span>
                  </div>),
            },
            {
                value: 6,
                label: (<div>
                    <span
                      style={{ ...colorStyle, backgroundColor: '#0000FF' }}
                    />
                    <span>BRI</span>
                  </div>),
            },
        ];
        const currentLocale = languages.find(item => item.value === locale).language;
        const { getFieldProps } = this.props.form;
        return(
            <div style={{'height':'100%'}}>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                style={{'display':"block"}}
                onLeftClick={() => {this.context.router.push('/')} }
                leftContent={"跨境汇款 v1.0"}
                ></NavBar>
                <WingBlank style={{'height':'100%'}}>
                    {/* <div className="language">
                        <Picker
                            data={languages}
                            onChange={this.onChange}
                            cols={1}
                            value={[locale]}
                            itemStyle={{width:10,color:'black'}}
                            indicatorStyle={{width:10,color:'black'}}
                            >
                            <List.Item arrow="down"></List.Item>
                        </Picker>
                    </div> */}
                    <LocaleProvider locale={currentLocale}>
                        {
                          !this.signIn?
                        <div style={{'height':'100%'}}>
                            {/* <Pagination total={5} current={1} /> */}
                            {/* <SearchBar placeholder="Search" showCancelButton /> */}
                            {/* <InputItem type="money" placeholder="money input" /> */}
                            <WhiteSpace size="lg" />
                                {!this.phoneSignIn?<div style={{'fontSize':'32px','color':'grey','display':'flex','justifyContent':'left'}}>Hi~ 等NI好久了</div>
                                :<div style={{'fontSize':'32px','color':'grey','display':'center','justifyContent':'center'}}>欢迎登录</div>}
                            <WhiteSpace size="lg" />
                            {
                              !this.phoneSignIn? 
                                <List renderHeader={() => '邮箱'}>
                                  <InputItem
                                      {...getFieldProps('inputtitle2')}
                                      style={{'height':"80px","fontSize":12}}
                                      placeholder="请输入邮箱信息"
                                  >
                                      <div style={{ backgroundImage: 'url(men.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                                  </InputItem>
                                </List>:
                                <InputItem
                                  type="phone"
                                  placeholder="请输入您的手机号"
                                >+<input type="text" value="62"  style={{width:'30px',borderWidth:'0px'}}/></InputItem>
                            }
                           
                            {!this.phoneSignIn && 
                              <List renderHeader={() => '密码'}>
                              <InputItem
                                      {...getFieldProps('password')}
                                      type="password"
                                      style={{'height':"80px","fontSize":12}}
                                      placeholder="请输入密码信息"
                                  >
                                      <div style={{ backgroundImage: 'url(password.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                                  </InputItem>
                              </List>
                            }
                            { this.phoneSignIn && 
                              <div>
                                <WhiteSpace size="lg" />
                                <WhiteSpace size="lg" />
                                  <input style={{color:' #000',fontSize:' 17px',appearance:' none',padding:' 2px 0',border:' 0',backgroundColor:' transparent',lineHeight:' 1',boxSizing:' border-box',borderBottom: '1px solid grey'}} type="text" placeholder="请输入6位验证码"/>
                                  <div id='viliden' className='viliden' style={{border:0,color:'blue',background:'transparent',display: 'inline-block'}} onClick={this.viliden} > 获取验证码 {this.showTimes && this.showTimes_times}</div>
                              </div>
                            }
                            <WhiteSpace size="lg" />
                            <div style={{'width':'100%',marginTop:'20px'}}>
                              <Button type="primary" style={{color:'white'}} loading={this.showLoading}  onClick={this.onLogin}>登 录</Button><WhiteSpace />
                                {/* <Button type="ghost" inline style={{ marginRight: '4px' }} size="small" className="am-button-borderfix" onClick={this.LinkApp}>登  录</Button> */}
                            </div>
                            <div style={{'display':'flex','justifyContent':'space-between','alignItems':'left',color:'grey',marginTop:"20px"}}>
                                <div style={{'display':'flex','justifyContent':'center','alignItems':'center'}}>
                                  {this.phoneSignIn?<img src="mail.png"/>:<img src="phone.png"/>}<span style={{marginLeft:'5px'}} onClick={this.onLoginPhone}>{this.phoneSignIn?"邮箱登录":"手机登入"}</span>
                                </div>
                                {!this.phoneSignIn && <p style={{color:'#1480cf'}}>忘记密码</p>}
                            </div>
                            <WhiteSpace size="lg" />
                            <WhiteSpace size="lg" />
                            <div style={{'position':'absolute','bottom':'20px',width:'100%',textAlign:'center',right:'0px',color:'grey'}}>
                                <div style={{}}>
                                    登录/注册即代表您同意《使用条款》《隐私协议》
                                </div>
                                <div style={{}}>
                                    <div>首次登录后自动注册</div>
                                </div>
                            </div>
                      </div>
                      :
                      <div style={{'height':'100%'}}>
                            {/* <Pagination total={5} current={1} /> */}
                            {/* <SearchBar placeholder="Search" showCancelButton /> */}
                            {/* <InputItem type="money" placeholder="money input" /> */}
                            <WhiteSpace size="lg" />
                                <div style={{'fontSize':'32px','color':'grey','display':'flex','justifyContent':'left'}}>设置登录密码</div>
                                <h6 style={{color:'grey'}}>为了保障账户安全，请设置登录密码</h6>
                            <WhiteSpace size="lg" />
                            <List renderHeader={() => '登入密码'}>
                              <InputItem
                                    {...getFieldProps('password_1')}
                                    type="password"
                                    style={{'height':"80px",width:"100%","fontSize":12}}
                                    placeholder="请输入6~16位新密码（数字+英文组合）"
                                >
                                    <div style={{ backgroundImage: 'url(password.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                                </InputItem>
                            </List>
                            <List renderHeader={() => '确认密码'}>
                            <InputItem
                                    {...getFieldProps('password_2')}
                                    type="password"
                                    style={{'height':"80px","fontSize":12}}
                                    placeholder="请输入密码信息"
                                >
                                    <div style={{ backgroundImage: 'url(password.png)', backgroundSize: 'cover', height: '22px', width: '22px' }} />
                                </InputItem>
                            </List>
                            <WhiteSpace size="lg" />
                            <div style={{'width':'100%',marginTop:'20px'}}>
                              <Button type="primary" style={{color:'white'}} onClick={this.linktoDetail}>确 定</Button><WhiteSpace />
                                {/* <Button type="ghost" inline style={{ marginRight: '4px' }} size="small" className="am-button-borderfix" onClick={this.LinkApp}>登  录</Button> */}
                            </div>
                            
                      </div>}
                    </LocaleProvider>
                </WingBlank>
            </div>
        )
    }
};

const PayWrapper = createForm()(Pay);

export default PayWrapper;
