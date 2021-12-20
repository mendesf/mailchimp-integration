import { pipe } from 'fp-ts/function';
import * as t from 'io-ts';

const Contact = pipe(
  t.type({
    firstName: t.string,
    lastName: t.string,
    email: t.string,
  }),
  t.readonly,
  t.exact,
);

export type Contact = t.TypeOf<typeof Contact>;

export const Contacts = pipe(Contact, t.array, t.readonly);

export type Contacts = t.TypeOf<typeof Contacts>;

export type SyncContactsResponse = Readonly<{
  syncedContacts: number;
  contacts: Contacts;
}>;
