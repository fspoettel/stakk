import { convert } from 'html-to-text';

export function stripHtml(str: unknown) {
  if (typeof str !== 'string') return '';
  return convert(str);
}
