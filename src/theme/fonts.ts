import { PlayfairDisplay_400Regular } from '@expo-google-fonts/playfair-display/400Regular';
import { PlayfairDisplay_400Regular_Italic } from '@expo-google-fonts/playfair-display/400Regular_Italic';
import { PlayfairDisplay_500Medium } from '@expo-google-fonts/playfair-display/500Medium';
import { PlayfairDisplay_600SemiBold } from '@expo-google-fonts/playfair-display/600SemiBold';
import { PlusJakartaSans_400Regular } from '@expo-google-fonts/plus-jakarta-sans/400Regular';
import { PlusJakartaSans_500Medium } from '@expo-google-fonts/plus-jakarta-sans/500Medium';
import { PlusJakartaSans_600SemiBold } from '@expo-google-fonts/plus-jakarta-sans/600SemiBold';
import { PlusJakartaSans_700Bold } from '@expo-google-fonts/plus-jakarta-sans/700Bold';

/**
 * Font family names. With custom fonts each weight is its own family, so never combine
 * these with `fontWeight` (Android would ignore or fake it).
 *
 * Playfair Display = editorial titles and the wordmark only.
 * Plus Jakarta Sans = everything interactive, body copy and prices.
 */
export const fontFamilies = {
  serif: 'PlayfairDisplay_400Regular',
  serifItalic: 'PlayfairDisplay_400Regular_Italic',
  serifMedium: 'PlayfairDisplay_500Medium',
  serifSemiBold: 'PlayfairDisplay_600SemiBold',
  sans: 'PlusJakartaSans_400Regular',
  sansMedium: 'PlusJakartaSans_500Medium',
  sansSemiBold: 'PlusJakartaSans_600SemiBold',
  sansBold: 'PlusJakartaSans_700Bold',
} as const;

/** Font files to load at startup, keyed by family name. */
export const fontAssets = {
  [fontFamilies.serif]: PlayfairDisplay_400Regular,
  [fontFamilies.serifItalic]: PlayfairDisplay_400Regular_Italic,
  [fontFamilies.serifMedium]: PlayfairDisplay_500Medium,
  [fontFamilies.serifSemiBold]: PlayfairDisplay_600SemiBold,
  [fontFamilies.sans]: PlusJakartaSans_400Regular,
  [fontFamilies.sansMedium]: PlusJakartaSans_500Medium,
  [fontFamilies.sansSemiBold]: PlusJakartaSans_600SemiBold,
  [fontFamilies.sansBold]: PlusJakartaSans_700Bold,
};
