# Ubiquiti Unifi Network at home detection

## Description
The script will detect that one of a list of mac addresses on the network exists to determin that someone is currently connected to the home wifi, which can be used to detect that a person is hom by monitoring that persons mobile phone mac address.

## How to run
To setup the application you should do the following:

1. Make sure nvm is installed on your local machine
2. Make sure you have a mqtt broker installed, for example mosquitto mqtt
3. clone this repository
4. cd into the appropriate folder
5. run ```mkdir .config```
6. run ```cp ./.config.example/config.json ./.config/config.json```
7. Fill in your credentials and other information in the .config/config.json file
8. run ```nvm use```
9. run ```npm run start```

This will run the application once and detect that the required mac addresses are present or not, this information is then published to the mqtt topic you have selected

## Setup in the crontab
To make this work permanently you should run te application by means of a crontab. For example run ```crontab -e```
Define a proper cron, for example every minute

```* * * * * node /path/to/your/dir/app.js```

## Integration with HomeAssistant
If you want to use this as a sensor in home-assistant, add it to your sensors list like this:

```
- platform: mqtt
  name: "AtHome"
  state_topic: "atHome"
```

