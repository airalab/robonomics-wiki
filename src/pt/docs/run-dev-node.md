---
title: Executar um nó de desenvolvimento
contributors: [LoSk-p, ensrationis]
---

Um nó de desenvolvimento é uma chain Robonomics local, com um único nó, para testar o seu código. Os blocos são produzidos na hora, as contas de teste têm fundos e nada toca a rede em produção.

Não existe mais o binário `robonomics --dev`. Você compila o runtime a partir do [airalab/robonomics](https://github.com/airalab/robonomics), gera uma chain spec a partir dele e roda o `polkadot-omni-node`, o nó genérico da Parity, com essa spec.

## Um comando (Nix)

A partir de um clone do repositório:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

O script compila o runtime com a feature `dev-runtime` se for preciso, gera uma chain spec temporária e inicia `polkadot-omni-node --chain <spec> --dev`.

## Sem Nix

Instale as duas ferramentas com o Cargo e rode o mesmo script:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## Manualmente

Para manter a chain spec ou mudar as flags do nó, faça os passos você mesmo:

{% codeHelper {copy: true} %}

```bash
cargo build --release -p robonomics-runtime --features dev-runtime

chain-spec-builder -c ./chain_spec.json create \
  -n "Robonomics Dev" -i robonomics-dev -t development \
  -r ./target/release/wbuild/robonomics-runtime/robonomics_runtime.compact.compressed.wasm \
  --para-id 2000 --relay-chain westend-local \
  --properties tokenSymbol=XRT,tokenDecimals=9 \
  named-preset development

polkadot-omni-node --chain ./chain_spec.json --dev
```

{% endcodeHelper %}

Não existe um `--chain dev` embutido: você sempre passa a spec gerada mais `--dev`. Adicione `--base-path <dir>` para manter o estado da chain entre reinícios.

## O que você recebe

- RPC e WebSocket em `ws://127.0.0.1:9944`.
- Chain id `robonomics-dev`, para ID 2000, relay chain `westend-local`, token XRT com 9 casas decimais.
- Contas de desenvolvimento com fundos: Alice, Bob, Charlie e as outras chaves de teste conhecidas.
- Alice é Sudo. O Sudo só existe em builds `dev-runtime`, nunca na rede em produção.
- Um estado limpo a cada início, a menos que você defina `--base-path`.

Conecte o [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) a `ws://127.0.0.1:9944` para explorar. Com a ferramenta `cps`, use `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` e `ROBONOMICS_SURI=//Alice`.

## RWS em uma chain de desenvolvimento

Os leilões RWS são criados pelo Root. Para pular essa etapa ao testar código de RWS, o repositório `robonomics-interface` tem um `scripts/devchain.sh` que inicia uma chain de desenvolvimento com leilões RWS já no genesis.

Mais opções, incluindo uma imagem Docker, estão no [developer guide](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
