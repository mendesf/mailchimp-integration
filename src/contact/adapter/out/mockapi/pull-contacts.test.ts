import axios, { AxiosResponse } from 'axios';
import makePullContactsFn from './pull-contacts';

jest.mock('axios');

const mockedAxios = axios as jest.MockedFunction<typeof axios>;

const axiosResponse = {
  data: [
    {
      createdAt: '2021-12-14T06:05:41.683Z',
      firstName: 'Karolann',
      lastName: 'Fadel',
      email: 'Cristopher27@gmail.com',
      avatar: 'https://cdn.fakercloud.com/avatars/cbracco_128.jpg',
      id: '1',
    },
  ],
} as AxiosResponse;

mockedAxios.mockResolvedValue(axiosResponse);

const pullContactsFn = makePullContactsFn('https://mock');

test('should return a list of contacts', async () => {
  const response = await pullContactsFn();

  expect(response).toEqual(axiosResponse.data);
});

test('should throw a custom error when failing to push the contacts', async () => {
  expect.assertions(1);

  mockedAxios.mockRejectedValueOnce(new Error('Failed successfully'));

  try {
    await pullContactsFn();
  } catch (err) {
    expect((err as Error).message).toMatch(/^⬇.*😥$/);
  }
});
