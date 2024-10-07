---
title: Как обновить версию узла Robonomics Collator

contributors: [Leemo94]
---

Рекомендуется прочитать следующие статьи перед прочтением этого поста: ["Как построить узел Collator"](/docs/how-to-build-collator-node) и ["Как запустить узел Robonomics Collator"](/docs/how-to-launch-the-robonomics-collator).

Эта статья содержит необходимые команды для обновления узла Collator Robonomics (работающего на Ubuntu) и приводит пример после этого.

## **Необходимые команды**

0. Прежде чем начать, рекомендуется войти как `root`, если нет, то рекомендуется использовать:


{% codeHelper { copy: true} %}

```shell
sudo su -
```

{% endcodeHelper %}

1. Остановите службу Robonomics:

{% codeHelper { copy: true} %}

```shell
systemctl stop robonomics.service
```

{% endcodeHelper %}


2. Удалите предыдущую версию Robonomics (убедитесь, что находитесь в правильном каталоге):

{% codeHelper { copy: true} %}

```shell
rm -f robonomics.X.X.X-ubuntu-x86_64.tar.gz
```

{% endcodeHelper %}

3. Получите [последнюю версию](https://github.com/airalab/robonomics/releases) Robonomics:


{% codeHelper { copy: true}%}

```shell
wget https://github.com/airalab/robonomics/releases/vX.X.X/.....
```

{% endcodeHelper %}


4. Распакуйте файл:

{% codeHelper { copy: true}%}

```shell
tar -xf robonomics-X.X.X-x86_64-unknown-linux.gnu.tar.gz
```

{% endcodeHelper %}


5. Переместите файл:

{% codeHelper { copy: true}%}

```shell
mv robonomics /usr/local/bin/
```

{% endcodeHelper %}

{% roboWikiNote {type: "note"}%} Необходимо переместить этот файл в правильный каталог, в который установлен узел Robonomics {% endroboWikiNote %}

6. Запустите Robonomics:

{% codeHelper { copy: true}%}

```shell
systemctl start robonomics.service
```

{% endcodeHelper %}

Пример обновления узла Collator до Robonomics v1.8.4:

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


## **Изменение базы данных цепи ретрансляции Kusama без установленного базового пути**

Иногда определенные снимки цепи ретрансляции Kusama могут вызвать ошибки на вашем узле. Это часто приводит к остановке работы узла. Пример ошибки, вызванной поврежденной базой данных цепи ретрансляции:


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


Для исправления этой ошибки вам следует удалить существующую базу данных цепи ретрансляции Kusama (вероятно, RocksDb) и заменить ее другой базой данных, такой как ParityDb. Выполните следующие команды:

1. Найдите каталог узла Robonomics и проверьте файлы:

{% codeHelper %}

```shell
cd /home/robonomics/
ls -a
```

{% endcodeHelper %}


2. Убедитесь, что вы видите каталог polkadot, затем перейдите в каталог цепей:


{% codeHelper %}

```shell
cd /polkadot/chains/
ls -a
```

{% endcodeHelper %}

3. Удалите каталог `ksmcc3`:


{% codeHelper {copy: true} %}

```shell
rm -r ksmcc3
```

{% endcodeHelper %}


4. Создайте новый каталог `ksmcc3`.

{% codeHelper {copy: true} %}

```shell
mkdir ksmcc3
chown -R robonomics:robonomics ksmcc3
cd ksmcc3
```

{% endcodeHelper %}

5. Теперь вам нужно загрузить новый снимок. В этом примере используется сильно усеченный снимок цепи ретрансляции, но вы можете заменить его на любой снимок, который предпочитаете.


{% codeHelper {copy: true} %}

```shell
wget wget https://snaps.sik.rocks/ksm_pruned.tar.gz
```

{% endcodeHelper %}

6. Пока снимок загружается, откройте новую сессию и отредактируйте ваш файл службы:

{% codeHelper {copy: true} %}

```shell
sudo nano /etc/systemd/system/robonomics.service
```

{% endcodeHelper %}

Измените строки в файле службы, относящиеся к базе данных и усечению:


{% codeHelper {copy: true} %}

```shell
  --database=paritydb \
  --state-pruning=100 \
  --blocks-pruning=100 \
  --execution=Wasm
```

{% endcodeHelper %}


Используйте `Ctrl + S`, а затем `Ctrl + X`, чтобы сохранить и выйти из файла службы.

7. Теперь вам нужно перезагрузить ваш демон.

{% codeHelper {copy: true} %}

```shell
systemctl daemon-reload
```

{% endcodeHelper %}


8. К этому времени, в вашей другой сессии, надеюсь, новая база данных уже загружена, поэтому извлеките файл:

{% codeHelper {copy: true} %}

```shell
tar -xvzf ksm_pruned.tar.gz
```

{% endcodeHelper %}


9. После завершения распаковки выполните следующее:

{% codeHelper {copy: true} %}

```shell
chown -R robonomics:robonomics paritydb
```

{% endcodeHelper %}

10. Теперь вы можете запустить службу, отслеживать ее на наличие ошибок и проверить, что она подключена как к цепи ретрансляции, так и к парачейне:

{% codeHelper {copy: true} %}

```shell
systemctl start robonomics && journalctl -fu robonomics
```

{% endcodeHelper %}