---
title: Πώς να επεξεργαστείτε το Wiki
contributors: [positivecrash]
description: Τρόποι για να μας βοηθήσετε να βελτιώσουμε το wiki μας
---

**Το Robonomics Wiki είναι ανοικτού κώδικα. Οποιεσδήποτε διορθώσεις είναι ευπρόσδεκτες: διόρθωση σφαλμάτων, τυπογραφικών λαθών, μη ξεκάθαρων ή ξεπερασμένων πληροφοριών, μετάφραση σε οποιαδήποτε γλώσσα. Θα χρειαστείτε έναν λογαριασμό [GitHub](https://github.com/).**


## Πώς να επεξεργαστείτε

Αν χρειάζεστε να επεξεργαστείτε τα έγγραφα του Robonomics Wiki, παρακαλούμε, ακολουθήστε αυτά τα βήματα

Βεβαιωθείτε ότι έχετε εγκαταστήσει το [Node.js](https://nodejs.org/en/download/package-manager/).

### 1. Κλωνοποίηση αποθετηρίου

Αρχικά, πρέπει να κλωνοποιήσετε το αποθετήριο του wiki:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Μεταβείτε στον κατάλογο του αποθετηρίου και εκτελέστε τις παρακάτω εντολές:

`χρησιμοποιώντας npm`
```
cd robonomics-wiki
npm install
```

`χρησιμοποιώντας yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Εκτέλεση τοπικά (develop, develop-m1)

`Το node πρέπει να είναι >= v18`

Στη συνέχεια, αναπτύξτε το έργο τοπικά:

```
npm run start
```

### 3. Δημιουργία PR

[Δημιουργία αιτήματος σύρσης](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)στο [αποθετήριο wiki](https://github.com/airalab/robonomics-wiki)

## Συστατικά

{% roboWikiNote {title:"ΠΡΟΣΑΡΜΟΣΜΕΝΑ ΣΥΣΤΑΤΙΚΑ", type: "προειδοποίηση"}%} Ένα **συμβουλή** κατά την προσθήκη προσαρμοσμένων συστατικών:
Αν υπάρχει κάτι λάθος με τη διάταξη μετά την προσθήκη ενός συστατικού, μπορείτε να ελέγξετε τα κενά. Θα βοηθήσει να **ΑΦΑΙΡΕΣΕΤΕ** τα κενά μετά το άνοιγμα της ετικέτας και το κλείσιμό της (όπως στο παράδειγμα παρακάτω){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"test", type: "okay"}%}{% endraw %} Το Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Κώδικας

Μπορείτε να προσθέσετε χρήσιμα εξτρά στον κώδικά σας:

`κώδικας με κουμπί αντιγραφής`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

κάποιος κώδικας κειμένου
	άλλη γραμμή δοκιμής
		κάτι άλλο

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

ή `κώδικας με επιπλέον γραμμή`

```bash
{% raw %}{% codeHelper { additionalLine: "επιπλέον γραμμή"}%}{% endraw %}

κάποιος κώδικας κειμένου
	άλλη γραμμή δοκιμής
		κάτι άλλο

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Ιδιότητες για τον βοηθό κώδικα**

| Ιδιότητα        | Τύπος     | Απαιτείται | Προεπιλογή | Περιγραφή                                                |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | προσθέτει ένα κουμπί αντιγραφής για τον κώδικά σας    |
| `additionalLine` | `String`  | `false`  | ''       | επιπλέον γραμμή για τον κώδικά σας που θα εμφανίζεται πάνω |

{% codeHelper { additionalLine: "επιπλέον γραμμή", copy: true}%}

```bash
κάποιος κώδικας κειμένου
	άλλη γραμμή δοκιμής
		κάτι άλλο
```

{% endcodeHelper %}### Frontmatter
Τα έγγραφα στο Robonomics Wiki περιέχουν μπλοκ frontmatter. Πρέπει να βρίσκεται στην κορυφή του αρχείου Markdown και πρέπει να έχει τη μορφή έγκυρου YAML που βρίσκεται μεταξύ τριπλών παύλων. Μεταξύ των τριπλών παύλων, μπορείτε να ορίσετε ή να επεξεργαστείτε τις ακόλουθες επιλογές:

```YAML
---
title: Πώς να συνεισφέρετε # Τίτλος για τη σελίδα, δεν χρειάζεται να επαναληφθεί στο κείμενο
contributors: [positivecrash] # Κύριοι συνεισφέροντες (οι οποίοι επιμελούνται ενεργά αυτήν τη σελίδα). Απαιτείται ψευδώνυμο GitHub, χωρίς κανένα επιπλέον σύμβολο
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
    # Εργαλεία που χρησιμοποιήθηκαν για τον έλεγχο της τεχνολογίας
---
```

### Grid
Βοηθά στην προσθήκη διατάξεων πλέγματος στα στοιχεία:

- Χρησιμοποιήστε πρώτα τον συσκευαστή πλέγματος:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Και στη συνέχεια χρησιμοποιήστε όσα στοιχεία πλέγματος επιθυμείτε μέσα στον συσκευαστή:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} πρώτο στοιχείο {% endroboWikiGrid %}
	{% roboWikiGrid %} δεύτερο στοιχείο {% endroboWikiGrid %}
	{% roboWikiGrid %} τρίτο στοιχείο {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}{% endraw %}
``````html
{% roboWikiGridWrapper %}
	{% roboWikiGrid %} second element {% endroboWikiGrid %}
	{% roboWikiGrid %} third element {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}
```

<br/>

**Ιδιότητες για το robo-wiki-grid-wrapper**

| Ιδιότητα    | Τύπος    | Υποχρεωτικό | Προεπιλογή | Περιγραφή                                                            |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Αριθμός` | `false`  | 4       | μπορείτε να επιλέξετε τον αριθμό στηλών:   <br/> - από `1 έως 5`                  |
| `align`     | `Συμβολοσειρά` | `false`  |         | ευθυγράμμιση στοιχείων στον άξονα του τμήματος:   <br/> - επιλογές: `start, center, end` |
| `justify`   | `Συμβολοσειρά` | `false`  |         | ευθυγράμιση στοιχείων στον ενσωματωμένο άξονα:  <br/> - επιλογές: `start, center, end` |
| `textAlign` | `Συμβολοσειρά` | `false`  | `left`  | ευθυγράμιση κειμένου μέσα στο πλέγμα:  <br/> - επιλογές: `left, center, right`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'center', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (τουλάχιστον 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Κάρτα SD 16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Προσαρμογέας Zigbee (Προαιρετικά) </b> </a>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Έξυπνες συσκευές Zigbee (Προαιρετικά) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %}{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Επιφάνεια εργασίας για ρύθμιση</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Εικόνες

#### Πώς να μεταφορτώσετε
Μεταφορτώστε την εικόνα στον φάκελο `src/assets/docs/images/url-of-your-doc`
* Εάν η εικόνα χρειάζεται τοπικοποίηση, εισαγάγετε τις όλες σε έναν φάκελο
* Χρησιμοποιήστε παράρτημα τοπικοποίησης στο όνομα των εικόνων αν είναι τοπικοποιημένες, π.χ. `image_en.jpg`
* Βεβαιωθείτε ότι η εικόνα σας είναι βελτιστοποιημένη για το web και ταυτόχρονα φαίνεται καλή

#### Πώς να εισάγετε

Υπάρχουν δύο τρόποι για την εισαγωγή εικόνων στα έγγραφά σας:

{% roboWikiNote {type: 'warning'}%} Συνιστάται η εισαγωγή εικόνων με την ενσωματωμένη ετικέτα `<robo-wiki-picture>`, ωστόσο μπορείτε επίσης να χρησιμοποιήσετε τον τυπικό τρόπο για τα αρχεία Markdown. {% endroboWikiNote %}

`με λεζάντα`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki", link: '/docs/overview', caption: "EXPLORE"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ή χωρίς λεζάντα`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"explore robomomics wiki",link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ή απλή εικόνα`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"εξερευνήστε το wiki του robomomics"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ή απλή εικόνα με λεζάντα`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"εξερευνήστε το wiki του robomomics", caption: "ΕΞΕΡΕΥΝΗΣΗ"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Ιδιότητες για το robo-wiki-picture:**

| Ιδιότητα  | Τύπος     | Απαιτείται | Προεπιλογή | Περιγραφή                                                                                                                                                                                                          |
|-----------|-----------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | διαδρομή προς την εικόνα:  <br/> - αν ανεβάσατε την εικόνα σας απευθείας στο `/src/assets/images/docs/` χρησιμοποιήστε: `url-του-έγγραφός-σας` <br/> - αν ανεβάσατε την εικόνα σε έναν από τους φακέλους τότε χρησιμοποιήστε: `όνομα-φακέλου/url-του-έγγραφός-σας` |
| `link`    | `String`  | `false`  |         | ευθυγραμμίζει τα στοιχεία στον άξονα του τμήματος:   <br/> - επιλογές: `αρχή, κέντρο, τέλος`                                                                                                                                               |`λεζάντα` | `Συμβολοσειρά` | `ψευδής` |         | ευθυγράμμιση στον άξονα ενσωμάτωσης:  <br/> - επιλογές: `αρχή, κέντρο, τέλος`                                                                                                                                               |
| `εναλλακτικό`     | `Συμβολοσειρά`  | `αληθής`   | εικόνα | παρέχει εναλλακτικές πληροφορίες για μια εικόνα αν για κάποιο λόγο ο χρήστης δεν μπορεί να τη δει                                                                                                                               |
| `μεγέθυνση`    | `Λογική` | `Ϩεύθυν`  |         | μεγέθυνση εικόνας                                                                                                                                                                                                           |
| `φόρτωση` | `Συμβολοσειρά`  | `ψευδής`  | τεμπέλης    | υπάρχουν δύο επιλογές: τεμπέλης και ενθουσιώδης                                                                                                                                                                                |

### Σημειώσεις & προειδοποιήσεις
Μπορείτε να προσθέσετε σημειώσεις και να τους δώσετε συγκεκριμένους τύπους:
* προειδοποίηση (<span style="color:#f08432">**με εικόνα**</span>)
* εντάξει (<span style="color:#3eaf7c">**πράσινο χρώμα**</span>)
* σημείωση (<span style="color:#90a4b7">**γκρι χρώμα**</span>)

`σημείωση με τίτλο`

```c
{% raw %} {% roboWikiNote {title:"ΠΑΡΑΔΕΙΓΜΑ ΤΙΤΛΟΥ", type: "εντάξει"}%} {% endroboWikiNote %} {% endraw%}
```

<br/>

`σημείωση με περιεχόμενο`

```c
{% raw %} {% roboWikiNote {type: "εντάξει"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %}  {% endraw%}
```

<br/>

`σημείωση με τίτλο και περιεχόμενο`

```c
{% raw %} {% roboWikiNote {title: "ΤΙΤΛΟΣ", type: "εντάξει"}%} Lorem ipsum dolor sit amet.  {% endroboWikiNote %} {% endraw%}
```

<br/>

{% roboWikiNote {title: "Συμμετοχή στο Discord", type: "εντάξει"}%} [Συμμετέχετε στο Discord των Προγραμματιστών Robonomics](https://discord.gg/jTxqGeF5Qy) για να συνδεθείτε με την κοινότητα και να λάβετε τεχνική υποστήριξη. {% endroboWikiNote %}

{% roboWikiNote {title: "Συμμετοχή στο Discord"}%} [Συμμετέχετε στο Discord των Προγραμματιστών Robonomics](https://discord.gg/jTxqGeF5Qy) για να συνδεθείτε με την κοινότητα και να λάβετε τεχνική υποστήριξη. {% endroboWikiNote %}

{% roboWikiNote {title: "Συμμετοχή στο Discord", type: "προειδοποίηση"}%} [Συμμετέχετε στο Discord των Προγραμματιστών Robonomics](https://discord.gg/jTxqGeF5Qy) για να συνδεθείτε με την κοινότητα και να λάβετε τεχνική υποστήριξη. {% endroboWikiNote %}

**Ιδιότητες για το robo-wiki-note**

| Ιδιότητα | Τύπος     | Απαιτείται | Προεπιλογή | Περιγραφή                                                 |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `false`  |         | - υπάρχουν συνολικά τρία είδη: `σημείωση`, `προειδοποίηση`, `εντάξει` |
| `title`  | `String`` | `false`  |         | προσθέτει τίτλο στη σημείωσή σας                                     |


### Καρτέλες
Μπορείτε να προσθέσετε καρτέλες στο έγγραφο:

- Χρησιμοποιήστε τον διακεκομμένο συσκευαστή καρτελών:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Και στη συνέχεια χρησιμοποιήστε όσα στοιχεία καρτελών επιθυμείτε μέσα στον διακεκομμένο συσκευαστή:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`οριζόντιες καρτέλες`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`κατακόρυφες καρτέλες`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}],```el
mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`tab item with border`

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}] %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

**Ιδιότητες για το robo-wiki-tabs (περιτύλιγμα)**

| Ιδιότητα | Τύπος    | Απαιτείται | Προεπιλογή | Περιγραφή                                                       |
|----------|----------|----------|------------|-------------------------------------------------------------------|
| `tabs`   | `Πίνακας`  | `true`   |            | - Πίνακας με τίτλους για κάθε καρτέλα                           |
| `mode`   | `Συμβολοσειρά` | `false`  | οριζόντια | μπορείτε να επιλέξετε τη λειτουργία των καρτελών: <br/> - `οριζόντια` <br/> - `κατακόρυφη` |

**Ιδιότητες για το robo-wiki-tab (στοιχείο)**

| Ιδιότητα | Τύπος      | Απαιτείται | Προεπιλογή | Περιγραφή                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Λογικό` | `false`  | `false` | - προσθέστε περιθώριο στον περιέκτη περιεχομένου |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Τίτλος με αγκύρωση
Μπορείτε να δημιουργήσετε προσαρμοσμένους τίτλους με αγκύρωση και να τους δώσετε συγκεκριμένη τιμή

`τίτλος με αγκύρωση`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

ή `τίτλος χωρίς αγκύρωση`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (προσαρμοσμένος τίτλος) {% endroboWikiTitle %}%}

<br/>

**Ιδιότητες για τον τίτλο του ρομπότ-βικι**

| Ιδιότητα | Τύπος                   | Απαιτείται | Προεπιλογή | Περιγραφή          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Αριθμός (από 2 έως 6)` | `true`   |         | επιλέξτε επίπεδο κεφαλίδας |
| `anchor` | `Συμβολοσειρά`               | `false`  |         | τιμή για το άγκυρα |

### Βίντεο

Υπάρχουν δύο τρόποι για την εισαγωγή βίντεο στα έγγραφά σας:

{% roboWikiNote {type: "warning"}%} Συνιστάται η εισαγωγή βίντεο με την ενσωματωμένη ετικέτα `<robo-wiki-video>`, ωστόσο μπορείτε επίσης να χρησιμοποιήσετε τον τυπικό τρόπο για αρχεία Markdown. {% endroboWikiNote %}

#### IPFS / Διακομιστής
Πρέπει να καθορίσετε τη μορφή του βίντεο

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```


{% roboWikiNote {type: "warning", title:"Σχετικά με τις πύλες"}%} Η πύλη για τον σύνδεσμο επιλέγεται αυτόματα από το αρχείο ρύθμισης - `src/_data/video_config.js`. Μπορείτε να προσθέσετε ή να αφαιρέσετε κάποιες πύλες αλλάζοντας το.file. {% endroboWikiNote %}


#### Τοπικό

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endraw %}
```

##### Ιδιότητες

- Εάν προσθέτετε ένα αρχείο με μέγεθος μεγαλύτερο από <span style="color:#af1c1c">10MB</span>, παρακαλούμε, ανεβάστε το στον διακομιστή, όχι στο αποθετήριο.

- Μπορείτε να χρησιμοποιήσετε οποιεσδήποτε ιδιότητες για την [ετικέτα video του HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Αποδεκτές μορφές - mp4, webm, ogg.

| Ιδιότητα | Τύπος | Απαιτείται | Προεπιλογή | Περιγραφή |
|---|---|---|---|---|
| `videos` | `Πίνακας` | `true` |  | Πίνακας αντικειμένων [{src: `διαδρομή προς το video`, type: `τύπος του video`}] |


#### YouTube
Μπορείτε να ενσωματώσετε οποιοδήποτε βίντεο από το YouTube στο έγγραφο εισάγοντας τον σύνδεσμο κοινοποίησης ως ξεχωριστό παράγραφο χωρίς καμία επιπλέον εισαγωγή ή ετικέτες, π.χ.: `https://youtu.be/kQaSwNYHJQ8`

Ωστόσο, εάν χρειάζεστε αυτόματη αναπαραγωγή, πρέπει να χρησιμοποιήσετε ειδικό στοιχείο:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{%endroboWikiYoutube %}{% endraw %}
```

**Ιδιότητες για το robo-wiki-youtube**

| Ιδιότητα | Τύπος | Απαιτείται | Προεπιλογή | Περιγραφή |
|---|---|---|---|---|
| `link` | `String` | `true` |  | σύνδεσμος προς βίντεο στο YouTube |
| `autoplay` | `Boolean` | `false` | `false` | αυτόματη αναπαραγωγή του βίντεο στο YouTube |
| `loop` | `Boolean` | `false` | `false` | επανάληψη του βίντεο στο YouTube |


## Πώς να επεξεργαστείτε την πλοήγηση στην πλευρική μπάρα

Εάν χρειάζεστε να επεξεργαστείτε την πλοήγηση στην πλευρική μπάρα του Robonomics Wiki, παρακαλούμε, ακολουθήστε αυτά τα βήματα:

* Επεξεργασία του αρχείου `src/_data/sidebar_docs.json`.

* Αποφασίστε πού θα τοποθετήσετε το έγγραφό σας.

* Χρησιμοποιήστε έγκυρο JSON για το `src/_data/sidebar_docs.json` και βασιστείτε στην υπάρχουσα δομή του αρχείου.

* **ΣΗΜΑΝΤΙΚΗ ΣΗΜΕΙΩΣΗ:** εάν χρησιμοποιείτε το ίδιο έγγραφο σε διαφορετικές ενότητες/υποενότητες, π.χ:

```

{
	"title": "Αναβάθμιση Home Assistant OS",
	"children": [
	{
		"title": "Ενεργοποίηση Συνδρομής",
		"url": "/docs/sub-activate",
	}],
	"title": "Αναβάθμιση Home Assistant Docker για λειτουργικά συστήματα σαν Unix",
		"children": [
	{
		"title": "Ενεργοποίηση Συνδρομής",
		"url": "/docs/sub-activate",
	}],
}

```

ΒΕΒΑΙΩΘΕΙΤΕ ΟΤΙ ΠΡΟΣΘΕΤΕΤΕ ΤΗΝ ΠΑΡΑΜΕΤΡΟ `topic` ΜΕ ΑΥΤΟΝ ΤΟΝ ΤΡΟΠΟ:

(για να λειτουργεί σωστά η πλοήγηση)```
{
	"title": "Αναβάθμιση του Home Assistant OS",
	"children": [
	{
		"title": "Ενεργοποίηση Συνδρομής",
		"url": "/docs/sub-activate",
		"topic": "Αναβάθμιση του Home Assistant OS"
	}],
	"title": "Αναβάθμιση του Home Assistant Docker για λειτουργικά συστήματα σαν το Unix",
		"children": [
	{
		"title": "Ενεργοποίηση Συνδρομής",
		"url": "/docs/sub-activate",
		"topic": "Αναβάθμιση του Home Assistant Docker για λειτουργικά συστήματα σαν το Unix"
	}],
}

```

## Πώς να προσθέσετε προσαρμοσμένη πλοήγηση για τα έγγραφα

* Επεξεργασία του αρχείου `src/_data/sidebar_docs.json`.

* Βρείτε το σωστό έγγραφο και προσθέστε τις παραμέτρους `prev` και `next` όπως παρακάτω:

```
	{
		"title": "Επισκόπηση",
		"url": "/docs/robonomics-smart-home-overview",
		"next": [
			{
				"title": "Προσθήκη Χρήστη",
				"url": "/docs/add-user"
			}
		],
		"prev": [
			{
				"title": "Προσθήκη Χρήστη",
				"url": "/docs/add-user"
			}
		],
	},

```

* Αν θέλετε να αφαιρέσετε εντελώς την πλοήγηση, τότε προσθέστε την παράμετρο `withoutNav`:

```
{
	"title": "Επισκόπηση",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```Απλή πλοήγηση `προηγούμενη σελίδα` ή `επόμενη σελίδα` με την προσθήκη παραμέτρου `withoutPrev` ή `withoutNext`:

```
{
	"title": "Επισκόπηση",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutPrev": true
},
```

ή

```
{
	"title": "Επισκόπηση",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNext": true
},
```


## Πώς να μεταφράσετε ένα έγγραφο

{% roboWikiNote {title: 'Σημαντικό', type: 'προειδοποίηση'}%} Πρέπει να δημιουργήσετε το αρχείο **.env** και να προσθέσετε τη μεταβλητή *OPENAI_KEY* με το κλειδί σας {% endroboWikiNote %}

Εάν επιθυμείτε να μεταφράσετε το έγγραφό σας md, πρέπει να εκτελέσετε την εντολή:

```bash
npm run translate-md
```

Μετά την εκτέλεση της εντολής, όλο που χρειάζεται να κάνετε είναι να περιμένετε και ίσως να ελέγξετε τα αρχεία (οι μεταφράσεις ai έχουν κάποιες ατέλειες).

### Αντιμετώπιση προβλημάτων μεταφράσεων

Μπορεί να αντιμετωπίσετε κάποια προβλήματα με τις μεταφράσεις.

1. Δοκιμάστε να εκτελέσετε ξανά την εντολή και δείτε αν λειτούργησε.

2. Μερικές φορές οι ετικέτες στα αρχεία md μπορεί να γραφτούν εσφαλμένα, για παράδειγμα:


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

Στη συνέχεια, απλά χρειάζεται να διορθώσετε την ετικέτα.