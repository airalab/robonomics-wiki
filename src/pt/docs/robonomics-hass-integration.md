---
title: Configuração de integração do Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.8.3
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Neste artigo, você irá adicionar o Robonomics ao Home Assistant. Isso permite que o Home Assistant registre datalogs com dados criptografados no Robonomics Parachain e ouça comandos de lançamento do parachain para controlar dispositivos inteligentes. A integração utiliza o IPFS para armazenar dados e enviar hashes do IPFS para funções de datalog ou lançamento.**

{% roboWikiVideo {videos:[{src: 'QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Na interface web do Home Assistant, vá para `Configurações` -> `Dispositivos e Serviços` e clique em `ADICIONAR INTEGRAÇÃO`. Procure por `Robonomics`.

2. Clique em Robonomics e preencha a configuração:

- Adicione a semente da conta `SUB_CONTROLLER` à semente da conta do controlador.
- Adicione o endereço público da conta `SUB_OWNER` ao endereço do proprietário da assinatura.
- Defina o intervalo de envio de dados (por padrão, são 10 minutos).
- (Opcional) Você pode adicionar credenciais para o serviço de pinagem Pinata ou outro gateway personalizado para espalhar seus dados de forma mais ampla pela rede IPFS.

{% roboWikiNote {title:"Nota", type: "Nota"}%} Na seção [Configuração do Pinata](/docs/pinata-setup) você pode encontrar informações mais detalhadas sobre o uso do Pinata.{% endroboWikiNote %}

3. Clique em `ENVIAR` após terminar a configuração. Se você preencheu tudo corretamente, verá a janela de sucesso.

É isso! Você configurou completamente a Integração do Robonomics no Home Assistant. Agora você pode usar todos os Serviços Web do Robonomics. Para saber mais sobre eles, vá para a seção ["Uso"](docs/add-user).