const Koa = require('koa')
const send = require('koa-send')
const pageRouter = require('./routers/dev-ssr')
const app = new Koa()
// const cors = require('koa-cors')
const path = require('path')

const isDev = process.env.NODE_ENV === 'development'

// app.use('*', (req, res, next) => {
// 	res.header('Access-Control-Allow-Origin', '*')
// 	res.header('Access-Control-Allow-Headers', 'Content-Type,Content-Length, Authorization, Accept,X-Requested-With')
// 	res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS')
// 	if (req.method === 'OPTIONS') {
// 			res.send(200)
// 	} else {
// 			next()
// 	}
// })
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
		ctx.header['Access-Control-Allow-Origin'] = '*'
		ctx.header['Access-Control-Allow-Headers'] = 'X-Requested-With,Content-Type'
		ctx.header['Access-Control-Allow-Methods'] = 'PUT,POST,GET,DELETE,OPTIONS'
		console.log(ctx.header['Access-Control-Allow-Origin'])
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
app.use(pageRouter.routes()).use(pageRouter.allowedMethods())

const HOST = process.env.HOST || '0.0.0.0'
const PORT = process.env.PORT || 3331

app.listen(PORT, HOST, () => {
	console.log(`server is listening on ${HOST}:${PORT}`)
})
