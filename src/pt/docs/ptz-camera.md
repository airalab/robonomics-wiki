---
title: Controle de câmera PTZ no Home Assistant
contributors: [nakata5321]
---

Este artigo aborda o processo de configuração de uma câmera PTZ no Home Assistant.
O protocolo ONVIF será utilizado. Isso requer uma conta de câmera local.

{% roboWikiNote {title:"test", type: "warning"}%} O processo de configuração da conta de câmera local não está coberto neste artigo.
{% endroboWikiNote %}


Requisitos:
- Câmera PTZ
- Conta de câmera local
- Endereço IP da câmera
- Home Assistant configurado

## Integração ONVIF

Vamos começar com a instalação da **integração ONVIF**.

Vá para "Dispositivos e Serviços" em "Configurações" e pressione o botão "ADICIONAR INTEGRAÇÃO".
Digite "ONVIF" e escolha a integração. Você verá a próxima janela.

{% roboWikiPicture {src:"docs/home-assistant/onvifsetup.jpg", alt:"configuração onvif"} %}{% endroboWikiPicture %}

Pressione o botão "Enviar". Ele tentará buscar automaticamente sua câmera. Se tiver sucesso,
escolha sua câmera na lista e preencha os campos vazios.
Caso contrário, você terá que preencher todos os campos manualmente. Você verá a seguinte janela.

{% roboWikiPicture {src:"docs/home-assistant/onvifconfig.jpg", alt:"configuração onvif"} %}{% endroboWikiPicture %}

Preencha os espaços em branco:
- Nome - dê um nome à sua câmera
- Host - forneça o endereço IP da sua câmera
- Porta - geralmente é comum ser 2020, mas o fornecedor da sua câmera pode alterá-la
- Nome de usuário - escreva um nome de usuário da sua conta local da câmera
  - Senha - escreva uma senha para sua conta local da câmera

e pressione "Enviar". Escolha uma Área para sua câmera e clique em "Concluir".

## Adicionar controle da câmera ao painel

Agora que você configurou completamente a câmera, pode adicionar seu fluxo e botões de controle ao painel.

Vá para o painel e comece criando um novo cartão. Escolha o tipo "Visão Geral de Imagem".

{% roboWikiPicture {src:"docs/home-assistant/glance.jpg", alt:"visão geral"} %}{% endroboWikiPicture %}

Preencha os dados:
- Título - escolha o título da imagem da câmera
- Entidade da Câmera - escolha uma entidade de câmera na lista suspensa
- Visualização da Câmera - escolha "ao vivo" para obter menos atraso

Em seguida, mude para o modo "Editor de Código" pressionando o botão no canto inferior esquerdo. Você verá o seguinte código:
```shell
camera_view: live
type: picture-glance
title: Cozinha
image: https://demo.home-assistant.io/stub_config/kitchen.png
entities: []
camera_image: camera.tapo_mainstream
```

Substitua o conteúdo de `entities: []` de acordo com o exemplo abaixo (`<SUA_ENTIDADE_DE_CÂMERA>` é o mesmo que o parâmetro `camera_image`):

{% codeHelper { copy: true}%}

```
entities:
  - entity: <SUA_ENTIDADE_DE_CÂMERA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <SUA_ENTIDADE_DE_CÂMERA>
        pan: LEFT
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Mover para a Esquerda
    show_state: false
    icon: 'mdi:arrow-left'
    show_icon: true
  - entity: <SUA_ENTIDADE_DE_CÂMERA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <SUA_ENTIDADE_DE_CÂMERA>
        tilt: PARA CIMA
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Inclinar para Cima
    icon: 'mdi:arrow-up'
  - entity: <SUA_ENTIDADE_DE_CÂMERA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <SUA_ENTIDADE_DE_CÂMERA>
        tilt: PARA BAIXO
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Inclinar para Baixo
    icon: 'mdi:arrow-down'
  - entity: <SUA_ENTIDADE_DE_CÂMERA>
    tap_action:
      action: call-service
      service: onvif.ptz
      service_data:
        entity_id: <SUA_ENTIDADE_DE_CÂMERA>
        pan: DIREITA
        speed: 1
        distance: 0.3
        move_mode: ContinuousMove
    name: Mover para a Direita
    icon: 'mdi:arrow-right'
    show_icon: true
```

{% endcodeHelper %}

Isso é tudo. Agora você deverá ver o cartão da câmera PTZ no painel junto com os botões de controle.

## Solução de Problemas
Se você estiver usando o Home Assistant Core e não visualizar um fluxo da câmera, você deve instalar as integrações "stream" e "FFMPEG".
Para fazer isso, você deve adicionar as strings `stream: ` e `ffmpeg: ` ao final do configuration.yaml.