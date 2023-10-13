---
title: Как обновить версию узла Robonomics Collator

contributors: [Leemo94]
---

Рекомендуется прочитать следующие статьи перед прочтением этого поста: ["Как построить узел Collator"](/docs/how-to-build-collator-node) и ["Как запустить Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

В этой статье приведены команды, необходимые для обновления узла Robonomics collator (работающего на Ubuntu), а также приведен пример после этого.

## **Необходимые команды**

0. Прежде чем начать, рекомендуется войти в систему под учетной записью `root`, если нет, то рекомендуется использовать:

<code-helper copy>

```shell
sudo su -
```

</code-helper>

1. Остановите службу Robonomics:

<code-helper copy>

```shell
systemctl stop robonomics.service
```

</code-helper>

2. Удалите предыдущую версию Robonomics (убедитесь, что вы находитесь в правильном каталоге):

<code-helper copy>

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

</code-helper>

3. Получите [последний релиз](https://github.com/airalab/robonomics/releases) версии Robonomics:

<code-helper copy>

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```
</code-helper>


4. Извлеките файл:

<code-helper copy>

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```
</code-helper>

5. Переместите файл:

<code-helper copy>

```shell
mv robonomics /usr/local/bin/
```
</code-helper>

<robo-wiki-note type="note">

Вам нужно переместить этот файл в правильный каталог, в который вы установили узел Robonomics)

</robo-wiki-note>

6. Запустите Robonomics:

<code-helper copy>

```shell
systemctl start robonomics.service
```
</code-helper>

Пример обновления узла коллатора до Robonomics v1.8.4:

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

## **Изменение базы данных Kusama Relay Chain без установленного базового пути**

Иногда определенные снимки Kusama Relay Chain вызывают ошибки в вашем узле. Это часто приводит к остановке работы вашего узла. Пример ошибки, вызванной поврежденной базой данных Relay Chain:

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

Чтобы исправить эту ошибку, вы должны удалить существующую базу данных Kusama Relay Chain (скорее всего RocksDb) и заменить ее другой базой данных, такой как ParityDb. Выполните следующие команды:

1. Найдите каталог узла Robonomics и проверьте файлы:

<code-helper>

```shell
cd /home/robonomics/
ls -a
```
</code-helper>

2. Убедитесь, что вы видите каталог polkadot, а затем перейдите в каталог chains:

<code-helper>

```shell
cd /polkadot/chains/
ls -a
```
</code-helper>

3. Удалите каталог `ksmcc3`:

<code-helper copy>

```shell
rm -r ksmcc3
```
</code-helper>

4. Создайте новый каталог `ksmcc3`:

<code-helper>

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

</code-helper>

5. Теперь вам нужно загрузить новый снимок. В этом примере используется сильно усеченный снимок ретрансляционной цепи, но вы можете заменить его на любой предпочитаемый снимок.

<code-helper copy>

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

</code-helper>

6. Пока снимок загружается, откройте новую сессию и отредактируйте ваш сервисный файл:


<code-helper copy>

```shell
sudo nano /etc/systemd/system/robonomics.service
```

</code-helper>

Измените строки в сервисном файле, относящиеся к базе данных и усечению:

<code-helper copy>

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

</code-helper>

  
Используйте `Ctrl + S`, а затем `Ctrl + X`, чтобы сохранить и выйти из сервисного файла.

7. Теперь вам нужно перезагрузить ваш демон.

<code-helper copy>

```shell
systemctl daemon-reload
```
</code-helper>


8. К этому времени, в вашей другой сессии, надеюсь, новая база данных загрузилась, поэтому извлеките файл:

<code-helper copy>

```shell
tar -xvzf ksm_pruned.tar.gz
```

</code-helper>

9. После завершения распаковки выполните следующее:

<code-helper copy>


```shell
chown -R robonomics:robonomics paritydb
```

</code-helper>

10. Теперь вы можете запустить сервис, отслеживать возможные ошибки и проверить, что он соединяется как с ретрансляционной цепью, так и с парачейном.


<code-helper copy>


```shell
systemctl start robonomics && journalctl -fu robonomics
```
</code-helper>