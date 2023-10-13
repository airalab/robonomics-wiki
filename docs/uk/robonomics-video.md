---
title: Сервіс відео Robonomics
contributors: [nakata5321]
---

У цій статті показано, як додати IP-камеру до Home Assistant та надсилати відео на веб-сервіс Robonomics.

Для підключення камери до Home Assistant вам потрібно знати його IP-адресу та створити локальний обліковий запис камери для підключення до потоку RTSP.

<robo-wiki-note type="warning">
Оскільки це робиться по-різному для кожної камери, цей процес не розглядається в цій статті.
</robo-wiki-note>

Вимоги:
- IP-камера
- Налаштований локальний обліковий запис камери
- IP-адреса камери
- Налаштований Home Assistant

<robo-wiki-note type="note">

У цій статті припускається, що у вас є загальна IP-камера без опцій RTZ (поворот, нахил, збільшення). 
Якщо у вас є камера RTZ, перевірте статтю ["Камера RTZ"](/docs/ptz-camera). А потім поверніться до другого кроку тут.

</robo-wiki-note>

## Підключіть камеру

По-перше, вам потрібно дізнатися URL-адресу потоку RTSP камери. 
Для цього спробуйте ввести наступний запит в Інтернеті: "<НАЗВА_КАМЕРИ> RTSP-потік".
URL потоку повинен починатися з `rtsp://<IP_Адреса>...`. 

У цій статті використовується камера "Tapo", а шлях потоку - `rtsp://<IP_Адреса>/stream1`.

Відкрийте Home Assistant та перейдіть до "Settings"-> "Devices & Services". Натисніть кнопку "ADD INTEGRATION" та
почніть вводити інтеграцію "Generic Camera". Виберіть її.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

У вікні конфігурації надайте наступну інформацію:
- Stream Source URL - URL потоку RTSP камери
- Username - введіть ім'я користувача вашого локального облікового запису камери
- Password - введіть пароль для вашого локального облікового запису камери

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

Прокрутіть налаштування вниз і натисніть кнопку "Submit".

У попередньому вікні активуйте прапорець "This image looks good." і натисніть кнопку "Submit". Потім - "Finish".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### Додати до панелі інструментів

Крім того, ви можете додати потік на свою панель інструментів. Для цього перейдіть на панель і створіть нову картку 
"Picture Glance". Далі кроки:
- введіть бажану "Title"
- видаліть дані з "Image Path"
- виберіть камера в "Camera Entity"
- у "Camera View", виберіть "live", щоб зменшити затримку

І збережіть це.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## Перевірте папку з медіа

Before being sent to the Robonomics Video Service, the video must be saved in a folder, and Home Assistant must have access to this folder. 
Найпростіший варіант у цьому випадку - використовувати медіа-пакет, в якому Home Assistant зберігає всі медіа-файли.

- Якщо ви використовуєте HAOS або попередньо встановлене зображення, ваш Home Assistant **вже має папку Media**.
- Якщо ви використовуєте Home Assistant Core, вам слід перейти до папки `.homeassistant` і створити в ній папку `media`.
- Якщо ви використовуєте Home Assistant Docker, додайте рядок ` -v /ШЛЯХ_ДО_ВАШОГО_МЕДІА:/media \` до команди Docker.

Щоб перевірити, що все налаштовано правильно, перейдіть на вкладку “Media” -> “local media” в своєму Home Assistant. 
Ви повинні побачити порожню папку (без помилок):

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## Виклик сервісу

Щоб надіслати відео на Robonomics, вам слід викликати спеціальний сервіс в Home Assistant. 
У цій статті це робиться вручну, але ви можете створити для цього автоматизацію.

Для цього перейдіть до "Developer tools" -> "Services" та знайдіть "Robonomics: Save recording to Robonomics ".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

У "Цілі" виберіть сутність вашої камери.
У "Шляху для збереження запису" ви повинні вказати абсолютний шлях до папки,
де Home Assistant може зберігати відео:
- Для попередньо встановленого зображення - `/home/homeassistant/.homeassistant/media`;
- Для HA OS або Home Assistant Docker- `/media`;
- Для Home Assistant Core - Шлях до раніше створеної папки media.

Крім того, ви можете вибрати тривалість запису. 

Заповніть дані та викличте сервіс за допомогою кнопки "CALL SERVICE".

## DAPP

Щоб переглянути отримане відео, перейдіть до [Robonomics DAPP](https://vol4tim.github.io/videostream/).

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

Вставте адресу вашого контролера та натисніть кнопку нижче. Зачекайте процесу "Search for Twins". 
В результаті ви отримаєте IPFS CID з усіма записаними відео.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

Далі виберіть обліковий запис контролера (або будь-який інший) зі списку та підпишіть повідомлення для авторизації в
веб-порталі Web3 IPFS для завантаження всіх відео. В результаті ви отримаєте всі відео, записані вашим розумним будинком.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

Оскільки всі відео в папці зашифровані ключем контролера, вам потрібно вставити його для розшифрування відео.
Після цього кнопка відтворення відео активується. Натисніть на неї, щоб завантажити відео.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






