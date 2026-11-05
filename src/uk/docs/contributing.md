---
title: Як долучитися
contributors: [positivecrash, ensrationis]
---

Robonomics — проєкт із відкритим кодом, і ми хочемо, щоб долучитися міг будь-хто. Можна повідомити про проблему, запропонувати зміну, покращити код або цю документацію. Відкрийте issue або pull request у тому репозиторії, до якого належить зміна.

## Основні репозиторії

- [airalab/robonomics](https://github.com/airalab/robonomics): рантайм і його палети. Там є власні CONTRIBUTING.md і SECURITY.md.
- [airalab/robins](https://github.com/airalab/robins): інструменти, зокрема консольна утиліта `cps` і шлюзи для пристроїв.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): бібліотека для Python.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): вебзастосунок [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): ця вікі.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): основний сайт.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): сайт Robonomics Academy.

## Як повідомити про проблему

1. Виберіть репозиторій, до якого належить проблема.
2. Якщо це помилка, перевірте, що про неї ще не повідомляли.
3. Дайте зрозумілий заголовок і опис, з якомога більшою кількістю корисних подробиць.
4. Для цієї вікі використовуйте шаблон issue і вкажіть сторінку, яку треба виправити.

Не повідомляйте про вразливості в публічних issue. Дотримуйтеся SECURITY.md в [airalab/robonomics](https://github.com/airalab/robonomics): там описано закритий канал через GitHub Security Advisories.

## Як запропонувати зміну в мережі

Про зміни рантайму та його параметрів вирішують власники XRT. Спершу опишіть ідею в issue в [airalab/robonomics](https://github.com/airalab/robonomics/issues), потім винесіть її на референдум. Див. [XRT та управління](/docs/xrt-and-governance/#how-to-propose-a-change).

## Pull request

1. Дрібні виправлення на кшталт одруківок краще одразу надсилати як pull request, а не issue.
2. Опишіть у pull request проблему та рішення. Якщо є пов'язаний issue, дайте на нього посилання.
3. Не надсилайте pull request, які виправляють лише пробіли чи форматування.
4. Дотримуйтеся стилю, мови й оформлення навколишнього тексту.

## Як редагувати цю вікі

Вікі збирається на Eleventy. Потрібен Node.js 20 або 22 і новіший.

1. Склонуйте [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki), потім виконайте `npm install` і `npm run start`, щоб запустити сайт локально.
2. Сторінки — це файли Markdown у `src/docs/`. Кожен починається з frontmatter: `title`, `contributors` (імена користувачів GitHub) і, за бажанням, `tools`.
3. Бічне меню задається в `src/_data/sidebar_docs.json`. Додаючи пункт, додайте його заголовок і в `translations/pages/en.json`.

[README](https://github.com/airalab/robonomics-wiki#readme) розповідає про компоненти сторінок і про те, як влаштовано переклад.
