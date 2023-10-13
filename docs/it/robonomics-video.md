---
title: Servizio video Robonomics
contributors: [nakata5321]
---

Questo articolo mostra come aggiungere una telecamera IP a Home Assistant e inviare video al servizio web Robonomics.

Per collegare una telecamera a Home Assistant, è necessario conoscere il suo indirizzo IP e creare un account di telecamera locale per connettersi allo stream RTSP.

<robo-wiki-note type="warning">
Poiché questo viene fatto in modo diverso per ogni telecamera, questo processo non è considerato in questo articolo.
</robo-wiki-note>

Requisiti:
- Telecamera IP
- Account di telecamera locale configurato
- Indirizzo IP della telecamera
- Home Assistant configurato

<robo-wiki-note type="note">

Questo articolo assume che tu abbia una telecamera IP generale senza opzioni RTZ (ruota, inclina, zoom). 
Se hai una telecamera RTZ, controlla l'articolo "Telecamera RTZ". E poi torna al secondo passaggio qui.

</robo-wiki-note>

## Collega la telecamera

Innanzitutto, devi trovare l'URL per lo streaming RTSP della telecamera.
Per farlo, prova a inserire la seguente query su Internet: "<NOME_TELECAMERA> flusso RTSP".
L'URL dello stream deve iniziare con `rtsp://<INDIRIZZO_IP>...`. 

Questo articolo utilizza una telecamera "Tapo" e il percorso dello stream è `rtsp://<INDIRIZZO_IP>/stream1`.

Apri Home Assistant e vai su "Settings"-> "Devices & Services". Premi il pulsante "ADD INTEGRATION" e
inizia a digitare "Generic Camera". Sceglila.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

Nella finestra di configurazione fornisci le seguenti informazioni:
- Stream Source URL - L'URL dello stream RTSP della telecamera
- Username - scrivi un nome utente del tuo account di telecamera locale
- Password - scrivi una password per il tuo account di telecamera locale

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

Scorri verso il basso le impostazioni e premi il pulsante "Submit".

Nella finestra di anteprima attiva la casella di controllo "This image looks good." e premi il pulsante "Submit". Poi - "Finish".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### Aggiungi al dashboard

Inoltre, puoi aggiungere lo stream al tuo dashboard. Per farlo, vai al dashboard e crea una nuova scheda 
"Picture Glance". Passaggi successivi:
- inserisci il "Title" desiderato
- elimina i dati da "Image Path"
- seleziona the camera in "Camera Entity"
- nella "Camera View", seleziona "live" in modo che ci sia meno ritardo

E salvalo.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## Controlla la cartella dei media

Before being sent to the Robonomics Video Service, the video must be saved in a folder, and Home Assistant must have access to this folder. 
La soluzione più semplice in questo caso è utilizzare un pacchetto multimediale, in cui Home Assistant memorizza tutti i media.

- Se usi HAOS o un'immagine preinstallata, il tuo Home Assistant **ha già una cartella Media**.
- Se usi Home Assistant Core, dovresti andare nella cartella `.homeassistant` e creare una cartella `media` al suo interno.
- Se usi Home Assistant Docker, aggiungi la riga ` -v /PERCORSO_DEL_TUO_MEDIA:/media \` al comando Docker.

Per verificare che tutto sia stato configurato correttamente, vai alla scheda "Media" -> "media locale" nel tuo Home Assistant. 
Dovresti vedere una cartella vuota (nessun errore):

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## Chiamata di servizio

Per inviare un video a Robonomics, devi chiamare un servizio dedicato in Home Assistant. 
In questo articolo viene fatto manualmente, ma puoi crearne un'automazione.

Per farlo, vai su  "Developer tools" -> "Services" e trova "Robonomics: Save recording to Robonomics ".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

In "Targets" scegli l'entità della tua telecamera.
In "Path to save the recording" devi fornire un percorso assoluto alla cartella,
dove Home Assistant può salvare il video:
- Per immagine preinstallata - `/home/homeassistant/.homeassistant/media`;
- Per HA OS o Home Assistant Docker- `/media`;
- Per Home Assistant Core - Percorso alla cartella dei media precedentemente creata.

Inoltre, puoi scegliere la Durata della registrazione. 

Compila i dati e chiama il servizio con il pulsante "CALL SERVICE".

## DAPP

Per visualizzare il video risultante vai su [Robonomics DAPP](https://vol4tim.github.io/videostream/).

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

Incolla l'indirizzo del tuo account del controller e clicca sul pulsante sottostante. Aspetta il processo "Search for Twins". 
Come risultato, otterrai un CID IPFS con tutti i video registrati.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

Successivamente, seleziona l'account del controller (o un altro) dall'elenco a discesa e firma un messaggio per l'autorizzazione in
il gateway Web3 IPFS per scaricare tutti i video. Come risultato, otterrai tutti i video registrati dalla tua smart home.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

Poiché tutti i video nella cartella sono criptati con la chiave del controller, è necessario inserirla per decrittare i video.
Dopo ciò, il pulsante di riproduzione del video viene attivato. Cliccaci sopra per scaricare il video.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






