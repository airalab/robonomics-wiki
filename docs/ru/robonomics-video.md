---
title: Robonomics Video Service
contributors: [nakata5321]
---

В этой статье показано, как добавить IP-камеру в Home Assistant и отправить видео на Robonomics Web Service.

Чтобы подключить камеру к Home Assistant, вам нужно знать ее IP-адрес и создать локальную учетную запись камеры для подключения к потоку RTSP.

<robo-wiki-note type="warning">
Поскольку это делается по-разному для каждой камеры, этот процесс не рассматривается в данной статье.
</robo-wiki-note>

Требования:
- IP-камера
- Настроенная локальная учетная запись камеры
- IP-адрес камеры
- Настроенный Home Assistant

<robo-wiki-note type="note">

В этой статье предполагается, что у вас есть обычная IP-камера без опций RTZ (поворот, наклон, масштабирование). 
Если у вас есть камера RTZ, проверьте статью ["Камера RTZ"](/docs/ptz-camera). А затем вернитесь ко второму шагу здесь.

</robo-wiki-note>

## Подключите камеру

First, you need to find out the URL for the RTSP stream of the camera. 
Для этого попробуйте ввести следующий запрос в Интернете: "<ИМЯ_КАМЕРЫ> RTSP-поток".
URL потока должен начинаться с `rtsp://<IP_Адрес>...`. 

В этой статье используется камера "Tapo", а путь потока - `rtsp://<IP_Адрес>/stream1`.

Откройте Home Assistant и перейдите в "Settings"-> "Devices & Services". Нажмите кнопку "ADD INTEGRATION"  и
начните вводить "Generic Camera". Выберите его.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

В окне конфигурации предоставьте следующую информацию:
- Stream Source URL - URL потока RTSP камеры
- Username - введите имя пользователя вашей локальной учетной записи камеры
- Password - введите пароль для вашей локальной учетной записи камеры

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

Прокрутите вниз настройки и нажмите кнопку "Submit".

В окне предварительного просмотра активируйте флажок "This image looks good." и нажмите кнопку "Submit". Затем - "Finish".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### Добавьте на панель управления

Кроме того, вы можете добавить поток на свою панель управления. Для этого перейдите на панель управления и создайте новую карту 
"Picture Glance". Дальнейшие шаги:
- введите желаемый "Title"
- удалите данные из "Image Path"
- выберите камеру в "Camera Entity"
- в "Camera View" выберите "live", чтобы уменьшить задержку

И сохраните его.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## Проверьте папку медиафайлов

Прежде чем отправить видео на Robonomics Video Service, видео должно быть сохранено в папке, и Home Assistant должен иметь доступ к этой папке. 
Самый простой вариант в этом случае - использовать медиапак, в котором Home Assistant хранит все медиафайлы.

- Если вы используете HAOS или предустановленное изображение, ваш Home Assistant **уже имеет папку Media**.
- Если вы используете Core Home Assistant, вам следует перейти в папку `.homeassistant` и создать в ней папку `media`.
- Если вы используете Home Assistant Docker, добавьте строку ` -v /ПУТЬ_К_ВАШИМ_МЕДИА:/media \` в команду Docker.

Чтобы проверить, что все настроено правильно, перейдите на вкладку “Media” -> “local media” в вашем Home Assistant. 
Вы должны увидеть пустую папку (без ошибок):

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## Вызов сервиса

Чтобы отправить видео на Robonomics, вы должны вызвать специальный сервис в Home Assistant. 
В этой статье это делается вручную, но вы можете создать автоматизацию для этого.

Для этого зайдите в `Developer tools` -> «Services» и найдите "Robonomics: Save recording to Robonomics ".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

В "Targets" выберите сущность вашей камеры.
В "Path to save the recording" вы должны указать абсолютный путь к папке,
где Home Assistant может сохранить видео:
- Для предустановленного изображения - `/home/homeassistant/.homeassistant/media`;
- Для HA OS или Home Assistant Docker- `/media`;
- Для Home Assistant Core - Путь к ранее созданной папке с медиафайлами.

Кроме того, вы можете выбрать продолжительность записи. 

Заполните данные и вызовите сервис с помощью кнопки "CALL SERVICE".

## DAPP

Чтобы просмотреть полученное видео, перейдите на [Robonomics DAPP](https://vol4tim.github.io/videostream/).

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

Вставьте адрес вашего контроллера и нажмите кнопку ниже. Дождитесь процесса "Search for Twins". 
В результате вы получите IPFS CID со всеми записанными видео.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

Затем выберите учетную запись контроллера (или любую другую) из выпадающего списка и подпишите сообщение для авторизации в
веб-портале Web3 IPFS, чтобы загрузить все видео. В результате вы получите все видео, записанные вашим умным домом.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

Поскольку все видео в папке зашифрованы с помощью ключа контроллера, вам нужно вставить его для расшифровки видео.
После этого кнопка воспроизведения видео активируется. Нажмите на нее, чтобы скачать видео.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






