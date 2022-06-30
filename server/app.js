const koa = require('koa2')
// 声明实例
const app = new koa()
const cors = require('koa2-cors')
const port = 9000
// 引入路由文件
const router = require('./router/index')

/* 
app.use() 将给定的中间件添加到此应用程序，此为调用中间件
*/
// 允许跨域
app.use(cors())
/* 
   router.routes() 路由生效，启动路由
   router.allowedMethods() 允许任何请求(get,post, del)
*/
app.use(router.routes(), router.allowedMethods())

app.listen(port, () => console.log(`Example app listening on port ${port}!`))