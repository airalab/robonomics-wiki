---
title: Executar um collator
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

Os collators produzem os blocos da parachain Robonomics. Este guia configura um collator em um servidor Linux, registra o collator on-chain e explica como ele ganha.

A fonte deste guia é o [collator guide](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) no repositório do runtime.

## Do que você precisa

- Um servidor: 8 núcleos de CPU, 64 GB de RAM, 2 TB NVMe. Um servidor assim custa cerca de $120–150 por mês.
- Disco: a parachain e a relay chain do Polkadot juntas ocupam cerca de 1.1 TB e continuam crescendo. Planeje pelo menos 2 TB.
- Uma conta no Robonomics com mais de 32 XRT de saldo livre.

## 1. Instale o nó

Não existe um binário de nó do Robonomics. Um collator roda o `polkadot-omni-node`, o nó genérico da Parity, com a chain spec do Robonomics. O guia supõe um usuário `robonomics` com home `/var/lib/robonomics/` e base path `/var/lib/robonomics/base/`.

Baixe o `polkadot-omni-node` nas [versões do Polkadot SDK](https://github.com/paritytech/polkadot-sdk/releases). Use a versão `polkadot-stable*` mais recente; os comandos abaixo usam `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Baixe a chain spec:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Gere a chave de rede

O collator não inicia sem uma chave de rede:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

A chave é gravada em `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. Faça um backup dela.

## 3. Inicie o nó

`ExecStart` recomendado para um serviço systemd:

{% codeHelper {copy: true} %}

```
ExecStart=/usr/local/bin/polkadot-omni-node \
  --name "YOUR_NODE_NAME" \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json \
  --base-path /var/lib/robonomics/base/ \
  --collator \
  --sync warp \
  --telemetry-url "wss://telemetry.parachain.robonomics.network/submit/ 0" \
  -- \
  --sync warp
```

{% endcodeHelper %}

- O primeiro `--sync warp` é para a parachain. O que vem depois de `--` é para a relay chain embutida. Sem ele, a relay chain pode levar semanas para sincronizar.
- A chain spec não tem endpoint de telemetria, então a telemetria é ativada com `--telemetry-url`.

## 4. Gere as session keys

As session keys são chaves Aura (sr25519). Inicie o nó temporariamente com `--rpc-methods unsafe` e chame `author_rotateKeysWithOwner` com a conta do seu collator:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

O resultado tem dois campos: `keys` e `proof`. Guarde os dois. Confira se o nó tem as chaves:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Depois remova `--rpc-methods unsafe` e reinicie o nó.

## 5. Registre-se on-chain

Envie estes extrinsics a partir da conta do seu collator, por exemplo no [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` com os dois valores do passo anterior. Não passe uma proof vazia: a proof vincula as chaves à sua conta.
2. `collatorSelection.registerAsCandidate()`. Isso bloqueia **32 XRT** como garantia.

O seu nó entra no conjunto depois de uma troca de sessão. No runtime, uma sessão tem 3,600 blocos, cerca de 6 horas com blocos de 6 segundos.

Confira a sua candidatura on-chain, não só pela saúde do nó: veja `collatorSelection.candidateList` e `collatorSelection.invulnerables` em **Developer → Chain state**.

A garantia e os limites de candidatos são configurações do runtime. Para mudá-los é preciso um referendo Root. Veja [XRT e governança](/docs/xrt-and-governance/).

## Como funcionam as recompensas

Um collator ganha de duas formas:

1. **Recompensa por bloco.** Um valor fixo de 0.0042 XRT é cunhado diretamente para o autor de cada bloco. Ela existe desde o runtime 43.
2. **Taxas e gorjetas.** Todas as taxas e gorjetas vão para o fundo dos collators. O autor de um bloco recebe uma parte do fundo.

A recompensa por bloco é calculada para cobrir um servidor com margem:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

As premissas são um servidor de $2,040 por ano, 7 collators, uma margem de 30% e um preço do XRT de $1. A recompensa é revista por atualização do runtime quando as premissas mudam.

A sua renda depende da sua parcela dos blocos: quanto mais collators, menos blocos cada um produz. Contexto e medições: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
