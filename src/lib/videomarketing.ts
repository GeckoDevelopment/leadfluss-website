// Branchen-Landingpages für regionales Videomarketing.
//
// Diese Seiten sind bewusst NICHT in Navbar/Footer verlinkt – sie werden nur
// als Links in E-Mails eingesetzt. Aufbau je Seite: Headline, Intro, ein
// kurzes Erklärvideo (Wistia) und die Aufforderung zum Erstgespräch (/anfrage).
//
// Inhalte 1:1 von den bestehenden Seiten übernommen; nur die branchentypische
// H1 sowie das Video unterscheiden sich. Wo Intro-/Schritt-Texte abweichen
// (z. B. Franchise), werden sie pro Eintrag überschrieben.

export type VideomarketingPage = {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  intro: string;
  step1Sub: string;
  step2Sub: string;
  video: { mediaId: string; aspect: number; swatchPadding: string };
};

const DEFAULT_INTRO =
  "Im folgenden Video zeigen wir Ihnen, wie Sie mit regionalem Videomarketing qualifizierte Kundenanfragen für Ihr Angebot gewinnen, ohne zusätzlichen Zeitaufwand oder Leads von Portalen zu kaufen.";

const DEFAULT_STEP1_SUB =
  "Sie haben Interesse? In einem kurzen 15-minütigen Erstgespräch per Telefon prüfen wir gemeinsam, ob die Strategie auch für Ihren Betrieb eingesetzt werden kann und welche Ergebnisse damit bei Ihnen möglich wären.";

const DEFAULT_STEP2_SUB =
  "In einem kurzen unverbindlichen Telefonat finden wir heraus, ob und wie genau wir Sie mit Videomarketing bei der Gewinnung von 5-10 zusätzlichen Aufträgen pro Monat helfen können.";

// Häufigstes Seitenverhältnis der Videos (padding-top 55,83 %).
const RATIO_A = { aspect: 1.791044776119403, swatchPadding: "55.83%" };
// Abweichendes Seitenverhältnis (padding-top 56,04 %).
const RATIO_B = { aspect: 1.7843866171003717, swatchPadding: "56.04%" };

type Entry = Partial<Pick<VideomarketingPage, "intro" | "step1Sub" | "step2Sub">> & {
  slug: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  mediaId: string;
  ratio: { aspect: number; swatchPadding: string };
};

const ENTRIES: Entry[] = [
  {
    slug: "videomarketing-treppenlifte",
    metaTitle: "Videomarketing für Treppenlift-Anbieter",
    metaDescription:
      "Als Treppenlift-Anbieter mit regionalem Videomarketing 5-10 zusätzliche Aufträge pro Monat gewinnen – ohne Portal-Leads.",
    h1: "Als Treppenlift-Anbieter 5-10 zusätzliche Aufträge pro Monat mit regionalem Videomarketing",
    mediaId: "x1kkbc2qxu",
    ratio: RATIO_A,
  },
  {
    slug: "videomarketing-terrassendaecher",
    metaTitle: "Videomarketing für Terrassendächer",
    metaDescription:
      "Als Anbieter für Terrassendächer mit regionalem Videomarketing 5-10 zusätzliche Aufträge pro Monat gewinnen – ohne Portal-Leads.",
    h1: "Als Anbieter für Terrassendächer 5-10 zusätzliche Aufträge pro Monat mit regionalem Videomarketing",
    mediaId: "tlimhh09yr",
    ratio: RATIO_A,
  },
  {
    slug: "videomarketing-kuechenstudios",
    metaTitle: "Videomarketing für Küchenstudios",
    metaDescription:
      "Als Küchenstudio mit regionalem Videomarketing 5-10 zusätzliche Aufträge pro Monat gewinnen – ohne Portal-Leads.",
    h1: "Als Küchenstudio 5-10 zusätzliche Aufträge pro Monat mit regionalem Videomarketing",
    mediaId: "g7yjqthh3n",
    ratio: RATIO_A,
  },
  {
    slug: "videomarketing-photovoltaik",
    metaTitle: "Videomarketing für Photovoltaik-Anbieter",
    metaDescription:
      "Als Photovoltaik-Anbieter mit regionalem Videomarketing 5-10 zusätzliche Aufträge pro Monat gewinnen – ohne Portal-Leads.",
    h1: "Als Photovoltaik-Anbieter 5-10 zusätzliche Aufträge pro Monat mit regionalem Videomarketing",
    mediaId: "yi5yyk1zsb",
    ratio: RATIO_B,
  },
  {
    slug: "videomarketing-badsanierung",
    metaTitle: "Videomarketing für Badsanierer",
    metaDescription:
      "Als Badsanierer mit regionalem Videomarketing 5-10 zusätzliche Aufträge pro Monat gewinnen – ohne Portal-Leads.",
    h1: "Als Badsanierer 5-10 zusätzliche Aufträge pro Monat mit regionalem Videomarketing",
    mediaId: "8wseq4r1vq",
    ratio: RATIO_B,
  },
  {
    slug: "videomarketing-bauelemente",
    metaTitle: "Videomarketing für Bauelemente-Anbieter",
    metaDescription:
      "Als Anbieter für Bauelemente mit regionalem Videomarketing 5-10 zusätzliche Aufträge pro Monat gewinnen – ohne Portal-Leads.",
    h1: "Als Anbieter für Bauelemente 5-10 zusätzliche Aufträge pro Monat mit regionalem Videomarketing",
    mediaId: "9ki6a1myre",
    ratio: RATIO_B,
  },
  {
    slug: "videomarketing-handwerk",
    metaTitle: "Videomarketing für Handwerksbetriebe",
    metaDescription:
      "Als Handwerksbetrieb mit regionalem Videomarketing 5-10 zusätzliche Aufträge pro Monat gewinnen – ohne Portal-Leads.",
    h1: "Als Handwerksbetrieb 5-10 zusätzliche Aufträge pro Monat mit regionalem Videomarketing",
    mediaId: "irrdzq6a06",
    ratio: RATIO_A,
  },
  {
    slug: "videomarketing-waermepumpen",
    metaTitle: "Videomarketing für Wärmepumpen-Anbieter",
    metaDescription:
      "Mit regionalem Videomarketing 5-10 zusätzliche Aufträge pro Monat für Wärmepumpen gewinnen – ohne Portal-Leads.",
    h1: "5-10 zusätzliche Aufträge pro Monat für Wärmepumpen mit regionalem Videomarketing",
    mediaId: "t3r0gm7uka",
    ratio: RATIO_A,
  },
  {
    slug: "videomarketing-franchisesysteme",
    metaTitle: "Videomarketing für Franchisesysteme",
    metaDescription:
      "Als Franchise- oder Lizenzgeber mit Videomarketing 5-10 zusätzliche Partner pro Jahr gewinnen.",
    h1: "Als Franchise- oder Lizenzgeber 5-10 zusätzliche Partner pro Jahr gewinnen dank Videomarketing",
    intro:
      "Im folgenden Video zeigen wir Ihnen, wie Sie mit regionalem Videomarketing qualifizierte Anfragen für Ihr Franchise- oder Lizenzsystem gewinnen, ohne zusätzlichen Zeitaufwand oder unpassende Bewerber.",
    step1Sub:
      "Sie haben Interesse? In einem kurzen 15-minütigen Erstgespräch per Telefon prüfen wir gemeinsam, ob die Strategie auch für Ihr Konzept eingesetzt werden kann und welche Ergebnisse damit bei Ihnen möglich wären.",
    step2Sub:
      "In einem kurzen unverbindlichen Telefonat finden wir heraus, ob und wie genau wir Sie mit Videomarketing bei der Gewinnung von 5-10 zusätzlichen Partnern pro Jahr helfen können.",
    mediaId: "wrmrt5ckbk",
    ratio: RATIO_A,
  },
];

const PAGES: Record<string, VideomarketingPage> = Object.fromEntries(
  ENTRIES.map((e) => [
    e.slug,
    {
      slug: e.slug,
      metaTitle: e.metaTitle,
      metaDescription: e.metaDescription,
      h1: e.h1,
      intro: e.intro ?? DEFAULT_INTRO,
      step1Sub: e.step1Sub ?? DEFAULT_STEP1_SUB,
      step2Sub: e.step2Sub ?? DEFAULT_STEP2_SUB,
      video: {
        mediaId: e.mediaId,
        aspect: e.ratio.aspect,
        swatchPadding: e.ratio.swatchPadding,
      },
    },
  ]),
);

export function getVideomarketingPage(slug: string): VideomarketingPage {
  const page = PAGES[slug];
  if (!page) {
    throw new Error(`Unbekannte Videomarketing-Seite: ${slug}`);
  }
  return page;
}
