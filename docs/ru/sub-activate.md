---
title: Активировать подписку
contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

В этой статье вы создадите учетные записи Robonomics parachain и купите подписку на IoT. 

<robo-wiki-picture src="home-assistant/sub_activate.png" />


Для управления Home Assistant с помощью Robonomics вам понадобятся 2 учетные записи на Robonomics parachain. Для одной из учетных записей (`sub_owner`) вы купите подписку Robonomics. Вторая учетная запись (`sub_controller`) будет контролировать все процессы Home Assistant (например, телеметрию) и предоставлять доступ другим пользователям. Эти учетные записи обеспечат безопасность вашего Home Assistant. 

<robo-wiki-note type="warning" title="WARNING">

Обе учетные записи должны быть созданы с использованием шифрования **ed25519**. По этой причине вам необходимо создать учетную запись с помощью пользовательского интерфейса Polkadot-JS и выбрать необходимое шифрование.

Эта функция отключена по умолчанию в пользовательском интерфейсе Polkadot-JS. Чтобы включить ее, перейдите в `Settings` -> `General` -> `account options` и выберите `Allow local in-browser account storage` в раскрывающемся меню `in-browser account creation`.

</robo-wiki-note>

## Создание учетных записей владельцев и контролеров

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQiJYPYajUJXENX2PzSJMSKGSshyWyPNqugSYxP5eCNvm', type:'mp4'}]" />

1. Перейдите на [Robonomics Parachain app](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/) на портале Polkadot / Substrate. **Проверьте верхний левый угол, чтобы убедиться, что вы подключены к Robonomics Parachain.**

2. Перейдите в `Accounts` -> `Accounts` и нажмите кнопку `Add account`. Вы увидите всплывающее меню с семенем учетной записи. Оно имеет две формы: *Мнемоника* (читаемая человеком) и *Сырой* (последовательность цифр и букв). 

3. Откройте `Advanced creation options`, измените тип криптографии создаваемой учетной записи на `Edwards - ed25519` и нажмите `Next`.


4. Безопасно сохраните мнемоническую фразу-семя и нажмите `Next`.

5. В следующем меню вам нужно задать имя учетной записи и пароль. Дайте ей имя `sub_owner` для удобства. Нажмите `Next`.

6. В последнем окне нажмите `Save`, чтобы завершить создание учетной записи. Он также сгенерирует резервные файлы JSON, которые вы должны сохранить в надежном месте. Вы можете позже использовать этот файл для восстановления вашей учетной записи, если вы помните пароль.

7. Повторите эти шаги для учетной записи с именем `sub_controller`.


## Добавление учетных записей в Polkadot.js

Для удобства вы должны использовать [расширение Polkadot.js](https://polkadot.js.org/extension/) и добавить в него эти новые созданные учетные записи. Для учетной записи ed25519 вы можете сделать это только с помощью резервного файла JSON. Вы можете использовать файлы, сохраненные при создании учетных записей.

Вы можете получить эти файлы снова, создав резервную копию учетной записи. Нажмите на три точки рядом с вашей учетной записью, выберите `Create a backup file for this account` и введите пароль.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmRd7gztUjWkLF4W2XuJwy5aXBwzNV2aPCU6CQQLvUpSNj', type:'mp4'}]" />

1. Откройте расширение и нажмите кнопку `+` в правом верхнем углу, затем выберите `Restore account from backup JSON file`.

2. В открывшемся окне загрузите JSON-файл, введите пароль и нажмите `Restore`.

3. Убедитесь, что для учетных записей в расширении Polkadot.js выбрана сеть Robonomics. На портале Polkadot / Substrate перейдите в `Setting` -> `Metadata` и нажмите кнопку `Update metadata`.

4. Подтвердите обновление метаданных во всплывающем окне. Теперь расширение будет показывать метку сети, для которой используется адрес.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmT5sTNP9t8gpbD4RJJw6ETwG4wiziiChAh2uHHBk9Zsyd', type:'mp4'}]" />

## Активация подписки Robonomics 

<robo-wiki-note type="okay">

Для этого шага вам должно быть достаточно токенов XRT (минимум 2-3 XRT) на вашей учетной записи `sub_owner`.

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmXrFCajmJgkRDSbshGD3QehjnoyS6jafEPSjHdYkoBHum', type:'mp4'}]" />

1. Перейдите на страницу подписки Robonomics в [dapp.robonomics.network/#/subscription](https://dapp.robonomics.network/#/subscription) и нажмите кнопку `Подключить учетную запись` в правой боковой панели.

2. Во всплывающем меню подключите расширение Polkadot.js. Вы увидите адрес вашей учетной записи с балансом.

3. Перед покупкой проверьте, что вы выбрали учетную запись `sub_owner`. Нажмите на иконку профиля адреса, вы должны увидеть учетную запись `sub_owner` в поле `Check owner account`.

4. Наконец, нажмите кнопку `SUBMIT` и введите пароль для вашей учетной записи. После этого дождитесь завершения процесса активации. Через некоторое время вы увидите состояние вашей подписки.


## Добавление учетных записей в подписку

Теперь вам нужно добавить учетную запись `sub_controller` в **список доступа**.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmV1gkwtcXsWv54ov9tuXfcHg7nqs1foM8cRwts4sqnqtX', type:'mp4'}]" />

1. Откройте расширение и нажмите на значок рядом с именем учетной записи. Он скопирует адрес учетной записи.


2. Вставьте этот адрес в поле `Robonomics parachain address` в разделе **Управление доступом**. Дайте ему имя и нажмите кнопку `+`. 

3. Повторите шаги 1 и 2 для учетной записи `sub_owner`.

4. Нажмите `Save`. Введите пароль вашей учетной записи `sub_owner` во всплывающем окне и дождитесь завершения процесса активации.
