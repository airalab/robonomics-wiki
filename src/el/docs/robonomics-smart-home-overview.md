---
title: Επισκόπηση Robonomics Smart Home

συνεισφέροντες: [Fingerling42, nakata5321]
---

## Ασφαλής IoT με Blockchain

Για το έξυπνο σπίτι σας, η σύγχρονη αγορά IoT παρέχει μια ευρεία γκάμα λύσεων. Ωστόσο, συνήθως είστε δεμένοι με κεντρικούς παροχείς νέφους ή ακριβές ιδιόκτητες πύλες. Ως αποτέλεσμα, ως χρήστης είστε πάντα εξαρτημένοι από τον προμηθευτή υλικού και υποδομής για τη λειτουργία του έξυπνου συστήματός σας. Ταυτόχρονα, το έξυπνο σπίτι σας δεν μπορεί να είναι πραγματικά έξυπνο χωρίς στατιστικά στοιχεία και αναλύσεις νέφους.

{% roboWikiVideo {videos:[{src: 'QmStCDsEHCYwVYvnDdmZBMnobPmrgZx3iJLm65b8XNzKQa', type: 'mp4'}, {src: 'QmdZKkPJCa9GEN43iUBX81jfrFTDxcn7J6wWURrwNVwcKx', type:'webm'}], attrs:['loop'], cover: "cover-3.png"} %}{% endroboWikiVideo %}

**Βλέπουμε δύο κύρια προβλήματα με τα τρέχοντα έξυπνα σπίτια:**

1. Δεν έχετε έλεγχο επί των δεδομένων που μοιράζεστε με τον προμηθευτή ή τρίτους.
2. Το έξυπνο σπίτι σας είναι ευάλωτο σε απενεργοποιήσεις των κεντρικών διακομιστών νέφους.

{% roboWikiPicture {src:"docs/home-assistant/ha-problems.png", alt:"εικόνα"} %}{% endroboWikiPicture %}

Για να λύσουμε και τα δύο προβλήματα, σας προτείνουμε να δοκιμάσετε το Robonomics, το **ασφαλές**, **ανεξάρτητο από διακομιστές** και **μελλοντικό** αποκεντρωμένο νέφος μας.

{% roboWikiPicture {src:"docs/home-assistant/ha-robonomics.png", alt:"προειδοποίηση"} %}{% endroboWikiPicture %}

## Βήματα για εταιρικό-δωρεάν νέφος

Εδώ υπάρχουν μερικά απλά βήματα για τη δημιουργία ενός οικονομικά προσιτού έξυπνου σπιτιού χρησιμοποιώντας το Home Assistant ως εφαρμογή επικοινωνίας συσκευών και το Robonomics ως εταιρικό-δωρεάν, αποκεντρωμένο πλατφόρμα νέφους. Το Robonomics εκμεταλλεύεται σύγχρονες και ασφαλείς τεχνολογίες Web3, εξασφαλίζοντας βελτιωμένη ασφάλεια κατά τη διαδικασία.

{% roboWikiPicture {src:"docs/home-assistant/robonomics-secure-blockchain-smart-home_3.png", alt:"προειδοποίηση"} %}{% endroboWikiPicture %}

## Ξεκινήστε εδώ το έξυπνο σπίτι σας

Έχουμε ετοιμάσει λεπτομερείς οδηγούς για τη δημιουργία ενός έξυπνου σπιτιού στο Robonomics. Τα βήματα μπορεί να διαφέρουν ανάλογα με τη συγκεκριμένη σας κατάσταση: εάν έχετε ήδη λειτουργικό Home Assistant με συζευγμένες συσκευές, ή αν ξεκινάτε από το μηδέν για να καθιερώσετε το έξυπνο σπίτι σας.

{% roboWikiGridWrapper {columns: '2', textAlign: center, flexible: true} %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Για χρήστες του Home Assistant", link: "/docs/sub-activate/?topic=Αναβάθμιση του λειτουργικού συστήματος Home Assistant", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
	{% roboWikiGrid %} 	{% roboWikiButton {label: "Για νέους χρήστες", link: "/docs/install-smart-home", block: true} %}{% endroboWikiButton %} {% endroboWikiGrid %}
{% endroboWikiGridWrapper %}