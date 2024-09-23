---
title: 如何运行Robonomics Dev节点
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**为了在Robonomics上测试您的应用程序，您可能希望在开发模式下运行。本文展示了如何逐步获取您自己的本地测试实例的Robonomics的说明。**


## 获取节点二进制文件

1. 首先，您需要一个二进制文件，请从最新的[发布版本](https://github.com/airalab/robonomics/releases)中下载包含它的存档。

2. 转到存档文件夹，解压二进制文件并更改权限：

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## 运行

使用以下命令运行节点：

```bash
./robonomics --dev
```
您将看到以下输出：

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"从头开始", type: "note"}%} 如果您想清除现有的区块，可以通过删除位于`/tmp/substrate******/chains/dev/db/full`的RocksDB来实现。
将`******`替换为在启动时日志中显示的相应标识符。

如果您想每次从头开始启动节点，请使用`--tmp`标志。
{% endroboWikiNote %}


## 连接

现在，您可以通过[Polkadot Portal](https://polkadot.js.org/apps/#/explorer)连接到本地节点。

在左上角将网络更改为`Local Node`，然后点击`Switch`。

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

欢迎来到Robonomics的本地实例！

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}