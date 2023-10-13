---
title: Come collegare il sensore SDS011

contributors: [tubleronchik]
---

** Ecco una guida passo-passo su come collegare il tuo sensore alla rete dei sensori Robonomics. I nostri sensori utilizzano il firmware Robonomics, che è una versione migliorata del firmware sensor.community. Include sensori aggiuntivi e ha un meccanismo di invio dati modificato. **

1. Collega il sensore alla presa per alimentarlo.
2. La scheda creerà una rete Wi-Fi chiamata `RobonomicsSensor-xxxxxxxxx`. Connettiti ad essa dal tuo telefono o computer: vedrai la finestra di autorizzazione (se non la vedi, apri il browser e vai su `192.168.4.1`).
3. Seleziona la tua rete Wi-Fi dalla lista (o scrivila tu stesso se non è nella lista) e compila il campo password.
<robo-wiki-note type="okay" title="INFO">
Il sensore può essere collegato solo a una rete Wi-Fi a 2,4 GHz.
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Scrivi le coordinate del luogo in cui verrà installato il sensore. Puoi ottenerle da qualsiasi mappa o ottenerle dall'indirizzo utilizzando [questo link.](https://www.latlong.net/convert-address-to-lat-long.html)
<robo-wiki-note type="warning" title="WARNING">
Le coordinate del sensore verranno quindi visualizzate su una mappa pubblicamente disponibile. Se non desideri mostrare le tue informazioni private, scrivi 'vicino', ma non le coordinate esatte.
</robo-wiki-note> 
5. Fai clic su `Save configuration and restart`. La scheda si riavvierà e si connetterà alla rete Wi-Fi specificata.
6. Apri [Mappa dei sensori Robonomics](https://sensors.robonomics.network/#/) e trova il luogo in cui hai installato il sensore. In un paio di minuti sarai in grado di vedere il tuo sensore con i dati sulla mappa.
<robo-wiki-picture src="sds-sensor-map.png"/>

