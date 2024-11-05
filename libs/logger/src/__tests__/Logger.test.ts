import { beforeEach, describe, expect, it, vi } from 'vitest';

import Logger from '../Logger';

const fakeLabel = 'fakeLabel';

const fakeMessageParts = ['messagePart1', 2, {}];

const internalLoggerDebugMock = vi.fn();

const internalLoggerInfoMock = vi.fn();

const internalLoggerWarnMock = vi.fn();

const internalLoggerErrorMock = vi.fn();

vi.mock(import('../helpers'), () => ({
  createBaseLogger: () => ({
    debug: internalLoggerDebugMock,
    info: internalLoggerInfoMock,
    warn: internalLoggerWarnMock,
    error: internalLoggerErrorMock,
  }),
}));

describe.only('Logger', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('logs a debug message', () => {
    const logger = Logger.create({ srcDirname: '', label: fakeLabel });

    logger.debug(...fakeMessageParts);

    expect(internalLoggerDebugMock).toHaveBeenCalledOnce();

    expect(internalLoggerDebugMock).toHaveBeenCalledWith({
      message: fakeMessageParts,
      label: fakeLabel,
    });

    expect(internalLoggerInfoMock).not.toHaveBeenCalled();

    expect(internalLoggerWarnMock).not.toHaveBeenCalled();

    expect(internalLoggerErrorMock).not.toHaveBeenCalled();
  });

  it('logs an info message', () => {
    const logger = Logger.create({ srcDirname: '', label: fakeLabel });

    logger.info(...fakeMessageParts);

    expect(internalLoggerDebugMock).not.toHaveBeenCalled();

    expect(internalLoggerInfoMock).toHaveBeenCalledOnce();

    expect(internalLoggerInfoMock).toHaveBeenCalledWith({
      message: fakeMessageParts,
      label: fakeLabel,
    });

    expect(internalLoggerWarnMock).not.toHaveBeenCalled();

    expect(internalLoggerErrorMock).not.toHaveBeenCalled();
  });

  it('logs a warn message', () => {
    const logger = Logger.create({ srcDirname: '', label: fakeLabel });

    logger.warn(...fakeMessageParts);

    expect(internalLoggerDebugMock).not.toHaveBeenCalled();

    expect(internalLoggerInfoMock).not.toHaveBeenCalled();

    expect(internalLoggerWarnMock).toHaveBeenCalledOnce();

    expect(internalLoggerWarnMock).toHaveBeenCalledWith({
      message: fakeMessageParts,
      label: fakeLabel,
    });

    expect(internalLoggerErrorMock).not.toHaveBeenCalled();
  });

  it('logs a warn message', () => {
    const logger = Logger.create({ srcDirname: '', label: fakeLabel });

    logger.error(...fakeMessageParts);

    expect(internalLoggerDebugMock).not.toHaveBeenCalled();

    expect(internalLoggerInfoMock).not.toHaveBeenCalled();

    expect(internalLoggerWarnMock).not.toHaveBeenCalled();

    expect(internalLoggerErrorMock).toHaveBeenCalledOnce();

    expect(internalLoggerErrorMock).toHaveBeenCalledWith({
      message: fakeMessageParts,
      label: fakeLabel,
    });
  });
});
