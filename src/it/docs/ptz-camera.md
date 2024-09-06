---
title: Controllo della telecamera PTZ in Home Assistant
contributors: [nakata5321]
---

Questo articolo copre il processo di configurazione di una telecamera PTZ in Home Assistant.
Verrà utilizzato il protocollo ONVIF. Questo richiede un account telecamera locale.

{% roboWikiNote {title:"test", type: "warning"}%} Il processo di configurazione dell'account telecamera locale non è coperto in questo articolo.
{% endroboWikiNote %}


Requisiti:
- Telecamera PTZ
- Account telecamera locale
- Indirizzo IP della telecamera
- Home Assistant configurato

## Integrazione ONVIF

Iniziamo con l'installazione dell'**integrazione ONVIF**.

Vai su "Dispositivi e Servizi" in "Impostazioni" e premi il pulsante "AGGIUNGI INTEGRAZIONE".
Digita "ONVIF" e scegli l'integrazione. Vedrai la finestra successiva.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"onvif setup"} %}{% endroboWikiPicture %}

Premi il pulsante "Invia". Proverà a cercare automaticamente la tua telecamera. Se avrà successo,
scegli la tua telecamera dalla lista e completa i campi vuoti.
In caso contrario, dovrai compilare manualmente tutti i campi. Vedrai la seguente finestra.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"onvif config"} %}{% endroboWikiPicture %}

Completa i campi:
- Nome - assegna un nome alla tua telecamera
- Host - fornisci l'indirizzo IP della tua telecamera
- Porta - di solito è comune 2020, ma il fornitore della tua telecamera potrebbe cambiarlo
- Nome utente - scrivi un nome utente del tuo account telecamera locale
  - Password - scrivi una password per il tuo account telecamera locale

e premi "Invia". Scegli un'Area per la tua telecamera e clicca su "Fine".

## Aggiungi il controllo della telecamera al cruscotto

Ora che hai configurato completamente la telecamera, puoi aggiungere il suo flusso e i pulsanti di controllo al cruscotto.

Vai al cruscotto e inizia creando una nuova scheda. Scegli quella "Panoramica Immagine".

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"glance"} %}{% endroboWikiPicture %}

Completa i dati:
- Titolo - scegli il titolo dell'immagine della telecamera
- Entità Telecamera - scegli un'entità telecamera dal menu a discesa
- Vista Telecamera - scegli "live" per avere meno ritardo

Successivamente, passa alla modalità "Editor di Codice" premendo il pulsante in basso a sinistra. Vedrai il seguente codice:
```shell
camera_view: live
type: picture-glance
title: Cucina
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Sostituisci il contenuto di `entities: []` secondo l'esempio qui sotto (`<YOUR_CAMERA_ENTITY>` è lo stesso del parametro `camera_image`):

{% codeHelper { copy: true}%}

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: SINISTRA
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Panoramica Sinistra
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: SU
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Inclinazione Su
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: GIÙ
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Inclinazione Giù
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: DESTRA
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Panoramica Destra
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

Questo è tutto. Ora dovresti vedere la scheda della telecamera PTZ sul cruscotto insieme ai pulsanti di controllo.

## Risoluzione dei problemi
Se stai utilizzando Home Assistant Core e non vedi uno streaming dalla telecamera, dovresti installare le integrazioni "stream" e "FFMPEG".
Per farlo, dovresti aggiungere le stringhe `stream: ` e `ffmpeg: ` alla fine di configuration.yaml.