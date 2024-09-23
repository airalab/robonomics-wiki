---
title: Robonomics SLS Gateway

contributors: [LoSk-p, Fingerling42, nakata5321]
tools:
  - SLS Firmware 2022.08.13
    https://github.com/airalab/robonomics-hass-utils
---

**In diesem Artikel richten Sie das Robonomics SLS Gateway ein. Sie werden die erforderliche Software für das Gateway installieren, konfigurieren und es mit Home Assistant verbinden.**

{% roboWikiPicture {src:"docs/home-assistant/sls_gateway.png", alt:"sls gateway"} %}{% endroboWikiPicture %}

## Firmware

Zuerst müssen Sie die Mikrocontroller-Firmware des Gateways installieren. Bereiten Sie das Gateway vor, indem Sie die Schalter `1` und `3` im unteren Teil des SLS Gateways auf `ON` setzen, die anderen müssen auf `OFF` sein.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-13.gif", alt:"sls gateway 13"} %}{% endroboWikiPicture %}

Verbinden Sie das Gateway über den USB-Typ-C-Anschluss am Gateway mit Ihrem Raspberry Pi.

{% roboWikiPicture {src:"docs/home-assistant/sls-rpi.gif", alt:"sls-rpi"} %}{% endroboWikiPicture %}

Klonen Sie das Repository mit der Firmware auf Ihren Raspberry Pi:

{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
git clone https://github.com/airalab/robonomics-hass-utils.git
```

{% endcodeHelper %}

Gehe zu `robonomics-hass-utils/esp_firmware/linux`. Um das SLS-Gateway zu flashen, müssen Sie die Skripte `Clear` und `Flash_16mb` ausführen.

{% codeHelper { additionalLine: "rasppi_benutzername@rasppi_hostname"}%}

```shell
cd robonomics-hass-utils/esp_firmware/linux
sudo chmod +x Clear.sh
sudo chmod +x Flash_16mb.sh
./Clear.sh
./Flash_16mb.sh
```

{% endcodeHelper %}

### Fehlerbehebung

Wenn Sie Probleme beim Aktualisieren der Gateway-Firmware haben, müssen Sie zusätzliche Schritte unternehmen:

1. Stellen Sie sicher, dass das pySerial-Modul installiert ist:

{% codeHelper { additionalLine: "rasppi_benutzername@rasppi_hostname"}%}

```shell
pip install pyserial
```

{% endcodeHelper %}

2. Geben Sie Ihrem Benutzer Zugriffsrechte auf den USB-Port und starten Sie den Computer neu:

{% codeHelper { additionalLine: "rasppi_benutzername@rasppi_hostname"}%}

```shell
sudo usermod -a -G dialout $USER
sudo reboot
```

{% endcodeHelper %}

3. In einigen Fällen ist es erforderlich, die Bandbreiteneinstellung im Skript zu ändern, um die Firmware zu aktualisieren. Öffnen Sie das Skript `Flash_16mb.sh` mit dem `nano`-Editor undÄndern Sie den Baud-Parameter von `921600` auf einen kleineren Wert (zum Beispiel `115200`).

## Konfiguration

1. Trennen Sie das SLS-Gateway vom Computer. Stellen Sie die Schalter auf der Rückseite des Gateways in die richtige Position. Schalter `5` (RX Zigbee zu ESP) und `6` (TX Zigbee zu ESP) müssen sich in der Position `EIN` befinden, die anderen müssen `AUS` sein.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-56.gif", alt:"sls gateway 56"} %}{% endroboWikiPicture %}

2. Schließen Sie das Typ-C-Netzkabel an. Die Anzeigelampe in der Mitte sollte grün leuchten.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-connect.gif", alt:"sls-gateway-connect"} %}{% endroboWikiPicture %}

3. Beim ersten Start wird das Gateway Wi-Fi mit der SSID `zgw****` freigeben. Verbinden Sie sich mit diesem Netzwerk. Beachten Sie, dass das Signal möglicherweise recht schwach ist, daher ist es besser, das SLS-Gateway näher an Ihren Computer zu halten.

{% roboWikiPicture {src:"docs/home-assistant/sls-gateway-wifi.gif", alt:"sls-gateway-wifi"} %}{% endroboWikiPicture %}

4. Wenn die Verbindung erfolgreich ist, wird die Webschnittstelle geöffnet (oder Sie finden sie unter 192.168.1.1 Adresse).

5. Sie sehen die Seite "Wi-Fi-Einstellungen". Wählen Sie Ihr Wi-Fi aus und geben Sie das Passwort ein. Drücken Sie die Schaltfläche "Anwenden". Das Gateway wird neu starten und sich mit Ihrem Wi-Fi-Netzwerk verbinden.

{% roboWikiVideo {videos:[{src: 'QmSht6roENzrV6oqsQ1a5gp6GVCz54EDZdPAP8XVh9SCwH', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

6. Finden Sie die lokale IP des SLS-Gateways, um auf die Webschnittstelle zuzugreifen. Sie können dazu die [Fing Mobile App](https://www.fing.com/products) oder das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden. Der Gateway-Name sollte so aussehen: `zgw****`. Öffnen Sie die Webschnittstelle des Gateways, indem Sie die Gateway-IP in einen Browser einfügen.

7. Gehen Sie zu `Einstellung` -> `Hardware` und stellen Sie sicher, dass die Einstellungen wie im Bild aussehen. Korrigieren Sie die Einstellungen bei Bedarf und klicken Sie auf die Schaltfläche "Speichern":

{% roboWikiVideo {videos:[{src: 'QmeSksMxU9xkvvK7f81WDAYULiMFokK7P7KDVYEjv2MHjn', type: 'mp4'}], attrs:['Schleife', 'autoplay', 'Steuerungen']} %}{% endroboWikiVideo %}

Die Tabelle mit den erforderlichen Werten:

| Feld                    | Wert               |
|--------------------------|:-------------------|
| Zigbee-Modul             | TI                 |
| Zigbee UART RX           | 22                 |
| Zigbee UART TX           | 23                 |
| Zigbee RST-Pin           | 18                 |
| Zigbee BSL-Pin           | 19                 |
| Service-Button-Pin       | 33 (pullUP - true) |
| Anzahl adressierbarer LEDs | 0                |
| LED Rot (oder Adresse)   | 21                 |
| LED Grün                 | 5                  |
| LED Blau                 | 27                 |
| I2C SDA                  | 255                |
| I2C SCL                  | 255                |

8. Starten Sie dann das Gateway neu. Wählen Sie `Aktionen` -> `System neu starten` in der rechten oberen Ecke.

9. Stellen Sie sicher, dass das Gateway ordnungsgemäß im Zigbee-Infofenster funktioniert. Der Gerätestatus sollte `OK` sein.

10. Konfigurieren Sie das automatische Hinzufügen von Geräten zu Home Assistant. Gehen Sie zu `Zigbee` -> `Konfiguration` und wählen Sie dann `Home Assistant MQTT Discovery` und `Zustände löschen`. Speichern Sie die Änderungen und starten Sie das SLS-Gateway erneut **neu**.

{% roboWikiNote {type: "warning"}%} Wenn Sie bereits ein aktives SLS-Gateway in Ihrem Zuhause haben und jetzt ein weiteres konfigurierenWenn Sie mehrere Zigbee-Geräte in Ihrem Smart Home-System haben und sie auf dem gleichen Kanal betreiben, werden sie sich gegenseitig stören. Um dieses Problem zu lösen, müssen Sie den Kanal auf dem neuen Gerät ändern. Gehen Sie dazu zu `Zigbee` -> `Konfiguration` und ändern Sie den Kanal auf einen anderen (z. B. Kanal 15). {% endroboWikiNote %}

Nachdem Sie das SLS-Gateway konfiguriert haben, müssen Sie das SLS-Gateway mit Home Assistant verbinden. Öffnen Sie die SLS-Gateway-Web-Oberfläche und gehen Sie zu `Einstellungen/Verknüpfung` -> `MQTT-Einrichtung`:

Fügen Sie Ihre Broker-Adresse hinzu (Adresse des Raspberry Pi mit Home Assistant im lokalen Netzwerk, Sie können sie mit der [Fing Mobile App](https://www.fing.com/products) oder dem [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) finden), Port (Standard ist `1883`), Ihren Broker-Benutzernamen und Ihr Passwort (die Sie zuvor erstellt haben) und den Themen-Namen (Sie können beliebig wählen). Außerdem muss die IP-Adresse des Raspberry Pi statisch sein. Klicken Sie auf `Aktivieren` und `Zustände beibehalten`..


Speichern Sie die Änderungen. Jetzt werden die Geräte automatisch in Home Assistant angezeigt.

## Geräte verbinden

Verbinden Sie Ihre Geräte, indem Sie zu `Zigbee` -> `Beitreten` gehen. Setzen Sie Ihre Sensoren in den Pairing-Modus. Der häufigste Weg, ein Gerät in den Verbindungsmodus zu versetzen, besteht darin, die Ein-/Aus-Taste gedrückt zu halten oder sie 5 Mal ein- und auszuschalten. Drücken Sie die Schaltfläche `Beitreten aktivieren`, um nach Zigbee-Geräten zu suchen. Sie werden aktive Sensoren sehen.

{% roboWikiVideo {videos:[{src: 'Qmdq3PBNY88QbYYqakwSLG2vn3mVUom3w3wsSWfTd1pzJA', type: 'mp4'}], attrs:['loop', 'autoplay', 'controls']} %}{% endroboWikiVideo %}

Jetzt können Sie zum Abschnitt [**IoT-Abonnement**](/docs/sub-activate) gehen und mit der Aktivierung des Robonomics-Abonnements beginnen.