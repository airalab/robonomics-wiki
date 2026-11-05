---
title: 客户端库
contributors: [PaTara43, ensrationis]
---

根据编程语言和需求选择库。操作设备树，用 `@polkadot/api`、Rust crate 或 `cps` 工具。在 Python 中使用 datalog 和 RWS，用 `robonomics-interface`。

| 库 | 语言 | 设备树 | 说明 |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | 无辅助函数 | Datalog、RWS、账户、加密 |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | 支持 | 通用 Substrate 客户端 |
| npm `robonomics-interface` | JavaScript | 不支持 | robonomics.app 使用 |
| `robonomics-runtime-subxt-api` | Rust | 支持，带类型 | 运行时绑定 |
| `libcps` 和 `cps` 工具 | Rust、命令行 | 完整支持 | 来自 [airalab/robins](https://github.com/airalab/robins) |

它们都连接到 `wss://polkadot.rpc.robonomics.network/` 或你自己的节点。

## Python：robonomics-interface

当前版本是 3.1.0。它在运行时 52 的开发链上测试过，并在主网上做过只读检查。3.0 版是重写版本，与 2.x 不兼容：它不再依赖 `substrate-interface`。从 2.x 迁移时，请阅读 [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md)。

功能范围：

- 密钥：默认 ED25519。sr25519 是 Polkadot 钱包的默认类型，需要安装 `[sr25519]` 扩展并设置 `crypto_type=SR25519`。支持 SS58 地址、助记词和钱包备份导入。
- 异步客户端，支持在多个节点之间自动切换；还有一个供脚本使用的同步版本（`RobonomicsSync`）。
- 存储查询和 extrinsic，返回事件和可读的错误信息。
- Datalog、RWS、System 和 Balances 的辅助函数。
- 消息加密，以及 Robonomics Report Service 使用的报告封装格式。

没有设备树的辅助函数。不过任何 pallet 都可以通过通用的 `compose_call` 和 `submit` 调用。

安装（Python 3.12 或更新版本）：

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

写一条 datalog 记录，示例来自 README：

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

文档：[airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/)。

## JavaScript

`@polkadot/api` 支持所有 pallet，包括设备树。以下示例来自 [CPS pallet README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage)：

```javascript
// Read a node.
const info = await api.query.cps.nodes(nodeId);   // parent and Scope pointer
const meta = await api.query.cps.meta(nodeId);
const payload = await api.query.cps.payload(nodeId);

// Create a root node and a child.
await api.tx.cps.createNode(null, meta, payload, null).signAndSend(owner);
await api.tx.cps.createNode(parentId, meta, payload, null).signAndSend(owner);

// Let another account write to one node.
await api.tx.cps.grantAccess(nodeId, principal, 'Write', 'Node').signAndSend(owner);

// View functions (need a @polkadot/api version with view-function support).
const scope = await api.view.cps.resolveScope(nodeId);
```

npm 包 `robonomics-interface`（JavaScript）是 robonomics.app 使用的库。它支持 datalog、launch、RWS、数字孪生和工具类调用，但不支持设备树。

## Rust

- `robonomics-runtime-subxt-api`：带类型的运行时绑定，包括设备树的视图函数。
- `libcps`：内嵌轻客户端的设备树库。它没有发布到 crates.io，请从 [airalab/robins](https://github.com/airalab/robins) 获取。

<div id="cps-command-line-tool"></div>

## cps 命令行工具

`cps` 让你在终端里操作设备树。它可以运行自己的轻客户端，所以不需要节点或公共 RPC。

从 [airalab/robins](https://github.com/airalab/robins/releases) 的 nightly 版本安装（提供 Linux 和 macOS、x86_64 和 aarch64 的压缩包），或者用 Nix 运行：

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

robins 的 README 中还提到了 `cargo install libcps`，但 crates.io 上并没有 `libcps` crate。

几个常用命令：

```bash
cps lc &                        # start the embedded light client on 127.0.0.1:9944
cps status                      # where am I connected
cps tree <NODE_ID> --depth 2    # look at a tree

export ROBONOMICS_SURI='<your seed phrase>'   # signs writes; keep it secret
cps create --meta '{"type":"building","name":"HQ"}' --payload '{"status":"online"}'
cps create --parent <NODE_ID> --meta '{"type":"room"}' --payload '{"temp":"22C"}'
cps meta set <NODE_ID> '{"type":"room","name":"Lab"}'
cps payload set <NODE_ID> 'temp=24C'
cps delete <NODE_ID>
```

完整指南见 [robins 文档](https://github.com/airalab/robins/tree/master/docs/src/01-cli)。

## 旧版工具

ROS 2 封装（`robonomics-ros2`）和 `robonomics-js` 都属于旧版工具，不再针对当前运行时维护。
