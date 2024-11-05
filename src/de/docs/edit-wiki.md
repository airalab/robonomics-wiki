---
title: Wie man ein Wiki bearbeitet
contributors: [positivecrash]
description: Wege, wie du uns helfen kannst, unser Wiki zu verbessern
---

**Das Robonomics Wiki ist Open Source. Alle Korrekturen sind willkommen: Fehlerbehebungen, Rechtschreibfehler, unklare oder veraltete Informationen, Übersetzungen in jede Sprache. Du benötigst ein [GitHub](https://github.com/) Konto.**


## Wie man bearbeitet

Wenn du die Dokumentation des Robonomics Wiki bearbeiten möchtest, befolge bitte diese Schritte

Stelle sicher, dass du [Node.js](https://nodejs.org/en/download/package-manager/) installiert hast.

### 1. Repository klonen

Zuerst musst du das Wiki-Repository klonen:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Gehe in das Verzeichnis des Repositories und führe die folgenden Befehle aus:

`mit npm`
```
cd robonomics-wiki
npm install
```

`mit yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Lokal bereitstellen (entwickeln, entwickeln-m1)

`Node-Version muss 20 || >=22 sein`

Deploye dann das Projekt lokal:

```
npm run start
```

> Es kann erforderlich sein, eine .env-Datei mit denselben Variablen wie in der .env.example-Datei zu erstellen

### 3. Pull Request erstellen

[Pull Request erstellen](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) zu [Wiki-Repo](https://github.com/airalab/robonomics-wiki)

## Komponenten

{% roboWikiNote {title:"BENUTZERDEFINIERTE KOMPONENTEN", type: "warning"}%} Ein **Tipp** beim Hinzufügen benutzerdefinierter Komponenten:
Wenn nach dem Hinzufügen einer Komponente etwas mit dem Layout nicht stimmt, sollten Sie Leerzeichen überprüfen. Es sollte helfen, Leerzeichen nach dem Öffnen und Schließen des Tags zu **ENTFERNEN** (wie im folgenden Beispiel){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Code

Sie können hilfreiche Extras zu Ihrem Code hinzufügen:

`Code mit Kopierbutton`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

oder `Code mit zusätzlicher Zeile`

```bash
{% raw %}{% codeHelper { additionalLine: "zusätzliche Zeile"}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Eigenschaften für Code-Helper**

| Eigenschaft         | Typ| Erforderlich | Standard  | Beschreibung                                               |
|------------------|-----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | fügt einen Kopieren-Button für Ihren Code hinzu                           |
| `additionalLine` | `String`  | `false`  | ''       | zusätzliche Zeile für Ihren Code, die über dem Code angezeigt wird |


{% codeHelper { additionalLine: "zusätzliche Zeile", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}


### Frontmatter
Dokumente im Robonomics-Wiki enthalten einen Frontmatter-Block. Er muss oben in der Markdown-Datei stehen und muss in Form von gültigem YAML zwischen drei Bindestrichen stehen. Zwischen den drei Bindestrichen können folgende Optionen festgelegt oder bearbeitet werden:

```YAML
---
title: Wie man beiträgt # Titel für die Seite, den Sie nicht im Text wiederholen müssen
contributors: [positivecrash] # Hauptbeitragende (die diese Seite aktiv kuratieren). GitHub-Benutzername erforderlich, ohne zusätzliche Symbole
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # Werkzeuge, die für Technologie-Tests verwendet wurden
---
```

### Grid
Hilft, Rasterlayout zu Elementen hinzuzufügen:

- Verwenden Sie zuerst das Raster-Wrapper-Komponente:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Verwenden Sie dann beliebig viele Raster-Element-Komponenten innerhalb des Wrappers:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} erstes Element {% endroboWikiGrid %}
	{% roboWikiGrid %} zweites Element {% endroboWikiGrid %}
	{% roboWikiGrid %} drittes Element {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**Eigenschaften für robo-wiki-grid-wrapper**

| Eigenschaft | Typ      | Erforderlich | Standard | Beschreibung                                                            |
|-------------|----------|-------------|----------|------------------------------------------------------------------------|
| `columns`   | `Nummer` | `false`     | 4        | Sie können die Spaltenzahl wählen:   <br/> - von `1 bis 5`             |
| `align`     | `String` | `false`     |          | Elemente auf der Blockachse ausrichten:   <br/> - Optionen: `start, center, end` |
| `justify`   | `String` | `false`     |         | align items on the inline axis:  <br/> - options: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`  | align text inside grid:  <br/> - options: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (mindestens 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-Karte 16 GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee-Adapter (optional) </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee smart devices (optional) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Desktop für die Einrichtung</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Bilder

#### Wie man hochlädt
Laden Sie das Bild in den Ordner `src/assets/docs/images/url-of-your-doc` hoch
* Wenn das Bild lokalisiert werden muss, fügen Sie alle in einem Ordner ein
* Verwenden Sie eine Lokalisierungsergänzung im Namen der Bilder, wenn sie lokalisiert sind, z. B. `image_en.jpg`
* Stellen Sie sicher, dass Ihr Bild für das Web optimiert ist und gleichzeitig gut aussieht

#### Wie man einfügt

Es gibt zwei Möglichkeiten, Bilder in Ihre Dokumente einzufügen:

{% roboWikiNote {type: 'warning'}%} Es wird empfohlen, Bilder mit dem integrierten Tag `<robo-wiki` einzufügen.-Bild>`, Sie können jedoch auch die Standardmethode für Markdown-Dateien verwenden. {% endroboWikiNote %}

`mit Beschriftung`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wiki erkunden", link: '/docs/overview', caption: "ERKUNDEN"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`oder ohne Beschriftung`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wiki erkunden", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`oder einfaches Bild`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wiki erkunden"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`oder einfaches Bild mit Beschriftung`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wiki erkunden", caption: "ERKUNDEN"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Eigenschaften für robo-wiki-bild:**

| Eigenschaft | Typ       | Erforderlich | Standard | Beschreibung                                                                                                                                                                                                         |
|------------|-----------|-------------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | Pfad zum Bild:  <br/> - Wenn Sie Ihr Bild direkt in den Ordner `/src/assets/images/docs/` hochgeladen haben, verwenden Sie: `url-of-your-doc` <br/> - Wenn Sie das Bild in einem der Ordner hochgeladen haben, verwenden Sie: `folder-name/url-of-your-doc` |
| `link`    | `String`  | `false`  |         | Ausrichtungselemente auf der Blockachse:   <br/> - Optionen: `start, center, end`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | Ausrichtungselemente auf der Inline-Achse:  <br/> - Optionen: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | picture | Bietet alternative Informationen für ein Bild, wenn ein Benutzer es aus irgendeinem Grund nicht anzeigen kann                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | Bild vergrößern                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | Es gibt zwei Optionen: lazy und eager                                                                                                                                                                                |

### Hinweise & Warnungen
Sie können Hinweise hinzufügen und ihnen spezifische Typen zuweisen:
* Warnung (<span style="color:#f08432">**mit Bild**</span>)
* Okay (<span style="color:#3eaf7c">**grüne Farbe**</span>)
* Hinweis (<span style="color:#90a4b7">**graue Farbe**</span>)

`Hinweis mit Titel`

```c
{% raw %} {% roboWikiNote {title:"BEISPIELTITEL", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`Hinweis mit Inhalt`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`Hinweis mit Titel und Inhalt`

```c
{% raw %} {% roboWikiNote {title: "TITEL", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Discord beitreten", type: "okay"}%} [Treten Sie dem Robonomics Developers Discord bei](https://discord.gg/jTxqGeF5Qy), um sich mit der Community zu verbinden und technische Unterstützung zu erhalten. {% endroboWikiNote %}

{% roboWikiNote {title: "Discord beitreten"}%} [Treten Sie dem Robonomics Developers Discord bei](https://discord.gg/jTxqGeF5Qy), um sich mit der Community zu verbinden und technische Unterstützung zu erhalten. {% endroboWikiNote %}

{% roboWikiNote {title: "Schließe dich Discord an", type: "warning"}%} [Treten Sie dem Robonomics Developers Discord bei](https://discord.gg/jTxqGeF5Qy), um sich mit der Community zu verbinden und technische Unterstützung zu erhalten. {% endroboWikiNote %}

**Eigenschaften für Robo-Wiki-Notiz**

| Eigenschaft | Typ       | Erforderlich | Standard | Beschreibung                                                 |
|-------------|-----------|--------------|----------|-------------------------------------------------------------|
| `type`      | `String`  | `false`      |          | - insgesamt gibt es drei Typen: `note`, `warning`, `okay`    |
| `title`     | `String`  | `false`      |          | fügt Ihrer Notiz einen Titel hinzu                            |


### Registerkarten
Sie können Registerkarten zum Dokument hinzufügen:

- Verwenden Sie das Registerkarten-Wrapper-Komponent:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Und verwenden Sie dann beliebig viele Registerkartenkomponenten innerhalb des Wrappers:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}{% endraw %}
```

<br/>

`horizontale Registerkarten`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`vertikale Registerkarten`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`Registerkarten-Element mit Rand`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Eigenschaften für Robo-Wiki-Tabs (Wrapper)**

| Eigenschaft | Typ      | Erforderlich | Standard    | Beschreibung                                                      |
|-------------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - Array mit Titeln für jede Registerkarte                                  |
| `mode`   | `String` | `false`  | horizontal | Sie können den Registerkartenmodus auswählen: <br/> - `horizontal` <br/> - `vertikal` |

**Eigenschaften für robo-wiki-tab (Element)**

| Eigenschaft | Typ      | Erforderlich | Standard | Beschreibung                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - fügt dem Inhaltscontainer einen Rahmen hinzu |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Titel mit Anker
Sie können benutzerdefinierte Titel mit Anker erstellen und ihnen einen bestimmten Wert zuweisen`Titel mit Anker`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

oder `Titel ohne Anker`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (benutzerdefinierter Titel) {% endroboWikiTitle %}

<br/>

**Eigenschaften für Robo-Wiki-Titel**

| Eigenschaft | Typ                     | Erforderlich | Standard | Beschreibung          |
|-------------|-------------------------|--------------|----------|-----------------------|
| `type`      | `Nummer (von 2 bis 6)`  | `true`       |          | wähle Überschriftsebene |
| `anchor`    | `Zeichenkette`          | `false`      |          | Wert für den Anker |

### Videos

Es gibt zwei Möglichkeiten, Videos in Ihre Dokumente einzufügen:

{% roboWikiNote {type: "warning"}%} Es wird empfohlen, Videos mit dem integrierten Tag `<robo-wiki-video>` einzufügen, Sie können jedoch auch den Standardweg für Markdown-Dateien verwenden. {% endroboWikiNote %}

#### IPFS / Server
Sie müssen das Format des Videos angeben

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"Über Gateways"}%} Das Gateway für den Link wird automatisch aus der Konfigurationsdatei ausgewählt - `src/_data/video_config.js`. Sie können einige Gateways hinzufügen oder entfernen, indem Sie die Datei ändern. {% endroboWikiNote %}


#### Lokal

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Eigenschaften

- Wenn Sie eine Datei mit einer Größe von mehr als <span style="color:#af1c1c">10MB</span> hinzufügen, laden Sie sie bitte auf den Server hoch, nicht im Repository.

- Sie können beliebige Eigenschaften für das [HTML5-Video-Tag](https://www.w3schools.com/tags/tag_video.asp) verwenden.

- Akzeptable Formate - mp4, webm, ogg.

| Eigenschaft | Typ | Erforderlich | Standard | Beschreibung |
|---|---|---|---|---|
| `videos` |`Array` | `true` |  | Array von Objekten [{src: `Pfad zum Video`, Typ: `Videotyp`}] |


#### YouTube
Sie können jedes YouTube-Video in der Dokumentation einbetten, indem Sie den Freigabelink als separaten Absatz ohne zusätzliche Anführungszeichen oder Tags einfügen, z. B.: `https://youtu.be/kQaSwNYHJQ8`

Wenn Sie jedoch ein Autoplay benötigen, müssen Sie ein spezielles Komponent verwenden:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**Eigenschaften für robo-wiki-youtube**

| Eigenschaft | Typ | Erforderlich | Standard | Beschreibung |
|---|---|---|---|---|
| `link` | `String` | `true` |  | Link zum YouTube-Video |
| `autoplay` | `Boolean` | `false` | `false` | Autoplay des YouTube-Videos |
| `loop` | `Boolean` | `false` | `false` | Schleifen des YouTube-Videos |


## Bearbeiten der Seitenleistennavigation

Wenn Sie die Seitenleistennavigation des Robonomics-Wikis bearbeiten müssen, befolgen Sie bitte diese Schritte:

* Bearbeiten Sie die Datei `src/_data/sidebar_docs.json`.

* Entscheiden Sie, wo Sie Ihr Dokument platzieren möchten.

* Verwenden Sie gültiges JSON für `src/_data/sidebar_docs.json` und verlassen Sie sich auf diebestehende Dateistruktur

* Sie müssen neue Zeilen zur Übersetzungsdatei `translations/pages/en.json` hinzufügen, wenn Sie zuvor keinen neuen Inhalt übersetzt haben, z. B.:

```json
{"Launch Robot from Cloud": "Launch Robot from Cloud"}
```

</br>

* **WICHTIGER HINWEIS:** Wenn Sie dasselbe Dokument in verschiedenen Abschnitten/Unterabschnitten verwenden, z. B.:

```

{
	"title": "Upgrade Home Assistant OS",
	"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
	}],
	"title": "Upgrade Home Assistant Docker for Unix-like OS",
		"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
	}],
}

```

STELLEN SIE SICHER, DASS DER `topic` PARAMETER WIE FOLGT HINZUGEFÜGT WIRD:

(damit die Navigation ordnungsgemäß funktioniert)

```
{
	"title": "Upgrade Home Assistant OS",
	"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
		"topic": "Upgrade Home Assistant OS"
	}],
	"title": "Upgrade Home Assistant Docker for Unix-like OS",
		"children": [
	{
		"title": "Subscription Activate",
		"url": "/docs/sub-activate",
		"topic": "Upgrade Home Assistant Docker for Unix-like OS"
	}],
}

```

## So fügen Sie eine benutzerdefinierte Navigation für Dokumente hinzu

* Bearbeiten Sie die Datei`src/_data/sidebar_docs.json`.

* Finde das richtige Dokument und füge die Parameter `prev` und `next` wie folgt hinzu:

```
	{
		"title": "Übersicht",
		"url": "/docs/robonomics-smart-home-übersicht",
		"next": [
			{
				"title": "Benutzer hinzufügen",
				"url": "/docs/benutzer-hinzufügen"
			}
		],
		"prev": [
			{
				"title": "Benutzer hinzufügen",
				"url": "/docs/benutzer-hinzufügen"
			}
		],
	},

```

* Wenn du die Navigation vollständig entfernen möchtest, füge den Parameter `withoutNav` hinzu:

```
{
	"title": "Übersicht",
	"url": "/docs/robonomics-smart-home-übersicht",
	"withoutNav": true
},
```

* Wenn du nur die Navigation für die `vorherige Seite` oder `nächste Seite` entfernen möchtest, füge den Parameter `withoutPrev` oder `withoutNext` hinzu:

```
{
	"title": "Übersicht",
	"url": "/docs/robonomics-smart-home-übersicht",
	"withoutPrev": true
},
```

oder

```
{
	"title": "Übersicht",
	"url": "/docs/robonomics-smart-home-übersicht",
	"withoutNext": true
},
```


## Wie man ein Dokument übersetzt

{% roboWikiNote {title: 'Wichtig', type: 'warning'}%} Du musst **.env**-Datei und fügen Sie die *OPENAI_KEY*-Variable mit Ihrem Schlüssel hinzu {% endroboWikiNote %}

Wenn Sie Ihr md-Dokument übersetzen möchten, müssen Sie den Befehl ausführen:

```bash
npm run translate-md
```

{% roboWikiNote {title: 'Einfach übersetzen', type: 'warning'}%} Um alles auf einmal zu übersetzen, jede neue Zeile in Seiten, neues Dokument oder geändertes Dokument müssen Sie jetzt nur noch einen Befehl ausführen {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> Stellen Sie außerdem sicher, dass Sie nur die geänderten Dateien übersetzen, die **übersetzt werden müssen**. Zum Beispiel müssen Sie 5 Dateien ändern. Drei davon enthalten Textänderungen und das Entfernen einiger veralteter Informationen. Und die anderen beiden müssen Links für einige Bilder aktualisieren oder einfach einen externen Link ändern. In diesem Fall wäre es ratsam, die ersten drei Dateien zu ändern und zu übersetzen und erst dann die Links in den anderen beiden zu ändern.

> Die Übersetzung erfolgt für alle geänderten Dateien, aber sie ist nicht unbedingt erforderlich für die aktualisierten Links, insbesondere wenn die Datei groß ist und die Übersetzung daher einige Zeit in Anspruch nimmt.

Nach Ausführung des erforderlichen Befehls müssen Sie nur noch warten und möglicherweise die Dateien überprüfen (KI-Übersetzungen weisen einige Mängel auf). Um Dateien zu überprüfen, führen Sie `npm run build` aus und prüfen Sie, ob Fehler vorliegen.

### Übersetzungsprobleme

Es kann zu Problemen bei Übersetzungen kommen.

1. Versuchen Sie, den Befehl erneut auszuführen und prüfen, ob er funktioniert hat.

2. Manchmal können Tagsin md-Dateien können Fehler auftreten, zum Beispiel:

```
{%raw %}
	[11ty] 1. Schwierigkeiten beim Rendern der njk-Vorlage ./src/de/docs/edit-wiki.md (über TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Zeile 168, Spalte 96]
	[11ty]   unbekannter Block-Tag: endroboWiki (über Template-Renderfehler)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture %}
{% endraw %}
```

Dann müssen Sie nur noch das Tag korrigieren.