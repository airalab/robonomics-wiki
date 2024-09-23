---
title: Configuração da Pinata

contribuidores: [tubleronchik, LoSk-p]
ferramentas:
  - Home Assistant 2023.5.4
    https://github.com/home-assistant/core
  - Integração Robonomics Home Assistant 1.6.1
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Este artigo guia você pelo processo de configurar o [Pinata](https://www.pinata.cloud/) para fixar arquivos da integração Robonomics. Isso melhora a acessibilidade de arquivos de backup e telemetria.**

Para poder fixar seus arquivos na Pinata, primeiro você precisa criar uma conta. Em seguida, navegue até a seção `Chaves de API` e crie uma nova chave com as seguintes permissões:

1. `pinFileToIPFS`
2. `unpin`

{% roboWikiPicture {src:"docs/home-assistant/pinata-permissions.jpg", alt:"pinata-permissions"} %}{% endroboWikiPicture %}

Depois, copie a `Chave da API` e o `Segredo da API` e mantenha-os privados.

{% roboWikiPicture {src:"docs/home-assistant/pinata-key.jpg", alt:"pinata-key"} %}{% endroboWikiPicture %}

Se você já configurou a integração Robonomics, navegue até `Configurações` -> `Dispositivos e Serviços` e pressione `configurar` na integração Robonomics. Insira suas credenciais da Pinata.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-reconfigure-pinata.jpg", alt:"robonomics-reconfigure-pinata"} %}{% endroboWikiPicture %}