---
title: 如何启动Robonomics收集器
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  在本文的演示和截图中，我们使用了Robonomics的1.4.0版本。您需要使用相同的命令，但将Robonomics的版本替换为当前版本。
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

目前，Robonomics网络主要由初始开发者维护，但任何人都可以支持该项目。每个额外的区块链全节点都有助于使其更具可持续性和容错性。Robonomics节点二进制文件可在[发布](https://github.com/airalab/robonomics/releases)资产中获得，或者可以从源代码构建。

## 什么是碎片节点

收集器是Robonomics平行链的一部分。这种类型的节点为Robonomics链创建新的区块。

>碎片节点通过从用户收集碎片链交易并为中继链验证者生成状态转换证明来维护碎片链。换句话说，碎片节点通过将碎片链交易聚合到碎片链块候选项中，并根据这些块为验证者生成状态转换证明来维护碎片链。

您可以在相关的[Polkadot维基页面](https://wiki.polkadot.network/docs/learn-collator)上了解更多关于收集器的信息。

在 Robonomics 平行链中，每个整理者构建的每个区块都会获得 (**0.001598184 XRT**) 的奖励（奖励在区块被密封到链上时发生）。
此外，构建区块的收集器将获得所创建区块中包含的**50%的交易费用**。

## 要求

建议使用[Polkadot验证器](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware)的**标准硬件要求**来启动收集器：
+ x86-64兼容。
+ Intel Ice Lake或更新（Xeon或Core系列）；AMD Zen3或更新（EPYC或Ryzen）。
+ 4个物理核心@ 3.4GHz。
+ 禁用同时多线程（Intel上的超线程，AMD上的SMT）。
+ 存储-1 TB的NVMe SSD（因为它应该具有合理的大小以处理区块链的增长）。
+ 内存-32 GB DDR4 ECC


在本文中，我们使用以下规格：
+ 4 vCPU
+ 700 GB的NVMe空间用于收集器的数据库。需要能够扩展此磁盘空间。
+ 8GB RAM


## 重要信息
1. 我们在这些说明中使用了一些变量，您需要在所有命令中替换为自己的值：
    + **%NODE_NAME%**是节点名称。例如：*my-robonomics-kusama-collator*
    + **%BASE_PATH%**是挂载卷的路径。例如：*/mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%**Polkadot生态系统中的帐户地址，以SS58格式表示。例如：*4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. 请注意，在收集器的服务启动中需要包含*--state-cache-size=0*。此参数对于收集器的稳定性很重要。
您可以在github上的相关[问题](https://github.com/airalab/robonomics/issues/234)中查看更多信息。

## 首次轻松启动Robonomics收集器

您可以直接在命令行中轻松启动收集器以检查错误。
在执行此操作后，强烈建议将Robonomics收集器作为服务启动（请参阅下一步）。

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

1. 为服务创建具有主目录的用户
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. 下载、提取并将Robonomics二进制文件移动到*/usr/local/bin/*目录。您需要在本节命令中替换*$ROBONOMICS_VERSION*为Robonomics的当前版本。您可以在github上的[Robonomics存储库的发布页面](https://github.com/airalab/robonomics/releases)上找到当前版本。
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


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

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. 保存此文件，然后启用并启动服务：
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

遥测网址：https://telemetry.parachain.robonomics.network/#/Robonomics

可以通过以下方式监控整理器日志：`journalctl -u robonomics.service -f`

Robonomics 整理器启动后，它将开始与 Kusama 中继链同步，这可能需要相当长的时间，具体取决于您的网络速度和系统规格，因此我们建议下载 Kusama 快照。 


## 使用Kusama快照加速同步过程

我们建议在创建和启动Robonomics服务后立即执行此操作。有关照和使用说明的更多信息，请访问以下页面：https://ksm-rocksdb.polkashots.io/

说明：

1. 停止Robonomics服务并删除当前的Kusama数据库目录：
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. 下载实际的快照并解压缩：
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    解压成功后可以删除下载的压缩包：
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. 为数据库文件夹设置正确的所有权：
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. 再次启动Robonomics服务：
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. 检查服务日志：
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```    
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## 故障排除
### 错误："State Database error: Too many sibling blocks inserted"
要修复此错误，您可以在存档模式下启动整理器：

1）首先，需要停止Robonomics服务： 
    
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    

2）然后在服务文件的平行链部分添加参数`--state-pruning=archive`。编辑后的服务文件示例：
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

3）重新加载systemd管理器配置：
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4）删除现有的平行链数据库：
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5）启动robonomics服务：
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    之后需要等待平行链数据库的同步。

### 错误："cannot create module: compilation settings are not compatible with the native host"
此错误与虚拟化参数有关。需要使用“host-model”类型的模拟处理器。您可以在虚拟化主机上进行设置。

但是，如果您在任何托管平台上遇到此错误，您需要向技术支持咨询此问题。
