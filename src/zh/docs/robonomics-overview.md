---
title: 概览
contributors: [ensrationis]
---

Robonomics 是 Polkadot 上面向设备的云。你可以在云中保存设备的描述和当前状态，写入测量数据，发送命令。费用用网络代币 XRT 支付。这朵云不归任何一家公司运营：它由独立的收集人（collator）运行，由 XRT 持有者通过链上投票治理。

## 主要组成部分

- **设备树（CPS）。** 由节点组成的树，用来描述你的设施：一栋楼、楼里的房间、房间里的设备。每个节点保存一段简短的描述和当前状态。所有者决定谁可以写入树的哪一部分。设备树是当前 Robonomics 的核心。见[设备树（CPS）](/docs/device-tree/)。
- **XRT。** 网络代币。用于支付交易手续费和订阅费，XRT 持有者也用它投票。见 [XRT 与治理](/docs/xrt-and-governance/)。
- **治理。** 标准的 Polkadot OpenGov，共两条轨道。没有 Sudo 密钥：任何特权变更，包括运行时升级，都必须通过公投。
- **收集人。** 负责出块的服务器。任何人都可以质押 XRT 成为候选人。见[运行收集人节点](/docs/run-collator/)。

较早的组件（Datalog、Launch、RWS 订阅、Digital Twin、Liability）仍然可用，但已被弃用。见[旧版 pallet](/docs/legacy-pallets/)。

## 网络参数

| | |
|---|---|
| 网络 | Polkadot 上的 Robonomics 平行链 |
| Para ID | 3388 |
| 代币 | XRT，9 位小数 |
| 地址格式 | SS58 前缀 32（地址以 `4` 开头） |
| 出块时间 | 6 秒（目标值） |
| 公共 RPC | `wss://polkadot.rpc.robonomics.network/` |
| 区块浏览器 | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [使用 Robonomics RPC 打开](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Polkadot 是唯一在运行的 Robonomics 网络。Kusama 上的平行链已经停止。见[其他网络上的 XRT](/docs/xrt-migration/)。

## 正在开发的内容

Robonomics 5.0 分层构建这朵云。治理以及带有 Scope 和访问权限的设备树已经上线。订阅功能正在开发中：设备将无需自己持有 XRT 就能使用网络。存储和计算还在规划阶段，目前没有相关代码。

详情见博客文章 [Robonomics 5.0，第一部分](https://robonomics.network/blog/robonomics-5-0-runtime-first/)和 [5.0 路线图](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md)。

## 软件与维护者

Robonomics 的所有软件都是开源的：

- [airalab/robonomics](https://github.com/airalab/robonomics)：运行时及其 pallet。
- [airalab/robins](https://github.com/airalab/robins)：工具集，包括 `cps` 命令行工具和设备网关。
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface)：Python 库。
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app)：网页应用 [robonomics.app](https://robonomics.app)。

Robonomics 没有单独的节点程序。收集人使用 Parity 的通用 `polkadot-omni-node`，加载 Robonomics 的链规范（chain spec）运行。

Robonomics 的各个网站，包括本 wiki，由 Akagi Engineering Co., Ltd.（日本）运营。新闻和版本说明发布在 [Robonomics 博客](https://robonomics.network/blog/)上。
