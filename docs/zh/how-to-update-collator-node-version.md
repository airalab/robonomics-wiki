---
title: 如何更新Robonomics Collator节点版本

contributors: [Leemo94]
---

在阅读本文之前，建议您先阅读以下文章：["如何构建Collator节点"](/docs/how-to-build-collator-node)和["如何启动Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator)。

本文包含更新Robonomics Collator节点（在Ubuntu上运行）所需的命令，并在之后给出一个示例。

## **所需命令**

0. 在开始之前，建议您以`root`身份登录，如果没有，请使用以下命令：

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. 停止Robonomics服务：

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. 删除之前的Robonomics版本（确保您在正确的目录中）：

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. 获取[最新版本](https://github.com/airalab/robonomics/releases)的Robonomics：

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. 解压文件：

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. 移动文件：

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

您需要将此文件移动到您安装Robonomics节点的正确目录中）

</robo-wiki-note>

6. 启动Robonomics：

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

将Collator节点升级到Robonomics v1.8.4的示例：

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

## **在未设置基本路径的情况下更改Kusama Relay Chain数据库**

有时，Kusama Relay Chain的某些快照会导致您的节点出现错误。这通常会导致节点停止工作。由损坏的Relay Chain数据库引起的示例错误：

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

为了修复此错误，您应该删除现有的Kusama Relay Chain数据库（可能是RocksDb），并将其替换为其他数据库，如ParityDb。执行以下命令：

1. 找到Robonomics节点的目录并检查文件：

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. 确认您看到了polkadot目录，然后进入chains目录：

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3.删除`ksmcc3`目录：

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. 创建一个新的`ksmcc3`目录。

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. 现在您需要下载一个新的快照。此示例使用了一个经过大量修剪的Relay Chain快照，但您可以将其替换为任何您喜欢的快照。

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. 在快照下载时，打开一个新的会话并编辑您的服务文件：


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

修改与数据库和修剪相关的服务文件中的行：

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
使用`Ctrl + S`然后`Ctrl + X`保存并退出服务文件。

7. 现在您需要重新加载守护程序。

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. 到此时，在您的其他会话中，希望新的数据库已经下载完成，因此解压文件：

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. 解压完成后，执行以下操作：

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. 现在您可以启动服务，监视任何错误，并检查它是否同时连接到Relay Chain和Parachain。


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>