/**
 * 此页面用于封装get post update方法
 */
import {service} from '../../utlis/request'
import qs from 'qs'

/**
 * 导出request 用于外面调用
 * @param {String} url 
 * @param {Object} params 
 * @param {String} methods 
 */
export const request =  (url, params, methods) => {
    let method = methods.toLocaleUpperCase()
    if (method == 'GET') {
        return new Promise((resolve, reject) => {
            service.get(url, {params:params})
                .then(res=>{
                    console.log('封装里面的get请求结果：', res)
                    resolve(res)
                })
                .catch(err=>{
                    console.log('err:', err)
                    reject(err)
                })
        })
    } else if (method == 'POST') {
        return new Promise((resolve, reject) => {
            service.post(url, params)
                .then(res=>{
                    console.log('封装里面的post请求结果：', res)
                    resolve(res)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    } else {
        service.headers = {
            'Content-Type': 'multipart/form-data'
        }
        return new Promise((resolve, reject) => {
            service.post(url, params)
                .then(res=>{
                    console.log('封装里面的update请求结果：', res)
                    resolve(res)
                })
                .catch(err=>{
                    reject(err)
                })
        })
    }
}