import Vue from 'vue'

import 'element-ui/lib/theme-chalk/index.css'
// import {Row,Col,Button,Notification,Message} from 'element-ui'  //按需引用element-ui组件
import ElementUI from 'element-ui'
import '../client/assets/css/main.scss'

import axios from 'axios'

import api from 'Api'
import App from './app.vue'
import router from './router/router'
import store from './store/index'
import utils from './utils/index'
// 将element组件内容挂载到Vue上
Vue.use(ElementUI)
// 在引入 Element 时，可以传入一个全局配置对象。
// 该对象目前支持 size 与 zIndex 字段,size 用于改变组件的默认尺寸，zIndex 设置弹框的初始 z-index（默认值：2000）
Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }
// Vue.prototype.$notify = Notification;
// Vue.prototype.$message = Message;

Vue.prototype.$http = axios
Vue.prototype.myApi = api
Vue.prototype.$Utils = utils

const _Vue = new Vue({
	// el: '#app',
	router,
	store,
	render: (h) => h(App)
}).$mount('#app')
window._Vue = _Vue
