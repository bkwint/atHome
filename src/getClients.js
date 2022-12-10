const getClients = async (cookies, axios) => {
  try {
    const { data } = await axios.get('/api/s/default/stat/sta', {
      headers: {
        cookie: cookies,
      },
    });

    if (data?.meta?.rc === 'ok') {
      return data.data.map((client) => client.mac);
    }
  } catch (e) {
    // we ignore this, if it faisl, we do not get any clients
  }

  return [];
};

module.exports = getClients;
