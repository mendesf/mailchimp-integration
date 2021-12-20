import mailchimp, { BatchListMembersResponse, Member } from '@mailchimp/mailchimp_marketing';
import logger from 'common/logger';
import { Contact, Contacts, SyncContactsResponse } from 'contact/domain/contact';

export default async function pushContacts(listId: string, contacts: Contacts): Promise<SyncContactsResponse> {
  try {
    const members: Member[] = contacts.map(toMember);
    const response = await mailchimp.lists.batchListMembers(listId, { members });

    return toSyncContactsResponse(response);
  } catch (error) {
    logger.error('Failed to push contacts', { error });

    throw Error(`⬆ I couldn't push your contacts 😥`);
  }
}

function toMember(contact: Contact): Member {
  return {
    email_address: contact.email,
    status: 'subscribed',
    merge_fields: {
      FNAME: contact.firstName,
      LNAME: contact.lastName,
    },
  };
}

function toContact(member: Member): Contact {
  return {
    firstName: member.merge_fields.FNAME,
    lastName: member.merge_fields.LNAME,
    email: member.email_address,
  };
}

function toSyncContactsResponse(response: BatchListMembersResponse): SyncContactsResponse {
  const contacts = response.new_members.concat(response.updated_members).map(toContact);
  const syncedContacts = response.total_created + response.total_updated;

  return { contacts, syncedContacts };
}
