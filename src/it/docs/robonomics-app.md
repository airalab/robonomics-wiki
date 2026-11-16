---
title: Usare robonomics.app
contributors: [vol4tim, positivecrash, ensrationis]
---

[robonomics.app](https://robonomics.app) è la web app di Robonomics. Con essa compri un abbonamento, colleghi Home Assistant, controlli la tua casa da qualsiasi browser e guardi l'albero dei dispositivi e i dati dei sensori. Questa pagina la percorre schermata per schermata.

Ti serve un'estensione wallet Polkadot con un account su Robonomics. Per comprare qualcosa o inviare una transazione, l'account deve avere un po' di XRT. Vedi [Primi passi](/docs/getting-started/).

## Collega il wallet

Il pulsante del wallet è in alto a destra. Scegli un account dalla tua estensione e consenti al sito di usarlo. Lo stesso pulsante cambia rete. Usa Polkadot.

## Compra un abbonamento

**Buy/renew a subscription** nel menu.

- La pagina mostra il prezzo, il tempo di attivazione (circa due minuti) e quanti abbonamenti sono disponibili in questo momento.
- Il tuo saldo deve coprire il prezzo più una piccola commissione.
- Un'unica transazione fa un'offerta su un'asta libera e aggiunge il tuo account all'abbonamento.
- Se non ci sono abbonamenti disponibili, se ne aprono di nuovi solo dopo un voto di governance. Vedi [Pallet legacy](/docs/legacy-pallets/#current-state).

L'abbonamento permette agli account elencati di inviare transazioni senza commissioni. È ciò che Home Assistant usa per parlare con la chain. Dettagli: [Abbonamenti RWS](/docs/legacy-pallets/#rws-subscriptions).

## Aggiungi un setup

Un setup è la tua casa come la vede l'app: un abbonamento e gli account collegati. **New setup** nel menu offre tre modi per aggiungerne uno:

- **Con l'indirizzo del proprietario.** Incolla l'indirizzo che detiene l'abbonamento. L'app trova l'abbonamento e ne mostra la data di fine, anche se è già scaduto.
- **Con l'estensione.** Scegli l'account del proprietario dal wallet invece di digitarlo.
- **Da un file.** Carica un backup che hai esportato in precedenza.

L'elenco dei setup sta solo nel tuo browser. Rimuovere un setup dall'app lo toglie da questo elenco, e on-chain non cambia nulla.

## Your setup

**Your setup** mostra un abbonamento:

- **Active until.** La data di fine, in rosso quando è passata.
- **Owner.** L'account che detiene l'abbonamento.
- **Controller.** L'account che il tuo Home Assistant usa per scrivere sulla chain. Lo crea l'integrazione di Home Assistant; tu lo incolli qui.
- **Users.** Gli account che possono controllare la casa. Aggiungere o rimuovere un utente è una transazione del proprietario.
- **Subscription backup.** Esporta il setup in un file. Per passare a un altro browser o dispositivo, carica quel file in **New setup**.

## Dispositivi e controllo

**Devices & Control** apre la dashboard di Home Assistant nel browser.

- Scegli un utente e inserisci la sua frase chiave. L'app la usa per decifrare i dati di Home Assistant. Resta nel browser.
- Spunta **Keep me signed in** solo su un dispositivo di cui ti fidi.
- L'app si collega a Home Assistant direttamente, peer to peer. Quando una connessione diretta non è possibile, passa da un relay. I dati sono cifrati per tutto il percorso.

Perché questa pagina funzioni, Home Assistant ha bisogno dell'integrazione Robonomics. [Collegare i dispositivi](/docs/connect-devices/#home-assistant) dice quali integrazioni esistono e quanto sono aggiornate.

## Albero dei dispositivi

**Device tree** nel menu mostra l'[albero dei dispositivi](/docs/device-tree/) di Robonomics 5.0.

- La pagina iniziale elenca i nodi radice e i loro proprietari.
- Apri un nodo tramite il suo numero o l'account del suo dispositivo.
- La pagina di un nodo mostra il percorso fino alla radice, il proprietario, l'account del dispositivo, `meta` e `payload` (JSON e testo vengono mostrati come testo), i figli e i permessi.
- Con un account collegato puoi creare un nodo radice, aggiungere figli ai nodi di cui sei proprietario e modificare `meta` e `payload` dove sei il proprietario o hai il permesso `Write`. Tutto ciò che sta nell'albero è pubblico.

## Datalog

**Send your first record** nella pagina iniziale apre la pagina Datalog.

- Scrivi fino a 512 byte e invia. La commissione è molto inferiore a 0.001 XRT.
- Sotto vedi i record di qualsiasi account, dal più recente. La chain conserva gli ultimi 128 record per account.

Datalog è un [pallet legacy](/docs/legacy-pallets/#datalog). È un buon primo test. Per i dispositivi usa l'albero dei dispositivi.

## Sensori e gemelli digitali

- **Altruist.** Apri `robonomics.app/#/altruist/<sensor address>` per vedere le letture del sensore registrate on-chain: particolato, rumore, temperatura, umidità e pressione in hPa su un asse a parte. Vedi [Altruist e sensors.social](/docs/altruist/).
- **Monitoraggio energetico.** Apri `robonomics.app/#/energy-monitor/<address>` per fare lo stesso con un monitor di energia.
- **Gemello digitale.** Elenca i tuoi gemelli e gli account dietro ogni topic. Vedi [DigitalTwin](/docs/legacy-pallets/#digitaltwin).

Se un indirizzo non ha letture, la pagina lo dice invece di restare in caricamento.

## Se qualcosa non va

- **L'app si collega alla rete sbagliata.** L'app ricorda un indirizzo di rete passato una volta in un link. Apri una volta `https://robonomics.app/?rpc=wss://polkadot.rpc.robonomics.network/` per tornare indietro.
- **Un link di Uniswap mostra un token diverso.** L'XRT di produzione su Ethereum è `0x1F752250f518e419f2F03804E25728c5C6DfF73f`. Il vecchio token `0x7dE9…1cb7` non è l'XRT di produzione. Vedi [XRT su altre reti](/docs/xrt-migration/).
- **Non si riesce a gestire un abbonamento Kusama.** Robonomics su Kusama è stato fermato, quindi l'app gestisce solo abbonamenti su Polkadot. Vedi [XRT su altre reti](/docs/xrt-migration/).
- **Qualsiasi altra cosa.** Apri una issue su [github.com/airalab/robonomics.app](https://github.com/airalab/robonomics.app/issues). Indica la versione della build presa dalla console del browser. Viene stampata all'avvio dell'app.
