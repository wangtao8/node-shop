import axios from 'axios'

export const service = axios.create({
    // baseURL: process.env.BASE_API,
    //baseURL: '/api',//如果配置了baseURL 那么会在请求的url最前面默认加上代表的内容 比如/api 代表http://127.0.0.1:3000, 请求中axios.get('/test') === axios.get('http://127.0.0.1:3000/test')
    timeout: 1000*60,
    headers: {'content-Type': 'application/x-www-form-urlencoded'}
})

// request interceptor
service.interceptors.request.use(
    config => {
      config.headers.token = '12313213'
      console.log('config:', config)
      //判断token是否生效
      return config
    },
    error => {
      console.log(error) // for debug
      Promise.reject(error)
    }
  )
  
  //响应拦截器即异常处理
service.interceptors.response.use(response => {
    console.log('拦截器里面请求成功：', response)
    return response
}, err => {
    console.log('请求失败:', err.response.status)
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.response.message = '错误请求'
          break;
        case 401:
          err.response.message = '未授权，请重新登录'
          break;
        case 403:
          err.response.message = '拒绝访问'
          break;
        case 404:
          err.response.message = '请求错误,未找到该资源'
          break;
        case 405:
          err.response.message = '请求方法未允许'
          break;
        case 408:
          err.response.message = '请求超时'
          break;
        case 500:
          err.response.message = '服务器端出错'
          // router.replace('/index')//跟 router.push 很像，唯一的不同就是，它不会向 history 添加新记录，而是跟它的方法名一样 —— 替换掉当前的 history 记录
          break;
        case 501:
          err.response.message = '网络未实现'
          break;
        case 502:
          err.response.message = '网络错误'
          break;
        case 503:
          err.response.message = '服务不可用'
          break;
        case 504:
          err.response.message = '网络超时'
          break;
        case 505:
          err.response.message = 'http版本不支持该请求'
          break;
        default:
          err.response.message = `连接错误${err.response.status}`
      }
    } else {
      err.response.message = "连接到服务器失败"
    }
      console.log('err:', err.response)
      return Promise.resolve(err.response)
})