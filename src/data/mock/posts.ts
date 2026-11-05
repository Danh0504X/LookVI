import type { ImageRef, Occasion, Post } from '@/domain/models';

import { mockImages as img } from './images';
import { serviceId, variantId } from './services';

type PostSeed = {
  id: string;
  artistId: string;
  lookName: string;
  caption: string;
  description: string;
  images: ImageRef[];
  styleIds: string[];
  /** Occasions whose variant can achieve this look. */
  occasions: Occasion[];
};

const seeds: PostSeed[] = [
  {
    id: 'post-korean-soft-glam',
    artistId: 'linh-nguyen',
    lookName: 'Korean Soft Glam',
    caption: 'Korean soft glam with a luminous glass finish',
    description: 'Soft, radiant makeup with natural rosy tones and a luminous glass finish.',
    images: [img.portrait02, img.portrait04, img.postNaturalGlam],
    styleIds: ['korean', 'soft-glam'],
    occasions: ['party', 'event'],
  },
  {
    id: 'post-douyin-shimmer-glow',
    artistId: 'minh-anh',
    lookName: 'Douyin Shimmer Glow',
    caption: 'Douyin shimmer eyes for party nights',
    description:
      'Dreamy shimmer eyes, glowing skin and a delicate party-ready finish with soft glitter accents.',
    images: [img.portrait04, img.portrait03],
    styleIds: ['douyin'],
    occasions: ['party', 'event'],
  },
  {
    id: 'post-clean-girl-makeup',
    artistId: 'thao-le',
    lookName: 'Clean Girl Makeup',
    caption: 'Clean girl makeup with brushed-up brows',
    description: 'Fresh, skin-first makeup with brushed-up brows and a soft balm lip.',
    images: [img.portrait05, img.lookMinimalGlow],
    styleIds: ['clean-girl', 'natural-glam'],
    occasions: ['personal', 'party'],
  },
  {
    id: 'post-velvet-evening-glam',
    artistId: 'ha-tran',
    lookName: 'Velvet Evening Glam',
    caption: 'Velvet lips and soft-focus skin for evening events',
    description: 'A defined velvet lip, sculpted cheeks and soft-focus skin for evening events.',
    images: [img.portrait03, img.portrait05],
    styleIds: ['evening-glam', 'soft-glam'],
    occasions: ['party', 'event'],
  },
  {
    id: 'post-rosy-petal-bloom',
    artistId: 'ngoc-mai',
    lookName: 'Rosy Petal Bloom',
    caption: 'Rosy petal blush for wedding guests',
    description: 'Petal-pink blush and lips with a luminous, fresh base.',
    images: [img.portrait01],
    styleIds: ['soft-glam'],
    occasions: ['party', 'event'],
  },
  {
    id: 'post-birthday-sparkle',
    artistId: 'yen-pham',
    lookName: 'Birthday Sparkle',
    caption: 'Birthday sparkle with champagne shimmer',
    description: 'Champagne shimmer lids, fluttery lashes and a glossy lip made for photos.',
    images: [img.portrait04, img.lookSunset],
    styleIds: ['douyin', 'evening-glam'],
    occasions: ['party'],
  },
  {
    id: 'post-peach-nude-makeup',
    artistId: 'bao-tran',
    lookName: 'Peach Nude Makeup',
    caption: 'Peach nude makeup in warm pastel tones',
    description: 'Warm peach tones across eyes, cheeks and lips for a soft monochrome look.',
    images: [img.portrait06, img.portrait02],
    styleIds: ['natural-glam', 'soft-glam'],
    occasions: ['party', 'event'],
  },
  {
    id: 'post-soft-brown-glam',
    artistId: 'quynh-anh',
    lookName: 'Soft Brown Glam',
    caption: 'Soft brown smoky eye for dinners',
    description: 'A diffused brown smoky eye with neutral lips and a satin base.',
    images: [img.portrait05],
    styleIds: ['soft-glam', 'evening-glam'],
    occasions: ['party', 'event'],
  },
  {
    id: 'post-everyday-natural-glam',
    artistId: 'linh-nguyen',
    lookName: 'Everyday Natural Glam',
    caption: 'Natural glam for everyday beauty',
    description: 'Light coverage, groomed brows and a my-lips-but-better finish.',
    images: [img.postNaturalGlam, img.portrait02],
    styleIds: ['natural-glam'],
    occasions: ['personal', 'party'],
  },
  {
    id: 'post-radiant-soft-glam',
    artistId: 'minh-anh',
    lookName: 'Radiant Soft Glam',
    caption: 'Soft makeup techniques for a radiant finish',
    description: 'Layered cream products for a radiant finish that still looks like skin.',
    images: [img.portrait03, img.postSoftRadiant],
    styleIds: ['soft-glam', 'natural-glam'],
    occasions: ['personal', 'party'],
  },
  {
    id: 'post-natural-peach-glam',
    artistId: 'ha-tran',
    lookName: 'Natural Peach Glam',
    caption: 'Natural peach glam look breakdown',
    description: 'Step by step: peach cream blush, soft bronze and a tinted lip.',
    images: [img.portrait02],
    styleIds: ['natural-glam'],
    occasions: ['personal', 'party'],
  },
  {
    id: 'post-glass-skin-prep',
    artistId: 'thao-le',
    lookName: 'Glass Skin Prep',
    caption: 'Clean girl glass skin prep guide',
    description: 'Hydrating prep and minimal base for a reflective, glass-skin effect.',
    images: [img.lookMinimalGlow, img.portrait05],
    styleIds: ['clean-girl', 'dewy'],
    occasions: ['personal'],
  },
  {
    id: 'post-bridal-guest-radiance',
    artistId: 'bao-tran',
    lookName: 'Bridal Guest Radiance',
    caption: 'Bridal morning natural radiance',
    description: 'Soft, natural radiance that holds up from the morning ceremony onwards.',
    images: [img.portrait06],
    styleIds: ['natural-glam'],
    occasions: ['event'],
  },
  {
    id: 'post-dewy-neutral-shimmer',
    artistId: 'quynh-anh',
    lookName: 'Dewy Neutral Shimmer',
    caption: 'Dewy neutral shimmer for graduation',
    description: 'Neutral shimmer lids and dewy skin that photograph beautifully outdoors.',
    images: [img.portrait01, img.lookSunset],
    styleIds: ['dewy', 'natural-glam'],
    occasions: ['party', 'event'],
  },
  {
    id: 'post-dewy-glass-skin',
    artistId: 'minh-anh',
    lookName: 'Dewy Glass Skin',
    caption: 'Dewy glass skin for evening events',
    description: 'Korean-inspired glass skin with a sunset-toned eye.',
    images: [img.lookSunset, img.portrait04],
    styleIds: ['dewy', 'korean'],
    occasions: ['party', 'event'],
  },
  {
    id: 'post-everyday-soft-glam',
    artistId: 'quynh-anh',
    lookName: 'Everyday Soft Glam',
    caption: 'Everyday soft glam in 45 minutes',
    description: 'A quick, polished soft glam for work events and brunches.',
    images: [img.portrait06],
    styleIds: ['soft-glam'],
    occasions: ['personal'],
  },
];

export const mockPosts: readonly Post[] = seeds.map(({ occasions, ...seed }) => ({
  ...seed,
  serviceId: serviceId(seed.artistId),
  eligibleVariantIds: occasions.map((occasion) => variantId(seed.artistId, occasion)),
}));
