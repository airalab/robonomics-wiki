---
title: Subscription Activate
contributors: [nakata5321, Fingerling42]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp
    https://github.com/airalab/robonomics.app
---

이 기사에서는 Robonomics 패러체인 계정을 생성하고 IoT 구독을 구매할 것입니다.

{% roboWikiPicture {src:"docs/home-assistant/sub_activate.png", alt:"sub_activate"} %}{% endroboWikiPicture %}

Home Assistant를 Robonomics로 제어하려면 Robonomics 패러체인에 2개의 계정이 필요합니다. 이 중 하나인 (`OWNER`) 계정으로 Robonomics 구독을 구매할 것입니다. 두 번째 계정인 (`CONTROLLER`)은 Home Assistant 프로세스(예: 텔레메트리)를 제어하고 다른 사용자에게 액세스 권한을 부여할 것입니다. 이러한 계정들은 Home Assistant의 보안을 제공할 것입니다.

{% roboWikiNote {title:"경고", type: "warning"}%}
두 계정 모두 **ed25519** 암호화로 생성되어야 합니다. 따라서 Polkadot-JS UI를 사용하여 필요한 암호화를 선택하여 계정을 생성해야 합니다.

이 기능은 Polkadot-JS UI에서 기본적으로 비활성화되어 있습니다. 이를 활성화하려면 `Settings` -> `General` -> `account options`로 이동한 다음 `in-browser account creation` 아래의 드롭다운 메뉴에서 `Allow local in-browser account storage`를 선택하십시오.
{% endroboWikiNote %}

## 소유자 및 컨트롤러 계정 생성

{% roboWikiVideo {videos:[{src: 'QmajeEV4adqR2DCaBJPZhH6NR74eHaRmvCcbeQtnLm7Kcc', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Polkadot / Substrate 포털의 [Robonomics Parachain 앱](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)으로 이동합니다. **왼쪽 상단을 확인하여 Robonomics Parachain에 연결되어 있는지 확인하십시오.**

2. `Accounts` -> `Accounts`로 이동하여 `Add account` 버튼을 누릅니다. 계정 시드가 포함된 팝업 메뉴가 표시됩니다.두 가지 형식: *기억 기호* (사람이 읽을 수 있는 형태) 및 *원시* (숫자와 문자의 시퀀스).

3. `고급 생성 옵션`을 열고 생성 중인 계정의 암호화 유형을 `Edwards - ed25519`로 변경한 후 `다음`을 누릅니다.

4. 기억 기호 시드 문구를 안전하게 저장하고 `다음`을 누릅니다.

5. 다음 메뉴에서 계정 이름과 비밀번호를 설정해야 합니다. 편의를 위해 `OWNER`로 이름을 지정하고 `다음`을 누릅니다.

6. 최종 창에서 `저장`을 클릭하여 계정 생성을 완료합니다. 이로써 백업 JSON 파일이 생성되며 안전하게 보관해야 합니다. 나중에 비밀번호를 기억한다면 이 파일을 사용하여 계정을 복구할 수 있습니다.

7. `CONTROLLER`라는 이름의 계정을 생성하려면 이러한 단계를 반복하십시오.


## Polkadot.js에 계정 추가

편리를 위해 [Polkadot.js 확장 프로그램](https://polkadot.js.org/extension/)을 사용하여 이러한 새로 생성된 계정을 추가해야 합니다. ed25519 계정의 경우 백업 JSON 파일만으로 가능합니다. 계정을 생성할 때 저장한 파일을 사용할 수 있습니다.

계정의 백업 파일을 다시 얻으려면 계정의 백업 파일을 생성하면 됩니다. 계정 옆의 세 개의 점을 클릭하고 `이 계정을 위한 백업 파일 생성`을 선택한 후 비밀번호를 입력하십시오.

{% roboWikiVideo {videos:[{src: 'Qmc5LcbLSdVCUubLomUUo5Qxrxb2xaixpwUFqnpj2C9iM5', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 확장 프로그램을 열고 오른쪽 상단의 `+` 버튼을 누른 다음 `백업 JSON 파일에서 계정 복원`을 선택합니다.

2. 열린 창에서 JSON 파일을 업로드하고 비밀번호를 입력한 후 `복원`을 누릅니다.

3. Polkadot.js 확장 프로그램에서 계정을 위해 Robonomics 네트워크가 선택되었는지 확인하십시오. Polkadot / Substrate Portal에서 `설정` -> `메타데이터`로 이동하고 `메타데이터 업데이트` 버튼을 클릭합니다.

4. 팝업에서 메타데이터 업데이트를 확인합니다. 이제 확장 프로그램에서 주소가 사용되는 네트워크의 레이블이 표시됩니다.## 로보노믹스 구독 활성화

{% roboWikiNote {type: "okay"}%} 이 단계에서는 `OWNER` 계정에 충분한 양의 XRT 토큰(최소 2-3 XRT)이 있어야 합니다. {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmXA7WgScwjt1re34BMEqX9CUYLrYQKqqvigDNU6TALQah', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 로보노믹스 dApp으로 이동하여 [구독 페이지](https://robonomics.app/#/rws-buy)로 이동합니다. 그런 다음, 오른쪽 사이드바에서 `계정 연결`을 클릭합니다.

2. 팝업 메뉴에서 Polkadot.js 확장 프로그램을 연결합니다. 계정 주소와 잔액이 표시됩니다.

3. 구매 전에 `OWNER` 계정이 선택되었는지 확인하십시오. 주소 프로필 아이콘을 클릭하면 `OWNER` 계정이 표시됩니다.

4. 마지막으로 `구독 구매` 버튼을 클릭하고 계정의 비밀번호를 입력합니다. 활성화 프로세스가 완료될 때까지 기다립니다. 잠시 후 구독 상태를 확인할 수 있습니다.

## 구독 설정

이제 `CONTROLLER` 계정을 추가하여 구독을 설정해야 합니다.

{% roboWikiVideo {videos:[{src: 'Qmd5P356UE1yDLAd4uSdq1dERbyp5gk5wpWD3iENNt2mjV', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 로보노믹스 dApp으로 이동하여 [구독 설정 페이지](https://robonomics.app/#/rws-setup)로 이동합니다. **일반 설정** 섹션으로 이동합니다.

2. `컨트롤러의 시드 구문` 필드에서 시드 구문을 제거하고 `CONTROLLER` 계정의 시드 구문을 입력합니다.

3. `CONTROLLER` 주소를 복사합니다: 확장 프로그램을 열고 옆에 있는 아이콘을 클릭합니다.계정 이름.

4. 이 주소를 `Controller` 필드에 붙여넣고 `SAVE` 버튼을 클릭하십시오.

## 구독에 계정 추가

이제 **액세스 목록**에 `CONTROLLER` 계정을 추가해야 합니다.

{% roboWikiVideo {videos:[{src: 'QmVvPSxWm8s9YAogGqDFgxyXjuM9bW3qs8kwDg3PgTWinz', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Robonomics dApp으로 이동하여 [구독 설정 페이지](https://robonomics.app/#/rws-setup)로 이동하십시오. 올바른 구독과 `OWNER` 계정을 선택했는지 확인하십시오.

2. `CONTROLLER` 주소를 복사합니다: 확장 프로그램을 열고 계정 이름 옆의 아이콘을 클릭하십시오.

3. 이 주소를 **구독에 있는 사용자** 섹션의 `Polkadot 주소` 필드에 붙여넣고 `+` 버튼을 클릭하십시오.

4. 팝업 창에서 `OWNER` 계정의 비밀번호를 입력한 후 활성화 프로세스가 완료될 때까지 기다리십시오.