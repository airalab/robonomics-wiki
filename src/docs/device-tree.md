---
title: Device tree (CPS)
contributors: [ensrationis]
---

The device tree describes your installation in the Robonomics cloud: a site, its rooms, the devices in them. Each part is a node. The chain keeps the shape of the installation and the latest state of each node. It is not meant for bulk data.

In the runtime the device tree is the `CPS` pallet (cyber-physical systems). Full technical reference: [CPS pallet README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md).

## Nodes

- Every node has a number (`NodeId`). Numbers go up one by one and are never reused.
- A node can have a parent. A node without a parent is a root node.
- A node holds two fields, both optional:
  - `meta`: a description that rarely changes, up to 1 KiB.
  - `payload`: the current state, up to 8 KiB.
- Both fields are plain bytes. You choose the format, for example JSON.
- A node's parent never changes. To move a node, create a new one and delete the old one.
- A node can have at most 100 children. Only a node without children can be deleted.

<!-- -->

{% roboWikiNote {type: "warning", title: "Data is public"}%} Everything in the device tree can be read by anyone. Encrypt data before you write it if it must stay private. The `cps` tool from [airalab/robins](https://github.com/airalab/robins) can encrypt for you. {% endroboWikiNote %}

## Scope

A Scope is the part of the tree that one account owns.

- When you create a root node, you also create a Scope, and you own it.
- Each node belongs to the nearest Scope root above it, or to its own Scope if it is a Scope root.
- You can turn a node inside your tree into the root of a new, nested Scope. A nested Scope is a hard boundary: the outer owner and the outer access grants have no effect inside it. One exception: the owner of the Scope directly around it may replace it.
- The owner of a Scope never changes. To hand a Scope over, it is replaced: an account allowed to create a Scope on its root node calls `create_scope`. This gives a new Scope ID, the caller becomes the owner, and all old access entries are deleted.
- A Scope is at most 32 nodes deep, counted from a node up to its Scope root. The whole tree can be deeper.
- A Scope disappears only when its root node is deleted.

## Access

The Scope owner can do everything inside the Scope. Other accounts need an access entry, which only the owner can grant.

| Capability | Allows |
|---|---|
| `Write` | `set_meta` and `set_payload` |
| `CreateScope` | `create_scope` |

- An entry applies in one of two modes: `Node` (one node) or `Subtree` (the node and everything below it, but not inside nested Scopes).
- A Scope holds at most 32 access entries.
- Creating children, deleting nodes, and granting or revoking access cannot be delegated. Only the owner can do them.

More capabilities (for transactions, storage and compute) are planned in the 5.0 roadmap. They are not in the runtime yet.

## Node accounts

A node can be bound to one account, its identity. This is usually the device's own key. One account can be the identity of only one node, so you can find a node by its device account.

- Only the Scope owner can set or clear an identity. `Write` access is not enough.
- If the identity is not the caller, the identity account must sign a permit. The permit is the SCALE encoding of `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)`, signed as raw bytes without a `<Bytes>` wrapper.
- A permit is valid for at most one day (14,400 blocks). It is not used up: it works within its Scope until it expires. Replacing the Scope makes old permits invalid.
- A new root node accepts only the caller's own account as its identity.
- Deleting a node removes its identity.

## Calls

Polkadot.js shows these names in camelCase, for example `cps.createNode`.

| Call | Arguments | Who can call |
|---|---|---|
| `create_node` | `parent_id` (optional), `meta` (optional), `payload` (optional), `identity` (optional: an account and, if needed, a permit) | Root node: any account, which becomes the Scope owner. Child node: the owner of the parent's Scope. |
| `set_meta` | `node_id`, `meta` (`None` removes it) | Holder of `Write` |
| `set_payload` | `node_id`, `payload` (`None` removes it) | Holder of `Write` |
| `delete_node` | `node_id` | Scope owner. The node must have no children. Deleting a Scope root deletes the Scope and its access entries. |
| `create_scope` | `node_id` | Holder of `CreateScope`. At the root of a nested Scope, also the owner of the Scope around it. |
| `grant_access` | `node_id`, `principal`, `capability` (`Write` or `CreateScope`), `mode` (`Node` or `Subtree`) | Scope owner |
| `revoke_access` | `node_id`, `principal`, `capability` | Scope owner |
| `set_identity` | `node`, `identity`, `permit` (optional) | Scope owner |
| `clear_identity` | `node` | Scope owner |

Events: `NodeCreated`, `MetaSet`, `PayloadSet`, `NodeDeleted`, `ScopeCreated`, `ScopeDeleted`, `AccessGranted`, `AccessRevoked`, `IdentitySet`, `IdentityCleared`.

## Reading the tree

- Plain reads are storage queries: `cps.nodes`, `cps.meta`, `cps.payload`, `cps.children`.
- The pallet also has view functions (they need metadata V16, which the chain serves):
  - by node number: `resolve_scope`, `has_capability`, `identity_of`, `node_by_identity`;
  - by device account: `parent`, `children`, `meta`, `payload`, `scope_of`, `address_capability`. These fail with `MissingProjectedIdentity` if a node in the result has no identity.
- In JavaScript the view functions are `api.view.cps.*`, which needs a version of `@polkadot/api` with view-function support. In Rust they are in the typed `robonomics-runtime-subxt-api` crate.

## Limits and fees

| Limit | Value |
|---|---|
| `meta` size | 1,024 bytes |
| `payload` size | 8,192 bytes |
| Scope depth | 32 nodes |
| Children per node | 100 |
| Access entries per Scope | 32 |
| Identity permit lifetime | 1 day (14,400 blocks) |

These are constants of the runtime. Changing them needs a runtime upgrade.

The device tree takes no storage deposit. You pay the normal transaction fee, which grows with the size of the data. For example, at the time of writing, a root node with 100 bytes of `meta` and 100 bytes of `payload` costs about 0.0003 XRT.

## Tools

- The `cps` command-line tool and the `libcps` Rust library cover the whole device tree. See [Client libraries](/docs/client-libraries/#cps-command-line-tool).
- Any client that can send extrinsics works too, for example `@polkadot/api`.
- For devices that cannot talk to the chain directly, see [Connect devices](/docs/connect-devices/).

## What comes next

With subscriptions (5.0, in progress) the Scope owner will be able to pay for transactions of the devices in the tree, so that a sensor can write without holding XRT itself. This is not in the runtime yet.
