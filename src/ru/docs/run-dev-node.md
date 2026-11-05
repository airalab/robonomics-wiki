---
title: Запуск dev-ноды
contributors: [LoSk-p, ensrationis]
---

Dev-нода — это локальная цепь Robonomics из одной ноды для проверки вашего кода. Блоки производятся сразу, на тестовых аккаунтах есть средства, а действующая сеть никак не затрагивается.

Бинарника `robonomics --dev` больше нет. Вы собираете рантайм из [airalab/robonomics](https://github.com/airalab/robonomics), генерируете из него спецификацию цепи и запускаете с ней универсальный `polkadot-omni-node` от Parity.

## Одна команда (Nix)

Из клона репозитория:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

Скрипт при необходимости собирает рантайм с фичей `dev-runtime`, генерирует временную спецификацию цепи и запускает `polkadot-omni-node --chain <spec> --dev`.

## Без Nix

Установите два инструмента через Cargo и запустите тот же скрипт:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## Вручную

Чтобы сохранить спецификацию цепи или поменять флаги ноды, выполните шаги сами:

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

Встроенного `--chain dev` нет: всегда передавайте сгенерированную спецификацию и `--dev`. Добавьте `--base-path <dir>`, чтобы состояние цепи сохранялось между перезапусками.

## Что вы получаете

- RPC и WebSocket на `ws://127.0.0.1:9944`.
- Chain id `robonomics-dev`, para ID 2000, релейная цепь `westend-local`, токен XRT с 9 знаками после запятой.
- Пополненные dev-аккаунты: Alice, Bob, Charlie и другие известные тестовые ключи.
- Alice — Sudo. Sudo есть только в сборках `dev-runtime` и никогда — в действующей сети.
- Чистое состояние при каждом запуске, если не задан `--base-path`.

Подключите [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) к `ws://127.0.0.1:9944`, чтобы осмотреться. Для утилиты `cps` задайте `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` и `ROBONOMICS_SURI=//Alice`.

## RWS на dev-цепи

Аукционы RWS создаёт Root. Чтобы пропустить этот шаг при проверке кода для RWS, в репозитории `robonomics-interface` есть `scripts/devchain.sh`: он запускает dev-цепь, где аукционы RWS уже заложены в генезис.

Другие варианты, включая образ Docker, — в [руководстве разработчика](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
