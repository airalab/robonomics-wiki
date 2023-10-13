---
title: Robonomics Smart Home

contributors: [LoSk-p]
---

Puoi ricevere notifiche sul tuo smartphone con [notify](https://notify.events/). Registrati prima lì e su `Control Panel` crea un nuovo canale:

![control_panel](../images/home-assistant/not_control_panel.png)

Aggiungi un titolo e premi `Save`:

![channel](../images/home-assistant/not_create_chanell.png)

Quindi premi `Add Source` e scegli `Home Assistant` nella scheda `IoT e Smart Home`:

![source](../images/home-assistant/not_add_source.png)

Scrivi un titolo e premi `Next`:

![source_next](../images/home-assistant/not_add_source_next.png)

Lì vedrai il token che devi aggiungere al tuo file di configurazione per Home Assistant. Salvalo da qualche parte e premi `Done`:

![token](../images/home-assistant/not_token.png)

poi premi `Subscribe` per aggiungere abbonati:

![subscribe](../images/home-assistant/not_subscribe.png)

Scegli qualsiasi abbonato desideri e segui le istruzioni.

Ora devi modificare la configurazione sul tuo computer con Home Assistant. Con l'utente `homeassistant` apri il file `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

E aggiungi queste righe:

```yaml
notify_events:
    token: <your token from notify>
```
Aggiungi anche una nuova automazione dopo la riga `automazione:`:
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
Questa automazione invierà il messaggio `Door was changed to on/off` dopo che il sensore con ID entità `binary_sensor.contact_sensor_contact` cambia stato da `off` a `on`.

E riavvia Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```