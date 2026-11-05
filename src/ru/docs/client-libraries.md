---
title: Клиентские библиотеки
contributors: [PaTara43, ensrationis]
---

Библиотеку выбирают по языку и по задаче. Для дерева устройств берите `@polkadot/api`, крейты Rust или утилиту `cps`. Для datalog и RWS из Python — `robonomics-interface`.

| Библиотека | Язык | Дерево устройств | Примечания |
|---|---|---|---|
| [robonomics-interface](https://github.com/airalab/robonomics-interface) | Python | Нет хелперов | Datalog, RWS, аккаунты, шифрование |
| [@polkadot/api](https://polkadot.js.org/docs/api/) | JavaScript | Да | Универсальный клиент Substrate |
| npm `robonomics-interface` | JavaScript | Нет | Используется в robonomics.app |
| `robonomics-runtime-subxt-api` | Rust | Да, типизированно | Привязки к рантайму |
| `libcps` и утилита `cps` | Rust, командная строка | Да, полностью | Из [airalab/robins](https://github.com/airalab/robins) |

Все они подключаются к `wss://polkadot.rpc.robonomics.network/` или к вашей собственной ноде.

## Python: robonomics-interface

Текущая версия — 3.1.0. Она проверена на dev-цепи с рантаймом 52 и проверками только на чтение в действующей сети. Версия 3.0 переписана с нуля и несовместима с 2.x: она больше не зависит от `substrate-interface`. Если переходите с 2.x, прочитайте [MIGRATION.md](https://github.com/airalab/robonomics-interface/blob/main/MIGRATION.md).

Что умеет:

- Ключи: по умолчанию ED25519. Для sr25519, который по умолчанию используют кошельки Polkadot, нужен extra `[sr25519]` и `crypto_type=SR25519`. Адреса SS58, мнемоники, импорт резервных копий кошельков.
- Асинхронный клиент с переключением между точками подключения и его синхронный двойник для скриптов (`RobonomicsSync`).
- Запросы к хранилищу и экстринзики с событиями и понятными ошибками.
- Хелперы для Datalog, RWS, System и Balances.
- Шифрование сообщений и конверт отчёта, который использует Robonomics Report Service.

Хелперов для дерева устройств нет. Но любой паллет можно вызвать через универсальные `compose_call` и `submit`.

Установка (Python 3.12 или новее):

{% codeHelper {copy: true} %}

```bash
pip install 'robonomics-interface[sr25519]'
```

{% endcodeHelper %}

Запись datalog по примеру из README:

```python
from robonomicsinterface import Keypair, RobonomicsClient

site = Keypair.from_mnemonic(mnemonic)  # ED25519 by default

async with RobonomicsClient() as client:  # wss://polkadot.rpc.robonomics.network/
    await client.datalog.record(site, b"hello")
    latest = await client.datalog.latest(site.address)
```

Документация: [airalab.github.io/robonomics-interface](https://airalab.github.io/robonomics-interface/).

## JavaScript

`@polkadot/api` работает со всеми паллетами, включая дерево устройств. Примеры из [README паллета CPS](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md#client-usage):

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

npm-пакет `robonomics-interface` (JavaScript) использует robonomics.app. Он покрывает datalog, launch, RWS, digital twin и служебные вызовы, но не дерево устройств.

## Rust

- `robonomics-runtime-subxt-api`: типизированные привязки к рантайму, включая view-функции дерева устройств.
- `libcps`: библиотека для дерева устройств со встроенным лёгким клиентом. На crates.io она не опубликована; подключайте её из [airalab/robins](https://github.com/airalab/robins).

<a id="cps-command-line-tool"></a>

## Консольная утилита cps

`cps` работает с деревом устройств из терминала. Она умеет запускать свой лёгкий клиент, так что нода или публичный RPC не нужны.

Установите её из ночных сборок [airalab/robins](https://github.com/airalab/robins/releases) (архивы для Linux и macOS, x86_64 и aarch64) или запустите через Nix:

{% codeHelper {copy: true} %}

```bash
nix run github:airalab/robins#libcps -- --help
```

{% endcodeHelper %}

В README robins упоминается и `cargo install libcps`, но крейта `libcps` на crates.io нет.

Несколько команд:

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

Полное руководство — в [документации robins](https://github.com/airalab/robins/tree/master/docs/src/01-cli).

## Устаревшее

Обёртка для ROS 2 (`robonomics-ros2`) и `robonomics-js` устарели и для текущего рантайма не поддерживаются.
