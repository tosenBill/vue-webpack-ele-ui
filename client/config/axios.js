
import Host from '@/config/host'

export default ({ $axios, redirect, store, req = {} }) => {
	const token = process.server ? req.token : store.state.token
	if (token) {
		$axios.setHeader('token', token)
	}

	$axios.onRequest(config => {
		const _opt = {
			baseURL: config.url.includes('sys/') ? Host.SYS_API_HOST : Host.API_HOST
		}
		config = { ...config, ..._opt }
		console.log('Making request to ' + config.baseURL + config.url)
		return config
	})
	$axios.onResponse(res => {
		try {
			const { url } = res.config
			if (url.includes('/order/downDeliverResults') || url.includes('/order/export'))	{
				const ContentDisposition = res.headers['content-disposition']
				window.ContentDisposition = ContentDisposition
				console.log(window.ContentDisposition, 'window.ContentDisposition======')
			}
		} catch (error) {
			console.log(error)
		}
		if (res.status === 200) {
			console.log(res, 'res')
			const { data } = res
			switch (data.code) {
				case 1001:
					// const redirectURL = process.server ? Host.DOMAIN_HOST + req.url : window.location.protocol + window.location.host + window.location.pathname + window.location.search
					if (process.server) {
						const redirectURL = Host.DOMAIN_HOST + req.url
						redirect(`${Host.ADMIN_HOST}/passport/login.do?redirectURL=` + redirectURL)
					} else {
						window.location.href = `${Host.ADMIN_HOST}/passport/login.do?redirectURL=` + window.location.href
					}
					break
				case 1002:
					if (!process.server) {
						window._Vue.$message.error(data.message)
					}
					break
			}
			return res
		}
		// const code = parseInt(error.response && error.response.status)
		// if (code === 400) {
		// 	redirect('/400')
		// }
	})
	$axios.onResponseError(error => {
		const code = parseInt(error.response && error.response.status)

		if (!process.server) {
			switch (code) {
				case 400:
					redirect('/400')
					break
					// case 401: {
					// let _messages = "";
					// if (error.response.data.title === "Unauthorized") {
					//     _messages = "登录失效, 请重新登录";
					// } else {
					//     _messages = err.response.data.message ? err.response.data.message : "登录失效, 请重新登录";
					// }
					// window._Vue.$message.error(_messages);
					// window._Vue.$router.push({ name: "login" });
					// window._Vue.$store.dispatch('setLogin',false);
					// break
					// }
				case 405:
				case 500:
				default:
					if (error.response.data && error.response.data.message) {
						window._Vue.$message.error(error.response.data.message)
					} else {
						window._Vue.$message.error('服务器错误')
					}
					break
			}
			return error.response
		}
	})
}
