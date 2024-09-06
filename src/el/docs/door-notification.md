---
title: Λάβετε Ειδοποίηση Όταν Ανοίγει η Πόρτα
contributors: [nakata5321]
tools:
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Σε αυτό το άρθρο θα εγκαταστήσετε την ολοκλήρωση ειδοποίησης του Telegram bot και θα διαμορφώσετε μια αυτοματοποίηση, η οποία θα στέλνει στον λογαριασμό σας στο Telegram ειδοποίηση όταν μια πόρτα ανοίγει.

## Ειδοποιήσεις Τηλεγράφηματος Bot

Πρώτα, πρέπει να δημιουργήσετε ένα προσωπικό Telegram bot. Για αυτό, πηγαίνετε στο [ειδικό Telegram bot @BotFather](https://t.me/botfather) και ακολουθήστε τις οδηγίες.
Αποθηκεύστε το token σας για πρόσβαση στο HTTP API.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/bot-father.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

{% roboWikiNote {type: "warning"}%} Κρατήστε το token σας **ασφαλές** και αποθηκεύστε το **με ασφάλεια**, μπορεί να χρησιμοποιηθεί από οποιονδήποτε για τον έλεγχο του bot σας
{% endroboWikiNote %}

Το επόμενο βήμα είναι να βρείτε το ***ID Συνομιλίας Χρήστη*** σας. Για αυτό χρησιμοποιήστε το [GetIdsBot](https://t.me/getidsbot).

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/get-id-bot.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Τώρα ας εγκαταστήσουμε την ολοκλήρωση "Τηλεγράφημα μετάδοσης". Αυτή η ολοκλήρωση θα στέλνει μηνύματα στο Telegram σας.

Για την προεγκατεστημένη εικόνα Robonomics, το Home Assistant Docker ή το Home Assistant Core πρέπει να επεξεργαστείτε το `configuration.yaml`. Συνδεθείτε στο Raspberry Pi σας μέσω `ssh`:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/open-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}


{% codeHelper { additionalLine: "rasppi_username@rasppi_hostname"}%}

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant
nano configuration.yaml
```

{% endcodeHelper %}

Επικολλήστε τις παρακάτω γραμμές στο τέλος του αρχείου. Εισάγετε το **κλειδί API του bot** και το **ID Συνομιλίας Χρήστη σας**. Δημιουργήστε επίσης ένα όνομα για την υπηρεσία ειδοποίησης σας:


{% codeHelper { copy: true}%}

```shell
telegram_bot:
  - platform: broadcast
    api_key: <ΤΟ_API_KEY_ΣΑΣ>
    allowed_chat_ids:
      -  <ΤΟ_ID_ΣΥΝΟΜΙΛΙΑΣ_ΧΡΗΣΤΗ_ΣΑΣ> # 123456789  παράδειγμα id ενός χρήστη

notify:
  - platform: telegram
    name: <ΟΝΟΜΑ_ΕΙΔΟΠΟΙΗΤΗ>
    chat_id: <ΤΟ_ID_ΣΥΝΟΜΙΛΙΑΣ_ΧΡΗΣΤΗ_ΣΑΣ>
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-config.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

**Αποθηκεύστε τη διαμόρφωση και επαναφορτώστε το Home Assistant.**


Ως αποτέλεσμα, στην υπηρεσία Home Assistant σας θα δημιουργηθεί μια υπηρεσία, η οποία θα στέλνει οποιοδήποτε μήνυμα στη συνομιλία του Telegram μαζί σας.
Μπορείτε να το ελέγξετε στο μενού Εργαλείων Προγραμματιστή στη διεπαφή ιστού του Home Assistant.

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/telegram-result.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

##  Ειδοποίηση Ανοίγματος Πόρτας

Τώρα είναι η ώρα να δημιουργήσετε μια αυτοματοποίηση. Πρώτα, εισάγετε το πρότυπο στο Home Assistant σας από αυτόν τον σύνδεσμο:

{% codeHelper { copy: true}%}

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

{% endcodeHelper %}

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/insert-blue.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Και δημιουργήστε την αυτοματοποίηση:

{% roboWikiVideo {videos:[{src: 'https://static.robonomics.network/wiki/create-automation.mp4', type: 'mp4'}], attrs:['controls']} %}{% endroboWikiVideo %}

Τώρα θα λαμβάνετε μήνυμα από το Telegram bot κάθε φορά που ανοίγει η πόρτα.

{% roboWikiNote {type: "okay"}%} Μπορείτε να χρησιμοποιήσετε αυτήν την αυτοματοποίηση με οποιεσδήποτε πόρτες/παράθυρα στο σπίτι σας.
{% endroboWikiNote %}