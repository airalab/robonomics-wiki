---
title: Обзор Robonomics Smart Home

contributors: [Fingerling42, nakata5321]
---

## Безопасный IoT с использованием блокчейна

Для вашего умного дома современный рынок IoT предлагает широкий спектр решений. Но вы обычно привязаны к централизованным облачным провайдерам или дорогостоящим собственным шлюзам. В результате вы, как пользователь, всегда зависите от поставщика оборудования и инфраструктуры для работы вашей умной системы. В то же время ваш умный дом не может быть по-настоящему умным без облачной статистики и аналитики.

{% roboWikiVideo {videos:[{src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type: 'mp4'}, {src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**Мы видим две основные проблемы с существующими умными домами:**

1. У вас нет контроля над теми данными, которые вы делитесь с поставщиком или третьей стороной.
2. Ваш умный дом уязвим для отключения централизованных облачных серверов.

{% roboWikiPicture {src:"docs/home-assistant/ha-problems.png", alt:"image"} %}{% endroboWikiPicture %}

Чтобы решить обе проблемы, мы предлагаем вам попробовать Robonomics - нашу **безопасную**, **безсерверную** и **футуристическую** децентрализованную облачную платформу.

{% roboWikiPicture {src:"docs/home-assistant/ha-robonomics.png", alt:"warning"} %}{% endroboWikiPicture %}

## Шаги к облачной платформе без корпораций

Вот несколько простых шагов для создания доступного умного дома с использованием Home Assistant в качестве приложения для обмена данными устройств и Robonomics в качестве безкорпоративной децентрализованной облачной платформы. Robonomics использует современные и безопасные технологии Web3, обеспечивая повышенную безопасность на протяжении всего процесса.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-secure-blockchain-smart-home_3.png", alt:"warning"} %}{% endroboWikiPicture %}

## Начните здесь свой умный дом

Мы подготовили подробные руководства по настройке умного дома на Robonomics. Шаги могут варьироваться в зависимости от вашей конкретной ситуации: у вас уже есть работающий Home Assistant с подключенными устройствами или вы начинаете с нуля, чтобы создать свой умный дом.

{% roboWikiGridWrapper {columns: '2', textAlign: center, flexible: true} %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "For Home Assistant users", link: "/docs/sub-activate/?topic=Upgrade Home Assistant OS", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "For new users", link: "/docs/install-smart-home", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}
