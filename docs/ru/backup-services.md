---
title: Резервные службы

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**В этой статье вы узнаете, как создавать резервные копии конфигурации Home Assistant и восстанавливать ее при необходимости. Для создания резервных копий вызывается служба, которая генерирует защищенный архив с файлами конфигурации. Также служба добавляет конфигурацию Mosquitto brocker и Zigbee2MQTT в резервную копию, если они существуют. Затем эта служба добавляет архив в IPFS и сохраняет полученный CID в цифровом двойнике Robonomics.**
## Создание резервной копии конфигурации Home Assistant

Создание резервной копии позволяет легко восстановить конфигурацию Home Assistant в случае сбоя.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">

Для резервного копирования и восстановления конфигурации необходимо использовать **пользовательский IPFS-шлюз**, такой как Pinata. Без него ваша резервная копия будет храниться только на вашем локальном узле IPFS, что может помешать восстановлению конфигурации Home Assistant в случае сбоя локального узла.

</robo-wiki-note>

1. В веб-интерфейсе Home Assistant перейдите в `Developer Tools` -> `Services`. Найдите `Robonomics: Save Backup to Robonomics` и нажмите `CALL SERVICE`.

2. Дождитесь появления уведомления `Backup was updated in Robonomics` в разделе `Notification`.

<robo-wiki-note type="warning" title="WARNING">

Не пытайтесь создавать резервную копию или восстанавливать конфигурацию непосредственно после загрузки Home Assistant и интеграции Robonomics. Пожалуйста, **подождите примерно 5 минут**, чтобы завершить начальную настройку.

</robo-wiki-note>

Аргументы службы:
- **Полная резервная копия** (по умолчанию: False) - добавляет базу данных в резервную копию, чтобы сохранялась история состояний сущностей.
- **Путь к файлу паролей mosquitto** (по умолчанию: `/etc/mosquitto`) - Если вы использовали методы установки Ядро Home Assistant или Docker и у вас нет стандартного пути к Mosquitto brocker, вы должны изменить этот параметр. *Не требуется для Home Assistant OS или Superviser*.

## Восстановление конфигурации Home Assistant из резервной копии

Для восстановления конфигурации вам понадобится установленный Home Assistant и интеграция Robonomics. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="WARNING">

Чтобы успешно восстановить конфигурацию в Home Assistant Core и методах установки Docker, вам необходимо выполнить дополнительные настройки, описанные в конце страницы.

</robo-wiki-note>

1. Установите Home Assisntant с интеграцией Robonomics (если еще не установлено), следуя шагам из статьи для [желаемого метода установки](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Настройте интеграцию Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration), используя **те же сиды**, которые вы использовали в предыдущей конфигурации Robonomics. Если ваша подписка закончилась, [возобновите ее](https://wiki.robonomics.network/docs/sub-activate).

3. В веб-интерфейсе Home Assistant перейдите в `Develop2er To1ols` -> `Services`. Найдите `Robonomics: Restore from the Backup in Robonomics` и нажмите `CALL SERVICE`. Перейдите на страницу `Overview`, чтобы проверить состояние вашей резервной копии.

4. После восстановления Home Assistant автоматически перезагрузится. Если по какой-либо причине Home Assistant не перезагружается, вы можете проверить статус восстановления, отслеживая состояние сущности `robonomics.backup`. Если статус - `restored`, вам нужно будет вручную перезапустить Home Assistant, перейдя в `Settings` > `System` и нажав кнопку `RESTART`, расположенную в правом верхнем углу.

5. Если ваша резервная копия включает конфигурацию Zigbee2MQTT или Mosquitto, вам нужно перезапустить эти сервисы, чтобы включить новую конфигурацию. Вы можете сделать это вручную, перезапустив сервисы по отдельности, или просто перезапустив компьютер Home Assistant, чтобы убедиться, что все сервисы перезапущены.

Аргументы службы:
- **путь к файлу паролей mosquitto** (по умолчанию: `/etc/mosquitto`) - Если вы использовали методы установки Home Assistant Core или Docker и у вас нет пути по умолчанию к брокеру Mosquitto, вы должны изменить этот параметр. *Не требуется для Home Assistant OS или Superviser*.
- **Путь к конфигурации Zigbee2MQTT** (по умолчанию: `/opt/zigbee2mqtt`) - Если вы использовали методы установки Home Assistant Core или Docker и у вас нет пути по умолчанию к Zigbee2MQTT, вы должны изменить этот параметр. *Не требуется для Home Assistant OS или Superviser*.

## Восстановление конфигурации Mosquitto и Zigbee2MQTT для метода установки Home Assistant Core

Если резервная копия включает конфигурацию Mosquitto или Zigbee2MQTT, во время процесса восстановления они будут размещены в пути по умолчанию или в указанном в аргументах пути. Однако, если вы установили интеграцию Robonomics в существующий Home Assistant Core *(не из предустановленного образа Robonomics)*, пользователь `homeassistant` может не иметь доступа к этому пути.

Чтобы восстановить конфигурацию Mosquitto и Zigbee2MQTT, вам нужно предоставить пользователю `homeassistant` необходимые права на чтение:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Резервное копирование конфигурации Mosquitto и Zigbee2MQTT для метода установки Home Assistant Docker

Чтобы создать резервные копии конфигураций Mosquitto и Zigbee2MQTT из контейнера Docker, вам нужно создать тома для соответствующих конфигураций. Это можно сделать, запустив контейнер Home Assistant с дополнительными аргументами:

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

или внести изменения в ваш файл `compose.yaml`:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

Обратите внимание, что пути по умолчанию для конфигураций Mosquitto и Zigbee2MQTT - `/etc/mosquitto` и `/opt/zigbee2mqtt` соответственно. Однако эти пути могут отличаться в зависимости от вашей конкретной настройки.

</robo-wiki-note>

## Кнопки резервного копирования

Помимо использования сервисов для работы с резервными копиями, вы можете упростить процесс, используя кнопки `button.create_backup` и `button.restore_from_backup` из интеграции Robonomics. Эти кнопки вызывают соответствующие сервисы с параметрами по умолчанию (кнопка резервного копирования создает резервную копию без истории).

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

Чтобы добавить кнопки на вашу панель управления, выполните следующие действия:

1. Нажмите на три точки в правом верхнем углу панели управления.
2. Выберите `Edit Dashboard`.
3. Нажмите кнопку `Add Card` в правом нижнем углу.
4. Выберите карточку Entities`.
5. В поле Entities` найдите сущности button.create_backup и button.restore_from_backup.
6. Нажмите `Save`, чтобы добавить сущности на карточку.
7. Завершите редактирование, нажав кнопку `Done` в правом верхнем углу.