
export default {
	setCookie (key, value, t) {
		const oDate = new Date()
		oDate.setTime(oDate.getTime() + (t * 24 * 60 * 60 * 1000))
		document.cookie = key + '=' + encodeURI(value) + ';expires=' + oDate.toUTCString()
	},
	/**
     *
     * @desc 根据key读取cookie
     * @param  {String} name
     * @return {String}
	*/
	getCookie (key) {
		const cookieArr = document.cookie.split('; ')
		for (let i = 0; i < cookieArr.length; i++) {
			const arr1 = document.cookie.split('; ')// 由于cookie是通过一个分号+空格的形式串联起来的，所以这里需要先按分号空格截断,变成[name=Jack,pwd=123456,age=22]数组类型；

			for (let j = 0; j < arr1.length; j++) {
				const arr2 = arr1[j].split('=')// 通过=截断，把name=Jack截断成[name,Jack]数组；
				if (arr2[0] === key) {
					return decodeURI(arr2[1])
				}
			}
		}
		return ''
	},
	/**
	 *
	 * @desc 根据key删除cookie
	 * @param  {String} key
	*/
   removeCookie (key) {
			// 设置已过期，系统会立刻删除cookie
			document.cookie = '_USER_COOKIE=; expires=Mon, 11 Nov 1990 00:00:00 GMT;path=/'
	}
}
