---
title: Як запустити вузол розробника Robonomics
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Для тестування ваших додатків на Robonomics вам може знадобитися запустити його в режимі розробника. У цій статті показано по крокові інструкції, як отримати свій власний локальний тестовий екземпляр Robonomics.**


## Отримайте виконуваний файл вузла

1. Спочатку вам потрібен виконуваний файл, завантажте архів з ним з останнього [релізу](https://github.com/airalab/robonomics/releases).

2. Перейдіть до папки з архівом, розпакуйте виконуваний файл та змініть дозволи:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Запустіть

Запустіть вузол за допомогою:

```bash
./robonomics --dev
```
Ви побачите наступний вивід:

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"З нуля", type: "note"}%} Якщо ви хочете очистити існуючі блоки, ви можете це зробити, видаливши RocksDB у `/tmp/substrate******/chains/dev/db/full`.
Замініть `******` на відповідний ідентифікатор, який відображається в журналах при запуску.

Якщо ви хочете починати вузол з нуля кожного разу, використовуйте прапорець `--tmp`.
{% endroboWikiNote %}


## Підключіться

Тепер ви можете підключитися до свого локального вузла через [Портал Polkadot](https://polkadot.js.org/apps/#/explorer).

Змініть мережу на `Local Node` в верхньому лівому куті та натисніть `Switch`.

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"switch"} %}{% endroboWikiPicture %}

Ласкаво просимо до локального екземпляра Robonomics!

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"local node"} %}{% endroboWikiPicture %}