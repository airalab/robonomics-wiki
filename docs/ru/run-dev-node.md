---
title: Как запустить узел разработки Robonomics
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Для тестирования ваших приложений на Robonomics вы можете запустить его в режиме разработки. В этой статье показаны пошаговые
инструкции о том, как получить собственный локальный тестовый экземпляр Robonomics.**


## Получить двоичный файл узла

1. Сначала вам понадобится двоичный файл, загрузите архив с ним из последнего [релиза](https://github.com/airalab/robonomics/releases).

2. Перейдите в папку с архивом, распакуйте двоичный файл и измените разрешения:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Запустить

Запустите узел с помощью команды:

```bash
./robonomics --dev
```
Вы увидите следующий вывод:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  Если вы хотите очистить существующие блоки, вы можете сделать это, удалив RocksDB в `/tmp/substrate******/chains/dev/db/full`.
  Замените `******` на соответствующий идентификатор, отображаемый в журналах при запуске.

  Если вы хотите каждый раз запускать узел с нуля, используйте флаг `--tmp`.

</robo-wiki-note>

## Подключение

Теперь вы можете подключиться к локальному узлу через [Портал Polkadot](https://polkadot.js.org/apps/#/explorer).

Измените сеть на `Local Node` в верхнем левом углу и нажмите `Switch`.

![switch](../images/dev-node/portal.png)

Добро пожаловать в локальный экземпляр Robonomics!

![local_node](../images/dev-node/dev-portal.png)


