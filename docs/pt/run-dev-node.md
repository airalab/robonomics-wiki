---
title: Como executar o nó de desenvolvimento do Robonomics
contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Para testar suas aplicações no Robonomics, você pode querer executá-lo no modo de desenvolvimento. Este artigo mostra passo a passo
instruções sobre como obter sua própria instância de teste local do Robonomics.**


## Obtenha o binário do nó

1. Primeiro, você precisa de um arquivo binário, faça o download do arquivo compactado mais recente [release](https://github.com/airalab/robonomics/releases).

2. Navegue até a pasta do arquivo compactado, descompacte o binário e altere as permissões:

```bash
tar xf robonomics-2.4.0-x86_64-unknown-linux-gnu.tar.gz
chmod +x robonomics
```

## Executar

Execute o nó com:

```bash
./robonomics --dev
```
Você verá a seguinte saída:

![robonomics](../images/dev-node/robonomics.png)

<robo-wiki-note type="note" title="From Scratch">

  Se você quiser limpar os blocos existentes, pode fazer isso removendo o RocksDB em `/tmp/substrate******/chains/dev/db/full`.
  Substitua `******` pelo identificador correspondente exibido nos logs ao iniciar.

  Se você quiser iniciar o nó do zero toda vez, use a opção `--tmp`.

</robo-wiki-note>

## Conectar

Agora você pode se conectar ao seu nó local através do [Polkadot Portal](https://polkadot.js.org/apps/#/explorer).

Altere a rede para `Local Node` no canto superior esquerdo e pressione `Switch`.

![switch](../images/dev-node/portal.png)

Bem-vindo à instância local do Robonomics!

![local_node](../images/dev-node/dev-portal.png)


