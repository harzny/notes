import {request} from '../utils/request.js'
export function getHistoryList(data){
  return request({
    url:'/lishi/index',
    method:'GET',
    data:data
  })
}