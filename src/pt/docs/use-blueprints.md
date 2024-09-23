---
title: Como Usar Blueprints
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Neste artigo, você aprenderá como adicionar blueprints de automação ao seu Home Assistant e configurá-lo.

## Automações Blueprint

Alguns blueprints já estão instalados. Automações baseadas nesses blueprints só precisam ser configuradas. Na interface web, você pode encontrar blueprints pré-instalados em `Configurações/Automações e Cenas`. Abra `Blueprints` e encontre o blueprint que deseja usar. Neste exemplo, será utilizado `Luz ativada por movimento`.

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"Configurações do Blueprint"} %}{% endroboWikiPicture %}

Clique em `Criar Automação` para abrir o editor de automação. Dê um nome, escolha um blueprint para usar (`Luz ativada por movimento` no nosso caso). Depois disso, você precisa escolher o sensor de movimento e a lâmpada. Quando a configuração estiver concluída, clique em `Salvar`.

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"Configuração da Automação"} %}{% endroboWikiPicture %}

Se desejar fazer alterações, você pode encontrá-las indo para `Configurações/Automações e Cenas` e depois `Automações`.

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"Lista de Automações"} %}{% endroboWikiPicture %}

## Importando Blueprints

O Home Assistant pode importar blueprints dos fóruns do Home Assistant, GitHub e GitHub gists. A lista de todos os Blueprints está localizada em [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Após escolher, vá para `Configurações/Automações e Cenas` e abra `Blueprints`. Clique em `Importar Blueprint` e insira o URL do blueprint escolhido. Em seguida, clique em `VISUALIZAR BLUEPRINT`. Neste caso, usaremos [Detecção e notificação de nível baixo de bateria para todos os sensores de bateria](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664).

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"Importando Blueprint"} %}{% endroboWikiPicture %}

Isso carregará o blueprint e mostrará uma prévia no diálogo de importação. Você pode alterar o nome e concluir a importação. Clique em `Criar Automação` para abrir o editor de automação. Aqui você pode configurar os parâmetros da automação e adicionar ações para receber notificações.

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"Configurar Blueprint de Bateria"} %}{% endroboWikiPicture %}