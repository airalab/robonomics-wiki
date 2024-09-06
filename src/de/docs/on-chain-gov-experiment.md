---
title: On-chain Government Experiment

---

Derzeit ist Polkadot eines der größten DAOs der Welt! Im Ökosystem finden viele interessante Ereignisse im Rahmen des On-Chain-Governance-Experiments statt. Die Entwickler von Robonomics schlagen vor, dass die Teilnehmer des Hackathons das Niveau der Immersion in die Polkadot-Community erhöhen, indem sie Ereignisse im Zusammenhang mit Abstimmungen, neuen Schatzanträgen, Epoch-Änderungen und vielem mehr in ein typisches Smart-Home-System integrieren.

---

Dieser Artikel diskutiert das Smart-Home-Management über die Robonomics Cloud als Ergebnis eines Ereignisses im Polkadot-Ökosystem. Hier ist ein Beispiel dafür, wie eine Lampe eingeschaltet werden kann, wenn ein neues Referendum im Polkadot-Netzwerk eingereicht wird.

{% roboWikiVideo {videos:[{src: 'QmWARwfH8WSEjnWUEFSDn28ya8Xp93qyjmSdGkdkwFntWe', type: 'mp4'}], attrs:['loop', 'controls', 'autoplay']} %}{% endroboWikiVideo %}

## Anforderungen

- Installierte Home Assistant-Instanz mit Robonomics-Integration. Installationsmethoden finden Sie [hier](/docs/install-smart-home).
- Polkadot-Knoten oder Gateway für die Interaktion. Zum Beispiel - `wss://polkadot.api.onfinality.io`
- Robonomics-Knoten oder Gateway für die Interaktion.
- Erstelltes Konto im ED25519-Format. Informationen finden Sie [hier](/docs/sub-activate).
- Erstelltes Konto in einer Geräteliste des Robonomics-Abonnements. Erfahren Sie mehr [hier](/docs/add-user).
- Abonnementbesitzer- und Controller-Adressen.

Python-Bibliotheken:
- [substrate-interface](https://pypi.org/project/substrate-interface/)
- [IPFS-Toolkit](https://pypi.org/project/IPFS-Toolkit/)
- [robonomics-interface](https://pypi.org/project/robonomics-interface/)

## Erstellen eines Polkadot-Listeners

Zunächst müssen Sie ein Skript erstellen, das auf neue Ereignisse im Polkadot-Netzwerk hört. Im Beispiel verfolgen wir die Erstellung neuer Referenden.

Für Testzwecke wurde ein lokaler Polkadot-Knoten im Entwicklungsmodus verwendet. Eine Bereitstellungsanleitung finden Sie [hier](https://github.com/paritytech/polkadot-sdk/tree/master/polkadot#hacking-on-polkadot).

Um sich mit einem öffentlichen Knoten zu verbinden, ändern Sie den "POLKAD"Die "POLKADOT_GATEWAY"-Variable.

Beispielcode:


{% codeHelper {copy: true}%}

```python
from substrateinterface import SubstrateInterface

POLKADOT_GATEWAY = "ws://127.0.0.1:9944"

substrate = SubstrateInterface(
    url=POLKADOT_GATEWAY
)

def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Start der Referendenanzahl:', data.value)
    if update_nr > 0:
        print('Referendenanzahl erhöht sich:', data.value)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

Dieses Skript wird Änderungen in der aktuellen Referendenanzahl überwachen und die Nummer des neuesten Referendums anzeigen.

### Testen

Führen Sie das Programm aus und öffnen Sie [polkadot.js](https://polkadot.js.org/apps/#/explorer).
Um zum lokalen Entwicklungsnetz zu wechseln, klicken Sie auf das Symbol in der oberen linken Ecke, und ein Seitenmenü wird angezeigt. Wählen Sie "Development" und "Local Node" unten aus und klicken Sie dann auf "Switch".

{% roboWikiPicture {src:"docs/gov-exp/polka_sidemenu.png", alt:"polka_sidemenu"} %}{% endroboWikiPicture %}

Sie wechseln zum lokalen Knoten. Gehen Sie zum Tab "Governance" -> "Preimages".

{% roboWikiPicture {src:"docs/gov-exp/preimage.png", alt:"preimage"} %}{% endroboWikiPicture %}

Erstellen Sie ein neues Preimage. Lassen Sie uns eine Bemerkung im Netzwerk hinterlassen. Signieren Sie es und senden Sie es an das Netzwerk.

{% roboWikiPicture {src:"docs/gov-exp/remark.png", alt:"remark"} %}{% endroboWikiPicture %}

Sie erhalten dessen Hash. Kopieren Sie ihn und gehen Sie zum Tab "Governance" -> "Referenda". Klicken Sie auf "Vorschlag einreichen". Da dies ein Testnetzwerk ist, können die meisten konfigurierbaren Felder auf Standardwerte belassen werden. Fügen Sie den Preimage-Hash ein und signieren Sie den Vorschlag.


{% roboWikiPicture {src:"docs/gov-exp/proposal.png", alt:"proposal"} %}{% endroboWikiPicture %}

Nachdem Sie ihn an das Netzwerk gesendet haben, wird das Programm den neuen Vorschlag erkennen und die folgenden Protokolle ausgeben:

```
Start der Referendenanzahl: 0
Referendenanzahl erhöht sich: 1```

## Verbindung zum Smart Home

Jetzt müssen wir nach dem Erstellen eines neuen Vorschlags eine Interaktion mit dem Smart Home hinzufügen.

Dafür müssen wir Folgendes wissen:
- Dienstbereich
- Dienstname
- Zielentität
- Daten - sollten vom Typ "dict" sein

Schauen wir, wo wir sie finden können. Öffnen Sie die installierte Home Assistant-Instanz. Gehen Sie zu "Entwicklerwerkzeuge -> Dienste", wählen Sie einen beliebigen Dienst aus und wechseln Sie in den YAML-Modus. Betrachten wir das Beispiel eines Schalters.

{% roboWikiPicture {src:"docs/gov-exp/service.png", alt:"services"} %}{% endroboWikiPicture %}

Der "service"-Schlüssel enthält den Dienstbereich und den Namen. Alles vor dem Punkt ist der Bereich und alles nach dem Punkt ist der Dienstname. Auch das Datenfeld wird benötigt.

Um die Zielentität zu finden, gehen Sie zu "Einstellungen -> Geräte & Dienste -> Entitäten". Dort wird eine Spalte mit "Entitäts-ID" vorhanden sein - dies ist der erforderliche Zielentitätsparameter.

Nun, da wir alle Parameter kennen, schauen wir uns an, was im Skript passieren wird.

Das Skript wird eine Verbindung zum lokalen IPFS-Dämon herstellen. (Wenn Sie den Anweisungen zur Einrichtung des Smart Homes gefolgt sind, haben Sie bereits den IPFS-Dämon ausgeführt.)

Zuerst werden wir einen Befehl im JSON-Format erstellen. Als Nächstes wird die Nachricht mit den Schlüsseln des Benutzers und des Controllers verschlüsselt.
Dann wird der verschlüsselte Befehl in einer Datei gespeichert und zu IPFS hinzugefügt. Danach wird der resultierende IPFS-Hash an die Robonomics-Parachain über einen extrinsischen `Launch` an die Adresse des Controllers gesendet.
Wenn der Controller den Start empfängt, wird er die Datei von IPFS herunterladen, entschlüsseln und den darin angegebenen Dienst aufrufen.

Der vollständige Code lautet wie folgt:

{% codeHelper { copy: true}%}

```python
import os
import json
import ipfshttpclient2
from substrateinterface import SubstrateInterface
from robonomicsinterface import Account, Launch
from substrateinterface import Keypair, KeypairType
from robonomicsinterface.utils import ipfs_qm_hash_to_32_bytes, web_3_auth

# Polkadot-Teil
POLKADOT_GATEWAY = "<POLKADOT_GATEWAY>" # ws://127.0.0.1:9944
substrate = SubstrateInterface(url=POLKADOT_GATEWAY)

# Robonomics-Teil

# Robonomics-Anmeldeinformationen
# Die Benutzeradresse muss in
```RWS-Geräte
# Benutzeradresse muss ED25519 sein
user_seed = "<SEED_PHRASE>"
controller_address = "<CONTROLLER_ADDRESS>"
sub_owner_address = "<OWNER_ADDRESS>"

# Befehl
service_domain = "<DOMAIN>"  # Domain ist das, was vor dem Punkt im Namen des Dienstes steht. Zum Beispiel "switch"
service_name = "<NAME>"  # Name - was nach dem Punkt im Namen des Dienstes kommt. Zum Beispiel "turn_on"
target_entity = "<ENTITY_ID>"  # entity_id. Zum Beispiel "switch.boiler"
data = {}  # Muss ein Dictionary sein


def subscription_handler(data, update_nr, subscription_id):
    if update_nr == 0:
        print('Referendazählung beginnt:', data.value)

    if update_nr > 0:
        print('Referendazählung erhöht sich:', data.value)
        # Senden Sie den Start an die Controller-Adresse mit dem IPFS-Hash
        launch = Launch(sender, rws_sub_owner=sub_owner_address)
        res = launch.launch(controller_address, result_ipfs)
        print(f"Transaktionsergebnis: {res}")

def encrypt_message(
        message, sender_keypair: Keypair, recipient_public_key: bytes
) -> str:
    """
    Verschlüsseln Sie die Nachricht mit dem privaten Schlüssel des Senders und dem öffentlichen Schlüssel des Empfängers
    :param message: Zu verschlüsselnde Nachricht
    :param sender_keypair: Sender-Kontoschlüsselpaar
    :param recipient_public_key: Öffentlicher Schlüssel des Empfängers
    :return: verschlüsselte Nachricht
    """
    encrypted = sender_keypair.encrypt_message(message, recipient_public_key)
    return f"0x{encrypted.hex()}"

# Formatieren Sie die Nachricht zum Starten
data['entity_id'] = target_entity
command = {'platform': service_domain, 'name': service_name, 'params': data}

message = json.dumps(command)
print(f"Nachricht: {message}")
sender = Account(user_seed, crypto_type=KeypairType.ED25519)

# Befehl verschlüsseln
recipient = Keypair(
    ss58_address=controller_address, crypto_type=KeypairType.ED25519
)
message = encrypt_message(message, sender.keypair, recipient.public_key)
print(f"Verschlüsselte Nachricht: {message}")
filename = "temporäre_datei"
with open(filename, "w") as f:
    f.write(message)
with ipfshttpclient2.connect() as client:
    result = client.add(filename, pin=False)```python
result_ipfs  = result["Hash"]
    print(f"IPFS hash: {result_ipfs}")
    print(f"IPFS hash for launch {ipfs_qm_hash_to_32_bytes(result_ipfs)}")

os.remove(filename)

substrate.query("Referenda", "ReferendumCount", subscription_handler=subscription_handler)
```

{% endcodeHelper %}

Wenn Sie alles richtig gemacht haben, sehen Sie die folgenden Protokolle:
```
Nachricht: {"platform": "switch", "name": "turn_on", "params": {"entity_id": "switch.boiler"}}
Verschlüsselte Nachricht: 0x33356b915e51e4c050180db0c3e39de86e946b6807ea83114978c848d016ab34a812e271dd1e5b40aa8632edd5acf4254090d2c2849daafcc46d2d4a4406a169a04edb4a668a268b3265e96ded0411398e3520fd5b676109752d24f12a7ece976bdc58da6a5b95d3c9e77aa59270bbc86c66c2ffe69ef7b10fae20
IPFS hash: QmcrqSD3bBYmm4rpaDMUVNQwF8CSi5WWVnwPtuGJdzgWpK
IPFS hash for launch 0xd7bf2b46baebf5556ac30fda97d7bf34a71558acdafde694c849521d01ccd8b4
Referendazählung beginnen: 0
Referendazählung erhöht: 1
Transaktionsergebnis: 0xe07d43462d540a7312763349b362318c427ca9a61e7d5bfa3c890e8b1c0294c1
```