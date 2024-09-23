---
title: 如何启动Robonomics收集器
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"注意", type: "注意"}%} 在本文的视频和截图中，我们使用了Robonomics的1.4.0版本。您需要使用相同的命令，但将Robonomics的版本替换为当前版本。{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

目前，Robonomics网络主要由最初的开发人员维护，但任何人都可以支持该项目。每个区块链的额外全节点都有助于使其更具可持续性和容错性。Robonomics节点二进制文件可在[发布](https://github.com/airalab/robonomics/releases)资产中找到，或者可以[从源代码构建](/docs/how-to-build-collator-node/)。

## 什么是收集器

收集器是Robonomics平行链的一部分。这种类型的节点为Robonomics链创建新的区块。

>收集器通过从用户那里收集平行链交易并为中继链验证者生成状态转换证明来维护平行链。换句话说，收集器通过将平行链交易聚合到平行链块候选项中，并基于这些块为验证者生成状态转换证明来维护平行链。

您可以在相关的[Polkadot维基页面](https://wiki.polkadot.network/docs/learn-collator)上了解更多关于收集器的信息。

在Robonomics平行链中，每个收集器在构建区块时都会获得(**0.001598184 XRT**)的奖励（当区块封存到链上时会发生奖励）。
此外，构建区块的收集器会获得该区块中包含的**50%交易费**。

## 要求

建议您使用[Polkadot验证器](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware)的**标准硬件要求**来启动收集器：
+ 兼容x86-64。
+ Intel Ice Lake或更新（至强或酷睿系列）；AMD Zen3或更新（EPYC或Ryzen）。
+ 4个物理核心 @ 3.4GHz。
+ 禁用同时多线程（Intel的超线程，AMD的SMT）。
+ 存储 - 1 TB的NVMe SSD（应该足够大以处理区块链的增长）。
+ 内存 - 32 GB DDR4 ECC


在本文中，我们使用以下规格：
+ 4个虚拟CPU
+ 700 GB的NVMe空间用于收集器的数据库。需要能够扩展此磁盘空间。
+ 8GB RAM


## 重要信息
1. 我们在这些说明中使用了一些变量，您需要在所有命令中替换为您自己的值：
    + **%NODE_NAME%** 是节点名称。示例：*my-robonomics-kusama-collator*
    + **%BASE_PATH%** 是挂载卷的路径。示例：*/mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** 是Polkadot生态系统中的账户地址，以SS58格式表示。示例：*4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. 请注意，在收集器的服务启动中需要包含*--state-cache-size=0*。此参数对于收集器的稳定性很重要。
您可以在github上的相关[问题](https://github.com/airalab/robonomics/issues/234)中查看更多信息。

## 第一次轻松启动Robonomics收集器

您可以直接在命令行中轻松启动收集器以检查错误。
完成后，强烈建议将Robonomics收集器作为服务启动（请查看下一步）。

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


## 将Robonomics收集器作为服务启动

1. 创建具有主目录的服务用户
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. 下载、解压并将Robonomics二进制文件移动到*/usr/local/bin/*目录。您需要在本节命令中将*$ROBONOMICS_VERSION*替换为Robonomics的当前版本。您可以在[Robonomics存储库的Releases页面](https://github.com/airalab/robonomics/releases)上找到当前版本。
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"下载Robonomics 1.4.0二进制文件"} %}{% endroboWikiPicture %}


3. 创建名为*robonomics.service*的systemd服务文件：
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    并在服务文件中添加以下行：
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

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"创建Robonomics服务文件"} %}{% endroboWikiPicture %}


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. 保存此文件，然后启用并启动服务：
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

遥测网址：https://telemetry.parachain.robonomics.network/#/Robonomics

可以使用`journalctl -u robonomics.service -f`监视收集器日志。

一旦启动Robonomics收集器，它将开始与Kusama中继链同步，这可能需要相当长的时间，具体取决于您的网络速度和系统规格，因此我们建议下载Kusama快照。


## 使用Kusama快照加速同步过程

我们建议在创建并启动Robonomics服务后立即执行此操作。您可以在以下页面找到有关快照和使用说明的更多信息：https://ksm-rocksdb.polkashots.io/

说明：

1. 停止Robonomics服务并删除当前的Kusama数据库目录：
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. 下载实际快照并解压缩：
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# tar -xf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"下载 Kusama 快照"} %}{% endroboWikiPicture %}

    成功解压缩后，您可以删除已下载的存档：
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. 为数据库文件夹设置正确的所有权：
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. 再次启动 Robonomics 服务：
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. 检查服务日志：
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"检查服务日志"} %}{% endroboWikiPicture %}

## 故障排除
### 错误："State Database error: Too many sibling blocks inserted"
要解决此错误，只需在归档模式下启动您的收集器：

1) 首先，需要停止 Robonomics 服务：

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) 然后在服务文件的平行链部分添加参数 `--state-pruning=archive`。编辑后的服务文件示例：
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

3) 重新加载 systemd 管理器配置：
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) 删除现有的平行链数据库：
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) 启动 robonomics 服务：
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    然后需要等待平行链数据库同步完成。

### 错误："cannot create module: compilation settings are not compatible with the native host"
此错误与虚拟化参数有关。需要使用“host-model”类型的模拟处理器。您可以在虚拟化主机上设置这个。

但是，如果在任何托管服务上遇到此错误，请仅向技术支持咨询此问题。