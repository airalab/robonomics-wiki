---
title: Mitwirken
contributors: [positivecrash, ensrationis]
---

Robonomics ist ein Open-Source-Projekt, und wir wollen es jedem leicht machen, beizutragen. Sie können ein Problem melden, eine Änderung vorschlagen, den Code oder diese Dokumentation verbessern. Eröffnen Sie ein Issue oder einen Pull Request in dem Repository, zu dem die Änderung gehört.

## Wichtige Repositorys

- [airalab/robonomics](https://github.com/airalab/robonomics): die Runtime und ihre Pallets. Es hat eigene CONTRIBUTING.md und SECURITY.md.
- [airalab/robins](https://github.com/airalab/robins): Werkzeuge, darunter das Kommandozeilentool `cps` und Gateways für Geräte.
- [airalab/robonomics-interface](https://github.com/airalab/robonomics-interface): die Python-Bibliothek.
- [airalab/robonomics.app](https://github.com/airalab/robonomics.app): die Web-App unter [robonomics.app](https://robonomics.app).
- [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki): dieses Wiki.
- [airalab/robonomics.network](https://github.com/airalab/robonomics.network): die Hauptwebsite.
- [airalab/robonomics.academy](https://github.com/airalab/robonomics.academy): die Website der Robonomics Academy.

## Probleme melden

1. Wählen Sie das Repository, zu dem das Problem gehört.
2. Bei einem Fehler prüfen Sie, ob er nicht schon gemeldet wurde.
3. Geben Sie einen klaren Titel und eine Beschreibung mit möglichst vielen relevanten Informationen an.
4. Für dieses Wiki nutzen Sie die Issue-Vorlage und nennen die Seite, die korrigiert werden muss.

Melden Sie Sicherheitslücken nicht in öffentlichen Issues. Folgen Sie der SECURITY.md in [airalab/robonomics](https://github.com/airalab/robonomics): Dort wird vertraulich über GitHub Security Advisories gemeldet.

## Änderungen am Netzwerk vorschlagen

Über Änderungen an der Runtime und ihren Parametern entscheiden die XRT-Inhaber. Beschreiben Sie die Idee zuerst in einem Issue auf [airalab/robonomics](https://github.com/airalab/robonomics/issues) und bringen Sie sie dann in ein Referendum. Siehe [XRT und Governance](/docs/xrt-and-governance/#how-to-propose-a-change).

## Pull Requests

1. Für kleine Korrekturen wie Tippfehler ist ein Pull Request besser als ein Issue.
2. Beschreiben Sie im Pull Request das Problem und die Lösung. Verlinken Sie das zugehörige Issue, falls es eins gibt.
3. Senden Sie keine Pull Requests, die nur Leerzeichen oder Formatierung korrigieren.
4. Halten Sie sich an Stil, Sprache und Aufbau des umgebenden Textes.

## Dieses Wiki bearbeiten

Das Wiki wird mit Eleventy gebaut. Sie brauchen Node.js 20 oder 22 und neuer.

1. Klonen Sie [airalab/robonomics-wiki](https://github.com/airalab/robonomics-wiki) und führen Sie dann `npm install` und `npm run start` aus, um es lokal zu starten.
2. Seiten sind Markdown-Dateien in `src/docs/`. Jede beginnt mit Frontmatter: `title`, `contributors` (GitHub-Benutzernamen) und optional `tools`.
3. Die Seitenleiste steht in `src/_data/sidebar_docs.json`. Wenn Sie einen Eintrag hinzufügen, tragen Sie seinen Titel auch in `translations/pages/en.json` ein.

Das [README](https://github.com/airalab/robonomics-wiki#readme) erklärt die Seitenkomponenten und den Ablauf der Übersetzung.
