---
title: Запуск dev-ноди
contributors: [LoSk-p, ensrationis]
---

Dev-нода — це локальний ланцюг Robonomics з однієї ноди для перевірки вашого коду. Блоки виробляються одразу, на тестових акаунтах є кошти, а робоча мережа ніяк не зачіпається.

Бінарника `robonomics --dev` більше немає. Ви збираєте рантайм з [airalab/robonomics](https://github.com/airalab/robonomics), генеруєте з нього специфікацію ланцюга і запускаєте з нею універсальний `polkadot-omni-node` від Parity.

## Одна команда (Nix)

З клону репозиторію:

{% codeHelper {copy: true} %}

```bash
nix develop -c ./scripts/development-chain.sh run
```

{% endcodeHelper %}

Скрипт за потреби збирає рантайм з фічею `dev-runtime`, генерує тимчасову специфікацію ланцюга і запускає `polkadot-omni-node --chain <spec> --dev`.

## Без Nix

Встановіть два інструменти через Cargo і запустіть той самий скрипт:

{% codeHelper {copy: true} %}

```bash
cargo install staging-chain-spec-builder polkadot-omni-node
./scripts/development-chain.sh run
```

{% endcodeHelper %}

## Вручну

Щоб зберегти специфікацію ланцюга або змінити прапорці ноди, виконайте кроки самі:

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

Вбудованого `--chain dev` немає: завжди передавайте згенеровану специфікацію і `--dev`. Додайте `--base-path <dir>`, щоб стан ланцюга зберігався між перезапусками.

## Що ви отримуєте

- RPC і WebSocket на `ws://127.0.0.1:9944`.
- Chain id `robonomics-dev`, para ID 2000, релейний ланцюг `westend-local`, токен XRT з 9 знаками після коми.
- Поповнені dev-акаунти: Alice, Bob, Charlie та інші відомі тестові ключі.
- Alice — Sudo. Sudo є лише у збірках `dev-runtime` і ніколи — в робочій мережі.
- Чистий стан під час кожного запуску, якщо не задано `--base-path`.

Підключіть [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=ws%3A%2F%2F127.0.0.1%3A9944#/explorer) до `ws://127.0.0.1:9944`, щоб роздивитися. Для утиліти `cps` задайте `ROBONOMICS_WS_URL=ws://127.0.0.1:9944` і `ROBONOMICS_SURI=//Alice`.

## RWS на dev-ланцюгу

Аукціони RWS створює Root. Щоб пропустити цей крок під час перевірки коду для RWS, у репозиторії `robonomics-interface` є `scripts/devchain.sh`: він запускає dev-ланцюг, де аукціони RWS уже закладено в генезис.

Інші варіанти, зокрема образ Docker, — у [посібнику розробника](https://github.com/airalab/robonomics/blob/master/DEVELOPER_GUIDE.md#running-a-development-chain).
