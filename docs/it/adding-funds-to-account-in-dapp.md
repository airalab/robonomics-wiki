---
title: Ajouter des fonds à votre compte sur le portail Robonomics

contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Dopo aver creato con successo i tuoi account sul portale Robonomics, è ora di aggiungere fondi ad essi in modo da poter avviare transazioni.**

<robo-wiki-note type="warning" title="Dev Node">

Fai attenzione che questi e i seguenti tutorial vengono dimostrati su un'istanza locale di Robonomics Node. Configura la tua con [queste istruzioni](/docs/run-dev-node).

</robo-wiki-note>

## 1. Vai alla sezione Account sul portale Robonomics 

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. Scegli l'account da cui desideri trasferire i fondi

In modalità di sviluppo, esistono diversi account, con un valore di 10000 Unità di fondi ciascuno, che possono essere utilizzati per trasferire fondi ad altri account creati nella rete di sviluppo. Questi account sono indicati da segni a chiave inglese <img alt="wrench sign" src="../images/adding-funds/wrench.png" width="20" /> accanto a loro.

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- Clicca sul pulsante "invia" dell'account da cui desideri trasferire i fondi, ad esempio BOB

## 3. Scegli l'account in cui desideri trasferire i fondi
Dopo aver cliccato sul pulsante "invia", ti verrà richiesto la finestra "invia fondi". Nella finestra richiesta:

- Dalla lista degli account disponibili, scegli l'account in cui desideri inviare i fondi.
- Inserisci il numero di Unità che desideri inviare.
- Premi "effettua trasferimento"

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. Autorizza la transazione

Dopo aver premuto "effettua trasferimento" nella fase precedente, ti verrà richiesta la finestra "autorizza transazione".<br/>
Rivedi i dettagli della transazione e infine clicca sul pulsante "firma e invia".

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")
In questo esempio, abbiamo trasferito 500 unità di fondi da "BOB" a "EMPLOYER". Puoi vedere che l'account di EMPLOYER, che inizialmente non aveva fondi, ora ha 500 Unità di fondi.

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**Assicurati di avere abbastanza fondi negli account che desideri utilizzare nel playground.**