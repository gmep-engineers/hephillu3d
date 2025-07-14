const express = require("express");
const textApi = require("../api/text");
const router = express.Router();
const callPrivateEndpoint = require("../lib/callPrivateEndpoint");
const callPublicEndpoint = require("../lib/callPublicEndpoint");

router.get("/", async function (req, res) {
  dto = {
    id: req.query.id,
  };
  const apiRes = await callPublicEndpoint(textApi, "get", dto);
  res.status(apiRes.status).send(apiRes.payload);
});

router.post("/", async function (req, res) {
  dto = {
    text: req.body.text,
    ip_address: req.ip,
  };
  const apiRes = await callPrivateEndpoint(req, res, textApi, "post", dto);
  res.status(apiRes.status).send(apiRes.payload);
});
module.exports = router;
