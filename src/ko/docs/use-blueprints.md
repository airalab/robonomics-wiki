---
title: 블루프린트 사용 방법
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

이 기사에서는 Home Assistant에 자동화 블루프린트를 추가하고 구성하는 방법을 알아볼 수 있습니다.

## 블루프린트 자동화

일부 블루프린트는 이미 설치되어 있습니다. 이러한 블루프린트를 기반으로 하는 자동화는 구성만 필요합니다. 웹 인터페이스에서는 `Settings/Automations & Scenes`에서 미리 설치된 블루프린트를 찾을 수 있습니다. `Blueprints`를 열고 사용하려는 블루프린트를 찾을 수 있습니다. 이 예에서는 `Motion-activated Light`를 사용합니다.

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"Blueprint Settings"} %}{% endroboWikiPicture %}

`Create Automation`을 클릭하여 자동화 편집기를 엽니다. 이름을 지정하고 사용할 블루프린트를 선택합니다 (이 경우 `Motion-activated Light`를 선택합니다). 그 후 모션 센서와 램프를 선택해야 합니다. 구성이 완료되면 `Save`를 클릭합니다.

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"Automation Configuration"} %}{% endroboWikiPicture %}

변경을 원하는 경우 `Settings/Automations & Scenes`로 이동한 다음 `Automations`으로 이동하여 찾을 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"Automations List"} %}{% endroboWikiPicture %}

## 블루프린트 가져오기

Home Assistant는 Home Assistant 포럼, GitHub 및 GitHub gists에서 블루프린트를 가져올 수 있습니다. 모든 블루프린트 목록은 [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53)에 있습니다. 선택한 후 `Settings/Automations & Scenes`로 이동하여 `Blueprints`를 엽니다. `Import Blueprint`를 클릭하고 선택한 블루프린트의 URL을 삽입합니다. 그런 다음 `PREVIEW BLUEPRINT`를 클릭합니다. 이 경우 [Low battery level detection & notification for all battery sensors](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664)를 사용할 것입니다.

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"Importing Blueprint"} %}{% endroboWikiPicture %}

이렇게 하면 블루프린트가 로드되고 가져오 대화 상자에서 미리보기가 표시됩니다. 이름을 변경하고 가져오기를 완료할 수 있습니다. `Create Automation`을 클릭하여 자동화 편집기를 엽니다. 여기서 자동화 매개변수를 구성하고 알림을 받기 위한 작업을 추가할 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"Configure Battery Blueprint"} %}{% endroboWikiPicture %}