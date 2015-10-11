console.log("module load");
var skio = {}
skio.start = function(){
  console.log("test");
}
skio.socket = function(server){
  var io = require("socket.io").listen(server);
  var userHash = {};

  //botモジュールの読み込み
  var bot = require('../../routes/module/bot.js');
  //コンストラクタモドキで解体祖解析を不実行にする。
  bot.cst(false);

  var rooms = new Array("default");
  var log_for_404 = [];

  var errorChat = io.of('/errorChat').on("connection", function (socket){
    console.log("errorChat -> 接続待ちです");
    console.log("hello world");
    // socket.on("Hello",function(mes){console.log(mes);});
    socket.on("双方向通信開始",function(mes){
      console.log(mes);
      socket.emit("send_log",log_for_404);
    });
    socket.on("publish",function(data){
      var pushData = {
        id: socket.id,
        msg: data.msg,
        time: data.time,
        icon: data.icon
      };
      log_for_404.push(pushData);
      console.log(log_for_404);
      errorChat.emit("emit_from_server", pushData);
      if(data.msg==="こんにちは"){
        var pushData = {
          id: "bot",
          msg: "hello",
          time: new Date().toLocaleTimeString(),
          icon: "https://www.google.co.jp/url?sa=i&rct=j&q=&esrc=s&source=images&cd=&cad=rja&uact=8&ved=0CAcQjRxqFQoTCOWIz6qPnMgCFccVpgoduyAJhw&url=https%3A%2F%2Ftwitter.com%2Fj13135ak&psig=AFQjCNH6fOSlBu0Nmtt4QjPUZsIjGMjBHg&ust=1443611843460841"
        };
        errorChat.emit("emit_from_server", pushData);
      }
    })
  });


  var log={};
  log["default"]=[];

  var chat = io.of('/chat').on("connection", function (socket) {
    console.log("/chat -> 接続待ちです")
    socket.on("connected", function (user) {
      console.log("接続")
      console.log("connected: "+ socket.id);
      var msg = user.name + "さんが入室しました";
      var push_data={
        name : 'System',
        msg : msg,
        time : new Date().toLocaleTimeString()
      }
      userHash[socket.id] = user.name;
      socket.join("default");
      socket.emit("push_log",log.default);
      socket.emit("push_room", rooms);
      chat.to("default").emit('publish', push_data);
    });

    socket.on("roomChange", function(pushData){
      socket.leave(pushData.LRoom);
      socket.join(pushData.user.room);
      console.log("emit comming!")
      var data = {
        name: 'System',
        msg : pushData.user.name + "さんが"+pushData.user.room+"に入室しました",
        time : new Date().toLocaleTimeString()
      }
      console.log(log[pushData.user.room]);
      socket.emit("push_log",log[pushData.user.room]);
      socket.broadcast.to(pushData.user.room).emit('publish', data);
    })

    socket.on("publish", function (data) {
      console.log(data);
      chat.to(data.room).emit('publish', data);
      var roomname = data.room;
      console.log(log);
      log[roomname].push(data);
      console.log("dataname"+data.name);
      try{
        var botData = {
          name: "bot",
          time: new Date().toLocaleTimeString(),
          msg : bot.reply(data.msg)
        }
        chat.to(roomname).emit('publish', botData);
      }
      catch(e){}
    });

    socket.on("disconnect", function () {
      if (userHash[socket.id]) {
        // var msg =  + "さんが退出しました";
        console.log("切断");
        var data = {
          name:'System',
          msg: userHash[socket.id] + "さんが退出しました",
          time : new Date().toLocaleTimeString()
        }
        socket.broadcast.emit("publish",data);
        // io.sockets.emit("publish", data);
        // log[data.room].push(data);
        delete userHash[socket.id];
      }
    });


    socket.on("roomCreated", function(roomname){
      rooms.push(roomname);
      socket.broadcast.emit("add_room", roomname);
      socket.emit("add_room", roomname);
      // log.push(roomname);
      log[roomname]=[];
      console.log(log);
      // io.sockets.emit("add_room", roomname);
    });
  });
}


module.exports = skio;
