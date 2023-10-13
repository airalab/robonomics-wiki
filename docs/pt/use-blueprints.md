---
title: Como usar Blueprints
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Neste artigo, você aprenderá como adicionar blueprints de automação ao seu Home Assistant e configurá-lo.

## Blueprints de Automação

Alguns blueprints já estão instalados. Automações baseadas nesses blueprints só precisam ser configuradas. Na interface web, você pode encontrar blueprints pré-instalados em `Settings/Automations & Scenes`. Abra `Blueprints` e encontre o blueprint que você deseja usar. Neste exemplo, será usado `Motion-activated Light`. 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

Clique em `Create Automation` para abrir o editor de automação. Dê um nome, escolha um blueprint para usar (`Motion-activated Light` no nosso caso). Depois disso, você precisa escolher o sensor de movimento e a lâmpada. Quando a configuração estiver concluída, clique em `Save`.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation Configuração" />

Se você quiser fazer alterações, pode encontrá-lo indo para `Settings/Automations & Scenes` e depois `Automations`. 

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## Importando Blueprints

O Home Assistant pode importar blueprints dos fóruns do Home Assistant, GitHub e GitHub gists. A lista de todos os blueprints está localizada em [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Depois de escolher, vá para `Settings/Automations & Scenes` e abra `Blueprints`. Clique em `Import Blueprint` e insira a URL do blueprint escolhido. Em seguida, clique em `PREVIEW BLUEPRINT`. Neste caso, usaremos [Detecção e notificação de nível de bateria baixo para todos os sensores de bateria](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

Isso carregará o blueprint e mostrará uma visualização na caixa de diálogo de importação. Você pode alterar o nome e concluir a importação. Clique em `Create Automation` para abrir o editor de automação. Aqui você pode configurar os parâmetros da automação e adicionar ações para receber notificações.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 