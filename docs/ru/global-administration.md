---
title: Глобальное управление

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**Эта статья покажет вам, как настроить нового пользователя в Home Assistant.**

## Добавление пользователей в подписку

Вы не можете использовать ранее созданные учетные записи, потому что `SUB_OWNER` и `SUB_CONTROLLER` обеспечивают безопасность, и первый пользователь, которого вы создали при первом запуске Home Assistant, не имеет учетной записи Robonomics Parachain.

1. Создайте учетную запись на Robonomics parachain, как вы делали в [предыдущей статье](/docs/sub-activate/).

2. Используя учетную запись `SUB_OWNER`, добавьте новую учетную запись пользователя в подписку в [dapp](https://dapp.robonomics.network/#/subscription/devices). Теперь в списке доступа должно быть три адреса: `SUB_OWNER`, `SUB_CONTROLLER` и `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## Предоставление доступа пользователю

1. Перейдите на службу dapp с названием [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). Выберите учетную запись, которую вы только что создали, в правой боковой панели (убедитесь, что вы выбрали нужную учетную запись, нажав на значок профиля).

2. Введите `USER` seed в соответствующее поле. Добавьте адреса `SUB_OWNER` и `SUB_CONTROLLER` в поля администраторских кредитов. Если все верно, вы увидите статус проверки `VERIFIED`.

3. Создайте пароль для нового пользователя, которого вы только что зарегистрировали, а затем подтвердите транзакцию, которая теперь будет без комиссии из-за подписки. Позже вы сможете восстановить пароль во вкладке Восстановление.

4. После процесса регистрации войдите в Home Assistant с помощью вашего адреса пользователя в качестве логина и только что созданного пароля.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

Теперь вы можете использовать dapp для управления своим домом через Robonomics, ознакомьтесь с статьей [**"Получение телеметрии умного дома"**](/docs/smart-home-telemetry/).

## Устранение неполадок

1. Если вы забыли пароль к Home Assistant от своей учетной записи Робономики, [проверьте Dapp.](https://dapp.robonomics.network/#/home-assistant)
Перейдите в раздел "Your Home Assistant password" и выберите вкладку "Restore".
