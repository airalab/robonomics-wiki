---
title: 将云AI安全连接到工厂生产线
contributors: [vitl2907]
---

Robonomics技术已经能够解决工业4.0面临的挑战，并已经应用于工业环境中的实际场景。

许多人工智能公司正在开发解决方案，优化工厂生产线上的流程，使工厂能够以更低的成本生产更多产品。然而，大多数工厂不愿直接将基础设施连接到云端，因为这可能导致潜在的网络安全风险，可能导致数百万美元的损失，甚至可能导致人员伤亡。

[MerkleBot](https://merklebot.com) 利用[Robonomics Network](https://robonomics.network) 为工业客户构建了一种安全连接工厂与基于云的人工智能的解决方案。

本文是在我们与[Veracity Protocol](https://www.veracityprotocol.org/)进行的实验之后撰写的，该协议使用算法基于移动设备的照片创建任何物理物品的非侵入式保护。

这个用例展示了使用机械臂扫描工业零件的过程。

[演示视频](https://youtu.be/8AL70LFVX5w)

## 逐步过程

### DApp作为用户界面

{% roboWikiPicture {src:"docs/google-play-store.gif", alt:"/google-play-store"} %}{% endroboWikiPicture %}

DApp充当操作员的用户界面。它用于请求启动机器人收集照片，其目的是允许工厂环境与基于云的人工智能之间进行安全通信。

### 启动机器人

{% roboWikiPicture {src:"docs/Veracity_Protocol_Transaction.gif", alt:"/Veracity_Protocol_Transaction"} %}{% endroboWikiPicture %}

操作员通过在DApp中签署交易来启动机器人扫描。这一步确保了工厂生产线上的过程只能基于公共区块链中的交易开始。

机器人通过Robonomics Network从区块链接收命令并开始扫描。Robonomics Network技术使我们能够缩小业务目标和机器人操作之间的差距。

### 数据收集并发送到基于云的人工智能

在DApp中，操作员看到确认信息，机器人开始扫描放在桌子上的物品，例如在这个用例中，或者根据需要直接在工厂生产线上扫描。

{% roboWikiPicture {src:"docs/Veracity_Protocol_Launch.gif", alt:"/Veracity_Protocol_Launch"} %}{% endroboWikiPicture %}

当机器人收集数据时，它会将数据存储在本地，并通过IPFS协议使其可用于基于云的人工智能。通过加密数据并通过区块链交易组织数据交换，我们可以授权访问基于云的人工智能，同时确保数据保持安全和完整。

基于公共区块链的共享安全构建的Robonomics中的安全机制，使得获得大多数工厂无法自行组织的安全级别成为可能。

### 数字护照创建

当基于云的人工智能分析数据时，日志文件和建议会自动记录为[数字护照](https://wiki.robonomics.network/docs/create-digital-identity-run-by-ethereum/)。由于区块链记录具有通过IPFS协议到所有这些文件的哈希，因此可以追溯每个操作和扫描。

## 对用例的评论

在这个用例中，使用了Universal Robot UR3工业机械臂。但由于Robonomics支持ROS，大多数主要的工业操纵器都可以安全地连接到基于云的人工智能，包括KUKA、Fanuc和Yaskawa。

如果您有兴趣了解如何安全地部署和集成基于云的人工智能工具，请[联系我们](mailto:v@merklebot.com)。