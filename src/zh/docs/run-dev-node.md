---
title: 运行开发节点
contributors: [LoSk-p, ensrationis]
---

开发节点是一条只有单个节点的本地 Robonomics 链，用来测试你的代码。区块即时产出，测试账户自带资金，而且不会触及主网。

现在已经没有 `robonomics --dev` 二进制文件了。你需要从 [airalab/robonomics](https://github.com/airalab/robonomics) 构建运行时，用它生成链规范，然后用这个规范运行 Parity 的通用 `polkadot-omni-node`。

## 一条命令（Nix）

在仓库的克隆目录中运行：

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

脚本会在需要时用 `dev-runtime` feature 构建运行时，生成一个临时链规范，然后启动 `polkadot-omni-node --chain <spec> --dev`。

## 不用 Nix

用 Cargo 安装这两个工具，然后运行同一个脚本：

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## 手动执行

如果想保留链规范或修改节点参数，可以自己逐步执行：

{% codeHelper {copy: true} %}

```bash
cargo build --release -p robonomics-runtime --features dev-runtime

chain-spec-builder -c ./chain_spec.json create \
  -n "Robonomics Dev" -i robonomics-dev -t development \
  -r ./target/release/wbuild/robonomics-runtime/robonomics_runtime.compact.compressed.wasm \
  --para-id 2000 --relay-chain westend-local \
  --properties tokenSymbol=XRT,tokenDecimals=9 \
  named-preset development

polkadot-omni-node --chain ./chain_spec.json --dev
```

{% endcodeHelper %}

没有内置的 `--chain dev`：每次都要传入生成的链规范，再加上 `--dev`。加上 `--base-path <dir>` 可以在重启之间保留链状态。

## 你会得到什么

- RPC 和 WebSocket 地址 `ws://127.0.0.1:9944`。
- 链 ID `robonomics-dev`，para ID 2000，中继链 `westend-local`，代币 XRT，9 位小数。
- 预先充值的开发账户：Alice、Bob、Charlie 以及其他常用的测试密钥。
- Alice 是 Sudo。Sudo 只存在于 `dev-runtime` 构建中，主网上永远没有。
- 每次启动都是全新状态，除非你设置了 `--base-path`。

把 [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) 连接到 `ws://127.0.0.1:9944` 就可以四处看看。使用 `cps` 工具时，设置 `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` 和 `ROBONOMICS_SURI=//Alice`。

## 在开发链上使用 RWS

RWS 拍卖由 Root 创建。测试 RWS 代码时如果想跳过这一步，可以用 `robonomics-interface` 仓库中的 `scripts/devchain.sh`，它启动的开发链在创世区块中就已经包含 RWS 拍卖。

更多选项，包括 Docker 镜像，见[开发者指南](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain)。
