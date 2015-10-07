# dev_B
チームBのレポジトリ

## 概要
node.jsとSocket.ioとexpressを使って作ったチャット。

## 機能
- チャット
  - ルーム機能
  - bot
- 形態素解析

## 詳細
### 動作環境
node.jsとnpmがインストールされたLinux、Windows。MacOSはわかりません。形態素解析を行いたい場合はMeCabを別にインストールする必要があります。
### 使い方
1. このレポジトリをクローンして
1. `npm install`を実行。必要なモジュールが自動でダウンロードされます。
1. そして、`node app.js`でサーバーが立ちます。初期のポートは8080なので環境に合わせてapp.jsの7行目を変えてください。
1. アクセスするとdefaultルームに入ります。
1. 左上のプルダウンメニューからルームが選べます。また、その隣のルーム作成ボタンからルームを作ることができます。
ルームを作るとサーバーに作成されたことがプッシュされ、チャットにアクセスしているクライアントのプルダウンメニューに反映されます。
* _サーバーを落とすと作成されたルームは全て消えます。_
* _~~今のところ、logは一切取っていないので過去に投稿されたメッセージは見ることはできません。~~ logを一時的に残すようにしました。サーバーを落とすと消えます。_

### 形態素解析について
チャットでの会話が勝手に形態素解析されます。結果はコンソールの方に出力してます。初期の設定では形態素解析機能は動かないようにしてます。動かしたい場合はMeCabをインストール後、
routes/module/skio.jsの13行目の値をtrueにしてください。




### 参考
[[Node.js] Socket.ioで双方向通信チャットアプリを構築 〜 JSおくのほそ道 #005 ](http://qiita.com/hosomichi/items/66b309a6c3c20d910218)
