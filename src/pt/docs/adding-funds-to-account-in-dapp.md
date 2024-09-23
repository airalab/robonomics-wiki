---
title: Adicionando fundos à sua conta no Portal Robonomics

contributors: [Houman]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Após criar com sucesso suas contas no portal Robonomics, é hora de adicionar fundos a elas para que você possa iniciar transações.**

{% roboWikiNote {title: 'Nó de Desenvolvimento', type: "warning"} %}Por favor, preste atenção que este e os tutoriais seguintes são demonstrados em uma instância local do Nó Robonomics. Configure o seu com [essas instruções](/docs/run-dev-node).
{% endroboWikiNote %}

## 1. Navegue até a seção de Contas no portal Robonomics

{% roboWikiPicture {src:"docs/creating-an-account/portal-top-left.jpg", alt:"contas"} %}{% endroboWikiPicture %}

## 2. Escolha a conta da qual deseja transferir fundos

No modo de desenvolvimento, existem várias contas, com 10000 Unidades de fundos cada, que podem ser usadas para transferir fundos para outras contas criadas na rede de desenvolvimento. Essas contas são indicadas por sinais de chave inglesa <img src="/assets/images/docs/adding-funds/wrench.png" alt="sinal de chave inglesa" width="20"/> ao lado delas.

{% roboWikiPicture {src:"docs/adding-funds/accounts-for-sending.svg", alt:"Contas-para-enviar", caption: "Contas-para-enviar"} %}{% endroboWikiPicture %}

- Clique no botão "enviar" da conta da qual deseja transferir fundos, por exemplo, BOB

## 3. Escolha a conta para a qual deseja transferir fundos
Após clicar no botão "enviar", você será solicitado com a "janela de envio de fundos". Na janela solicitada:

- Na lista de contas disponíveis, escolha a conta para a qual deseja enviar fundos.
- Insira o número de Unidades que deseja enviar.
- Pressione "fazer transferência"

{% roboWikiPicture {src:"docs/adding-funds/send-funds.png", alt:"Transferir-Fundos", caption: "Transferir-Fundos"} %}{% endroboWikiPicture %}

## 4. Autorize a transação

Após pressionar "fazer transferência" na etapa anterior, você será solicitado com a "janela de autorização de transação".<br/>
Revise os detalhes da transação e finalmente clique no botão "assinar e enviar".

{% roboWikiPicture {src:"docs/adding-funds/sign-transaction.png", alt:"assinar-transação", caption: "assinar-transação"} %}{% endroboWikiPicture %}

Neste exemplo, transferimos 500 unidades de fundos de "BOB" para "EMPLOYER". Você pode ver que a conta do EMPLOYER, que inicialmente não tinha fundos, agora possui 500 Unidades de fundos.

{% roboWikiPicture {src:"docs/adding-funds/funds-added.svg", alt:"fundos-adicionados", caption: "fundos-adicionados"} %}{% endroboWikiPicture %}

**Certifique-se de ter fundos suficientes nas contas que deseja usar no playground.**