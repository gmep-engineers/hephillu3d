const express = require("express");
const textApi = require("../api/text");
const router = express.Router();
const callPrivateEndpoint = require("../lib/callPrivateEndpoint");

router.post("/", async function (req, res) {
  dto = {
    text: req.body.text,
  };
  const apiRes = await callPrivateEndpoint(req, res, textApi, "post", dto);
  res.status(apiRes.status).send(apiRes.payload);
});
module.exports = router;
