---

title: Robonomics Smart Home

contributors: [LoSk-p]

---

Você pode receber notificações em seu smartphone com [notify](https://notify.events/). Primeiramente, registre-se lá e no `Painel de Controle` crie um novo canal:

{% roboWikiPicture {src:"docs/home-assistant/not_control_panel.png", alt:"control_panel"} %}{% endroboWikiPicture %}

Adicione um título e pressione `Salvar`:

{% roboWikiPicture {src:"docs/home-assistant/not_create_chanell.png", alt:"channel"} %}{% endroboWikiPicture %}

Em seguida, pressione `Adicionar Fonte` e escolha `Home Assistant` na guia `IoT e Casa Inteligente`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source.png", alt:"source"} %}{% endroboWikiPicture %}

Escreva um título e pressione `Próximo`:

{% roboWikiPicture {src:"docs/home-assistant/not_add_source_next.png", alt:"source_next"} %}{% endroboWikiPicture %}

Lá você verá o token que precisa adicionar ao seu arquivo de configuração para o Home Assistant. Salve-o em algum lugar e pressione `Concluído`:

{% roboWikiPicture {src:"docs/home-assistant/not_token.png", alt:"token"} %}{% endroboWikiPicture %}

em seguida, pressione `Inscrever-se` para adicionar assinantes:

{% roboWikiPicture {src:"docs/home-assistant/not_subscribe.png", alt:"subscribe"} %}{% endroboWikiPicture %}

Escolha o assinante que deseja e siga as instruções.

Agora você precisa editar a configuração em seu computador com o Home Assistant. Sob o usuário `homeassistant`, abra o arquivo `configuration.yaml`:

```bash
sudo -u homeassistant -H -s
nano ~/.homeassistant/configuration.yaml
```

E adicione estas linhas:


```yaml
notify_events:
    token: <seu token do notify>
```
Também adicione uma nova automação após a linha `automação:`:

{% codeHelper { copy: true}%}

```yaml
- alias: notificações
  trigger:
  - entity_id: binary_sensor.contact_sensor_contact
    platform: state
    from: 'off'
    to: 'on'
  action:
  - service: notify.notify
    data:
      message: A porta foi alterada para {{ '{{states("binary_sensor.contact_sensor_contact")}}' }}
```

{% endcodeHelper %}

Essa automação enviará a mensagem `A porta foi alterada para ligado/desligado` após o sensor com o id da entidade `binary_sensor.contact_sensor_contact` mudar de estado de `off` para `on`.

E reinicie o Home Assistant:
```bash
systemctl restart home-assistant@homeassistant.service
```