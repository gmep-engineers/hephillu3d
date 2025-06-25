const apiMessageRes = function (code, message) {
  return { status: code, payload: { message: message } };
};
module.exports = apiMessageRes;
