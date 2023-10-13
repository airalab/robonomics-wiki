---
title: Πώς να στείλετε εκτέλεση με συνδρομή

contributors: [LoSk-p]
tools:   
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

<robo-wiki-note type="warning" title="Parachain">

  Προσέξτε ότι αυτός ο οδηγός δείχνει πώς να χρησιμοποιήσετε μια συνδρομή στο Robonomics Kusama parachain. Μπορείτε επίσης να εκτελέσετε όλα τα ίδια βήματα στον [τοπικό κόμβο](/docs/run-dev-node) σας.

</robo-wiki-note>

Εάν η διεύθυνσή σας έχει μια ενεργή συνδρομή, τότε οποιεσδήποτε συσκευές που έχουν ρυθμιστεί με το μυστικό αυτού του λογαριασμού μπορούν να στείλουν extrinsics χωρίς χρέωση. 
Ας δοκιμάσουμε να στείλουμε την εντολή `launch`.

Πηγαίνετε στη σελίδα `Developer/Extrinsics`, στη συνέχεια επιλέξτε τον λογαριασμό σας (από τη λίστα συσκευών) και επιλέξτε `rws -> call(subscriptionId, call)`. 
Στο πεδίο `subscriptionId` επικολλήστε τη διεύθυνση του ιδιοκτήτη της συνδρομής (αυτός που προσέφερε στη δημοπρασία) και στο επόμενο πεδίο επιλέξτε `launch -> launch(robot, param)`. Στο πεδίο `robot` πληκτρολογήστε τη διεύθυνση στην οποία θέλετε να στείλετε τη συναλλαγή `launch` και εισαγάγετε την εντολή (για περιγραφή της εντολής launch ανατρέξτε [εδώ](/docs/launch)). Στη συνέχεια υποβάλετε τη σναλλαγή:

![launch](../images/rws/launch.png)


Τώρα πηγαίνετε στη σελίδα `Network/Explorer` και στην περιοχή `Recent Events` θα δείτε δύο γεγονότα που δημιουργήσατε· `rws.NewCall` και `launch.NewLaunch`:

![events](../images/rws/events.png)
