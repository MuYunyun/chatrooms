const Chat = function(socket) {
  this.socket = socket;
}

// 发送聊天消息的函数
Chat.prototype.sendMessage = function(room, text) {
  const message = {
    room: room,
    text: text
  }
  this.socket.emit('message', message)
}

// 变更房间的函数
Chat.prototype.changeRoom = function(room) {
  this.socket.emit('join', {
    newRoom: room
  })
}

// 处理聊天命令
Chat.prototype.processCommand = function(commands) {
  let words = commands.split(' ')
  let command = words[0]
                  .substring(1, words[0].length)
                  .toLowerCase()
  let message = false

  switch(command) {
    case 'join':
      words.shift()
      let room = words.join(' ')  // 数组转为字符串
      this.changeRoom(room)
      break
    case 'nick':
      words.shift()
      let name = words.join(' ')
      this.socket.emit('nameAttempt', name)
      break
    default:
      message = 'Unrecognized command.';
      break
  }

  return message
}
