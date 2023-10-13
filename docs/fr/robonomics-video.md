---
title: Service vidéo Robonomics
contributors: [nakata5321]
---

Cet article montre comment ajouter une caméra IP à Home Assistant et envoyer des vidéos au service Web Robonomics.

Pour connecter une caméra à Home Assistant, vous devez connaître son adresse IP et créer un compte de caméra local pour vous connecter au flux RTSP.

<robo-wiki-note type="warning">
Comme cela est fait différemment pour chaque caméra, ce processus n'est pas considéré dans cet article.
</robo-wiki-note>

Exigences:
- Caméra IP
- Compte de caméra local configuré
- Adresse IP de la caméra
- Home Assistant configuré

<robo-wiki-note type="note">

Cet article suppose que vous avez une caméra IP générale sans options de rotation, d'inclinaison et de zoom (RTZ). 
Si vous avez une caméra RTZ, consultez l'article "Caméra RTZ" (/docs/ptz-camera). Ensuite, revenez à la deuxième étape ici.

</robo-wiki-note>

## Connexionez la caméra

Tout d’abord, vous devez connaître l’URL du flux RTSP de la caméra. 
Pour ce faire, essayez d'entrer la requête suivante sur Internet : "<NOM_DE_LA_CAMÉRA> flux RTSP".
L'URL du flux doit commencer par `rtsp://<ADRESSE_IP>...`. 

Cet article utilise une caméra "Tapo" et le chemin du flux est `rtsp://<ADRESSE_IP>/stream1`.

Ouvrez Home Assistant et allez dans "Settings"-> "Devices & Services". Appuyez sur le bouton "ADD INTEGRATION" et
commencez à taper "Generic Camera". Choisissez-la.

 <robo-wiki-picture src="home-assistant/generic.jpg" />

Dans la fenêtre de configuration, fournissez les informations suivantes :
- Stream Source URL - L'URL du flux RTSP de la caméra
- Username - écrivez le nom d'utilisateur de votre compte de caméra local
- Password - écrivez un mot de passe pour votre compte de caméra local

<robo-wiki-picture src="home-assistant/genericconf.jpg" />

Faites défiler les paramètres vers le bas et appuyez sur le bouton "Submit".

Dans la fenêtre d'aperçu, activez la case à cocher "This image looks good." et appuyez sur le bouton "Submit". Ensuite - "Finish".

<robo-wiki-picture src="home-assistant/preview-camera.jpg" />

### Ajoutez au tableau de bord

De plus, vous pouvez ajouter le flux à votre tableau de bord. Pour ce faire, accédez au tableau de bord et créez une nouvelle carte 
"Vue d'ensemble de l'image". Étapes supplémentaires :
- entrez le "Titre" souhaité
- supprimez les données du "Image Path"
- sélectionnez the camera in "Camera Entity"
- dans la "Camera View", sélectionnez "live" pour réduire le délai

Et enregistrez-le.
<robo-wiki-picture src="home-assistant/camera_picture_glance.jpg" />

## Vérifiez le dossier des médias

Avant d'être envoyée au service vidéo Robonomics, la vidéo doit être enregistrée dans un dossier et Home Assistant doit avoir accès à ce dossier.
La solution la plus simple dans ce cas est d'utiliser un pack multimédia, dans lequel Home Assistant stocke tous les médias.

- Si vous utilisez HAOS ou une image préinstallée, votre Home Assistant **a déjà un dossier Media**.
- Si vous utilisez Home Assistant Core, vous devez accéder au dossier `.homeassistant` et y créer un dossier `media`.
- Si vous utilisez Home Assistant Docker, ajoutez la ligne ` -v /CHEMIN_VERS_VOTRE_MEDIA:/media \` à la commande Docker.

Pour vérifier que tout est configuré correctement, accédez à l'onglet  “Media” -> “local media” de votre Home Assistant. 
Vous devriez voir un dossier vide (sans erreurs) :

<robo-wiki-picture src="home-assistant/media-folder.jpg" />

## Appel de service

Pour envoyer une vidéo à Robonomics, vous devez appeler un service dédié dans Home Assistant. 
Dans cet article, cela est fait manuellement, mais vous pouvez créer une automatisation pour cela.

Pour ce faire, allez dans "Developer tools" -> "Services" et recherchez "Robonomics: Save recording to Robonomics ".

<robo-wiki-picture src="home-assistant/robonomics-service.jpg" />

In "Targets", choisissez l'entité de votre caméra.
Dans "Path to save the recording" , vous devez fournir un chemin absolu vers le dossier,
où Home Assistant peut enregistrer la vidéo :
- Pour l'image préinstallée - `/home/homeassistant/.homeassistant/media`;
- Pour HA OS ou Home Assistant Docker- `/media`;
- Pour Home Assistant Core - Chemin vers le dossier des médias précédemment créé.

De plus, vous pouvez choisir la durée de l'enregistrement. 

Remplissez les données et appelez le service avec le bouton "CALL SERVICE".

## DAPP

Pour visualiser la vidéo résultante, accédez à [Robonomics DAPP](https://vol4tim.github.io/videostream/).

<robo-wiki-picture src="home-assistant/video-dapp.jpg" />

Collez l'adresse de compte de votre contrôleur et cliquez sur le bouton ci-dessous. Attendez le processus "Search for Twins". 
En résultat, vous obtiendrez un CID IPFS avec toutes les vidéos enregistrées.

<robo-wiki-picture src="home-assistant/video-ipfs.jpg" />

Ensuite, sélectionnez le compte du contrôleur (ou un autre) dans la liste déroulante et signez un message pour l'autorisation dans
la passerelle Web3 IPFS afin de télécharger toutes les vidéos. En résultat, vous obtiendrez toutes les vidéos enregistrées par votre maison intelligente.

<robo-wiki-picture src="home-assistant/show-videos.jpg" />

Comme toutes les vidéos du dossier sont chiffrées avec la clé du contrôleur, vous devez l'insérer pour déchiffrer les vidéos.
Après cela, le bouton de lecture de la vidéo est activé. Cliquez dessus pour télécharger la vidéo.

<robo-wiki-picture src="home-assistant/video-seed.jpg" />






