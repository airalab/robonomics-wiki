---
title: Wie man Blueprints verwendet
contributors: [tubleronchik]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

In diesem Artikel erfahren Sie, wie Sie Automatisierungs-Blueprints zu Ihrem Home Assistant hinzufügen und konfigurieren können.

## Blueprint-Automatisierungen

Einige Blueprints sind bereits installiert. Automatisierungen, die auf solchen Blueprints basieren, müssen nur konfiguriert werden. In der Web-Oberfläche finden Sie vorinstallierte Blueprints unter `Settings/Automations & Scenes`. Öffnen Sie `Blueprints` und suchen Sie den gewünschten Blueprint. In diesem Beispiel wird `Motion-activated Light` verwendet. 

<robo-wiki-picture src="home-assistant/blueprint-settings.jpg" alt="Blueprint Settings" />

Klicken Sie auf `Create Automation`, um den Automatisierungseditor zu öffnen. Geben Sie einen Namen ein, wählen Sie einen Blueprint aus (`Motion-activated Light` in unserem Fall). Danach müssen Sie einen Bewegungssensor und eine Lampe auswählen. Wenn die Konfiguration abgeschlossen ist, klicken Sie auf `Save`.

<robo-wiki-picture src="home-assistant/automation-configure.jpg" alt="Automation Konfiguration" />

Wenn Sie Änderungen vornehmen möchten, finden Sie diese unter `Settings/Automations & Scenes` und dann `Automations`.

<robo-wiki-picture src="home-assistant/automations-all.jpg" alt="Automations List" />

## Importieren von Blueprints

Home Assistant kann Blueprints aus den Home Assistant Foren, GitHub und GitHub Gists importieren. Eine Liste aller Blueprints finden Sie unter [Blueprints Exchange](https://community.home-assistant.io/c/blueprints-exchange/53). Nachdem Sie einen Blueprint ausgewählt haben, gehen Sie zu `Settings/Automations & Scenes` und öffnen Sie `Blueprints`. Klicken Sie auf `Import Blueprint` und fügen Sie die URL des ausgewählten Blueprints ein. Klicken Sie dann auf `PREVIEW BLUEPRINT`. In diesem Fall verwenden wir [Erkennung und Benachrichtigung bei niedrigem Batteriestand für alle Batteriesensoren](https://community.home-assistant.io/t/low-battery-level-detection-notification-for-all-battery-sensors/258664). 

<robo-wiki-picture src="home-assistant/importing-blueprint.jpg" alt="Importing Blueprint" /> 

Dadurch wird der Blueprint geladen und eine Vorschau im Importdialog angezeigt. Sie können den Namen ändern und den Import abschließen. Klicken Sie auf `Create Automation`, um den Automatisierungseditor zu öffnen. Hier können Sie die Parameter der Automatisierung konfigurieren und Aktionen hinzufügen, um Benachrichtigungen zu erhalten.

<robo-wiki-picture src="home-assistant/configure-battery-blueprint.jpg" alt="Configure Battery Blueprint" /> 