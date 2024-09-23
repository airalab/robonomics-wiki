---
title: Встановлення розумного будинку
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.6.2
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.8.6
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS 0.29.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.38.0
    https://github.com/Koenkk/zigbee2mqtt
---

**Ласкаво просимо до посібника з встановлення Home Assistant з інтеграцією Robonomics. Home Assistant - це система автоматизації вдома з відкритим кодом, яка надає
централізовану платформу для керування розумними пристроями у вашій домашній мережі. Інтегруючись з Robonomics, децентралізованою хмарну службою, ви можете покращити функціональність та
безпеку вашого розумного будинку. У цій статті ми надамо пошагові інструкції щодо встановлення Home Assistant з Robonomics, що дозволить вам
автоматизувати та керувати різними аспектами вашого будинку за допомогою безпечного та децентралізованого рішення. Почнемо!**

{% roboWikiPicture {src:"docs/home-assistant/INSTALLATION.png", alt:"installation"} %}{% endroboWikiPicture %}

## Демонстрація

Ось приклад повного встановлення інтеграції розумного будинку та Robonomics. Майте на увазі, що час, необхідний для цього, може варіюватися в залежності відПідключення до Інтернету.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Апаратне забезпечення, яке вам знадобиться для встановлення

Якщо ви ще не включили Home Assistant до своєї системи розумного будинку, важливо знати про обладнання, яке вам знадобиться для створення повноцінної системи розумного будинку з нуля. Команда Robonomics рекомендує використовувати Raspberry Pi 4 як сервер для розумного будинку. **Але можна налаштувати все на вашому ПК.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (принаймні 2 ГБ оперативної пам'яті)</b>
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
	<b>Робочий стіл для налаштування</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


## 1. Встановлення попередніх вимог

Robonomics Docker містить:
- Домашній асистент
- IPFS
- Брокер MQTT та його інтеграцію
- Zigbee2MQTT
- проксі libp2p
- Інтеграція Robonomics

У цій статті буде показаний процес встановлення на системі Ubuntu. Спочатку вам потрібно встановити наступні пакети:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git jq
```

{% endcodeHelper %}

Потім вам потрібно встановити Docker на ПК. Інструкцію щодо встановлення можна знайти на [офіційному веб-сайті](https://docs.docker.com/engine/install/).

{% roboWikiNote {type: "warning", title: "Важлива інформація" }%} Додайте свого користувача до групи docker, щоб запускати контейнери Docker без прав root. Інструкцію можна знайти [тут](https://docs.docker.com/engine/install/linux-postinstall/). {% endroboWikiNote %}

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
- шлях до репозиторію, де будуть збережені всі папки конфігурацій.
- часовий пояс у ["назві бази даних tz"](https://en.wikipedia.org/wiki/Список_часових_поясів_бази_даних_tz).

## 3. Початок

Запустіть сценарій bash та зачекайте, доки він встановить всі необхідні пакети:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Сценарій перевірить всі необхідні дії, які ви виконали на попередніх етапах, і видасть помилку, якщо щось пішло не так.

Під час процесу встановлення можуть виникнути такі ситуації:
- Якщо ви вирішили не використовувати координатор Zigbee, ви побачите рядок діалогу, що підтверджує, чи продовжувати встановлення:

{% codeHelper %}

```
цей сценарій створить всі необхідні репозиторії та запустить контейнери Docker
Не вдалося знайти місце розташування координатора Zigbee. Будь ласка, вставте його та запустіть сценарій знову. Каталог /dev/serial/by-id/ не існує
Ви хочете продовжити без координатора Zigbee? Контейнер Zigbee2MQTT не буде запущено.
Ви хочете продовжити? (Y/n)
```

{% endcodeHelper %}


- Якщо на вашому ПК є кілька пристроїв, які використовують послідовні порти, сценарій запитає, який пристрій використовувати:

{% codeHelper %}

```
цей сценарій створить всі необхідні репозиторії та запустить контейнери Docker
координатор Zigbee встановлено
У вас підключено більше 1 пристрою. Будь ласка, виберіть один
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

## Після встановлення

Після запуску всього ви можете використовувати скрипт `update.sh` для оновлення версії пакетів Docker. Цей скрипт завантажить нові версії, 
видалить старі версії пакетів та автоматично перезапустить все, зберігаючи всі ваші конфігурації.

Щоб зупинити все, використовуйте скрипт `stop.sh`.


Це все. Продовжуйте до наступної статті.