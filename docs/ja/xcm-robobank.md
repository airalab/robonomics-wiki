---
title: クロスチェーンメッセージングのためのSubstrate Cumulus Parachain Testsuite 

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


このプロジェクトの主な目標は、クロスチェーンメッセージが使用される場合のパラチェーンランタイムの開発を簡素化することです。 
これにより、高い再現性と簡単な使法を備えた統合テストを使用してランタイムコードの開発が可能になります。
これにより、ビルドの自動化、事前に設定されたネットワーク構成（リレーチェーン+2つのパラチェーン）、パラチェーン間のメッセージパッシングチャネルの設定、メッセージングテストの実行、ランタイムへの呼び出しを使用したメッセージの送信などが、すべてPythonで構築および構成されます。

XCM Testsuiteは、Robobankの製品サイクルのテストに使用されます。Robobankは、外部パラチェーンに登録し、前払い注文を受け取り、それらを実行し、外部トークンを使用して支払いを受け取るためのSubstrateパレットのセットです。これにより、ロボットは必要なインフラストラクチャを備えたRobonomicsネットワーク内で動作することができますが、同時に、他のどのパラチェーンでもサービスを提供することができます。

[YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM)で例のビデオをご覧いただけます。

デモシナリオの主なステップは次のとおりです。
- リレーチェーンと2つのパラチェーンを6つのプロセスのパックで起動する
- パチェーン間のXCMメッセージチャネルの設定
- 両方のパラチェーンにロボットを登録する
- クライアントパラチェーンでこのロボットの注文を作成する（注文の完了に対する支払いを予約する）
- RobonomicsパラチェーンにXCMメッセージを送信する
- Robonomicsパラチェーンに"ミラーリング"された注文レコードを作成する
- ロボットがRobonomicsパラチェーンで注文を受け入れる
- 注文の受け入れに関するXCMメッセージをクライアントパラチェーンに送信する
- クライアントパラチェーンで注文を受け入れる（注文の締め切りまでの未完了注文に対するペナルティ料金を予約する）
- ロボットがRobonomicsパラチェーンで注文を完了する
- 注文の完了に関するXCMメッセージをクライアントパラチェーンに送信する
- すべての支払いを解決する（クライアントの支払いはロボットに転送され、未使用のペナルティ料金も転送される）
- 注文1を閉じる


## 上流
このプロジェクトはのフォークです
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template).
テストされているランタイムパレットのコードが含まれています。
元のノードコードのパラチェーンは、"./pallets"、"./runtime"、"./node"のカタログにあります。

"substrate-node-template"との違い
- このコレータランタイムにはHRMPハンドラモジュールがあり、兄弟パラチェーンからのメッセージを処理できます
- 内部XCMテスト用のモックテストランタイムが準備されています

## ビルド＆実行
推奨（非常に）セットアップ： 
```
Ubuntu 20, 16 Gb RAM, 8 CPU, 120 Gb SSD
```
[注意]最初のビルドには多くの時間がかかる場合があります。サブオプティマルなマシンでは数時間かかることがあります。

[注意]スクリプトは、リレーチェーンとパラチェーンのFIXEDバージョン（コミットハッシュ）で動作します。

[注意]デフォルトでは、スクリプトは前回の状態をすべて削除して、毎回同じ環境を再作成します。この動作は、"config.sh"で"PERSISTENT"パラメータを使用して変更できます。


ビルドおよびセットアップスクリプトを実行します。  
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

"init.sh"スクリプトの基本的なアクション：
 - 設定を読み取る（リビジョン番号、初期ノードキーと識別子、チェーンデータの永続性パラメータなどが記述された"config.sh"ファイル）
 - OSパケッ、Rust、Pythonのセットアップ
 - リレーチェーンと両方のパラチェーンのために別々のバイナリをビルドする
    - バイナリは./binサブディレクトリに生成されます。 
 - （オプション）すべてのチェーンの前のチェーンデータを削除します
    - "config.sh"で"PERSISTENT=1"が設定されている場合は無効になります
 - 別々のプロセス（別々のPIDとI/Oパイプで実行）として実行されます：
    - リレーチェーンのバリデータ（安定したRococoリビジョンを実行する4つのバリデータ）
    - パラチェーン-100のコレータ（開発中の最初のパラチェーンのための単一のコレータ）
    - パラチェーン-200のコレータ（開発中の2番目のパラチェーンのための単一のコレータ）
 - すべてのチェーンのすべてのエンドポイント、ポートをコンソールに表示し、フロントエンドアプリ（エクスプローラ、DApp）を使用して任意のチェーンを研究できるようにします
 - すべてのチェーンのすべての出力データをコンソールに継続的に表示し続けます

[警告]起動後、ネットワークが起動し、ブロックの最終化が開始され、パラチェーンが登録されまで待機してください。これらのプロセスは約5分（50ブロック×6秒）かかるはずです。

## 初期セットアップが機能していることを確認する 

標準のPolkdotフロントエンドと生成された"--ws-port"エンドポイントを使用して各ノードに接続するために、[Polkadotアプリケーション](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)を開きます。
例： 

### ローカルホスト、4つのリレーチェーンバリデータ、1つのパラチェーン-100コレータ、1つのパラチェーン-200コレータ：
Localhost, 4 relay chain validators, one parachain-100 collator, one parachain-200 collator:
- [Relay validator 1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [Relay validator 2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [Relay validator 3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [Relay validator 4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [Parachain-100 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [Parachain-200 collator](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)


すべてがうまくいけば、合意が始まり、テストケースを実行することができます（新しいターミナルで）。

### UMPメッセージパッシングテスト
```bash
./scripts/init.sh ump
```
`parachain-100`で`Balance.transfer`メッセージを作成し、リレーションチェーンに渡します。
リレーションチェーンがメッセージを受信すると、`para 100`アカウントからCharlieアカウントに15トークンを転送します。


### HRMPメッセージパッシングテスト
```bash
./scripts/init.sh ump
```

`parachain-100`で`Balance.transfer`メッセージを作成し、`sibling 200`に渡します。
その前に、`subl 100`アカウントに1000トークンを与え、パラチェーン間の通信チャネルを確立します。
```bash
./scripts/init.sh hrmp
```
次のメッセージは`hrmpm`サブコマンドを実行することで送信できます。チャネルは作成されないため、より高速に実行されます。
```bash
./scripts/init.sh hrmpm
```

### その他のオプション
```bash
./scripts/init.sh help
```

## ローカルテストネット

### カスタマイズされたチェーン仕様の作成
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

rococo_local.jsonを編集し、残高と権限のパラメータを自分のものに置き換えます。
```json
  "keys": [
    [
      "",
      "",
      {
        "grandpa": "",
        "babe": "",
        "im_online": "",
        "para_validator": "",
        "para_assignment": "",
        "authority_discovery": ""
      }
    ]
```

//Alice//stashのPolkadotアドレス（sr25519暗号化）
```bash
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice//stash
```

```text
Secret Key URI `//Alice//stash` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

//AliceのPolkadotグランドパセッションキー（ed25519暗号化）
```bash
$ polkadot key inspect-key --scheme ed25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

//AliceのPolkadotアドレス（sr25519暗号化）
```
$ polkadot key inspect-key --scheme sr25519 --network substrate //Alice
```
```text
Secret Key URI `//Alice` is account:
Secret seed:      

Public key (hex): 

Account ID:       

SS58 Address:     
```

rococo_local.jsonを生の形式に変換します。
```
./bin/polkadot build-spec --chain rococo_local.json --raw --disable-default-bootnode > rococo_local.json
```
新しいチェーン仕様を使用するには、./config/ディレクトリのrococo.jsonファイルをこの新しいものに置き換えてチェーンを再実行します。
```bash
./scripts/init.sh run
```
コードを自由に編集できます。上記のコマンドはプジェクトを再構築し、コラーターノードを更新してから開始します。
Cumulusはまだ開発中のプレリリースソフトウェアです。
私たちは特定のコミットのpolkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5dbcd0987ed53f104e6e15)を使用しています。

より新しいバージョンのソフトウェアを使用することもできます。これを行うには、./scipt/config.shのPOLKADOT_COMMITを`
rococo-v1`ブランチの最新のコミットに変更し、./bin/polkadotを削除して実行します。 
```bash
./scripts/init.sh run
```

コラータープロジェクトの依存関係を更新します. 
```bash
cargo update
./scripts/init.sh build
```
一部の依存関係はおそらく新しいRustツールチェーンの機能を必要とします。このプロジェクトはRust `nightly-2021-01-26`に基づいています。
ビルド前に./scripts/config.shでRustツールチェーンのバージョンを更新してください。

## パラチェーンをハックする 
[外部パレットを追加](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - おそらく「詳細を学ぶ」にあるべきですか？
## Learn More

このプロジェクトの構造、カプセル化された機能、およびそれらの機能が実装される方法については、上流の[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)を参照してください。公式のPolkadotブログで[パラチェーンブロックの経路](https://polkadot.network/the-path-of-a-parachain-block/)について詳しく学ぶことができます。[Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)
