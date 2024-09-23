---
title: Обновление вашего Home Assistant Docker или Core для Unix-подобной ОС
contributors: [PaTara43]
tools:
  - Ubuntu Server 22.04 LTS
    https://ubuntu.com/download/raspberry-pi
  - Home Assistant 2024.4.4
    https://github.com/home-assistant/core
  - Docker
    https://www.docker.com/
  - Robonomics Home Assistant Integration 1.8.5-beta
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.2
    https://github.com/Multi-Agent-io/robonomics-interface/
  - HACS 1.34.0
    https://hacs.xyz/docs/setup/download



---

**Эта статья содержит инструкции по обновлению вашего существующего Home Assistant Docker или Core (на Unix-подобной ОС) с интеграцией Robonomics.**

{% roboWikiPicture {src:"docs/home-assistant/ha_docker.png", alt:"ha_docker"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"ОТКАЗ ОТ ОТВЕТСТВЕННОСТИ", type: "warning"}%}
  1. Предполагается, что Docker установлен правильно.
  2. Предполагается, что используются стандартные образы и контейнер Home Assistant или Home Assitant Core.
  3. IPFS и Libp2p-ws-proxy будут установлены как контейнеры Docker.
{% endroboWikiNote %}


## Установка

Скачайте установочный скрипт и запустите его в терминале:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
wget https://raw.githubusercontent.com/airalab/robonomics-hass-utils/main/raspberry_pi/install_integration_core.sh
bash install_integration_core.sh
```

{% endcodeHelper %}

Он проверит, что Docker установлен правильно. Затем он попытается найти IPFS и предложит проверить конфигурацию, если IPFS установлен. Если IPFS не найден, скрипт установит как IPFS, так и Libp2p-ws Proxy. Вы увидите следующий вывод:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
Docker установлен
$Пользователь принадлежит группе docker.
Проверка установки IPFS... Это может занять несколько минут. Пожалуйста, подождите
<...>
 ✔ Контейнер ipfs-daemon      запущен
 ✔ Контейнер lipb2p-ws-proxy  запущен
Все готово!
``` install_integration_core.sh
```

{% endcodeHelper %}

Если IPFS уже установлен, вы увидите следующий вывод:
```shell
Docker установлен
$Пользователь принадлежит группе docker.
Проверка установки IPFS... Это может занять несколько минут. Пожалуйста, подождите
IPFS найден. Убедитесь, что ваша конфигурация настроена правильно с следующими параметрами:
      - 'Шлюз': '/ip4/0.0.0.0/tcp/8080'
      - Порты 4001, 5001 и 8080 доступны.
      Также добавьте следующие узлы-загрузчики:
      1. '/dns4/1.pubsub.aira.life/tcp/443/wss/ipfs/QmdfQmbmXt6sqjZyowxPUsmvBsgSGQjm4VXrV7WGy62dv8'
      2. '/dns4/2.pubsub.aira.life/tcp/443/wss/ipfs/QmPTFt7GJ2MfDuVYwJJTULr6EnsQtGVp8ahYn9NSyoxmd9'
      3. '/dns4/3.pubsub.aira.life/tcp/443/wss/ipfs/QmWZSKTEQQ985mnNzMqhGCrwQ1aTA6sxVsorsycQz9cQrw'
      Ваша конфигурация настроена правильно? [да/Нет]:

```
В этом случае вам нужно настроить файл конфигурации IPFS и подтвердить его.

{% roboWikiNote {title:"Внимание!", type: "warning"}%} Правильная настройка IPFS важна; не пропускайте этот шаг!{% endroboWikiNote %}

## Загрузка интеграции Robonomics

Мы будем использовать [HACS](https://hacs.xyz/), чтобы установить интеграцию. Если HACS еще не установлен на вашем Home Assistant, вам нужно сначала [установить](https://hacs.xyz/docs/setup/download/) его.

Затем, в вашем Home Assistant, перейдите в HACS и найдите `Robonomics`:

{% roboWikiPicture {src:"docs/home-assistant/hacks-search.png", alt:"hacks-search"} %}{% endroboWikiPicture %}

Откройте его и нажмите `Скачать` в правом нижнем углу. Загрузка репозитория может занять некоторое время.

{% roboWikiPicture {src:"docs/home-assistant/hacs-download-integration.png", alt:"hacs-download-integration"} %}{% endroboWikiPicture %}

Это все. Продолжайте к следующей статье.