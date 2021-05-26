import React from 'react';
import PropTypes from 'prop-types';
import './index.less'
import {
    Flex, WhiteSpace,Card, NavBar, Icon,List,Pagination, LocaleProvider, DatePicker, WingBlank, InputItem,
    Picker, SearchBar,Accordion,Button
  } from 'antd-mobile';
import enUS from 'antd-mobile/lib/locale-provider/en_US';
import ruRU from 'antd-mobile/lib/locale-provider/ru_RU';
import { PayStore } from './store'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
// import { View, Button, Linking } from 'react-native';

const PlaceHolder = ({ className = '', ...restProps }) => (
  <div className={`${className} placeholder`} {...restProps}>Block</div>
);
const Item = List.Item;

@observer
class Pay extends React.Component {
    @observable bankchoice = this.props.location.state && this.props.location.state.bankIndex?[this.props.location.state.bankIndex]:[-1]
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
        return(
            <div>
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {this.context.router.push('/')} }
                leftContent={"Pembayaran"}
                ></NavBar>
                <WingBlank>
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
                        <div>
                            {/* <Pagination total={5} current={1} /> */}
                            {/* <SearchBar placeholder="Search" showCancelButton /> */}
                            {/* <InputItem type="money" placeholder="money input" /> */}
                            <WhiteSpace size="lg" />
                            <Card>
                            <Card.Header
                                title="Total Pembayaran"
                                extra={<span></span>}
                            />
                            <Card.Body>
                                <div>IDR {money.toLocaleString()}</div>
                            </Card.Body>
                            <Card.Footer content="Nomor Pesanan:" extra={
                                this.props.store.payResult?
                                    <div>{this.props.store.payResult}</div>
                                    :<div>4471589172558</div>
                                } />
                             <Card.Footer content="Barang:" extra={
                                    <div>Anggota Durian Runtuh</div>
                                } />
                            </Card>
                            <WhiteSpace size="lg" />
                            <span className="wenzi">Pilih cara pembayaran</span>
                            <WhiteSpace size="sm" />
                            <Picker data={Bank} value={this.bankchoice} cols={1} className="forss" onOk={this.BankChange}>
                                <List.Item arrow="horizontal">Bank Transfer</List.Item>
                            </Picker>
                            <WhiteSpace size="sm" />
                            <div style={{ marginTop: 10, marginBottom: 10 }}>
                                <Accordion defaultActiveKey="0" className="my-accordion" onChange={()=>{}}>
                                <Accordion.Panel header="E-wallet">
                                    <List className="my-list">
                                        {/* <List.Item value={1} onClick={e=>{
                                            console.log(e.target.parentNode.parentNode.getAttribute('value'))
                                            this.context.router.push('/money')
                                            }}>DANA</List.Item> */}
                                        <List.Item value={2} onClick={e=>{
                                            console.log(e.target.parentNode.parentNode.getAttribute('value'))
                                            this.context.router.push('/wallet')
                                            }}><img style={{width:'70px',height:'30px'}} src='OVO.png' /></List.Item>
                                        {/* <List.Item value={3} onClick={()=>console.log(1)}>AKULAKU</List.Item> */}
                                    </List>
                                </Accordion.Panel>
                                </Accordion>
                            </div>
                            <WhiteSpace size="sm" />
                            <Picker data={Conven_store} value={-1} cols={1} className="forss" onOk={this.Conven_storeChange}>
                                <List.Item arrow="horizontal">Convenience Store</List.Item>
                            </Picker>
                            <WhiteSpace size="sm" />
                            <Button type="primary" size="small" onClick={this.LinkApp}>Bayar</Button>
                        </div>
                    </LocaleProvider>
                </WingBlank>
            </div>
        )
    }
};

export default Pay;
