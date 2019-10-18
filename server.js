var express = require('express')
var app = express()

// 用http模块创建server
var server = require('http').createServer(app)
// 创建服务端socket
var io=require('socket.io')(server)

var userNo = 0   // 用户ID，模拟用户名

// 监听客户端的socket连接
io.on('connect', function(socket) {
  // socket代表当前来请求连接的用户
  var user = (++userNo)
  console.log(user + ': -++++++++++++++++++++++++上来了')

  // 监听socket连接断开事件
  socket.on('disconnect', function() {
    console.log(user + ': ------------下线了')
  })

  // 监听客户端的消息，事件名可以自定义，接收客户端消息，并把消息发送给客户端
  socket.on('msg-from-client', function(data) {
    console.log(user + ': '+ data)
    // 向客户端发消息
    io.emit('msg-from-server', user + ': '+ data)
  })
})

// 静态资源目录
app.use(express.static('public'))

server.listen('7000', function() {
  console.log('server is running on 7000')
})
