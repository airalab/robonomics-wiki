---

title: Aktualisieren Sie Ihr Home Assistant OS
contributors: [LoSk-p]
tools:
  - Home Assistant OS 12.1 für RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Libp2p <-> WS Proxy Add-on 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**Dieser Artikel enthält Anweisungen zum Aktualisieren Ihres bestehenden Home Assistant OS mit Robonomics-Integration.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## Installieren Sie HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) ermöglicht es Ihnen, benutzerdefinierte Integrationen zu installieren.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Bevor Sie beginnen, müssen Sie das Add-On für die Verbindung zum Home Assistant-Gerät mit SSH installieren. Suchen Sie im Add-On-Store nach `ssh`. Wir empfehlen, das `SSH & Web Terminal`-Add-On zu installieren.

{% roboWikiNote {title:"Warnung", type: "warning"}%} Wenn das SSH-Add-On nicht gefunden wird, versuchen Sie, den erweiterten Modus in Ihren Benutzerprofil-Einstellungen zu aktivieren. Klicken Sie dazu auf das Profilsymbol in der unteren linken Ecke und suchen Sie die Option Erweiterter Modus.{% endroboWikiNote %}

2. Wählen Sie das Add-On aus und drücken Sie `INSTALL`. Nach Abschluss der Installation gehen Sie zum `Konfiguration`-Tab und fügen Sie `password` oder `authorized_keys` hinzu. Vergessen Sie nicht, diesen Teil der Konfiguration zu speichern.

3. Drücken Sie im `Info`-Tab `START`. Wenn Sie das Add-On in der Seitenleiste sehen möchten, vergessen Sie nicht, `Im Seitenbereich anzeigen` zu aktivieren.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. Öffnen Sie das SSH-Add-On und führen Sie den folgenden Befehl aus:

{% codeHelper { additionalLine: "Home Assistant-Befehlszeile", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Starten Sie Home Assistant neu (Sie können dies in `Einstellungen`->`System` tun).

6. Jetzt steht die HACS-Integration im `Integrationen`-Menü zur Verfügung. Gehen Sie zu `Einstellungen`->`Geräte & Dienste`, drücken Sie `Integration hinzufügen` und suchen Sie HACS.

{% roboWikiNote {title:"Warnung", type: "warning"}%} Um HACS zu verwenden, benötigen Sie ein Github-Konto.{% endroboWikiNote %}

7. Klicken Sie darauf und folgen Sie den Installationsanweisungen.

## Installieren Sie IPFS-Daemon und Libp2p - WS Proxy-Add-Ons

Die Robonomics-Integration speichert die Daten mithilfe des lokalen IPFS-Daemons und verwendet auch Libp2p für die Fernsteuerung. Daher müssen Sie es zuerst installieren. Sie können das Robonomics-Add-On-Repository mit diesem Button hinzufügen

[![Öffnen Sie Ihre Home Assistant-Instanz und zeigen Sie den Dialog zum Hinzufügen eines Add-On-Repository mit einer spezifischen Repository-URL, die vorab ausgefüllt ist.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

Oder manuell mit den folgenden Schritten:

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Es gibt ein [Robonomics Addons Repository](https://github.com/PinoutLTD/robonomics-addons). Um es zu installieren, gehen Sie zu `Einstellungen` -> `Add-Ons` und drücken Sie die `ADD-ON STORE`-Schaltfläche in der unteren rechten Ecke.

2. Drücken Sie oben rechts auf die drei Punkte und wählen Sie `Repositories`. Fügen Sie dort den folgenden Link hinzu:

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. Drücken Sie die `ADD`-Schaltfläche.

4. Schließen Sie den Repository-Manager und aktualisieren Sie die Seite. Jetzt können Sie am Ende der Seite die Robonomics-Add-Ons sehen.

Jetzt können Sie beide Add-Ons installieren. Öffnen Sie sie und drücken Sie `INSTALL`. Nach der Installation drücken Sie `START`.

## Installieren Sie Robonomics-Integration

Jetzt können Sie die Robonomics-Integration über HACS installieren.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Öffnen Sie HACS über das Seitenleistenmenü und suchen Sie nach `Robonomics`. Klicken Sie dann auf die `Download`-Schaltfläche unten rechts. Sobald der Download abgeschlossen ist, starten Sie Home Assistant neu.