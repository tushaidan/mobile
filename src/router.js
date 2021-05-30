import React, { Component } from 'react';
import 'babel-polyfill'
import { hashHistory, Redirect, Route, Router, Link } from 'react-router'
import { Pay,Money,Result,Wallet,Cross,Detail,Myself,Records,Transfer } from './app/index'

class App extends Component {
    render() {
        return (
            <Router history={hashHistory}>
            <Route path='/'  component={(props) => {
              return (
                <div style={props.location.pathname === "/"?{'display':'flex','justifyContent':'center','alignItems':'center','height':'100%'}:{'height':'100%'}}>{!props.children?<Link style={{}} to={'/cross'} > 跨境汇款 </Link>:null}
                { props.children }</div>
              )
            }}>
              <Route path='/pay' component={Pay} />
              <Route path="/money" component={Money} />
              <Route path="/wallet" component={Wallet} />
              <Route path="/result" component={Result} />
              <Route path="/cross" component={Cross} />
              <Route path="/detail" component={Detail} />
              <Route path="/myself" component={Myself} />
              <Route path="/records" component={Records} />
              <Route path="/transfer" component={Transfer} />
          </Route>
        </Router>
        );
    }
}

export default App;