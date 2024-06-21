---
title: Mettez à niveau votre Home Assistant OS
contributors: [LoSk-p]
tools:   
  - Home Assistant OS 64-9.5 for RaspPi 
    https://github.com/home-assistant/operating-system
  - HACS 1.31.0
    https://github.com/hacs/integration/
  - Robonomics Home Assistant Integration 1.4.1
    https://github.com/airalab/homeassistant-robonomics-integration
  - IPFS Home Assistant Addon 1.1.0
    https://github.com/airalab/ipfs-addon
---

**Cet article contient des instructions pour mettre à niveau votre Home Assistant OS existant avec l'intégration Robonomics.**

<robo-wiki-picture src="home-assistant/homeassistant_os.png" />

## Installer IPFS Add-on


L'intégration Robonomics stocke les données à l'aide d'un démon IPFS local, vous devez donc l'installer d'abord. 

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdAmUHW9bpTU6sUwBYu4ai4DVJ6nZ5xerjM9exvooGKGq', type:'mp4'}]" />

1. Il existe un [add-on IPFS pour Home Assistant](https://github.com/airalab/ipfs-addon). Pour l'installer, allez dans `Settings` -> `Add-ons` et appuyez sur le bouton `ADD-ON STORE` dans le coin inférieur droit.

2. Appuyez sur les trois points dans le coin supérieur droit et choisissez `Repositories`. Ajoutez-y le lien suivant:

<code-helper copy>

```
https://github.com/airalab/ipfs-addon
```

</code-helper>

3. Appuyez sur le bouton `ADD`.

4. Fermez le gestionnaire de dépôts et actualisez la page. Maintenant, à la fin de la page, vous pouvez voir l'add-on IPFS Daemon.

5. Ouvrez l'add-on et appuyez sur `INSTALL`. Après l'installation, appuyez sur `START`.

## Installer HACS

[Home Assistant Community Store (HACS)](https://hacs.xyz/) vous permet d'installer des intégrations personnalisées.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmYJFpxrww9PRvcAUhdgKufeDbyUFoBZTREZHPgV452kzs', type:'mp4'}]" />

1. Avant de commencer, vous devez installer un add-on pour vous connecter à l'appareil Home Assistant avec SSH. Dans le magasin d'add-ons, recherchez `ssh`. Nous vous recommandons d'installer l'add-on `SSH & Web Terminal`.

<robo-wiki-note type="warning" title="Warning">

  Si l'add-on SSH n'est pas trouvé, essayez d'activer le mode avancé dans les paramètres de votre profil utilisateur. Pour ce faire, cliquez sur l'icône de profil dans le coin inférieur gauche et trouvez l'option Mode avancé.

</robo-wiki-note>

2. Choisissez l'add-on et appuyez sur `INSTALL`. Une fois l'installation terminée, allez dans l'onglet `Configuration` et ajoutez un `password` ou des `authorized_keys`. N'oubliez pas d'enregistrer cette partie de la configuration.

3. Dans l'onglet `Info`, appuyez sur `START`. Si vous souhaitez voir l'add-on dans la barre latérale, n'oubliez pas d'activer `Show in sidebar`.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmcijfJ45fmW9omB67xWyPKvHhZuwLMTTQ7DBqnyxHUXR1', type:'mp4'}]" />

4. Ouvrez l'add-on SSH et exécutez la commande suivante:

<code-helper copy additionalLine="Home Assistant Command Line">

```bash
wget -O - https://get.hacs.xyz | bash -
```

</code-helper>

5. Redémarrez Home Assistant (vous pouvez le faire dans `Settings`->`System`). 

6. Maintenant, l'intégration HACS sera disponible à ajouter dans le menu `Integrations`. Allez dans `Settings`->`Devices & Services`, appuyez sur `Add Integration` et recherchez HACS.

<robo-wiki-note type="warning" title="Warning">

  Pour utiliser HACS, vous avez besoin d'un compte Github.

</robo-wiki-note>

7. Cliquez dessus et suivez les instructions d'installation. 

## Installer l'intégration Robonomics

Maintenant, vous pouvez installer l'intégration Robonomics en utilisant HACS.

<robo-wiki-video autoplay loop controls :videos="[{src: 'QmUodGanHyTE8hCJdcCHzvdnmuyVVGvnfTuYvYTPVKhh5d', type:'mp4'}]" />

Ouvrez HACS dans le menu de la barre latérale et accédez à `Integrations`. Cliquez sur ``Explore & Download Repositories`, puis recherchez `Robonomics` et cliquez sur le bouton `Download` situé dans le coin inférieur droit. Une fois le téléchargement terminé, redémarrez Home Assistant.