---
title: Как установить ноду Робономики в режиме разработчика
 
contributors: [LoSk-p, katerina510]
translated: true
---

Для тестирования Ваших приложений для Робономики Вам может понадобиться установка ноды в режиме разработчика.

https://youtu.be/04GsVkZ7aVg

## Запускаем

1. Прежде всего, Вам понадобится двоичный файл. Загрузите архив с ним из последнего [релиза](https://github.com/airalab/robonomics/releases).

2. Распакуйте его и измените разрешения:

```bash
tar xf robonomics-1.7.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

3. Запустите в режиме разработчика:

```bash
./robonomics --dev
```
Вы увидите следующее:

![robonomics](../images/dev-node/robonomics.png)

## Подключаемся

Теперь Вы можете подключиться к Вашей локальной ноде через [Портал Полькадот](https://polkadot.js.org/apps/#/explorer).

Измените сеть на `Local Node` в верхнем левом углу и нажмите `Switch`.

![локальная нода](../images/dev-node/portal.png)