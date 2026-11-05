---
title: 콜레이터 운영
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

콜레이터는 Robonomics 파라체인의 블록을 생성합니다. 이 가이드에서는 Linux 서버에 콜레이터를 설치하고, 체인에 등록하고, 콜레이터가 보상을 얻는 방식을 설명합니다.

이 가이드의 원본은 런타임 저장소에 있는 [콜레이터 가이드](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md)입니다.

## 준비물

- 서버: CPU 8코어, RAM 64 GB, NVMe 2 TB. 이런 서버는 한 달에 약 $120–150입니다.
- 디스크: 파라체인과 Polkadot 릴레이 체인을 합치면 약 1.1 TB이며 계속 늘어납니다. 최소 2 TB를 준비하세요.
- 사용 가능 잔액이 32 XRT보다 많은 Robonomics 계정.

## 1. 노드 설치

Robonomics 전용 노드 바이너리는 없습니다. 콜레이터는 Parity의 범용 `polkadot-omni-node`에 Robonomics 체인 스펙을 넣어 실행합니다. 이 가이드는 홈 디렉터리가 `/var/lib/robonomics/`이고 base path가 `/var/lib/robonomics/base/`인 `robonomics` 사용자를 가정합니다.

[Polkadot SDK 릴리스](https://github.com/paritytech/polkadot-sdk/releases)에서 `polkadot-omni-node`를 내려받습니다. 최신 `polkadot-stable*` 릴리스를 사용하세요. 아래 명령은 `polkadot-stable2609`를 사용합니다.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

체인 스펙을 내려받습니다.

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. 네트워크 키 생성

네트워크 키가 없으면 콜레이터가 시작되지 않습니다.

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

키는 `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`에 저장됩니다. 백업해 두세요.

## 3. 노드 시작

systemd 서비스에 권장하는 `ExecStart`:

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

- 첫 번째 `--sync warp`는 파라체인용이고, `--` 뒤의 것은 내장 릴레이 체인용입니다. 이것이 없으면 릴레이 체인 동기화에 몇 주가 걸릴 수 있습니다.
- 체인 스펙에는 텔레메트리 엔드포인트가 없으므로 `--telemetry-url`로 텔레메트리를 켭니다.

## 4. 세션 키 생성

세션 키는 Aura(sr25519) 키입니다. 노드를 잠시 `--rpc-methods unsafe`로 시작한 다음, 콜레이터 계정으로 `author_rotateKeysWithOwner`를 호출합니다.

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

결과에는 `keys`와 `proof` 두 필드가 있습니다. 둘 다 저장하세요. 노드가 키를 가지고 있는지 확인합니다.

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

그런 다음 `--rpc-methods unsafe`를 빼고 노드를 다시 시작합니다.

## 5. 체인에 등록

콜레이터 계정으로 다음 extrinsic을 보냅니다. 예를 들어 [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics)에서 보낼 수 있습니다.

1. 이전 단계에서 얻은 두 값으로 `session.setKeys(keys, proof)`. proof를 빈 값으로 넘기지 마세요. proof가 키를 내 계정에 묶어 줍니다.
2. `collatorSelection.registerAsCandidate()`. 이 호출은 **32 XRT**를 본딩합니다.

세션이 바뀐 뒤 노드가 콜레이터 집합에 들어갑니다. 런타임에서 세션 하나는 3,600블록으로, 6초 블록 기준 약 6시간입니다.

노드 상태만 보지 말고 체인에서 후보 등록을 확인하세요. **Developer → Chain state**에서 `collatorSelection.candidateList`와 `collatorSelection.invulnerables`를 확인합니다.

본드 금액과 후보 수 제한은 런타임 설정입니다. 바꾸려면 Root 국민투표가 필요합니다. [XRT와 거버넌스](/docs/xrt-and-governance/)를 참고하세요.

## 보상 방식

콜레이터의 수입은 두 가지입니다.

1. **블록 보상.** 블록마다 고정된 0.0042 XRT가 블록 생성자에게 직접 발행됩니다. 런타임 43부터 적용되었습니다.
2. **수수료와 팁.** 모든 수수료와 팁은 콜레이터 풀로 들어갑니다. 블록 생성자는 풀에서 일정 몫을 받습니다.

블록 보상은 서버 비용을 충당하고 여유가 남도록 정해집니다.

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

입력값은 연간 $2,040짜리 서버, 콜레이터 7개, 여유분 30%, XRT 가격 $1입니다. 입력값이 바뀌면 런타임 업그레이드로 보상을 다시 조정합니다.

수입은 내가 생성하는 블록의 비율에 달려 있습니다. 콜레이터가 많을수록 각자 생성하는 블록은 줄어듭니다. 배경과 측정 결과: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
