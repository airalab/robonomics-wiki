---
title: Gateway Robonomics SLS

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - Firmware SLS 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**In questo articolo imposterai il Gateway Robonomics SLS. Installerai il software richiesto per il gateway, lo configurerai e lo collegherai a Home Assistant.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## Firmware

Prima di tutto devi installare il firmware del microcontrollore del gateway. Prepara il gateway impostando gli switch `1` e `3` nella parte inferiore del Gateway SLS su `ON`, gli altri devono essere su `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

Collega il gateway al tuo Raspberry Pi tramite la porta USB di tipo C sul gateway.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Clona il repository con il firmware sul tuo Raspberry Pi:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

Vai a `robonomics-hass-utils/esp_firmware/linux`. Per flashare il gateway SLS, devi eseguire gli script `Clear` e `Flash_16mb`.

{% codeHelper { additionalLine: "nome_utente_rasppi@nome_host_rasppi"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Risoluzione dei problemi

Se riscontri problemi nell'aggiornare il firmware del gateway, devi seguire ulteriori passaggi:

1. Assicurati di avere installato il modulo pySerial:

{% codeHelper { additionalLine: "nome_utente_rasppi@nome_host_rasppi"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Concedi al tuo utente i diritti di accesso alla porta USB e riavvia il computer:

{% codeHelper { additionalLine: "nome_utente_rasppi@nome_host_rasppi"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. In alcuni casi, è necessario modificare l'impostazione della larghezza di banda nello script per aggiornare il firmware. Apri lo script `Flash_16mb.sh` con l'editor `nano` eModifica il parametro baud da `921600` a un valore più piccolo (ad esempio, `115200`).

## Configurazione

1. Scollega il Gateway SLS dal computer. Imposta gli interruttori sul retro del gateway nella posizione corretta. Gli interruttori `5` (RX Zigbee a ESP) e `6` (TX Zigbee a ESP) devono essere nella posizione `ON`, gli altri devono essere `OFF`.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Collega il cavo di alimentazione di tipo C. La luce indicatrice al centro dovrebbe diventare verde.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. Al primo avvio, il gateway inizierà a condividere il Wi-Fi con l'SSID `zgw****`. Connettiti a questa rete. Tieni presente che il segnale potrebbe essere piuttosto debole, quindi è meglio tenere il Gateway SLS più vicino al tuo computer.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. Se la connessione ha successo, si aprirà l'interfaccia web (o puoi trovarla su 192.168.1.1 indirizzo).

5. Vedrai la pagina `Impostazioni Wi-Fi`. Seleziona il tuo Wi-Fi e inserisci la password. Premi il pulsante `Applica`. Il gateway si riavvierà e si connetterà alla tua rete Wi-Fi.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Trova l'IP locale del gateway SLS per accedere all'interfaccia web. Per trovarlo puoi utilizzare l'app mobile [Fing](https://www.fing.com/products) o lo strumento CLI [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/). Il nome del gateway dovrebbe assomigliare a questo: `zgw****`. Apri l'interfaccia web del gateway incollando l'IP del gateway in un browser.

7. Vai su `Impostazioni` -> `Hardware` e assicurati che le impostazioni siano come nell'immagine. Correggi le impostazioni se necessario e clicca su `Salva`: 

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

La tabella con i valori richiesti:

| Campo                    | Valore             |
|--------------------------|:-------------------|
| Modulo Zigbee            | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Pin di reset Zigbee      | 18                 |
| Pin BSL Zigbee           | 19                 |
| Pin del pulsante di servizio | 33 (pullUP - true) |
| Numero di led indirizzabili | 0                |
| Led Rosso (o addr)       | 21                 |
| Led Verde                | 5                  |
| Led Blu                  | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Riavviare quindi il gateway. Scegliere `Azioni` -> `Riavvia sistema` nell'angolo in alto a destra.

9. Assicurarsi che il gateway funzioni correttamente nella finestra delle informazioni Zigbee. Lo stato del dispositivo dovrebbe essere `OK`.

10. Configurare l'aggiunta automatica dei dispositivi a Home Assistant. Andare su `Zigbee` -> `Configurazione`, quindi scegliere `Scoperta MQTT di Home Assistant` e `Cancella stati`. Salvare le modifiche e riavviare nuovamente il gateway SLS.

{% roboWikiNote {type: "warning"}%} Se hai già un gateway SLS attivo in casa tua e stai configurando un altrouno, allora entreranno in conflitto tra loro. Per risolvere questo problema è necessario cambiare il canale sul nuovo dispositivo. Per farlo, vai su `Zigbee` -> `Config` e cambia il canale con un altro (ad esempio, canale 15). {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZn', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

## Abbinamento SLS a MQTT

Dopo aver configurato il Gateway SLS, è necessario collegare il Gateway SLS a Home Assistant. Apri l'interfaccia web del Gateway SLS e vai su `Impostazioni/Collegamento` -> `Configurazione MQTT`:


Aggiungi l'indirizzo del tuo broker (indirizzo del Raspberry Pi con Home Assistant nella rete locale, puoi trovarlo con [Fing mobile app](https://www.fing.com/products) o [nmap CLI tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/)), la porta (di default è `1883`), il nome utente e la password del tuo broker (che hai creato in precedenza) e il nome del topic (puoi sceglierne uno qualsiasi). Inoltre, l'indirizzo IP del Raspberry Pi deve essere statico. Clicca su `Abilita` e `Mantieni stati`Salva le modifiche. Ora i dispositivi verranno mostrati automaticamente in Home Assistant.

## Collega i Dispositivi

Collega i tuoi dispositivi andando su `Zigbee` -> `Unisciti`. Metti i tuoi sensori in modalità di accoppiamento, il modo più comune per passare un dispositivo alla modalità di connessione è tenere premuto il suo pulsante di accensione o accenderli/spegnere per 5 volte. Premi il pulsante `Abilita Unione` per iniziare la ricerca dei dispositivi Zigbee. Vedrai i sensori attivi.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Ora puoi andare alla sezione [**Abbonamento IoT**](/docs/sub-activate) e iniziare ad attivare l'abbonamento a Robonomics.