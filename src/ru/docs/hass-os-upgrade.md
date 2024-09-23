---

title: Обновление вашей операционной системы Home Assistant
contributors: [LoSk-p]
tools:
  - Home Assistant OS 12.1 для RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy Add-on 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**Эта статья содержит инструкции по обновлению вашей текущей операционной системы Home Assistant с интеграцией Robonomics.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## Установка HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) позволяет устанавливать пользовательские интеграции.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Прежде чем начать, вам нужно установить дополнение для подключения к устройству Home Assistant через SSH. В магазине дополнений найдите `ssh`. Мы рекомендуем установить дополнение `SSH & Web Terminal`.

{% roboWikiNote {title:"Предупреждение", type: "warning"}%} Если дополнение SSH не найдено, попробуйте включить Расширенный режим в настройках вашего профиля пользователя. Для этого нажмите на иконку профиля в левом нижнем углу и найдите опцию Расширенный режим.{% endroboWikiNote %}

2. Выберите дополнение и нажмите `УСТАНОВИТЬ`. После завершения установки перейдите на вкладку `Конфигурация` и добавьте `пароль` или `authorized_keys`. Не забудьте сохранить эту часть конфигурации.

3. На вкладке `Информация` нажмите `СТАРТ`. Если вы хотите видеть дополнение в боковой панели, не забудьте включить `Показывать в боковой панели`.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. Откройте дополнение SSH и выполните следующую команду:

{% codeHelper { additionalLine: "Командная строка Home Assistant", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Перезапустите Home Assistant (вы можете сделать это в `Настройки`->`Система`).

6. Теперь интеграция HACS будет доступна для добавления в меню `Интеграции`. Перейдите в `Настройки`->`Устройства и Сервисы`, нажмите `Добавить Интеграцию` и найдите HACS.

{% roboWikiNote {title:"Предупреждение", type: "warning"}%} Для использования HACS вам понадобится учетная запись Github.{% endroboWikiNote %}

7. Нажмите на нее и следуйте инструкциям по установке.

## Установка демона IPFS и дополнения Libp2p - WS Proxy

Интеграция Robonomics хранит данные с использованием локального демона IPFS и также использует Libp2p для удаленного управления, поэтому вам сначала нужно установить их. Вы можете добавить репозиторий дополнений Robonomics, используя эту кнопку

[![Откройте ваш экземпляр Home Assistant и покажите диалог добавления дополнительного репозитория с предварительно заполненным URL-адресом конкретного репозитория.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

Или вручную, используя следующие шаги:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Есть [Репозиторий дополнений Robonomics](https://github.com/PinoutLTD/robonomics-addons). Чтобы установить его, перейдите в `Настройки` -> `Дополнения` и нажмите кнопку `ДОБАВИТЬ ДОПОЛНЕНИЕ` в правом нижнем углу.

2. Нажмите на три точки в правом верхнем углу и выберите `Репозитории`. Добавьте туда следующую ссылку:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. Нажмите кнопку `ДОБАВИТЬ`.

4. Закройте менеджер репозиториев и обновите страницу. Теперь в конце страницы вы увидите дополнения Robonomics.

Теперь вы можете установить оба дополнения. Откройте их и нажмите `УСТАНОВИТЬ`. После установки нажмите `СТАРТ`.

## Установка интеграции Robonomics

Теперь вы можете установить интеграцию Robonomics с помощью HACS.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Откройте HACS из бокового меню и найдите `Robonomics`. Затем нажмите на кнопку `Скачать`, расположенную в правом нижнем углу. После завершения загрузки перезапустите Home Assistant.