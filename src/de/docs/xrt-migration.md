---
title: XRT in anderen Netzwerken
contributors: [nakata5321, ensrationis]
---

Produktives XRT liegt auf der Robonomics-Parachain auf Polkadot. Diese Seite erklärt, was mit XRT auf Kusama und Ethereum passiert und wo es XRT auf Polkadot Asset Hub gibt.

## Kusama

Die Robonomics-Parachain auf Kusama wurde abgeschaltet. Ihren letzten Block, #12.268.835, hat sie am 28. September 2026 erzeugt. Ein Datenbankarchiv liegt unter [snapshots.robonomics.network](https://snapshots.robonomics.network/#kusama).

Was die veröffentlichten Beiträge über Kusama-XRT sagen:

- Alle XRT-Guthaben im letzten Block ziehen mit einem **Bonus von 20 %** nach Polkadot um.
- Auf der Kusama-Seite gibt es **keinen Rückkauf**.
- Wo die Guthaben auf Polkadot erscheinen und ob Inhaber etwas tun müssen, erklärt ein eigener Beitrag.

Achten Sie im [Robonomics-Blog](https://robonomics.network/blog/) auf diesen Beitrag. Quellen: [The Robonomics parachain on Kusama has stopped](https://robonomics.network/blog/robonomics-kusama-parachain-stopped/) und die [Tokenomics-Seite](https://robonomics.network/tokenomics/).

## Ethereum

Der alte XRT-Token auf Ethereum (`0x7dE91B204C1C737bcEe6F000AAA6569Cf7061cb7`) ist veraltet. Am 5. Februar 2026 wurde sein Emissionsmechanismus ausgenutzt, um kostenlos Token zu prägen. XRT auf Polkadot und Kusama war nicht betroffen.

Wer den alten Token zum Snapshot (Ethereum-Block 24.390.081) hielt, kann migrieren:

1. Öffnen Sie die Migrations-App: [airalab.github.io/XRT-snapshot-Feb26-exploit](https://airalab.github.io/XRT-snapshot-Feb26-exploit/).
2. Verbinden Sie die Wallet, die am 5. Februar 2026 XRT hielt. Die App zeigt Ihr Snapshot-Guthaben und den Betrag mit Bonus.
3. Wählen Sie eine Option. Jede Adresse kann nur einmal wählen.
   - **Accept**: Sie erhalten produktives XRT auf Ethereum, Ihr Snapshot-Guthaben plus 20 %.
   - **Decline**: Sie nehmen stattdessen am Rückkaufprogramm teil, zu einem Referenzpreis von 2,20 $, ausgezahlt über 12–36 Monate und nur, soweit die Mittel der Treasury es erlauben.

Prüfen Sie vor dem Signieren, dass die App mit dem Claim-Contract `0xB1b702972A022cca1aCfC0a64EcDFa6cd7899A2c` spricht. Sein Quellcode liegt unter [airalab/xrt-claim-contracts](https://github.com/airalab/xrt-claim-contracts).

Sie erhalten produktives XRT auf Ethereum, Contract `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. Es ist XRT, das 1:1 über [Snowbridge](https://app.snowbridge.network/send) von Polkadot gebrückt wurde. Sie können es halten, auf Uniswap handeln oder nach Polkadot brücken. Eine Brücke vom alten zum neuen Token gibt es nicht.

Die Beiträge setzen für die Migration ein Zeitfenster von 12 Monaten. Nicht rechtzeitig beanspruchtes XRT lässt sich nur per On-Chain-Abstimmung mit Eigentumsnachweis wiederherstellen. Die genauen Bedingungen stehen in den Beiträgen: [Ethereum R&D Stage migration has begun](https://robonomics.network/blog/ethereum-rd-stage-migration-has-begun/) und [Production Stage & Production Tokenomics Launch](https://robonomics.network/blog/production-stage-tokenomics-launch/).

Fragen: in der Telegram-Gruppe [XRT Traders](https://t.me/xrt_trade).

## Polkadot Asset Hub

XRT gibt es auf Polkadot Asset Hub als Foreign Asset, und es gibt einen DOT–XRT-Swap-Pool. Gebühren auf Asset Hub lassen sich in XRT bezahlen.

Eine Anleitung, wie man XRT zwischen Asset Hub und der Robonomics-Parachain bewegt, wurde noch nicht veröffentlicht.
