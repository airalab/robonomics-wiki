---
title: XRT und Governance
contributors: [Leemo94, ensrationis]
---

XRT ist der Token des Robonomics-Netzwerks. Mit ihm bezahlen Sie die Cloud und stimmen darüber ab, wie sich das Netzwerk verändert. Diese Seite behandelt beides.

## Wofür XRT verwendet wird

- **Gebühren.** Jede Transaktion zahlt eine Gebühr in XRT. Alle Gebühren und Tips fließen in den Pot der Collators.
- **Abonnements.** Die heutigen Abonnements (RWS) werden in Auktionen ersteigert, das Gewinnergebot wird verbrannt. Siehe [Legacy-Pallets](/docs/legacy-pallets/#rws-subscriptions).
- **Abstimmungen.** XRT-Inhaber entscheiden über Referenden.
- **Collator-Bond.** Ein Collator-Kandidat hinterlegt XRT. Siehe [Collator betreiben](/docs/run-collator/).

## Einheiten und Menge

- XRT hat 9 Dezimalstellen. 1 XRT = 1.000 Glushkov (mXRT) = 1.000.000 Coase (µXRT).
- Die Existenzeinlage beträgt 1 Coase, also 0,000001 XRT.
- Die Runtime prägt für jeden Block 0,0042 XRT an dessen Autor als Collator-Belohnung. Die Tokenomics begrenzt die Emission für Collators auf höchstens 25.000 XRT pro Jahr.
- Die Tokenomics deckelt die Gesamtmenge bei 5.100.000 XRT. Die Verteilung und den Lebenszyklus des Tokens finden Sie auf der [Tokenomics-Seite](https://robonomics.network/tokenomics/).

XRT gibt es auch auf Ethereum und auf Polkadot Asset Hub. Siehe [XRT in anderen Netzwerken](/docs/xrt-migration/).

## Governance

Robonomics nutzt das Standard-OpenGov von Polkadot. Es gibt keinen Sudo-Schlüssel: Seit Runtime 52 (Oktober 2026) braucht jede privilegierte Änderung, auch ein Runtime-Upgrade, ein Referendum. Sudo selbst wurde per Referendum entfernt. Es gibt keinen Council, keine Fellowship und keinen Treasury-Track.

Ein Referendum ist angenommen, wenn zwei Schwellen gleichzeitig erreicht sind:

- **Approval**: der Anteil der „Aye“-Stimmen an allen abgegebenen Stimmen.
- **Support**: der Anteil aller XRT, die mit „Aye“ gestimmt haben.

Beide starten hoch und sinken im Lauf der Entscheidungsphase. Wird ein Referendum angenommen und hält es die Bestätigungsphase durch, wird der Aufruf ausgeführt.

### Tracks

| | Root | Whitelisted Caller |
|---|---|---|
| Wofür | Runtime-Upgrades und jeder andere privilegierte Aufruf: Collator-Bond und -Limits, RWS-Auktionen, Konfiguration | Ein Schnellweg für einen bestimmten Aufruf, den das Core Team auf die Whitelist gesetzt hat |
| Gleichzeitig entscheidende Referenden | 1 | 10 |
| Decision Deposit | 5.000 XRT | 1 XRT |
| Vorbereitungsphase | 12 Stunden | 5 Minuten |
| Entscheidungsphase | 14 Tage | 3 Tage |
| Bestätigungsphase | 24 Stunden | 20 Minuten |
| Mindestverzögerung bis zur Ausführung | 1 Stunde | 5 Minuten |
| Approval | 90 % → 51 % über die Entscheidungsphase | 99 % → 80 % |
| Support | 50 % → 15 % | 2 % → 1 % |

Das sind die Werte der aktuellen Runtime. Sie zu ändern erfordert ein Root-Referendum.

### Weitere Kautionen

- **Submission Deposit:** 10 XRT. Jedes Konto kann ein Referendum einreichen.
- **Preimage Deposit:** 100 XRT plus 0,00001 XRT pro Byte des Aufrufs. Der Runtime-Code kennzeichnet diese Werte als Platzhalter, sie können sich also ändern.
- Ein Referendum, das innerhalb von 14 Tagen nicht in die Entscheidungsphase kommt, läuft ab.

### Core Team und Whitelisting

Das Core Team ist ein kleines Kollektiv mit höchstens 7 Mitgliedern. Seine Zusammensetzung lässt sich nur per Root-Referendum ändern.

So funktioniert das Whitelisting:

1. Das Core Team stimmt ab, den Hash eines ganz bestimmten Aufrufs auf die Whitelist zu setzen. Mindestens die Hälfte aller Mitglieder muss zustimmen. Ein Antrag des Core Teams läuft 3 Tage.
2. Das Whitelisting führt nichts aus. Der Aufruf braucht weiterhin ein Referendum auf dem Track Whitelisted Caller.
3. Ein Aufruf ohne Whitelisting kann nicht über den Schnellweg gehen. Über den Root-Track geht er weiterhin.

Es gibt also zwei Wege zu einer privilegierten Änderung: ein Root-Referendum oder ein Aufruf auf der Whitelist plus ein schnelles Referendum. Beide enden mit einer Abstimmung der XRT-Inhaber.

<div id="how-to-propose-a-change"></div>

## Eine Änderung vorschlagen

Die Schritte, die das Team veröffentlicht hat:

1. Beschreiben Sie die Idee in einem Issue auf [airalab/robonomics](https://github.com/airalab/robonomics/issues).
2. Reichen Sie ein Referendum in Polkadot.js Apps ein, im Bereich Governance, verbunden mit dem Robonomics-Netzwerk.
3. Informieren Sie die Community.

Was on-chain passiert:

1. Der Aufruf wird als Preimage gespeichert (Preimage Deposit).
2. Das Referendum wird auf einem Track eingereicht (10 XRT Submission Deposit).
3. Jemand hinterlegt das Decision Deposit: 5.000 XRT auf Root, 1 XRT auf Whitelisted Caller. Das kann jeder tun.
4. Das Referendum geht nach der Vorbereitungsphase in die Entscheidung, sobald das Decision Deposit hinterlegt ist und der Track einen freien Platz hat. Die Abstimmung entscheidet dann innerhalb der Entscheidungsphase.

## Abstimmen

- Halten Sie Ihr XRT in Ihrer eigenen Wallet im Robonomics-Netzwerk. Token auf einer Börse können nicht abstimmen.
- Stimmen Sie mit Conviction ab: Je länger Sie Ihr XRT sperren, desto mehr Gewicht hat Ihre Stimme.

| Sperre | Stimmgewicht |
|---|---|
| Keine Sperre | 0,1× |
| 7 Tage | 1× |
| 14 Tage | 2× |
| 28 Tage | 3× |
| 56 Tage | 4× |
| 112 Tage | 5× |
| 224 Tage | 6× |

- Statt selbst abzustimmen, können Sie Ihre Stimmkraft an ein anderes Konto delegieren.

Laufende und vergangene Referenden finden Sie in Polkadot.js Apps im Bereich Governance, wenn die App mit dem [Robonomics-RPC](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer) verbunden ist.

## Weiterlesen

- [Robonomics 5.0: handing the keys to XRT holders](https://robonomics.network/blog/robonomics-5-0-governance/)
- [Sudo is gone: the Robonomics cloud is now run by its community](https://robonomics.network/blog/robonomics-5-0-sudo-removed/)
- [Forumsdiskussion zum Zwei-Track-Design](https://forum.polkadot.network/t/robonomics-replacing-sudo-with-a-two-track-opengov-sized-for-a-small-community/18719)
