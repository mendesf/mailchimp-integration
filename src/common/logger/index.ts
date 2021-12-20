export type LogLevel = 'debug' | 'info' | 'warn' | 'error';

export type Log = (message: string, data?: unknown) => void;

export type Logger = Readonly<{
  debug: Log;
  info: Log;
  warn: Log;
  error: Log;
}>;

function makeLogFn(level: LogLevel): Log {
  return (message: string, data?: unknown): void => {
    const logFn = console[level];

    if (!data) return logFn(message);

    const json = JSON.stringify(data, replaceError, 2);

    logFn(message, json);
  };
}

const logger: Logger = {
  debug: makeLogFn('debug'),
  info: makeLogFn('info'),
  warn: makeLogFn('warn'),
  error: makeLogFn('error'),
};

export default logger;

function replaceError(_key: string, value: Record<string, unknown>): Record<string, unknown> {
  if (value instanceof Error) {
    const newValue = Object.getOwnPropertyNames(value).reduce(
      (obj: Record<string, unknown>, propName: string) => {
        if (propName === 'stack') return obj;
        obj[propName] = value[propName];

        return obj;
      },
      { name: value.name },
    );
    return newValue;
  }

  return value;
}
