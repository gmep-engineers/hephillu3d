const express = require("express");
const modelApi = require("../api/model");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.post("/", upload.single("file", 15), async function (req, res) {
  dto = {
    file: req.file,
  };
  const apiRes = await callPublicEndpoint(modelApi, "post", dto);
  res.status(apiRes.status).send(apiRes.payload);
});

module.exports = router;
