---
title: Collegare i dispositivi
contributors: [Fingerling42, nakata5321, ensrationis]
---

Ci sono due modi per portare i dispositivi su Robonomics: tramite Home Assistant, oppure direttamente, con qualsiasi dispositivo in grado di firmare una transazione o di parlare con un gateway.

Hardware pronto all'uso e installazioni per la casa intelligente sono forniti da Pinout Limited. Prodotti e servizi su [pinout.cloud](https://pinout.cloud).

## Home Assistant

Esistono tre integrazioni per Home Assistant. Fanno cose diverse e non sono tutte aggiornate allo stesso modo.

| Integrazione | Cosa fa | Stato |
|---|---|---|
| [Robonomics Report Service](https://github.com/PinoutLTD/rrs-ha-integration) (Pinout) | Controlla Home Assistant alla ricerca di problemi. Cifra un report di errore, lo carica su IPFS e registra il suo CID on-chain. Il report diventa un ticket di assistenza presso il tuo installatore. Invia anche un heartbeat giornaliero. | Mantenuta. Rilasciata come pre-release. Richiede Home Assistant 2026.3.1 o successivo; si installa tramite HACS come repository personalizzato. |
| [Robonomics integration](https://github.com/airalab/homeassistant-robonomics-integration) (airalab) | Accesso remoto a Home Assistant con transazioni cifrate sotto un abbonamento RWS, più utenti e backup. | Ferma. L'ultima release è la 2.2.1 di ottobre 2025. Usa il vecchio `robonomics-interface` 1.6.3, richiede un nodo IPFS locale e gli endpoint predefiniti puntano ancora a Kusama, che è stata fermata. Si può scegliere un endpoint Polkadot. Non è stata verificata con il runtime attuale. |
| [Altruist integration](https://github.com/airalab/altruist-homeassistant-integration) (airalab) | Legge un sensore Altruist sulla rete locale. Non usa la chain. | Piccola, solo locale. |

L'integrazione Robonomics di airalab dipende dagli abbonamenti RWS. Il loro stato attuale è descritto in [Pallet legacy](/docs/legacy-pallets/#rws-subscriptions).

## Qualsiasi dispositivo

Questi sono i mattoni per collegare un tuo dispositivo.

1. **Dai al dispositivo un suo account.** La chiave resta sul dispositivo.
2. **Paga le sue transazioni.** Invia all'account un po' di XRT (al momento in cui scriviamo un record datalog costa una frazione di millesimo di XRT), oppure aggiungilo a un abbonamento RWS con `rws.set_devices` (fino a 32 dispositivi) e invia le sue transazioni tramite `rws.call`.
3. **Descrivi l'installazione nell'albero dei dispositivi.** Crea un nodo per il sito e nodi per i suoi dispositivi. Lega l'account del dispositivo al suo nodo come identità del nodo. Concedi `Write` a un gateway se è il gateway a scrivere per il dispositivo. Vedi [Albero dei dispositivi (CPS)](/docs/device-tree/).
4. **Scrivi i dati.** Metti lo stato attuale nel `payload` del nodo (fino a 8 KiB), oppure scrivi record con `datalog.record` (fino a 512 byte, [legacy](/docs/legacy-pallets/#datalog)). Metti i dati più grandi su IPFS e scrivi il loro CID.
5. **Invia comandi, se serve.** La chiamata legacy `launch` invia a un account di dispositivo un evento di comando firmato. Vedi [Launch](/docs/legacy-pallets/#launch).

Librerie per ogni passo: Python `robonomics-interface`, JavaScript `@polkadot/api` e Rust `libcps` con lo strumento `cps`. Vedi [Librerie client](/docs/client-libraries/).

### Gateway per piccoli dispositivi

Non tutti i dispositivi possono parlare con la chain. Questi gateway open source fanno da intermediari:

- **edge** ([airalab/robins](https://github.com/airalab/robins)): riceve messaggi firmati via HTTP e Meshtastic e li inoltra tramite libp2p GossipSub.
- **mqtt-bridge** ([airalab/robins](https://github.com/airalab/robins)): trasforma i messaggi MQTT in aggiornamenti dell'albero dei dispositivi.
- **sensors-connectivity** ([airalab/sensors-connectivity](https://github.com/airalab/sensors-connectivity)): raccoglie le misure firmate dei sensori e le inoltra a IPFS pubsub e alla parachain. Serve i sensori di [sensors.social](https://sensors.social).

I nodi relay pubblici e il loro stato sono su [pubsub.robonomics.network](https://pubsub.robonomics.network).
