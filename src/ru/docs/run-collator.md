---
title: Запуск коллатора
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

Коллаторы производят блоки парачейна Robonomics. Это руководство помогает поднять коллатор на Linux-сервере, зарегистрировать его в блокчейне и объясняет, как он зарабатывает.

Основа этого руководства — [руководство для коллаторов](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) в репозитории рантайма.

## Что понадобится

- Сервер: 8 ядер CPU, 64 ГБ RAM, 2 ТБ NVMe. Такой сервер стоит около $120–150 в месяц.
- Диск: парачейн и релейная цепь Polkadot вместе занимают около 1.1 ТБ и продолжают расти. Закладывайте не меньше 2 ТБ.
- Аккаунт в Robonomics со свободным балансом больше 32 XRT.

## 1. Установите ноду

Бинарника ноды Robonomics нет. Коллатор запускает универсальный `polkadot-omni-node` от Parity со спецификацией цепи Robonomics. В руководстве предполагается пользователь `robonomics` с домашним каталогом `/var/lib/robonomics/` и базовым путём `/var/lib/robonomics/base/`.

Скачайте `polkadot-omni-node` со страницы [выпусков Polkadot SDK](https://github.com/paritytech/polkadot-sdk/releases). Берите последний выпуск `polkadot-stable*`; в командах ниже — `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Скачайте спецификацию цепи:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Сгенерируйте сетевой ключ

Без сетевого ключа коллатор не запустится:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

Ключ записывается в `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. Сделайте его резервную копию.

## 3. Запустите ноду

Рекомендуемый `ExecStart` для сервиса systemd:

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

- Первый `--sync warp` относится к парачейну, второй, после `--`, — к встроенной релейной цепи. Без него релейная цепь может синхронизироваться неделями.
- В спецификации цепи нет точки телеметрии, поэтому телеметрию включают флагом `--telemetry-url`.

## 4. Сгенерируйте сессионные ключи

Сессионные ключи — это ключи Aura (sr25519). Временно запустите ноду с `--rpc-methods unsafe` и вызовите `author_rotateKeysWithOwner` с аккаунтом коллатора:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

В ответе два поля: `keys` и `proof`. Сохраните оба. Проверьте, что ключи есть на ноде:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Затем уберите `--rpc-methods unsafe` и перезапустите ноду.

## 5. Зарегистрируйтесь в блокчейне

Отправьте эти экстринзики с аккаунта коллатора, например в [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` с двумя значениями из прошлого шага. Не передавайте пустой proof: именно он привязывает ключи к вашему аккаунту.
2. `collatorSelection.registerAsCandidate()`. Этот вызов блокирует залог в **32 XRT**.

Нода войдёт в набор коллаторов после смены сессии. Сессия в рантайме — 3,600 блоков, около 6 часов при 6-секундных блоках.

Проверяйте кандидатуру в блокчейне, а не только по состоянию ноды: смотрите `collatorSelection.candidateList` и `collatorSelection.invulnerables` в **Developer → Chain state**.

Залог и лимиты на кандидатов — настройки рантайма. Чтобы их изменить, нужен референдум в треке Root. См. [XRT и управление](/docs/xrt-and-governance/).

## Как устроены награды

Коллатор зарабатывает двумя способами:

1. **Награда за блок.** Автору каждого блока напрямую выпускается фиксированные 0.0042 XRT. Так устроено с рантайма 43.
2. **Комиссии и чаевые.** Все комиссии и чаевые идут в общий фонд коллаторов. Автор блока получает долю из этого фонда.

Награда за блок рассчитана так, чтобы с запасом покрывать сервер:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

Исходные данные: сервер за $2,040 в год, 7 коллаторов, запас 30% и цена XRT $1. Когда исходные данные меняются, награду пересматривают обновлением рантайма.

Доход зависит от вашей доли блоков: чем больше коллаторов, тем меньше блоков производит каждый. Подробности и замеры: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
