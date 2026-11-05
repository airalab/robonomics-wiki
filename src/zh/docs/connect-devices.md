---
title: 连接设备
contributors: [Fingerling42, nakata5321, ensrationis]
---

把设备接入 Robonomics 有两种方式：通过 Home Assistant，或者直接接入，适用于任何能签署交易或能与网关通信的设备。

现成的硬件和智能家居安装服务由 Pinout Limited 提供。产品和服务见 [pinout.cloud](https://pinout.cloud)。

## Home Assistant

Home Assistant 有三个集成。它们的功能不同，更新程度也不一样。

| 集成 | 功能 | 状态 |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration)（Pinout） | 监控 Home Assistant 中的问题。它把错误报告加密后上传到 IPFS，并在链上记录 CID。报告会变成你的集成商那里的支持工单。它每天还会发送一次心跳。 | 持续维护。以预发布版本发布。需要 Home Assistant 2026.3.1 或更新版本；通过 HACS 作为自定义仓库安装。 |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration)（airalab） | 在 RWS 订阅下通过加密交易远程访问 Home Assistant，另外支持用户管理和备份。 | 已过时。最后一个版本是 2025 年 10 月的 2.2.1。它使用旧的 `robonomics-interface` 1.6.3，需要本地 IPFS 节点，默认节点仍然指向已经停止的 Kusama。可以选择 Polkadot 节点。尚未针对当前运行时测试。 |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration)（airalab） | 通过局域网读取 Altruist 传感器。不使用区块链。 | 功能简单，仅限本地。 |

airalab 的 Robonomics 集成依赖 RWS 订阅。订阅的现状见[旧版 pallet](/docs/legacy-pallets/#rws-subscriptions)。

## 任意设备

以下是连接你自己设备的基本步骤。

1. **为设备创建独立账户。** 密钥保存在设备上。
2. **为设备的交易付费。** 可以给该账户转一点 XRT（撰写本文时，一条 datalog 记录的费用不到千分之一 XRT），也可以用 `rws.set_devices` 把它加入 RWS 订阅（最多 32 个设备），并通过 `rws.call` 发送它的交易。
3. **在设备树中描述设施。** 为场地创建一个节点，再为它的设备创建节点。把设备账户绑定到对应节点，作为节点的身份。如果由网关代设备写入，就给网关授予 `Write` 权限。见[设备树（CPS）](/docs/device-tree/)。
4. **写入数据。** 把当前状态写入节点的 `payload`（最大 8 KiB），或者用 `datalog.record` 写记录（最大 512 字节，[旧版](/docs/legacy-pallets/#datalog)）。较大的数据放到 IPFS 上，只写入 CID。
5. **按需发送命令。** 旧版的 `launch` 调用会向设备账户发送一个带签名的命令事件。见 [Launch](/docs/legacy-pallets/#launch)。

每一步可用的库：Python 的 `robonomics-interface`、JavaScript 的 `@polkadot/api`，以及 Rust 的 `libcps` 和 `cps` 工具。见[客户端库](/docs/client-libraries/)。

### 小型设备的网关

并不是所有设备都能直接与链通信。下面这些开源网关可以充当中间层：

- **edge**（[airalab/robins](https://github.com/airalab/robins)）：通过 HTTP 和 Meshtastic 接收签名消息，再通过 libp2p GossipSub 转发出去。
- **mqtt-bridge**（[airalab/robins](https://github.com/airalab/robins)）：把 MQTT 消息转换为设备树更新。
- **sensors-connectivity**（[airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)）：收集带签名的传感器测量数据，转发到 IPFS pubsub 和平行链。[sensors.social](https://sensors.social) 上的传感器都通过它接入。

公共中继节点及其状态见 [pubsub.robonomics.network](https://pubsub.robonomics.network)。
