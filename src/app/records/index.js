import React from 'react';
import PropTypes from 'prop-types';
import { PayStore } from './store'
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { Divider,List,Collapse,Typography } from 'antd';
import './index.less'

const { Panel } = Collapse;
const dingdan = [
    '1: FTYUI0098787.',
    '2: FTYUI0098687.',
    '3: FTYUI0098987.',
]

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
                <h2>汇款记录</h2>
                <Collapse defaultActiveKey={['1']} ghost>
                    <Panel header="进行中的订单" key="1">
                        <List
                        bordered
                        dataSource={dingdan}
                        renderItem={item => (
                            <List.Item actions={[<a key="list-loadmore-edit">查看</a>]}>
                            <Typography.Text mark>[订单]]</Typography.Text> {item}
                            </List.Item>
                        )}
                        />
                    </Panel>
                    <Panel header="已完成的订单" key="2">
                    <List
                        bordered
                        dataSource={dingdan}
                        renderItem={item => (
                            <List.Item actions={[<a key="list-loadmore-edit">查看</a>]}>
                            <Typography.Text mark>[订单]</Typography.Text> {item}
                            </List.Item>
                        )}
                        />
                    </Panel>
                    <Panel header="已失效的订单" key="3">
                    <List
                        bordered
                        dataSource={dingdan}
                        renderItem={item => (
                            <List.Item actions={[<a key="list-loadmore-edit">查看</a>]}>
                            <Typography.Text mark>[订单]</Typography.Text> {item}
                            </List.Item>
                        )}
                        />
                    </Panel>
                </Collapse>,
                {/* <div style={{marginTop:"40px"}}>个人资料信息</div>
                <Divider />
                <div style={{display:'flex',flexDirection:'row',justifyContent:"space-between",alignItems: 'center'}}>
                    <div style={{}}>推荐好友</div>
                </div> */}
            </div>
        )
    }
};

export default Pay;
