const getSession = require('./getSession');
const getClients = require('./getClients');

const publishAtHome = async (config, axios, mqttClient) => {
  const cookies = await getSession(config, axios);
  const clientMacs = await getClients(cookies, axios);

  if (clientMacs.some((mac) => config.macs.includes(mac))) {
    await mqttClient.publish(config.mqtt.topic, '1');
  } else {
    await mqttClient.publish(config.mqtt.topic, '0');
  }
};

module.exports = publishAtHome;
