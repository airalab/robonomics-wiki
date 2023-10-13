---
title: Globale Verwaltung

contributors: [nakata5321, Fingerling42]
tools:   
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp 
    https://github.com/airalab/dapp.robonomics.network
---

**In diesem Artikel wird Ihnen gezeigt, wie Sie einem neuen Benutzer zu Ihrem Home Assistant hinzufügen.**

## Benutzer zur Abonnement hinzufügen

Sie können keine zuvor erstellten Konten verwenden, da `SUB_OWNER` und `SUB_CONTROLLER` Sicherheit bieten und der erste Benutzer, den Sie beim ersten Start von Home Assistant erstellt haben, kein Robonomics Parachain-Konto hat.

1. Erstellen Sie ein Konto auf der Robonomics-Parachain, wie Sie es im [vorherigen Artikel](/docs/sub-activate/) getan haben.

2. Fügen Sie mit dem Konto `SUB_OWNER` ein neues Benutzerkonto zum Abonnement in der [Dapp](https://dapp.robonomics.network/#/subscription/devices) hinzu. Jetzt sollten drei Adressen in der Zugriffsliste stehen: `SUB_OWNER`, `SUB_CONTROLLER` und `USER`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmSxzram7CF4SXpVgEyv98XetjYsxNFQY2GY4PfyhJak7H', type:'mp4'}]" />


## Zugriff für Benutzer gewähren

1. Gehen Sie zum Dapp-Dienst namens [Home Assistant Account](https://dapp.robonomics.network/#/home-assistant). Wählen Sie das Konto, das Sie gerade im rechten Seitenbereich erstellt haben (überprüfen Sie, ob Sie das beabsichtigte Konto ausgewählt haben, indem Sie auf das Profilsymbol klicken).

2. Geben Sie den `USER`-Seed in das erforderliche Feld ein. Fügen Sie die Adressen `SUB_OWNER` und `SUB_CONTROLLER` in die Felder für die Administratorberechtigungen ein. Wenn alles korrekt ist, sehen Sie den Verifizierungsstatus `VERIFIED`.

3. Erstellen Sie ein Passwort für einen neuen Benutzer, den Sie gerade registriert haben, und bestätigen Sie dann die Transaktion, die jetzt aufgrund des Abonnements gebührenfrei ist. Später können Sie das Passwort im Wiederherstellungs-Tab wiederherstellen.

4. Melden Sie sich nach dem Registrierungsprozess bei Home Assistant mit Ihrer Benutzeradresse als Login und einem neu erstellten Passwort an.

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmW2TXuwCYXzgcRfEUx4imZU5ZerEzkuD5P53u9g2WnxDh', type:'mp4'}]" />

Jetzt können Sie die Dapp verwenden, um Ihr Zuhause über Robonomics zu steuern. Lesen Sie den Artikel [**"Erhalten Sie Smart Home Telemetrie"**](/docs/smart-home-telemetry/), um weitere Informationen zu erhalten.

## Fehlerbehebung

1. Wenn Sie ein Passwort für Home Assistant in Ihrem Robonomics-Konto vergessen haben, [überprüfen Sie die Dapp.](https://dapp.robonomics.network/#/home-assistant)
Gehen Sie zum Abschnitt "Your Home Assistant password" und wählen Sie den Tab "Restore".
