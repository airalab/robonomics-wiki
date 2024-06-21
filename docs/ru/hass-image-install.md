---
title: Предустановленный образ для Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.1
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.2
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Добро пожаловать в руководство по установке Home Assistant с интеграцией Robonomics на Raspberry Pi. Home Assistant - это система умного дома с открытым исходным кодом, которая предоставляет централизованную платформу для управления умными устройствами в вашей домашней сети. Интегрируясь с Robonomics, децентрализованной облачной службой, вы можете улучшить функциональность и безопасность вашего умного дома. В этой статье мы предоставим пошаговые инструкции по установке Home Assistant с Robonomics на Raspberry Pi, что позволит вам автоматизировать и контролировать различные аспекты вашего дома с использованием безопасного и децентрализованного решения. Давайте начнем!**

## Оборудование, необходимое для установки

Если вы еще не включили Home Assistant в свою систему умного дома, важно знать, какое оборудование вам понадобится для создания полной системы умного дома с нуля.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Скачайте предустановленный образ Robonomics

Предустановленный образ Robonomics содержит:
- Ядро Home Assistant
- IPFS
- MQTT-брокер и интеграцию
- Zigbee2MQTT
- Интеграцию Robonomics

<robo-wiki-button label="Download image (~528 Mb)" link="QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

Вы можете проверить исходный код и скачать последнюю версию образа на [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases)

</robo-wiki-note>


## 2. Настройте образ

Установка [Raspberry Pi Imager](https://www.raspberrypi.com/software/) на твоем компьютере. Затем вставьте SD-карту.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Запустите программу Raspberry Pi Imager. Выберите требуемый образ в качестве операционной системы и убедитесь, что выбрана ваша SD-карта из выпадающего меню хранения. 
В настройках:
- Установите имя пользователя и пароль (сохраните имя пользователя по умолчанию "pi", чтобы было легко запомнить),  
- укажите имя и пароль Wi-Fi, 
- выберите свою страну из выпадающего списка
а затем нажмите `Write` для записи образа. 
                   
<robo-wiki-note type="note">Внимательно сохраните имя пользователя и пароль, поскольку эти учетные данные потребуются в случае устранения неполадок.</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

Коды стран можно найти [здесь](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes).

## 3. Первая загрузка

**Безопасно извлеките SD-карту**, вставьте ее в Raspberry Pi. Затем **вставьте адаптер Zigbee** в Raspberry Pi.

<robo-wiki-note type="warning">Важно вставить адаптер Zigbee перед первым запуском Raspberry Pi! 
Это необходимо для автоматической настройки сети Zigbee.</robo-wiki-note>

**Если у вас есть [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (который имеет все необходимое программное обеспечение), вы можете просто продолжить выполнение этих инструкций. Однако, если у вас есть другой адаптер, первое, что ва нужно сделать, это прошить его программным обеспечением Zigbee2MQTT. Инструкции для вашего устройства можно найти [здесь](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

Затем подключите кабель питания к вашему устройству. Оно должно подключиться к вашей сети Wi-Fi. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Когда ваш Raspberry Pi подключен, красный светодиод загорится, а зеленый светодиод будет мигать некоторое время. Подождите до 5 минут, чтобы Raspberry Pi загрузился и зарегистрировался в сети. 

Теперь найдите IP-адрес Raspberry Pi. Чтобы найти его, вы можете использовать [мобильное приложение Fing](https://www.fing.com/products) или 
[инструмент командной строки nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Найдите `robots-home` (необязательное имя может быть `Home(homeassistant)`) 
имя хост-машины в списке IP. 

В этом примере адрес - `192.168.43.56`. 

Чтобы проверить, что все работает, откройте веб-браузер и перейдите на веб-страницу `http://%RASPBERRY_IP_ADDRESS%:8123`. В этом примере это будет `192.168.43.56:8123`.
Если все в порядке, вы увидите веб-интерфейс Home Assistant. Если веб-страница не открывается, подождите до 5 минут, чтобы Raspberry Pi загрузился и попробуйте снова. 

<robo-wiki-video loop controls :videos="[{src: 'QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Устранение неполадок

1. Чтобы позже изменить настройки Wi-Fi, вы должны войти в Raspberry Pi через команду `ssh`. Для этого откройте терминал на вашем компьютере
и введите команду ssh с вашим именем пользователя, которое вы создали на шаге "Настройка образа" (по умолчанию - "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

а затем используйте команду `sudo raspi-config`. Найдие больше информации об этой команде на [официальном сайте.](https://www.raspberrypi.com/documentation/computers/configuration.html)
