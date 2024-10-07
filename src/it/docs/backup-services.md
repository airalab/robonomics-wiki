---
title: Servizi di Backup

contributors: [tubleronchik, LoSk-p]
tools:
  - Integrazione Robonomics Home Assistant 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In questo articolo, imparerai come generare backup della configurazione del tuo Home Assistant e ripristinarla quando necessario. Per creare i backup, viene chiamato un servizio che genera un archivio sicuro con i file di configurazione. Il servizio aggiunge anche la configurazione di Mosquitto brocker e Zigbee2MQTT al backup se esistono. Questo servizio aggiunge quindi l'archivio a IPFS e memorizza il CID risultante in Robonomics Digital Twin.**
## Creazione del Backup della Configurazione di Home Assistant

Creare un backup ti consente di ripristinare facilmente la configurazione del tuo Home Assistant in caso di guasto.

{% roboWikiVideo {videos:[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning", title: "ATTENZIONE"}%}Per eseguire il backup e ripristinare la tua configurazione, è necessario utilizzare un **gateway IPFS personalizzato** come Pinata. Senza di esso, il tuo backup verrà memorizzato esclusivamente sul tuo nodo IPFS locale, il che potrebbe impedirti di ripristinare la configurazione di Home Assistant in caso di guasto del nodo locale.
{% endroboWikiNote %}

1. Nell'interfaccia web di Home Assistant vai su `Strumenti per sviluppatori` -> `Servizi`. Cerca `Robonomics: Salva Backup su Robonomics` e premi `CHIAMA SERVIZIO`.

2. Attendi fino a quando non compare la notifica `Il backup è stato aggiornato in Robonomics` in `Notifiche`.


{% roboWikiNote {type: "warning", title: "ATTENZIONE"}%}Non tentare di creare un backup o ripristinare la configurazione immediatamente dopo aver caricato Home Assistant e l'Integrazione Robonomics. Si prega di **attendere circa 5 minuti** per consentire il completamento dell'installazione iniziale. {% endroboWikiNote %}

Argomenti del servizio:
- **Backup Completo**  (predefinito: Falso) - aggiunge il database al backup, quindi verrà memorizzata anche la cronologia degli stati delle entità.
- **Percorso al file di password di mosquitto** (predefinito: `/etc/m`osquitto`) - Se hai utilizzato i metodi di installazione di Home Assistant Core o Docker e non hai il percorso predefinito per il broker Mosquitto, dovresti modificare questo parametro. *Non necessario per Home Assistant OS o Superviser*.

## Ripristino della configurazione di Home Assistant da un Backup

Per ripristinare la tua configurazione, avrai bisogno di un Home Assistant installato e dell'Integrazione Robonomics.

{% roboWikiVideo {videos:[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%}Per garantire il ripristino corretto della tua configurazione nei metodi di installazione di Home Assistant Core e Docker, è necessario eseguire passaggi di configurazione aggiuntivi come descritto alla fine della pagina.
{% endroboWikiNote %}

1. Installa Home Assistant con l'Integrazione Robonomics (se non è ancora installata), seguendo i passaggi dell'articolo per il [metodo di installazione desiderato](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Configura l'Integrazione Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) utilizzando **gli stessi seed** utilizzati nella configurazione precedente di Robonomics. Se la tua sottoscrizione è scaduta, [riattivala](https://wiki.robonomics.network/docs/sub-activate).

3. Nell'interfaccia web di Home Assistant vai su `Strumenti per sviluppatori` -> `Servizi`. Cerca `Robonomics: Ripristina dal Backup in Robonomics` e premi `CHIAMA SERVIZIO`. Passa alla pagina `Panoramica` per controllare lo stato del tuo backup.

4. Dopo il ripristino, Home Assistant si riavvierà automaticamente. Se per qualche motivo Home Assistant non si riavvia, puoi controllare lo stato del ripristino monitorando lo stato dell'entità `robonomics.backup`. Se lo stato è `ripristinato`, dovrai riavviare manualmente Home Assistant navigando su `Impostazioni` > `Sistema` e cliccando sul pulsante `RIAVVIA` situato nell'angolo in alto a destra.

5. Se il tuo backup include la configurazione di Zigbee2MQTT o Mosquitto, è necessario riavviare questi servizi per abilitare la nuova configurazione. Puoi fare questomanualmente riavviando i servizi singolarmente, oppure puoi semplicemente riavviare il computer di Home Assistant per assicurarti che tutti i servizi vengano riavviati.

Argomenti del servizio:
- **Percorso del file password di mosquitto** (predefinito: `/etc/mosquitto`) - Se hai utilizzato i metodi di installazione di Home Assistant Core o Docker e non hai il percorso predefinito per il broker Mosquitto, dovresti modificare questo parametro. *Non necessario per Home Assistant OS o Superviser*.
- **Percorso della configurazione di Zigbee2MQTT** (predefinito: `/opt/zigbee2mqtt`) - Se hai utilizzato i metodi di installazione di Home Assistant Core o Docker e non hai il percorso predefinito per Zigbee2MQTT, dovresti modificare questo parametro. *Non necessario per Home Assistant OS o Superviser*.

## Ripristina la configurazione di Mosquitto e Zigbee2MQTT per il Metodo di Installazione di Home Assistant Core

Se il backup include la configurazione di Mosquitto o Zigbee2MQTT, durante il processo di ripristino, verranno collocati nel percorso predefinito o nel percorso specificato negli argomenti. Tuttavia, se hai installato l'integrazione Robonomics in un Home Assistant Core esistente *(non dall'immagine preinstallata di Robonomics)*, l'utente `homeassistant` potrebbe non avere accesso a questo percorso.

Quindi, per ripristinare la configurazione di Mosquitto e Zigbee2MQTT, è necessario concedere i permessi di lettura necessari all'utente `homeassistant`:

```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Backup della Configurazione di Mosquitto e Zigbee2MQTT per il Metodo di Installazione di Home Assistant Docker

Per eseguire il backup delle configurazioni di Mosquitto e Zigbee2MQTT da un contenitore Docker, è necessario creare volumi per le rispettive configurazioni. Ciò può essere ottenuto eseguendo il tuo contenitore Home Assistant con argomenti aggiuntivi:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PERCORSO_DEL_TUO_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

o apporta modifiche al tuo file `compose.yaml`:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
```    immagine: "ghcr.io/home-assistant/home-assistant:stable"
    volumi:
      - /PERCORSO_DEL_TUO_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    riavvia: unless-stopped
    privilegiato: true
    modalità_rete: host
```

{% roboWikiNote {type: "note", title:"Nota"}%}Si noti che i percorsi predefiniti per le configurazioni di Mosquitto e Zigbee2MQTT sono rispettivamente `/etc/mosquitto` e `/opt/zigbee2mqtt`. Tuttavia, questi percorsi possono variare a seconda della configurazione specifica.
{% endroboWikiNote %}

## Pulsanti di Backup

Oltre all'utilizzo dei servizi per lavorare con i backup, è possibile semplificare il processo utilizzando i pulsanti `button.create_backup` e `button.restore_from_backup` dell'integrazione Robonomics. Questi pulsanti richiamano i rispettivi servizi con parametri predefiniti (il pulsante di backup crea un backup senza cronologia).

{% roboWikiVideo {videos:[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Per aggiungere i pulsanti al tuo cruscotto, segui questi passaggi:

1. Fai clic sui tre puntini nell'angolo in alto a destra del cruscotto.
2. Seleziona `Modifica Cruscotto`.
3. Fai clic sul pulsante `Aggiungi Carta` nell'angolo in basso a destra.
4. Scegli la carta `Entità`.
5. Nel campo `Entità`, cerca le entità button.create_backup e button.restore_from_backup.
6. Premi `Salva` per aggiungere le entità alla carta.
7. Concludi la modifica facendo clic sul pulsante `Fatto` nell'angolo in alto a destra.