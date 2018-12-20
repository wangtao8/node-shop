var http = require('http');
var fs = require('fs');
var exec = require('child_process').exec;
var server = http.createServer().listen(8888);//创建http服务
console.log('Server running ');
var io = require('socket.io').listen(server);
io.sockets.on('connection', (socket) => {
    console.log('连接成功！！！')
    socket.on('test', (data) => {
        socket.broadcast.emit('test', {//给除了自己以外的客户端广播消息
            nickname: data.nickName,
            id: socket.id,
            massage: data.val,
        });
    });
});