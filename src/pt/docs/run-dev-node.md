---
title: Como Executar um Nó de Desenvolvimento Robonomics
contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

**Para testar suas aplicações no Robonomics, você pode querer executá-lo no modo de desenvolvimento. Este artigo mostra instruções passo a passo sobre como obter sua própria instância de teste local do Robonomics.**


## Obter Binário do Nó

1. Primeiramente, você precisa de um arquivo binário, baixe o arquivo compactado com ele na última [versão](https://github.com/airalab/robonomics/releases).

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

{% roboWikiPicture {src:"docs/dev-node/robonomics.png", alt:"robonomics"} %}{% endroboWikiPicture %}

{% roboWikiNote {title:"Do Zero", type: "note"}%} Se desejar limpar os blocos existentes, você pode fazer isso removendo o RocksDB em `/tmp/substrate******/chains/dev/db/full`.
Substitua `******` pelo identificador correspondente exibido nos logs ao iniciar.

Se desejar iniciar o nó do zero toda vez, use a flag `--tmp`.
{% endroboWikiNote %}


## Conectar

Agora você pode se conectar ao seu nó local através do [Portal Polkadot](https://polkadot.js.org/apps/#/explorer).

Altere a rede para `Nó Local` no canto superior esquerdo e pressione `Alternar`.

{% roboWikiPicture {src:"docs/dev-node/portal.png", alt:"alternar"} %}{% endroboWikiPicture %}

Bem-vindo à instância local do Robonomics!

{% roboWikiPicture {src:"docs/dev-node/dev-portal.png", alt:"nó local"} %}{% endroboWikiPicture %}