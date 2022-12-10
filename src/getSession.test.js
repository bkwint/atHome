const getSession = require('./getSession');

describe('getSession', () => {
  describe('Happy flow', () => {
    test('getSession returns a set of cookies', async () => {
      const axios = {
        post: jest.fn(() => ({
          data: {
            meta: {
              rc: 'ok',
            },
          },
          headers: {
            'set-cookie': [
              'abc;def',
              'ghi;jkl',
            ],
          },
        })),
      };

      const result = await getSession({
        username: 'username',
        password: 'password',
      }, axios);

      expect(result).toEqual('abc; ghi');
      expect(axios.post).toHaveBeenCalledTimes(1);
      expect(axios.post).toHaveBeenCalledWith(
        '/api/login',
        {
          password: 'password',
          username: 'username',
          remember: false,
          strict: true,
        },
      );
    });
  });

  describe('Problems', () => {
    test('Should return an empty string if an error occurs', async () => {
      const result = await getSession({ username: 'username', password: 'password' }, {});

      expect(result).toEqual('');
    });

    test('Should return an empty string if the axios post throws an error', async () => {
      const result = await getSession({ username: 'username', password: 'password' }, {
        post: jest.fn(() => {
          throw Error('some error');
        }),
      });

      expect(result).toEqual('');
    });

    test('Should return an empty string if the axios post does not return data.meta.rc = ok', async () => {
      const axios = {
        post: jest.fn(() => ({
          data: {
            meta: {
              rc: 'nok',
            },
          },
          headers: {
            'set-cookie': [
              'abc;def',
              'ghi;jkl',
            ],
          },
        })),
      };

      const result = await getSession({
        username: 'username',
        password: 'password',
      }, axios);

      expect(result).toEqual('');
    });
  });
});
