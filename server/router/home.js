// 引用路由
const Router = require("koa-router");
// 路由实例
const home = new Router();

const db = require("../untils/db");

home.get("/", async (ctx) => {
  // 获取所有用户信息
  let data = await new Promise((resolve, reject) => {
    db.query("select * from user", (err, data) => {
      if (err) reject(err);
      resolve(data); // 返回拿到的数据
    });
  });
  // 返回数据给页面
  ctx.body = data; ////ctx.body 为 ctx.response.body简写
});

module.exports = home;
