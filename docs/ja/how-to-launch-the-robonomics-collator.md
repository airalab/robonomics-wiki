---
title: Robonomicsコレータの起動方法
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  この記事のスクリーンキャストとスクリーンショットでは、Robonomicsのバージョン1.4.0を使用しました。同じコマンドを使用する必要がありますが、Robonomicsのバージョンを現在のバージョンに置き換えてください。
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

現在、Robonomicsネットワークは主に初期開発者によって維持されていますが、誰でもプロジェクトをサポートすることができます。ブロックチェーンの追加のフルノードは、より持続可能で耐障害性のあるものにするに役立ちます。Robonomicsノードのバイナリは[リリース](https://github.com/airalab/robonomics/releases)のアセットで利用可能であり、また[ソースからビルド](/docs/how-to-build-collator-node/)することもできます。

## コレーターとは何ですか

コレータはRobonomicsパラチェーンの一部です。このタイプのノードはRobonomicsチェーンの新しいブロックを作成します。

>コレーターは、ユーザーからのパラチェーントランザクションを収集し、リレーチェーンのバリデーターに対して状態遷移の証明を生成することで、パラチェーンを維持します。言い換えれば、コレーターはパラチェーントランザクションをパラチェーンブロック候補に集約し、それらのブロックに基づいてバリデーターに対して状態遷移の証明を生成することで、パラチェーンを維持します。

関連する[Polkadot wikiページ](https://wiki.polkadot.network/docs/learn-collator)でコレータについて詳しく学ぶことができます。

ロボノミクス パラチェーンでは、すべてのコレーターは、コレーターが構築するブロックごとに (**0.001598184 XRT**) の報酬を受け取ります (報酬はブロックがチェーンに封印されるときに発生します)。
また、ブロックを構築するコレータは、作成されたブロック内に含まれる**トランザクション手数料の50%**を受け取ります。

## 要件

コレータを起動する際には、[Polkadotバリデータ](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware)の**標準ハードウェア要件**を使用することを推奨します。
+ x86-64互換。
+ Intel Ice Lake、またはそれ以降のバージョン（XeonまたはCoreシリーズ）；AMD Zen3、またはそれ以降のバージョン（EPYCまたはRyzen）。
+ 物理コア数4つ @ 3.4GHz。
+ 同時マルチスレッディング無効（IntelのHyper-Threading、AMDのSMT）。
+ ストレージ - 1TBのNVMe SSD（ブロックチェーンの成長に対応するために適切なサイズである必要があります）。
+ メモリ - 32GB DDR4 ECC


この記事では次の仕様を使用します：
+ 4 vCPU
+ コレータのデータベース用に700GBのNVMeスペース。このディスクスペースを拡張できる能力が必要です。
+ 8GBのRAM


## 重要な情報
1. これらの手順ではいくつかの変数を使用しており、すべてのコマンドで自分自身の値に置き換える必要があります：
    + **%NODE_NAME%**はノード名です。例：*my-robonomics-kusama-collator*
    + **%BASE_PATH%**はマウントされたボリュームへのパスです。例：*/mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%**はPolkadotエコシステムのアカウントアドレス（SS58形式）です。例：*4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. コレータのサービス起動時には*--state-cache-size=0*を含める必要があります。このパラメータはコレータの安定性に重要です。
関連する[issue](https://github.com/airalab/robonomics/issues/234)で詳細を確認できます。

## 初めて簡単にRobonomicsコレータを起動する

エラーをチェックするために、コマンドラインで簡単にコレータを起動できます。
れを行った後、Robonomicsコレータをサービスとして起動することを強くお勧めします（次の手順を参照）。

```
root@robokusama-collator-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb 
```


## Robonomicsコレータをサービスとして起動する

1. ホームディレクトリを持つサービス用のユーザを作成します。
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Robonomicsバイナリをダウンロードし、展開して*/usr/local/bin/*ディレクトリに移動します。このセクションのコマンドでRobonomicsの現在のバージョンで*$ROBONOMICS_VERSION*を置き換える必要があります。現在のバージョンは[githubのRobonomicsリポジトリのReleasesページ](https://github.com/airalab/robonomics/releases)で確認できます。
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


3. *robonomics.service*というsystemdサービスファイルを作成します：
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    そして、以下の行をサービスファイルに追加します：
    ```
    [Unit]
    Description=robonomics
    After=network.target
    
    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. このファイルを保存し、サービスを有効化して起動します：
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

テレメトリURL：https://telemetry.parachain.robonomics.network/#/Robonomics

Collators ログは、`journalctl -u robonomics.service -f` で監視できます。

Robonomics Collator が起動されると、Kusama リレー チェーンとの同期が開始されます。これには、ネットワーク速度とシステム仕様によってはかなりの時間がかかる場合があるため、Kusama スナップショットをダウンロードすることをお勧めします。


## Kusamaスナップショットを使用して同期プロセスを高速化する

Robonomicsサービスを作成して起動した直後にこれを行うことをおすすめします。スナップショットと使用方法の詳細については、次のページを参照してください：https://ksm-rocksdb.polkashots.io/

手順：

1. Robonomicsサービスを停止し、現在のKusamaデータベースディレクトリを削除します：
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. 実際のスナップショットをダウンロードして展開します：
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    You can remove the downloaded archive after succesful unpacking:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. データベースフォルダの適切な所有権を設定します：
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Robonomicsサービスを再起動します：
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. サービスログを確認します：
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```    
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## トラブルシューティング
### エラー：「State Database error: Too many sibling blocks inserted」
このエラーを修正するには、コレーターをアーカイブ モードで起動するだけです。

1) まず、Robonomicsサービスを停止する必要があります： 
    
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    

2）次に、サービスファイルのパラチェーン部分にパラメーター `--state-pruning=archive` を追加します。編集されたサービスファイルの例：
    ```
    [Unit]
    Description=robonomics
    After=network.target
    
    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm 

    [Install]
    WantedBy=multi-user.target
    ```

3）systemdマネージャーの設定を再読み込みします。
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4）既存のパラチェーンデータベースを削除します。
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5）robonomicsサービスを起動します。
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    その後、パラチェーンデータベースの同期が完了するまで待つ必要があります。

### エラー：「cannot create module: compilation settings are not compatible with the native host」
このエラーは仮想化パラメーターに関連しています。エミュレートされたプロセッサの「host-model」タイプを使用する必要があります。これは仮想化ホストで設定できます。

ただし、このエラーがホスティング上で発生した場合は、この問題について技術サポートに問い合わせる必要があります。
