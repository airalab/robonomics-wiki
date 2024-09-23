---
title: Robonomics Collator Node バージョンの更新方法

contributors: [Leemo94]
---

この記事を読む前に、以下の記事を読むことをお勧めします: ["Collator Node のビルド方法"](/docs/how-to-build-collator-node) & ["Robonomics Collator の起動方法"](/docs/how-to-launch-the-robonomics-collator).

この記事には、Robonomics collator ノード（Ubuntu 上で実行されている）を更新するために必要なコマンドと、その後の例が含まれています。

## **必要なコマンド**

0. はじめる前に、`root` としてログインしていることをお勧めします。そうでない場合は、次のコマンドを使用することをお勧めします:


```shell
sudo su -
```

1. Robonomics サービスを停止します:

```shell
systemctl stop robonomics.service
```

2. 以前の Robonomics バージョンを削除します（正しいディレクトリにいることを確認してください）:

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

3. Robonomics の[最新リリース](https://github.com/airalab/robonomics/releases)バージョンを取得します:


```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

4. ファイルを展開します:

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

5. ファイルを移動します:

```shell
mv robonomics /usr/local/bin/
```

{% roboWikiNote {type: "note"}%} このファイルを Robonomics ノードをインストールした正しいディレクトリに移動する必要があります {% endroboWikiNote %}

6. Robonomics を起動します:

```shell
systemctl start robonomics.service
```

Robonomics v1.8.4 にコレーターノードをアップグレードする例:

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service

```

## **ベースパスが設定されていない Kusama リレーチェーンデータベースの変更**

Kusama リレーチェーンの特定のスナップショットがノードにエラーを引き起こすことがあります。これにより、ノードが停止することがよくあります。壊れたリレーチェーンデータベースによって引き起こされるエラーの例:


```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

このエラーを修正するためには、既存の Kusama リレーチェーンデータベース（おそらく RocksDb）を削除し、ParityDb などの他の Db で置き換える必要があります。次のコマンドを実行してください:

1. Robonomics ノードのディレクトリを見つけ、ファイルを確認します:

```shell
cd /home/robonomics/
ls -a
```

2. polkadot ディレクトリが表示されることを確認し、chains ディレクトリに移動します:


```shell
cd /polkadot/chains/
ls -a
```

3. `ksmcc3` ディレクトリを削除します:


```shell
rm -r ksmcc3
```

4. 新しい `ksmcc3` ディレクトリを作成します。

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

5. 新しいスナップショットをダウンロードする必要があります。この例では、大幅に削減されたリレーチェーンスナップショットを使用していますが、好みのスナップショットに置き換えることができます。


```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

6. スナップショットのダウンロード中に、新しいセッションを開いてサービスファイルを編集します:

```shell
sudo nano /etc/systemd/system/robonomics.service
```

データベースとプルーニングに関連するサービスファイル内の行を修正します:


```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

`Ctrl + S` を押して保存し、`Ctrl + X` を押してサービスファイルを終了します。

7. デーモンを再読み込みする必要があります。

```shell
systemctl daemon-reload
```

8. この時点で、他のセッションで新しい Db がダウンロードされていることを願って、ファイルを展開します:

```shell
tar -xvzf ksm_pruned.tar.gz
```

9. 展開が完了したら、次のコマンドを実行します:

```shell
chown -R robonomics:robonomics paritydb
```

10. サービスを開始し、エラーがないかを監視し、リレーチェーンとパラチェーンの両方でピアリングされていることを確認します:

```shell
systemctl start robonomics && journalctl -fu robonomics
```