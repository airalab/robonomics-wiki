---
title: Geräte verbinden
contributors: [Fingerling42, nakata5321, ensrationis]
---

Es gibt zwei Wege, Geräte in Robonomics einzubinden: über Home Assistant oder direkt, mit jedem Gerät, das eine Transaktion signieren oder mit einem Gateway sprechen kann.

Fertige Hardware und die Installation von Smart-Home-Systemen bietet Pinout Limited. Produkte und Leistungen finden Sie auf [pinout.cloud](https://pinout.cloud).

## Home Assistant

Es gibt drei Integrationen für Home Assistant. Sie tun Unterschiedliches und sind nicht gleich aktuell.

| Integration | Was sie tut | Stand |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Überwacht Home Assistant auf Probleme. Sie verschlüsselt einen Fehlerbericht, lädt ihn auf IPFS hoch und speichert seine CID on-chain. Aus dem Bericht wird ein Support-Ticket bei Ihrem Integrator. Außerdem sendet sie täglich einen Heartbeat. | Wird gepflegt. Erscheint als Pre-Release. Braucht Home Assistant 2026.3.1 oder neuer; Installation über HACS als benutzerdefiniertes Repository. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | Fernzugriff auf Home Assistant über verschlüsselte Transaktionen mit einem RWS-Abonnement, dazu Benutzer und Backups. | Veraltet. Das letzte Release ist 2.2.1 vom Oktober 2025. Sie nutzt das alte `robonomics-interface` 1.6.3, braucht einen lokalen IPFS-Node, und ihre Standard-Endpunkte zeigen noch auf Kusama, das abgeschaltet ist. Ein Polkadot-Endpunkt lässt sich auswählen. Gegen die aktuelle Runtime wurde sie nicht geprüft. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | Liest einen Altruist-Sensor über das lokale Netzwerk aus. Die Chain nutzt sie nicht. | Klein, nur lokal. |

Die Robonomics-Integration von airalab hängt von RWS-Abonnements ab. Ihren aktuellen Stand finden Sie unter [Legacy-Pallets](/docs/legacy-pallets/#rws-subscriptions).

## Beliebige Geräte

Das sind die Bausteine, um ein eigenes Gerät anzubinden.

1. **Geben Sie dem Gerät ein eigenes Konto.** Der Schlüssel bleibt auf dem Gerät.
2. **Bezahlen Sie seine Transaktionen.** Schicken Sie dem Konto entweder etwas XRT (ein Datalog-Eintrag kostet zum Zeitpunkt des Schreibens einen Bruchteil eines Tausendstels XRT), oder fügen Sie es mit `rws.set_devices` einem RWS-Abonnement hinzu (bis zu 32 Geräte) und senden Sie seine Transaktionen über `rws.call`.
3. **Beschreiben Sie die Installation im Gerätebaum.** Legen Sie einen Knoten für den Standort und Knoten für seine Geräte an. Binden Sie das Gerätekonto als Identität an seinen Knoten. Geben Sie einem Gateway `Write`, wenn das Gateway für das Gerät schreibt. Siehe [Gerätebaum (CPS)](/docs/device-tree/).
4. **Schreiben Sie Daten.** Legen Sie den aktuellen Zustand im `payload` des Knotens ab (bis 8 KiB) oder schreiben Sie Einträge mit `datalog.record` (bis 512 Byte, [Legacy](/docs/legacy-pallets/#datalog)). Größere Daten legen Sie auf IPFS ab und schreiben deren CID.
5. **Senden Sie bei Bedarf Befehle.** Der Legacy-Aufruf `launch` sendet ein signiertes Befehls-Event an ein Gerätekonto. Siehe [Launch](/docs/legacy-pallets/#launch).

Bibliotheken für jeden Schritt: Python `robonomics-interface`, JavaScript `@polkadot/api` und Rust `libcps` mit dem Tool `cps`. Siehe [Client-Bibliotheken](/docs/client-libraries/).

### Gateways für kleine Geräte

Nicht jedes Gerät kann mit der Chain sprechen. Diese Open-Source-Gateways sitzen dazwischen:

- **edge** ([airalab/robins](https://github.com/airalab/robins)): nimmt signierte Nachrichten über HTTP und Meshtastic an und leitet sie über libp2p GossipSub weiter.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): macht aus MQTT-Nachrichten Aktualisierungen im Gerätebaum.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): sammelt signierte Messwerte von Sensoren und gibt sie an IPFS pubsub und die Parachain weiter. Sie bedient die Sensoren auf [sensors.social](https://sensors.social).

Die öffentlichen Relay-Nodes und ihren Status finden Sie unter [pubsub.robonomics.network](https://pubsub.robonomics.network).
