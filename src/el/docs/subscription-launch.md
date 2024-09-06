---
title: Πώς να Στείλετε Εκτόξευση με Συνδρομή

contributors: [LoSk-p]
tools:
  - Robonomics 2.4.0
    https://github.com/airalab/robonomics
---

{% roboWikiNote {title:"Παρακείμενο", type: "warning"}%}Προσέξτε ότι αυτός ο οδηγός δείχνει τη χρήση μιας συνδρομής στο Parachain του Robonomics Kusama. Μπορείτε επίσης να εκτελέσετε όλα τα ίδια βήματα στον [τοπικό κόμβο](/docs/run-dev-node) σας. {% endroboWikiNote %}


Αν η διεύθυνσή σας έχει μια ενεργή συνδρομή, τότε οποιεσδήποτε συσκευές που έχουν ρυθμιστεί με το μυστικό αυτού του λογαριασμού μπορούν να στείλουν extrinsics χωρίς χρέωση.
Ας δοκιμάσουμε να στείλουμε την εντολή `launch`.

Πηγαίνετε στη σελίδα `Προγραμματιστής/Extrinsics`, επιλέξτε τον λογαριασμό σας (αυτόν από τη λίστα συσκευών) και επιλέξτε `rws -> call(subscriptionId, call)`.
Στο πεδίο `subscriptionId` επικολλήστε τη διεύθυνση του ιδιοκτήτη της συνδρομής (αυτόν που προσέφερε στο δημοπρασία) και στο επόμενο πεδίο
επιλέξτε `launch -> launch(robot, param)`. Στο πεδίο `robot` πληκτρολογήστε τη διεύθυνση στην οποία θέλετε να στείλετε τη συναλλαγή `launch`
και εισάγετε την εντολή (για περιγραφή της εντολής launch ανατρέξτε [εδώ](/docs/launch)). Στη συνέχεια υποβάλετε τη συναλλαγή:

{% roboWikiPicture {src:"docs/rws/launch.png", alt:"launch"} %}{% endroboWikiPicture %}


Τώρα πηγαίνετε στη σελίδα `Δίκτυο/Εξερευνητής`, και στην περιοχή `Πρόσφατα Γεγονότα` θα δείτε δύο γεγονότα που δημιουργήσατε: `rws.NewCall` και `launch.NewLaunch`

{% roboWikiPicture {src:"docs/rws/events.png", alt:"events"} %}{% endroboWikiPicture %}