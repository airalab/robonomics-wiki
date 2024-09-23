---
title: Robonomics Parachain을 위한 계정 생성

contributors: [PaTara43, Fingerling42]
---

**로보노믹스 파라체인과 상호 작용하고 운영하기 위해서는 개발자와 사용자가 Polkadot / Substrate 포털에 계정을 생성해야 합니다. 계정은 네트워크를 위한 기본 기능을 수행합니다: 공개 네트워크 주소(공개 키), 주소 및 자금에 대한 액세스 제어(개인 키), 네트워크로 거래 보내기, 토큰 및 그 양 표시 등이 있습니다. 아래는 Robonomics Parachain을 위한 계정을 생성하는 두 가지 주요 방법입니다.**

## 1. Polkadot{.js} 브라우저 확장 프로그램 사용

Polkadot 확장 프로그램은 계정을 생성하고 Robonomics Parachain을 포함한 모든 Polkadot / Kusama 프로젝트와 상호 작용할 수 있는 메커니즘을 제공합니다. 이는 계정을 관리하는 가장 안전한 방법은 아니지만 보안/사용성 균형 측면에서 가장 편리한 방법입니다.

## 1.1. 브라우저 확장 프로그램 설치

브라우저 확장 프로그램은 [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) 및 [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (크롬 기반 브라우저 포함)에서 사용할 수 있습니다.

{% roboWikiPicture {src:"docs/creating-an-account/1.1-polkadot-extension.png", alt:"브라우저 확장 프로그램"} %}{% endroboWikiPicture %}

## 1.2. Robonomics Parachain 앱 열기

Polkadot / Substrate 포털의 [Robonomics Parachain 앱](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)로 이동합니다. 포털에 처음으로 접속하는 경우 브라우저 확장 프로그램에 대한 액세스 권한을 요청할 것이므로 액세스를 허용합니다.

앱을 열었으면 왼쪽 상단을 살펴보세요. 네트워크의 이름, 아이콘 및 마지막 블록 번호가 표시됩니다. 이 영역을 클릭하면 모든 Polkadot / Kusama 네트워크 목록이 열립니다. 필요한 네트워크를 선택하고 `Switch` 버튼을 눌러 네트워크 간 전환할 수 있습니다. **반드시**Robonomics Parachain에 연결되었습니다**.

{% roboWikiPicture {src:"docs/creating-an-account/1.2-robonomics-app.png", alt:"Robonomics Parachain app"} %}{% endroboWikiPicture %}

## 1.3. 확장 프로그램 메타데이터 및 브라우저 내 계정 생성 업데이트

앱이 확장 프로그램의 메타데이터를 업데이트하라고 요청할 가능성이 매우 높습니다. 연결된 체인에 대한 올바른 정보를 표시하도록 합니다. **Settings -> Metadata**로 이동하여 `Update metadata` 버튼을 누르고, 팝업 창에서 확장 프로그램이 업데이트하도록 허용합니다.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-metadata-update.png", alt:"Updating metadata"} %}{% endroboWikiPicture %}

기본적으로 웹 애플리케이션은 외부 계정만 지원합니다. 브라우저에서 새 계정을 직접 만들 수 있도록 하려면 **Settings -> General -> Account options -> in-browser account creation**으로 이동하여 `Allow local in-browser account storage`를 선택하고 `Save` 버튼을 누릅니다.

{% roboWikiPicture {src:"docs/creating-an-account/1.3-in-browser-account-creation.png", alt:"Updating account creation in Browser"} %}{% endroboWikiPicture %}

## 1.4. 확장 프로그램에서 계정 생성

Polkadot{.js} 브라우저 확장 프로그램을 엽니다. 큰 플러스 버튼을 클릭하거나 오른쪽 상단의 작은 플러스 아이콘에서 `Create new account`를 선택합니다. 다음과 같은 메뉴가 표시됩니다. 12개의 단어로 된 니모닉 시드와 주소가 생성됩니다.

{% roboWikiPicture {src:"docs/creating-an-account/1.4-create-account-step-1.png", alt:"Account creation, step one"} %}{% endroboWikiPicture %}

시드는 계정의 열쇠입니다. 시드를 알고 있다면 (또는 시드를 아는 누군가) 이 계정을 제어하고 비밀번호를 잊어버린 경우에도 다시 만들 수 있습니다. **안전하게 보관하는 것이 매우 중요합니다**, 가능하면 종이나 다른 비디오 장치에 저장하고 디지턼 저장소나 컴퓨터에 저장하지 않도록 합니다.

시드를 저장하고 `Next step`을 누릅니다. 다음 메뉴가 표시됩니다.

{% roboWikiPicture {src:"docs/creating-an-account/1.5-create-account-step-2.png", alt:"Account creation, step two"} %}{% endroboWikiPicture %}


- *네트워크*이 계정이 전용으로 사용될 네트워크를 선택할 수 있습니다. 여러 네트워크에서 동일한 주소를 사용할 수 있지만, 개인 정보 보호를 위해 각 사용하는 네트워크마다 새 주소를 만드는 것이 권장됩니다.
드롭다운 목록에서 Robonomics 네트워크를 선택하십시오. Robonomics 네트워크를 찾을 수 없다면, 메타데이터를 업데이트하지 않은 것일 가능성이 높습니다. 다시 돌아가서 업데이트하십시오.

	`주소 형식과 계정 아이콘이 변경되는 것을 알 수 있을 것입니다 — 이것은 정상입니다. 다른 네트워크 형식은 동일한 공개 키의 다른 표현일 뿐입니다.`

- *이름*은 계정의 이름으로 오직 당신만을 위한 것입니다. 블록체인에 저장되지 않으며 다른 사용자에게는 보이지 않습니다.

- *비밀번호*는 계정 정보를 암호화하는 데 사용됩니다. 포털에서 트랜잭션에 서명할 때 다시 입력해야 합니다. 비밀번호를 생성하고 기억하세요.

계정을 생성한 후에는 Polkadot{.js} 확장 프로그램의 계정 목록에서 확인할 수 있습니다. 세 개의 점을 클릭하여 계정의 이름을 변경하거나 내보내거나 확장 프로그램에서 제거하거나 계정에 사용된 네트워크를 변경할 수 있습니다.

또한, 계정은 포털의 **계정 -> 계정** 메뉴에 나타나며, 확장 프로그램을 사용하여 주입되었음이 표시됩니다.

{% roboWikiPicture {src:"docs/creating-an-account/1.6-account-injected.png", alt:"계정 생성 성공"} %}{% endroboWikiPicture %}


## 2. Robonomics Parachain 앱에서 직접

Polkadot / Substrate 포털의 사용자 인터페이스를 사용하여 계정을 생성할 수 있습니다. 개발 및 테스트에 사용할 수 있습니다.

## 2.1. Robonomics Parachain 앱 열기

[Robonomics Parachain 앱](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)으로 이동하여 Polkadot / Substrate 포털에서 Robonomics Parachain에 연결되어 있는지 왼쪽 상단 모서리에서 확인하십시오.

**계정 -> 계정**으로 이동하여 `계정 추가` 버튼을 누르십시오.

{% roboWikiPicture {src:"docs/creating-an-account/2.1-robonomics-app-main-view.png", alt:"Robonomics Parachain 앱"} %}{% endroboWikiPicture %}

## 2.2. 계정 생성

다음 팝업 메뉴가 계정 시드와 함께 표시됩니다.

{% roboWikiPicture {src:"docs/creating-an-account/2.2-robonomics-app-seed.png", alt:"계정 시드 생성"} %}{% endroboWikiPicture %}

두 가지 형식이 있습니다: *니모닉*(인간이 읽을 수 있는 형태)과 *Raw*(숫자와 문자의 시퀀스). 시드 문구를 안전하게 보관하고 `다음`을 누릅니다.

> 또한 계정 생성의 암호화 유형을 변경할 수 있습니다. 이를 위해 `고급 생성 옵션`을 열고 유형을 선택하세요 (이미지에서는 `ed25519`).

{% roboWikiPicture {src:"docs/creating-an-account/ed-account.jpg", alt:"ed25519 암호화 유형 계정"} %}{% endroboWikiPicture %}

다음 메뉴에서는 계정 이름과 암호를 설정해야 합니다. 확장 프로그램 지침서에서 설명한 것과 유사합니다.


{% roboWikiPicture {src:"docs/creating-an-account/2.3-robonomics-app-name-pass.png", alt:"계정 이름과 암호 생성"} %}{% endroboWikiPicture %}

`다음` 버튼을 클릭하면 마지막 창으로 이동합니다. `저장`을 클릭하여 계정 생성을 완료합니다. 또한 안전하게 보관해야 할 백업 JSON 파일이 생성됩니다. 나중에 암호를 기억한다면 이 파일을 사용하여 계정을 복구할 수 있습니다.

{% roboWikiPicture {src:"docs/creating-an-account/2.4-robonomics-app-account-created.png", alt:"계정 생성 성공"} %}{% endroboWikiPicture %}

## 2.3 Polkadot 확장 프로그램에 ed25519 계정 추가

생성된 계정을 Polkadot.js 확장 프로그램에 추가해야 할 수 있습니다 (ed25519 계정의 경우 백업 JSON 파일만으로 가능합니다). 이를 위해 계정의 백업 파일을 생성해야 합니다. 계정에서 세 개의 점을 누르고 `이 계정을 위한 백업 파일 생성`을 선택하고 암호를 입력하세요.

{% roboWikiPicture {src:"docs/creating-an-account/backup-file.jpg", alt:"백업 파일"} %}{% endroboWikiPicture %}

그런 다음 확장 프로그램을 열고 오른쪽 상단의 `+` 버튼을 누르고 `백업 JSON 파일에서 계정 복원`을 선택하세요.

{% roboWikiPicture {src:"docs/creating-an-account/extention-add-backup.jpg", alt:"확장 프로그램에서 백업 복원"} %}{% endroboWikiPicture %}

열린 창에 저장된 파일을 끌어다 놓고 비밀번호를 입력한 후 `복원`을 누릅니다.

{% roboWikiPicture {src:"docs/creating-an-account/file-backup.jpg", alt:"확장 프로그램에서 백업 복원 2"} %}{% endroboWikiPicture %}

## 3. 계정이 성공적으로 생성되었습니다

이제 새로 만든 계정으로 완전히 작업할 수 있습니다. 토큰을 보내고 받고, 메시지를 주고받고, 데이터로그를 작성하고 더 많은 작업을 할 수 있습니다. 앱의 모든 기능을 자유롭게 탐험해보세요. 계정 주소를 복사하려면 해당 아이콘을 클릭하면 클립보드로 주소가 복사됩니다.

Polkadot / Kusama 계정 및 추가적인 생성 방법에 대해 더 알고 싶다면 [여기](https://wiki.polkadot.network/docs/learn-accounts)와 [여기](https://wiki.polkadot.network/docs/learn-account-generation)에서 자세한 정보를 찾을 수 있습니다.