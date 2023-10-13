---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**In diesem Artikel richten Sie das Robonomics SLS Gateway ein. Sie installieren die erforderliche Software für das Gateway, konfigurieren es und verbinden es mit Home Assistant.**

<robo-wiki-picture src="home-assistant/sls_gateway.png" />

## Firmware

Zuerst müssen Sie die Mikrocontroller-Firmware des Gateways installieren. Bereiten Sie das Gateway vor, indem Sie die Schalter `1` und `3` im unteren Teil des SLS Gateways auf `ON` stellen, die anderen müssen `OFF` sein.

<robo-wiki-picture src="home-assistant/sls-gateway-13.gif" />

Verbinden Sie das Gateway über den USB-Typ-C-Anschluss am Gateway mit Ihrem Raspberry Pi.

<robo-wiki-picture src="home-assistant/sls-rpi.gif" />

Klonen Sie das Repository mit der Firmware auf Ihren Raspberry Pi:

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

</code-helper>

Gehen Sie zu `robonomics-hass-utils/esp_firmware/linux`. Um das SLS Gateway zu flashen, müssen Sie die Skripte `Clear` und `Flash_16mb` ausführen.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

</code-helper>

### Fehlerbehebung

Wenn Sie Probleme beim Aktualisieren der Gateway-Firmware haben, müssen Sie zusätzliche Schritte unternehmen:

1. Stellen Sie sicher, dass das pySerial-Modul installiert ist.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
pip install pyserial
```
</code-helper>

2. Geben Sie Ihrem Benutzer Zugriffsrechte auf den USB-Port und starten Sie den Computer neu.

<code-helper additionalLine="rasppi_username@rasppi_hostname">

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```
</code-helper>

3. In einigen Fällen ist es erforderlich, die Bandbreiteneinstellung im Skript zu ändern, um die Firmware zu aktualisieren. Öffnen Sie das Skript `Flash_16mb.sh` mit dem Editor `nano` und ändern Sie den Baud-Parameter von `921600` auf einen kleineren Wert (z. B. `115200`).

## Konfiguration

1. Trennen Sie das SLS Gateway vom Computer. Stellen Sie die Schalter auf der Rückseite des Gateways in die richtige Position. Schalter `5` (RX Zigbee zu ESP) und `6` (TX Zigbee zu ESP) müssen sich in der Position `ON` befinden, die anderen müssen `OFF` sein. 

<robo-wiki-picture src="home-assistant/sls-gateway-56.gif" />

2. Schließen Sie das Typ-C-Netzkabel an. Die Anzeigeleuchte in der Mitte sollte grün leuchten.

<robo-wiki-picture src="home-assistant/sls-gateway-connect.gif" />

3. Beim ersten Start wird das Gateway Wi-Fi mit der SSID `zgw****` freigeben. Verbinden Sie sich mit diesem Netzwerk. Beachten Sie, dass das Signal möglicherweise recht schwach ist, daher ist es besser, das SLS Gateway näher an Ihrem Computer zu halten. 

<robo-wiki-picture src="home-assistant/sls-gateway-wifi.gif" />

4. Wenn die Verbindung erfolgreich ist, wird die Web-Benutzeroberfläche geöffnet (oder Sie finden sie unter der Adresse 192.168.1.1). 

5. Sie sehen die Seite `Wi-Fi Settings` . Wählen Sie Ihr Wi-Fi aus und geben Sie das Passwort ein. Drücken Sie die Schaltfläche `Apply`. Das Gateway wird neu gestartet und mit Ihrem Wi-Fi-Netzwerk verbunden. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type:'mp4'}]" />

6. Suchen Sie die lokale IP des SLS Gateways, um auf die Web-Benutzeroberfläche zuzugreifen. Sie können dazu die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden. Der Gateway-Name sollte wie folgt aussehen: `zgw****`. Öffnen Sie die Web-Benutzeroberfläche des Gateways, indem Sie die Gateway-IP in einen Browser einfügen.

7. Gehen Sie zu `Setting` -> `Hardware` und stellen Sie sicher, dass die Einstellungen wie auf dem Bild aussehen. Korrigieren Sie die Einstellungen bei Bedarf und klicken Sie auf die Schaltfläche `Save`:

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type:'mp4'}]" />

Die Tabelle mit den erforderlichen Werten:

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

8. Starten Sie dann das Gateway neu. Wählen Sie `Actions` -> `Reboot system` in der rechten oberen Ecke.

9. Stellen Sie sicher, dass das Gateway im Zigbee-Infofenster ordnungsgemäß funktioniert. Der Gerätestatus sollte `OK` sein.

10. Konfigurieren Sie das automatische Hinzufügen von Geräten zu Home Assistant. Gehen Sie zu `Zigbee` -> `Config` und wählen Sie `Home Assistant MQTT Discovery` und `Clear States`. Speichern Sie die Änderungen und starten Sie das SLS Gateway erneut.

<robo-wiki-note type="warning">

Wenn Sie bereits ein aktives SLS Gateway in Ihrem Zuhause haben und nun ein weiteres konfigurieren, werden sie sich gegenseitig stören. Um dieses Problem zu lösen, müssen Sie den Kanal auf dem neuen Gerät ändern. Gehen Sie zu `Zigbee` -> `Config` und ändern Sie den Kanal auf einen anderen (z. B. Kanal 15).

</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmVZMB1xQeB6ZLfSR6aUrN6cRSF296s8CMJt7E2jBJ5MjZ', type:'mp4'}]" />

## Koppeln von SLS mit MQTT

Nachdem Sie das SLS Gateway konfiguriert haben, müssen Sie das SLS Gateway mit Home Assistant verbinden. Öffnen Sie die SLS Gateway-Web-Benutzeroberfläche und gehen Sie zu `Settings/Link` -> `MQTT Setup`:


Fügen Sie Ihre Broker-Adresse hinzu (Adresse des Raspberry Pi mit Home Assistant im lokalen Netzwerk, Sie können sie mit der [Fing Mobile App](https://www.fing.com/products) oder dem [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) finden), Port (Standard ist `1883`), Ihren Broker-Benutzernamen und Ihr Passwort (das Sie zuvor erstellt haben) sowie den Themen-Namen (Sie können beliebige wählen). Außerdem muss die IP-Adresse des Raspberry Pi statisch sein. Klicken Sie auf `Enable` und `Retain states`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdNKDqwwy87VQEDDVsX5kpaDQm9wKKPEJUNJnhnjx6e5y', type:'mp4'}]" />

Speichern Sie die Änderungen. Jetzt werden die Geräte automatisch in Home Assistant angezeigt.

## Geräte verbinden

Verbinden Sie Ihre Geräte, indem Sie zu `Zigbee` -> `Join` gehen. Setzen Sie Ihre Sensoren in den Pairing-Modus. Die gängigste Methode, ein Gerät in den Verbindungsmodus zu versetzen, besteht darin, die Ein-/Aus-Taste gedrückt zu halten oder sie 5-mal ein- und auszuschalten. Drücken Sie die Schaltfläche `Enable Join`, um nach Zigbee-Geräten zu suchen. Sie sehen aktive Sensoren.

<robo-wiki-picture src="home-assistant/switch-device.gif" />

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type:'mp4'}]" />


Jetzt können Sie zum Abschnitt [**IoT-Abonnement**](/docs/sub-activate) gehen und das Robonomics-Abonnement aktivieren.
