---
title: Ejecutar un collator
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

Los collators producen los bloques de la parachain de Robonomics. Esta guía configura un collator en un servidor Linux, lo registra on-chain y explica cómo gana dinero.

Esta guía se basa en la [guía del collator](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) del repositorio del runtime.

## Qué necesitas

- Un servidor: 8 núcleos de CPU, 64 GB de RAM, 2 TB NVMe. Un servidor así cuesta unos 120–150 USD al mes.
- Disco: la parachain y la relay chain de Polkadot ocupan juntas unos 1,1 TB y siguen creciendo. Cuenta con al menos 2 TB.
- Una cuenta en Robonomics con más de 32 XRT de saldo libre.

## 1. Instalar el nodo

No existe un binario de nodo de Robonomics. Un collator ejecuta `polkadot-omni-node`, el nodo genérico de Parity, con la chain spec de Robonomics. La guía supone un usuario `robonomics` con directorio personal `/var/lib/robonomics/` y ruta base `/var/lib/robonomics/base/`.

Descarga `polkadot-omni-node` desde las [versiones del Polkadot SDK](https://github.com/paritytech/polkadot-sdk/releases). Usa la versión `polkadot-stable*` más reciente; los comandos de abajo usan `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Descarga la chain spec:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Generar la clave de red

El collator no arranca sin una clave de red:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

La clave se escribe en `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. Haz una copia de seguridad.

## 3. Arrancar el nodo

`ExecStart` recomendado para un servicio de systemd:

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

- El primer `--sync warp` es para la parachain. El que va después de `--` es para la relay chain integrada. Sin él, la relay chain puede tardar semanas en sincronizarse.
- La chain spec no incluye un endpoint de telemetría, así que la telemetría se activa con `--telemetry-url`.

## 4. Generar las claves de sesión

Las claves de sesión son claves Aura (sr25519). Arranca el nodo temporalmente con `--rpc-methods unsafe` y llama a `author_rotateKeysWithOwner` con tu cuenta de collator:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

El resultado tiene dos campos: `keys` y `proof`. Guarda los dos. Comprueba que el nodo tiene las claves:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Después quita `--rpc-methods unsafe` y reinicia el nodo.

## 5. Registrarse on-chain

Envía estos extrinsics desde tu cuenta de collator, por ejemplo en [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` con los dos valores del paso anterior. No pases una prueba vacía: la prueba vincula las claves a tu cuenta.
2. `collatorSelection.registerAsCandidate()`. Esto deposita **32 XRT** como fianza.

Tu nodo entra en el conjunto tras un cambio de sesión. Una sesión dura 3600 bloques en el runtime, unas 6 horas con bloques de 6 segundos.

Comprueba tu candidatura on-chain, no solo por el estado del nodo: mira `collatorSelection.candidateList` y `collatorSelection.invulnerables` en **Developer → Chain state**.

La fianza y los límites de candidatos son ajustes del runtime. Cambiarlos requiere un referéndum Root. Consulta [XRT y gobernanza](/docs/xrt-and-governance/).

## Cómo funcionan las recompensas

Un collator gana de dos maneras:

1. **Recompensa por bloque.** Se emiten 0,0042 XRT fijos directamente para el autor de cada bloque. Está en vigor desde el runtime 43.
2. **Comisiones y propinas.** Todas las comisiones y propinas van al fondo de los collators. El autor de un bloque recibe una parte del fondo.

La recompensa por bloque está calculada para cubrir un servidor con margen:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

Los datos de partida son un servidor de 2040 USD al año, 7 collators, un margen del 30 % y un precio de XRT de 1 USD. La recompensa se revisa mediante una actualización del runtime cuando cambian esos datos.

Tus ingresos dependen de tu parte de los bloques: cuantos más collators hay, menos bloques produce cada uno. Contexto y mediciones: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
