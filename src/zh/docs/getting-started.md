---
title: 快速入门
contributors: [Vourhey, positivecrash, ensrationis]
---

本页带你从零开始，在 Robonomics 网络上写下第一条记录。你需要一个浏览器、一个钱包扩展和少量 XRT。

## 1. 创建账户

1. 安装 [Polkadot.js 扩展](https://polkadot.js.org/extension/)，或其他支持自定义网络的 Polkadot 钱包。
2. 在钱包中创建账户。把助记词抄下来，离线保存。
3. 同一个账户也能在 Robonomics 上使用。Robonomics 用自己的地址格式（SS58 前缀 32）显示地址，所以你在这里的地址以 `4` 开头。

账户只有在余额达到存在性押金（existential deposit）0.000001 XRT 后，才会在链上存在。

## 2. 获取 XRT

需要的量很少。撰写本文时，一条 datalog 记录的手续费远低于 0.001 XRT。

目前可以交易 XRT 的地方：

- **以太坊上的 Uniswap。** 以太坊上的正式 XRT 是通过 Snowbridge 从 Polkadot 桥接过去的 XRT。合约地址是 `0x1F752250f518e419f2F03804E25728c5C6DfF73f`。[在 Uniswap 上兑换](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f)。[Snowbridge](https://app.snowbridge.network/send) 用于在以太坊和 Polkadot 之间转移代币。
- **Polkadot Asset Hub。** Asset Hub 上有 XRT，也有一个 DOT–XRT 兑换池。

把 XRT 从 Asset Hub 转到你在 Robonomics 平行链上的账户，属于跨链转账。目前还没有发布分步指南。遇到问题时，可以在 Telegram 群 [XRT Traders](https://t.me/xrt_trade) 提问。

{% roboWikiNote {type: "warning", title: "旧链接"}%} 一些旧页面仍然链接到已经下架 XRT 的交易所，以及以太坊上的旧代币 `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`。旧代币不是正式 XRT。 {% endroboWikiNote %}

## 3. 连接 Polkadot.js Apps

打开[使用 Robonomics RPC 的 Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer)。它会连接到公共节点 `wss://polkadot.rpc.robonomics.network/`。在钱包扩展中允许该网站访问，你的账户就会显示出来。

查看区块、账户和转账，也可以用区块浏览器 [scan.robonomics.network](https://scan.robonomics.network)。

<div id="4-send-your-first-record"></div>

## 4. 发送第一条记录

最简单的第一步是一条 datalog 记录：一小段以你的账户名义存储在链上的数据。

1. 在 Polkadot.js Apps 中打开 **Developer → Extrinsics**。
2. 选择你的账户，然后选择 `datalog` 和 `record`。
3. 输入数据，最多 512 字节。纯文本即可。
4. 提交交易，并在钱包中签名。

要读取记录，打开 **Developer → Chain state**，选择 `datalog` 和 `datalogIndex`，查询你的账户。结果会显示哪些槽位存有你的记录。然后用你的账户和槽位号查询 `datalogItem`。每条记录都带有时间戳。

Datalog 是[旧版 pallet](/docs/legacy-pallets/#datalog) 之一。它仍然可用，适合做第一次测试，但新项目应该使用设备树。

## 5. 下一步：描述你的设备

Robonomics 的核心是设备树。你为自己的设施创建一个节点，再为它的各个部分和设备添加节点，并决定谁可以更新它们。先看[设备树（CPS）](/docs/device-tree/)，再看[连接设备](/docs/connect-devices/)。
