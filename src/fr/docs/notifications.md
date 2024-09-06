---

title: Maison Intelligente Robonomics

contributors: [LoSk-p]

---

Vous pouvez recevoir des notifications sur votre smartphone avec [notify](https://notify.events/). Inscrivez-vous d'abord là-bas et créez un nouveau canal dans le `Panneau de Contrôle` :

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

Ajoutez un titre et appuyez sur `Enregistrer` :

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

Ensuite, appuyez sur `Ajouter une Source` et choisissez `Home Assistant` dans l'onglet `IoT et Maison Intelligente` :

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

Écrivez un titre et appuyez sur `Suivant` :

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

Vous verrez alors le jeton dont vous avez besoin pour ajouter à votre fichier de configuration pour Home Assistant. Sauvegardez-le quelque part et appuyez sur `Terminé` :

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

puis appuyez sur `S'abonner` pour ajouter des abonnés :

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

Choisissez l'abonné que vous souhaitez et suivez les instructions.

Maintenant, vous devez modifier la configuration sur votre ordinateur avec Home Assistant. Sous l'utilisateur `homeassistant`, ouvrez le fichier `configuration.yaml` :

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

Et ajoutez ces lignes :

```yaml
notify_events:
    token: <votre jeton de notify>
```

Ajoutez également une nouvelle automatisation après la ligne `automation:` :

{% codeHelper { copy: true}%}

```yaml
- alias: notifications
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: La porte a été changée en {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

Cette automatisation enverra le message `La porte a été changée en on/off` après que le capteur avec l'identifiant d'entité `binary_sensor.contact_sensor_contact` ait changé d'état de `off` à `on`.

Et redémarrez Home Assistant :

```bash
systemctl restart home-assistant@homeassistant.service
```