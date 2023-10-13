---
title: Vorinstalliertes Image für Raspberry Pi
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
  - robonomics-interface 1.6.0
    https://github.com/Multi-Agent-io/robonomics-interface/
  - IPFS 0.21.0
    https://docs.ipfs.tech/
  - Zigbee2MQTT 1.32.1
    https://github.com/Koenkk/zigbee2mqtt
  - Yggdrasil 0.4.7
    https://github.com/yggdrasil-network/yggdrasil-go/
---

**Willkommen zum Leitfaden zur Installation von Home Assistant mit Robonomics-Integration auf einem Raspberry Pi. Home Assistant ist ein Open-Source-Heimautomatisierungssystem, das eine zentrale Schnittstelle zur Steuerung intelligenter Geräte in Ihrem Heimnetzwerk bietet. Durch die Integration mit Robonomics, einem dezentralen Cloud-Dienst, können Sie die Funktionalität und Sicherheit Ihres Smart Homes verbessern. In diesem Artikel werden wir Ihnen schrittweise Anleitungen zur Installation von Home Assistant mit Robonomics auf einem Raspberry Pi geben, um Ihnen die Möglichkeit zu geben, verschiedene Aspekte Ihres Zuhauses mithilfe einer sicheren und dezentralen Lösung zu automatisieren und zu steuern. Fangen wir an!**

## Hardware, die Sie für die Installation benötigen

Wenn Sie Home Assistant noch nicht in Ihr Smart Home-Setup integriert haben, ist es wichtig, sich über die Ausrüstung bewusst zu sein, die Sie benötigen, um ein vollständiges Smart Home-System von Grund auf aufzubauen.

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="3" flexible>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_2.png" /> 
      <b>Raspberry Pi 4 (at least 2 GB RAM)</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_3.png" /> 
      <b>SD card 16Gb+</b>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_7.png" /> 
      <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"><b>Zigbee adapter</b></a>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>

  <robo-wiki-grid-element-wrapper textAlign="center" :columns="2">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"><b>Zigbee smart devices</b></a>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_9.png" />
      <b>Desktop for setup</b>
    </robo-wiki-grid-element>
  </robo-wiki-grid-element-wrapper>


## 1. Robonomics vorinstalliertes Image herunterladen

Das vorinstallierte Robonomics-Image enthält:
- Home Assistant Core
- IPFS
- MQTT-Broker und Integration
- Zigbee2MQTT
- Robonomics Integration

<robo-wiki-button label="Download image (~528 Mb)" link="https://crustipfs.info/ipfs/QmeDPrNYLQKFCZgPmxyxDWSAXSjSaw7Dx46d9p3JSGM1hA?filename=robonomics_rpi.xz&download=true" />

<robo-wiki-note type="warning" title="For advanced users">

Sie können den Quellcode überprüfen und die neueste Version des Images auf [GitHub](https://github.com/airalab/Robonomics-HomeAssistant-image/releases) herunterladen.

</robo-wiki-note>


## 2. Konfigurieren des Images

Installieren Sie [Raspberry Pi Imager](https://www.raspberrypi.com/software/) auf Ihrem Computer. Legen Sie dann die SD-Karte ein.

<robo-wiki-picture src="home-assistant/insert-sd-card.gif" alt="insert SD card" />


Führen Sie das Raspberry Pi Imager-Programm aus. Wählen Sie das erforderliche Image als Betriebssystem und stellen Sie sicher, dass Sie Ihre SD-Karte aus dem Speicher-Dropdown-Menü auswählen.
In den Einstellungen:
- Legen Sie Benutzername und Passwort fest (speichern Sie den Standard-Benutzernamen "pi", um ihn leicht zu merken),  
- geben Sie Ihren WLAN-Namen und Ihr Passwort ein, 
- wählen Sie Ihr Land aus der Dropdown-Liste
und klicken Sie dann auf `Write` (Schreiben). 
                   
<robo-wiki-note type="note">Bewahren Sie Benutzername und Passwort sorgfältig auf, da diese Anmeldeinformationen im Fehlerbehebungsfall benötigt werden.</robo-wiki-note>
                        
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSZM7uVizqQjLnKJy2kifs9uDZB91MgALDBARenkzU3mb', type:'mp4'}]" cover="covers/cover-1.png" />

Sie können Ländercodes [hier](https://en.wikipedia.org/wiki/List_of_ISO_3166_country_codes) finden.

## 3. Erster Start

**Werfen Sie die SD-Karte sicher aus**, legen Sie sie in den Raspberry Pi ein. Stecken Sie dann den Zigbee-Adapter in den Raspberry Pi.

<robo-wiki-note type="warning">Es ist wichtig, den Zigbee-Adapter vor dem ersten Start des Raspberry Pi einzustecken! 
Er wird für die automatische Konfiguration des Zigbee-Netzwerks benötigt.</robo-wiki-note>

**Wenn Sie den [JetHome USB JetStick Z2](https://jethome.ru/z2/?sl=en) (der alle erforderlichen Firmware hat) haben, können Sie einfach mit diesen Anweisungen fortfahren. Wenn Sie jedoch einen anderen Adapter haben, müssen Sie ihn zuerst mit der Zigbee2MQTT-Software flashen. Anweisungen für Ihr Gerät finden Sie [hier](https://www.zigbee2mqtt.io/information/supported_adapters.html).**

Verbinden Sie anschließend das Stromkabel mit Ihrem Gerät. Es sollte sich mit Ihrem WLAN-Netzwerk verbinden. 

<robo-wiki-picture src="home-assistant/first-start.gif" alt="first boot" />

Sobald Ihr Raspberry Pi angeschlossen ist, leuchtet die rote LED und die grüne LED blinkt für einige Zeit. Warten Sie bis zu 5 Minuten, bis der Raspberry Pi hochfährt und sich im Netzwerk registriert.

Suchen Sie nun die IP-Adresse des Raspberry Pi. Sie können dazu die [Fing Mobile App](https://www.fing.com/products) oder 
das [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) verwenden. Suchen Sie den `robots-home` (optionaler Name könnte `Home(homeassistant)` sein) 
Namen der Hostmaschine in der IP-Liste. 

In diesem Beispiel lautet die Adresse `192.168.43.56`. 

Um zu überprüfen, ob alles funktioniert, öffnen Sie einen Webbrowser und gehen Sie zur Webseite `http://%RASPBERRY_IP_ADDRESS%:8123`. In diesem Beispiel lautet sie `192.168.43.56:8123`.
Wenn alles in Ordnung ist, sehen Sie die Home Assistant-Webbenutzeroberfläche. Wenn die Webseite nicht geöffnet wird, warten Sie bis zu 5 Minuten, bis der Raspberry Pi hochgefahren ist, und versuchen Sie es erneut. 

<robo-wiki-video loop controls :videos="[{src: 'https://crustipfs.info/ipfs/QmXjFaTd81dLrMgADtENmSqbS2uJuLJUgQUrmDu2CsSuAq', type:'mp4'}]"  cover="covers/cover-2.png" />


## Fehlerbehebung

1. Um die Wi-Fi-Einstellungen später zu ändern, melden Sie sich über den `ssh`-Befehl bei Ihrem Raspberry Pi an. Öffnen Sie dazu das Terminal auf Ihrem Computer
und geben Sie den `ssh`-Befehl mit Ihrem Benutzernamen ein, den Sie im Schritt "Konfigurieren des Images" erstellt haben (Standardwert ist "pi"). 

<code-helper additionalLine="your_username@your_hostname">

```bash
ssh <YOUR_USERNAME>@<Raspberry_PI_IP_ADDRESS>
```
</code-helper>

und verwenden Sie dann den Befehl `sudo raspi-config`. Weitere Informationen zu diesem Befehl finden Sie auf [der offiziellen Website.](https://www.raspberrypi.com/documentation/computers/configuration.html)
