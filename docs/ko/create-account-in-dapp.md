---
title: Create Account for Robonomics Parachain 

contributors: [PaTara43, Fingerling42]
---

**로보노믹스 파라체인과 상호 작용하고 운영하기 위해서는 개발자와 사용자가 Polkadot / Substrate 포털에 계정을 생성해야 합니다. 계정은 네트워크를 위한 기본 기능을 수행합니다: 공개 네트워크 주소(공개 키), 주소 및 자금에 대한 액세스 제어(개인 키), 네트워크로의 트랜잭션 전송, 토큰 및 수량 표시 등. 로보노믹스 파라체인을 위한 계정을 생성하는 두 가지 주요 방법은 다음과 같습니다.**

## 1. Polkadot{.js} 브라우저 확장 프로그램 사용

Polkadot 확장 프로그램은 로보노믹스 파라체인을 포함한 모든 Polkadot / Kusama 프로젝트와 상호 작용하고 계정을 생성하는 메커니즘을 제공합니다. 이는 계정을 관리하는 가장 안전한 방법은 아니지만 보 / 사용성 균형 측면에서 가장 편리한 방법입니다.

## 1.1. 브라우저 확장 프로그램 설치

브라우저 확장 프로그램은 [FireFox](https://addons.mozilla.org/en-US/firefox/addon/polkadot-js-extension) 및 [Google Chrome](https://chrome.google.com/webstore/detail/polkadot%7Bjs%7D-extension/mopnmbcafieddcagagdcbnhejhlodfdd?hl=en) (및 Chromium 기반 브라우저)에서 사용할 수 있습니다.

![Browser Extension](../images/creating-an-account/1.1-polkadot-extension.png "Browser Extension")

## 1.2. 로보노믹스 파라체인 앱 열기

Polkadot / Substrate 포털의 [로보노믹스 파라체인 앱](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)로 이동하십시오. 이 포털에 처음으로 접속하는 경우 브라우저 확장 프로그램에 대한 액세스 권한을 요청할 것이므로 액세스를 허용하십시오. 

앱을 열었으면 왼쪽 상단을 살펴보십시오. 네트워크 이름, 아이콘 및 마지막 블록 번호가 표시됩니다. 이 영역을 클릭하면 테스트 네트워크 및 로컬 노드를 포함한 모든 Polkadot / Kusama 네트워크 목록이 열립니다. 필요한 네트워크를 선택하고 `Switch` 버튼을 눌러 네트워크 간에 전환할 수 있습니다. **지금 로보노믹스 파라체인에 연결되어 있는지 확인하십시오**. 

![Robonomics Parachain app](../images/creating-an-account/1.2-robonomics-app.png "Robonomics Parachain app")

## 1.3. 확장 프로그램 메타데이터 업데이트

앱에서 확장 프로그램의 메타데이터를 업데이트하여 연결된 체인에 대한 올바른 정보를 표시하도록 요청할 수 있습니다. **Settings -> Metadata**로 이동하여 `메타데이터 업데이트` 버튼을 누르고 팝업 창에서 확장 프로그램이 업데이트하도록 허용하십시오. 

![Updating metadata](../images/creating-an-account/1.3-metadata-update.png "Updating metadata")

## 1.4. 확장 프로그램에서 계정 생성

Polkadot{.js} 브라우저 확장 프로그램을 엽니다. 큰 플러스 버튼을 클릭하거나 오른쪽 상단의 작은 플러스 아이콘에서 `Create new account`을 선택하십시오. 다음과 같은 메뉴가 표시됩니다. 12개의 단어로 된 니모닉 시드와 주소가 생성됩니다. 

![Account creation, step one](../images/creating-an-account/1.4-create-account-step-1.png "Account creation, step one")

시드는 계정의 키입니다. 시드를 알고 있다면(또는 시드를 알고 있는 다른 사람이 있다면)이 계정을 제어하고 비밀번호를 잊어버린 경우에도 다시 생성할 수 있습니다. **시드를 안전한 곳에 저장하는 것이 매우 중요합니다**, 가능하면 종이나 기타 비디오 장치에 저장하십시오. 

시드를 저장하고 `Next step`를 누르십시오. 다음과 같은 메뉴가 표시됩니다.

![Account creation, step two](../images/creating-an-account/1.5-create-account-step-2.png "Account creation, step two")

- *Network* 네트워크 중에서 이 계정을 독점적으로 사용할 네트워크를 선택할 수 있습니다. 동일한 주소를 여러 네트워크에서 사용할 수 있지만, 개인 정보 보호를 위해 각 사용하는 네트워크마다 새 주소를 생성하는 것이 권장됩니다. 
드롭다운 목록에서 로보노믹스 네트워크를 선택하십시오. 로보노믹스 네트워크를 찾을 수 없는 경우 메타데이터를 업데이트하지 않은 것입니다. 되돌아가서 업데이트하십시오.

    - 주소 형식과 계정 아이콘이 변경되는 것을 알 수 있습니다. 이는 정상입니다. 다른 네트워크 형식은 동일한 공개 키의 다른 표현일 뿐입니다. 

- *Name* 계정 이름은 사용자만을 위한 것입니다. 블록체인에 저장되지 않으며 다른 사용자에게는 표시되지 않습니다. 

- *Password* 계정 정보를 암호화하는 데 사용됩니다. 포털에서 거래를 서명할 때 다시 입력해야 합니다. 하나를 생성하고 기억하세요.

결과적으로 계정을 생성한 후에는 Polkadot{.js} 확장 프로그램의 계정 목록에서 볼 수 있습니다. 세 개의 점을 클릭하여 계정의 름을 변경하거나 내보내거나 확장 프로그램에서 제거하고 계정에 사용되는 네트워크를 변경할 수 있습니다. 

또한, 계정은 확장 프로그램을 사용하여 주입되었음을 나타내는 **Accounts -> Accounts** 메뉴에 나타납니다.

![Successful account creation](../images/creating-an-account/1.6-account-injected.png "Successful account creation")


## 2. Robonomics Parachain 앱에서 직접

Polkadot / Substrate 포털에서 사용자 인터페이스를 사용하여 계정을 생성할 수 있습니다. 개발 및 테스트에 사용할 수 있습니다. 

## 2.1. Robonomics Parachain 앱 열기

Polkadot / Substrate 포털의 [Robonomics Parachain 앱](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/)로 이동하세요. **왼쪽 상단 모서리에서 Robonomics Parachain에 연결되었는지 확인하세요**.  

**Accounts -> Accounts** 으로 이동하여 `계정 추가` 버튼을 누르세요. 

![Robonomics Parachain App](../images/creating-an-account/2.1-robonomics-app-main-view.png "Robonomics Parachain App")

## 2.2. 계정 생성

다음과 같은 팝업 메뉴가 표시됩니다. 

![Generating account seed](../images/creating-an-account/2.2-robonomics-app-seed.png "Generating account seed")

두 가지 형식이 있습니다: *니모닉* (인간이 읽을 수 있는 형식) 및 *Raw* (숫자와 문자의 연속). 시드 구문을 안전하게 저장하고 `다음`을 누르세요.

> 또한, 계정 생성의 암호 유형을 변경할 수도 있습니다. `고급 생성 옵션`을 열고 형식(`ed25519`이 그림에서 선택된 형식)을 선택하세요.

![ed25519 crypto type account](../images/creating-an-account/ed-account.jpg)

다음 메뉴에서 계정 이름과 비밀번호를 설정해야 합니다. 위에서 설명한 확장 프로그램의 지침과 유사합니다.

![Generating account name and password](../images/creating-an-account/2.3-robonomics-app-name-pass.png "Generating account name and password")

`Next` 버튼을 클릭하면 마지막 창으로 이동합니다. 계정 생성을 완료하려면 `Save`을 클릭하세요. 또한, 계정을 안전하게 보관해야 하는 백업 JSON 파일도 생성됩니다. 나중에 비밀번호를 기억한다면 이 파일을 사용하여 계정을 복구할 수 있습니다.

![Successful account creation](../images/creating-an-account/2.4-robonomics-app-account-created.png "Successful account creation")

## 2.3 ed25519 계정을 Polkadot 확장 프로그램에 추가

생성한 계정을 Polkadot.js 확장 프로그램에 추가해야 할 수도 있습니다 (ed25519 계정의 경우 백업 JSON 파일만 사용할 수 있습니다). 계정의 세 개의 점을 누르고 `이 계정에 대한 백업 파일 생성`을 선택하고 비밀번호를 입력하세요.

![Backup file](../images/creating-an-account/backup-file.jpg)

그런 다음 확장 프로그램을 열고 오른쪽 상단의 `+` 버튼을 누르고 `Restore account from backup JSON file`을 선택하세요.

![Restore backup in extension](../images/creating-an-account/extention-add-backup.jpg)

열린 창에 저장된 파일을 놓고 비밀번호를 입력하고 `Restore`을 누르세요.

![Restore backup in extension 2](../images/creating-an-account/file-backup.jpg)

## 3. 계정이 성공적으로 생성되었습니다 

이제 새로 생성한 계정을 완전히 사용할 수 있습니다. 토큰을 보내고 받고, 메시지를 보내고, 데이터로그를 작성하는 등의 작업을 수행할 수 있습니다. 앱의 모든 기능을 자유롭 탐색하세요. 계정 주소를 복사하려면 해당 아이콘을 클릭하면 주소가 클립보드에 복사됩니다. 

Polkadot / Kusama 계정 및 추가적인 생성 방법에 대해 더 알고 싶다면 [여기](https://wiki.polkadot.network/docs/learn-accounts)와 [여기](https://wiki.polkadot.network/docs/learn-account-generation)에서 자세한 정보를 찾을 수 있습니다.
