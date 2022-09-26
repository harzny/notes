import {request} from '../utils/my-request.js'
export function queryList(data){
  return request({
    url:'/account',
    method:'POST',
    data
  })
}