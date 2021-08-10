// Ajax请求函数模块
// promise对象最终返回的是response.data数据，不是response
import axios from "axios";
export default
    function ajax(url = '', data = {}, type = 'GET') {
    return new Promise((resolve, reject) => {

        //1. 使用axios执行异步ajax请求
        let promise
        if (type === 'GET') {
            // 准备url query参数数据
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {//遍历：data对象里面的属性名数组
                dataStr += key + '=' + data[key] + '&'
                // dataStr+=`${key}=${data[key]}&`
            })
            if (dataStr !== '') {
                // str.substring(n,m)  从索引n开始，截取到索引为m处（不包含m），把找到的部分截取
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            // 发送get请求
            promise = axios.get(url)
        } else {
            // 发送post请求
            promise = axios.post(url, data)
        }

        // 这是上面异步操作的promise对象，成功和失败后的操作
        promise.then(function (response) {
            //2. 成功了调用resolve()    上面的axios返回的是response，最终需要data数据
            resolve(response.data)
        })
            .catch(function (error) {
                //3. 失败了调用reject()
                reject(error)
            })



    })
}