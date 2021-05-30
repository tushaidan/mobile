import React from 'react';
import PropTypes from 'prop-types';
import './index.css'
import {
    Result,Icon,NavBar
  } from 'antd-mobile';

const myImg = src => <img src={src} className="spe am-icon am-icon-md" style={{width:60,height:60}} alt="" />;

class ResultOutPut extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };
    }

    static contextTypes = {
        router: PropTypes.object
    }


    render(){
        return(
            <div className="result">
                {
                    this.props.showTopBar === false?null:<NavBar
                    mode="light"
                    icon={<Icon type="left" />}
                    onLeftClick={() => {
                        this.context.router.push({ pathname: '/money',state: { bankIndex:this.props.location.state.bankIndex}})
                    } }
                    leftContent={"Pay Config"}
                    ></NavBar>
                }                
                 <Result
                        img={myImg('https://gw.alipayobjects.com/zos/rmsportal/pdFARIqkrKEGVVEwotFe.svg')}
                        title="支付成功"
                        message={<div>998.00元</div>}
                    />
            </div>
        )
    }
};

export default ResultOutPut;
