---
title: Обзор умного дома Robonomics

contributors: [Fingerling42, nakata5321]
---

## Безопасный IoT с блокчейном

Для вашего умного дома современный рынок IoT предлагает широкий спектр решений. Однако вы обычно привязаны к централизованным облачным провайдерам или дорогим собственным шлюзам. В результате вы, как пользователь, всегда зависите от поставщика оборудования и инфраструктуры для работы вашей умной системы. В то же время ваш умный дом не может быть по-настоящему умным без облачной статистики и аналитики.

{% roboWikiVideo {videos:[{src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type: 'mp4'}, {src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**Мы видим две основные проблемы с текущими умными домами:**

1. У вас нет контроля над тем, какие данные вы делитесь с поставщиком или третьей стороной.
2. Ваш умный дом уязвим для отключения централизованных облачных серверов.

{% roboWikiPicture {src:"docs/home-assistant/ha-problems.png", alt:"image"} %}{% endroboWikiPicture %}

Для решения обеих проблем мы предлагаем вам попробовать Robonomics, наш **безопасный**, **безсерверный** и **футуристический** децентрализованный облачный сервис.

{% roboWikiPicture {src:"docs/home-assistant/ha-robonomics.png", alt:"warning"} %}{% endroboWikiPicture %}

## Шаги к облачной платформе без корпораций

Вот несколько простых шагов для создания доступного умного дома с использованием Home Assistant в качестве приложения для обмена данными устройств и Robonomics в качестве облачной платформы без корпораций. Robonomics использует современные и безопасные технологии Web3, обеспечивая улучшенную безопасность на протяжении всего процесса.

{% roboWikiPicture {src:"docs/home-assistant/OVERVIEW.png", alt:"warning"} %}{% endroboWikiPicture %}

## Начните здесь ваш умный дом

Мы подготовили подробные руководства по настройке умного дома на Robonomics. Шаги могут различаться в зависимости от вашей конкретной ситуации: имеете ли вы уже работающий Home Assistant с подключенными устройствами или начинаете все с нуля для создания своего умного дома.

{% roboWikiGridWrapper {columns: '2', textAlign: center, flexible: true} %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Для пользователей Home Assistant", link: "/docs/sub-activate/?topic=Upgrade Home Assistant OS", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Для новых пользователей", link: "/docs/install-smart-home", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}