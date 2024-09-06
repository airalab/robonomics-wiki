---
title: 가상 장치

contributors: [nakata5321]
---

**이 기사에서는 스마트 홈에서 가상 장치를 만드는 방법을 설명하여 실제 플랫폼이 어떻게 보이는지 확인할 수 있습니다.**

## 통합 설치

가상 장치를 사용하려면 ["데모" 통합](https://www.home-assistant.io/integrations/demo/)을 설치해야 합니다.
이를 위해 구성 파일을 편집해야 합니다.

구성 프로세스 중에 제공한 구성 폴더로 이동합니다. 이 폴더에서 "homeassistant"라는 폴더를 찾을 수 있습니다.
이 폴더로 들어가세요. **루트** 사용자로 `configuration.yaml` 파일을 텍스트 편집기로 열고 다음 라인을 삽입하세요:

{% codeHelper { copy: true}%}

```
...
# 예시 configuration.yaml 항목
demo:
...
```

{% endcodeHelper %}


그 후에 웹 인터페이스를 통해 Home Assistant를 다시 시작하세요. 스마트 홈이 다시 시작되면 "데모" 엔티티에서 모든 가상 장치를 찾을 수 있습니다.
이를 `설정 -> 장치 및 서비스 -> 데모`에서 찾을 수 있습니다. 이러한 엔티티는 모두 대시보드에 추가할 수 있습니다.

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"demo-entities"} %}{% endroboWikiPicture %}
