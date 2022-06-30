// 引用路由
const Router = require("koa-router");
// 路由实例
const login = new Router();

// 处理请求中携带的信息
const bodyParser = require("koa-bodyparser");
login.use(bodyParser());

const jwt = require('jsonwebtoken')

const db = require("../untils/db");

login.post("/register", async (ctx) => {
  // console.log(ctx.request.body) //前端传来的信息
  const { name, password } = ctx.request.body;
  //   判断数据库中是否有该账号，有则验证密码，没有则添加该用户信息
  let sql = `SELECT * FROM user WHERE name='${name}'`;
  let result = await new Promise((resolve, reject) => {
    return db.query(sql, (err, data) => {
      if (err) throw err;
      //   console.log(data)
      if (data.length > 0) {
        resolve(data);
      } else {
        resolve(false);
      }
    });
  });

  if (result) {
    // 能找到对应的账号
    if (result[0].password == password) {
      // 账号密码正确，返回token
      ctx.body = {
        token: result[0],
        msg: "登录成功",
        name: name,
      };
    } else {
      // 密码错误
      ctx.body = {
        msg: "密码错误",
        name: name,
      };
    }
  } else {
    // 数据库无该用户，注册用户
    let result1 = await new Promise((resolve, reject) => {
        // 生成token
        const token = jwt.sign({ name: name, password: password }, 'secret', { expiresIn: 3600 })
        // 插入数据
        return db.query(`INSERT INTO user (name, password, token) values ('${name}', '${password}', '${token}')`, (error, datas) => {
            if (error) throw error;
            // 已插入数据，返回用户名与token
            let obj = {
                token,
                msg: '注册成功',
                name: name
            }
            resolve(obj)
        })
    })
    if (result1) {
        ctx.body = result1;
    }
  }
  //   ctx.response.body = "登录或注册";
});

module.exports = login;
