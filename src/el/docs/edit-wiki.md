---
title: Πώς να επεξεργαστείτε το Wiki
contributors: [positivecrash]
description: Τρόποι για να μας βοηθήσετε να βελτιώσουμε το wiki μας
---

**Το Robonomics Wiki είναι ανοιχτού κώδικα. Οποιαδήποτε διορθώσεις είναι ευπρόσδεκτες: διόρθωση σφαλμάτων, τυπογραφικών λαθών, μερικών ασαφών ή ξεπερασμένων πληροφοριών, μετάφραση σε οποιαδήποτε γλώσσα. Θα χρειαστείτε έναν λογαριασμό [GitHub](https://github.com/).**


## Πώς να επεξεργαστείτε

Αν χρειάζεστε να επεξεργαστείτε τα έγγραφα του Robonomics Wiki, παρακαλούμε ακολουθήστε αυτά τα βήματα

Βεβαιωθείτε ότι έχετε εγκαταστήσει το [Node.js](https://nodejs.org/en/download/package-manager/).

### 1. Κλωνοποίηση αποθετηρίου

Αρχικά, πρέπει να κλωνοποιήσετε το αποθετήριο του wiki:

```
git clone https://github.com/airalab/robonomics-wiki.git
```

Μεταβείτε στον κατάλογο του αποθετηρίου και εκτελέστε τις παρακάτω εντολές:

`χρησιμοποιώντας το npm`
```
cd robonomics-wiki
npm install
```

`χρησιμοποιώντας το yarn`
```
cd robonomics-wiki
yarn install
```

### 2. Εκτέλεση τοπικά (develop, develop-m1)

`η έκδοση του node πρέπει να είναι 20 || >=22`

Στη συνέχεια αναπτύξτε το έργο τοπικά:

```
npm run start
```

> μπορεί να χρειαστεί να δημιουργήσετε ένα αρχείο .env με τις ίδιες μεταβλητές με αυτές που υπάρχουν στο αρχείο .env.example

### 3. Δημιουργία PR

[Δημιουργία αιτήματος σύνδεσης](https://docs.github.com/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request)) στο [αποθετήριο wiki](https://github.com/airalab/robonomics-wiki)

## Στοιχεία

{% roboWikiNote {title:"ΠΡΟΣΑΡΜΟΣΜΕΝΑ ΣΤΟΙΧΕΙΑ", type: "προειδοποίηση"}%} Ένα **συμβουλή** κατά την προσθήκη προσαρμοσμένων στοιχείων:
Αν υπάρχει κάτι λάθος με τη διάταξη μετά την προσθήκη ενός στοιχείου, μπορείτε να ελέγξετε τα κενά. Θα βοηθήσει να **ΑΦΑΙΡΕΣΕΤΕ** τα κενά μετά το άνοιγμα της ετικέτας και το κλείσιμό της (όπως στο παράδειγμα παρακάτω){% endroboWikiNote %}


```c
{% raw %}{% roboWikiNote {title:"δοκιμή", type: "εντάξει"}%}{% endraw %} Lorem ipsum dolor sit amet.{% raw %}{% endroboWikiNote %}{% endraw %}
```

### Κώδικας

Μπορείτε να προσθέσετε χρήσιμα εξτρά στον κώδικά σας:

`κώδικας με κουμπί αντιγραφής`

```bash
{% raw %}{% codeHelper { copy: true}%}{% endraw %}

κάποιος κείμενος κώδικα
	άλλη γραμμή δοκιμής
		κάτι άλλο

{% raw %}{% endcodeHelper %}{% endraw %}
```
<br/>

ή `κώδικας με επιπλέον γραμμή`

```bash
{% raw %}{% codeHelper { additionalLine: "επιπλέον γραμμή"}%}{% endraw %}

κάποιος κείμενος κώδικα
	άλλη γραμμή δοκιμής
		κάτι άλλο

{% raw %}{% endcodeHelper %}{% endraw %}
```
</br>

**Ιδιότητες για τον βοηθό κώδικα**

| Ιδιότητα         | Τύπος| Απαιτείται | Προεπιλογή | Περιγραφή                                               |
|------------------|-----------|----------|----------|-----------------------------------------------------------|
| `copy`           | `Boolean` | `false`  | `false`  | προσθέστε ένα κουμπί αντιγραφής για τον κώδικά σας                           |
| `additionalLine` | `String`  | `false`  | ''       | επιπλέον γραμμή για τον κώδικά σας που θα εμφανίζεται πάνω  |


{% codeHelper { additionalLine: "επιπλέον γραμμή", copy: true}%}

```bash
κάποιος κείμενο κώδικα
	άλλη μια γραμμή δοκιμής
		κάτι άλλο
```

{% endcodeHelper %}


### Frontmatter
Τα έγγραφα στο Robonomics Wiki περιέχουν μπλοκ frontmatter. Πρέπει να βρίσκεται στην κορυφή του αρχείου Markdown και πρέπει να έχει τη μορφή έγκυρου YAML που βρίσκεται μεταξύ τριπλών παύλων. Μεταξύ των τριπλών παύλων, μπορείτε να ορίσετε ή να επεξεργαστείτε τις ακόλουθες επιλογές:

```YAML
---
title: Πώς να συνεισφέρετε # Τίτλος για τη σελίδα, δεν χρειάζεται να επαναληφθεί στο κείμενο
contributors: [positivecrash] # Κύριοι συνεισφέροντες (οι οποίοι επιμελούνται ενεργά αυτήν τη σελίδα). Απαιτείται το όνομα χρήστη στο GitHub, χωρίς κανένα επιπλέον σύμβολο
tools:
  - rust 1.62.0
    https://blog.rust-lang.org/2022/06/30/Rust-1.62.0.html
  - Robonomics 1.4.0
  - baxter
    http://wiki.ros.org/melodic/Installation
```    # Εργαλεία που χρησιμοποιήθηκαν για τον έλεγχο τεχνολογίας
---
```

### Πλέγμα
Βοηθά στην προσθήκη διάταξης πλέγματος στα στοιχεία:

- Χρησιμοποιήστε πρώτα το στοιχείο περιτύλιγματος πλέγματος:

```c
{% raw %} {% roboWikiGridWrapper %}{% endroboWikiGridWrapper %}{% endraw %}
```
<br/>

- Και στη συνέχεια χρησιμοποιήστε όσα στοιχεία πλέγματος επιθυμείτε μέσα στο περιτύλιγμα:

```c
{% raw %}{% roboWikiGridWrapper {columns: '3', align: center} %}
	{% roboWikiGrid %} πρώτο στοιχείο {% endroboWikiGrid %}
	{% roboWikiGrid %} δεύτερο στοιχείο {% endroboWikiGrid %}
	{% roboWikiGrid %} τρίτο στοιχείο {% endroboWikiGrid %}
{% endroboWikiGridWrapper %} {% endraw %}
```

<br/>

**Ιδιότητες για το robo-wiki-grid-wrapper**

| Ιδιότητα    | Τύπος    | Υποχρεωτικό | Προεπιλογή | Περιγραφή                                                            |
|-------------|----------|----------|---------|------------------------------------------------------------------------|
| `columns`   | `Αριθμός` | `false`  | 4       | μπορείτε να επιλέξετε αριθμό στηλών:   <br/> - από `1 έως 5`                  |
| `align`     | `Συμβολοσειρά` | `false`  |         | ευθυγράμμιση στοιχείων στον άξονα του τμήματος:   <br/> - επιλογές: `αρχή, κέντρο, τέλος` |
| `justify`   | `Συμβολοσειρά` | `false`  |         | ευθυγράμμιση στοιχείων στον ενσωματωμένο άξονα:  <br/> - επιλογές: `αρχή, κέντρο, τέλος` |
| `textAlign` | `String` | `false`  | `αριστερά`  | ευθυγράμμιση κειμένου μέσα στο πλέγμα:  <br/> - επιλογές: `αριστερά, κέντρο, δεξιά`        |

{% roboWikiGridWrapper {columns: '3', textAlign: 'κέντρο', flexible: true} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_2.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Raspberry Pi 4 (τουλάχιστον 2 GB RAM)</b>
	{% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_3.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Κάρτα SD 16GB</b> {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_7.png", alt:"need"} %}{% endroboWikiPicture %}
	<a href="https://www.zigbee2mqtt.io/information/supported_adapters.html" target="_blank"> <b> Προσαρμογέας Zigbee (Προαιρετικά) </b> </a>  {% endroboWikiGrid %}
{%endroboWikiGridWrapper %}

{% roboWikiGridWrapper {columns: '2', textAlign: 'center'} %}
	{% roboWikiGrid %} {% roboWikiPicture {src:"docs/home-assistant/need_5.png", alt:"need"} %}{% endroboWikiPicture %}
	 <a href="https://www.zigbee2mqtt.io/supported-devices/" target="_blank"> <b> Έξυπνες συσκευές Zigbee (Προαιρετικά) </b> </a>  {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiPicture {src:"docs/home-assistant/need_9.png", alt:"need"} %}{% endroboWikiPicture %}
	<b>Επιφάνεια εργασίας για τη ρύθμιση</b>  {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}


### Εικόνες

#### Πώς να μεταφορτώσετε
Μεταφορτώστε την εικόνα στον φάκελο `src/assets/docs/images/url-of-your-doc`
* Εάν η εικόνα χρειάζεται τοπική προσαρμογή, εισαγάγετε τις όλες σε έναν φάκελο
* Χρησιμοποιήστε το παράρτημα τοπικού στο όνομα των εικόνων εάν είναι τοπικοποιημένο, π.χ. `image_en.jpg`
* Βεβαιωθείτε ότι η εικόνα σας είναι βελτιστοποιημένη για το web και ταυτόχρονα φαίνεται καλή

#### Πώς να εισάγετε

Υπάρχουν δύο τρόποι για την εισαγωγή εικόνων στα έγγραφά σας:

{% roboWikiNote {type: 'warning'}%} Συνιστάται να εισάγετε εικόνες με το ενσωματωμένο ετικέτα `<robo-wiki`-εικόνα>`, μπορείτε επίσης να χρησιμοποιήσετε τον τυπικό τρόπο για αρχεία Markdown. {% endroboWikiNote %}

`με λεζάντα`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"εξερευνήστε το wiki του robomomics", link: '/docs/overview', caption: "ΕΞΕΡΕΥΝΗΣΤΕ"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ή χωρίς λεζάντα`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"εξερευνήστε το wiki του robomomics", link: '/docs/overview'} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ή απλή εικόνα`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"εξερευνήστε το wiki του robomomics"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

`ή απλή εικόνα με λεζάντα`

```c
{% raw %} {% roboWikiPicture {src:"robonomics-lab.png", alt:"εξερευνήστε το wiki του robomomics", caption: "ΕΞΕΡΕΥΝΗΣΤΕ"} %}{% endroboWikiPicture %} {% endraw %}
```

<br/>

**Ιδιότητες για την εικόνα του robo-wiki:**

| Ιδιότητα | Τύπος    | Απαιτείται | Προεπιλογή | Περιγραφή                                                                                                                                                                                                          |
|-----------|-----------|----------|---------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| `src`     | `String`  | `true`   |         | διαδρομή προς την εικόνα:  <br/> - αν ανεβάσατε την εικόνα σας απευθείας στο `/src/assets/images/docs/` χρησιμοποιήστε: `url-του-εγγράφου-σας` <br/> - αν ανεβάσατε την εικόνα σε έναν από τους φακέλους τότε χρησιμοποιήστε: `όνομα-φακέλου/url-του-εγγράφου-σας` |
| `link`    | `String`  | `false`  |         | ευθυγραμμίζει τα στοιχεία στον άξονα του τετράγωνου:   <br/> - επιλογές: `αρχή, κέντρο, τέλος`                                                                                                                                               |
| `caption` | `String`  | `false`  |         | ευθυγραμμίζει τα στοιχεία στον άξονα της γραμμής:  <br/> - επιλογές: `αρχή, κέντρο, τέλος`                                                                                                                                               |
| `alt`     | `String`  | `true`   | εικόνα | παρέχει εναλλακτικές πληροφορίες για μια εικόνα αν ένας χρήστης για κάποιο λόγο δεν μπορεί να τη δει                                                                                                                               |
| `zoom`    | `Boolean` | `false`  |         | επιμεγνύει την εικόνα                                                                                                                                                                                                           |
| `loading` | `String`  | `false`  | lazy    | υπάρχουν δύο επιλογές: lazy και eager                                                                                                                                                                                |

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

{% roboWikiNote {title: "Συμμετέχετε στο Discord", τύπος: "προειδοποίηση"}%} [Συμμετέχετε στο Discord των Προγραμματιστών Robonomics](https://discord.gg/jTxqGeF5Qy) για να συνδεθείτε με την κοινότητα και να λάβετε τεχνική υποστήριξη. {% endroboWikiNote %}

**Ιδιότητες για τη σημείωση robo-wiki**

| Ιδιότητα | Τύπος     | Απαιτείται | Προεπιλογή | Περιγραφή                                                 |
|----------|----------|----------|---------|-------------------------------------------------------------|
| `type`   | `String` | `false`  |         | - υπάρχουν συνολικά τρεις τύποι: `σημείωση`, `προειδοποίηση`, `εντάξει` |
| `title`  | `String` | `false`  |         | προσθέτει τίτλο στη σημείωσή σας                                     |


### Καρτέλες
Μπορείτε να προσθέσετε καρτέλες στο έγγραφο:

- Χρησιμοποιήστε τον συσκευαστή καρτελών:

```c
{% raw %} {% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %} {% endroboWikiTabs %} {% endraw %}
```

- Και στη συνέχεια χρησιμοποιήστε όσα στοιχεία καρτελών επιθυμείτε μέσα στον συσκευαστή:

```c
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %} %}
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
{% raw %}{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}
{% endraw %}
```

<br/>

`στοιχείο καρτέλας με περίγραμμα`

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
| `tabs`   | `Array`  | `true`   |            | - Πίνακας με τίτλους για κάθε καρτέλα                                  |
| `mode`   | `String` | `false`  | horizontal | Μπορείτε να επιλέξετε τη λειτουργία των καρτελών: <br/> - `οριζόντια` <br/> - `κάθετη` |

**Ιδιότητες για το robo-wiki-tab (στοιχείο)**

| Ιδιότητα | Τύπος      | Απαιτείται | Προεπιλογή | Περιγραφή                         |
|----------|-----------|----------|---------|-------------------------------------|
| `border` | `Boolean` | `false`  | `false` | - προσθέτει περίγραμμα στον περιέκτη περιεχομένου |


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}]} %}
	{% roboWikiTab {border: true} %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} <pre>ifconfig </pre> {% endroboWikiTab %}
{% endroboWikiTabs %}


{% roboWikiTabs {tabs: [{title: "Linux"}, {title: "OSX"}], mode: 'vertical'} %}
	{% roboWikiTab %} ip a {% endroboWikiTab %}
	{% roboWikiTab %} ifconfig {% endroboWikiTab %}
{% endroboWikiTabs %}


### Τίτλος με αγκύρωση
Μπορείτε να δημιουργήσετε προσαρμοσμένους τίτλους με αγκυρώσεις και να τους δώσετε συγκεκριμένη τιμή

`τίτλος με άγκυρα`

```c
{% raw %} {% roboWikiTitle { type: 2, anchor: 'test-anchor'} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

ή `τίτλος χωρίς άγκυρα`

```c
{% raw %} {% roboWikiTitle { type: 5} %} Robonomics Wiki {% endroboWikiTitle %} {% endraw %}
```

<br/>

{% roboWikiTitle { type: 6} %} Robonomics Wiki (προσαρμοσμένος τίτλος) {% endroboWikiTitle %}

<br/>

**Ιδιότητες για τον τίτλο του ρομπό-βίκι**

| Ιδιότητα | Τύπος                  | Απαιτείται | Προεπιλογή | Περιγραφή          |
|----------|------------------------|----------|---------|----------------------|
| `type`   | `Αριθμός (από 2 έως 6)` | `true`   |         | επιλογή επιπέδου κεφαλίδας |
| `anchor` | `Συμβολοσειρά`               | `false`  |         | τιμή για την άγκυρα |

### Βίντεο

Υπάρχουν δύο τρόποι για την εισαγωγή βίντεο στα έγγραφά σας:

{% roboWikiNote {type: "warning"}%} Συνιστάται η εισαγωγή βίντεο με την ενσωματωμένη ετικέτα `<robo-wiki-video>`, ωστόσο μπορείτε επίσης να χρησιμοποιήσετε τον τυπικό τρόπο για αρχεία Markdown. {% endroboWikiNote %}

#### IPFS / Διακομιστής
Πρέπει να καθορίσετε τη μορφή του βίντεο

```
{% raw %} {% roboWikiVideo {videos:[{src: 'QmYd1Mh2VHVyF3WgvFsN3NFkozXscnCVmEV2YG86UKtK3C', type: 'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endroboWikiVideo %} {% endraw %}

{% roboWikiNote {type: "warning", title:"Σχετικά με τις πύλες"}%} Η πύλη για τον σύνδεσμο επιλέγεται αυτόματα από το αρχείο ρύθμισης - `src/_data/video_config.js`. Μπορείτε να προσθέσετε ή να αφαιρέσετε κάποιες πύλες αλλάζοντας το αρχείο. {% endroboWikiNote %}

#### Τοπικό

```
{% raw %} {% roboWikiVideo {videos:[{src: '/videos/add-ext.mp4', type:'mp4'}], attrs:['loop', 'controls']} %}{% endroboWikiVideo %} {% endroboWikiVideo %} {% endraw %}
```

##### Ιδιότητες

- Εάν προσθέτετε ένα αρχείο με μέγεθος μεγαλύτερο από <span style="color:#af1c1c">10MB</span>, παρακαλούμε, ανεβάστε το στον διακομιστή, όχι στο αποθετήριο.

- Μπορείτε να χρησιμοποιήσετε οποιεσδήποτε ιδιότητες για την [ετικέτα video του HTML5](https://www.w3schools.com/tags/tag_video.asp).

- Αποδεκτές μορφές - mp4, webm, ogg.

| Ιδιότητα | Τύπος | Απαιτείται | Προεπιλογή | Περιγραφή |
|---|---|---|---|---|
| `videos` |`Πίνακας` | `true` |  | Πίνακας αντικειμένων [{src: `διαδρομή προς το βίντεο`, τύπος: `τύπος βίντεο`}] |


#### YouTube
Μπορείτε να ενσωματώσετε οποιοδήποτε βίντεο από το YouTube στο έγγραφο εισάγοντας τον σύνδεσμο κοινοποίησης ως ξεχωριστό παράγραφο χωρίς καμία επιπλέον εισαγωγικά ή ετικέτες, π.χ .: `https://youtu.be/kQaSwNYHJQ8`

Ωστόσο, εάν χρειάζεστε αυτόματη αναπαραγωγή, πρέπει να χρησιμοποιήσετε ειδικό στοιχείο:

```
{% raw %}{% roboWikiYoutube { link:'https://www.youtube.com/watch?v=5s4-S_z4VYE', autoplay: true} %}{% endroboWikiYoutube %}{% endraw %}
```

**Ιδιότητες για το robo-wiki-youtube**

| Ιδιότητα | Τύπος | Απαιτείται | Προεπιλογή | Περιγραφή |
|---|---|---|---|---|
| `link` | `String` | `true` |  | σύνδεσμος προς το βίντεο του YouTube |
| `autoplay` | `Boolean` | `false` | `false` | αυτόματη αναπαραγωγή του βίντεο του YouTube |
| `loop` | `Boolean` | `false` | `false` | επανάληψη του βίντεο του YouTube |


## Πώς να επεξεργαστείτε την πλοήγηση στην πλευρική μπάρα

Εάν χρειάζεστε να επεξεργαστείτε την πλοήγηση στην πλευρική μπάρα του Robonomics Wiki, παρακαλούμε, ακολουθήστε αυτά τα βήματα:

* Επεξεργασία του αρχείου `src/_data/sidebar_docs.json`.

* Αποφασίστε πού θα τοποθετήσετε το έγγραφό σας.

* Χρησιμοποιήστε έγκυρο JSON για το `src/_data/sidebar_docs.json` και βασιστείτε στουπάρχουσα δομή αρχείου

* Πρέπει να προσθέσετε νέες γραμμές στο αρχείο μετάφρασης `translations/pages/en.json`, εάν δεν έχετε μεταφράσει νέο περιεχόμενο εκ των προτέρων, π.χ:

```json
{"Εκκίνηση ρομπότ από το Cloud": "Εκκίνηση ρομπότ από το Cloud"}
```

</br>

* **ΣΗΜΑΝΤΙΚΗ ΣΗΜΕΙΩΣΗ:** εάν χρησιμοποιείτε το ίδιο έγγραφο σε διαφορετικές ενότητες/υποενότητες, π.χ:

```

{
	"title": "Αναβάθμιση Home Assistant OS",
	"children": [
	{
		"title": "Ενεργοποίηση Συνδρομής",
		"url": "/docs/sub-activate",
	}],
	"title": "Αναβάθμιση Home Assistant Docker για λειτουργικά συστήματα σαν το Unix",
		"children": [
	{
		"title": "Ενεργοποίηση Συνδρομής",
		"url": "/docs/sub-activate",
	}],
}

```

ΒΕΒΑΙΩΘΕΙΤΕ ΝΑ ΠΡΟΣΘΕΣΕΤΕ ΤΟ ΠΑΡΑΜΕΤΡΟ `topic` ΟΠΩΣ ΑΚΟΛΟΥΘΕΙ:

(για να λειτουργεί σωστά η πλοήγηση)

```
{
	"title": "Αναβάθμιση Home Assistant OS",
	"children": [
	{
		"title": "Ενεργοποίηση Συνδρομής",
		"url": "/docs/sub-activate",
		"topic": "Αναβάθμιση Home Assistant OS"
	}],
	"title": "Αναβάθμιση Home Assistant Docker για λειτουργικά συστήματα σαν το Unix",
		"children": [
	{
		"title": "Ενεργοποίηση Συνδρομής",
		"url": "/docs/sub-activate",
		"topic": "Αναβάθμιση Home Assistant Docker για λειτουργικά συστήματα σαν το Unix"
	}],
}

```

## Πώς να προσθέσετε προσαρμοσμένη πλοήγηση για έγγραφα

* Επεξεργασία αρχείου`src/_data/sidebar_docs.json`.

* Βρείτε το σωστό έγγραφο και προσθέστε παραμέτρους `prev` και `next` όπως ακολούθως:

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

* Εάν θέλετε να αφαιρέσετε εντελώς την πλοήγηση, τότε προσθέστε την παράμετρο `withoutNav`:

```
{
	"title": "Επισκόπηση",
	"url": "/docs/robonomics-smart-home-overview",
	"withoutNav": true
},
```

* Εάν θέλετε να αφαιρέσετε μόνο την πλοήγηση στην `προηγούμενη σελίδα` ή την `επόμενη σελίδα`, τότε προσθέστε την παράμετρο `withoutPrev` ή `withoutNext` αντίστοιχα:

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

{% roboWikiNote {title: 'Σημαντικό', type: 'warning'}%} Πρέπει να δημιουργήσετε **Αρχείο **.env** και προσθέστε τη μεταβλητή *OPENAI_KEY* με το κλειδί σας {% endroboWikiNote %}

Αν επιθυμείτε να μεταφράσετε το έγγραφο md σας, πρέπει να εκτελέσετε την παρακάτω εντολή:

```bash
npm run translate-md
```

{% roboWikiNote {title: 'Μετάφραση με ευκολία', type: 'warning'}%} Για να μεταφράσετε όλα μαζί, κάθε νέα γραμμή σε σελίδες, νέο έγγραφο ή τροποποιημένο έγγραφο, χρειάζεστε μόνο μία εντολή τώρα {% endroboWikiNote %}

{% codeHelper {copy: true} %}

```bash
npm run translate-all
```

{% endcodeHelper %}

> Βεβαιωθείτε ότι μεταφράζετε μόνο τα αρχεία που έχουν **ανάγκη** να μεταφραστούν. Για παράδειγμα, χρειάζεται να αλλάξετε 5 αρχεία. Τρία από αυτά περιλαμβάνουν αλλαγές κειμένου και την αφαίρεση ορισμένων παλαιών πληροφοριών. Τα άλλα δύο χρειάζεται να ενημερώσετε τους συνδέσμους για ορισμένες εικόνες ή απλά να αλλάξετε έναν εξωτερικό σύνδεσμο. Σε αυτήν την περίπτωση, θα ήταν σοφό να αλλάξετε τα πρώτα τρία αρχεία και να τα μεταφράσετε και μετά να αλλάξετε τους συνδέσμους στα άλλα δύο.

> Η μετάφραση γίνεται σε όλα τα αλλαγμένα αρχεία, αλλά δεν είναι απαραίτητη για τους ενημερωμένους συνδέσμους, ειδικά αν το αρχείο είναι μεγάλο και άρα η μετάφραση παίρνει κάποιο χρόνο.

Μετά την εκτέλεση της απαιτούμενης εντολής, όλο που χρειάζεται να κάνετε είναι να περιμένετε και ίσως να ελέγξετε τα αρχεία (οι μεταφράσεις της τεχνητής νοημοσύνης έχουν κάποιες ατέλειες). Για να ελέγξετε τα αρχεία, εκτελέστε `npm run build` και δείτε αν υπάρχουν κάποια σφάλματα.

### Αντιμετώπιση προβλημάτων μετάφρασης

Μπορεί να αντιμετωπίσετε κάποια προβλήματα με τις μεταφράσεις.

1Δοκιμάστε να εκτελέσετε ξανά την εντολή και δείτε αν λειτούργησε.

Μερικές φορές οι ετικέτες σε αρχεία md μπορεί να γραφτούν εσφαλμένα, για παράδειγμα:

```
{%raw %}
	[11ty] 1. Αντιμετωπίζετε πρόβλημα με την απεικόνιση του προτύπου njk ./src/de/docs/edit-wiki.md (μέσω TemplateContentRenderError)
	[11ty] 2. (./src/de/docs/edit-wiki.md) [Γραμμή 168, Στήλη 96]
	[11ty]   άγνωστη ετικέτα τελεστή: endroboWiki (μέσω σφάλματος απεικόνισης προτύπου)
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}{% endroboWikiPicture {% endroboWikiPicture %}
{% endraw %}

{%raw %}
	{% roboWikiPicture {src:"docs/datalog/extrinsics.jpg", alt:"extrinsics"} %}endroboWikiPicture %}
{% endraw %}
```

Στη συνέχεια, απλά χρειάζεται να διορθώσετε την ετικέτα.