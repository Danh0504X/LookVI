/**
 * Framework-free reference to an image.
 * - `number`: a bundled asset (`require('...')`).
 * - `{ uri }`: a remote or local file URI (future backend / uploads).
 */
export type ImageRef = number | { uri: string };
