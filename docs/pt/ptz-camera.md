---
title: Controle de câmera PTZ no Home Assistant
contributors: [nakata5321]
---

Este artigo aborda um processo de configuração de uma câmera PTZ no Home Assistant. 
Será utilizado o protocolo ONVIF. Isso requer uma conta de câmera local.

<robo-wiki-note type="warning">
O processo de configuração da conta de câmera local não é abordado neste artigo.
</robo-wiki-note>

Requisitos:
- Câmera PTZ
- Conta de câmera local
- Endereço IP da câmera
- Home Assistant configurado

## Integração ONVIF

Vamos começar com a instalação da integração **ONVIF**. 

Vá para "Devices & Services" em "Settings" e pressione o botão  "ADD INTEGRATION".
Digite "ONVIF" e escolha a integração. Você verá a próxima janela.

 <robo-wiki-picture src="home-assistant/onvifsetup.jpg" />

Pressione o botão "Submit". Ele tentará pesquisar automaticamente sua câmera. Se tiver sucesso, 
escolha sua câmera na lista e preencha os campos vazios. 
Caso contrário, você terá que preencher todos os campos manualmente. Você verá a seguinte janela.

 <robo-wiki-picture src="home-assistant/onvifconfig.jpg" />

Preencha as lacunas:
- Name - dê um nome para sua câmera
- Host - forneça o endereço IP da sua câmera
- Port - geralmente é comum ser 2020, mas o fornecedor da sua câmera pode alterar
- Username - escreva o nome de usuário da sua conta local da câmera
  - Password - escreva uma senha para sua conta local da câmera

e pressione "Submit". Escolha uma Área para sua câmera e clique em "Finish".

## Adicione o controle da câmera ao painel

Agora que você configurou completamente a câmera, você pode adicionar seu fluxo e botões de controle ao painel.

Vá para o painel e comece criando um novo cartão. Escolha o tipo "Picture Glance".

 <robo-wiki-picture src="home-assistant/glance.jpg" />

Preencha os dados:
- Title - escolha o título da imagem da câmera
- Camera Entity - escolha uma entidade de câmera na lista suspensa
- Camera View - escolha "ao vivo" para obter menos atraso

Em seguida, mude para o modo "Code Editor" pressionando o botão no canto inferior esquerdo. Você verá o seguinte código:
```shell
camera_view: live
type: picture-glance
title: Kitchen
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Substitua o conteúdo de `entities: []` de acordo com o exemplo abaixo (`<SUA_ENTIDADE_DE_CÂMERA>` é o mesmo que o parâmetro `camera_image`):

<code-helper copy>

```
entities:
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Left
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: UP
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Up
    icon: 'mdi:arrow-up'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        tilt: DOWN
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Tilt Down
    icon: 'mdi:arrow-down'
  - entity: <YOUR_CAMERA_ENTITY>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <YOUR_CAMERA_ENTITY>
        pan: RIGHT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Pan Right
    icon: 'mdi:arrow-right'
    show_icon: true
```

</code-helper>

Isso é tudo. Agora você deverá ver o cartão da câmera PTZ no painel junto com os botões de controle.

## Solucionando Problemas
Se você estiver usando o Home Assistant Core e não estiver vendo um fluxo da câmera, você deve instalar as integrações "stream" e "FFMPEG". 
Para fazer isso, você deve adicionar as strings `stream: ` e `ffmpeg: ` ao final do configuration.yaml.