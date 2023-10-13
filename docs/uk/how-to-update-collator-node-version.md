---
title: Як оновити версію вузла Robonomics Collator

contributors: [Leemo94]
---

Рекомендується прочитати наступні статті перед читанням цього посту: ["Як побудувати вузол Collator"](/docs/how-to-build-collator-node) та ["Як запустити Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

У цій статті наведені команди, необхідні для оновлення вузла Robonomics Collator (працюючого на Ubuntu), а також наведено приклад після цього.

## **Необхідні команди**

0. Перш ніж почати, рекомендується увійти як `root`, якщо ні, то рекомендується використовувати:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Зупиніть службу Robonomics:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Видаліть попередню версію Robonomics (переконайтеся, що ви знаходитесь у правильній директорії):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Отримайте [останню версію](https://github.com/airalab/robonomics/releases) Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Розпакуйте файл:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Перемістіть файл:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

Вам потрібно перемістити цей файл у правильну директорію, в якій ви встановили вузол Robonomics)

</robo-wiki-note>

6. Запустіть Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Приклад оновлення вузла Collator до Robonomics v1.8.4:

<code-helper>

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
</code-helper>

## **Зміна бази даних ланцюжка ретрансляції Kusama без встановленого базового шлху**

Іноді певні знімки ланцюжка ретрансляції Kusama призводять до помилок вашого вузла. Це часто призводить до зупинки роботи вузла. Приклад помилки, спричиненої пошкодженою базою даних ланцюжка ретрансляції:

<code-helper>

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
</code-helper>

Щоб виправити цю помилку, вам слід видалити існуючу базу даних ланцюжка ретрансляції Kusama (найімовірніше, RocksDb) та замінити її іншою базою даних, такою як ParityDb. Виконайте наступні команди:

1. Знайдіть директорію вузла Robonomics та перевірте файли:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Підтвердіть, що ви бачите директорію polkadot, а потім перейдіть до директорії chains:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Видаліть каталог `ksmcc3`:

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Створіть нову директорію `ksmcc3`.

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Тепер вам потрібно завантажити новий знімок. У цьому прикладі використовується сильно обрізаний знімок ланцюжка ретрансляції, але ви можете замінити його на будь-який зімок, який вам подобається.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Поки знімок завантажується, відкрийте нову сесію та відредагуйте свій файл служби:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Змініть рядки в файлі служби, які стосуються бази даних та обрізки:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Використовуйте `Ctrl + S`, а потім `Ctrl + X`, щоб зберегти та вийти з файлу служби.

7. Тепер вам потрібно перезавантажити свій демон.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. До цього часу, у вашій іншій сесії, сподіваюся, що нова база даних завантажена, тому розпакуйте файл:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. Після завершення розпакування виконайте наступне:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Тепер ви можете запустити службу, слідкувати за помилками та перевірити, чи вона підключена як до ланцюжка ретрансляції, так і до паралельного ланцюжка:


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>