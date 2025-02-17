import { describe, expect, it } from 'vitest';

import { jsonReplacer } from '../json';

describe('JSON replacer', () => {
  it('handles non-error values', () => {
    const value = 'not an error';

    expect(jsonReplacer('', value)).toBe(value);
  });

  it('handles error values', () => {
    const errorMesage = 'Error message';

    const value = new TypeError(errorMesage);

    expect(jsonReplacer('', value)).toMatchObject({
      error: true,
      type: 'TypeError',
      message: errorMesage,
      stack: expect.any(String),
      cause: undefined,
    });
  });
});
