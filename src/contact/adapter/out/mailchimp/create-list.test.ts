import mailchimp from '@mailchimp/mailchimp_marketing';
import makeCreateListFn from './create-list';

jest.mock('@mailchimp/mailchimp_marketing', () => ({
  lists: {
    getAllLists: jest.fn().mockResolvedValue({
      lists: [
        {
          id: '1',
          name: 'Felipe Gustavo de Meneses Mendes',
        },
      ],
    }),
    deleteList: jest.fn().mockImplementation(() => Promise.resolve()),
    createList: jest.fn().mockResolvedValue({
      id: '2',
      name: 'Felipe Gustavo de Meneses Mendes',
    }),
  },
}));

const createListFn = makeCreateListFn('Felipe Gustavo de Meneses Mendes');

test('should create a list', async () => {
  const response = await createListFn();

  expect(response).toBe('2');
});

test('should throw a custom error when failing to create a list', async () => {
  expect.assertions(1);

  (mailchimp.lists.createList as jest.Mock).mockRejectedValueOnce(new Error('Failed successfully'));

  try {
    await createListFn();
  } catch (err) {
    expect((err as Error).message).toMatch(/^📓.*😥$/);
  }
});
