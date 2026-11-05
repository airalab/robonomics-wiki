---
title: XRT 与治理
contributors: [Leemo94, ensrationis]
---

XRT 是 Robonomics 网络的代币。你用它支付云服务费用，也用它投票决定网络如何变化。本页介绍这两方面。

## XRT 的用途

- **手续费。** 每笔交易都用 XRT 支付手续费。所有手续费和小费都进入收集人的资金池。
- **订阅。** 现有的订阅（RWS）通过拍卖获得，中标的出价会被销毁。见[旧版 pallet](/docs/legacy-pallets/#rws-subscriptions)。
- **投票。** XRT 持有者对公投进行表决。
- **收集人质押。** 收集人候选人需要质押 XRT。见[运行收集人节点](/docs/run-collator/)。

## 单位与供应量

- XRT 有 9 位小数。1 XRT = 1,000 Glushkov（mXRT）= 1,000,000 Coase（µXRT）。
- 存在性押金为 1 Coase，即 0.000001 XRT。
- 运行时为每个区块的出块者铸造 0.0042 XRT，作为收集人奖励。代币经济模型规定，收集人增发每年最多 25,000 XRT。
- 代币经济模型把总供应量上限定为 5,100,000 XRT。分配方案和代币生命周期见[代币经济页面](https://robonomics.network/tokenomics/)。

以太坊和 Polkadot Asset Hub 上也有 XRT。见[其他网络上的 XRT](/docs/xrt-migration/)。

## 治理

Robonomics 使用标准的 Polkadot OpenGov。没有 Sudo 密钥：自运行时 52（2026 年 10 月）起，任何特权变更，包括运行时升级，都需要公投。Sudo 本身也是通过公投移除的。没有理事会，没有 fellowship，也没有国库轨道。

公投必须同时满足两个阈值才能通过：

- **Approval（赞成率）**：已投票数中"赞成"所占的比例。
- **Support（支持率）**：投了"赞成"的 XRT 占全部 XRT 的比例。

两个阈值开始时都很高，在决策期内逐渐降低。公投通过并在确认期内保持通过状态后，调用就会被执行。

### 轨道

| | Root | Whitelisted Caller |
|---|---|---|
| 用途 | 运行时升级和其他任何特权调用：收集人质押和限制、RWS 拍卖、配置 | 快速通道，用于 Core Team 已列入白名单的某个具体调用 |
| 同时进入决策的公投数 | 1 | 10 |
| 决策押金 | 5,000 XRT | 1 XRT |
| 准备期 | 12 小时 | 5 分钟 |
| 决策期 | 14 天 | 3 天 |
| 确认期 | 24 小时 | 20 分钟 |
| 最短执行延迟 | 1 小时 | 5 分钟 |
| 赞成率 | 在决策期内从 90% 降到 51% | 99% → 80% |
| 支持率 | 50% → 15% | 2% → 1% |

以上是当前运行时中的数值。修改它们需要 Root 公投。

### 其他押金

- **提交押金：** 10 XRT。任何账户都可以提交公投。
- **原像（preimage）押金：** 100 XRT，外加调用每字节 0.00001 XRT。运行时代码把这些值标记为占位值，所以它们可能会变。
- 公投如果在 14 天内没有进入决策阶段，就会超时。

### Core Team 与白名单

Core Team 是一个最多 7 名成员的小型集体。只有 Root 公投才能改变它的成员。

白名单的流程如下：

1. Core Team 投票，把某个确切调用的哈希列入白名单。至少需要全体成员的一半同意。Core Team 的动议持续 3 天。
2. 列入白名单本身不执行任何操作。该调用仍需在 Whitelisted Caller 轨道上通过公投。
3. 未列入白名单的调用不能走快速通道，但仍然可以走 Root 轨道。

因此，进行特权变更有两条路：一次 Root 公投，或者一个白名单调用加一次快速公投。两条路最终都由 XRT 持有者投票决定。

<div id="how-to-propose-a-change"></div>

## 如何提出变更

团队公布的步骤：

1. 在 [airalab/robonomics](https://github.com/airalab/robonomics/issues) 上提交 issue，描述你的想法。
2. 在 Polkadot.js Apps 中连接 Robonomics 网络，在 Governance 部分提交公投。
3. 告诉社区。

链上发生的过程：

1. 调用被存储为原像（需原像押金）。
2. 公投被提交到某条轨道上（10 XRT 提交押金）。
3. 有人缴纳决策押金：Root 为 5,000 XRT，Whitelisted Caller 为 1 XRT。任何人都可以缴纳。
4. 准备期结束、决策押金到位且轨道有空位后，公投进入决策阶段。之后在决策期内由投票决定结果。

## 如何投票

- 把 XRT 放在你自己在 Robonomics 网络上的钱包里。存放在交易所的代币不能投票。
- 使用信念投票（conviction）：锁定 XRT 的时间越长，你的票权重越大。

| 锁定期 | 投票权重 |
|---|---|
| 不锁定 | 0.1× |
| 7 天 | 1× |
| 14 天 | 2× |
| 28 天 | 3× |
| 56 天 | 4× |
| 112 天 | 5× |
| 224 天 | 6× |

- 你也可以不亲自投票，而是把投票权委托给另一个账户。

进行中和已结束的公投可以在 Polkadot.js Apps 的 Governance 部分查看，前提是已连接到 [Robonomics RPC](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer)。

## 延伸阅读

- [Robonomics 5.0：把钥匙交给 XRT 持有者](https://robonomics.network/blog/robonomics-5-0-governance/)
- [Sudo 已移除：Robonomics 云现在由社区运营](https://robonomics.network/blog/robonomics-5-0-sudo-removed/)
- [论坛上关于双轨道设计的讨论](https://forum.polkadot.network/t/robonomics-replacing-sudo-with-a-two-track-opengov-sized-for-a-small-community/18719)
