import makeSyncContactsFn from './sync-contacts';

const contacts = [
  {
    firstName: 'Karolann',
    lastName: 'Fadel',
    email: 'Cristopher27@gmail.com',
  },
];

const createListFn = jest.fn().mockResolvedValue('2');
const pullContactsFn = jest.fn().mockResolvedValue(contacts);
const pushContactsFn = jest.fn().mockResolvedValue({
  contacts,
  syncedContacts: 1,
});

const syncContactsFn = makeSyncContactsFn(createListFn, pullContactsFn, pushContactsFn);

test('should sync the contacts ', async () => {
  const response = await syncContactsFn();

  expect(response).toMatchObject({ syncedContacts: 1 });
});

test('should throw a custom error when failing to sync the contacts', async () => {
  expect.assertions(1);

  pullContactsFn.mockResolvedValueOnce([{}]);

  try {
    await syncContactsFn();
  } catch (err) {
    expect((err as Error).message).toMatch(/^🔄.*😥$/);
  }
});
