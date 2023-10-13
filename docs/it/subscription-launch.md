---
title: Come inviare un lancio con sottoscrizione

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  Fai attenzione che questo tutorial dimostra l'uso di una sottoscrizione su Robonomics Kusama parachain. Puoi eseguire tutti i passaggi anche sul tuo [nodo locale](/docs/run-dev-node).

</robo-wiki-note>

Se il tuo indirizzo ha una sottoscrizione attiva, allora tutti i dispositivi configurati con il segreto di quell'account possono inviare estrinseci senza commissioni. 
Proviamo a inviare il comando `launch`.

Vai alla pagina `Developer/Extrinsics`, quindi scegli il tuo account (quello dalla lista dei dispositivi) e seleziona `rws -> call(subscriptionId, call)`. Poi nel campo `subscriptionId` incolla l'indirizzo del proprietario della sottoscrizione (colui che ha fatto l'offerta all'asta) e nel campo successivo scegli `launch -> launch(robot, param)`. Nel campo `robot` digita l'indirizzo a cui desideri inviare la transazione `launch` e inserisci il comando (per la descrizione del comando di lancio consulta [qui](/docs/launch)). Poi invia la transazione: 

![launch](../images/rws/launch.png)


Ora vai alla pagina `Network/Explorer` e nell'area `Eventi Recenti` vedrai due eventi che hai creato: `rws.NewCall` e `launch.NewLaunch`:

![events](../images/rws/events.png)
