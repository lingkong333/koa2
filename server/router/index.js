// 引用路由
const Router = require('koa-router')
// 路由实例
const router = new Router()
const list = require('./list')
const home = require('./home')
const err = require('./err')
const login = require('./login')


// router.get('/home', async (ctx) => {
//     // 返回数据给页面
//    ctx.body = '首页' ////ctx.body 为 ctx.response.body简写
// })

/* router.get('/list', async (ctx) => {
   ctx.body = '列表'
}) */

// 其为list实例，所以写为list.routes(), list.allowedMethods()
router.use('/list', list.routes(), list.allowedMethods())
router.use('/home', home.routes(), home.allowedMethods())
router.use('/login', login.routes(), login.allowedMethods())
// 路由重定向
router.redirect('/', '/home');

module.exports = router