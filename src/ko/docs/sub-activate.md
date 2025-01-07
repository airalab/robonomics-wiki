---
title: 구독 활성화
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.8.2
    https://github.com/airalab/robonomics.app
---

**이 문서에서는 Robonomics 파라체인 계정을 생성하고 IoT 구독을 구매하는 방법을 안내합니다.**

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Home Assistant를 Robonomics로 제어하려면 Robonomics 파라체인에 2개의 계정이 필요합니다. 이 중 하나인 (`OWNER`) 계정으로 Robonomics 구독을 구매할 것입니다. 두 번째 계정인 (`CONTROLLER`)은 Home Assistant 프로세스(예: 텔레메트리)를 제어하고 다른 사용자에게 액세스 권한을 부여할 것입니다. 이러한 계정들은 Home Assistant의 보안을 제공합니다.

계정이 없는 경우 [OWNER 계정을 생성](/docs/create-account-in-dapp/)하는 방법을 확인하십시오. 컨트롤러 계정은 설정 중 자동으로 생성됩니다.

이 문서에서는 [Polkadot.js 확장 프로그램](https://polkadot.js.org/extension/) 지갑을 사용하여 계정을 다루지만 편리한 다른 지갑을 사용할 수도 있습니다.

## Robonomics 구독 활성화

{% roboWikiNote {type:"확인"} %}

이 단계에서는 `OWNER` 계정에 충분한 양의 XRT 토큰(최소 2-3 XRT)이 있어야합니다.

{% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Robonomics dApp으로 이동하여 [구독 페이지](https://robonomics.app/#/rws-buy)로 이동합니다. 그런 다음, 오른쪽 사이드바에서 `계정 연결`을 클릭합니다.

2. 다음 팝업 메뉴에서 Polkadot.js 확장 프로그램을 연결합니다. 계정 주소와 잔액이 표시됩니다.

3. 구매 전에 `OWNER` 계정이 선택되었는지 확인하십시오. 주소 프로필 아이콘을 클릭하면 `OWNER` 계정이 표시됩니다.

4. 마지막으로 `구독 구매` 버튼을 클릭하고 계정의 비밀번호를 입력합니다. 활성화 프로세스가 완료될 때까지 기다립니다. 잠시 후 구독 상태를 확인할 수 있습니다.

## 구독 설정

이제 `CONTROLLER` 계정을 추가하여 구독을 설정해야합니다.

{% roboWikiPicture {src:"docs/home-assistant/sub-download-backup.png",alt:"sub_setup"} %}{% endroboWikiPicture %}

1. Robonomics dApp으로 이동하고 [구독 설정 페이지](https://robonomics.app/#/rws-setup)로 이동합니다. **구독 설정** 섹션으로 이동합니다.

2. `백업 다운로드`를 클릭하고 `서버용` 옵션을 선택합니다.

{% roboWikiNote {type: "warning", title: "중요 정보"} %} 이 작업은 구독을 위한 새 컨트롤러를 생성합니다. 구독에 추가하는 것을 잊지 마세요. {% endroboWikiNote %}

3. 팝업에서 `컨트롤러` 계정을 위한 비밀번호를 생성합니다.

{% roboWikiPicture {src:"docs/home-assistant/server-new-settings.png", alt:"controller create"} %}{% endroboWikiPicture %}

4. 다음 팝업에서 새 계정의 주소와 니모닉 시드 구문이 표시됩니다. 니모닉 시드 구문을 안전하게 보관하세요. 다운로드 폴더에는 두 개의 JSON 파일이 있습니다. 첫 번째 파일은 `Controller-<address>.json`로 이름이 지정되며 `<address>`는 새로 생성된 컨트롤러의 주소입니다. 두 번째 파일은 `robonomics.app-settings-<subscirption-name>-server.json`로 이름이 지정되며 `<subscirption-name>`은 구독의 이름입니다. 이 파일들을 안전하게 보관해야 하며 통합 설정을 위해 나중에 필요합니다. 추가로 컨트롤러를 가져올 수도 있습니다.당신의 지갑으로 계정을 가져오는 방법은 [여기](/docs/create-account-in-dapp/)에서 Polkadot.js 확장 프로그램으로 가져오는 방법을 찾을 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/controller-acc.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

5. (선택 사항) 핀잔 서비스 Pinata 또는 다른 사용자 정의 게이트웨이의 자격 증명을 추가하여 데이터를 IPFS 네트워크 전체에 더 널리 퍼뜨릴 수 있습니다.

{% roboWikiNote {title:"참고", type: "참고"}%} [Pinata 설정 섹션](/docs/pinata-setup)에서 Pinata 사용에 대한 더 자세한 정보를 찾을 수 있습니다.{% endroboWikiNote %}

6. 팝업을 닫고 `저장` 버튼을 클릭합니다.

{% roboWikiPicture {src:"docs/home-assistant/save-setup.png", alt:"sub_setup"} %}{% endroboWikiPicture %}

## 구독에 컨트롤러 계정 추가

이제 **액세스 목록**에 당신의 `컨트롤러` 계정을 추가해야 합니다.


{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['autoplay', 'loop', 'controls']} %}{% endroboWikiVideo %}

1. Robonomics dApp으로 이동하세요.[구독 설정 페이지](https://robonomics.app/#/rws-setup)로 이동하십시오. 올바른 구독과 `OWNER` 계정을 선택했는지 확인하십시오.

2. `CONTROLLER` 주소를 복사하십시오: 확장 프로그램을 열고 계정 이름 옆 아이콘을 클릭하거나 **구독 설정** 섹션에서 주소를 복사하십시오.

3. 이 주소를 **구독에 포함된 사용자** 섹션의 `Polkadot 주소` 필드에 붙여넣고 `+` 버튼을 클릭하십시오.

4. 팝업 창에서 `OWNER` 계정의 암호를 입력한 후 활성화 프로세스가 완료될 때까지 기다리십시오.

이상입니다. 다음 문서로 이동하십시오.