---
title: Configuration de la Pinata

contributors: [tubleronchik, LoSk-p]
tools:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Intégration Robonomics Home Assistant 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Cet article vous guide à travers le processus de configuration de [Pinata](https://www.pinata.cloud/) pour épingler des fichiers à partir de l'intégration Robonomics. Cela améliore l'accessibilité des fichiers de sauvegarde et de télémétrie.**

Pour pouvoir épingler vos fichiers sur Pinata, vous devez d'abord créer un compte. Ensuite, accédez à la section `Clés API` et créez une nouvelle clé avec les autorisations suivantes :

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

Ensuite, copiez la `Clé API` et le `Secret API` et gardez-les privés.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Si vous avez déjà configuré l'intégration Robonomics, accédez à `Paramètres` -> `Appareils & Services` et appuyez sur `configurer` dans l'intégration Robonomics. Entrez vos identifiants Pinata.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}