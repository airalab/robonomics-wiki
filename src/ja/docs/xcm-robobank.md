---
title: クロスチェーンメッセージングのための Substrate Cumulus Parachain Testsuite

contributors: [ddulesov, boogerwooger, tubleronchik] 
---


このプロジェクトの主な目標は、クロスチェーンメッセージが使用されるときのパラチェーンランタイム開発の簡素化です。
これにより、高い繰り返し可能性と簡単な使用法を備えた統合テストを使用してランタイムコードの開発が可能になります。
これは、Pythonで構築されたランタイムを呼び出してメッセージングテストを実行し、メッセージを送信するためのメッセージパッシングチャネルを設定し、すべてを構築および構成する自動化を行います。

XCM Testsuite は、Robobank の製品サイクルのテストに使用されます。これは、ロボットが外部パラチェーンに登録し、前払い注文を受け取り、それらを実行し、外部トークンを使用して支払いを受け取ることを可能にする Substrate パレットのセットです。これにより、ロボットは必要なインフラを備えた Robonomics ネットワーク内で運用できるだけでなく、他のどのパラチェーンでもサービスを提供できます。

[YouTube](https://www.youtube.com/watch?v=S_bZgsxngiM) で例のビデオをご覧いただけます。

デモシナリオの主なステップは次のとおりです:
- リレーチェーンと2つのパラチェーンを6つのプロセスのパックで起動
- パラチェーン間に XCM メッセージチャネルを設定
- 両方のパラチェーンにロボットを登録
- クライアントパラチェーンでこのロボットのための注文を作成（注文完了のための支払いを予約）
- Robonomics パラチェーンに XCM メッセージを送信
- Robonomics パラチェーンに "ミラーリング" 注文レコードを作成
- ロボットが Robonomics パラチェーンで注文を受け入れ
- クライアントパラチェーンに注文受け入れに関する XCM メッセージを送信
- クライアントパラチェーンで注文を受け入れ（注文締め切りまでの注文完了不足のための罰金料金を予約）
- ロボットが Robonomics パラチェーンで注文を完了
- クライアントパラチェーンに注文完了に関する XCM メッセージを送信
- すべての支払いを解決（クライアントの支払いはロボットに送金され、未使用の罰金料金も同様に）
- 注文1 を閉じる


## Upstream
このプロジェクトは、[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template) のフォークです。
テストされているランタイムパレットのコードが含まれています。
元のものと同様パラチェーンのノードコードは、"./pallets"、"./runtime"、"./node"ディレクトリにあります。

"substrate-node-template"との違い：
- このコレーターランタイムにはHRMPハンドラーモジュールがあり、兄弟パラチェーンからのメッセージを処理できます
- 内部XCMテスト用に準備されたモックテストランタイム

## ビルド＆実行
推奨（非常に）セットアップ：
```
Ubuntu 20、16 Gb RAM、8 CPU、120 Gb SSD
```
[注意] 最初のビルドには多くの時間がかかる場合があり、最適でないマシンでは数時間かかることがあります。

[注意] このスクリプトは、Polkadot（Rococo）のリレーチェーンとパラチェーンのFIXEDバージョン（コミットハッシュ）で動作します。

[注意] デフォルトでは、スクリプトは毎回同じ環境を再作成し、以前の状態をすべて削除します。この動作は、"config.sh"の"PERSISTENT"パラメータを使用して変更できます。

ビルドおよびセットアップスクリプトを実行します。
```bash
git clone https://github.com/airalab/xcm-robobank-prototype.git
cd xcm-robobank-prototype
./scripts/init.sh
```

"init.sh"スクリプトの基本的なアクション：
- 設定を読み取る（リビジョン番号、初期ノードキーと識別子、チェーンデータの永続性パラメータなどが記述されたファイル"config.sh"）
- OSパケット、Rust、Pythonのセットアップ
- リレーチェーンおよび両方のパラチェーン用に別々のバイナリをビルド
    - バイナリは./binサブディレクトリに生成されます。
- （オプション）すべての前のチェーンデータを削除
    - "config.sh"で"PERSISTENT=1"が設定されている場合は無効になります
- 別々のプロセスとして実行（別々のPIDとI/Oパイプを使用）：
    - リレーチェーンのバリデータ（つまり、安定したRococoリビジョンを実行している4つのバリデータ）
    - パラチェーン-100のコレーター（つまり、開発中の最初のパラチェーンの単一のコレーター）
    - パラチェーン-200のコレーター（つまり、開発中の2番目のパラチェーンの単一のコレーター）
- コンソールにすべてのエンドポイント、ポートを表示し、フロントエンドアプリ（エクスプローラ、DApp）を使用して任意のチェーンを調査できるようにします
- すべてのチェーンの出力データをコンソールに継続的に表示します

[警告] 起動後は、ネットワークが稼働し、ブロックの最終化が開始され、パラチェーンが登録されるまで待機してください。これらのプロセスは...約5分間（50ブロック×6秒）かかります。

## 初期セットアップが機能しているか確認

標準のPolkadotフロントエンドと生成された「--ws-port」エンドポイントを使用して、各ノードに接続します。
チェーンを監視するために[Polkadotアプリケーション](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)を開いてください。

### 例:
ローカルホスト、4つのリレーチェーンバリデータ、1つのパラチェーン-100コレータ、1つのパラチェーン-200コレータ:
- [リレーバリデータ1](https://polkadot.js.org/apps/?rpc=ws://localhost:9500/)
- [リレーバリデータ2](https://polkadot.js.org/apps/?rpc=ws://localhost:9501/)
- [リレーバリデータ3](https://polkadot.js.org/apps/?rpc=ws://localhost:9502/)
- [リレーバリデータ4](https://polkadot.js.org/apps/?rpc=ws://localhost:9503/)
- [パラチェーン-100コレータ](https://polkadot.js.org/apps/?rpc=ws://localhost:10054/)
- [パラチェーン-200コレータ](https://polkadot.js.org/apps/?rpc=ws://localhost:10055/)

すべてが機能しており、コンセンサスが開始されたら、新しいターミナルでテストケースを実行できます。

### UMPメッセージパッシングテスト
```bash
./scripts/init.sh ump
```
これにより、`parachain-100`で`Balance.transfer`メッセージが作成され、リレーチェーンに渡されます。
リレーチェーンがメッセージを受信すると、`para 100`アカウントからCharlieアカウントに15トークンが転送されます。

### HRMPメッセージパッシングテスト
```bash
./scripts/init.sh ump
```

これにより、`parachain-100`で`Balance.transfer`メッセージが作成され、`sibling 200`に渡されます。
その前に、`subl 100`アカウントに1000トークンを付与し、パラチェーン間の通信チャネルを確立します。
```bash
./scripts/init.sh hrmp
```
次のメッセージは`hrmpm`サブコマンドを実行することで送信できます。チャネルを作成しないため、より高速に実行されます。
```bash
./scripts/init.sh hrmpm
```

### その他のオプション
```bash
./scripts/init.sh help
```

## ローカルテストネット### カスタマイズされたチェーン仕様を作成する
```
./bin/polkadot build-spec --chain rococo-local --disable-default-bootnode > rococo_local.json
```

rococo_local.jsonを編集し、balancesとauthoritiesパラメータをあなた自身のものに置き換えます。
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

//Alice//stashのPolkadotアドレス（sr25519暗号化）。
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

//Alice（ed25519暗号化）のPolkadot grandpaセッションキー。
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

//Alice（sr25519暗号化）のPolkadotアドレス。
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
新しいチェーン仕様を使用するには、この新しいもので./config/ディレクトリ内のrococo.jsonファイルを置き換え、チェーンを再実行します。
```bash
./scripts/init.sh run
```
コードを自由に編集できます。上記のコマンドはプロジェクトを再構築し、コレーターノードを更新してから開始します。
Cumulusはまだ開発中のプレリリースソフトウェアです。
私たちは特定のコミットのpolkadot [46c826f595021475fa5dbcd0987ed53f104e6e15  18 mar 2021](https://github.com/paritytech/polkadot/tree/46c826f595021475fa5 を使用しています。dbcd0987ed53f104e6e15)

ソフトウェアのより新しいバージョンを使用することができます。これを行うには、`rococo-v1`ブランチの最新のコミットに`./scipt/config.sh`内の `POLKADOT_COMMIT` を変更し、`./bin/polkadot`を削除し、次のコマンドを実行します。
```bash
./scripts/init.sh run
```

コレータープロジェクトの依存関係を更新します
```bash
cargo update
./scripts/init.sh build
```
いくつかの依存関係はおそらく新しいRustツールチェーンの機能を必要とします。このプロジェクトはRust `nightly-2021-01-26`に基づいています。
ビルド前に`./scripts/config.sh`内でRustツールチェーンのバージョンを更新してください。

## パラチェーンをハックする
[外部パレットを追加](https://substrate.dev/docs/en/tutorials/add-a-pallet/) - おそらく「詳細を学ぶ」にあるべきですか？
## 詳細を学ぶ

このプロジェクトの構造、それがカプセル化する機能、およびそれらの機能が実装される方法について詳しく知るには、上流の
[Substrate Developer Hub Node Template](https://github.com/substrate-developer-hub/substrate-node-template)
を参照してください。公式Polkadotブログの
[パラチェーンブロックの経路](https://polkadot.network/the-path-of-a-parachain-block/)について詳しく学ぶことができます。
[Parity Cumulus Workshop](https://substrate.dev/cumulus-workshop/#/)