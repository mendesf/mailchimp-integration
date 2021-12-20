import makeSyncContactsHandlerFn from './sync-contacts-handler';

const syncContactResult = {
  contacts: {
    firstName: 'Karolann',
    lastName: 'Fadel',
    email: 'Cristopher27@gmail.com',
  },
  syncedContacts: 1,
};

const syncContactsFn = jest.fn().mockResolvedValue(syncContactResult);

test('should call sync contacts and return an HTTP response with the result', async () => {
  const handlerFn = makeSyncContactsHandlerFn(syncContactsFn);

  const response = await handlerFn();

  expect(response).toMatchObject({
    status: 200,
    body: syncContactResult,
  });
});

test('should return an HTTP response with a 500 status code when an error occurs', async () => {
  syncContactsFn.mockRejectedValueOnce(new Error('Failed successfully'));

  const handlerFn = makeSyncContactsHandlerFn(syncContactsFn);

  const response = await handlerFn();

  expect(response).toMatchObject({ status: 500 });
});
