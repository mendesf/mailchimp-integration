import { SyncContactsResponse } from 'contact/domain/contact';

export type SyncContactsFunction = () => Promise<SyncContactsResponse>;
