console.log("module load");
var bot = {};

bot.reply = function(msg){
  if(msg === "こんにちは"){
    return "こんにちは";
  }else if(msg === "こんばんわ"){
    return "さようなら";
  }else{
    throw new Error("Exception");
  }
};


module.exports = bot;
