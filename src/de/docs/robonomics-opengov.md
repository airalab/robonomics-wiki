---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Einführung

Robonomics hat das Governance-Modell der Parachain auf den ausgefeilten OpenGov-Mechanismus von Polkadot umgestellt, der es der Kette ermöglicht, sich im Laufe der Zeit zu entwickeln, letztendlich im Interesse der Token-Inhaber.
Der Übergang von Robonomics zu OpenGov stellt sicher, dass das Token-Inhaber-DAO, das die Mehrheit der Anteile kontrolliert, immer die Richtung der Robonomics-Parachain bestimmen kann und jede Änderung am Netzwerk durchführen kann, die sie für angemessen halten.

{% roboWikiNote {title:"Hinweis:", type: "warning"}%} OpenGov ist nur auf die Robonomics Parachain anwendbar, die eine auf Substrate basierende Kette ist, die mit der Kusama Relay Chain verbunden ist. OpenGov ist nicht für die Robonomics Ethereum-Implementierung anwendbar, da das Ethereum-Hauptnetz derzeit keine ausgefeilten Governance-Systeme wie OpenGov unterstützt {% endroboWikiNote %}

OpenGov verändert, wie die täglichen Betriebsabläufe und Entscheidungsfindungen auf der Parachain durchgeführt werden. Es bietet eine größere Klarheit über den Umfang von Referenden und hat das Potenzial, die Durchsatzrate der auf der Parachain getroffenen Entscheidungen dramatisch zu erhöhen.

OpenGov ist zum Zeitpunkt des Verfassens dieses Textes seit einigen Monaten auf der Kusama-Relay-Chain aktiv und hat gezeigt, dass es die Anzahl der Entscheidungen (individuelle und diskrete Referenden), die das Token-Inhaber-DAO vorschlagen, abstimmen und durch Abstimmung letztendlich die Richtung des Protokolls kontrollieren kann, dramatisch erhöht.

**Der folgende Inhalt in diesem Abschnitt des Wikis wird die Kernprinzipien von OpenGov auf der Robonomics-Parachain erläutern und Ihnen helfen, die Konzepte hinter OpenGov besser zu verstehen.**

*Es ist wichtig zu beachten, dass Governance ein sich ständig weiterentwickelnder Mechanismus im Protokoll ist, insbesondere in den frühen Implementierungsphasen.*

Für diejenigen, die sich ausschließlich für die Robonomics OpenGov-Track-Parameter interessieren, siehe [hier](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## Über Referenden

Referenden sind einfache, inklusive und stakebasierte Abstimmungssysteme. Jedes Referendum hat einen spezifischen Vorschlag, der mit ihm verbunden ist und in Form eines privilegierten Funktionsaufrufs in der Laufzeit der Ketten erfolgt. Dies kann auch den mächtigsten Aufruf `set_code` umfassen, der die Fähigkeit hat, den gesamten Code auszutauschen.die Laufzeit der Ketten – dies ist einzigartig für auf Substrate basierende Ketten und entfernt die Notwendigkeit für eine "Hard Fork" der Kette beim Aktualisieren der Geschäftslogik der Kette (Laufzeit).

Referenden sind diskrete Ereignisse, die eine feste Abstimmungsperiode haben (mehr über die verschiedenen Perioden während des Lebenszyklus einer Referendums später). Einzelne Token-Inhaber können auf Referenden auf eine von drei Arten abstimmen – ZUSTIMMEN (zustimmen/ja), ABLEHNEN (ablehnen/nein) oder sich vollständig der Abstimmung enthalten.

Alle Referenden haben eine Verzögerung der Verkündung, die ihnen zugeordnet ist. Dies ist der Zeitraum zwischen dem Ende des Referendums und, vorausgesetzt, das Referendum wurde genehmigt, den Änderungen, die im Netzwerk verkündet werden.

{% roboWikiNote {title:"Hinweis:", type: "warning"}%} Es gibt eine **Mindest**-Verkündungsperiode, die speziell für jeden verschiedenen Typ von Ursprung festgelegt ist, aber der Urheber eines bestimmten Referendums kann die Aufgaben dieses spezifischen Referendums so einstellen, dass sie viele Blöcke in der Zukunft ausgeführt werden {% endroboWikiNote %}

Referenden gelten als "gebacken", wenn sie geschlossen sind und die Stimmen gezählt sind. Vorausgesetzt, das Referendum wurde genehmigt, wird es für die Verkündung (im Zeitplan der Kette) geplant. Referenden gelten als "ungebacken", wenn das Ergebnis aussteht – zum Beispiel, wenn das Referendum noch aktuell abgestimmt wird.

Mit der Einführung von OpenGov kann jeder zu jeder Zeit ein Referendum starten, und sie können dies so oft tun, wie sie möchten. OpenGov hebt die Beschränkung auf, dass nur 1 Referendum gleichzeitig verarbeitet werden kann, auf (beachten Sie, dass in Gov v1 nur 1 Referendum gleichzeitig abgestimmt werden kann. Die einzige Ausnahme ist ein zusätzliches Notfall-Referendum des beschleunigten Technischen Ausschusses, das auch gleichzeitig von der Gemeinschaft abgestimmt werden kann).

OpenGov führt mehrere neue Funktionen / Konzepte ein, die als Ursprünge und Spuren bekannt sind, und diese werden eingeführt, um bei der Durchführung und Verarbeitung von Referenden im Protokoll zu helfen.

Jeder Ursprung ist mit einer einzigen Referendumsklasse verbunden, und jede Klasse ist mit einer Spur verbunden. Die Spur skizziert den Lebenszyklus des Referendums und ist spezifisch für den jeweiligen Ursprung, von dem das Referendum stammt. Das Vorhandensein von Spuren mit ihren eigenen spezifischen Parametern ermöglicht es dem Netzwerk, den Lebenszyklus von Referenden dynamisch zu ändern, basierend auf ihrem Privilegieniveau (Sie können sich das Privilegieniveau als die Stärke eines Referendums / welche Arten von Änderungen es am Protokoll vornehmen kann, vorstellen).

*Denken Sie an Ursprünge als die mit einem Referendum verbundene Macht und denken Sie an Spuren alsDie Abstimmungsparameter, die mit einem Referendum verbunden sind, wie die Längen seiner Perioden und die Genehmigungs- und Unterstützungskriterien.*

Zum Beispiel hat ein Laufzeit-Upgrade nicht die gleichen Auswirkungen auf das Protokoll wie ein kleiner Schatzkammer-Tipp, und daher sind unterschiedliche Ursprünge erforderlich, in denen unterschiedliche Beteiligungen, Genehmigungen, Einlagen und Inkraftsetzungszeiträume (Tracks) in den Paletten der Ketten vorbestimmt werden.

## Ein Referendum vorschlagen & Lebenszyklus des Referendums

### Vorbereitungszeitraum

In OpenGov kann ein Referendum, wenn es zunächst erstellt wird, sofort von der Token-Inhaber-Community abgestimmt werden. Es befindet sich jedoch nicht sofort in einem Zustand, in dem es enden kann oder anderweitig seine Stimmen gezählt werden, genehmigt und summarisch erlassen werden können. Stattdessen müssen Referenden eine Reihe von Kriterien erfüllen, bevor sie in den Entscheidungszeitraum übergehen. Bis Referenden in den Entscheidungszeitraum eintreten, bleiben sie unentschieden - und werden schließlich nach Ablauf des Gesamtlebenszykluszeitraums gemäß dem individuellen Track spezifiziert.

{% roboWikiPicture {src:"docs/robonomics-opengov/1.jpeg", alt:"Bild"} %}{% endroboWikiPicture %}

Die Kriterien für ein Referendum, um in den Entscheidungszeitraum einzutreten, lauten wie folgt:
1. Ein Vorbereitungszeitraum, der die Zeitdauer angibt, die verstreichen muss, bevor der Entscheidungszeitraum beginnen kann. Dieser Vorbereitungszeitraum hilft, gegen die Möglichkeit des "Entscheidungssnipings" vorzugehen, bei dem ein Angreifer, der eine beträchtliche Menge an Abstimmungsmacht kontrolliert, versuchen könnte, seinen großen Anteil zu nutzen, um ein Referendum unmittelbar nach dem Vorschlag zu bestehen, wodurch die Möglichkeit für die anderen Mitglieder des Token-Inhaber-DAO umgangen wird, ausreichend Zeit zu haben, um das Referendum zu prüfen und an der Abstimmung teilzunehmen. Daher haben Ursprünge mit höheren Privilegien signifikant längere Vorbereitungszeiträume.

2. Es muss Platz für die Entscheidung geben. Jeder Track hat eigene Grenzen für die Anzahl der Referenden, über die gleichzeitig entschieden werden kann (max_deciding). Tracks mit mächtigeren Privilegien haben niedrigere Grenzen. Beispielsweise wird der Ursprung auf Root-Ebene eine signifikant geringere Anzahl von Referenden haben, über die gleichzeitig entschieden werden kann, im Vergleich zu Ursprüngen mit niedrigeren Privilegien wie dem Small Tipper-Ursprung.

3. Die Entscheidungseinlage muss eingereicht werden. Das Erstellen eines Referendums ist anfangs recht günstig, und der Wert der Einreichungseinlage (reserviert, wenn das Referendum zunächst erstellt wird) ist ziemlich niedrig und besteht hauptsächlich aus dem Wert, der für den On-Chain-Speicherplatz des Referendums erforderlich ist. Entscheidungseinlagen sind wesentlich höher, was erforderlich ist, um Spam zu bekämpfen., und spielt in das wirtschaftliche Spiel ein, das OpenGov mit sich bringt, worauf wir später eingehen werden.

Sobald alle drei oben genannten Kriterien erfüllt sind, wird das Referendum in die Entscheidungsphase übergehen. Die Stimmen zum Referendum werden dann zum Ergebnis gezählt.

### Entscheidungsphase

*Für eine schnelle Video-Demonstration der Entscheidungsphase siehe [dieses Video](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Sobald ein Referendum alle in dem oben genannten Abschnitt detaillierten Kriterien erfüllt hat, wird es in die Entscheidungsphase eintreten.

Die Entscheidungsphase dreht sich um zwei Hauptkonzepte, nämlich die Zustimmungs- und Unterstützungskriterien.

Zustimmung wird als Anteil des Zustimmungsgewichts (AYEs vs. NAYs) im Vergleich zum Gesamtstimmengewicht (alle AYE- und NAY-Stimmen zusammen) definiert. Die Überzeugung jeder Stimme zählt zum Gesamtgewicht der AYE/NAY-Stimmen (mehr über Überzeugungsabstimmung / freiwillige Sperrung in einem späteren Abschnitt).

Unterstützung ist die Gesamtzahl der Stimmen (Tokens), die an dem Referendum teilgenommen haben (und wird nicht für Überzeugung angepasst) im Vergleich zur Gesamtzahl der möglichen Stimmen, die im System abgegeben werden könnten (denken Sie dabei an die Gesamtausgabe von XRT auf der Parachain - insbesondere ist die Gesamtumlaufmenge von XRT hier nicht der Hauptfaktor, da ein Teil dieser Zahl als ERC-20-Token auf Ethereum existiert).

**Stimmen, die in die ABSTAIN-Richtung gehen, tragen NICHT zu den Zustimmungskriterien bei, werden jedoch in die Unterstützungskriterien einbezogen / zählen dazu**

Ein Referendum muss während der Entscheidungsphase die Unterstützungs- UND Zustimmungskriterien erfüllen, um in die Bestätigungsphase übergehen zu können.

Für Details zu den individuellen Unterstützungs- und Zustimmungskriterien für jede Spur siehe dieses [Tabellenblatt](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Bestätigungsphase

Jede Spur hat eine spezifische Dauer für ihre Bestätigungsphase. Spuren mit höheren Privilegieniveaus (wie Root) haben deutlich längere Bestätigungszeiträume als solche mit niedrigeren Privilegieniveaus (wie Small Tipper).

Referenda müssen während der gesamten Dauer der Bestätigungsphase weiterhin die Zustimmungs- und Unterstützungskriterien erfüllen, andernfalls werden sie erneut in die Entscheidungsphase zurückversetzt (Hinweis: Die Entscheidungsphase wird während der Bestätigungsphase nicht angehalten, daher ist es durchaus möglich, dassEine Entscheidungsfrist kann während der Bestätigungsfrist ablaufen, was bedeutet, dass, wenn ein Referendum aufgrund des Nichterfüllens der Genehmigungs- und Unterstützungskriterien aus der Bestätigungsfrist herausfällt, es dann als gescheitertes Referendum betrachtet wird und nicht umgesetzt wird).

**Es ist möglich, die Genehmigungs- und Unterstützungskriterien für einzelne Tracks durch ein Referendum mit Root-Origin-Privilegien anzupassen.**

Ursprünge mit niedrigeren Privilegien haben wesentlich einfachere Genehmigungs- und Unterstützungskriterien (festgelegt durch den Track), die erfüllt werden müssen, als diejenigen mit höheren Privilegien. Ebenso haben Ursprünge mit höheren Privilegien weniger steile Kurven als diejenigen mit weniger Privilegien (wie im Track definiert), um sicherzustellen, dass das Token-Inhaber-DAO das Referendum tatsächlich genehmigt und Referendum-Sniping für Referenden mit hohem Privileg vermeidet.

In OpenGov werden Referenden, die nach Ablauf der Entscheidungsfrist nicht genehmigt werden, standardmäßig als abgelehnt betrachtet, und sowohl die Einreichungs- als auch die Entscheidungseinlagen werden an ihre Urheber zurückerstattet (Hinweis: Die Entscheidungseinlage kann von jemand anderem als dem Urheber des Referendums eingereicht werden).

Wenn ein Referendum es schafft, kontinuierlich die Genehmigungs- und Unterstützungskriterien für die gesamte Bestätigungsfrist zu erfüllen, wird es als genehmigt betrachtet und wird geplant, von der vorgeschlagenen Quelle aus ausgeführt zu werden, aber das Referendum wird erst nach Ablauf der Mindestumsetzungsfrist ausgeführt.

### Umsetzungsfrist

Die Umsetzungsfrist wird vom Urheber festgelegt, wenn das Referendum vorgeschlagen wird, unterliegt jedoch der Mindestumsetzungsfrist, die in jedem Track festgelegt ist. Mächtigere Ursprünge haben eine viel längere Mindestumsetzungsfrist als diejenigen mit weniger Privilegien. Dies stellt sicher, dass das Netzwerk ausreichend Zeit hat, sich auf etwaige Änderungen vorzubereiten, die ein mächtiges Referendum veranlassen könnte.

## Freiwilliges Sperren / Überzeugung

Robonomics verwendet ein Konzept namens freiwilliges Sperren oder Überzeugungsabstimmung. Dies ermöglicht es Token-Inhabern, ihre Abstimmungsmacht zu erhöhen, indem sie entscheiden, wie lange sie ihre Token für ein bestimmtes Referendum sperren möchten. Dieser Mechanismus betrifft nur die Genehmigungskriterien für jedes Referendum, und die Überzeugungsabstimmung hat keinen Einfluss auf die Unterstützungskriterien.

Die Überzeugungsabstimmung kann mit folgender Formel berechnet werden:

$$\text{Genehmigungsstimmen} = \text{Token} * \text{Überzeugungs\_Multiplikator}$$

In dieser Tabelle sehen Sie, wie sich jeder steigende Sperrzeitraum für die Genehmigungskriterien multipliziert:

| Sperrzeiten | Stimmenmultiplikator | Sperrtage |
|--------------|-----------------|--------------|
| Keine Sperre      | 0,1x            | 0          |
| 1            | 1x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


Die maximale Überzeugung, die ein Token-Inhaber verwenden kann, beträgt 6x Überzeugung. Sie können die Überzeugung nur gemäß der obigen Tabelle festlegen und beispielsweise nicht 5,5x Überzeugung verwenden.

Während ein Token aufgrund einer Abstimmung gesperrt ist, können sie immer noch an anderen Abstimmungen teilnehmen, werden jedoch nicht Teil Ihres übertragbaren Guthabens sein (Sie können es nicht an ein anderes Konto senden) – und das Guthaben wird erst wieder übertragbar, wenn die gesamte Sperrfrist abgelaufen ist.

## Abstimmungsdelegation

In OpenGov wurde ein Mechanismus hinzugefügt, um Token-Inhabern, die nicht unbedingt genug Zeit haben, um jede Abstimmung zu überprüfen, zu ermöglichen, dass ihre Token weiterhin Teil des Governance-Systems sind. Dies wird als Abstimmungsdelegation bezeichnet.

Token-Inhaber können wählen, ihre Abstimmungsmacht einem anderen Wähler im System (einem anderen Konto) zu delegieren. Wähler können ihre Abstimmungsmacht auf agile Weise delegieren, was es ihnen ermöglicht, ihre Abstimmungsmacht für jede einzelne Origin an ein anderes Konto zuzuweisen. Wähler können auch festlegen, dass sie für jede Origin (Anzahl der Token und Überzeugungsstufe) eine unterschiedliche Menge an Abstimmungsmacht zuweisen.

Dieses Delegationsmerkmal hat ein Ziel, die Wahlbeteiligung zu erhöhen und sicherzustellen, dass die erforderlichen Beteiligungen zur Erfüllung der Genehmigungs- und Unterstützungskriterien erfüllt werden.

Um Ihre Abstimmungsmacht zu delegieren, können Sie die Funktion "Delegieren" verwenden, die Sie im Bereich Governance -> Abstimmung auf dem [Robonomics-Portal](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer) finden können. Alternativ können Benutzer das convictionVoting(Delegate)-Extrinsikum unter Verwendung des Bereichs Entwickler -> Extrinsika des Robonomics-Portals einreichen, jedoch ist die Verwendung der "Delegieren"-Funktion des Abstimmungsbereichs des Portals viel einfacher.

## Abbrechen / Beenden von Abstimmungen und das Governance-Wirtschaftsspiel

In OpenGov gibt es Origins, die darauf spezialisiert sind, laufende Abstimmungen abzulehnen, unabhängig von ihrem Status. Diese werden als Governance Canceller und Governance Killer bezeichnet.Spuren.

Diese Ursprünge greifen in ein bereits abgestimmtes Referendum ein. Diese Ursprünge werden, wenn das aus ihnen stammende Referendum genehmigt wird, sofort ein laufendes Referendum ablehnen, unabhängig von seinem Status.

Die Stornierung selbst ist eine Art Referendum, über das die Token-Inhaber abstimmen müssen, um ausgeführt zu werden. Die Stornierung hat ihren eigenen Ursprung und ihre eigene Spur, die eine kürzere Vorlaufzeit (Entscheidungszeitraum usw.) haben und Kurven für Genehmigung und Unterstützung mit einer steileren Kurve aufweisen (was bedeutet, dass ihre Kriterien im Laufe der Zeit viel einfacher zu erfüllen sind) als andere Ursprünge. Dies liegt daran, dass die Stornierung eines Referendums normalerweise mit einem gewissen Dringlichkeitsgefühl einhergeht.

Der Governance Canceller zielt darauf ab, ein bereits laufendes Referendum sofort abzulehnen. Wenn ein Referendum von diesem Ursprung abgelehnt wird, werden sowohl die Einreichungs- als auch die Entscheidungseinlagen an ihre Urheber zurückgezahlt. Ein Beispiel dafür, wann ein Referendum als abgelehnt betrachtet werden könnte, ist, wenn der Urheber einen menschlichen Fehler in den Inhalten seines Referendums gemacht hat und nicht unbedingt versucht hat, etwas Böswilliges zu tun.

Der Governance Killer zielt darauf ab, ein bereits laufendes Referendum sofort abzulehnen. Hier kommt das Governance-Wirtschaftsspiel ins Spiel. Ursprünge mit hohen Privilegien, wie Root, haben eine Entscheidungseinlage, für die eine hohe Kapitalmenge (XRT-Token) hinterlegt werden muss, damit das Referendum in den Entscheidungszeitraum eintritt.

Wenn ein bösartiger Akteur ein Referendum einreicht, wie z.B. ein Referendum mit Root-Ursprüngen, das darauf abzielt, den `set_code` des Laufzeits des Chains auf etwas zu setzen, was die Blockproduktion der Chain stoppen würde, kann die DAO der Token-Inhaber ein Gegenreferendum des Governance Killers erheben, um diese Aktion zu bestrafen. Wenn das bösartige Referendum über den Governance Killer-Ursprung abgelehnt wird, werden sowohl die Einreichungs- als auch die Entscheidungseinlagen gekürzt, was bedeutet, dass der Urheber (die Konten, die diese Einlagen hinterlegt haben) diese Gelder verlieren werden.

Das bedeutet, dass es für bösartige Akteure schwerwiegende wirtschaftliche Konsequenzen hat, ein Referendum zu erheben, das schwerwiegende negative Auswirkungen für die Chain haben würde, was in der Theorie jeden bösartigen Akteur davon abhalten wird, dies zu versuchen.

Die Entscheidungseinlage für die Governance Killer-Spur selbst ist ziemlich hoch, um ebenso bösartige Akteure daran zu hindern, Einlagen von ansonsten guten Referenden zu kürzen. **Ein bestehendes Governance Killer-Referendum kann durch ein nachfolgendes Governance Killer-Referendum beendet werden.**

## Robonomics Technical Committee & Whitelisted Origin

Diese Gruppe ist ein selbstverwaltendes Expertengremium, das es sich zum Hauptziel gesetzt hat, Menschen zu vertreten, die das technische Wissen des Robonomics-Netzwerkprotokolls verkörpern und besitzen.Die Gruppe (und nur diese Gruppe) ist in der Lage, Referenden aus dem Whitelist-Paket zu initiieren. Dieses Paket erlaubt es einem Ursprung, das Privilegienlevel eines anderen Ursprungs für eine bestimmte Operation zu eskalieren.

Diese Gruppe kann Referenden von einem Ursprung namens Whitelisted-Root autorisieren, und diese Referenden können mit Root-Level-Privilegien ausgeführt werden, aber sie werden nur erfolgreich sein, wenn bestimmte spezifizierte Befehle autorisiert wurden. Das Whitelist-Paket überprüft zwei Dinge:
1. Der Ursprung ist tatsächlich der Whitelisted-Root (d.h. das Referendum wurde über diesen Ursprungspfad geleitet).
2. Der Vorschlag wurde tatsächlich von der Gruppe auf die Whitelist gesetzt.

Wenn beide Bedingungen erfüllt sind, wird die Operation mit Root-Level-Privilegien ausgeführt.

Dieses System ermöglicht die Einrichtung eines neuen parallelen Pfads (Whitelisted-Root-Ursprung), dessen Parameter eine kürzere Abstimmungsdauer ermöglichen (Genehmigungs- und Unterstützungskriterien sind etwas einfacher zu erfüllen als bei Root). Dieser offene und transparente Prozess ermöglicht es diesem Expertengremium des Robonomics Network Protokolls, Referenden vorzuschlagen, die sie als sicher und zeitkritisch erachten.

Es sei darauf hingewiesen, dass die Unterstützungskriterien für Referenden, die mit dem Whitelisted-Root-Ursprung initiiert wurden, im Gegensatz zu vielen anderen Ursprüngen/Pfaden nicht gegen 0 tendieren. Dies stellt sicher, dass diese Gruppe nicht de facto die gesamte Kontrolle über das gesamte Robonomics Network Protokoll hat und eine Mindestunterstützung (Wählerbeteiligung) von den Gesamt-Tokeninhabern der DAO erfordert.

## Dauer der Referenden

Es ist wichtig zu verstehen, dass die Dauer jedes einzelnen Referendums keine feste Größe ist, sie ist nicht in Stein gemeißelt. Einige Perioden im Lebenszyklus des Referendums, wie die Mindestumsetzungsfrist, haben tatsächlich eine feste Dauer, andere, einschließlich der Entscheidungsfrist, nicht. Es ist also nicht korrekt, die maximalen Dauern für die Vorbereitungs-, Entscheidungs-, Bestätigungs- und Mindestumsetzungsperioden zusammenzurechnen und zu behaupten, dass "jedes Referendum X Tage dauern wird", es ist viel flexibler als das.

Betrachten wir dies anhand einiger separater Referenden, die alle vom gleichen Ursprung, in diesem Fall dem Root-Ursprung, stammen.

Der Root-Ursprung hat seinen eigenen Pfad, auf dem die Dauern für jede Periode festgelegt sind, sowie die Genehmigungs- und Unterstützungskurven.

Es ist wichtig zu bedenken, dass Referenden nur in die nächste Phase ihres Lebenszyklus übergehen, wenn bestimmte Bedingungen erfüllt sind.{% roboWikiPicture {src:"docs/robonomics-opengov/2.jpeg", alt:"Bild"} %}{% endroboWikiPicture %}

Sie sollten in den folgenden Bildern davon ausgehen, dass die Bedingungen, wie sie im obigen Bild beschrieben sind, erfüllt sein müssen, damit ein Referendum in die nächste Phase seines Lebenszyklus übergehen kann (sofern nicht anders angegeben).


### Maximale mögliche Dauer bei sehr geringer Wahlbeteiligung

Das folgende Bild stellt eine Darstellung des maximal möglichen Zeitplans für ein Referendum dar. Denken Sie an ein Referendum, das:
1. Seinen Entscheidungseinsatz gepostet hat und daher in die Entscheidungsphase übergegangen ist.
2. Eine einzige Stimme hat, zum Beispiel 1 XRT, in Richtung AYE - dies bedeutet, dass es die erforderliche Unterstützung (Wahlbeteiligung) erst am Ende der Entscheidungsphase erreichen wird (da die Gesamtunterstützung extrem gering ist), aber eine Zustimmung von 100% hat und daher letztendlich die Anforderungen für den Eintritt in die Bestätigungsphase erfüllen wird.
3. Während der Bestätigungsphase weiterhin die oben genannten Kriterien erfüllt.
4. Der von dem Referendum vorgeschlagene Vorschlag wird genau im gleichen Block umgesetzt, wie die Mindestumsetzungsfrist endet - technisch gesehen kann der Initiator des Referendums die Netzwerkänderungen gemäß dem Referendum festlegen, um viele Blöcke in der Zukunft umzusetzen. Daher könnte der tatsächliche Lebenszyklus eines einzelnen Referendums über viele Tage, Wochen, Monate oder Jahre hinweg reichen.

{% roboWikiPicture {src:"docs/robonomics-opengov/3.jpeg", alt:"Bild"} %}{% endroboWikiPicture %}

Wir können sehen, dass in diesem Beispiel der Lebenszyklus des Referendums (ungefähr) 17 Tage betragen würde.


### Dauer bei hoher Wahlbeteiligung (mit einer hohen Anzahl von AYE-Stimmen)

Lassen Sie uns nun ein Referendum betrachten, bei dem sich der XRT-Token-Inhaber-DAO sehr interessiert gezeigt hat. In diesem Beispiel gehen wir davon aus, dass ~248.771 XRT insgesamt an Wahlbeteiligung stattgefunden haben und alle Wähler in Richtung AYE abstimmen (Anmerkung: Technisch gesehen müssen zu diesem Zeitpunkt eines Root-Referendums gemäß der Spur nur 60% der Stimmen in Richtung AYE sein, damit ein Referendum die Zustimmungskriterien erfüllt).

{% roboWikiNote {title:"Hinweis:", type: "warning"}%}  Konsultieren Sie immer die aktuellsten Informationen zur Spur für genaue Informationen zu jeder Spur. Weitere Informationen finden Sie in diesem [Tabellenblatt]](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).
{% endroboWikiNote %}

In diesem Beispiel:
1. Die Entscheidungseinlage wurde während der Vorbereitungsphase veröffentlicht und konnte daher am Ende der Vorbereitungsphase in die Entscheidungsphase übergehen.
2. Viele Wähler haben an diesem Referendum teilgenommen - und in relativ kurzer Zeit eine Wahlbeteiligung von ~248.771 XRT erreicht.
3. Die Stimmen waren mehrheitlich in Richtung AYE (alles über 60% AYE).
4. Das Referendum erfüllt kontinuierlich die Kriterien für die Bestätigungsphase während seiner gesamten Bestätigungsphase (Hinweis: Wenn ein Referendum aufhört, die Kriterien der Bestätigungsphase zu erfüllen, wird es zurück in seine Entscheidungsphase versetzt).
5. Der Vorschlag, der durch das Referendum erhoben wird, wird genau im gleichen Block umgesetzt, in dem die Mindestumsetzungsfrist endet.

Aufgrund der Tatsache, dass es eine Wahlbeteiligung von ~248.771 XRT gab, wird das Referendum nach ~168 Stunden (7 Tage) die Kriterien erfüllen, um in seine Bestätigungsphase einzutreten.

{% roboWikiPicture {src:"docs/robonomics-opengov/4.jpeg", alt:"Bild"} %}{% endroboWikiPicture %}

Wir können sehen, dass in diesem zweiten Beispiel aufgrund der Tatsache, dass es eine gute Wahlbeteiligung gab, die Entscheidungsphase tatsächlich zur Hälfte ihrer maximalen Zeit endete. Dies führt zu einem Referendum, das in ~10 Tagen umgesetzt werden kann.


### Dauer, wenn die Entscheidungseinlage nie veröffentlicht wird

Lassen Sie uns nun ein Referendum betrachten, das entstanden ist, aber nie seine Entscheidungseinlage veröffentlicht hat. Solche Referenden befinden sich in einer Art "Schwebezustand", in dem ihre Vorbereitungsphase abgeschlossen ist, aber da die Entscheidungseinlage nicht veröffentlicht wurde, bleibt das Referendum im "Vorbereitungsstatus".

{% roboWikiPicture {src:"docs/robonomics-opengov/5.jpeg", alt:"Bild"} %}{% endroboWikiPicture %}

Wir können sehen, dass in diesem dritten Beispiel aufgrund der Tatsache, dass die Entscheidungseinlage nie veröffentlicht wurde, das Referendum tatsächlich nie in die Entscheidungsphase eintreten wird, sondern im "Vorbereitungsstatus" verbleibt. Das bedeutet, dass das Referendum letztendlich, wenn keine Entscheidungseinlage veröffentlicht wird, nach der in der Konstanten timeOut angegebenen Dauer abläuft.Die Zeit für die Einreichung der Palette ist abgelaufen.

Dies ist auf Kusama bereits geschehen, als eine Abstimmung mit Root-Ursprüngen veröffentlicht wurde, aber aufgrund der hohen Kapitalanforderungen für die Einreichung der Entscheidungskaution die Abstimmung nie in die späteren Phasen ihres Lebenszyklus überging. Solche Abstimmungen enden mit der "abgelaufenen" Markierung.

### Dauer, wenn die Entscheidungskaution spät eingereicht wird

Schließlich werfen wir einen Blick auf ein Beispiel, bei dem die Entscheidungskaution erst eine Weile nach der Entstehung der Abstimmung eingereicht wurde. Dies ist auf Kusama bereits vorgekommen, als eine Abstimmung mit Root-Ursprung veröffentlicht wurde, aber der Urheber Zeit benötigte, um jemanden mit einer hohen Kapitalmenge zu finden, der die Entscheidungskaution in ihrem Namen einreichte.

{% roboWikiPicture {src:"docs/robonomics-opengov/6.jpeg", alt:"Bild"} %}{% endroboWikiPicture %}

In diesem letzten Beispiel, da die Entscheidungskaution nach Ablauf der Vorbereitungsphase, aber vor Ablauf der Abstimmung eingereicht wurde, ist der Lebenszyklus der Abstimmung tatsächlich länger als normal, da sie nach einer längeren Zeit in die Entscheidungsphase übergeht.

Es ist wichtig zu beachten, dass das Token-Inhaber-DAO in der Lage ist, AYE/NAY über Abstimmungen abzustimmen, die sich in der Vorbereitungsphase befinden oder im "Vorbereitungsstatus" stecken geblieben sind.