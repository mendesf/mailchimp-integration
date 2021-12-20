import makeDecodingError from 'common/decode-error';
import logger from 'common/logger';
import { isLeft } from 'fp-ts/lib/Either';
import { Contacts, SyncContactsResponse } from 'contact/domain/contact';
import { SyncContactsFunction } from 'contact/application/port/in/sync-contacts';
import {
  CreateListFunction,
  PullContactsFunction,
  PushContactsFunction,
} from 'contact/application/port/out/sync-contacts';

export default function makeSyncContactsFn(
  createListFn: CreateListFunction,
  pullContactsFn: PullContactsFunction,
  pushContactsFn: PushContactsFunction,
): SyncContactsFunction {
  return async (): Promise<SyncContactsResponse> => {
    try {
      const listId = await createListFn();
      const data = await pullContactsFn();
      const contacts = decodeContacts(data);
      const response = await pushContactsFn(listId, contacts);

      logger.debug('Sync contacts', {
        listId,
        contacts: contacts.length,
        syncedContacts: response.syncedContacts,
      });

      return response;
    } catch (error) {
      logger.error('Failed to sync contacts', { error });

      throw Error(`🔄 I couldn't sync your contacts this time 😥`);
    }
  };
}

function decodeContacts(data: unknown): Contacts {
  const result = Contacts.decode(data);

  if (isLeft(result)) throw makeDecodingError(data);

  return result.right;
}
