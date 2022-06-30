// 引用路由
const Router = require('koa-router')
// 路由实例
const list = new Router()

list.get('/', async (ctx) => {
    ctx.body = 'list首页'
})

list.get('/one', async (ctx) => {
    ctx.body = 'list一'
})

list.get('/two', async (ctx) => {
    ctx.body = 'list二'
})

module.exports = list