import React from 'react';
import PropTypes from 'prop-types';
import { PayStore } from './store'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Button } from 'antd-mobile'
import { Divider } from 'antd';
import './index.less'


@observer
class Pay extends React.Component {
    @observable bankchoice = this.props.location.state && this.props.location.state.bankIndex?[this.props.location.state.bankIndex]:[-1]
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
                <div style={{marginTop:"40px"}}>个人资料信息</div>
                <Divider />
                <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between",alignItems: 'center'}}>
                    <div style={{}}>推荐好友</div>
                    <Button style={{fontSize:16,width: '100px',height: '32px',lineHeight: '32px',color:'white'}} type="primary" >邀 请</Button>
                </div>
            </div>
        )
    }
};

export default Pay;
