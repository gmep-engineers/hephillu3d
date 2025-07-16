const express = require("express");
const cartApi = require("../api/cart");
const router = express.Router();

router.post("/", upload.single("file", 15), async function (req, res) {
  const dto = {
    cart_id: req.cookies.cart_id,
    modelId: req.body.modelId,
    meshyTaskId: req.body.meshyTaskId,
    ip_address: req.ip_address,
  };
});
