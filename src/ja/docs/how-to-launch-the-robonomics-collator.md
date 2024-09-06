---
title: Robonomicsコレーターの起動方法
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"note", type: "note"}%} この記事のスクリーンキャストとスクリーンショットでは、Robonomicsのバージョン1.4.0を使用しています。同じコマンドを使用しますが、Robonomicsのバージョンを現在のものに置き換える必要があります。{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

現在、Robonomicsネットワークは主に初期開発者によって維持されていますが、誰でもプロジェクトをサポートできます。ブロックチェーンの追加のフルノードは、より持続可能で障害耐性のあるものにするのに役立ちます。Robonomicsノードのバイナリは[リリース](https://github.com/airalab/robonomics/releases)アセットで利用可能であり、また[ソースからビルド](/docs/how-to-build-collator-node/)することもできます。

## コレーターとは

コレーターはRobonomicsパラチェーンの一部です。このタイプのノードはRobonomicsチェーンの新しいブロックを作成します。

>コレーターは、ユーザーからパラチェーントランザクションを収集し、リレーチェーンのバリデーターに対して状態遷移の証明を生成することで、パラチェーンを維持します。言い換えれば、コレーターは、パラチェーントランザクションをパラチェーンブロック候補に集約し、それらのブロックに基づいてバリデーターに対して状態遷移の証明を生成することで、パラチェーンを維持します。

コレーターに関する詳細は、関連する[Polkadot wikiページ](https://wiki.polkadot.network/docs/learn-collator)で学ぶことができます。

Robonomicsパラチェーンでは、各コレーターがコレーターが構築するブロックごとに(**0.001598184 XRT**)の報酬を受け取ります（報酬はブロックがチェーンに封印されたときに発生します）。
また、ブロックを構築したコレーターは、作成したブロックに含まれる**トランザクション手数料の50%**を受け取ります。

## 必要条件

Robonomicsコレーターを起動する際には、[Polkadotバリデーターの標準ハードウェア要件](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware)を使用することをお勧めします：
+ x86-64互換。
+ Intel Ice Lake、またはそれ以降（XeonまたはCoreシリーズ）；AMD Zen3、またはそれ以降（EPYCまたはRyzen）。
+ 4つの物理コア @ 3.4GHz。
+ 同時マルチスレッディング無効（IntelのHyper-Threading、AMDのSMT）。
+ ストレージ - ブロックチェーンの成長に対処するために適切なサイズの1 TBのNVMe SSD。
+ メモリ - 32 GB DDR4 ECC

この記事では、次の仕様を使用しています：
+ 4 vCPU
+ コレーターのデータベース用に700 GBのNVMeスペース。このディスクスペースを拡張できる能力が必要です。
+ 8GB RAM

## 重要な情報
1. これらの手順でいくつかの変数を使用しており、すべてのコマンドで独自の値に置き換える必要があります：
    + **%NODE_NAME%** はノード名です。例：*my-robonomics-kusama-collator*
    + **%BASE_PATH%** はマウントされたボリュームへのパスです。例：*/mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** はPolkadotエコシステムのSS58形式のアカウントアドレスです。例：*4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. コレーターのサービス起動時には、*--state-cache-size=0* を含める必要があります。このパラメータはコレーターの安定性に重要です。
GitHubの関連する[issue](https://github.com/airalab/robonomics/issues/234)で詳細を確認できます。

## Robonomicsコレーターを簡単に初めて起動する

エラーをチェックするために、コマンドラインで簡単にコレーターを起動できます。
これを行った後は、Robonomicsコレーターをサービスとして起動することを強くお勧めします（次の手順を参照）。

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

## Robonomicsコレーターをサービスとして起動する

1. ホームディレクトリを持つサービス用のユーザーを作成します
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Robonomicsバイナリをダウンロードし、展開して*/usr/local/bin/*ディレクトリに移動します。このセクションのコマンドでRobonomicsの現在のバージョンで*$ROBONOMICS_VERSION*を置き換える必要があります。Robonomicsの現在のバージョンは[githubのRobonomicsリポジトリのReleasesページ](https://github.com/airalab/robonomics/releases)で確認できます。
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Download Robonomics 1.4.0 binary"} %}{% endroboWikiPicture %}

3. *robonomics.service*というsystemdサービスファイルを作成します：
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    そして、サービスファイルに以下の行を追加します：
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

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Create Robonomics service file"} %}{% endroboWikiPicture %}

    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```

4. このファイルを保存し、サービスを有効にして起動します：
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

テレメトリURL：https://telemetry.parachain.robonomics.network/#/Robonomics

コレーターのログは`journalctl -u robonomics.service -f`で監視できます。

Robonomicsコレーターが起動すると、Kusamaリレーチェーンと同期を開始します。これには、ネットワーク速度やシステム仕様に応じてかなりの時間がかかる場合がありますので、Kusamaのスナップショットをダウンロードすることをお勧めします。

## Kusamaスナップショットを使用して同期プロセスを高速化する

Robonomicsサービスを作成して起動した直後にこれを行うことをお勧めします。スナップショットと使用方法に関する詳細は、次のページで確認できます：https://ksm-rocksdb.polkashots.io/

手順：

1. Robonomicsサービスを停止し、現在のKusamaデータベースディレクトリを削除します：
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. 実際のスナップショットをダウンロードして展開します：
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# tar -xvf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Kusamaスナップショットのダウンロード"} %}{% endroboWikiPicture %}

    ダウンロードしたアーカイブを正常に展開した後は削除できます：
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

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"サービスログの確認"} %}{% endroboWikiPicture %}

## トラブルシューティング
### エラー: "State Database error: Too many sibling blocks inserted"
このエラーを修正するには、単にコレータをアーカイブモードで起動するだけです：

1) まず、Robonomicsサービスを停止する必要があります：

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) 次に、サービスファイルのパラチェーン部分にパラメータ `--state-pruning=archive` を追加します。編集されたサービスファイルの例：
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

3) systemdマネージャーの構成をリロードします：
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) 既存のパラチェーンデータベースを削除します：
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) robonomicsサービスを起動します：
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    その後、パラヘインデータベースの同期を待つ必要があります。

### エラー: "cannot create module: compilation settings are not compatible with the native host"
このエラーは仮想化パラメータに関連しています。エミュレートされたプロセッサの "host-model" タイプを使用する必要があります。これは仮想化ホストで設定できます。

ただし、このエラーがホスティングで発生した場合は、この問題について技術サポートに問い合わせる必要があります。