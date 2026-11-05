---
title: 设备树（CPS）
contributors: [ensrationis]
---

设备树在 Robonomics 云中描述你的设施：一个场地、场地里的房间、房间里的设备。每一部分都是一个节点。链上保存设施的结构和每个节点的最新状态。它不适合存放大量数据。

在运行时中，设备树是 `CPS` pallet（cyber-physical systems，信息物理系统）。完整的技术参考：[CPS pallet README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md)。

## 节点

- 每个节点都有一个编号（`NodeId`）。编号逐一递增，永不复用。
- 节点可以有父节点。没有父节点的节点是根节点。
- 节点有两个字段，都是可选的：
  - `meta`：很少变化的描述，最大 1 KiB。
  - `payload`：当前状态，最大 8 KiB。
- 两个字段都是原始字节。格式由你决定，比如 JSON。
- 节点的父节点不能更改。要移动节点，先创建一个新节点，再删除旧节点。
- 一个节点最多有 100 个子节点。只有没有子节点的节点才能被删除。

<!-- -->

{% roboWikiNote {type: "warning", title: "数据是公开的"}%} 设备树中的所有内容任何人都能读取。如果数据需要保密，请在写入前加密。[airalab/robins](https://github.com/airalab/robins) 中的 `cps` 工具可以替你加密。 {% endroboWikiNote %}

## Scope

Scope 是树中归一个账户所有的部分。

- 创建根节点时，同时会创建一个 Scope，你就是它的所有者。
- 每个节点属于它上方最近的 Scope 根；如果它本身就是 Scope 根，则属于自己的 Scope。
- 你可以把树内部的某个节点变成一个新的嵌套 Scope 的根。嵌套 Scope 是一道硬边界：外层所有者和外层的访问授权在里面都不起作用。唯一的例外：直接包含它的那个 Scope 的所有者可以替换它。
- Scope 的所有者不能更改。要移交 Scope，就替换它：被允许在其根节点上创建 Scope 的账户调用 `create_scope`。这会生成新的 Scope ID，调用者成为所有者，所有旧的访问条目都会被删除。
- 一个 Scope 最深 32 个节点，从某个节点往上数到它的 Scope 根。整棵树可以更深。
- 只有删除 Scope 的根节点，Scope 才会消失。

## 访问权限

Scope 所有者在 Scope 内可以做任何事。其他账户需要访问条目，而只有所有者才能授予。

| 权限 | 允许的操作 |
|---|---|
| `Write` | `set_meta` 和 `set_payload` |
| `CreateScope` | `create_scope` |

- 访问条目有两种作用模式：`Node`（单个节点）或 `Subtree`（该节点及其下方的全部节点，但不包括嵌套 Scope 内部）。
- 一个 Scope 最多有 32 个访问条目。
- 创建子节点、删除节点、授予或撤销权限都不能委托。只有所有者能做这些操作。

5.0 路线图中还规划了更多权限（用于交易、存储和计算）。它们还没有进入运行时。

## 节点账户

节点可以绑定一个账户，作为它的身份（identity）。通常这是设备自己的密钥。一个账户只能作为一个节点的身份，因此可以通过设备账户找到对应的节点。

- 只有 Scope 所有者能设置或清除身份。仅有 `Write` 权限不够。
- 如果身份账户不是调用者本人，身份账户必须签署一个许可（permit）。许可是 `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)` 的 SCALE 编码，以原始字节签名，不加 `<Bytes>` 包装。
- 许可最长有效一天（14,400 个区块）。它不会被用掉：在过期前，它在所属 Scope 内一直有效。替换 Scope 会使旧许可失效。
- 新的根节点只接受调用者自己的账户作为身份。
- 删除节点会同时移除它的身份。

## 调用

Polkadot.js 用 camelCase 显示这些名称，例如 `cps.createNode`。

| 调用 | 参数 | 谁可以调用 |
|---|---|---|
| `create_node` | `parent_id`（可选）、`meta`（可选）、`payload`（可选）、`identity`（可选：一个账户，必要时附带许可） | 根节点：任何账户，调用者成为 Scope 所有者。子节点：父节点所在 Scope 的所有者。 |
| `set_meta` | `node_id`、`meta`（`None` 表示删除） | 拥有 `Write` 权限的账户 |
| `set_payload` | `node_id`、`payload`（`None` 表示删除） | 拥有 `Write` 权限的账户 |
| `delete_node` | `node_id` | Scope 所有者。节点不能有子节点。删除 Scope 根会同时删除该 Scope 及其访问条目。 |
| `create_scope` | `node_id` | 拥有 `CreateScope` 权限的账户。在嵌套 Scope 的根上，外层 Scope 的所有者也可以调用。 |
| `grant_access` | `node_id`、`principal`、`capability`（`Write` 或 `CreateScope`）、`mode`（`Node` 或 `Subtree`） | Scope 所有者 |
| `revoke_access` | `node_id`、`principal`、`capability` | Scope 所有者 |
| `set_identity` | `node`、`identity`、`permit`（可选） | Scope 所有者 |
| `clear_identity` | `node` | Scope 所有者 |

事件：`NodeCreated`、`MetaSet`、`PayloadSet`、`NodeDeleted`、`ScopeCreated`、`ScopeDeleted`、`AccessGranted`、`AccessRevoked`、`IdentitySet`、`IdentityCleared`。

## 读取设备树

- 普通读取就是存储查询：`cps.nodes`、`cps.meta`、`cps.payload`、`cps.children`。
- 该 pallet 还提供视图函数（view functions，需要元数据 V16，链上已提供）：
  - 按节点编号：`resolve_scope`、`has_capability`、`identity_of`、`node_by_identity`；
  - 按设备账户：`parent`、`children`、`meta`、`payload`、`scope_of`、`address_capability`。如果结果中某个节点没有身份，这些函数会返回 `MissingProjectedIdentity` 错误。
- 在 JavaScript 中，视图函数位于 `api.view.cps.*`，需要支持视图函数的 `@polkadot/api` 版本。在 Rust 中，它们在带类型的 `robonomics-runtime-subxt-api` crate 里。

## 限制与费用

| 限制 | 值 |
|---|---|
| `meta` 大小 | 1,024 字节 |
| `payload` 大小 | 8,192 字节 |
| Scope 深度 | 32 个节点 |
| 每个节点的子节点数 | 100 |
| 每个 Scope 的访问条目数 | 32 |
| 身份许可有效期 | 1 天（14,400 个区块） |

这些是运行时常量。修改它们需要升级运行时。

设备树不收存储押金。你只需支付普通交易手续费，费用随数据大小增加。例如，撰写本文时，一个带 100 字节 `meta` 和 100 字节 `payload` 的根节点大约花费 0.0003 XRT。

## 工具

- `cps` 命令行工具和 `libcps` Rust 库覆盖了设备树的全部功能。见[客户端库](/docs/client-libraries/#cps-command-line-tool)。
- 任何能发送 extrinsic 的客户端也都可以使用，例如 `@polkadot/api`。
- 对于无法直接与链通信的设备，见[连接设备](/docs/connect-devices/)。

## 接下来

有了订阅功能（5.0，开发中），Scope 所有者将能为树中设备的交易付费，这样传感器无需自己持有 XRT 也能写入数据。该功能还没有进入运行时。
