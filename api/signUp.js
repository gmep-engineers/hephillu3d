const createUser = require("../db/users/createUser");
const bcrypt = require("bcrypt");
const readUser = require("../db/users/readUser");
const apiMessageRes = require("../lib/apiMessageRes");
const config = require("../etc/config");
const { createHmac } = require("node:crypto");
const createBankCard = require("../db/bank_cards/createBankCard");
const createShippingAddress = require("../db/shipping_addresses/createShippingAddress");
const createSession = require("../db/sessions/createSession");
const apiResCookie = require("../lib/apiResCookie");
const apiPayloadRes = require("../lib/apiPayloadRes");

const signUp = {
  post: async function (conn, dto) {
    const saltRounds = 10;
    var salt = await bcrypt.genSalt(saltRounds);
    var passhash = await bcrypt.hash(dto.user.password, salt);

    var user = await readUser(conn, { email_address: dto.email_address });

    if (user) {
      return apiMessageRes(400, "user with email already exists");
    }

    const userId = await createUser(conn, {
      email_address: dto.user.email_address,
      passhash: passhash,
    });

    const card_number_hash = createHmac("sha256", config.HASH_SECRET)
      .update(dto.bankCard.cardNumber)
      .digest("hex");
    const expiry_date_hash = createHmac("sha256", config.HASH_SECRET)
      .update(dto.bankCard.expiryDate)
      .digest("hex");
    const name_on_card_hash = createHmac("sha256", config.HASH_SECRET)
      .update(dto.bankCard.nameOnCard)
      .digest("hex");

    await createBankCard(conn, {
      owner_id: userId,
      card_number_hash: card_number_hash,
      expiry_date_hash: expiry_date_hash,
      name_on_card_hash: name_on_card_hash,
      street: dto.bankCard.street,
      unit: dto.bankCard.unit,
      city: dto.bankCard.city,
      state: dto.bankCard.state,
      postal_code: dto.bankCard.postal_code,
    });

    await createShippingAddress(conn, {
      owner_id: userId,
      recipient: dto.shippingAddress.recipient,
      street: dto.shippingAddress.street,
      unit: dto.shippingAddress.unit,
      city: dto.shippingAddress.city,
      state: dto.shippingAddress.state,
      postal_code: dto.shippingAddress.postal_code,
    });

    // email user for verification

    const sid = await createSession(conn, {
      owner_id: userId,
      ip_address: dto.ip_address,
    });
    return apiPayloadRes(201, { userId: userId, nextStep: "/design" }, [
      apiResCookie("sid", sid),
    ]);
  },
};
module.exports = signUp;
