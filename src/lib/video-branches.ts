/** Feste Branchen für Kundenvideos – Reihenfolge = Reihenfolge der Filter-Chips. */
export const VIDEO_BRANCHES = [
  "Photovoltaik",
  "Wärmepumpe",
  "Bauelemente",
  "Treppenlifte",
  "Badsanierung",
  "Küchenstudios",
  "Hausbaufirmen",
  "Terrassendächer",
  "Handwerk",
  "Franchisesysteme",
] as const;

export type VideoBranche = (typeof VIDEO_BRANCHES)[number];
