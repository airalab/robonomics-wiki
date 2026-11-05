---
title: 运行收集人节点
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

收集人（collator）负责为 Robonomics 平行链出块。本指南介绍如何在 Linux 服务器上部署收集人、在链上注册，以及收集人如何获得收益。

本指南基于运行时仓库中的[收集人指南](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md)。

## 准备工作

- 一台服务器：8 核 CPU、64 GB 内存、2 TB NVMe。这样的服务器每月大约 120–150 美元。
- 磁盘：平行链和 Polkadot 中继链加起来大约占用 1.1 TB，并且还在增长。至少预留 2 TB。
- 一个 Robonomics 账户，可用余额超过 32 XRT。

## 1. 安装节点

Robonomics 没有自己的节点二进制文件。收集人使用 Parity 的通用 `polkadot-omni-node`，加载 Robonomics 的链规范运行。本指南假设有一个 `robonomics` 用户，主目录是 `/var/lib/robonomics/`，base path 是 `/var/lib/robonomics/base/`。

从 [Polkadot SDK releases](https://github.com/paritytech/polkadot-sdk/releases) 下载 `polkadot-omni-node`。请使用最新的 `polkadot-stable*` 版本；下面的命令使用 `polkadot-stable2609`。

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

下载链规范：

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. 生成网络密钥

没有网络密钥，收集人无法启动：

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

密钥会写入 `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`。请备份它。

## 3. 启动节点

systemd 服务推荐使用的 `ExecStart`：

{% codeHelper {copy: true} %}

```
ExecStart=/usr/local/bin/polkadot-omni-node \
  --name "YOUR_NODE_NAME" \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json \
  --base-path /var/lib/robonomics/base/ \
  --collator \
  --sync warp \
  --telemetry-url "wss://telemetry.parachain.robonomics.network/submit/ 0" \
  -- \
  --sync warp
```

{% endcodeHelper %}

- 第一个 `--sync warp` 作用于平行链，`--` 之后的那个作用于内嵌的中继链。没有它，中继链同步可能要花上几周。
- 链规范中没有遥测地址，所以用 `--telemetry-url` 开启遥测。

## 4. 生成会话密钥

会话密钥是 Aura（sr25519）密钥。临时用 `--rpc-methods unsafe` 启动节点，然后用你的收集人账户调用 `author_rotateKeysWithOwner`：

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

返回结果有两个字段：`keys` 和 `proof`。两个都要保存。检查节点是否持有这些密钥：

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

然后去掉 `--rpc-methods unsafe`，重启节点。

## 5. 在链上注册

用你的收集人账户发送以下 extrinsic，例如在 [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics) 中：

1. `session.setKeys(keys, proof)`，填入上一步得到的两个值。不要传空的 proof：proof 把密钥和你的账户绑定在一起。
2. `collatorSelection.registerAsCandidate()`。这会质押 **32 XRT**。

会话切换之后，你的节点就会加入收集人集合。运行时中一个会话是 3,600 个区块，按 6 秒出块计算约 6 小时。

请在链上检查你的候选资格，而不只看节点是否健康：在 **Developer → Chain state** 中查看 `collatorSelection.candidateList` 和 `collatorSelection.invulnerables`。

质押数额和候选人限制都是运行时设置。修改它们需要 Root 公投。见 [XRT 与治理](/docs/xrt-and-governance/)。

## 收益方式

收集人有两种收入：

1. **出块奖励。** 每个区块的出块者直接获得固定铸造的 0.0042 XRT。这一机制从运行时 43 开始实行。
2. **手续费和小费。** 所有手续费和小费都进入收集人资金池。区块的出块者从资金池中获得一份。

出块奖励的设定目标是覆盖服务器成本并留有余量：

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

输入参数是：每年 2,040 美元的服务器、7 个收集人、30% 的余量，XRT 价格按 1 美元计。输入参数变化时，会通过运行时升级重新调整奖励。

你的收入取决于你出块的份额：收集人越多，每个收集人出的块就越少。背景和实测数据：[Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/)。
