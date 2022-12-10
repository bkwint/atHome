const publishAtHome = require('./publishAtHome');
const getClients = require('./getClients');
const getSession = require('./getSession');

jest.mock('./getClients', () => jest.fn(() => ['a', 'b']));
jest.mock('./getSession', () => jest.fn(() => 'abc'));

const config = {
  macs: ['a'],
  mqtt: { topic: 'def' },
};
const axios = {};

describe('publishAtHome', () => {
  beforeAll(() => {
    getClients.mockClear();
    getSession.mockClear();
  });

  describe('Happyflow', () => {
    test('publishes to mqtt if one of the macs is at home', async () => {
      const mqttClient = {
        publish: jest.fn(),
      };

      await publishAtHome(config, axios, mqttClient);

      expect(getClients).toHaveBeenCalledTimes(1);
      expect(getSession).toHaveBeenCalledTimes(1);
      expect(mqttClient.publish).toHaveBeenCalledTimes(1);

      expect(getSession).toHaveBeenCalledWith(config, axios);
      expect(getClients).toHaveBeenCalledWith('abc', axios);
      expect(mqttClient.publish).toHaveBeenCalledWith('def', '1');
    });

    test('publishes to mqtt if none of the macs is at home', async () => {
      const mqttClient = {
        publish: jest.fn(),
      };

      const conf = { ...config, macs: ['c'] };

      await publishAtHome(conf, axios, mqttClient);

      expect(getClients).toHaveBeenCalledTimes(1);
      expect(getSession).toHaveBeenCalledTimes(1);
      expect(mqttClient.publish).toHaveBeenCalledTimes(1);

      expect(getSession).toHaveBeenCalledWith(conf, axios);
      expect(getClients).toHaveBeenCalledWith('abc', axios);
      expect(mqttClient.publish).toHaveBeenCalledWith('def', '0');
    });
  });
});
