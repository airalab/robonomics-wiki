---
title: Как внести вклад
contributors: [positivecrash, ensrationis]
---

Robonomics — проект с открытым кодом, и мы хотим, чтобы внести вклад мог любой. Можно сообщить о проблеме, предложить изменение, улучшить код или эту документацию. Откройте issue или pull request в том репозитории, к которому относится изменение.

## Основные репозитории

- [airalab/robonomics](https://github.com/airalab/robonomics): рантайм и его паллеты. Там есть свои CONTRIBUTING.md и SECURITY.md.
- [airalab/robins](https://github.com/airalab/robins): инструменты, в том числе консольная утилита `cps` и шлюзы для устройств.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): библиотека для Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): веб-приложение [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): эта вики.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): основной сайт.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): сайт Robonomics Academy.

## Как сообщить о проблеме

1. Выберите репозиторий, к которому относится проблема.
2. Если это ошибка, проверьте, что о ней ещё не сообщали.
3. Дайте понятный заголовок и описание, с максимумом полезных подробностей.
4. Для этой вики используйте шаблон issue и укажите страницу, которую нужно исправить.

Не сообщайте об уязвимостях в публичных issue. Следуйте SECURITY.md в [airalab/robonomics](https://github.com/airalab/robonomics): там описан закрытый канал через GitHub Security Advisories.

## Как предложить изменение в сети

Об изменениях рантайма и его параметров решают держатели XRT. Сначала опишите идею в issue в [airalab/robonomics](https://github.com/airalab/robonomics/issues), затем вынесите её на референдум. См. [XRT и управление](/docs/xrt-and-governance/#how-to-propose-a-change).

## Pull request

1. Мелкие правки вроде опечаток лучше сразу присылать pull request, а не issue.
2. Опишите в pull request проблему и решение. Если есть связанный issue, дайте на него ссылку.
3. Не присылайте pull request, которые правят только пробелы или форматирование.
4. Следуйте стилю, языку и оформлению окружающего текста.

## Как править эту вики

Вики собирается на Eleventy. Нужен Node.js 20 или 22 и новее.

1. Склонируйте [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki), затем выполните `npm install` и `npm run start`, чтобы запустить сайт локально.
2. Страницы — это файлы Markdown в `src/docs/`. Каждый начинается с frontmatter: `title`, `contributors` (имена пользователей GitHub) и, по желанию, `tools`.
3. Боковое меню задаётся в `src/_data/sidebar_docs.json`. Добавляя пункт, добавьте его заголовок и в `translations/pages/en.json`.

[README](https://github.com/airalab/robonomics-wiki#readme) рассказывает о компонентах страниц и о том, как устроен перевод.
