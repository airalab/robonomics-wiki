---
title: 홈 어시스턴트 OS 업그레이드
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**이 문서에는 Robonomics 통합을 사용하여 기존의 홈 어시스턴트 OS를 업그레이드하는 지침이 포함되어 있습니다.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## 설치 IPFS Add-on


Robonomics 통합은 로컬 IPFS 데몬을 사용하여 데이터를 저장하므로 먼저 설치해야 합다. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. 홈 어시스턴트용 [IPFS 애드온](https://github.com/airalab/ipfs-addon)이 있습니다. `Settings` -> `Add-ons`으로 이동하여 오른쪽 하단의 `ADD-ON STORE` 버튼을 누르면 설치할 수 있습니다.

2. 오른쪽 상단의 세 개의 점을 누르고 `Repositories`를 선택합니다. 다음 링크를 추가합니다:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. `ADD` 버튼을 누릅니다.

4. 저장소 관리자를 닫고 페이지를 새로 고칩니다. 이제 페이지 끝에 IPFS 데몬 애드온이 표시됩니다.

5. 애드온을 열고 `INSTALL`를 누릅니다. 설치가 완료되면 `START`을 누릅니다.

## HACS 설치

[홈 어시스턴트 커뮤니티 스토어 (HACS)](https://hacs.xyz/)를 사용하면 사용자 정의 통합을 설치할 수 있습니다.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. 시작하기 전에 SSH를 사용하여 홈 어시스턴트 장치에 연결하는 애드온을 설치해야 합니다. 애드온 스토어에서 `ssh`를 검색합니다. `SSH & Web Terminal` 애드온을 설치하는 것을 권장합니다.

<robo-wiki-note type="warning" title="Warning">

  SSH 애드온을 찾을 수 없는 경우 사용자 프로필 설정에서 고급 모드를 활성화해 보십시오. 이를 위해 왼쪽 하단의 프로필 아이콘을 클릭하고 고급 모드 옵션을 찾으십시오.

</robo-wiki-note>

2. 애드온을 선택하고 `INSTALL`를 누릅니다. 설치가 완료되면 `구성` 탭으로 이동하여 `password` 또는 `authorized_keys`를 추가합니다. 이 구성 부분을 저장하는 것을 잊지 마십시오.

3. `Info` 탭에서 `START`을 누릅니다. 사이드바에 애드온을 표시하려면 `Show in sidebar`를 활성화하는 것을 잊지 마십시오. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. SSH 애드온을 열고 다음 명령을 실행합니다:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. 홈어시스턴트를 다시 시작하세요(`Settings`->`System`에서 할 수 있습니다). 

6. 이제 HACS 통합을 `Integrations` 메뉴에 추가할 수 있습니다. `Settings`->`Devices & Services`로 이동하여 `Add Integration`를 누르고 HACS를 찾습니다.

<robo-wiki-note type="warning" title="Warning">

  HACS를 사용하려면 Github 계정이 필요합니다.

</robo-wiki-note>

7. 클릭한 후 설치 지침을 따릅니다. 

## Robonomics 통합 설치

이제 HACS를 사용하여 Robonomics 통합을 설치할 수 있습니다.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

사이드바 메뉴에서 HACS를 열고 `Integrations`으로 이동합니다. `탐색하기 & Download Repositories`를 클릭한 다음 `Robonomics`를 검색하고 오른쪽 하단에 있는 `Download` 버튼을 클릭합니다. 다운로드가 완료되면 홈 어시스턴트를 다시 시작하십시오.