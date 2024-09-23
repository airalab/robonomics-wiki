---
title: Servizio Video Robonomics
contributors: [nakata5321]
---

Questo articolo mostra come aggiungere una telecamera IP a Home Assistant e inviare video al Servizio Web Robonomics.

Per collegare una telecamera a Home Assistant, è necessario conoscere il suo indirizzo IP e creare un account telecamera locale per collegarsi allo stream RTSP.

{% roboWikiNote {type: "warning"}%} Poiché questo viene fatto in modo diverso per ogni telecamera, questo processo non è considerato in questo articolo.
{% endroboWikiNote %}

Requisiti:
- Telecamera IP
- Account telecamera locale configurato
- Indirizzo IP della telecamera
- Home Assistant configurato

{% roboWikiNote {type: "warning"}%} Questo articolo presuppone che tu abbia una telecamera IP generica senza opzioni RTZ (ruota, inclina, zoom). Se hai una telecamera RTZ, controlla l'articolo ["telecamera RTZ"](docs/ptz-camera). E poi torna al secondo passaggio qui. {% endroboWikiNote %}

## Collegare la Telecamera

Innanzitutto, è necessario scoprire l'URL per lo stream RTSP della telecamera.
Per farlo, prova a inserire la seguente query su Internet: "<NOME_TELECAMERA> stream RTSP".
L'URL dello stream deve iniziare con `rtsp://<Indirizzo_IP>...`.

Questo articolo utilizza una telecamera "Tapo" e il percorso dello stream è `rtsp://<Indirizzo_IP>/stream1`.

Apri Home Assistant e vai su "Impostazioni"-> "Dispositivi e Servizi". Premi il pulsante "AGGIUNGI INTEGRAZIONE" e
inizia a digitare "Integrazione Telecamera Generica". Sceglila.

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

Nella finestra di configurazione fornisci le seguenti informazioni:
- URL Sorgente Stream - L'URL dello stream RTSP della telecamera
- Nome utente - scrivi un nome utente del tuo account telecamera locale
- Password - scrivi una password per il tuo account telecamera locale

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

Scorri verso il basso nelle impostazioni e premi il pulsante "Invia".

Nella finestra Anteprima attiva la casella di controllo "Questa immagine sembra buona." e premi il pulsante "Invia". Poi - "Fine".

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"} %}{% endroboWikiPicture %}

### Aggiungi alla Dashboard

Inoltre, puoi aggiungere lo stream alla tua dashboard. Per farlo, vai alla dashboard e crea una nuova scheda "Picture Glance". Passaggi successivi:
- inserisci il "Titolo" desiderato
- elimina i dati dal "Percorso immagine"
- seleziona la fotocamera in "Entità fotocamera"
- nella "Vista fotocamera", seleziona "live" in modo che ci sia meno ritardo

E salvalo.
{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}

## Controlla la cartella dei media

Prima di essere inviato al Servizio Video Robonomics, il video deve essere salvato in una cartella e Home Assistant deve avere accesso a questa cartella.
La soluzione più semplice in questo caso è utilizzare un pacchetto multimediale, in cui Home Assistant memorizza tutti i media.

- Se usi HAOS o un'immagine preinstallata, il tuo Home Assistant **ha già una cartella Media**.
- Se usi Home Assistant Core, dovresti andare nella cartella `.homeassistant` e crearvi una cartella `media`.
- Se usi Home Assistant Docker, aggiungi la riga ` -v /PERCORSO_DEI_TUOI_MEDIA:/media \` al comando Docker.

Per verificare che tutto sia stato configurato correttamente, vai alla scheda "Media" -> "media locali" nel tuo Home Assistant.
Dovresti vedere una cartella vuota (nessun errore):

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## Chiamata di Servizio

Per inviare un video a Robonomics, devi chiamare un servizio dedicato in Home Assistant.
In questo articolo viene fatto manualmente, ma puoi creare un'automazione per farlo.

Per farlo, vai su "Strumenti sviluppatore" -> "Servizi" e trova "Robonomics: Salva registrazione su Robonomics".

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

Nei "Target" scegli la tua entità fotocamera.
Nel "Percorso per salvare la registrazione" dovresti fornire un percorso assoluto alla cartella, dove Home Assistant può salvare il video:
- Per l'immagine preinstallata - `/home/homeassistant/.homeassistant/media`;
- Per HA OS o Home Assistant Docker - `/media`- Per Home Assistant Core - Percorso alla cartella multimediale creata in precedenza.

Inoltre, puoi scegliere la Durata della registrazione.

Compila i dati e chiama il servizio con il pulsante "CHIAMA SERVIZIO".

## DAPP

Per visualizzare il video risultante vai a [Robonomics DAPP](https://vol4tim.github.io/videostream/).

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

Incolla l'indirizzo del tuo account controller e clicca sul pulsante sottostante. Attendi il processo "Ricerca dei gemelli".
Come risultato, otterrai un CID IPFS con tutti i video registrati.

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

Successivamente, seleziona l'account controller (o un altro) dalla lista a discesa e firma un messaggio per l'autorizzazione nel
gateway Web3 IPFS per scaricare tutti i video. Come risultato, otterrai tutti i video registrati dalla tua casa intelligente.

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

Poiché tutti i video nella cartella sono criptati con la chiave del controller, è necessario inserirla per decodificare i video.
Dopo di che, il pulsante di riproduzione video viene attivato. Clicca su di esso per scaricare il video.

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}