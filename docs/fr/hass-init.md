---
title: Initialisation de Home Assistant
contributors: [nakata5321, PaTara43]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
---

**Après avoir installé Home Assistant, il doit être initialisé.**

<robo-wiki-picture src="home-assistant/ha_init.png" />

Vous commencez par la création du compte propriétaire de Home Assistant. Ce compte est un administrateur et peut apporter toutes les modifications nécessaires. Ouvrez un navigateur web et allez à l'adresse `http://%RASPBERRY_IP_ADDRESS%:8123`. Vous pouvez trouver l'adresse IP du Raspberry Pi en utilisant l'application mobile [Fing](https://www.fing.com/products) ou l'outil en ligne de commande [nmap](https://vitux.com/find-devices-connected-to-your-network-with-nmap/).

<robo-wiki-note type="note">L'adresse du Raspberry Pi peut changer avec le temps en fonction des paramètres du routeur.</robo-wiki-note>

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type:'mp4'}]" />

1. Sur la première page, saisissez un nom, un nom d'utilisateur, un mot de passe et cliquez sur le bouton `CREATE ACCOUNT`.

2. À l'écran suivant, saisissez un nom pour votre domicile, définissez votre emplacement et votre système d'unités. Cliquez sur `DETECT` pour trouver votre emplacement et définir votre fuseau horaire et votre système d'unités en fonction de cet emplacement. Si vous ne souhaitez pas envoyer votre emplacement, vous pouvez définir ces valeurs manuellement.

3. Ensuite, Home Assistant affichera tous les appareils qu'il a découverts sur votre réseau. Ne vous inquiétez pas si vous en voyez moins que ce qui est indiqué ci-dessous ; vous pouvez toujours ajouter des appareils manuellement ultérieurement. Pour l'instant, cliquez simplement sur `FINISH` et vous serez sur l'écran principal de Home Assistant.

4. Enfin, vous verrez l'interface web de Home Assistant, qui affichera tous vos appareils. 


## Dépannage

1. Si vous oubliez votre nom d'utilisateur ou votre mot de passe pour l'utilisateur local, [consultez cet article](https://www.home-assistant.io/docs/locked_out/) pour restaurer vos informations d'identification.
