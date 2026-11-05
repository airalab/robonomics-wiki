---
title: 클라이언트 라이브러리
contributors: [PaTara43, ensrationis]
---

언어와 용도에 맞춰 라이브러리를 고르세요. 디바이스 트리에는 `@polkadot/api`, Rust 크레이트, `cps` 도구를 씁니다. Python에서 datalog와 RWS를 쓰려면 `robonomics-interface`를 사용합니다.

| 라이브러리 | 언어 | 디바이스 트리 | 비고 |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | 헬퍼 없음 | Datalog, RWS, 계정, 암호화 |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | 지원 | 범용 Substrate 클라이언트 |
| npm `robonomics-interface` | JavaScript | 미지원 | robonomics.app에서 사용 |
| `robonomics-runtime-subxt-api` | Rust | 지원, 타입 지정 | 런타임 바인딩 |
| `libcps`와 `cps` 도구 | Rust, 명령줄 | 전체 지원 | [airalab/robins](https://github.com/airalab/robins) 제공 |

모두 `wss://polkadot.rpc.robonomics.network/` 또는 직접 운영하는 노드에 연결합니다.

## Python: robonomics-interface

현재 버전은 3.1.0입니다. 런타임 52 개발 체인에서 테스트했고, 운영 네트워크에서는 읽기 전용 검사를 거쳤습니다. 버전 3.0은 새로 작성된 버전으로 2.x와 호환되지 않으며, 더 이상 `substrate-interface`에 의존하지 않습니다. 2.x에서 옮겨 온다면 [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md)를 읽어 보세요.

지원 범위:

- 키: 기본은 ED25519입니다. Polkadot 지갑의 기본값인 sr25519를 쓰려면 `[sr25519]` extra와 `crypto_type=SR25519`가 필요합니다. SS58 주소, 니모닉, 지갑 백업 가져오기를 지원합니다.
- 엔드포인트 간 폴백을 지원하는 비동기 클라이언트와, 스크립트용 동기 버전(`RobonomicsSync`).
- 이벤트와 읽기 쉬운 오류 메시지를 함께 돌려주는 스토리지 쿼리와 extrinsic.
- Datalog, RWS, System, Balances용 헬퍼.
- 메시지 암호화와, Robonomics Report Service가 쓰는 보고서 봉투(envelope) 형식.

디바이스 트리용 헬퍼는 없습니다. 그래도 범용 `compose_call`과 `submit`으로 어떤 팔레트든 호출할 수 있습니다.

설치(Python 3.12 이상):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

README에 나온 datalog 기록 예제:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

문서: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

`@polkadot/api`는 디바이스 트리를 포함해 모든 팔레트를 지원합니다. [CPS pallet README](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage)의 예제:

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

npm 패키지 `robonomics-interface`(JavaScript)는 robonomics.app이 사용하는 라이브러리입니다. datalog, launch, RWS, 디지털 트윈, 유틸리티 호출을 지원하지만 디바이스 트리는 지원하지 않습니다.

## Rust

- `robonomics-runtime-subxt-api`: 디바이스 트리 뷰 함수를 포함한, 타입이 지정된 런타임 바인딩.
- `libcps`: 라이트 클라이언트가 내장된 디바이스 트리 라이브러리. crates.io에는 배포되지 않았으므로 [airalab/robins](https://github.com/airalab/robins)에서 가져다 쓰세요.

<div id="cps-command-line-tool"></div>

## cps 명령줄 도구

`cps`는 터미널에서 디바이스 트리를 다루는 도구입니다. 자체 라이트 클라이언트를 실행할 수 있어서 노드나 공개 RPC가 없어도 됩니다.

[airalab/robins](https://github.com/airalab/robins/releases)의 nightly 릴리스에서 설치하거나(Linux와 macOS, x86_64와 aarch64용 아카이브), Nix로 실행합니다.

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

robins README에는 `cargo install libcps`도 나오지만, crates.io에는 `libcps` 크레이트가 없습니다.

몇 가지 명령:

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

전체 가이드는 [robins 문서](https://github.com/airalab/robins/tree/master/docs/src/01-cli)에 있습니다.

## 레거시

ROS 2 래퍼(`robonomics-ros2`)와 `robonomics-js`는 레거시이며, 현재 런타임에 맞춰 유지 관리되지 않습니다.
