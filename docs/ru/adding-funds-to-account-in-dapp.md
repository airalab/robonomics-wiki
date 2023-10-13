---
title: Добавление средств на ваш счет в портале Robonomics 

contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**После успешного создания учетных записей на портале Robonomics настало время пополнить их средствами, чтобы вы могли инициировать транзакции.**

<robo-wiki-note type="warning" title="Dev Node">

  Обратите внимание, что эти и следующие учебники демонстрируются на локальном экземпляре узла Robonomics. Настройте свой с помощью [этих инструкций](/docs/run-dev-node).

</robo-wiki-note>

## 1. Перейдите в раздел «Аккаунты» на портале Робономики.

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. Выберите счет, с которого хотите перевести средства

В режиме разработки существует несколько счетов с 10000 единицами средств каждый, которые можно использовать для перевода средств на другие счета, созданные в сети разработки. Эти счета обозначены значками гаечного ключа <img alt="значок гаечного ключа" src="../images/adding-funds/wrench.png" width="20" /> рядом с ними.

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- Нажмите на кнопку "send" счета, с которого хотите перевести средства, например BOB

## 3. Выберите счет, на который хотите перевести средства
После нажатия на кнопку "send" вам будет предложено окно "send funds window". В предложенном окне:

- Из списка доступных счетов выберите счет, на который хотите отправить средства.
- Введите количество единиц, которые вы хотите отправить.
- Нажмите "make transfer"

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. Авторизуйте транзакцию

После нажатия "make transfer" на предыдущем этапе вам будет предложено окно "authorize transaction window".<br/>
Проверьте детали транзакции и нажмите кнопку "sign and submit".

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")
В этом примере мы перевели 500 единиц средств с "BOB" на "EMPLOYER". Вы можете видеть, что на счету EMPLOYER, который изначально не имел средств, теперь есть 500 единиц средств.

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**Убедитесь, что у вас достаточно средств на счетах, которые вы хотите использовать в песочнице.**