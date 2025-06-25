const apiPayloadRes = function (code, payload, cookies) {
  return { status: code, payload: payload, cookies: cookies };
};
module.exports = apiPayloadRes;
