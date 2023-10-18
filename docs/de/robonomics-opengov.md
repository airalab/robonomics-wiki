---
title: Robonomics OpenGov

contributors: [Leemo94]
---

## Einführung

Robonomics hat das Governance-Modell der Parachain auf Polkadots ausgeklügelten OpenGov-Mechanismus umgestellt, der es der Kette ermöglicht, sich im Laufe der Zeit weiterzuentwickeln, letztendlich unter der Kontrolle der Token-Inhaber.
Der Übergang von Robonomics zu OpenGov stellt sicher, dass die DAO der Token-Inhaber, die die Mehrheit der Anteile kontrolliert, immer die Richtung der Robonomics Parachain bestimmen kann und jede Änderung im Netzwerk umsetzen kann, die sie für angemessen hält.

<robo-wiki-note title='Note:' type="warning">
  OpenGov gilt nur für die Robonomics Parachain, die eine auf Substrate basierende Kette ist, die mit der Kusama Relay Chain verbunden ist. OpenGov ist nicht für die Robonomics Ethereum-Implementierung anwendbar, da das Ethereum-Hauptnetz derzeit keine ausgeklügelten Governance-Systeme wie OpenGov unterstützt.
</robo-wiki-note>

OpenGov verändert, wie die täglichen Betriebsabläufe und Entscheidungsprozesse auf der Parachain durchgeführt werden. Es bietet eine größere Klarheit über den Umfang von Referenden und hat das Potenzial, die Durchsatzrate der auf der Parachain getroffenen Entscheidungen dramatisch zu erhöhen.

OpenGov ist seit einigen Monaten auf der Kusama Relay Chain live und hat gezeigt, dass es die Anzahl der Entscheidungen (individuelle und diskrete Referenden), die die DAO der Token-Inhaber vorschlagen, abstimmen und letztendlich durch Abstimmung kontrollieren kann, dramatisch erhöht.

**Der folgende Inhalt in diesem Abschnitt des Wikis erläutert die Kernprinzipien von OpenGov auf der Robonomics Parachain und soll Ihnen helfen, die Konzepte hinter OpenGov besser zu verstehen.**

*Es ist wichtig zu beachten, dass Governance ein sich ständig weiterentwickelnder Mechanismus im Protokoll ist, insbesondere in den frühen Implementierungsphasen.*

Für diejenigen, die sich ausschließlich für die Robonomics OpenGov Track-Parameter interessieren, siehe [hier](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

## Über Referenden

Referenden sind einfache, inklusive und stake-basierte Abstimmungssysteme. Jedes Referendum ist mit einem spezifischen Vorschlag verbunden, der in Form eines privilegierten Funktionsaufrufs in der Laufzeit der Ketten erfolgt. Dies kann auch den mächtigsten Aufruf `set_code` enthalten, das die Möglichkeit hat, den gesamten Code der Laufzeit der Ketten auszutauschen – dies ist einzigartig für Substrate-basierte Ketten und macht die Notwendigkeit einer „Hard Fork“ der Kette bei der Aktualisierung des Kettengeschäfts überflüssig Logik (Laufzeit).

Referenden sind diskrete Ereignisse, die eine feste Abstimmungsperiode haben (mehr über die verschiedenen Phasen während des Lebenszyklus eines Referendums später). Individuelle Token-Inhaber können auf Referenden auf eine von drei Arten abstimmen - ZUSTIMMEN (zustimmen/ja), ABLEHNEN (ablehnen/nein) oder sich vollständig von der Abstimmung enthalten.

Alle Referenden haben eine Verzögerung bei der Umsetzung. Dies ist der Zeitraum zwischen dem Ende des Referendums und der Umsetzung der Änderungen im Netzwerk, vorausgesetzt, das Referendum wurde genehmigt. 

<robo-wiki-note title='Note:' type="warning">

  Es gibt eine **Mindest**-Umsetzungsfrist, die speziell für jeden verschiedenen Typ von Ursprung festgelegt ist, aber der Urheber eines bestimmten Referendums kann die Aufgaben dieses spezifischen Referendums so einstellen, dass sie viele Blöcke in der Zukunft ausgeführt werden.

</robo-wiki-note>

Referenden gelten als "gebacken", wenn sie geschlossen sind und die Stimmen gezählt wurden. Wenn das Referendum genehmigt wurde, wird es zur Umsetzung im Netzwerk geplant (im Zeitplan der Ketten). Referenden gelten als "ungebacken", wenn das Ergebnis aussteht - zum Beispiel, wenn das Referendum noch abgestimmt wird.

Mit der Einführung von OpenGov kann jeder zu jeder Zeit ein Referendum starten und dies beliebig oft tun. OpenGov beseitigt die Beschränkung, dass nur 1 Referendum gleichzeitig verarbeitet werden kann (beachten Sie, dass in Gov v1 nur 1 Referendum gleichzeitig abgestimmt werden kann. Die einzige Ausnahme ist ein zusätzliches Notfall-Referendum des beschleunigten Technischen Ausschusses, das auch gleichzeitig von der Gemeinschaft abgestimmt werden kann).

OpenGov führt mehrere neue Funktionen/Konzepte ein, die als Ursprünge und Tracks bekannt sind, und diese werden eingeführt, um den Fluss und die Verarbeitung von Referenden im Protokoll zu unterstützen.

Jeder Ursprung ist mit einer einzigen Referendumsklasse verbunden, und jede Klasse ist mit einem Track verbunden. Der Track umreißt den Lebenszyklus für das Referendum und ist spezifisch für den jeweiligen Ursprung, aus dem das Referendum stammt. Durch das Vorhandensein von Tracks mit ihren eigenen spezifischen Parametern kann das Netzwerk den Lebenszyklus von Referenden dynamisch modifizieren, basierend auf ihrem Privilegieniveau (Sie können sich das Privilegieniveau als die Stärke eines Referendums vorstellen / welche Arten von Änderungen es am Protokoll vornehmen kann).

*Denken Sie an Ursprünge als die mit einem Referendum verbundene Macht und denken Sie an Tracks als die Abstimmungsparameter, wie die Länge der Perioden und die Kriterien für Zustimmung und Unterstützung.*

Ein Upgrade der Laufzeit hat zum Beispiel nicht die gleichen Auswirkungen auf das Protokoll wie ein kleiner Schatzmeistertipp, und daher sind unterschiedliche Ursprünge erforderlich, bei denen unterschiedliche Wahlbeteiligungen, Zustimmungen, Einlagen und Umsetzungszeiträume (Tracks) im Pallet der Ketten vorbestimmt werden.

## Ein Referendum vorschlagen und den Lebenszyklus eines Referendums 

### Vorbereitungszeit

In OpenGov kann ein Referendum, sobald es erstellt wurde, sofort von der Token-Inhaber-Gemeinschaft abgestimmt werden. Es befindet sich jedoch nicht sofort in einem Zustand, in dem es beendet werden kann oder seine Stimmen gezählt, genehmigt und summarisch umgesetzt werden können. Stattdessen müssen Referenden eine Reihe von Kriterien erfüllen, bevor sie in den Entscheidungszeitraum überführt werden. Bis Referenden in den Entscheidungszeitraum eintreten, bleiben sie unentschieden und laufen schließlich nach dem insgesamt festgelegten Lebenszykluszeitraum in der jeweiligen Spur ab.

<robo-wiki-picture src='robonomics-opengov/1.jpeg' alt="picture" />

Die Kriterien für ein Referendum, um in den Entscheidungszeitraum einzutreten, lauten wie folgt:
1. Eine Vorbereitungszeit, die angibt, wie viel Zeit vergehen muss, bevor der Entscheidungszeitraum beginnen kann. Diese Vorbereitungszeit soll das Risiko von "Entscheidungsschnappschüssen" mindern, bei denen ein Angreifer, der einen erheblichen Anteil an Abstimmungsmacht kontrolliert, versucht, seinen großen Anteil zu nutzen, um ein Referendum unmittelbar nach dem Vorschlag zu bestehen und so die Möglichkeit für die anderen Mitglieder des Token-Inhaber-DAO zu umgehen, angemessen Zeit für die Prüfung des Referendums und die Teilnahme an der Abstimmung zu haben. Deshalb haben Ursprünge mit höheren Privilegien erheblich längere Vorbereitungszeiten.

2. Es muss Platz für die Entscheidung vorhanden sein. Jede Spur hat ihre eigenen Grenzen für die Anzahl der Referenden, die gleichzeitig entschieden werden können (max_deciding). Spuren mit höheren Privilegien haben niedrigere Grenzwerte. Zum Beispiel wird der Ursprung auf Root-Ebene im Vergleich zu Ursprüngen mit niedrigeren Privilegien wie dem Small Tipper-Ursprung eine deutlich geringere Anzahl von Referenden haben, die gleichzeitig entschieden werden können.

3. Die Entscheidungseinlage muss eingereicht werden. Das Erstellen eines Referendums ist anfangs recht günstig, und der Wert der Einreichungseinlage (die bei der Erstellung des Referendums reserviert wird) ist recht niedrig und besteht hauptsächlich aus den Kosten für die On-Chain-Speicherung, die mit dem Referendum verbunden ist. Entscheidungseinlagen sind erheblich höher, was erforderlich ist, um Spam zu bekämpfen und in das wirtschaftliche Spiel einzusteigen, das OpenGov mit sich bringt, auf das wir später eingehen werden.

Sobald alle diese drei oben genannten Kriterien erfüllt sind, wird das Referendum in den Entscheidungszeitraum übergehen. Die Stimmen zum Referendum werden dann auf das Ergebnis gezählt.

### Entscheidungszeitraum

*Für eine schnelle Video-Demonstration des Entscheidungszeitraums siehe [dieses Video](https://www.youtube.com/watch?v=wk58C-2CqPI)*.

Sobald ein Referendum alle in dem oben beschriebenen Abschnitt detaillierten Kriterien erfüllt hat, tritt es in den Entscheidungszeitraum ein.

Der Entscheidungszeitraum dreht sich um zwei Hauptkonzepte, nämlich die Zustimmungs- und Unterstützungskriterien. 

Zustimmung wird definiert als der Anteil des Zustimmungsgewichts (JA gegen NEIN) im Vergleich zum Gesamtstimmgewicht (alle JA- und NEIN-Stimmen zusammen). Die Überzeugung jeder Stimme zählt zum Gesamtgewicht der JA/NEIN-Stimmen (mehr über Überzeugungsabstimmung / freiwillige Sperrung in einem späteren Abschnitt).

Unterstützung ist die Gesamtzahl der Stimmen (Token), die an der Abstimmung teilgenommen haben (und wird nicht für Überzeugung angepasst) im Vergleich zur Gesamtzahl der möglichen Stimmen im System (denken Sie daran als die Gesamtausgabe von XRT auf der Parachain - beachten Sie, dass die Gesamtumlaufmenge von XRT hier nicht der Hauptfaktor ist, da ein Teil dieser Zahl als ERC-20-Token auf Ethereum existiert).

**Stimmen, die in die ABSTAIN-Richtung gehen, tragen NICHT zu den Zustimmungskriterien bei, werden jedoch in die Unterstützungskriterien einbezogen / gezählt**

Ein Referendum muss während des Entscheidungszeitraums die Zustimmungs- UND Unterstützungskriterien erfüllen, um in den Bestätigungszeitraum überzugehen.

Für Details zu den einzelnen Unterstützungs- und Zustimmungskriterien für jede Spur siehe diese [Tabelle](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

### Bestätigungszeitraum

Jede Spur hat eine eigene spezifische Dauer für ihren Bestätigungszeitraum. Spuren mit höheren Privilegien (wie Root) haben deutlich längere Bestätigungszeiträume als solche mit niedrigeren Privilegien (wie Small Tipper).

Referenden müssen während der gesamten Dauer des Bestätigungszeitraums die Zustimmungs- und Unterstützungskriterien erfüllen, sonst gehen sie erneut in den Entscheidungszeitraum zurück (Hinweis: Der Entscheidungszeitraum wird während des Bestätigungszeitraums nicht angehalten, sodass es durchaus möglich ist, dass ein Entscheidungszeitraum während des Bestätigungszeitraums abläuft, was bedeutet, dass ein Referendum, das nicht mehr die Zustimmungs- und Unterstützungskriterien erfüllt, aus dem Bestätigungszeitraum herausgedrängt wird und dann als gescheitertes Referendum betrachtet und nicht umgesetzt wird).

**Es ist möglich, die Genehmigungs- und Unterstützungskriterien für einzelne Tracks durch ein Referendum mit Root-Origin-Privilegien anzupassen.**

Ursprünge mit niedrigeren Privilegien haben wesentlich einfachere Genehmigungs- und Unterstützungskriterien (festgelegt vom Track), die erfüllt werden müssen, als solche mit höheren Privilegien. Ebenso haben Ursprünge mit höheren Privilegien weniger steile Kurven als solche mit weniger Privilegien (wie im Track definiert), um sicherzustellen, dass das Token-Inhaber-DAO das Referendum tatsächlich genehmigt und Referendum-Sniping für Referenden mit hohem Privilegienursprung zu vermeiden.

In OpenGov werden Referenden, die nach Ablauf der Entscheidungsfrist nicht genehmigt werden, standardmäßig als abgelehnt betrachtet, und sowohl die Einreichungs- als auch die Entscheidungseinlagen werden an ihre Urheber zurückerstattet (Hinweis: Die Entscheidungseinlage kann von jemand anderem als dem Urheber des Referendums eingereicht werden).

Wenn ein Referendum während des gesamten Bestätigungszeitraums kontinuierlich die Genehmigungs- und Unterstützungskriterien erfüllt, gilt es als genehmigt und wird zur Ausführung vom vorgeschlagenen Ursprung geplant, aber das Referendum wird erst nach Ablauf der Mindestverkündungsfrist ausgeführt.

### Verkündungsfrist

Die Verkündungsfrist wird vom Urheber festgelegt, wenn das Referendum vorgeschlagen wird, unterliegt jedoch der Mindestverkündungsfrist, die in jedem Track festgelegt ist. Mächtigere Ursprünge haben eine viel längere Mindestverkündungsfrist als solche mit weniger Privilegien. Dies stellt sicher, dass das Netzwerk ausreichend Zeit hat, sich auf etwaige Änderungen vorzubereiten, die ein mächtiges Referendum verursachen kann.

## Freiwillige Sperrung / Überzeugung

Robonomics verwendet ein Konzept namens freiwillige Sperrung oder Überzeugungsabstimmung. Dadurch können Token-Inhaber ihre Stimmkraft erhöhen, indem sie festlegen, wie lange sie bereit sind, ihre Token für eine bestimmte Abstimmung zu sperren. Dieser Mechanismus betrifft nur die Zustimmungskriterien für jede Abstimmung, und die Überzeugungsabstimmung hat keinen Einfluss auf die Unterstützungskriterien.

Die Überzeugungsabstimmung kann mit folgender Formel berechnet werden:

$$\text{Approval Votes} = \text{Tokens} * \text{Conviction\_Multiplier}$$


In dieser Tabelle sehen Sie, wie jede zunehmende Sperrdauer Ihre Stimme für die Zustimmungskriterien multipliziert:

| Lock Periods | Vote Multiplier | Lock Up Days |
|--------------|-----------------|--------------|
| No Lock      | 0.1x            | 0          |
| 1            | 1x              | 7            |
| 2            | 2x              | 14           |
| 4            | 3x              | 28           |
| 8            | 4x              | 56           |
| 16           | 5x              | 112          |
| 32           | 6x              | 224          |


Die maximale Überzeugung, die ein Token-Inhaber verwenden kann, beträgt 6-fache Überzeugung. Sie können die Überzeugung nur gemäß der obigen Tabelle festlegen und beispielsweise keine 5,5-fache Überzeugung verwenden.

Während ein Token aufgrund einer Abstimmung gesperrt ist, kann es immer noch verwendet werden, um in anderen Abstimmungen abzustimmen. Es wird jedoch nicht Teil Ihres übertragbaren Guthabens sein (Sie können es nicht an ein anderes Konto senden) - und das Guthaben wird erst wieder übertragbar, wenn die gesamte Sperrdauer abgelaufen ist.

## Stimmdelegation

In OpenGov wurde ein Mechanismus hinzugefügt, um Token-Inhabern, die möglicherweise nicht genügend Zeit haben, um jede Abstimmung zu überprüfen, dennoch zu ermöglichen, dass ihre Token Teil des Governance-Systems werden. Dies wird als Stimmdelegation bezeichnet.

Token-Inhaber können wählen, ihre Stimmkraft einem anderen Wähler im System (einem anderen Konto) zu delegieren. Wähler können ihre Stimmkraft agil delegieren und ihre Stimmkraft für jeden einzelnen Ursprung einem anderen Konto zuweisen. Wähler können auch eine unterschiedliche Menge an Stimmkraft für jeden Ursprung (Anzahl der Token und Überzeugungsstufe) festlegen.

Diese Delegationsfunktion hat ein Ziel: die Wahlbeteiligung zu erhöhen und sicherzustellen, dass die erforderlichen Beteiligungen zur Erfüllung der Zustimmungs- und Unterstützungskriterien erfüllt werden.

Um Ihre Stimmkraft zu delegieren, können Sie die Funktion "Delegieren" verwenden, die Sie im Bereich Governance -> Abstimmung des [Robonomics-Portals](https://polkadot.js.org/apps/?rpc=wss%3A%2F%2Fkusama.rpc.robonomics.network%2F#/explorer) finden können. Alternativ können Benutzer die convictionVoting(Delegate)-Extrinsik über den Bereich Entwickler -> Extrinsiken des Robonomics-Portals einreichen. Die Verwendung der "Delegieren"-Funktion des Abstimmungsbereichs des Portals ist jedoch viel einfacher.

## Abbrechen / Beenden von Abstimmungen und das Governance-Wirtschaftsspiel

In OpenGov gibt es Ursprünge, die darauf abzielen, laufende Abstimmungen abzulehnen, unabhängig von ihrem Status. Diese werden als Governance Canceller und Governance Killer-Tracks bezeichnet.

Diese Ursprünge greifen in eine bereits abgestimmte Abstimmung ein. Diese Ursprünge lehnen eine laufende Abstimmung sofort ab, unabhngig von ihrem Status, wenn die Abstimmung von ihnen stammt und genehmigt wurde. 

Die Stornierung selbst ist eine Art von Abstimmung, über die die Token-Inhaber abstimmen müssen, um ausgeführt zu werden. Die Stornierung hat ihren eigenen Ursprung und Track, die eine kürzere Vorlaufzeit (Entscheidungszeitraum usw.) haben und eine steilere Kurve für Zustimmung und Unterstützung aufweisen (dh ihre Kriterien im Laufe der Zeit viel einfacher zu erfüllen sind) als andere Ursprünge. Dies liegt daran, dass die Stornierung einer Abstimmung in der Regel mit einem gewissen Dringlichkeitsgefühl einhergeht.

Das Ziel des Governance Canceller ist es, eine bereits laufende Abstimmung sofort abzulehnen. Wenn eine Abstimmung von diesem Ursprung abgebrochen wird, werden sowohl die Einreichungs- als auch die Entscheidungseinlage an ihre Urheber zurückerstattet. Ein Beispiel dafür, wann eine Abstimmung als abgebrochen betrachtet werden könnte, ist, wenn der Urheber einen menschlichen Fehler in den Inhalten seiner Abstimmung gemacht hat und nicht unbedingt etwas Böswilliges versucht hat.

Das Ziel des Governance Killer ist es, eine bereits laufende Abstimmung sofort abzulehnen. Hier kommt das Governance-Wirtschaftsspiel ins Spiel. Ursprünge mit hohen Privilegien, wie Root, haben eine Entscheidungseinlage, für die eine hohe Menge an Kapital (XRT-Token) hinterlegt werden muss, damit die Abstimmung in den Entscheidungszeitraum eintritt. 

Wenn ein bösartiger Akteur eine Abstimmung einreicht, z. B. eine Abstimmung mit Root-Ursprüngen, die darauf abzielt, den Laufzeitcode der Kette auf etwas zu setzen, das die Erzeugung von Blöcken stoppt, kann die Token-Inhaber-DAO eine Gegen-Governance-Killer-Abstimmung erheben, um diese Aktion zu bestrafen. Wenn die bösartige Abstimmung über den Governance Killer-Ursprung abgelehnt wird, werden sowohl die Einreichungs- als auch die Entscheidungseinlagen gekürzt, was bedeutet, dass der Urheber (die Konten, die diese Einlagen hinterlegt haben) diese Mittel verlieren wird. 

Dies bedeutet, dass es für bösartige Akteure schwerwiegende wirtschaftliche Konsequenzen hat, eine Abstimmung zu erheben, die schwerwiegende negative Auswirkungen auf die Kette hätte, was in der Theorie jeden bösartigen Akteur davon abhalten wird, dies zu versuchen.

Die Entscheidungseinlage für den Governance Killer-Track selbst ist ziemlich hoch, um zu verhindern, dass ebenso bösartige Akteure versuchen, Einlagen von ansonsten guten Referenden zu kürzen. **Ein bestehendes Governance Killer-Referendum kann durch ein nachfolgendes Governance Killer-Referendum beendet werden.**

## Robonomics Technical Committee & Whitelisted Origin

Diese Gruppe ist ein selbstverwaltendes Expertengremium, das das Hauptziel hat, Menschen zu repräsentieren, die das technische Wissen des Robonomics-Netzwerkprotokolls verkörpern und besitzen. 

Diese Gruppe (und nur diese Gruppe) ist in der Lage, Referenden aus dem Whitelist-Paket zu initiieren. Dieses Paket erlaubt es einem Ursprung, das Privilegenniveau eines anderen Ursprungs für eine bestimmte Operation zu eskalieren. 

Diese Gruppe kann Referenden von einem Ursprung namens Whitelisted-Root autorisieren, und diese Referenden können mit Root-Level-Privilegien ausgeführt werden, aber diese Referenden funktionieren nur erfolgreich mit bestimmten spezifizierten Befehlen, die von der Gruppe autorisiert wurden. Das Whitelist-Paket überprüft zwei Dinge:
1. Der Ursprung ist wirklich der Whitelisted-Root (d.h. das Referendum wurde durch den Track dieses Ursprungs geleitet).
2. Der Vorschlag wurde tatsächlich von der Gruppe auf die Whitelist gesetzt.

Wenn beide Bedingungen erfüllt sind, wird die Operation mit Root-Level-Privilegien ausgeführt.

Dieses System ermöglicht die Möglichkeit, einen neuen parallelen Track (Whitelisted-Root Origin) zu haben, dessen Parameter eine kürzere Abstimmungsdauer ermöglichen (Genehmigungs- und Unterstützungskriterien sind etwas einfacher zu erfüllen als Root). Dieser offene und transparente Prozess ermöglicht es diesem Expertengremium für das Robonomics Network Protocol, Referenden vorzuschlagen, die sie als sicher und zeitkritisch erachtet haben.

Es sollte beachtet werden, dass die Unterstützungskriterien für Referenden, die mit dem Whitelisted-Root-Ursprung initiiert wurden, nicht wie bei vielen anderen Ursprüngen/Tracks gegen 0 tendieren. Dies stellt sicher, dass diese Gruppe nicht die Kontrolle über das gesamte Robonomics Network Protocol hat und erfordert ein Mindestmaß an Unterstützung (Wählerbeteiligung) von den Gesamt-Token-Inhabern.


## Referendumsdauern 

Es ist wichtig zu verstehen, dass die Dauer jedes einzelnen Referendums keine feste Sache ist, sie ist nicht in Stein gemeißelt. Einige Perioden im Lebenszyklus des Referendums, wie die Mindestumsetzungsfrist, haben tatsächlich eine feste Dauer, andere, einschließlich der Entscheidungsfrist, nicht. Es ist zum Beispiel nicht korrekt, die maximalen Dauern für die Vorbereitungs-, Entscheidungs-, Bestätigungs- und Mindestumsetzungsperioden zusammenzurechnen und zu sagen, dass "jedes Referendum X Tage dauern wird", es ist viel fließender als das.

Betrachten wir dies aus der Perspektive einiger separater Referenden, die alle vom selben Ursprung stammen, in diesem Fall dem Root-Ursprung. 

Der Root-Ursprung hat seinen eigenen Track, in dem die Dauern für jede Periode festgelegt sind, sowie die Genehmigungs- und Unterstützungskurven.

Es ist wichtig zu bedenken, dass Referenden nur dann in die nächste Phase ihres Lebenszyklus übergehen, wenn bestimmte Bedingungen erfüllt sind. 

<robo-wiki-picture src='robonomics-opengov/2.jpeg' alt="picture" />

Sie sollten davon ausgehen, dass in den folgenden Abbildungen die Bedingungen, wie sie im obigen Bild beschrieben sind, erfüllt sein müssten, damit ein Referendum in die nächste Phase seines Lebenszyklus übergeht (sofern nicht anders angegeben).


### Maximale mögliche Dauer bei sehr geringer Wählerbeteiligung

Das folgende Bild ist eine Darstellung des maximal möglichen Zeitplans für ein Referendum. Denken Sie dabei an ein Referendum, das:
1. Seine Entscheidungseinlage hinterlegt hat und daher in die Entscheidungsphase eingetreten ist.
2. Eine einzige Stimme hat, zum Beispiel 1 XRT, in Richtung AYE - dies bedeutet, dass es die erforderliche Unterstützung (Wählerbeteiligung) erst am Ende der Entscheidungsphase erreichen wird (da die Gesamtunterstützung extrem niedrig ist), aber 100% Zustimmung hat und daher letztendlich die Anforderungen für den Eintritt in die Bestätigungsphase erfüllen wird.
3. Während der Bestätigungsphase weiterhin die oben genannten Kriterien erfüllt.
4. Der von dem Referendum vorgeschlagene Vorschlag wird genau im selben Block umgesetzt, in dem die Mindestumsetzungsfrist endet - technisch gesehen kann der Initiator des Referendums die Netzwerkänderungen, wie sie im Referendum detailliert sind, viele Blöcke in die Zukunft setzen, sodass der tatsächliche Lebenszyklus eines einzelnen Referendums über viele Tage, Wochen, Monate oder Jahre hinweg reichen könnte.

<robo-wiki-picture src='robonomics-opengov/3.jpeg' alt="picture" />

Wir können sehen, dass in diesem Beispiel der Lebenszyklus des Referendums (ungefähr) 17 Tage betragen würde.


### Dauer mit hoher Wählerbeteiligung (mit einer großen Anzahl von AYE-Stimmen)

Schauen wir uns nun ein Referendum an, bei dem das XRT-Token-Inhaber-DAO großes Interesse gezeigt hat. In diesem Beispiel nehmen wir an, dass insgesamt ~248.771 XRT an Wählerbeteiligung stattgefunden hat und alle Wähler in Richtung AYE abstimmen (Hinweis: Technisch gesehen müssen zu diesem Zeitpunkt gemäß der Strecke nur 60% der Stimmen in Richtung AYE sein, damit ein Referendum die Zustimmungskriterien erfüllt).

<robo-wiki-note title="Note:" type="warning">

 Konsultieren Sie immer die aktuellsten Informationen zur Strecke, um genaue Informationen zu jeder Strecke zu erhalten. Weitere Informationen finden Sie in diesem [Spreadsheet](https://docs.google.com/spreadsheets/d/1CzUKxl5bEhLQRLC223NB81RTH4X4HgAoS1HPng23mXE/edit?usp=sharing).

</robo-wiki-note>

In diesem Beispiel:
1. Die Entscheidungseinlage wurde während der Vorbereitungsphase veröffentlicht und konnte daher am Ende der Vorbereitungsphase in die Entscheidungsphase übergehen.
2. Viele Wähler haben an diesem Referendum teilgenommen und in relativ kurzer Zeit eine Wahlbeteiligung von ~248.771 XRT erreicht.
3. Die Mehrheit der Stimmen war in Richtung AYE (mehr als 60% AYE).
4. Das Referendum erfüllt während seiner gesamten Bestätigungsphase kontinuierlich die Kriterien der Bestätigungsphase (Hinweis: Wenn ein Referendum die Kriterien der Bestätigungsphase nicht mehr erfüllt, wird es zurück in die Entscheidungsphase versetzt).
5. Der vom Referendum vorgeschlagene Vorschlag wird genau im selben Block umgesetzt, in dem die Mindestumsetzungsfrist endet.

Aufgrund der Tatsache, dass eine Wahlbeteiligung von ~248.771 XRT stattgefunden hat, erfüllt das Referendum die Kriterien, um nach ~168 Stunden (7 Tage) in seine Bestätigungsphase einzutreten.

<robo-wiki-picture src='robonomics-opengov/4.jpeg' alt="picture" />

Wir können sehen, dass in diesem zweiten Beispiel aufgrund der relativ hohen Wahlbeteiligung die Entscheidungsphase tatsächlich zur Hälfte ihrer maximalen Zeit endete. Dies führt zu einem Referendum, das in ~10 Tagen umgesetzt werden kann.


### Dauer, wenn die Entscheidungseinlage nie veröffentlicht wird

Schauen wir uns nun ein Referendum an, das zwar gestartet wurde, aber nie seine Entscheidungseinlage veröffentlicht hat. Solche Referenden befinden sich in einer Art "Schwebezustand", in dem ihre Vorbereitungsphase abgelaufen ist, aber da die Entscheidungseinlage nicht veröffentlicht wurde, bleibt das Referendum im "Vorbereitungsstatus".

<robo-wiki-picture src='robonomics-opengov/5.jpeg' alt="picture" />

Wir können sehen, dass in diesem dritten Beispiel aufgrund der Tatsache, dass die Entscheidungseinlage nie veröffentlicht wurde, das Referendum tatsächlich nie in die Entscheidungsphase eintreten wird, sondern im "Vorbereitungsstatus" bleibt. Dies bedeutet, dass das Referendum schließlich, wenn keine Entscheidungseinlage veröffentlicht wird, nach Ablauf der in der Konstante timeOut des Paletts angegebenen Dauer abläuft.

Dies ist auf Kusama bereits zuvor passiert, als ein Referendum mit Root-Ursprung veröffentlicht wurde, aber aufgrund der hohen Kapitalanforderungen zur Veröffentlichung der Entscheidungseinlage das Referendum nie in die späteren Phasen seines Lebenszyklus eingetreten ist. Solche Referenden enden mit der Kennzeichnung "abgelaufen".


### Dauer, wenn die Entscheidungseinlage spät veröffentlicht wird

Schließlich werfen wir einen Blick auf ein Beispiel, bei dem die Entscheidungseinlage erst lange Zeit nach der Entstehung des Referendums veröffentlicht wurde. Dies ist auf Kusama bereits zuvor passiert, als ein Referendum mit Root-Ursprung veröffentlicht wurde, aber der Urheber Zeit benötigte, um jemanden mit einer großen Menge Kapital zu finden, der die Entscheidungseinlage stellvertretend veröffentlicht.

<robo-wiki-picture src='robonomics-opengov/6.jpeg' alt="picture" />

In diesem letzten Beispiel ist aufgrund der Tatsache, dass die Entscheidungseinlage nach Ablauf der Vorbereitungsphase, aber vor Ablauf des Referendums veröffentlicht wurde, der Lebenszyklus des Referendums tatsächlich viel länger als normal, da es nach einer längeren Zeit in die Entscheidungsphase eintritt.

Es ist wichtig zu beachten, dass das Token-Inhaber-DAO in der Lage ist, in der Vorbereitungsphase oder im "Vorbereitungsstatus" über Referenden mit AYE/NAY abzustimmen.
