/**
 * Bundled demo images, downloaded from the Stitch exports and compressed.
 * Source alt texts and screens are listed in `assets/images/mock/manifest.json`.
 * Stitch reused six portraits for many people and looks; the demo does the same.
 * Only images referenced here are bundled; add entries as screens need them.
 * Replace with real photography before any public release.
 */
export const mockImages = {
  portrait02: require('@/assets/images/mock/portrait-02.jpg'),
  portrait03: require('@/assets/images/mock/portrait-03.jpg'),
  portrait04: require('@/assets/images/mock/portrait-04.jpg'),
  clientMaiChi: require('@/assets/images/mock/client-mai-chi.jpg'),
} as const satisfies Record<string, number>;
