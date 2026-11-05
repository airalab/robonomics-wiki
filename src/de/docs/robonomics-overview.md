---
title: Übersicht
contributors: [ensrationis]
---

Robonomics ist eine Cloud für Geräte auf Polkadot. In der Cloud halten Sie eine Beschreibung Ihrer Geräte und ihren aktuellen Zustand, schreiben Messwerte und senden Befehle. Bezahlt wird in XRT, dem Token des Netzwerks. Kein einzelnes Unternehmen betreibt die Cloud: Unabhängige Collators betreiben sie, und die XRT-Inhaber steuern sie mit On-Chain-Abstimmungen.

## Die wichtigsten Bausteine

- **Gerätebaum (CPS).** Ein Baum aus Knoten, der Ihre Installation beschreibt: ein Gebäude, seine Räume, die Geräte darin. Jeder Knoten enthält eine kurze Beschreibung und den aktuellen Zustand. Der Eigentümer legt fest, wer in welchen Teil des Baums schreiben darf. Das ist heute der Kern von Robonomics. Siehe [Gerätebaum (CPS)](/docs/device-tree/).
- **XRT.** Der Token. Mit ihm werden Transaktionsgebühren und Abonnements bezahlt, und die XRT-Inhaber stimmen damit ab. Siehe [XRT und Governance](/docs/xrt-and-governance/).
- **Governance.** Standard-OpenGov von Polkadot mit zwei Tracks. Es gibt keinen Sudo-Schlüssel: Jede privilegierte Änderung, auch ein Runtime-Upgrade, läuft über ein Referendum.
- **Collators.** Die Server, die Blöcke erzeugen. Jeder kann Kandidat werden, indem er XRT hinterlegt. Siehe [Collator betreiben](/docs/run-collator/).

Ältere Bausteine (Datalog, Launch, RWS-Abonnements, Digital Twin, Liability) funktionieren weiterhin, sind aber veraltet. Siehe [Legacy-Pallets](/docs/legacy-pallets/).

## Das Netzwerk

| | |
|---|---|
| Netzwerk | Robonomics-Parachain auf Polkadot |
| Para ID | 3388 |
| Token | XRT, 9 Dezimalstellen |
| Adressformat | SS58-Präfix 32 (Adressen beginnen mit `4`) |
| Blockzeit | 6 Sekunden (Zielwert) |
| Öffentlicher RPC | `wss://polkadot.rpc.robonomics.network/` |
| Block-Explorer | [scan.robonomics.network](https://scan.robonomics.network) |
| Polkadot.js Apps | [mit dem Robonomics-RPC öffnen](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) |

Polkadot ist das einzige aktive Robonomics-Netzwerk. Die Parachain auf Kusama wurde abgeschaltet. Siehe [XRT in anderen Netzwerken](/docs/xrt-migration/).

## Woran gearbeitet wird

Robonomics 5.0 baut die Cloud in Schichten auf. Governance und der Gerätebaum mit Scope und Access sind live. An Abonnements wird gearbeitet: Ein Gerät soll das Netzwerk nutzen können, ohne selbst XRT zu halten. Speicher und Rechenleistung sind geplant, Code dafür gibt es noch nicht.

Mehr dazu im Blogbeitrag [Robonomics 5.0, part one](https://robonomics.network/blog/robonomics-5-0-runtime-first/) und in der [5.0-Roadmap](https://github.com/airalab/robonomics/blob/master/docs/robonomics-5.0-roadmap.md).

## Software und Maintainer

Die gesamte Robonomics-Software ist Open Source:

- [airalab/robonomics](https://github.com/airalab/robonomics): die Runtime und ihre Pallets.
- [airalab/robins](https://github.com/airalab/robins): Werkzeuge, darunter das Kommandozeilentool `cps` und Gateways für Geräte.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): die Python-Bibliothek.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): die Web-App unter [robonomics.app](https://robonomics.app).

Ein eigenes Robonomics-Node-Programm gibt es nicht. Collators betreiben den generischen `polkadot-omni-node` von Parity mit der Robonomics-Chain-Spec.

Die Robonomics-Websites, auch dieses Wiki, werden von Akagi Engineering Co., Ltd. (Japan) betrieben. Neuigkeiten und Release Notes stehen im [Robonomics-Blog](https://robonomics.network/blog/).
