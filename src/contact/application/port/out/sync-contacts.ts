import { Contacts, SyncContactsResponse } from 'contact/domain/contact';

export type CreateListFunction = () => Promise<string>;

export type PullContactsFunction = () => Promise<Contacts>;

export type PushContactsFunction = (listId: string, contacts: Contacts) => Promise<SyncContactsResponse>;
