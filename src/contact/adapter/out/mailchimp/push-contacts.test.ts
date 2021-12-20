import mailchimp from '@mailchimp/mailchimp_marketing';
import { SyncContactsResponse } from 'contact/domain/contact';
import pushContacts from './push-contacts';

const contacts = [
  {
    firstName: 'Karolann',
    lastName: 'Fadel',
    email: 'Cristopher27@gmail.com',
  },
];

jest.mock('@mailchimp/mailchimp_marketing', () => ({
  lists: {
    batchListMembers: jest.fn().mockResolvedValue(
      Promise.resolve({
        new_members: [
          {
            email_address: 'Cristopher27@gmail.com',
            status: 'subscribed',
            merge_fields: {
              FNAME: 'Karolann',
              LNAME: 'Fadel',
            },
          },
        ],
        updated_members: [],
        errors: [],
        total_created: 1,
        total_updated: 0,
        error_count: 0,
      }),
    ),
  },
}));

test('Should return the number of synced contacts', async () => {
  const response = await pushContacts('1', contacts);

  const expectedResponse: SyncContactsResponse = {
    contacts,
    syncedContacts: 1,
  };

  expect(response).toEqual(expectedResponse);
});

test('should throw a custom error when failing to pull the contacts', async () => {
  expect.assertions(1);

  (mailchimp.lists.batchListMembers as jest.Mock).mockRejectedValueOnce(new Error('Failed successfully'));

  try {
    await pushContacts('1', contacts);
  } catch (err) {
    expect((err as Error).message).toMatch(/^⬆.*😥$/);
  }
});
