---
title: Adicioneo fundos à sua conta no Portal Robonomics

contributors: [Houman]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Depois de criar com sucesso suas contas no portal Robonomics, é hora de adicionar fundos a elas para que você possa emiciar transações.**

<robo-wiki-note type="warning" title="Dev Node">

Por favor, preste atenção que este e os seguintes tutoriais são demonstrados em uma instância local do Robonomics Node. Configure a sua com [essas instruções](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navegue até a seção Contas no portal Robonomics 

![Accounts](../images/creating-an-account/portal-top-left.jpg "Accounts")

## 2. Escolha a conta da qual você deseja transferir fundos

No modo de desenvolvimento, existem várias contas, com 10000 Unidades de fundos cada, que podem ser usadas para transferir fundos para outras contas criadas na rede de desenvolvimento. Essas contas são indicadas por sinais de chave inglesa <img alt="wrench sign" src="../images/adding-funds/wrench.png" width="20" /> ao lado delas.

![Accounts-for-sending](../images/adding-funds/accounts-for-sending.svg "Accounts-for-sending")

- Clique no botão "enviar" da conta da qual você deseja transferir fundos, por exemplo BOB

## 3. Escolha a conta para a qual você deseja transferir fundos
Após clicar no botão "enviar", você será solicitado com a "janela de envio de fundos". Na janela solicitada:

- Da lista de contas disponíveis, escolha a conta para a qual você deseja enviar fundos.
- Digite a quantidade de Unidades que você deseja enviar.
- Pressione "fazer transferência"

![Transfer-Funds](../images/adding-funds/send-funds.png "Transfer-Funds")

## 4. Autorize a transação

Após pressione oionar "fazer transferência" na etapa anterior, você será solicitado com a "janela de autorização de transação".<br/>
Revise os detalhes da transação e finalmente clique no botão "assinar e enviar".

![sign-transaction](../images/adding-funds/sign-transaction.png "sign-transaction")
Neste exemplo, transferimos 500 unidades de fundos de "BOB" para "EMPLOYER". Você pode ver que a conta do EMPLOYER, que inicialmente não tinha fundos, agora possui 500 Unidades de fundos.

![funds-added](../images/adding-funds/funds-added.svg "funds-added")

**Certifique-se de ter fundos suficientes nas contas que você deseja usar no playground.**