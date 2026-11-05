---
title: Avviare un collator
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

I collator producono i blocchi della parachain Robonomics. Questa guida configura un collator su un server Linux, lo registra on-chain e spiega come guadagna.

La fonte di questa guida è la [collator guide](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) nel repository del runtime.

## Cosa ti serve

- Un server: 8 core CPU, 64 GB di RAM, 2 TB NVMe. Un server del genere costa circa $120–150 al mese.
- Disco: la parachain e la relay chain Polkadot insieme occupano circa 1.1 TB e continuano a crescere. Prevedi almeno 2 TB.
- Un account su Robonomics con più di 32 XRT di saldo libero.

## 1. Installa il nodo

Non esiste un binario del nodo Robonomics. Un collator usa `polkadot-omni-node`, il nodo generico di Parity, con la chain spec di Robonomics. La guida presuppone un utente `robonomics` con home `/var/lib/robonomics/` e base path `/var/lib/robonomics/base/`.

Scarica `polkadot-omni-node` dalle [release del Polkadot SDK](https://github.com/paritytech/polkadot-sdk/releases). Usa l'ultima release `polkadot-stable*`; i comandi qui sotto usano `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Scarica la chain spec:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Genera la chiave di rete

Senza una chiave di rete il collator non parte:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

La chiave viene scritta in `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. Fanne un backup.

## 3. Avvia il nodo

`ExecStart` consigliato per un servizio systemd:

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

- Il primo `--sync warp` vale per la parachain. Quello dopo `--` vale per la relay chain integrata. Senza di esso la sincronizzazione della relay chain può richiedere settimane.
- La chain spec non contiene un endpoint di telemetria, quindi la telemetria si attiva con `--telemetry-url`.

## 4. Genera le session key

Le session key sono chiavi Aura (sr25519). Avvia temporaneamente il nodo con `--rpc-methods unsafe`, poi chiama `author_rotateKeysWithOwner` con l'account del tuo collator:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Il risultato ha due campi: `keys` e `proof`. Salvali entrambi. Verifica che il nodo abbia le chiavi:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Poi togli `--rpc-methods unsafe` e riavvia il nodo.

## 5. Registrati on-chain

Invia questi extrinsic dall'account del tuo collator, per esempio in [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` con i due valori del passo precedente. Non passare una proof vuota: la proof lega le chiavi al tuo account.
2. `collatorSelection.registerAsCandidate()`. Questo vincola **32 XRT**.

Il tuo nodo entra nel set dopo un cambio di sessione. Nel runtime una sessione dura 3,600 blocchi, circa 6 ore con blocchi da 6 secondi.

Controlla la tua candidatura on-chain, non solo lo stato del nodo: guarda `collatorSelection.candidateList` e `collatorSelection.invulnerables` in **Developer → Chain state**.

La cauzione e i limiti sui candidati sono impostazioni del runtime. Per cambiarli serve un referendum Root. Vedi [XRT e governance](/docs/xrt-and-governance/).

## Come funzionano le ricompense

Un collator guadagna in due modi:

1. **Ricompensa per blocco.** Una cifra fissa di 0.0042 XRT viene coniata direttamente per l'autore di ogni blocco. È in vigore dal runtime 43.
2. **Commissioni e mance.** Tutte le commissioni e le mance finiscono nel fondo dei collator. L'autore di un blocco riceve una quota del fondo.

La ricompensa per blocco è calcolata per coprire un server con un margine:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

I dati di partenza sono un server da $2,040 l'anno, 7 collator, un margine del 30% e un prezzo di XRT di $1. Quando cambiano, la ricompensa viene rivista con un aggiornamento del runtime.

Il tuo guadagno dipende dalla tua quota di blocchi: più collator ci sono, meno blocchi produce ciascuno. Contesto e misurazioni: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
