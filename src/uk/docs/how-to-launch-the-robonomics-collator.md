---
title: Як запустити колатор Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---


{% roboWikiNote {title:"Примітка", type: "note"}%} У відео та знімках екрану цієї статті ми використовували версію 1.4.0 Robonomics. Вам потрібно використовувати ті ж команди, але замінити версію Robonomics на поточну.{% endroboWikiNote %}

https://youtu.be/wUTDDLDbzTg

Наразі мережу Robonomics в основному підтримують початкові розробники, але будь-хто може підтримати проект. Кожен додатковий повний вузол блокчейну допомагає йому стати більш стійким та відмовостійким. Бінарні файли вузлів Robonomics доступні в [релізах](https://github.com/airalab/robonomics/releases) або їх можна [зібрати з вихідних кодів](/docs/how-to-build-collator-node/).

## Що таке колатор

Колатор є частиною парачейну Robonomics. Цей тип вузла створює нові блоки для ланцюжка Robonomics.

>Колатори підтримують парачейни, збираючи транзакції парачейну від користувачів та створюючи докази переходу стану для валідаторів Ланцюжка Реле. Іншими словами, колатори підтримують парачейни, агрегуючи транзакції парачейну в кандидати на блоки парачейну та створюючи докази переходу стану для валідаторів на основі цих блоків.

Дізнайтеся більше про колаторів на відповідній [сторінці вікі Polkadot](https://wiki.polkadot.network/docs/learn-collator)

У парачейні Robonomics кожен колатор отримує винагороду (**0.001598184 XRT**) за кожен блок, який колатор створює (винагорода відбувається при запечатуванні блоків у ланцюжок).
Також колатор, який створює блок, отримує **50% від комісій за транзакції**, що містяться у блоку, який вони створюють.

## Вимоги

Рекомендується запускати колатор за **стандартними апаратними вимогами** для [валідаторів Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ сумісний з x86-64.
+ Intel Ice Lake або новіший (серія Xeon або Core); AMD Zen3 або новіший (EPYC або Ryzen).
+ 4 фізичних ядра @ 3.4 ГГц.
+ Вимкнене одночасне багатопотоковесть (Hyper-Threading на Intel, SMT на AMD).
+ Зберігання - NVMe SSD обсягом 1 ТБ (оскільки воно повинно бути розумно розмірним для роботи з ростом блокчейну).
+ Пам'ять - 32 ГБ DDR4 ECC


У цій статті ми використовуємо наступні характеристики:
+ 4 вCPU
+ 700 ГБ простору NVMe для баз даних колатора. Потрібна можливість розширення цього дискового простору.
+ 8 ГБ ОЗП


## Важлива інформація
1. Ми використовуємо деякі змінні у цих інструкціях, і вам потрібно буде замінити значення на свої в усіх командах:
    + **%NODE_NAME%** - це назва вузла. Приклад: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** - це шлях до підключеного тома. Приклад: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** - це адреса облікового запису в екосистемі Polkadot у форматі SS58. Приклад: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Зверніть увагу, що вам потрібно включити *--state-cache-size=0* у запуску служби колатора. Цей параметр важливий для стабільності колатора.
Більше інформації можна знайти у відповідному [запиті](https://github.com/airalab/robonomics/issues/234) на github.

## Легкий перший запуск колатора Robonomics

Ви можете легко запустити колатор безпосередньо в командному рядку, щоб перевірити помилки.
Після цього настійно рекомендується запустити колатор Robonomics як службу (див. наступний крок).

```
root@robokusama-collator-screencast:~# robonomics \
  --parachain-id=2048 \
  --name="%NODE_NAME%" \
  --validator \
  --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
  --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
  --base-path="%BASE_PATH%" \
  --state-cache-size=0 \
  -- \
  --database=RocksDb
```


## Запуск колатора Robonomics як служби

1. Створіть користувача для служби з домашнім каталогом
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Завантажте, розпакуйте та перемістіть бінарний файл Robonomics до каталогу */usr/local/bin/*. Вам потрібно замінити *$ROBONOMICS_VERSION* на поточну версію Robonomics у командах у цьому розділі. Поточну версію Robonomics можна знайти на [сторінці релізів репозиторію Robonomics на github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```

	 		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_binary.png", alt:"Завантажити бінарний файл Robonomics 1.4.0"} %}{% endroboWikiPicture %}


3. Створіть файл служби systemd з назвою *robonomics.service*:
    ```
    root@robokusama-collator-screencast:~# nano /etc/systemd/system/robonomics.service
    ```

    І додайте наступні рядки у файл служби:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
      --parachain-id=2048 \
      --name="%NODE_NAME%" \
      --validator \
      --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
      --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
      --base-path="%BASE_PATH%" \
      --state-cache-size=0 \
      --execution=Wasm \
      -- \
      --database=RocksDb \
      --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/nano_robonomics_service.png", alt:"Створити файл служби Robonomics"} %}{% endroboWikiPicture %}


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Збережіть цей файл, потім увімкніть та запустіть службу:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

URL телеметрії: https://telemetry.parachain.robonomics.network/#/Robonomics

Журнали колаторів можна відстежувати за допомогою: `journalctl -u robonomics.service -f`

Після запуску колатора Robonomics він почне синхронізуватися з Ланцюжком Реле Kusama, це може зайняти значний час, залежно від швидкості вашої мережі та характеристик системи, тому ми рекомендуємо завантажити знімок Kusama.


## Прискорення процесу синхронізації за допомогою знімка Kusama

Ми рекомендуємо це зробити безпосередньо після створення та запуску служби Robonomics. Додаткову інформацію про знімки та інструкції з використання можна знайти на наступній сторінці: https://ksm-rocksdb.polkashots.io/

Інструкції:

1. Зупиніть службу Robonomics та видаліть поточний каталог бази даних Kusama:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Завантажте актуальний знімок та розпакуйте його:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# tar -xf kusama.RocksDb.tar.lz4
    ```ama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png", alt:"Завантажити снапшот Kusama"} %}{% endroboWikiPicture %}

    Після успішного розпакування можна видалити завантажений архів:
    ```
    root@robokusama-collator-screencast:~# rm -v kusama.RocksDb.tar.lz4
    ```

3. Встановлення правильної власності для папки бази даних:
    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%/polkadot/chains/ksmcc3
    ```
4. Запустіть службу Robonomics знову:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```
5. Перевірте журнали служби:
    ```
    root@robokusama-collator-screencast:~# journalctl -u robonomics.service -f
    ```

		{% roboWikiPicture {src:"docs/how-to-launch-the-robonomics-collator/finish_journalctl.png", alt:"Перевірка журналів служби"} %}{% endroboWikiPicture %}

## Усунення неполадок
### Помилка: "Помилка бази даних стану: Занадто багато вставлених блоків-сестер"
Для виправлення цієї помилки просто запустіть свій колатор у режимі архіву:

1) Спочатку потрібно зупинити службу Robonomics:

    root@robokusama-collator-screencast:~# systemctl stop robonomics.service


2) Потім додайте параметр `--state-pruning=archive` до частини службового файлу парачейну. Приклад відредагованого службового файлу:
    ```
    [Unit]
    Description=robonomics
    After=network.target

    [Service]
    User=robonomics
    Group=robonomics
    Type=simple
    Restart=on-failure

    ExecStart=/usr/local/bin/robonomics \
    --parachain-id=2048 \
    --name="%NODE_NAME%" \
    --validator \
    --lighthouse-account="%POLKADOT_ACCOUNT_ADDRESS%" \
    --telemetry-url="wss://telemetry.parachain.robonomics.network/submit/ 0" \
    --base-path="%BASE_PATH%" \
    --state-cache-size=0 \
    --execution=Wasm \
    --state-pruning=archive \
    -- \
    --database=RocksDb \
    --execution=Wasm

    [Install]
    WantedBy=multi-user.target
    ```

3) Перезавантажте конфігурацію менеджера systemd:
    ```
    root@robokusama-collator-screencast:~# systemctl daemon-reload
    ```

4) Видаліть існуючу базу даних парачейну:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Запустіть службу Robonomics:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Після цього потрібно зачекати на синхронізацію бази даних парачейну.

### Помилка: "не вдається створити модуль: налаштування компіляції несумісні з природним хостом"
Ця помилка пов'язана з параметрами віртуалізації. Потрібно використовувати тип "host-model" емульованого процесора. Це можна налаштувати на хості віртуалізації.

Але якщо ви зіткнулися з цією помилкою на будь-якому хостингу, вам потрібно звернутися до служби технічної підтримки лише з цією проблемою.