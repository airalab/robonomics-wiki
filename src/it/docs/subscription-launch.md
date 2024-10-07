---
title: Come inviare il lancio con sottoscrizione

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"Parachain", type: "warning"}%}Fai attenzione che questo tutorial dimostra l'uso di una sottoscrizione sulla parachain Robonomics Kusama. Puoi eseguire tutti i passaggi anche sul tuo [nodo locale](/docs/run-dev-node). {% endroboWikiNote %}


Se il tuo indirizzo ha una sottoscrizione attiva, allora tutti i dispositivi configurati con il segreto di quell'account possono inviare estrinseci senza alcuna commissione.
Proviamo a inviare il comando `launch`.

Vai alla pagina `Sviluppatore/Estrinseci`, quindi scegli il tuo account (quello dalla lista dei dispositivi) e seleziona `rws -> call(subscriptionId, call)`.
Poi nel campo `subscriptionId` incolla l'indirizzo del proprietario della sottoscrizione (colui che ha fatto l'offerta all'asta) e nel campo successivo
scegli `launch -> launch(robot, param)`. Nel campo `robot` digita l'indirizzo a cui desideri inviare la transazione `launch`
e inserisci il comando (per la descrizione del comando di lancio consulta [qui](/docs/launch)). Quindi invia la transazione:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}


Ora vai alla pagina `Rete/Esploratore`, e nell'area `Eventi Recenti` vedrai due eventi che hai creato; `rws.NewCall` e `launch.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}