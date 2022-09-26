import {request} from '../utils/my-request.js'
export function register(data){
  return request({
    url:'/user/register',
    method:'POST',
    data
  })
}

export function loginer(data){
  return request({
    url:'/user/login',
    method:'POST',
    data
  })
}
export function getUserInfo(){
  return request({
    url:'/user',
    method:'GET',
  })
}

export function setEncryption(data){
  return request({
    url:'/user/encryption',
    method:'POST',
    data
  })
}

export function verifyEncryption(data){
  return request({
    url:'/user/verify',
    method:'POST',
    data
  })
}