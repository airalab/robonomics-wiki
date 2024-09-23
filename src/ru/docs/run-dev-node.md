---
title: Как запустить узел разработки Robonomics
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Для тестирования ваших приложений на Robonomics вам может понадобиться запустить его в режиме разработки. В этой статье показаны пошаговые инструкции о том, как создать собственный локальный тестовый экземпляр Robonomics.**


## Получение бинарного файла узла

1. Сначала вам понадобится бинарный файл, загрузите архив с ним из последнего [релиза](https://github.com/airalab/robonomics/releases).

2. Перейдите в папку с архивом, распакуйте бинарный файл и измените разрешения:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Запуск

Запустите узел с помощью:

```bash
./robonomics --dev
```
Вы увидите следующий вывод:

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"С нуля", type: "note"}%} Если вы хотите очистить существующие блоки, вы можете сделать это, удалив RocksDB в `/tmp/substrate******/chains/dev/db/full`.
Замените `******` на соответствующий идентификатор, отображаемый в журналах при запуске.

Если вы хотите запускать узел с нуля каждый раз, используйте флаг `--tmp`.
{% endroboWikiNote %}


## Подключение

Теперь вы можете подключиться к своему локальному узлу через [Портал Polkadot](https://polkadot.js.org/apps/#/explorer).

Измените сеть на `Local Node` в верхнем левом углу и нажмите `Switch`.

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

Добро пожаловать в локальный экземпляр Robonomics!

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}