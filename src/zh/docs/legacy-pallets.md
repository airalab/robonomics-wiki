---
title: 旧版 pallet
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

早期 Robonomics 版本中的五个 pallet 仍然保留在运行时中：Datalog、Launch、RWS、DigitalTwin 和 Liability。[节点 README](https://github.com/airalab/robonomics#readme) 已将它们标记为弃用："following pallets will be removed in near future"（这些 pallet 将在不久后移除）。目前还没有公布移除日期。

它们现在在链上仍然可用，一些应用和集成也在使用它们。新项目请从[设备树](/docs/device-tree/)开始。

| Pallet | 功能 | 替代方案 |
|---|---|---|
| Datalog | 以你的账户名义存储简短记录 | 设备树；5.0 存储在规划中 |
| Launch | 向设备账户发送签名命令 | — |
| RWS | 免手续费交易的订阅 | 5.0 订阅（开发中） |
| DigitalTwin | 把数字孪生的主题映射到账户 | 设备树 |
| Liability | 各方之间的协议，结束时附带报告 | — |

## Datalog

Datalog 以你的账户名义在链上保存简短记录。每条记录都带时间戳。

- `record(record)` 添加一条最多 512 字节的记录。
- `erase()` 删除你的所有记录。
- 每个账户保留**最近 127 条记录**，更早的会被覆盖。（窗口共有 128 个槽位，其中一个始终保持空闲。）
- 较大的数据请放到 IPFS 上，只记录 CID。
- 读取用存储查询 `datalog.datalogIndex(account)`（返回第一个和最后一个槽位）和 `datalog.datalogItem([account, slot])`。对应的事件是 `NewRecord`。
- 不收押金，只收普通手续费。撰写本文时，一条完整的 512 字节记录大约花费 0.0006 XRT。
- 有 RWS 订阅时，可以通过 `rws.call` 免手续费发送记录。

目前的使用者：Home Assistant 的 Robonomics Report Service、sensors.social 的连接代理，以及 robonomics.app 中的 Altruist 和能耗监测图表。

第一条记录的操作步骤见[快速入门](/docs/getting-started/#4-send-your-first-record)。

## Launch

Launch 向设备发送签名命令。

- `launch(robot, param)`：`robot` 是设备账户，`param` 是 32 字节。常见做法是在这里放 IPFS CID 的摘要。
- 设备监听带有自己地址的 `NewLaunch(sender, robot, param)` 事件。
- 任何人都可以向任何地址发送 launch。设备必须自行检查发送者是谁。
- 该 pallet 还会把 `param` 写入一个全局的 `Goal` 值，任何人的每次 launch 都会覆盖它。请使用事件，而不是这个存储值。
- 手续费与一条简短的 datalog 记录差不多。有 RWS 订阅时可以免手续费发送。

robonomics.app 用 Launch 控制 Home Assistant，旧的 ROS 2 封装用它启动机器人。

<div id="rws-subscriptions"></div>

## RWS 订阅

RWS（Robonomics Web Services）为账户提供免手续费交易。

- 分两种：`Daily { days }` 和 `Lifetime { tps }`。
- 订阅中列出的设备通过 `rws.call(subscription_owner, call)` 发送调用，不付手续费。免费额度随时间累积。Daily 订阅的累积速度是 10,000 µTPS，相当于每秒 0.01 笔简单转账。
- `set_devices(devices)` 列出最多 32 个可以使用该订阅的设备账户。它会替换整个列表。只有列表中的设备才能使用 `rws.call`。
- `transfer(target)` 把你的订阅转给一个还没有订阅的账户。

### 如何获得订阅

- 订阅通过拍卖出售。`bid(index, amount)`：首次出价必须高于 1 XRT。出价会被冻结。有出价的拍卖每 10 个区块结束一次。中标出价会被销毁，订阅随即登记生效。
- [robonomics.app](https://robonomics.app) 中的 **Buy a subscription** 页面在一笔交易里完成两件事：对一个空闲拍卖出价，并把你自己的账户添加为设备。你的余额需要高于价格加 0.01 XRT。没有空闲拍卖时，应用会拒绝操作。

<div id="current-state"></div>

### 当前状态

- 只有 Root 才能发起新的拍卖。由于没有 Sudo，每一批新拍卖都需要一次 Root 公投。在公投通过之前，空闲拍卖可能会用完。
- 由预言机签发的订阅（例如来自以太坊上的 RWS 代币，2021 年的一次实验）目前没有接入：预言机账户未设置。代币经济页面说明，Kusama 的 XRT 余额迁移到 Polkadot 之后，RWS 将接入正式网络，首先面向 sensors.social 这样的非商业项目。
- 替代方案是 5.0 的订阅（Subscription）。有了它，设备无需自己持有 XRT 就能使用网络。它正在开发中，还没有进入运行时。

## DigitalTwin

数字孪生是一个主题列表，每个主题关联一个为它提供数据的账户。

- `create()` 创建一个孪生。
- `set_source(id, topic, source)` 把一个 32 字节的主题关联到数据源账户。
- `remove_source(id)` 移除数据源。

[设备树](/docs/device-tree/)将取代它。

## Liability

Liability 记录各方之间签署的协议。

- `create(agreement)` 记录一份已签署的协议。协议的技术部分指向 IPFS。
- `finalize(report)` 用一份报告结束协议。

该 pallet 还包含一个简单的协议市场。目前没有公布替代方案。
