const ejs = require('ejs')

module.exports = async (ctx, renderer, template) => {
	ctx.headers['Content-Type'] = 'text/html'

	const context = { url: ctx.path }
		console.log('context:    ', context)
	try {
		console.log('111')
		const appString = await renderer.renderToString(context)

		// console.log('appString', appString)

		// const {
    //   title
    // } = context.meta.inject()
		const html = ejs.render(template, {
			appString,
			// title: title.text(),
			style: context.renderStyles(),
			scripts: context.renderScripts()
		})
		console.log('html', html)
		context.body = html
		console.log('context.body-----', context.body)
	} catch (err) {
		console.log('render error', err)
		throw err
	}
}
