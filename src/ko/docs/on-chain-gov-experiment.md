---
title: Оn-chain 정부 실험

---

현재 Polkadot은 세계에서 가장 큰 DAO 중 하나입니다! 온체인 거버넌스 실험의 일환으로 생태계에서 많은 흥미로운 이벤트가 진행 중입니다. Robonomics 개발자들은 핵톤 참가자들이 투표, 새로운 자금 요청, 시대 변화 등과 관련된 이벤트를 전형적인 스마트 홈 시스템에 통합하여 Polkadot 커뮤니티의 수준을 높이도록 제안합니다.


---

이 기사는 Polkadot 생태계의 어떤 이벤트 결과로 Robonomics Cloud를 통한 스마트 홈 관리에 대해 논의합니다. 다음은 Polkadot 네트워크에 새로운 국민투표가 제출될 때 램프가 켜지는 예시입니다.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## 요구 사항

 - Robonomics 통합이 설치된 Home Assistant 인스턴스. 설치 방법은 [여기](/docs/install-smart-home)에서 찾을 수 있습니다.
 - 상호 작용을 위한 Polkadot 노드 또는 게이트웨이. 예시 - `wss://polkadot.api.onfinality.io`
 - Robonomics 노드 또는 게이트웨이. 
 - ED25519 형식으로 생성된 계정. 정보는 [여기](/docs/sub-activate)에서 찾을 수 있습니다.
 - Robonomics 구독의 장치 목록에 생성된 계정. 더 많은 정보는 [여기](/docs/add-user)에서 확인하세요.
 - 구독 소유자 및 컨트롤러 주소.

Python 라이브러리:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Polkadot 리스너 생성

먼저, Polkadot 네트워크에서 새 이벤트를 수신하는 스크립트를 생성해야 합니다. 예시에서는 새 국민투표의 생성을 추적할 것입니다.

편리한 테스트를 위해 로컬 Polkadot 노드를 개발 모드로 사용했습니다. 배포 설명서는 [여기](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot)에서 찾을 수 있습니다.

공개 노드에 연결하려면 "POLKAD"OT_GATEWAY" 변수를 사용하여 로컬 노드에 연결하는 Python 스크립트를 작성했습니다.

예시 코드:


{% codeHelper {copy: true}%}

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Referenda count start:', data.value)
    if update_nr > 0:
        print('Referenda count increased:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

이 스크립트는 현재 국민투표 번호의 변경 사항을 수신하고 최신 국민투표 번호를 표시합니다.

### 테스트

프로그램을 실행하고 [polkadot.js](https://polkadot.js.org/apps/#/explorer)를 엽니다.
로컬 개발 노드로 전환하려면 왼쪽 상단의 아이콘을 클릭하면 사이드바 메뉴가 나타납니다. "Development" 및 하단의 "Local Node"를 선택한 다음 "Switch"를 클릭합니다.

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

로컬 노드로 전환됩니다. "Governance" -> "Preimages" 탭으로 이동합니다.

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

새로운 프리이미지를 생성합니다. 네트워크에 주석을 남겨봅시다. 서명하고 네트워크로 전송합니다.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

해시를 받게 됩니다. 해당 해시를 복사하고 "Governance" -> "Referenda" 탭으로 이동합니다. "Submit Proposal"을 수행합니다. 이것은 테스트 네트워크이므로 대부분의 구성 가능한 필드는 기본값으로 남겨둘 수 있습니다. 프리이미지 해시를 붙여넣고 제안서에 서명합니다.


{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

네트워크로 전송한 후, 프로그램은 새로운 제안을 감지하고 다음 로그를 출력합니다:

```
Referenda count start: 0
Referenda count increased: 1## 스마트 홈에 연결하기

이제 새로운 제안을 생성한 후 스마트 홈과 상호 작용을 추가해야 합니다.

이를 위해 다음을 알아야 합니다:
- 서비스 도메인
- 서비스 이름
- 대상 엔티티
- 데이터 - "dict" 유형이어야 합니다

이 정보를 어디서 찾을 수 있는지 살펴봅시다. 설치된 Home Assistant 인스턴스를 엽니다. "개발자 도구 -> 서비스"로 이동하여 서비스를 선택하고 YAML 모드로 전환합니다. 스위치의 예를 살펴보겠습니다.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"services"} %}{% endroboWikiPicture %}

"service" 키에는 서비스 도메인과 이름이 포함되어 있습니다. 점 이전의 모든 것이 도메인이고, 점 이후의 모든 것이 서비스 이름입니다. 데이터 필드도 필요합니다.

대상 엔티티를 찾으려면 "설정 -> 장치 및 서비스 -> 엔티티"로 이동합니다. "엔티티 ID"가 있는 열이 있을 것입니다 - 이것이 필요한 대상 엔티티 매개변수입니다.

이제 모든 매개변수를 알았으니, 스크립트에서 무엇이 발생할지 살펴봅시다.

스크립트는 로컬 IPFS 데몬에 연결합니다. (스마트 홈 설정 지침을 따랐다면 이미 IPFS 데몬이 실행 중입니다.)

먼저 JSON 형식의 명령을 형성합니다. 그런 다음 메시지는 사용자와 컨트롤러의 키로 암호화됩니다.
그런 다음 암호화된 명령이 파일로 저장되고 IPFS에 추가됩니다. 그 후, 결과 IPFS 해시가 컨트롤러의 주소로 `Launch` extrinsic를 통해 Robonomics 파라체인에 전송됩니다.
컨트롤러가 발사를 수신하면 IPFS에서 파일을 다운로드하고 해독한 후 내부에서 지정된 서비스를 호출합니다.

전체 코드는 다음과 같습니다:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# polkadot part
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Robonomics part

# Robonomics credentials
# User address must be inRWS 장치
# 사용자 주소는 ED25519이어야 합니다.
user_seed = "<SEED_PHRASE>"
controller_address = "<CONTROLLER_ADDRESS>"
sub_owner_address = "<OWNER_ADDRESS>"

# 명령
service_domain = "<DOMAIN>"  # 도메인은 서비스 이름에서 점 이전에 오는 부분입니다. 예: "switch"
service_name = "<NAME>"  # 이름 - 서비스 이름에서 점 뒤에 오는 부분입니다. 예: "turn_on"
target_entity = "<ENTITY_ID>"  # entity_id. 예: "switch.boiler"
data = {}  # 반드시 dict여야 함

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Referenda count start:', data.value)

    if update_nr > 0:
        print('Referenda count increased:', data.value)
        # 컨트롤러 주소와 ipfs 해시로 발사 보내기
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"트랜잭션 결과: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    발신자의 개인 키와 수신자의 공개 키로 메시지 암호화
    :param message: 암호화할 메시지
    :param sender_keypair: 발신자 계정 Keypair
    :param recipient_public_key: 수신자의 공개 키
    :return: 암호화된 메시지
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# 발사할 메시지 형식
data['entity_id'] = target_entity
command = {'platform': service_domain, 'name': service_name, 'params': data}

message = json.dumps(command)
print(f"메시지: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# 명령 암호화
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"암호화된 메시지: {message}")
filename = "temporal_file"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```ko
result_ipfs  = result["Hash"]
    print(f"IPFS 해시: {result_ipfs}")
    print(f"발사를 위한 IPFS 해시 {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

만약 모든 것을 올바르게 수행했다면, 다음과 같은 로그가 표시됩니다:
```
메시지: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
암호화된 메시지: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
IPFS 해시: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
발사를 위한 IPFS 해시 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
참고 투표 시작: 0
참고 투표 증가: 1
트랜잭션 결과: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```