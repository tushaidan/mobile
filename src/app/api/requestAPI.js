import axios from 'axios'
import { Toast } from 'antd-mobile';

// 防止提醒错误，出来许多
let notificationTimer = null
function checkStatus (response) {
  if (response.status >= 200 && response.status < 300) {
    return [response, false]
  }
  const error = new Error(response.statusText)
  error.response = response
  throw error
}
function catchError (error) {
  let messageInfo;
  if (!error.response) {
    messageInfo  = error.toString()
  }else{
    switch (error.response.status) {
      case 400:
      case 436:
        let text = error.response.data.message || error.response.statusText || "error"
        if(text.indexOf("Custom metrics must be relate with a script!") > -1){
          messageInfo = "error"
        } else if(text.indexOf("must be relate with metricItem or trigger!") > -1){
          messageInfo = "error"
        } else {
          messageInfo = text;
        }
        break
      case 401:
      case 403:
      //   stores.globalStore.clearLoginStatus()
        messageInfo = error.response.data.message || "error"
        try{
          window.top.location.href = window.top.location.href + '/tenant/#/login_admin/'
        }catch(e){
          window.location.href = window.location.href + '/tenant/#/login_admin/'
        }
        break
      case 404:
        messageInfo = error.response.data.message || "error"
        break
      case 500:
        let errorText = error.response.data.message || error.response.statusText
        if(errorText.indexOf("Custom metrics must be relate with a script!") > -1){
          messageInfo = "error"
        } else if(errorText.indexOf("must be relate with metricItem or trigger!") > -1){
          messageInfo = "error"
        } else {
          messageInfo = errorText;
        }
        break
      case 502:
      case 503:
      case 504:
        messageInfo = "error"
        break
      default:
        messageInfo = error.response.data.message
        break
    }
  }
  clearTimeout(notificationTimer)
  notificationTimer = setTimeout(() => {
    Toast.fail(messageInfo, 3)
  }, 300)
  if(!error.response){
    return [{ data: null }, true]
  }else{
    return error.response.data
      ? [error.response.data, true]
      : [{ data: null }, true]
  }
}
const request = axios.create({
  baseURL: '',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=utf-8',
    //IE浏览器get请求直接拿缓存数据
    'Cache-Control': 'no-cache',
    'Pragma': 'no-cache',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/83.0.4103.106 Safari/537.36'
  }
})

request.interceptors.request.use(config => { 
  config.params = {
     ...config.params,
    _: Date.now() // 时间戳
 }
 return config

})
request.interceptors.response.use(checkStatus, catchError)
request.interceptors.response.use(([res, err]) => {
  if(res.data && res.data.code){
    let error; 
    let ownErr = typeof res.data.code === "string" && res.data.code.indexOf("BAT-") > -1;
    if(!(res.data.code >= 200 && res.data.code < 300)){
      error = {response:{status: res.data.code, data: {message:res.data.message}}}
    }
    if(ownErr){
      error = undefined;
    }
    if(error){
      catchError(error);
    }
    return {data: res.data.data, err: error, code: res.data.code}
  }
  if(err){
    return { data: res.data, err: res, code: res.code }
  }
  return { data: res.data, err: err, code: res.code }
})

export default request