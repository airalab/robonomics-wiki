---
title: 将云AI安全连接到工厂车间
contributors: [vitl2907]
---

Robonomics技术已经能够解决工业4.0面临的挑战，并已经应用于工业环境中的实际场景。

大量的AI公司正在构建解决方案，以优化工厂车间的流程，使工厂能够以更低的成本生产更多产品。然而，大多数工厂不愿直接将基础施连接到云端，因为这会导致潜在的网络安全风险，可能导致数百万美元的损失甚至人员伤亡。

[MerkleBot](https://merklebot.com)已经使用[Robonomics Network](https://robonomics.network)构建了一个安全连接工厂与基于云端AI的解决方案，用于工业客户。

本文是在我们与[Veracity Protocol](https://www.veracityprotocol.org/)进行的一项实验之后撰写的，该实验使用算法基于移动设备的照片创建任何物理物品的非侵入性保护。

这个用例展示了使用机器人手臂扫描工业零部件的过程。

[Demo video](https://youtu.be/8AL70LFVX5w)

## 逐步过程

### DApp作为用户界面

<!-- ![](../images/google-play-store.gif) -->
<!-- <img src="../images/google-play-store.gif" /> -->
<robo-wiki-picture src="google-play-store.gif" />

DApp作为操作员的用户界面。它用于请求启动机器人以收集照片，其目的是允许工厂环境与基于云端AI之间进行安全通信。

### 启动机器人

<!-- ![](../images/Veracity_Protocol_Transaction.gif) -->
<!-- <img src="../images/Veracity_Protocol_Transaction.gif" /> -->
<robo-wiki-picture src="Veracity_Protocol_Transaction.gif" />

操作员通过在DApp中签署交易来启动机器人扫描。这一步确保了工厂车间的流程只能基于公共区块链中的交易开始。

机器人通过Robonomics Network从区块链接收命令并开始扫描。Robonomics Network技术使我们能够弥合业务目标和机器人操作之间的差距。

### 数据收集并发送到基于云端AI

在DApp中，操作员可以看到确认信息，机器人开始扫描放置在桌子上的物品，例如在这个用例中，或者根据需要直接工厂生产线上进行扫描。

<!-- ![](../images/Veracity_Protocol_启动.gif) -->
<!-- <img src="../images/Veracity_Protocol_Launch.gif" /> -->
<robo-wiki-picture src="Veracity_Protocol_Launch.gif" />


当机器人收集数据时，它会将数据存储在本地，并通过IPFS协议将其提供给基于云端AI。通过对数据进行加密，并通过区块链交易组织数据交换，我们可以授权访问基于云端AI，同时确保数据的安全性和完整性。

基于公共区块链的共享安全性构建的Robonomics安全机制，使得大多数工厂自行组织这种安全级别变得代价高昂。

### 数字护照创建

当基于云端AI分析数据时，日志文件和建议会自动记录为[数字护照](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/)。由于区块链记录通过IPFS协议与所有这些文件的哈希相关联，因此可以追溯每个操作和扫描。

## 关于用例的评论

在这个用例中，使用了Universal Robot UR3工业机械臂。但由于Robonomics对ROS的支持，大多数主要的工业操纵器都可以安全地连接到基于云端AI，包括KUKA、Fanuc和Yaskawa。

如果您对安全部署和集成基于云端AI工具感兴趣，请[联系我们](mailto:v@merklebot.com)
