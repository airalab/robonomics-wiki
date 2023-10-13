---
title: Datalog
contributors: [PaTara43]
tools:   
  - Robonomics 2.3.0
    https://github.com/airalab/robonomics
---

**Now that you have some funds on your account you can submit extrinsics. The first to try is a Datalog. It allows you  to store data in the blockchain persistently. Imagine a distributed and crypto-protected storage for your data and this is it!**

<robo-wiki-note type="warning" title="Dev Node">

Por favor, preste atenção que este e os seguintes tutoriais são demonstrados em uma instância local do Robonomics Node. Configure o seu com [estas instruções](/docs/run-dev-node).

</robo-wiki-note>

## 1. Navegue até Developer -> Extrinsics

<robo-wiki-picture src="datalog/extrinsics.jpg" />

## 2. Escolha datalog -> record na lista suspensa de extrínsecos possíveis

Também escolha uma conta com a qual você deseja enviar o extrínseco. Preencha o campo de registro.

<robo-wiki-picture src="datalog/record.jpg" />

<robo-wiki-note type="note" title="Large amount of data">

  Datalog suporta uma string com um máximo de 512 bytes. Para armazenar uma grande quantidade de dados, pode-se usar [IPFS](https://ipfs.tech/).

</robo-wiki-note>

## 3. Envie a transação

Assine e envie a transação com uma conta criada anteriormente usando a extensão ou o DApp.

<robo-wiki-picture src="datalog/submit.jpg" />

<robo-wiki-note type="note" title="Erase">

  Você também pode apagar **TODOS** os seus registros com *datalog -> erase* call.

</robo-wiki-note>

## 4. Revise o seu datalog no armazenamento

Para isso, navegue até *Developer -> Chain state*, selecione *datalog -> datalogIndex*, especifique sua conta e pressione o 
"+" botão para obter os índices dos registros da sua conta e, em seguida, explore o que você precisa com *datalog -> datalogItem*.

<robo-wiki-picture src="datalog/item.jpg" />

<robo-wiki-note type="note" title="Explorarr">

  Todos os eventos, incluindo o registro do datalog, podem ser vistos no fluxo de eventos no *Explorer*.

</robo-wiki-note>