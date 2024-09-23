---
title: Adicionar Usuário

contributors: [nakata5321, Fingerling42, LoSk-p]
tools:
  - Robonomics 2.7.0-1
    https://github.com/airalab/robonomics
  - Robonomics Dapp v0.6.0
    https://github.com/airalab/robonomics.app
---

**Este artigo mostrará como configurar um novo usuário no seu Home Assistant.**

## Adicionando Usuários à Assinatura

Você não pode usar contas criadas anteriormente porque `OWNER` e `CONTROLLER` fornecem segurança, e o primeiro usuário que você criou quando começou a usar o Home Assistant não possui uma conta na Parachain do Robonomics.

{% roboWikiVideo {videos:[{src: 'QmRyYN7BBodS1VSy5Kq24Mj2zviA8y4m8eF9kUWoCW7CZu', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Crie uma conta na Parachain do Robonomics, como fez no [artigo anterior](/docs/sub-activate/).

2. Usando a conta `OWNER`, adicione a nova conta de usuário à assinatura na página `CONFIGURAR UMA ASSINATURA` no [Robonomics DApp](https://robonomics.app/#/rws-setup). Agora, na seção `USUÁRIOS NA ASSINATURA`, devem constar três endereços na lista de acesso: `OWNER`, `CONTROLLER` e `USUÁRIO`.


## Arquivo JSON de Configuração do RWS

Primeiramente, o usuário deve obter o arquivo JSON com as informações da Configuração do RWS.

### Criar Arquivo JSON da Configuração do RWS

O administrador pode criar um arquivo JSON para sua configuração na página [CONFIGURAR UMA ASSINATURA](https://robonomics.app/#/rws-setup) usando o botão `Download import for other users`.

{% roboWikiPicture {src:"docs/home-assistant/download_rws_setup_json.png", alt:"imagem"} %}{% endroboWikiPicture %}

### Importar Configuração do RWS

Agora, com este arquivo JSON, o usuário pode importar a configuração do RWS usando o botão `IMPORTAR CONFIGURAÇÃO`.

{% roboWikiVideo {videos:[{src: 'QmYr9shCyFzMNLEeP8LC6ZRiEF2YpMaoDrrs587QpTvsgY', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Concedendo Acesso ao Usuário

Na mesma página ([CONFIGURAR UMA ASSINATURA](https://robonomics.app/#/rws-setup)), você pode definir a senha para o novo usuário.

{% roboWikiVideo {videos:[{src: 'Qme28Bq4qtHcqmndrDpUh5eQU5NbdnbHq76kxcS1HmvKQE', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

1. Escolha a conta que acabou de criar na barra lateral direita (verifique se escolheu a conta pretendida pressionando o ícone de perfil).

2. Insira o endereço e a frase-semente do `USUÁRIO` nos campos obrigatórios.

3. Preencha uma senha e confirme a transação pressionando o botão `CRIAR SENHA`, que agora será sem taxa devido à assinatura.

4. Após o processo de registro, faça login no Home Assistant com o endereço do seu usuário como login e a senha recém-criada.

Agora você pode usar o aplicativo para controlar sua casa por meio do Robonomics, confira o artigo [**"Obter Telemetria de Casa Inteligente"**](/docs/smart-home-telemetry/).