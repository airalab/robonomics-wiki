---
title: Запуск колатора
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

Колатори виробляють блоки парачейна Robonomics. Цей посібник допоможе підняти колатор на Linux-сервері, зареєструвати його в блокчейні та пояснює, як він заробляє.

Основа цього посібника — [посібник для колаторів](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) у репозиторії рантайму.

## Що знадобиться

- Сервер: 8 ядер CPU, 64 ГБ RAM, 2 ТБ NVMe. Такий сервер коштує близько $120–150 на місяць.
- Диск: парачейн і релейний ланцюг Polkadot разом займають близько 1.1 ТБ і продовжують зростати. Закладайте щонайменше 2 ТБ.
- Акаунт у Robonomics з вільним балансом понад 32 XRT.

## 1. Встановіть ноду

Бінарника ноди Robonomics немає. Колатор запускає універсальний `polkadot-omni-node` від Parity зі специфікацією ланцюга Robonomics. У посібнику передбачено користувача `robonomics` з домашнім каталогом `/var/lib/robonomics/` і базовим шляхом `/var/lib/robonomics/base/`.

Завантажте `polkadot-omni-node` зі сторінки [випусків Polkadot SDK](https://github.com/paritytech/polkadot-sdk/releases). Беріть останній випуск `polkadot-stable*`; у командах нижче — `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Завантажте специфікацію ланцюга:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Згенеруйте мережевий ключ

Без мережевого ключа колатор не запуститься:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

Ключ записується в `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. Зробіть його резервну копію.

## 3. Запустіть ноду

Рекомендований `ExecStart` для сервісу systemd:

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

- Перший `--sync warp` стосується парачейна, другий, після `--`, — вбудованого релейного ланцюга. Без нього релейний ланцюг може синхронізуватися тижнями.
- У специфікації ланцюга немає точки телеметрії, тому телеметрію вмикають прапорцем `--telemetry-url`.

## 4. Згенеруйте сесійні ключі

Сесійні ключі — це ключі Aura (sr25519). Тимчасово запустіть ноду з `--rpc-methods unsafe` і викличте `author_rotateKeysWithOwner` з акаунтом колатора:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

У відповіді два поля: `keys` і `proof`. Збережіть обидва. Перевірте, що ключі є на ноді:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Потім приберіть `--rpc-methods unsafe` і перезапустіть ноду.

## 5. Зареєструйтеся в блокчейні

Надішліть ці екстринзики з акаунта колатора, наприклад у [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` з двома значеннями з попереднього кроку. Не передавайте порожній proof: саме він прив'язує ключі до вашого акаунта.
2. `collatorSelection.registerAsCandidate()`. Цей виклик блокує заставу в **32 XRT**.

Нода увійде до набору колаторів після зміни сесії. Сесія в рантаймі — 3,600 блоків, близько 6 годин за 6-секундних блоків.

Перевіряйте кандидатуру в блокчейні, а не лише за станом ноди: дивіться `collatorSelection.candidateList` і `collatorSelection.invulnerables` у **Developer → Chain state**.

Застава і ліміти для кандидатів — налаштування рантайму. Щоб їх змінити, потрібен референдум у треку Root. Див. [XRT та управління](/docs/xrt-and-governance/).

## Як працюють винагороди

Колатор заробляє двома способами:

1. **Винагорода за блок.** Автору кожного блоку напряму випускається фіксовані 0.0042 XRT. Так влаштовано з рантайму 43.
2. **Комісії та чайові.** Усі комісії та чайові йдуть у спільний фонд колаторів. Автор блоку отримує частку з цього фонду.

Винагороду за блок розраховано так, щоб із запасом покривати сервер:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

Вихідні дані: сервер за $2,040 на рік, 7 колаторів, запас 30% і ціна XRT $1. Коли вихідні дані змінюються, винагороду переглядають оновленням рантайму.

Дохід залежить від вашої частки блоків: що більше колаторів, то менше блоків виробляє кожен. Подробиці та заміри: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
