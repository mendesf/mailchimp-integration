import mailchimp, { CreateListBody } from '@mailchimp/mailchimp_marketing';
import logger from 'common/logger';
import { CreateListFunction } from 'contact/application/port/out/sync-contacts';

const opts = { fields: ['lists.id', 'lists.name'] };

export default function makeCreateListFn(listName: string): CreateListFunction {
  return async (): Promise<string> => {
    try {
      const { lists } = await mailchimp.lists.getAllLists(opts);
      const list = lists.find((l) => l.name === listName);

      if (list) await mailchimp.lists.deleteList(list.id);

      const body = makeCreateListBody(listName);
      const { id } = await mailchimp.lists.createList(body);

      return id;
    } catch (error) {
      logger.error('Failed to create list', { error });

      throw Error(`📓 I couldn't create a new list for you 😥`);
    }
  };
}

function makeCreateListBody(listName: string): CreateListBody {
  return {
    name: listName,
    contact: {
      company: 'Mailchimp',
      address1: '675 Ponce de Leon Ave NE',
      address2: 'Suite 5000',
      city: 'Atlanta',
      state: 'GA',
      zip: '30308',
      country: 'US',
    } as const,
    permission_reminder: 'permission_reminder',
    email_type_option: true,
    campaign_defaults: {
      from_name: `Gettin' Together`,
      from_email: 'gettintogether@outlook.com',
      subject: 'JS Developers Meetup',
      language: 'EN_US',
    } as const,
  } as const;
}
