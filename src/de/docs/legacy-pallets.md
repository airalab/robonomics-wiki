---
title: Legacy-Pallets
contributors: [PaTara43, nakata5321, LoSk-p, ensrationis]
---

Fünf Pallets aus früheren Robonomics-Versionen sind noch in der Runtime: Datalog, Launch, RWS, DigitalTwin und Liability. Das [Node-README](https://github.com/airalab/robonomics#readme) markiert sie als veraltet: „following pallets will be removed in near future“. Ein Termin für die Entfernung wurde nicht genannt.

Sie funktionieren heute weiterhin on-chain, und einige Apps und Integrationen nutzen sie. Neue Projekte sollten mit dem [Gerätebaum](/docs/device-tree/) beginnen.

| Pallet | Was es tut | Nachfolger |
|---|---|---|
| Datalog | Speichert kurze Einträge unter Ihrem Konto | Gerätebaum; Speicher in 5.0 ist geplant |
| Launch | Sendet einen signierten Befehl an ein Gerätekonto | — |
| RWS | Abonnements für gebührenfreie Transaktionen | Abonnements in 5.0 (in Arbeit) |
| DigitalTwin | Ordnet Topics eines digitalen Zwillings Konten zu | Gerätebaum |
| Liability | Vereinbarungen zwischen Parteien mit einem Bericht am Ende | — |

## Datalog

Datalog speichert kurze Einträge on-chain unter Ihrem Konto. Jeder Eintrag erhält einen Zeitstempel.

- `record(record)` fügt einen Eintrag mit bis zu 512 Byte hinzu.
- `erase()` löscht alle Ihre Einträge.
- Jedes Konto behält seine **letzten 127 Einträge**. Ältere werden überschrieben. (Das Fenster hat 128 Slots, und ein Slot bleibt immer frei.)
- Größere Daten legen Sie auf IPFS ab und speichern die CID.
- Gelesen wird mit den Storage-Abfragen `datalog.datalogIndex(account)`, die den ersten und letzten Slot liefert, und `datalog.datalogItem([account, slot])`. Das Event heißt `NewRecord`.
- Es gibt keine Kaution, nur die normale Gebühr. Zum Zeitpunkt des Schreibens kostet ein voller Eintrag mit 512 Byte etwa 0,0006 XRT.
- Mit einem RWS-Abonnement lässt sich ein Eintrag gebührenfrei über `rws.call` senden.

Wer es heute nutzt: der Robonomics Report Service für Home Assistant, die Connectivity-Agenten von sensors.social sowie die Altruist- und Energiemonitor-Diagramme in robonomics.app.

Eine Anleitung für den ersten Eintrag finden Sie unter [Erste Schritte](/docs/getting-started/#4-send-your-first-record).

## Launch

Launch sendet einen signierten Befehl an ein Gerät.

- `launch(robot, param)`: `robot` ist das Gerätekonto, `param` sind 32 Byte. Üblich ist, dort den Digest einer IPFS-CID abzulegen.
- Das Gerät wartet auf `NewLaunch(sender, robot, param)`-Events mit seiner Adresse.
- Jeder kann einen Launch an jede Adresse senden. Das Gerät muss prüfen, wer der Absender ist.
- Das Pallet schreibt `param` außerdem in einen globalen Wert `Goal`, den jeder Launch von jedem Absender überschreibt. Nutzen Sie die Events, nicht diesen Storage-Wert.
- Die Gebühr entspricht ungefähr der eines kurzen Datalog-Eintrags. Mit einem RWS-Abonnement lässt er sich gebührenfrei senden.

robonomics.app steuert Home Assistant über Launch, und der alte ROS-2-Wrapper hat damit Roboter gestartet.

<div id="rws-subscriptions"></div>

## RWS-Abonnements

RWS (Robonomics Web Services) gibt einem Konto gebührenfreie Transaktionen.

- Zwei Arten: `Daily { days }` und `Lifetime { tps }`.
- Ein im Abonnement eingetragenes Gerät sendet Aufrufe über `rws.call(subscription_owner, call)` und zahlt keine Gebühr. Freie Kapazität baut sich mit der Zeit auf. Bei einem Daily-Abonnement mit 10.000 µTPS, das entspricht 0,01 einfachen Transfers pro Sekunde.
- `set_devices(devices)` legt bis zu 32 Gerätekonten fest, die das Abonnement nutzen dürfen. Die ganze Liste wird ersetzt. Nur ein eingetragenes Gerät kann `rws.call` nutzen.
- `transfer(target)` überträgt Ihr Abonnement auf ein Konto, das noch keins hat.

### Wie man ein Abonnement bekommt

- Abonnements werden versteigert. `bid(index, amount)`: Das erste Gebot muss über 1 XRT liegen. Gebote werden reserviert. Auktionen mit einem Gebot schließen alle 10 Blöcke. Das Gewinnergebot wird verbrannt und das Abonnement registriert.
- Die Seite **Buy a subscription** in [robonomics.app](https://robonomics.app) bietet auf eine freie Auktion und trägt Ihr eigenes Konto in einer einzigen Transaktion als Gerät ein. Ihr Guthaben muss über dem Preis plus 0,01 XRT liegen. Gibt es keine freie Auktion, bricht die App ab.

<div id="current-state"></div>

### Aktueller Stand

- Neue Auktionen kann nur Root starten. Da es kein Sudo gibt, braucht jede neue Runde von Auktionen ein Root-Referendum. Bis eines angenommen ist, können die freien Auktionen ausgehen.
- Vom Oracle ausgegebene Abonnements (zum Beispiel aus den RWS-Token auf Ethereum, einem Experiment von 2021) sind nicht angebunden: Das Oracle-Konto ist nicht gesetzt. Laut Tokenomics-Seite wird RWS an das produktive Netzwerk angebunden, nachdem die XRT-Guthaben von Kusama nach Polkadot umgezogen sind, zuerst für nicht-kommerzielle Projekte wie sensors.social.
- Der Nachfolger ist die Subscription aus 5.0. Damit soll ein Gerät das Netzwerk nutzen können, ohne selbst XRT zu halten. Sie ist in Arbeit und noch nicht in der Runtime.

## DigitalTwin

Ein digitaler Zwilling ist eine Liste von Topics, jedes verknüpft mit einem Konto, das Daten dafür liefert.

- `create()` legt einen Zwilling an.
- `set_source(id, topic, source)` verknüpft ein 32-Byte-Topic mit einem Quellkonto.
- `remove_source(id)` entfernt die Quelle.

Der [Gerätebaum](/docs/device-tree/) ersetzt ihn.

## Liability

Liability speichert signierte Vereinbarungen zwischen Parteien.

- `create(agreement)` speichert eine signierte Vereinbarung. Ihr technischer Teil verweist auf IPFS.
- `finalize(report)` schließt sie mit einem Bericht ab.

Das Pallet enthält außerdem einen einfachen Marktplatz für solche Vereinbarungen. Ein Nachfolger wurde nicht angekündigt.
