import { describe, expect, it } from 'vitest';

import { jsonReplacer } from '../formatters';

describe('formatters', () => {
  describe('jsonReplacer', () => {
    it('handles not-error values', () => {
      const value = 'not an error';

      expect(jsonReplacer('', value)).to.equal(value);
    });

    it('handles error values', () => {
      const errorMesage = 'Error message';

      const value = new TypeError(errorMesage);

      expect(jsonReplacer('', value)).to.toMatchObject({
        error: true,
        type: 'TypeError',
        message: errorMesage,
        stack: expect.any(String),
        cause: undefined,
      });
    });
  });
});
