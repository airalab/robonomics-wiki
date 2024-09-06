---
title: Встановлення розумного будинку
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.27.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.37.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Ласкаво просимо до посібника з встановлення Home Assistant з інтеграцією Robonomics. Home Assistant - це система автоматизації вдома з відкритим кодом, яка надає централізовану платформу для керування розумними пристроями в домашній мережі. Інтегруючись з Robonomics, децентралізованою хмарним сервісом, ви можете покращити функціональність та безпеку вашого розумного будинку. У цій статті ми надамо поетапні інструкції з встановлення Home Assistant з Robonomics, що дозволить вам автоматизувати та керувати різними аспектами вашого будинку за допомогою безпечного та децентралізованого рішення. Почнемо!**

## Демонстрація

Ось приклад повного встановлення розумного будинку та інтеграції Robonomics. Пам'ятайте, що час, необхідний для цього, може варіюватися залежно від Інтернет-з'єднання.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Обладнання, яке вам знадобиться для встановлення

Якщо ви ще не включили Home Assistant до своєї системи розумного будинку, важливо знати, яке обладнання вам знадобиться для створення повноцінної системи розумного будинку з нуля. Команда Robonomics рекомендує використовувати Raspberry Pi 4 як сервер для розумного будинку. **Але можна налаштувати все на вашому ПК.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (принаймні 2 ГБ ОЗП)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-карта 16 ГБ</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Адаптер Zigbee (за бажанням) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Розумні пристрої Zigbee (за бажанням) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>ПК для налаштування</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. Встановлення передумов

Docker Robonomics містить:
- Home Assistant
- IPFS
- MQTT брокер та інтеграцію
- Zigbee2MQTT
- проксі libp2p
- Інтеграцію Robonomics

У цій статті буде показано процес встановлення на системі Ubuntu. Спочатку вам потрібно встановити наступні пакети:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

Потім вам потрібно встановити Docker на ПК. Інструкцію щодо встановлення можна знайти на [офіційному веб-сайті](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="Важлива інформація">

  Додайте свого користувача до групи docker, щоб запускати контейнери Docker без прав root. Інструкцію можна знайти [тут](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

## 2. Налаштування

Завантажте репозиторій GitHub та перейдіть всередину нього:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Потім створіть файл `.env` з `template.env`:


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

Після цього ви можете відкрити файл `.env` та відредагувати значення за замовчуванням, такі як:
- Версії пакетів
- шлях до репозиторію, де будуть збережені всі папки конфігурацій.
- часовий пояс у ["назві бази даних tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Запуск

Запустіть bash-сценарій та зачекайте, поки він встановить всі необхідні пакети:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Сценарій перевірить всі необхідні дії, які ви виконали на попередніх кроках, і видасть помилку, якщо щось пішло не так.

Під час процесу встановлення можуть виникнути такі ситуації:
- Якщо ви вирішите не використовувати координатор Zigbee, ви побачите рядок діалогу, що підтверджує, чи продовжувати встановлення:

{% codeHelper %}

```
цей скрипт створить всі необхідні репозиторії та запустить контейнери Docker
Не вдалося знайти місце розташування координатора Zigbee. Будь ласка, вставте його та запустіть скрипт знову. Каталог /dev/serial/by-id/ не існує
Бажаєте продовжити без координатора Zigbee? Контейнер Zigbee2MQTT не буде запущено.
Бажаєте продовжити? (так/ні)
```

{% endcodeHelper %}


- Якщо на вашому ПК є кілька пристроїв, які використовують послідовні порти, скрипт запитає, який пристрій використовувати:

{% codeHelper %}

```
цей скрипт створить всі необхідні репозиторії та запустить контейнери Docker
координатор Zigbee встановлено
У вас підключено більше 1 пристрою. Будь ласка, виберіть один
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

Це все. Продовжуйте до наступної статті.