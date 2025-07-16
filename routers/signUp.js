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
    ip_address: req.ip,
  };
  const apiRes = await callPublicEndpoint(signUpApi, "post", dto);
  addResCookies(res, apiRes.cookies);
  res.status(apiRes.status).send(apiRes.payload);
});
module.exports = router;
