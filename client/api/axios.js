/**
 * Created by VULCAN on 2018/8/8.
 */
import axios from 'axios'
// import { API_HOST } from './host.config'
import _ from 'lodash'

axios.interceptors.request.use(
    config => {
				// config.withCredentials = true // 允许携带token ,这个是解决跨域产生的相关问题
				// config.headers = {
				// 	'Access-Control-Allow-Origin': '*',
				// 	'Access-Control-Allow-Headers': 'X-Requested-With,Content-Type',
				// 	'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS'
				// }
        return config
    },
    error => {
        return Promise.reject(error)
    }
)

axios.interceptors.response.use(
    res => {
        // const _excludeUrl = [`${API_HOST}sys/order/ordersDelivery`]
        // if (res.config && _excludeUrl.includes(res.config.url)) return res
        let _data = null
        if (res.status === 200) {
            _data = res.data
            if (_.isPlainObject(_data) && _data.code) {
                switch (_data.code) {
                    case 1001:
                        window._Vue.$store.dispatch('loginOut')
                        break
                    case 1002: {
                        window._Vue.$message.error(_data.message)
                        _data = null
                        break
                    }
                }
            }
        }
        return _data
    },
    err => {
        switch (err.response.status) {
            case 400:
                break
            case 401: {
                // let _messages = "";
                // if (err.response.data.title === "Unauthorized") {
                //     _messages = "登录失效, 请重新登录";
                // } else {
                //     _messages = err.response.data.message ? err.response.data.message : "登录失效, 请重新登录";
                // }
                // window._Vue.$message.error(_messages);
                // window._Vue.$router.push({ name: "login" });
                // window._Vue.$store.dispatch('setLogin',false);
                break
            }
            case 405:
            case 500:
            default:
                if (err.response.data && err.response.data.message) {
                    window._Vue.$message.error(err.response.data.message)
                } else {
                    window._Vue.$message.error('服务器错误')
                }
                break
        }
        return err.response
    }
)

export default axios
