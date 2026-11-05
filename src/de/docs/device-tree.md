---
title: Gerätebaum (CPS)
contributors: [ensrationis]
---

Der Gerätebaum beschreibt Ihre Installation in der Robonomics-Cloud: einen Standort, seine Räume, die Geräte darin. Jeder Teil ist ein Knoten. Die Chain speichert die Struktur der Installation und den letzten Zustand jedes Knotens. Für große Datenmengen ist sie nicht gedacht.

In der Runtime ist der Gerätebaum das Pallet `CPS` (cyber-physische Systeme). Die vollständige technische Referenz: [README des CPS-Pallets](https://github.com/airalab/robonomics/blob/master/frame/cps/README.md).

## Knoten

- Jeder Knoten hat eine Nummer (`NodeId`). Die Nummern steigen fortlaufend und werden nie wiederverwendet.
- Ein Knoten kann einen Elternknoten haben. Ein Knoten ohne Elternknoten ist ein Wurzelknoten.
- Ein Knoten hat zwei Felder, beide optional:
  - `meta`: eine Beschreibung, die sich selten ändert, bis 1 KiB.
  - `payload`: der aktuelle Zustand, bis 8 KiB.
- Beide Felder sind einfache Bytes. Das Format wählen Sie selbst, zum Beispiel JSON.
- Der Elternknoten eines Knotens ändert sich nie. Um einen Knoten zu verschieben, legen Sie einen neuen an und löschen den alten.
- Ein Knoten kann höchstens 100 Kinder haben. Löschen lässt sich nur ein Knoten ohne Kinder.

<!-- -->

{% roboWikiNote {type: "warning", title: "Daten sind öffentlich"}%} Alles im Gerätebaum kann jeder lesen. Verschlüsseln Sie Daten vor dem Schreiben, wenn sie privat bleiben müssen. Das Tool `cps` aus [airalab/robins](https://github.com/airalab/robins) kann das für Sie erledigen. {% endroboWikiNote %}

## Scope

Ein Scope ist der Teil des Baums, der einem Konto gehört.

- Wenn Sie einen Wurzelknoten anlegen, entsteht zugleich ein Scope, und er gehört Ihnen.
- Jeder Knoten gehört zur nächsten Scope-Wurzel über ihm oder zu seinem eigenen Scope, wenn er selbst eine Scope-Wurzel ist.
- Sie können einen Knoten innerhalb Ihres Baums zur Wurzel eines neuen, verschachtelten Scopes machen. Ein verschachtelter Scope ist eine harte Grenze: Der äußere Eigentümer und die äußeren Zugriffsrechte wirken darin nicht. Eine Ausnahme: Der Eigentümer des direkt umgebenden Scopes darf ihn ersetzen.
- Der Eigentümer eines Scopes ändert sich nie. Um einen Scope zu übergeben, wird er ersetzt: Ein Konto, das auf dessen Wurzelknoten einen Scope anlegen darf, ruft `create_scope` auf. Dabei entsteht eine neue Scope-ID, der Aufrufer wird Eigentümer, und alle alten Zugriffseinträge werden gelöscht.
- Ein Scope ist höchstens 32 Knoten tief, gezählt von einem Knoten bis zu seiner Scope-Wurzel. Der gesamte Baum kann tiefer sein.
- Ein Scope verschwindet erst, wenn sein Wurzelknoten gelöscht wird.

## Zugriff

Der Scope-Eigentümer darf innerhalb des Scopes alles. Andere Konten brauchen einen Zugriffseintrag, und den kann nur der Eigentümer vergeben.

| Berechtigung | Erlaubt |
|---|---|
| `Write` | `set_meta` und `set_payload` |
| `CreateScope` | `create_scope` |

- Ein Eintrag gilt in einem von zwei Modi: `Node` (ein Knoten) oder `Subtree` (der Knoten und alles darunter, aber nicht innerhalb verschachtelter Scopes).
- Ein Scope hat höchstens 32 Zugriffseinträge.
- Kinder anlegen, Knoten löschen sowie Zugriff gewähren oder entziehen lässt sich nicht delegieren. Das darf nur der Eigentümer.

Weitere Berechtigungen (für Transaktionen, Speicher und Rechenleistung) sind in der 5.0-Roadmap geplant. In der Runtime gibt es sie noch nicht.

## Knotenkonten

Ein Knoten kann an ein Konto gebunden werden, seine Identität. Meist ist das der eigene Schlüssel des Geräts. Ein Konto kann die Identität nur eines Knotens sein, daher lässt sich ein Knoten über sein Gerätekonto finden.

- Nur der Scope-Eigentümer kann eine Identität setzen oder entfernen. `Write`-Zugriff reicht nicht.
- Ist die Identität nicht der Aufrufer, muss das Identitätskonto ein Permit signieren. Das Permit ist die SCALE-Kodierung von `(b"robonomics:cps:node-identity:v1", genesis_hash, scope_id, valid_until)`, signiert als rohe Bytes ohne `<Bytes>`-Wrapper.
- Ein Permit gilt höchstens einen Tag (14.400 Blöcke). Es wird nicht verbraucht: Es funktioniert innerhalb seines Scopes, bis es abläuft. Wird der Scope ersetzt, werden alte Permits ungültig.
- Ein neuer Wurzelknoten akzeptiert als Identität nur das eigene Konto des Aufrufers.
- Wird ein Knoten gelöscht, wird seine Identität entfernt.

## Aufrufe

Polkadot.js zeigt diese Namen in camelCase, zum Beispiel `cps.createNode`.

| Aufruf | Argumente | Wer darf aufrufen |
|---|---|---|
| `create_node` | `parent_id` (optional), `meta` (optional), `payload` (optional), `identity` (optional: ein Konto und, falls nötig, ein Permit) | Wurzelknoten: jedes Konto, das damit Scope-Eigentümer wird. Kindknoten: der Eigentümer des Scopes des Elternknotens. |
| `set_meta` | `node_id`, `meta` (`None` entfernt es) | Inhaber von `Write` |
| `set_payload` | `node_id`, `payload` (`None` entfernt es) | Inhaber von `Write` |
| `delete_node` | `node_id` | Scope-Eigentümer. Der Knoten darf keine Kinder haben. Das Löschen einer Scope-Wurzel löscht den Scope und seine Zugriffseinträge. |
| `create_scope` | `node_id` | Inhaber von `CreateScope`. An der Wurzel eines verschachtelten Scopes auch der Eigentümer des umgebenden Scopes. |
| `grant_access` | `node_id`, `principal`, `capability` (`Write` oder `CreateScope`), `mode` (`Node` oder `Subtree`) | Scope-Eigentümer |
| `revoke_access` | `node_id`, `principal`, `capability` | Scope-Eigentümer |
| `set_identity` | `node`, `identity`, `permit` (optional) | Scope-Eigentümer |
| `clear_identity` | `node` | Scope-Eigentümer |

Events: `NodeCreated`, `MetaSet`, `PayloadSet`, `NodeDeleted`, `ScopeCreated`, `ScopeDeleted`, `AccessGranted`, `AccessRevoked`, `IdentitySet`, `IdentityCleared`.

## Den Baum lesen

- Einfache Lesezugriffe sind Storage-Abfragen: `cps.nodes`, `cps.meta`, `cps.payload`, `cps.children`.
- Das Pallet hat außerdem View-Funktionen (sie brauchen Metadaten V16, die die Chain liefert):
  - nach Knotennummer: `resolve_scope`, `has_capability`, `identity_of`, `node_by_identity`;
  - nach Gerätekonto: `parent`, `children`, `meta`, `payload`, `scope_of`, `address_capability`. Sie schlagen mit `MissingProjectedIdentity` fehl, wenn ein Knoten im Ergebnis keine Identität hat.
- In JavaScript heißen die View-Funktionen `api.view.cps.*`. Dafür braucht es eine Version von `@polkadot/api` mit Unterstützung für View-Funktionen. In Rust stecken sie im typisierten Crate `robonomics-runtime-subxt-api`.

## Limits und Gebühren

| Limit | Wert |
|---|---|
| Größe von `meta` | 1.024 Byte |
| Größe von `payload` | 8.192 Byte |
| Scope-Tiefe | 32 Knoten |
| Kinder pro Knoten | 100 |
| Zugriffseinträge pro Scope | 32 |
| Gültigkeit eines Identitäts-Permits | 1 Tag (14.400 Blöcke) |

Das sind Konstanten der Runtime. Sie zu ändern erfordert ein Runtime-Upgrade.

Der Gerätebaum verlangt keine Speicherkaution. Sie zahlen die normale Transaktionsgebühr, die mit der Datenmenge wächst. Zum Beispiel kostet zum Zeitpunkt des Schreibens ein Wurzelknoten mit 100 Byte `meta` und 100 Byte `payload` etwa 0,0003 XRT.

## Werkzeuge

- Das Kommandozeilentool `cps` und die Rust-Bibliothek `libcps` decken den gesamten Gerätebaum ab. Siehe [Client-Bibliotheken](/docs/client-libraries/#cps-command-line-tool).
- Jeder Client, der Extrinsics senden kann, funktioniert ebenfalls, zum Beispiel `@polkadot/api`.
- Für Geräte, die nicht direkt mit der Chain sprechen können, siehe [Geräte verbinden](/docs/connect-devices/).

## Wie es weitergeht

Mit Abonnements (5.0, in Arbeit) soll der Scope-Eigentümer die Transaktionen der Geräte im Baum bezahlen können. So kann ein Sensor schreiben, ohne selbst XRT zu halten. In der Runtime ist das noch nicht enthalten.
