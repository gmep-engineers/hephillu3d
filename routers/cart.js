const express = require("express");
const cartApi = require("../api/cart");
const callPublicEndpoint = require("../lib/callPublicEndpoint");
const router = express.Router();

router.post("/add-item", async function (req, res) {
  const dto = {
    modelId: req.body.modelId,
    meshyTaskId: req.body.meshyTaskId,
    image_id: req.body.image_id,
    ip_address: req.ip,
  };
  const apiRes = await callPublicEndpoint(req, res, cartApi, "addItem", dto);
  res.status(apiRes.status).send(apiRes.payload);
});
module.exports = router;
