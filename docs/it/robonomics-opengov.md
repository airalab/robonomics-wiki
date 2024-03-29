---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Introduzione

Robonomics ha spostato il modello di governance della parachain al sofisticato meccanismo OpenGov di Polkadot che consente alla catena di evolversi nel tempo, secondo la volontà dei detentori di token.
La transizione di Robonomics verso OpenGov garantisce che il DAO dei detentori di token, che controlla la maggioranza delle quote, possa sempre comandare la direzione della parachain di Robonomics, attuando qualsiasi modifica alla rete che ritengano opportuna.

<robo-wiki-note title='Note:' type="warning">
  OpenGov si applica solo alla Robonomics Parachain, che è una catena basata su Substrate collegata alla Kusama Relay Chain. OpenGov non è applicabile all'implementazione di Robonomics Ethereum, poiché la mainnet di Ethereum attualmente non supporta sistemi di governance sofisticati come OpenGov.
</robo-wiki-note>

OpenGov cambia il modo in cui vengono effettuate le operazioni quotidiane e le decisioni sulla parachain. Fornisce una maggiore chiarezza sulla portata dei referendum e ha il potenziale per aumentare drasticamente la velocità delle decisioni prese sulla parachain.

OpenGov è stato attivo sulla Kusama relay chain per alcuni mesi al momento della stesura, e ha dimostrato di aumentare notevolmente il numero di decisioni (referendum individuali e discreti) che il DAO dei detentori di token può proporre, votare e, attraverso il voto, controllare in ultima analisi la direzione del protocollo.

**Il contenuto seguente contenuto in questa sezione del wiki illustrerà i principi fondamentali di OpenGov sulla parachain di Robonomics e mira ad aiutarti a comprendere meglio i concetti alla base di OpenGov.**

*È importante notare che la governance è un meccanismo in continua evoluzione nel protocollo, soprattutto nelle prime fasi di implementazione.*

Per coloro interessati esclusivamente ai parametri di traccia di Robonomics OpenGov, vedere [qui](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## Informazioni sui referendum

I referendum sono schemi di voto semplici, inclusivi e basati sulle quote. Ogni referendum ha una proposta specifica associata ad esso che assume la forma di una chiamata di funzione privilegiata nell'esecuzione della catena. Questo può includere anche la chiamata più potente `set_code``, che ha la capacità di sostituire l'intero codice del runtime delle catene: questo è unico per le catene basate su Substrato e rimuove il requisito di un "hard fork" della catena durante l'aggiornamento della logica di business delle catene ( tempo di esecuzione).

I referendum sono eventi discreti che hanno un periodo di voto fisso (ulteriori informazioni sui diversi periodi durante il ciclo di vita di un referendum in seguito). I detentori di token individuali possono votare in tre modi diversi sui referendum: AYE (d'accordo/sì), NAY (disaccordo/no) o ASTENERSI dal voto completamente.

Tutti i referendum hanno un ritardo di attuazione associato. Questo è il periodo tra la fine del referendum e, assumendo che il referendum sia stato approvato, l'attuazione dei cambiamenti sulla rete. 

<robo-wiki-note title='Note:' type="warning">

  Esiste un periodo di attuazione minimo specificamente stabilito per ogni tipo di Origine diverso, ma l'originatore di un determinato referendum può impostare le attività specifiche di quel referendum per essere eseguite molti blocchi nel futuro

</robo-wiki-note>

I referendum sono considerati "cotti" se sono chiusi e i voti sono conteggiati. Presumendo che il referendum sia stato approvato, verrà pianificato per l'attuazione (nel programma della catena). I referendum sono considerati "non cotti" se l'esito è in sospeso, ad esempio se il referendum è ancora in corso di votazione.

Con l'aggiunta di OpenGov, chiunque può avviare un referendum in qualsiasi momento e può farlo quante volte desidera. OpenGov rimuove il limite di poter elaborare solo 1 referendum alla volta (si noti che, in Gov v1, è possibile votare solo su 1 referendum alla volta. L'unica eccezione è un referendum di emergenza aggiuntivo da parte del Comitato Tecnico accelerato che può essere votato contemporaneamente dalla comunità).

OpenGov introduce diverse nuove funzionalità/concetti noti come Origini e Tracce, e questi sono introdotti per aiutare nel flusso e nell'elaborazione dei referendum nel protocollo.

Ogni Origine è associata a una singola classe di referendum e ogni classe è associata a una traccia. La traccia delinea il ciclo di vita del referendum ed è specifica per quella particolare Origine da cui il referendum ha origine. Avere tracce con i propri parametri specifici consente alla rete di modificare dinamicamente il ciclo di vita dei referendum in base al loro livello di privilegio (si può pensare al livello di privilegio come al potere di un referendum / ai tipi di modifiche che può apportare al protocollo).

*Pensate alle Origini come al potere associato a un referendum e pensate alle Tracce come ai parametri di voto associati a un referendum, come la durata dei suoi periodi e i criteri di approvazione e supporto.*

Ad esempio, un aggiornamento del runtime non ha le stesse implicazioni per il protocollo come un piccolo suggerimento del tesoro, e quindi sono necessarie origini diverse in cui saranno predefiniti i turni, le approvazioni, i depositi e i periodi di attuazione specifici dei referendum (Tracce) nella pallet della catena.

## Proposta di un Referendum e Ciclo di Vita del Referendum 

### Periodo di Preparazione

In OpenGov, quando un referendum viene creato inizialmente, può essere immediatamente votato dalla comunità dei detentori di token. Tuttavia, non è immediatamente in uno stato in cui può terminare o avere i suoi voti conteggiati, essere approvato e attuato sommariamente. Invece, i referendum devono soddisfare una serie di criteri prima di essere spostati nel Periodo Decisionale. Fino a quando i referendum non entrano nel Periodo Decisionale, rimarranno indecisi - e alla fine scadranno dopo il periodo di ciclo di vita complessivo specificato nella traccia individuale.

<robo-wiki-picture src='robonomics-opengov/1.jpeg' alt="picture" />

I criteri per un referendum per entrare nel Periodo Decisionale sono i seguenti:
1. Un Periodo di Preparazione che indica la quantità di tempo che deve trascorrere prima che possa iniziare il Periodo Decisionale. Questo Periodo di Preparazione aiuta a mitigare la possibilità di "decision sniping" in cui un attaccante che controlla una quantità considerevole di potere di voto potrebbe cercare di utilizzare la propria grande quota per far approvare immediatamente un referendum dopo la proposta, eludendo la possibilità per gli altri membri del DAO detentori di token di avere il tempo adeguato per considerare il referendum e partecipare al voto. Ecco perché le Origini con livelli di privilegio più elevati hanno Periodi di Preparazione significativamente più lunghi.

2. Deve esserci spazio per la decisione. Ogni traccia ha i propri limiti per la quantità di referendum che possono essere decisi contemporaneamente (max_deciding). Le tracce che hanno livelli di privilegio più elevati avranno limiti inferiori. Ad esempio, l'origine di livello Root avrà un numero significativamente inferiore di referendum che possono essere decisi contemporaneamente rispetto alle origini di livello di privilegio inferiore come l'origine Small Tipper.

3. Il Deposito Decisionale deve essere presentato. Inizialmente la creazione di un referendum è piuttosto economica e il valore del Deposito di Presentazione (riservato quando il referendum viene creato inizialmente) è piuttosto basso e consiste principalmente del valore che costa per lo storage on-chain associato al referendum. I Depositi Decisionali sono significativamente più alti, il che è richiesto per contrastare lo spam e gioca nel gioco economico che OpenGov porta, che affronteremo in seguito.

Una volta soddisfatti tutti e tre i criteri sopra indicati, il referendum passerà al Periodo Decisionale. I voti sul referendum verranno quindi conteggiati per il risultato.

### Periodo Decisionale

*Per una rapida dimostrazione video del Periodo Decisionale, guarda [questo video](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Una volta che un referendum ha soddisfatto tutti i criteri come dettagliato nella sezione precedente, entrerà nel Periodo Decisionale.

Il Periodo Decisionale ruota attorno a due concetti principali, ovvero i criteri di Approvazione e Supporto. 

L'Approvazione è definita come la quota del peso del voto di approvazione (AYEs vs NAYs) rispetto al peso totale del voto (tutti i voti AYE e NAY combinati). La convinzione di ogni voto contribuisce al peso complessivo dei voti AYE/NAY (ulteriori informazioni sulla votazione per convinzione / blocco volontario in una sezione successiva).

Il Supporto è il numero totale di voti (token) che hanno partecipato al referendum (e non viene regolato per la convinzione) rispetto al totale dei voti possibili che potrebbero essere effettuati nel sistema (pensa a questo come all'emissione totale di XRT sulla parachain - notare che l'offerta circolante totale di XRT non è il fattore principale qui, a causa del fatto che una parte di quel numero esiste su Ethereum come token ERC-20).

**I voti che sono nella direzione ABSTAIN NON contribuiscono ai criteri di Approvazione, ma sono inclusi / conteggiati verso i criteri di Supporto**

Un referendum deve soddisfare i criteri di Supporto E Approvazione durante il Periodo Decisionale per progredire al Periodo di Conferma.

Per i dettagli dei criteri di Supporto e Approvazione individuali per ogni traccia, consulta questo [foglio di calcolo](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Periodo di Conferma

Ogni traccia ha una durata specifica per il suo Periodo di Conferma. Le tracce che hanno livelli di privilegio più elevati (come Root) hanno Periodi di Conferma significativamente più lunghi rispetto a quelli con livelli di privilegio inferiori (come Small Tipper).

I referendum devono continuare a soddisfare i criteri di Approvazione e Supporto per l'intera durata del Periodo di Conferma, altrimenti torneranno nuovamente nel Periodo Decisionale (nota: il Periodo Decisionale non viene messo in pausa durante il Periodo di Conferma, quindi è del tutto possibile che un Periodo Decisionale possa scadere durante il Periodo di Conferma, il che significa che se un referendum viene escluso dal Periodo di Conferma perché non soddisfa più i criteri di Approvazione e Supporto, sarà considerato un referendum fallito e non promulgato).

**È possibile modificare i criteri di approvazione e supporto per i singoli brani tramite un referendum con privilegi di Root Origin.**

Le origini con livelli di privilegio inferiori hanno criteri di approvazione e supporto molto più semplici (impostati dal percorso) da soddisfare rispetto a quelle con livelli di privilegio più elevati. Allo stesso modo, le origini con livelli di privilegio più elevati hanno curve meno ripide rispetto a quelle con meno privilegi (come definito nel tracciato), al fine di garantire che il detentore del token DAO approvi effettivamente il referendum ed evitare azioni referendarie per referendum sulle origini con privilegi elevati.

In OpenGov, i referendum che non vengono approvati dopo la scadenza del periodo decisionale sono considerati respinti per impostazione predefinita e sia il deposito per la presentazione che quello per la decisione vengono rimborsati ai loro originatori (nota: il deposito per la decisione può essere inviato da qualcuno diverso dall'originatore del referendum) .

Se un referendum riesce a soddisfare costantemente i criteri di approvazione e sostegno per l'intero periodo di conferma, allora è considerato approvato e l'esecuzione verrà pianificata a partire dall'origine proposta, ma il referendum verrà eseguito solo dopo che è trascorso il periodo minimo di attuazione.

### Periodo di emanazione

Il Periodo di Emanazione è specificato dall'originatore al momento della proposta del referendum, ma è soggetto al Periodo Minimo di Emanazione specificato in ciascun brano. Le Origini più potenti hanno un periodo minimo di attuazione molto più elevato rispetto a quelle con minori privilegi. Ciò garantisce che la rete abbia tutto il tempo per prepararsi a eventuali cambiamenti che un potente referendum potrebbe imporre.

## Blocco/Condanna volontaria

La Robonomics utilizza un concetto noto come blocco volontario o voto per convinzione. Ciò consente ai possessori di token di aumentare il proprio potere di voto decidendo per quanto tempo sono disposti a bloccare i propri token per un particolare referendum. Questo meccanismo influisce solo sui criteri di approvazione per ciascun referendum e il voto di convinzione non influisce sui criteri di sostegno.

Il voto di convinzione può essere calcolato utilizzando questa formula:

$$\text{Approval Votes} = \text{Tokens} * \text{Conviction\_Multiplier}$$


Questa tabella mostra come ogni livello crescente di periodo di blocco moltiplica il tuo voto per i criteri di approvazione:

| Lock Periods | Vote Multiplier | Lock Up Days |
|--------------|-----------------|--------------|
| No Lock      | 0.1x            | 0          |
| 1            | 1x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


L'importo massimo di convinzione che un detentore di token può utilizzare è 6x convinzione. Puoi impostare la convinzione solo secondo la tabella sopra e non puoi, ad esempio, utilizzare la convinzione 5,5x.

Mentre un token è bloccato a causa del voto, può comunque essere utilizzato per votare in altri referendum, tuttavia, non farà parte del tuo saldo trasferibile (non puoi inviarlo a un altro account) - e il saldo diventerà di nuovo trasferibile solo una volta l'intero periodo di blocco è scaduto.

## Delegazione di voto

In OpenGov è stato aggiunto un meccanismo per consentire ai detentori di token che non hanno necessariamente abbastanza tempo per rivedere ogni referendum di continuare a utilizzare i propri token come parte del sistema di governance, questa è nota come delega di voto.

I possessori di token possono scegliere di delegare il proprio potere di voto a un altro elettore nel sistema (un altro account). Gli elettori possono specificare di delegare il proprio potere di voto in modo agile, consentendo loro di assegnare il proprio potere di voto a un conto diverso per ogni singola Origine. Gli elettori possono anche impostare l'assegnazione di una quantità diversa di potere di voto per ciascuna Origine (numero di token e livello di convinzione).

Questa funzionalità di delega ha un obiettivo: aumentare l'affluenza alle urne e contribuire a garantire che l'affluenza alle urne richiesta per soddisfare i criteri di approvazione e supporto sia soddisfatta.

Per delegare il tuo potere di voto puoi utilizzare la funzione "Delega" che puoi trovare nella sezione Governance -> Referendum del [Portale Robonomics](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer). In alternativa, gli utenti possono inviare la convinzione Voto(Delega) estrinseca utilizzando la sezione Sviluppatore -> Estrinseci del Portale Robonomics, tuttavia utilizzare la funzione "Delega" della sezione Referendum del portale è molto più semplice.

## Annullare/uccidere il referendum e il gioco economico della governance

In OpenGov ci sono Origins che si impegnano a respingere i referendum in corso, indipendentemente dal loro status. Questi sono conosciuti come percorsi Governance Canceller e Governance Killer.

Queste Origini intervengono su un referendum già votato. Queste Origini, se il referendum da loro originato viene approvato, rifiuteranno immediatamente un referendum in corso indipendentemente dal suo status.

La cancellazione stessa è un tipo di referendum su cui devono essere votati i possessori di token per poter essere eseguito. La cancellazione arriva con la propria origine e traccia che hanno un lead time inferiore (periodo di decisione, ecc.) e hanno curve di approvazione e supporto con una curva più ripida/severa (il che significa che i loro criteri sono molto più facili da soddisfare nel tempo) rispetto ad altre origini. Ciò è dovuto al fatto che l’annullamento di un referendum di solito avviene con un senso di urgenza.

Governance Canceller mira a respingere immediatamente un referendum già in corso. Quando un referendum viene annullato da questa origine, sia la presentazione che il deposito decisionale vengono rimborsati ai loro originatori. Un esempio di quando un referendum potrebbe essere considerato annullato è se l'autore ha commesso qualche errore umano nei contenuti del referendum e non ha necessariamente tentato di fare qualcosa di dannoso.

Governance Killer mira a respingere immediatamente un referendum già in corso. È qui che entra in gioco il gioco economico della governance. Le origini con elevati livelli di privilegio, come Root, hanno un deposito decisionale che richiede la pubblicazione di una quantità elevata di capitale (token XRT) affinché il referendum entri nel periodo decisionale.

Se un attore malintenzionato presenta un referendum, ad esempio un referendum con origini Root che mira a "set_code" del runtime delle catene su qualcosa che impedirà alla catena di produrre blocchi, allora il detentore del token DAO può lanciare un referendum contro Governance Killer per punire questa azione. Se il referendum dannoso viene rifiutato tramite l’origine Governance Killer, sia i depositi di Sottomissione che quelli di Decisione verranno tagliati, il che significa che l’originatore (il conto o i conti che hanno registrato questi depositi) perderà quei fondi.

Ciò significa che il tentativo di indire un referendum comporta gravi conseguenze economiche per gli attori malintenzionati, che avrebbero gravi ripercussioni negative sulla catena, cosa che in teoria impedirà a qualsiasi attore malintenzionato di tentare di farlo.

Il deposito decisionale per il percorso Killer della governance è di per sé piuttosto elevato, questo per impedire ad attori altrettanto dannosi di tentare di tagliare i depositi di un referendum altrimenti buono. **Un referendum killer della governance esistente può essere eliminato da un successivo referendum killer della governance.**

## Comitato tecnico Robonomics e origine autorizzata

Questo gruppo è un organismo di esperti autogovernato che ha l'obiettivo primario di rappresentare gli esseri umani che incarnano e possiedono la conoscenza tecnica del protocollo di rete Robonomics. 

Questo gruppo (e solo questo gruppo) è in grado di originare referendum dal pallet Whitelist. Questo pallet fa una cosa, consente a un'origine di aumentare il livello di privilegio di un'altra origine per una determinata operazione. 

Questo gruppo può autorizzare referendum da un'origine nota come Whitelisted-Root e questi referendum possono essere eseguiti con privilegi a livello di root, ma questi referendum funzioneranno con successo solo con determinati comandi specificati che sono stati autorizzati dal gruppo. Il pallet Whitelist verifica due cose:
1. L'Origine è realmente la Radice della Whitelist (ovvero quel referendum è passato attraverso il percorso di questa Origine).
2. La proposta è stata effettivamente inserita nella lista bianca dal gruppo.

Se entrambe le condizioni sono vere, l'operazione verrà eseguita con privilegi a livello di root.

Questo sistema consente la possibilità di avere una nuova traccia parallela (Whitelisted-Root Origin), i cui parametri consentono un turno di votazione più breve (i criteri di approvazione e supporto sono leggermente più facili da soddisfare rispetto a Root). Questo processo aperto e trasparente consente a questo corpo di esperti del Protocollo di Rete Robonomics di proporre referendum che hanno ritenuto sicuri e con tempi critici.

Va notato che i criteri di supporto per il referendum avviato con l'origine Whitelisted-Root non tendono verso 0 come molte altre origini/tracce. Ciò garantisce che questo gruppo non abbia di fatto il controllo sull'intero protocollo di rete Robonomics e richieda un livello minimo di supporto (affluenza alle urne) da parte del DAO detentore del token complessivo.


## Durata del referendum

È importante capire che la durata di ogni singolo referendum non è una cosa concreta, non è fissata nella pietra. Alcuni periodi all'interno del ciclo di vita del referendum, come il periodo minimo di attuazione, hanno tuttavia una durata concreta, altri, compreso il periodo decisionale, no. Ad esempio, non è accurato sommare le durate massime per Preparazione, Decisione, Conferma e Min. Periodi di promulgazione e affermare che "ogni referendum richiederà un numero X di giorni", è molto più fluido di così.

Guardiamo la cosa attraverso la lente di alcuni referendum separati, che hanno tutti origine dalla stessa Origine, in questo caso, l'origine Radice.

L'Origine Radice ha il proprio tracciato, dove vengono impostate le durate per ciascun periodo, così come le curve di Approvazione e Supporto.

È importante ricordare che i referendum potranno passare alla fase successiva del loro ciclo di vita solo se verranno soddisfatte determinate condizioni.

<robo-wiki-picture src='robonomics-opengov/2.jpeg' alt="picture" />

Nelle immagini seguenti si dovrebbe presumere che, affinché un referendum possa ascendere alla fase successiva del suo ciclo di vita, le condizioni descritte nell'immagine sopra avrebbero dovuto essere soddisfatte (se non diversamente indicato).


### Massima durata possibile con pochissima affluenza alle urne

L'immagine qui sotto è una rappresentazione della massima tempistica possibile per un referendum, consideralo come un referendum che:
1. Ha registrato il deposito della decisione e quindi è entrato nel periodo di decisione.
2. Ha un singolo voto, ad esempio 1 XRT, nella direzione AYE – ciò significa che incontrerà il sostegno richiesto (affluenza alle urne) solo alla fine del periodo decisionale (poiché il sostegno complessivo è estremamente basso) , ma ha l'approvazione al 100%, quindi alla fine soddisferà i requisiti per accedere al Periodo di conferma.
3. Continua a soddisfare i criteri di cui sopra durante il Periodo di Conferma.
4. La proposta sollevata dal referendum sarà attuata esattamente nello stesso blocco in cui scade il Periodo Minimo di Emanazione – tecnicamente l’autore del referendum può impostare le modifiche alla rete come dettagliato nel referendum per attuare molti blocchi nel futuro, quindi realisticamente l’effettivo Il ciclo di vita di un singolo referendum potrebbe estendersi su molti giorni, settimane, mesi o anni.

<robo-wiki-picture src='robonomics-opengov/3.jpeg' alt="picture" />

Possiamo vedere che in questo esempio il ciclo di vita del referendum sarebbe (approssimativamente) di 17 giorni.


### Durata con molta affluenza alle urne (con un numero elevato di voti AYE)

Ora diamo un'occhiata a un referendum in cui DAO, detentore del token XRT, ha espresso molto interesse. In questo esempio, supponiamo che si siano verificati circa 248.771 XRT nell'affluenza alle urne complessiva e che tutti gli elettori stiano votando nella direzione AYE (nota: tecnicamente in questa fase di un referendum root, come da traccia, solo il 60% dei voti deve essere nella direzione dell'AYE per un referendum per soddisfare i criteri di approvazione).

<robo-wiki-note title="Note:" type="warning">

  Consulta sempre le informazioni più aggiornate sulla traccia per informazioni precise su ciascuna traccia. Maggiori informazioni possono essere trovate in questo [foglio di calcolo](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

</robo-wiki-note>

In questo esempio:
1. Il deposito decisionale è stato registrato durante il periodo di preparazione e pertanto è stato possibile passare al periodo di decisione alla fine del periodo di preparazione.
2. Molti elettori hanno votato su questo referendum, ottenendo un’affluenza alle urne di circa 248.771 XRT in un periodo di tempo relativamente breve.
3. I voti sono stati a maggioranza nella direzione AYE (qualsiasi cosa superiore al 60% AYE).
4. Il referendum soddisfa continuamente i criteri del Periodo di Conferma per tutto il suo Periodo di Conferma (Nota: Se un referendum si ferma per soddisfare i criteriof the Confirmation Period, then it is bumped back to it's Decision Period).
5. La proposta sollevata dal referendum entrerà in vigore esattamente nello stesso periodo in cui scade il Periodo Minimo di Attuazione.

Dato che c'è stata un'affluenza alle urne di circa 248.771 XRT, il referendum soddisferà i criteri per entrare nel suo periodo di conferma dopo circa 168 ore (7 giorni).

<robo-wiki-picture src='robonomics-opengov/4.jpeg' alt="picture" />

Possiamo vedere che in questo secondo esempio, a causa del fatto che c'è stata una buona affluenza alle urne, il Periodo Decisionale si è effettivamente concluso a metà del tempo massimo assegnato. Il risultato è un referendum che può essere emanato in circa 10 giorni.


### Periodo in cui il deposito della decisione non viene mai pubblicato

Ora, diamo un'occhiata a un referendum che è stato avviato, ma il suo deposito decisionale non è mai stato pubblicato. Tali referendum si trovano in una sorta di stato di "limbo", dove il loro periodo di preparazione è terminato, ma poiché il deposito decisionale non è stato pubblicato, il referendum rimane nello "stato di preparazione".

<robo-wiki-picture src='robonomics-opengov/5.jpeg' alt="picture" />

Possiamo vedere che in questo terzo esempio, poiché il deposito decisionale non è mai stato pubblicato, il referendum in realtà non entrerà mai nel periodo decisionale, ma rimarrà nello "Stato preparatorio". Ciò significa che alla fine, se non viene mai inviato alcun deposito decisionale, il referendum scadrà una volta trascorso il tempo specificato nella costante timeOut del pallet.

Ciò è già accaduto a Kusama in precedenza, quando è stato pubblicato un referendum con origini Root, ma a causa degli elevati requisiti patrimoniali per pubblicare il deposito decisionale, il referendum non è mai entrato nelle ultime fasi del suo ciclo di vita. Tali referendum si concludono con la bandiera del “time out”.


### Durata in cui il deposito della decisione viene pubblicato in ritardo

Infine, diamo un'occhiata a un esempio in cui il Deposito Decisionale non è stato depositato per un bel po' di tempo dopo l'inizio del referendum. Ciò è accaduto in precedenza a Kusama, dove è stato pubblicato un referendum con l'origine Root, ma l'originatore ha dovuto dedicare del tempo a trovare qualcuno con un importo elevato di capitale per depositare il deposito decisionale per suo conto.

<robo-wiki-picture src='robonomics-opengov/6.jpeg' alt="picture" />

In questo ultimo esempio, poiché il deposito decisionale è stato versato dopo la fine del periodo di preparazione, ma prima che il referendum scadesse, il ciclo di vita del referendum è in realtà molto più lungo del normale, poiché entra nel periodo decisionale dopo un periodo di tempo più lungo.

È importante notare che il detentore del token DAO può votare AYE/NAY sui referendum che si trovano nel periodo di preparazione o bloccati nello "Stato di preparazione".
