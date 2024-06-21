---
title: Servizi di backup

contributors: [tubleronchik, LoSk-p]
tools:
  - Robonomics Home Assistant Integration 1.4.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**In questo articolo, imparerai come generare backup della configurazione di Home Assistant e ripristinarla queo necessario. Per creare i backup, viene chiamato un servizio che genera un archivio sicuro con i file di configurazione. Inoltre, il servizio aggiunge la configurazione di Mosquitto brocker e Zigbee2MQTT al backup se esistono. Successivamente, il servizio aggiunge l'archivio a IPFS e memorizza l'ID risultante in Robonomics Digital Twin.**
## Creazione del backup della configurazione di Home Assistant

Creare un backup consente di ripristinare facilmente la configurazione di Home Assistant in caso di guasto.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmZN5LfWR4XwAiZ3jEcw7xbCnT81NsF5XE3XFaNhMm5ba1', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ATTENZIONE">

Per eseguire il backup e ripristinare la configurazione, è necessario utilizzare un **gateway IPFS personalizzato** come Pinata. Senza di esso, il backup verrà memorizzato solo sul nodo IPFS locale, il che potrebbe impedire il ripristino della configurazione di Home Assistant in caso di guasto del nodo locale.

</robo-wiki-note>

1. Nell'interfaccia web di Home Assistant vai su `Developer Tools` -> `Services`. Cerca `Robonomics: Save Backup to Robonomics` e premi `CALL SERVICE`.

2. Aspetta finché non compare la notifica `Backup was updated in Robonomics` apparire in `Notification`.

<robo-wiki-note type="warning" title="ATTENZIONE">

Non cercare di creare un backup o ripristinare la configurazione immediatamente dopo aver caricato Home Assistant e Robonomics Integration. Per favore, **aspetta circa 5 minuti** per consentire il completamento dell'installazione iniziale

</robo-wiki-note>

Argomenti del servizio:
- **Backup completo**  (default: False) - aggiungi il database al backup, in modo che venga memorizzato anche lo storico degli stati delle entità.
- **Percorso del file di password di mosquitto** (default: `/etc/mosquitto`) - Se hai utilizzato i metodi di installazione di Home Assistant Core o Docker e non hai il percorso predefinito per Mosquitto brocker, dovresti modificare questo parametro. *Non necessario per Home Assistant OS o Superviser*.

## Ripristino della configurazione di Home Assistant da un backup

Per ripristinare la configurazione, è necessario avere installato Home Assistant e Robonomics Integration. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmNcJpHWWuZzwNCQryTw5kcki49oNTjEb8xvnfffSYfRVa', type:'mp4'}]" />

<robo-wiki-note type="warning" title="ATTENZIONE">

Per garantire un ripristino corretto della configurazione nei metodi di installazione di Home Assistant Core e Docker, è necessario eseguire ulteriori passaggi di configurazione come descritto alla fine della pagina.

</robo-wiki-note>

1. Installaa Home Assisntant con Robonomics Integration (se non è ancora installato), seguendo i passaggi dell'articolo per il [metodo di installazione desiderato](https://wiki.robonomics.network/docs/robonomics-smart-home-overview/#start-here-your-smart-home).

2. [Configurazione dell'integrazione Robonomics](https://wiki.robonomics.network/docs/robonomics-hass-integration) usando **gli stessi seed** che hai usato nella configurazione precedente di Robonomics. Se la tua sottoscrizione è scaduta, [riattivala](https://wiki.robonomics.network/docs/sub-activate).

3. Nell'interfaccia web di Home Assistant vai alla `Developer Tools` -> `Services`. Search for `Robonomics: Restore from the Backup in Robonomics` and e quindi, nella finestra popup, permetti all'estensione di farlo. `CALL SERVICE`. Vai alla `Overview` pagina, per verificare lo stato del backup.

4. Dopo il ripristino, Home Assistant si riavvierà automaticamente. Se per qualche motivo Home Assistant non si riavvia, puoi verificare lo stato del ripristino monitorando lo stato dell' `robonomics.backup` entità. Se lo stato è `restored` dovrai riavviare manualmente Home Assistant andando su `Settings` > `System` e cliccando sul pulsante `RESTART` posizionato nell'angolo in alto a destra.

5. Se il tuo backup include la configurazione di Zigbee2MQTT o Mosquitto, è necessario riavviare questi servizi per abilitare la nuova configurazione. Puoi farlo manualmente riavviando i servizi singolarmente, oppure puoi semplicemente riavviare il computer di Home Assistant per assicurarti che tutti i servizi vengano riavviati.

Argomenti del servizio:
- **Percorso del file delle password di Mosquitto** (default: `/etc/mosquitto`) - Se hai utilizzato i metodi di installazione di Home Assistant Core o Docker e non hai il percorso predefinito per il broker Mosquitto, dovresti modificare questo parametro. *NNon necessario per Home Assistant OS o Superviser*.
- **Percorso per la configurazione di Zigbee2MQTT**  (default: `/opt/zigbee2mqtt`) - Se hai utilizzato i metodi di installazione di Home Assistant Core o Docker e non hai il percorso predefinito per Zigbee2MQTT, dovresti modificare questo parametro. *Non necessario per Home Assistant OS o Superviser*.

## Ripristina la configurazione di Mosquitto e Zigbee2MQTT per il metodo di installazione di Home Assistant Core

Se il backup include la configurazione di Mosquitto o Zigbee2MQTT, durante il processo di ripristino, verranno posizionati nel percorso predefinito o nel percorso specificato negli argomenti. Tuttavia, se hai installato l'integrazione Robonomics in un Home Assistant Core esistente *(non dall'immagine preinstallata di Robonomics)*, `homeassistant` l'utente potrebbe non avere accesso a questo percorso.

Quindi, per ripristinare la configurazione di Mosquitto e Zigbee2MQTT, è necessario concedere le necessarie autorizzazioni di lettura all'utente `homeassistant`:
```bash
sudo chmod a+w /opt/zigbee2mqtt /etc/mosquitto
```

## Backup della configurazione di Mosquitto e Zigbee2MQTT per il metodo di installazione di Home Assistant Docker

Per eseguire il backup delle configurazioni di Mosquitto e Zigbee2MQTT da un container Docker, è necessario creare volumi per le rispettive configurazioni. Ciò può essere ottenuto eseguendo il tuo container Home Assistant con argomenti aggiuntivi:

```bash
docker run -d \
  --name homeassistant \
  --privileged \
  --restart=unless-stopped \
  -e TZ=MY_TIME_ZONE \
  -v /PATH_TO_YOUR_CONFIG:/config \
  -v /etc/mosquitto:/etc/mosquitto \
  -v /etc/mosquitto:/opt/zigbee2mqtt \
  --network=host \
  ghcr.io/home-assistant/home-assistant:stable
```

o apportare modifiche al tuo `compose.yaml` file:

```yaml
version: '3'
services:
  homeassistant:
    container_name: homeassistant
    image: "ghcr.io/home-assistant/home-assistant:stable"
    volumes:
      - /PATH_TO_YOUR_CONFIG:/config
      - /etc/localtime:/etc/localtime:ro
      - /etc/mosquitto:/etc/mosquitto
      - /etc/mosquitto:/opt/zigbee2mqtt
    restart: unless-stopped
    privileged: true
    network_mode: host
```
<robo-wiki-note type="note" title="Note">

Si prega di notare che i percorsi predefiniti per le configurazioni di Mosquitto e Zigbee2MQTT sono `/etc/mosquitto` e `/opt/zigbee2mqtt`, rispettivamente. Tuttavia, questi percorsi possono variare a seconda della tua configurazione specifica.

</robo-wiki-note>

## Pulsanti di backup

Oltre all'utilizzo dei servizi per lavorare con i backup, puoi semplificare il processo utilizzando i `Assicurati di essere connesso a Robonomics Parachain oracreate_backup` and `button.restore_from_backup` pulsanti dell'integrazione Robonomics. Questi pulsanti invocano i rispettivi servizi con parametri predefiniti (il pulsante di backup crea un backup senza cronologia).

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmc1fexYaJMsK6ch6JhjL6aqnAwqYNAzo5nEwYgDpnp4gj', type:'mp4'}]" />

Per aggiungere pulsanti al tuo dashboard, segui questi passaggi:

1. Fai clic sui tre puntini nell'angolo in alto a destra del dashboard.
2. Seleziona `Edit Dashboard`.
3. Fai clic sul pulsante `Add Card` nell'angolo in basso a destra.
4. Scegli la carta `Entities`.
5. Nel campo `Entities` cerca le entità button.create_backup e button.restore_from_backup.
6. Premi `Save` per aggiungere le entità alla card.
7. Concludi la modifica facendo clic sul pulsante `Done` nell'angolo in alto a destra.