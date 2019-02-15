export default {
	getLogin (data) {
		return this.post({
			url: this.ROOT_PATH + 'user/authenticate',
			data: data
		})
	},
	register () {
		return this.ROOT_PATH + 'user/register'
	}
}
