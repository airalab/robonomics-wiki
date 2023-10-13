---
title: Robonomics Smart Home

contributors: [LoSk-p]
---

Você pode receber notificações em seu smartphone com [notify](https://notify.events/). Primeiro, registre-se lá e no `Control Panel` crie um novo canal:

![control_panel](../images/home-assistant/not_control_panel.png)

Adicione um título e pressione `Save`:

![channel](../images/home-assistant/not_create_chanell.png)

Em seguida, pressione `Add Source` e escolha `Home Assistant` na guia `IoT and Smart Home`:

![source](../images/home-assistant/not_add_source.png)

Escreva um título e pressione `Next`:

![source_next](../images/home-assistant/not_add_source_next.png)

Lá você verá o token que você precisa adicionar ao seu arquivo de configuração para o Home Assistant. Salve-o em algum lugar e pressione `Done`:

![token](../images/home-assistant/not_token.png)

em seguida, pressione `Subscribe` para adicionar assinantes:

![subscribe](../images/home-assistant/not_subscribe.png)

Escolha qualquer assinante que você deseja e siga as instruções.

Agora você precisa editar a configuração em seu computador com o Home Assistant. Sob o usuário `homeassistant`, abra o arquivo `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

E adicione estas linhas:

```yaml
notify_events:
    token: <your token from notify>
```
Também adicione uma nova automação após a linha `automação`:
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
Esta automação enviará a mensagem `Door was changed to on/off` após o sensor com o ID da entidade `binary_sensor.contact_sensor_contact` mudar de estado de `off` para `on`.

E reinicie o Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```