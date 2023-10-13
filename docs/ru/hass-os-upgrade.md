---
title: Обновите вашу Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 10.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.32.1
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**Эта статья содержит инструкции по обновлению вашей существующей Home Assistant OS с интеграцией Robonomics.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Установка IPFS Add-on


Интеграция Робономики хранит данные с помощью локального демона IPFS, поэтому его необходимо сначала установить.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. Для Home Assistant существует [дополнение IPFS](https://github.com/airalab/ipfs-addon). Чтобы установить его, перейдите в  `Settings` -> `Add-ons` и нажмите кнопку `ADD-ON STORE` в правом нижнем углу.

2. Нажмите на три точки в правом верхнем углу и выберите `Repositories`. Добавьте туда следующую ссылку:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Нажмите кнопку `ADD`.

4. Закройте менеджер репозиториев и обновите страницу. Теперь в конце страницы вы увидите дополнение IPFS Daemon.

5. Откройте дополнение и нажмите `INSTALL`. После установки нажмите `START`.

## Установите HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) позволяет устанавливать пользовательские интеграции.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Прежде чем начать, вам нужно установить дополнение для подключения к устройству Home Assistant с помощью SSH. В магазине дополнений найдите `ssh`. Мы рекомендуем установить дополнение `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  Если дополнение SSH не найдено, попробуйте включить режим расширенного режима в настройках вашего профиля пользователя. Для этого нажмите на значок профиля в левом нижнем углу и найдите опцию Расширенный режим.

</robo-wiki-note>

2. Выберите дополнение и нажмите `INSTALL`. После завершения установки перейдите на вкладку `Configuration` и добавьте `password` или `authorized_keys`. Не забудьте сохранить эту часть конфигурации.

3. На вкладке `Info` нажмите `START`. Если вы хотите видеть дополнение в боковой панели, не забудьте включить `Показывать в боковой панели`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Откройте SSH Add-on и выполните следующую команду:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Перезагрузите Home Assistant (вы можете сделать это в `Settings`->`System`). 

6. Теперь интеграция HACS будет доступна для добавления в меню `Integrations`. Перейдите в `Settings`->`Devices & Services`, нажмите `Add Integration` и найдите HACS.

<robo-wiki-note type="warning" title="Warning">

  Для использования HACS вам понадобится учетная запись Github.

</robo-wiki-note>

7. Нажмите на нее и следуйте инструкциям по установке. 

## Установите интеграцию Robonomics

Теперь вы можете установить интеграцию Robonomics с помощью HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Откройте HACS в меню боковой панели и перейдите к  `Integrations`. Нажмите `Explore & Download Repositories`, затем найдите `Robonomics` и нажмите кнопку `Download`, расположенную в правом нижнем углу. После завершения загрузки перезапустите Home Assistant.