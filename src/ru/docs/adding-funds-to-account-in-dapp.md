---
title: Добавление средств на ваш счет в портале Robonomics

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**После успешного создания учетных записей на портале Robonomics пришло время добавить средства на них, чтобы вы могли инициировать транзакции.**

{% roboWikiNote {title: 'Dev Node', type: "warning"} %}Обратите внимание, что эти и последующие учебные пособия демонстрируются на локальном экземпляре узла Robonomics. Настройте свой собственный согласно [этим инструкциям](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Перейдите в раздел "Счета" на портале Robonomics

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. Выберите счет, с которого хотите перевести средства

В режиме разработки существует несколько счетов, каждый из которых имеет стоимость 10000 единиц и может использоваться для перевода средств на другие счета, созданные в сети разработки. Эти счета обозначены значками гаечного ключа <img src="/assets/images/docs/adding-funds/wrench.png" alt="wrench sign" width="20"/> рядом с ними.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- Нажмите на кнопку "send" счета, с которого хотите перевести средства, например, BOB

## 3. Выберите счет, на который хотите перевести средства
После нажатия кнопки "send" вам будет предложено окно "send funds". В этом окне:

- Из списка доступных счетов выберите счет, на который хотите перевести средства.
- Введите количество единиц, которое хотите отправить.
- Нажмите "make transfer"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}

## 4. Авторизуйте транзакцию

После нажатия "make transfer" на предыдущем этапе, вам будет предложено окно "authorize transaction".<br/>
Проверьте детали транзакции и, наконец, нажмите кнопку "sign and submit".

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

В этом примере мы перевели 500 единиц средств с "BOB" на "EMPLOYER". Вы можете видеть, что у счета EMPLOYER, который изначально не имел средств, теперь есть 500 единиц средств.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**Убедитесь, что у вас достаточно средств на счетах, которые вы хотите использовать в песочнице.**