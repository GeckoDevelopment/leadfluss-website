/** Feste Branchen für Kundenvideos – Reihenfolge = Reihenfolge der Filter-Chips. */
export const VIDEO_BRANCHES = [
  "Photovoltaik",
  "Wärmepumpe",
  "Bauelemente",
  "Treppenlifte",
  "Badsanierung",
  "Wanne zu Dusche",
  "Küchenstudios",
  "Hausbaufirmen",
  "Terrassendächer",
  "Handwerk",
  "Franchisesysteme",
  "Franchise",
] as const;

export type VideoBranche = (typeof VIDEO_BRANCHES)[number];
