/**
 * Bundled demo images, downloaded from the Stitch exports and compressed.
 * Source alt texts and screens are listed in `assets/images/mock/manifest.json`.
 * Stitch reused six portraits for many people and looks; the demo does the same.
 * Only images referenced here are bundled; add entries as screens need them.
 * Replace with real photography before any public release (sources are 512 px).
 */
export const mockImages = {
  portrait01: require('@/assets/images/mock/portrait-01.jpg'),
  portrait02: require('@/assets/images/mock/portrait-02.jpg'),
  portrait03: require('@/assets/images/mock/portrait-03.jpg'),
  portrait04: require('@/assets/images/mock/portrait-04.jpg'),
  portrait05: require('@/assets/images/mock/portrait-05.jpg'),
  portrait06: require('@/assets/images/mock/portrait-06.jpg'),
  lookSunset: require('@/assets/images/mock/look-sunset.jpg'),
  lookMinimalGlow: require('@/assets/images/mock/look-minimal-glow.jpg'),
  postNaturalGlam: require('@/assets/images/mock/post-natural-glam.jpg'),
  postSoftRadiant: require('@/assets/images/mock/post-soft-radiant.jpg'),
  clientMaiChi: require('@/assets/images/mock/client-mai-chi.jpg'),
} as const satisfies Record<string, number>;
