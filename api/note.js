import {request} from '../utils/my-request.js'
export function create(data){
  return request({
    url:'/note',
    method:'POST',
    data
  })
}
export function queryList(data){
  return request({
    url:'/note',
    method:'GET',
    data
  })
}
export function queryById(noteId){
  return request({
    url:'/note/'+noteId,
    method:'GET',
  })
}

export function update(data){
  return request({
    url:'/note',
    method:'PUT',
    data
  })
}

export function deleteById(noteId){
  return request({
    url:'/note/'+noteId,
    method:'Delete',
  })
}
export function recoverDeleted(noteId){
  return request({
    url:'/note/recoverDeleted/'+noteId,
    method:'POST',
  })
}
export function setTop(data){
  return request({
    url:'/note/setTop',
    method:'POST',
    data
  })
}

export function verifyNoteEncryption(data){
  return request({
    url:'/note/verify',
    method:'POST',
    data
  })
}

export function setClassify(data){
  return request({
    url:'/note/setClassify',
    method:'POST',
    data
  })
}
export function queryEncryption() {
  return request({
    url: '/note/queryEncryption',
    method: 'Get',
  })
}

export function queryDeleteList(data) {
  return request ({
    url:'/note/queryDeleteList',
    method:'GET',
    data
  })
}
