const callPublicEndpoint = async function (api, action, dto) {
  const res = await api[action](dto);
  return res;
};

module.exports = callPublicEndpoint;
