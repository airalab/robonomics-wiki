---
title: 如何更新Robonomics Collator节点版本

contributors: [Leemo94]
---

建议在阅读本文之前先阅读以下文章：["如何构建Collator节点"](/docs/how-to-build-collator-node) 和 ["如何启动Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator)。

本文包含更新Robonomics collator节点（在Ubuntu上运行）所需的命令，并在之后提供一个示例。

## **所需命令**

0. 在开始之前，建议您以 `root` 身份登录，如果没有，请使用以下命令：

```shell
sudo su -
```

1. 停止Robonomics服务：

```shell
systemctl stop robonomics.service
```

2. 删除先前版本的Robonomics（确保您在正确的目录中）：

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

3. 获取Robonomics的[最新版本](https://github.com/airalab/robonomics/releases)：

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

4. 解压文件：

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

5. 移动文件：

```shell
mv robonomics /usr/local/bin/
```

{% roboWikiNote {type: "note"}%} 您需要将此文件移动到安装Robonomics节点的正确目录 {% endroboWikiNote %}

6. 启动Robonomics：

```shell
systemctl start robonomics.service
```

将collator节点升级到Robonomics v1.8.4的示例：

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

## **更改未设置基本路径的Kusama中继链数据库**

有时候Kusama中继链的某些快照会导致您的节点出现错误。这通常会导致您的节点停止工作。由损坏的中继链数据库引起的示例错误：

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

为了解决这个错误，您应该删除现有的Kusama中继链数据库（可能是RocksDb），并用另一个数据库（如ParityDb）替换它。执行以下命令：

1. 找到Robonomics节点的目录并检查文件：

```shell
cd /home/robonomics/
ls -a
```

2. 确认您看到polkadot目录，然后进入chains目录：

```shell
cd /polkadot/chains/
ls -a
```

3. 删除 `ksmcc3` 目录：

```shell
rm -r ksmcc3
```

4. 创建一个新的 `ksmcc3` 目录。

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

5. 现在您需要下载一个新的快照。此示例使用了一个经过大量修剪的中继链快照，但您可以将其替换为任何您喜欢的快照。

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

6. 在快照下载时，打开一个新会话并编辑您的服务文件：

```shell
sudo nano /etc/systemd/system/robonomics.service
```

修改与数据库和修剪相关的服务文件中的行：

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

使用 `Ctrl + S` 然后 `Ctrl + X` 保存并退出服务文件。

7. 现在您需要重新加载您的守护程序。

```shell
systemctl daemon-reload
```

8. 到这个时候，在您的另一个会话中，希望新的数据库已经下载完成，所以解压文件：

```shell
tar -xvzf ksm_pruned.tar.gz
```

9. 解压完成后，执行以下操作：

```shell
chown -R robonomics:robonomics paritydb
```

10. 现在您可以启动服务，监视任何错误，并检查它是否在中继链和平行链上进行对等连接：

```shell
systemctl start robonomics && journalctl -fu robonomics
```