---
title: Erste Schritte
contributors: [Vourhey, positivecrash, ensrationis]
---

Diese Seite führt Sie vom Nullpunkt bis zu Ihrem ersten Eintrag im Robonomics-Netzwerk. Sie brauchen einen Browser, eine Wallet-Erweiterung und etwas XRT.

## 1. Konto anlegen

1. Installieren Sie die [Polkadot.js-Erweiterung](https://polkadot.js.org/extension/) oder eine andere Polkadot-Wallet, die mit einem eigenen Netzwerk umgehen kann.
2. Legen Sie in der Wallet ein Konto an. Schreiben Sie die Wiederherstellungsphrase auf und bewahren Sie sie offline auf.
3. Dasselbe Konto funktioniert auch auf Robonomics. Robonomics zeigt Adressen in einem eigenen Format (SS58-Präfix 32), deshalb beginnt Ihre Adresse dort mit `4`.

Ein Konto existiert on-chain erst, wenn es mindestens die Existenzeinlage hält: 0,000001 XRT.

## 2. XRT besorgen

Sie brauchen sehr wenig. Zum Zeitpunkt des Schreibens kostet ein Datalog-Eintrag deutlich weniger als 0,001 XRT an Gebühren.

Wo XRT heute gehandelt wird:

- **Uniswap auf Ethereum.** Das produktive XRT auf Ethereum ist XRT, das über Snowbridge von Polkadot gebrückt wurde. Sein Contract ist `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. [Auf Uniswap tauschen](https://app.uniswap.org/swap?chain=mainnet&inputCurrency=NATIVE&outputCurrency=0x1f752250f518e419f2f03804e25728c5c6dff73f). [Snowbridge](https://app.snowbridge.network/send) überträgt Token zwischen Ethereum und Polkadot.
- **Polkadot Asset Hub.** XRT gibt es auf Asset Hub, und dort existiert ein DOT–XRT-Swap-Pool.

XRT von Asset Hub auf Ihr Konto in der Robonomics-Parachain zu bringen, ist ein Cross-Chain-Transfer. Eine Schritt-für-Schritt-Anleitung dafür wurde noch nicht veröffentlicht. Wenn Sie nicht weiterkommen, fragen Sie in der Telegram-Gruppe [XRT Traders](https://t.me/xrt_trade).

{% roboWikiNote {type: "warning", title: "Alte Links"}%} Einige ältere Seiten verlinken noch auf Börsen, die XRT nicht mehr listen, und auf den alten Ethereum-Token `0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`. Der alte Token ist kein produktives XRT. {% endroboWikiNote %}

## 3. Polkadot.js Apps verbinden

Öffnen Sie [Polkadot.js Apps mit dem Robonomics-RPC](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/explorer). Die Seite verbindet sich mit dem öffentlichen Endpunkt `wss://polkadot.rpc.robonomics.network/`. Erlauben Sie die Seite in Ihrer Wallet-Erweiterung, damit Ihr Konto erscheint.

Blöcke, Konten und Transfers können Sie sich auch im Block-Explorer unter [scan.robonomics.network](https://scan.robonomics.network) ansehen.

<div id="4-send-your-first-record"></div>

## 4. Den ersten Eintrag senden

Der einfachste erste Schritt ist ein Datalog-Eintrag: ein kurzes Stück Daten, das on-chain unter Ihrem Konto gespeichert wird.

1. Öffnen Sie in Polkadot.js Apps **Developer → Extrinsics**.
2. Wählen Sie Ihr Konto, dann `datalog` und `record`.
3. Geben Sie Ihre Daten ein, bis zu 512 Byte. Einfacher Text genügt.
4. Senden Sie die Transaktion ab und signieren Sie sie in der Wallet.

Zum Auslesen öffnen Sie **Developer → Chain state**, wählen `datalog` und `datalogIndex` und fragen Ihr Konto ab. Sie sehen, in welchen Slots Ihre Einträge liegen. Fragen Sie dann `datalogItem` mit Ihrem Konto und einer Slot-Nummer ab. Jeder Eintrag hat einen Zeitstempel.

Datalog gehört zu den [Legacy-Pallets](/docs/legacy-pallets/#datalog). Es funktioniert weiterhin und eignet sich gut als erster Test, neue Projekte sollten aber den Gerätebaum nutzen.

## 5. Weiter: Geräte beschreiben

Der Kern von Robonomics ist der Gerätebaum. Sie legen einen Knoten für Ihre Installation an, fügen Knoten für ihre Teile und Geräte hinzu und legen fest, wer sie aktualisieren darf. Siehe [Gerätebaum (CPS)](/docs/device-tree/), danach [Geräte verbinden](/docs/connect-devices/).
