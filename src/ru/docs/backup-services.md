---
title: Сервисы резервного копирования

contributors: [tubleronchik, LoSk-p]
tools:
  - Интеграция Robonomics Home Assistant 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**В этой статье вы узнаете, как создавать резервные копии конфигурации вашего Home Assistant и восстанавливать ее при необходимости. Для создания резервных копий вызывается служба, которая генерирует защищенный архив с файлами конфигурации. Также служба добавляет конфигурацию Mosquitto brocker и Zigbee2MQTT в резервную копию, если они существуют. Затем эта служба добавляет архив в IPFS и сохраняет полученный CID в цифровом двойнике Robonomics.**
## Создание резервной копии конфигурации Home Assistant

Создание резервной копии позволяет легко восстановить конфигурацию Home Assistant в случае сбоя.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "ПРЕДУПРЕЖДЕНИЕ"}%}Для создания резервной копии и восстановления конфигурации необходимо использовать **пользовательский шлюз IPFS**, такой как Pinata. Без этого ваша резервная копия будет храниться исключительно на вашем локальном узле IPFS, что может помешать восстановлению конфигурации Home Assistant в случае сбоя локального узла.
{% endroboWikiNote %}

1. В веб-интерфейсе Home Assistant перейдите в `Инструменты разработчика` -> `Службы`. Найдите `Robonomics: Сохранить резервную копию в Robonomics` и нажмите `ВЫЗВАТЬ СЛУЖБУ`.

2. Дождитесь появления уведомления `Резервная копия обновлена в Robonomics` в разделе `Уведомления`.


{% roboWikiNote {type: "warning", title: "ПРЕДУПРЕЖДЕНИЕ"}%} Не пытайтесь создать резервную копию или восстановить конфигурацию сразу после загрузки Home Assistant и интеграции Robonomics. Пожалуйста, **подождите примерно 5 минут**, чтобы завершилась начальная настройка. {% endroboWikiNote %}

Аргументы службы:
- **Полная резервная копия** (по умолчанию: False) - добавляет базу данных в резервную копию, так что история состояний сущностей также будет сохранена.
- **Путь к файлу пароля mosquitto** (по умолчанию: `/etc/mosquitto`) - Если вы использовали методы установки Home Assistant Core или Docker и не имеете стандартного пути к брокеру Mosquitto, вам следует изменить этот параметр. *Не требуется для Home Assistant OS или Superviser*.

## Восстановление конфигурации Home Assistant из резервной копии

Для восстановления вашей конфигурации вам понадобится установленный Home Assistant и интеграция Robonomics.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Для успешного восстановления конфигурации в методах установки Home Assistant Core и Docker вам необходимо выполнить дополнительные шаги настройки, описанные в конце страницы.
{% endroboWikiNote %}

1. Установите Home Assistant с интеграцией Robonomics (если еще не установлен), следуя шагам из статьи для [желаемого метода установки](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Настройте интеграцию Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration), используя **те же сиды**, которые вы использовали в предыдущей конфигурации Robonomics. Если ваша подписка истекла, [переактивируйте ее](https://wiki.robonomics.network/docs/sub-activate).

3. В веб-интерфейсе Home Assistant перейдите в `Developer Tools` -> `Services`. Найдите `Robonomics: Restore from the Backup in Robonomics` и нажмите `CALL SERVICE`. Перейдите на страницу `Overview`, чтобы проверить статус вашей резервной копии.

4. После восстановления Home Assistant автоматически перезапустится. Если по какой-то причине Home Assistant не перезапускается, вы можете проверить статус восстановления, отслеживая состояние сущности `robonomics.backup`. Если статус `restored`, вам нужно вручную перезапустить Home Assistant, перейдя в `Settings` > `System` и нажав кнопку `RESTART`, расположенную в правом верхнем углу.

5. Если ваша резервная копия включает конфигурацию Zigbee2MQTT или Mosquitto, вам нужно перезапустить эти службы, чтобы включить новую конфигурацию. Вы можете это сделатьВручную, перезапустив службы по отдельности, или просто перезапустите компьютер Home Assistant, чтобы убедиться, что все службы перезапущены.

Аргументы службы:
- **Путь к файлу пароля mosquitto** (по умолчанию: `/etc/mosquitto`) - Если вы использовали методы установки Home Assistant Core или Docker и у вас нет стандартного пути к брокеру Mosquitto, вам следует изменить этот параметр. *Не требуется для Home Assistant OS или Superviser*.
- **Путь к конфигурации Zigbee2MQTT** (по умолчанию: `/opt/zigbee2mqtt`) - Если вы использовали методы установки Home Assistant Core или Docker и у вас нет стандартного пути к Zigbee2MQTT, вам следует изменить этот параметр. *Не требуется для Home Assistant OS или Superviser*.

## Восстановление конфигурации Mosquitto и Zigbee2MQTT для метода установки Home Assistant Core

Если резервная копия включает конфигурацию для Mosquitto или Zigbee2MQTT, во время процесса восстановления они будут размещены в стандартном пути или в пути, указанном в аргументах. Однако, если вы установили интеграцию Robonomics в существующий Home Assistant Core *(не из предустановленного образа Robonomics)*, пользователь `homeassistant` может не иметь доступа к этому пути.

Чтобы восстановить конфигурацию Mosquitto и Zigbee2MQTT, вам нужно предоставить необходимые права на чтение пользователю `homeassistant`:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Резервное копирование конфигурации Mosquitto и Zigbee2MQTT для метода установки Home Assistant Docker

Чтобы создать резервную копию конфигураций Mosquitto и Zigbee2MQTT из контейнера Docker, вам нужно создать тома для их соответствующих конфигураций. Это можно сделать, запустив контейнер Home Assistant с дополнительными аргументами:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

или внесите изменения в ваш файл `compose.yaml`:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /ПУТЬ_К_ВАШЕМУ_КОНФИГУРАЦИИ:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```

{% roboWikiNote {type: "note", title:"Примечание"}%}Обратите внимание, что стандартные пути для конфигураций Mosquitto и Zigbee2MQTT - `/etc/mosquitto` и `/opt/zigbee2mqtt` соответственно. Однако эти пути могут варьироваться в зависимости от вашей конкретной настройки.
{% endroboWikiNote %}

## Кнопки Резервного Копирования

Помимо использования служб для работы с резервными копиями, вы можете упростить процесс, используя кнопки `button.create_backup` и `button.restore_from_backup` из интеграции Robonomics. Эти кнопки вызывают соответствующие службы с параметрами по умолчанию (кнопка резервного копирования создает резервную копию без истории).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Чтобы добавить кнопки на вашу панель управления, выполните следующие шаги:

1. Нажмите на три точки в правом верхнем углу панели управления.
2. Выберите `Редактировать панель управления`.
3. Нажмите на кнопку `Добавить карточку` в правом нижнем углу.
4. Выберите карточку `Сущности`.
5. В поле `Сущности` найдите сущности button.create_backup и button.restore_from_backup.
6. Нажмите `Сохранить`, чтобы добавить сущности на карточку.
7. Завершите редактирование, нажав кнопку `Готово` в правом верхнем углу.