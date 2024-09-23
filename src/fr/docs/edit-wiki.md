---
title: Comment éditer un Wiki
contributors: [positivecrash]
description: Moyens de nous aider à améliorer notre wiki
---

**Le Wiki Robonomics est open source. Toutes les corrections sont les bienvenues : correction d'erreurs, de fautes de frappe, d'informations peu claires ou obsolètes, traduction dans n'importe quelle langue. Vous aurez besoin d'un compte [GitHub](https://github.com/).**


## Comment éditer

Si vous avez besoin de modifier des documents du Wiki Robonomics, veuillez suivre ces étapes

Assurez-vous d'avoir [Node.js](https://nodejs.org/en/download/package-manager/) installés.

### 1. Cloner le dépôt

Tout d'abord, vous devez cloner le dépôt du wiki :

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Allez dans le répertoire du dépôt et exécutez les commandes suivantes :

`en utilisant npm`
```
cd robonomics-wiki
npm install
```

`en utilisant yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Servir localement (développer, développer-m1)

`node doit être >= v18`

Déployez ensuite le projet localement :

```
npm run start
```

### 3. Faire une PR

[Faire une demande de tirage](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)vers [wiki repo](https://github.com/airalab/robonomics-wiki)

## Composants

{% roboWikiNote {title:"COMPOSANTS PERSONNALISÉS", type: "warning"}%} Un **conseil** lors de l'ajout de composants personnalisés :
S'il y a un problème de mise en page après l'ajout d'un composant, vous voudrez peut-être vérifier les espaces. Il devrait aider à **SUPPRIMER** les espaces après la balise d'ouverture et la balise de fermeture (comme dans l'exemple ci-dessous){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}

```

### Code

Vous pouvez ajouter des extras utiles à votre code :

`code avec bouton de copie`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

ou `code avec ligne supplémentaire`

```bash
{% raw %}{% codeHelper { additionalLine: "ligne supplémentaire"}%}{% endraw %}

some text code
	another test line
		something else

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Propriétés pour code-helper**

| Propriété        | Type      | Requis   | Par défaut | Description                                               |
|------------------|-----------|----------|------------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`    | ajoute un bouton de copie pour votre code                 |
| `additionalLine` | `String`  | `false`  | ''         | ligne supplémentaire pour votre code qui sera affichée au-dessus |


{% codeHelper { additionalLine: "ligne supplémentaire", copy: true}%}

```bash
some text code
	another test line
		something else
```

{% endcodeHelper %}### En-tête
Les documents du Wiki Robonomics contiennent un bloc d'en-tête. Il doit être placé en haut du fichier Markdown et doit prendre la forme d'un YAML valide placé entre des lignes en pointillés triples. Entre les lignes en pointillés triples, vous pouvez définir ou modifier les options suivantes :

```YAML
---
title: Comment contribuer # Titre de la page, vous n'avez pas besoin de le dupliquer dans le texte
contributors: [positivecrash] # Principaux contributeurs (qui gèrent activement cette page). Pseudo GitHub requis, sans aucun symbole supplémentaire
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # Outils utilisés pour les tests technologiques
---
```

### Grille
Aide à ajouter une mise en page en grille aux éléments :

- Utilisez d'abord le composant d'enveloppe de grille :

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Ensuite, utilisez autant de composants d'éléments de grille que vous le souhaitez à l'intérieur de l'enveloppe :

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} premier élément {% endroboWikiGrid %}
	{% roboWikiGrid %} deuxième élément {% endroboWikiGrid %}
	{% roboWikiGrid %} troisième élément {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**Propriétés pour robo-wiki-grid-wrapper**

| Propriété   | Type     | Requis   | Par défaut | Description                                                            |
|-------------|----------|----------|------------|------------------------------------------------------------------------|
| `columns`   | `Number` | `false`  | 4          | vous pouvez choisir le nombre de colonnes:   <br/> - de `1 à 5`        |
| `align`     | `String` | `false`  |            | aligner les éléments sur l'axe du bloc:   <br/> - options: `start, center, end` |
| `justify`   | `String` | `false`  |            | aligner les éléments sur l'axe en ligne:  <br/> - options: `start, center, end` |
| `textAlign` | `String` | `false`  | `left`     | aligner le texte à l'intérieur de la grille:  <br/> - options: `left, center, right` |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (au moins 2 Go de RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"besoin"} %}{% endroboWikiPicture %}
	<b>Carte SD 16 Go</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"besoin"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Adaptateur Zigbee (facultatif) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"besoin"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Appareils intelligents Zigbee (facultatif) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"besoin"} %}{% endroboWikiPicture %}
	<b>Bureau pour la configuration</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Images

#### Comment télécharger
Téléchargez l'image dans le dossier `src/assets/docs/images/url-of-your-doc`
* Si l'image doit être localisée, insérez-les toutes dans un seul dossier
* Utilisez l'appendice de localisation dans le nom des images s'il est localisé, par exemple `image_fr.jpg`
* Assurez-vous que votre image est optimisée pour le web et qu'elle ait une bonne apparence en même temps

#### Comment insérer

Il existe deux façons d'insérer des images dans vos documents :

{% roboWikiNote {type: 'warning'}%} Il est recommandé d'insérer des images avec la balise intégrée `<robo-wiki-picture>`, cependant vous pouvez également utiliser la méthode standard pour les fichiers Markdown. {% endroboWikiNote %}

`avec légende`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorer le wiki de Robonomics", link: '/docs/overview', caption: "EXPLORER"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ou sans légende`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorer le wiki de Robonomics",lien: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ou une image simple`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorer le wiki de Robonomics"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ou une image simple avec légende`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explorer le wiki de Robonomics", caption: "EXPLORER"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Propriétés pour robo-wiki-picture:**

| Propriété | Type      | Requis   | Par défaut | Description                                                                                                                                                                                                          |
|-----------|-----------|----------|------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |            | chemin de l'image:  <br/> - si vous avez téléchargé votre image directement dans `/src/assets/images/docs/`, utilisez: `url-de-votre-doc` <br/> - si vous avez téléchargé l'image dans l'un des dossiers, utilisez: `nom-du-dossier/url-de-votre-doc` |
| `lien`    | `String`  | `false`  |            | aligner les éléments sur l'axe du bloc:   <br/> - options: `début, centre, fin`                                                                                                                                      |`légende` | `String`  | `false`  |         | aligner les éléments sur l'axe en ligne:  <br/> - options: `début, centre, fin`                                                                                                                                               |
| `alt`     | `String`  | `true`   | image | fournit des informations alternatives pour une image si un utilisateur ne peut pas la voir pour une raison quelconque                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | zoomer sur l'image                                                                                                                                                                                                           |
| `chargement` | `String`  | `false`  | paresseux    | il y a deux options: paresseux et impatient                                                                                                                                                                                |

### Notes & avertissements
Vous pouvez ajouter des notes et leur donner des types spécifiques:
* avertissement (<span style="color:#f08432">**avec image**</span>)
* correct (<span style="color:#3eaf7c">**couleur verte**</span>)
* note (<span style="color:#90a4b7">**couleur grise**</span>)

`note avec titre`

```c
{% raw %} {% roboWikiNote {title:"TITRE D'EXEMPLE", type: "correct"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`note avec contenu`

```c
{% raw %} {% roboWikiNote {type: "correct"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br>/>

`note avec titre et contenu`

```c
{% raw %} {% roboWikiNote {title: "TITRE", type: "okay"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Rejoindre Discord", type: "okay"}%} [Rejoignez Discord des développeurs Robonomics](https://discord.gg/jTxqGeF5Qy) pour vous connecter à la communauté et obtenir un support technique. {% endroboWikiNote %}

{% roboWikiNote {title: "Rejoindre Discord"}%} [Rejoignez Discord des développeurs Robonomics](https://discord.gg/jTxqGeF5Qy) pour vous connecter à la communauté et obtenir un support technique. {% endroboWikiNote %}

{% roboWikiNote {title: "Rejoindre Discord", type: "warning"}%} [Rejoignez Discord des développeurs Robonomics](https://discord.gg/jTxqGeF5Qy) pour vous connecter à la communauté et obtenir un support technique. {% endroboWikiNote %}

**Propriétés pour robo-wiki-note**

| Propriété | Type     | Requis   | Par défaut | Description                                                 |
|-----------|----------|----------|------------|-------------------------------------------------------------|
| `type`    | `String` | `false`  |            | - il y a trois types au total : `note`, `warning`, `okay`   |
| `title`   | `String`` | `faux`  |         | ajoute un titre à votre note                                     |


### Onglets
Vous pouvez ajouter des onglets au document :

- Utilisez le composant d'enveloppe d'onglets :

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Ensuite, utilisez autant de composants d'éléments d'onglet que vous le souhaitez à l'intérieur de l'enveloppe :

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`onglets horizontaux`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`onglets verticaux`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`onglet avec bordure`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Propriétés pour robo-wiki-tabs (conteneur)**

| Propriété | Type     | Requis   | Par défaut | Description                                                       |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Array`  | `true`   |            | - Tableau avec les titres de chaque onglet                        |
| `mode`   | `String` | `false`  | horizontal | Vous pouvez choisir le mode des onglets : <br/> - `horizontal` <br/> - `vertical` |

**Propriétés pour robo-wiki-tab (élément)**

| Propriété | Type      | Requis   | Par défaut | Description                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` |faux` | - ajouter une bordure à l'enveloppe du contenu |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Titre avec ancres
Vous pouvez créer des titres personnalisés avec des ancres et leur attribuer une certaine valeur

`titre avec ancre`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

ou `titre sans ancre`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (titre personnalisé) {% endroboWikiTitle %}%}

<br/>

**Propriétés pour le titre du wiki de robot**

| Propriété | Type                   | Requis   | Par défaut | Description          |
|----------|------------------------|----------|------------|----------------------|
| `type`   | `Nombre (de 2 à 6)`    | `true`   |            | choisir le niveau de titre |
| `anchor` | `Chaîne de caractères` | `false`  |            | valeur pour l'ancre |

### Vidéos

Il existe deux façons d'insérer des vidéos dans vos documents :

{% roboWikiNote {type: "warning"}%} Il est recommandé d'insérer des vidéos avec la balise intégrée `<robo-wiki-video>`, cependant vous pouvez également utiliser la méthode standard pour les fichiers Markdown. {% endroboWikiNote %}

#### IPFS / Serveur
Vous devez spécifier le format de la vidéo

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"À propos des passerelles"}%} La passerelle pour le lien est choisie automatiquement à partir du fichier de configuration - `src/_data/video_config.js`. Vous pouvez ajouter ou supprimer certaines passerelles en modifiant lefichier. {% endroboWikiNote %}


#### Local

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Propriétés

- Si vous ajoutez un fichier de plus de <span style="color:#af1c1c">10MB</span>, veuillez l'uploader sur le serveur, pas dans le dépôt.

- Vous pouvez utiliser n'importe quelle propriété pour la [balise vidéo HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Formats acceptables - mp4, webm, ogg.

| Propriété | Type | Requis | Par défaut | Description |
|---|---|---|---|---|
| `videos` | `Array` | `true` |  | Tableau d'objets [{src: `chemin de la vidéo`, type: `type de vidéo`}] |


#### YouTube
Vous pouvez intégrer n'importe quelle vidéo YouTube dans le document en insérant le lien de partage en tant que paragraphe séparé sans guillemets ou balises supplémentaires, par exemple : `https://youtu.be/kQaSwNYHJQ8`

Cependant, si vous avez besoin d'une lecture automatique, vous devez utiliser un composant spécial :

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%```yaml
endroboWikiYoutube %}{% endraw %}
```

**Propriétés pour robo-wiki-youtube**

| Propriété | Type | Requis | Par défaut | Description |
|---|---|---|---|---|
| `link` | `Chaîne de caractères` | `true` |  | lien vers la vidéo YouTube |
| `autoplay` | `Booléen` | `false` | `false` | lecture automatique de la vidéo YouTube |
| `loop` | `Booléen` | `false` | `false` | boucle de la vidéo YouTube |


## Comment modifier la navigation de la barre latérale

Si vous devez modifier la navigation de la barre latérale du Wiki Robonomics, veuillez suivre ces étapes :

* Modifier le fichier `src/_data/sidebar_docs.json`.

* Décidez où placer votre document

* Utilisez un JSON valide pour `src/_data/sidebar_docs.json` et reposez-vous sur la structure de fichier existante

* **NOTE IMPORTANTE :** si vous utilisez le même document dans différentes sections/sous-sections par exemple :

```

{
	"title": "Mettre à niveau Home Assistant OS",
	"children": [
	{
		"title": "Activer l'abonnement",
		"url": "/docs/sub-activate",
	}],
	"title": "Mettre à niveau Home Assistant Docker pour les systèmes d'exploitation de type Unix",
		"children": [
	{
		"title": "Activer l'abonnement",
		"url": "/docs/sub-activate",
	}],
}

```

ASSUREZ-VOUS D'AJOUTER LE PARAMÈTRE `topic` COMME CECI :

(pour que la navigation fonctionne correctement)```
{
	"title": "Mettre à niveau Home Assistant OS",
	"children": [
	{
		"title": "Activer l'abonnement",
		"url": "/docs/sub-activate",
		"topic": "Mettre à niveau Home Assistant OS"
	}],
	"title": "Mettre à niveau Home Assistant Docker pour les systèmes d'exploitation de type Unix",
		"children": [
	{
		"title": "Activer l'abonnement",
		"url": "/docs/sub-activate",
		"topic": "Mettre à niveau Home Assistant Docker pour les systèmes d'exploitation de type Unix"
	}],
}

```

## Comment ajouter une navigation personnalisée pour les documents

* Modifier le fichier `src/_data/sidebar_docs.json`.

* Trouvez le bon document et ajoutez les paramètres `prev` et `next` comme ceci :

```
	{
		"title": "Aperçu",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Ajouter un utilisateur",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Ajouter un utilisateur",
				"url": "/docs/add-user"
			}
		],
	},

```

* Si vous souhaitez supprimer complètement la navigation, ajoutez le paramètre `withoutNav` :

```
{
	"title": "Aperçu",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Si vous souhaitez supprimerjust `page précédente` ou `page suivante` navigation que d'ajouter le paramètre `withoutPrev` ou `withoutNext` :

```
{
	"title": "Aperçu",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

ou

```
{
	"title": "Aperçu",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## Comment traduire un document

{% roboWikiNote {title: 'Important', type: 'warning'}%} Vous devez créer le fichier **.env** et ajouter la variable *OPENAI_KEY* avec votre clé {% endroboWikiNote %}

Si vous souhaitez traduire votre document md, vous devez exécuter la commande : 
 
```bash
npm run translate-md
```

Après avoir exécuté la commande, il vous suffit d'attendre et peut-être de vérifier les fichiers (les traductions par IA peuvent comporter des défauts).

### Dépannage des traductions

Vous pourriez rencontrer des problèmes avec les traductions.

1. Essayez d'exécuter à nouveau la commande pour voir si cela a fonctionné.

2. Parfois, les balises dans les fichiers md peuvent être écrites incorrectement, par exemple : 


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

Ensuite, il vous suffit de corriger la balise.