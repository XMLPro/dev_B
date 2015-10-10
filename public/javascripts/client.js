var location_obj = window.location;
console.log(location_obj.href);
var chat = io.connect(location_obj.href);

var rooms = undefined;
chat.on("connected", user);
chat.on("publish", function (data) {addMessage(data);});
chat.on("disconnect", function () {});
chat.on("add_room", function(roomname){
  console.log(roomname);
  addRoom(roomname);
})

$('#logout').on('click', function () {
  console.log('disconnect!!')
  chat.disconnect();
  location.href = "http://" + window.location.href.split('/')[2];
})

$('#roomCreate').on('click', function () {
  console.log('')
  createRoom();
})

$('#myform').submit(
  console.log("submitting!!")
)

var user = {
  name: undefined ,
  id: undefined ,
  icon : undefined ,
  room : 'default'
}
function changeroom(){
  var count = 0;
  var data = {
    LRoom : user.room,
    user : user
  }
  user.room = document.getElementById('rooms').value;
  $("#msg").empty();
  chat.emit("roomChange", data);
  console.log("count = " + count);
}
chat.on("push_log",function(log){
  console.log("--------length-------");
  console.log(log.length);
  console.log("--------length-------");
  t = log;
  for(var p in log){
    addMessage(log[p]);
    console.log(log[p]);
  }
  log=null;
});
// 2.イベントに絡ませる関数の定義
function start(user) {
  console.log(user);
  chat.emit("connected", user);
  console.log("connect start");
  chat.on("push_room", function(pushedrooms){
    console.log("pushedroom: "+pushedrooms);
    rooms=pushedrooms;
    console.log("rooms:"+rooms);
    for(var p in rooms){
      addRoom(rooms[p]);
      console.log(rooms);
    }
  });
}
function publishMessage() {
  var textInput = document.getElementById('msg_input');
  if(textInput.value === ""){
  }else {
    var input = textInput.value;
    var data= {
                name: user.name,
                msg : input,
                time : new Date().toLocaleTimeString(),
                room : user.room
              }
    console.log(data);
    chat.emit("publish",data);
  }
  textInput.value = '';
}
function addMessage (data) {
  console.log("メッセージ追加" + data);
  var domMeg = document.createElement('div');
  domMeg.setAttribute('class', "message panel panel-primary");
  domMeg.innerHTML =  "<div class='panel-heading'><h3 class='panel-title'>" + data.time.split(":")[0]+"時"+ data.time.split(":")[1]+ "分 " +
   data.name + "さん：　" + "</h3></div>" +
  "<div class='panel-body'>"
    + data.msg + "</div>";
  msgArea.appendChild(domMeg);
}

function createRoom(){
  var roomName = window.prompt("部屋の名前を付けてください。", "");
  chat.emit("roomCreated", roomName);
}

function addRoom(name){
  $("select#rooms").append("<option>"+name+"</option>");
}
var msgArea = document.getElementById("msg");
user.name = window.prompt("あなたの名前を入力","");
start(user);
