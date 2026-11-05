---
title: Collator betreiben
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

Collators erzeugen die Blöcke der Robonomics-Parachain. Diese Anleitung richtet einen Collator auf einem Linux-Server ein, registriert ihn on-chain und erklärt, wie er verdient.

Grundlage dieser Anleitung ist der [Collator-Guide](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) im Runtime-Repository.

## Was Sie brauchen

- Einen Server: 8 CPU-Kerne, 64 GB RAM, 2 TB NVMe. Ein solcher Server kostet etwa 120–150 $ im Monat.
- Speicherplatz: Die Parachain und die Polkadot-Relay-Chain belegen zusammen etwa 1,1 TB und wachsen weiter. Planen Sie mindestens 2 TB ein.
- Ein Konto auf Robonomics mit mehr als 32 XRT freiem Guthaben.

## 1. Node installieren

Ein Robonomics-Node-Binary gibt es nicht. Ein Collator betreibt den generischen `polkadot-omni-node` von Parity mit der Robonomics-Chain-Spec. Die Anleitung geht von einem Benutzer `robonomics` mit dem Home-Verzeichnis `/var/lib/robonomics/` und dem Basispfad `/var/lib/robonomics/base/` aus.

Laden Sie `polkadot-omni-node` aus den [Polkadot-SDK-Releases](https://github.com/paritytech/polkadot-sdk/releases) herunter. Nehmen Sie das neueste Release `polkadot-stable*`; die Befehle unten nutzen `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Laden Sie die Chain-Spec herunter:

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Netzwerkschlüssel erzeugen

Ohne Netzwerkschlüssel startet der Collator nicht:

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

Der Schlüssel wird nach `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519` geschrieben. Sichern Sie ihn.

## 3. Node starten

Empfohlenes `ExecStart` für einen systemd-Dienst:

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

- Das erste `--sync warp` gilt für die Parachain, das nach `--` für die eingebettete Relay-Chain. Ohne es kann die Synchronisierung der Relay-Chain Wochen dauern.
- Die Chain-Spec enthält keinen Telemetrie-Endpunkt, deshalb wird Telemetrie mit `--telemetry-url` eingeschaltet.

## 4. Session-Keys erzeugen

Session-Keys sind Aura-Schlüssel (sr25519). Starten Sie den Node vorübergehend mit `--rpc-methods unsafe` und rufen Sie dann `author_rotateKeysWithOwner` mit Ihrem Collator-Konto auf:

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Das Ergebnis hat zwei Felder: `keys` und `proof`. Speichern Sie beide. Prüfen Sie, ob der Node die Schlüssel hat:

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Entfernen Sie danach `--rpc-methods unsafe` und starten Sie den Node neu.

## 5. On-chain registrieren

Senden Sie diese Extrinsics von Ihrem Collator-Konto, zum Beispiel in [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics):

1. `session.setKeys(keys, proof)` mit den beiden Werten aus dem vorigen Schritt. Übergeben Sie keinen leeren Proof: Der Proof bindet die Schlüssel an Ihr Konto.
2. `collatorSelection.registerAsCandidate()`. Dabei werden **32 XRT** hinterlegt.

Ihr Node kommt nach einem Session-Wechsel in die Collator-Gruppe. Eine Session dauert in der Runtime 3.600 Blöcke, bei 6-Sekunden-Blöcken etwa 6 Stunden.

Prüfen Sie Ihre Kandidatur on-chain, nicht nur am Zustand des Nodes: Sehen Sie sich `collatorSelection.candidateList` und `collatorSelection.invulnerables` unter **Developer → Chain state** an.

Der Bond und die Limits für Kandidaten sind Runtime-Einstellungen. Sie zu ändern erfordert ein Root-Referendum. Siehe [XRT und Governance](/docs/xrt-and-governance/).

## Wie Belohnungen funktionieren

Ein Collator verdient auf zwei Wegen:

1. **Blockbelohnung.** Für jeden Block werden fest 0,0042 XRT direkt an dessen Autor geprägt. Das gilt seit Runtime 43.
2. **Gebühren und Tips.** Alle Gebühren und Tips fließen in den Collator-Pot. Der Autor eines Blocks erhält einen Anteil aus dem Pot.

Die Blockbelohnung ist so bemessen, dass sie einen Server mit Aufschlag deckt:

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

Die Eingangswerte sind ein Server für 2.040 $ im Jahr, 7 Collators, 30 % Aufschlag und ein XRT-Preis von 1 $. Ändern sich die Eingangswerte, wird die Belohnung per Runtime-Upgrade angepasst.

Ihr Einkommen hängt von Ihrem Anteil an den Blöcken ab: Je mehr Collators es gibt, desto weniger Blöcke erzeugt jeder einzelne. Hintergrund und Messungen: [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
