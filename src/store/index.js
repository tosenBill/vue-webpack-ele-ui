import Vue from 'vue'
import Vuex from 'vuex'

import state from './states'
import mutations from './mutations'
import actions from './actions'
import getters from './getters'
Vue.use(Vuex)

export default () => {
	const store = new Vuex.Store({
		strict: process.env.NODE_ENV === 'development', // 不可全局修改state
		state,
		getters,
		mutations,
		actions
	})
	// 热更替
	if (module.hot) {
		module.hot.accept([
			'./states',
			'./mutations',
			'./actions',
			'./getters'
		], () => {
			const newState = require('./states').default
			const newMutations = require('./mutations').default
			const newActions = require('./actions').default
			const newGetters = require('./getters').default

			store.hotUpdate({
				state: newState,
				mutations: newMutations,
				actions: newActions,
				getters: newGetters
			})
		})
	}
	return store
}
