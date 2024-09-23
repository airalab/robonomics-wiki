---
title: Wie man Blaupausen verwendet
contributors: [tubleronchik]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In diesem Artikel erfahren Sie, wie Sie Automatisierungs-Blauausen zu Ihrem Home Assistant hinzufügen und konfigurieren.

## Blaupausen-Automatisierungen

Einige Blaupausen sind bereits installiert. Automatisierungen, die auf solchen Blaupausen basieren, müssen nur konfiguriert werden. Im Webinterface finden Sie vorinstallierte Blaupausen unter `Einstellungen/Automatisierungen & Szenen`. Öffnen Sie `Blaupausen` und suchen Sie die Blaupause, die Sie verwenden möchten. In diesem Beispiel wird `Bewegungsaktiviertes Licht` verwendet.

{% roboWikiPicture {src:"docs/home-assistant/blueprint-settings.jpg", alt:"Blaupausen-Einstellungen"} %}{% endroboWikiPicture %}

Klicken Sie auf `Automatisierung erstellen`, um den Automatisierungseditor zu öffnen. Geben Sie einen Namen ein, wählen Sie eine Blaupause aus (`Bewegungsaktiviertes Licht` in unserem Fall). Danach müssen Sie Bewegungssensor und Lampe auswählen. Wenn die Konfiguration abgeschlossen ist, klicken Sie auf `Speichern`.

{% roboWikiPicture {src:"docs/home-assistant/automation-configure.jpg", alt:"Automatisierungskonfiguration"} %}{% endroboWikiPicture %}

Wenn Sie Änderungen vornehmen möchten, finden Sie diese, indem Sie zu `Einstellungen/Automatisierungen & Szenen` und dann `Automatisierungen` gehen.

{% roboWikiPicture {src:"docs/home-assistant/automations-all.jpg", alt:"Automatisierungsliste"} %}{% endroboWikiPicture %}

## Importieren von Blaupausen

Home Assistant kann Blaupausen aus den Home Assistant-Foren, GitHub und GitHub-Gists importieren. Die Liste aller Blaupausen finden Sie auf [Blaupausen-Austausch](https://community.home-assistant.io/c/blueprints-exchange/53). Nachdem Sie sich entschieden haben, gehen Sie zu `Einstellungen/Automatisierungen & Szenen` und öffnen Sie `Blaupausen`. Klicken Sie auf `Blaupause importieren` und fügen Sie die URL der ausgewählten Blaupause ein. Klicken Sie dann auf `BLAUPAUSE VORSCHAU`. In diesem Fall verwenden wir [Niedrige Batteriestandserkennung & Benachrichtigung für alle Batteriesensoren](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664).

{% roboWikiPicture {src:"docs/home-assistant/importing-blueprint.jpg", alt:"Blaupause importieren"} %}{% endroboWikiPicture %}

Dies lädt die Blaupause und zeigt eine Vorschau im Importdialog an. Sie können den Namen ändern und den Import abschließen. Klicken Sie auf `Automatisierung erstellen`, um den Automatisierungseditor zu öffnen. Hier können Sie die Parameter der Automatisierung konfigurieren und Aktionen hinzufügen, um Benachrichtigungen zu erhalten.

{% roboWikiPicture {src:"docs/home-assistant/configure-battery-blueprint.jpg", alt:"Batterie-Blaupause konfigurieren"} %}{% endroboWikiPicture %}