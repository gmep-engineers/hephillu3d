const readBankCards = require("../db/bank_cards/readBankCards");
const readShippingAddresses = require("../db/shipping_addresses/readShippingAddresses");
const readUser = require("../db/users/readUser");
const common = require("../lib/common");

const order = async function (req, conn, session) {
  const params = common.params;
  if (!session) {
    session = {
      owner_id: "",
    };
  }

  params.emailAddress = "";

  params.shippingAddress = {
    id: "",
    owner_id: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
    recipient: "",
  };

  params.bankCard = {
    id: "",
    owner_id: "",
    card_number_hash: "",
    expiry_date_hash: "",
    name_on_card_hash: "",
    street: "",
    city: "",
    state: "",
    postal_code: "",
  };

  if (session.owner_id) {
    const user = await readUser(conn, { id: session.owner_id });
    if (user) {
      params.emailAddress = user.email_address;
    }

    const shippingAddresses = await readShippingAddresses(conn, {
      owner_id: session.owner_id,
    });
    if (shippingAddresses.length > 0) {
      params.shippingAddress = shippingAddresses[0];
    }

    const bankCards = await readBankCards(conn, { owner_id: session.owner_id });
    if (bankCards.length > 0) {
      params.bankCard = bankCards[0];
    }
  }

  return await common.render("pages/order", params);
};
module.exports = order;
