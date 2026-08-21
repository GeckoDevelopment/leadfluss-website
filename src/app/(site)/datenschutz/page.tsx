import type { Metadata } from "next";
import type { ReactNode } from "react";
import { PageHeader } from "@/components/site/page-header";
import { CookieSettingsLink } from "@/components/site/cookie-settings-link";

export const metadata: Metadata = {
  title: "Datenschutz",
  robots: { index: false },
};

// Stand der Datenschutzerklärung – bei inhaltlichen Änderungen aktualisieren.
const STAND = "August 2026";

function Section({
  id,
  title,
  children,
}: {
  id: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-28">
      <h2 className="text-xl font-semibold text-foreground">{title}</h2>
      <div className="mt-3 space-y-3 text-muted-foreground">{children}</div>
    </section>
  );
}

function SubHeading({ children }: { children: ReactNode }) {
  return (
    <h3 className="mt-5 text-base font-semibold text-foreground">{children}</h3>
  );
}

export default function DatenschutzPage() {
  return (
    <>
      <PageHeader
        title="Datenschutzerklärung"
        description={`Stand: ${STAND}`}
      />
      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <div className="space-y-10 leading-relaxed">
          <p className="text-muted-foreground">
            Der Schutz deiner personenbezogenen Daten ist uns wichtig. Nachfolgend
            informieren wir dich gemäß der Datenschutz-Grundverordnung (DSGVO) und
            dem Bundesdatenschutzgesetz (BDSG) darüber, welche Daten wir beim Besuch
            dieser Website verarbeiten, zu welchen Zwecken und auf welcher
            Rechtsgrundlage – und welche Rechte dir zustehen.
          </p>

          <Section id="verantwortlicher" title="1. Verantwortlicher">
            <p>
              Verantwortlicher im Sinne der DSGVO ist:
            </p>
            <p className="text-foreground/90">
              Leadfluss GmbH
              <br />
              Rückertstraße 4
              <br />
              04157 Leipzig
              <br />
              Vertreten durch: Armin Hirschfeld, Peer Joeressen
            </p>
            <p>
              Telefon:{" "}
              <a href="tel:+4934160823338" className="hover:text-foreground">
                +49 341 60823338
              </a>
              <br />
              E-Mail:{" "}
              <a href="mailto:info@leadfluss.de" className="hover:text-foreground">
                info@leadfluss.de
              </a>
            </p>
            <p>
              Wir haben keinen Datenschutzbeauftragten bestellt, da hierfür die
              gesetzlichen Voraussetzungen nicht vorliegen. Bei Fragen zum
              Datenschutz erreichst du uns unter den oben genannten Kontaktdaten.
            </p>
          </Section>

          <Section
            id="grundlagen"
            title="2. Rechtsgrundlagen der Verarbeitung"
          >
            <p>
              Wir verarbeiten personenbezogene Daten nur, wenn eine gesetzliche
              Grundlage besteht. In Betracht kommen insbesondere:
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>
                <strong className="font-medium text-foreground">
                  Art. 6 Abs. 1 lit. a DSGVO
                </strong>{" "}
                – deine Einwilligung (z. B. für Statistik- und Marketing-Cookies).
              </li>
              <li>
                <strong className="font-medium text-foreground">
                  Art. 6 Abs. 1 lit. b DSGVO
                </strong>{" "}
                – Erfüllung eines Vertrags oder vorvertraglicher Maßnahmen (z. B.
                Bearbeitung deiner Anfrage).
              </li>
              <li>
                <strong className="font-medium text-foreground">
                  Art. 6 Abs. 1 lit. f DSGVO
                </strong>{" "}
                – unser berechtigtes Interesse (z. B. sicherer und stabiler
                Betrieb der Website).
              </li>
            </ul>
          </Section>

          <Section id="hosting" title="3. Hosting und Server-Logfiles">
            <p>
              Unsere Website wird bei folgendem externen Dienstleister (Hoster)
              betrieben:
            </p>
            <p className="text-foreground/90">
              Vercel Inc.
              <br />
              340 S Lemon Ave #4133
              <br />
              Walnut, CA 91789, USA
            </p>
            <p>
              Die beim Betrieb der Website anfallenden personenbezogenen Daten
              werden auf der Infrastruktur von Vercel verarbeitet und gespeichert.
              Rechtsgrundlage ist unser berechtigtes Interesse an einer sicheren und
              performanten Bereitstellung unserer Website (Art. 6 Abs. 1 lit. f
              DSGVO). Mit dem Anbieter haben wir einen Vertrag zur
              Auftragsverarbeitung (AVV) gemäß Art. 28 DSGVO geschlossen. Da eine
              Verarbeitung auch in den USA erfolgen kann, stützen wir den
              Datentransfer auf geeignete Garantien im Sinne der Art. 44 ff. DSGVO
              (insbesondere EU-Standardvertragsklauseln bzw. den
              Angemessenheitsbeschluss EU-US Data Privacy Framework). Weitere
              Informationen findest du in der{" "}
              <a
                href="https://vercel.com/legal/privacy-policy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Datenschutzerklärung von Vercel
              </a>
              .
            </p>
            <p>
              Bei jedem Aufruf unserer Website erfasst der Server automatisch
              Informationen, die dein Browser übermittelt (sogenannte
              Server-Logfiles):
            </p>
            <ul className="list-disc space-y-1 pl-5">
              <li>anonymisierte bzw. gekürzte IP-Adresse</li>
              <li>Datum und Uhrzeit des Zugriffs</li>
              <li>aufgerufene Seite/Datei und übertragene Datenmenge</li>
              <li>Meldung über erfolgreichen Abruf (HTTP-Statuscode)</li>
              <li>Browsertyp und -version, Betriebssystem</li>
              <li>Referrer-URL (zuvor besuchte Seite)</li>
            </ul>
            <p>
              Diese Daten sind für uns keiner bestimmten Person zuordenbar. Die
              Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO;
              unser berechtigtes Interesse liegt in der technischen Bereitstellung,
              Sicherheit und Stabilität der Website. Die Logfiles werden nach kurzer
              Zeit gelöscht, soweit sie nicht zur Aufklärung von Störungen oder
              Missbrauch benötigt werden.
            </p>
          </Section>

          <Section id="cookies" title="4. Cookies und Einwilligung (Consent)">
            <p>
              Unsere Website verwendet Cookies und vergleichbare Technologien
              (z. B. Local Storage). Cookies sind kleine Textdateien, die auf deinem
              Endgerät gespeichert werden. Technisch notwendige Cookies – etwa zum
              Speichern deiner Cookie-Auswahl – setzen wir auf Grundlage von § 25
              Abs. 2 TDDDG sowie Art. 6 Abs. 1 lit. f DSGVO ein; sie sind für den
              Betrieb der Website erforderlich.
            </p>
            <p>
              Alle nicht notwendigen Cookies und Dienste (Statistik und Marketing)
              setzen wir ausschließlich mit deiner Einwilligung nach § 25 Abs. 1
              TDDDG und Art. 6 Abs. 1 lit. a DSGVO ein. Beim ersten Besuch fragen
              wir über unser Consent-Banner deine Einwilligung ab. Solange keine
              Einwilligung vorliegt, bleiben Statistik- und Marketing-Dienste
              deaktiviert.
            </p>
            <p>
              Zur technischen Umsetzung nutzen wir den{" "}
              <em>Google Consent Mode v2</em>: Standardmäßig sind alle Analyse- und
              Marketing-Signale auf „abgelehnt“ gesetzt und werden erst nach deiner
              Zustimmung aktiviert.
            </p>
            <p>
              Deine Einwilligung ist freiwillig und kann jederzeit mit Wirkung für
              die Zukunft widerrufen oder angepasst werden. Öffne dazu einfach deine{" "}
              <CookieSettingsLink className="font-medium text-signal underline underline-offset-4 hover:no-underline" />
              . Zusätzlich kannst du Cookies in den Einstellungen deines Browsers
              löschen oder blockieren.
            </p>
          </Section>

          <Section id="kontakt" title="5. Kontaktaufnahme und Anfrageformular">
            <p>
              Wenn du uns über das Anfrageformular oder per E-Mail kontaktierst,
              verarbeiten wir die von dir angegebenen Daten – insbesondere Name,
              E-Mail-Adresse, Telefonnummer sowie deine Angaben zu deinem Betrieb
              und deinem Anliegen –, um deine Anfrage zu bearbeiten und mit dir in
              Kontakt zu treten.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche
              Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an
              der Beantwortung von Anfragen). Die Daten werden gelöscht, sobald sie
              für die Zweckerreichung nicht mehr erforderlich sind und keine
              gesetzlichen Aufbewahrungspflichten entgegenstehen.
            </p>
            <SubHeading>Customer-Relationship-Management (Close)</SubHeading>
            <p>
              Zur Verwaltung von Anfragen und Kontakten nutzen wir das CRM-System
              „Close“ der Elastic Inc. (USA). Die von dir übermittelten Daten werden
              dort gespeichert, damit wir deine Anfrage strukturiert bearbeiten
              können. Die Übermittlung erfolgt auf Grundlage von Art. 6 Abs. 1
              lit. b bzw. lit. f DSGVO. Da eine Verarbeitung in den USA erfolgen
              kann, stützen wir den Datentransfer auf geeignete Garantien im Sinne
              der Art. 44 ff. DSGVO (insbesondere EU-Standardvertragsklauseln bzw.
              den Angemessenheitsbeschluss EU-US Data Privacy Framework). Mit dem
              Anbieter besteht ein Auftragsverarbeitungsvertrag.
            </p>
          </Section>

          <Section id="terminbuchung" title="6. Terminbuchung (Calendly)">
            <p>
              Für die Vereinbarung von Erstgesprächen setzen wir „Calendly“ der
              Calendly LLC (USA) ein. Wenn du einen Termin buchst, werden die von
              dir eingegebenen Daten (z. B. Name, E-Mail-Adresse, Wunschtermin)
              sowie technische Verbindungsdaten von Calendly verarbeitet. Das
              Calendly-Widget wird erst geladen, wenn du die entsprechende Seite
              aufrufst bzw. dein Consent dies zulässt.
            </p>
            <p>
              Rechtsgrundlage ist Art. 6 Abs. 1 lit. b DSGVO (Anbahnung/Durchführung
              eines Gesprächstermins) bzw. deine Einwilligung nach Art. 6 Abs. 1
              lit. a DSGVO. Auch hier kann eine Datenübermittlung in die USA
              erfolgen, die wir auf die Garantien der Art. 44 ff. DSGVO stützen.
              Details findest du in der{" "}
              <a
                href="https://calendly.com/de/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Datenschutzerklärung von Calendly
              </a>
              .
            </p>
          </Section>

          <Section id="videos" title="7. Videos (Wistia)">
            <p>
              Zur Einbindung von Videos nutzen wir den Dienst „Wistia“ der Wistia,
              Inc. (USA). Beim Abspielen eines Videos wird eine Verbindung zu den
              Servern von Wistia hergestellt; dabei können Nutzungsdaten (z. B.
              IP-Adresse, Informationen zum wiedergegebenen Video, Gerät und
              Browser) verarbeitet werden.
            </p>
            <p>
              Rechtsgrundlage ist – soweit erforderlich – deine Einwilligung nach
              Art. 6 Abs. 1 lit. a DSGVO, im Übrigen unser berechtigtes Interesse an
              einer ansprechenden Darstellung unseres Angebots (Art. 6 Abs. 1 lit. f
              DSGVO). Eine Datenübermittlung in die USA stützen wir auf die
              Garantien der Art. 44 ff. DSGVO. Weitere Informationen findest du in
              der{" "}
              <a
                href="https://wistia.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Datenschutzerklärung von Wistia
              </a>
              .
            </p>
          </Section>

          <Section
            id="analyse"
            title="8. Webanalyse und Marketing (Google Tag Manager, Google-Dienste)"
          >
            <SubHeading>Google Tag Manager</SubHeading>
            <p>
              Wir nutzen den Google Tag Manager der Google Ireland Limited, Gordon
              House, Barrow Street, Dublin 4, Irland. Der Tag Manager ist ein
              Werkzeug, mit dem wir Website-Tags (z. B. für Statistik und Marketing)
              verwalten. Der Tag Manager selbst setzt keine Cookies und erfasst
              keine personenbezogenen Daten; er sorgt lediglich für das Auslösen
              anderer Tags, die ihrerseits Daten erheben können. Sofern du eine
              Deaktivierung vorgenommen hast, wird diese von den über den Tag
              Manager eingebundenen Diensten berücksichtigt.
            </p>
            <SubHeading>Google Analytics / Google Ads</SubHeading>
            <p>
              Über den Tag Manager binden wir – nur mit deiner Einwilligung
              (Art. 6 Abs. 1 lit. a DSGVO, § 25 Abs. 1 TDDDG) – Dienste von Google
              ein, insbesondere zur Reichweitenanalyse (z. B. Google Analytics) und
              zum Marketing/Remarketing (z. B. Google Ads). Diese Dienste können
              Cookies setzen und Nutzungsinformationen (z. B. gekürzte IP-Adresse,
              besuchte Seiten, Geräte- und Browserinformationen) verarbeiten, um die
              Nutzung der Website auszuwerten und die Wirksamkeit von Werbung zu
              messen.
            </p>
            <p>
              Anbieter ist die Google Ireland Limited; eine Verarbeitung durch die
              Google LLC in den USA kann nicht ausgeschlossen werden. Den
              Datentransfer stützen wir auf die Garantien der Art. 44 ff. DSGVO
              (EU-Standardvertragsklauseln bzw. EU-US Data Privacy Framework).
            </p>
            <p>
              Du kannst deine Einwilligung jederzeit über die{" "}
              <CookieSettingsLink className="font-medium text-signal underline underline-offset-4 hover:no-underline" />{" "}
              widerrufen. Weitere Informationen findest du in der{" "}
              <a
                href="https://policies.google.com/privacy?hl=de"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground"
              >
                Datenschutzerklärung von Google
              </a>
              .
            </p>
          </Section>

          <Section id="inhalte" title="9. Blog- und CMS-Inhalte (Sanity)">
            <p>
              Die Inhalte unseres Blogs und Teile der Website verwalten wir mit dem
              Headless-CMS „Sanity“ der Sanity AS (Norwegen). Beim Ausliefern von
              Inhalten und Bildern können technische Verbindungsdaten (z. B.
              IP-Adresse) an das Content-Delivery-Netzwerk von Sanity übermittelt
              werden. Rechtsgrundlage ist unser berechtigtes Interesse an einer
              effizienten Bereitstellung unserer Inhalte (Art. 6 Abs. 1 lit. f
              DSGVO).
            </p>
          </Section>

          <Section id="fonts" title="10. Schriftarten">
            <p>
              Wir binden Schriftarten („Jost“, „Geist Mono“) lokal von unserem
              eigenen Server ein. Es findet dabei kein Verbindungsaufbau zu Servern
              Dritter (etwa Google Fonts) und keine Übermittlung deiner IP-Adresse
              an Dritte statt.
            </p>
          </Section>

          <Section id="social" title="11. Social-Media-Verlinkungen">
            <p>
              Auf unserer Website verlinken wir auf unsere Profile bei LinkedIn,
              Instagram und YouTube. Es handelt sich um einfache Links; erst wenn du
              sie anklickst, wirst du zum jeweiligen Anbieter weitergeleitet und es
              werden Daten an diesen übertragen. Für die Verarbeitung auf den
              verlinkten Plattformen ist der jeweilige Anbieter verantwortlich.
            </p>
          </Section>

          <Section id="rechte" title="12. Deine Rechte">
            <p>Dir stehen nach der DSGVO insbesondere folgende Rechte zu:</p>
            <ul className="list-disc space-y-1 pl-5">
              <li>Auskunft über deine verarbeiteten Daten (Art. 15 DSGVO)</li>
              <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
              <li>Löschung deiner Daten (Art. 17 DSGVO)</li>
              <li>
                Einschränkung der Verarbeitung (Art. 18 DSGVO)
              </li>
              <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
              <li>
                Widerspruch gegen die Verarbeitung, soweit diese auf Art. 6 Abs. 1
                lit. f DSGVO beruht (Art. 21 DSGVO)
              </li>
              <li>
                Widerruf einer erteilten Einwilligung mit Wirkung für die Zukunft
                (Art. 7 Abs. 3 DSGVO)
              </li>
            </ul>
            <p>
              Zur Ausübung deiner Rechte genügt eine formlose Nachricht an{" "}
              <a href="mailto:info@leadfluss.de" className="hover:text-foreground">
                info@leadfluss.de
              </a>
              .
            </p>
            <SubHeading>Beschwerderecht bei der Aufsichtsbehörde</SubHeading>
            <p>
              Unbeschadet anderer Rechtsbehelfe steht dir ein Beschwerderecht bei
              einer Datenschutz-Aufsichtsbehörde zu. Für uns zuständig ist der
              Sächsische Datenschutzbeauftragte, Devrientstraße 5, 01067 Dresden. Du
              kannst dich jedoch an die Aufsichtsbehörde deines gewöhnlichen
              Aufenthaltsorts wenden.
            </p>
          </Section>

          <Section id="ssl" title="13. SSL-/TLS-Verschlüsselung">
            <p>
              Diese Website nutzt aus Sicherheitsgründen eine SSL-/TLS-
              Verschlüsselung. Eine verschlüsselte Verbindung erkennst du an „https://“
              in der Adresszeile deines Browsers. Bei aktiver Verschlüsselung können
              die Daten, die du an uns übermittelst, nicht von Dritten mitgelesen
              werden.
            </p>
          </Section>

          <Section id="aenderungen" title="14. Aktualität und Änderungen">
            <p>
              Diese Datenschutzerklärung hat den Stand {STAND}. Durch die
              Weiterentwicklung unserer Website oder aufgrund geänderter gesetzlicher
              bzw. behördlicher Vorgaben kann es notwendig werden, diese
              Datenschutzerklärung anzupassen. Die jeweils aktuelle Fassung kannst du
              jederzeit auf dieser Seite abrufen.
            </p>
          </Section>
        </div>
      </div>
    </>
  );
}
