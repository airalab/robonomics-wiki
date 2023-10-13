---
title: Як запустити колатор Robonomics
contributors: [dergudzon, Leemo94]
tools:
  - Ubuntu 22.04.1
    https://releases.ubuntu.com/22.04/
  - Robonomics 2.6.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="note" title="Note">
  У відео та знімках екрану цієї статті ми використовували версію 1.4.0 Robonomics. Вам потрібно використовувати ті ж команди, але замінити весію Robonomics на поточну.
</robo-wiki-note>

https://youtu.be/wUTDDLDbzTg

Наразі мережу Robonomics в основному підтримують початкові розробники, але будь-хто може підтримати проект. Кожен додатковий повний вузол блокчейну допомагає йому стати більш стійким та відмовостійким. Бінарні файли вузлів Robonomics доступні в [релізі](https://github.com/airalab/robonomics/releases) або їх можна [побудувати з вихідних кодів](/docs/how-to-build-collator-node/).

## Що таке колатор

Колатор є частиною паралельної мережі Robonomics. Цей тип вузла створює нові блоки для ланцюжка Robonomics.

>Колатори підтримують парачейни, збираючи транзакції парачейну від користувачів та створюючи докази переходу стану для перевіряючих ланцюжок ретрансляції. Іншими словами, колатори підтримують парачейни, агрегуючи транзакції парачейну в кандидати на блоки парачейну та створюючи докази переходу стану для перевіряючих на основі цих блоків.

Ви можете дізнатися більше про колатори на відповідній [сторінці вікі Polkadot](https://wiki.polkadot.network/docs/learn-collator)

У парачейні Robonomics кожен збирач отримує винагороду в розмірі (**0,001598184 XRT**) за кожен створений збиральником блок (винагороди виникають, коли блоки запечатані в ланцюжку).
Також колатор, який створює блок, отримує **50% комісійних з операцій**, що містяться у створеному блоку.

## Вимоги

Рекомендується запускати колатор з використанням **стандартних апаратних вимог** для [валідаторів Polkadot](https://wiki.polkadot.network/docs/maintain-guides-how-to-validate-polkadot#standard-hardware):
+ Сумісний з x86-64.
+ Intel Ice Lake або новіший (Xeon або серія Core); AMD Zen3 або новіший (EPYC або Ryzen).
+ 4 фізичні ядра @ 3.4GHz.
+ Вимкнена одночасна багатопотоковість (Hyper-Threading на Intel, SMT на AMD).
+ Зберігання - NVMe SSD об'ємом 1 ТБ (так як воно повинно бути розумно розміром для роботи з ростом блокчейну).
+ Пам'ять - 32 ГБ DDR4 ECC


У цій статті ми використовуємо наступні специфікації:
+ 4 vCPU
+ 700 ГБ простору NVMe для баз даних колатора. Необхідна можливість розширення цього дискового простору.
+ 8 ГБ ОЗУ


## Важлива інформація
1. Ми використовуємо деякі змінні в цих інструкціях, і вам потрібно замінити значення на власні в усіх командах:
    + **%NODE_NAME%** - це назва вузла. Наприклад: *my-robonomics-kusama-collator*
    + **%BASE_PATH%** - це шлях до підключеного тома. Наприклад: */mnt/HC_Volume_16056435/*
    + **%POLKADOT_ACCOUNT_ADDRESS%** - це адреса облікового запису в екосистемі Polkadot у форматі SS58. Наприклад: *4Gp3QpacQhp4ZReGhJ47pzExQiwoNPgqTWYqEQca9XAvrYsu*

2. Зверніть увагу, що ви повинні включити *--state-cache-size=0* при запуску служби колатора. Цей параметр важливий для стабільності колатора.
Ви можете побачити більше інформації в відповідному [запиті](https://github.com/airalab/robonomics/issues/234) на github.

## Легко вперше запустіть колатор Robonomics

Ви можете легко запустити колатор безпосередньо з командного рядка, щоб перевірити наявність помилок.
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


## Запустіть колатор Robonomics як службу

1. Створіть користувача для служби з домашнім каталогом
    ```
    root@robokusama-collator-screencast:~# useradd -m robonomics
    ```

2. Завантажте, розпакуйте та перемістіть бінарний файл Robonomics до каталогу */usr/local/bin/*. Ви повинні замінити *$ROBONOMICS_VERSION* на поточну версію Robonomics у командах цього озділу. Поточну версію можна знайти на [сторінці релізів репозиторію Robonomics на github](https://github.com/airalab/robonomics/releases).
   ```
   root@robokusama-collator-screencast:~# wget https://github.com/airalab/robonomics/releases/download/v$ROBONOMICS_VERSION/robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# tar -xf robonomics-$ROBONOMICS_VERSION-x86_64-unknown-linux-gnu.tar.gz
   root@robokusama-collator-screencast:~# mv robonomics /usr/local/bin/
   ```
   ![Download Robonomics 1.4.0 binary](../images/how-to-launch-the-robonomics-collator/wget_binary.png)


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

    ![Create Robonomics service file](../images/how-to-launch-the-robonomics-collator/nano_robonomics_service.png)


    ```
    root@robokusama-collator-screencast:~# chown -R robonomics:robonomics %BASE_PATH%
    ```


4. Збережіть цей файл, потім активуйте та запустіть службу:
    ```
    root@robokusama-collator-screencast:~# systemctl enable robonomics.service 
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

URL телеметрії: https://telemetry.parachain.robonomics.network/#/Robonomics

Журнали Collators можна відстежувати за допомогою: `journalctl -u robonomics.service -f`

Після запуску сортувальника Robonomics він почне синхронізуватися з ланцюгом ретрансляції Kusama. Це може зайняти значний проміжок часу, залежно від швидкості вашої мережі та характеристик системи, тому ми рекомендуємо завантажити знімок Kusama.


## Прискорення процесу синхронізації за допомогою знімка Kusama

Ми рекомендуємо це зробити одразу після створення та запуску служби Robonomics. Більше інформації про знімки та інструкції з використання можна знайти на наступній сторінці: https://ksm-rocksdb.polkashots.io/

Інструкції:

1. Зупиніть службу Robonomics та видаліть поточний каталог бази даних Kusama:
    ```
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/polkadot/chains/ksmcc3/db/
    ```
2. Завантажте актуальний знімок та розпакуйте його:
    ```
    root@robokusama-collator-screencast:~# wget https://ksm-rocksdb.polkashots.io/snapshot -O kusama.RocksDb.tar.lz4
    root@robokusama-collator-screencast:~# lz4 -c -d kusama.RocksDb.tar.lz4 | tar -x -C %BASE_PATH%/polkadot/chains/ksmcc3
    ```
    ![Download Kusama snapshot](../images/how-to-launch-the-robonomics-collator/wget_kusama_snapshot.png)

    Ви можете видалити завантажений архів після успішного розпакування:
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
    ![Check service logs](../images/how-to-launch-the-robonomics-collator/finish_journalctl.png)

## Усунення неполадок
### Помилка: "State Database error: Too many sibling blocks inserted"
Щоб виправити цю помилку, ви можете просто запустити свій сортувальник у режимі архіву:

1) Спочатку потрібно зупинити службу Robonomics: 
    
    root@robokusama-collator-screencast:~# systemctl stop robonomics.service
    

2) Потім додайте параметр `--state-pruning=archive` до частини сервісного файлу парачейну. Приклад відредагованого сервісного файлу:
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

4) Видалть існуючу базу даних парачейну:
    ```
    root@robokusama-collator-screencast:~# rm -rf %BASE_PATH%/chains/robonomics/db/
    ```

5) Запустіть сервіс робономіки:
    ```
    root@robokusama-collator-screencast:~# systemctl start robonomics.service
    ```

    Після цього потрібно зачекати синхронізацію бази даних парачейну.

### Помилка: "cannot create module: compilation settings are not compatible with the native host"
Ця помилка пов'язана з параметрами віртуалізації. Потрібно використовувати тип "host-model" емульованого процесора. Ви можете налаштувати це на хості віртуалізації.

Але якщо ви зустрінете цю помилку на будь-якому хостингу, вам потрібно звернутися до служби підтримки з тільки цією проблемою.
