---
title: Home Assistant Initialisierung
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2024.11.3
    https://github.com/home-assistant/core
---

**Nach der Installation von Home Assistant muss es initialisiert werden.**

{% roboWikiPicture {src:"docs/home-assistant/ha_init.png", alt:"ha_init"} %}{% endroboWikiPicture %}

Sie beginnen mit der Erstellung des Eigentümerkontos von Home Assistant. Dieses Konto ist ein Administrator und kann Änderungen vornehmen.
Öffnen Sie einen Webbrowser und gehen Sie zu `http://%PC_IP_ADDRESS%:8123`. Sie können die IP-Adresse des Raspberry Pi mithilfe der [Fing-Mobil-App](https://www.fing.com/products) oder des [nmap-CLI-Tools](https://vitux.com/find-devices-connected-to-your-network-with-nmap/) finden.
Wenn Sie alles auf Ihrem PC eingerichtet haben, verwenden Sie `http://localhost:8123`.

{% roboWikiNote {type: "note"}%} Die IP-Adresse kann sich im Laufe der Zeit ändern, abhängig von den Router-Einstellungen {% endroboWikiNote %}

{% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Geben Sie auf der ersten Seite einen Namen, Benutzernamen, Passwort ein und klicken Sie auf die Schaltfläche `KONTO ERSTELLEN`.

2. Geben Sie auf dem nächsten Bildschirm einen Namen für Ihr Zuhause ein und legen Sie Ihren Standort und das Einheitensystem fest. Klicken Sie auf `ERKENNEN`, um Ihren Standort zu finden und basierend auf diesem Standort Ihre Zeitzone und Ihr Einheitensystem festzulegen. Wenn Sie Ihren Standort nicht senden möchten, können Sie diese Werte manuell festlegen.

3. Danach zeigt Home Assistant alle Geräte an, die es in Ihrem Netzwerk entdeckt hat. Machen Sie sich keine Sorgen, wenn Sie weniger Elemente sehen als unten gezeigt; Sie können später immer noch Geräte manuell hinzufügen. Klicken Sie jetzt einfach auf `ABSCHLIESSEN` und Sie gelangen zum Hauptbildschirm von Home Assistant.

4. Schließlich sehen Sie die Home Assistant-Webbenutzeroberfläche, auf der alle Ihre Geräte angezeigt werden.


## Fehlerbehebung

1. Wenn Sie Ihren Anmelde- oder Passwort für den lokalen Benutzer vergessen haben, [überprüfen Sie diesen Artikel](https://www.home-assistant.io/docs/locked_out/), um Ihre Anmeldeinformationen wiederherzustellen.