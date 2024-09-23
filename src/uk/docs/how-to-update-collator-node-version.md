---
title: Як оновити версію вузла Robonomics Collator

contributors: [Leemo94]
---

Рекомендується прочитати наступні статті перед читанням цього посту: ["Як побудувати вузол Collator"](/docs/how-to-build-collator-node) та ["Як запустити Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

У цій статті наведені команди, необхідні для оновлення вузла коллатора Robonomics (на Ubuntu), а також наводиться приклад після цього.

## **Необхідні команди**

0. Перш ніж почати, рекомендується увійти як `root`, якщо ні, то рекомендую використовувати:


{% codeHelper { copy: true} %}

```shell
sudo su -
```

{% endcodeHelper %}

1. Зупиніть службу Robonomics:

{% codeHelper { copy: true} %}

```shell
systemctl stop robonomics.service
```

{% endcodeHelper %}


2. Видаліть попередню версію Robonomics (переконайтеся, що ви знаходитесь у правильній директорії):

{% codeHelper { copy: true} %}

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

{% endcodeHelper %}

3. Отримайте [останню версію](https://github.com/airalab/robonomics/releases) Robonomics:


{% codeHelper { copy: true}%}

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

{% endcodeHelper %}


4. Розпакуйте файл:

{% codeHelper { copy: true}%}

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

{% endcodeHelper %}


5. Перемістіть файл:

{% codeHelper { copy: true}%}

```shell
mv robonomics /usr/local/bin/
```

{% endcodeHelper %}

{% roboWikiNote {type: "note"}%} Вам потрібно перемістити цей файл у правильну директорію, в якій ви встановили вузол Robonomics {% endroboWikiNote %}

6. Запустіть Robonomics:

{% codeHelper { copy: true}%}

```shell
systemctl start robonomics.service
```

{% endcodeHelper %}

Приклад оновлення вузла коллатора до Robonomics v1.8.4:

{% codeHelper %}

```shell
sudo su -
cd /home/admin
systemctl stop robonomics.service
rm -f robonomics-1.7.3-x86_64-unknown-linux-gnu.tar.gz
wget https://github.com/airalab/robonomics/releases/download/v1.8.4/robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
tar -xf robonomics-1.8.4-x86_64-unknown-linux-gnu.tar.gz
mv robonomics /usr/local/bin/
systemctl start robonomics.service

```

{% endcodeHelper %}


## **Зміна бази даних ланцюга ретрансляції Kusama без встановленого базового шляху**

Іноді деякі знімки ланцюга ретрансляції Kusama призводять до помилок на вашому вузлі. Це часто призводить до зупинки роботи вузла. Приклад помилки, спричиненої пошкодженою базою даних ланцюга ретрансляції:


{% codeHelper %}

```shell
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] GRANDPA voter error: could not complete a round on disk: Database
Dec 08 19:14:31 ns3159483 robonomics[1019836]: 2022-12-08 19:14:31 [Relaychain] Essential task `grandpa-voter` failed. Shutting down service.
Dec 08 19:14:32 ns3159483 robonomics[1019836]: Error: Service(Other("Essential task failed."))
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:32 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
ec 08 19:14:33 ns3159483 robonomics[1022922]: Error: Service(Client(Backend("Invalid argument: Column families not opened: col12, col11, col10, col9, col8, col7, col6, col5, col4, col3, col2, col1, col0")))
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Main process exited, code=exited, status=1/FAILURE
Dec 08 19:14:33 ns3159483 systemd[1]: robonomics.service: Failed with result 'exit-code'.
```

{% endcodeHelper %}


Для виправлення цієї помилки вам слід видалити існуючу базу даних ланцюга ретрансляції Kusama (імовірно, RocksDb) та замінити її іншою базою даних, такою як ParityDb. Виконайте наступні команди:

1. Знайдіть директорію вузла Robonomics та перевірте файли:

{% codeHelper %}

```shell
cd /home/robonomics/
ls -a
```

{% endcodeHelper %}


2. Підтвердіть, що ви бачите директорію polkadot, а потім перейдіть до директорії chains:


{% codeHelper %}

```shell
cd /polkadot/chains/
ls -a
```

{% endcodeHelper %}

3. Видаліть директорію `ksmcc3`:


{% codeHelper {copy: true} %}

```shell
rm -r ksmcc3
```

{% endcodeHelper %}


4. Створіть нову директорію `ksmcc3`.

{% codeHelper {copy: true} %}

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

{% endcodeHelper %}

5. Тепер вам потрібно завантажити новий знімок. У цьому прикладі використовується сильно обрізаний знімок ланцюга ретрансляції, але ви можете замінити його на будь-який знімок, який вам до вподоби.


{% codeHelper {copy: true} %}

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

{% endcodeHelper %}

6. Поки знімок завантажується, відкрийте нову сесію та відредагуйте ваш файл служби:

{% codeHelper {copy: true} %}

```shell
sudo nano /etc/systemd/system/robonomics.service
```

{% endcodeHelper %}

Змініть рядки у файлі служби, які стосуються бази даних та обрізки:


{% codeHelper {copy: true} %}

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

{% endcodeHelper %}


Використовуйте `Ctrl + S`, а потім `Ctrl + X`, щоб зберегти та вийти з файлу служби.

7. Тепер вам потрібно перезавантажити ваш демон.

{% codeHelper {copy: true} %}

```shell
systemctl daemon-reload
```

{% endcodeHelper %}


8. До цього часу, в іншій сесії, сподіваємося, що нову базу даних вже завантажено, тому розпакуйте файл:

{% codeHelper {copy: true} %}

```shell
tar -xvzf ksm_pruned.tar.gz
```

{% endcodeHelper %}


9. Після завершення розпакування виконайте наступне:

{% codeHelper {copy: true} %}

```shell
chown -R robonomics:robonomics paritydb
```

{% endcodeHelper %}

10. Тепер ви можете запустити службу, відстежувати її на наявність помилок та перевірити, що вона підключена як до ретрансляційного ланцюга, так і до паралельного ланцюга:

{% codeHelper {copy: true} %}

```shell
systemctl start robonomics && journalctl -fu robonomics
```

{% endcodeHelper %}