const send = require('koa-send')
const Router = require('koa-router')

const staticRouter = new Router({ prefix: '/dist' })

staticRouter.get('/*', async ctx => {
 await send(ctx, ctx.path)
})

module.exports = staticRouter
