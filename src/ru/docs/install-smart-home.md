---
title: Установка умного дома
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

**Добро пожаловать в руководство по установке Home Assistant с интеграцией Robonomics. Home Assistant - это система умного дома с открытым исходным кодом, которая предоставляет централизованный хаб для управления умными устройствами в домашней сети. Интегрируясь с Robonomics, децентрализованным облачным сервисом, вы можете улучшить функциональность и безопасность вашего умного дома. В этой статье мы предоставим пошаговые инструкции о том, как установить Home Assistant с Robonomics, давая вам возможность автоматизировать и контролировать различные аспекты вашего дома с помощью безопасного и децентрализованного решения. Давайте начнем!**

## Демонстрация

Вот пример установки полного умного дома с интеграцией Robonomics. Имейте в виду, что время, необходимое для установки, может варьироваться в зависимости от интернет-соединения.

{% roboWikiVideo {videos:[{src: 'QmULXX4rjkuHuCF42c3V37MxEk6HpnFpJF4bZSQPR2c3Xo', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Аппаратное обеспечение, необходимое для установки

Если вы еще не интегрировали Home Assistant в свою систему умного дома, важно знать оборудование, которое вам понадобится для создания полной системы умного дома с нуля. Команда Robonomics рекомендует использовать Raspberry Pi 4 в качестве сервера умного дома. **Но также можно настроить все на своем ПК.**


{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (как минимум 2 ГБ ОЗУ)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-карта 16 Гб</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Адаптер Zigbee (по желанию) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Умные устройства Zigbee (по желанию) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>ПК для настройки</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

## 1. Установка предварительных требований

Docker Robonomics содержит:
- Home Assistant
- IPFS
- MQTT брокер и интеграцию
- Zigbee2MQTT
- прокси libp2p
- Интеграцию Robonomics

В этой статье будет показан процесс установки на системе Ubuntu. Сначала вам нужно установить следующие пакеты:


{% codeHelper {copy: true}%}

```
sudo apt-get install wget unzip git
```

{% endcodeHelper %}

Затем вам нужно установить Docker на ПК. Инструкцию по установке можно найти на [официальном сайте](https://docs.docker.com/engine/install/).

<robo-wiki-note type="warning" title="Важная информация">

  Добавьте своего пользователя в группу docker, чтобы запускать контейнеры Docker без прав root. Инструкцию можно найти [здесь](https://docs.docker.com/engine/install/linux-postinstall/).

</robo-wiki-note>

## 2. Настройка

Скачайте репозиторий GitHub и перейдите внутрь него:


{% codeHelper {copy: true}%}

```
git clone https://github.com/airalab/home-assistant-web3-build.git
cd home-assistant-web3-build/
```

{% endcodeHelper %}

Затем создайте файл `.env` из `template.env`:


{% codeHelper {copy: true}%}

```
mv template.env .env
```

{% endcodeHelper %}

После этого вы можете открыть файл `.env` и отредактировать значения по умолчанию, такие как:
- Версии пакетов
- путь к репозиторию, где будут храниться все папки конфигураций.
- часовой пояс в ["имя базы данных tz"](https://en.wikipedia.org/wiki/List_of_tz_database_time_zones).

## 3. Запуск

Запустите bash-скрипт и дождитесь установки всех необходимых пакетов:

{% codeHelper {copy: true}%}

```
bash setup.sh
```

{% endcodeHelper %}

Скрипт проверит все необходимые действия, которые вы выполнили на предыдущих этапах, и выдаст ошибку, если что-то не так.

Во время установки могут возникнуть следующие ситуации:
- Если вы решите не использовать координатор Zigbee, вы увидите строку диалога, подтверждающую, хотите ли продолжить установку:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
Cannot find zigbee coordinator location. Please insert it and run script again. The directory /dev/serial/by-id/ does not exist
Do you want to continue without zigbee coordinator? It will not start Zigbee2MQTT container.
Do you want to proceed? (y/n)
```

{% endcodeHelper %}


- Если на вашем ПК есть несколько устройств, использующих последовательные порты, скрипт спросит, какое устройство использовать:

{% codeHelper %}

```
this script will create all necessary repositories and start docker containers
the zigbee coordinator is installed
You have more that 1 connected devices. Please choose one
1) /dev/serial/by-id/usb-ITEAD_SONOFF_Zigbee_3.0_USB_Dongle_Plus_V2_20240123142833-if00
2) /dev/serial/by-id/usb-Silicon_Labs_Sonoff_Zigbee_3.0_USB_Dongle_Plus_0001-if00-port0
#?
```

{% endcodeHelper %}

Это все. Продолжайте к следующей статье.