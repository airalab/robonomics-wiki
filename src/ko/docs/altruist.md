---
title: 이타주의자 설정
contributors: [tubleronchik]
---

**이 가이드는 이타주의자 야외 센서를 설정하고 활성화하는 과정을 안내합니다. 센서를 Wi-Fi에 연결하고, 위치를 구성하며, XRT 토큰을 사용하여 구독을 활성화합니다. 또한, HACS 또는 수동 설치를 통해 Home Assistant와 센서를 통합하는 방법도 제공됩니다.**

{% roboWikiNote {type: "warning"}%} Robonomics의 모든 장치는 공식 [웹사이트](https://robonomics.network/devices/)에서 구매할 수 있습니다.{% endroboWikiNote %}

## Robonomics 구독 활성화

{% roboWikiNote {type: "okay"} %}이 단계를 완료하려면 `Robonomics Polkadot` 계정에 최소 2-3개의 XRT 토큰이 있어야 합니다.{% endroboWikiNote %}

1) Robonomics dApp [구독 페이지](https://robonomics.app/#/rws-buy)로 이동합니다.
2) **계정**을 클릭하고 지갑을 연결합니다. 계정 주소와 잔액이 표시됩니다.
계정이 없는 경우, [이 가이드](https://wiki.robonomics.network/docs/create-account-in-dapp/)를 따라 계정을 생성하세요.

{% roboWikiPicture {src:"docs/altruist/altruist_syb_buy.jpg", alt:"구독 페이지"} %}{% endroboWikiPicture %}

3) `구독 구매`를 클릭하고 거래에 서명합니다. **활성화 과정이 완료될 때까지 기다리세요**.
4) 활성화되면, **설정 페이지**로 리디렉션되며, 구독 이름과 만료 날짜를 확인할 수 있습니다.

{% roboWikiPicture {src:"docs/altruist/altruist_setup_page.jpg", alt:"구독 설정 페이지"} %}{% endroboWikiPicture %}

5) **계정 주소 저장** — 센서 설정 중에 필요합니다. "OWNER" 섹션에서 복사하거나 오른쪽 상단 모서리의 계정 이름을 클릭하고 복사 버튼을 선택하여 복사할 수 있습니다.

## 센서 설정

{% roboWikiNote {type: "warning", title: "정보"}%} 센서는 2.4GHz Wi-Fi 네트워크에만 연결할 수 있습니다.{% endroboWikiNote %}

1) **센서를 전원 소켓에 연결**합니다.
2) 보드는 Altruist-xxxxxxxxx라는 Wi-Fi 네트워크를 생성합니다. 휴대폰이나 컴퓨터에서 연결하세요. 인증 창이 자동으로 열리도록 요청받을 것입니다.
- 그렇지 않으면 브라우저를 열고 192.168.4.1로 이동하세요.

{% roboWikiPicture {src:"docs/altruist/networks.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

3) **Wi-Fi 설정 구성**:
- 목록에서 Wi-Fi 네트워크를 선택하거나 나타나지 않으면 수동으로 입력하세요.
- "WI-FI SETTINGS" 필드에 비밀번호를 입력하세요.
- 동일한 네트워크에 여러 Altruist 장치가 있는 경우 로컬 호스트 이름을 변경하세요. WiFi 설정 후 이 호스트 이름을 사용하여 센서에 연결할 수 있습니다.

{% roboWikiPicture {src:"docs/altruist/wifi_creds.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

4) **구성 저장**
- 클릭하세요.`구성 저장 및 재시작` 버튼을 클릭하고 센서가 WiFi에 연결될 때까지 기다리세요. 연결되면 새로운 IP 주소가 표시됩니다. 이 주소를 복사하세요. 이는 설정 후 센서에 연결하는 대체 방법입니다.

{% roboWikiPicture {src:"docs/altruist/connected.png", alt:"altruist-sensor"} %}{% endroboWikiPicture %}

5) **로보노믹스 세부 정보 입력**:
- http://altruist.local에서 Altruist 웹 인터페이스를 열거나, 변경한 경우 사용자 지정 로컬 호스트 이름 뒤에 `.local`을 사용하세요. 그런 다음 `구성` 페이지로 이동합니다.
- `로보노믹스` 섹션에서 이전에 복사한 RWS 소유자 주소를 지정된 필드에 붙여넣습니다.

6) **센서 위치 설정**:
- `GPS 및 온도 보정` 섹션에서 센서 설치 위치의 좌표를 입력하세요.
- 온라인 지도를 사용하여 좌표를 찾거나 [이 링크](https://www.latlong.net/convert-address-to-lat-long.html)를 사용하여 주소를 위도/경도로 변환할 수 있습니다.

{% roboWikiNote {type: "warning", title: "경고"}%}센서 좌표는 공개적으로 이용 가능한 지도에 표시됩니다. 개인 정보를 공개하고 싶지 않다면 정확하지 않은 근처 좌표를 작성하세요.{% endroboWikiNote %}

{% roboWikiPicture {src:"docs/altruist/robo-gps.png", alt:"altruist-sensor-wifi"} %}{% endroboWikiPicture %}

7) **Altruist "로보노믹스 주소" 복사**:
- 페이지 상단에서 찾을 수 있습니다. 이를 저장하세요.마지막 단계입니다.

{% roboWikiPicture {src:"docs/altruist/address.jpg", alt:"altruist address"} %}{% endroboWikiPicture %}

8) 페이지 하단의 "**구성 저장 및 재시작**"을 클릭하세요. 보드가 재부팅됩니다.

## Altruist 활성화
설정 과정의 마지막 단계는 **Altruist 주소**를 **Robonomics 구독**에 추가하는 것입니다.

1) [설정 페이지](https://robonomics.app/#/rws-setup)로 돌아갑니다.

2) "**구독 사용자**" 섹션으로 스크롤합니다.

3) "**사용자 추가**" 필드에 이전에 복사한 **Altruist Robonomics 주소**를 붙여넣습니다.

{% roboWikiPicture {src:"docs/altruist/add_user.jpg", alt:"add user"} %}{% endroboWikiPicture %}

4) **플러스 (+) 버튼**을 클릭하고 메시지에 서명합니다.

5) 작업이 완료될 때까지 기다립니다.

이제 설정이 완료되었습니다. 🎉

이제 [Robonomics Sensors Social](https://sensors.social/#) 지도에서 Altruist를 찾을 수 있습니다. 🚀

{% roboWikiPicture {src:"docs/altruist/map.jpg", alt:"sensor map"} %}{% endroboWikiPicture %}

## Home Assistant

**Altruist**를 **Home Assistant**에 추가하는 두 가지 방법이 있습니다:

### 옵션 1: HACS (권장)

**Altruist**를 추가하는 가장 쉬운 방법은 **HACS**를 통해서입니다. 간단한 설정 가이드는 [여기](https://hacs.xyz/docs/use/)에서 찾을 수 있습니다. 

**단계****:
1) HACS가 설치되면, 열어보세요.

2) 오른쪽 상단의 **세 개의 점**을 클릭하고 "**Custom repositories**"를 선택하세요.

3) 팝업 창에 다음 URL을 입력하세요:

```
https://github.com/airalab/altruist-homeassistant-integration
```
4) 유형을 "**Integration**"으로 설정하고 "**ADD**"를 클릭하세요.

{% roboWikiPicture {src:"docs/altruist/hacs.jpg", alt:"altruist-add"} %}{% endroboWikiPicture %}

5) **Altruist Sensor** 통합을 검색하세요.

6) **다운로드** 버튼을 클릭한 후, 통합이 설치되면 **Home Assistant**를 다시 시작하세요.


{% roboWikiPicture {src:"docs/altruist/integration.jpg", alt:"altruist-hacs"} %}{% endroboWikiPicture %}

### 옵션 2: 수동 설치

1) `homeassistant` 사용자로 프로젝트 저장소를 클론하세요:

{% codeHelper { copy: true}%}

```shell
  git clone https://github.com/airalab/altruist-homeassistant-integration.git
```

{% endcodeHelper %}

2) 이미 사용자 정의 통합이 있는 경우, `altruist` 폴더를 `custom_components` 디렉토리로 이동하세요:

{% codeHelper { copy: true}%}

```
cd altruist-homeassistant-integration
mv custom_components/altruist ~/.homeassistant/custom_components/
```

{% endcodeHelper %}

3) 사용자 정의 통합이 **없는** 경우, 전체 custom_components 디렉토리를 이동하세요:

{% codeHelper { copy: true}%}

 ```
cd altruist-homeassistant-integrationmv custom_components/ ~/.homeassistant/

{% endcodeHelper %}

## 구성

설치 및 Home Assistant를 재시작한 후, 통합은 네트워크에서 Altruist를 자동으로 감지합니다.

1) **설정 → 장치 및 서비스**로 이동합니다.

2) **Altruist 센서**를 추가합니다.

{% roboWikiPicture {src:"docs/altruist/add_altruist.jpg", alt:"altruist 발견"} %}{% endroboWikiPicture %}

이제 완료되었습니다! 🚀 Altruist 센서가 Home Assistant에 통합되었습니다.