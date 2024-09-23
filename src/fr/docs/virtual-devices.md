---
title: Appareils Virtuels

contributors: [nakata5321]
---

**Cet article vous expliquera comment créer des appareils virtuels dans une maison connectée, afin que vous puissiez voir à quoi ressemble la plateforme réelle.**

{% roboWikiPicture {src:"docs/home-assistant/virtual-sensors.png", alt:"capteur virtuel"} %}{% endroboWikiPicture %}

## Installer l'intégration

Pour utiliser des appareils virtuels, vous devez installer l'intégration ["démonstration"](https://www.home-assistant.io/integrations/demo/).
Pour ce faire, vous devez modifier votre fichier de configuration.

Allez dans le dossier de configuration que vous avez fourni lors du processus de configuration. Dans ce dossier, vous trouverez un dossier
nommé "homeassistant". Allez à l'intérieur. Ouvrez le fichier `configuration.yaml` avec un éditeur de texte sous l'utilisateur **root** et insérez la ligne suivante :

{% codeHelper { copy: true}%}

```
...
# Exemple d'entrée configuration.yaml
demo:
...
```

{% endcodeHelper %}


Après cela, redémarrez Home Assistant via l'interface web. Lorsque la maison connectée redémarre, vous pouvez trouver tous les appareils virtuels dans les entités "démonstration".
Trouvez-les dans `Paramètres -> Appareils et services -> Démonstration`. Toutes ces entités peuvent être ajoutées à votre tableau de bord.

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"entités de démonstration"} %}{% endroboWikiPicture %}
