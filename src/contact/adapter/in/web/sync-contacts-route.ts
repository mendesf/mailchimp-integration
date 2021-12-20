import { SyncContactsHandlerFunction } from './sync-contacts-handler';
import { Route } from 'common/http-server';
import { SyncContactsResponse } from 'contact/domain/contact';

export type SyncContactsRoute = Route<never, SyncContactsResponse>;

export default function makeSyncContactsRoute(handlerFn: SyncContactsHandlerFunction): SyncContactsRoute {
  return {
    method: 'get',
    path: '/contacts/sync',
    handler: handlerFn,
  };
}
