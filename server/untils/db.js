const mysql = require('mysql')
// 连接池
const pool = mysql.createPool({
    host: 'localhost', // 链接的服务器
    port: '3306', //端口号
    database: 'koa2', //数据库名称
    user: 'koa2',
    password: '123456'
})

//对数据库进行增删改查操作的基础
function query(sql,callback){
    pool.getConnection(function(err,connection){
        connection.query(sql, function (err,rows) {
            callback(err,rows)
            connection.release() // 中断连接
        })
    })
}

exports.query = query;