---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**In questo articolo configurerai Robonomics SLS Gateway. Installerai il software richiesto per il gateway, lo configurerai e lo collegherai a Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Firmware

Prima di tutto devi installare il firmware del microcontrollore del gateway. Prepara il gateway impostando gli interruttori `1` e `3` nella parte inferiore del SLS Gateway su `ON`, gli altri devono essere `OFF`.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

Collega il gateway al tuo Raspberry Pi tramite la porta USB di tipo C sul gateway.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Clona il repository con il firmware sul tuo Raspberry Pi:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

Vai a `robonomics-hass-utils/esp_firmware/linux`. Per flashare il gateway SLS devi eseguire gli script `Clear` e `Flash_16mb`.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### Risoluzione dei problemi

Se riscontri problemi nell'aggiornamento del firmware del gateway, devi seguire ulteriori passaggi:

1. Assicurati di avere installato il modulo pySerial:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. Concedi all'utente i diritti di accesso alla porta USB e riavvia il computer:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. In alcuni casi, è necessario modificare l'impostazione della larghezza di banda nello script per aggiornare il firmware. Apri lo script `Flash_16mb.sh` con l'editor `nano` e cambia il parametro baud da `921600` a un valore più piccolo (ad esempio, `115200`).

## Configurazione

1. Scollega il SLS Gateway dal computer. Imposta gli interruttori sul retro del gateway nella posizione corretta. Gli interruttori `5` (RX Zigbee a ESP) e `6` (TX Zigbee a ESP) devono essere nella posizione `ON`, gli altri devono essere `OFF`. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Collega il cavo di alimentazione di tipo C. La luce indicatrice al centro dovrebbe diventare verde.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. Al primo avvio, il gateway inizierà a condividere il Wi-Fi con l'SSID `zgw****`. Connettiti a questa rete. Tieni presente che il segnale potrebbe essere piuttosto debole, quindi è meglio tenere il gateway SLS più vicino al tuo computer. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. Se la connessione è riuscita, si aprirà l'interfaccia web (o puoi trovarla all'indirizzo 192.168.1.1). 

5. Vedrai la pagina `Wi-Fi Settings`. Seleziona la tua rete Wi-Fi e inserisci la password. Premi il pulsante `Apply`. Il gateway si riavvierà e si collegherà alla tua rete Wi-Fi. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. Trova l'IP locale del gateway SLS per accedere all'interfaccia web. Per trovarlo puoi utilizzare [l'app mobile Fing](https://www.fing.com/products) o [lo strumento CLI nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Il nome del gateway dovrebbe essere simile a questo: `zgw****`. Apri l'interfaccia web del gateway incollando l'IP del gateway nel browser.

7. Vai a `Setting` -> `Hardware` e assicurati che le impostazioni siano simili all'immagine. Correggi le impostazioni se necessario e clicca sul pulsante `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

La tabella con i valori richiesti:

| Field                    | Value              |
|--------------------------|:-------------------|
| Zigbee module            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST Pin           | 18                 |
| Zigbee BSL Pin           | 19                 |
| Service Button Pin       | 33 (pullUP - true) |
| Number addressable leds  | 0                  |
| Led Red (or addr)        | 21                 |
| Led Green                | 5                  |
| Led Blue                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Riavvia quindi il gateway. Scegli `Actions` -> `Reboot system` nell'angolo in alto a destra.

9. Assicurati che il gateway funzioni correttamente nella finestra delle informazioni Zigbee. Lo stato del dispositivo dovrebbe essere `OK`.

10. Configura l'aggiunta automatica dei dispositivi a Home Assistant. Vai a `Zigbee` -> `Config` quindi scegli `Home Assistant MQTT Discovery` e `Clear States`. Salva le modifiche e **riavvia** il gateway SLS.

<robo-wiki-note type="warning">

Se hai già un gateway SLS attivo nella tua casa e stai configurando un altro, entreranno in conflitto tra loro. Per risolvere questo problema devi cambiare il canale sul nuovo dispositivo. Per farlo, vai a `Zigbee` -> `Config` e cambia il canale con un altro (ad esempio, canale 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## Associazione SLS a MQTT

Dopo aver configurato il gateway SLS, devi collegare il gateway SLS a Home Assistant. Apri l'interfaccia web del gateway SLS e vai a `Settings/Link` -> `MQTT Setup`:


Aggiungi l'indirizzo del tuo broker (indirizzo del Raspberry Pi con Home Assistant nella rete locale, puoi trovarlo con [l'app mobile Fing](https://www.fing.com/products) o [lo strumento CLI nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), la porta (predefinita è `1883`), il nome utente e la password del broker (che hai creato in precedenza) e il nome dell'argomento (puoi scegliere qualsiasi). Inoltre, l'indirizzo IP del Raspberry Pi deve essere statico. Fai clic su `Enable` e `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

Salva le modifiche. Ora i dispositivi verranno mostrati automaticamente in Home Assistant.

## Collega i dispositivi

Collega i tuoi dispositivi andando su `Zigbee` -> `Join`. Metti i tuoi sensori in modalità di accoppiamento, il modo più comune per passare a modalità di connessione è tenere premuto il pulsante di accensione o accenderli/spegnere per 5 volte. Premi il pulsante `Enable Join` per iniziare la ricerca dei dispositivi Zigbee. Vedrai i sensori attivi.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


Ora puoi andare alla sezione [**Sottoscrizione IoT**](/docs/sub-activate) e iniziare ad attivare la sottoscrizione Robonomics.
