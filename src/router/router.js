import Vue from 'vue'
import VueRouter from 'vue-router'

import Layout from '../layout/index.vue'

Vue.use(VueRouter)

const router = [
	{
		path: '',
		name: 'set',
		component: Layout,
		redirect: 'permission',
		children: [
			{
				path: 'permission',
				name: 'set-permission',
				component: () => import('@view/sets/permissionSets.vue')
			},
			{
				path: 'notice',
				name: 'set-notice',
				component: () => import('@view/sets/notices.vue')
			}
		]
	},
	{
		path: '/login',
		component: () => import('@view/start/login.vue')
	},
	{
		path: '/404',
		component: () => import('@view/errorPage/404.vue')
	},
	{
		path: '*', // 其他页面，强制跳转到登录页面
		name: '*',
		redirect: '/404'
	}
]

export default new VueRouter({
	// mode: 'history',
	routes: router
})
