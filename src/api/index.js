import service from '@/axios'
import qs from 'qs'
import { urls } from '@/utils/apiUrl.js'

// get方法
export function getData (val) {
  return service({
    method: val.apiMethod,
    url: val.apiUrl,
    params: val.params,
    headers: val.headers
  })
}

// post方法
export function postData (val) {
  return service({
    method: val.apiMethod,
    url: val.apiUrl,
    data: val.params,
    headers: val.headers
  })
}
