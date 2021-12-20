import { get } from 'common/http-client';
import logger from 'common/logger';
import { PullContactsFunction } from 'contact/application/port/out/sync-contacts';
import { Contacts } from 'contact/domain/contact';

export default function makePullContactsFn(url: string): PullContactsFunction {
  return async (): Promise<Contacts> => {
    try {
      return await get<Contacts>(url);
    } catch (error) {
      logger.error('Failed to pull contacts', { error });

      throw Error(`⬇ I couldn't pull your contacts 😥`);
    }
  };
}
