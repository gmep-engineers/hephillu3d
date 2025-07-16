const getCartCount = require("../db-procedures/getCartCount");
const readCart = require("../db/carts/readCart");
const common = require("../lib/common");
const header = async function (conn, session) {
  const params = common.params;
  params.session = session;
  var cart = null;
  if (session.owner_id) {
    cart = await readCart(conn, { owner_id: session.owner_id });
  } else {
    cart = await readCart(conn, { session_id: session.id });
  }
  var cartCount = 0;
  if (cart) {
    cartCount = await getCartCount(conn, { cart_id: cart.id });
  }

  params.cartCount = cartCount;
  return await common.render(`components/header`, params);
};

module.exports = header;
