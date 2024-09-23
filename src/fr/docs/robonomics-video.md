---
title: Service Vidéo Robonomics
contributors: [nakata5321]
---

Cet article montre comment ajouter une caméra IP à Home Assistant et envoyer des vidéos au service Web Robonomics.

Pour connecter une caméra à Home Assistant, vous devez connaître son adresse IP et créer un compte de caméra local pour vous connecter au flux RTSP.

{% roboWikiNote {type: "warning"}%} Comme cela se fait différemment pour chaque caméra, ce processus n'est pas abordé dans cet article.
{% endroboWikiNote %}

Exigences :
- Caméra IP
- Compte de caméra local configuré
- Adresse IP de la caméra
- Home Assistant configuré

{% roboWikiNote {type: "warning"}%} Cet article suppose que vous avez une caméra IP générale sans options de rotation, d'inclinaison ou de zoom. Si vous avez une caméra RTZ, consultez l'article sur les caméras RTZ et revenez à la deuxième étape ici. {% endroboWikiNote %}

## Connecter la Caméra

Tout d'abord, vous devez trouver l'URL du flux RTSP de la caméra.
Pour ce faire, essayez de saisir la requête suivante sur Internet : "<NOM_DE_LA_CAMÉRA> flux RTSP".
L'URL du flux doit commencer par `rtsp://<Adresse_IP>...`.

Cet article utilise une caméra "Tapo" et le chemin du flux est `rtsp://<Adresse_IP>/stream1`.

Ouvrez Home Assistant et allez dans "Paramètres" -> "Appareils et services". Appuyez sur le bouton "AJOUTER UNE INTÉGRATION" et commencez à taper "Caméra Générique" dans l'intégration. Choisissez-la.

{% roboWikiPicture {src:"docs/home-assistant/generic.jpg", alt:"hass"} %}{% endroboWikiPicture %}

Dans la fenêtre de configuration, fournissez les informations suivantes :
- URL de la source du flux - L'URL du flux RTSP de la caméra
- Nom d'utilisateur - écrivez le nom d'utilisateur de votre compte de caméra local
- Mot de passe - écrivez un mot de passe pour votre compte de caméra local

{% roboWikiPicture {src:"docs/home-assistant/genericconf.jpg", alt:"genericconf"} %}{% endroboWikiPicture %}

Faites défiler les paramètres vers le bas et appuyez sur le bouton "Soumettre".

Dans la fenêtre d'aperçu, activez la case à cocher "Cette image est bonne." et appuyez sur le bouton "Soumettre". Ensuite - "Terminer".

{% roboWikiPicture {src:"docs/home-assistant/preview-camera.jpg", alt:"preview-camera"} %}{% endroboWikiPicture %}

### Ajouter au tableau de bord

De plus, vous pouvez ajouter le flux à votre tableau de bord. Pour ce faire, accédez au tableau de bord et créez une nouvelle carte "Vue d'ensemble de l'image". Étapes supplémentaires :
- Entrez le "Titre" que vous souhaitez
- Supprimez les données du "Chemin de l'image"
- Sélectionnez la caméra dans "Entité de la caméra"
- Dans "Vue de la caméra", sélectionnez "en direct" pour qu'il y ait moins de retard

Et enregistrez.

{% roboWikiPicture {src:"docs/home-assistant/camera_picture_glance.jpg", alt:"camera_picture_glance"} %}{% endroboWikiPicture %}

## Vérifier le dossier des médias

Avant d'être envoyée au service vidéo Robonomics, la vidéo doit être enregistrée dans un dossier, et Home Assistant doit avoir accès à ce dossier.
La solution la plus simple dans ce cas est d'utiliser un pack multimédia, dans lequel Home Assistant stocke tous les médias.

- Si vous utilisez HAOS ou une image préinstallée, votre Home Assistant **a déjà un dossier Média**.
- Si vous utilisez Home Assistant Core, vous devez accéder au dossier `.homeassistant` et y créer un dossier `media`.
- Si vous utilisez Home Assistant Docker, ajoutez la ligne ` -v /CHEMIN_VERS_VOTRE_MEDIA:/media \` à la commande Docker.

Pour vérifier que tout a été configuré correctement, allez dans l'onglet "Média" -> "média local" de votre Home Assistant.
Vous devriez voir un dossier vide (pas d'erreurs) :

{% roboWikiPicture {src:"docs/home-assistant/media-folder.jpg", alt:"media-folder"} %}{% endroboWikiPicture %}

## Appel de service

Pour envoyer une vidéo à Robonomics, vous devez appeler un service dédié dans Home Assistant.
Dans cet article, cela est fait manuellement, mais vous pouvez créer une automatisation pour cela.

Pour ce faire, allez dans "Outils pour les développeurs" -> "Services" et trouvez "Robonomics : Enregistrer l'enregistrement dans Robonomics".

{% roboWikiPicture {src:"docs/home-assistant/robonomics-service.jpg", alt:"robonomics-service"} %}{% endroboWikiPicture %}

Dans "Cibles", choisissez votre entité caméra.
Dans "Chemin pour enregistrer l'enregistrement", vous devez fournir un chemin absolu vers le dossier où Home Assistant peut enregistrer la vidéo :
- Pour l'image préinstallée - `/home/homeassistant/.homeassistant/media`;
- Pour HA OS ou Home Assistant Docker - `/media`- Pour Home Assistant Core - Chemin vers le dossier multimédia précédemment créé.

De plus, vous pouvez choisir la durée d'enregistrement.

Remplissez les données et appelez le service avec le bouton "APPELER LE SERVICE".

## DAPP

Pour visualiser la vidéo résultante, rendez-vous sur [Robonomics DAPP](https://vol4tim.github.io/videostream/).

{% roboWikiPicture {src:"docs/home-assistant/video-dapp.jpg", alt:"video-dapp"} %}{% endroboWikiPicture %}

Collez l'adresse du compte de votre contrôleur et cliquez sur le bouton ci-dessous. Attendez le processus de "Recherche de jumeaux".
En résultat, vous obtiendrez un CID IPFS avec toutes les vidéos enregistrées.

{% roboWikiPicture {src:"docs/home-assistant/video-ipfs.jpg", alt:"video-ipfs"} %}{% endroboWikiPicture %}

Ensuite, sélectionnez le compte du contrôleur (ou tout autre) dans la liste déroulante et signez un message pour l'autorisation dans
la passerelle Web3 IPFS pour télécharger toutes les vidéos. En résultat, vous obtiendrez toutes les vidéos enregistrées par votre maison intelligente.

{% roboWikiPicture {src:"docs/home-assistant/show-videos.jpg", alt:"show-videos"} %}{% endroboWikiPicture %}

Étant donné que toutes les vidéos dans le dossier sont cryptées avec la clé du contrôleur, vous devez l'insérer pour décrypter les vidéos.
Ensuite, le bouton de lecture de la vidéo est activé. Cliquez dessus pour télécharger la vidéo.

{% roboWikiPicture {src:"docs/home-assistant/video-seed.jpg", alt:"video-seed"} %}{% endroboWikiPicture %}