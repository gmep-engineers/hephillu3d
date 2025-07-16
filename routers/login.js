const express = require("express");
const loginApi = require("../api/login");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");
const addResCookies = require("../lib/addResCookies");

router.post("/", async function (req, res) {
  dto = {
    email_address: req.body.email_address,
    password: req.body.password,
  };
  const apiRes = await callPublicEndpoint(req, res, loginApi, "post", dto);
  addResCookies(res, apiRes.cookies);
  res.status(apiRes.status).send(apiRes.payload);
});
module.exports = router;
