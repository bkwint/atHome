/**
 * Application to detect whether someone is at home based on the fact that their
 * phone has connected to the network
 */

const axios = require('axios');
const https = require('https');
const mqtt = require('mqtt');
const publishAtHome = require('./src/publishAtHome');

const config = require('./.config/config.json');

// create a https client that allows invalid certificates
const httpClient = axios.create({
  httpsAgent: new https.Agent({
    rejectUnauthorized: false,
  }),
  baseURL: config.host,
});

const mqttClient = mqtt.connect(`mqtt://${config.mqtt.host}`);

const start = async () => {
  await new Promise((resolve) => {
    mqttClient.on('connect', resolve);
  });

  await publishAtHome(config, httpClient, mqttClient);

  mqttClient.end();
};

start();
