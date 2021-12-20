import axios, { AxiosPromise } from 'axios';
import makeRequestError, { RequestError } from './request-error';

export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE' | 'PATCH';

export async function request<T>(method: Method, url: string, data?: unknown): Promise<Readonly<T>> {
  try {
    const config = { method, url, data };
    const promise = axios(config) as AxiosPromise<T>;
    const response = await promise;

    return response.data;
  } catch (err) {
    if (axios.isAxiosError(err)) throw makeRequestError(err);

    throw handleUnexpectedError(err, method, url);
  }
}

export function get<T>(url: string): Promise<Readonly<T>> {
  return request('GET', url);
}

function handleUnexpectedError(error: unknown, method: string, url: string, data?: unknown): RequestError {
  const { message } = error as Error;

  return makeRequestError({
    message,
    config: {
      method,
      url,
      data,
    },
  });
}
