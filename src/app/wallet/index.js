import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import {
    Flex, WhiteSpace,Card, NavBar, Icon,Pagination, LocaleProvider, DatePicker, WingBlank,
    Picker, SearchBar,Accordion,List, InputItem,Button
  } from 'antd-mobile';
import { createForm } from 'rc-form';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
class ResultOutPut extends React.Component {
    @observable Rp_Monery = 1120000
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static contextTypes = {
        router: PropTypes.object
    }


    render(){
        const { getFieldProps } = this.props.form;
        return(
            <div className="result">
                <NavBar
                mode="light"
                icon={<Icon type="left" />}
                onLeftClick={() => {
                    this.context.router.push({ pathname: '/pay'})
                } }
                leftContent={"Pay Config"}
                ></NavBar>
                <WhiteSpace size="lg" />
                <WingBlank>
                <Card>
                    <Card.Header
                        title="Informasi pembayaran"
                        extra={<span></span>}
                    />
                    <Card.Footer content={
                        <div>
                            <img style={{width:'120px',height:'40px'}} src="wallet.jpg" />
                        </div>}  />
                    <Card.Footer content="Nomor pesanan" extra={
                            <div>ICZ20200625636190</div>
                        } />
                    <Card.Header
                        title="Nilai Transfer"
                        extra={<span>RP {this.Rp_Monery.toLocaleString()}</span>}
                    />
                </Card>
                <WhiteSpace size="sm" />
                <Card>
                    <List renderHeader={() => 'Nomor OVO'}>
                        <InputItem
                             {...getFieldProps('phone')}
                            type="phone"
                            placeholder="015 1581 3274 6"
                        ></InputItem>
                    </List>
                </Card>
                <WhiteSpace size="lg" />
                <Button type="primary" size="small" onClick={()=>{
                    this.context.router.push({ pathname: '/pay'})
                }}>Bayar</Button>
                </WingBlank>
            </div>
        )
    }
};

export default createForm()(ResultOutPut);
