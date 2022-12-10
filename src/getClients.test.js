const getClients = require('./getClients');

describe('getClients', () => {
  describe('Happy flow', () => {
    test('Should return the mac addresses in the result set', async () => {
      const result = await getClients('some; cookies', {
        get: jest.fn(() => ({
          data: {
            meta: {
              rc: 'ok',
            },
            data: [
              {
                mac: '1',
              },
              {
                mac: '2',
              },
            ],
          },
        })),
      });

      expect(result).toEqual([
        '1',
        '2',
      ]);
    });
  });

  describe('Problems', () => {
    test('Should return an empty array if an error occurs', async () => {
      const result = await getClients('', {});

      expect(result).toEqual([]);
    });

    test('Should return an empty array if meta rc is not ok', async () => {
      const result = await getClients('some; cookies', {
        get: jest.fn(() => ({
          data: {
            meta: {
              rc: 'nok',
            },
            data: [
              {
                mac: '1',
              },
              {
                mac: '2',
              },
            ],
          },
        })),
      });

      expect(result).toEqual([]);
    });

    test('The http request return an exception', async () => {
      const result = await getClients('', {
        get: jest.fn(() => {
          throw new Error('Some Error');
        }),
      });

      expect(result).toEqual([]);
    });
  });
});
