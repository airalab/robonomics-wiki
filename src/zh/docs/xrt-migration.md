---
title: 其他网络上的 XRT
contributors: [nakata5321, ensrationis]
---

正式 XRT 位于 Polkadot 上的 Robonomics 平行链。本页说明 Kusama 和以太坊上的 XRT 会怎样处理，以及 Polkadot Asset Hub 上的 XRT 情况。

## Kusama

Kusama 上的 Robonomics 平行链已经停止。它在 2026 年 9 月 28 日产出了最后一个区块 #12,268,835。数据库存档见 [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama)。

已发布的文章中关于 Kusama XRT 的说明：

- 最后一个区块时的所有 XRT 余额都将迁移到 Polkadot，并获得 **20% 的额外奖励**。
- Kusama 一侧**没有回购**。
- 余额会出现在 Polkadot 的什么位置、持有者是否需要做什么，将在另一篇文章中说明。

请关注 [Robonomics 博客](https://robonomics.network/blog/)上的这篇文章。资料来源：[The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) 和[代币经济页面](https://robonomics.network/tokenomics/)。

## 以太坊

以太坊上的旧 XRT 代币（`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`）已被弃用。2026 年 2 月 5 日，有人利用它的发行机制免费铸币。Polkadot 和 Kusama 上的 XRT 没有受到影响。

在快照时（以太坊区块 24,390,081）持有旧代币的用户可以迁移：

1. 打开迁移应用：[airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/)。
2. 连接 2026 年 2 月 5 日持有 XRT 的钱包。应用会显示你的快照余额和加上奖励后的数额。
3. 选择一个选项。每个地址只能选择一次。
   - **Accept（接受）**：在以太坊上领取正式 XRT，数额为快照余额加 20%。
   - **Decline（拒绝）**：改为参加回购计划，参考价格 2.20 美元，在 12–36 个月内分期支付，且以国库资金允许为限。

签名之前，请确认应用交互的是领取合约 `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c`。合约源代码见 [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts)。

你领取到的是以太坊上的正式 XRT，合约地址 `0x1F752250f518e419f2F03804E25728c5C6DfF73f`。它是通过 [Snowbridge](https://app.snowbridge.network/send) 从 Polkadot 按 1:1 桥接过来的 XRT。你可以持有它、在 Uniswap 上交易，或者桥接回 Polkadot。旧代币和新代币之间没有桥。

文章规定迁移窗口为 12 个月。未按时领取的 XRT 只能通过链上治理投票并提供所有权证明才能恢复。具体条款请阅读原文：[Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) 和 [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/)。

有问题请到 Telegram 群 [XRT Traders](https://t.me/xrt_trade) 提问。

## Polkadot Asset Hub

XRT 以外部资产（foreign asset）的形式存在于 Polkadot Asset Hub 上，并且有一个 DOT–XRT 兑换池。Asset Hub 上的手续费可以用 XRT 支付。

目前还没有发布在 Asset Hub 和 Robonomics 平行链之间转移 XRT 的用户指南。
