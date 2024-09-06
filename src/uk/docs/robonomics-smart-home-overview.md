---
title: Огляд розумного будинку Robonomics

contributors: [Fingerling42, nakata5321]
---

## Безпечний Інтернет речей з блокчейном

Для вашого розумного будинку сучасний ринок Інтернету речей надає широкий спектр рішень. Проте ви зазвичай зв'язані з централізованими постачальниками хмари або дорогими пропрієтарними шлюзами. В результаті ви, як користувач, завжди залежите від постачальника апаратного забезпечення та інфраструктури для запуску вашої розумної системи. У той же час ваш розумний будинок не може бути по-справжньому розумним без хмарової статистики та аналітики.

{% roboWikiVideo {videos:[{src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type: 'mp4'}, {src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**Ми бачимо дві основні проблеми з поточними розумними будинками:**

1. Ви не маєте контролю над тими даними, які ви ділитеся з постачальником або третьою стороною.
2. Ваш розумний будинок вразливий до вимкнення централізованих хмарових серверів.

{% roboWikiPicture {src:"docs/home-assistant/ha-problems.png", alt:"image"} %}{% endroboWikiPicture %}

Для вирішення обох проблем ми радимо вам спробувати Robonomics, наш **безпечний**, **безсерверний** та **майбутній** децентралізований хмаровий сервіс.

{% roboWikiPicture {src:"docs/home-assistant/ha-robonomics.png", alt:"warning"} %}{% endroboWikiPicture %}

## Кроки до безкоштовної корпоративної хмари

Ось декілька простих кроків для створення доступного розумного будинку, використовуючи Home Assistant як додаток для комунікації з пристроями та Robonomics як безкоштовну корпоративно-вільну, децентралізовану хмарову платформу. Robonomics використовує сучасні та безпечні технології Web3, забезпечуючи підвищену безпеку на протязі всього процесу.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-secure-blockchain-smart-home_3.png", alt:"warning"} %}{% endroboWikiPicture %}

## Почніть тут свій розумний будинок

Ми підготували докладні посібники з налаштування розумного будинку на Robonomics. Кроки можуть відрізнятися в залежності від вашої конкретної ситуації: чи вже у вас є працюючий Home Assistant з парованими пристроями, чи ви починаєте з нуля, щоб створити свій розумний будинок.

{% roboWikiGridWrapper {columns: '2', textAlign: center, flexible: true} %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Для користувачів Home Assistant", link: "/docs/sub-activate/?topic=Upgrade Home Assistant OS", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Для нових користувачів", link: "/docs/install-smart-home", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}