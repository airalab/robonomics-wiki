---
title: Добавление пользователя

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**Эта статья покажет вам, как добавить нового пользователя в ваш Home Assistant.**

## Добавление пользователей к подписке

Вы не можете использовать ранее созданные учетные записи, потому что `OWNER` и `CONTROLLER` обеспечивают безопасность, и первый пользователь, которого вы создали при первом запуске Home Assistant, не имеет учетной записи Robonomics Parachain.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Создайте учетную запись на Robonomics parachain, как вы делали в [предыдущей статье](/docs/sub-activate/).

2. Используя учетную запись `OWNER`, добавьте новую учетную запись пользователя в подписку на странице `SETUP A SUBSCRIPTION` в [Robonomics DApp](https://robonomics.app/#/rws-setup). Теперь в разделе `USERS IN SUBSCRIPTION` должно быть три адреса в списке доступа: `OWNER`, `CONTROLLER` и `USER`.


## JSON-файл настройки RWS

Сначала пользователь должен получить JSON-файл с информацией о настройке RWS.

### Создание JSON-файла настройки RWS

Администратор может создать JSON-файл для своей настройки на странице [SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup), используя кнопку `Download import for other users`.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"image"} %}{% endroboWikiPicture %}

### Импорт настройки RWS

Теперь с этим JSON-файлом пользователь может импортировать настройку RWS, используя кнопку `IMPORT SETUP`.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Предоставление доступа пользователю

На той же странице ([SETUP A SUBSCRIPTION](https://robonomics.app/#/rws-setup)) вы можете установить пароль для нового пользователя.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Выберите учетную запись, которую вы только что создали, на правой боковой панели (убедитесь, что вы выбрали нужную учетную запись, нажав на иконку профиля).

2. Введите адрес и секретную фразу `USER` в соответствующие поля.

3. Введите пароль, а затем подтвердите транзакцию, нажав кнопку `CREATE PASSWORD`, которая теперь будет без комиссии из-за подписки.

4. После процесса регистрации войдите в Home Assistant с вашим адресом пользователя в качестве логина и только что созданным паролем.

Теперь вы можете использовать приложение для управления своим домом через Robonomics, ознакомьтесь с статьей [**"Get Smart Home Telemetry"**](/docs/smart-home-telemetry/).