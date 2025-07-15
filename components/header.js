const common = require("../lib/common");
const header = async function (session, cart) {
  const params = common.params;
  params.session = session;
  if (!cart) {
    cart = [];
  }
  params.cart = cart;
  return await common.render(`components/header`, params);
};

module.exports = header;
