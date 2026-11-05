---
title: 개발 노드 실행
contributors: [LoSk-p, ensrationis]
---

개발 노드는 코드를 테스트하기 위한 로컬 단일 노드 Robonomics 체인입니다. 블록이 즉시 생성되고, 테스트 계정에 잔액이 있으며, 운영 네트워크에는 아무 영향도 주지 않습니다.

이제 `robonomics --dev` 바이너리는 없습니다. [airalab/robonomics](https://github.com/airalab/robonomics)에서 런타임을 빌드하고, 그것으로 체인 스펙을 만든 다음, 그 스펙으로 Parity의 범용 `polkadot-omni-node`를 실행합니다.

## 명령 하나로 (Nix)

저장소를 클론한 디렉터리에서:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

스크립트는 필요하면 `dev-runtime` 기능으로 런타임을 빌드하고, 임시 체인 스펙을 만든 뒤 `polkadot-omni-node --chain <spec> --dev`를 시작합니다.

## Nix 없이

Cargo로 두 도구를 설치한 다음 같은 스크립트를 실행합니다.

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## 직접 실행

체인 스펙을 보관하거나 노드 플래그를 바꾸고 싶다면 단계를 직접 실행합니다.

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

내장된 `--chain dev`는 없습니다. 항상 생성한 스펙과 `--dev`를 함께 넘깁니다. 재시작 사이에 체인 상태를 유지하려면 `--base-path <dir>`를 추가하세요.

## 실행 결과

- RPC와 WebSocket: `ws://127.0.0.1:9944`.
- 체인 ID `robonomics-dev`, para ID 2000, 릴레이 체인 `westend-local`, 토큰 XRT(소수점 9자리).
- 잔액이 미리 들어 있는 개발 계정: Alice, Bob, Charlie 등 잘 알려진 테스트 키.
- Alice가 Sudo입니다. Sudo는 `dev-runtime` 빌드에만 있으며, 운영 네트워크에는 절대 없습니다.
- `--base-path`를 설정하지 않으면 시작할 때마다 새 상태로 시작합니다.

[Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer)를 `ws://127.0.0.1:9944`에 연결해 둘러보세요. `cps` 도구에서는 `ROBONOMICS_WS_URL=ws://127.0.0.1:9944`와 `ROBONOMICS_SURI=//Alice`를 사용합니다.

## 개발 체인에서 RWS 사용

RWS 경매는 Root가 만듭니다. RWS 코드를 테스트할 때 이 단계를 건너뛰려면 `robonomics-interface` 저장소의 `scripts/devchain.sh`를 쓰세요. 제네시스에 RWS 경매가 이미 들어 있는 개발 체인을 시작합니다.

Docker 이미지를 포함한 다른 방법은 [개발자 가이드](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain)에 있습니다.
