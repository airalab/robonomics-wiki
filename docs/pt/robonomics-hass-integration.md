---
title: Configuração de integração Robonomics

contributors: [LoSk-p, nakata5321, Fingerling42]
tools:
  - Robonomics Home Assistant Integration 1.5.9
    https://github.com/airalab/homeassistant-robonomics-integration
---

**Neste artigo, você adicionará Robonomics ao Home Assistant. Isso permite que o Home Assistant registre datalogs com dados criptografados para Robonomics Parachain e ouça comandos de lançamento do parachain para controlar dispositivos inteligentes. A integração usa IPFS para armazenar dados e enviar hashes IPFS para funções de datalog ou lançamento.**

<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmQp66J943zbF6iFdkKQpBikSbm9jV9La25bivKd7cz6fD', type:'mp4'}]" />

1. Na interface web do Home Assistant, vá para  `Settings` -> `Device & Services` e clique em `ADD INTEGRATION`. Procure por `Robonomics`.

2. Clique em Robonomics e preencha a configuração: 

- Adicione a seed da conta `SUB_CONTROLLER` à seed da conta do controlador.
- Adicione o endereço público da conta `SUB_OWNER` ao endereço do proprietário da assinatura.
- Defina o intervalo de envio de dados (por padrão, são 10 minutos).
- (Opcional) Você pode adicionar credenciais para o serviço de pinagem Pinata ou outro gateway personalizado para espalhar seus dados mais amplamente pela rede IPFS.

3. Clique em `SUBMIT` após terminar a configuração. Se você preencheu tudo corretamente, verá a janela de sucesso.

Isso é tudo! Você configurou completamente a Integração Robonomics no Home Assistant. Agora você pode usar todos os 
Serviços Web Robonomics. Para saber mais sobre eles, vá para a seção ["Uso"](/docs/global-administration).
