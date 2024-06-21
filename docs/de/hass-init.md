---
title: Home Assistant-Initialisierung
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
---

**Nach der Installation von Home Assistant muss es initialisiert werden.**

<robo-wiki-picture src="home-assistant/ha_init.png" />

Sie beginnen mit der Erstellung des Eigentümerkontos von Home Assistant. Dieses Konto ist ein Administrator und kann Änderungen vornehmen. Öffnen Sie einen Webbrowser und gehen Sie zu `http://%RASPBERRY_IP_ADDRESS%:8123`. Sie können die IP-Adresse des Raspberry Pi mit der [Fing Mobile App](https://www.fing.com/products) oder dem [nmap CLI-Tool](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) finden.

<robo-wiki-note type="note">Die Raspberry Pi-Adresse kann sich im Laufe der Zeit ändern, aufgrund von Router-Einstellungen.</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type:'mp4'}]" />

1. Geben Sie auf der ersten Seite einen Namen, Benutzernamen, ein Passwort ein und klicken Sie auf die Schaltfläche `CREATE ACCOUNT`.

2. Geben Sie auf dem nächsten Bildschirm einen Namen für Ihr Zuhause ein und legen Sie Ihren Standort und Ihr Einheitensystem fest. Klicken Sie auf `DETECT`, um Ihren Standort zu finden und Ihre Zeitzone und Ihr Einheitensystem entsprechend diesem Standort festzulegen. Wenn Sie Ihren Standort nicht senden möchten, können Sie diese Werte manuell festlegen.

3. Anschließend zeigt Home Assistant alle Geräte an, die es in Ihrem Netzwerk entdeckt hat. Machen Sie sich keine Sorgen, wenn Sie weniger Elemente sehen als unten gezeigt; Sie können jederzeit manuell Geräte hinzufügen. Klicken Sie vorerst einfach auf `FINISH` und Sie gelangen zum Hauptbildschirm von Home Assistant.

4. Schließlich sehen Sie die Home Assistant-Webbenutzeroberfläche, auf der alle Ihre Geräte angezeigt werden. 


## Fehlerbehebung

1. Wenn Sie Ihren Benutzernamen oder Ihr Passwort für den lokalen Benutzer vergessen haben, [überprüfen Sie diesen Artikel](https://www.home-assistant.io/docs/locked_out/), um Ihre Anmeldeinformationen wiederherzustellen.
