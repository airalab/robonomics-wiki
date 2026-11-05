---
title: Клієнтські бібліотеки
contributors: [PaTara43, ensrationis]
---

Бібліотеку обирають за мовою і за задачею. Для дерева пристроїв беріть `@polkadot/api`, крейти Rust або утиліту `cps`. Для datalog і RWS з Python — `robonomics-interface`.

| Бібліотека | Мова | Дерево пристроїв | Примітки |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | Немає хелперів | Datalog, RWS, акаунти, шифрування |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Так | Універсальний клієнт Substrate |
| npm `robonomics-interface` | JavaScript | Ні | Використовується в robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | Так, типізовано | Прив'язки до рантайму |
| `libcps` і утиліта `cps` | Rust, командний рядок | Так, повністю | З [airalab/robins](https://github.com/airalab/robins) |

Усі вони підключаються до `wss://polkadot.rpc.robonomics.network/` або до вашої власної ноди.

## Python: robonomics-interface

Поточна версія — 3.1.0. Її перевірено на dev-ланцюгу з рантаймом 52 і перевірками лише на читання в робочій мережі. Версію 3.0 переписано з нуля, вона несумісна з 2.x: більше не залежить від `substrate-interface`. Якщо переходите з 2.x, прочитайте [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

Що вміє:

- Ключі: за замовчуванням ED25519. Для sr25519, який за замовчуванням використовують гаманці Polkadot, потрібні extra `[sr25519]` і `crypto_type=SR25519`. Адреси SS58, мнемоніки, імпорт резервних копій гаманців.
- Асинхронний клієнт з перемиканням між точками підключення та його синхронний двійник для скриптів (`RobonomicsSync`).
- Запити до сховища та екстринзики з подіями і зрозумілими помилками.
- Хелпери для Datalog, RWS, System і Balances.
- Шифрування повідомлень і конверт звіту, який використовує Robonomics Report Service.

Хелперів для дерева пристроїв немає. Але будь-який палет можна викликати через універсальні `compose_call` і `submit`.

Встановлення (Python 3.12 або новіший):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

Запис datalog за прикладом із README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Документація: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

`@polkadot/api` працює з усіма палетами, зокрема з деревом пристроїв. Приклади з [README палета CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

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

npm-пакет `robonomics-interface` (JavaScript) використовує robonomics.app. Він покриває datalog, launch, RWS, digital twin і службові виклики, але не дерево пристроїв.

## Rust

- `robonomics-runtime-subxt-api`: типізовані прив'язки до рантайму, зокрема view-функції дерева пристроїв.
- `libcps`: бібліотека для дерева пристроїв із вбудованим легким клієнтом. На crates.io її не опубліковано; підключайте її з [airalab/robins](https://github.com/airalab/robins).

<a id="cps-command-line-tool"></a>

## Консольна утиліта cps

`cps` працює з деревом пристроїв із термінала. Вона вміє запускати свій легкий клієнт, тож нода чи публічний RPC не потрібні.

Встановіть її з нічних збірок [airalab/robins](https://github.com/airalab/robins/releases) (архіви для Linux і macOS, x86_64 і aarch64) або запустіть через Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

У README robins згадано й `cargo install libcps`, але крейта `libcps` на crates.io немає.

Кілька команд:

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

Повний посібник — у [документації robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Застаріле

Обгортка для ROS 2 (`robonomics-ros2`) і `robonomics-js` застаріли й для поточного рантайму не підтримуються.
