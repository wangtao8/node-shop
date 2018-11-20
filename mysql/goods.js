var mysql = require('mysql');

//实现本地链接
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '123456',
    database: 'nideshop'
})

exports.connection = connection
console.log('mysql数据连接成功！！！')
