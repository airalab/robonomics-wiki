---
title: Встановлення розумного будинку
contributors: [nakata5321, PaTara43]
tools:
  - Home-assistant-web3-build 0.0.5
    https://github.com/airalab/home-assistant-web3-build
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.40.1
    https://github.com/Koenkk/zigbee2mqtt
---

**Ласкаво просимо до посібника з встановлення Home Assistant з інтеграцією Robonomics. Home Assistant - це система автоматизації вдома з відкритим кодом, яка надає централізовану платформу для керування розумними пристроями в домашній мережі. Інтегруючись з Robonomics, децентралізованою хмарну службою, ви можете покращити функціональність та безпеку вашого розумного будинку. У цій статті ми надамо поетапні інструкції щодо встановлення Home Assistant з Robonomics, що дозволить вам автоматизувати та керувати різними аспектами вашого будинку за допомогою безпечного та децентралізованого рішення. Почнемо!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## Демонстрація

ТутЦе приклад повного встановлення інтеграції Smart Home та Robonomics. Пам'ятайте, що час, необхідний для цього, може варіюватися в залежності від Інтернет-з'єднання.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Апаратне забезпечення, яке вам знадобиться для встановлення

Якщо ви ще не включили Home Assistant до своєї системи розумного будинку, важливо знати, яке обладнання вам знадобиться для створення повної системи розумного будинку з нуля. Команда Robonomics рекомендує використовувати Raspberry Pi 4 як сервер для розумного будинку.


{% roboWikiGridWrapper {columns: '2', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (принаймні 2 ГБ оперативної пам'яті)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-карта16 Гб</b> {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {стовпці: '2', вирівнюванняТексту: 'центр'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee розумні пристрої (за бажанням) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee адаптер (за бажанням) </b> </a>  {% endroboWikiGrid %}
	
{% endroboWikiGridWrapper %}


## 1. Встановлення попередніх вимог


{% roboWikiNote {тип: "попередження", заголовок: "Важлива інформація" }%} Усі ці кроки повинні бути виконані на Raspberry Pi 4 з операційною системою Ubuntu. {% endroboWikiNote %}

Robonomics Docker містить:
- Домашній асистент
- IPFS
- MQTT брокер та інтеграцію- Zigbee2MQTT
- проксі libp2p
- Інтеграція Robonomics

Спочатку потрібно встановити наступні пакети:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Потім вам потрібно встановити Docker на вашому Raspberry Pi 4. Інструкцію щодо встановлення можна знайти на [офіційному веб-сайті](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Важлива інформація"}%} Додайте свого користувача до групи docker, щоб запускати контейнери Docker без прав root. Інструкцію можна знайти [тут](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

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
cp template.env .env
```

{% endcodeHelper %}

Після цього ви можете відкрити файл `.env` та відредагувати значення за замовчуванням, такі як:
- шлях до репозиторію, де будуть зберігатися всі папки конфігурацій.
- часовий пояс у ["назві бази даних tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Початок

Запустіть сценарій bash та зачекайте, доки він встановить всі необхідні пакети:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Сценарій перевірить, чи всі необхідні дії завершені на попередніх етапах, і виведе помилку, якщо щось неправильно.

Під час процесу встановлення можуть виникнути такі ситуації:
- Якщо ви вирішите не використовувати координатор Zigbee, ви побачите рядок діалогу, який підтверджує, чи продовжувати встановлення:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (Y/n)
```

{% endcodeHelper %}


- Якщо на вашому Raspberry Pi 4 є кілька пристроїв, які використовують послідовні порти, сценарій запитає, який пристрій використовувати:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/серійний/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Після встановлення

Після запуску всього ви можете використовувати скрипт `update.sh` для оновлення версії пакетів Docker:
{% codeHelper {copy: true}%}

```
bash update.sh
```

{% endcodeHelper %} 
Цей скрипт завантажить нові версії, видалить старі версії пакетів та автоматично перезапустить все, зберігаючи всі ваші конфігурації.

Щоб зупинити все, скористайтеся скриптом `stop.sh`:
{% codeHelper {copy: true}%}

```
bash stop.sh
```

{% endcodeHelper %}

Це все. Продовжуйте до наступної статті.