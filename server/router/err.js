const Router = require('koa-router')
const err = new Router()

err.get('/', async ctx => {
    ctx.body = '错误请求， 404'
})

module.exports = err