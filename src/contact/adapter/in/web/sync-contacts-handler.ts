import { RequestHandler, Response } from 'common/http-server';
import { SyncContactsFunction } from 'contact/application/port/in/sync-contacts';
import { SyncContactsResponse } from 'contact/domain/contact';

export type SyncContactsHandlerFunction = RequestHandler<never, SyncContactsResponse>;

export default function makeSyncContactsHandlerFn(syncFn: SyncContactsFunction): SyncContactsHandlerFunction {
  return async (): Promise<Response<SyncContactsResponse>> => {
    try {
      const response = await syncFn();

      return {
        status: 200,
        body: response,
      };
    } catch (err) {
      const { message } = err as Error;

      return {
        status: 500,
        body: { message },
      };
    }
  };
}
