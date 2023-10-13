---
title: Robonomics Smart Home

contributors: [LoSk-p]
---

Vous pouvez recevoir des notifications sur votre smartphone avec [notify](https://notify.events/). Inscrivez-vous d'abord là-bas et créez un nouveau canal sur le `Control Panel`:

![control_panel](../images/home-assistant/not_control_panel.png)

Ajoutez un titre et appuyez sur `Save`:

![channel](../images/home-assistant/not_create_chanell.png)

Ensuite, appuyez sur `Add Source` et choisissez `Home Assistant` dans l'onglet `IoT et Smart Home`:

![source](../images/home-assistant/not_add_source.png)

Écrivez un titre et appuyez sur `Next`:

![source_next](../images/home-assistant/not_add_source_next.png)

Vous verrez alors le jeton dont vous avez besoin pour ajouter à votre fichier de configuration pour Home Assistant. Enregistrez-le quelque part et appuyez sur `Done`:

![token](../images/home-assistant/not_token.png)

puis appuyez sur `Subscribe` pour ajouter des abonnés:

![subscribe](../images/home-assistant/not_subscribe.png)

Choisissez n'importe quel abonné que vous voulez et suivez les instructions.

Maintenant, vous devez modifier la configuration sur votre ordinateur avec Home Assistant. Sous l'utilisateur `homeassistant`, ouvrez le fichier `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

Et ajoutez ces lignes:

```yaml
notify_events:
    token: <your token from notify>
```
Ajoutez également une nouvelle automatisation après la ligne `automation:`:
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
      message: Door was changed to {{ states("binary_sensor.contact_sensor_contact") }}
```
Cette automatisation enverra le message `Door was changed to on/off` après que le capteur avec l'ID d'entité `binary_sensor.contact_sensor_contact` change d'état de `off` à `on`.

Et redémarrez Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```