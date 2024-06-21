---
title: So bearbeiten Sie ein Wiki
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics Wiki ist Open Source. Korrekturen sind willkommen: Fehler beheben, Tippfehler, einige unklare oder veraltete Informationen, Übersetzung in jede Sprache. Du wirst ein [GitHub](https://github.com/) Konto brauchen.**


## Wie man bearbeitet

Wenn du Dokumente des Robonomics Wiki bearbeiten möchtest, folge bitte diesen Schritten

Stell sicher dass du hast [Node.js](https://nodejs.org/en/download/package-manager/) und [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool) installiert.

### 1. Repository klonen

Zuerst musst du das Wiki-Repository klonen:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Gehe zum Verzeichnis des Repositories und führe die folgenden Befehle aus:

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

Dann das Projekt lokal bereitstellen: 

```
gridsome develop
```

> Wenn du den Fehler `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS` hast, führe den folgenden Befehl aus:
```
gridsome develop-m1
```

### 3. Pull Request erstellen

[Pull Request erstellen](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) für [Wiki-Repo](https://github.com/airalab/robonomics-wiki)

## Komponenten

### Asciinema
Das Robonomics Wiki unterstützt Asciinema. Um Asciinema einzufügen, folge bitte diesen Anweisungen:
* Importiere die Komponente nach dem Frontmatter-Block `import Asciinema from '~/components/Asciinema.vue'`
* Füge sie als separaten Absatz ein `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, wobei vid die ID des spezifischen Asciicasts ist

> Du kannst das Widget-Skript für einen bestimmten Asciicast erhalten, indem du auf den Link "Einbetten" auf der Asciicast-Seite klickst.
> Es sieht so aus:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Asciinema-Dokumentation](https://asciinema.org/docs/embedding)

Im obigen Beispiel ist vid 14.

### Code

Sie können Ihrem Code hilfreiche Extras hinzufügen: 

`Code mit Kopierbutton`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

oder `Code mit zusätzlicher Zeile`.

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**Eigenschaften für Code-Helfer**

<probs-table :items="[{ id: 0, items: [{ name: 'copy', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add a copy button for your code'}]}, { id: 1, items: [{ name: 'additional line', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `additional line for you code that will be displayed above`}]}]" />

<code-helper copy>

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>

<code-helper copy additionalLine="your@helper">

```bash
$ ls -l /dev/serial/by-id
```

</code-helper>


### Frontmatter
Die Dokumentation im Robonomics Wiki enthält einen Frontmatter-Block. Er muss oben in der Markdown-Datei stehen und die Form eines gültigen YAML zwischen drei Bindestrichen haben. Zwischen den drei Bindestrichen kannst du folgende Optionen festlegen oder bearbeiten:

```YAML
---
title: How to contribute # Titel für die Seite, du musst ihn nicht im Text duplizieren
contributors: [positivecrash] # Hauptbeiträger (die diese Seite aktiv betreuen). GitHub-Benutzername erforderlich, ohne zusätzliche Symbole
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installierenierenation
    # Verwendete Tools für Technologie-Tests
---
```

### Grid 
Hilft, ein Rasterlayout für Elemente hinzuzufügen:

- Verwende zuerst die Raster-Wrapper-Komponente: 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- Und dann verwende so viele Raster-Element-Komponenten wie du möchtest innerhalb des Wrappers:

```c
  <robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_5.png" />
      <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
    </robo-wiki-grid-element>
    <robo-wiki-grid-element>
      <robo-wiki-picture src="home-assistant/need_6.png" /> 
      <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
      <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
    </robo-wiki-grid-element/>
  </robo-wiki-grid-element-wrapper>
```

**Eigenschaften für robo-wiki-grid-element-wrapper**

<probs-table :items="[{ id: 0, items: [{ name: 'columns', code: true}, {name: 'Number', code: true}, {name: false, code: true}, {name: 4, code: true}, {name: [{text: 'you can choose column number:'}, {text: `from`, codeText: ' 1 to 5'}]}]}, { id: 1, items: [{ name: 'align', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the block axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 2, items: [{ name: 'justify', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: [{text: 'align items on the inline axis:'}, {text: `options:`, codeText: 'start, center, end'}]}]}, { id: 3, items: [{ name: 'textAlign', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'left', code: true}, {name: [{text: 'align text inside grid'}, {text: `options:`, codeText: 'left, center, right'}]}]}, ]" />


<robo-wiki-grid-element-wrapper textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_1.png" /> 
    <p><a href="https://www.home-assistant.io/">Home Assistant</a> as control system software</p> 
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_2.png" /> 
    <p>Raspberry Pi 4 (at least 2 GB RAM)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_3.png" /> 
    <p>SD card (minimum 16 GB)</p>  
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_4.png" /> 
    <p>SD adapter</p>
  </robo-wiki-grid-element>
</robo-wiki-grid-element-wrapper>

<robo-wiki-grid-element-wrapper :columns="2" textAlign="center">
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_5.png" />
    <p>Zigbee smart devices (any from <a href="https://slsys.io/action/supported_devices.html">supported devices</a>)</p>
  </robo-wiki-grid-element>
  <robo-wiki-grid-element>
    <robo-wiki-picture src="home-assistant/need_6.png" /> 
    <p>Zigbee adapter <a href="https://jethome.ru/z2/">JetHome USB JetStick Z2</a> (or one of <a href="https://www.zigbee2mqtt.io/information/supported_adapters.html">supported</a>) or 
    <a href="https://easyeda.com/ludovich88/robonomics_sls_gateway_v01">Robonomics SLS Gateway</a></p>
  </robo-wiki-grid-element/>
</robo-wiki-grid-element-wrapper>


### Bilder

#### Wie man hochlädt 
Lade das Bild in den Ordner `/docs/images/url-deines-dokuments` hoch
* Wenn das Bild lokalisiert werden muss, füge sie alle in einen Ordner ein
* Verwende eine lokale Ergänzung im Namen der Bilder, wenn sie lokalisiert sind, z.B. `image_en.jpg`
* Stelle sicher, dass dein Bild weboptimiert ist und gleichzeitig gut aussieht

#### Wie man einfügt 

Es gibt zwei Möglichkeiten, Bilder in deine Dokumente einzufügen:

<robo-wiki-note type="warning">

Es wird empfohlen, Bilder mit dem integrierten Tag `<robo-wiki-picture>` einzufügen, du kannst jedoch auch den Standardweg für Markdown-Dateien verwenden.

</robo-wiki-note>

`mit Beschriftung`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`oder ohne Beschriftung` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`oder einfaches Bild` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`oder einfaches Bild mit Beschriftung`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`Bild mit Alt-Text`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**Eigenschaften für robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### Notizen & Warnungen
Du kannst Notizen hinzufügen und ihnen bestimmte Typen zuweisen:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`Notiz mit Titel`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`Notiz mit Inhalt`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`Notiz mit Titel und Inhalt`

```c
<robo-wiki-note type="okay" title="Robonomics for you">
  Fascinating information about robonomics here only
</robo-wiki-note>
```

<robo-wiki-note type="okay" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="note" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

<robo-wiki-note type="warning" title="Join Discord">

[Join Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) to connect with community and get technical support.

</robo-wiki-note>

**Eigenschaften für robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
Du kannst Tabs zu dem Dokument hinzufügen:

- Verwende die Tabs-Wrapper-Komponente: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- Und dann verwende so viele Tab-Element-Komponenten wie du möchtest innerhalb des Wrappers:

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```


`horizontale Tabs`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`vertikale Tabs`

```c
  <robo-wiki-tabs mode="vertical">
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX">
      <pre>ifconfig</pre>
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

`Tab-Element mit Rahmen`

```c
  <robo-wiki-tabs>
    <robo-wiki-tab title="Linux">
      <pre>ip a</pre>
    </robo-wiki-tab>
    <robo-wiki-tab title="OSX" border>
      ifconfig
    </robo-wiki-tab>
  </robo-wiki-tabs>
```

**Eigenschaften für robo-wiki-tabs (Wrapper)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**Eigenschaften für robo-wiki-tab (Element)**

<probs-table :items="[{ id: 0, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'title for the tab'}]}, { id: 1, items: [{ name: 'border', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: 'add border to the content wrapper'}]}]" />


<robo-wiki-tabs>
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX" border >
      ifconfig 
  </robo-wiki-tab>
</robo-wiki-tabs>


<robo-wiki-tabs mode="vertical">
  <robo-wiki-tab title="Linux">
    <pre>ip a</pre>
  </robo-wiki-tab>
  <robo-wiki-tab title="OSX">
    <pre>ifconfig</pre>
  </robo-wiki-tab>
</robo-wiki-tabs>


### Titel mit Anker
Du kannst benutzerdefinierte Titel mit Anker erstellen und ihnen einen bestimmten Wert geben

`Titel mit Anker`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

oder

`Titel ohne Anker`.

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**Eigenschaften für robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### Videos

Es gibt zwei Möglichkeiten, Videos in deine Dokumente einzufügen:

<robo-wiki-note type="warning">

Es wird empfohlen, Videos mit dem integrierten Tag `<robo-wiki-video>` einzufügen, du kannst jedoch auch den Standardweg für Markdown-Dateien verwenden.

</robo-wiki-note>

#### IPFS / Server
Du musst das Format des Videos angeben

<robo-wiki-note type="warning" title="About gateways">

Gateway for the link is chosen automatically from config file - `data/video_config.yaml`. You can add or remove some gateways by changing the file.

</robo-wiki-note>

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### Eigenschaften

- Wenn du eine Datei mit einer Größe von mehr als <span style="color:#af1c1c">10MB</span>, Bitte laden Sie es auf den Server hoch, nicht im Repo.

- Du kannst beliebige Eigenschaften für [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- Akzeptable Formate - mp4, webm, ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
Du kannst jedes YouTube-Video in das Dokument einbetten, indem du den Freigabelink als separaten Absatz ohne zusätzliche Anführungszeichen oder Tags einfügst, z.B.: `https://youtu.be/kQaSwNYHJQ8`

Wenn Sie jedoch eine automatische Wiedergabe benötigen, müssen Sie eine spezielle Komponente verwenden:

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**Eigenschaften für robo-wiki-youtube**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## Wie man die Seitenleiste bearbeitet

Wenn du die Seitenleiste der Robonomics Wiki bearbeiten möchtest, folge bitte diesen Schritten:

* Bearbeiten Sie die Datei `/data/sidebar_docs.yaml`.

* Entscheiden Sie, wo Sie Ihre Dokumentation platzieren möchten.

* Verwenden Sie gültiges YAML für `/data/sidebar_docs.yaml` und verlassen Sie sich auf die vorhandene Dateistruktur.

* **WICHTIGER HINWEIS:** Wenn Sie dasselbe Dokument in verschiedenen Abschnitten/Unterabschnitten verwenden, z.B.: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Vorinstalliertes Image für Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

STELLEN SIE SICHER, DASS SIE DEN `topic` PARAMETER WIE FOLGT HINZUFÜGEN: 

(damit die Navigation richtig funktioniert)

```
    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Upgrade Home Assistant OS
    - title_en: Pre-installed Image For Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Pre-installed Image For Raspberry Pi

```

## So fügen Sie eine benutzerdefinierte Navigation für Dokumente hinzu 

* Bearbeiten Sie die Datei `/data/sidebar_docs.yaml`.

* Suchen Sie das richtige Dokument und fügen Sie die Parameter `prev` und `next` wie folgt hinzu:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      prev: 
        - title: title of the previous page
          link: /docs/prev_page_url
      next: 
        - title: title of the next page
          link: /docs/next_page_url

```

* Wenn Sie die Navigation vollständig entfernen möchten, fügen Sie den `withoutNav` Parameter hinzu:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* Wenn Sie nur die Navigation `vorherige Seite` oder `nächste Seite` entfernen möchten, fügen Sie den `withoutPrev` oder `withoutNext` Parameter hinzu:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

oder

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```