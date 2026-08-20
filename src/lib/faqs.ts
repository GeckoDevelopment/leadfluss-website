export type Faq = { q: string; a: string };
export type FaqCategory = { title: string; items: Faq[] };

// Vollständige FAQ, 1:1 von der bisherigen Leadfluss-Seite übernommen,
// gruppiert in dieselben Kategorien wie dort.
export const FAQ_CATEGORIES: FaqCategory[] = [
  {
    title: "Allgemeines zum Angebot & der Methode",
    items: [
  {
    q: "Muss ich Vorkenntnisse im Online-Marketing haben, um mit euch zu arbeiten?",
    a: `Nein, ob du Vorkenntnisse im Online-Marketing hast, spielt für die Zusammenarbeit mit Leadfluss keine Rolle. Da unser Team die wesentlichen Aufgaben und technischen Schritte übernimmt, kannst du dich entspannt zurücklehnen. Viele unserer Kunden hatten vor der Zusammenarbeit keinerlei Berührungspunkte mit Online-Werbung und haben Experten gesucht, die genau das für sie übernehmen – hier setzen wir an.`,
  },
  {
    q: "Warum setzt ihr so stark auf Videomarketing statt auf einfache Bild-Anzeigen?",
    a: `Videomarketing hat den riesigen Vorteil, dass wir Emotionen und Informationen viel besser transportieren können. Durch Bewegtbild versteht der Kunde schneller, worum es geht, und erkennt sofort, ob es sich um einen seriösen Anbieter handelt. Nicht jeder kann vor der Kamera zufriedene Kunden oder echte Referenzprojekte zeigen – du schon. Damit machst du dem Kunden klar, dass er bei dir Qualität bekommt. Einfache Bildanzeigen wirken dagegen oft anonym und werden schnell übersehen. Das kostet dich Budget für Reichweite, die kaum Ergebnisse bringt. Zudem sind Plattformen wie Instagram, Facebook, TikTok und YouTube mittlerweile fast reine Video-Plattformen, und da fast jeder ein Smartphone hat, ist Video das Format der Gegenwart.`,
  },
  {
    q: 'Bietet ihr eine "Rundum-sorglos-Betreuung" an oder muss ich selbst Marketingaufgaben übernehmen?',
    a: `Bei Leadfluss bekommst du alles von A bis Z – du musst dich also nicht selbst um Marketingaufgaben kümmern. Wir benötigen dich lediglich kurz zur Abstimmung der Strategie und einmalig zur Unterstützung bei der Koordination des Videodrehs vor Ort. Alles andere übernehmen wir komplett, sodass bei dir am Ende telefonisch vorqualifizierte Leads ankommen, die du für dein Angebot gewinnen kannst.`,
  },
  {
    q: "Funktioniert eure Methode nur regional oder auch deutschlandweit?",
    a: `Die Generierung von neuen Anfragen funktioniert sowohl regional als auch bundesweit. Die meisten unserer Partner agieren regional, um kurze Anfahrtswege für Vertrieb und Montage zu haben. Wir haben aber auch Vertriebsorganisationen im Portfolio, die standortunabhängig arbeiten. Auch für diese können wir selbstverständlich Leads generieren – und das sogar in größeren Mengen.`,
  },
  {
    q: "Für welche Art von Betrieben ist euer Angebot geeignet?",
    a: `Unser Angebot richtet sich hauptsächlich an Fachfirmen und Handwerksbetriebe, die ein produktbasiertes Angebot vertreiben – wie etwa Solaranlagen, Wärmepumpen oder Treppenlifte. Diese Branchen sind meist stark vertriebsorientiert, und der Erfolg hängt oft von der Anzahl und Qualität der Verkaufsgespräche ab. Genau hier setzen wir an: Da wir uns mit diesen Produkten bestens auskennen, wissen wir, wie man sie vermarkten muss, um am Ende qualifizierte Leads zu liefern.`,
  },
  {
    q: "Wie unterscheidet sich Leadfluss von klassischen Marketingagenturen?",
    a: `Wir unterscheiden uns in mehreren Punkten deutlich von klassischen Agenturen. Einer der wichtigsten: Wir werden in vielen Bereichen ergebnisbasiert bezahlt. Das bedeutet, unsere Kunden zahlen uns erst dann Geld, wenn sie auch tatsächlich Eintragungen oder qualifizierte Leads erhalten. So ist die Zusammenarbeit jederzeit fair: Beide Seiten profitieren von guten Ergebnissen und du kannst sichergehen, dass wir uns immer für deinen Erfolg einsetzen. Außerdem haben wir ein sehr tiefes Verständnis von Social Media und wissen genau, wie wir Werbung und Zielgruppenansprache konzipieren müssen. Zudem hast du bei uns immer direkten Draht zu uns als Geschäftsführern – wir sind nahbar und keine anonyme Agentur, die Aufgaben an unerfahrene Betreuer abschiebt. Ein weiterer Vorteil: Durch unsere Vor-Ort-Drehs erleben wir deine Firma live, verstehen dein Handwerk und können daraufhin Werbevideos erstellen, die genau die passenden Kunden anziehen.`,
  },
  {
    q: 'Was genau versteht ihr unter dem "Leadfluss-Konzept"?',
    a: `Beim Leadfluss-Konzept geht es im Kern um Videomarketing. Das heißt: Wir kommen zu dir vor Ort, produzieren verschiedene Werbeformate und erstellen daraus ansprechende Videos, die voll auf Conversion (Handlung) fokussiert sind. Das Ziel ist, dass Kunden die Videos nicht nur anschauen, sondern sich tatsächlich mit ihren Kontaktdaten bei dir eintragen. Aus Erfahrung wissen wir genau, welche Formate funktionieren, um neue Kunden auf dein Angebot aufmerksam zu machen. Wir wecken ihr Interesse, sodass sie sich eintragen und du sie direkt für einen Termin oder ein Erstgespräch kontaktieren kannst.`,
  },
    ],
  },
  {
    title: "Ablauf der Zusammenarbeit & Videodreh",
    items: [
  {
    q: "Kann ich euch auch in eurem Büro in Leipzig besuchen?",
    a: `Natürlich! Du kannst uns gerne nach vorheriger Anmeldung in unserem Büro in Leipzig besuchen. Schreib uns einfach eine Nachricht oder E-Mail, dann finden wir einen passenden Termin.`,
  },
  {
    q: "Was passiert, wenn ich aktuell keine eigenen Videos liefern kann?",
    a: `Das ist überhaupt kein Problem. Du musst kein Material liefern, denn wir kommen ja extra zu dir, um alles zu produzieren, was wir für erfolgreiche Werbung brauchen. Wir kümmern uns um Aufnahme, Schnitt und Vertonung.`,
  },
  {
    q: "Wie lange dauert es vom ersten Gespräch bis zur ersten geschalteten Kampagne?",
    a: `Das hängt davon ab, wie schnell wir starten können. Sobald du uns die Zusage gibst, können wir den Videodreh meist innerhalb von 14 Tagen umsetzen. Danach brauchen wir etwa 7 Tage, um die Videos zu schneiden und die Kampagnen startklar zu machen. Insgesamt kannst du also oft schon nach drei Wochen mit den ersten Ergebnissen rechnen – je nach Standort manchmal sogar schneller.`,
  },
  {
    q: "Wie viel Zeit muss ich als Inhaber für die Zusammenarbeit pro Woche einplanen?",
    a: `Als Inhaber musst du keine feste wöchentliche Zeit einplanen. Wir melden uns, wenn wir etwas brauchen – und umgekehrt. Natürlich kannst du dich jederzeit melden, wenn du Ideen oder Feedback hast. Wir verzichten aber auf unnötige regelmäßige Calls, da wir aus Erfahrung wissen: Es ist effizienter, nur dann zu sprechen, wenn es wirklich etwas zu besprechen gibt. Der einzige nennenswerte Zeitaufwand entsteht einmalig beim Onboarding und beim Videodreh vor Ort.`,
  },
  {
    q: "Ich fühle mich unwohl vor der Kamera – funktioniert das trotzdem?",
    a: `Du musst nicht zwingend selbst vor die Kamera. Es reicht völlig aus, wenn mindestens ein Mitarbeiter bereit ist, etwas zu sagen. Sollte auch das schwierig sein, können wir einen externen Sprecher organisieren, der dein Unternehmen nach außen repräsentiert. Sprich uns einfach darauf an, wir finden eine Lösung. Allerdings empfehlen wir gerade Geschäftsführern oder Vertriebsleitern, sich selbst zu zeigen. Wenn Kunden dich schon im Video gesehen haben, bevor das erste Gespräch stattfindet, ist das Vertrauen automatisch höher und der Abschluss fällt leichter. Wir leiten dich beim Dreh genau an, sodass du auch ohne Vorerfahrung und trotz Nervosität authentisch rüberkommst. Gemeinsam kriegen wir das hin.`,
  },
  {
    q: "Kommt ihr für die Videodrehs zu uns in den Betrieb oder auf die Baustelle?",
    a: `Genau, für die Videodrehs kommen wir direkt zu dir. Wir begleiten euren Arbeitsalltag auf Baustellen, im Büro, im Lager oder direkt beim Kunden. So entstehen authentische Formate, die dein Angebot attraktiv präsentieren. Wir waren in den letzten Jahren schon auf hunderten Baustellen und in dutzenden Lagern – wir wissen also genau, wie wir deine Firma und deine Mitarbeiter am besten in Szene setzen. Sag uns einfach, wann wir vorbeikommen sollen, und wir regeln den Rest.`,
  },
  {
    q: "Wie läuft der Start einer Zusammenarbeit ab?",
    a: `Zum Start führen wir einen Onboarding-Termin durch. Dort klären wir alle wichtigen Fragen zu deinem Angebot, deinem Unternehmen, deiner Wunsch-Zielgruppe und deinen Produkten. Wir besprechen auch, auf welchem Weg du die Leads empfangen möchtest und worauf wir bei der Qualifizierung achten sollen. Dieses Gespräch bildet das Fundament unserer Zusammenarbeit, auf dem wir deine Werbekampagne maßgeschneidert aufbauen.`,
  },
    ],
  },
  {
    title: "Ergebnisse & Leads",
    items: [
  {
    q: "Was, wenn ich plötzlich zu viele Anfragen bekomme und diese nicht abarbeiten kann?",
    a: `Solltest du von Anfragen überrannt werden und mit der Abarbeitung nicht hinterherkommen, gib uns einfach Bescheid. Wir können den „Hahn zudrehen“, indem wir das Werbebudget drosseln. Dann kommen sofort weniger Anfragen rein. Wenn du später wieder Kapazitäten hast, fahren wir das System einfach wieder hoch. Du hast also volle Kontrolle.`,
  },
  {
    q: "Funktioniert das System auch für komplexe Produkte wie Photovoltaik oder Dachsanierungen?",
    a: `Absolut. Die entscheidende Frage ist immer: Gibt es einen Markt und Menschen in deiner Region, die bereit sind, Geld für dein Angebot auszugeben? Wenn du bereits eine etablierte Firma hast und regelmäßig Aufträge gewinnst, ist der Beweis erbracht. Wir entwickeln dann gemeinsam eine Strategie, wie wir dein komplexes Angebot einfach und attraktiv präsentieren. Auf diesem Weg haben wir schon dutzende Fachbetriebe in Bereichen wie Photovoltaik oder Dachsanierung erfolgreich unterstützt.`,
  },
  {
    q: "Wie stellt ihr sicher, dass die Anfragen auch qualitativ hochwertig sind (echtes Kaufinteresse)?",
    a: `Die beste Bestätigung für Qualität ist die Treue unserer Kunden: Einige Partnerfirmen sind mittlerweile seit über drei Jahren bei uns in der Betreuung. Wenn die Leads nicht zu Aufträgen und Umsatz führen würden, wären diese Firmen längst nicht mehr bei uns. Wir setzen schon im Video und im Eintragungsprozess Filter, um echtes Interesse abzufragen. Ja, wir können bestätigen: Es funktioniert und bringt messbaren Umsatz.`,
  },
  {
    q: "Mit wie vielen Leads pro Monat kann ich realistisch rechnen?",
    a: `Die meisten unserer Partner erhalten zwischen 30 und 200 Leads pro Monat. Die genaue Zahl hängt natürlich von deiner Firmengröße, der Region und dem Budget ab. Mit 10.000 € Werbebudget generierst du logischerweise mehr Anfragen als mit 1.000 €. Pauschal lässt sich das schwer sagen. Melde dich am besten für ein Erstgespräch, dann analysieren wir deine Situation und sagen dir, was für dein Unternehmen realistisch möglich ist.`,
  },
  {
    q: "Sind die generierten Leads exklusiv für meinen Betrieb oder werden sie mehrfach verkauft?",
    a: `Die generierten Leads gehören exklusiv dir und werden nicht weiterverkauft. Das ist der wesentliche Unterschied zu großen Leadportalen. Bei uns bekommst du nicht nur den exklusiven Kontakt, der sich nur bei dir eingetragen hat, sondern profitierst auch vom Branding-Effekt: Deine Firma wird in deiner Region sichtbar, und potenzielle Kunden kommen an deinem Angebot kaum noch vorbei.`,
  },
  {
    q: "Wie schnell kann ich mit den ersten Anfragen (Leads) rechnen?",
    a: `Ab dem Moment, wo wir die Werbung live schalten, dauert es meistens weniger als 7 Tage, bis die ersten Anfragen eintreffen – oft passiert das sogar schon innerhalb der ersten 24 Stunden. Anders als bei SEO (Suchmaschinenoptimierung), wo man Monate warten muss, liefert unsere Strategie kurzfristige Ergebnisse. Der Algorithmus spielt die Werbung ab Tag 1 an die richtige Zielgruppe aus.`,
  },
    ],
  },
  {
    title: "Kosten & Verträge",
    items: [
  {
    q: "Gibt es versteckte Kosten neben der Betreuungspauschale und dem Werbebudget?",
    a: `Unsere Kostenstruktur ist transparent: Es gibt einen Preis für die initiale Einrichtung und den Videodreh sowie eine monatliche Vergütung, die sich oft an den Ergebnissen (Anzahl der Leads) orientiert. Hinzu kommt das Werbebudget, das du aber nicht an uns, sondern direkt an die Plattformen (z. B. Meta/Facebook) zahlst. Eine klassische „Pauschale fürs Nichtstun“ gibt es bei uns nicht – wir definieren die Kosten so, dass es für beide Seiten fair und motivierend ist.`,
  },
  {
    q: "Ist das Erstgespräch wirklich kostenlos und unverbindlich?",
    a: `Ja. Wir können und wollen nicht jedem helfen, und genau dafür ist das Erstgespräch da. Wir stellen dir einige Fragen, um zu prüfen, ob eine Zusammenarbeit überhaupt Sinn ergibt. Da wir zu diesem Zeitpunkt noch gar nicht wissen, ob wir dir helfen können, ist dieses Gespräch zu 100 % kostenfrei und unverbindlich. Sollte es nicht passen, sagen wir dir das auch ehrlich.`,
  },
  {
    q: "Gibt es lange Vertragslaufzeiten oder bin ich flexibel?",
    a: `Wir halten nichts von Knebelverträgen. Viele Agenturen binden Kunden sofort für 12 Monate, aus denen man kaum herauskommt. Bei Leadfluss wollen wir durch Ergebnisse überzeugen, nicht durch Kleingedrucktes. Deshalb kannst du bei uns nach einer kurzen Startphase monatlich flexibel über die Zusammenarbeit entscheiden.`,
  },
  {
    q: "Wie viel Werbebudget sollte ich monatlich einplanen?",
    a: `Wir empfehlen unseren Kunden in der Regel ein Startbudget von mindestens 1.000 € pro Monat für die Werbeplattformen. Manche Kunden investieren auch 5.000 € oder mehr – das hängt ganz von deinen Zielen ab. Um genau festzulegen, welches Budget für deinen Start sinnvoll ist, führen wir immer ein gemeinsames Strategiegespräch.`,
  },
    ],
  },
  {
    title: "Skepsis & Vertrauen",
    items: [
  {
    q: "Wie viele Betriebe betreut ihr aktuell?",
    a: `Derzeit betreuen wir bei Leadfluss aktiv ca. 30 bis 50 Fachfirmen in ganz Deutschland.`,
  },
  {
    q: "Wir haben bereits jemanden für Marketing im Haus – könnt ihr uns trotzdem unterstützen?",
    a: `Absolut. Marketing ist ein weites Feld, und die wenigsten internen Marketingabteilungen können professionelle Videoproduktion und Performance-Marketing auf diesem Niveau selbst abdecken. Wir können beispielsweise gezielt nur die Videoproduktion oder die Kampagnenschaltung übernehmen und euer Team damit entlasten. So profitiert ihr von besserem Werbematerial und externem Expertenwissen (siehe z. B. unsere Fallstudie mit Altmarksolar).`,
  },
  {
    q: "Wer steckt eigentlich hinter Leadfluss?",
    a: `Gegründet wurde Leadfluss von Peer Joeressen und Armin Hirschfeld. Beide starteten 2022 ursprünglich mit einem Solarrechner für die Photovoltaikbranche. Durch die enge Zusammenarbeit mit Solarfirmen entstand ein Jahr später das spezialisierte Videomarketing-Konzept. Mittlerweile haben sie diesen Ansatz auf weitere Bereiche ausgeweitet und verstehen Leadfluss heute als den Lead-Generator für alle Gewerke rund ums Haus.`,
  },
  {
    q: "Kann ich mit anderen Partnerbetrieben von euch sprechen, um deren Erfahrungen zu hören?",
    a: `Ja, natürlich. Frag gerne bei uns an, und wir vermitteln dir ein Gespräch mit einem unserer Partner. Transparenz ist uns wichtig.`,
  },
  {
    q: "Habt ihr Erfahrung in meiner spezifischen Branche?",
    a: `Wir haben bereits Erfahrungen mit vielen Branchen „rund ums Haus“ gesammelt. Dazu gehören Photovoltaik, Wärmepumpen, Dach- und Badsanierung, Fensterbau, Küchen, aber auch Bereiche wie Pflegedienste, Immobilien oder Reparaturen. Falls du in einer dieser Branchen tätig bist, können wir dich bestens betreuen. Aber auch bei abweichenden Themen finden wir oft sehr gute Lösungen – sprich uns einfach an.`,
  },
  {
    q: "Ich war mit anderen Agenturen unzufrieden. Warum sollte es mit Leadfluss anders laufen?",
    a: `Häufig scheitern andere Agenturen daran, dass ihnen das tiefere Verständnis für das Handwerk fehlt oder sie schlichtweg zu viele Kunden annehmen, die sie dann nicht betreuen können. Wir bei Leadfluss setzen auf „Klasse statt Masse“. Wir nehmen lieber einen Kunden weniger an, um unsere Bestandskunden exzellent zu betreuen. Bei uns hast du direkte Ansprechpartner, und wir rufen dich monatlich proaktiv an, um die Ergebnisse zu besprechen. Zudem denken wir langfristig – dein Erfolg ist unsere Visitenkarte.`,
  },
    ],
  },
];

// Flache Liste aller Fragen (z. B. für strukturierte Daten).
export const FAQS: Faq[] = FAQ_CATEGORIES.flatMap((c) => c.items);
