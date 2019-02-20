import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'

import App from './app.vue'
import router from './router/router'
import store from './store/index'

// import '../client/assets/css/main.scss'

Vue.use(VueRouter)
Vue.use(Vuex)

export default () => {
	const app = new Vue({
		router,
		store,
		render: h => h(App)
	})
	return { app, router, store }
}
