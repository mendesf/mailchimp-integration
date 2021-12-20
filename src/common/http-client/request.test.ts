import { AxiosStatic } from 'axios';
import { request } from './request';

jest.mock('axios', () => {
  const originalModule = jest.requireActual<AxiosStatic>('axios');
  const mockFn = Object.assign(jest.fn(), {
    isAxiosError: originalModule.isAxiosError.bind(originalModule),
  });

  mockFn.mockRejectedValueOnce({
    message: 'Request failed with status code 404',
    config: {
      method: 'get',
      url: 'https://mockapi.io/api/v1/contacts',
    },
    response: { status: 404 },
    isAxiosError: true,
  });

  return {
    __esModule: true,
    default: mockFn,
  };
});

test('should throw a custom error when the status code is outside the 2xx range', async () => {
  expect.assertions(1);

  const response = request('GET', 'https://mockapi.io/api/v1/contacts');

  await expect(response).rejects.toMatchObject({
    name: 'RequestError',
    response: { status: 404 },
  });
});
