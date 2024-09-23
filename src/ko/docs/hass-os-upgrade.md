---

title: 홈 어시스턴트 OS 업그레이드
contributors: [LoSk-p]
tools:
  - 라즈베리파이용 홈 어시스턴트 OS 12.1
    https://github.com/home-assistant/operating-system
  - 홈 어시스턴트 코어 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics 홈 어시스턴트 통합 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 홈 어시스턴트 애드온 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy 애드온 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**이 문서에는 Robonomics 통합이 포함된 기존 홈 어시스턴트 OS를 업그레이드하는 지침이 포함되어 있습니다.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## HACS 설치

[홈 어시스턴트 커뮤니티 스토어 (HACS)](https://hacs.xyz/)를 통해 사용자 정의 통합을 설치할 수 있습니다.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. 시작하기 전에 SSH를 통해 홈 어시스턴트 장치에 연결하는 애드온을 설치해야 합니다. 애드온 스토어에서 `ssh`를 검색합니다. `SSH & Web Terminal` 애드온을 설치하는 것을 권장합니다.

{% roboWikiNote {title:"경고", type: "warning"}%} SSH 애드온을 찾을 수 없는 경우 사용자 프로필 설정에서 고급 모드를 활성화해 보십시오. 이를 위해 왼쪽 하단의 프로필 아이콘을 클릭하고 고급 모드 옵션을 찾으십시오.{% endroboWikiNote %}

2. 애드온을 선택하고 `INSTALL`을 누릅니다. 설치가 완료되면 `Configuration` 탭으로 이동하여 `password` 또는 `authorized_keys`를 추가합니다. 이 부분의 구성을 저장하는 것을 잊지 마십시오.

3. `Info` 탭에서 `START`를 누릅니다. 사이드바에 애드온을 표시하려면 `Show in sidebar`를 활성화하는 것을 잊지 마십시오.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. SSH 애드온을 열고 다음 명령을 실행합니다:

{% codeHelper { additionalLine: "홈 어시스턴트 명령 라인", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. 홈 어시스턴트를 다시 시작합니다 (`Settings`->`System`에서 수행할 수 있습니다).

6. 이제 HACS 통합이 `Integrations` 메뉴에 추가됩니다. `Settings`->`Devices & Services`로 이동하여 `Add Integration`을 누르고 HACS를 찾습니다.

{% roboWikiNote {title:"경고", type: "warning"}%} HACS를 사용하려면 Github 계정이 필요합니다.{% endroboWikiNote %}

7. 클릭하여 설치 지침을 따릅니다.

## IPFS 데몬 및 Libp2p - WS Proxy 애드온 설치

Robonomics 통합은 로컬 IPFS 데몬을 사용하여 데이터를 저장하고 원격 제어에 Libp2p를 사용하므로 먼저 설치해야 합니다. 이를 위해 Robonomics 애드온 저장소를 추가해야 합니다.

[![홈 어시스턴트 인스턴스를 열고 특정 저장소 URL이 미리 채워진 add-on 저장소 대화 상자를 표시합니다.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

또는 다음 단계를 수동으로 따를 수 있습니다:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. [Robonomics 애드온 저장소](https://github.com/PinoutLTD/robonomics-addons)가 있습니다. `Settings` -> `Add-Ons`로 이동하여 오른쪽 하단의 `ADD-ON STORE` 버튼을 누릅니다.

2. 오른쪽 상단의 세 점을 누르고 `Repositories`를 선택합니다. 다음 링크를 추가합니다:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. `ADD` 버튼을 누릅니다.

4. 저장소 관리자를 닫고 페이지를 새로 고칩니다. 이제 페이지 하단에 Robonomics 애드온을 볼 수 있습니다.

이제 두 애드온을 모두 설치할 수 있습니다. 열고 `INSTALL`을 누릅니다. 설치가 완료되면 `START`를 누릅니다.

## Robonomics 통합 설치

이제 HACS를 사용하여 Robonomics 통합을 설치할 수 있습니다.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

사이드바 메뉴에서 HACS를 열고 `Robonomics`를 검색합니다. 그런 다음 오른쪽 하단에 있는 `Download` 버튼을 클릭합니다. 다운로드가 완료되면 홈 어시스턴트를 다시 시작하십시오.