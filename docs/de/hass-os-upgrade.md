---
title: Upgrade Your Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**Dieser Artikel enthält Anweisungen zum Upgrade Ihres bestehenden Home Assistant OS mit Robonomics Integration.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Installierenieren IPFS Add-on


Robonomics Integration speichert die Daten mit Hilfe des lokalen IPFS-Daemons, daher müssen Sie ihn zuerst installieren. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. Es gibt ein [IPFS Add-on für Home Assistant](https://github.com/airalab/ipfs-addon). Um es zu installieren, gehen Sie zu `Settings` -> `Add-ons` und drücken Sie die Schaltfläche `ADD-ON STORE` in der unteren rechten Ecke.

2. Drücken Sie auf die drei Punkte in der oberen rechten Ecke und wählen Sie `Repositories`. Fügen Sie dort den folgenden Link hinzu:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Drücken Sie die Schaltfläche `ADD`.

4. Schließen Sie den Repository-Manager und aktualisieren Sie die Seite. Jetzt können Sie am Ende der Seite das IPFS Daemon Add-on sehen.

5. Öffnen Sie das Add-on und drücken Sie `INSTALL`. Nach der Installation drücken Sie `START`.

## Installieren Sie HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) ermöglicht Ihnen die Installation von benutzerdefinierten Integrationen.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Bevor Sie beginnen, müssen Sie das Add-on für die Verbindung mit dem Home Assistant-Gerät über SSH installieren. Suchen Sie im Add-on Store nach `ssh`. Wir empfehlen die Installation des Add-ons `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  Wenn das SSH-Add-on nicht gefunden wird, versuchen Sie, den erweiterten Modus in Ihren Benutzerprofil-Einstellungen zu aktivieren. Klicken Sie dazu auf das Profilsymbol in der unteren linken Ecke und suchen Sie die Option Erweiterter Modus.

</robo-wiki-note>

2. Wählen Sie das Add-on aus und drücken Sie `INSTALL`. Nach Abschluss der Installation gehen Sie zum Tab `Konfiguration` und fügen Sie `password` oder `authorized_keys` hinzu. Vergessen Sie nicht, diesen Teil der Konfiguration zu speichern.

3. Drücken Sie im Tab `Info` auf `START`. Wenn Sie das Add-on in der Seitenleiste sehen möchten, vergessen Sie nicht, `Show in sidebar` zu aktivieren.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Öffnen Sie das SSH Add-on und führen Sie den folgenden Befehl aus:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Starten Sie Home Assistant neu (Sie können dies unter `Settings`->`System`). 

6. Jetzt steht die HACS Integration im Menü `Integrations` zur Verfügung. Gehen Sie zu `Settings`->`Devices & Services`, drücken Sie `Add Integration`  und suchen Sie HACS.

<robo-wiki-note type="warning" title="Warning">

  Um HACS zu verwenden, benötigen Sie ein Github-Konto.

</robo-wiki-note>

7. Klicken Sie darauf und folgen Sie den Installationsanweisungen. 

## Installieren Sie Robonomics Integration

Jetzt können Sie Robonomics Integration mit HACS installieren.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Öffnen Sie HACS im Seitenmenü und navigieren Sie zu `Integrations`. Klicken Sie auf `Explore & Download Repositories`, suchen Sie nach `Robonomics` und klicken Sie auf die Schaltfläche `Download` in der unteren rechten Ecke. Sobald der Download abgeschlossen ist, starten Sie Home Assistant neu.