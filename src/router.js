import React, { Component } from 'react';
import 'babel-polyfill'
import { hashHistory, Redirect, Route, Router, Link } from 'react-router'
import { Pay } from './app/index'
import { Money } from './app/index'
import { Result } from './app/index'
import { Wallet } from './app/index'

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
            <Route path='/'  component={(props) => {
              return (
                <div>{!props.children?<Link style={{lineHeight: 50,textAlign: 'center',position: 'absolute',left: '40%'}} to={'/pay'} > Pembayaran </Link>:null}
                { props.children }</div>
              )
            }}>
              <Route path='/pay' component={Pay} />
              <Route path="/money" component={Money} />
              <Route path="/wallet" component={Wallet} />
              <Route path="/result" component={Result} />
          </Route>
        </Router>
        );
    }
}

export default App;