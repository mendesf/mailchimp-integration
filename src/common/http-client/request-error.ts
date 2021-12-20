type RequestConfig = Readonly<{
  method?: string;
  url?: string;
  data?: unknown;
}>;

type Response = Readonly<{
  status?: number;
  data?: unknown;
}>;

export type RequestError = Readonly<
  Error & {
    config: RequestConfig;
    response?: Response;
  }
>;

export type RequestErrorParams = Readonly<{
  message: string;
  config?: RequestConfig;
  response?: Response;
}>;

export default function makeRequestError(params: RequestErrorParams): RequestError {
  const { config, message, response } = params;

  return {
    name: 'RequestError',
    message,
    config: {
      method: config?.method,
      url: config?.url,
      data: config?.data,
    },
    response: {
      status: response?.status,
      data: response?.data,
    },
  };
}
