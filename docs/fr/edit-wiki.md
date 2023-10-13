---
title: Comment modifier le wiki
contributors: [positivecrash]
description: Ways to help us improve our wiki
---

**Robonomics Wiki est open source. Toutes les corrections sont les bienvenues : correction des erreurs, des fautes de frappe, des informations peu claires ou obsolètes, traduction dans n'importe quelle langue. Vous aurez besoin d'un [GitHub](https://github.com/) compte.**


## Comment éditer

Si vous avez besoin de modifier la documentation de Robonomics Wiki, veuillez suivre ces étapes

Make sure, you have [Node.js](https://nodejs.org/en/download/package-manager/) et [Gridsome](https://gridsome.org/docs/#1-install-gridsome-cli-tool) installé.

### 1. Cloner le dépôt

Tout d'abord, vous devez cloner le dépôt wiki :

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Allez dans le répertoire du dépôt et exécutez les commandes suivantes :

`à l'aide de npm`
```
cd robonomics-wiki
npm install 
```

`à l'aide de yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Servez localement (develop, develop-m1)

Ensuite, déployez le projet localement : 

```
gridsome develop
```

> Si vous avez l'erreur `node: --openssl-legacy-provider is not allowed in NODE_OPTIONS`, exécutez la commande suivante :
```
gridsome develop-m1
```

### 3. Faire une demande de tirage

[Faire une demande de tirage](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request) à [dépôt wiki](https://github.com/airalab/robonomics-wiki)

## Composants

### Asciinema
Robonomics Wiki prend en charge Asciinema. Pour insérer Asciinema, veuillez suivre ces instructions :
* Importer le composant après le bloc frontmatter `import Asciinema from '~/components/Asciinema.vue'`
* Insérer en tant que paragraphe séparé `<Asciinema vid="WCFcx8C6M8e52UKDNei1xZloU"/>`, où vid est l'ID de l'asciicast spécifique

> Vous pouvez obtenir le script du widget pour un asciicast spécifique en cliquant sur le lien "Intégrer" sur la page de l'asciicast.
> Cela ressemble à ceci :
> `<script src="https://asciinema.org/a/14.js" id="asciicast-14" async></script>`
[Documentation Asciinema](https://asciinema.org/docs/embedding)

Dans l'exemple ci-dessus, vid est 14.

### Code

Vous pouvez ajouter des extras utiles à votre code :

`code avec bouton de copie`

```c
<code-helper copy>
  YOUR CODE HERE
</code-helper>
```

ou `code avec ligne supplémentaire`

```c
<code-helper additionalLine="this line will be added above your code :)">
  YOUR CODE HERE
</code-helper>
```

**Propriétés pour code-helper**

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
La documentation de Robonomics Wiki contient un bloc frontmatter. Il doit être en haut du fichier Markdown et doit prendre la forme d'un ensemble YAML valide entre des lignes en pointillés. Entre les lignes en pointillés, vous pouvez définir ou modifier les options suivantes :

```YAML
---
title: How to contribute # Titre de la page, vous n'avez pas besoin de le dupliquer dans le texte
contributors: [positivecrash] # Principaux contributeurs (qui gèrent activement cette page). Pseudo GitHub requis, sans aucun symbole supplémentaire
tools:   
  - rust 1.62.0 
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installeration
    # Outils qui ont été utilisés pour les tests de technologie
---
```

### Grid 
Aide à ajouter une mise en page en grille aux éléments :

- Utilisez d'abord le composant wrapper de grille : 

```c
<robo-wiki-grid-element-wrapper></robo-wiki-grid-element-wrapper>
```

- Et utilisez ensuite autant de composants d'éléments de grille que vous le souhaitez à l'intérieur du wrapper :

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

**Propriétés pour robo-wiki-grid-element-wrapper**

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


### Images

#### Comment télécharger 
Téléchargez l'image dans le dossier `/docs/images/url-de-votre-doc`
* Si l'image doit être localisée, insérez-les toutes dans un seul dossier
* Utilisez l'appendice de localisation dans le nom des images s'il est localisé, par exemple `image_en.jpg`
* Assurez-vous que votre image est optimisée pour le web et qu'elle ait une bonne apparence

#### Comment insérer 

Il existe deux façons d'insérer des images dans vos documents :

<robo-wiki-note type="warning">

Il est recommandé d'insérer des images avec la balise intégrée `<robo-wiki-picture>`, mais vous pouvez également utiliser la méthode standard pour les fichiers Markdown.

</robo-wiki-note>

`avec légende`

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`ou sans légende` 

```c
<robo-wiki-picture link="/docs/community" src="example_image.jpg" />
```

`ou simple image` 

```c
<robo-wiki-picture src="example_image.jpg" />
```

`ou image simple avec légende`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" />
```

`image avec alt`

```c
<robo-wiki-picture src="example_image.jpg" caption="EXPLORE ROBONOMICS WIKI" alt="this is alternative text for image" />
```
**Propriétés pour robo-wiki-picture:**

<probs-table :items="[{ id: 0, items: [{ name: 'src', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `path to the image:`}, {text: `if you uploaded your image directly to the /docs/images/ use:`, codeText: 'url-of-your-doc'}, {text: `if you uploaded image in one of the folders than use:`, codeText:  `folder-name/url-of-your-doc`}]}]}, { id: 1, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `link to the needed page`}]}, {id: 2, items: [{ name: 'caption', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `caption for the image`}]}]" />

### Notes et avertissements
Vous pouvez ajouter des notes et leur donner des types spécifiques :
* warning (<span style="color:#f08432">**orange color**</span>)
* okay (<span style="color:#3eaf7c">**green color**</span>)
* note (<span style="color:#90a4b7">**grey color**</span>)

`note avec titre`

```c
<robo-wiki-note type="okay" title="Some information about robots" />
```

`note avec contenu`

```c
<robo-wiki-note type="okay">Fascinating information about robonomics here only</robo-wiki-note>
```

`note avec titre et contenu`

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

**Propriétés pour robo-wiki-note**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'note', code: false}, {name: [{text: `there are three types in total:`, codeText: 'note, warning, okay'}]}]}, { id: 1, items: [{ name: 'title', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `adds title to your note`}]}]" />

### Tabs
Vous pouvez ajouter des onglets à la documentation :

- Utilisez le composant wrapper d'onglets : 

```c
<robo-wiki-tabs></robo-wiki-tabs>
```

- Et utilisez ensuite autant de composants d'éléments d'onglets que vous le souhaitez à l'intérieur du wrapper :

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


`onglets horizontaux`

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

`onglets verticaux`

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

`élément d'onglet avec bordure`

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

**Propriétés pour robo-wiki-tabs (wrapper)**

<probs-table :items="[{ id: 0, items: [{ name: 'mode', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: 'horizontal', code: false}, {name: [{text: 'you can choose tabs mode:'}, {text: ``, codeText: ' horizontal'}, {text: ``, codeText: 'vertical'}]}]}]" />

**Propriétés pour robo-wiki-tab (item)**

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


### Titre avec ancres
Vous pouvez créer des titres personnalisés avec des ancres et leur donner une certaine valeur

`titre avec ancre`

```c
<robo-wiki-title :type="2" anchor="Some information about robots"> 
  Learn Robonomics :)
</robo-wiki-title>
```

ou

`titre sans ancre`

```c
<robo-wiki-title :type="5"> 
  Learn with us ;)
</robo-wiki-title>
```

**Propriétés pour robo-wiki-title**

<probs-table :items="[{ id: 0, items: [{ name: 'type', code: true}, {name: 'Number (from 2 to 6)', code: true}, {name: true, code: true}, {name: null, code: false}, {name: 'choose heading level'}]}, { id: 1, items: [{ name: 'anchor', code: true}, {name: 'String', code: true}, {name: false, code: true}, {name: null, code: false}, {name: `value for the anchor`}]}]" />

<robo-wiki-title :type="6"> 
 I'm custom title :)
</robo-wiki-title>

### Vidéos

Il existe deux façons d'insérer des vidéos dans vos documents :

<robo-wiki-note type="warning">

Il est recommandé d'insérer des vidéos avec la balise intégrée `<robo-wiki-video>`, mais vous pouvez également utiliser la méthode standard pour les fichiers Markdown.

</robo-wiki-note>

#### IPFS / Server
Vous devez spécifier le format de la vidéo

```c
<robo-wiki-video autoplay loop controls :videos="[{src: 'https://cloudflare-ipfs.com/ipfs/QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}, {src: 'https://cloudflare-ipfs.com/ipfs/QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type:'mp4'}]" />
```

#### Local

```c
<robo-wiki-video autoplay loop controls :videos="[{src: '/videos/add-ext.mp4', type:'mp4'}]" />
```

##### Propriétés

- Si vous ajoutez un fichier d'une taille supérieure à <span style="color:#af1c1c">10MB</span>, please, upload it on server, not in repo.

- Vous pouvez utiliser n'importe quelle propriété pour [HTML5 video tag](https://www.w3schools.com/tags/tag_video.asp).

- Formats acceptables - mp4, webm, ogg.

<probs-table :items="[{ id: 0, items: [{ name: 'videos', code: true}, {name: 'Array', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `Array of objects [{src: 'path to video', type: 'type of video'}]`}]}]}]" />


#### YouTube 
Vous pouvez intégrer n'importe quelle vidéo YouTube dans la documentation en insérant le lien de partage en tant que paragraphe séparé sans guillemets ni balises supplémentaires, par exemple : `https://youtu.be/kQaSwNYHJQ8`

Cependant, si vous avez besoin d'une lecture automatique, vous devez utiliser un composant spécial : 

```c
<robo-wiki-youtube autoplay link="https://www.youtube.com/watch?v=5s4-S_z4VYE" />
```

**Propriétés pour robo-wiki-youtube**

<probs-table :items="[{ id: 0, items: [{ name: 'link', code: true}, {name: 'String', code: true}, {name: true, code: true}, {name: null, code: false}, {name: [{text: `link to youtube video`}]}]}, { id: 1, items: [{ name: 'autoplay', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `autoplays youtube video`}]}]}, { id: 2, items: [{ name: 'loop', code: true}, {name: 'Boolean', code: true}, {name: false, code: true}, {name: false, code: true}, {name: [{text: `loop youtube video`}]}]}]" />


## Comment modifier la navigation de la barre latérale

Si vous devez modifier la navigation de la barre latérale de Robonomics Wiki, veuillez suivre ces étapes :

* Modifier le fichier `/data/sidebar_docs.yaml`.

* Décider où placer votre document

* Utilisez un YAML valide pour `/data/sidebar_docs.yaml` et comptez sur la structure de fichier existante

* **NOTE IMPORTANTE:** si vous utilisez le même document dans différentes sections/sous-sections, par exemple: 

```

    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
    - title_en: Image pré-installée pour Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate

```

ASSUREZ-VOUS D'AJOUTER LE PARAMÈTRE `topic` COMME CECI: 

(pour que la navigation fonctionne correctement)

```
    - title_en: Upgrade Home Assistant OS
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Upgrade Home Assistant OS
    - title_en: Image pré-installée pour Raspberry Pi
      items:
        - title_en: Buying a Subscription
          link: /docs/sub-activate
          topic: Pre-installed Image For Raspberry Pi

```

## Comment ajouter une navigation personnalisée pour les documents

* Modifier le fichier `/data/sidebar_docs.yaml`.

* FTrouvez le bon document et ajoutez les paramètres `prev` et `next` comme ceci :

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

* Si vous souhaitez supprimer complètement la navigation, ajoutez le paramètre `withoutNav`:

```
    - title_en: How to Edit Wiki
      link: /docs/edit-wiki
      withoutNav: true
```

* Si vous souhaitez supprimer uniquement la navigation `page précédente` ou `page suivante`, ajoutez le paramètre `withoutPrev` ou `withoutNext`:

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutPrev: true
```

or

```
- title_en: How to Edit Wiki
link: /docs/edit-wiki
withoutNext: true
```