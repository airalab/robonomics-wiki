---
title: 디바이스 트리(CPS)
contributors: [ensrationis]
---

디바이스 트리는 Robonomics 클라우드에서 설비를 설명합니다. 사이트, 사이트 안의 방, 방 안의 디바이스를 표현합니다. 각 부분이 하나의 노드입니다. 체인에는 설비의 구조와 각 노드의 최신 상태가 저장됩니다. 대량의 데이터를 저장하는 용도는 아닙니다.

런타임에서 디바이스 트리는 `CPS` 팔레트(cyber-physical systems, 사이버 물리 시스템)입니다. 전체 기술 문서: [CPS pallet README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md).

## 노드

- 모든 노드에는 번호(`NodeId`)가 있습니다. 번호는 하나씩 증가하며 재사용되지 않습니다.
- 노드는 부모를 가질 수 있습니다. 부모가 없는 노드는 루트 노드입니다.
- 노드에는 두 개의 필드가 있으며, 둘 다 선택 사항입니다.
  - `meta`: 거의 바뀌지 않는 설명, 최대 1 KiB.
  - `payload`: 현재 상태, 최대 8 KiB.
- 두 필드 모두 단순한 바이트입니다. 형식은 JSON 등 원하는 대로 정하면 됩니다.
- 노드의 부모는 바뀌지 않습니다. 노드를 옮기려면 새 노드를 만들고 이전 노드를 삭제하세요.
- 노드 하나는 자식을 최대 100개까지 가질 수 있습니다. 자식이 없는 노드만 삭제할 수 있습니다.

<!-- -->

{% roboWikiNote {type: "warning", title: "데이터는 공개됩니다"}%} 디바이스 트리의 모든 내용은 누구나 읽을 수 있습니다. 비공개로 유지해야 하는 데이터는 쓰기 전에 암호화하세요. [airalab/robins](https://github.com/airalab/robins)의 `cps` 도구가 암호화를 대신해 줄 수 있습니다. {% endroboWikiNote %}

## Scope

Scope는 한 계정이 소유하는 트리의 일부분입니다.

- 루트 노드를 만들면 Scope도 함께 만들어지고, 그 Scope의 소유자가 됩니다.
- 각 노드는 위쪽에서 가장 가까운 Scope 루트에 속합니다. 노드 자신이 Scope 루트라면 자기 Scope에 속합니다.
- 트리 안쪽의 노드를 새로운 중첩 Scope의 루트로 만들 수 있습니다. 중첩 Scope는 엄격한 경계입니다. 바깥 Scope의 소유자와 바깥에서 부여한 접근 권한은 그 안에서 효력이 없습니다. 예외가 하나 있습니다. 바로 바깥을 감싼 Scope의 소유자는 중첩 Scope를 교체할 수 있습니다.
- Scope의 소유자는 바뀌지 않습니다. Scope를 넘겨주려면 Scope를 교체합니다. 해당 루트 노드에서 Scope를 만들 수 있는 계정이 `create_scope`를 호출하면 됩니다. 그러면 새 Scope ID가 생기고, 호출한 계정이 소유자가 되며, 이전 접근 항목은 모두 삭제됩니다.
- Scope의 깊이는 최대 32 노드입니다. 노드에서 위로 Scope 루트까지 셉니다. 트리 전체는 그보다 깊을 수 있습니다.
- Scope는 루트 노드가 삭제될 때만 사라집니다.

## 접근 권한

Scope 소유자는 Scope 안에서 모든 작업을 할 수 있습니다. 다른 계정은 접근 항목이 필요하며, 접근 항목은 소유자만 부여할 수 있습니다.

| 권한 | 허용되는 작업 |
|---|---|
| `Write` | `set_meta`와 `set_payload` |
| `CreateScope` | `create_scope` |

- 접근 항목은 두 가지 모드 중 하나로 적용됩니다. `Node`(노드 하나) 또는 `Subtree`(해당 노드와 그 아래 전체, 단 중첩 Scope 내부는 제외)입니다.
- Scope 하나에는 접근 항목을 최대 32개까지 둘 수 있습니다.
- 자식 노드 생성, 노드 삭제, 접근 권한 부여와 회수는 위임할 수 없습니다. 소유자만 할 수 있습니다.

트랜잭션, 스토리지, 컴퓨팅을 위한 추가 권한이 5.0 로드맵에 계획되어 있습니다. 아직 런타임에는 없습니다.

## 노드 계정

노드에는 계정 하나를 아이덴티티(identity)로 연결할 수 있습니다. 보통은 디바이스 자체의 키입니다. 한 계정은 노드 하나의 아이덴티티만 될 수 있으므로, 디바이스 계정으로 노드를 찾을 수 있습니다.

- 아이덴티티를 설정하거나 해제할 수 있는 것은 Scope 소유자뿐입니다. `Write` 권한으로는 부족합니다.
- 아이덴티티가 호출자 본인이 아니면 아이덴티티 계정이 허가증(permit)에 서명해야 합니다. 허가증은 `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)`을 SCALE로 인코딩한 값이며, `<Bytes>` 래퍼 없이 원시 바이트로 서명합니다.
- 허가증의 유효 기간은 최대 하루(14,400 블록)입니다. 한 번 쓴다고 소모되지 않습니다. 만료될 때까지 해당 Scope 안에서 계속 유효합니다. Scope를 교체하면 이전 허가증은 무효가 됩니다.
- 새 루트 노드는 호출자 자신의 계정만 아이덴티티로 받습니다.
- 노드를 삭제하면 아이덴티티도 함께 제거됩니다.

## 호출

Polkadot.js에서는 이 이름이 camelCase로 표시됩니다. 예: `cps.createNode`.

| 호출 | 인자 | 호출 가능한 주체 |
|---|---|---|
| `create_node` | `parent_id`(선택), `meta`(선택), `payload`(선택), `identity`(선택: 계정과, 필요하면 허가증) | 루트 노드: 아무 계정이나 가능하며 그 계정이 Scope 소유자가 됩니다. 자식 노드: 부모가 속한 Scope의 소유자. |
| `set_meta` | `node_id`, `meta`(`None`이면 삭제) | `Write` 보유자 |
| `set_payload` | `node_id`, `payload`(`None`이면 삭제) | `Write` 보유자 |
| `delete_node` | `node_id` | Scope 소유자. 노드에 자식이 없어야 합니다. Scope 루트를 삭제하면 Scope와 그 접근 항목도 삭제됩니다. |
| `create_scope` | `node_id` | `CreateScope` 보유자. 중첩 Scope의 루트에서는 그것을 감싼 Scope의 소유자도 가능합니다. |
| `grant_access` | `node_id`, `principal`, `capability`(`Write` 또는 `CreateScope`), `mode`(`Node` 또는 `Subtree`) | Scope 소유자 |
| `revoke_access` | `node_id`, `principal`, `capability` | Scope 소유자 |
| `set_identity` | `node`, `identity`, `permit`(선택) | Scope 소유자 |
| `clear_identity` | `node` | Scope 소유자 |

이벤트: `NodeCreated`, `MetaSet`, `PayloadSet`, `NodeDeleted`, `ScopeCreated`, `ScopeDeleted`, `AccessGranted`, `AccessRevoked`, `IdentitySet`, `IdentityCleared`.

## 트리 읽기

- 일반적인 읽기는 스토리지 쿼리입니다: `cps.nodes`, `cps.meta`, `cps.payload`, `cps.children`.
- 이 팔레트에는 뷰 함수(view function)도 있습니다(메타데이터 V16이 필요하며, 체인이 제공합니다).
  - 노드 번호 기준: `resolve_scope`, `has_capability`, `identity_of`, `node_by_identity`
  - 디바이스 계정 기준: `parent`, `children`, `meta`, `payload`, `scope_of`, `address_capability`. 결과에 포함된 노드 중 아이덴티티가 없는 노드가 있으면 `MissingProjectedIdentity` 오류가 납니다.
- JavaScript에서 뷰 함수는 `api.view.cps.*`이며, 뷰 함수를 지원하는 `@polkadot/api` 버전이 필요합니다. Rust에서는 타입이 지정된 `robonomics-runtime-subxt-api` 크레이트에 있습니다.

## 제한과 수수료

| 제한 | 값 |
|---|---|
| `meta` 크기 | 1,024바이트 |
| `payload` 크기 | 8,192바이트 |
| Scope 깊이 | 32 노드 |
| 노드당 자식 수 | 100 |
| Scope당 접근 항목 수 | 32 |
| 아이덴티티 허가증 유효 기간 | 1일 (14,400 블록) |

이 값들은 런타임 상수입니다. 바꾸려면 런타임 업그레이드가 필요합니다.

디바이스 트리에는 스토리지 예치금이 없습니다. 일반 트랜잭션 수수료만 내면 되며, 수수료는 데이터 크기에 따라 늘어납니다. 예를 들어 이 글을 쓰는 시점에 `meta` 100바이트와 `payload` 100바이트를 가진 루트 노드는 약 0.0003 XRT가 듭니다.

## 도구

- `cps` 명령줄 도구와 `libcps` Rust 라이브러리는 디바이스 트리의 모든 기능을 지원합니다. [클라이언트 라이브러리](/docs/client-libraries/#cps-command-line-tool)를 참고하세요.
- extrinsic을 보낼 수 있는 클라이언트라면 무엇이든 쓸 수 있습니다. 예: `@polkadot/api`.
- 체인과 직접 통신할 수 없는 디바이스는 [디바이스 연결](/docs/connect-devices/)을 참고하세요.

## 앞으로의 계획

구독 기능(5.0, 개발 중)이 나오면 Scope 소유자가 트리 안 디바이스의 트랜잭션 비용을 대신 낼 수 있습니다. 그러면 센서가 직접 XRT를 보유하지 않아도 데이터를 쓸 수 있습니다. 이 기능은 아직 런타임에 없습니다.
