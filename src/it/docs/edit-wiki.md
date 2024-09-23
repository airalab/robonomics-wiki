---
title: Come modificare Wiki
contributors: [positivecrash]
description: Modi per aiutarci a migliorare la nostra wiki
---

**La Wiki di Robonomics è open source. Ogni correzione è ben accetta: correggere errori, refusi, informazioni poco chiare o obsolete, traduzioni in qualsiasi lingua. Avrai bisogno di un account [GitHub](https://github.com/).**


## Come modificare

Se hai bisogno di modificare i documenti della Wiki di Robonomics, segui questi passaggi

Assicurati di avere [Node.js](https://nodejs.org/en/download/package-manager/) installati.

### 1. Clona il repository

Innanzitutto, devi clonare il repository della wiki:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Vai nella directory del repository e esegui i seguenti comandi:

`usando npm`
```
cd robonomics-wiki
npm install
```

`usando yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Servi in locale (sviluppo, sviluppo-m1)

`node deve essere >= v18`

Poi distribuisci il progetto in locale:

```
npm run start
```

### 3. Crea una PR

[Crea una pull request](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)a [wiki repo](https://github.com/airalab/robonomics-wiki)

## Componenti

{% roboWikiNote {title:"COMPONENTI PERSONALIZZATI", type: "warning"}%} Un **consiglio** quando si aggiungono componenti personalizzati:
Se c'è qualcosa di sbagliato nel layout dopo l'aggiunta di un componente, potresti voler controllare gli spazi. Dovrebbe aiutare a **RIMUOVERE** gli spazi dopo il tag di apertura e di chiusura (come nell'esempio qui sotto){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Codice

Puoi aggiungere extra utili al tuo codice:

`codice con pulsante di copia`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

testo del codice
	altro test line
		qualcos'altro

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

o `codice con linea aggiuntiva`

```bash
{% raw %}{% codeHelper { additionalLine: "linea aggiuntiva"}%}{% endraw %}

testo del codice
	altro test line
		qualcos'altro

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Proprietà per code-helper**

| Proprietà        | Tipo      | Richiesto | Predefinito | Descrizione                                               |
|------------------|-----------|----------|-------------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`     | aggiunge un pulsante di copia per il tuo codice            |
| `additionalLine` | `String`  | `false`  | ''          | linea aggiuntiva per il tuo codice che verrà visualizzata sopra |


{% codeHelper { additionalLine: "linea aggiuntiva", copy: true}%}

```bash
testo del codice
	altro test line
		qualcos'altro
```

{% endcodeHelper %}### Frontmatter
I documenti nel Wiki di Robonomics contengono un blocco di frontmatter. Deve essere posizionato all'inizio del file Markdown e deve assumere la forma di un valido YAML racchiuso tra linee tratteggiate triple. Tra le linee tratteggiate triple, è possibile impostare o modificare le seguenti opzioni:

```YAML
---
title: Come contribuire # Titolo della pagina, non è necessario duplicarlo nel testo
contributors: [positivecrash] # Principali contributori (che curano attivamente questa pagina). È richiesto il nickname di GitHub, senza simboli aggiuntivi
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # Strumenti utilizzati per i test tecnologici
---
```

### Griglia
Aiuta ad aggiungere un layout a griglia agli elementi:

- Utilizzare prima il componente wrapper della griglia:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- E poi utilizzare quanti più componenti di elementi di griglia desideri all'interno del wrapper:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} primo elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} secondo elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} terzo elemento {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}{% endraw %}
``````html
{% roboWikiGridWrapper %}
	{% roboWikiGrid %} secondo elemento {% endroboWikiGrid %}
	{% roboWikiGrid %} terzo elemento {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}
```

<br/>

**Proprietà per robo-wiki-grid-wrapper**

| Proprietà   | Tipo      | Richiesto | Predefinito | Descrizione                                                             |
|-------------|-----------|-----------|-------------|-------------------------------------------------------------------------|
| `columns`   | `Numero`  | `false`   | 4           | puoi scegliere il numero di colonne:   <br/> - da `1 a 5`               |
| `align`     | `Stringa` | `false`   |             | allinea gli elementi sull'asse del blocco:   <br/> - opzioni: `start, center, end` |
| `justify`   | `Stringa` | `false`   |             | allinea gli elementi sull'asse inline:  <br/> - opzioni: `start, center, end` |
| `textAlign` | `Stringa` | `false`   | `left`      | allinea il testo all'interno della griglia:  <br/> - opzioni: `left, center, right` |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (almeno 2 GB di RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Scheda SD da 16 GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adattatore Zigbee (Opzionale) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Dispositivi smart Zigbee (Opzionale) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Desktop per la configurazione</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Immagini

#### Come caricare
Carica l'immagine nella cartella `src/assets/docs/images/url-of-your-doc`
* Se l'immagine deve essere localizzata, inseriscile tutte in una cartella
* Utilizza l'appendice della lingua nel nome delle immagini se è localizzata, ad esempio `image_en.jpg`
* Assicurati che la tua immagine sia ottimizzata per il web e che allo stesso tempo sia di buona qualità

#### Come inserire

Ci sono due modi per inserire le immagini nei tuoi documenti:

{% roboWikiNote {type: 'warning'}%} Si consiglia di inserire le immagini con il tag integrato `<robo-wiki-picture>`, tuttavia è possibile utilizzare anche il modo standard per i file Markdown. {% endroboWikiNote %}

`con didascalia`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"esplora il wiki di robomomics", link: '/docs/overview', caption: "ESPLORA"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`o senza didascalia`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"esplora il wiki di robomomics",link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`o immagine semplice`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"esplora il wiki di robomomics"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`o immagine semplice con didascalia`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"esplora il wiki di robomomics", caption: "ESPLORA"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Proprietà per robo-wiki-picture:**

| Proprietà | Tipo      | Richiesto | Predefinito | Descrizione                                                                                                                                                                                                          |
|-----------|-----------|-----------|-------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`    |             | percorso dell'immagine:  <br/> - se hai caricato direttamente la tua immagine in `/src/assets/images/docs/` usa: `url-del-tuo-doc` <br/> - se hai caricato l'immagine in una delle cartelle, usa: `nome-cartella/url-del-tuo-doc` |
| `link`    | `String`  | `false`   |             | allinea gli elementi sull'asse del blocco:   <br/> - opzioni: `inizio, centro, fine`                                                                                                                                  |`didascalia` | `String` | `false` | | allinea gli elementi sull'asse in linea: <br/> - opzioni: `inizio, centro, fine`
| `alt` | `String` | `true` | immagine | fornisce informazioni alternative per un'immagine nel caso in cui un utente non possa visualizzarla per qualche motivo
| `zoom` | `Boolean` | `false` | | ingrandisce l'immagine
| `caricamento` | `String` | `false` | pigro | ci sono due opzioni: pigro e desideroso

### Note e avvertimenti
Puoi aggiungere note e assegnare loro tipi specifici:
* avvertimento (<span style="color:#f08432">**con immagine**</span>)
* okay (<span style="color:#3eaf7c">**colore verde**</span>)
* nota (<span style="color:#90a4b7">**colore grigio**</span>)

`nota con titolo`

```c
{% raw %} {% roboWikiNote {title:"TITOLO DELL'ESEMPIO", type: "okay"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`nota con contenuto`

```c
{% raw %} {% roboWikiNote {type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br>/>

`nota con titolo e contenuto`

```c
{% raw %} {% roboWikiNote {title: "TITOLO", type: "ok"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Unisciti a Discord", type: "ok"}%} [Unisciti a Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) per connetterti con la community e ottenere supporto tecnico. {% endroboWikiNote %}

{% roboWikiNote {title: "Unisciti a Discord"}%} [Unisciti a Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) per connetterti con la community e ottenere supporto tecnico. {% endroboWikiNote %}

{% roboWikiNote {title: "Unisciti a Discord", type: "avviso"}%} [Unisciti a Robonomics Developers Discord](https://discord.gg/jTxqGeF5Qy) per connetterti con la community e ottenere supporto tecnico. {% endroboWikiNote %}

**Proprietà per robo-wiki-note**

| Proprietà | Tipo     | Richiesto | Predefinito | Descrizione                                                 |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `falso`  |         | - ci sono tre tipi in totale: `nota`, `avviso`, `ok` |
| `title`  | `String`` | `falso`  |         | aggiunge un titolo al tuo appunto                                     |


### Schede
Puoi aggiungere schede al documento:

- Utilizza il componente wrapper delle schede:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- E poi utilizza quanti componenti di schede desideri all'interno del wrapper:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`schede orizzontali`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`schede verticali`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],modalità: 'verticale'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`scheda con bordo`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Proprietà per robo-wiki-tabs (wrapper)**

| Proprietà | Tipo     | Richiesto | Predefinito | Descrizione                                                       |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - Array con titoli per ogni scheda                                |
| `mode`   | `String` | `false`  | orizzontale | puoi scegliere la modalità delle schede: <br/> - `orizzontale` <br/> - `verticale` |

**Proprietà per robo-wiki-tab (elemento)**

| Proprietà | Tipo      | Richiesto | Predefinito | Descrizione                         |
|----------|-----------|----------|---------|-------------------------------------|
| `bordo` | `Boolean` | `false`  | `falso` | - aggiungi un bordo all'incapsulamento del contenuto |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'verticale'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Titolo con ancoraggi
Puoi creare titoli personalizzati con ancoraggi e attribuire loro un certo valore

`titolo con ancoraggio`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

o `titolo senza ancoraggio`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (titolo personalizzato) {% endroboWikiTitle %}%}

<br/>

**Proprietà per il titolo del wiki del robot**

| Proprietà | Tipo                   | Richiesto | Predefinito | Descrizione          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Numero (da 2 a 6)` | `true`   |         | scegli il livello dell'intestazione |
| `anchor` | `Stringa`               | `false`  |         | valore per l'ancora |

### Video

Ci sono due modi per inserire video nei tuoi documenti:

{% roboWikiNote {type: "warning"}%} Si consiglia di inserire i video con il tag integrato `<robo-wiki-video>`, tuttavia è possibile utilizzare anche il modo standard per i file Markdown. {% endroboWikiNote %}

#### IPFS / Server
È necessario specificare il formato del video

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"Informazioni sui gateway"}%} Il gateway per il link viene scelto automaticamente dal file di configurazione - `src/_data/video_config.js`. È possibile aggiungere o rimuovere alcuni gateway modificando ilfile. {% endroboWikiNote %}


#### Locale

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Proprietà

- Se stai aggiungendo un file con una dimensione superiore a <span style="color:#af1c1c">10MB</span>, per favore, caricalo sul server, non nel repository.

- Puoi utilizzare qualsiasi proprietà per il [tag video di HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Formati accettabili - mp4, webm, ogg.

| Proprietà | Tipo | Richiesto | Predefinito | Descrizione |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | Array di oggetti [{src: `percorso del video`, type: `tipo di video`}] |


#### YouTube
Puoi incorporare qualsiasi video di YouTube nel documento inserendo il link di condivisione come paragrafo separato senza alcun ulteriore citazione o tag aggiuntivo, ad esempio: `https://youtu.be/kQaSwNYHJQ8`

Tuttavia, se hai bisogno di un'autoplay, devi utilizzare un componente speciale:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%```yaml
---
title: Proprietà per robo-wiki-youtube
---

**Proprietà per robo-wiki-youtube**

| Proprietà | Tipo | Richiesto | Predefinito | Descrizione |
|---|---|---|---|---|
| `link` | `String` | `true` |  | link al video di YouTube |
| `autoplay` | `Boolean` | `false` | `false` | riproduce automaticamente il video di YouTube |
| `loop` | `Boolean` | `false` | `false` | ripete il video di YouTube |


## Come modificare la navigazione della barra laterale

Se è necessario modificare la navigazione della barra laterale del Wiki di Robonomics, seguire questi passaggi:

* Modificare il file `src/_data/sidebar_docs.json`.

* Decidere dove posizionare il proprio documento

* Utilizzare JSON valido per `src/_data/sidebar_docs.json` e fare affidamento sulla struttura del file esistente

* **NOTA IMPORTANTE:** se si utilizza lo stesso documento in diverse sezioni/sottosezioni ad esempio:

```

{
	"title": "Aggiornamento Home Assistant OS",
	"children": [
	{
		"title": "Attivazione abbonamento",
		"url": "/docs/sub-activate",
	}],
	"title": "Aggiornamento Home Assistant Docker per OS simili a Unix",
		"children": [
	{
		"title": "Attivazione abbonamento",
		"url": "/docs/sub-activate",
	}],
}

```

ASSICURARSI DI AGGIUNGERE IL PARAMETRO `topic` IN QUESTO MODO:

(per far funzionare correttamente la navigazione)```
{
	"title": "Aggiornamento Home Assistant OS",
	"children": [
	{
		"title": "Attivazione dell'abbonamento",
		"url": "/docs/sub-activate",
		"topic": "Aggiornamento Home Assistant OS"
	}],
	"title": "Aggiornamento Home Assistant Docker per sistemi operativi simili a Unix",
		"children": [
	{
		"title": "Attivazione dell'abbonamento",
		"url": "/docs/sub-activate",
		"topic": "Aggiornamento Home Assistant Docker per sistemi operativi simili a Unix"
	}],
}

```

## Come aggiungere una navigazione personalizzata per i documenti

* Modifica il file `src/_data/sidebar_docs.json`.

* Trova il documento corretto e aggiungi i parametri `prev` e `next` in questo modo:

```
	{
		"title": "Panoramica",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Aggiungi Utente",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Aggiungi Utente",
				"url": "/docs/add-user"
			}
		],
	},

```

* Se desideri rimuovere completamente la navigazione, aggiungi il parametro `withoutNav`:

```
{
	"title": "Panoramica",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Se desideri rimuovereSolo navigazione `pagina precedente` o `pagina successiva` quindi aggiungere il parametro `withoutPrev` o `withoutNext`:

```
{
	"title": "Panoramica",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

o

```
{
	"title": "Panoramica",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## Come tradurre un documento

{% roboWikiNote {title: 'Importante', type: 'avviso'}%} Devi creare il file **.env** e aggiungere la variabile *OPENAI_KEY* con la tua chiave {% endroboWikiNote %}

Se desideri tradurre il tuo documento md devi eseguire il comando:

```bash
npm run translate-md
```

Dopo aver eseguito il comando, devi solo aspettare e forse controllare i file (le traduzioni AI hanno alcuni difetti).

### Risoluzione dei problemi delle traduzioni

Potresti incontrare alcuni problemi con le traduzioni.

1. Prova a eseguire nuovamente il comando e vedi se ha funzionato.

2. A volte i tag nei file md possono essere scritti in modo non corretto, ad esempio:


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

Quindi, devi solo correggere il tag.