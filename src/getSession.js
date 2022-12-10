const getSession = async ({ username, password }, axios) => {
  try {
    const { data, headers } = await axios.post('/api/login', {
      password,
      username,
      remember: false,
      strict: true,
    });

    if (data?.meta?.rc === 'ok') {
      return headers['set-cookie']
        .map((cookie) => cookie.split(';').shift())
        .join('; ');
    }
  } catch (e) {
    // we ignore this, if we do not get a session, thats it
  }

  return '';
};

module.exports = getSession;
