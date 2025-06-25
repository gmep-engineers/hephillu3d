const express = require("express");
const signUpApi = require("../api/signUp");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");
const addResCookies = require("../lib/addResCookies");

router.post("/", async function (req, res) {
  const dto = {
    user: {
      email_address: req.body.user.email_address,
      password: req.body.user.password,
    },
    bankCard: {
      cardNumber: req.body.bankCard.cardNumber,
      expiryDate: req.body.bankCard.expiryDate,
      nameOnCard: req.body.bankCard.nameOnCard,
      street: req.body.bankCard.street,
      unit: req.body.bankCard.unit,
      city: req.body.bankCard.city,
      state: req.body.bankCard.state,
      postal_code: req.body.bankCard.postal_code,
    },
    shippingAddress: {
      recipient: req.body.shippingAddress.recipient,
      street: req.body.shippingAddress.street,
      unit: req.body.shippingAddress.unit,
      city: req.body.shippingAddress.city,
      state: req.body.shippingAddress.state,
      postal_code: req.body.shippingAddress.postal_code,
    },
    ip_address: req.ip,
  };
  const apiRes = await callPublicEndpoint(signUpApi, "post", dto);
  addResCookies(res, apiRes.cookies);
  res.status(apiRes.status).send(apiRes.payload);
});
module.exports = router;
