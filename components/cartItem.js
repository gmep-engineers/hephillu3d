const common = require("../lib/common");
const cartItem = async function (item) {
  return await common.render("components/cartItem", item);
};
module.exports = cartItem;
