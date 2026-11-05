---
title: Faire tourner un collator
contributors: [dergudzon, Leemo94, Fingerling42, ensrationis]
---

Les collators produisent les blocs de la parachain Robonomics. Ce guide installe un collator sur un serveur Linux, l'enregistre on-chain et explique comment il est rémunéré.

Ce guide reprend le [guide du collator](https://github.com/airalab/robonomics/blob/master/COLLATOR_GUIDE.md) du dépôt du runtime.

## Ce qu'il vous faut

- Un serveur : 8 cœurs CPU, 64 Go de RAM, 2 To de NVMe. Un tel serveur coûte environ 120 à 150 $ par mois.
- Disque : la parachain et la relay chain Polkadot occupent ensemble environ 1,1 To, et ce volume augmente. Prévoyez au moins 2 To.
- Un compte sur Robonomics avec plus de 32 XRT de solde disponible.

## 1. Installer le nœud

Il n'y a pas de binaire de nœud Robonomics. Un collator fait tourner `polkadot-omni-node`, le nœud générique de Parity, avec la chain spec de Robonomics. Le guide suppose un utilisateur `robonomics` avec le répertoire personnel `/var/lib/robonomics/` et le chemin de base `/var/lib/robonomics/base/`.

Téléchargez `polkadot-omni-node` depuis les [versions du Polkadot SDK](https://github.com/paritytech/polkadot-sdk/releases). Prenez la dernière version `polkadot-stable*` ; les commandes ci-dessous utilisent `polkadot-stable2609`.

{% codeHelper {copy: true} %}

```bash
wget -O polkadot-omni-node \
  https://github.com/paritytech/polkadot-sdk/releases/download/polkadot-stable2609/polkadot-omni-node
chmod +x polkadot-omni-node
sudo mv polkadot-omni-node /usr/local/bin/
```

{% endcodeHelper %}

Téléchargez la chain spec :

{% codeHelper {copy: true} %}

```bash
wget -O /var/lib/robonomics/robonomics-polkadot.raw.json \
  https://raw.githubusercontent.com/airalab/robonomics/master/chain-spec/polkadot-parachain.raw.json
```

{% endcodeHelper %}

## 2. Générer la clé réseau

Le collator ne démarre pas sans clé réseau :

{% codeHelper {copy: true} %}

```bash
polkadot-omni-node key generate-node-key \
  --base-path /var/lib/robonomics/base/ \
  --chain /var/lib/robonomics/robonomics-polkadot.raw.json
```

{% endcodeHelper %}

La clé est écrite dans `/var/lib/robonomics/base/chains/robonomics/network/secret_ed25519`. Sauvegardez-la.

## 3. Démarrer le nœud

`ExecStart` recommandé pour un service systemd :

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

- Le premier `--sync warp` concerne la parachain. Celui placé après `--` concerne la relay chain intégrée. Sans lui, la synchronisation de la relay chain peut prendre des semaines.
- La chain spec n'a pas de point d'accès de télémétrie, la télémétrie est donc activée avec `--telemetry-url`.

## 4. Générer les clés de session

Les clés de session sont des clés Aura (sr25519). Démarrez temporairement le nœud avec `--rpc-methods unsafe`, puis appelez `author_rotateKeysWithOwner` avec votre compte de collator :

{% codeHelper {copy: true} %}

```bash
curl -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_rotateKeysWithOwner","params":["YOUR_COLLATOR_ACCOUNT"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Le résultat contient deux champs : `keys` et `proof`. Conservez les deux. Vérifiez que le nœud détient bien les clés :

{% codeHelper {copy: true} %}

```bash
curl -s -H "Content-Type: application/json" \
  -d '{"id":1,"jsonrpc":"2.0","method":"author_hasSessionKeys","params":["KEYS"]}' \
  http://127.0.0.1:9944
```

{% endcodeHelper %}

Retirez ensuite `--rpc-methods unsafe` et redémarrez le nœud.

## 5. S'enregistrer on-chain

Envoyez ces extrinsics depuis votre compte de collator, par exemple dans [Polkadot.js Apps](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fpolkadot.rpc.robonomics.network%2F#/extrinsics) :

1. `session.setKeys(keys, proof)` avec les deux valeurs de l'étape précédente. Ne passez pas une preuve vide : la preuve lie les clés à votre compte.
2. `collatorSelection.registerAsCandidate()`. Cela bloque **32 XRT** en caution.

Votre nœud rejoint l'ensemble des collators après un changement de session. Une session dure 3 600 blocs dans le runtime, soit environ 6 heures avec des blocs de 6 secondes.

Vérifiez votre candidature on-chain, pas seulement d'après l'état du nœud : consultez `collatorSelection.candidateList` et `collatorSelection.invulnerables` dans **Developer → Chain state**.

La caution et les limites sur les candidats sont des paramètres du runtime. Les modifier demande un référendum Root. Voir [XRT et gouvernance](/docs/xrt-and-governance/).

## Fonctionnement des récompenses

Un collator gagne de deux façons :

1. **Récompense de bloc.** Un montant fixe de 0,0042 XRT est frappé directement pour l'auteur de chaque bloc. C'est le cas depuis le runtime 43.
2. **Frais et pourboires.** Tous les frais et pourboires vont dans la cagnotte des collators. L'auteur d'un bloc reçoit une part de la cagnotte.

La récompense de bloc est calculée pour couvrir un serveur avec une marge :

```
reward per block = (server cost per year × number of collators × 1.3)
                   / blocks per year / XRT price
                 = (2,040 × 7 × 1.3) / 4,505,143 / 1 ≈ 0.0042 XRT
```

Les hypothèses sont un serveur à 2 040 $ par an, 7 collators, une marge de 30 % et un prix du XRT de 1 $. La récompense est revue par mise à jour du runtime quand ces hypothèses changent.

Votre revenu dépend de votre part des blocs : plus il y a de collators, moins chacun produit de blocs. Contexte et mesures : [Collator rewards, measured](https://robonomics.network/blog/collator-rewards-runtime-43/).
