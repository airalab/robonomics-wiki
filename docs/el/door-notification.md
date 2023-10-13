---
title: Λάβετε ειδοποίηση όταν ανοίγει η πόρτα
contributors: [nakata5321]
tools:   
  - Home Assistant 2022.11.3
    https://github.com/home-assistant/core
---

Σε αυτό το άρθρο θα εγκαταστήσετε την ολοκλήρωση του ειδοποιητή Telegram bot και θα διαμορφώσετε μια αυτοματοποίηση, η οποία θα στέλνει στον λογαριασμό σας στο Telegram ειδοποίηση όταν ανοίγει μια πόρτα.

## Ειδοποιήσεις Telegram Bot

Πρώτα, πρέπει να δημιουργήσετε ένα προσωπικό Telegram bot. Για αυτό πηγαίνετε στο [ειδικό Telegram bot @BotFather](https://t.me/botfather) και ακολουθήστε τις οδηγίες. 
Αποθηκεύστε το τοκέν σας για πρόσβαση στο HTTP API.

<robo-wiki-video controls src="https://static.robonomics.network/wiki/bot-father.mp4" />

<robo-wiki-note type="warning">

Διατηρήστε το τοκέν **ασφαλές** και αποθηκεύστε το **ασφαλώς**, μπορεί να χρησιμοποιηθεί από οποιονδήποτε για να ελέγξει το bot σας 

</robo-wiki-note>

Επόμενο βήμα είναι να βρείτε το ***User Chat ID***. Για αυτό χρησιμοποιήστε το επόμενο [GetIdsBot](https://t.me/getidsbot). 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/get-id-bot.mp4" />

Τώρα ας εγκαταστήσουμε την ολοκλήρωση "Telegram broadcast". Αυτή η ολοκλήρωση θα στέλνει μηνύματα στο Telegram σας.

Για την προεγκατεστημένη εικόνα Robonomics, το Home Assistant Docker ή το Home Assistant Core πρέπει να επεξεργαστείτε το `configuration.yaml`. Συνδεθείτε στο Raspberry Pi σας μέσω `ssh`:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/open-config.mp4" />

<code-helper additionalLine="rasppi_username@rasppi_hostname" >

```shell
sudo -u homeassistant -H -s
cd
cd .homeassistant 
nano configuration.yaml
```

</code-helper >

Επικολλήστε τις επόμενες γαμμές στο τέλος του αρχείου. Εισαγάγετε το **bot API key** και **your User Chat ID**. Δημιουργήστε επίσης ένα όνομα για την υπηρεσία ειδοποίησής σας:


<code-helper copy >

```shell
telegram_bot:
  - platform: broadcast
    api_key: <YOUR_API_KEY>
    allowed_chat_ids:
      -  <YOUR_USER_CHAT_ID> # 123456789  example id of a user
      
notify:
  - platform: telegram
    name: <NOTIFIER_NAME>
    chat_id: <YOUR_USER_CHAT_ID>
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-config.mp4" />

**Αποθηκεύστε τη διαμόρφωση και επαναφορτώστε το Home Assistant.**


Ως αποτέλεσμα, στην υπηρεσία Home Assistant σας θα δημιουργηθεί μια υπηρεσία, η οποία θα στέλνει οποιοδήποτε μήνυμα στη συνομιλία Telegram με εσάς. 
Μπορείτε να το ελέγξετε στο μενού Εργαλεία Προγραμματιστή στη διεπαφή ιστού του Home Assistant. 

<robo-wiki-video controls src="https://static.robonomics.network/wiki/telegram-result.mp4" />

##  Ειδοποίηση Ανοιχτής Πόρτας

Τώρα είναι η στιγμή να δημιουργήσετε μια αυτοματοποίηση. Πρώτα, εισαγάγετε το πρότυπο στο Home Assistant σας από αυτόν τον σύνδεσμο:

<code-helper copy>

```shell
https://github.com/airalab/home-assistant-blueprints/blob/main/door-opened-notifications/door-notifications.yaml
```

</code-helper >

<robo-wiki-video controls src="https://static.robonomics.network/wiki/insert-blue.mp4" />

Και δημιουργήστε την αυτοματοποίηση:

<robo-wiki-video controls src="https://static.robonomics.network/wiki/create-automation.mp4" />

Τώρα θα λαμβάνετε μήνυμα από το Telegram bot κάθε φορά που ανοίγει η πόρτα.

<robo-wiki-note type="okay">
Μπορείτε να χρησιμοποιήσετε αυτήν την αυτοματοποίηση με οποιεσδήποτε πόρτες/παράθυρα στο σπίτι σας.
</robo-wiki-note>

