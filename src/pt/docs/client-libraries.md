---
title: Bibliotecas cliente
contributors: [PaTara43, ensrationis]
---

Escolha uma biblioteca pela linguagem e pelo que você precisa. Para a árvore de dispositivos, use `@polkadot/api`, os crates Rust ou a ferramenta `cps`. Para datalog e RWS em Python, use `robonomics-interface`.

| Biblioteca | Linguagem | Árvore de dispositivos | Observações |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | Sem helpers | Datalog, RWS, contas, criptografia |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Sim | Cliente Substrate genérico |
| npm `robonomics-interface` | JavaScript | Não | Usada pelo robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | Sim, tipada | Bindings para o runtime |
| `libcps` e a ferramenta `cps` | Rust, linha de comando | Sim, completa | Do [airalab/robins](https://github.com/airalab/robins) |

Todas se conectam a `wss://polkadot.rpc.robonomics.network/` ou ao seu próprio nó.

## Python: robonomics-interface

A versão atual é a 3.1.0. Ela é testada em uma chain de desenvolvimento com o runtime 52 e com verificações somente leitura na rede em produção. A versão 3.0 é uma reescrita e não é compatível com a 2.x: ela não depende mais de `substrate-interface`. Se você vem da 2.x, leia o [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

O que ela cobre:

- Chaves: ED25519 por padrão. sr25519, o padrão das carteiras Polkadot, precisa do extra `[sr25519]` e de `crypto_type=SR25519`. Endereços SS58, mnemônicos, importação de backup de carteira.
- Um cliente assíncrono com fallback entre endpoints, e uma versão síncrona para scripts (`RobonomicsSync`).
- Consultas ao storage e extrinsics com eventos e erros legíveis.
- Helpers para Datalog, RWS, System e Balances.
- Criptografia de mensagens e o envelope de relatório usado pelo Robonomics Report Service.

Não há helpers para a árvore de dispositivos. Qualquer pallet ainda pode ser chamado com os genéricos `compose_call` e `submit`.

Instalação (Python 3.12 ou mais recente):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

Um registro de datalog, seguindo o README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Documentação: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

O `@polkadot/api` funciona com todos os pallets, incluindo a árvore de dispositivos. Exemplos do [README do pallet CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

```javascript
// Read a node.
const info = await api.query.cps.nodes(nodeId);   // parent and Scope pointer
const meta = await api.query.cps.meta(nodeId);
const payload = await api.query.cps.payload(nodeId);

// Create a root node and a child.
await api.tx.cps.createNode(null, meta, payload, null).signAndSend(owner);
await api.tx.cps.createNode(parentId, meta, payload, null).signAndSend(owner);

// Let another account write to one node.
await api.tx.cps.grantAccess(nodeId, principal, 'Write', 'Node').signAndSend(owner);

// View functions (need a @polkadot/api version with view-function support).
const scope = await api.view.cps.resolveScope(nodeId);
```

O pacote npm `robonomics-interface` (JavaScript) é o que o robonomics.app usa. Ele cobre datalog, launch, RWS, digital twin e chamadas utilitárias, mas não a árvore de dispositivos.

## Rust

- `robonomics-runtime-subxt-api`: bindings tipados para o runtime, incluindo as view functions da árvore de dispositivos.
- `libcps`: uma biblioteca para a árvore de dispositivos com um light client embutido. Ela não está publicada no crates.io; use a partir do [airalab/robins](https://github.com/airalab/robins).

<a id="cps-command-line-tool"></a>

## Ferramenta de linha de comando cps

O `cps` trabalha com a árvore de dispositivos pelo terminal. Ele pode rodar o próprio light client, então você não precisa de um nó nem de um RPC público.

Instale a partir das versões nightly do [airalab/robins](https://github.com/airalab/robins/releases) (arquivos para Linux e macOS, x86_64 e aarch64), ou rode com Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

O README do robins também menciona `cargo install libcps`, mas não existe um crate `libcps` no crates.io.

Alguns comandos:

```bash
cps lc &                        # start the embedded light client on 127.0.0.1:9944
cps status                      # where am I connected
cps tree <NODE_ID> --depth 2    # look at a tree

export ROBONOMICS_SURI='<your seed phrase>'   # signs writes; keep it secret
cps create --meta '{"type":"building","name":"HQ"}' --payload '{"status":"online"}'
cps create --parent <NODE_ID> --meta '{"type":"room"}' --payload '{"temp":"22C"}'
cps meta set <NODE_ID> '{"type":"room","name":"Lab"}'
cps payload set <NODE_ID> 'temp=24C'
cps delete <NODE_ID>
```

O guia completo está na [documentação do robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Legado

O wrapper do ROS 2 (`robonomics-ros2`) e o `robonomics-js` são legados e não recebem manutenção para o runtime atual.
