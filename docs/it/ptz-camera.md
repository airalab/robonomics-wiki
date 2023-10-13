---
title: Controllo telecamera PTZ in Home Assistant
contributors: [nakata5321]
---

Questo articolo copre il processo di configurazione di una telecamera PTZ in Home Assistant. 
Verrà utilizzato il protocollo ONVIF. Ciò richiede un account locale della telecamera.

<robo-wiki-note type="warning">
La procedura per configurare l'account locale della telecamera non è coperta da questo articolo.
</robo-wiki-note>

Requisiti:
- Telecamera PTZ
- Account locale della telecamera
- Indirizzo IP della telecamera
- Home Assistant configurato

## Integrazione ONVIF

Iniziamo con l'installazione dell'integrazione **ONVIF**. 

Vai su "Devices & Services" in "Settings" e premi il pulsante "ADD INTEGRATION".
Digita "ONVIF" e scegli l'integrazione. Vedrai la finestra successiva.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Premi il pulsante "Submit". Proverà a cercare automaticamente la tua telecamera. Se avrà successo, 
scegli la tua telecamera dalla lista e compila i campi vuoti. 
In caso contrario, dovrai compilare manualmente tutti i campi. Vedrai la seguente finestra.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Compila gli spazi vuoti:
- Name - dai un nome alla tua telecamera
- Host - fornisci l'indirizzo IP della tua telecamera
- Port - di solito è comune nel 2020, ma il tuo fornitore di telecamere potrebbe cambiarlo
- Username - scrivi un nome utente dell'account locale della tua telecamera
  - Password - scrivi una password per l'account locale della tua telecamera

e premi "Submit". Scegli un'area per la tua telecamera e clicca su "Finish".

## Aggiungi il controllo della telecamera al cruscotto

Ora che hai configurato completamente la telecamera, puoi aggiungere il suo flusso e i pulsanti di controllo al cruscotto.

Vai al cruscotto e inizia creando una nuova scheda. Scegli quella di "Picture Glance".

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Compila i dati:
- Title - scegli il titolo dell'immagine della telecamera
- Camera Entity - scegli un'entità della telecamera dal menu a discesa
- Camera View - scegli "live" per avere meno ritardo

Successivamente, passa alla modalità "Code Editor" premendo il pulsante in basso a sinistra. Vedrai il seguente codice:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Sostituisci il contenuto di `entities: []` secondo l'esempio sottostante (`<YOUR_CAMERA_ENTITY>` è lo stesso del parametro `camera_image`):

<code-helper copy>

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

</code-helper>

Questo è tutto. Ora dovresti vedere la scheda della telecamera PTZ sul cruscotto insieme ai pulsanti di controllo.

## Risoluzione dei problemi
Se stai usando Home Assistant Core e non vedi uno stream dalla telecamera, dovresti installare le integrazioni "stream" e "FFMPEG". 
Per fare ciò, devi aggiungere le stringhe `stream: ` e `ffmpeg: ` alla fine di configuration.yaml.