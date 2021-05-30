import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'antd-mobile/dist/antd-mobile.css'
import 'antd/dist/antd.css';
// import 'antd-mobile/dist/antd-mobile.less'
// import App from './App';
import App from './router'
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
