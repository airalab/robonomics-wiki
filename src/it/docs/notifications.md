---

title: Robonomics Smart Home

contributors: [LoSk-p]

---

Puoi ricevere notifiche sul tuo smartphone con [notify](https://notify.events/). Registrati prima lì e crea un nuovo canale su `Pannello di Controllo`:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

Aggiungi un titolo e premi `Salva`:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

Poi premi `Aggiungi Sorgente` e scegli `Home Assistant` nella scheda `IoT e Smart Home`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

Scrivi un titolo e premi `Avanti`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

Qui vedrai il token che devi aggiungere al tuo file di configurazione per Home Assistant. Salvalo da qualche parte e premi `Fatto`:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

poi premi `Iscriviti` per aggiungere abbonati:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

Scegli l'abbonato che desideri e segui le istruzioni.

Ora devi modificare la configurazione sul tuo computer con Home Assistant. Con l'utente `homeassistant` apri il file `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

E aggiungi queste righe:


```yaml
notify_events:
    token: <il tuo token da notify>
```
Aggiungi anche una nuova automazione dopo la riga `automation:`:

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
      message: La porta è stata cambiata in {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

Questa automazione invierà il messaggio `La porta è stata cambiata in on/off` dopo che il sensore con l'ID entità `binary_sensor.contact_sensor_contact` cambia stato da `off` a `on`.

E riavvia Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```