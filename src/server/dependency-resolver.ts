import makeSyncContactsHandlerFn from 'contact/adapter/in/web/sync-contacts-handler';
import makeSyncContactsRoute, { SyncContactsRoute } from 'contact/adapter/in/web/sync-contacts-route';
import makeCreateListFn from 'contact/adapter/out/mailchimp/create-list';
import pushContacts from 'contact/adapter/out/mailchimp/push-contacts';
import makePullContactsFn from 'contact/adapter/out/mockapi/pull-contacts';
import makeSyncContactsFn from 'contact/application/service/sync-contacts';
import { pipe } from 'fp-ts/lib/function';

export function resolveSyncContactsRoute(listName: string, mockapiUrl: string): SyncContactsRoute {
  return pipe(
    makeSyncContactsFn(makeCreateListFn(listName), makePullContactsFn(mockapiUrl), pushContacts),
    makeSyncContactsHandlerFn,
    makeSyncContactsRoute,
  );
}
