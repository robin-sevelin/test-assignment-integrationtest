import * as movieservice from '../ts/services/movieservice';
import { testData } from '../ts/services/__mocks__/movieservice';

jest.mock('axios', () => ({
  get: async (url: string) => {
    return new Promise((resolve, reject) => {
      if (url.endsWith('error')) {
        reject('error');
      } else {
        resolve({ data: { Search: testData } });
      }
    });
  },
}));

test('should generate error message', async () => {
  try {
    await movieservice.getData('error');
  } catch (error: any) {
    expect(error.length).toBe(0);
  }
});

test('should get test data', async () => {
  await movieservice.getData('text');

  expect(testData.length).toBe(3);
  expect(testData[0].Title).toBe('Saw');
  expect(testData).not.toBe(null);
});
