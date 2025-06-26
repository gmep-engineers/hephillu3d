const express = require("express");
const imageApi = require("../api/image");
const router = express.Router();
const callPublicEndpoint = require("../lib/callPublicEndpoint");
const multer = require("multer");
const upload = multer({ dest: "./uploads" });

router.post("/", upload.single("file", 15), async function (req, res) {
  res.status(501).send({ message: "not implemented" });
  /*
  dto = {
    file: req.file,
  };
  const apiRes = await callPublicEndpoint(imageApi, "post", dto);
  res.status(apiRes.status).send(apiRes.payload);
  */
});

module.exports = router;
