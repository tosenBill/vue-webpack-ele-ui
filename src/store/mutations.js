import * as types from './type'
const mutations = {
	[types.SET_USER_INFO](state, data) {
		state.userInfo = data
	},
	[types.OPEN_SLIDER](state) {
		state.sidebar = !state.sidebar
	}
}
export default mutations
