import { Alert } from 'react-native';

/**
 * Explicit notice for actions that are not part of the demo yet, so the UI never pretends
 * a missing feature works.
 */
export function showDemoNotice(feature?: string): void {
  Alert.alert(
    'Not in the demo yet',
    feature
      ? `${feature} will be available in a later version of Lookvi.`
      : 'This will be available in a later version of Lookvi.',
  );
}
