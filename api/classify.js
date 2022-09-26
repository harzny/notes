import {request} from '../utils/my-request.js'
export function create(data){
  return request({
    url:'/classify',
    method:'POST',
    data
  })
}
export function queryList(){
  return request({
    url:'/classify',
    method:'GET',
  })
}
export function update(data){
  return request({
    url:'/classify',
    method:'PUT',
    data
  })
}

export function deleteById(classifyId){
  return request({
    url:'/classify/'+classifyId,
    method:'Delete',
  })
}
