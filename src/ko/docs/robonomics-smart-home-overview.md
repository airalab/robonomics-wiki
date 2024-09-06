---
title: Robonomics 스마트 홈 개요

contributors: [Fingerling42, nakata5321]
---

## 블록체인으로 안전한 IoT

현대 IoT 시장에서는 스마트 홈을 위한 다양한 솔루션을 제공합니다. 그러나 일반적으로 중앙 집중식 클라우드 제공업체에 묶여 있거나 비싼 전용 게이트웨이에 종속되어 있습니다. 결과적으로 사용자로서는 하드웨어 및 인프라 제공업체에 항상 의존해야 합니다. 동시에 클라우드 통계 및 분석 없이는 스마트 홈이 진정으로 스마트하지 못합니다.

{% roboWikiVideo {videos:[{src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type: 'mp4'}, {src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**현재 스마트 홈에서 두 가지 주요 문제점을 보고 있습니다:**

1. 공급업체나 제3자와 공유하는 데이터에 대한 제어권이 없습니다.
2. 중앙 집중식 클라우드 서버의 중단에 취약합니다.

{% roboWikiPicture {src:"docs/home-assistant/ha-problems.png", alt:"image"} %}{% endroboWikiPicture %}

이 두 가지 문제를 해결하기 위해 우리는 **안전한**, **서버리스**, **미래지향적** 분산형 클라우드인 Robonomics를 시도해보라고 제안합니다.

{% roboWikiPicture {src:"docs/home-assistant/ha-robonomics.png", alt:"warning"} %}{% endroboWikiPicture %}

## 기업 무료 클라우드로의 단계

홈 어시스턴트를 장치 통신 애플리케이션으로 사용하고 기업 무료, 분산형 클라우드 플랫폼인 Robonomics를 활용하여 저렴한 스마트 홈을 만드는 간단한 단계를 소개합니다. Robonomics는 현대적이고 안전한 Web3 기술을 활용하여 프로세스 전반에 걸쳐 향상된 보안을 제공합니다.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-secure-blockchain-smart-home_3.png", alt:"warning"} %}{% endroboWikiPicture %}

## 여기서 스마트 홈 시작하기

Robonomics에서 스마트 홈을 설정하는 자세한 가이드를 준비했습니다. 단계는 사용자의 구체적인 상황에 따라 다를 수 있습니다. 이미 작동 중인 홈 어시스턴트와 페어링된 장치가 있는 경우이거나 스마트 홈을 구축하기 위해 처음부터 시작하는 경우일 수 있습니다.

{% roboWikiGridWrapper {columns: '2', textAlign: center, flexible: true} %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "홈 어시스턴트 사용자를 위한", link: "/docs/sub-activate/?topic=Upgrade Home Assistant OS", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "신규 사용자를 위한", link: "/docs/install-smart-home", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}