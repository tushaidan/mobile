import request from './requestAPI';

const baseURL = "";

/**
 * 获取 支付 列表
 * @param { source,severity,keywords,status }
 * {"source": [ "d8f5144fab7f40a5befdf724f70d63db"],"severity": [    "3"],"status": [    "0"],"keyWordsType": "1","keyWords": "xx","ownerId": [],"pageSize": 40,"currentPage": 1,"orderBy": "lastOccurTime","orderType": 0}
 */
export function getPayList (params) {
  return request.post('/api/v2/frontline/queryFrontLineAlertList', params)
}

/**
 * 获取支付信息
 */
export function getPaySource() {
  return request.get('https://y.qq.com/download/download.js?format=jsonp&g_tk_new_20200303=5381&jsonpCallback=MusicJsonCallback&loginUin=0&hostUin=0&format=jsonp&inCharset=utf8&outCharset=utf-8&notice=0&platform=yqq&needNewCode=0')
}
