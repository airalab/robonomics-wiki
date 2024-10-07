---
title: Aggiungere fondi al tuo account sul portale Robonomics

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Dopo aver creato con successo i tuoi account sul portale Robonomics, è ora di aggiungere fondi ad essi in modo da poter avviare transazioni.**

{% roboWikiNote {title: 'Nodo di sviluppo', type: "warning"} %}Fai attenzione che questo e i tutorial successivi vengono dimostrati su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Naviga alla sezione Account sul portale Robonomics

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"accounts"} %}{% endroboWikiPicture %}

## 2. Scegli l'account da cui desideri trasferire fondi

In modalità di sviluppo, esistono diversi account, con un valore di 10000 Unità di fondi ciascuno, che possono essere utilizzati per trasferire fondi ad altri account creati nella rete di sviluppo. Questi account sono indicati da segni a forma di chiave inglese <img src="/assets/images/docs/adding-funds/wrench.png" alt="wrench sign" width="20"/> accanto ad essi.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Accounts-for-sending", caption: "Accounts-for-sending"} %}{% endroboWikiPicture %}

- Clicca sul pulsante "send" dell'account da cui desideri trasferire fondi, ad esempio BOB

## 3. Scegli l'account in cui desideri trasferire i fondi
Dopo aver cliccato sul pulsante "send", ti verrà chiesto di aprire la "finestra di invio fondi". Nella finestra visualizzata:

- Dalla lista degli account disponibili, scegli l'account in cui desideri inviare i fondi.
- Inserisci il numero di Unità che desideri inviare.
- Premi "effettua trasferimento"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transfer-Funds", caption: "Transfer-Funds"} %}{% endroboWikiPicture %}

## 4. Autorizza la transazione

Dopo aver premuto "effettua trasferimento" nella fase precedente, ti verrà chiesto di aprire la "finestra di autorizzazione della transazione".<br/>
Rivedi i dettagli della transazione e infine clicca sul pulsante "firma e invia".

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"sign-transaction", caption: "sign-transaction"} %}{% endroboWikiPicture %}

In questo esempio, abbiamo trasferito 500 unità di fondi da "BOB" a "EMPLOYER". Puoi vedere che l'account di EMPLOYER, che inizialmente non aveva fondi, ora ha 500 Unità di fondi.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"funds-added", caption: "funds-added"} %}{% endroboWikiPicture %}

**Assicurati di avere abbastanza fondi negli account che desideri utilizzare nel playground.**