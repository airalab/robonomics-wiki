---
title: Virtuelle Geräte

contributors: [nakata5321]
---

**Dieser Artikel zeigt Ihnen, wie Sie virtuelle Geräte in einem Smart Home erstellen können, damit Sie sehen können, wie die tatsächliche Plattform aussieht.**

## Integration installieren

Um virtuelle Geräte zu verwenden, müssen Sie die ["Demo"-Integration](https://www.home-assistant.io/integrations/demo/) installieren.
Dazu müssen Sie Ihre Konfigurationsdatei bearbeiten.

Gehen Sie zum Konfigurationsordner, den Sie während des Konfigurationsprozesses angegeben haben. In diesem Ordner finden Sie einen Ordner
mit dem Namen "homeassistant". Gehen Sie hinein. Öffnen Sie die Datei `configuration.yaml` mit einem Texteditor unter dem **root**-Benutzer und fügen Sie die folgende Zeile ein:

{% codeHelper { copy: true}%}

```
...
# Beispielkonfiguration.yaml Eintrag
demo:
...
```

{% endcodeHelper %}


Danach starten Sie Home Assistant über die Webschnittstelle neu. Wenn das Smart Home neu startet, finden Sie alle virtuellen Geräte unter den "Demo"-Entitäten.
Finden Sie sie unter `Einstellungen -> Geräte & Dienste -> Demo`. Alle diese Entitäten können Ihrem Dashboard hinzugefügt werden.

{% roboWikiPicture {src:"docs/home-assistant/demo-entities.png", alt:"demo-entities"} %}{% endroboWikiPicture %}