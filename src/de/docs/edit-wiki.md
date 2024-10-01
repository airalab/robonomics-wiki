---
title: Wie man ein Wiki bearbeitet
contributors: [positivecrash]
description: Wege, wie du uns helfen kannst, unser Wiki zu verbessern
---

**Das Robonomics Wiki ist Open Source. Alle Korrekturen sind willkommen: Fehlerbehebungen, Rechtschreibfehler, unklare oder veraltete Informationen, Übersetzungen in jede Sprache. Du benötigst ein [GitHub](https://github.com/)-Konto.**


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

`Node muss v20 || >=22 sein`

Deploye dann das Projekt lokal:

```
npm run start
```

### 3. Pull Request erstellen

[Pull Request erstellen](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)zu [Wiki-Repo](https://github.com/airalab/robonomics-wiki)

## Komponenten

{% roboWikiNote {title:"BENUTZERDEFINIERTE KOMPONENTEN", type: "warning"}%} Ein **Tipp** beim Hinzufügen benutzerdefinierter Komponenten:
Wenn nach dem Hinzufügen einer Komponente etwas mit dem Layout nicht stimmt, sollten Sie die Leerzeichen überprüfen. Es sollte helfen, Leerzeichen nach dem Öffnen und Schließen des Tags zu **ENTFERNEN** (wie im folgenden Beispiel){% endroboWikiNote %}


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

| Eigenschaft       | Typ        | Erforderlich | Standard   | Beschreibung                                               |
|-------------------|------------|--------------|------------|------------------------------------------------------------|
| `copy`            | `Boolean`  | `false`      | `false`    | fügt einen Kopierbutton für Ihren Code hinzu               |
| `additionalLine`  | `String`   | `false`      | ''         | zusätzliche Zeile für Ihren Code, die über dem Code angezeigt wird |


{% codeHelper { additionalLine: "zusätzliche Zeile", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}


### Frontmatter
Dokumente im Robonomics-Wiki enthalten einen Frontmatter-Block. Er muss oben in der Markdown-Datei stehen und muss in Form von gültigem YAML zwischen drei Bindestrichen stehen. Zwischen den drei Bindestrichen können Sie folgende Optionen festlegen oder bearbeiten:

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
    # Tools, die für Technologie-Tests verwendet wurden
---
```

### Grid
Hilft dabei, ein Rasterlayout für Elemente hinzuzufügen:

- Verwenden Sie zuerst das Raster-Wrapper-Komponente:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Und verwenden Sie dann so viele Raster-Element-Komponenten wie gewünscht innerhalb des Wrappers:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} erstes Element {% endroboWikiGrid %}
	{% ro...```de
{% roboWikiGridWrapper %} zweites Element {% endroboWikiGrid %}
	{% roboWikiGrid %} drittes Element {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**Eigenschaften für robo-wiki-grid-wrapper**

| Eigenschaft | Typ      | Erforderlich | Standard | Beschreibung                                                            |
|-------------|----------|--------------|----------|------------------------------------------------------------------------|
| `columns`   | `Nummer` | `false`      | 4        | Sie können die Spaltenanzahl wählen:   <br/> - von `1 bis 5`           |
| `align`     | `String` | `false`      |          | Elemente auf der Blockachse ausrichten:   <br/> - Optionen: `start, center, end` |
| `justify`   | `String` | `false`      |          | Elemente auf der Inline-Achse ausrichten:  <br/> - Optionen: `start, center, end` |
| `textAlign` | `String` | `false`      | `left`   | Text innerhalb des Rasters ausrichten:  <br/> - Optionen: `left, center, right` |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (mindestens 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>SD-Karte 16 GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Zigbee-Adapter (optional) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Zigbee-Smart-Geräte (optional) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Desktop für die Einrichtung</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Bilder

#### Wie man hochlädt
Laden Sie das Bild in den Ordner `src/assets/docs/images/url-of-your-doc` hoch
* Wenn das Bild lokalisiert werden muss, fügen Sie alle in einem Ordner ein
* Verwenden Sie den Ländercode im Namen der Bilder, wenn es lokalisiert ist, z.B. `image_en.jpg`
* Stellen Sie sicher, dass Ihr Bild für das Web optimiert ist und gleichzeitig gut aussieht

#### Wie man einfügt

Es gibt zwei Möglichkeiten, Bilder in Ihre Dokumente einzufügen:

{% roboWikiNote {type: 'warning'}%} Es wird empfohlen, Bilder mit dem integrierten Tag `<robo-wiki-picture>` einzufügen, Sie können jedoch auch den Standardweg für Markdown-Dateien verwenden. {% endroboWikiNote %}

`mit Beschriftung`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wiki erkunden", link: '/docs/overview', caption: "ERKUNDEN"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`oder ohne Beschriftung`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wiki erkunden",link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`oder einfaches Bild`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wiki erkunden"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`oder einfaches Bild mit Untertitel`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"robomomics wiki erkunden", caption: "ERKUNDEN"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Eigenschaften für Robo-Wiki-Bild:**

| Eigenschaft | Typ       | Erforderlich | Standard | Beschreibung                                                                                                                                                                                                         |
|-------------|-----------|--------------|----------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`       | `String`  | `true`       |          | Pfad zum Bild:  <br/> - Wenn Sie Ihr Bild direkt in den Ordner `/src/assets/images/docs/` hochgeladen haben, verwenden Sie: `url-of-your-doc` <br/> - Wenn Sie das Bild in einem der Ordner hochgeladen haben, verwenden Sie: `Ordnername/url-of-your-doc` |
| `link`      | `String`  | `false`      |          | Elemente auf der Blockachse ausrichten:   <br/> - Optionen: `start, center, end`                                                                                                                                      |`Beschriftung` | `String`  | `false`  |         | Elemente auf der Inline-Achse ausrichten:  <br/> - Optionen: `start, center, end`                                                                                                                                               |
| `alt`     | `String`  | `true`   | Bild | Bietet alternative Informationen für ein Bild, falls ein Benutzer es aus irgendeinem Grund nicht anzeigen kann                                                                                                                               |
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

`Notiz mit Titel und Inhalt`

```c
{% raw %} {% roboWikiNote {title: "TITEL", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw %}
```

<br/>

{% roboWikiNote {title: "Discord beitreten", type: "okay"}%} [Treten Sie dem Robonomics Developers Discord bei](https://discord.gg/jTxqGeF5Qy), um sich mit der Community zu verbinden und technische Unterstützung zu erhalten. {% endroboWikiNote %}

{% roboWikiNote {title: "Discord beitreten"}%} [Treten Sie dem Robonomics Developers Discord bei](https://discord.gg/jTxqGeF5Qy), um sich mit der Community zu verbinden und technische Unterstützung zu erhalten. {% endroboWikiNote %}

{% roboWikiNote {title: "Discord beitreten", type: "warning"}%} [Treten Sie dem Robonomics Developers Discord bei](https://discord.gg/jTxqGeF5Qy), um sich mit der Community zu verbinden und technische Unterstützung zu erhalten. {% endroboWikiNote %}

**Eigenschaften für Robo-Wiki-Notiz**

| Eigenschaft | Typ       | Erforderlich | Standard | Beschreibung                                                 |
|-------------|-----------|--------------|----------|-------------------------------------------------------------|
| `type`      | `String`  | `false`      |          | - Es gibt insgesamt drei Typen: `note`, `warning`, `okay`    |
| `title`     | `String`` | `false`  |         | fügt dem Hinweis einen Titel hinzu                                     |


### Registerkarten
Sie können Registerkarten zum Dokument hinzufügen:

- Verwenden Sie das Registerkarten-Umschlagkomponente:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Und verwenden Sie dann so viele Registerkartenkomponenten wie gewünscht innerhalb des Umschlags:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`Horizontale Registerkarten`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`Vertikale Registerkarten`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],Sprachumfang: 'vertikal'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endroh %}
```

<br/>

`Tab-Element mit Rahmen`

```c
{% roh %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endroh %}
```

<br/>

**Eigenschaften für Robo-Wiki-Tabs (Wrapper)**

| Eigenschaft | Typ       | Erforderlich | Standardwert | Beschreibung                                                      |
|-------------|-----------|--------------|--------------|-------------------------------------------------------------------|
| `tabs`      | `Array`   | `true`       |              | - Array mit Titeln für jede Registerkarte                        |
| `mode`      | `String`  | `false`      | horizontal   | Sie können den Registerkartenmodus wählen: <br/> - `horizontal` <br/> - `vertikal` |

**Eigenschaften für Robo-Wiki-Tab (Element)**

| Eigenschaft | Typ        | Erforderlich | Standardwert | Beschreibung                         |
|-------------|------------|--------------|--------------|-------------------------------------|
| `border`    | `Boolean`  | `false`      | `false`      |false` | - Füge einen Rahmen um den Inhaltsbereich hinzu |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Titel mit Anker
Sie können benutzerdefinierte Titel mit Anker erstellen und ihnen einen bestimmten Wert zuweisen

`Titel mit Anker`

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
| `anchor`    | `Zeichenkette`          | `false`      |          | Wert für das Ankerzeichen |

### Videos

Es gibt zwei Möglichkeiten, Videos in Ihre Dokumente einzufügen:

{% roboWikiNote {type: "warning"}%} Es wird empfohlen, Videos mit dem integrierten Tag `<robo-wiki-video>` einzufügen, jedoch können Sie auch den Standardweg für Markdown-Dateien verwenden. {% endroboWikiNote %}

#### IPFS / Server
Sie müssen das Format des Videos angeben

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"Über Gateways"}%} Das Gateway für den Link wird automatisch aus der Konfigurationsdatei ausgewählt - `src/_data/video_config.js`. Sie können einige Gateways hinzufügen oder entfernen, indem Sie dieDatei. {% endroboWikiNote %}


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
| `videos` | `Array` | `true` |  | Array von Objekten [{src: `Pfad zum Video`, type: `Videotyp`}] |


#### YouTube
Sie können jedes YouTube-Video im Dokument einbetten, indem Sie den Freigabelink als separaten Absatz ohne zusätzliche Anführungszeichen oder Tags einfügen, z. B.: `https://youtu.be/kQaSwNYHJQ8`

Wenn Sie jedoch ein Autoplay benötigen, müssen Sie ein spezielles Komponent verwenden:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%endroboWikiYoutube %}{% endraw %}
```

**Eigenschaften für robo-wiki-youtube**

| Eigenschaft | Typ | Erforderlich | Standard | Beschreibung |
|---|---|---|---|---|
| `link` | `String` | `true` |  | Link zum YouTube-Video |
| `autoplay` | `Boolean` | `false` | `false` | Autoplay des YouTube-Videos |
| `loop` | `Boolean` | `false` | `false` | Schleife des YouTube-Videos |


## Wie man die Seitenleistennavigation bearbeitet

Wenn Sie die Seitenleistennavigation des Robonomics Wiki bearbeiten müssen, befolgen Sie bitte diese Schritte:

* Bearbeiten Sie die Datei `src/_data/sidebar_docs.json`.

* Entscheiden Sie, wo Sie Ihr Dokument platzieren möchten.

* Verwenden Sie gültiges JSON für `src/_data/sidebar_docs.json` und verlassen Sie sich auf die vorhandene Dateistruktur.

* **WICHTIGER HINWEIS:** Wenn Sie dasselbe Dokument in verschiedenen Abschnitten/Unterabschnitten verwenden, z.B.:

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

STELLEN SIE SICHER, DASS SIE DEN `topic`-PARAMETER WIE FOLGT HINZUFÜGEN:

(damit die Navigation ordnungsgemäß funktioniert)```
{
	"title": "Upgrade Home Assistant OS",
	"children": [
	{
		"title": "Aktivierung des Abonnements",
		"url": "/docs/sub-activate",
		"topic": "Upgrade Home Assistant OS"
	}],
	"title": "Upgrade Home Assistant Docker für Unix-ähnliche Betriebssysteme",
		"children": [
	{
		"title": "Aktivierung des Abonnements",
		"url": "/docs/sub-activate",
		"topic": "Upgrade Home Assistant Docker für Unix-ähnliche Betriebssysteme"
	}],
}

```

## Wie man eine benutzerdefinierte Navigation für Dokumente hinzufügt

* Bearbeiten Sie die Datei `src/_data/sidebar_docs.json`.

* Finden Sie das richtige Dokument und fügen Sie die Parameter `prev` und `next` wie folgt hinzu:

```
	{
		"title": "Übersicht",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Benutzer hinzufügen",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Benutzer hinzufügen",
				"url": "/docs/add-user"
			}
		],
	},

```

* Wenn Sie die Navigation vollständig entfernen möchten, fügen Sie den Parameter `withoutNav` hinzu:

```
{
	"title": "Übersicht",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Wenn Sie die Navigation entfernen möchtenNur `vorherige Seite` oder `nächste Seite` Navigation hinzufügen und dann den Parameter `withoutPrev` oder `withoutNext` hinzufügen:

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

{% roboWikiNote {title: 'Wichtig', type: 'warning'}%} Sie müssen die Datei **.env** erstellen und die Variable *OPENAI_KEY* mit Ihrem Schlüssel hinzufügen {% endroboWikiNote %}

Wenn Sie Ihr md-Dokument übersetzen möchten, müssen Sie den Befehl ausführen: 
 
```bash
npm run translate-md
```

Nach Ausführung des Befehls müssen Sie nur noch warten und vielleicht die Dateien überprüfen (KI-Übersetzungen haben einige Mängel).

### Übersetzungsprobleme

Es kann zu Problemen mit Übersetzungen kommen.

1. Versuchen Sie, den Befehl erneut auszuführen und prüfen, ob er funktioniert hat.

2. Manchmal können Tags in md-Dateien falsch geschrieben sein, zum Beispiel: 

```
{%raw %}
	[11ty] 1. Having trouble rendering njk template ./src/de/docs/edit-wiki.md (via TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Line 168, Column 96]
	[11ty]   unknown block tag: endroboWiki (via Template render error)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

Dann müssen Sie nur noch das Tag korrigieren.