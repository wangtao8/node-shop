/**
 * 此页面用于封装所有api请求地址
 */
class AllApi {
    constructor(){
        this.Test = 'api/test'//测试get请求
        this.PostTest = 'api/postTest'//测试post请求
    }
}

export const Api = new AllApi()