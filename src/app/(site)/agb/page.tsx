import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/site/page-header";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  robots: { index: false },
};

// Stand der AGB – bei inhaltlichen Änderungen aktualisieren.
const STAND = "August 2026";

function Section({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="scroll-mt-28">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}

// Die einzelnen Paragraphen der AGB. Jeder Eintrag rendert seine Absätze als
// eigene <p>-Elemente – die Nummerierung „(1)“ ist bewusst Teil des Textes.
const SECTIONS: { title: string; items: string[] }[] = [
  {
    title: "§ 1 Geltungsbereich",
    items: [
      "(1) Diese Allgemeinen Geschäftsbedingungen (AGB) gelten für sämtliche Verträge, Leistungen und Angebote der Leadfluss GmbH, Rückertstr. 4, 04157 Leipzig (nachfolgend „Anbieter“).",
      "(2) Abweichende oder ergänzende Bedingungen des Kunden werden nur Vertragsbestandteil, wenn der Anbieter deren Geltung ausdrücklich schriftlich zustimmt.",
      "(3) Individuelle Vereinbarungen in Hauptverträgen oder Zusatzvereinbarungen gehen diesen AGB vor.",
    ],
  },
  {
    title: "§ 2 Leistungsgegenstand",
    items: [
      "(1) Der Anbieter erbringt Dienstleistungen im Bereich Online-Marketing, insbesondere: Leadgenerierung über Online-Marketing-Funnels, Kampagnenverwaltung, technische Überwachung und Budgetkontrolle, Erstellung und Optimierung von Werbeanzeigen („Creatives“), Analyse- und Reporting-Leistungen, Produktion von Medieninhalten (Videos, Grafiken etc.) sowie optional die telefonische Vorqualifizierung von Leads.",
      "(2) Soweit nicht ausdrücklich schriftlich abweichend vereinbart, schuldet der Anbieter dem Kunden die Erbringung einer Dienstleistung, nicht eines bestimmten Werks oder konkreten Erfolgs. Der Anbieter schuldet insbesondere keine bestimmte Anzahl an Leads, keinen geschäftlichen Erfolg und keinen Vertragsabschluss zwischen Kunde und Lead.",
      "(3) Der konkrete Leistungsumfang ergibt sich aus dem jeweiligen Hauptvertrag bzw. dem vom Kunden gewählten Angebotspaket.",
      "(4) Nicht ausdrücklich vereinbarte Zusatzleistungen sind gesondert zu vergüten.",
    ],
  },
  {
    title: "§ 3 Mitwirkungspflichten des Kunden",
    items: [
      "(1) Der Kunde stellt alle zur Leistungserbringung erforderlichen Informationen, Zugänge, Materialien und Freigaben fristgerecht bereit.",
      "(2) Verzögerungen, die durch fehlende Mitwirkung entstehen, verlängern Leistungsfristen entsprechend und entbinden den Anbieter von etwaigen Leistungspflichten für den Zeitraum der Verzögerung.",
      "(3) Der Kunde ist für die Rechtmäßigkeit der von ihm bereitgestellten Inhalte verantwortlich.",
      "(4) Freigabe- und Feedbackpflicht: Fordert der Anbieter den Kunden zur Freigabe, Prüfung oder Rückmeldung zu Arbeitsergebnissen, Entwürfen, Werbemitteln, Strategien oder sonstigen Lieferungen auf, so hat der Kunde innerhalb von 7 Kalendertagen nach Zugang der Aufforderung eine Rückmeldung in Textform zu erteilen. Erfolgt innerhalb dieser Frist keine Rückmeldung, gilt die jeweilige Lieferung oder Änderung als vom Kunden genehmigt. Der Anbieter ist in diesem Fall berechtigt, auf Grundlage der genehmigten Fassung weiterzuarbeiten. Ein nachträglicher Widerspruch begründet keinen Anspruch auf kostenlose Überarbeitung.",
      "(5) Der Kunde ist dafür verantwortlich, dass die von ihm bereitgestellten Inhalte, Materialien und Marken frei von Rechten Dritter sind und nicht gegen geltendes Recht verstoßen. Der Anbieter ist nicht verpflichtet und nicht in der Lage, eine rechtliche Prüfung der vom Kunden bereitgestellten oder freigegebenen Inhalte vorzunehmen – insbesondere keine Markenrecherchen, urheberrechtliche Prüfungen oder wettbewerbsrechtliche Bewertungen. Wird der Anbieter aufgrund vom Kunden bereitgestellter Inhalte von Dritten in Anspruch genommen, stellt der Kunde den Anbieter von sämtlichen damit verbundenen Ansprüchen und Kosten frei.",
    ],
  },
  {
    title: "§ 4 Vergütung und Zahlungsbedingungen",
    items: [
      "(1) Die Vergütung ergibt sich aus dem jeweiligen Angebot oder Vertrag. Sie setzt sich in der Regel zusammen aus einer einmaligen Setupgebühr sowie einer laufenden monatlichen Agenturgebühr.",
      "(2) Setupgebühr: Die im Vertrag vereinbarte einmalige Setupgebühr ist mit Vertragsschluss fällig und vor Beginn der ersten Leistungserbringung zu entrichten. Die Setupgebühr deckt die Einrichtung, Konzeption und initiale Produktion ab und ist nicht erstattungsfähig – auch nicht bei vorzeitiger Kündigung oder Beendigung des Vertrags durch den Kunden.",
      "(3) Alle Preise verstehen sich netto zzgl. gesetzlicher Mehrwertsteuer.",
      "(4) Die Abrechnung der laufenden Agenturgebühr erfolgt monatlich auf Basis von 30-Tage-Zeiträumen, sofern nicht anders vereinbart.",
      "(5) Die Zahlung erfolgt per SEPA-Lastschrift. Der Kunde verpflichtet sich, ein gültiges SEPA-Lastschriftmandat zu hinterlegen. Kosten für Rücklastschriften trägt der Kunde, sofern er diese zu vertreten hat.",
      "(6) Die Kosten für Werbeanzeigen (Media-Budget) trägt stets der Kunde.",
      "(7) Stellt der Kunde in einem Abrechnungszeitraum kein vereinbartes Mindestwerbebudget bereit, ist der Anbieter berechtigt, für diesen Zeitraum eine pauschale Vergütung in Höhe von 1.000 € netto zu berechnen.",
    ],
  },
  {
    title: "§ 5 Werbekonten und Drittplattformen",
    items: [
      "(1) Voraussetzung für die Leistungserbringung des Anbieters ist, dass der Kunde über funktionsfähige Werbekonten auf den jeweiligen Plattformen (z. B. Meta Business Manager, Google Ads, TikTok Ads Manager) verfügt. Der Kunde stellt sicher, dass die Werbekonten ordnungsgemäß eingerichtet sind, eine gültige Zahlungsmethode hinterlegt ist und dem Anbieter die erforderlichen Zugriffsrechte erteilt werden.",
      "(2) Verfügt der Kunde noch nicht über ein Werbekonto, unterstützt der Anbieter bei der Einrichtung. Das Werbekonto verbleibt stets im Eigentum des Kunden.",
      "(3) Der Anbieter haftet nicht für Sperrungen, Einschränkungen oder Schließungen von Werbekonten durch die jeweilige Plattform, sofern diese nicht auf ein nachweisbares Fehlverhalten des Anbieters zurückzuführen sind. Insbesondere übernimmt der Anbieter keine Haftung für Richtlinienänderungen, automatisierte Sperrungen oder sonstige Maßnahmen der Plattformbetreiber.",
      "(4) Ist die Leistungserbringung aufgrund einer Kontosperre oder fehlender Zahlungsmittel des Kunden nicht möglich, entbindet dies den Kunden nicht von seiner Verpflichtung zur Zahlung der vereinbarten Agenturgebühr. Der Anbieter wird den Kunden unverzüglich über die Einschränkung informieren.",
      "(5) Der Kunde verpflichtet sich, die Nutzungsrichtlinien der jeweiligen Werbeplattformen einzuhalten. Verstöße des Kunden gegen Plattformrichtlinien, die zu Einschränkungen der Kampagnenfähigkeit führen, gehen nicht zulasten des Anbieters.",
    ],
  },
  {
    title: "§ 6 Vertragslaufzeiten und Kündigung",
    items: [
      "(1) Die Mindestvertragslaufzeit ergibt sich aus dem jeweiligen Hauptvertrag bzw. dem vom Kunden gewählten Angebotspaket.",
      "(2) Die Mindestvertragslaufzeit beginnt mit dem tatsächlichen Start der Kampagnenschaltung, spätestens jedoch zwei Monate nach Vertragsschluss. Der Anbieter wird den Kunden über den Kampagnenstart in Textform informieren.",
      "(3) Die monatliche Agenturgebühr wird erstmals mit Beginn der Kampagnenschaltung fällig, spätestens jedoch zwei Monate nach Vertragsschluss – je nachdem, welcher Zeitpunkt früher eintritt.",
      "(4) Ohne fristgerechte Kündigung (30 Tage vor Ende der jeweiligen Vertragslaufzeit) verlängert sich der Vertrag automatisch um den im Hauptvertrag festgelegten Zeitraum zu den bestehenden Vertragsbedingungen.",
      "(5) Die Kündigung bedarf der Textform (z. B. per E-Mail).",
      "(6) Ein außerordentliches Kündigungsrecht aus wichtigem Grund bleibt unberührt.",
      "(7) Die Abrechnungszeiträume orientieren sich an 30-Tages-Zeiträumen ab dem Startzeitpunkt der Kampagnenschaltung.",
    ],
  },
  {
    title: "§ 7 Nutzungsrechte an Medieninhalten",
    items: [
      "(1) Alle vom Anbieter produzierten Medieninhalte – einschließlich, aber nicht beschränkt auf Videos, Fotos, Grafiken, Rohmaterial, Schnittfassungen, Werbematerialien und Konzeptideen („Medieninhalte“) – bleiben bis zur vollständigen Erfüllung sämtlicher Zahlungs- und sonstiger vertraglicher Verpflichtungen des Kunden im alleinigen Eigentum des Anbieters.",
      "(2) Vor vollständiger Zahlung erhält der Kunde lediglich ein widerrufliches, einfaches Nutzungsrecht im Rahmen der laufenden Zusammenarbeit.",
      "(3) Nach vollständiger Begleichung aller Verbindlichkeiten wird dem Kunden ein einfaches, nicht übertragbares, weltweites Nutzungsrecht zur Verwendung der Medieninhalte für eigene Marketing- und Kommunikationszwecke eingeräumt.",
      "(4) Eine Weitergabe an Dritte ist nur mit vorheriger schriftlicher Zustimmung des Anbieters zulässig.",
      "(5) Jegliche Bearbeitung, Veränderung oder anderweitige inhaltliche Anpassung der Medieninhalte – einschließlich des Einsatzes von KI-Systemen – ist ausschließlich nach vorheriger schriftlicher Zustimmung des Anbieters zulässig.",
      "(6) Der Anbieter bleibt – auch nach Übertragung der Nutzungsrechte – Inhaber sämtlicher Urheber- und Verwertungsrechte, sofern gesetzlich zulässig.",
      "(7) Eine kommerzielle Weiterlizenzierung, der Verkauf oder sonstige entgeltliche Überlassung der Medieninhalte an Dritte ist ausdrücklich untersagt.",
      "(8) Bei ausstehenden Zahlungen oder sonstigem vertragswidrigen Verhalten ist der Anbieter berechtigt, die erteilten Nutzungsrechte vorübergehend auszusetzen oder vollständig zu widerrufen. Der Kunde verpflichtet sich in diesem Fall, die Nutzung der Medieninhalte unverzüglich einzustellen und veröffentlichte Inhalte innerhalb von 7 Kalendertagen zu entfernen.",
      "(9) Verstößt der Kunde gegen die Regelungen dieses Paragraphen, kann der Anbieter eine angemessene Vertragsstrafe verlangen. Die Geltendmachung weitergehender Schadensersatzansprüche bleibt unberührt.",
    ],
  },
  {
    title: "§ 8 Eigentumsvorbehalt",
    items: [
      "Bis zur vollständigen Zahlung aller Forderungen behält der Anbieter sich sämtliche Rechte an gelieferten oder produzierten Inhalten vor.",
    ],
  },
  {
    title: "§ 9 Referenzrecht",
    items: [
      "(1) Der Kunde erklärt sich damit einverstanden, dass der Anbieter den Kunden, dessen Firmenname, Logo und eine allgemeine Projektbeschreibung als Referenz für eigene Marketing- und Akquisezwecke verwenden darf. Dies umfasst insbesondere die Darstellung auf der Website des Anbieters, in Social-Media-Kanälen, in Präsentationen sowie in Fallstudien.",
      "(2) Die Veröffentlichung detaillierter Fallstudien oder konkreter Leistungskennzahlen des Kunden erfolgt nur nach vorheriger Abstimmung mit dem Kunden.",
      "(3) Der Kunde kann die Einwilligung jederzeit mit Wirkung für die Zukunft in Textform widerrufen. Bereits veröffentlichte Referenzen dürfen bestehen bleiben, sofern der Kunde nicht ausdrücklich deren Entfernung verlangt.",
    ],
  },
  {
    title: "§ 10 Haftung",
    items: [
      "(1) Der Anbieter haftet nur für Schäden, die auf Vorsatz oder grober Fahrlässigkeit beruhen.",
      "(2) Für einfache Fahrlässigkeit haftet der Anbieter nur bei Verletzung wesentlicher Vertragspflichten (Kardinalpflichten), jedoch begrenzt auf den vertragstypischen, vorhersehbaren Schaden.",
      "(3) Eine Haftung für entgangenen Gewinn, mittelbare Schäden oder Folgeschäden ist ausgeschlossen, soweit gesetzlich zulässig.",
      "(4) Der Anbieter haftet nicht für Ausfälle oder Störungen von Drittplattformen (z. B. Meta, Google, TikTok, YouTube) oder andere externe Ereignisse, die nicht in seinem Einflussbereich liegen.",
    ],
  },
  {
    title: "§ 11 Höhere Gewalt",
    items: [
      "(1) Keine Partei haftet für die Nichterfüllung oder verzögerte Erfüllung vertraglicher Pflichten, soweit diese auf Ereignisse höherer Gewalt zurückzuführen sind. Als höhere Gewalt gelten insbesondere: Naturkatastrophen, Pandemien, behördliche Anordnungen, Streik, Ausfall von Telekommunikationsnetzen sowie Störungen, Änderungen oder Abschaltungen von Drittplattformen (z. B. Meta, Google, TikTok), auf deren Verfügbarkeit der Anbieter keinen Einfluss hat.",
      "(2) Die betroffene Partei wird die andere Partei unverzüglich über das Vorliegen und die voraussichtliche Dauer des Hindernisses informieren.",
      "(3) Für die Dauer des Hindernisses ruhen die betroffenen Leistungspflichten, ohne dass hieraus Schadensersatzansprüche entstehen. Die Vergütungspflicht des Kunden bleibt für den Zeitraum des Hindernisses bestehen, sofern der Anbieter die Leistungserbringung im Übrigen fortführt.",
      "(4) Dauert das Hindernis länger als 60 Kalendertage an, ist jede Partei berechtigt, den Vertrag mit einer Frist von 14 Tagen außerordentlich zu kündigen.",
    ],
  },
  {
    title: "§ 12 Datenschutz",
    items: [
      "Die Verarbeitung personenbezogener Daten erfolgt gemäß der Datenschutz-Grundverordnung (DSGVO). Soweit der Anbieter im Auftrag des Kunden personenbezogene Daten verarbeitet, wird eine gesonderte Auftragsverarbeitungsvereinbarung (AVV) geschlossen.",
    ],
  },
  {
    title: "§ 13 Änderungen dieser AGB",
    items: [
      "(1) Der Anbieter kann diese AGB für zukünftige Leistungen ändern oder ergänzen, sofern der Kunde hierdurch nicht unangemessen benachteiligt wird.",
      "(2) Änderungen werden dem Kunden mindestens 14 Tage vor Inkrafttreten in Textform (z. B. per E-Mail) mitgeteilt.",
      "(3) Widerspricht der Kunde den Änderungen nicht innerhalb von 14 Tagen nach Zugang der Mitteilung, gelten die geänderten AGB als angenommen. Auf diese Folge wird der Kunde in der Änderungsmitteilung gesondert hingewiesen.",
    ],
  },
  {
    title: "§ 14 Gerichtsstand und anwendbares Recht",
    items: [
      "(1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss des UN-Kaufrechts.",
      "(2) Für alle Streitigkeiten aus oder im Zusammenhang mit diesen AGB ist ausschließlich das Gericht am Sitz des Anbieters in Leipzig zuständig, sofern der Kunde Kaufmann, juristische Person des öffentlichen Rechts oder öffentlich-rechtliches Sondervermögen ist.",
    ],
  },
  {
    title: "§ 15 Salvatorische Klausel",
    items: [
      "Sollten einzelne Bestimmungen dieser AGB unwirksam sein oder werden, bleibt die Wirksamkeit der übrigen Regelungen unberührt. Unwirksame Regelungen werden durch solche ersetzt, die dem wirtschaftlichen Zweck möglichst nahekommen.",
    ],
  },
];

export default function AgbPage() {
  return (
    <>
      <PageHeader
        title="Allgemeine Geschäftsbedingungen"
        description={`Stand: ${STAND}`}
      />
      <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="max-w-3xl space-y-8 leading-relaxed text-foreground/90">
          <div className="text-muted-foreground">
            <p>
              Leadfluss GmbH
              <br />
              Rückertstraße 4
              <br />
              04157 Leipzig
            </p>
            <p className="mt-4">
              Vertreten durch:
              <br />
              Armin Hirschfeld, Peer Joeressen
            </p>
            <p className="mt-4">
              Kontakt
              <br />
              Telefon: +49 341 60823153
              <br />
              E-Mail: info@leadfluss.de
            </p>
          </div>

          <div className="space-y-10">
            {SECTIONS.map((section) => (
              <Section key={section.title} title={section.title}>
                {section.items.map((item, i) => (
                  <p key={i}>{item}</p>
                ))}
              </Section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
