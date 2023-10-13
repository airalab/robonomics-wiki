---
title: Come modificare Wiki
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics Wiki è open source. Ogni correzione è benvenuta: correzione di errori, refusi, informazioni poco chiare o obsolete, traduzione in qualsiasi lingua. Avrai bisogno di un [GitHub](https://github.com/) account.**


## Come modificare

Se hai bisogno di modificare i documenti di Robonomics Wiki, segui questi passaggi

Assicurati di aver [Node.js](https://nodejs.org/en/download/package-manager/) e [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool) installato.

### 1. Clona il repository

Innanzitutto, devi clonare il repository wiki:

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

### 2. Servi localmente (sviluppo, sviluppo-m1)

Quindi distribuisci il progetto in locale: 

```
gridsome develop
```

> Se hai l'errore `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`, esegui il seguente comando:
```
gridsome develop-m1
```

### 3. Crea una PR

[Crea una pull request](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) a [repo wiki](https://github.com/airalab/robonomics-wiki)

## Componenti

### Asciinema
Robonomics Wiki supporta Asciinema. Per inserire Asciinema, segui queste istruzioni:
* Importa il componente dopo il blocco frontmatter `import Asciinema from '~/components/Asciinema.vue'`
* Inserisci come paragrafo separato `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, dove vid è l'ID di un asciicast specifico

> Puoi ottenere lo script del widget per un asciicast specifico cliccando sul link “Embed” nella pagina dell'asciicast.
> Apparirà così:
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Documentazione di Asciinema](https://asciinema.org/docs/embedding)

Nell'esempio sopra vid è 14.

### Codice

Puoi aggiungere extra utili al tuo codice:

`codice con pulsante di copia`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

o "codice con riga aggiuntiva".

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**Proprietà per code-helper**

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
I documenti in Robonomics Wiki contengono un blocco frontmatter. Deve essere nella parte superiore del file Markdown e deve avere la forma di un valido set YAML racchiuso tra linee tratteggiate. Tra le linee tratteggiate, puoi impostare o modificare le seguenti opzioni:

```YAML
---
title: How to contribute # Titolo della pagina, non è necessario duplicarlo nel testo
contributors: [positivecrash] # Principali contributori (che curano attivamente questa pagina). È richiesto il nickname di GitHub, senza simboli aggiuntivi
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installaation
    # Strumenti utilizzati per il test della tecnologia
---
```

### Grid 
Aiuta ad aggiungere un layout a griglia agli elementi:

- Usa prima il componente wrapper di griglia: 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- E poi usa quanti componenti di elementi di griglia desideri all'interno del wrapper:

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

**Proprietà per robo-wiki-grid-element-wrapper**

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


### Immagini

#### Come caricare 
Carica l'immagine nella cartella `/docs/images/url-del-tuo-doc`
* Se l'immagine deve essere localizzata, inseriscile tutte in una cartella
* Usa l'appendice di localizzazione nel nome delle immagini se è localizzata, ad esempio `image_en.jpg`
* Assicurati che la tua immagine sia ottimizzata per il web e allo stesso tempo abbia un aspetto buono

#### Come inserire 

Ci sono due modi per inserire immagini nei tuoi documenti:

<robo-wiki-note type="warning">

Si consiglia di inserire le immagini con il tag integrato `<robo-wiki-picture>`, tuttavia è possibile utilizzare anche il modo standard per i file Markdown.

</robo-wiki-note>

`con didascalia`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`o senza didascalia` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`o immagine semplice` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`o immagine semplice con didascalia`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`immagine con attributo alt`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**Proprietà per robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### Note e avvisi
Puoi aggiungere note e assegnare loro tipi specifici:
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`nota con titolo`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`nota con contenuto`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`nota con titolo e contenuto`

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

**Proprietà per robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
Puoi aggiungere schede al documento:

- Usa il componente wrapper delle schede: 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- E poi usa quanti componenti di elementi di schede desideri all'interno del wrapper:

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


`schede orizzontali`

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

`schede verticali`

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

`elemento di scheda con bordo`

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

**Proprietà per robo-wiki-tabs (wrapper)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**Proprietà per robo-wiki-tab (elemento)**

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


### Titolo con ancoraggio
Puoi creare titoli personalizzati con ancoraggi e assegnare loro un valore specifico

`titolo con ancoraggio`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

O

`titolo senza ancoraggio`.

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**Proprietà per robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### Video

Ci sono due modi per inserire video nei tuoi documenti:

<robo-wiki-note type="warning">

Si consiglia di inserire i video con il tag integrato `<robo-wiki-video>`, tuttavia è possibile utilizzare anche il modo standard per i file Markdown.

</robo-wiki-note>

#### IPFS / Server
È necessario specificare il formato del video

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'https://cloudflare-ipfs.com/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### Proprietà

- Se stai aggiungendo un file con una dimensione superiore a <span style="color:#af1c1c">10MB</span>, per favore, caricalo sul server, non nel repository.

- Puoi utilizzare qualsiasi proprietà per [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- Formati accettabili - mp4, webm, ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
Puoi incorporare qualsiasi video di YouTube nel documento inserendo il link di condivisione come paragrafo separato senza virgolette o tag aggiuntivi, ad esempio: `https://youtu.be/kQaSwNYHJQ8`

Tuttavia, se hai bisogno di una riproduzione automatica devi utilizzare un componente speciale: 

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**Proprietà per robo-wiki-youtube**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## Come modificare la navigazione della barra laterale

Se hai bisogno di modificare la navigazione della barra laterale di Robonomics Wiki, segui questi passaggi:

* Modifica il file `/data/sidebar_docs.yaml`.

* Decidi dove posizionare il tuo documento

* Utilizza YAML valido per `/data/sidebar_docs.yaml` e fai affidamento sulla struttura del file esistente

* **NOTA IMPORTANTE** se stai utilizzando lo stesso documento in diverse sezioni/sottosezioni ad esempio: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Immagine preinstallata per Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

ASSICURATI DI AGGIUNGERE IL PARAMETRO `topic` COME SEGUE: 

(per il corretto funzionamento della navigazione)

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

## Come aggiungere una navigazione personalizzata per i documenti

* Modifica il file `/data/sidebar_docs.yaml`.

* Trova il documento giusto e aggiungi i parametri `prev` e `next` in questo modo:

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

* Se desideri rimuovere completamente la navigazione, aggiungi il parametro `withoutNav`:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* Se desideri rimuovere solo la navigazione `pagina precedente` o `pagina successiva`, aggiungi il parametro `withoutPrev` o `withoutNext`:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

o

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```