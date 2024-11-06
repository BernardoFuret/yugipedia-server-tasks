import { inspect } from 'node:util';

import { describe, expect, it, vi } from 'vitest';

import { createMessageFormatter } from '../text';

vi.mock('node:util', { spy: true });

describe('Text formatter', () => {
  const nonColoredFormatter = createMessageFormatter({ isColored: false });

  it('formats string messages as is', () => {
    const timestamp = '2024';

    const label = 'label';

    const level = 'level';

    const messageParts = ['string', 'message', 'parts'];

    expect(
      nonColoredFormatter({
        timestamp,
        label,
        level,
        message: messageParts,
      }),
    ).toMatchInlineSnapshot(`"[2024] [label] [level]: string message parts"`);
  });

  it('handles non-string values', () => {
    const timestamp = '2024';

    const label = 'label';

    const level = 'level';

    const firstMessagePart = 1;

    const secondMessagePart: never[] = [];

    const thirdMessagePart = {};

    const messageParts = [firstMessagePart, secondMessagePart, thirdMessagePart];

    expect(
      nonColoredFormatter({
        timestamp,
        label,
        level,
        message: messageParts,
      }),
    ).toMatchInlineSnapshot(`"[2024] [label] [level]: 1 [] {}"`);

    expect(inspect).toHaveBeenCalledTimes(messageParts.length);

    expect(inspect).toHaveBeenNthCalledWith(1, firstMessagePart, expect.any(Object));

    expect(inspect).toHaveBeenNthCalledWith(2, secondMessagePart, expect.any(Object));

    expect(inspect).toHaveBeenNthCalledWith(3, thirdMessagePart, expect.any(Object));
  });
});
