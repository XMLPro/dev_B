console.log("module load");
var bot = {};
var MeCab = undefined;
// var MeCab = new require('mecab-async')
//       , mecab = new MeCab();

var analysis_sw = new Boolean(false);
//コンストラクタ?
/*  True => 形態素解析実行
*   False => 形態素解析不実行
*/
bot.cst = function(bl){
  analysis_sw = bl;
  if(analysis_sw === true){
    MeCab = new require('mecab-async')
        , mecab = new MeCab();
  }
}

//特定のキーワードを判別する関数。
//該当しなければexception投げます。キャッチしてあげください。
bot.reply = function(msg){
  if(analysis_sw === true)
    bot.MAnalysis(msg);

  if(msg === "こんにちは"){
    return "こんにちは";
  }else if(msg === "こんばんわ"){
    return "さようなら";
  }else{
    throw new Error("Exception");
  }
};

//形態素解析する関数。引数で解析したい文字列を引数として渡すとコンソールで出力。
bot.MAnalysis = function(str){
  mecab.parse(str, function(err, result) {
      if (err) throw err;
      console.log(result);
  });
}

module.exports = bot;
