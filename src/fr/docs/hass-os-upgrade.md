---

title: Mettez à niveau votre Home Assistant OS
contributors: [LoSk-p]
outils:
  - Home Assistant OS 12.1 pour RaspPi
    https://github.com/home-assistant/operating-system
  - Home Assistant Core 2024.5.1
    https://github.com/home-assistant/core
  - HACS 1.34.0
    https://github.com/hacs/integration/
  - Intégration Robonomics Home Assistant 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
  - Add-on IPFS Home Assistant 1.3.2
    https://github.com/PinoutLTD/ipfs-addon
  - Add-on Proxy Libp2p <-> WS 0.0.1
    https://github.com/PinoutLTD/addon-libp2p-ws-proxy

---

**Cet article contient des instructions pour mettre à niveau votre Home Assistant OS existant avec l'intégration Robonomics.**


{% roboWikiPicture {src:"docs/home-assistant/homeassistant_os.png", alt:"homeassistant_os"} %}{% endroboWikiPicture %}

## Installer HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) vous permet d'installer des intégrations personnalisées.

{% roboWikiVideo {videos:[{src: 'mYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Avant de commencer, vous devez installer un add-on pour vous connecter à l'appareil Home Assistant avec SSH. Dans la boutique d'add-ons, recherchez `ssh`. Nous vous recommandons d'installer l'add-on `SSH & Web Terminal`.

{% roboWikiNote {title:"Avertissement", type: "warning"}%} Si l'add-on SSH n'est pas trouvé, essayez d'activer le Mode Avancé dans les paramètres de votre profil utilisateur. Pour ce faire, cliquez sur l'icône de profil dans le coin inférieur gauche et trouvez l'option Mode Avancé.{% endroboWikiNote %}

2. Choisissez l'add-on et appuyez sur `INSTALLER`. Après l'installation, allez dans l'onglet `Configuration` et ajoutez un `mot de passe` ou des `clés autorisées`. N'oubliez pas de sauvegarder cette partie de la configuration.

3. Dans l'onglet `Info`, appuyez sur `DÉMARRER`. Si vous souhaitez voir l'add-on dans la barre latérale, n'oubliez pas d'activer `Afficher dans la barre latérale`.

{% roboWikiVideo {videos:[{src: 'QmYfLWdLH3jTU2uQhr1pzZFsjUNSZ8wtbtEsCdpvmyn4YH', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

4. Ouvrez l'add-on SSH et exécutez la commande suivante :

{% codeHelper { additionalLine: "Ligne de commande Home Assistant", copy: true}%}

```bash
wget -O - https://get.hacs.xyz | bash -
```

{% endcodeHelper %}

5. Redémarrez Home Assistant (vous pouvez le faire dans `Paramètres`->`Système`).

6. Maintenant, l'intégration HACS sera disponible pour être ajoutée dans le menu `Intégrations`. Allez dans `Paramètres`->`Appareils & Services`, appuyez sur `Ajouter une intégration` et recherchez HACS.

{% roboWikiNote {title:"Avertissement", type: "warning"}%} Pour utiliser HACS, vous avez besoin d'un compte Github.{% endroboWikiNote %}

7. Cliquez dessus et suivez les instructions d'installation.

## Installer les Add-Ons IPFS Daemon et Libp2p - WS Proxy

L'intégration Robonomics stocke les données en utilisant un démon IPFS local et utilise également Libp2p pour le contrôle à distance, vous devez donc l'installer en premier. Vous pouvez ajouter le dépôt d'Add-Ons Robonomics en utilisant ce bouton

[![Ouvrez votre instance Home Assistant et affichez la boîte de dialogue d'ajout d'add-on avec une URL de dépôt spécifique pré-remplie.](https://my.home-assistant.io/badges/supervisor_add_addon_repository.svg)](https://my.home-assistant.io/redirect/supervisor_add_addon_repository/?repository_url=https%3A%2F%2Fgithub.com%2FPinoutLTD%2Frobonomics-addons)

Ou manuellement en suivant les étapes suivantes :

{% roboWikiVideo {videos:[{src: 'QmZgXme4HSrBwDKekBEy5svpQNVWywrvmN7Zthfa27Gu2H', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Il y a un [Dépôt d'Add-Ons Robonomics](https://github.com/PinoutLTD/robonomics-addons). Pour l'installer, allez dans `Paramètres` -> `Add-Ons` et appuyez sur le bouton `AJOUTER UN ADD-ON STORE` dans le coin inférieur droit.

2. Appuyez sur les trois points dans le coin supérieur droit et choisissez `Dépôts`. Ajoutez-y le lien suivant :

{% codeHelper { copy: true}%}

```
https://github.com/PinoutLTD/robonomics-addons
```

{% endcodeHelper %}

3. Appuyez sur le bouton `AJOUTER`.

4. Fermez le gestionnaire de dépôts et rafraîchissez la page. Maintenant, à la fin de la page, vous pouvez voir les Add-Ons Robonomics.

Maintenant, vous pouvez installer les deux add-ons. Ouvrez-les et appuyez sur `INSTALLER`. Après l'installation, appuyez sur `DÉMARRER`.

## Installer l'Intégration Robonomics

Maintenant, vous pouvez installer l'Intégration Robonomics en utilisant HACS.

{% roboWikiVideo {videos:[{src: 'QmSsCYxp7xJ22RZEx3FtJBFfGASu1t4rmqhf78xasnMwt4', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

Ouvrez HACS depuis le menu latéral et recherchez `Robonomics`. Ensuite, cliquez sur le bouton `Télécharger` situé dans le coin inférieur droit. Une fois le téléchargement terminé, redémarrez Home Assistant.