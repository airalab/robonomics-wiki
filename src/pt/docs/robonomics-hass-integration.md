---
title: Configuração de integração do Robonomics

contribuidores: [LoSk-p, nakata5321, Fingerling42]
ferramentas:
  - Robonomics Home Assistant Integration 2.0.2
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Neste artigo, você irá adicionar o Robonomics ao Home Assistant. Isso permite que o Home Assistant registre datalogs com dados criptografados no Robonomics Parachain e ouça comandos de lançamento do parachain para controlar dispositivos inteligentes. A integração utiliza o IPFS para armazenar dados e enviar hashes do IPFS para funções de datalog ou lançamento.**

{% roboWikiPicture {src: 'docs/home-assistant/integration-setup.png', alt: 'configuração de integração'}%} {% endroboWikiPicture %}

Primeiramente, você precisa criar uma configuração para o seu painel. Para isso, abra o seu painel do Home Assistant e no canto superior direito, clique no botão "Editar Painel" (um lápis).
Na janela pop-up aberta, clique no ícone de três pontos e selecione o botão "Assumir Controle":

{% roboWikiPicture {src: 'docs/home-assistant/take-control.png', alt: 'configuração de integração'}%} {% endroboWikiPicture %}

Clique em "Assumir Controle" mais uma vez:

{% roboWikiPicture {src: 'docs/home-assistant/take-control2.png', alt: 'configuração de integração'}%} {% endroboWikiPicture %}

Agora você pode instalar a integração do Robonomics. Para fazer isso, siga estes passos:
 

1. Na interface web do Home Assistant, vá para `Configurações` -> `Dispositivos e Serviços` e clique em `ADICIONAR INTEGRAÇÃO`. Procure por `Robonomics`.

2. Clique em Robonomics, faça o upload do seu arquivo de configuração (nomeado `robonomics.app-settings-<nome-da-assinatura>-servidor.json`, onde `<nome-da-assinatura>` é o nome da sua assinatura) e insira a senha para a conta `CONTROLADOR`. Instruções sobre como criar o arquivo de configuração podem ser encontradas [aqui](/docs/sub-activate/?topic=smart-home#setup-your-subscription).

{% roboWikiPicture {src:"docs/home-assistant/integraion-setup.png", alt:"criar controlador"} %}{% endroboWikiPicture %}

3. Opcional: Você pode escolher qual rede usar.

4. Clique em `ENVIAR` após concluir a configuração. Se preencheu tudo corretamente, verá a janela de sucesso. 

{% roboWikiNote {type: "okay", title: "" }%} A instalação pode levar aproximadamente 10–15 minutos, dependendo da sua conexão com a internet. {% endroboWikiNote %}

É isso! Você configurou completamente a Integração do Robonomics no Home Assistant. Agora você pode usar todos os
Serviços Web do Robonomics. Para saber mais sobre eles, vá para a seção ["Uso"](/docs/add-user).