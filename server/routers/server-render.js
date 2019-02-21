const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
	ctx.headers['Content-Type'] = 'text/html'
	// ctx.headers['Access-Control-Allow-Origin'] = '*'
	const context = { url: ctx.path }
	try {
		const appString = await renderer.renderToString(context)

		// if (context.router.currentRoute.fullPath !== ctx.path) {
    //   return ctx.redirect(context.router.currentRoute.fullPath)
    // }

		// const {
    //   title
    // } = context.meta.inject()
		const html = ejs.render(template, {
			appString,
			// title: title.text(),
			style: context.renderStyles(),
			scripts: context.renderScripts()
		})
		ctx.body = html
	} catch (err) {
		console.log('render error1', err)
		throw err
	}
}
