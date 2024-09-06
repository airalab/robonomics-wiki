---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Introduzione

Robonomics ha spostato il modello di governance della parachain al sofisticato meccanismo OpenGov di Polkadot che consente alla catena di evolversi nel tempo, sotto il controllo finale dei detentori di token.
La transizione di Robonomics a OpenGov garantisce che il DAO detentore di token, che controlla la maggioranza delle quote, possa sempre comandare la direzione della parachain di Robonomics, attuando qualsiasi cambiamento alla rete che ritengano opportuno.

{% roboWikiNote {title:"Nota:", type: "avviso"}%} OpenGov è applicabile solo alla Robonomics Parachain, che è una catena basata su Substrate collegata alla Kusama Relay Chain. OpenGov non è applicabile all'implementazione di Robonomics su Ethereum, poiché la mainnet di Ethereum attualmente non supporta sistemi di governance sofisticati come OpenGov {% endroboWikiNote %}

OpenGov cambia il modo in cui vengono gestite le operazioni quotidiane e le decisioni sulla parachain. Fornisce maggiore chiarezza riguardo all'ambito dei referendum e ha il potenziale per aumentare drasticamente il numero di decisioni prese sulla parachain.

OpenGov è attivo sulla relay chain di Kusama da alcuni mesi al momento della stesura di questo testo, e ha dimostrato di aumentare notevolmente il numero di decisioni (referendum individuali e discreti) che il DAO detentore di token può proporre, votare e, attraverso il voto, controllare alla fine la direzione del protocollo.

**Il contenuto seguente contenuto in questa sezione della wiki esaminerà i principi fondamentali di OpenGov sulla parachain di Robonomics e mira ad aiutarti a comprendere meglio i concetti dietro OpenGov.**

*È importante notare che la governance è un meccanismo in costante evoluzione nel protocollo, specialmente nelle fasi iniziali di implementazione.*

Per coloro interessati esclusivamente ai parametri del Track OpenGov di Robonomics, vedere [qui](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## Riguardo ai Referendum

I referendum sono schemi di voto semplici, inclusivi e basati sulle quote. Ogni referendum ha associata una proposta specifica che assume la forma di una chiamata di funzione privilegiata nell'esecuzione delle catene. Questo può includere anche la chiamata più potente `set_code`, che ha la capacità di sostituire l'intero codice diIl tempo di esecuzione delle catene - questo è unico per le catene basate su Substrate e rimuove il requisito di un "hard fork" della catena durante l'aggiornamento della logica aziendale delle catene (tempo di esecuzione).

I referendum sono eventi discreti che hanno un periodo di voto fisso (più informazioni sui diversi periodi durante il ciclo di vita di un referendum in seguito). I singoli detentori di token possono votare in uno dei tre modi sui referendum - AYE (accordo/sì), NAY (disaccordo/no), o ASTENERSI dal voto del tutto.

Tutti i referendum hanno un ritardo di promulgazione associato. Questo è il periodo tra la fine del referendum e, assumendo che il referendum sia stato approvato, l'attuazione dei cambiamenti sulla rete.

{% roboWikiNote {title:"Nota:", type: "avviso"}%} C'è un Periodo Minimo di Attuazione specificamente impostato per ciascun diverso tipo di Origine, ma l'originatore di un particolare referendum può impostare che i compiti specifici di quel referendum vengano eseguiti molti blocchi nel futuro {% endroboWikiNote %}

I referendum sono considerati "cotti" se sono chiusi e i voti sono conteggiati. Presumendo che il referendum sia stato approvato, sarà pianificato per l'attuazione (nel programmatore delle catene). I referendum sono considerati "non cotti" se l'esito è in sospeso - come ad esempio se il referendum è ancora in corso di votazione.

Con l'aggiunta di OpenGov, chiunque può avviare un referendum in qualsiasi momento, e può farlo quante volte desidera. OpenGov rimuove il limite di poter processare solo 1 referendum alla volta (nota che, in Gov v1, solo 1 referendum può essere votato alla volta. L'unica eccezione è rappresentata da ulteriori referendum di emergenza del Comitato Tecnico accelerato che possono anche essere votati simultaneamente dalla comunità).

OpenGov introduce diverse nuove funzionalità/concetti noti come Origini e Tracce, e questi sono introdotti per aiutare nel flusso e nell'elaborazione dei referendum nel protocollo.

Ogni Origine è associata a una singola classe di referendum, e ogni classe è associata a una traccia. La traccia delinea il ciclo di vita del referendum ed è specifica per quella particolare Origine da cui il referendum ha origine. Avere tracce con i propri parametri specifici consente alla rete di modificare dinamicamente il ciclo di vita dei referendum in base al loro livello di privilegio (puoi pensare al livello di privilegio come a quanto potente può essere un referendum / quali tipi di cambiamenti può apportare al protocollo).

*Pensa alle Origini come al potere associato a un referendum, e pensa alle Tracce comeI parametri di voto associati a un referendum, come la durata dei suoi periodi e i criteri di Approvazione e Supporto.*

Ad esempio, un aggiornamento in tempo reale non ha le stesse implicazioni per il protocollo come un piccolo suggerimento di tesoreria, e quindi sono necessarie origini diverse in cui saranno predeterminate diverse partecipazioni, approvazioni, depositi e periodi di promulgazione (Tracce) nelle palette delle catene.

## Proporre un Referendum e Ciclo di Vita del Referendum

### Periodo di Preparazione

In OpenGov, quando un referendum viene creato inizialmente, può essere immediatamente votato dalla comunità dei detentori di token. Tuttavia, non è immediatamente in uno stato in cui può terminare, o altrimenti avere i suoi voti contati, essere approvato e promulgato sommariamente. Invece, i referendum devono soddisfare una serie di criteri prima di essere spostati nel Periodo Decisionale. Fino a quando i referendum non entrano nel Periodo Decisionale, rimarranno indecisi - e alla fine scadranno dopo il periodo di vita complessivo specificato nella traccia individuale.

{% roboWikiPicture {src:"docs/robonomics-opengov/1.jpeg", alt:"immagine"} %}{% endroboWikiPicture %}

I criteri per un referendum per entrare nel Periodo Decisionale sono i seguenti:
1. Un Periodo di Preparazione che stabilisce la quantità di tempo che deve trascorrere prima che il Periodo Decisionale possa iniziare. Questo Periodo di Preparazione aiuta a mitigare la possibilità di "decisione a sorpresa" in cui un attaccante che controlla una quantità sostanziale di potere di voto potrebbe cercare di utilizzare la propria grande quota per far passare un referendum immediatamente dopo la proposta, eludendo la possibilità per gli altri membri del DAO detentori di token di avere il tempo adeguato per considerare il referendum e partecipare al voto. Ecco perché le Origini con livelli di privilegio più elevati hanno Periodi di Preparazione significativamente più lunghi.

2. Deve esserci spazio per la decisione. Ogni traccia ha i propri limiti per la quantità di referendum che possono essere decisi simultaneamente (max_deciding). Le tracce che hanno livelli di privilegio più elevati avranno limiti inferiori. Ad esempio, l'origine di livello Root avrà un numero significativamente inferiore di referendum che possono essere decisi simultaneamente rispetto alle origini di livello di privilegio inferiore come l'origine di Small Tipper.

3. Il Deposito Decisionale deve essere presentato. Creare inizialmente un referendum è piuttosto economico, e il valore del Deposito di Presentazione (riservato quando il referendum viene creato inizialmente) è piuttosto basso, ed è principalmente composto dal valore che costa per lo storage on-chain associato al referendum. I Depositi Decisionali sono significativamente più alti, il che è richiesto per contrastare lo spam., e gioca nel gioco economico che OpenGov porta, di cui parleremo più avanti.

Una volta soddisfatti tutti e tre i criteri sopra citati, il referendum passerà al Periodo Decisionale. I voti sul referendum verranno quindi conteggiati per determinarne l'esito.

### Periodo Decisionale

*Per una rapida dimostrazione video del Periodo Decisionale, guarda [questo video](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Una volta che un referendum ha soddisfatto tutti i criteri dettagliati nella sezione precedente, entrerà nel Periodo Decisionale.

Il Periodo Decisionale ruota attorno a due concetti principali, ovvero l'Approvazione e il Supporto.

L'Approvazione è definita come la quota del peso del voto di approvazione (SI vs NO) rispetto al peso totale del voto (tutti i voti SI e NO combinati). La convinzione di ciascun voto contribuisce al peso complessivo dei voti SI/NO (più dettagli sul voto di convinzione / blocco volontario in una sezione successiva).

Il Supporto è il numero totale di voti (token) che hanno partecipato al referendum (e non viene aggiustato per la convinzione) rispetto al totale dei voti possibili che potrebbero essere espressi nel sistema (pensa a questo come all'emissione totale di XRT sulla parachain - notevolmente, la fornitura circolante totale di XRT non è il fattore principale qui, a causa del fatto che una parte di quel numero esiste su Ethereum come token ERC-20).

**I voti che sono nella direzione ASTENERSI NON contribuiscono ai criteri di Approvazione, ma sono inclusi / contano verso i criteri di Supporto**

Un referendum deve soddisfare i criteri di Supporto E Approvazione durante il Periodo Decisionale per poter progredire al Periodo di Conferma.

Per i dettagli dei singoli criteri di Supporto e Approvazione per ciascuna traccia, consulta questo [foglio di calcolo](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Periodo di Conferma

Ogni traccia ha una durata specifica per il suo Periodo di Conferma. Le tracce con livelli di privilegio più elevati (come Root) hanno Periodi di Conferma significativamente più lunghi rispetto a quelli con livelli di privilegio più bassi (come Small Tipper).

I referendum devono continuare a soddisfare i criteri di Approvazione e Supporto per l'intera durata del Periodo di Conferma, altrimenti torneranno nuovamente al Periodo Decisionale (nota: il Periodo Decisionale non viene messo in pausa durante il Periodo di Conferma, quindi è del tutto possibile cheUn Periodo Decisionale può scadere durante il Periodo di Conferma, il che significa che se un referendum viene spostato fuori dal Periodo di Conferma perché non soddisfa più i criteri di Approvazione e Supporto, sarà considerato un referendum fallito e non attuato).

**È possibile regolare i criteri di Approvazione e Supporto per singole tracce tramite un referendum con privilegi di Origine Radice.**

Le origini con livelli di privilegio più bassi hanno criteri di approvazione e supporto significativamente più facili (impostati dalla traccia) da soddisfare rispetto a quelli con livelli di privilegio più alti. Allo stesso modo, le origini con livelli di privilegio più alti hanno curve meno ripide rispetto a quelle con meno privilegi (come definito nella traccia), al fine di garantire che il DAO detentore del token approvi effettivamente il referendum e eviti il "sniping" del referendum per le origini con privilegi elevati.

In OpenGov, i referendum che non vengono approvati dopo la scadenza del Periodo Decisionale sono considerati rifiutati per impostazione predefinita, e sia i depositi di presentazione che di decisione vengono rimborsati ai loro originatori (nota: il deposito di decisione può essere inviato da qualcuno diverso dall'originatore del referendum).

Se un referendum riesce a soddisfare continuamente i criteri di Approvazione e Supporto per l'intero Periodo di Conferma, allora viene considerato approvato e sarà pianificato per essere eseguito dall'origine proposta, ma il referendum verrà eseguito solo dopo che è trascorso il periodo minimo di attuazione.

### Periodo di Attuazione

Il Periodo di Attuazione è specificato dall'originatore quando il referendum viene proposto, ma è soggetto al Periodo Minimo di Attuazione specificato in ciascuna traccia. Le Origini più potenti hanno un periodo minimo di attuazione molto più lungo rispetto a quelle con meno privilegi. Ciò garantisce che la rete abbia ampio tempo per prepararsi a eventuali cambiamenti che un potente referendum potrebbe imporre.

## Blocco Volontario / Conviction

Robonomics utilizza un concetto noto come blocco volontario, o voto di convinzione. Questo consente ai detentori di token di aumentare il loro potere di voto decidendo per quanto tempo sono disposti a bloccare i propri token per un determinato referendum. Questo meccanismo influisce solo sui criteri di Approvazione per ciascun referendum, e il voto di convinzione non influisce sui criteri di Supporto.

Il Voto di Conviction può essere calcolato utilizzando questa formula:

$$\text{Voti di Approvazione} = \text{Token} * \text{Moltiplicatore di Conviction}$$

Questa tabella mostra come ciascun livello crescente di periodo di blocco moltiplica il tuo voto per i criteri di approvazione:

| Periodi di Blocco | Moltiplicatore del Voto | Giorni di Blocco |
|--------------|-----------------|--------------|
| Nessun Blocco      | 0.1x            | 0          |
| 1            | 1x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


Il massimo importo di convinzione che un detentore di token può utilizzare è di 6x di convinzione. È possibile impostare la convinzione come da tabella sopra e non è possibile, ad esempio, utilizzare 5,5x di convinzione.

Mentre un token è bloccato a causa del voto, può comunque essere utilizzato per votare in altri referendum, tuttavia non farà parte del saldo trasferibile (non è possibile inviarlo a un altro account) - e il saldo diventerà nuovamente trasferibile solo una volta che l'intero periodo di blocco sarà scaduto.

## Delega del Voto

In OpenGov, è stato aggiunto un meccanismo per consentire ai detentori di token che non hanno necessariamente abbastanza tempo per esaminare ciascun referendum di far sì che i loro token vengano comunque utilizzati come parte del sistema di governance, questo è noto come delega del voto.

I detentori di token possono scegliere di delegare il loro potere di voto a un altro votante nel sistema (un altro account). I votanti possono specificare di delegare il loro potere di voto in modo agile, consentendo loro di assegnare il loro potere di voto a un account diverso per ciascun singolo Origin. I votanti possono anche decidere di assegnare una diversa quantità di potere di voto per ciascun Origin (numero di token e livello di convinzione).

Questo meccanismo di delega ha un obiettivo, aumentare la partecipazione degli elettori e contribuire a garantire che i turni richiesti per soddisfare i criteri di Approvazione e Supporto siano rispettati.

Per delegare il proprio potere di voto, è possibile utilizzare la funzione "Delega" che si trova nella sezione Governance -> Referendum del [Portale Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). In alternativa, gli utenti possono inviare l'estrinseco convictionVoting(Delegate) utilizzando la sezione Sviluppatore -> Estrinseci del Portale Robonomics, tuttavia utilizzare la funzione "Delega" della sezione referendum del portale è molto più semplice.

## Annullamento / Eliminazione del Referendum e il Gioco Economico della Governance

In OpenGov, ci sono Origin dedicati a respingere i referendum in corso, indipendentemente dal loro stato. Questi sono noti come il Canceller della Governance e il Killer della Governance.tracce.

Queste Origini intervengono su un referendum che è già stato votato. Queste Origini, se il referendum da esse originato viene approvato, rifiuteranno immediatamente un referendum in corso indipendentemente dal suo stato.

La cancellazione stessa è un tipo di referendum che deve essere votato dai detentori di token per poter essere eseguito. La cancellazione ha la propria origine e traccia che hanno un tempo di attesa inferiore (Periodo Decisionale, ecc.), e hanno curve di Approvazione e Supporto con una curva più ripida (il che significa che i loro criteri sono molto più facili da soddisfare nel tempo) rispetto ad altre Origini. Questo è dovuto al fatto che la cancellazione di un referendum di solito comporta un senso di urgenza.

Il Governance Canceller mira a rifiutare istantaneamente un referendum in corso. Quando un referendum viene cancellato da questa origine, sia il Deposito di Presentazione che il Deposito Decisionale vengono rimborsati ai loro originatori. Un esempio in cui un referendum potrebbe essere considerato cancellato è se l'originatore ha commesso un errore umano nei contenuti del suo referendum e non ha necessariamente cercato di fare qualcosa di malintenzionato.

Il Governance Killer mira a rifiutare istantaneamente un referendum in corso. Qui entra in gioco il gioco economico della governance. Le Origini con livelli di privilegio elevati, come Root, hanno un Deposito Decisionale che richiede una grande quantità di capitale (token XRT) da depositare affinché il referendum entri nel Periodo Decisionale.

Se un attore malintenzionato presenta un referendum, come un referendum con origini Root che mira a `set_code` del runtime delle catene su qualcosa che bloccherebbe la produzione di blocchi della catena, allora il DAO detentore di token può sollevare un contro-referendum Governance Killer per punire questa azione. Se il referendum malintenzionato viene respinto tramite l'origine Governance Killer, allora sia il Deposito di Presentazione che il Deposito Decisionale vengono tagliati, il che significa che l'originatore (gli account che hanno depositato questi fondi) perderanno quei fondi.

Ciò significa che c'è una grave conseguenza economica per gli attori malintenzionati che cercano di presentare un referendum che avrebbe gravi impatti negativi per la catena, il che in teoria impedirà a qualsiasi attore malintenzionato di tentare di farlo.

Il Deposito Decisionale per la traccia Governance Killer è piuttosto alto, questo per impedire ad attori altrettanto malintenzionati di tentare di tagliare i depositi di referendum altrimenti validi. **Un referendum esistente di Governance Killer può essere eliminato da un successivo referendum di Governance Killer.**

## Comitato Tecnico Robonomics & Origine in Lista Bianca

Questo gruppo è un organo di esperti auto-governante che ha come obiettivo principale rappresentare gli esseri umani che incarnano e possiedono la conoscenza tecnica del protocollo di rete Robonomics.Il gruppo (e solo questo gruppo) è in grado di originare referendum dal pallet Whitelist. Questo pallet fa una cosa sola, consente a un Origin di aumentare il livello di privilegio di un altro Origin per una determinata operazione.

Questo gruppo può autorizzare referendum da un origin noto come Whitelisted-Root, e questi referendum possono essere eseguiti con privilegi di livello Root, ma questi referendum funzioneranno con successo solo con determinati comandi specificati che sono stati autorizzati dal gruppo. Il pallet Whitelist verifica due cose:
1. L'Origin è davvero il Whitelisted-Root (cioè quel referendum è passato attraverso il percorso di questo Origin).
2. La proposta è stata effettivamente inserita nella whitelist dal gruppo.

Se entrambe le condizioni sono vere, l'operazione verrà eseguita con privilegi di livello Root.

Questo sistema consente di avere un nuovo percorso parallelo (Origine Whitelisted-Root), i cui parametri consentono un tempo di votazione più breve (i criteri di Approvazione e Supporto sono leggermente più facili da soddisfare rispetto a Root). Questo processo aperto e trasparente consente a questo gruppo di esperti del Protocollo di Rete Robonomics di proporre referendum che hanno stabilito essere sicuri e urgenti.

È importante notare che i Criteri di Supporto per i referendum avviati con l'origine Whitelisted-Root non tendono verso lo 0 come molti altri origini/percorsi. Ciò garantisce che questo gruppo non abbia il controllo de facto sull'intero Protocollo di Rete Robonomics e richiede un livello minimo di Supporto (affluenza degli elettori) da parte dell'intero DAO detentore di token.

## Durata dei Referendum

È importante comprendere che la durata di ciascun singolo referendum non è una cosa concreta, non è scolpita nella pietra. Alcuni periodi all'interno del ciclo di vita del referendum, come il periodo minimo di promulgazione, hanno effettivamente una durata concreta, tuttavia - altri, inclusi il periodo decisionale, no. Ad esempio, non è corretto sommare le durate massime per i Periodi di Preparazione, Decisione, Conferma e Min. Promulgazione e affermare che "ogni referendum richiederà X giorni", è molto più fluido di così.

Guardiamo questo attraverso il prisma di alcuni referendum separati, tutti originati dallo stesso Origin, in questo caso, l'origine Root.

L'Origine Root ha il proprio percorso, dove le durate per ciascun periodo sono stabilite, così come le curve di Approvazione e Supporto.

È importante ricordare che i Referendum procederanno alla fase successiva del loro ciclo di vita solo se vengono soddisfatte determinate condizioni.{% roboWikiPicture {src:"docs/robonomics-opengov/2.jpeg", alt:"immagine"} %}{% endroboWikiPicture %}

Si dovrebbe assumere nelle seguenti immagini che, affinché un referendum passi alla fase successiva del suo ciclo di vita, le condizioni descritte nell'immagine sopra devono essere soddisfatte (a meno che diversamente specificato).


### Durata massima possibile con una partecipazione molto bassa degli elettori

L'immagine qui sotto rappresenta la linea temporale massima possibile per un referendum, pensate a questo come a un referendum che:
1. Ha pubblicato il proprio Deposito Decisionale, ed è quindi entrato nel Periodo Decisionale.
2. Ha un singolo voto, ad esempio, 1 XRT, nella direzione AYE - ciò significa che raggiungerà il Supporto richiesto (partecipazione degli elettori) solo alla fine del Periodo Decisionale (dato che il Supporto complessivo è estremamente basso), ma ha un'Approvazione del 100%, quindi alla fine soddisferà i requisiti per entrare nel Periodo di Conferma.
3. Continua a soddisfare i criteri sopra menzionati durante il Periodo di Conferma.
4. La proposta sollevata dal referendum sarà attuata esattamente nello stesso blocco in cui termina il Periodo Minimo di Attuazione - tecnicamente l'originatore del referendum può impostare i cambiamenti di rete come dettagliato nel referendum per attuare molti blocchi nel futuro, quindi realisticamente il ciclo di vita effettivo di un singolo referendum potrebbe durare molti giorni, settimane, mesi o anni.

{% roboWikiPicture {src:"docs/robonomics-opengov/3.jpeg", alt:"immagine"} %}{% endroboWikiPicture %}

Possiamo vedere che in questo esempio, il ciclo di vita del referendum sarebbe (approssimativamente) di 17 giorni.


### Durata con una partecipazione elevata degli elettori (con un alto numero di voti AYE)

Ora diamo un'occhiata a un referendum in cui il DAO detentore del token XRT ha espresso molto interesse. In questo esempio, assumiamo che siano avvenuti circa 248.771 XRT di partecipazione complessiva degli elettori, e tutti gli elettori stanno votando nella direzione AYE (nota: tecnicamente in questa fase di un referendum Root, come da traccia, solo il 60% dei voti deve essere nella direzione AYE affinché un referendum soddisfi i criteri di Approvazione).

{% roboWikiNote {title:"Nota:", type: "avviso"}%}  Consultare sempre le informazioni più aggiornate sulla traccia per informazioni accurate riguardo a ciascuna Traccia, ulteriori informazioni possono essere trovate su questo [foglio elettronico.](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).
{% endroboWikiNote %}

In questo esempio:
1. Il Deposito Decisionale è stato pubblicato durante il Periodo di Preparazione e quindi è stato in grado di passare al Periodo Decisionale alla fine del Periodo di Preparazione.
2. Molti elettori hanno votato su questo referendum - ottenendo una partecipazione degli elettori di circa 248.771 XRT in un periodo relativamente breve.
3. I voti erano in maggioranza nella direzione AYE (qualsiasi cosa sopra il 60% AYE).
4. Il referendum soddisfa continuamente i criteri del Periodo di Conferma per l'intero Periodo di Conferma (Nota: se un referendum smette di soddisfare i criteri del Periodo di Conferma, allora viene riportato al suo Periodo Decisionale).
5. La proposta sollevata dal referendum sarà attuata esattamente nello stesso blocco in cui termina il Periodo Minimo di Attuazione.

A causa del fatto che c'è stata una partecipazione di circa 248.771 XRT, il referendum soddisferà i criteri per entrare nel suo Periodo di Conferma dopo circa 168 ore (7 giorni).

{% roboWikiPicture {src:"docs/robonomics-opengov/4.jpeg", alt:"immagine"} %}{% endroboWikiPicture %}

Possiamo vedere che in questo secondo esempio, a causa del fatto che c'è stata una buona partecipazione degli elettori, il Periodo Decisionale è effettivamente terminato a metà del tempo massimo assegnato. Risultando in un referendum che può essere attuato in circa 10 giorni.


### Durata quando il Deposito Decisionale non viene mai pubblicato

Ora, diamo un'occhiata a un referendum che è stato originato, ma il suo Deposito Decisionale non è mai stato pubblicato. Tali referendum si trovano in una sorta di stato "limbo", in cui il loro Periodo di Preparazione è terminato, ma poiché il Deposito Decisionale non è stato pubblicato, il referendum rimane nello stato di "Preparazione".

{% roboWikiPicture {src:"docs/robonomics-opengov/5.jpeg", alt:"immagine"} %}{% endroboWikiPicture %}

Possiamo vedere che in questo terzo esempio, a causa del fatto che il Deposito Decisionale non è mai stato pubblicato, il referendum non entrerà mai nel Periodo Decisionale, invece rimarrà nello stato di "Preparazione". Ciò significa che alla fine, se nessun Deposito Decisionale verrà mai pubblicato, il referendum scadrà dopo la durata specificata nella costante timeOut.del pallet è trascorso.

Questo è già accaduto su Kusama in passato, dove un referendum è stato pubblicato con origini Root, ma a causa dell'elevato requisito di capitale per pubblicare il Deposito Decisionale, il referendum non è mai entrato nelle fasi successive del suo ciclo di vita. Tali referendum terminano con il flag "scaduto".

### Durata quando il Deposito Decisionale viene pubblicato in ritardo

Infine, diamo un'occhiata a un esempio in cui il Deposito Decisionale non è stato pubblicato per un po' di tempo dopo che il referendum è stato originato. Questo è già accaduto in precedenza su Kusama, dove un referendum è stato pubblicato con l'origine Root, ma l'originatore ha impiegato del tempo per trovare qualcuno con un alto importo di capitale per pubblicare il Deposito Decisionale per conto suo.

{% roboWikiPicture {src:"docs/robonomics-opengov/6.jpeg", alt:"immagine"} %}{% endroboWikiPicture %}

In questo ultimo esempio, poiché il Deposito Decisionale è stato pubblicato dopo che il Periodo di Preparazione era terminato, ma prima che il referendum scadesse, il ciclo di vita del referendum è effettivamente molto più lungo del normale, poiché entra nel Periodo Decisionale dopo un periodo di tempo più lungo.

È importante notare che il DAO detentore di token è in grado di votare AYE/NAY sui referendum che si trovano nel Periodo di Preparazione, o bloccati nello stato "In preparazione".