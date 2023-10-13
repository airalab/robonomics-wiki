---
title: Comment connecter le capteur SDS011

contributors: [tubleronchik]
---

** Voici un guide étape par étape sur la façon de connecter votre capteur au réseau de capteurs Robonomics. Nos capteurs utilisent le micrologiciel Robonomics, qui est une version améliorée du micrologiciel sensor.community. Il comprend des capteurs supplémentaires et dispose d'un mécanisme de transmission de données modifié. **

1. Branchez le capteur dans la prise pour l'alimenter.
2. La carte créera un réseau Wi-Fi nommé `RobonomicsSensor-xxxxxxxxx`. Connectez-vous à partir de votre téléphone ou de votre ordinateur: vous verrez la fenêtre d'autorisation (si ce n'est pas le cas, ouvrez le navigateur et allez à `192.168.4.1`).
3. Sélectionnez votre réseau Wi-Fi dans la liste (ou écrivez-le vous-même s'il n'est pas dans la liste) et remplissez le champ du mot de passe.
<robo-wiki-note type="okay" title="INFO">
Le capteur ne peut être connecté qu'à un réseau Wi-Fi 2,4 GHz.
</robo-wiki-note> 
<robo-wiki-picture src="sds-sensor-wifi.png"/>
4. Écrivez les coordonnées de l'endroit où le capteur sera installé. Vous pouvez les obtenir à partir de n'importe quelle carte ou les obtenir à partir de l'adresse en utilisant [ce lien.](https://www.latlong.net/convert-address-to-lat-long.html)
<robo-wiki-note type="warning" title="WARNING">
Les coordonnées du capteur seront ensuite affichées sur une carte publiquement disponible. Si vous ne souhaitez pas afficher vos informations privées, écrivez proche, mais pas des coordonnées exactes.
</robo-wiki-note> 
5. Cliquez sur `Save configuration and restart`. La carte redémarrera et se connectera au réseau Wi-Fi spécifié.
6. Ouvrez [la carte des capteurs Robonomics](https://sensors.robonomics.network/#/) et trouvez l'endroit où vous avez installé le capteur. En quelques minutes, vous pourrez voir votre capteur avec des données sur la carte.
<robo-wiki-picture src="sds-sensor-map.png"/>

