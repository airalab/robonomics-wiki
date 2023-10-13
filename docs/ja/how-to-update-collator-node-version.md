---
title: Robonomics Collatorノードバージョンの更新方法

contributors: [Leemo94]
---

この投稿を読む前に、以下の記事を読むことをおすすめします：["Collator Nodeのビルド方法"](/docs/how-to-build-collator-node)および["Robonomics Collatorの起動方法"](/docs/how-to-launch-the-robonomics-collator)。

の記事では、Robonomics Collatorノード（Ubuntuで実行）の更新に必要なコマンドと、その後の例を示します。

## **必要なコマンド**

0. 開始する前に、`root`としてログインしていることをおすすめします。そうでない場合は、以下を使用することをおすすめします：

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Robonomicsサービスを停止します。

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. 以前のバージョンのRobonomicsを削除します（正しいディレクトリにいることを確認してください）。

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Robonomicsの[最新リリース](https://github.com/airalab/robonomics/releases)バージョンを取得します。

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. ファイルを展開します。

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. ファイルを移動します。

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

このファイルを、Robonomicsノードをインストールした正しいディレクトリに移動する必要があります。

</robo-wiki-note>

6. Robonomicsを起動します。

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

CollatorノードをRobonomics v1.8.4にアップグレードする例：

<code-helper>

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
</code-helper>

## **ベースパスが設定されていないKusamaリレーチェーンデータベースの変更**

Kusamaリレーチェーンの特定のスナップショットがノードにエラーを引き起こすことがあります。これにより、ノードが動作しなくなることがよくあります。壊れたリレーチェーンデータースによるエラーの例：

<code-helper>

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
</code-helper>

このエラーを修正するには、既存のKusamaリレーチェーンデータベース（おそらくRocksDb）を削除し、ParityDbなどの別のDbで置き換える必要があります。次のコマンドを実行します：

1. Robonomicsノードのディレクトリを見つけ、ファイルを確認します。

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. polkadotディレクトリが表示されることを確認し、chainsディレクトリに移動します。

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. `ksmcc3` ディレクトリを削除します。

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. 新しい`ksmcc3`ディレクトリを作成します。

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. 新しいスナップショットをダウンロードする必要があります。この例では、大幅にプルーンされたリレーチェンスナップショットを使用していますが、好みのスナップショットに置き換えることができます。

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. スナップショットがダウンロード中の間に、新しいセッションを開き、サービスファイルを編集します。


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

データベースとプルーニングに関連するサービスファイル内の行を変更します。

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
`Ctrl + S`を押してから`Ctrl + X`を押して、サービスファイルを保存して終了します。

7. デーモンを再読み込みする必要があります。

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. この時点で、他のセッションでは、新しいDbがダウンードされていることを願っていますので、ファイルを展開します。

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. 展開が完了したら、次のコマンドを実行します。

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. これでサービスを開始し、エラーがないか監視し、リレーチェーンとパラチェーンの両方でピアリングされていることを確認できます。


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>