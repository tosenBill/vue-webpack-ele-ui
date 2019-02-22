const path = require('path')
const Koa = require('koa')
const consola = require('consola')
const send = require('koa-send')

const staticRouter = require('./routers/static')
// const pageRouter = require('./routers/dev-ssr') // module.exports = router

const app = new Koa()
// const cors = require('koa-cors')

const isDev = process.env.NODE_ENV === 'development'
// app.use(cors())
// app.use((req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header('Access-Control-Allow-Headers', 'X-Requested-With,Content-Type')
// 	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
// 	next()
// })
// 记录服务端的请求，以及抓取的错误
app.use(async (ctx, next) => {
	try {
		// console.log(`request with path ${ctx.path}`)
		await next()
	} catch (err) {
		console.log(err)
		ctx.status = 500
		if (isDev) {
			ctx.body = err.message
		} else {
			ctx.body = 'please try again later'
		}
	}
})

app.use(async (ctx, next) => {
  if (ctx.path === '/favicon.ico') {
    await send(ctx, '/favicon.ico', { root: path.join(__dirname, '../') })
  } else {
    await next()
  }
})

app.use(staticRouter.routes()).use(staticRouter.allowedMethods())

let pageRouter
if (isDev) {
	pageRouter = require('./routers/dev-ssr')
} else {
	pageRouter = require('./routers/ssr')
}

app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3331

app.listen(PORT, HOST)
consola.ready({
	message: `Server listening on http://${HOST}:${PORT}`,
	badge: true
})
