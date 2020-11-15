/**
 * axios 配置
 */
import axios from 'axios'
import { Message } from 'element-ui'
import { urls } from '@/utils/apiUrl'
const service = axios.create({
  baseURL: urls.baseUrl,
  timeout: 5000
})

service.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
// 设置全局的请求次数，请求的间隙
service.defaults.retry = 1
service.defaults.retryDelay = 500
// http request 拦截器
service.interceptors.request.use(
  config => {
    return config
  },
  err => {
    return Promise.reject(err)
  })

// http response 拦截器
service.interceptors.response.use(
  response => {
    // console.log('response', response)
    // 手机端展示的时候去掉message弹窗提示
    if (response.data.code != 200) {
      Message({
        type: 'error',
        message: response.data.message,
        showClose: true
      })
    }
    return response
  },
  error => {
    var config = error.config
    // If config does not exist or the retry option is not set, reject
    if (!config || !config.retry) return Promise.reject(error)

    // Set the variable for keeping track of the retry count
    config.__retryCount = config.__retryCount || 0

    // Check if we've maxed out the total number of retries
    if (config.__retryCount >= config.retry) {
      // Reject with the error
      Message({
        type: 'error',
        message: error,
        showClose: true
      })
      console.log(error, 'error') // console : Error: Request failed with status code 402
      return Promise.reject(error)
    }

    // Increase the retry count
    config.__retryCount += 1

    // Create new promise to handle exponential backoff
    var backoff = new Promise(function (resolve) {
      setTimeout(function () {
        resolve()
      }, config.retryDelay || 1)
    })

    // Return the promise in which recalls axios to retry the request
    return backoff.then(function () {
      return service(config)
    })
  })

export default service
